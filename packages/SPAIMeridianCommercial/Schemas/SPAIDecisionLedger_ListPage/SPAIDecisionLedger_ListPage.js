define("SPAIDecisionLedger_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDecisionLedger"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIDecisionLedger"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "acf8c349-c970-5351-b420-062bbf765739",
							"code": "PDS_SPAIOccurredOn",
							"caption": "#ResourceString(PDS_SPAIOccurredOn)#",
							"dataValueType": 7
						},
						{
							"id": "70fc747f-6364-534f-be7c-ccbf53fc58fe",
							"code": "PDS_SPAISequence",
							"caption": "#ResourceString(PDS_SPAISequence)#",
							"dataValueType": 4
						},
						{
							"id": "a5bfc2fa-bf8f-555f-bbaa-8f3bf247579d",
							"code": "PDS_SPAIOpportunity",
							"caption": "#ResourceString(PDS_SPAIOpportunity)#",
							"dataValueType": 10
						},
						{
							"id": "0b33d445-b6cc-5a37-9e82-5abd0ec8ec6a",
							"code": "PDS_SPAIScheduleLine",
							"caption": "#ResourceString(PDS_SPAIScheduleLine)#",
							"dataValueType": 10
						},
						{
							"id": "ae681a77-b2ce-572b-a04c-637b64d34f08",
							"code": "PDS_SPAIDecisionType",
							"caption": "#ResourceString(PDS_SPAIDecisionType)#",
							"dataValueType": 10
						},
						{
							"id": "b8b4158b-1489-517d-a5a3-34b3d8cb0dcd",
							"code": "PDS_SPAIActor",
							"caption": "#ResourceString(PDS_SPAIActor)#",
							"dataValueType": 1
						},
						{
							"id": "ba32b6fc-9125-54fe-bab0-eead912a4306",
							"code": "PDS_SPAIProposedProduct",
							"caption": "#ResourceString(PDS_SPAIProposedProduct)#",
							"dataValueType": 10
						},
						{
							"id": "918d5582-14f0-5139-99dc-22abe01a777e",
							"code": "PDS_SPAIReasonCode",
							"caption": "#ResourceString(PDS_SPAIReasonCode)#",
							"dataValueType": 10
						},
						{
							"id": "91f04881-ef0e-5864-8930-c9b29a3b3e59",
							"code": "PDS_SPAIConfidence",
							"caption": "#ResourceString(PDS_SPAIConfidence)#",
							"dataValueType": 5
						},
						{
							"id": "36d3f5c2-43c3-5079-9797-6a37afcb2e2f",
							"code": "PDS_SPAIPriorValue",
							"caption": "#ResourceString(PDS_SPAIPriorValue)#",
							"dataValueType": 1
						},
						{
							"id": "e9a113f6-3364-5e9e-89df-4a4fcca04ff7",
							"code": "PDS_SPAINewValue",
							"caption": "#ResourceString(PDS_SPAINewValue)#",
							"dataValueType": 1
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAIDecisionLedger",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "PDS.Id"
							}
						],
						"filters": []
					}
				}
			},
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "DataImportButton",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Items",
					"viewModelConfig",
					"attributes"
				],
				"values": {
					"PDS_SPAIOccurredOn": {
						"modelConfig": {
							"path": "PDS.SPAIOccurredOn"
						}
					},
					"PDS_SPAISequence": {
						"modelConfig": {
							"path": "PDS.SPAISequence"
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
					"PDS_SPAIDecisionType": {
						"modelConfig": {
							"path": "PDS.SPAIDecisionType"
						}
					},
					"PDS_SPAIActor": {
						"modelConfig": {
							"path": "PDS.SPAIActor"
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
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "SPAIDecisionLedger"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
