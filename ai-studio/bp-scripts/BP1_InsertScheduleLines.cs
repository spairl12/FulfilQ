// BP1 SPAITenderIntake, step 5: Script task "Insert schedule lines"
// Paste the body below into the Script task. It is not a class file.
//
// Process parameters (create them on BP1 before pasting):
//   OpportunityId    Unique identifier  in   the Opportunity the schedule belongs to
//   LinesJson        Unlimited text     in   the Schedule Extractor output (whole envelope, or the lines array)
//   DocumentRevision Text               in   the schedule's revision marker, for the summary sentence
//   InsertedCount    Integer            out  rows inserted this run
//   SkippedCount     Integer            out  lines already present (re-run safety)
//   RunSummary       Text               out  the sentence the agent reads back in chat
//
// Usings (process designer > Methods / Usings; the label is "verify in UI"):
//   System, System.Collections.Generic, System.Linq, Newtonsoft.Json.Linq, Terrasoft.Core,
//   Terrasoft.Core.Entities
//
// Columns written were verified against the live SPAIScheduleLine schema (clio, 2026-09-20).
// SPAIDisplayRef is not written here: SPAIItemIdentityEntityEventListener derives it on save.
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
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
var existing = new HashSet<int>(existingEsq.GetEntityCollection(uc)
	.Select(e => e.GetTypedColumnValue<int>(lineNumberColumn)));

Func<JToken, string> text = token => token == null || token.Type == JTokenType.Null ? string.Empty : ((string)token).Trim();
Func<JToken, int> integer = token => {
	int value;
	return token != null && int.TryParse(token.ToString(), out value) ? value : 0;
};

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
int inserted = 0;
int skipped = 0;
foreach (JObject line in lines.OfType<JObject>()) {
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
	"Inserted {0} schedule lines for revision {1}. {2} already present.",
	inserted, Get<string>("DocumentRevision") ?? "(unstated)", skipped));
return true;
