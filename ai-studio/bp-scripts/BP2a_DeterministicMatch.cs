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
// Process parameters:
//   OpportunityId    Unique identifier  in
//   MatchedCount     Integer            out  lines that resolved and passed the floor
//   FloorFailCount   Integer            out  lines that resolved and failed
//   UnresolvedCount  Integer            out  lines whose model code did not resolve
//
// Usings: System, System.Collections.Generic, System.Linq, Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

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
	return esq.GetEntityCollection(uc).ToDictionary(
		e => (e.GetTypedColumnValue<string>(nameColumn) ?? string.Empty).Trim(),
		e => e.PrimaryColumnValue, StringComparer.OrdinalIgnoreCase);
};
var decisionType = loadByName("SPAIDecisionType");
var reasonEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIReasonCode");
reasonEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string reasonCodeCol = reasonEsq.AddColumn("SPAICode").Name;
var reasons = reasonEsq.GetEntityCollection(uc).ToDictionary(
	e => e.GetTypedColumnValue<string>(reasonCodeCol).Trim(), e => e.PrimaryColumnValue, StringComparer.Ordinal);

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
var lines = lineEsq.GetEntityCollection(uc).ToList();

// ---- Specified products, by model code ----
var modelCodes = lines.Select(l => (l.GetTypedColumnValue<string>(lc["SPAISpecifiedModel"]) ?? string.Empty).Trim())
	.Where(m => m.Length > 0).Distinct().Cast<object>().ToArray();
var products = new Dictionary<string, Entity>(StringComparer.OrdinalIgnoreCase);
if (modelCodes.Length > 0) {
	var pEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "Product");
	pEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
	foreach (string c in new[] { "Code", "SPAIModelCode", "SPAIProductFamily.Name", "SPAILifecycleStatus.Name",
			"SPAIProjectApproved", "SPAICutoutWidthMm", "SPAICutoutHeightMm", "SPAICutoutDepthMm",
			"SPAIWelsRegistrationNo", "SPAIGemsRegistrationNo", "SPAIWaterMarkCertNo", "SPAILeadTimeWeeks",
			"SPAITradeSellPrice", "SPAIWholesaleCost" }) {
		pEsq.AddColumn(c);
	}
	pEsq.Filters.Add(pEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIModelCode", modelCodes));
	foreach (Entity p in pEsq.GetEntityCollection(uc)) {
		string code = (p.GetTypedColumnValue<string>("SPAIModelCode") ?? string.Empty).Trim();
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
	string family = p.GetTypedColumnValue<string>("SPAIProductFamily.Name") ?? string.Empty;
	bool[] r;
	if (!regimes.TryGetValue(family, out r)) {
		r = new[] { true, true, true, true };  // unknown family: every regime applies
	}
	int w = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutW"]);
	int h = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutH"]);
	int d = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutD"]);
	Func<string, bool> has = c => !string.IsNullOrWhiteSpace(p.GetTypedColumnValue<string>(c));
	var floor = new List<Tuple<string, bool>> {
		Tuple.Create("lifecycle Current", p.GetTypedColumnValue<string>("SPAILifecycleStatus.Name") == "Current"),
		Tuple.Create("project approved", p.GetTypedColumnValue<bool>("SPAIProjectApproved")),
		Tuple.Create(string.Format("cut-out {0}x{1}x{2} vs specified {3}x{4}x{5}",
			p.GetTypedColumnValue<int>("SPAICutoutWidthMm"), p.GetTypedColumnValue<int>("SPAICutoutHeightMm"),
			p.GetTypedColumnValue<int>("SPAICutoutDepthMm"), w, h, d),
			!r[0] || (p.GetTypedColumnValue<int>("SPAICutoutWidthMm") == w
				&& p.GetTypedColumnValue<int>("SPAICutoutHeightMm") == h
				&& p.GetTypedColumnValue<int>("SPAICutoutDepthMm") == d)),
		Tuple.Create("WELS registration", !r[1] || has("SPAIWelsRegistrationNo")),
		Tuple.Create("GEMS registration", !r[2] || has("SPAIGemsRegistrationNo")),
		Tuple.Create("WaterMark certificate", !r[3] || has("SPAIWaterMarkCertNo"))
	};
	// The specified product IS the specification, so there is no rating comparison to make here.
	// Ratings are compared against it in BP3, where a DIFFERENT product is proposed.
	string checks = string.Join("; ", floor.Select(f => f.Item1 + ": " + (f.Item2 ? "PASS" : "FAIL")));
	Entity row = lineSchema.CreateEntity(uc);
	row.FetchFromDB(line.PrimaryColumnValue);
	if (floor.All(f => f.Item2)) {
		decimal sell = p.GetTypedColumnValue<decimal>("SPAITradeSellPrice");
		decimal cost = p.GetTypedColumnValue<decimal>("SPAIWholesaleCost");
		int qty = line.GetTypedColumnValue<int>(lc["SPAIQuantity"]);
		row.SetColumnValue("SPAIMatchedProductId", p.PrimaryColumnValue);
		row.SetColumnValue("SPAIUnitCost", cost);
		row.SetColumnValue("SPAIUnitSell", sell);
		row.SetColumnValue("SPAILineTotal", sell * qty);
		row.SetColumnValue("SPAILineMarginPct", sell == 0m ? 0m : Math.Round((sell - cost) / sell * 100m, 1));
		row.SetColumnValue("SPAIResolvedBy", "Deterministic");
		row.Save(false);  // status stays Pending: BP2b decides Exact match vs multi-location vs shortfall
		writeLedger(line.PrimaryColumnValue, "Deterministic match", p.PrimaryColumnValue, Guid.Empty, checks,
			"Pending", "Matched " + p.GetTypedColumnValue<string>("Code"), n);
		matched++;
	} else {
		row.SetColumnValue("SPAIReasonCodeId", reasons["COMPLIANCE_FAIL"]);
		row.SetColumnValue("SPAIComplianceNotes", string.Join(" ", new[] {
			line.GetTypedColumnValue<string>(lc["SPAIComplianceNotes"]) ?? string.Empty,
			"Specified product fails the compliance floor: "
				+ string.Join(", ", floor.Where(f => !f.Item2).Select(f => f.Item1)) + "." }).Trim());
		row.Save(false);
		writeLedger(line.PrimaryColumnValue, "Compliance rejection", Guid.Empty, reasons["COMPLIANCE_FAIL"], checks,
			"Pending", "COMPLIANCE_FAIL on the specified product", n);
		floorFail++;
	}
}
Set("MatchedCount", matched);
Set("FloorFailCount", floorFail);
Set("UnresolvedCount", unresolved);
return true;
