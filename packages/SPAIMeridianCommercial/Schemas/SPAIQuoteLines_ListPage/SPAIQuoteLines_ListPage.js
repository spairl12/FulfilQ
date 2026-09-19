define("SPAIQuoteLines_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIQuoteLine"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIQuoteLine"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "46de4732-2e18-5ea6-af3b-b8b39ea63080",
							"code": "PDS_SPAIQuote",
							"caption": "#ResourceString(PDS_SPAIQuote)#",
							"dataValueType": 10
						},
						{
							"id": "29743c99-dbab-5457-8889-fa828445d5b4",
							"code": "PDS_SPAIProduct",
							"caption": "#ResourceString(PDS_SPAIProduct)#",
							"dataValueType": 10
						},
						{
							"id": "0e25c551-93c0-5542-8feb-98b332510f7e",
							"code": "PDS_SPAIQuantity",
							"caption": "#ResourceString(PDS_SPAIQuantity)#",
							"dataValueType": 5
						},
						{
							"id": "cb447bf6-8ee9-5157-9727-c4fc928eaef5",
							"code": "PDS_SPAIPrice",
							"caption": "#ResourceString(PDS_SPAIPrice)#",
							"dataValueType": 6
						},
						{
							"id": "d18e8ed6-52d2-52b3-b1dd-ab242e38ed25",
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
						"entitySchemaName": "SPAIQuoteLine",
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
					"PDS_SPAIQuote": {
						"modelConfig": {
							"path": "PDS.SPAIQuote"
						}
					},
					"PDS_SPAIProduct": {
						"modelConfig": {
							"path": "PDS.SPAIProduct"
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
					"entitySchemaName": "SPAIQuoteLine"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
