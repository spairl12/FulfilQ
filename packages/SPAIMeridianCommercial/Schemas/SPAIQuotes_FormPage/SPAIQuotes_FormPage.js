define("SPAIQuotes_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAINumber",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAINumber",
					"control": "$PDS_SPAINumber",
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
				"name": "SPAIField_SPAIRevision",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIRevision",
					"control": "$PDS_SPAIRevision",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIOpportunity",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
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
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAccount",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAccount",
					"control": "$PDS_SPAIAccount",
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
				"name": "SPAIField_SPAIContact",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIContact",
					"control": "$PDS_SPAIContact",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIOwner",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIOwner",
					"control": "$PDS_SPAIOwner",
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
				"name": "SPAIField_SPAICurrency",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAICurrency",
					"control": "$PDS_SPAICurrency",
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
				"name": "SPAIField_SPAIQuoteDate",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQuoteDate",
					"control": "$PDS_SPAIQuoteDate",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIValidUntil",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIValidUntil",
					"control": "$PDS_SPAIValidUntil",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISubmittedOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISubmittedOn",
					"control": "$PDS_SPAISubmittedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAmount",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAmount",
					"control": "$PDS_SPAIAmount",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAITotalCost",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAITotalCost",
					"control": "$PDS_SPAITotalCost",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGrossMarginPct",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGrossMarginPct",
					"control": "$PDS_SPAIGrossMarginPct",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAITerms",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 6,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAITerms",
					"control": "$PDS_SPAITerms",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesPanel",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIQuoteLinesPanel_title)#",
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
				"name": "SPAIQuoteLinesGridWrap",
				"parentName": "SPAIQuoteLinesPanel",
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
				"name": "SPAIQuoteLinesGrid",
				"parentName": "SPAIQuoteLinesGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIQuoteLinesGrid",
					"activeRow": "$SPAIQuoteLinesGrid_ActiveRow",
					"primaryColumnName": "SPAIQuoteLinesGridDS_Id",
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
							"id": "9d4e3512-9bc8-5c4a-9fd0-468f8e1e8baa",
							"code": "SPAIQuoteLinesGridDS_SPAILineNumber",
							"path": "SPAILineNumber",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAILineNumber)#",
							"dataValueType": 4,
							"width": 80
						},
						{
							"id": "c459f0ae-04fe-53d6-b179-8be0437c164f",
							"code": "SPAIQuoteLinesGridDS_SPAIProduct",
							"path": "SPAIProduct",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIProduct)#",
							"dataValueType": 10,
							"width": 220
						},
						{
							"id": "f07b9304-aa81-51bb-a107-a11346286cbd",
							"code": "SPAIQuoteLinesGridDS_SPAIQuantity",
							"path": "SPAIQuantity",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIQuantity)#",
							"dataValueType": 5,
							"width": 100
						},
						{
							"id": "b0544619-8cde-502a-9bef-8e375d198527",
							"code": "SPAIQuoteLinesGridDS_SPAIPrice",
							"path": "SPAIPrice",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIPrice)#",
							"dataValueType": 6,
							"width": 120
						},
						{
							"id": "f50e2056-3ba8-5c09-a8f8-25def9a0278d",
							"code": "SPAIQuoteLinesGridDS_SPAIAmount",
							"path": "SPAIAmount",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIAmount)#",
							"dataValueType": 6,
							"width": 130
						},
						{
							"id": "9dd2468a-a226-56c7-b2cc-a11457327e91",
							"code": "SPAIQuoteLinesGridDS_SPAIMarginPct",
							"path": "SPAIMarginPct",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIMarginPct)#",
							"dataValueType": 5,
							"width": 100
						},
						{
							"id": "092f4ea5-b4e2-520a-88e6-2fcdff68081d",
							"code": "SPAIQuoteLinesGridDS_SPAIIsSubstitution",
							"path": "SPAIIsSubstitution",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAIIsSubstitution)#",
							"dataValueType": 12,
							"width": 110
						},
						{
							"id": "9edf4373-2c52-5fd0-aedd-2fd967ceb127",
							"code": "SPAIQuoteLinesGridDS_SPAICallOffOrder",
							"path": "SPAICallOffOrder",
							"caption": "#ResourceString(SPAIQuoteLinesGridDS_SPAICallOffOrder)#",
							"dataValueType": 10,
							"width": 170
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesToolsContainer",
				"parentName": "SPAIQuoteLinesPanel",
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
				"name": "SPAIQuoteLinesToolsRow",
				"parentName": "SPAIQuoteLinesToolsContainer",
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
				"name": "SPAIQuoteLinesAddButton",
				"parentName": "SPAIQuoteLinesToolsRow",
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
							"entityName": "SPAIQuoteLine",
							"defaultValues": [
								{
									"attributeName": "SPAIQuote",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesRefreshButton",
				"parentName": "SPAIQuoteLinesToolsRow",
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
							"dataSourceName": "SPAIQuoteLinesGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesSettingsButton",
				"parentName": "SPAIQuoteLinesToolsRow",
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
				"name": "SPAIQuoteLinesExport",
				"parentName": "SPAIQuoteLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIQuoteLinesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIQuoteLinesGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesImport",
				"parentName": "SPAIQuoteLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIQuoteLinesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIQuoteLine"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIQuoteLinesSearch",
				"parentName": "SPAIQuoteLinesToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIQuoteLinesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIQuoteLinesSearch_SPAIQuoteLinesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIQuoteLinesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIQuoteLinesSearch_SearchValue",
							"SPAIQuoteLinesSearch_FilteredColumnsGroups"
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
							"id": "f153f053-a0b1-54ac-8a75-5f15a1390e24",
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
					"entitySchemaName": "SPAIQuote"
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
				"PDS_SPAINumber": {
					"modelConfig": {
						"path": "PDS.SPAINumber"
					}
				},
				"PDS_SPAIStatus": {
					"modelConfig": {
						"path": "PDS.SPAIStatus"
					}
				},
				"PDS_SPAIRevision": {
					"modelConfig": {
						"path": "PDS.SPAIRevision"
					}
				},
				"PDS_SPAIOpportunity": {
					"modelConfig": {
						"path": "PDS.SPAIOpportunity"
					}
				},
				"PDS_SPAIAccount": {
					"modelConfig": {
						"path": "PDS.SPAIAccount"
					}
				},
				"PDS_SPAIContact": {
					"modelConfig": {
						"path": "PDS.SPAIContact"
					}
				},
				"PDS_SPAIOwner": {
					"modelConfig": {
						"path": "PDS.SPAIOwner"
					}
				},
				"PDS_SPAICurrency": {
					"modelConfig": {
						"path": "PDS.SPAICurrency"
					}
				},
				"PDS_SPAIQuoteDate": {
					"modelConfig": {
						"path": "PDS.SPAIQuoteDate"
					}
				},
				"PDS_SPAIValidUntil": {
					"modelConfig": {
						"path": "PDS.SPAIValidUntil"
					}
				},
				"PDS_SPAISubmittedOn": {
					"modelConfig": {
						"path": "PDS.SPAISubmittedOn"
					}
				},
				"PDS_SPAIAmount": {
					"modelConfig": {
						"path": "PDS.SPAIAmount"
					}
				},
				"PDS_SPAITotalCost": {
					"modelConfig": {
						"path": "PDS.SPAITotalCost"
					}
				},
				"PDS_SPAIGrossMarginPct": {
					"modelConfig": {
						"path": "PDS.SPAIGrossMarginPct"
					}
				},
				"PDS_SPAITerms": {
					"modelConfig": {
						"path": "PDS.SPAITerms"
					}
				},
				"SPAIQuoteLinesGrid": {
					"isCollection": true,
					"modelConfig": {
						"path": "SPAIQuoteLinesGridDS",
						"filterAttributes": [
							{
								"name": "SPAIQuoteLinesSearch_SPAIQuoteLinesGrid",
								"loadOnChange": true
							}
						]
					},
					"viewModelConfig": {
						"attributes": {
							"SPAIQuoteLinesGridDS_Id": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.Id"
								}
							},
							"SPAIQuoteLinesGridDS_SPAILineNumber": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAILineNumber"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIProduct": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIProduct"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIQuantity": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIQuantity"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIPrice": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIPrice"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIAmount": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIAmount"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIMarginPct": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIMarginPct"
								}
							},
							"SPAIQuoteLinesGridDS_SPAIIsSubstitution": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAIIsSubstitution"
								}
							},
							"SPAIQuoteLinesGridDS_SPAICallOffOrder": {
								"modelConfig": {
									"path": "SPAIQuoteLinesGridDS.SPAICallOffOrder"
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
						"entitySchemaName": "SPAIQuote"
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
				"SPAIQuoteLinesGridDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SPAIQuoteLine",
						"attributes": {
							"SPAILineNumber": {
								"path": "SPAILineNumber"
							},
							"SPAIProduct": {
								"path": "SPAIProduct"
							},
							"SPAIQuantity": {
								"path": "SPAIQuantity"
							},
							"SPAIPrice": {
								"path": "SPAIPrice"
							},
							"SPAIAmount": {
								"path": "SPAIAmount"
							},
							"SPAIMarginPct": {
								"path": "SPAIMarginPct"
							},
							"SPAIIsSubstitution": {
								"path": "SPAIIsSubstitution"
							},
							"SPAICallOffOrder": {
								"path": "SPAICallOffOrder"
							}
						}
					}
				}
			},
			"primaryDataSourceName": "PDS",
			"dependencies": {
				"SPAIQuoteLinesGridDS": [
					{
						"attributePath": "SPAIQuote",
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
