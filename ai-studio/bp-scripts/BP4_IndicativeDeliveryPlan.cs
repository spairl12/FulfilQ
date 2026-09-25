// BP4 SPAIIndicativeDeliveryPlan, step 2: Script task "Check deliverability against the programme"
// Paste the body below into the Script task. It is not a class file.
//
// Replaces 01 §9's phase-allocation table. That table assigned lines to three seeded phase orders, and
// 04_Foundation_Change_Spec Change 1 deleted those orders in favour of call-up schedules and delivery
// events. 04a A1 then established that call-up lines and sub-POs are created AT AWARD, so this process
// commits nothing: it is the indicative half of the split (BP8 is the award half).
//
// What it does: for every resolved line, compare the source plan against the builder's programme and
// record whether the line is deliverable by the first delivery event that needs it.
//   deliverable      -> note recorded, status unchanged
//   not deliverable  -> SPAIComplianceNotes states the gap, status Escalated, ledger row
// This is KS1 §2.9 availability assessment: read stock and lead times, record an indicative plan,
// encumber nothing.
//
// Process parameters:
//   OpportunityId       Unique identifier  in
//   CheckedCount        Integer            out
//   NotDeliverableCount Integer            out  lines escalated for the estimator at Gate 1
//   FirstEventOn        Date/Time          out  earliest delivery event of the programme (blank if none)
//
// Usings: System, System.Collections.Generic, System.Linq, Terrasoft.Core, Terrasoft.Core.Entities
//
// Compile and trace-test in the BP designer. This file has not been executed against the instance.

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");

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

// ---- The programme: earliest event overall, and the earliest event per delivery window ----
DateTime firstEvent = DateTime.MaxValue;
int eventCount = 0;
var eventEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIDeliveryEvent");
string schedOnCol = eventEsq.AddColumn("SPAIScheduledOn").Name;
string labelCol = eventEsq.AddColumn("SPAILabel").Name;
eventEsq.Filters.Add(eventEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAICallUpSchedule.SPAIOpportunity", opportunityId));
string firstLabel = string.Empty;
foreach (Entity e in eventEsq.GetEntityCollection(uc)) {
	eventCount++;
	DateTime scheduled = e.GetTypedColumnValue<DateTime>(schedOnCol);
	if (scheduled != DateTime.MinValue && scheduled < firstEvent) {
		firstEvent = scheduled;
		firstLabel = e.GetTypedColumnValue<string>(labelCol) ?? string.Empty;
	}
}
Set("FirstEventOn", firstEvent == DateTime.MaxValue ? (object)null : firstEvent);
if (eventCount == 0) {
	// No programme issued with this tender. Nothing to assess; say so rather than inventing dates.
	Set("CheckedCount", 0);
	Set("NotDeliverableCount", 0);
	return true;
}

// ---- Resolved lines and their indicative sources ----
var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
var lc = new Dictionary<string, string>();
foreach (string c in new[] { "SPAILineNumber", "SPAIQuantity", "SPAIQtySourced", "SPAIComplianceNotes",
		"SPAIMatchedProduct.Code", "SPAIMatchedProduct.SPAILeadTimeWeeks", "SPAILineStatus.Name" }) {
	lc[c] = lineEsq.AddColumn(c).Name;
}
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.IsNotNull, "SPAIMatchedProduct"));
var lines = lineEsq.GetEntityCollection(uc).ToList();

// Inbound-sourced quantities per line: those arrive on a date, so they can miss the first event.
var inboundByLine = new Dictionary<Guid, DateTime>();
var srcEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAILineSource");
string srcLineCol = srcEsq.AddColumn("SPAIScheduleLine").Name;
string srcTierCol = srcEsq.AddColumn("SPAISourceTier.Name").Name;
string srcInboundCol = srcEsq.AddColumn("SPAILocation.SPAINextInboundDate").Name;
srcEsq.Filters.Add(srcEsq.CreateFilterWithParameters(FilterComparisonType.Equal,
	"SPAIScheduleLine.SPAIOpportunity", opportunityId));
foreach (Entity s in srcEsq.GetEntityCollection(uc)) {
	if ((s.GetTypedColumnValue<string>(srcTierCol) ?? string.Empty).StartsWith("4")) {
		Guid id = s.GetTypedColumnValue<Guid>(srcLineCol + "Id");
		DateTime arrives = s.GetTypedColumnValue<DateTime>(srcInboundCol);
		if (!inboundByLine.ContainsKey(id) || arrives > inboundByLine[id]) {
			inboundByLine[id] = arrives;  // the LAST arrival is what decides the line
		}
	}
}

EntitySchema lineSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIScheduleLine");
EntitySchema ledgerSchema = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
DateTime today = uc.CurrentUser.GetCurrentDateTime().Date;
int checked_ = 0, notDeliverable = 0;

foreach (Entity line in lines) {
	checked_++;
	Guid lineId = line.PrimaryColumnValue;
	int lead = line.GetTypedColumnValue<int>(lc["SPAIMatchedProduct.SPAILeadTimeWeeks"]);
	int sourced = line.GetTypedColumnValue<int>(lc["SPAIQtySourced"]);
	int required = line.GetTypedColumnValue<int>(lc["SPAIQuantity"]);
	var reasons = new List<string>();
	// Stock already on hand needs no lead time; only an unsourced remainder is bought in.
	if (sourced < required && today.AddDays(lead * 7) > firstEvent) {
		reasons.Add(string.Format("{0} of {1} units are not in the network and the {2} week lead time lands after {3:d MMM yyyy}",
			required - sourced, required, lead, firstEvent));
	}
	DateTime inboundOn;
	if (inboundByLine.TryGetValue(lineId, out inboundOn) && inboundOn != DateTime.MinValue && inboundOn > firstEvent) {
		reasons.Add(string.Format("inbound supply arrives {0:d MMM yyyy}, after {1:d MMM yyyy}", inboundOn, firstEvent));
	}
	string checks = string.Format("programme: {0} events, first '{1}' on {2:d MMM yyyy}; lead {3}w; sourced {4}/{5}; {6}",
		eventCount, firstLabel, firstEvent, lead, sourced, required,
		reasons.Count == 0 ? "deliverable" : "NOT deliverable: " + string.Join("; ", reasons));
	if (reasons.Count > 0) {
		notDeliverable++;
		Entity row = lineSchema.CreateEntity(uc);
		row.FetchFromDB(lineId);
		row.SetColumnValue("SPAIComplianceNotes", string.Join(" ", new[] {
			line.GetTypedColumnValue<string>(lc["SPAIComplianceNotes"]) ?? string.Empty,
			"Indicative delivery plan: " + string.Join("; ", reasons) + "." }).Trim());
		row.SetColumnValue("SPAILineStatusId", lineStatus["Escalated"]);
		row.Save(false);
	}
	Entity ledger = ledgerSchema.CreateEntity(uc);
	ledger.SetDefColumnValues();
	ledger.SetColumnValue("SPAIOpportunityId", opportunityId);
	ledger.SetColumnValue("SPAIScheduleLineId", lineId);
	ledger.SetColumnValue("SPAIDecisionTypeId", decisionType["Sourcing allocation"]);
	ledger.SetColumnValue("SPAIActor", "BP4 SPAIIndicativeDeliveryPlan");
	ledger.SetColumnValue("SPAIComplianceChecks", checks);
	ledger.SetColumnValue("SPAIPriorValue", line.GetTypedColumnValue<string>(lc["SPAILineStatus.Name"]));
	ledger.SetColumnValue("SPAINewValue", reasons.Count == 0 ? "Deliverable (indicative)" : "Escalated: not deliverable");
	ledger.SetColumnValue("SPAISequence", line.GetTypedColumnValue<int>(lc["SPAILineNumber"]));
	ledger.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
	ledger.Save(false);
}
Set("CheckedCount", checked_);
Set("NotDeliverableCount", notDeliverable);
return true;
