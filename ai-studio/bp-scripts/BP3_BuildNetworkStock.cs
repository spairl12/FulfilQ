// BP3 SPAIAdjudication, step 3: Script task "Build network stock"
// Paste the body below into the Script task. It is not a class file.
//
// Serialises stock by location for the candidate products only (never the whole catalogue).
// Only locations flagged SPAILocation.SPAIIsAvailable = true are sent. That is the same availability
// signal BP7 SPAIConstraintChange reacts to.
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
// Usings: System, System.Collections.Generic, System.Linq, Newtonsoft.Json, Newtonsoft.Json.Linq,
//         Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
var codes = JArray.Parse(Get<string>("CandidateProductCodesJson") ?? "[]").Select(t => (object)(string)t).ToArray();
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
	var rows = esq.GetEntityCollection(uc)
		.OrderBy(e => e.GetTypedColumnValue<string>(c["SPAIProduct.Code"]), StringComparer.Ordinal)
		.ThenBy(e => e.GetTypedColumnValue<int>(c["SPAILocation.SPAISourcingRank"]));
	foreach (Entity e in rows) {
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
