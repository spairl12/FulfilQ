// BP8 SPAIAwardFulfilment, step 3: Script task "Commit sources and raise the call-up"
// Paste the body below into the Script task. It is not a class file.
//
// The award half of the split. Everything here is the thing 04_Foundation_Change_Spec Change 4 says must
// NOT happen before award, so this process runs only after the tender is won:
//   1. every SPAILineSource of the tender flips Indicative -> Committed
//   2. SPAIStockPosition.SPAIQtyAllocated is incremented at that point, and only then
//   3. one SPAICallUpLine per (schedule line, delivery event) from the builder's programme
//   4. one sub-PO (Order, type Call-off) per delivery event, carrying the fulfilling location and tier
//      (04a A3: one sub-PO per delivery event, not per window and location)
//   5. one OrderProduct per (sub-PO, schedule line), carrying the item ref and ALT identity
//
// QUANTITY SPLIT: the programme says WHEN a level is delivered, not how many units each level takes, so
// the split rule is a decision, not a fact. This script spreads each line's order quantity evenly across
// the non-prototype events of its call-up schedule, remainder on the last event, and gives each prototype
// event PrototypeQty units. Change PrototypeQty, or replace the split, if the programme says otherwise.
//
// Process parameters:
//   OpportunityId      Unique identifier  in
//   BlanketOrderId     Unique identifier  in   the blanket PO raised at award (created in step 2)
//   PrototypeQty       Integer            in   units per prototype event (default 1)
//   CommittedCount     Integer            out  SPAILineSource rows converted
//   CallUpLineCount    Integer            out
//   SubPoCount         Integer            out
//
// Usings: System, System.Collections.Generic, System.Linq, Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
Guid blanketOrderId = Get<Guid>("BlanketOrderId");
int prototypeQty = Math.Max(0, Get<int>("PrototypeQty"));

Func<string, Dictionary<string, Guid>> loadByName = schemaName => {
	var esq = new EntitySchemaQuery(uc.EntitySchemaManager, schemaName);
	esq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string nameColumn = esq.AddColumn("Name").Name;
	return esq.GetEntityCollection(uc).ToDictionary(
		e => (e.GetTypedColumnValue<string>(nameColumn) ?? string.Empty).Trim(),
		e => e.PrimaryColumnValue, StringComparer.OrdinalIgnoreCase);
};
var planType = loadByName("SPAISourcePlanType");
var orderType = loadByName("SPAIOrderType");
var deliveryStatus = loadByName("SPAIDeliveryStatus");
var decisionType = loadByName("SPAIDecisionType");

// ---- 1 + 2. Commit the indicative plan and encumber stock ----
var srcEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAILineSource");
srcEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var sc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAIScheduleLine", "SPAILocation", "SPAIQtyAllocated", "SPAISourceTier",
		"SPAISourceTier.Name", "SPAIScheduleLine.SPAIMatchedProduct" }) {
	sc[c] = srcEsq.AddColumn(c).Name;
}
srcEsq.Filters.Add(srcEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAIScheduleLine.SPAIOpportunity", opportunityId));
srcEsq.Filters.Add(srcEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAISourcePlanType.Name", "Indicative"));
var sources = srcEsq.GetEntityCollection(uc).ToList();

EntitySchema sourceSchema = uc.EntitySchemaManager.GetInstanceByName("SPAILineSource");
EntitySchema stockSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIStockPosition");
int committed = 0;
foreach (Entity s in sources) {
	Entity row = sourceSchema.CreateEntity(uc);
	row.FetchFromDB(s.PrimaryColumnValue);
	row.SetColumnValue("SPAISourcePlanTypeId", planType["Committed"]);
	row.Save(false);
	committed++;
	// Encumber the stock position for this (product, location), now that the tender is won.
	Guid productId = s.GetTypedColumnValue<Guid>(sc["SPAIScheduleLine.SPAIMatchedProduct"] + "Id");
	Guid locationId = s.GetTypedColumnValue<Guid>(sc["SPAILocation"] + "Id");
	int qty = s.GetTypedColumnValue<int>(sc["SPAIQtyAllocated"]);
	if (productId == Guid.Empty || locationId == Guid.Empty || qty <= 0) {
		continue;
	}
	var posEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIStockPosition");
	posEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
	string allocCol = posEsq.AddColumn("SPAIQtyAllocated").Name;
	string availCol = posEsq.AddColumn("SPAIQtyAvailable").Name;
	posEsq.Filters.Add(posEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIProduct", productId));
	posEsq.Filters.Add(posEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAILocation", locationId));
	Entity position = posEsq.GetEntityCollection(uc).FirstOrDefault();
	if (position != null) {
		Entity update = stockSchema.CreateEntity(uc);
		update.FetchFromDB(position.PrimaryColumnValue);
		update.SetColumnValue("SPAIQtyAllocated", position.GetTypedColumnValue<int>(allocCol) + qty);
		update.SetColumnValue("SPAIQtyAvailable", Math.Max(0, position.GetTypedColumnValue<int>(availCol) - qty));
		update.Save(false);
	}
}
Set("CommittedCount", committed);

// ---- The programme: events per call-up schedule ----
var eventEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIDeliveryEvent");
eventEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var ec = new Dictionary<string, string>();
foreach (string c in new[] { "SPAICallUpSchedule", "SPAISequence", "SPAILabel", "SPAIEventType.Name",
		"SPAIScheduledOn" }) {
	ec[c] = eventEsq.AddColumn(c).Name;
}
eventEsq.Filters.Add(eventEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAICallUpSchedule.SPAIOpportunity", opportunityId));
var events = eventEsq.GetEntityCollection(uc)
	.OrderBy(e => e.GetTypedColumnValue<int>(ec["SPAISequence"])).ToList();
if (events.Count == 0) {
	throw new InvalidOperationException(
		"No delivery events exist for this tender: the builder's construction programme must be loaded before award fulfilment runs.");
}

// ---- Sub-PO per delivery event, with the dominant fulfilling location and tier ----
var sourceByLine = sources.GroupBy(s => s.GetTypedColumnValue<Guid>(sc["SPAIScheduleLine"] + "Id"))
	.ToDictionary(g => g.Key, g => g.OrderByDescending(x => x.GetTypedColumnValue<int>(sc["SPAIQtyAllocated"])).ToList());
Guid primaryLocationId = sources.GroupBy(s => s.GetTypedColumnValue<Guid>(sc["SPAILocation"] + "Id"))
	.OrderByDescending(g => g.Sum(x => x.GetTypedColumnValue<int>(sc["SPAIQtyAllocated"])))
	.Select(g => g.Key).FirstOrDefault();
Guid primaryTierId = sources.GroupBy(s => s.GetTypedColumnValue<Guid>(sc["SPAISourceTier"] + "Id"))
	.OrderByDescending(g => g.Sum(x => x.GetTypedColumnValue<int>(sc["SPAIQtyAllocated"])))
	.Select(g => g.Key).FirstOrDefault();

EntitySchema orderSchema = uc.EntitySchemaManager.GetInstanceByName("Order");
// Sub-PO refs are BLANKET-SCOPED, matching Kelmore's own numbering: blanket BPO-0438 -> SPO-0438-01..25.
// A global sequence would interleave two projects in one number space and make the Orders list unreadable.
Entity blanket = orderSchema.CreateEntity(uc);
string blanketRef = blanket.FetchFromDB(blanketOrderId)
	? (blanket.GetTypedColumnValue<string>("SPAIPurchaseOrderNo") ?? string.Empty).Trim() : string.Empty;
string blanketDigits = new string(blanketRef.Where(char.IsDigit).ToArray());
if (blanketDigits.Length == 0) {
	throw new InvalidOperationException(
		"The blanket order has no number to scope the sub-PO refs to. Set SPAIPurchaseOrderNo (for example BPO-0441) before running award fulfilment.");
}
var subPoByEvent = new Dictionary<Guid, Guid>();
int poSeq = 0;
foreach (Entity e in events) {
	poSeq++;
	Entity po = orderSchema.CreateEntity(uc);
	po.SetDefColumnValues();
	po.SetColumnValue("SPAIOrderTypeId", orderType["Call-off"]);
	po.SetColumnValue("SPAIBlanketOrderId", blanketOrderId);
	po.SetColumnValue("SPAIDeliveryEventId", e.PrimaryColumnValue);
	po.SetColumnValue("SPAITargetDate", e.GetTypedColumnValue<DateTime>(ec["SPAIScheduledOn"]));
	if (primaryLocationId != Guid.Empty) {
		po.SetColumnValue("SPAIPrimaryLocationId", primaryLocationId);
	}
	if (primaryTierId != Guid.Empty) {
		po.SetColumnValue("SPAISourceTierId", primaryTierId);
	}
	po.SetColumnValue("SPAIPurchaseOrderNo", string.Format("SPO-{0}-{1:00}", blanketDigits, poSeq));
	po.Save(false);
	subPoByEvent[e.PrimaryColumnValue] = po.PrimaryColumnValue;
}
Set("SubPoCount", subPoByEvent.Count);

// ---- Call-up lines and order products ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var lc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAILineNumber", "SPAIQuantity", "SPAIItemCode", "SPAIIsAlternative",
		"SPAIAlternateVariant", "SPAIMatchedProduct", "SPAIUnitSell", "SPAILineStatus.Name" }) {
	lc[c] = lineEsq.AddColumn(c).Name;
}
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.IsNotNull, "SPAIMatchedProduct"));
var lines = lineEsq.GetEntityCollection(uc).ToList();

EntitySchema callUpSchema = uc.EntitySchemaManager.GetInstanceByName("SPAICallUpLine");
EntitySchema orderProductSchema = uc.EntitySchemaManager.GetInstanceByName("OrderProduct");
EntitySchema ledgerSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
var prototypeEvents = events.Where(e => (e.GetTypedColumnValue<string>(ec["SPAIEventType.Name"]) ?? string.Empty) == "Prototype").ToList();
var rolloutEvents = events.Except(prototypeEvents).ToList();
int callUpCount = 0;

foreach (Entity line in lines) {
	Guid lineId = line.PrimaryColumnValue;
	int total = line.GetTypedColumnValue<int>(lc["SPAIQuantity"]);
	var plan = new List<Tuple<Entity, int>>();
	int remaining = total;
	foreach (Entity e in prototypeEvents) {
		int take = Math.Min(remaining, prototypeQty);
		if (take > 0) {
			plan.Add(Tuple.Create(e, take));
			remaining -= take;
		}
	}
	if (rolloutEvents.Count > 0 && remaining > 0) {
		int each = remaining / rolloutEvents.Count;
		int spare = remaining - each * rolloutEvents.Count;
		for (int i = 0; i < rolloutEvents.Count; i++) {
			int take = each + (i == rolloutEvents.Count - 1 ? spare : 0);
			if (take > 0) {
				plan.Add(Tuple.Create(rolloutEvents[i], take));
			}
		}
	}
	foreach (var item in plan) {
		Entity cul = callUpSchema.CreateEntity(uc);
		cul.SetDefColumnValues();
		cul.SetColumnValue("SPAIScheduleLineId", lineId);
		cul.SetColumnValue("SPAIDeliveryEventId", item.Item1.PrimaryColumnValue);
		cul.SetColumnValue("SPAISubPOId", subPoByEvent[item.Item1.PrimaryColumnValue]);
		cul.SetColumnValue("SPAIQtyRequired", item.Item2);
		cul.SetColumnValue("SPAIQtyDelivered", 0);
		cul.SetColumnValue("SPAIStatusId", deliveryStatus["Scheduled"]);
		cul.Save(false);
		callUpCount++;

		Entity op = orderProductSchema.CreateEntity(uc);
		op.SetDefColumnValues();
		op.SetColumnValue("OrderId", subPoByEvent[item.Item1.PrimaryColumnValue]);
		op.SetColumnValue("ProductId", line.GetTypedColumnValue<Guid>(lc["SPAIMatchedProduct"] + "Id"));
		op.SetColumnValue("Quantity", (decimal)item.Item2);
		op.SetColumnValue("Price", line.GetTypedColumnValue<decimal>(lc["SPAIUnitSell"]));
		op.SetColumnValue("SPAIScheduleLineId", lineId);
		op.SetColumnValue("SPAIItemCode", line.GetTypedColumnValue<string>(lc["SPAIItemCode"]));
		op.SetColumnValue("SPAIIsAlternative", line.GetTypedColumnValue<bool>(lc["SPAIIsAlternative"]));
		op.SetColumnValue("SPAIAlternateVariant", line.GetTypedColumnValue<string>(lc["SPAIAlternateVariant"]));
		op.Save(false);  // SPAIItemIdentityEntityEventListener derives SPAIDisplayRef on save
	}
	Entity ledger = ledgerSchema.CreateEntity(uc);
	ledger.SetDefColumnValues();
	ledger.SetColumnValue("SPAIOpportunityId", opportunityId);
	ledger.SetColumnValue("SPAIScheduleLineId", lineId);
	ledger.SetColumnValue("SPAIDecisionTypeId", decisionType["Sourcing allocation"]);
	ledger.SetColumnValue("SPAIActor", "BP8 SPAIAwardFulfilment");
	ledger.SetColumnValue("SPAIComplianceChecks", string.Format(
		"award: {0} units across {1} call-up line(s); sources converted to Committed; stock encumbered at this point",
		total, plan.Count));
	ledger.SetColumnValue("SPAIPriorValue", "Indicative source plan");
	ledger.SetColumnValue("SPAINewValue", "Committed, call-up raised");
	ledger.SetColumnValue("SPAISequence", line.GetTypedColumnValue<int>(lc["SPAILineNumber"]));
	ledger.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
	ledger.Save(false);
}
Set("CallUpLineCount", callUpCount);
return true;
