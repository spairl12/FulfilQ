// BP1 SPAITenderIntake, step 5: Script task "Insert schedule lines"
// Paste the body below into the Script task. It is not a class file.
//
// Process parameters (create them on BP1 before pasting):
//   TenderReference    Text               in   what a person would say: a tender code such as
//                                             TND-2026-0141, an opportunity title, or a UUID
//   OpportunityId      Unique identifier  in   optional. Set it and TenderReference is ignored.
//                                             Used by the process chain, not by the chat agent
//   LinesJson          Unlimited text     in   the Schedule Extractor output (whole envelope, or the lines array)
//   DocumentRevision   Text               in   the schedule's revision marker, for the summary sentence
//   InsertedCount      Integer            out  rows inserted this run
//   SkippedCount       Integer            out  lines already present (re-run safety)
//   ResolvedOpportunity Text              out  the title of the opportunity actually written to
//   RunSummary         Text               out  the sentence the agent reads back in chat
//
// Usings (process designer > METHODS > Usings): none needed. This script uses only what
// the generated process schema already carries.
//
// Add each namespace as its OWN entry, one at a time. Pasting several as a single
// comma-separated value generates "using A, B, C;" and fails the compile at the generated
// file's line 11 with CS1002/CS1022/CS0116 -- errors that point at the namespace and give
// no hint that a Usings row is at fault. The bad row survives until it is deleted, so
// later entries look guilty. Verified on 189575-crm-bundle, 2026-09-26.
//
// System.Linq IS available through the grid; the LINQ this script once used was rewritten
// as plain loops while that was in doubt, and left that way because it costs nothing.
//
// Columns written were verified against the live SPAIScheduleLine schema (clio, 2026-09-20).
// SPAIDisplayRef is not written here: SPAIItemIdentityEntityEventListener derives it on save.
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");

// Resolve the tender the way a person names it. A chat user says "TND-2026-0141" or
// "Corvina Quarter Stage 2", never a UUID, so OpportunityId is optional: when it is empty
// TenderReference is matched against the tender code first, then the title. Anything
// ambiguous or unfound throws with a message the agent can read out and act on.
Guid opportunityId = Get<Guid>("OpportunityId");
if (opportunityId == Guid.Empty) {
	string reference = (Get<string>("TenderReference") ?? "").Trim();
	if (reference.Length == 0) {
		throw new Exception("Name the tender: supply TenderReference as a tender code such as TND-2026-0141, or the opportunity title.");
	}
	Guid parsedId;
	if (Guid.TryParse(reference, out parsedId)) {
		opportunityId = parsedId;
	} else {
		var codeEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Opportunity");
		codeEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
		string codeTitleColumn = codeEsq.AddColumn("Title").Name;
		codeEsq.Filters.Add(codeEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAITenderCode", reference));
		var matches = codeEsq.GetEntityCollection(uc);
		string matchTitleColumn = codeTitleColumn;
		if (matches.Count == 0) {
			var titleEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Opportunity");
			titleEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
			matchTitleColumn = titleEsq.AddColumn("Title").Name;
			titleEsq.Filters.Add(titleEsq.CreateFilterWithParameters(FilterComparisonType.Contain, "Title", reference));
			matches = titleEsq.GetEntityCollection(uc);
		}
		if (matches.Count == 0) {
			throw new Exception("No opportunity matches \"" + reference + "\". Check the tender code or the project name.");
		}
		if (matches.Count > 1) {
			var titles = new List<string>();
			foreach (Entity candidate in matches) {
				titles.Add(candidate.GetTypedColumnValue<string>(matchTitleColumn));
			}
			throw new Exception("\"" + reference + "\" matches " + matches.Count + " opportunities: " + string.Join("; ", titles) + ". Ask which one is meant.");
		}
		foreach (Entity only in matches) {
			opportunityId = only.PrimaryColumnValue;
			break;
		}
	}
}

// Read the title back whichever way we got here, so the summary names the tender.
string opportunityTitle = "";
var resolvedEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Opportunity");
resolvedEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string resolvedTitleColumn = resolvedEsq.AddColumn("Title").Name;
resolvedEsq.Filters.Add(resolvedEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "Id", opportunityId));
foreach (Entity resolved in resolvedEsq.GetEntityCollection(uc)) {
	opportunityTitle = resolved.GetTypedColumnValue<string>(resolvedTitleColumn);
	break;
}
if (opportunityTitle.Length == 0) {
	throw new Exception("Opportunity " + opportunityId + " was not found.");
}
Set("OpportunityId", opportunityId);
Set("ResolvedOpportunity", opportunityTitle);
JToken parsed = JToken.Parse(Get<string>("LinesJson") ?? "[]");
JArray lines = parsed is JObject ? (JArray)(parsed["lines"] ?? new JArray()) : (JArray)parsed;

Func<string, Dictionary<string, Guid>> loadByName = schemaName => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string nameColumn = esq.AddColumn("Name").Name;
	var map = new Dictionary<string, Guid>(StringComparer.OrdinalIgnoreCase);
	foreach (Entity e in esq.GetEntityCollection(uc)) {
		map[e.GetTypedColumnValue<string>(nameColumn).Trim()] = e.PrimaryColumnValue;
	}
	return map;
};
var roomTypes = loadByName("SPAIRoomType");
var unitTiers = loadByName("SPAIUnitTier");
Guid pendingStatusId = loadByName("SPAILineStatus")["Pending"];

// Line numbers already inserted for this opportunity, so a re-run never duplicates a line.
var existingEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
string lineNumberColumn = existingEsq.AddColumn("SPAILineNumber").Name;
existingEsq.Filters.Add(existingEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
var existing = new HashSet<int>();
foreach (Entity existingLine in existingEsq.GetEntityCollection(uc)) {
	existing.Add(existingLine.GetTypedColumnValue<int>(lineNumberColumn));
}

Func<JToken, string> text = token => token == null || token.Type == JTokenType.Null ? string.Empty : ((string)token).Trim();
Func<JToken, int> integer = token => {
	int value;
	return token != null && int.TryParse(token.ToString(), out value) ? value : 0;
};

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
int inserted = 0;
int skipped = 0;
foreach (JToken lineToken in lines) {
	JObject line = lineToken as JObject;
	if (line == null) {
		continue;
	}
	int lineNumber = integer(line["lineNumber"]);
	if (existing.Contains(lineNumber)) {
		skipped++;
		continue;
	}
	Entity row = lineSchema.CreateEntity(uc);
	row.SetDefColumnValues();
	row.SetColumnValue("SPAIOpportunityId", opportunityId);
	row.SetColumnValue("SPAILineStatusId", pendingStatusId);
	row.SetColumnValue("SPAILineNumber", lineNumber);
	row.SetColumnValue("SPAIItemCode", text(line["itemRef"]));
	row.SetColumnValue("SPAIIsAlternative", line["isAlternate"] != null && line["isAlternate"].Type == JTokenType.Boolean && (bool)line["isAlternate"]);
	row.SetColumnValue("SPAIAlternateVariant", text(line["alternateVariant"]));
	row.SetColumnValue("SPAISpecifiedText", text(line["specifiedText"]));
	row.SetColumnValue("SPAISpecifiedBrand", text(line["specifiedBrand"]));
	row.SetColumnValue("SPAISpecifiedModel", text(line["specifiedModel"]));
	row.SetColumnValue("SPAISpecifiedFinish", text(line["specifiedFinish"]));
	row.SetColumnValue("SPAIQuantity", integer(line["quantity"]));
	row.SetColumnValue("SPAIRequiredCutoutW", integer(line["cutoutW"]));
	row.SetColumnValue("SPAIRequiredCutoutH", integer(line["cutoutH"]));
	row.SetColumnValue("SPAIRequiredCutoutD", integer(line["cutoutD"]));
	double confidence;
	if (line["extractionConfidence"] != null && double.TryParse(line["extractionConfidence"].ToString(),
			System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out confidence)) {
		row.SetColumnValue("SPAIConfidence", confidence);
	}
	// Lookups resolve by name. Unmatched text is kept in the notes, never discarded.
	var notes = new List<string>();
	if (text(line["notes"]).Length > 0) {
		notes.Add(text(line["notes"]));
	}
	Guid lookupId;
	string room = text(line["roomType"]);
	if (roomTypes.TryGetValue(room, out lookupId)) {
		row.SetColumnValue("SPAIRoomTypeId", lookupId);
	} else if (room.Length > 0) {
		notes.Add("Room as written: " + room);
	}
	string tier = text(line["unitTier"]);
	if (unitTiers.TryGetValue(tier, out lookupId)) {
		row.SetColumnValue("SPAIUnitTierId", lookupId);
	} else if (tier.Length > 0) {
		notes.Add("Unit tier as written: " + tier);
	}
	if (text(line["productFamily"]).Length > 0) {
		notes.Add("Family as written: " + text(line["productFamily"]));
	}
	row.SetColumnValue("SPAIScheduleNotes", string.Join(" | ", notes));
	row.Save(false);
	inserted++;
}
Set("InsertedCount", inserted);
Set("SkippedCount", skipped);
Set("RunSummary", string.Format(
	"Inserted {0} schedule lines for {1}, revision {2}. {3} already present.",
	inserted, opportunityTitle, Get<string>("DocumentRevision") ?? "(unstated)", skipped));
return true;
