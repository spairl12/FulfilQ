define("SPAIQuotes_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIQuote"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIQuote"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "7a2ad41a-9165-5b05-82ea-b2c5c3bf9336",
							"code": "PDS_SPAINumber",
							"caption": "#ResourceString(PDS_SPAINumber)#",
							"dataValueType": 1
						},
						{
							"id": "e3e38d1f-d688-5fcf-97dc-d34f37a2f03a",
							"code": "PDS_SPAIOpportunity",
							"caption": "#ResourceString(PDS_SPAIOpportunity)#",
							"dataValueType": 10
						},
						{
							"id": "134679c8-a36a-5b99-8da2-36578353ac2e",
							"code": "PDS_SPAIAccount",
							"caption": "#ResourceString(PDS_SPAIAccount)#",
							"dataValueType": 10
						},
						{
							"id": "03fafa64-d200-5b11-b593-8f77cb7d1e1e",
							"code": "PDS_SPAIAmount",
							"caption": "#ResourceString(PDS_SPAIAmount)#",
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
						"entitySchemaName": "SPAIQuote",
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
					"PDS_SPAINumber": {
						"modelConfig": {
							"path": "PDS.SPAINumber"
						}
					},
					"PDS_SPAIOpportunity": {
						"modelConfig": {
							"path": "PDS.SPAIOpportunity"
						}
					},
					"PDS_SPAIAccount": {
						"modelConfig": {
							"path": "PDS.SPAIAccount"
						}
					},
					"PDS_SPAIAmount": {
						"modelConfig": {
							"path": "PDS.SPAIAmount"
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
					"entitySchemaName": "SPAIQuote"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
