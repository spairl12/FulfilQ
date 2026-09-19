"""SPAIAdjudicationDashboard body: 5 chart widgets, every series bound to DashboardDS (host = Schedule lines list)."""
import json, os
OUT = os.path.dirname(os.path.abspath(__file__)) + "/bodies/SPAIMeridianAdjudicationDashboard.js"
res = {}
SUB_PROPOSED = ("17da7a7b-39ed-4225-905f-5693f496367f", "Substitution proposed")
SUB_APPROVED = ("8c9103ee-effb-4040-90e8-4d029144e911", "Substitution approved")

def empty_filter(root):
    return {"filter": {"items": {}, "logicalOperation": 0, "isEnabled": True, "filterType": 6, "rootSchemaName": root},
            "filterAttributes": []}

def status_in_filter(root, values):
    return {"filter": {"items": {"statusIn": {"filterType": 4, "comparisonType": 3, "isEnabled": True, "trimDateTimeParameterToDate": False,
                "leftExpression": {"expressionType": 0, "columnPath": "SPAILineStatus"}, "isAggregative": False, "dataValueType": 10,
                "referenceSchemaName": "SPAILineStatus",
                "rightExpressions": [{"expressionType": 2, "parameter": {"dataValueType": 10,
                    "value": {"Name": n, "Id": i, "value": i, "displayValue": n}}} for i, n in values]}},
            "logicalOperation": 0, "isEnabled": True, "filterType": 6, "rootSchemaName": root}, "filterAttributes": []}

def agg(kind, col="Id"):
    t, e = {"count": (1, 2), "sum": (2, 1)}[kind]
    return {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": True,
            "expression": {"expressionType": 1, "functionType": 2, "aggregationType": t, "aggregationEvalType": e,
                           "functionArgument": {"expressionType": 0, "columnPath": col}}}}

def group(col):
    return {"type": "by-value", "column": {"orderDirection": 0, "orderPosition": -1, "isVisible": True,
            "expression": {"expressionType": 0, "columnPath": col}}}

def series(w, i, suffix, typ, label, schema, aggr, grp, flt, dep_col, color=None):
    key = f"{w}_series_{i}"
    res[key] = label
    s = {"type": typ, "label": f"#ResourceString({key})#", "legend": {"enabled": True}, "dataLabel": {"display": True},
         "data": {"providing": {"attribute": f"{w}_SeriesData_{suffix}", "schemaName": schema, "filters": flt,
                  "aggregation": aggr, "grouping": grp, "rowCount": 50,
                  "dependencies": [{"attributePath": dep_col, "relationPath": "DashboardDS.Id"}]}}}
    if color: s["color"] = color
    return s

def widget(name, idx, title, layout, series_list, cartesian, x=None, y=None):
    res[f"{name}_title"] = title
    cfg = {"title": f"#ResourceString({name}_title)#", "color": "dark-blue", "theme": "without-fill", "series": series_list}
    if cartesian:
        cfg["scales"] = {"stacked": False, "xAxis": {"name": x, "formatting": {"type": "string"}},
                         "yAxis": {"name": y, "formatting": {"type": "number"}}}
    return {"operation": "insert", "name": name, "parentName": "Main", "propertyName": "items", "index": idx,
            "values": {"layoutConfig": layout, "type": "crt.ChartWidget", "config": cfg}}

SL, LS = "SPAIScheduleLine", "SPAILineSource"
vc = [
  widget("SPAIDashLinesByReason", 0, "Lines by reason code", {"column": 1, "row": 1, "colSpan": 6, "rowSpan": 12},
         [series("SPAIDashLinesByReason", 0, "rc7k2qa", "bar", "Lines", SL, agg("count"), group("SPAIReasonCode"),
                 empty_filter(SL), "Id", "steel-blue")], True, "Reason code", "Lines"),
  widget("SPAIDashResolvedBy", 1, "Resolved deterministically vs by AI", {"column": 7, "row": 1, "colSpan": 6, "rowSpan": 12},
         [series("SPAIDashResolvedBy", 0, "rb3m8xd", "doughnut", "Lines", SL, agg("count"), group("SPAIResolvedBy"),
                 empty_filter(SL), "Id")], False),
  widget("SPAIDashSubstByFamily", 2, "Substitution rate by product family", {"column": 1, "row": 13, "colSpan": 6, "rowSpan": 12},
         [series("SPAIDashSubstByFamily", 0, "sf1p4wz", "bar", "All matched lines", SL, agg("count"),
                 group("SPAIMatchedProduct.SPAIProductFamily"), empty_filter(SL), "Id", "steel-blue"),
          series("SPAIDashSubstByFamily", 1, "sf9n2kv", "bar", "Substituted lines", SL, agg("count"),
                 group("SPAIMatchedProduct.SPAIProductFamily"), status_in_filter(SL, [SUB_PROPOSED, SUB_APPROVED]), "Id", "orange")],
         True, "Product family", "Lines"),
  widget("SPAIDashValueByPhase", 3, "Tender value by call-off phase", {"column": 7, "row": 13, "colSpan": 6, "rowSpan": 12},
         [series("SPAIDashValueByPhase", 0, "vp5c7ty", "bar", "Line total", SL, agg("sum", "SPAILineTotal"),
                 group("SPAICallOffOrder.SPAIPhaseName"), empty_filter(SL), "Id", "forest-green")], True, "Call-off phase", "Value"),
  widget("SPAIDashAllocByLocType", 4, "Stock allocation by location type", {"column": 1, "row": 25, "colSpan": 12, "rowSpan": 12},
         [series("SPAIDashAllocByLocType", 0, "al8d3rh", "bar", "Qty allocated", LS, agg("sum", "SPAIQtyAllocated"),
                 group("SPAILocation.SPAILocationType"), empty_filter(LS), "SPAIScheduleLine", "dark-turquoise")],
         True, "Location type", "Units allocated"),
]
body = '''define("SPAIMeridianAdjudicationDashboard", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/''' + json.dumps(vc, indent="\t").replace("\n", "\n\t\t") + '''/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
'''
open(OUT, "w").write(body)
print(json.dumps(res))
