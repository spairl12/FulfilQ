// BP2b SPAISourcingCascade, step 2: Script task "Allocate across the network"
// Paste the body below into the Script task. It is not a class file.
//
// Zero AI. For every line that BP2a matched (SPAIMatchedProduct set, status Pending), allocate the order
// quantity across the network in tier order and write one SPAILineSource row per contributing location:
//
//   Tier 1  Home DC        SPAILocation of type Distribution Centre in the project's state
//   Tier 2  Other DCs      remaining DCs, by SPAISourcingRank
//   Tier 3  Retail stores   by SPAISourcingRank   <- the fallback that makes the demo
//   Tier 4  Inbound supply  SPAINextInboundQty arriving before the earliest delivery event
//
// Change 4 of 04_Foundation_Change_Spec (the soft-check relabel) governs this step:
// every row is written as SPAISourcePlanType = Indicative and SPAIStockPosition.SPAIQtyAllocated is
// NEVER written here. An unawarded tender encumbers nothing. BP8 converts to Committed on award.
//
// Process parameters:
//   OpportunityId      Unique identifier  in
//   ProjectState       Text               in   Opportunity.SPAIProjectState or the account's state; blank
//                                              means no home DC and tier 1 is skipped
//   FilledCount        Integer            out  lines filled from one location  (Exact match / EXACT)
//   MultiSourceCount   Integer            out  lines filled from several       (Sourced multi-location / MULTI_SOURCE)
//   ShortfallCount     Integer            out  lines left Pending with SPAIQtyShortfall set
//
// Usings: System, System.Collections.Generic, System.Linq, Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
string projectState = (Get<string>("ProjectState") ?? string.Empty).Trim();

Func<string, Dictionary<string, Guid>> loadByName = schemaName => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string nameColumn = esq.AddColumn("Name").Name;
	return esq.GetEntityCollection(uc).ToDictionary(
		e => (e.GetTypedColumnValue<string>(nameColumn) ?? string.Empty).Trim(),
		e => e.PrimaryColumnValue, StringComparer.OrdinalIgnoreCase);
};
var lineStatus = loadByName("SPAILineStatus");
var decisionType = loadByName("SPAIDecisionType");
var sourceTier = loadByName("SPAISourceTier");
var planType = loadByName("SPAISourcePlanType");
var reasonEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIReasonCode");
reasonEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string reasonCodeCol = reasonEsq.AddColumn("SPAICode").Name;
var reasons = reasonEsq.GetEntityCollection(uc).ToDictionary(
	e => e.GetTypedColumnValue<string>(reasonCodeCol).Trim(), e => e.PrimaryColumnValue, StringComparer.Ordinal);

// ---- The earliest delivery event of this tender's programme bounds tier 4 ----
DateTime inboundCutoff = DateTime.MaxValue;
var eventEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIDeliveryEvent");
string schedOnCol = eventEsq.AddColumn("SPAIScheduledOn").Name;
eventEsq.Filters.Add(eventEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAICallUpSchedule.SPAIOpportunity", opportunityId));
foreach (Entity e in eventEsq.GetEntityCollection(uc)) {
	DateTime scheduled = e.GetTypedColumnValue<DateTime>(schedOnCol);
	if (scheduled != DateTime.MinValue && scheduled < inboundCutoff) {
		inboundCutoff = scheduled;
	}
}

// ---- Lines to source: matched by BP2a, still Pending, not yet sourced ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string numCol = lineEsq.AddColumn("SPAILineNumber").Name;
string qtyCol = lineEsq.AddColumn("SPAIQuantity").Name;
string productCol = lineEsq.AddColumn("SPAIMatchedProduct").Name;
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILineStatus.Name", "Pending"));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.IsNotNull, "SPAIMatchedProduct"));
var lines = lineEsq.GetEntityCollection(uc).ToList();

// ---- Stock for those products, at available locations, ordered by tier then sourcing rank ----
var productIds = lines.Select(l => (object)l.GetTypedColumnValue<Guid>(productCol + "Id")).Distinct().ToArray();
var stock = new List<Dictionary<string, object>>();
if (productIds.Length > 0) {
	var sEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIStockPosition");
	var sc = new Dictionary<string, string>();
	foreach (string c in new[] { "SPAIProduct", "SPAILocation", "SPAILocation.SPAILocationType.Name",
			"SPAILocation.SPAIState", "SPAILocation.SPAISourcingRank", "SPAIQtyAvailable",
			"SPAINextInboundQty", "SPAINextInboundDate" }) {
		sc[c] = sEsq.AddColumn(c).Name;
	}
	sEsq.Filters.Add(sEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProduct", productIds));
	sEsq.Filters.Add(sEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILocation.SPAIIsAvailable", true));
	foreach (Entity s in sEsq.GetEntityCollection(uc)) {
		bool isDc = s.GetTypedColumnValue<string>(sc["SPAILocation.SPAILocationType.Name"]) == "Distribution Centre";
		bool homeState = projectState.Length > 0 && string.Equals(
			s.GetTypedColumnValue<string>(sc["SPAILocation.SPAIState"]), projectState, StringComparison.OrdinalIgnoreCase);
		stock.Add(new Dictionary<string, object> {
			{ "ProductId", s.GetTypedColumnValue<Guid>(sc["SPAIProduct"] + "Id") },
			{ "LocationId", s.GetTypedColumnValue<Guid>(sc["SPAILocation"] + "Id") },
			{ "Tier", isDc && homeState ? 1 : (isDc ? 2 : 3) },
			{ "Rank", s.GetTypedColumnValue<int>(sc["SPAILocation.SPAISourcingRank"]) },
			{ "Available", s.GetTypedColumnValue<int>(sc["SPAIQtyAvailable"]) },
			{ "InboundQty", s.GetTypedColumnValue<int>(sc["SPAINextInboundQty"]) },
			{ "InboundOn", s.GetTypedColumnValue<DateTime>(sc["SPAINextInboundDate"]) },
			{ "Interstate", isDc && !homeState }
		});
	}
}

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
EntitySchema sourceSchema = uc.EntitySchemaManager.GetInstanceByName("SPAILineSource");
EntitySchema ledgerSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
string[] tierNames = { "", "1 Home DC", "2 Other DC", "3 Retail store", "4 Inbound supply" };
int filled = 0, multi = 0, shortfall = 0;

foreach (Entity line in lines) {
	Guid lineId = line.PrimaryColumnValue;
	Guid productId = line.GetTypedColumnValue<Guid>(productCol + "Id");
	int required = line.GetTypedColumnValue<int>(qtyCol);
	int remaining = required;
	var rows = stock.Where(s => (Guid)s["ProductId"] == productId)
		.OrderBy(s => (int)s["Tier"]).ThenBy(s => (int)s["Rank"]).ToList();
	var allocations = new List<string>();
	int locationsUsed = 0;

	// Tiers 1 to 3: stock on hand, in tier then rank order.
	foreach (var s in rows) {
		if (remaining <= 0) {
			break;
		}
		int take = Math.Min(remaining, (int)s["Available"]);
		if (take <= 0) {
			continue;
		}
		Entity src = sourceSchema.CreateEntity(uc);
		src.SetDefColumnValues();
		src.SetColumnValue("SPAIScheduleLineId", lineId);
		src.SetColumnValue("SPAILocationId", (Guid)s["LocationId"]);
		src.SetColumnValue("SPAIQtyAllocated", take);
		src.SetColumnValue("SPAISourceTierId", sourceTier[tierNames[(int)s["Tier"]]]);
		src.SetColumnValue("SPAISourcePlanTypeId", planType["Indicative"]);
		src.SetColumnValue("SPAIInterstateFreight", (bool)s["Interstate"]);
		src.SetColumnValue("SPAIAllocatedOn", uc.CurrentUser.GetCurrentDateTime());
		src.Save(false);
		remaining -= take;
		locationsUsed++;
		allocations.Add(string.Format("tier {0} x{1}", (int)s["Tier"], take));
	}
	// Tier 4: inbound supply that lands before the earliest delivery event.
	foreach (var s in rows) {
		if (remaining <= 0) {
			break;
		}
		DateTime inboundOn = (DateTime)s["InboundOn"];
		int inbound = (int)s["InboundQty"];
		if (inbound <= 0 || inboundOn == DateTime.MinValue || inboundOn >= inboundCutoff) {
			continue;
		}
		int take = Math.Min(remaining, inbound);
		Entity src = sourceSchema.CreateEntity(uc);
		src.SetDefColumnValues();
		src.SetColumnValue("SPAIScheduleLineId", lineId);
		src.SetColumnValue("SPAILocationId", (Guid)s["LocationId"]);
		src.SetColumnValue("SPAIQtyAllocated", take);
		src.SetColumnValue("SPAISourceTierId", sourceTier["4 Inbound supply"]);
		src.SetColumnValue("SPAISourcePlanTypeId", planType["Indicative"]);
		src.SetColumnValue("SPAIInterstateFreight", (bool)s["Interstate"]);
		src.SetColumnValue("SPAIAllocatedOn", uc.CurrentUser.GetCurrentDateTime());
		src.Save(false);
		remaining -= take;
		locationsUsed++;
		allocations.Add(string.Format("tier 4 x{0} arriving {1:yyyy-MM-dd}", take, inboundOn));
	}

	Entity row = lineSchema.CreateEntity(uc);
	row.FetchFromDB(lineId);
	row.SetColumnValue("SPAIQtySourced", required - remaining);
	row.SetColumnValue("SPAIQtyShortfall", Math.Max(0, remaining));
	string status, reason;
	if (remaining > 0) {
		status = "Pending";  // left for BP3: the Adjudicator may find a stocked equivalent
		reason = "STOCKOUT_SUB";
		shortfall++;
	} else if (locationsUsed > 1) {
		status = "Sourced multi-location";
		reason = "MULTI_SOURCE";
		multi++;
	} else {
		status = "Exact match";
		reason = "EXACT";
		filled++;
	}
	if (remaining <= 0) {
		row.SetColumnValue("SPAILineStatusId", lineStatus[status]);
		row.SetColumnValue("SPAIReasonCodeId", reasons[reason]);
	}
	row.SetColumnValue("SPAIResolvedBy", "Deterministic");
	row.Save(false);

	Entity ledger = ledgerSchema.CreateEntity(uc);
	ledger.SetDefColumnValues();
	ledger.SetColumnValue("SPAIOpportunityId", opportunityId);
	ledger.SetColumnValue("SPAIScheduleLineId", lineId);
	ledger.SetColumnValue("SPAIDecisionTypeId", decisionType["Sourcing allocation"]);
	ledger.SetColumnValue("SPAIActor", "BP2b SPAISourcingCascade");
	ledger.SetColumnValue("SPAIProposedProductId", productId);
	ledger.SetColumnValue("SPAIComplianceChecks", string.Format(
		"required {0}; allocated {1} across {2} location(s) [{3}]; plan type Indicative; stock not encumbered",
		required, required - remaining, locationsUsed, string.Join(", ", allocations)));
	ledger.SetColumnValue("SPAIPriorValue", "Pending");
	ledger.SetColumnValue("SPAINewValue", remaining > 0
		? "Pending, shortfall " + remaining : status + " | " + reason);
	ledger.SetColumnValue("SPAISequence", line.GetTypedColumnValue<int>(numCol));
	ledger.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
	ledger.Save(false);
}
Set("FilledCount", filled);
Set("MultiSourceCount", multi);
Set("ShortfallCount", shortfall);
return true;
