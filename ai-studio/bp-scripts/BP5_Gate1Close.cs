// BP5 SPAIGate1Approval, step 3: Script task "Close Gate 1"
// Paste the body below into the Script task. It is not a class file.
//
// Runs after "Record Gate 1 decisions" and the BP2b sub-process (which sources every newly approved
// substitute). Reads the tender's state from the database and decides whether Gate 1 is complete:
//
//   outstanding = lines still Pending, Escalated, No match or Substitution proposed
//   outstanding > 0  -> tender stays Awaiting Gate 1; the summary lists what still needs a decision
//   outstanding = 0  -> Gate 1 is complete: SPAIGate1ApprovedOn/By set, SPAITotalSell set, and the tender
//                       moves to Submitted (it goes to the builder). One tender-level Human override ledger row.
//
// Every run also refreshes the Opportunity scorecard: line count, exact and multi-source counts, substitutions
// (proposed + approved), escalations still open, total sell, total cost and gross margin %.
//
// No stock is reserved and no order is raised here. Sources stay Indicative until award. Gate 2 is the award
// approval (BP8, tool approve_tender_award), not a pre-submission sign-off, so there is no value threshold here.
//
// Process parameters:
//   OpportunityId      Unique identifier  in   set by "Record Gate 1 decisions"
//   RunSummary         Text               in/out  appended to
//   TenderStatus       Text               out
//   OutstandingCount   Integer            out
//
// Usings: the five standard rows (System / System.Collections.Generic / Newtonsoft.Json.Linq /
// Terrasoft.Core / Terrasoft.Core.Entities). No System.Linq.
//
// Columns, lookup values and the system setting verified against the live instance (clio, 2026-09-29).

var uc = Get<UserConnection>("UserConnection");
Guid opportunityId = Get<Guid>("OpportunityId");
string summary = (Get<string>("RunSummary") ?? string.Empty).Trim();

var lineEsq = new EntitySchemaQuery(uc.EntitySchemaManager, "SPAIScheduleLine");
lineEsq.PrimaryQueryColumn.IsAlwaysSelect = true;
string numCol = lineEsq.AddColumn("SPAILineNumber").Name;
string statusCol = lineEsq.AddColumn("SPAILineStatus.Name").Name;
string reasonCol = lineEsq.AddColumn("SPAIReasonCode.SPAICode").Name;
string totalCol = lineEsq.AddColumn("SPAILineTotal").Name;
string shortCol = lineEsq.AddColumn("SPAIQtyShortfall").Name;
string qtyCol = lineEsq.AddColumn("SPAIQuantity").Name;
string costCol = lineEsq.AddColumn("SPAIUnitCost").Name;
string reasonNameCol = lineEsq.AddColumn("SPAIReasonCode.Name").Name;
string specCol = lineEsq.AddColumn("SPAISpecifiedText").Name;
string roomCol = lineEsq.AddColumn("SPAIRoomType.Name").Name;
string productCol = lineEsq.AddColumn("SPAIMatchedProduct").Name;
string createdCol = lineEsq.AddColumn("CreatedOn").Name;
lineEsq.Filters.Add(lineEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "SPAIOpportunity", opportunityId));

int supplied = 0, excludedCount = 0, lineCount = 0, exactCount = 0, multiCount = 0, subCount = 0, openEscalations = 0;
decimal value = 0m, cost = 0m;
DateTime scheduleArrived = DateTime.MaxValue;  // the first schedule line written: when the schedule reached the CRM
var outstanding = new List<Tuple<int, string>>();
var openByReason = new Dictionary<string, List<Tuple<int, string>>>();
var shortfalls = new List<string>();
foreach (Entity l in lineEsq.GetEntityCollection(uc)) {
	int n = l.GetTypedColumnValue<int>(numCol);
	string st = (l.GetTypedColumnValue<string>(statusCol) ?? string.Empty).Trim();
	string reason = (l.GetTypedColumnValue<string>(reasonCol) ?? string.Empty).Trim();
	lineCount++;
	DateTime created = l.GetTypedColumnValue<DateTime>(createdCol);
	if (created > DateTime.MinValue && created < scheduleArrived) scheduleArrived = created;
	if (st == "Exact match") exactCount++;
	if (st == "Sourced multi-location") multiCount++;
	if (st == "Substitution proposed" || st == "Substitution approved") subCount++;
	if (st == "Escalated" || st == "No match") openEscalations++;
	if (st == "Exact match" || st == "Sourced multi-location" || st == "Substitution approved") {
		supplied++;
		value += l.GetTypedColumnValue<decimal>(totalCol);
		cost += l.GetTypedColumnValue<int>(qtyCol) * l.GetTypedColumnValue<decimal>(costCol);
		int shortQty = l.GetTypedColumnValue<int>(shortCol);
		if (shortQty > 0) {
			string shortSpec = (l.GetTypedColumnValue<string>(specCol) ?? string.Empty).Trim();
			shortfalls.Add(shortSpec + " (line " + n + "): " + shortQty + " units not in stock, to be ordered in");
		}
	} else if (st == "Substitution rejected") {
		excludedCount++;
	} else {
		outstanding.Add(Tuple.Create(n, st + (reason.Length > 0 ? " " + reason : string.Empty)));
		string spec = (l.GetTypedColumnValue<string>(specCol) ?? string.Empty).Trim();
		if (spec.Length > 70) spec = spec.Substring(0, 70).TrimEnd() + "...";
		string room = (l.GetTypedColumnValue<string>(roomCol) ?? string.Empty).Trim();
		bool hasProduct = l.GetTypedColumnValue<Guid>(productCol + "Id") != Guid.Empty;
		string group = (l.GetTypedColumnValue<string>(reasonNameCol) ?? string.Empty).Trim();
		group = (group.Length > 0 ? group : st) + (hasProduct ? " (a suggested product can be approved)" : " (no product: exclude, or resolve with the architect)");
		if (!openByReason.ContainsKey(group)) openByReason[group] = new List<Tuple<int, string>>();
		openByReason[group].Add(Tuple.Create(n, spec + (room.Length > 0 ? " (" + room + ", line " + n + ")" : " (line " + n + ")")));
	}
}
outstanding.Sort((a, b) => a.Item1.CompareTo(b.Item1));

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

string tenderStatus = "Awaiting Gate 1";
var parts = new List<string>();
parts.Add(string.Format("WHERE THE TENDER STANDS: {0} item(s) will be supplied, {1} excluded, {2} still need a decision", supplied, excludedCount, outstanding.Count));
if (shortfalls.Count > 0) {
	parts.Add("STOCK TO ORDER IN at award: " + string.Join("; ", shortfalls));
}

Entity opportunity = uc.EntitySchemaManager.GetInstanceByName("Opportunity").CreateEntity(uc);
if (opportunity.FetchFromDB(opportunityId)) {
	opportunity.SetColumnValue("SPAITotalSell", value);
	opportunity.SetColumnValue("SPAITotalCost", cost);
	opportunity.SetColumnValue("SPAIGrossMarginPct", value > 0m ? Math.Round((value - cost) / value * 100m, 1) : 0m);
	opportunity.SetColumnValue("SPAILineCount", lineCount);
	opportunity.SetColumnValue("SPAIExactMatchCount", exactCount);
	opportunity.SetColumnValue("SPAIMultiSourceCount", multiCount);
	opportunity.SetColumnValue("SPAISubstitutionCount", subCount);
	opportunity.SetColumnValue("SPAIEscalationCount", openEscalations);
	if (outstanding.Count == 0) {
		tenderStatus = "Submitted";
		var statusByName = loadByName("SPAIAdjudicationStatus");
		opportunity.SetColumnValue("SPAIAdjudicationStatusId", statusByName[tenderStatus]);
		opportunity.SetColumnValue("SPAIGate1ApprovedOn", uc.CurrentUser.GetCurrentDateTime());
		// Hours to close: from the schedule reaching the CRM to the tender being submitted at Gate 1.
		if (scheduleArrived < DateTime.MaxValue) {
			double hours = (uc.CurrentUser.GetCurrentDateTime() - scheduleArrived).TotalHours;
			opportunity.SetColumnValue("SPAIHoursToClose", Math.Round((decimal)Math.Max(0d, hours), 1));
		}
		opportunity.SetColumnValue("SPAIGate1ApprovedById", uc.CurrentUser.ContactId);

		Entity ledger = uc.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger").CreateEntity(uc);
		ledger.SetDefColumnValues();
		ledger.SetColumnValue("SPAIOpportunityId", opportunityId);
		ledger.SetColumnValue("SPAIDecisionTypeId", loadByName("SPAIDecisionType")["Human override"]);
		ledger.SetColumnValue("SPAIActor", "Gate 1 approval via chat (tool approve_tender_lines)");
		ledger.SetColumnValue("SPAIComplianceChecks", string.Format(
			"Gate 1 complete: {0} line(s) supplied, {1} excluded, none outstanding; tender value {2:N2}; submitted to the builder; no stock reserved",
			supplied, excludedCount, value));
		ledger.SetColumnValue("SPAIPriorValue", "Awaiting Gate 1");
		ledger.SetColumnValue("SPAINewValue", tenderStatus);
		ledger.SetColumnValue("SPAISequence", 0);
		ledger.SetColumnValue("SPAIOccurredOn", uc.CurrentUser.GetCurrentDateTime());
		ledger.Save(false);

		parts.Add(string.Format("GATE 1 COMPLETE: every item is decided. Tender value {0:N2}, gross margin {1}%", value,
			value > 0m ? Math.Round((value - cost) / value * 100m, 1).ToString(System.Globalization.CultureInfo.InvariantCulture) : "0"));
		parts.Add("NEXT: the tender goes to the builder as submitted. When the builder awards it and sends their blanket purchase order number, "
			+ "Gate 2 approves the award, and only then is stock reserved and the orders raised");
	} else {
		var groups = new List<string>();
		foreach (var kv in openByReason) {
			kv.Value.Sort((a, c) => a.Item1.CompareTo(c.Item1));
			var names = new List<string>();
			foreach (var o in kv.Value) {
				if (names.Count == 20) {
					names.Add("and " + (kv.Value.Count - 20) + " more");
					break;
				}
				names.Add(o.Item2);
			}
			groups.Add(kv.Key + ", " + kv.Value.Count + ": " + string.Join("; ", names));
		}
		parts.Add("STILL TO DECIDE, by reason:\n  - " + string.Join("\n  - ", groups));
	}
	opportunity.Save(false);
}

Set("TenderStatus", tenderStatus);
Set("OutstandingCount", outstanding.Count);
string plainStatus = tenderStatus == "Submitted" ? "submitted to the builder" : "waiting for the person's decisions";
Set("RunSummary", (summary.Length > 0 ? summary + "\n\n" : string.Empty) + string.Join(".\n", parts)
	+ ".\nSTATUS: " + plainStatus + ". On the opportunity it shows as \"" + tenderStatus + "\". No stock has been reserved and no order raised.");
return true;
