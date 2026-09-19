define("SPAIScheduleLines_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAIItemCode",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIItemCode",
					"control": "$PDS_SPAIItemCode",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISpecifiedText",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISpecifiedText",
					"control": "$PDS_SPAISpecifiedText",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAILineStatus",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILineStatus",
					"control": "$PDS_SPAILineStatus",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIReasonCode",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIReasonCode",
					"control": "$PDS_SPAIReasonCode",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIIsAlternative",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIIsAlternative",
					"control": "$PDS_SPAIIsAlternative",
					"labelPosition": "auto",
					"type": "crt.Checkbox"
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIOpportunity",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIOpportunity",
					"control": "$PDS_SPAIOpportunity",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAILineNumber",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILineNumber",
					"control": "$PDS_SPAILineNumber",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIRoomType",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIRoomType",
					"control": "$PDS_SPAIRoomType",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIUnitTier",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIUnitTier",
					"control": "$PDS_SPAIUnitTier",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISpecifiedBrand",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISpecifiedBrand",
					"control": "$PDS_SPAISpecifiedBrand",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISpecifiedModel",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISpecifiedModel",
					"control": "$PDS_SPAISpecifiedModel",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISpecifiedFinish",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISpecifiedFinish",
					"control": "$PDS_SPAISpecifiedFinish",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQuantity",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQuantity",
					"control": "$PDS_SPAIQuantity",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIRequiredCutoutW",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIRequiredCutoutW",
					"control": "$PDS_SPAIRequiredCutoutW",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIRequiredCutoutH",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIRequiredCutoutH",
					"control": "$PDS_SPAIRequiredCutoutH",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIRequiredCutoutD",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 6,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIRequiredCutoutD",
					"control": "$PDS_SPAIRequiredCutoutD",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQtyReceived",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 6,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQtyReceived",
					"control": "$PDS_SPAIQtyReceived",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQtyRemaining",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 7,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQtyRemaining",
					"control": "$PDS_SPAIQtyRemaining",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIMatchedProduct",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 7,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIMatchedProduct",
					"control": "$PDS_SPAIMatchedProduct",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIResolvedBy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 8,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIResolvedBy",
					"control": "$PDS_SPAIResolvedBy",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIConfidence",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 8,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIConfidence",
					"control": "$PDS_SPAIConfidence",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 15
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQtySourced",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 9,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQtySourced",
					"control": "$PDS_SPAIQtySourced",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 16
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQtyShortfall",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 9,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQtyShortfall",
					"control": "$PDS_SPAIQtyShortfall",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 17
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIUnitCost",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 10,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIUnitCost",
					"control": "$PDS_SPAIUnitCost",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 18
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIUnitSell",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 10,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIUnitSell",
					"control": "$PDS_SPAIUnitSell",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 19
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAILineTotal",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 11,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILineTotal",
					"control": "$PDS_SPAILineTotal",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 20
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAILineMarginPct",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 11,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILineMarginPct",
					"control": "$PDS_SPAILineMarginPct",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 21
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAICallOffOrder",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 12,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAICallOffOrder",
					"control": "$PDS_SPAICallOffOrder",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 22
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIEstimatorDecision",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 12,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIEstimatorDecision",
					"control": "$PDS_SPAIEstimatorDecision",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 23
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduleNotes",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 13,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduleNotes",
					"control": "$PDS_SPAIScheduleNotes",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 24
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAdjudicationNote",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 14,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAdjudicationNote",
					"control": "$PDS_SPAIAdjudicationNote",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 25
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIComplianceNotes",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 15,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIComplianceNotes",
					"control": "$PDS_SPAIComplianceNotes",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 26
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesPanel",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAILineSourcesPanel_title)#",
					"expanded": true,
					"togglePosition": "before",
					"titleWidth": 20,
					"fullWidthHeader": true,
					"fitContent": true,
					"items": [],
					"tools": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesGridWrap",
				"parentName": "SPAILineSourcesPanel",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesGrid",
				"parentName": "SPAILineSourcesGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAILineSourcesGrid",
					"activeRow": "$SPAILineSourcesGrid_ActiveRow",
					"primaryColumnName": "SPAILineSourcesGridDS_Id",
					"fitContent": true,
					"visible": true,
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 6
					},
					"columns": [
						{
							"id": "dc277640-f876-5037-8976-8731784417d9",
							"code": "SPAILineSourcesGridDS_SPAILocation",
							"path": "SPAILocation",
							"caption": "#ResourceString(SPAILineSourcesGridDS_SPAILocation)#",
							"dataValueType": 10,
							"width": 200
						},
						{
							"id": "5ad770fc-c64b-5b1f-8c86-fd89587909fa",
							"code": "SPAILineSourcesGridDS_SPAISourceTier",
							"path": "SPAISourceTier",
							"caption": "#ResourceString(SPAILineSourcesGridDS_SPAISourceTier)#",
							"dataValueType": 10,
							"width": 160
						},
						{
							"id": "b1040249-0330-57b3-9040-323b69416053",
							"code": "SPAILineSourcesGridDS_SPAIQtyAllocated",
							"path": "SPAIQtyAllocated",
							"caption": "#ResourceString(SPAILineSourcesGridDS_SPAIQtyAllocated)#",
							"dataValueType": 4,
							"width": 120
						},
						{
							"id": "8ff15ef3-5204-5b08-b59d-540193308426",
							"code": "SPAILineSourcesGridDS_SPAIInterstateFreight",
							"path": "SPAIInterstateFreight",
							"caption": "#ResourceString(SPAILineSourcesGridDS_SPAIInterstateFreight)#",
							"dataValueType": 12,
							"width": 140
						},
						{
							"id": "bf1a79ae-70bf-58df-9ad3-51a18002ce8f",
							"code": "SPAILineSourcesGridDS_SPAIAllocatedOn",
							"path": "SPAIAllocatedOn",
							"caption": "#ResourceString(SPAILineSourcesGridDS_SPAIAllocatedOn)#",
							"dataValueType": 7,
							"width": 170
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesToolsContainer",
				"parentName": "SPAILineSourcesPanel",
				"propertyName": "tools",
				"index": 0,
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"color": "transparent",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesToolsRow",
				"parentName": "SPAILineSourcesToolsContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"alignItems": "center",
					"gap": "none",
					"items": [],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesAddButton",
				"parentName": "SPAILineSourcesToolsRow",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.Button",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAILineSource",
							"defaultValues": [
								{
									"attributeName": "SPAIScheduleLine",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesRefreshButton",
				"parentName": "SPAILineSourcesToolsRow",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.Button",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "SPAILineSourcesGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesSettingsButton",
				"parentName": "SPAILineSourcesToolsRow",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.Button",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clickMode": "menu",
					"menuItems": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesExport",
				"parentName": "SPAILineSourcesSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAILineSourcesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAILineSourcesGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesImport",
				"parentName": "SPAILineSourcesSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAILineSourcesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAILineSource"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAILineSourcesSearch",
				"parentName": "SPAILineSourcesToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAILineSourcesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAILineSourcesSearch_SPAILineSourcesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAILineSourcesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAILineSourcesSearch_SearchValue",
							"SPAILineSourcesSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "merge",
				"name": "AttachmentList",
				"values": {
					"type": "crt.FileList",
					"masterRecordColumnValue": "$Id",
					"recordColumnName": "RecordId",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 6
					},
					"items": "$AttachmentList",
					"primaryColumnName": "AttachmentListDS_Id",
					"columns": [
						{
							"id": "763d200e-0149-57ab-9f16-e10425da52f5",
							"code": "AttachmentListDS_Name",
							"caption": "#ResourceString(AttachmentListDS_Name)#",
							"dataValueType": 28,
							"width": 200
						}
					],
					"viewType": "gallery",
					"tileSize": "small"
				},
				"parentName": "AttachmentsTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Feed",
				"values": {
					"type": "crt.Feed",
					"feedType": "Record",
					"primaryColumnValue": "$Id",
					"cardState": "$CardState",
					"dataSourceName": "PDS",
					"entitySchemaName": "SPAIScheduleLine"
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
			"attributes": {
				"Id": {
					"modelConfig": {
						"path": "PDS.Id"
					}
				},
				"PDS_SPAIItemCode": {
					"modelConfig": {
						"path": "PDS.SPAIItemCode"
					}
				},
				"PDS_SPAISpecifiedText": {
					"modelConfig": {
						"path": "PDS.SPAISpecifiedText"
					}
				},
				"PDS_SPAILineStatus": {
					"modelConfig": {
						"path": "PDS.SPAILineStatus"
					}
				},
				"PDS_SPAIReasonCode": {
					"modelConfig": {
						"path": "PDS.SPAIReasonCode"
					}
				},
				"PDS_SPAIIsAlternative": {
					"modelConfig": {
						"path": "PDS.SPAIIsAlternative"
					}
				},
				"PDS_SPAIOpportunity": {
					"modelConfig": {
						"path": "PDS.SPAIOpportunity"
					}
				},
				"PDS_SPAILineNumber": {
					"modelConfig": {
						"path": "PDS.SPAILineNumber"
					}
				},
				"PDS_SPAIRoomType": {
					"modelConfig": {
						"path": "PDS.SPAIRoomType"
					}
				},
				"PDS_SPAIUnitTier": {
					"modelConfig": {
						"path": "PDS.SPAIUnitTier"
					}
				},
				"PDS_SPAISpecifiedBrand": {
					"modelConfig": {
						"path": "PDS.SPAISpecifiedBrand"
					}
				},
				"PDS_SPAISpecifiedModel": {
					"modelConfig": {
						"path": "PDS.SPAISpecifiedModel"
					}
				},
				"PDS_SPAISpecifiedFinish": {
					"modelConfig": {
						"path": "PDS.SPAISpecifiedFinish"
					}
				},
				"PDS_SPAIQuantity": {
					"modelConfig": {
						"path": "PDS.SPAIQuantity"
					}
				},
				"PDS_SPAIRequiredCutoutW": {
					"modelConfig": {
						"path": "PDS.SPAIRequiredCutoutW"
					}
				},
				"PDS_SPAIRequiredCutoutH": {
					"modelConfig": {
						"path": "PDS.SPAIRequiredCutoutH"
					}
				},
				"PDS_SPAIRequiredCutoutD": {
					"modelConfig": {
						"path": "PDS.SPAIRequiredCutoutD"
					}
				},
				"PDS_SPAIQtyReceived": {
					"modelConfig": {
						"path": "PDS.SPAIQtyReceived"
					}
				},
				"PDS_SPAIQtyRemaining": {
					"modelConfig": {
						"path": "PDS.SPAIQtyRemaining"
					}
				},
				"PDS_SPAIMatchedProduct": {
					"modelConfig": {
						"path": "PDS.SPAIMatchedProduct"
					}
				},
				"PDS_SPAIResolvedBy": {
					"modelConfig": {
						"path": "PDS.SPAIResolvedBy"
					}
				},
				"PDS_SPAIConfidence": {
					"modelConfig": {
						"path": "PDS.SPAIConfidence"
					}
				},
				"PDS_SPAIQtySourced": {
					"modelConfig": {
						"path": "PDS.SPAIQtySourced"
					}
				},
				"PDS_SPAIQtyShortfall": {
					"modelConfig": {
						"path": "PDS.SPAIQtyShortfall"
					}
				},
				"PDS_SPAIUnitCost": {
					"modelConfig": {
						"path": "PDS.SPAIUnitCost"
					}
				},
				"PDS_SPAIUnitSell": {
					"modelConfig": {
						"path": "PDS.SPAIUnitSell"
					}
				},
				"PDS_SPAILineTotal": {
					"modelConfig": {
						"path": "PDS.SPAILineTotal"
					}
				},
				"PDS_SPAILineMarginPct": {
					"modelConfig": {
						"path": "PDS.SPAILineMarginPct"
					}
				},
				"PDS_SPAICallOffOrder": {
					"modelConfig": {
						"path": "PDS.SPAICallOffOrder"
					}
				},
				"PDS_SPAIEstimatorDecision": {
					"modelConfig": {
						"path": "PDS.SPAIEstimatorDecision"
					}
				},
				"PDS_SPAIScheduleNotes": {
					"modelConfig": {
						"path": "PDS.SPAIScheduleNotes"
					}
				},
				"PDS_SPAIAdjudicationNote": {
					"modelConfig": {
						"path": "PDS.SPAIAdjudicationNote"
					}
				},
				"PDS_SPAIComplianceNotes": {
					"modelConfig": {
						"path": "PDS.SPAIComplianceNotes"
					}
				},
				"PDS_SPAIOppGate1ApprovedOn": {
					"modelConfig": {
						"path": "PDS.SPAIOppGate1ApprovedOn"
					}
				},
				"SPAILineSourcesGrid": {
					"isCollection": true,
					"modelConfig": {
						"path": "SPAILineSourcesGridDS",
						"filterAttributes": [
							{
								"name": "SPAILineSourcesSearch_SPAILineSourcesGrid",
								"loadOnChange": true
							}
						]
					},
					"viewModelConfig": {
						"attributes": {
							"SPAILineSourcesGridDS_Id": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.Id"
								}
							},
							"SPAILineSourcesGridDS_SPAILocation": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.SPAILocation"
								}
							},
							"SPAILineSourcesGridDS_SPAISourceTier": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.SPAISourceTier"
								}
							},
							"SPAILineSourcesGridDS_SPAIQtyAllocated": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.SPAIQtyAllocated"
								}
							},
							"SPAILineSourcesGridDS_SPAIInterstateFreight": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.SPAIInterstateFreight"
								}
							},
							"SPAILineSourcesGridDS_SPAIAllocatedOn": {
								"modelConfig": {
									"path": "SPAILineSourcesGridDS.SPAIAllocatedOn"
								}
							}
						}
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "SPAIScheduleLine",
						"attributes": {
							"SPAIOppGate1ApprovedOn": {
								"path": "SPAIOpportunity.SPAIGate1ApprovedOn",
								"type": "ForwardReference"
							}
						}
					},
					"scope": "page"
				},
				"AttachmentListDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SysFile",
						"attributes": {
							"Name": {
								"path": "Name"
							}
						}
					}
				},
				"SPAILineSourcesGridDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SPAILineSource",
						"attributes": {
							"SPAILocation": {
								"path": "SPAILocation"
							},
							"SPAISourceTier": {
								"path": "SPAISourceTier"
							},
							"SPAIQtyAllocated": {
								"path": "SPAIQtyAllocated"
							},
							"SPAIInterstateFreight": {
								"path": "SPAIInterstateFreight"
							},
							"SPAIAllocatedOn": {
								"path": "SPAIAllocatedOn"
							}
						}
					}
				}
			},
			"primaryDataSourceName": "PDS",
			"dependencies": {
				"SPAILineSourcesGridDS": [
					{
						"attributePath": "SPAIScheduleLine",
						"relationPath": "PDS.Id"
					}
				]
			}
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
