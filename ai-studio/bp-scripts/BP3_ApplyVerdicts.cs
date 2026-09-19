// BP3 SPAIAdjudication, step 6: Script task "Apply verdicts"
// Paste the body below into the Script task. It is not a class file.
//
// The two validations 02 §4 calls "not optional", plus the requiresHuman rule decided 2026-09-20:
//   1. Closed set: selectedProductCode must be in the candidate set sent to the model AND must resolve to
//      a real Product. Otherwise the code is discarded and NO_EQUIVALENT is forced (02b rule 7).
//   2. Compliance floor re-verified from the database, independent of what the model claimed (02b rule 6).
//      A failure clears the product and forces COMPLIANCE_FAIL.
//   3. Final requiresHuman = model flag OR SPAIReasonCode.SPAIRequiresHuman OR any override above.
//      SPAIScheduleLine has no requiresHuman column, so the flag persists as SPAILineStatus = Escalated,
//      which the Gate 1 list filters on (02b rule 4).
// Every verdict writes a ledger row. A process override writes a second row of type Compliance rejection,
// so the model's proposal and the process's rejection are both on the record (02b rule 9).
//
// Process parameters:
//   OpportunityId              Unique identifier  in
//   VerdictsJson               Unlimited text     in   Adjudicator output (envelope or verdicts array)
//   CandidateProductCodesJson  Unlimited text     in   from BP3_BuildCandidateSet
//   UnresolvedLinesJson        Unlimited text     in   from BP3_BuildCandidateSet (regimes, specified ratings)
//   ResolvedCount              Integer            out  verdicts with a validated product and no escalation
//   EscalatedCount             Integer            out  lines whose final requiresHuman is true
//   OverrideCount              Integer            out  verdicts the process overrode
//
// Usings: System, System.Collections.Generic, System.Globalization, System.Linq, Newtonsoft.Json.Linq,
//         Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
JToken parsed = JToken.Parse(Get<string>("VerdictsJson") ?? "[]");
JArray verdicts = parsed is JObject ? (JArray)(parsed["verdicts"] ?? new JArray()) : (JArray)parsed;
var candidateCodes = new HashSet<string>(JArray.Parse(Get<string>("CandidateProductCodesJson") ?? "[]").Select(t => (string)t),
	StringComparer.Ordinal);
var lineContext = JArray.Parse(Get<string>("UnresolvedLinesJson") ?? "[]").OfType<JObject>()
	.ToDictionary(l => (int)l["lineNumber"], l => l);

// ---- Lookups ----
Func<string, string, Dictionary<string, Guid>> loadBy = (schemaName, column) => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string col = esq.AddColumn(column).Name;
	var map = new Dictionary<string, Guid>(StringComparer.OrdinalIgnoreCase);
	foreach (Entity e in esq.GetEntityCollection(uc)) {
		map[(e.GetTypedColumnValue<string>(col) ?? string.Empty).Trim()] = e.PrimaryColumnValue;
	}
	return map;
};
var lineStatus = loadBy("SPAILineStatus", "Name");
var decisionType = loadBy("SPAIDecisionType", "Name");
var reasonEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIReasonCode");
reasonEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string reasonCodeCol = reasonEsq.AddColumn("SPAICode").Name;
string reasonHumanCol = reasonEsq.AddColumn("SPAIRequiresHuman").Name;
var reasons = reasonEsq.GetEntityCollection(uc).ToDictionary(
	e => e.GetTypedColumnValue<string>(reasonCodeCol).Trim(),
	e => Tuple.Create(e.PrimaryColumnValue, e.GetTypedColumnValue<bool>(reasonHumanCol)),
	StringComparer.Ordinal);
var escalationCodes = new HashSet<string> { "AMBIGUOUS_SPEC", "DIM_MISMATCH", "COMPLIANCE_FAIL", "NO_EQUIVALENT" };

// ---- Pending lines of this opportunity, keyed by line number ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string numCol = lineEsq.AddColumn("SPAILineNumber").Name;
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILineStatus.Name", "Pending"));
var pendingIds = lineEsq.GetEntityCollection(uc).ToDictionary(e => e.GetTypedColumnValue<int>(numCol), e => e.PrimaryColumnValue);

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
EntitySchema productSchema = uc.EntitySchemaManager.GetInstanceByName("Product");
EntitySchema ledgerSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
Func<string, int, string> cut = (v, max) => v == null ? string.Empty : (v.Length <= max ? v : v.Substring(0, max));
Func<Guid, object> orNull = g => g == Guid.Empty ? null : (object)g;

Action<Guid, string, string, Guid, Guid, double, string, string, string, int> writeLedger =
	(lineId, actor, type, productId, reasonId, confidence, checks, prior, next, sequence) => {
		Entity row = ledgerSchema.CreateEntity(uc);
		row.SetDefColumnValues();
		row.SetColumnValue("SPAIOpportunityId", opportunityId);
		row.SetColumnValue("SPAIScheduleLineId", orNull(lineId));
		row.SetColumnValue("SPAIDecisionTypeId", decisionType[type]);
		row.SetColumnValue("SPAIActor", cut(actor, 250));
		row.SetColumnValue("SPAIProposedProductId", orNull(productId));
		row.SetColumnValue("SPAIReasonCodeId", orNull(reasonId));
		row.SetColumnValue("SPAIConfidence", confidence);
		row.SetColumnValue("SPAIComplianceChecks", checks);
		row.SetColumnValue("SPAIPriorValue", cut(prior, 250));
		row.SetColumnValue("SPAINewValue", cut(next, 250));
		row.SetColumnValue("SPAISequence", sequence);
		row.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
		row.Save(false);
	};

int resolved = 0, escalated = 0, overrides = 0;
var seen = new HashSet<int>();
foreach (JObject v in verdicts.OfType<JObject>()) {
	int n = v["lineNumber"] == null ? 0 : (int)v["lineNumber"];
	Guid lineId;
	if (!pendingIds.TryGetValue(n, out lineId) || !seen.Add(n)) {
		continue;  // not a pending line of this tender, or a duplicate verdict: never written
	}
	string modelCode = ((string)v["reasonCode"] ?? string.Empty).Trim();
	string code = modelCode;
	string selected = v["selectedProductCode"] == null || v["selectedProductCode"].Type == JTokenType.Null
		? string.Empty : ((string)v["selectedProductCode"]).Trim();
	double confidence = v["confidence"] == null ? 0d : double.Parse(v["confidence"].ToString(), CultureInfo.InvariantCulture);
	bool modelHuman = v["requiresHuman"] != null && v["requiresHuman"].Type == JTokenType.Boolean && (bool)v["requiresHuman"];
	var checks = new List<string>();
	string overrideReason = null;

	if (!reasons.ContainsKey(code) || code == "EXACT" || code == "MULTI_SOURCE") {
		overrideReason = "Unknown or non-adjudicator reason code '" + modelCode + "'";
		code = "NO_EQUIVALENT";
	}
	if (escalationCodes.Contains(code) && selected.Length > 0) {
		checks.Add("escalation code carries no product: '" + selected + "' discarded");
		selected = string.Empty;
	}

	Entity product = null;
	if (selected.Length > 0) {
		bool inSet = candidateCodes.Contains(selected);
		checks.Add("closed set: " + (inSet ? "PASS" : "FAIL"));
		product = productSchema.CreateEntity(uc);
		bool exists = inSet && product.FetchFromDB("Code", selected);
		checks.Add("product exists: " + (exists ? "PASS" : "FAIL"));
		if (!exists) {
			overrideReason = "Returned code '" + selected + "' is not in the supplied candidate set or not a Product (closed-set validation)";
			code = "NO_EQUIVALENT";
			product = null;
		}
	}

	JObject ctx;
	lineContext.TryGetValue(n, out ctx);
	if (product != null && ctx != null) {
		// Floor re-verification from the database record, not from the model's claims.
		JObject regime = (JObject)ctx["regimes"];
		JToken spec = ctx["specifiedProduct"];
		Func<string, decimal> dec = col => product.GetTypedColumnValue<decimal>(col);
		Func<string, bool> has = col => !string.IsNullOrWhiteSpace(product.GetTypedColumnValue<string>(col));
		decimal? specWels = spec != null && spec.Type == JTokenType.Object && spec["welsRating"].Type != JTokenType.Null ? (decimal?)spec["welsRating"] : null;
		decimal? specEnergy = spec != null && spec.Type == JTokenType.Object && spec["energyStarRating"].Type != JTokenType.Null ? (decimal?)spec["energyStarRating"] : null;
		var floor = new List<Tuple<string, bool>> {
			Tuple.Create(string.Format("cut-out {0}x{1}x{2} vs {3}x{4}x{5}",
				product.GetTypedColumnValue<int>("SPAICutoutWidthMm"), product.GetTypedColumnValue<int>("SPAICutoutHeightMm"),
				product.GetTypedColumnValue<int>("SPAICutoutDepthMm"), ctx["cutoutW"], ctx["cutoutH"], ctx["cutoutD"]),
				!(bool)regime["cutout"] || (product.GetTypedColumnValue<int>("SPAICutoutWidthMm") == (int)ctx["cutoutW"]
					&& product.GetTypedColumnValue<int>("SPAICutoutHeightMm") == (int)ctx["cutoutH"]
					&& product.GetTypedColumnValue<int>("SPAICutoutDepthMm") == (int)ctx["cutoutD"])),
			Tuple.Create("WELS", !(bool)regime["wels"] || (has("SPAIWelsRegistrationNo") && (!specWels.HasValue || dec("SPAIWELSRating") >= specWels.Value))),
			Tuple.Create("GEMS", !(bool)regime["gems"] || (has("SPAIGemsRegistrationNo") && (!specEnergy.HasValue || dec("SPAIEnergyStarRating") >= specEnergy.Value))),
			Tuple.Create("WaterMark", !(bool)regime["waterMark"] || has("SPAIWaterMarkCertNo")),
			Tuple.Create("project approved", product.GetTypedColumnValue<bool>("SPAIProjectApproved"))
		};
		var lifecycle = new EntitySchemaQuery(uc.EntitySchemaManager, "Product");
		string lifecycleCol = lifecycle.AddColumn("SPAILifecycleStatus.Name").Name;
		Entity lifecycleRow = lifecycle.GetEntity(uc, product.PrimaryColumnValue);
		floor.Add(Tuple.Create("lifecycle Current", lifecycleRow != null && lifecycleRow.GetTypedColumnValue<string>(lifecycleCol) == "Current"));
		checks.AddRange(floor.Select(f => f.Item1 + ": " + (f.Item2 ? "PASS" : "FAIL")));
		if (floor.Any(f => !f.Item2)) {
			overrideReason = "Compliance floor failed on re-verification: " + string.Join(", ", floor.Where(f => !f.Item2).Select(f => f.Item1));
			code = "COMPLIANCE_FAIL";
			product = null;
		}
	}

	var reason = reasons[code];
	bool finalHuman = modelHuman || reason.Item2 || overrideReason != null;
	checks.Add(string.Format("requiresHuman: model={0} lookup={1} override={2} final={3}",
		modelHuman, reason.Item2, overrideReason != null, finalHuman));
	string status = code == "NO_EQUIVALENT" ? "No match" : (finalHuman ? "Escalated" : "Substitution proposed");

	Entity line = lineSchema.CreateEntity(uc);
	line.FetchFromDB(lineId);
	string prior = "Pending";
	line.SetColumnValue("SPAIReasonCodeId", reason.Item1);
	line.SetColumnValue("SPAIConfidence", confidence);
	line.SetColumnValue("SPAIAdjudicationNote", (string)v["justification"] ?? string.Empty);
	line.SetColumnValue("SPAIComplianceNotes", string.Join(" ", new[] { (string)v["complianceNotes"] ?? string.Empty,
		overrideReason == null ? string.Empty : "Process override: " + overrideReason + "." }).Trim());
	line.SetColumnValue("SPAIResolvedBy", "Adjudicator");
	line.SetColumnValue("SPAILineStatusId", lineStatus[status]);
	if (product != null) {
		decimal sell = product.GetTypedColumnValue<decimal>("SPAITradeSellPrice");
		decimal cost = product.GetTypedColumnValue<decimal>("SPAIWholesaleCost");
		int qty = line.GetTypedColumnValue<int>("SPAIQuantity");
		line.SetColumnValue("SPAIMatchedProductId", product.PrimaryColumnValue);
		line.SetColumnValue("SPAIUnitCost", cost);
		line.SetColumnValue("SPAIUnitSell", sell);
		line.SetColumnValue("SPAILineTotal", sell * qty);
		line.SetColumnValue("SPAILineMarginPct", sell == 0m ? 0m : Math.Round((sell - cost) / sell * 100m, 1));
	}
	line.Save(false);

	Guid productId = product == null ? Guid.Empty : product.PrimaryColumnValue;
	string next = status + " | " + code + (product == null ? string.Empty : " | " + selected);
	Guid modelReasonId = reasons.ContainsKey(modelCode) ? reasons[modelCode].Item1 : Guid.Empty;
	writeLedger(lineId, "The Adjudicator (AI Studio)", "AI adjudication",
		overrideReason == null ? productId : Guid.Empty, overrideReason == null ? reason.Item1 : modelReasonId, confidence,
		string.Join("; ", checks), prior,
		overrideReason == null ? next : "Model proposed " + modelCode + (selected.Length > 0 ? " | " + selected : string.Empty), n);
	if (overrideReason != null) {
		overrides++;
		writeLedger(lineId, "BP3 SPAIAdjudication", "Compliance rejection", Guid.Empty, reason.Item1, confidence,
			overrideReason + ". " + string.Join("; ", checks), "Model proposed " + modelCode, next, n);
	}
	if (finalHuman) {
		escalated++;
	} else if (product != null) {
		resolved++;
	}
}

// Pending lines the model returned no verdict for: escalate, never leave silently pending.
foreach (var kv in pendingIds.Where(kv => !seen.Contains(kv.Key))) {
	Entity line = lineSchema.CreateEntity(uc);
	line.FetchFromDB(kv.Value);
	line.SetColumnValue("SPAILineStatusId", lineStatus["Escalated"]);
	line.SetColumnValue("SPAIResolvedBy", "Adjudicator");
	line.SetColumnValue("SPAIComplianceNotes", "Process override: the Adjudicator returned no verdict for this line.");
	line.Save(false);
	writeLedger(kv.Value, "BP3 SPAIAdjudication", "Compliance rejection", Guid.Empty, Guid.Empty, 0d,
		"No verdict returned for line " + kv.Key + "; escalated to Gate 1.", "Pending", "Escalated", kv.Key);
	escalated++;
	overrides++;
}

Set("ResolvedCount", resolved);
Set("EscalatedCount", escalated);
Set("OverrideCount", overrides);
return true;
