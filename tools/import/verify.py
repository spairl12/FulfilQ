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
O = select("Order", ["Number", "SPAIOrderType.Name", "SPAIBlanketOrder", "SPAIDeliveryEvent", "Opportunity.SPAITenderCode"])
print("Orders by type (tender-linked):", dict(Counter(o["SPAIOrderType.Name"] for o in O if o["Opportunity.SPAITenderCode"])))
print("Tender contact roles (native OpportunityContact)", len([c for c in select("OpportunityContact",["Opportunity.SPAITenderCode"]) if c["Opportunity.SPAITenderCode"]]))
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

# ---------------- Foundation Change Spec verification (section 7) ----------------
print("\n--- Foundation Change Spec ---")
SL = select("SPAIScheduleLine", ["SPAIOpportunity", "SPAIItemCode", "SPAIIsAlternative", "SPAIAdjudicationNote", "SPAIQuantity"])
if not SL:
    print("FS Q1/Q2/Q3/Q5: 0 schedule lines in the instance - blocked on the Kelmore schedule file (Corvina lines come from the agent)")
else:
    print("FS Q1 lines without item ref:", sum(1 for l in SL if not l["SPAIItemCode"]))
    dup = Counter((lid(l["SPAIOpportunity"]), l["SPAIItemCode"]) for l in SL if l["SPAIItemCode"])
    print("FS Q2 duplicate item refs within a tender:", [k[1] for k, v in dup.items() if v > 1])
    print("FS Q3 ALT lines without adjudication note:", sum(1 for l in SL if l["SPAIIsAlternative"] and not (l["SPAIAdjudicationNote"] or "").strip()))
    CU = select("SPAICallUpLine", ["SPAIScheduleLine", "SPAIQtyRequired"])
    req = defaultdict(int)
    for c in CU: req[lid(c["SPAIScheduleLine"])] += c["SPAIQtyRequired"] or 0
    bad = [(l["SPAIItemCode"], l["SPAIQuantity"], req[l["Id"]]) for l in SL if req.get(l["Id"]) is not None and (l["SPAIQuantity"] or 0) != req[l["Id"]]]
    print("FS Q5 call-up not reconciling to order qty:", bad)
EV = select("SPAIDeliveryEvent", ["SPAICallUpSchedule.SPAIScheduleRef", "SPAIScheduledOn"])
g = defaultdict(list)
for e in EV: g[e["SPAICallUpSchedule.SPAIScheduleRef"]].append(e["SPAIScheduledOn"][:10])
print("FS Q4 schedules:", len(g), "events:", len(EV))
for k in sorted(g): print("   ", k, len(g[k]), min(g[k]), max(g[k]))
ast = lookup_map("SPAIAdjudicationStatus"); sp = lookup_map("SPAISourcePlanType")
LS = select("SPAILineSource", ["SPAISourcePlanType", "SPAIScheduleLine.SPAIOpportunity.SPAIAdjudicationStatus"])
print("FS Q6 committed sources on unwon tenders:", sum(1 for x in LS if lid(x["SPAISourcePlanType"]) == sp["Committed"]
      and lid(x["SPAIScheduleLine.SPAIOpportunity.SPAIAdjudicationStatus"]) != ast["Submitted"]), f"(of {len(LS)} line sources)")
subs = [o for o in O if o["Opportunity.SPAITenderCode"] == "TND-2026-0141"]
print("Corvina orders / sub-POs (expect 0 before award):", len(subs))
print("Kelmore: blanket", sum(1 for o in O if o["Number"] == "BPO-0438"), "| sub-POs", sum(1 for o in O if o["Number"].startswith("BPO-0438-")),
      "| deliveries", cnt("SPAIDelivery"))
