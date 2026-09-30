// BP1 SPAITenderIntake, step 5: Script task "Insert schedule lines"
// Paste the body below into the Script task. It is not a class file.
//
// Process parameters (create them on BP1 before pasting):
//   TenderReference    Text               in   what a person would say: a tender code such as
//                                             TND-2026-0141, an opportunity title, or a UUID
//   TenderCode         Text               in   optional. The "Tender No." printed on the
//                                             schedule. Looked up first; set on a new tender
//   OpportunityId      Unique identifier  in   optional. Set it and TenderReference is ignored.
//                                             Used by the process chain, not by the chat agent
//   LinesJson          Unlimited text     in   the Schedule Extractor output (whole envelope, or the lines array)
//   DocumentRevision   Text               in   the schedule's revision marker, for the summary sentence
//   InsertedCount      Integer            out  rows inserted this run
//   SkippedCount       Integer            out  lines already present (re-run safety)
//   CreateIfMissing    Boolean            in   default false. True only after a person has
//                                             confirmed the tender really is new
//   ResolvedOpportunity Text              out  the title of the opportunity actually written to
//   OpportunityCreated Boolean            out  true when this run created the tender
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
// "Corvina Quarter Stage 2", never a UUID, so OpportunityId is optional. When it is empty
// the tender is looked for in this order, stopping at the first stage that finds anything:
//   1. TenderCode, exact, against SPAITenderCode
//   2. TenderReference, exact, against SPAITenderCode (a person may type the code there)
//   3. TenderReference, exact, against Title
//   4. NEAR matches, never used silently: titles that equal or contain the reference once
//      both are normalised to lower-case letters and digits. The candidates go back to the
//      person to confirm, because a contains-match can land on the wrong tender ("Stage 2"
//      inside "Bellweather Court Stage 2B"). Normalising matters: a plain substring test let
//      "Bellweather Court, Stage 2" through as new beside "Bellweather Court Stage 2" and a
//      duplicate tender was created (live, 2026-09-27).
// Creating is refused outright when a tender with the same normalised title already exists,
// even after the person has confirmed: that is the same name, not a new tender.
// A wrong or misread TenderCode simply finds nothing at stage 1 and falls through to the
// title, so a garbled code cannot send lines to the wrong tender.
//
// Anything the PERSON can fix (no reference, no match, near or several matches) ends the
// process normally with the reason in RunSummary. It must not throw: a thrown exception puts
// the process in Error and the MCP tool hands the agent only a generic failure, so the agent
// cannot tell "no such tender" from "the system broke". Verified live 2026-09-27: the
// exception text reached the process log and never reached the chat.
// Only genuine system faults still throw.
Guid opportunityId = Get<Guid>("OpportunityId");
bool createdOpportunity = false;
Action<string> stopForPerson = reason => {
	Set("InsertedCount", 0);
	Set("SkippedCount", 0);
	Set("ResolvedOpportunity", "");
	Set("OpportunityCreated", false);
	Set("RunSummary", "Nothing was written. " + reason);
};
if (opportunityId == Guid.Empty) {
	string reference = (Get<string>("TenderReference") ?? "").Trim();
	string tenderCode = (Get<string>("TenderCode") ?? "").Trim();
	// A tender code is letters, digits and separators. Anything else is not a code the person
	// wrote: Creatio AI's PII masking turned "TND-2026-0777" into "TND-[PHONE]" before the model
	// saw it (verified live 2026-09-27). A masked code must never be looked up or saved, or two
	// tenders created from masked codes would share one and lines could land on the wrong one.
	foreach (char c in tenderCode) {
		if (!char.IsLetterOrDigit(c) && c != '-' && c != '/' && c != '.') {
			tenderCode = "";
			break;
		}
	}
	if (reference.Length == 0 && tenderCode.Length == 0) {
		stopForPerson("No tender was named. Ask the person which tender this schedule belongs to: a tender code such as TND-2026-0141, or the opportunity title.");
		return true;
	}
	string named = reference.Length > 0 ? reference : tenderCode;
	Guid parsedId;
	if (Guid.TryParse(reference, out parsedId)) {
		opportunityId = parsedId;
	} else {
		// A one-off lookup by Name, used for the stage and status below as well.
		Func<string, string, Guid> lookupByName = (schemaName, name) => {
			var nameEsq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
			nameEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
			nameEsq.Filters.Add(nameEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "Name", name));
			foreach (Entity hit in nameEsq.GetEntityCollection(uc)) {
				return hit.PrimaryColumnValue;
			}
			return Guid.Empty;
		};

		// One opportunity query per stage. Returns id -> title for every hit.
		Func<string, FilterComparisonType, string, Dictionary<Guid, string>> findOpportunities = (column, comparison, value) => {
			var hits = new Dictionary<Guid, string>();
			if (value.Length == 0) {
				return hits;
			}
			var oppEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Opportunity");
			oppEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
			string titleColumn = oppEsq.AddColumn("Title").Name;
			oppEsq.Filters.Add(oppEsq.CreateFilterWithParameters(comparison, column, value));
			foreach (Entity hit in oppEsq.GetEntityCollection(uc)) {
				hits[hit.PrimaryColumnValue] = hit.GetTypedColumnValue<string>(titleColumn);
			}
			return hits;
		};

		var matches = findOpportunities("SPAITenderCode", FilterComparisonType.Equal, tenderCode);
		if (matches.Count == 0) {
			matches = findOpportunities("SPAITenderCode", FilterComparisonType.Equal, reference);
		}
		if (matches.Count == 0) {
			matches = findOpportunities("Title", FilterComparisonType.Equal, reference);
		}
		bool createIfMissing = Get<bool>("CreateIfMissing");
		if (matches.Count == 0 && reference.Length > 0) {
			// Lower-case letters and digits only, so punctuation, spacing and case cannot hide a match.
			Func<string, string> normalise = value => {
				var kept = new System.Text.StringBuilder();
				foreach (char c in value ?? "") {
					if (char.IsLetterOrDigit(c)) {
						kept.Append(char.ToLowerInvariant(c));
					}
				}
				return kept.ToString();
			};
			string wanted = normalise(reference);
			// Candidates share the reference's longest word; the real comparison is normalised.
			string anchor = "";
			foreach (string word in reference.Split(new[] { ' ', ',', '-', '/', '.', '(', ')' }, StringSplitOptions.RemoveEmptyEntries)) {
				if (word.Length > anchor.Length) {
					anchor = word;
				}
			}
			var sameName = new List<string>();
			var near = new List<string>();
			if (wanted.Length > 0) {
				foreach (string title in findOpportunities("Title", FilterComparisonType.Contain, anchor).Values) {
					string have = normalise(title);
					if (have == wanted) {
						sameName.Add(title);
					} else if (have.Contains(wanted) || (have.Length > 0 && wanted.Contains(have))) {
						near.Add(title);
					}
				}
			}
			if (sameName.Count > 0) {
				// The same name written differently. Never a new tender, confirmed or not.
				stopForPerson("A tender with this name already exists: " + string.Join("; ", sameName) + ". Ask the person whether that is the one, then call again with its title exactly as shown.");
				return true;
			}
			if (near.Count > 0 && !createIfMissing) {
				// Near matches are only offered, never used. Skipped once the person has confirmed
				// the tender is new, or the confirmation could never get past this point.
				stopForPerson("No tender is titled exactly \"" + named + "\". Near matches: " + string.Join("; ", near) + ". Ask the person whether they meant one of these, then call again with its full title, or whether this is a new tender.");
				return true;
			}
		}

		if (matches.Count > 1) {
			stopForPerson("\"" + named + "\" matches " + matches.Count + " tenders: " + string.Join("; ", matches.Values) + ". Ask the person which one is meant, then call again with that tender's code or full title.");
			return true;
		}

		if (matches.Count == 1) {
			foreach (Guid only in matches.Keys) {
				opportunityId = only;
				break;
			}
		} else if (!createIfMissing) {
			// Default. A typo must not quietly become a second tender, so the caller is sent
			// back to the person to confirm before anything is created.
			stopForPerson("No tender matches \"" + named + "\". Ask the person whether the name is right, or whether this is a new tender. Call again with CreateIfMissing true only after they confirm it is new.");
			return true;
		} else {
			Guid stageId = lookupByName("OpportunityStage", "Qualification");
			if (stageId == Guid.Empty) {
				throw new Exception("Cannot create the tender: the Qualification opportunity stage was not found.");
			}
			// Title from the name the person used; code from TenderCode, or from the reference
			// when that is itself a code. Both are set when both are known.
			string newCode = tenderCode.Length > 0 ? tenderCode
				: (reference.StartsWith("TND-", StringComparison.OrdinalIgnoreCase) ? reference : "");
			var newOpp = uc.EntitySchemaManager.GetInstanceByName("Opportunity").CreateEntity(uc);
			newOpp.SetDefColumnValues();
			newOpp.SetColumnValue("Title", named);
			newOpp.SetColumnValue("StageId", stageId);
			newOpp.SetColumnValue("OwnerId", uc.CurrentUser.ContactId);
			if (newCode.Length > 0) {
				newOpp.SetColumnValue("SPAITenderCode", newCode);
			}
			Guid notStartedId = lookupByName("SPAIAdjudicationStatus", "Not started");
			if (notStartedId != Guid.Empty) {
				newOpp.SetColumnValue("SPAIAdjudicationStatusId", notStartedId);
			}
			newOpp.Save(false);
			opportunityId = newOpp.PrimaryColumnValue;
			createdOpportunity = true;
		}
	}
}
Set("OpportunityCreated", createdOpportunity);

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
	stopForPerson("No tender has the id " + opportunityId + ". Ask the person which tender this schedule belongs to.");
	return true;
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
	// The item ref is stored WITHOUT its ALT marker; the alternate flag and variant carry that,
	// and SPAIDisplayRef rebuilds "OVN-01 ALT RH" from the three. The extractor is told this
	// (rule 8) but does not always comply, so it is enforced here: on an alternate line, cut the
	// ref at a standalone "ALT" word. Transcription is untouched; only the split is enforced.
	bool isAlternate = line["isAlternate"] != null && line["isAlternate"].Type == JTokenType.Boolean && (bool)line["isAlternate"];
	string itemRef = text(line["itemRef"]);
	if (isAlternate) {
		string[] refWords = itemRef.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
		for (int w = 1; w < refWords.Length; w++) {
			if (string.Equals(refWords[w], "ALT", StringComparison.OrdinalIgnoreCase)) {
				itemRef = string.Join(" ", refWords, 0, w);
				break;
			}
		}
	}
	row.SetColumnValue("SPAIItemCode", itemRef);
	row.SetColumnValue("SPAIIsAlternative", isAlternate);
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
	"Inserted {0} schedule lines for {1}{2}, revision {3}. {4} already present.",
	inserted, opportunityTitle, createdOpportunity ? " (created by this run)" : "",
	Get<string>("DocumentRevision") ?? "(unstated)", skipped));
return true;
