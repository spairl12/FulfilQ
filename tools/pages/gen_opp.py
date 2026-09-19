"""Generates the Opportunities_FormPage replacing body (Adjudication tab) + resources for SPAIAdjudicator."""
import json, os, uuid

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bodies", "opp_body.js")
RES = OUT.replace("opp_body.js", "opp_resources.json")
NS = uuid.UUID("6d1b5c1e-2f0a-4b8e-9d7a-5a1a00000001")
def gid(s): return str(uuid.uuid5(NS, s))

STATUS = {"Matching": "9ee1691d-65ed-4082-ab21-3484bed32747",
          "Awaiting Gate 2": "3b41a420-17ff-4543-aa41-41d2cf026c52",
          "Submitted": "41c6d33c-ec68-4f98-8b1b-bc1910292fa9"}

res = {"SPAIAdjudicationTab_caption": "Adjudication",
       "SPAIRunAdjudicationButton_caption": "Run adjudication",
       "SPAIApproveGate1Button_caption": "Approve Gate 1",
       "SPAISubmitGate2Button_caption": "Submit for Gate 2",
       "SPAIScheduleLinesPanel_title": "Schedule lines",
       "SPAIScheduleLinesExport_caption": "Export to Excel",
       "SPAIScheduleLinesImport_caption": "Import data",
       "SPAIScheduleLinesSearch_placeholder": "Search"}

vc = []
def ins(name, parent, idx, values, prop="items"):
    vc.append({"operation": "insert", "name": name, "parentName": parent, "propertyName": prop, "index": idx, "values": values})

ins("SPAIAdjudicationTab", "Tabs", 1, {"type": "crt.TabContainer", "caption": "$Resources.Strings.SPAIAdjudicationTab_caption",
    "iconPosition": "only-text", "visible": True, "items": []})

# --- action buttons (status only) ---
ins("SPAIAdjButtonsRow", "SPAIAdjudicationTab", 0, {"type": "crt.FlexContainer", "direction": "row", "gap": "small",
    "alignItems": "center", "wrap": "wrap", "items": []})
for i, (name, cap, status, color, vis) in enumerate([
        ("SPAIRunAdjudicationButton", "SPAIRunAdjudicationButton_caption", "Matching", "primary", True),
        ("SPAIApproveGate1Button", "SPAIApproveGate1Button_caption", "Awaiting Gate 2", "default", False),
        ("SPAISubmitGate2Button", "SPAISubmitGate2Button_caption", "Submitted", "default", False)]):
    ins(name, "SPAIAdjButtonsRow", i, {"type": "crt.Button", "caption": f"$Resources.Strings.{cap}", "color": color,
        "size": "medium", "iconPosition": "only-text", "visible": vis,
        "clicked": {"request": "spai.SetAdjudicationStatusRequest",
                    "params": {"statusId": STATUS[status], "statusName": status}}})

# --- summary tile row: 9 indicator widgets reading the open Opportunity's own counter fields ---
TILES = [("Lines", "SPAILineCount", "Lines", "steel-blue", "list-icon", 0, "{0}"),
         ("Exact", "SPAIExactMatchCount", "Exact match", "green", "checkmark-icon", 0, "{0}"),
         ("Multi", "SPAIMultiSourceCount", "Multi-source", "blue", "diagram-icon", 0, "{0}"),
         ("Subst", "SPAISubstitutionCount", "Substituted", "orange", "reload-icon", 0, "{0}"),
         ("Escal", "SPAIEscalationCount", "Escalated", "red", "warning-icon", 0, "{0}"),
         ("NoAI", "SPAIDeterministicCount", "Resolved without AI", "dark-green", "calculator-icon", 0, "{0}"),
         ("AICalls", "SPAIAiCallCount", "AI calls", "vivid-purple", "copilot-action-button-icon", 0, "{0}"),
         ("Margin", "SPAIGrossMarginPct", "Gross margin %", "dark-turquoise", "coins-icon", 1, "{0}%"),
         ("Hours", "SPAIHoursToClose", "Hours to close", "navy-blue", "clock-icon", 1, "{0}")]
ins("SPAITilesGrid", "SPAIAdjudicationTab", 1, {"type": "crt.GridContainer",
    "columns": ["minmax(32px, 1fr)"] * 5, "rows": "minmax(max-content, 32px)",
    "gap": {"columnGap": "large", "rowGap": "small"}, "items": []})
for i, (slug, col, title, color, icon, prec, tmpl) in enumerate(TILES):
    w = f"SPAITile_{slug}"
    res[f"{w}_title"] = title
    res[f"{w}_template"] = tmpl
    ins(w, "SPAITilesGrid", i, {"type": "crt.IndicatorWidget", "visible": True,
        "layoutConfig": {"column": i % 5 + 1, "row": (i // 5) * 3 + 1, "colSpan": 1, "rowSpan": 3},
        "config": {"title": f"#ResourceString({w}_title)#",
            "data": {"providing": {"attribute": f"{w}_Data", "schemaName": "Opportunity",
                        "filters": {"filter": {"items": {}, "logicalOperation": 0, "isEnabled": True, "filterType": 6,
                                               "rootSchemaName": "Opportunity"}, "filterAttributes": []},
                        "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": True,
                            "expression": {"expressionType": 1, "functionType": 2, "aggregationType": 2, "aggregationEvalType": 1,
                                           "functionArgument": {"expressionType": 0, "columnPath": col}}}},
                        "dependencies": [{"attributePath": "Id", "relationPath": "PDS.Id"}]},
                     "formatting": {"type": "number", "decimalSeparator": ".", "decimalPrecision": prec, "thousandSeparator": ","}},
            "text": {"template": f"#ResourceString({w}_template)#", "metricMacros": "{0}", "fontSizeMode": "medium",
                     "labelPosition": "above-under"},
            "layout": {"color": color, "icon": {"iconName": icon}},
            "theme": "without-fill"}})

# --- Schedule lines expanded list, scoped to the open Opportunity ---
G, DS = "SPAIScheduleLinesGrid", "SPAIScheduleLinesGridDS"
COLS = [("SPAILineNumber", 4, 80), ("SPAIRoomType", 10, 130), ("SPAIUnitTier", 10, 110), ("SPAISpecifiedText", 30, 260),
        ("SPAISpecifiedModel", 27, 130), ("SPAIQuantity", 4, 90), ("SPAIMatchedProduct", 10, 200), ("SPAILineStatus", 10, 170),
        ("SPAIReasonCode", 10, 190), ("SPAIAdjudicationNote", 30, 260), ("SPAIComplianceNotes", 30, 240),
        ("SPAILineMarginPct", 31, 100), ("SPAICallOffOrder", 10, 170), ("SPAIEstimatorDecision", 10, 150)]
ins("SPAIScheduleLinesPanel", "SPAIAdjudicationTab", 2, {"type": "crt.ExpansionPanel",
    "title": "#ResourceString(SPAIScheduleLinesPanel_title)#", "expanded": True, "togglePosition": "before", "titleWidth": 20,
    "fullWidthHeader": True, "fitContent": True, "items": [], "tools": []})
ins("SPAIScheduleLinesGridWrap", "SPAIScheduleLinesPanel", 0, {"type": "crt.GridContainer",
    "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)"], "rows": "minmax(max-content, 32px)",
    "gap": {"columnGap": "large", "rowGap": 0}, "styles": {"overflow-x": "hidden"}, "items": []})
ins(G, "SPAIScheduleLinesGridWrap", 0, {"type": "crt.DataGrid", "items": f"${G}", "activeRow": f"${G}_ActiveRow",
    "primaryColumnName": f"{DS}_Id", "fitContent": True, "visible": True,
    "features": {"rows": {"selection": {"enable": True, "multiple": True}}},
    "layoutConfig": {"column": 1, "row": 1, "colSpan": 2, "rowSpan": 6},
    "sorting": f"${G} | crt.ToDataTableSortingConfig: '{G}'" if False else None,
    "columns": [{"id": gid(c), "code": f"{DS}_{c}", "path": c, "caption": f"#ResourceString({DS}_{c})#",
                 "dataValueType": t, "width": w} for c, t, w in COLS]})
vc[-1]["values"].pop("sorting")
ins("SPAIScheduleLinesToolsContainer", "SPAIScheduleLinesPanel", 0, {"type": "crt.GridContainer",
    "rows": "minmax(max-content, 24px)", "columns": ["minmax(32px, 1fr)"], "gap": {"columnGap": "large", "rowGap": "none"},
    "color": "transparent", "items": []}, prop="tools")
ins("SPAIScheduleLinesToolsRow", "SPAIScheduleLinesToolsContainer", 0, {"type": "crt.FlexContainer", "direction": "row",
    "alignItems": "center", "gap": "none", "items": [], "layoutConfig": {"column": 1, "row": 1, "colSpan": 1, "rowSpan": 1}})
ins("SPAIScheduleLinesAddButton", "SPAIScheduleLinesToolsRow", 0, {"type": "crt.Button", "icon": "add-button-icon",
    "iconPosition": "only-icon", "color": "default",
    "clicked": {"request": "crt.CreateRecordRequest", "params": {"entityName": "SPAIScheduleLine",
                "defaultValues": [{"attributeName": "SPAIOpportunity", "value": "$Id"}]}}})
ins("SPAIScheduleLinesRefreshButton", "SPAIScheduleLinesToolsRow", 1, {"type": "crt.Button", "icon": "reload-icon",
    "iconPosition": "only-icon", "color": "default",
    "clicked": {"request": "crt.LoadDataRequest", "params": {"config": {"loadType": "reload"}, "dataSourceName": DS}}})
ins("SPAIScheduleLinesSettingsButton", "SPAIScheduleLinesToolsRow", 2, {"type": "crt.Button", "icon": "actions-button-icon",
    "iconPosition": "only-icon", "color": "default", "clickMode": "menu", "menuItems": []})
ins("SPAIScheduleLinesExport", "SPAIScheduleLinesSettingsButton", 0, {"type": "crt.MenuItem", "icon": "export-button-icon",
    "caption": "#ResourceString(SPAIScheduleLinesExport_caption)#",
    "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": G}}}, prop="menuItems")
ins("SPAIScheduleLinesImport", "SPAIScheduleLinesSettingsButton", 1, {"type": "crt.MenuItem", "icon": "import-button-icon",
    "caption": "#ResourceString(SPAIScheduleLinesImport_caption)#",
    "clicked": {"request": "crt.ImportDataRequest", "params": {"entitySchemaName": "SPAIScheduleLine"}}}, prop="menuItems")
SF = "SPAIScheduleLinesSearch"
ins(SF, "SPAIScheduleLinesToolsRow", 3, {"type": "crt.SearchFilter", "iconOnly": True,
    "placeholder": f"#ResourceString({SF}_placeholder)#",
    "_filterOptions": {"expose": [{"attribute": f"{SF}_{G}", "converters": [{"converter": "crt.SearchFilterAttributeConverter", "args": [G]}]}],
                       "from": [f"{SF}_SearchValue", f"{SF}_FilteredColumnsGroups"]}})

vmc = [{"operation": "merge", "path": ["attributes"], "values": {
    "PDS_SPAIAdjudicationStatus_spai": {"modelConfig": {"path": "PDS.SPAIAdjudicationStatus"}},
    G: {"isCollection": True,
        "modelConfig": {"path": DS, "filterAttributes": [{"name": f"{SF}_{G}", "loadOnChange": True}]},
        "viewModelConfig": {"attributes": dict(
            [(f"{DS}_Id", {"modelConfig": {"path": f"{DS}.Id"}})] +
            [(f"{DS}_{c}", {"modelConfig": {"path": f"{DS}.{c}"}}) for c, _, _ in COLS])}}}}]
mc = [{"operation": "merge", "path": ["dataSources"], "values": {DS: {"type": "crt.EntityDataSource", "scope": "viewElement",
        "config": {"entitySchemaName": "SPAIScheduleLine", "attributes": {c: {"path": c} for c, _, _ in COLS}}}}},
      {"operation": "merge", "path": ["dependencies"], "values": {DS: [{"attributePath": "SPAIOpportunity", "relationPath": "PDS.Id"}]}}]

HANDLERS = """[
			{
				request: "spai.SetAdjudicationStatusRequest",
				handler: async (request, next) => {
					const { $context } = request;
					await $context.set("PDS_SPAIAdjudicationStatus_spai", {
						value: request.statusId,
						displayValue: request.statusName
					});
					await sdk.HandlerChainService.instance.process({
						type: "crt.SaveRecordRequest",
						preventCardClose: true,
						$context,
						scopes: [...request.scopes]
					});
					return next?.handle(request);
				}
			}
		]"""

def j(x): return json.dumps(x, indent="\t").replace("\n", "\n\t\t")
body = f'''define("Opportunities_FormPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {{
	return {{
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/{j(vc)}/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/{j(vmc)}/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/{j(mc)}/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/{HANDLERS}/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{{}}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{{}}/**SCHEMA_VALIDATORS*/
	}};
}});
'''
open(OUT, "w").write(body)
json.dump(res, open(RES, "w"))
print(OUT, len(body), "ops", len(vc), "resources", len(res))
