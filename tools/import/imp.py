"""Meridian seed importer: CSV -> DataService BatchQuery via `clio call-service`.
Ids are deterministic (uuid5 on file+code) so re-runs and cross-references line up.
Usage: python3 imp.py <step>   (steps listed in STEPS)"""
import csv, json, os, subprocess, sys, uuid, tempfile, datetime

DATA = "/Users/sheldonp/Desktop/Personal/Creatio Hackathon/Meridian Commercial Supply/meridian-data-v2"
DATA4 = os.path.join(os.path.dirname(DATA), "meridian-data-v4")  # delivery programme + Kelmore fulfilment (20-27)
NS = uuid.UUID("6d1b5c1e-2f0a-4b8e-9d7a-5a1a00000000")
ENV = "meridian"
AUD = "908f7166-d8da-49a9-80dd-a2958fc3fabf"
SUPERVISOR_CONTACT = "410006e1-ca4e-4502-a9ec-e54d922d2c00"

def rows(f): return list(csv.DictReader(open(os.path.join(DATA, f), encoding="utf-8-sig")))
def gid(kind, code): return str(uuid.uuid5(NS, f"{kind}:{code}"))
def yn(v): return str(v).strip().lower() in ("yes", "true", "1", "y")

def call(path, body):
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as t:
        json.dump(body, t); fn = t.name
    out = fn + ".out"
    r = subprocess.run(["clio", "call-service", "-e", ENV, "--service-path", path, "-m", "POST",
                        "-f", fn, "-d", out, "--timeout", "300000"], capture_output=True, text=True)
    if r.returncode != 0 or not os.path.exists(out):
        raise SystemExit(f"call failed: {r.stdout[-1500:]} {r.stderr[-800:]}")
    return json.load(open(out, encoding="utf-8-sig"))

def select(path_schema, cols, filt=None):
    q = {"rootSchemaName": path_schema, "operationType": 0, "allColumns": False, "rowCount": -1,
         "columns": {"items": {c: {"expression": {"expressionType": 0, "columnPath": c}} for c in cols}}}
    if filt: q["filters"] = filt
    return call("DataService/json/SyncReply/SelectQuery", q).get("rows", [])

# value typing: (dataValueType, value)
def T(v): return None if v in (None, "") else (1, v)
def I(v): return None if v in (None, "") else (4, int(float(v)))
def F(v): return None if v in (None, "") else (5, float(v))
def M(v): return None if v in (None, "") else (6, float(v))
def B(v): return (12, bool(v))
def D(v): return None if v in (None, "") else (7, json.dumps(v + "T00:00:00.000"))
def L(v): return None if not v else (10, v)

def insert_q(schema, rid, vals):
    items = {"Id": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": rid}}}
    for k, tv in vals.items():
        if tv is None: continue
        items[k] = {"expressionType": 2, "parameter": {"dataValueType": tv[0], "value": tv[1]}}
    return {"__type": "Terrasoft.Nui.ServiceModel.DataContract.InsertQuery, Terrasoft.Nui.ServiceModel",
            "rootSchemaName": schema, "operationType": 1, "columnValues": {"items": items}}

def update_q(schema, rid, vals):
    items = {k: {"expressionType": 2, "parameter": {"dataValueType": tv[0], "value": tv[1]}} for k, tv in vals.items()}
    return {"__type": "Terrasoft.Nui.ServiceModel.DataContract.UpdateQuery, Terrasoft.Nui.ServiceModel",
            "rootSchemaName": schema, "operationType": 2, "columnValues": {"items": items},
            "filters": {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"id": {
                "filterType": 1, "comparisonType": 3, "isEnabled": True,
                "leftExpression": {"expressionType": 0, "columnPath": "Id"},
                "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": rid}}}}}}

def existing_ids(schema, ids):
    got = set()
    ids = list(ids)
    for i in range(0, len(ids), 500):
        f = {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"in": {
            "filterType": 4, "comparisonType": 3, "isEnabled": True,
            "leftExpression": {"expressionType": 0, "columnPath": "Id"},
            "rightExpressions": [{"expressionType": 2, "parameter": {"dataValueType": 0, "value": x}} for x in ids[i:i+500]]}}}
        got |= {r["Id"] for r in select(schema, ["Id"], f)}
    return got

def run_batch(schema, queries, label):
    ok = fail = 0; errs = []
    for i in range(0, len(queries), 100):
        chunk = queries[i:i+100]
        res = call("DataService/json/SyncReply/BatchQuery", {"items": chunk})
        for r in res.get("queryResults", []):
            if r.get("success", False): ok += 1
            else:
                fail += 1
                if len(errs) < 3: errs.append(json.dumps(r.get("responseStatus") or r)[:400])
        if not res.get("queryResults"):
            fail += len(chunk); errs.append(json.dumps(res)[:600])
    print(f"{label}: sent={len(queries)} ok={ok} failed={fail}")
    for e in errs: print("  ERR", e)

def insert_rows(schema, recs, label):
    have = existing_ids(schema, [r[0] for r in recs])
    todo = [insert_q(schema, rid, v) for rid, v in recs if rid not in have]
    if have: print(f"{label}: {len(have)} already present, skipped")
    run_batch(schema, todo, label)

def lookup_map(schema, keycol="Name"):
    return {r[keycol]: r["Id"] for r in select(schema, [keycol])}

# ---------------- steps ----------------
def s_brands():
    insert_rows("SPAIBrand", [(gid("brand", r["Code"]), {"Name": T(r["Name"]), "SPAICategory": T(r["Category"]),
        "SPAITier": T(r["Tier"]), "SPAICountryOfOrigin": T(r["CountryOfOrigin"])}) for r in rows("01_brands.csv")], "01 brands")

def s_families():
    insert_rows("SPAIProductFamily", [(gid("fam", r["Code"]), {"Name": T(r["Name"]), "SPAICategory": T(r["Category"]),
        "SPAIHasCutout": B(yn(r["HasCutout"]))}) for r in rows("02_product_families.csv")], "02 families")

def s_locations():
    lt = lookup_map("SPAILocationType")
    insert_rows("SPAILocation", [(gid("loc", r["Code"]), {"SPAIName": T(r["Name"]), "SPAICode": T(r["Code"]),
        "SPAILocationType": L(lt[r["LocationType"]]), "SPAIState": T(r["State"]), "SPAISuburb": T(r["Suburb"]),
        "SPAISourcingRank": I(r["SourcingRank"]), "SPAIIsAvailable": B(True)}) for r in rows("03_locations.csv")], "03 locations")

def s_drivers():
    insert_rows("SPAIDriver", [(gid("drv", r["DriverCode"]), {"Name": T(r["Name"])}) for r in rows("12_drivers.csv")], "12 drivers")

ACCT_TYPE = {"Head contractor": "03a75490-53e6-df11-971b-001d60e938c6", "Architect": "f2c0ce97-53e6-df11-971b-001d60e938c6",
             "Our company": "57412fad-53e6-df11-971b-001d60e938c6"}
def s_accounts():
    ind = lookup_map("AccountIndustry")
    insert_rows("Account", [(gid("acc", r["AccountCode"]), {"Name": T(r["Name"]), "Type": L(ACCT_TYPE.get(r["Type"])),
        "Industry": L(ind.get(r["Industry"])), "Web": T(r["Website"])}) for r in rows("10_accounts.csv")], "10 accounts")

def s_contacts():
    dr = lookup_map("ContactDecisionRole")
    insert_rows("Contact", [(gid("con", r["ContactCode"]), {"Name": T(r["FullName"]), "Account": L(gid("acc", r["AccountCode"])),
        "JobTitle": T(r["JobTitle"]),
        "DecisionRole": L(None if r["Role"] in CUSTOM_DECISION_ROLES else dr.get(r["Role"]))}) for r in rows("11_contacts.csv")], "11 contacts")

def s_products():
    br, fm, lc, fn = lookup_map("SPAIBrand"), lookup_map("SPAIProductFamily"), lookup_map("SPAILifecycleStatus"), lookup_map("SPAIFinish")
    recs = []
    for r in rows("04_products.csv"):
        recs.append((gid("prd", r["ProductCode"]), {"Name": T(r["Name"]), "Code": T(r["ProductCode"]), "Currency": L(AUD),
            "SPAIModelCode": T(r["ModelCode"]), "SPAIBrand": L(br[r["Brand"]]), "SPAIProductFamily": L(fm[r["ProductFamily"]]),
            "SPAILifecycleStatus": L(lc[r["LifecycleStatus"]]), "SPAILeadTimeWeeks": I(r["LeadTimeWeeks"]),
            "SPAICutoutWidthMm": I(r["CutoutWidthMm"]), "SPAICutoutHeightMm": I(r["CutoutHeightMm"]), "SPAICutoutDepthMm": I(r["CutoutDepthMm"]),
            "SPAIEnergyStarRating": F(r["EnergyStarRating"]), "SPAIWELSRating": F(r["WELSRating"]), "SPAIFinish": L(fn.get(r["Finish"])),
            "SPAIWholesaleCost": M(r["WholesaleCost"]), "SPAITradeSellPrice": M(r["TradeSellPrice"]), "Price": M(r["TradeSellPrice"]),
            "SPAIProjectApproved": B(yn(r["ProjectApproved"])), "SPAIWelsRegistrationNo": T(r["WelsRegistrationNo"]),
            "SPAIGemsRegistrationNo": T(r["GemsRegistrationNo"]), "SPAIWaterMarkCertNo": T(r["WaterMarkCertNo"]),
            "SPAIComplianceVerifiedOn": D(r["ComplianceVerifiedOn"])}))
    insert_rows("Product", recs, "04 products")

def s_superseded():
    q = [update_q("Product", gid("prd", r["ProductCode"]), {"SPAISupersededBy": (10, gid("prd", r["SupersededByCode"]))})
         for r in rows("04_products.csv") if r["SupersededByCode"]]
    run_batch("Product", q, "04 products 2nd pass (SupersededBy)")

def s_stock():
    insert_rows("SPAIStockPosition", [(gid("stk", r["StockCode"]), {"SPAIProduct": L(gid("prd", r["ProductCode"])),
        "SPAILocation": L(gid("loc", r["LocationCode"])), "SPAIQtyOnHand": I(r["QtyOnHand"]), "SPAIQtyAllocated": I(r["QtyAllocated"]),
        "SPAIQtyAvailable": I(r["QtyAvailable"]), "SPAINextInboundQty": I(r["NextInboundQty"]), "SPAINextInboundDate": D(r["NextInboundDate"])})
        for r in rows("05_stock_positions.csv")], "05 stock")

def s_rules():
    insert_rows("SPAISubstitutionRule", [(gid("rule", r["RuleCode"]), {"SPAIRuleCode": T(r["RuleCode"]),
        "SPAIFromProduct": L(gid("prd", r["FromProductCode"])), "SPAIToProduct": L(gid("prd", r["ToProductCode"])),
        "SPAIEquivalenceBasis": T(r["EquivalenceBasis"]), "SPAIFinishMatch": B(yn(r["FinishMatch"])), "SPAIApprovedBy": T(r["ApprovedBy"]),
        "SPAIApprovedOn": D(r["ApprovedOn"]), "SPAIIsActive": B(yn(r["IsActive"]))}) for r in rows("06_substitution_rules.csv")], "06 rules")

STAGE = {"Not started": "c2067b11-0ee0-df11-971b-001d60e938c6", "Submitted": "423774cb-5ae6-df11-971b-001d60e938c6"}
def s_tenders():
    ast = lookup_map("SPAIAdjudicationStatus"); acc = {r["Name"]: gid("acc", r["AccountCode"]) for r in rows("10_accounts.csv")}
    recs = []
    for r in rows("07_tenders.csv"):
        a = acc[r["HeadContractor"]]
        recs.append((gid("opp", r["TenderCode"]), {"Title": T(f'{r["ProjectName"]} ({r["TenderCode"]})'), "SPAIProjectName": T(r["ProjectName"]),
            "SPAITenderCode": T(r["TenderCode"]), "Account": L(a), "Owner": L(SUPERVISOR_CONTACT),
            "Stage": L(STAGE.get(r["AdjudicationStatus"], STAGE["Not started"])), "Amount": M(r["EstimatedValue"]),
            "SPAIDwellingCount": I(r["DwellingCount"]), "SPAITenderCloseOn": D(r["TenderCloseOn"]),
            "SPAIScheduleReceivedOn": D(r["ScheduleReceivedOn"]), "SPAIAdjudicationStatus": L(ast[r["AdjudicationStatus"]])}))
    insert_rows("Opportunity", recs, "07 tenders")

OPP_ROLE = {"Builder contact": "5a1c0005-0000-4000-8000-000000000001", "Specifier": "5a1c0005-0000-4000-8000-000000000002",
            "Gate 1 approver": "5a1c0005-0000-4000-8000-000000000003", "Gate 2 approver": "5a1c0005-0000-4000-8000-000000000004",
            "Constraint owner": "5a1c0005-0000-4000-8000-000000000005"}
CUSTOM_DECISION_ROLES = ("Builder contact", "Constraint owner", "Gate 1 approver", "Gate 2 approver")

def s_alignment():
    """M7: lean on native objects. Tender contact roles live on OpportunityContact (per deal), the deal's main
    builder contact on Opportunity.Contact, a distinct Title, and native Product.Price for OOTB order pricing."""
    tenders, contacts = rows("07_tenders.csv"), rows("11_contacts.csv")
    acc = {r["Name"]: r["AccountCode"] for r in rows("10_accounts.csv")}
    hero = next(t for t in tenders if yn(t["IsHeroDemo"]))
    links, opp_updates = [], []
    for t in tenders:
        acc_code, opp = acc[t["HeadContractor"]], gid("opp", t["TenderCode"])
        builders = [c for c in contacts if c["AccountCode"] == acc_code and c["Role"] == "Builder contact"]
        team = builders + ([c for c in contacts if c["Role"] != "Builder contact"] if t is hero else [])
        for i, c in enumerate(team):
            links.append((gid("oppcon", f'{t["TenderCode"]}:{c["ContactCode"]}'), {"Opportunity": L(opp),
                "Contact": L(gid("con", c["ContactCode"])), "Role": L(OPP_ROLE[c["Role"]]), "IsMainContact": B(i == 0)}))
        vals = {"Title": T(f'{t["ProjectName"]} ({t["TenderCode"]})')}
        if builders: vals["Contact"] = L(gid("con", builders[0]["ContactCode"]))
        opp_updates.append(update_q("Opportunity", opp, vals))
    insert_rows("OpportunityContact", links, "opportunity contact roles")
    run_batch("Opportunity", opp_updates, "opportunity title + main contact")
    run_batch("Product", [update_q("Product", gid("prd", r["ProductCode"]), {"Price": M(r["TradeSellPrice"])})
                          for r in rows("04_products.csv") if r["TradeSellPrice"]], "product native price")
    run_batch("Contact", [update_q("Contact", gid("con", c["ContactCode"]), {"DecisionRole": (10, None)})
                          for c in contacts if c["Role"] in CUSTOM_DECISION_ROLES], "clear custom contact decision roles")

DELIVERY_STATUS = [  # (Id, Name, colour) - aligned to the customer call-up sheet legend
    ("5a1c0007-0000-4000-8000-000000000004", "Overdue", "#FF4013")]
DELIVERY_RENAME = {"Planned": ("Scheduled", "#0058EF"), "Dispatched": ("Dispatched", "#FFAC07"),
                   "Delivered": ("Received on site", "#22AC14")}
ORDER_TYPE_CALLOFF = "d2c1d49c-1bdc-4435-8551-d00e45737564"

def s_fulfilment():
    """Order-fulfilment reframe: delivery statuses match the call-up legend."""
    ds = lookup_map("SPAIDeliveryStatus")
    run_batch("SPAIDeliveryStatus", [update_q("SPAIDeliveryStatus", ds[old], {"Name": T(new), "SPAIColor": (18, col)})
                                     for old, (new, col) in DELIVERY_RENAME.items() if old in ds], "delivery status rename + colour")
    insert_rows("SPAIDeliveryStatus", [(i, {"Name": T(n), "SPAIColor": (18, c)}) for i, n, c in DELIVERY_STATUS], "delivery status add")

# ---------------- Foundation Change Spec + Addendum A: delivery programme (meridian-data-v4) ----------------
def rows4(f): return list(csv.DictReader(open(os.path.join(DATA4, f), encoding="utf-8-sig")))

EVENT_TYPE = {"Prototype": "5a1c0008-0000-4000-8000-000000000001", "Level rollout": "5a1c0008-0000-4000-8000-000000000002",
              "Handover": "5a1c0008-0000-4000-8000-000000000003"}
SOURCE_PLAN = {"Indicative": "5a1c0009-0000-4000-8000-000000000001", "Committed": "5a1c0009-0000-4000-8000-000000000002"}
SOURCE_TIER = {"1": "1 Home DC", "2": "2 Other DC", "3": "3 Retail store", "4": "4 Inbound supply"}
ORDER_TYPE_BLANKET = "43014545-cd78-4496-bdda-953a976fe891"
ORDER_STATUS = {"in progress": "c8742634-ea8b-46d9-ba71-1989b951772d", "completed": "40de86ee-274d-4098-9b92-9ebdcf83d4fc"}
NATIVE_DELIVERY = {"Scheduled": "867ca155-bfa5-4aaa-9172-7813dd4e85f5", "Overdue": "867ca155-bfa5-4aaa-9172-7813dd4e85f5",
                   "Dispatched": "66464653-540e-46f3-b444-db2330706b02", "Received on site": "0dd2c99b-9a1a-4419-886e-842a20d35929"}
STAGE_CLOSED_WON = "60d5310c-5be6-df11-971b-001d60e938c6"
KELMORE, KELMORE_BPO = "TND-2026-0138", "BPO-0438"

_LM = {}
def lookup_map_cache(schema, keycol="Name"):
    if (schema, keycol) not in _LM: _LM[(schema, keycol)] = lookup_map(schema, keycol)
    return _LM[(schema, keycol)]

def delete_q(schema, rid):
    return {"__type": "Terrasoft.Nui.ServiceModel.DataContract.DeleteQuery, Terrasoft.Nui.ServiceModel",
            "rootSchemaName": schema, "operationType": 3,
            "filters": {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"id": {
                "filterType": 1, "comparisonType": 3, "isEnabled": True,
                "leftExpression": {"expressionType": 0, "columnPath": "Id"},
                "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": rid}}}}}}

def s_callup_lookups():
    insert_rows("SPAIDeliveryEventType", [(i, {"Name": T(n)}) for n, i in EVENT_TYPE.items()], "delivery event types")
    insert_rows("SPAISourcePlanType", [(i, {"Name": T(n)}) for n, i in SOURCE_PLAN.items()], "source plan types")
    insert_rows("SPAIDeliveryWindow", [(gid("win", r["Code"]), {"Name": T(r["Name"]), "SPAICode": T(r["Code"]),
        "SPAISequence": I(r["Sequence"]), "SPAILevelFrom": I(r["LevelFrom"]), "SPAILevelTo": I(r["LevelTo"])})
        for r in rows4("22_delivery_windows.csv")], "22 delivery windows")

def _schedule(r):
    return {"SPAIScheduleRef": T(r["ScheduleRef"]), "SPAIDescription": T(r["Description"]),
            "SPAIOpportunity": L(gid("opp", r["TenderCode"])),
            "SPAIBlanketOrder": L(gid("ord", r["BlanketPORef"]) if r["BlanketPORef"] else None)}

def _event(r, ds):
    return {"SPAILabel": T(r["Label"]), "SPAIEventCode": T(r["EventCode"]), "SPAICallUpSchedule": L(gid("sch", r["ScheduleRef"])),
            "SPAISequence": I(r["Sequence"]), "SPAIEventType": L(EVENT_TYPE[r["EventType"]]), "SPAIScheduledOn": D(r["ScheduledOn"]),
            "SPAIDeliveryWindow": L(gid("win", r["WindowCode"])), "SPAIStatus": L(ds.get(r["Status"]))}

def s_corvina_programme():
    """A1: Corvina holds only the builder's construction programme - no blanket PO, no status, no lines, no sub-POs."""
    ds = lookup_map_cache("SPAIDeliveryStatus")
    insert_rows("SPAICallUpSchedule", [(gid("sch", r["ScheduleRef"]), _schedule(r)) for r in rows4("20_corvina_schedules.csv")],
                "20 Corvina schedules")
    insert_rows("SPAIDeliveryEvent", [(gid("evt", r["EventCode"]), _event(r, ds)) for r in rows4("21_corvina_events.csv")],
                "21 Corvina events")

def s_kelmore_programme():
    """Kelmore (awarded Jan 2026, in delivery): Closed won, blanket BPO-0438, schedules and events with live status."""
    ten = next(t for t in rows("07_tenders.csv") if t["TenderCode"] == KELMORE)
    acc = {r["Name"]: gid("acc", r["AccountCode"]) for r in rows("10_accounts.csv")}[ten["HeadContractor"]]
    opp, blanket = gid("opp", KELMORE), gid("ord", KELMORE_BPO)
    ast, ds = lookup_map("SPAIAdjudicationStatus"), lookup_map_cache("SPAIDeliveryStatus")
    run_batch("Opportunity", [update_q("Opportunity", opp, {"Stage": (10, STAGE_CLOSED_WON),
        "SPAIAdjudicationStatus": (10, ast["Submitted"])})], "Kelmore closed won")
    events = rows4("25_kelmore_events.csv")
    blanket_vals = {"Opportunity": L(opp), "Account": L(acc), "Owner": L(SUPERVISOR_CONTACT), "Currency": L(AUD),
        "CurrencyRate": F("1"), "Number": T(KELMORE_BPO), "SPAIPurchaseOrderNo": T(KELMORE_BPO), "SPAIOrderType": L(ORDER_TYPE_BLANKET),
        "Date": D(min(e["ScheduledOn"] for e in events)), "Status": L(ORDER_STATUS["in progress"]),
        "SPAITargetDate": D(max(e["ScheduledOn"] for e in events))}
    insert_rows("Order", [(blanket, blanket_vals)], "Kelmore blanket")
    run_batch("Order", [update_q("Order", blanket, {k: v for k, v in blanket_vals.items() if k in ("Date", "SPAITargetDate")})],
              "Kelmore blanket dates")
    scheds = rows4("23_kelmore_schedules.csv")
    insert_rows("SPAICallUpSchedule", [(gid("sch", r["ScheduleRef"]), _schedule(r)) for r in scheds], "23 Kelmore schedules")
    run_batch("SPAICallUpSchedule", [update_q("SPAICallUpSchedule", gid("sch", r["ScheduleRef"]),
        {k: v for k, v in _schedule(r).items() if v is not None}) for r in scheds], "23 Kelmore schedules refresh")
    insert_rows("SPAIDeliveryEvent", [(gid("evt", r["EventCode"]), _event(r, ds)) for r in events], "25 Kelmore events")
    run_batch("SPAIDeliveryEvent", [update_q("SPAIDeliveryEvent", gid("evt", r["EventCode"]),
        {k: v for k, v in _event(r, ds).items() if v is not None}) for r in events], "25 Kelmore events refresh (dates, status)")
    upd = []
    for w in rows4("22_delivery_windows.csv"):  # window span, rolled up from the live job
        d = sorted(e["ScheduledOn"] for e in events if e["WindowCode"] == w["Code"])
        if d: upd.append(update_q("SPAIDeliveryWindow", gid("win", w["Code"]), {"SPAIFromDate": D(d[0]), "SPAIToDate": D(d[-1])}))
    run_batch("SPAIDeliveryWindow", upd, "window date span (Kelmore)")

def s_retire_v3():
    """Addendum A: remove what the superseded v3 load created (Corvina SCH-0441-*, Kelmore BPO-0438-NN sub-POs and deliveries)."""
    sch = [gid("sch", f"SCH-0441-0{i}") for i in (1, 2)]
    run_batch("SPAICallUpSchedule", [delete_q("SPAICallUpSchedule", i) for i in existing_ids("SPAICallUpSchedule", sch)],
              "retire v3 Corvina schedules (events cascade)")
    old = [o["Id"] for o in select("Order", ["Number"]) if o["Number"].startswith(KELMORE_BPO + "-")]
    dl = [d["Id"] for d in select("SPAIDelivery", ["SPAIOrder.Number"]) if (d["SPAIOrder.Number"] or "").startswith(KELMORE_BPO + "-")]
    run_batch("SPAIDelivery", [delete_q("SPAIDelivery", i) for i in dl], "retire v3 Kelmore deliveries")
    run_batch("Order", [delete_q("Order", i) for i in old], "retire v3 Kelmore sub-POs")

def s_kelmore_subpos():
    """A3: one sub-PO per delivery event, each with its fulfilling location and source tier, plus its shipment."""
    ten = next(t for t in rows("07_tenders.csv") if t["TenderCode"] == KELMORE)
    acc = {r["Name"]: gid("acc", r["AccountCode"]) for r in rows("10_accounts.csv")}[ten["HeadContractor"]]
    ds, tier = lookup_map_cache("SPAIDeliveryStatus"), lookup_map_cache("SPAISourceTier")
    first = min(e["ScheduledOn"] for e in rows4("25_kelmore_events.csv"))
    orders, deliveries = [], []
    for p in rows4("26_kelmore_subpos.csv"):
        oid, received = gid("ord", p["SubPORef"]), p["Status"] == "Received on site"
        orders.append((oid, {"Opportunity": L(gid("opp", KELMORE)), "Account": L(acc), "Owner": L(SUPERVISOR_CONTACT),
            "Currency": L(AUD), "CurrencyRate": F("1"), "Date": D(first), "Number": T(p["SubPORef"]), "SPAIPurchaseOrderNo": T(p["SubPORef"]),
            "SPAIOrderType": L(ORDER_TYPE_CALLOFF), "SPAIBlanketOrder": L(gid("ord", p["BlanketPORef"])),
            "SPAIDeliveryEvent": L(gid("evt", p["EventCode"])), "SPAIPrimaryLocation": L(gid("loc", p["LocationCode"])),
            "SPAISourceTier": L(tier[SOURCE_TIER[p["SourceTier"]]]), "SPAITargetDate": D(p["ScheduledOn"]),
            "Status": L(ORDER_STATUS["completed" if received else "in progress"]), "DeliveryStatus": L(NATIVE_DELIVERY[p["Status"]])}))
        deliveries.append((gid("dlv", p["SubPORef"]), {"SPAIOrder": L(oid), "SPAIFromLocation": L(gid("loc", p["LocationCode"])),
            "SPAIScheduledOn": D(p["ScheduledOn"]), "SPAIReceivedOn": D(p["ScheduledOn"]) if received else None,
            "SPAIStatus": L(ds[p["Status"]]), "SPAILineCount": I(p["LineCount"])}))
    insert_rows("Order", orders, "26 Kelmore sub-POs")
    insert_rows("SPAIDelivery", deliveries, "26 Kelmore deliveries")

def s_kelmore_lines():
    """A4: Kelmore's own schedule lines (adjudicated Dec 2025); ALT lines carry their written equivalence basis."""
    room, utier, ls, ed = (lookup_map_cache(s) for s in ("SPAIRoomType", "SPAIUnitTier", "SPAILineStatus", "SPAIEstimatorDecision"))
    rc = lookup_map_cache("SPAIReasonCode", "SPAICode")
    recs = []
    for r in rows4("24_kelmore_schedule_lines.csv"):
        alt = yn(r["IsAlternate"])
        recs.append((gid("sl", f'{r["TenderCode"]}:{r["ItemRef"]}'), {"SPAIOpportunity": L(gid("opp", r["TenderCode"])),
            "SPAILineNumber": I(r["LineNumber"]), "SPAIItemCode": T(r["ItemRef"]), "SPAIIsAlternative": B(alt),
            "SPAIAlternateVariant": T(r["AlternateVariant"]), "SPAIDisplayRef": T(r["DisplayRef"]), "SPAIRoomType": L(room[r["RoomType"]]),
            "SPAIUnitTier": L(utier[r["UnitTier"]]), "SPAISpecifiedText": T(r["SpecifiedText"]), "SPAISpecifiedBrand": T(r["SpecifiedBrand"]),
            "SPAISpecifiedModel": T(r["SpecifiedModel"]), "SPAISpecifiedFinish": T(r["SpecifiedFinish"]),
            "SPAIMatchedProduct": L(gid("prd", r["MatchedProductCode"])), "SPAIQuantity": I(r["OrderQty"]),
            "SPAIRequiredCutoutW": I(r["CutoutW"]), "SPAIRequiredCutoutH": I(r["CutoutH"]), "SPAIRequiredCutoutD": I(r["CutoutD"]),
            "SPAIAdjudicationNote": T(r["AdjudicationNote"]), "SPAIReasonCode": L(rc[r["ReasonCode"]]),
            "SPAIQtyReceived": I(r["DeliveredQty"]), "SPAIQtyRemaining": I(r["RemainingQty"]),
            "SPAILineStatus": L(ls["Substitution approved" if alt else "Exact match"]), "SPAIEstimatorDecision": L(ed["Accepted"])}))
    insert_rows("SPAIScheduleLine", recs, "24 Kelmore schedule lines")

def s_kelmore_callups():
    ds = lookup_map_cache("SPAIDeliveryStatus")
    insert_rows("SPAICallUpLine", [(gid("cul", r["CallUpRef"]), {"SPAIScheduleLine": L(gid("sl", f'{r["TenderCode"]}:{r["ItemRef"]}')),
        "SPAIDeliveryEvent": L(gid("evt", r["EventCode"])), "SPAISubPO": L(gid("ord", r["SubPORef"])),
        "SPAIQtyRequired": I(r["QtyRequired"]), "SPAIQtyDelivered": I(r["QtyDelivered"]), "SPAIStatus": L(ds[r["Status"]])})
        for r in rows4("27_kelmore_callup_lines.csv")], "27 Kelmore call-up lines")

def s_rules_v2fix():
    """Addendum A2: replace the original 99-rule register with the corrected 45 (height and depth now matched).
    StaleReason is deliberately not loaded: which rules are stale is for the agent to discover."""
    old = [r["Id"] for r in select("SPAISubstitutionRule", ["Id"])]
    run_batch("SPAISubstitutionRule", [delete_q("SPAISubstitutionRule", i) for i in old], "retire original rule register")
    s_rules()

def s_retire_phases():
    """Spec change 1: the three trade-phase orders are replaced by delivery events (they carry no order lines)."""
    ids = [gid("ord", f'{r["TenderCode"]}-P{r["PhaseNumber"]}') for r in rows("08_calloff_phases.csv")]
    run_batch("Order", [delete_q("Order", i) for i in existing_ids("Order", ids)], "retire phase orders")

STEPS = {"brands": s_brands, "families": s_families, "locations": s_locations, "drivers": s_drivers, "accounts": s_accounts,
         "contacts": s_contacts, "products": s_products, "superseded": s_superseded, "stock": s_stock, "rules": s_rules,
         "tenders": s_tenders, "alignment": s_alignment, "fulfilment": s_fulfilment,
         "callup_lookups": s_callup_lookups, "corvina_programme": s_corvina_programme, "kelmore_programme": s_kelmore_programme,
         "kelmore_subpos": s_kelmore_subpos, "kelmore_lines": s_kelmore_lines, "kelmore_callups": s_kelmore_callups,
         "rules_v2fix": s_rules_v2fix, "retire_phases": s_retire_phases, "retire_v3": s_retire_v3}
if __name__ == "__main__":
    for s in sys.argv[1:]: STEPS[s]()
