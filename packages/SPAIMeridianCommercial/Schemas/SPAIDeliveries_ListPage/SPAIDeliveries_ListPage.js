define("SPAIDeliveries_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDelivery"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIDelivery"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "fdfee76d-3e97-58dd-8687-b65fd05b6ee3",
							"code": "PDS_SPAIOrder",
							"caption": "#ResourceString(PDS_SPAIOrder)#",
							"dataValueType": 10
						},
						{
							"id": "a2fb8341-866b-54fb-a373-a34be2162a42",
							"code": "PDS_SPAIFromLocation",
							"caption": "#ResourceString(PDS_SPAIFromLocation)#",
							"dataValueType": 10
						},
						{
							"id": "e316b2c3-2fb8-53b7-9a12-a2834af1d562",
							"code": "PDS_SPAIScheduledOn",
							"caption": "#ResourceString(PDS_SPAIScheduledOn)#",
							"dataValueType": 8
						},
						{
							"id": "9912967b-09a7-5b0d-824f-e420d98f581e",
							"code": "PDS_SPAIDriver",
							"caption": "#ResourceString(PDS_SPAIDriver)#",
							"dataValueType": 10
						},
						{
							"id": "0d2117f7-0608-5324-98b3-9f013e98a06e",
							"code": "PDS_SPAIStatus",
							"caption": "#ResourceString(PDS_SPAIStatus)#",
							"dataValueType": 10
						},
						{
							"id": "a63fbe51-970a-56b0-ae88-c231f7a8bf83",
							"code": "PDS_SPAILineCount",
							"caption": "#ResourceString(PDS_SPAILineCount)#",
							"dataValueType": 4
						},
						{
							"id": "c5c72b9c-5aee-5b8a-a800-2aeb1c1c0cbb",
							"code": "PDS_SPAIValue",
							"caption": "#ResourceString(PDS_SPAIValue)#",
							"dataValueType": 6
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAIDelivery",
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
					"PDS_SPAIOrder": {
						"modelConfig": {
							"path": "PDS.SPAIOrder"
						}
					},
					"PDS_SPAIFromLocation": {
						"modelConfig": {
							"path": "PDS.SPAIFromLocation"
						}
					},
					"PDS_SPAIScheduledOn": {
						"modelConfig": {
							"path": "PDS.SPAIScheduledOn"
						}
					},
					"PDS_SPAIDriver": {
						"modelConfig": {
							"path": "PDS.SPAIDriver"
						}
					},
					"PDS_SPAIStatus": {
						"modelConfig": {
							"path": "PDS.SPAIStatus"
						}
					},
					"PDS_SPAILineCount": {
						"modelConfig": {
							"path": "PDS.SPAILineCount"
						}
					},
					"PDS_SPAIValue": {
						"modelConfig": {
							"path": "PDS.SPAIValue"
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
					"entitySchemaName": "SPAIDelivery"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
