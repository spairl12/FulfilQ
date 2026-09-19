define("SPAICallUpSchedule_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduleRef",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduleRef",
					"control": "$PDS_SPAIScheduleRef",
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
				"name": "SPAIField_SPAIOpportunity",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
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
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIBlanketOrder",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
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
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIDescription",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIDescription",
					"control": "$PDS_SPAIDescription",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsPanel",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAISchEventsPanel_title)#",
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
				"name": "SPAISchEventsGridWrap",
				"parentName": "SPAISchEventsPanel",
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
				"name": "SPAISchEventsGrid",
				"parentName": "SPAISchEventsGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAISchEventsGrid",
					"activeRow": "$SPAISchEventsGrid_ActiveRow",
					"primaryColumnName": "SPAISchEventsGridDS_Id",
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
							"id": "e603550c-3345-588c-9f41-e184dad0742b",
							"code": "SPAISchEventsGridDS_SPAISequence",
							"path": "SPAISequence",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAISequence)#",
							"dataValueType": 4,
							"width": 90
						},
						{
							"id": "06ae87b8-8b47-53c8-9f84-194540b26ae2",
							"code": "SPAISchEventsGridDS_SPAILabel",
							"path": "SPAILabel",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAILabel)#",
							"dataValueType": 1,
							"width": 180
						},
						{
							"id": "c1a53a6e-f60d-5afb-9deb-745c842fddfe",
							"code": "SPAISchEventsGridDS_SPAIEventType",
							"path": "SPAIEventType",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAIEventType)#",
							"dataValueType": 10,
							"width": 140
						},
						{
							"id": "bf4b6948-0ad6-560f-adff-b843f6b34b6d",
							"code": "SPAISchEventsGridDS_SPAIScheduledOn",
							"path": "SPAIScheduledOn",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAIScheduledOn)#",
							"dataValueType": 8,
							"width": 130
						},
						{
							"id": "782e2797-b5da-5bee-a610-aa2535550e5d",
							"code": "SPAISchEventsGridDS_SPAIDeliveryWindow",
							"path": "SPAIDeliveryWindow",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAIDeliveryWindow)#",
							"dataValueType": 10,
							"width": 150
						},
						{
							"id": "481b7e01-64e2-5378-b357-0005af3c6eee",
							"code": "SPAISchEventsGridDS_SPAIStatus",
							"path": "SPAIStatus",
							"caption": "#ResourceString(SPAISchEventsGridDS_SPAIStatus)#",
							"dataValueType": 10,
							"width": 150
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsToolsContainer",
				"parentName": "SPAISchEventsPanel",
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
				"name": "SPAISchEventsToolsRow",
				"parentName": "SPAISchEventsToolsContainer",
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
				"name": "SPAISchEventsAddButton",
				"parentName": "SPAISchEventsToolsRow",
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
							"entityName": "SPAIDeliveryEvent",
							"defaultValues": [
								{
									"attributeName": "SPAICallUpSchedule",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsRefreshButton",
				"parentName": "SPAISchEventsToolsRow",
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
							"dataSourceName": "SPAISchEventsGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsSettingsButton",
				"parentName": "SPAISchEventsToolsRow",
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
				"name": "SPAISchEventsExport",
				"parentName": "SPAISchEventsSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAISchEventsExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAISchEventsGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsImport",
				"parentName": "SPAISchEventsSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAISchEventsImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDeliveryEvent"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAISchEventsSearch",
				"parentName": "SPAISchEventsToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAISchEventsSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAISchEventsSearch_SPAISchEventsGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAISchEventsGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAISchEventsSearch_SearchValue",
							"SPAISchEventsSearch_FilteredColumnsGroups"
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
							"id": "0ed20575-0dcf-500a-8bd4-d5d54e15ec90",
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
					"entitySchemaName": "SPAICallUpSchedule"
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
				"PDS_SPAIScheduleRef": {
					"modelConfig": {
						"path": "PDS.SPAIScheduleRef"
					}
				},
				"PDS_SPAIOpportunity": {
					"modelConfig": {
						"path": "PDS.SPAIOpportunity"
					}
				},
				"PDS_SPAIBlanketOrder": {
					"modelConfig": {
						"path": "PDS.SPAIBlanketOrder"
					}
				},
				"PDS_SPAIDescription": {
					"modelConfig": {
						"path": "PDS.SPAIDescription"
					}
				},
				"SPAISchEventsGrid": {
					"isCollection": true,
					"modelConfig": {
						"path": "SPAISchEventsGridDS",
						"filterAttributes": [
							{
								"name": "SPAISchEventsSearch_SPAISchEventsGrid",
								"loadOnChange": true
							}
						]
					},
					"viewModelConfig": {
						"attributes": {
							"SPAISchEventsGridDS_Id": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.Id"
								}
							},
							"SPAISchEventsGridDS_SPAISequence": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAISequence"
								}
							},
							"SPAISchEventsGridDS_SPAILabel": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAILabel"
								}
							},
							"SPAISchEventsGridDS_SPAIEventType": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAIEventType"
								}
							},
							"SPAISchEventsGridDS_SPAIScheduledOn": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAIScheduledOn"
								}
							},
							"SPAISchEventsGridDS_SPAIDeliveryWindow": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAIDeliveryWindow"
								}
							},
							"SPAISchEventsGridDS_SPAIStatus": {
								"modelConfig": {
									"path": "SPAISchEventsGridDS.SPAIStatus"
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
						"entitySchemaName": "SPAICallUpSchedule"
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
				"SPAISchEventsGridDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SPAIDeliveryEvent",
						"attributes": {
							"SPAISequence": {
								"path": "SPAISequence"
							},
							"SPAILabel": {
								"path": "SPAILabel"
							},
							"SPAIEventType": {
								"path": "SPAIEventType"
							},
							"SPAIScheduledOn": {
								"path": "SPAIScheduledOn"
							},
							"SPAIDeliveryWindow": {
								"path": "SPAIDeliveryWindow"
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
				"SPAISchEventsGridDS": [
					{
						"attributePath": "SPAICallUpSchedule",
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
