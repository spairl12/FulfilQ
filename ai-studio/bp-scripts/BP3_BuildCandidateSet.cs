// BP3 SPAIAdjudication, step 2 (and step 4): Script task "Build candidate set"
// Paste the body below into the Script task. It is not a class file.
//
// This is where the compliance floor is evaluated DETERMINISTICALLY, before any candidate reaches
// the model (Governance Block 2; 02b rule 5). The model receives only products that passed the floor
// for at least one pending line, pre-ordered by compliance, then availability, then finish. Margin
// is sent as a display field and is never a sort key (02b rule 16).
//
// Process parameters:
//   OpportunityId             Unique identifier  in
//   UnresolvedLinesJson       Unlimited text     out  -> Adjudicator input unresolvedLines
//   CandidateProductsJson     Unlimited text     out  -> Adjudicator input candidateProducts (cap 60)
//   SubstitutionRulesJson     Unlimited text     out  -> Adjudicator input substitutionRules
//   PolicyContextJson         Unlimited text     out  -> Adjudicator input policyContext
//   CandidateProductCodesJson Unlimited text     out  -> BP3_BuildNetworkStock input
//   PendingLineCount          Integer            out  -> gateway: 0 means skip the AI call
//
// Usings: System, System.Collections.Generic, System.Linq, Newtonsoft.Json, Newtonsoft.Json.Linq,
//         Terrasoft.Core, Terrasoft.Core.Entities
//
// Contract: ai-studio/skills/spai-adjudicator/references/input-contract.md
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
const int CandidateCap = 60;
const int LeadTimeLimitWeeks = 12;

// ---- Regime matrix: KS2 section 7 "Combined eligibility matrix", transcribed. ONE place to change. ----
// Columns: cut-out, WELS, GEMS, WaterMark. Project approved and lifecycle Current apply to all families.
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

Func<Entity, string, string> str = (e, c) => (e.GetTypedColumnValue<string>(c) ?? string.Empty).Trim();

// ---- 1. Pending lines ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
var lc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAILineNumber", "SPAIItemCode", "SPAIIsAlternative", "SPAIRoomType.Name", "SPAIUnitTier.Name",
		"SPAISpecifiedText", "SPAISpecifiedBrand", "SPAISpecifiedModel", "SPAISpecifiedFinish", "SPAIQuantity",
		"SPAIRequiredCutoutW", "SPAIRequiredCutoutH", "SPAIRequiredCutoutD", "SPAIScheduleNotes" }) {
	lc[c] = lineEsq.AddColumn(c).Name;
}
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILineStatus.Name", "Pending"));
var lines = lineEsq.GetEntityCollection(uc).OrderBy(e => e.GetTypedColumnValue<int>(lc["SPAILineNumber"])).ToList();
Set("PendingLineCount", lines.Count);
if (lines.Count == 0) {
	Set("UnresolvedLinesJson", "[]");
	Set("CandidateProductsJson", "[]");
	Set("SubstitutionRulesJson", "[]");
	Set("CandidateProductCodesJson", "[]");
	Set("PolicyContextJson", "{}");
	return true;
}

// ---- 2. Product loader (shared by specified-product and candidate queries) ----
var productColumns = new[] { "Code", "Name", "SPAIModelCode", "SPAIBrand.Name", "SPAIProductFamily.Name", "SPAILifecycleStatus.Name",
	"SPAIProjectApproved", "SPAICutoutWidthMm", "SPAICutoutHeightMm", "SPAICutoutDepthMm", "SPAIWelsRegistrationNo",
	"SPAIWELSRating", "SPAIGemsRegistrationNo", "SPAIEnergyStarRating", "SPAIWaterMarkCertNo", "SPAIFinish.Name",
	"SPAILeadTimeWeeks", "SPAITradeSellPrice", "SPAIWholesaleCost", "SPAISupersededBy.Code" };
Func<Action<EntitySchemaQuery>, List<Dictionary<string, object>>> loadProducts = addFilters => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, "Product");
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	var map = productColumns.ToDictionary(c => c, c => esq.AddColumn(c).Name);
	addFilters(esq);
	var result = new List<Dictionary<string, object>>();
	foreach (Entity e in esq.GetEntityCollection(uc)) {
		var p = new Dictionary<string, object> { { "Id", e.PrimaryColumnValue } };
		foreach (var kv in map) {
			p[kv.Key] = e.GetColumnValue(kv.Value);
		}
		result.Add(p);
	}
	return result;
};
Func<Dictionary<string, object>, string, string> ps = (p, c) => p[c] == null ? string.Empty : p[c].ToString().Trim();
Func<Dictionary<string, object>, string, int> pi = (p, c) => p[c] == null ? 0 : Convert.ToInt32(p[c]);
Func<Dictionary<string, object>, string, decimal?> pd = (p, c) => p[c] == null || Convert.ToDecimal(p[c]) == 0m ? (decimal?)null : Convert.ToDecimal(p[c]);

// ---- 3. Specified products (resolved by model code; typos and ambiguous lines resolve to none) ----
var modelCodes = lines.Select(l => str(l, lc["SPAISpecifiedModel"])).Where(m => m.Length > 0).Distinct().ToArray();
var specified = modelCodes.Length == 0 ? new List<Dictionary<string, object>>() : loadProducts(esq =>
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIModelCode", modelCodes.Cast<object>().ToArray())));
var specifiedByModel = specified.GroupBy(p => ps(p, "SPAIModelCode"), StringComparer.OrdinalIgnoreCase)
	.ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

// ---- 4. Family per line: specified product, else "Family as written" note, else family name in the text ----
var familyNames = regimes.Keys.OrderByDescending(f => f.Length).ToList();
Func<Entity, string> familyOf = line => {
	Dictionary<string, object> sp;
	if (specifiedByModel.TryGetValue(str(line, lc["SPAISpecifiedModel"]), out sp) && ps(sp, "SPAIProductFamily.Name").Length > 0) {
		return ps(sp, "SPAIProductFamily.Name");
	}
	string haystack = str(line, lc["SPAIScheduleNotes"]) + " " + str(line, lc["SPAISpecifiedText"]);
	return familyNames.FirstOrDefault(f => haystack.IndexOf(f, StringComparison.OrdinalIgnoreCase) >= 0) ?? string.Empty;
};
var lineFamily = lines.ToDictionary(l => l.GetTypedColumnValue<int>(lc["SPAILineNumber"]), familyOf);

// ---- 5. Candidate pool: families in play, lifecycle Current, project approved ----
var families = lineFamily.Values.Where(f => f.Length > 0).Distinct().ToArray();
var pool = families.Length == 0 ? new List<Dictionary<string, object>>() : loadProducts(esq => {
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProductFamily.Name", families.Cast<object>().ToArray()));
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILifecycleStatus.Name", "Current"));
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProjectApproved", true));
});

// ---- 6. Network availability for pool + specified products (available locations only) ----
var stockProductIds = pool.Concat(specified).Select(p => (object)p["Id"]).Distinct().ToArray();
var available = new Dictionary<Guid, int>();
if (stockProductIds.Length > 0) {
	var stockEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIStockPosition");
	string productCol = stockEsq.AddColumn("SPAIProduct").Name;
	string qtyCol = stockEsq.AddColumn("SPAIQtyAvailable").Name;
	stockEsq.Filters.Add(stockEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProduct", stockProductIds));
	stockEsq.Filters.Add(stockEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILocation.SPAIIsAvailable", true));
	foreach (Entity s in stockEsq.GetEntityCollection(uc)) {
		Guid id = s.GetTypedColumnValue<Guid>(productCol + "Id");
		available[id] = (available.ContainsKey(id) ? available[id] : 0) + s.GetTypedColumnValue<int>(qtyCol);
	}
}
Func<Dictionary<string, object>, int> stockOf = p => available.ContainsKey((Guid)p["Id"]) ? available[(Guid)p["Id"]] : 0;

// ---- 7. Floor per (line, product), diagnostics, and the deterministic pre-rank ----
var eligibleByLine = new Dictionary<int, List<Dictionary<string, object>>>();
var unresolved = new JArray();
foreach (Entity line in lines) {
	int n = line.GetTypedColumnValue<int>(lc["SPAILineNumber"]);
	string family = lineFamily[n];
	bool[] r;
	if (!regimes.TryGetValue(family, out r)) {
		r = new[] { true, true, true, true };  // unknown family: every regime applies, nothing can slip through
	}
	int w = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutW"]);
	int h = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutH"]);
	int d = line.GetTypedColumnValue<int>(lc["SPAIRequiredCutoutD"]);
	int qty = line.GetTypedColumnValue<int>(lc["SPAIQuantity"]);
	string finish = str(line, lc["SPAISpecifiedFinish"]);
	Dictionary<string, object> sp;
	specifiedByModel.TryGetValue(str(line, lc["SPAISpecifiedModel"]), out sp);
	decimal? specWels = sp == null ? null : pd(sp, "SPAIWELSRating");
	decimal? specEnergy = sp == null ? null : pd(sp, "SPAIEnergyStarRating");

	var familyPool = pool.Where(p => string.Equals(ps(p, "SPAIProductFamily.Name"), family, StringComparison.OrdinalIgnoreCase)).ToList();
	int cutoutFit = 0, cutoutFitFloorFail = 0;
	var eligible = new List<Dictionary<string, object>>();
	foreach (var p in familyPool) {
		bool fits = !r[0] || (pi(p, "SPAICutoutWidthMm") == w && pi(p, "SPAICutoutHeightMm") == h && pi(p, "SPAICutoutDepthMm") == d);
		if (!fits) {
			continue;
		}
		cutoutFit++;
		bool wels = !r[1] || (ps(p, "SPAIWelsRegistrationNo").Length > 0 && (specWels == null || (pd(p, "SPAIWELSRating") ?? 0m) >= specWels));
		bool gems = !r[2] || (ps(p, "SPAIGemsRegistrationNo").Length > 0 && (specEnergy == null || (pd(p, "SPAIEnergyStarRating") ?? 0m) >= specEnergy));
		bool waterMark = !r[3] || ps(p, "SPAIWaterMarkCertNo").Length > 0;
		if (wels && gems && waterMark) {
			eligible.Add(p);
		} else {
			cutoutFitFloorFail++;
		}
	}
	// Pre-rank: compliance headroom, then availability, then finish match. Margin is not an input.
	var ranked = eligible.OrderByDescending(p => (specWels.HasValue ? (pd(p, "SPAIWELSRating") ?? 0m) - specWels.Value : 0m)
			+ (specEnergy.HasValue ? (pd(p, "SPAIEnergyStarRating") ?? 0m) - specEnergy.Value : 0m))
		.ThenByDescending(p => stockOf(p) >= qty && pi(p, "SPAILeadTimeWeeks") <= LeadTimeLimitWeeks)
		.ThenByDescending(p => stockOf(p) >= qty)
		.ThenByDescending(p => string.Equals(ps(p, "SPAIFinish.Name"), finish, StringComparison.OrdinalIgnoreCase))
		.ThenBy(p => ps(p, "Code"), StringComparer.Ordinal)
		.ToList();
	eligibleByLine[n] = ranked;

	unresolved.Add(new JObject {
		["lineNumber"] = n,
		["itemRef"] = str(line, lc["SPAIItemCode"]),
		["isAlternate"] = line.GetTypedColumnValue<bool>(lc["SPAIIsAlternative"]),
		["productFamily"] = family,
		["roomType"] = str(line, lc["SPAIRoomType.Name"]),
		["unitTier"] = str(line, lc["SPAIUnitTier.Name"]),
		["specifiedText"] = str(line, lc["SPAISpecifiedText"]),
		["specifiedBrand"] = str(line, lc["SPAISpecifiedBrand"]),
		["specifiedModel"] = str(line, lc["SPAISpecifiedModel"]),
		["specifiedFinish"] = finish,
		["quantity"] = qty,
		["cutoutW"] = w, ["cutoutH"] = h, ["cutoutD"] = d,
		["notes"] = str(line, lc["SPAIScheduleNotes"]),
		["regimes"] = new JObject { ["cutout"] = r[0], ["wels"] = r[1], ["gems"] = r[2], ["waterMark"] = r[3] },
		["specifiedProduct"] = sp == null ? (JToken)JValue.CreateNull() : new JObject {
			["productCode"] = ps(sp, "Code"),
			["lifecycleStatus"] = ps(sp, "SPAILifecycleStatus.Name"),
			["supersededByCode"] = ps(sp, "SPAISupersededBy.Code"),
			["leadTimeWeeks"] = pi(sp, "SPAILeadTimeWeeks"),
			["welsRating"] = specWels.HasValue ? (JToken)specWels.Value : JValue.CreateNull(),
			["energyStarRating"] = specEnergy.HasValue ? (JToken)specEnergy.Value : JValue.CreateNull(),
			["networkQtyAvailable"] = stockOf(sp)
		},
		["floorDiagnostics"] = new JObject {
			["familyCandidates"] = familyPool.Count, ["cutoutFit"] = cutoutFit,
			["cutoutFitFloorFail"] = cutoutFitFloorFail, ["eligible"] = eligible.Count
		}
	});
}

// ---- 8. Substitution rules for the specified products; their eligible targets are always kept ----
var specifiedIds = specified.Select(p => (object)p["Id"]).ToArray();
var rules = new JArray();
var forced = new HashSet<string>(StringComparer.Ordinal);
if (specifiedIds.Length > 0) {
	var ruleEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAISubstitutionRule");
	string codeCol = ruleEsq.AddColumn("SPAIRuleCode").Name;
	string fromCol = ruleEsq.AddColumn("SPAIFromProduct.Code").Name;
	string toCol = ruleEsq.AddColumn("SPAIToProduct.Code").Name;
	string basisCol = ruleEsq.AddColumn("SPAIEquivalenceBasis").Name;
	string finishCol = ruleEsq.AddColumn("SPAIFinishMatch").Name;
	ruleEsq.Filters.Add(ruleEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIFromProduct", specifiedIds));
	ruleEsq.Filters.Add(ruleEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIIsActive", true));
	foreach (Entity rule in ruleEsq.GetEntityCollection(uc)) {
		string to = str(rule, toCol);
		var targetLines = eligibleByLine.Where(kv => kv.Value.Any(p => ps(p, "Code") == to)).Select(kv => kv.Key).OrderBy(x => x).ToList();
		if (targetLines.Count > 0) {
			forced.Add(to);
		}
		rules.Add(new JObject {
			["ruleCode"] = str(rule, codeCol), ["fromProductCode"] = str(rule, fromCol), ["toProductCode"] = to,
			["equivalenceBasis"] = str(rule, basisCol), ["finishMatch"] = rule.GetTypedColumnValue<bool>(finishCol),
			["targetEligibleForLines"] = new JArray(targetLines)
		});
	}
}

// ---- 9. Cap at 60: rule targets first, then round-robin by pre-rank so every line keeps its best ----
var selected = new List<string>(forced.OrderBy(x => x, StringComparer.Ordinal));
int depth = 0;
while (selected.Count < CandidateCap && eligibleByLine.Values.Any(l => l.Count > depth)) {
	foreach (var kv in eligibleByLine.OrderBy(k => k.Key)) {
		if (kv.Value.Count > depth && selected.Count < CandidateCap && !selected.Contains(ps(kv.Value[depth], "Code"))) {
			selected.Add(ps(kv.Value[depth], "Code"));
		}
	}
	depth++;
}
var byCode = pool.GroupBy(p => ps(p, "Code")).ToDictionary(g => g.Key, g => g.First());
Func<decimal?, JToken> num = v => v.HasValue ? (JToken)v.Value : JValue.CreateNull();
var candidates = selected.Select(code => {
	var p = byCode[code];
	decimal sell = p["SPAITradeSellPrice"] == null ? 0m : Convert.ToDecimal(p["SPAITradeSellPrice"]);
	decimal cost = p["SPAIWholesaleCost"] == null ? 0m : Convert.ToDecimal(p["SPAIWholesaleCost"]);
	var eligibleLines = new JArray(eligibleByLine.Where(kv => kv.Value.Any(x => ps(x, "Code") == code)).OrderBy(kv => kv.Key)
		.Select(kv => new JObject { ["lineNumber"] = kv.Key, ["preRank"] = kv.Value.FindIndex(x => ps(x, "Code") == code) + 1 }));
	return new JObject {
		["productCode"] = code, ["name"] = ps(p, "Name"), ["modelCode"] = ps(p, "SPAIModelCode"), ["brand"] = ps(p, "SPAIBrand.Name"),
		["productFamily"] = ps(p, "SPAIProductFamily.Name"), ["lifecycleStatus"] = ps(p, "SPAILifecycleStatus.Name"),
		["projectApproved"] = true,
		["cutoutW"] = pi(p, "SPAICutoutWidthMm"), ["cutoutH"] = pi(p, "SPAICutoutHeightMm"), ["cutoutD"] = pi(p, "SPAICutoutDepthMm"),
		["welsRegistrationNo"] = ps(p, "SPAIWelsRegistrationNo"), ["welsRating"] = num(pd(p, "SPAIWELSRating")),
		["gemsRegistrationNo"] = ps(p, "SPAIGemsRegistrationNo"), ["energyStarRating"] = num(pd(p, "SPAIEnergyStarRating")),
		["waterMarkCertNo"] = ps(p, "SPAIWaterMarkCertNo"), ["finish"] = ps(p, "SPAIFinish.Name"),
		["leadTimeWeeks"] = pi(p, "SPAILeadTimeWeeks"),
		["marginPct"] = sell == 0m ? (JToken)JValue.CreateNull() : Math.Round((sell - cost) / sell * 100m, 1),
		["eligibleLines"] = eligibleLines
	};
})
	.OrderBy(c => c["eligibleLines"].Any() ? c["eligibleLines"].Min(x => (int)x["preRank"]) : int.MaxValue)
	.ThenBy(c => (string)c["productCode"], StringComparer.Ordinal)
	.ToList();

Set("UnresolvedLinesJson", unresolved.ToString(Newtonsoft.Json.Formatting.None));
Set("CandidateProductsJson", new JArray(candidates).ToString(Newtonsoft.Json.Formatting.None));
Set("SubstitutionRulesJson", rules.ToString(Newtonsoft.Json.Formatting.None));
Set("CandidateProductCodesJson", new JArray(selected).ToString(Newtonsoft.Json.Formatting.None));
Set("PolicyContextJson", new JObject {
	["policy"] = "Meridian Substitution Governance Policy v1.0 (knowledge source KS1)",
	["leadTimeLimitWeeks"] = LeadTimeLimitWeeks,
	["candidateCap"] = CandidateCap,
	["regimeSource"] = "KS2 Regulatory Compliance Reference, section 7"
}.ToString(Newtonsoft.Json.Formatting.None));
return true;
