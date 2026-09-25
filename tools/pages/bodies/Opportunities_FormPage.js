define("Opportunities_FormPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIAdjudicationTab",
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.TabContainer",
					"caption": "$Resources.Strings.SPAIAdjudicationTab_caption",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAIAdjButtonsRow",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "small",
					"alignItems": "center",
					"wrap": "wrap",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAIRunAdjudicationButton",
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAIRunAdjudicationButton_caption",
					"color": "primary",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "9ee1691d-65ed-4082-ab21-3484bed32747",
							"statusName": "Matching"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIApproveGate1Button",
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAIApproveGate1Button_caption",
					"color": "default",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "3b41a420-17ff-4543-aa41-41d2cf026c52",
							"statusName": "Awaiting Gate 2"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAISubmitGate2Button",
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAISubmitGate2Button_caption",
					"color": "default",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "41c6d33c-ec68-4f98-8b1b-bc1910292fa9",
							"statusName": "Submitted"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITilesGrid",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Lines",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Lines_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Lines_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAILineCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Lines_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "steel-blue",
							"icon": {
								"iconName": "list-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Exact",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 1,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Exact_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Exact_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIExactMatchCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Exact_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "green",
							"icon": {
								"iconName": "checkmark-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Multi",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Multi_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Multi_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIMultiSourceCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Multi_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "blue",
							"icon": {
								"iconName": "diagram-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Subst",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 4,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Subst_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Subst_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAISubstitutionCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Subst_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "orange",
							"icon": {
								"iconName": "reload-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Escal",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 4,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 5,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Escal_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Escal_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIEscalationCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Escal_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "red",
							"icon": {
								"iconName": "warning-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_NoAI",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 5,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_NoAI_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_NoAI_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIDeterministicCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_NoAI_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "dark-green",
							"icon": {
								"iconName": "calculator-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_AICalls",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 6,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_AICalls_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_AICalls_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIAiCallCount"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_AICalls_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "vivid-purple",
							"icon": {
								"iconName": "copilot-action-button-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Margin",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 7,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 3,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Margin_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Margin_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIGrossMarginPct"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 1,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Margin_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "dark-turquoise",
							"icon": {
								"iconName": "coins-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAITile_Hours",
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 8,
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 4,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Hours_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Hours_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIHoursToClose"
											}
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 1,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Hours_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "navy-blue",
							"icon": {
								"iconName": "clock-icon"
							}
						},
						"theme": "without-fill"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesPanel",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIScheduleLinesPanel_title)#",
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
				"name": "SPAIScheduleLinesGridWrap",
				"parentName": "SPAIScheduleLinesPanel",
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
				"name": "SPAIScheduleLinesGrid",
				"parentName": "SPAIScheduleLinesGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIScheduleLinesGrid",
					"activeRow": "$SPAIScheduleLinesGrid_ActiveRow",
					"primaryColumnName": "SPAIScheduleLinesGridDS_Id",
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
							"id": "b6eddb79-b38c-5459-b51f-a5886d79a43d",
							"code": "SPAIScheduleLinesGridDS_SPAILineNumber",
							"path": "SPAILineNumber",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineNumber)#",
							"dataValueType": 4,
							"width": 80
						},
						{
							"id": "77912170-572c-5ae5-9c19-f6026e854f08",
							"code": "SPAIScheduleLinesGridDS_SPAIRoomType",
							"path": "SPAIRoomType",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIRoomType)#",
							"dataValueType": 10,
							"width": 130
						},
						{
							"id": "daa7cc43-c37b-55a8-adf7-f08fa54561d6",
							"code": "SPAIScheduleLinesGridDS_SPAIUnitTier",
							"path": "SPAIUnitTier",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIUnitTier)#",
							"dataValueType": 10,
							"width": 110
						},
						{
							"id": "001079fa-5039-5e77-8031-aa0cd9285bad",
							"code": "SPAIScheduleLinesGridDS_SPAISpecifiedText",
							"path": "SPAISpecifiedText",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAISpecifiedText)#",
							"dataValueType": 30,
							"width": 260
						},
						{
							"id": "e93c51b5-1a00-58fa-a437-70ff85ec888e",
							"code": "SPAIScheduleLinesGridDS_SPAISpecifiedModel",
							"path": "SPAISpecifiedModel",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAISpecifiedModel)#",
							"dataValueType": 27,
							"width": 130
						},
						{
							"id": "4c4864c1-cff6-59ec-9b68-1b859a0bcd84",
							"code": "SPAIScheduleLinesGridDS_SPAIQuantity",
							"path": "SPAIQuantity",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIQuantity)#",
							"dataValueType": 4,
							"width": 90
						},
						{
							"id": "eb8796d2-78fd-5f8b-bf68-7a19389a73b9",
							"code": "SPAIScheduleLinesGridDS_SPAIMatchedProduct",
							"path": "SPAIMatchedProduct",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIMatchedProduct)#",
							"dataValueType": 10,
							"width": 200
						},
						{
							"id": "80f8ae23-90f1-5d69-ab98-365de45a17de",
							"code": "SPAIScheduleLinesGridDS_SPAILineStatus",
							"path": "SPAILineStatus",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineStatus)#",
							"dataValueType": 10,
							"width": 170
						},
						{
							"id": "2b421609-6892-5c28-83e3-535438a37c14",
							"code": "SPAIScheduleLinesGridDS_SPAIReasonCode",
							"path": "SPAIReasonCode",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIReasonCode)#",
							"dataValueType": 10,
							"width": 190
						},
						{
							"id": "db56946d-a310-5aac-97b0-5f8e2d82c853",
							"code": "SPAIScheduleLinesGridDS_SPAIAdjudicationNote",
							"path": "SPAIAdjudicationNote",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIAdjudicationNote)#",
							"dataValueType": 30,
							"width": 260
						},
						{
							"id": "1995a55b-f8d1-59cb-9440-8205a2caf623",
							"code": "SPAIScheduleLinesGridDS_SPAIComplianceNotes",
							"path": "SPAIComplianceNotes",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIComplianceNotes)#",
							"dataValueType": 30,
							"width": 240
						},
						{
							"id": "bd99c3ec-1557-50f5-b71a-29273a2127ff",
							"code": "SPAIScheduleLinesGridDS_SPAILineMarginPct",
							"path": "SPAILineMarginPct",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineMarginPct)#",
							"dataValueType": 31,
							"width": 100
						},
						{
							"id": "93157c49-5aaf-56f0-bf3e-a96cb72b8ec8",
							"code": "SPAIScheduleLinesGridDS_SPAIQtyRemaining",
							"path": "SPAIQtyRemaining",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIQtyRemaining)#",
							"dataValueType": 4,
							"width": 170
						},
						{
							"id": "6693b931-a7d2-55b3-8fcb-2f372be3d6e1",
							"code": "SPAIScheduleLinesGridDS_SPAIEstimatorDecision",
							"path": "SPAIEstimatorDecision",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIEstimatorDecision)#",
							"dataValueType": 10,
							"width": 150
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesToolsContainer",
				"parentName": "SPAIScheduleLinesPanel",
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
				"name": "SPAIScheduleLinesToolsRow",
				"parentName": "SPAIScheduleLinesToolsContainer",
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
				"name": "SPAIScheduleLinesAddButton",
				"parentName": "SPAIScheduleLinesToolsRow",
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
							"entityName": "SPAIScheduleLine",
							"defaultValues": [
								{
									"attributeName": "SPAIOpportunity",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesRefreshButton",
				"parentName": "SPAIScheduleLinesToolsRow",
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
							"dataSourceName": "SPAIScheduleLinesGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesSettingsButton",
				"parentName": "SPAIScheduleLinesToolsRow",
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
				"name": "SPAIScheduleLinesExport",
				"parentName": "SPAIScheduleLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIScheduleLinesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIScheduleLinesGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesImport",
				"parentName": "SPAIScheduleLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIScheduleLinesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIScheduleLine"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesSearch",
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIScheduleLinesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIScheduleLinesSearch_SPAIScheduleLinesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIScheduleLinesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIScheduleLinesSearch_SearchValue",
							"SPAIScheduleLinesSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIAdjudicationStatusField",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_SPAIAdjudicationStatus_spai",
					"control": "$PDS_SPAIAdjudicationStatus_spai",
					"labelPosition": "left",
					"mode": "List",
					"showValueAsLink": false,
					"readonly": true
				},
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesPanel",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIOppQuotesPanel_title)#",
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
				"name": "SPAIOppQuotesGridWrap",
				"parentName": "SPAIOppQuotesPanel",
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
				"name": "SPAIOppQuotesGrid",
				"parentName": "SPAIOppQuotesGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIOppQuotesGrid",
					"activeRow": "$SPAIOppQuotesGrid_ActiveRow",
					"primaryColumnName": "SPAIOppQuotesGridDS_Id",
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
							"id": "fa28b8b2-c0ea-5922-84d4-f0dbcc48d10b",
							"code": "SPAIOppQuotesGridDS_SPAINumber",
							"path": "SPAINumber",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAINumber)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "03802b6f-bec3-5457-8c1c-63a62b45b4db",
							"code": "SPAIOppQuotesGridDS_SPAIRevision",
							"path": "SPAIRevision",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIRevision)#",
							"dataValueType": 4,
							"width": 90
						},
						{
							"id": "6b4a2326-af25-567a-9856-170f1bf94ee3",
							"code": "SPAIOppQuotesGridDS_SPAIStatus",
							"path": "SPAIStatus",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIStatus)#",
							"dataValueType": 10,
							"width": 140
						},
						{
							"id": "01d45514-c614-5f25-adae-ee6bb443e369",
							"code": "SPAIOppQuotesGridDS_SPAIQuoteDate",
							"path": "SPAIQuoteDate",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIQuoteDate)#",
							"dataValueType": 8,
							"width": 120
						},
						{
							"id": "fa283436-0c8b-57c4-add3-93a96be5fd53",
							"code": "SPAIOppQuotesGridDS_SPAIValidUntil",
							"path": "SPAIValidUntil",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIValidUntil)#",
							"dataValueType": 8,
							"width": 120
						},
						{
							"id": "87baa30d-0c8d-54d0-9aa7-1bb6f45fe721",
							"code": "SPAIOppQuotesGridDS_SPAIAmount",
							"path": "SPAIAmount",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIAmount)#",
							"dataValueType": 6,
							"width": 140
						},
						{
							"id": "5f71e2ed-e447-5b96-a27d-e118700ed23a",
							"code": "SPAIOppQuotesGridDS_SPAIGrossMarginPct",
							"path": "SPAIGrossMarginPct",
							"caption": "#ResourceString(SPAIOppQuotesGridDS_SPAIGrossMarginPct)#",
							"dataValueType": 5,
							"width": 110
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesToolsContainer",
				"parentName": "SPAIOppQuotesPanel",
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
				"name": "SPAIOppQuotesToolsRow",
				"parentName": "SPAIOppQuotesToolsContainer",
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
				"name": "SPAIOppQuotesAddButton",
				"parentName": "SPAIOppQuotesToolsRow",
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
							"entityName": "SPAIQuote",
							"defaultValues": [
								{
									"attributeName": "SPAIOpportunity",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesRefreshButton",
				"parentName": "SPAIOppQuotesToolsRow",
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
							"dataSourceName": "SPAIOppQuotesGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesSettingsButton",
				"parentName": "SPAIOppQuotesToolsRow",
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
				"name": "SPAIOppQuotesExport",
				"parentName": "SPAIOppQuotesSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIOppQuotesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIOppQuotesGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesImport",
				"parentName": "SPAIOppQuotesSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIOppQuotesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIQuote"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppQuotesSearch",
				"parentName": "SPAIOppQuotesToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIOppQuotesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIOppQuotesSearch_SPAIOppQuotesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIOppQuotesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIOppQuotesSearch_SearchValue",
							"SPAIOppQuotesSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsPanel",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 4,
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIOppCallUpsPanel_title)#",
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
				"name": "SPAIOppCallUpsGridWrap",
				"parentName": "SPAIOppCallUpsPanel",
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
				"name": "SPAIOppCallUpsGrid",
				"parentName": "SPAIOppCallUpsGridWrap",
				"propertyName": "items",
				"index": 0,
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIOppCallUpsGrid",
					"activeRow": "$SPAIOppCallUpsGrid_ActiveRow",
					"primaryColumnName": "SPAIOppCallUpsGridDS_Id",
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
							"id": "d97aede0-1ba3-570b-9603-01910654037e",
							"code": "SPAIOppCallUpsGridDS_SPAIScheduleRef",
							"path": "SPAIScheduleRef",
							"caption": "#ResourceString(SPAIOppCallUpsGridDS_SPAIScheduleRef)#",
							"dataValueType": 1,
							"width": 150
						},
						{
							"id": "27bdc033-bd7c-53a8-a3ee-38f037f32b8c",
							"code": "SPAIOppCallUpsGridDS_SPAIDescription",
							"path": "SPAIDescription",
							"caption": "#ResourceString(SPAIOppCallUpsGridDS_SPAIDescription)#",
							"dataValueType": 1,
							"width": 360
						},
						{
							"id": "bc6cf147-f08b-5901-a418-b205313d2ece",
							"code": "SPAIOppCallUpsGridDS_SPAIBlanketOrder",
							"path": "SPAIBlanketOrder",
							"caption": "#ResourceString(SPAIOppCallUpsGridDS_SPAIBlanketOrder)#",
							"dataValueType": 10,
							"width": 170
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsToolsContainer",
				"parentName": "SPAIOppCallUpsPanel",
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
				"name": "SPAIOppCallUpsToolsRow",
				"parentName": "SPAIOppCallUpsToolsContainer",
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
				"name": "SPAIOppCallUpsAddButton",
				"parentName": "SPAIOppCallUpsToolsRow",
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
							"entityName": "SPAICallUpSchedule",
							"defaultValues": [
								{
									"attributeName": "SPAIOpportunity",
									"value": "$Id"
								}
							]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsRefreshButton",
				"parentName": "SPAIOppCallUpsToolsRow",
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
							"dataSourceName": "SPAIOppCallUpsGridDS"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsSettingsButton",
				"parentName": "SPAIOppCallUpsToolsRow",
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
				"name": "SPAIOppCallUpsExport",
				"parentName": "SPAIOppCallUpsSettingsButton",
				"propertyName": "menuItems",
				"index": 0,
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIOppCallUpsExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIOppCallUpsGrid"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsImport",
				"parentName": "SPAIOppCallUpsSettingsButton",
				"propertyName": "menuItems",
				"index": 1,
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIOppCallUpsImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAICallUpSchedule"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIOppCallUpsSearch",
				"parentName": "SPAIOppCallUpsToolsRow",
				"propertyName": "items",
				"index": 3,
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIOppCallUpsSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIOppCallUpsSearch_SPAIOppCallUpsGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIOppCallUpsGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIOppCallUpsSearch_SearchValue",
							"SPAIOppCallUpsSearch_FilteredColumnsGroups"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIGateFields",
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 2,
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)",
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
				"name": "SPAIField_SPAIGate1ApprovedBy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate1ApprovedBy",
					"control": "$PDS_SPAIGate1ApprovedBy",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "SPAIGateFields",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate1ApprovedOn",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate1ApprovedOn",
					"control": "$PDS_SPAIGate1ApprovedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime",
					"readonly": true
				},
				"parentName": "SPAIGateFields",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate2ApprovedBy",
				"values": {
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate2ApprovedBy",
					"control": "$PDS_SPAIGate2ApprovedBy",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "SPAIGateFields",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate2ApprovedOn",
				"values": {
					"layoutConfig": {
						"column": 4,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate2ApprovedOn",
					"control": "$PDS_SPAIGate2ApprovedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime",
					"readonly": true
				},
				"parentName": "SPAIGateFields",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"PDS_SPAIAdjudicationStatus_spai": {
						"modelConfig": {
							"path": "PDS.SPAIAdjudicationStatus"
						}
					},
					"SPAIScheduleLinesGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAIScheduleLinesGridDS",
							"filterAttributes": [
								{
									"name": "SPAIScheduleLinesSearch_SPAIScheduleLinesGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAIScheduleLinesGridDS_Id": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.Id"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineNumber": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineNumber"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIRoomType": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIRoomType"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIUnitTier": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIUnitTier"
									}
								},
								"SPAIScheduleLinesGridDS_SPAISpecifiedText": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAISpecifiedText"
									}
								},
								"SPAIScheduleLinesGridDS_SPAISpecifiedModel": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAISpecifiedModel"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIQuantity": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIQuantity"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIMatchedProduct": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIMatchedProduct"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineStatus": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineStatus"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIReasonCode": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIReasonCode"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIAdjudicationNote": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIAdjudicationNote"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIComplianceNotes": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIComplianceNotes"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineMarginPct": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineMarginPct"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIQtyRemaining": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIQtyRemaining"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIEstimatorDecision": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIEstimatorDecision"
									}
								}
							}
						}
					},
					"SPAIOppQuotesGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAIOppQuotesGridDS",
							"filterAttributes": [
								{
									"name": "SPAIOppQuotesSearch_SPAIOppQuotesGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAIOppQuotesGridDS_Id": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.Id"
									}
								},
								"SPAIOppQuotesGridDS_SPAINumber": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAINumber"
									}
								},
								"SPAIOppQuotesGridDS_SPAIRevision": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIRevision"
									}
								},
								"SPAIOppQuotesGridDS_SPAIStatus": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIStatus"
									}
								},
								"SPAIOppQuotesGridDS_SPAIQuoteDate": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIQuoteDate"
									}
								},
								"SPAIOppQuotesGridDS_SPAIValidUntil": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIValidUntil"
									}
								},
								"SPAIOppQuotesGridDS_SPAIAmount": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIAmount"
									}
								},
								"SPAIOppQuotesGridDS_SPAIGrossMarginPct": {
									"modelConfig": {
										"path": "SPAIOppQuotesGridDS.SPAIGrossMarginPct"
									}
								}
							}
						}
					},
					"SPAIOppCallUpsGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAIOppCallUpsGridDS",
							"filterAttributes": [
								{
									"name": "SPAIOppCallUpsSearch_SPAIOppCallUpsGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAIOppCallUpsGridDS_Id": {
									"modelConfig": {
										"path": "SPAIOppCallUpsGridDS.Id"
									}
								},
								"SPAIOppCallUpsGridDS_SPAIScheduleRef": {
									"modelConfig": {
										"path": "SPAIOppCallUpsGridDS.SPAIScheduleRef"
									}
								},
								"SPAIOppCallUpsGridDS_SPAIDescription": {
									"modelConfig": {
										"path": "SPAIOppCallUpsGridDS.SPAIDescription"
									}
								},
								"SPAIOppCallUpsGridDS_SPAIBlanketOrder": {
									"modelConfig": {
										"path": "SPAIOppCallUpsGridDS.SPAIBlanketOrder"
									}
								}
							}
						}
					},
					"PDS_SPAIGate1ApprovedBy": {
						"modelConfig": {
							"path": "PDS.SPAIGate1ApprovedBy"
						}
					},
					"PDS_SPAIGate1ApprovedOn": {
						"modelConfig": {
							"path": "PDS.SPAIGate1ApprovedOn"
						}
					},
					"PDS_SPAIGate2ApprovedBy": {
						"modelConfig": {
							"path": "PDS.SPAIGate2ApprovedBy"
						}
					},
					"PDS_SPAIGate2ApprovedOn": {
						"modelConfig": {
							"path": "PDS.SPAIGate2ApprovedOn"
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
					"SPAIScheduleLinesGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIScheduleLine",
							"attributes": {
								"SPAILineNumber": {
									"path": "SPAILineNumber"
								},
								"SPAIRoomType": {
									"path": "SPAIRoomType"
								},
								"SPAIUnitTier": {
									"path": "SPAIUnitTier"
								},
								"SPAISpecifiedText": {
									"path": "SPAISpecifiedText"
								},
								"SPAISpecifiedModel": {
									"path": "SPAISpecifiedModel"
								},
								"SPAIQuantity": {
									"path": "SPAIQuantity"
								},
								"SPAIMatchedProduct": {
									"path": "SPAIMatchedProduct"
								},
								"SPAILineStatus": {
									"path": "SPAILineStatus"
								},
								"SPAIReasonCode": {
									"path": "SPAIReasonCode"
								},
								"SPAIAdjudicationNote": {
									"path": "SPAIAdjudicationNote"
								},
								"SPAIComplianceNotes": {
									"path": "SPAIComplianceNotes"
								},
								"SPAILineMarginPct": {
									"path": "SPAILineMarginPct"
								},
								"SPAIQtyRemaining": {
									"path": "SPAIQtyRemaining"
								},
								"SPAIEstimatorDecision": {
									"path": "SPAIEstimatorDecision"
								}
							}
						}
					},
					"SPAIOppQuotesGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIQuote",
							"attributes": {
								"SPAINumber": {
									"path": "SPAINumber"
								},
								"SPAIRevision": {
									"path": "SPAIRevision"
								},
								"SPAIStatus": {
									"path": "SPAIStatus"
								},
								"SPAIQuoteDate": {
									"path": "SPAIQuoteDate"
								},
								"SPAIValidUntil": {
									"path": "SPAIValidUntil"
								},
								"SPAIAmount": {
									"path": "SPAIAmount"
								},
								"SPAIGrossMarginPct": {
									"path": "SPAIGrossMarginPct"
								}
							}
						}
					},
					"SPAIOppCallUpsGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAICallUpSchedule",
							"attributes": {
								"SPAIScheduleRef": {
									"path": "SPAIScheduleRef"
								},
								"SPAIDescription": {
									"path": "SPAIDescription"
								},
								"SPAIBlanketOrder": {
									"path": "SPAIBlanketOrder"
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
					"SPAIScheduleLinesGridDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					],
					"SPAIOppQuotesGridDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					],
					"SPAIOppCallUpsGridDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					]
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
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
		]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
