// BP3 SPAIAdjudication, step 3: Script task "Build network stock"
// Paste the body below into the Script task. It is not a class file.
//
// Serialises stock by location for the candidate products only (never the whole catalogue).
// Only locations flagged SPAILocation.SPAIIsAvailable = true are sent. That is the same availability
// signal BP7 SPAIConstraintChange reacts to. Rows with nothing available and nothing inbound are dropped.
//
// Process parameters:
//   CandidateProductCodesJson  Unlimited text  in   from BP3_BuildCandidateSet
//   UnresolvedLinesJson        Unlimited text  in   from BP3_BuildCandidateSet
//   CandidateProductsJson      Unlimited text  in   from BP3_BuildCandidateSet
//   SubstitutionRulesJson      Unlimited text  in   from BP3_BuildCandidateSet
//   PolicyContextJson          Unlimited text  in   from BP3_BuildCandidateSet
//   NetworkStockJson           Unlimited text  out  -> Adjudicator input networkStock
//   AdjudicatorRequestJson     Unlimited text  out  all five inputs in one object, for an invocation
//                                                   element that takes a single message (02a Step 0, R1)
//
// Usings (METHODS > Usings): exactly the five rows BP1 compiles with, ONE namespace per row:
//   System / System.Collections.Generic / Newtonsoft.Json.Linq / Terrasoft.Core / Terrasoft.Core.Entities
// NO System.Linq. Plain loops only.
//
// Columns verified against the live instance (clio, 2026-09-27). Compile-checked against stub types.

var uc = Get<UserConnection>("UserConnection");
var codeList = new List<object>();
foreach (JToken t in JArray.Parse(Get<string>("CandidateProductCodesJson") ?? "[]")) {
	codeList.Add((string)t);
}
object[] codes = codeList.ToArray();
var stock = new JArray();
if (codes.Length > 0) {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIStockPosition");
	var c = new Dictionary<string, string>();
	foreach (string column in new[] { "SPAIProduct.Code", "SPAILocation.SPAICode", "SPAILocation.SPAIName",
			"SPAILocation.SPAILocationType.Name", "SPAILocation.SPAISourcingRank", "SPAIQtyOnHand", "SPAIQtyAvailable",
			"SPAINextInboundQty", "SPAINextInboundDate" }) {
		c[column] = esq.AddColumn(column).Name;
	}
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProduct.Code", codes));
	esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILocation.SPAIIsAvailable", true));
	var rows = new List<Entity>();
	foreach (Entity e in esq.GetEntityCollection(uc)) {
		rows.Add(e);
	}
	// Product code, then sourcing rank: a stable order for the model and the trace.
	rows.Sort((a, b) => {
		int cmp = string.CompareOrdinal(a.GetTypedColumnValue<string>(c["SPAIProduct.Code"]),
			b.GetTypedColumnValue<string>(c["SPAIProduct.Code"]));
		return cmp != 0 ? cmp : a.GetTypedColumnValue<int>(c["SPAILocation.SPAISourcingRank"])
			.CompareTo(b.GetTypedColumnValue<int>(c["SPAILocation.SPAISourcingRank"]));
	});
	foreach (Entity e in rows) {
		// Gap 3 (token spend): a row with nothing available and nothing inbound cannot change a decision.
		if (e.GetTypedColumnValue<int>(c["SPAIQtyAvailable"]) <= 0 && e.GetTypedColumnValue<int>(c["SPAINextInboundQty"]) <= 0) {
			continue;
		}
		DateTime inbound = e.GetTypedColumnValue<DateTime>(c["SPAINextInboundDate"]);
		stock.Add(new JObject {
			["productCode"] = e.GetTypedColumnValue<string>(c["SPAIProduct.Code"]),
			["locationCode"] = e.GetTypedColumnValue<string>(c["SPAILocation.SPAICode"]),
			["locationName"] = e.GetTypedColumnValue<string>(c["SPAILocation.SPAIName"]),
			["locationType"] = e.GetTypedColumnValue<string>(c["SPAILocation.SPAILocationType.Name"]),
			["sourcingRank"] = e.GetTypedColumnValue<int>(c["SPAILocation.SPAISourcingRank"]),
			["qtyOnHand"] = e.GetTypedColumnValue<int>(c["SPAIQtyOnHand"]),
			["qtyAvailable"] = e.GetTypedColumnValue<int>(c["SPAIQtyAvailable"]),
			["nextInboundQty"] = e.GetTypedColumnValue<int>(c["SPAINextInboundQty"]),
			["nextInboundDate"] = inbound == DateTime.MinValue ? string.Empty : inbound.ToString("yyyy-MM-dd")
		});
	}
}
Set("NetworkStockJson", stock.ToString(Newtonsoft.Json.Formatting.None));
Func<string, JToken> part = name => JToken.Parse(Get<string>(name) ?? "null");
Set("AdjudicatorRequestJson", new JObject {
	["unresolvedLines"] = part("UnresolvedLinesJson"),
	["candidateProducts"] = part("CandidateProductsJson"),
	["substitutionRules"] = part("SubstitutionRulesJson"),
	["networkStock"] = stock,
	["policyContext"] = part("PolicyContextJson")
}.ToString(Newtonsoft.Json.Formatting.None));
return true;
