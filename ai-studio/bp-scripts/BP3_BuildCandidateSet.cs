// BP3 SPAIAdjudication, step 2: Script task "Build candidate set"
// Paste the body below into the Script task. It is not a class file.
//
// This is where the compliance floor is evaluated DETERMINISTICALLY, before any candidate reaches
// the model (Governance Block 2; 02b rule 5). The model receives only products that passed the floor
// for at least one pending line, pre-ordered by compliance, then availability, then finish. Margin
// is sent as a display field and is never a sort key (02b rule 16).
//
// Which lines: every line of the tender still Pending. That includes lines BP2a could not resolve,
// lines whose specified product failed the floor (reason COMPLIANCE_FAIL, e.g. a discontinued model),
// and matched lines BP2b could not fully source (shortfall). Lines already adjudicated are no longer
// Pending, so a re-run sends only what is still open.
//
// CLAIM (2026-09-29): BP1 now runs this process in the background, and the chat may call intake again while an
// assessment is still running. So the lines taken here are claimed first (SPAIResolvedBy = "Adjudicating"); a
// line claimed less than 15 minutes ago is left to the run that claimed it, so no line is ever sent to the model
// twice. Apply verdicts overwrites the claim. A claim older than 15 minutes (a failed run) is taken again.
// Empty path: never lowers SPAIAiCallCount, and moves the tender to Awaiting Gate 1 only when it is still in
// Sourcing or Adjudicating and no other run is assessing lines.
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
// Usings (METHODS > Usings): exactly the five rows BP1 compiles with, ONE namespace per row:
//   System / System.Collections.Generic / Newtonsoft.Json.Linq / Terrasoft.Core / Terrasoft.Core.Entities
// NO System.Linq (a System.Linq row broke the compile at generated line 11, 2026-09-27). This script
// uses plain loops; Newtonsoft.Json.Formatting is written out in full.
//
// Contract: ai-studio/skills/spai-adjudicator/references/input-contract.md
// Columns verified against the live instance (clio, 2026-09-27). Compile-checked against stub types.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
const int CandidateCap = 60;
const int LeadTimeLimitWeeks = 12;

// ---- Regime matrix: KS2 section 7 "Combined eligibility matrix", transcribed. ----
// Columns: cut-out, WELS, GEMS, WaterMark. Project approved and lifecycle Current apply to all families.
// The SAME table is in BP2a_DeterministicMatch.cs, BP3_ApplyVerdicts.cs, ai-studio/tests/score_adjudication.py
// and tools/import/verify.py. If KS2 section 7 changes, they all move together.
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

// ---- 1. Pending lines, in line order ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var lc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAILineNumber", "SPAIItemCode", "SPAIIsAlternative", "SPAIRoomType.Name", "SPAIUnitTier.Name",
		"SPAISpecifiedText", "SPAISpecifiedBrand", "SPAISpecifiedModel", "SPAISpecifiedFinish", "SPAIQuantity",
		"SPAIRequiredCutoutW", "SPAIRequiredCutoutH", "SPAIRequiredCutoutD", "SPAIScheduleNotes", "SPAIResolvedBy", "ModifiedOn" }) {
	lc[c] = lineEsq.AddColumn(c).Name;
}
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILineStatus.Name", "Pending"));
var lines = new List<Entity>();
int claimedElsewhere = 0;
DateTime claimCutoff = uc.CurrentUser.GetCurrentDateTime().AddMinutes(-15);
foreach (Entity pending in lineEsq.GetEntityCollection(uc)) {
	bool claimed = (pending.GetTypedColumnValue<string>(lc["SPAIResolvedBy"]) ?? string.Empty).Trim() == "Adjudicating"
		&& pending.GetTypedColumnValue<DateTime>(lc["ModifiedOn"]) > claimCutoff;
	if (claimed) {
		claimedElsewhere++;
		continue;
	}
	lines.Add(pending);
}
// Claim what this run will send, before anything else happens.
EntitySchema claimSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
foreach (Entity pending in lines) {
	Entity claim = claimSchema.CreateEntity(uc);
	if (claim.FetchFromDB(pending.PrimaryColumnValue)) {
		claim.SetColumnValue("SPAIResolvedBy", "Adjudicating");
		claim.Save(false);
	}
}
lines.Sort((a, b) => a.GetTypedColumnValue<int>(lc["SPAILineNumber"]).CompareTo(b.GetTypedColumnValue<int>(lc["SPAILineNumber"])));
Set("PendingLineCount", lines.Count);
if (lines.Count == 0) {
	// Nothing to adjudicate: no AI call is made (the gateway after this task skips it). The Opportunity moves on
	// here only if nothing else is being assessed, and the AI call count is never lowered.
	Entity opportunity = uc.EntitySchemaManager.GetInstanceByName("Opportunity").CreateEntity(uc);
	if (claimedElsewhere == 0 && opportunity.FetchFromDB(opportunityId)) {
		var statusByName = new Dictionary<string, Guid>(StringComparer.OrdinalIgnoreCase);
		var statusEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIAdjudicationStatus");
		statusEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
		string statusNameCol = statusEsq.AddColumn("Name").Name;
		foreach (Entity status in statusEsq.GetEntityCollection(uc)) {
			statusByName[(status.GetTypedColumnValue<string>(statusNameCol) ?? string.Empty).Trim()] = status.PrimaryColumnValue;
		}
		Guid current = opportunity.GetTypedColumnValue<Guid>("SPAIAdjudicationStatusId");
		if ((statusByName.ContainsKey("Sourcing") && current == statusByName["Sourcing"])
				|| (statusByName.ContainsKey("Adjudicating") && current == statusByName["Adjudicating"])) {
			opportunity.SetColumnValue("SPAIAdjudicationStatusId", statusByName["Awaiting Gate 1"]);
		}
		if (opportunity.GetTypedColumnValue<int>("SPAIAiCallCount") < 1) {
			opportunity.SetColumnValue("SPAIAiCallCount", 1);  // the extraction only; adjudication was not needed
		}
		opportunity.Save(false);
	}
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
	var map = new Dictionary<string, string>();
	foreach (string c in productColumns) {
		map[c] = esq.AddColumn(c).Name;
	}
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
var modelCodeSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
foreach (Entity line in lines) {
	string m = str(line, lc["SPAISpecifiedModel"]);
	if (m.Length > 0) {
		modelCodeSet.Add(m);
	}
}
var modelCodeList = new List<object>();
foreach (string m in modelCodeSet) {
	modelCodeList.Add(m);
}
object[] modelCodes = modelCodeList.ToArray();
var specified = modelCodes.Length == 0 ? new List<Dictionary<string, object>>() : loadProducts(esq =>
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIModelCode", modelCodes)));
var specifiedByModel = new Dictionary<string, Dictionary<string, object>>(StringComparer.OrdinalIgnoreCase);
foreach (var p in specified) {
	string m = ps(p, "SPAIModelCode");
	if (m.Length > 0 && !specifiedByModel.ContainsKey(m)) {
		specifiedByModel[m] = p;
	}
}

// ---- 4. Family per line: specified product, else "Family as written" note, else family name in the text ----
var familyNames = new List<string>(regimes.Keys);
familyNames.Sort((a, b) => b.Length.CompareTo(a.Length));  // longest first: "Basin Mixer" before "Basin"
Func<Entity, string> familyOf = line => {
	Dictionary<string, object> sp;
	if (specifiedByModel.TryGetValue(str(line, lc["SPAISpecifiedModel"]), out sp) && ps(sp, "SPAIProductFamily.Name").Length > 0) {
		return ps(sp, "SPAIProductFamily.Name");
	}
	string haystack = str(line, lc["SPAIScheduleNotes"]) + " " + str(line, lc["SPAISpecifiedText"]);
	foreach (string f in familyNames) {
		if (haystack.IndexOf(f, StringComparison.OrdinalIgnoreCase) >= 0) {
			return f;
		}
	}
	return string.Empty;
};
var lineFamily = new Dictionary<int, string>();
var familySet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
foreach (Entity line in lines) {
	string f = familyOf(line);
	lineFamily[line.GetTypedColumnValue<int>(lc["SPAILineNumber"])] = f;
	if (f.Length > 0) {
		familySet.Add(f);
	}
}

// ---- 5. Candidate pool: families in play, lifecycle Current, project approved ----
var familyList = new List<object>();
foreach (string f in familySet) {
	familyList.Add(f);
}
object[] families = familyList.ToArray();
var pool = families.Length == 0 ? new List<Dictionary<string, object>>() : loadProducts(esq => {
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProductFamily.Name", families));
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILifecycleStatus.Name", "Current"));
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProjectApproved", true));
});

// ---- 6. Network availability for pool + specified products (available locations only) ----
var stockProductSet = new HashSet<Guid>();
foreach (var p in pool) {
	stockProductSet.Add((Guid)p["Id"]);
}
foreach (var p in specified) {
	stockProductSet.Add((Guid)p["Id"]);
}
var stockProductList = new List<object>();
foreach (Guid id in stockProductSet) {
	stockProductList.Add(id);
}
object[] stockProductIds = stockProductList.ToArray();
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
var lineNumbers = new List<int>();
var unresolved = new JArray();
foreach (Entity line in lines) {
	int n = line.GetTypedColumnValue<int>(lc["SPAILineNumber"]);
	lineNumbers.Add(n);
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

	var familyPool = new List<Dictionary<string, object>>();
	foreach (var p in pool) {
		if (string.Equals(ps(p, "SPAIProductFamily.Name"), family, StringComparison.OrdinalIgnoreCase)) {
			familyPool.Add(p);
		}
	}
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
	// Pre-rank: compliance headroom, then availability within lead time, then availability, then finish
	// match, then product code for a stable order. Margin is NOT an input.
	Func<Dictionary<string, object>, decimal> headroom = p =>
		(specWels.HasValue ? (pd(p, "SPAIWELSRating") ?? 0m) - specWels.Value : 0m)
		+ (specEnergy.HasValue ? (pd(p, "SPAIEnergyStarRating") ?? 0m) - specEnergy.Value : 0m);
	Func<Dictionary<string, object>, bool> inTime = p => stockOf(p) >= qty && pi(p, "SPAILeadTimeWeeks") <= LeadTimeLimitWeeks;
	Func<Dictionary<string, object>, bool> inStock = p => stockOf(p) >= qty;
	Func<Dictionary<string, object>, bool> finishMatch = p => string.Equals(ps(p, "SPAIFinish.Name"), finish, StringComparison.OrdinalIgnoreCase);
	eligible.Sort((a, b) => {
		int cmp = headroom(b).CompareTo(headroom(a));
		if (cmp == 0) { cmp = inTime(b).CompareTo(inTime(a)); }
		if (cmp == 0) { cmp = inStock(b).CompareTo(inStock(a)); }
		if (cmp == 0) { cmp = finishMatch(b).CompareTo(finishMatch(a)); }
		if (cmp == 0) { cmp = string.CompareOrdinal(ps(a, "Code"), ps(b, "Code")); }
		return cmp;
	});
	eligibleByLine[n] = eligible;

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
lineNumbers.Sort();
// Pre-rank position (1-based) of a product code on a line, or 0 when it is not eligible there.
Func<int, string, int> rankOn = (n, code) => {
	var list = eligibleByLine[n];
	for (int i = 0; i < list.Count; i++) {
		if (ps(list[i], "Code") == code) {
			return i + 1;
		}
	}
	return 0;
};

// ---- 8. Substitution rules for the specified products; their eligible targets are always kept ----
var specifiedIdList = new List<object>();
foreach (var p in specified) {
	specifiedIdList.Add(p["Id"]);
}
object[] specifiedIds = specifiedIdList.ToArray();
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
		var targetLines = new JArray();
		foreach (int n in lineNumbers) {
			if (rankOn(n, to) > 0) {
				targetLines.Add(n);
			}
		}
		if (targetLines.Count > 0) {
			forced.Add(to);
		}
		rules.Add(new JObject {
			["ruleCode"] = str(rule, codeCol), ["fromProductCode"] = str(rule, fromCol), ["toProductCode"] = to,
			["equivalenceBasis"] = str(rule, basisCol), ["finishMatch"] = rule.GetTypedColumnValue<bool>(finishCol),
			["targetEligibleForLines"] = targetLines
		});
	}
}

// ---- 9. Cap at 60: rule targets first, then round-robin by pre-rank so every line keeps its best ----
var selected = new List<string>(forced);
selected.Sort(StringComparer.Ordinal);
var selectedSet = new HashSet<string>(selected, StringComparer.Ordinal);
int depth = 0;
while (selected.Count < CandidateCap) {
	bool anyLeft = false;
	foreach (int n in lineNumbers) {
		var list = eligibleByLine[n];
		if (list.Count <= depth) {
			continue;
		}
		anyLeft = true;
		string code = ps(list[depth], "Code");
		if (selected.Count < CandidateCap && !selectedSet.Contains(code)) {
			selected.Add(code);
			selectedSet.Add(code);
		}
	}
	if (!anyLeft) {
		break;
	}
	depth++;
}
var byCode = new Dictionary<string, Dictionary<string, object>>(StringComparer.Ordinal);
foreach (var p in pool) {
	string code = ps(p, "Code");
	if (!byCode.ContainsKey(code)) {
		byCode[code] = p;
	}
}
Func<decimal?, JToken> num = v => v.HasValue ? (JToken)v.Value : JValue.CreateNull();
var candidates = new List<JObject>();
var bestRank = new Dictionary<string, int>(StringComparer.Ordinal);
foreach (string code in selected) {
	var p = byCode[code];
	decimal sell = p["SPAITradeSellPrice"] == null ? 0m : Convert.ToDecimal(p["SPAITradeSellPrice"]);
	decimal cost = p["SPAIWholesaleCost"] == null ? 0m : Convert.ToDecimal(p["SPAIWholesaleCost"]);
	var eligibleLines = new JArray();
	int best = int.MaxValue;
	foreach (int n in lineNumbers) {
		int rank = rankOn(n, code);
		if (rank > 0) {
			eligibleLines.Add(new JObject { ["lineNumber"] = n, ["preRank"] = rank });
			if (rank < best) {
				best = rank;
			}
		}
	}
	bestRank[code] = best;
	candidates.Add(new JObject {
		["productCode"] = code, ["name"] = ps(p, "Name"), ["modelCode"] = ps(p, "SPAIModelCode"), ["brand"] = ps(p, "SPAIBrand.Name"),
		["productFamily"] = ps(p, "SPAIProductFamily.Name"), ["lifecycleStatus"] = ps(p, "SPAILifecycleStatus.Name"),
		["projectApproved"] = true,
		["cutoutW"] = pi(p, "SPAICutoutWidthMm"), ["cutoutH"] = pi(p, "SPAICutoutHeightMm"), ["cutoutD"] = pi(p, "SPAICutoutDepthMm"),
		["welsRegistrationNo"] = ps(p, "SPAIWelsRegistrationNo"), ["welsRating"] = num(pd(p, "SPAIWELSRating")),
		["gemsRegistrationNo"] = ps(p, "SPAIGemsRegistrationNo"), ["energyStarRating"] = num(pd(p, "SPAIEnergyStarRating")),
		["waterMarkCertNo"] = ps(p, "SPAIWaterMarkCertNo"), ["finish"] = ps(p, "SPAIFinish.Name"),
		["leadTimeWeeks"] = pi(p, "SPAILeadTimeWeeks"),
		// Disclosed for the human reviewer. Never a sort key here, never a ranking input for the model.
		["marginPct"] = sell == 0m ? (JToken)JValue.CreateNull() : Math.Round((sell - cost) / sell * 100m, 1),
		["eligibleLines"] = eligibleLines
	});
}
candidates.Sort((a, b) => {
	int cmp = bestRank[(string)a["productCode"]].CompareTo(bestRank[(string)b["productCode"]]);
	return cmp != 0 ? cmp : string.CompareOrdinal((string)a["productCode"], (string)b["productCode"]);
});

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
