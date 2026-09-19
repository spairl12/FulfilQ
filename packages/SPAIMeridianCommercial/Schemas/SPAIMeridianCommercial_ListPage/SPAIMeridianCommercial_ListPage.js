define("SPAIMeridianCommercial_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAILocation"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAILocation"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "efebff80-65dc-5611-ae5f-2463f67f6c48",
							"code": "PDS_SPAIName",
							"caption": "#ResourceString(PDS_SPAIName)#",
							"dataValueType": 1
						},
						{
							"id": "57955774-29d9-5c63-9aff-c62c56b33cde",
							"code": "PDS_SPAICode",
							"caption": "#ResourceString(PDS_SPAICode)#",
							"dataValueType": 1
						},
						{
							"id": "c68e1efb-dc39-54a6-8566-bc2d51e6c3fa",
							"code": "PDS_SPAILocationType",
							"caption": "#ResourceString(PDS_SPAILocationType)#",
							"dataValueType": 10
						},
						{
							"id": "26527362-b8a8-5d24-a733-c8c52be9c179",
							"code": "PDS_SPAIState",
							"caption": "#ResourceString(PDS_SPAIState)#",
							"dataValueType": 1
						},
						{
							"id": "0e794a55-d50b-5efb-85fd-5185fcc194a3",
							"code": "PDS_SPAISuburb",
							"caption": "#ResourceString(PDS_SPAISuburb)#",
							"dataValueType": 1
						},
						{
							"id": "af5eca57-04af-5430-903d-70ebd73d32b2",
							"code": "PDS_SPAISourcingRank",
							"caption": "#ResourceString(PDS_SPAISourcingRank)#",
							"dataValueType": 4
						},
						{
							"id": "58c55577-748e-5d84-86b2-126366b60b72",
							"code": "PDS_SPAIIsAvailable",
							"caption": "#ResourceString(PDS_SPAIIsAvailable)#",
							"dataValueType": 12
						},
						{
							"id": "808e8c03-818a-57c9-991f-7de499ed2c21",
							"code": "PDS_SPAIAcceptingFrom",
							"caption": "#ResourceString(PDS_SPAIAcceptingFrom)#",
							"dataValueType": 8
						},
						{
							"id": "af0385e4-211c-5d7b-9334-546bfd7cbeb1",
							"code": "PDS_SPAIAcceptingUntil",
							"caption": "#ResourceString(PDS_SPAIAcceptingUntil)#",
							"dataValueType": 8
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAILocation",
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
					"PDS_SPAIName": {
						"modelConfig": {
							"path": "PDS.SPAIName"
						}
					},
					"PDS_SPAICode": {
						"modelConfig": {
							"path": "PDS.SPAICode"
						}
					},
					"PDS_SPAILocationType": {
						"modelConfig": {
							"path": "PDS.SPAILocationType"
						}
					},
					"PDS_SPAIState": {
						"modelConfig": {
							"path": "PDS.SPAIState"
						}
					},
					"PDS_SPAISuburb": {
						"modelConfig": {
							"path": "PDS.SPAISuburb"
						}
					},
					"PDS_SPAISourcingRank": {
						"modelConfig": {
							"path": "PDS.SPAISourcingRank"
						}
					},
					"PDS_SPAIIsAvailable": {
						"modelConfig": {
							"path": "PDS.SPAIIsAvailable"
						}
					},
					"PDS_SPAIAcceptingFrom": {
						"modelConfig": {
							"path": "PDS.SPAIAcceptingFrom"
						}
					},
					"PDS_SPAIAcceptingUntil": {
						"modelConfig": {
							"path": "PDS.SPAIAcceptingUntil"
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
					"entitySchemaName": "SPAILocation"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
