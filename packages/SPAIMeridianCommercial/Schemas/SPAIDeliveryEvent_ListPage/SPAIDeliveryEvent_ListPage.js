define("SPAIDeliveryEvent_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDeliveryEvent"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIDeliveryEvent"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "d9b31ae4-ac1d-56dc-9909-dfede2332488",
							"code": "PDS_SPAICallUpSchedule",
							"caption": "#ResourceString(PDS_SPAICallUpSchedule)#",
							"dataValueType": 10
						},
						{
							"id": "38421828-7689-5ae1-92a5-a84402642eb3",
							"code": "PDS_SPAISequence",
							"caption": "#ResourceString(PDS_SPAISequence)#",
							"dataValueType": 4
						},
						{
							"id": "ff746c2a-05c4-5747-85c8-526f2df4bba7",
							"code": "PDS_SPAILabel",
							"caption": "#ResourceString(PDS_SPAILabel)#",
							"dataValueType": 1
						},
						{
							"id": "c428618e-ac74-5363-9537-0166f8038ba8",
							"code": "PDS_SPAIEventType",
							"caption": "#ResourceString(PDS_SPAIEventType)#",
							"dataValueType": 10
						},
						{
							"id": "88be6128-41d4-5c45-885b-33c82222d59c",
							"code": "PDS_SPAIScheduledOn",
							"caption": "#ResourceString(PDS_SPAIScheduledOn)#",
							"dataValueType": 8
						},
						{
							"id": "179f98e3-f084-59dc-b1e4-d88629765795",
							"code": "PDS_SPAIDeliveryWindow",
							"caption": "#ResourceString(PDS_SPAIDeliveryWindow)#",
							"dataValueType": 10
						},
						{
							"id": "43b1e62d-76a8-54e2-8267-9c69a5177b7b",
							"code": "PDS_SPAIStatus",
							"caption": "#ResourceString(PDS_SPAIStatus)#",
							"dataValueType": 10
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAIDeliveryEvent",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "PDS.Id"
							}
						],
						"filters": []
					}
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
					"PDS_SPAICallUpSchedule": {
						"modelConfig": {
							"path": "PDS.SPAICallUpSchedule"
						}
					},
					"PDS_SPAISequence": {
						"modelConfig": {
							"path": "PDS.SPAISequence"
						}
					},
					"PDS_SPAILabel": {
						"modelConfig": {
							"path": "PDS.SPAILabel"
						}
					},
					"PDS_SPAIEventType": {
						"modelConfig": {
							"path": "PDS.SPAIEventType"
						}
					},
					"PDS_SPAIScheduledOn": {
						"modelConfig": {
							"path": "PDS.SPAIScheduledOn"
						}
					},
					"PDS_SPAIDeliveryWindow": {
						"modelConfig": {
							"path": "PDS.SPAIDeliveryWindow"
						}
					},
					"PDS_SPAIStatus": {
						"modelConfig": {
							"path": "PDS.SPAIStatus"
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
					"entitySchemaName": "SPAIDeliveryEvent"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
