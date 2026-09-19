define("SPAIDeliveryEvent_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAILabel",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILabel",
					"control": "$PDS_SPAILabel",
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
				"name": "SPAIField_SPAIStatus",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIStatus",
					"control": "$PDS_SPAIStatus",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduledOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduledOn",
					"control": "$PDS_SPAIScheduledOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAICallUpSchedule",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAICallUpSchedule",
					"control": "$PDS_SPAICallUpSchedule",
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
				"name": "SPAIField_SPAIEventCode",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIEventCode",
					"control": "$PDS_SPAIEventCode",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISequence",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISequence",
					"control": "$PDS_SPAISequence",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIEventType",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIEventType",
					"control": "$PDS_SPAIEventType",
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
				"name": "SPAIField_SPAIDeliveryWindow",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIDeliveryWindow",
					"control": "$PDS_SPAIDeliveryWindow",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIEvtSubPOsPanel",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIEvtSubPOsPanel_title)#",
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
				"name": "SPAIEvtSubPOsGridWrap",
				"parentName": "SPAIEvtSubPOsPanel",
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
				"name": "SPAIEvtSubPOsGrid",
				"parentName": "SPAIEvtSubPOsGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIEvtSubPOsGrid",
					"activeRow": "$SPAIEvtSubPOsGrid_ActiveRow",
					"primaryColumnName": "SPAIEvtSubPOsGridDS_Id",
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
							"id": "19f6ad7f-d82e-5353-9344-bb3d53a303f1",
							"code": "SPAIEvtSubPOsGridDS_Number",
							"path": "Number",
							"caption": "#ResourceString(SPAIEvtSubPOsGridDS_Number)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "9b0bf253-c490-537b-b135-d67641f7d5c5",
							"code": "SPAIEvtSubPOsGridDS_SPAIPurchaseOrderNo",
							"path": "SPAIPurchaseOrderNo",
							"caption": "#ResourceString(SPAIEvtSubPOsGridDS_SPAIPurchaseOrderNo)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "a687401a-2994-544a-81e9-2854cf327f95",
							"code": "SPAIEvtSubPOsGridDS_Status",
							"path": "Status",
							"caption": "#ResourceString(SPAIEvtSubPOsGridDS_Status)#",
							"dataValueType": 10,
							"width": 140
						},
						{
							"id": "c48424a5-92d0-5b0c-b02e-64639ec145a9",
							"code": "SPAIEvtSubPOsGridDS_DeliveryStatus",
							"path": "DeliveryStatus",
							"caption": "#ResourceString(SPAIEvtSubPOsGridDS_DeliveryStatus)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "69b08ed9-026a-5b59-8d54-be092346e66c",
							"code": "SPAIEvtSubPOsGridDS_SPAITargetDate",
							"path": "SPAITargetDate",
							"caption": "#ResourceString(SPAIEvtSubPOsGridDS_SPAITargetDate)#",
							"dataValueType": 8,
							"width": 120
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtSubPOsToolsContainer",
				"parentName": "SPAIEvtSubPOsPanel",
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
				"name": "SPAIEvtSubPOsToolsRow",
				"parentName": "SPAIEvtSubPOsToolsContainer",
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
				"name": "SPAIEvtSubPOsAddButton",
				"parentName": "SPAIEvtSubPOsToolsRow",
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
									"attributeName": "SPAIDeliveryEvent",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtSubPOsRefreshButton",
				"parentName": "SPAIEvtSubPOsToolsRow",
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
							"dataSourceName": "SPAIEvtSubPOsGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtSubPOsSettingsButton",
				"parentName": "SPAIEvtSubPOsToolsRow",
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
				"name": "SPAIEvtSubPOsExport",
				"parentName": "SPAIEvtSubPOsSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIEvtSubPOsExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIEvtSubPOsGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtSubPOsImport",
				"parentName": "SPAIEvtSubPOsSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIEvtSubPOsImport_caption)#",
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
				"name": "SPAIEvtSubPOsSearch",
				"parentName": "SPAIEvtSubPOsToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIEvtSubPOsSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIEvtSubPOsSearch_SPAIEvtSubPOsGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIEvtSubPOsGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIEvtSubPOsSearch_SearchValue",
							"SPAIEvtSubPOsSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsPanel",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIEvtCallUpsPanel_title)#",
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
				"name": "SPAIEvtCallUpsGridWrap",
				"parentName": "SPAIEvtCallUpsPanel",
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
				"name": "SPAIEvtCallUpsGrid",
				"parentName": "SPAIEvtCallUpsGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIEvtCallUpsGrid",
					"activeRow": "$SPAIEvtCallUpsGrid_ActiveRow",
					"primaryColumnName": "SPAIEvtCallUpsGridDS_Id",
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
							"id": "7f91083b-b13a-5b81-a186-5a7a6c01a1b7",
							"code": "SPAIEvtCallUpsGridDS_SPAIScheduleLine",
							"path": "SPAIScheduleLine",
							"caption": "#ResourceString(SPAIEvtCallUpsGridDS_SPAIScheduleLine)#",
							"dataValueType": 10,
							"width": 220
						},
						{
							"id": "d62934f3-da4e-5ced-ab9f-1603934299cb",
							"code": "SPAIEvtCallUpsGridDS_SPAISubPO",
							"path": "SPAISubPO",
							"caption": "#ResourceString(SPAIEvtCallUpsGridDS_SPAISubPO)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "c6802cec-64e6-530e-af26-009967f2ee45",
							"code": "SPAIEvtCallUpsGridDS_SPAIQtyRequired",
							"path": "SPAIQtyRequired",
							"caption": "#ResourceString(SPAIEvtCallUpsGridDS_SPAIQtyRequired)#",
							"dataValueType": 4,
							"width": 120
						},
						{
							"id": "73f27e3e-ab86-5e85-9030-c44dfa694a17",
							"code": "SPAIEvtCallUpsGridDS_SPAIQtyDelivered",
							"path": "SPAIQtyDelivered",
							"caption": "#ResourceString(SPAIEvtCallUpsGridDS_SPAIQtyDelivered)#",
							"dataValueType": 4,
							"width": 120
						},
						{
							"id": "9b7cf5f3-8c4a-5db9-9015-4034e8c01929",
							"code": "SPAIEvtCallUpsGridDS_SPAIStatus",
							"path": "SPAIStatus",
							"caption": "#ResourceString(SPAIEvtCallUpsGridDS_SPAIStatus)#",
							"dataValueType": 10,
							"width": 150
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsToolsContainer",
				"parentName": "SPAIEvtCallUpsPanel",
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
				"name": "SPAIEvtCallUpsToolsRow",
				"parentName": "SPAIEvtCallUpsToolsContainer",
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
				"name": "SPAIEvtCallUpsAddButton",
				"parentName": "SPAIEvtCallUpsToolsRow",
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
							"entityName": "SPAICallUpLine",
							"defaultValues": [
								{
									"attributeName": "SPAIDeliveryEvent",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsRefreshButton",
				"parentName": "SPAIEvtCallUpsToolsRow",
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
							"dataSourceName": "SPAIEvtCallUpsGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsSettingsButton",
				"parentName": "SPAIEvtCallUpsToolsRow",
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
				"name": "SPAIEvtCallUpsExport",
				"parentName": "SPAIEvtCallUpsSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIEvtCallUpsExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIEvtCallUpsGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsImport",
				"parentName": "SPAIEvtCallUpsSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIEvtCallUpsImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAICallUpLine"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIEvtCallUpsSearch",
				"parentName": "SPAIEvtCallUpsToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIEvtCallUpsSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIEvtCallUpsSearch_SPAIEvtCallUpsGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIEvtCallUpsGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIEvtCallUpsSearch_SearchValue",
							"SPAIEvtCallUpsSearch_FilteredColumnsGroups"
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
							"id": "577e6b4d-c93e-5eee-8dd3-7465629fd61a",
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
					"entitySchemaName": "SPAIDeliveryEvent"
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
				"PDS_SPAILabel": {
					"modelConfig": {
						"path": "PDS.SPAILabel"
					}
				},
				"PDS_SPAIStatus": {
					"modelConfig": {
						"path": "PDS.SPAIStatus"
					}
				},
				"PDS_SPAIScheduledOn": {
					"modelConfig": {
						"path": "PDS.SPAIScheduledOn"
					}
				},
				"PDS_SPAICallUpSchedule": {
					"modelConfig": {
						"path": "PDS.SPAICallUpSchedule"
					}
				},
				"PDS_SPAIEventCode": {
					"modelConfig": {
						"path": "PDS.SPAIEventCode"
					}
				},
				"PDS_SPAISequence": {
					"modelConfig": {
						"path": "PDS.SPAISequence"
					}
				},
				"PDS_SPAIEventType": {
					"modelConfig": {
						"path": "PDS.SPAIEventType"
					}
				},
				"PDS_SPAIDeliveryWindow": {
					"modelConfig": {
						"path": "PDS.SPAIDeliveryWindow"
					}
				},
				"SPAIEvtSubPOsGrid": {
					"isCollection": true,
					"modelConfig": {
						"path": "SPAIEvtSubPOsGridDS",
						"filterAttributes": [
							{
								"name": "SPAIEvtSubPOsSearch_SPAIEvtSubPOsGrid",
								"loadOnChange": true
							}
						]
					},
					"viewModelConfig": {
						"attributes": {
							"SPAIEvtSubPOsGridDS_Id": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.Id"
								}
							},
							"SPAIEvtSubPOsGridDS_Number": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.Number"
								}
							},
							"SPAIEvtSubPOsGridDS_SPAIPurchaseOrderNo": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.SPAIPurchaseOrderNo"
								}
							},
							"SPAIEvtSubPOsGridDS_Status": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.Status"
								}
							},
							"SPAIEvtSubPOsGridDS_DeliveryStatus": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.DeliveryStatus"
								}
							},
							"SPAIEvtSubPOsGridDS_SPAITargetDate": {
								"modelConfig": {
									"path": "SPAIEvtSubPOsGridDS.SPAITargetDate"
								}
							}
						}
					}
				},
				"SPAIEvtCallUpsGrid": {
					"isCollection": true,
					"modelConfig": {
						"path": "SPAIEvtCallUpsGridDS",
						"filterAttributes": [
							{
								"name": "SPAIEvtCallUpsSearch_SPAIEvtCallUpsGrid",
								"loadOnChange": true
							}
						]
					},
					"viewModelConfig": {
						"attributes": {
							"SPAIEvtCallUpsGridDS_Id": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.Id"
								}
							},
							"SPAIEvtCallUpsGridDS_SPAIScheduleLine": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.SPAIScheduleLine"
								}
							},
							"SPAIEvtCallUpsGridDS_SPAISubPO": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.SPAISubPO"
								}
							},
							"SPAIEvtCallUpsGridDS_SPAIQtyRequired": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.SPAIQtyRequired"
								}
							},
							"SPAIEvtCallUpsGridDS_SPAIQtyDelivered": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.SPAIQtyDelivered"
								}
							},
							"SPAIEvtCallUpsGridDS_SPAIStatus": {
								"modelConfig": {
									"path": "SPAIEvtCallUpsGridDS.SPAIStatus"
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
						"entitySchemaName": "SPAIDeliveryEvent"
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
				"SPAIEvtSubPOsGridDS": {
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
							"Status": {
								"path": "Status"
							},
							"DeliveryStatus": {
								"path": "DeliveryStatus"
							},
							"SPAITargetDate": {
								"path": "SPAITargetDate"
							}
						}
					}
				},
				"SPAIEvtCallUpsGridDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SPAICallUpLine",
						"attributes": {
							"SPAIScheduleLine": {
								"path": "SPAIScheduleLine"
							},
							"SPAISubPO": {
								"path": "SPAISubPO"
							},
							"SPAIQtyRequired": {
								"path": "SPAIQtyRequired"
							},
							"SPAIQtyDelivered": {
								"path": "SPAIQtyDelivered"
							},
							"SPAIStatus": {
								"path": "SPAIStatus"
							}
						}
					}
				}
			},
			"primaryDataSourceName": "PDS",
			"dependencies": {
				"SPAIEvtSubPOsGridDS": [
					{
						"attributePath": "SPAIDeliveryEvent",
						"relationPath": "PDS.Id"
					}
				],
				"SPAIEvtCallUpsGridDS": [
					{
						"attributePath": "SPAIDeliveryEvent",
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
