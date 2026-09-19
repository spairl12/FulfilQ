define("SPAIDecisionLedger_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAIActor",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIActor",
					"control": "$PDS_SPAIActor",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false,
					"readonly": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIDecisionType",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIDecisionType",
					"control": "$PDS_SPAIDecisionType",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIOccurredOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIOccurredOn",
					"control": "$PDS_SPAIOccurredOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime",
					"readonly": true
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
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIOpportunity",
					"control": "$PDS_SPAIOpportunity",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduleLine",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduleLine",
					"control": "$PDS_SPAIScheduleLine",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
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
					"type": "crt.NumberInput",
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIProposedProduct",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIProposedProduct",
					"control": "$PDS_SPAIProposedProduct",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIReasonCode",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIReasonCode",
					"control": "$PDS_SPAIReasonCode",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIConfidence",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIConfidence",
					"control": "$PDS_SPAIConfidence",
					"labelPosition": "auto",
					"type": "crt.NumberInput",
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIPriorValue",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIPriorValue",
					"control": "$PDS_SPAIPriorValue",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAINewValue",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAINewValue",
					"control": "$PDS_SPAINewValue",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIComplianceChecks",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIComplianceChecks",
					"control": "$PDS_SPAIComplianceChecks",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": true,
					"readonly": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 8
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
							"id": "39c5077d-dd07-51c9-a6bf-0289781cf128",
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
					"entitySchemaName": "SPAIDecisionLedger"
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
				"PDS_SPAIActor": {
					"modelConfig": {
						"path": "PDS.SPAIActor"
					}
				},
				"PDS_SPAIDecisionType": {
					"modelConfig": {
						"path": "PDS.SPAIDecisionType"
					}
				},
				"PDS_SPAIOccurredOn": {
					"modelConfig": {
						"path": "PDS.SPAIOccurredOn"
					}
				},
				"PDS_SPAIOpportunity": {
					"modelConfig": {
						"path": "PDS.SPAIOpportunity"
					}
				},
				"PDS_SPAIScheduleLine": {
					"modelConfig": {
						"path": "PDS.SPAIScheduleLine"
					}
				},
				"PDS_SPAISequence": {
					"modelConfig": {
						"path": "PDS.SPAISequence"
					}
				},
				"PDS_SPAIProposedProduct": {
					"modelConfig": {
						"path": "PDS.SPAIProposedProduct"
					}
				},
				"PDS_SPAIReasonCode": {
					"modelConfig": {
						"path": "PDS.SPAIReasonCode"
					}
				},
				"PDS_SPAIConfidence": {
					"modelConfig": {
						"path": "PDS.SPAIConfidence"
					}
				},
				"PDS_SPAIPriorValue": {
					"modelConfig": {
						"path": "PDS.SPAIPriorValue"
					}
				},
				"PDS_SPAINewValue": {
					"modelConfig": {
						"path": "PDS.SPAINewValue"
					}
				},
				"PDS_SPAIComplianceChecks": {
					"modelConfig": {
						"path": "PDS.SPAIComplianceChecks"
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "SPAIDecisionLedger"
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
