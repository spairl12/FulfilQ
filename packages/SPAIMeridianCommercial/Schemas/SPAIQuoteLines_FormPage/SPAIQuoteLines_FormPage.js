define("SPAIQuoteLines_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAIProduct",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIProduct",
					"control": "$PDS_SPAIProduct",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQuote",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQuote",
					"control": "$PDS_SPAIQuote",
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
				"name": "SPAIField_SPAILineNumber",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILineNumber",
					"control": "$PDS_SPAILineNumber",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduleLine",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduleLine",
					"control": "$PDS_SPAIScheduleLine",
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
				"name": "SPAIField_SPAICallOffOrder",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
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
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQuantity",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
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
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPrice",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPrice",
					"control": "$PDS_SPAIPrice",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIUnitCost",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
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
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAmount",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
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
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIMarginPct",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIMarginPct",
					"control": "$PDS_SPAIMarginPct",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIIsSubstitution",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIIsSubstitution",
					"control": "$PDS_SPAIIsSubstitution",
					"labelPosition": "auto",
					"type": "crt.Checkbox"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 7
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
							"id": "52f0a48c-7707-508f-b041-71c15116c068",
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
					"entitySchemaName": "SPAIQuoteLine"
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
				"PDS_SPAIProduct": {
					"modelConfig": {
						"path": "PDS.SPAIProduct"
					}
				},
				"PDS_SPAIQuote": {
					"modelConfig": {
						"path": "PDS.SPAIQuote"
					}
				},
				"PDS_SPAILineNumber": {
					"modelConfig": {
						"path": "PDS.SPAILineNumber"
					}
				},
				"PDS_SPAIScheduleLine": {
					"modelConfig": {
						"path": "PDS.SPAIScheduleLine"
					}
				},
				"PDS_SPAICallOffOrder": {
					"modelConfig": {
						"path": "PDS.SPAICallOffOrder"
					}
				},
				"PDS_SPAIQuantity": {
					"modelConfig": {
						"path": "PDS.SPAIQuantity"
					}
				},
				"PDS_SPAIPrice": {
					"modelConfig": {
						"path": "PDS.SPAIPrice"
					}
				},
				"PDS_SPAIUnitCost": {
					"modelConfig": {
						"path": "PDS.SPAIUnitCost"
					}
				},
				"PDS_SPAIAmount": {
					"modelConfig": {
						"path": "PDS.SPAIAmount"
					}
				},
				"PDS_SPAIMarginPct": {
					"modelConfig": {
						"path": "PDS.SPAIMarginPct"
					}
				},
				"PDS_SPAIIsSubstitution": {
					"modelConfig": {
						"path": "PDS.SPAIIsSubstitution"
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "SPAIQuoteLine"
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
				}
			},
			"primaryDataSourceName": "PDS"
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
