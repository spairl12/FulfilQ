"""Undo the partial Corvina award of 2026-09-29 22:14 (BP8 failed on SPAICallOffOrderId after writing orders).
Keeps schedule lines and every Gate 1 decision. Default is a dry run; pass --apply to write."""
import sys
sys.path.insert(0, "/Users/sheldonp/Desktop/Personal/Creatio Hackathon/Meridian Commercial Supply/tools/import")
from imp import select, gid, run_batch, update_q, rows, I, L
APPLY = "--apply" in sys.argv
OPP = gid("opp", "TND-2026-0141")
def eq(col, val):
    return {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"f": {
        "filterType": 1, "comparisonType": 3, "isEnabled": True,
        "leftExpression": {"expressionType": 0, "columnPath": col},
        "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": val}}}}}
def delete_q(schema, rid):
    return {"__type": "Terrasoft.Nui.ServiceModel.DataContract.DeleteQuery, Terrasoft.Nui.ServiceModel",
            "rootSchemaName": schema, "operationType": 3,
            "filters": {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"id": {
                "filterType": 1, "comparisonType": 3, "isEnabled": True,
                "leftExpression": {"expressionType": 0, "columnPath": "Id"},
                "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": rid}}}}}}
cul = [r["Id"] for r in select("SPAICallUpLine", ["Id"], eq("SPAIScheduleLine.SPAIOpportunity", OPP))]
ops = [r["Id"] for r in select("OrderProduct", ["Id"], eq("Order.Opportunity", OPP))]
dls = [r["Id"] for r in select("SPAIDelivery", ["Id"], eq("SPAIOrder.Opportunity", OPP))]
orders = select("Order", ["SPAIPurchaseOrderNo", "SPAIOrderType.Name"], eq("Opportunity", OPP))
subs = [r["Id"] for r in orders if r["SPAIOrderType.Name"] != "Blanket"]
blankets = [r["Id"] for r in orders if r["SPAIOrderType.Name"] == "Blanket"]
srcs = [r["Id"] for r in select("SPAILineSource", ["SPAISourcePlanType.Name"], eq("SPAIScheduleLine.SPAIOpportunity", OPP)) if r["SPAISourcePlanType.Name"] == "Committed"]
scheds = [r["Id"] for r in select("SPAICallUpSchedule", ["SPAIBlanketOrder"], eq("SPAIOpportunity", OPP)) if r["SPAIBlanketOrder"]]
plan = {r["Name"]: r["Id"] for r in select("SPAISourcePlanType", ["Name"])}
stock = rows("05_stock_positions.csv")
print(f"call-up lines {len(cul)}, order products {len(ops)}, deliveries {len(dls)}, sub-POs {len(subs)}, blanket {len(blankets)} "
      f"({[r['SPAIPurchaseOrderNo'] for r in orders if r['SPAIOrderType.Name']=='Blanket']}), committed sources {len(srcs)}, "
      f"schedules linked {len(scheds)}, stock positions to restore from seed {len(stock)}")
if not APPLY:
    print("DRY RUN: nothing written. Re-run with --apply."); sys.exit()
run_batch("SPAICallUpLine", [delete_q("SPAICallUpLine", i) for i in cul], "delete call-up lines")
run_batch("OrderProduct", [delete_q("OrderProduct", i) for i in ops], "delete order products")
run_batch("SPAIDelivery", [delete_q("SPAIDelivery", i) for i in dls], "delete deliveries")
run_batch("SPAICallUpSchedule", [update_q("SPAICallUpSchedule", i, {"SPAIBlanketOrder": (10, None)}) for i in scheds], "unlink schedules")
run_batch("Order", [delete_q("Order", i) for i in subs], "delete sub-POs")
run_batch("Order", [delete_q("Order", i) for i in blankets], "delete blanket")
run_batch("SPAILineSource", [update_q("SPAILineSource", i, {"SPAISourcePlanType": L(plan["Indicative"])}) for i in srcs], "sources back to Indicative")
run_batch("SPAIStockPosition", [update_q("SPAIStockPosition", gid("stk", r["StockCode"]),
    {"SPAIQtyAllocated": I(r["QtyAllocated"]), "SPAIQtyAvailable": I(r["QtyAvailable"])}) for r in stock], "stock back to seed")
