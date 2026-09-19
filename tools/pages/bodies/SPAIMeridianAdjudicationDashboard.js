define("SPAIMeridianAdjudicationDashboard", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIDashLinesByReason",
				"parentName": "Main",
				"propertyName": "items",
				"index": 0,
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 6,
						"rowSpan": 12
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(SPAIDashLinesByReason_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"series": [
							{
								"type": "bar",
								"label": "#ResourceString(SPAIDashLinesByReason_series_0)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashLinesByReason_SeriesData_rc7k2qa",
										"schemaName": "SPAIScheduleLine",
										"filters": {
											"filter": {
												"items": {},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAIScheduleLine"
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
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAIReasonCode"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "Id",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								},
								"color": "steel-blue"
							}
						],
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "Reason code",
								"formatting": {
									"type": "string"
								}
							},
							"yAxis": {
								"name": "Lines",
								"formatting": {
									"type": "number"
								}
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIDashResolvedBy",
				"parentName": "Main",
				"propertyName": "items",
				"index": 1,
				"values": {
					"layoutConfig": {
						"column": 7,
						"row": 1,
						"colSpan": 6,
						"rowSpan": 12
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(SPAIDashResolvedBy_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"series": [
							{
								"type": "doughnut",
								"label": "#ResourceString(SPAIDashResolvedBy_series_0)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashResolvedBy_SeriesData_rb3m8xd",
										"schemaName": "SPAIScheduleLine",
										"filters": {
											"filter": {
												"items": {},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAIScheduleLine"
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
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAIResolvedBy"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "Id",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								}
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIDashSubstByFamily",
				"parentName": "Main",
				"propertyName": "items",
				"index": 2,
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 13,
						"colSpan": 6,
						"rowSpan": 12
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(SPAIDashSubstByFamily_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"series": [
							{
								"type": "bar",
								"label": "#ResourceString(SPAIDashSubstByFamily_series_0)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashSubstByFamily_SeriesData_sf1p4wz",
										"schemaName": "SPAIScheduleLine",
										"filters": {
											"filter": {
												"items": {},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAIScheduleLine"
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
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAIMatchedProduct.SPAIProductFamily"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "Id",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								},
								"color": "steel-blue"
							},
							{
								"type": "bar",
								"label": "#ResourceString(SPAIDashSubstByFamily_series_1)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashSubstByFamily_SeriesData_sf9n2kv",
										"schemaName": "SPAIScheduleLine",
										"filters": {
											"filter": {
												"items": {
													"statusIn": {
														"filterType": 4,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "SPAILineStatus"
														},
														"isAggregative": false,
														"dataValueType": 10,
														"referenceSchemaName": "SPAILineStatus",
														"rightExpressions": [
															{
																"expressionType": 2,
																"parameter": {
																	"dataValueType": 10,
																	"value": {
																		"Name": "Substitution proposed",
																		"Id": "17da7a7b-39ed-4225-905f-5693f496367f",
																		"value": "17da7a7b-39ed-4225-905f-5693f496367f",
																		"displayValue": "Substitution proposed"
																	}
																}
															},
															{
																"expressionType": 2,
																"parameter": {
																	"dataValueType": 10,
																	"value": {
																		"Name": "Substitution approved",
																		"Id": "8c9103ee-effb-4040-90e8-4d029144e911",
																		"value": "8c9103ee-effb-4040-90e8-4d029144e911",
																		"displayValue": "Substitution approved"
																	}
																}
															}
														]
													}
												},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAIScheduleLine"
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
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAIMatchedProduct.SPAIProductFamily"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "Id",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								},
								"color": "orange"
							}
						],
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "Product family",
								"formatting": {
									"type": "string"
								}
							},
							"yAxis": {
								"name": "Lines",
								"formatting": {
									"type": "number"
								}
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIDashEventsByWindow",
				"parentName": "Main",
				"propertyName": "items",
				"index": 3,
				"values": {
					"layoutConfig": {
						"column": 7,
						"row": 13,
						"colSpan": 6,
						"rowSpan": 12
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(SPAIDashEventsByWindow_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"series": [
							{
								"type": "bar",
								"label": "#ResourceString(SPAIDashEventsByWindow_series_0)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashEventsByWindow_SeriesData_vp5c7ty",
										"schemaName": "SPAIDeliveryEvent",
										"filters": {
											"filter": {
												"items": {},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAIDeliveryEvent"
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
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAIDeliveryWindow"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "Id",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								},
								"color": "forest-green"
							}
						],
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "Delivery window",
								"formatting": {
									"type": "string"
								}
							},
							"yAxis": {
								"name": "Events",
								"formatting": {
									"type": "number"
								}
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SPAIDashAllocByLocType",
				"parentName": "Main",
				"propertyName": "items",
				"index": 4,
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 25,
						"colSpan": 12,
						"rowSpan": 12
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(SPAIDashAllocByLocType_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"series": [
							{
								"type": "bar",
								"label": "#ResourceString(SPAIDashAllocByLocType_series_0)#",
								"legend": {
									"enabled": true
								},
								"dataLabel": {
									"display": true
								},
								"data": {
									"providing": {
										"attribute": "SPAIDashAllocByLocType_SeriesData_al8d3rh",
										"schemaName": "SPAILineSource",
										"filters": {
											"filter": {
												"items": {},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SPAILineSource"
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
														"columnPath": "SPAIQtyAllocated"
													}
												}
											}
										},
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "SPAILocation.SPAILocationType"
												}
											}
										},
										"rowCount": 50,
										"dependencies": [
											{
												"attributePath": "SPAIScheduleLine",
												"relationPath": "DashboardDS.Id"
											}
										]
									}
								},
								"color": "dark-turquoise"
							}
						],
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "Location type",
								"formatting": {
									"type": "string"
								}
							},
							"yAxis": {
								"name": "Units allocated",
								"formatting": {
									"type": "number"
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
