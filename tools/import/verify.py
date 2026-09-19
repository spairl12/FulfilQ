from imp import select, lookup_map
from collections import defaultdict, Counter
def cnt(s, f=None): return len(select(s, ["Id"], f))
for s in ["SPAIBrand","SPAIProductFamily","SPAILocation","SPAIDriver","SPAIStockPosition","SPAISubstitutionRule","SPAIReasonCode"]:
    print(s, cnt(s))
P = select("Product", ["Code","SPAIModelCode","SPAILifecycleStatus","SPAISupersededBy","SPAIProjectApproved","SPAICutoutWidthMm","SPAICutoutHeightMm","SPAIProductFamily.SPAICategory","SPAIWaterMarkCertNo","SPAIWELSRating","SPAIComplianceVerifiedOn","SPAIWholesaleCost"])
mine = [p for p in P if p["SPAIModelCode"]]
print("Product total", len(P), "with SPAI model code", len(mine))
print("sample", {k: mine[0][k] for k in ["Code","SPAIModelCode","SPAIWELSRating","SPAIComplianceVerifiedOn","SPAIWholesaleCost"]})
print("Opportunities w/ tender code", len([o for o in select("Opportunity",["SPAITenderCode"]) if o["SPAITenderCode"]]))
print("Orders w/ phase", len([o for o in select("Order",["SPAIPhaseNumber"]) if o["SPAIPhaseNumber"]]))
print("Contacts w/ SPAI accounts", len([c for c in select("Contact",["Account.Name","DecisionRole.Name"]) if c.get("DecisionRole.Name") in ("Builder contact","Constraint owner","Gate 1 approver","Gate 2 approver","Specifier")]))
# Q1
R = select("SPAISubstitutionRule", ["SPAIFromProduct","SPAIToProduct"])
def lid(v): return (v or {}).get("value") if isinstance(v, dict) else v
print("Q1 rules with null side:", sum(1 for r in R if not lid(r["SPAIFromProduct"]) or not lid(r["SPAIToProduct"])))
# Q2
c = Counter(p["SPAIModelCode"] for p in mine)
print("Q2 duplicate model codes:", [k for k,v in c.items() if v>1])
# Q3
S = select("SPAIStockPosition", ["SPAIProduct","SPAILocation","SPAIQtyAvailable","SPAILocation.SPAILocationType.Name"])
print("Q3 stock with null product/location:", sum(1 for s in S if not lid(s["SPAIProduct"]) or not lid(s["SPAILocation"])))
# Q4
print("Q4 tap/sanit missing WaterMark:", sum(1 for p in mine if p["SPAIProductFamily.SPAICategory"] in ("Tapware","Sanitaryware") and not p["SPAIWaterMarkCertNo"]))
# Q5
lc = lookup_map("SPAILifecycleStatus"); disc = lc["Discontinued"]
byid = {p["Id"]: p for p in P}
stock_by = defaultdict(list)
for s in S: stock_by[lid(s["SPAIProduct"])].append(s)
rows5 = 0; prods5 = set()
for p in mine:
    if lid(p["SPAILifecycleStatus"]) == disc and lid(p["SPAISupersededBy"]):
        r = byid[lid(p["SPAISupersededBy"])]
        if r["SPAIProjectApproved"] and r["SPAICutoutWidthMm"] == p["SPAICutoutWidthMm"] and r["SPAICutoutHeightMm"] == p["SPAICutoutHeightMm"]:
            hits = [s for s in stock_by[r["Id"]] if (s["SPAIQtyAvailable"] or 0) > 100]
            rows5 += len(hits)
            if hits: prods5.add(p["Id"])
print("Q5 rows (plan SQL as written):", rows5, "| distinct discontinued products:", len(prods5))
# Q6
dc = defaultdict(int); tot = defaultdict(int)
for s in S:
    q = s["SPAIQtyAvailable"] or 0; k = lid(s["SPAIProduct"]); tot[k] += q
    if s["SPAILocation.SPAILocationType.Name"] == "Distribution Centre": dc[k] += q
q6 = [k for k in tot if dc[k] < 138 and tot[k] >= 138]
print("Q6 products DC<138 but DC+stores>=138:", len(q6), [(byid[k]["Code"], dc[k], tot[k]) for k in q6])
