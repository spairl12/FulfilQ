define("Orders_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIFulfilmentTab",
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.TabContainer",
					"caption": "$Resources.Strings.SPAIFulfilmentTab_caption",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAIFulfilmentFields",
				"parentName": "SPAIFulfilmentTab",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)"
					],
					"rows": "minmax(32px, max-content)",
					"gap": {
						"columnGap": "large"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIOrderType",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIOrderType",
					"control": "$PDS_SPAIOrderType",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPurchaseOrderNo",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPurchaseOrderNo",
					"control": "$PDS_SPAIPurchaseOrderNo",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIBlanketOrder",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIBlanketOrder",
					"control": "$PDS_SPAIBlanketOrder",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIDeliveryLabel",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIDeliveryLabel",
					"control": "$PDS_SPAIDeliveryLabel",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPhaseNumber",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPhaseNumber",
					"control": "$PDS_SPAIPhaseNumber",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPhaseName",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPhaseName",
					"control": "$PDS_SPAIPhaseName",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAITargetDate",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAITargetDate",
					"control": "$PDS_SPAITargetDate",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPrimaryLocation",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPrimaryLocation",
					"control": "$PDS_SPAIPrimaryLocation",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISourceQuote",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISourceQuote",
					"control": "$PDS_SPAISourceQuote",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScope",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 6,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScope",
					"control": "$PDS_SPAIScope",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "SPAIFulfilmentFields",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsPanel",
				"parentName": "SPAIFulfilmentTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAICallOffsPanel_title)#",
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
				"name": "SPAICallOffsGridWrap",
				"parentName": "SPAICallOffsPanel",
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
				"name": "SPAICallOffsGrid",
				"parentName": "SPAICallOffsGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAICallOffsGrid",
					"activeRow": "$SPAICallOffsGrid_ActiveRow",
					"primaryColumnName": "SPAICallOffsGridDS_Id",
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
							"id": "8c5e895d-99cc-577f-942b-d3a966196339",
							"code": "SPAICallOffsGridDS_Number",
							"path": "Number",
							"caption": "#ResourceString(SPAICallOffsGridDS_Number)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "f2fb54d0-5e4e-5d5d-8b35-9573ce545b3b",
							"code": "SPAICallOffsGridDS_SPAIPurchaseOrderNo",
							"path": "SPAIPurchaseOrderNo",
							"caption": "#ResourceString(SPAICallOffsGridDS_SPAIPurchaseOrderNo)#",
							"dataValueType": 1,
							"width": 140
						},
						{
							"id": "dc49181b-f66a-5b3b-8ea0-a886da8c87af",
							"code": "SPAICallOffsGridDS_SPAIDeliveryLabel",
							"path": "SPAIDeliveryLabel",
							"caption": "#ResourceString(SPAICallOffsGridDS_SPAIDeliveryLabel)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "8d3f7fab-b935-5c28-bd57-0135d4a512f9",
							"code": "SPAICallOffsGridDS_SPAIPhaseName",
							"path": "SPAIPhaseName",
							"caption": "#ResourceString(SPAICallOffsGridDS_SPAIPhaseName)#",
							"dataValueType": 1,
							"width": 170
						},
						{
							"id": "c0cbf6a2-61f4-5572-a56f-4c37a44e1d21",
							"code": "SPAICallOffsGridDS_SPAITargetDate",
							"path": "SPAITargetDate",
							"caption": "#ResourceString(SPAICallOffsGridDS_SPAITargetDate)#",
							"dataValueType": 8,
							"width": 120
						},
						{
							"id": "712f9763-34ce-581d-a4e2-72d9ff1fc533",
							"code": "SPAICallOffsGridDS_Status",
							"path": "Status",
							"caption": "#ResourceString(SPAICallOffsGridDS_Status)#",
							"dataValueType": 10,
							"width": 140
						},
						{
							"id": "3dc3735f-7352-5a25-8772-01a72d654179",
							"code": "SPAICallOffsGridDS_DeliveryStatus",
							"path": "DeliveryStatus",
							"caption": "#ResourceString(SPAICallOffsGridDS_DeliveryStatus)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "e7465645-5d0a-5075-89f4-5060ea7b29fe",
							"code": "SPAICallOffsGridDS_Amount",
							"path": "Amount",
							"caption": "#ResourceString(SPAICallOffsGridDS_Amount)#",
							"dataValueType": 6,
							"width": 130
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsToolsContainer",
				"parentName": "SPAICallOffsPanel",
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
				"name": "SPAICallOffsToolsRow",
				"parentName": "SPAICallOffsToolsContainer",
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
				"name": "SPAICallOffsAddButton",
				"parentName": "SPAICallOffsToolsRow",
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
							"entityName": "Order",
							"defaultValues": [
								{
									"attributeName": "SPAIBlanketOrder",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsRefreshButton",
				"parentName": "SPAICallOffsToolsRow",
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
							"dataSourceName": "SPAICallOffsGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsSettingsButton",
				"parentName": "SPAICallOffsToolsRow",
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
				"name": "SPAICallOffsExport",
				"parentName": "SPAICallOffsSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAICallOffsExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAICallOffsGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsImport",
				"parentName": "SPAICallOffsSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAICallOffsImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "Order"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAICallOffsSearch",
				"parentName": "SPAICallOffsToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAICallOffsSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAICallOffsSearch_SPAICallOffsGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAICallOffsGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAICallOffsSearch_SearchValue",
							"SPAICallOffsSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesPanel",
				"parentName": "SPAIFulfilmentTab",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIOrderDeliveriesPanel_title)#",
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
				"name": "SPAIOrderDeliveriesGridWrap",
				"parentName": "SPAIOrderDeliveriesPanel",
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
				"name": "SPAIOrderDeliveriesGrid",
				"parentName": "SPAIOrderDeliveriesGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIOrderDeliveriesGrid",
					"activeRow": "$SPAIOrderDeliveriesGrid_ActiveRow",
					"primaryColumnName": "SPAIOrderDeliveriesGridDS_Id",
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
							"id": "e45fb739-7173-5785-b864-c0ea2057fb69",
							"code": "SPAIOrderDeliveriesGridDS_SPAIFromLocation",
							"path": "SPAIFromLocation",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIFromLocation)#",
							"dataValueType": 10,
							"width": 180
						},
						{
							"id": "40280963-2c3b-5312-82ca-47d66d0721d9",
							"code": "SPAIOrderDeliveriesGridDS_SPAIScheduledOn",
							"path": "SPAIScheduledOn",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIScheduledOn)#",
							"dataValueType": 8,
							"width": 120
						},
						{
							"id": "c2089a36-4299-54aa-9583-dd92c5726275",
							"code": "SPAIOrderDeliveriesGridDS_SPAIReceivedOn",
							"path": "SPAIReceivedOn",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIReceivedOn)#",
							"dataValueType": 8,
							"width": 130
						},
						{
							"id": "0f63e27a-a07d-5c0a-9f4a-f5707fd74449",
							"code": "SPAIOrderDeliveriesGridDS_SPAIStatus",
							"path": "SPAIStatus",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIStatus)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "3d940edc-97db-5201-bf7c-d49f14c72075",
							"code": "SPAIOrderDeliveriesGridDS_SPAIDriver",
							"path": "SPAIDriver",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIDriver)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "26cb3a00-94ac-5449-88f2-a6cfc0241c75",
							"code": "SPAIOrderDeliveriesGridDS_SPAILineCount",
							"path": "SPAILineCount",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAILineCount)#",
							"dataValueType": 4,
							"width": 90
						},
						{
							"id": "d82b507e-583b-5268-baca-e1aafa1b6e60",
							"code": "SPAIOrderDeliveriesGridDS_SPAIValue",
							"path": "SPAIValue",
							"caption": "#ResourceString(SPAIOrderDeliveriesGridDS_SPAIValue)#",
							"dataValueType": 6,
							"width": 120
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesToolsContainer",
				"parentName": "SPAIOrderDeliveriesPanel",
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
				"name": "SPAIOrderDeliveriesToolsRow",
				"parentName": "SPAIOrderDeliveriesToolsContainer",
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
				"name": "SPAIOrderDeliveriesAddButton",
				"parentName": "SPAIOrderDeliveriesToolsRow",
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
							"entityName": "SPAIDelivery",
							"defaultValues": [
								{
									"attributeName": "SPAIOrder",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesRefreshButton",
				"parentName": "SPAIOrderDeliveriesToolsRow",
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
							"dataSourceName": "SPAIOrderDeliveriesGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesSettingsButton",
				"parentName": "SPAIOrderDeliveriesToolsRow",
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
				"name": "SPAIOrderDeliveriesExport",
				"parentName": "SPAIOrderDeliveriesSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIOrderDeliveriesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIOrderDeliveriesGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesImport",
				"parentName": "SPAIOrderDeliveriesSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIOrderDeliveriesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDelivery"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOrderDeliveriesSearch",
				"parentName": "SPAIOrderDeliveriesToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIOrderDeliveriesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIOrderDeliveriesSearch_SPAIOrderDeliveriesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIOrderDeliveriesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIOrderDeliveriesSearch_SearchValue",
							"SPAIOrderDeliveriesSearch_FilteredColumnsGroups"
						]
					}
				}
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"PDS_SPAIOrderType": {
						"modelConfig": {
							"path": "PDS.SPAIOrderType"
						}
					},
					"PDS_SPAIPurchaseOrderNo": {
						"modelConfig": {
							"path": "PDS.SPAIPurchaseOrderNo"
						}
					},
					"PDS_SPAIBlanketOrder": {
						"modelConfig": {
							"path": "PDS.SPAIBlanketOrder"
						}
					},
					"PDS_SPAIDeliveryLabel": {
						"modelConfig": {
							"path": "PDS.SPAIDeliveryLabel"
						}
					},
					"PDS_SPAIPhaseNumber": {
						"modelConfig": {
							"path": "PDS.SPAIPhaseNumber"
						}
					},
					"PDS_SPAIPhaseName": {
						"modelConfig": {
							"path": "PDS.SPAIPhaseName"
						}
					},
					"PDS_SPAITargetDate": {
						"modelConfig": {
							"path": "PDS.SPAITargetDate"
						}
					},
					"PDS_SPAIPrimaryLocation": {
						"modelConfig": {
							"path": "PDS.SPAIPrimaryLocation"
						}
					},
					"PDS_SPAISourceQuote": {
						"modelConfig": {
							"path": "PDS.SPAISourceQuote"
						}
					},
					"PDS_SPAIScope": {
						"modelConfig": {
							"path": "PDS.SPAIScope"
						}
					},
					"SPAICallOffsGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAICallOffsGridDS",
							"filterAttributes": [
								{
									"name": "SPAICallOffsSearch_SPAICallOffsGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAICallOffsGridDS_Id": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.Id"
									}
								},
								"SPAICallOffsGridDS_Number": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.Number"
									}
								},
								"SPAICallOffsGridDS_SPAIPurchaseOrderNo": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.SPAIPurchaseOrderNo"
									}
								},
								"SPAICallOffsGridDS_SPAIDeliveryLabel": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.SPAIDeliveryLabel"
									}
								},
								"SPAICallOffsGridDS_SPAIPhaseName": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.SPAIPhaseName"
									}
								},
								"SPAICallOffsGridDS_SPAITargetDate": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.SPAITargetDate"
									}
								},
								"SPAICallOffsGridDS_Status": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.Status"
									}
								},
								"SPAICallOffsGridDS_DeliveryStatus": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.DeliveryStatus"
									}
								},
								"SPAICallOffsGridDS_Amount": {
									"modelConfig": {
										"path": "SPAICallOffsGridDS.Amount"
									}
								}
							}
						}
					},
					"SPAIOrderDeliveriesGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAIOrderDeliveriesGridDS",
							"filterAttributes": [
								{
									"name": "SPAIOrderDeliveriesSearch_SPAIOrderDeliveriesGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAIOrderDeliveriesGridDS_Id": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.Id"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIFromLocation": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIFromLocation"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIScheduledOn": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIScheduledOn"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIReceivedOn": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIReceivedOn"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIStatus": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIStatus"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIDriver": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIDriver"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAILineCount": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAILineCount"
									}
								},
								"SPAIOrderDeliveriesGridDS_SPAIValue": {
									"modelConfig": {
										"path": "SPAIOrderDeliveriesGridDS.SPAIValue"
									}
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"SPAICallOffsGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Order",
							"attributes": {
								"Number": {
									"path": "Number"
								},
								"SPAIPurchaseOrderNo": {
									"path": "SPAIPurchaseOrderNo"
								},
								"SPAIDeliveryLabel": {
									"path": "SPAIDeliveryLabel"
								},
								"SPAIPhaseName": {
									"path": "SPAIPhaseName"
								},
								"SPAITargetDate": {
									"path": "SPAITargetDate"
								},
								"Status": {
									"path": "Status"
								},
								"DeliveryStatus": {
									"path": "DeliveryStatus"
								},
								"Amount": {
									"path": "Amount"
								}
							}
						}
					},
					"SPAIOrderDeliveriesGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIDelivery",
							"attributes": {
								"SPAIFromLocation": {
									"path": "SPAIFromLocation"
								},
								"SPAIScheduledOn": {
									"path": "SPAIScheduledOn"
								},
								"SPAIReceivedOn": {
									"path": "SPAIReceivedOn"
								},
								"SPAIStatus": {
									"path": "SPAIStatus"
								},
								"SPAIDriver": {
									"path": "SPAIDriver"
								},
								"SPAILineCount": {
									"path": "SPAILineCount"
								},
								"SPAIValue": {
									"path": "SPAIValue"
								}
							}
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"dependencies"
				],
				"values": {
					"SPAICallOffsGridDS": [
						{
							"attributePath": "SPAIBlanketOrder",
							"relationPath": "PDS.Id"
						}
					],
					"SPAIOrderDeliveriesGridDS": [
						{
							"attributePath": "SPAIOrder",
							"relationPath": "PDS.Id"
						}
					]
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
