define("SPAICallUpSchedule_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAICallUpSchedule"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAICallUpSchedule"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "ac1093cf-e111-5688-b3c6-473fc0caa649",
							"code": "PDS_SPAIScheduleRef",
							"caption": "#ResourceString(PDS_SPAIScheduleRef)#",
							"dataValueType": 1
						},
						{
							"id": "a72b800a-f39a-5ca3-a403-f5df06ed5fd9",
							"code": "PDS_SPAIOpportunity",
							"caption": "#ResourceString(PDS_SPAIOpportunity)#",
							"dataValueType": 10
						},
						{
							"id": "83004c8a-2f62-5fb3-ad04-e7f45e9f3638",
							"code": "PDS_SPAIBlanketOrder",
							"caption": "#ResourceString(PDS_SPAIBlanketOrder)#",
							"dataValueType": 10
						},
						{
							"id": "0b26ceeb-3976-57fc-944e-79cd12308103",
							"code": "PDS_SPAIDescription",
							"caption": "#ResourceString(PDS_SPAIDescription)#",
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
						"entitySchemaName": "SPAICallUpSchedule",
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
					"entitySchemaName": "SPAICallUpSchedule"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
