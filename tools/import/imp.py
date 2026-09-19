"""Meridian seed importer: CSV -> DataService BatchQuery via `clio call-service`.
Ids are deterministic (uuid5 on file+code) so re-runs and cross-references line up.
Usage: python3 imp.py <step>   (steps listed in STEPS)"""
import csv, json, os, subprocess, sys, uuid, tempfile, datetime

DATA = "/Users/sheldonp/Desktop/Personal/Creatio Hackathon/Meridian Commercial Supply/meridian-data-v2"
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

def s_phases():
    acc = {r["Name"]: gid("acc", r["AccountCode"]) for r in rows("10_accounts.csv")}
    ten = {r["TenderCode"]: r for r in rows("07_tenders.csv")}
    today = datetime.date.today().isoformat()
    recs = []
    for r in rows("08_calloff_phases.csv"):
        opp = gid("opp", r["TenderCode"])
        recs.append((gid("ord", f'{r["TenderCode"]}-P{r["PhaseNumber"]}'), {"Number": T(f'{r["TenderCode"]}-P{r["PhaseNumber"]}'),
            "Opportunity": L(opp), "Account": L(acc[ten[r["TenderCode"]]["HeadContractor"]]),
            "Owner": L(SUPERVISOR_CONTACT), "Currency": L(AUD), "CurrencyRate": F("1"), "Date": D(today),
            "SPAIPhaseNumber": I(r["PhaseNumber"]), "SPAIPhaseName": T(r["PhaseName"]), "SPAITargetDate": D(r["TargetDate"]),
            "SPAIScope": T(r["Scope"]), "SPAIPrimaryLocation": L(gid("loc", r["PrimaryLocationCode"]))}))
    insert_rows("Order", recs, "08 phases")

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

STEPS = {"brands": s_brands, "families": s_families, "locations": s_locations, "drivers": s_drivers, "accounts": s_accounts,
         "contacts": s_contacts, "products": s_products, "superseded": s_superseded, "stock": s_stock, "rules": s_rules,
         "tenders": s_tenders, "phases": s_phases, "alignment": s_alignment}
if __name__ == "__main__":
    for s in sys.argv[1:]: STEPS[s]()
