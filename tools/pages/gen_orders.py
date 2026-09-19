"""Orders_FormPage replacement (SPAIAdjudicator): Fulfilment tab for the blanket PO / sub-PO-per-delivery model.
Diff-form body. Deploy with update-page target-package-uid = SPAIAdjudicator (the default design package is virtual)."""
import json, os
from gen_pages import control, expanded_list, dump

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bodies", "Orders_FormPage.js")
FIELDS = [("SPAIOrderType", "K"), ("SPAIPurchaseOrderNo", "T"), ("SPAIBlanketOrder", "K"), ("SPAIDeliveryEvent", "K"),
          ("SPAITargetDate", "D"), ("SPAIPrimaryLocation", "K"), ("SPAISourceTier", "K"), ("SPAISourceQuote", "K")]
CALL_OFFS = dict(prefix="SPAICallOffs", entity="Order", fk="SPAIBlanketOrder", title="Call-off orders (sub-POs)",
                 cols=[("Number", "T", 150), ("SPAIPurchaseOrderNo", "T", 140), ("SPAIDeliveryEvent", "K", 180),
                       ("SPAITargetDate", "D", 120), ("SPAIPrimaryLocation", "K", 170), ("SPAISourceTier", "K", 130), ("Status", "K", 140),
                       ("DeliveryStatus", "K", 150), ("Amount", "M", 130)])
DELIVERIES = dict(prefix="SPAIOrderDeliveries", entity="SPAIDelivery", fk="SPAIOrder", title="Deliveries",
                  cols=[("SPAIFromLocation", "K", 180), ("SPAIScheduledOn", "D", 120), ("SPAIReceivedOn", "D", 130),
                        ("SPAIStatus", "K", 150), ("SPAIDriver", "K", 150), ("SPAILineCount", "I", 90), ("SPAIValue", "M", 120)])

CALL_UPS = dict(prefix="SPAIOrderCallUps", entity="SPAICallUpLine", fk="SPAISubPO", title="Call-up lines on this sub-PO",
                cols=[("SPAIScheduleLine", "K", 240), ("SPAIDeliveryEvent", "K", 180), ("SPAIQtyRequired", "I", 120),
                      ("SPAIQtyDelivered", "I", 120), ("SPAIStatus", "K", 150)])

res = {"SPAIFulfilmentTab_caption": "Fulfilment"}
vc = [{"operation": "insert", "name": "SPAIFulfilmentTab", "parentName": "Tabs", "propertyName": "items", "index": 1,
       "values": {"type": "crt.TabContainer", "caption": "$Resources.Strings.SPAIFulfilmentTab_caption",
                  "iconPosition": "only-text", "visible": True, "items": []}},
      {"operation": "insert", "name": "SPAIFulfilmentFields", "parentName": "SPAIFulfilmentTab", "propertyName": "items", "index": 0,
       "values": {"type": "crt.GridContainer", "columns": ["minmax(64px, 1fr)", "minmax(64px, 1fr)"],
                  "rows": "minmax(32px, max-content)", "gap": {"columnGap": "large"}, "items": []}}]
attrs = {}
row, col = 1, 1
for i, (c, t) in enumerate(FIELDS):
    wide = t == "L"
    if wide and col == 2: row, col = row + 1, 1
    vc.append(control(c, t, "SPAIFulfilmentFields", i, {"column": col, "row": row, "colSpan": 2 if wide else 1, "rowSpan": 1}))
    attrs[f"PDS_{c}"] = {"modelConfig": {"path": f"PDS.{c}"}}
    if wide or col == 2: row, col = row + 1, 1
    else: col = 2
ds, deps = {}, {}
for idx, d in enumerate((CALL_OFFS, DELIVERIES, CALL_UPS), start=1):
    dvc, dattrs, dds, ddeps, dres = expanded_list(d, "SPAIFulfilmentTab", idx)
    vc += dvc; attrs.update(dattrs); ds.update(dds); deps.update(ddeps); res.update(dres)

vmc = [{"operation": "merge", "path": ["attributes"], "values": attrs}]
mc = [{"operation": "merge", "path": ["dataSources"], "values": ds},
      {"operation": "merge", "path": ["dependencies"], "values": deps}]
body = f'''define("Orders_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {{
	return {{
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/{dump(vc)}/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/{dump(vmc)}/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/{dump(mc)}/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{{}}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{{}}/**SCHEMA_VALIDATORS*/
	}};
}});
'''
open(OUT, "w").write(body)
json.dump(res, open(OUT.replace(".js", ".resources.json"), "w"))
print(OUT, len(vc), "ops;", json.dumps(res))
