// BP2a SPAIDeterministicMatch, step 2: Script task "Match and apply the compliance floor"
// Paste the body below into the Script task. It is not a class file.
//
// Zero AI. For every Pending line of the tender: resolve the specified model code against Product,
// then apply the compliance floor (Governance Block 2, regimes from KS2 §7). Nothing here proposes a
// substitute: a line that fails is left for BP3 to adjudicate or escalate.
//
//   resolved + floor passed -> SPAIMatchedProduct set, status stays Pending, ledger "Deterministic match"
//   resolved + floor failed -> SPAIReasonCode = COMPLIANCE_FAIL, ledger "Compliance rejection", Pending
//   not resolved            -> untouched, Pending (the Adjudicator will see it)
//
// 01 §9 described this as a multi-instance sub-process per line. One script over the collection is the
// same logic with one element: Read data in collection mode cannot be built by clio and a per-line
// sub-process is fragile (02 §4 makes the same call for BP1 step 5).
//
// Process shape (D6, 2026-09-27): Simple start -> this Script task -> Sub-process BP2b -> End.
// A simple start, not a record signal, so BP1 or a person can call it as a sub-process. This
// script also writes the Opportunity itself (SPAIDeterministicCount, status Sourcing when there was work), which
// replaces 02c's separate Read data and Modify data elements.
//
// Process parameters:
//   OpportunityId    Unique identifier  in
//   ProjectState     Text               out  Opportunity.SPAIProjectState, mapped into BP2b
//   MatchedCount     Integer            out  lines that resolved and passed the floor this run
//   FloorFailCount   Integer            out  lines that resolved and failed this run
//   UnresolvedCount  Integer            out  lines whose model code did not resolve
//
// Safe to re-run: a line that already has a matched product or a reason code was decided on an
// earlier run and is skipped, so nothing is rewritten and no ledger row is duplicated.
//
// Usings (METHODS > Usings): exactly the five rows BP1 compiles with, ONE namespace per row:
//   System / System.Collections.Generic / Newtonsoft.Json.Linq / Terrasoft.Core / Terrasoft.Core.Entities
// NO System.Linq, and this script uses no LINQ (plain loops instead). A System.Linq row made BP2b fail
// at generated line 11 with CS1002/CS1022/CS0116 on 2026-09-27, the same signature as a malformed
// row; removing the dependency removed the variable. Same choice BP1 made.
//
// Columns and lookup values verified against the live instance (clio, 2026-09-27).
// Compile-checked against stub types; not yet executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");

// KS2 §7 Combined eligibility matrix: cut-out, WELS, GEMS, WaterMark. Keep identical to
// BP3_BuildCandidateSet.cs, ai-studio/tests/score_adjudication.py and tools/import/verify.py (four places).
var regimes = new Dictionary<string, bool[]>(StringComparer.OrdinalIgnoreCase) {
	{ "Wall Oven",          new[] { true,  false, true,  false } },
	{ "Cooktop",            new[] { true,  false, true,  false } },
	{ "Dishwasher",         new[] { true,  true,  true,  false } },
	{ "Rangehood",          new[] { true,  false, false, false } },
	{ "Microwave",          new[] { true,  false, false, false } },
	{ "Basin",              new[] { false, false, false, true  } },
	{ "Toilet Suite",       new[] { false, true,  false, true  } },
	{ "Basin Mixer",        new[] { false, true,  false, true  } },
	{ "Shower Set",         new[] { false, true,  false, true  } },
	{ "Kitchen Sink Mixer", new[] { false, true,  false, true  } }
};

Func<string, Dictionary<string, Guid>> loadByName = schemaName => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string nameColumn = esq.AddColumn("Name").Name;
	var map = new Dictionary<string, Guid>(StringComparer.OrdinalIgnoreCase);
	foreach (Entity e in esq.GetEntityCollection(uc)) {
		map[(e.GetTypedColumnValue<string>(nameColumn) ?? string.Empty).Trim()] = e.PrimaryColumnValue;
	}
	return map;
};
var decisionType = loadByName("SPAIDecisionType");
var reasonEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIReasonCode");
reasonEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string reasonCodeCol = reasonEsq.AddColumn("SPAICode").Name;
var reasons = new Dictionary<string, Guid>(StringComparer.Ordinal);
foreach (Entity e in reasonEsq.GetEntityCollection(uc)) {
	reasons[(e.GetTypedColumnValue<string>(reasonCodeCol) ?? string.Empty).Trim()] = e.PrimaryColumnValue;
}

// ---- Pending lines ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var lc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAILineNumber", "SPAISpecifiedModel", "SPAIRequiredCutoutW", "SPAIRequiredCutoutH",
		"SPAIRequiredCutoutD", "SPAIQuantity", "SPAIComplianceNotes" }) {
	lc[c] = lineEsq.AddColumn(c).Name;
}
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILineStatus.Name", "Pending"));
// Already decided on an earlier run: leave alone.
lineEsq.Filters.Add(lineEsq.CreateIsNullFilter("SPAIMatchedProduct"));
lineEsq.Filters.Add(lineEsq.CreateIsNullFilter("SPAIReasonCode"));
var lines = new List<Entity>();
foreach (Entity pending in lineEsq.GetEntityCollection(uc)) {
	lines.Add(pending);
}

// ---- Specified products, by model code ----
var modelCodeSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
foreach (Entity l in lines) {
	string m = (l.GetTypedColumnValue<string>(lc["SPAISpecifiedModel"]) ?? string.Empty).Trim();
	if (m.Length > 0) {
		modelCodeSet.Add(m);
	}
}
var modelCodeList = new List<object>();
foreach (string m in modelCodeSet) {
	modelCodeList.Add(m);
}
object[] modelCodes = modelCodeList.ToArray();
var products = new Dictionary<string, Entity>(StringComparer.OrdinalIgnoreCase);
var pc = new Dictionary<string, string>();
if (modelCodes.Length > 0) {
	var pEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Product");
	pEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
	// Read every value through the name the query assigned. A column reached through a lookup
	// ("SPAIProductFamily.Name") is NOT readable by its dotted path.
	foreach (string c in new[] { "Code", "SPAIModelCode", "SPAIProductFamily.Name", "SPAILifecycleStatus.Name",
			"SPAIProjectApproved", "SPAICutoutWidthMm", "SPAICutoutHeightMm", "SPAICutoutDepthMm",
			"SPAIWelsRegistrationNo", "SPAIGemsRegistrationNo", "SPAIWaterMarkCertNo", "SPAILeadTimeWeeks",
			"SPAITradeSellPrice", "SPAIWholesaleCost" }) {
		pc[c] = pEsq.AddColumn(c).Name;
	}
	pEsq.Filters.Add(pEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIModelCode", modelCodes));
	foreach (Entity p in pEsq.GetEntityCollection(uc)) {
		string code = (p.GetTypedColumnValue<string>(pc["SPAIModelCode"]) ?? string.Empty).Trim();
		if (code.Length > 0 && !products.ContainsKey(code)) {
			products[code] = p;
		}
	}
}

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
EntitySchema ledgerSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
Func<string, int, string> cut = (v, max) => v == null ? string.Empty : (v.Length <= max ? v : v.Substring(0, max));
Action<Guid, string, Guid, Guid, string, string, string, int> writeLedger =
	(lineId, type, productId, reasonId, checks, prior, next, sequence) => {
		Entity row = ledgerSchema.CreateEntity(uc);
		row.SetDefColumnValues();
		row.SetColumnValue("SPAIOpportunityId", opportunityId);
		row.SetColumnValue("SPAIScheduleLineId", lineId);
		row.SetColumnValue("SPAIDecisionTypeId", decisionType[type]);
		row.SetColumnValue("SPAIActor", "BP2a SPAIDeterministicMatch");
		if (productId != Guid.Empty) {
			row.SetColumnValue("SPAIProposedProductId", productId);
		}
		if (reasonId != Guid.Empty) {
			row.SetColumnValue("SPAIReasonCodeId", reasonId);
		}
		row.SetColumnValue("SPAIComplianceChecks", checks);
		row.SetColumnValue("SPAIPriorValue", cut(prior, 250));
		row.SetColumnValue("SPAINewValue", cut(next, 250));
		row.SetColumnValue("SPAISequence", sequence);
		row.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
		row.Save(false);
	};

int matched = 0, floorFail = 0, unresolved = 0;
foreach (Entity line in lines) {
	int n = line.GetTypedColumnValue<int>(lc["SPAILineNumber"]);
	string model = (line.GetTypedColumnValue<string>(lc["SPAISpecifiedModel"]) ?? string.Empty).Trim();
	Entity p;
	if (model.Length == 0 || !products.TryGetValue(model, out p)) {
		unresolved++;
		continue;  // typo, or no model code at all: the Adjudicator's problem, not ours
	}
	string family = p.GetTypedColumnValue<string>(pc["SPAIProductFamily.Name"]) ?? string.Empty;
	bool[] r;
	if (!regimes.TryGetValue(family, out r)) {
		r = new[] { true, true, true, true };  // unknown family: every regime applies
	}
	int w = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutW"]);
	int h = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutH"]);
	int d = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutD"]);
	// Each check records WHAT WAS FOUND, and "n/a" when the regime does not apply to the family, so an
	// auditor can tell "checked and passed" from "not applicable" (live run 2026-09-27 logged a wall
	// oven's WELS check as PASS, and a discontinued product as "fails: lifecycle Current").
	// The specified product IS the specification, so there is no rating comparison to make here.
	// Ratings are compared against it in BP3, where a DIFFERENT product is proposed.
	string familyText = family.Length > 0 ? family : "this product family";
	var checkParts = new List<string>();
	var failedParts = new List<string>();
	Action<string, bool, string, string> check = (rule, passed, found, failure) => {
		checkParts.Add(rule + ": " + (passed ? "PASS" : "FAIL") + " (" + (passed ? found : failure) + ")");
		if (!passed) {
			failedParts.Add(rule + " " + failure);
		}
	};
	Action<string, string> notApplicable = (rule, why) => checkParts.Add(rule + ": n/a (" + why + ")");
	Func<string, string> text = c => (p.GetTypedColumnValue<string>(pc[c]) ?? string.Empty).Trim();

	string lifecycle = text("SPAILifecycleStatus.Name");
	check("lifecycle", lifecycle == "Current", "Current",
		"is " + (lifecycle.Length > 0 ? lifecycle : "not set") + ", must be Current");
	check("project approval", p.GetTypedColumnValue<bool>(pc["SPAIProjectApproved"]), "approved",
		"not given");
	int pw = p.GetTypedColumnValue<int>(pc["SPAICutoutWidthMm"]);
	int ph = p.GetTypedColumnValue<int>(pc["SPAICutoutHeightMm"]);
	int pd = p.GetTypedColumnValue<int>(pc["SPAICutoutDepthMm"]);
	if (r[0]) {
		string productCut = string.Format("{0}x{1}x{2}", pw, ph, pd);
		check("cut-out", pw == w && ph == h && pd == d, productCut + " matches specified",
			string.Format("{0} does not match specified {1}x{2}x{3}", productCut, w, h, d));
	} else {
		notApplicable("cut-out", familyText + " has no cut-out rule");
	}
	string wels = text("SPAIWelsRegistrationNo");
	if (r[1]) {
		check("WELS", wels.Length > 0, "registered " + wels, "not registered");
	} else {
		notApplicable("WELS", familyText + " is not WELS-regulated");
	}
	string gems = text("SPAIGemsRegistrationNo");
	if (r[2]) {
		check("GEMS", gems.Length > 0, "registered " + gems, "not registered");
	} else {
		notApplicable("GEMS", familyText + " is not GEMS-regulated");
	}
	string waterMark = text("SPAIWaterMarkCertNo");
	if (r[3]) {
		check("WaterMark", waterMark.Length > 0, "certificate " + waterMark, "certificate missing");
	} else {
		notApplicable("WaterMark", familyText + " does not need WaterMark");
	}
	string checks = string.Join("; ", checkParts);
	Entity row = lineSchema.CreateEntity(uc);
	row.FetchFromDB(line.PrimaryColumnValue);
	if (failedParts.Count == 0) {
		decimal sell = p.GetTypedColumnValue<decimal>(pc["SPAITradeSellPrice"]);
		decimal cost = p.GetTypedColumnValue<decimal>(pc["SPAIWholesaleCost"]);
		int qty = line.GetTypedColumnValue<int>(lc["SPAIQuantity"]);
		row.SetColumnValue("SPAIMatchedProductId", p.PrimaryColumnValue);
		row.SetColumnValue("SPAIUnitCost", cost);
		row.SetColumnValue("SPAIUnitSell", sell);
		row.SetColumnValue("SPAILineTotal", sell * qty);
		row.SetColumnValue("SPAILineMarginPct", sell == 0m ? 0m : Math.Round((sell - cost) / sell * 100m, 1));
		row.SetColumnValue("SPAIResolvedBy", "Deterministic");
		row.Save(false);  // status stays Pending: BP2b decides Exact match vs multi-location vs shortfall
		writeLedger(line.PrimaryColumnValue, "Deterministic match", p.PrimaryColumnValue, Guid.Empty, checks,
			"Pending", "Matched " + p.GetTypedColumnValue<string>(pc["Code"]), n);
		matched++;
	} else {
		row.SetColumnValue("SPAIReasonCodeId", reasons["COMPLIANCE_FAIL"]);
		row.SetColumnValue("SPAIComplianceNotes", string.Join(" ", new[] {
			line.GetTypedColumnValue<string>(lc["SPAIComplianceNotes"]) ?? string.Empty,
			"Specified product fails the compliance floor: "
				+ string.Join("; ", failedParts) + "." }).Trim());
		row.Save(false);
		writeLedger(line.PrimaryColumnValue, "Compliance rejection", Guid.Empty, reasons["COMPLIANCE_FAIL"], checks,
			"Pending", "COMPLIANCE_FAIL on the specified product", n);
		floorFail++;
	}
}
// The Opportunity: resolved-without-AI total across every run, the state for BP2b, status Sourcing.
var totalEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
totalEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
totalEsq.Filters.Add(totalEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
totalEsq.Filters.Add(totalEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIResolvedBy", "Deterministic"));
int deterministicTotal = totalEsq.GetEntityCollection(uc).Count;
Entity opportunity = uc.EntitySchemaManager.GetInstanceByName("Opportunity").CreateEntity(uc);
string projectState = string.Empty;
if (opportunity.FetchFromDB(opportunityId)) {
	projectState = (opportunity.GetTypedColumnValue<string>("SPAIProjectState") ?? string.Empty).Trim();
	opportunity.SetColumnValue("SPAIDeterministicCount", deterministicTotal);
	// Status moves to Sourcing only when this run had open lines to work on, and never pulls back a tender
	// that is already past Gate 1: re-running intake to fetch a proposal must not undo a submission or award.
	var statusByName = loadByName("SPAIAdjudicationStatus");
	Guid currentStatus = opportunity.GetTypedColumnValue<Guid>("SPAIAdjudicationStatusId");
	bool advanced = false;
	foreach (string later in new[] { "Awaiting Gate 2", "Submitted", "Awarded", "Re-adjudicating" }) {
		if (statusByName.ContainsKey(later) && currentStatus == statusByName[later]) {
			advanced = true;
		}
	}
	if (!advanced && matched + floorFail + unresolved > 0) {
		opportunity.SetColumnValue("SPAIAdjudicationStatusId", statusByName["Sourcing"]);
	}
	opportunity.Save(false);
}
Set("ProjectState", projectState);
Set("MatchedCount", matched);
Set("FloorFailCount", floorFail);
Set("UnresolvedCount", unresolved);
return true;
