"""Generates full (replace-mode) bodies for the six Meridian Commercial section form + list pages."""
import json, uuid, os
D = os.path.dirname(os.path.abspath(__file__)) + "/bodies"
os.makedirs(D, exist_ok=True)
NS = uuid.UUID("6d1b5c1e-2f0a-4b8e-9d7a-5a1a00000002")
def gid(s): return str(uuid.uuid5(NS, s))

# column type codes: T text, L longtext, I int, N decimal, M money, K lookup, D date, DT datetime, B bool
LIST_DVT = {"T": 1, "L": 1, "I": 4, "N": 5, "M": 6, "K": 10, "D": 8, "DT": 7, "B": 12}

PAGES = {
  "SPAILocation": dict(form="SPAIMeridianCommercial_FormPage", list="SPAIMeridianCommercial_ListPage",
    profile=[("SPAIName", "T"), ("SPAICode", "T"), ("SPAILocationType", "K")],
    general=[("SPAIState", "T"), ("SPAISuburb", "T"), ("SPAISourcingRank", "I"), ("SPAIIsAvailable", "B"),
             ("SPAIAcceptingFrom", "D"), ("SPAIAcceptingUntil", "D")],
    columns=[("SPAIName", "T"), ("SPAICode", "T"), ("SPAILocationType", "K"), ("SPAIState", "T"), ("SPAISuburb", "T"),
             ("SPAISourcingRank", "I"), ("SPAIIsAvailable", "B"), ("SPAIAcceptingFrom", "D"), ("SPAIAcceptingUntil", "D")]),
  "SPAIStockPosition": dict(form="SPAIStockPositions_FormPage", list="SPAIStockPositions_ListPage",
    profile=[("SPAIProduct", "K"), ("SPAILocation", "K")],
    general=[("SPAIQtyOnHand", "I"), ("SPAIQtyAllocated", "I"), ("SPAIQtyAvailable", "I"), ("SPAINextInboundQty", "I"),
             ("SPAINextInboundDate", "D")],
    columns=[("SPAIProduct", "K"), ("SPAILocation", "K"), ("SPAIQtyOnHand", "I"), ("SPAIQtyAllocated", "I"),
             ("SPAIQtyAvailable", "I"), ("SPAINextInboundQty", "I"), ("SPAINextInboundDate", "D")]),
  "SPAISubstitutionRule": dict(form="SPAISubstitutionRules_FormPage", list="SPAISubstitutionRules_ListPage",
    profile=[("SPAIRuleCode", "T"), ("SPAIIsActive", "B")],
    general=[("SPAIFromProduct", "K"), ("SPAIToProduct", "K"), ("SPAIFinishMatch", "B"), ("SPAIApprovedBy", "T"),
             ("SPAIApprovedOn", "D"), ("SPAIEquivalenceBasis", "L")],
    columns=[("SPAIRuleCode", "T"), ("SPAIFromProduct", "K"), ("SPAIToProduct", "K"), ("SPAIFinishMatch", "B"),
             ("SPAIEquivalenceBasis", "L"), ("SPAIApprovedBy", "T"), ("SPAIApprovedOn", "D"), ("SPAIIsActive", "B")]),
  "SPAIScheduleLine": dict(form="SPAIScheduleLines_FormPage", list="SPAIScheduleLines_ListPage",
    profile=[("SPAIItemCode", "T"), ("SPAISpecifiedText", "L"), ("SPAILineStatus", "K"), ("SPAIReasonCode", "K"),
             ("SPAIIsAlternative", "B")],
    general=[("SPAIOpportunity", "K"), ("SPAILineNumber", "I"), ("SPAIRoomType", "K"), ("SPAIUnitTier", "K"),
             ("SPAISpecifiedBrand", "T"), ("SPAISpecifiedModel", "T"), ("SPAISpecifiedFinish", "T"), ("SPAIQuantity", "I"),
             ("SPAIRequiredCutoutW", "I"), ("SPAIRequiredCutoutH", "I"), ("SPAIRequiredCutoutD", "I"), ("SPAIQtyReceived", "I"), ("SPAIQtyRemaining", "I"), ("SPAIMatchedProduct", "K"),
             ("SPAIResolvedBy", "T"), ("SPAIConfidence", "N"), ("SPAIQtySourced", "I"), ("SPAIQtyShortfall", "I"),
             ("SPAIUnitCost", "M"), ("SPAIUnitSell", "M"), ("SPAILineTotal", "M"), ("SPAILineMarginPct", "N"),
             ("SPAICallOffOrder", "K"), ("SPAIEstimatorDecision", "K"), ("SPAIScheduleNotes", "L"),
             ("SPAIAdjudicationNote", "L"), ("SPAIComplianceNotes", "L")],
    columns=[("SPAIOpportunity", "K"), ("SPAIItemCode", "T"), ("SPAILineNumber", "I"), ("SPAIRoomType", "K"), ("SPAIUnitTier", "K"),
             ("SPAISpecifiedText", "L"), ("SPAISpecifiedModel", "T"), ("SPAIQuantity", "I"), ("SPAIMatchedProduct", "K"),
             ("SPAILineStatus", "K"), ("SPAIReasonCode", "K"), ("SPAILineMarginPct", "N"), ("SPAICallOffOrder", "K"),
             ("SPAIEstimatorDecision", "K")],
    detail=dict(prefix="SPAILineSources", entity="SPAILineSource", fk="SPAIScheduleLine", title="Line sources",
                cols=[("SPAILocation", "K", 200), ("SPAISourceTier", "K", 160), ("SPAIQtyAllocated", "I", 120),
                      ("SPAIInterstateFreight", "B", 140), ("SPAIAllocatedOn", "DT", 170)]),
    gate1_lock=True),
  "SPAIDelivery": dict(form="SPAIDeliveries_FormPage", list="SPAIDeliveries_ListPage",
    profile=[("SPAIOrder", "K"), ("SPAIStatus", "K")],
    general=[("SPAIFromLocation", "K"), ("SPAIScheduledOn", "D"), ("SPAIReceivedOn", "D"), ("SPAIDriver", "K"),
             ("SPAILineCount", "I"), ("SPAIValue", "M")],
    columns=[("SPAIOrder", "K"), ("SPAIFromLocation", "K"), ("SPAIScheduledOn", "D"), ("SPAIReceivedOn", "D"), ("SPAIDriver", "K"), ("SPAIStatus", "K"),
             ("SPAILineCount", "I"), ("SPAIValue", "M")]),
  "SPAIDecisionLedger": dict(form="SPAIDecisionLedger_FormPage", list="SPAIDecisionLedger_ListPage",
    profile=[("SPAIActor", "T"), ("SPAIDecisionType", "K"), ("SPAIOccurredOn", "DT")],
    general=[("SPAIOpportunity", "K"), ("SPAIScheduleLine", "K"), ("SPAISequence", "I"), ("SPAIProposedProduct", "K"),
             ("SPAIReasonCode", "K"), ("SPAIConfidence", "N"), ("SPAIPriorValue", "T"), ("SPAINewValue", "T"),
             ("SPAIComplianceChecks", "L")],
    columns=[("SPAIOccurredOn", "DT"), ("SPAISequence", "I"), ("SPAIOpportunity", "K"), ("SPAIScheduleLine", "K"),
             ("SPAIDecisionType", "K"), ("SPAIActor", "T"), ("SPAIProposedProduct", "K"), ("SPAIReasonCode", "K"),
             ("SPAIConfidence", "N"), ("SPAIPriorValue", "T"), ("SPAINewValue", "T")],
    readonly=True),
  "SPAIQuote": dict(form="SPAIQuotes_FormPage", list="SPAIQuotes_ListPage",
    profile=[("SPAINumber", "T"), ("SPAIStatus", "K"), ("SPAIRevision", "I"), ("SPAIOpportunity", "K")],
    general=[("SPAIAccount", "K"), ("SPAIContact", "K"), ("SPAIOwner", "K"), ("SPAICurrency", "K"), ("SPAIQuoteDate", "D"),
             ("SPAIValidUntil", "D"), ("SPAISubmittedOn", "D"), ("SPAIAmount", "M"), ("SPAITotalCost", "M"),
             ("SPAIGrossMarginPct", "N"), ("SPAITerms", "L")],
    columns=[("SPAINumber", "T"), ("SPAIRevision", "I"), ("SPAIStatus", "K"), ("SPAIOpportunity", "K"), ("SPAIAccount", "K"),
             ("SPAIQuoteDate", "D"), ("SPAIAmount", "M"), ("SPAIGrossMarginPct", "N")],
    detail=dict(prefix="SPAIQuoteLines", entity="SPAIQuoteLine", fk="SPAIQuote", title="Quote lines",
                cols=[("SPAILineNumber", "I", 80), ("SPAIProduct", "K", 220), ("SPAIQuantity", "N", 100), ("SPAIPrice", "M", 120),
                      ("SPAIAmount", "M", 130), ("SPAIMarginPct", "N", 100), ("SPAIIsSubstitution", "B", 110),
                      ("SPAICallOffOrder", "K", 170)])),
  "SPAIQuoteLine": dict(form="SPAIQuoteLines_FormPage", list="SPAIQuoteLines_ListPage",
    profile=[("SPAIProduct", "K"), ("SPAIQuote", "K"), ("SPAILineNumber", "I")],
    general=[("SPAIScheduleLine", "K"), ("SPAICallOffOrder", "K"), ("SPAIQuantity", "N"), ("SPAIPrice", "M"), ("SPAIUnitCost", "M"),
             ("SPAIAmount", "M"), ("SPAIMarginPct", "N"), ("SPAIIsSubstitution", "B")],
    columns=[("SPAIQuote", "K"), ("SPAILineNumber", "I"), ("SPAIProduct", "K"), ("SPAIQuantity", "N"), ("SPAIPrice", "M"),
             ("SPAIAmount", "M"), ("SPAIMarginPct", "N"), ("SPAIIsSubstitution", "B")]),
  "SPAILineSource": dict(form="SPAILineSources_FormPage", list="SPAILineSources_ListPage",
    profile=[("SPAILocation", "K"), ("SPAIScheduleLine", "K")],
    general=[("SPAIQtyAllocated", "I"), ("SPAISourceTier", "K"), ("SPAIInterstateFreight", "B"), ("SPAIAllocatedOn", "DT")],
    columns=[("SPAIScheduleLine", "K"), ("SPAILocation", "K"), ("SPAISourceTier", "K"), ("SPAIQtyAllocated", "I"),
             ("SPAIInterstateFreight", "B"), ("SPAIAllocatedOn", "DT")]),
}

def expanded_list(d, parent, index):
    """Freedom UI "Expanded list" detail scoped to the page record (PDS.Id) via modelConfig.dependencies.
    d = dict(prefix, entity, fk, title, cols=[(column, type, width)]). Returns (view ops, attributes, datasources, deps, resources)."""
    vc, attrs, ds, deps, res = [], {}, {}, {}, {}
    X = d["prefix"]
    G, DS, SF, P = f"{X}Grid", f"{X}GridDS", f"{X}Search", f"{X}Panel"
    res.update({f"{P}_title": d["title"], f"{X}Export_caption": "Export to Excel",
                f"{X}Import_caption": "Import data", f"{SF}_placeholder": "Search"})
    def ins(name, parent, idx, values, prop="items"):
        vc.append({"operation": "insert", "name": name, "parentName": parent, "propertyName": prop, "index": idx, "values": values})
    ins(P, parent, index, {"type": "crt.ExpansionPanel", "title": f"#ResourceString({P}_title)#", "expanded": True,
        "togglePosition": "before", "titleWidth": 20, "fullWidthHeader": True, "fitContent": True, "items": [], "tools": []})
    ins(f"{X}GridWrap", P, 0, {"type": "crt.GridContainer", "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)"],
        "rows": "minmax(max-content, 32px)", "gap": {"columnGap": "large", "rowGap": 0}, "styles": {"overflow-x": "hidden"}, "items": []})
    ins(G, f"{X}GridWrap", 0, {"type": "crt.DataGrid", "items": f"${G}", "activeRow": f"${G}_ActiveRow",
        "primaryColumnName": f"{DS}_Id", "fitContent": True, "visible": True,
        "features": {"rows": {"selection": {"enable": True, "multiple": True}}},
        "layoutConfig": {"column": 1, "row": 1, "colSpan": 2, "rowSpan": 6},
        "columns": [{"id": gid(f"{X}:{c}"), "code": f"{DS}_{c}", "path": c, "caption": f"#ResourceString({DS}_{c})#",
                     "dataValueType": LIST_DVT[t], "width": w} for c, t, w in d["cols"]]})
    ins(f"{X}ToolsContainer", P, 0, {"type": "crt.GridContainer", "rows": "minmax(max-content, 24px)",
        "columns": ["minmax(32px, 1fr)"], "gap": {"columnGap": "large", "rowGap": "none"}, "color": "transparent", "items": []}, "tools")
    ins(f"{X}ToolsRow", f"{X}ToolsContainer", 0, {"type": "crt.FlexContainer", "direction": "row",
        "alignItems": "center", "gap": "none", "items": [], "layoutConfig": {"column": 1, "row": 1, "colSpan": 1, "rowSpan": 1}})
    ins(f"{X}AddButton", f"{X}ToolsRow", 0, {"type": "crt.Button", "icon": "add-button-icon",
        "iconPosition": "only-icon", "color": "default",
        "clicked": {"request": "crt.CreateRecordRequest", "params": {"entityName": d["entity"],
                    "defaultValues": [{"attributeName": d["fk"], "value": "$Id"}]}}})
    ins(f"{X}RefreshButton", f"{X}ToolsRow", 1, {"type": "crt.Button", "icon": "reload-icon",
        "iconPosition": "only-icon", "color": "default",
        "clicked": {"request": "crt.LoadDataRequest", "params": {"config": {"loadType": "reload"}, "dataSourceName": DS}}})
    ins(f"{X}SettingsButton", f"{X}ToolsRow", 2, {"type": "crt.Button", "icon": "actions-button-icon",
        "iconPosition": "only-icon", "color": "default", "clickMode": "menu", "menuItems": []})
    ins(f"{X}Export", f"{X}SettingsButton", 0, {"type": "crt.MenuItem", "icon": "export-button-icon",
        "caption": f"#ResourceString({X}Export_caption)#",
        "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": G}}}, "menuItems")
    ins(f"{X}Import", f"{X}SettingsButton", 1, {"type": "crt.MenuItem", "icon": "import-button-icon",
        "caption": f"#ResourceString({X}Import_caption)#",
        "clicked": {"request": "crt.ImportDataRequest", "params": {"entitySchemaName": d["entity"]}}}, "menuItems")
    ins(SF, f"{X}ToolsRow", 3, {"type": "crt.SearchFilter", "iconOnly": True, "placeholder": f"#ResourceString({SF}_placeholder)#",
        "_filterOptions": {"expose": [{"attribute": f"{SF}_{G}", "converters": [{"converter": "crt.SearchFilterAttributeConverter", "args": [G]}]}],
                           "from": [f"{SF}_SearchValue", f"{SF}_FilteredColumnsGroups"]}})
    attrs[G] = {"isCollection": True, "modelConfig": {"path": DS, "filterAttributes": [{"name": f"{SF}_{G}", "loadOnChange": True}]},
                "viewModelConfig": {"attributes": dict([(f"{DS}_Id", {"modelConfig": {"path": f"{DS}.Id"}})] +
                    [(f"{DS}_{c}", {"modelConfig": {"path": f"{DS}.{c}"}}) for c, _, _ in d["cols"]])}}
    ds[DS] = {"type": "crt.EntityDataSource", "scope": "viewElement",
              "config": {"entitySchemaName": d["entity"], "attributes": {c: {"path": c} for c, _, _ in d["cols"]}}}
    deps[DS] = [{"attributePath": d["fk"], "relationPath": "PDS.Id"}]
    return vc, attrs, ds, deps, res

def control(col, t, parent, idx, layout, readonly=False):
    attr = f"PDS_{col}"
    v = {"layoutConfig": layout, "label": f"$Resources.Strings.{attr}", "control": f"${attr}", "labelPosition": "auto"}
    if t in ("T", "L"):
        v.update(type="crt.Input", multiline=(t == "L"))
    elif t in ("I", "N", "M"):
        v.update(type="crt.NumberInput")
    elif t == "K":
        v.update(type="crt.ComboBox", mode="List", showValueAsLink=True)
    elif t in ("D", "DT"):
        v.update(type="crt.DateTimePicker", pickerType="date" if t == "D" else "datetime")
    elif t == "B":
        v.update(type="crt.Checkbox")
    if readonly: v["readonly"] = True
    return {"operation": "insert", "name": f"SPAIField_{col}", "values": v, "parentName": parent, "propertyName": "items", "index": idx}

def dump(x, indent=2):
    return json.dumps(x, indent="\t").replace("\n", "\n" + "\t" * indent)

def form_body(entity, p):
    ro = p.get("readonly", False)
    vc, attrs, res = [], {"Id": {"modelConfig": {"path": "PDS.Id"}}}, {}
    for i, (c, t) in enumerate(p["profile"]):
        vc.append(control(c, t, "SideAreaProfileContainer", i, {"column": 1, "row": i + 1, "colSpan": 1, "rowSpan": 1}, ro))
        attrs[f"PDS_{c}"] = {"modelConfig": {"path": f"PDS.{c}"}}
    row, colno = 1, 1
    for i, (c, t) in enumerate(p["general"]):
        wide = t == "L"
        if wide and colno == 2: row, colno = row + 1, 1
        vc.append(control(c, t, "GeneralInfoTabContainer", i,
                          {"column": colno, "row": row, "colSpan": 2 if wide else 1, "rowSpan": 1}, ro))
        attrs[f"PDS_{c}"] = {"modelConfig": {"path": f"PDS.{c}"}}
        if wide or colno == 2: row, colno = row + 1, 1
        else: colno = 2
    ds = {"PDS": {"type": "crt.EntityDataSource", "config": {"entitySchemaName": entity}, "scope": "page"},
          "AttachmentListDS": {"type": "crt.EntityDataSource", "scope": "viewElement",
                               "config": {"entitySchemaName": "SysFile", "attributes": {"Name": {"path": "Name"}}}}}
    deps = {}
    if p.get("gate1_lock"):
        ds["PDS"]["config"]["attributes"] = {"SPAIOppGate1ApprovedOn": {"path": "SPAIOpportunity.SPAIGate1ApprovedOn",
                                                                         "type": "ForwardReference"}}
        attrs["PDS_SPAIOppGate1ApprovedOn"] = {"modelConfig": {"path": "PDS.SPAIOppGate1ApprovedOn"}}
    d = p.get("detail")
    if d:
        dvc, dattrs, dds, ddeps, dres = expanded_list(d, "GeneralInfoTab", 1)
        vc += dvc; attrs.update(dattrs); ds.update(dds); deps.update(ddeps); res.update(dres)
    # keep the template-generated Feed / Attachments merges
    vc.append({"operation": "merge", "name": "AttachmentList", "values": {"type": "crt.FileList", "masterRecordColumnValue": "$Id",
        "recordColumnName": "RecordId", "layoutConfig": {"colSpan": 2, "column": 1, "row": 1, "rowSpan": 6},
        "items": "$AttachmentList", "primaryColumnName": "AttachmentListDS_Id",
        "columns": [{"id": gid(f"att:{entity}"), "code": "AttachmentListDS_Name", "caption": "#ResourceString(AttachmentListDS_Name)#",
                     "dataValueType": 28, "width": 200}], "viewType": "gallery", "tileSize": "small"},
        "parentName": "AttachmentsTabContainer", "propertyName": "items", "index": 0})
    vc.append({"operation": "merge", "name": "Feed", "values": {"type": "crt.Feed", "feedType": "Record", "primaryColumnValue": "$Id",
        "cardState": "$CardState", "dataSourceName": "PDS", "entitySchemaName": entity},
        "parentName": "FeedTabContainer", "propertyName": "items", "index": 0})
    mc = {"dataSources": ds, "primaryDataSourceName": "PDS"}
    if deps: mc["dependencies"] = deps
    body = f'''define("{p["form"]}", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {{
	return {{
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/{dump(vc)}/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{dump({"attributes": attrs})}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{dump(mc)}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{{}}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{{}}/**SCHEMA_VALIDATORS*/
	}};
}});
'''
    return body, res

def list_body(entity, p):
    cols = p["columns"]
    vc = [{"operation": "merge", "name": "MenuItem_ImportFromExcel",
           "values": {"clicked": {"request": "crt.ImportDataRequest", "params": {"entitySchemaName": entity}}}},
          {"operation": "merge", "name": "FolderTree", "values": {"sourceSchemaName": "FolderTree", "rootSchemaName": entity}},
          {"operation": "merge", "name": "DataTable", "values": {"columns": [
              {"id": gid(f"list:{entity}:{c}"), "code": f"PDS_{c}", "caption": f"#ResourceString(PDS_{c})#",
               "dataValueType": LIST_DVT[t]} for c, t in cols]}},
          {"operation": "merge", "name": "Dashboards", "values": {"_designOptions": {"entitySchemaName": entity,
              "dependencies": [{"attributePath": "Id", "relationPath": "PDS.Id"}], "filters": []}}}]
    if p.get("readonly"):
        for n in ("AddButton", "DataImportButton", "MenuItem_ImportFromExcel"):
            vc.append({"operation": "merge", "name": n, "values": {"visible": False}})
    vmc = [{"operation": "merge", "path": ["attributes", "Items", "viewModelConfig", "attributes"],
            "values": {f"PDS_{c}": {"modelConfig": {"path": f"PDS.{c}"}} for c, _ in cols}}]
    mc = [{"operation": "merge", "path": ["dataSources", "PDS", "config"], "values": {"entitySchemaName": entity}}]
    return f'''define("{p["list"]}", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {{
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

if __name__ == "__main__":
    manifest = []
    for entity, p in PAGES.items():
        fb, fres = form_body(entity, p)
        open(f"{D}/{p['form']}.js", "w").write(fb)
        open(f"{D}/{p['list']}.js", "w").write(list_body(entity, p))
        manifest.append({"schema-name": p["form"], "body-file": f"{D}/{p['form']}.js", "resources": fres})
        manifest.append({"schema-name": p["list"], "body-file": f"{D}/{p['list']}.js", "resources": {}})
    json.dump(manifest, open(f"{D}/manifest.json", "w"), indent=1)
    print("\n".join(m["schema-name"] for m in manifest))
