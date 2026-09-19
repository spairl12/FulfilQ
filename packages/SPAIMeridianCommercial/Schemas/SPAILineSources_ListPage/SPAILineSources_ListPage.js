define("SPAILineSources_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAILineSource"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAILineSource"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "9c0b2852-a5e1-54de-a4cc-e4c2bb0aa131",
							"code": "PDS_SPAIScheduleLine",
							"caption": "#ResourceString(PDS_SPAIScheduleLine)#",
							"dataValueType": 10
						},
						{
							"id": "c069580b-03c9-57cd-b3c0-771538c6ae7e",
							"code": "PDS_SPAILocation",
							"caption": "#ResourceString(PDS_SPAILocation)#",
							"dataValueType": 10
						},
						{
							"id": "661c1327-687c-5923-af96-89160f5288d8",
							"code": "PDS_SPAISourceTier",
							"caption": "#ResourceString(PDS_SPAISourceTier)#",
							"dataValueType": 10
						},
						{
							"id": "19b43863-2540-5d8f-815a-bd24600cf321",
							"code": "PDS_SPAIQtyAllocated",
							"caption": "#ResourceString(PDS_SPAIQtyAllocated)#",
							"dataValueType": 4
						},
						{
							"id": "489484d2-09f8-540a-acfe-d4bfaff0823f",
							"code": "PDS_SPAIInterstateFreight",
							"caption": "#ResourceString(PDS_SPAIInterstateFreight)#",
							"dataValueType": 12
						},
						{
							"id": "a7fe5c6f-a388-5be9-a122-5b402ba46ca8",
							"code": "PDS_SPAIAllocatedOn",
							"caption": "#ResourceString(PDS_SPAIAllocatedOn)#",
							"dataValueType": 7
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAILineSource",
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
					"PDS_SPAIScheduleLine": {
						"modelConfig": {
							"path": "PDS.SPAIScheduleLine"
						}
					},
					"PDS_SPAILocation": {
						"modelConfig": {
							"path": "PDS.SPAILocation"
						}
					},
					"PDS_SPAISourceTier": {
						"modelConfig": {
							"path": "PDS.SPAISourceTier"
						}
					},
					"PDS_SPAIQtyAllocated": {
						"modelConfig": {
							"path": "PDS.SPAIQtyAllocated"
						}
					},
					"PDS_SPAIInterstateFreight": {
						"modelConfig": {
							"path": "PDS.SPAIInterstateFreight"
						}
					},
					"PDS_SPAIAllocatedOn": {
						"modelConfig": {
							"path": "PDS.SPAIAllocatedOn"
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
					"entitySchemaName": "SPAILineSource"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
