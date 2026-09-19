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
							"id": "152fdce7-3e8c-5871-b88b-d9a5673f2274",
							"code": "PDS_SPAIRevision",
							"caption": "#ResourceString(PDS_SPAIRevision)#",
							"dataValueType": 4
						},
						{
							"id": "77c52cb5-62a3-535d-b7cc-d65314e94f3b",
							"code": "PDS_SPAIStatus",
							"caption": "#ResourceString(PDS_SPAIStatus)#",
							"dataValueType": 10
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
							"id": "37390d38-1faf-5029-b62c-b00deaa0a610",
							"code": "PDS_SPAIQuoteDate",
							"caption": "#ResourceString(PDS_SPAIQuoteDate)#",
							"dataValueType": 8
						},
						{
							"id": "03fafa64-d200-5b11-b593-8f77cb7d1e1e",
							"code": "PDS_SPAIAmount",
							"caption": "#ResourceString(PDS_SPAIAmount)#",
							"dataValueType": 6
						},
						{
							"id": "8073bba1-4516-5d22-bad2-3c6f093305e0",
							"code": "PDS_SPAIGrossMarginPct",
							"caption": "#ResourceString(PDS_SPAIGrossMarginPct)#",
							"dataValueType": 5
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
					"PDS_SPAIRevision": {
						"modelConfig": {
							"path": "PDS.SPAIRevision"
						}
					},
					"PDS_SPAIStatus": {
						"modelConfig": {
							"path": "PDS.SPAIStatus"
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
					"PDS_SPAIQuoteDate": {
						"modelConfig": {
							"path": "PDS.SPAIQuoteDate"
						}
					},
					"PDS_SPAIAmount": {
						"modelConfig": {
							"path": "PDS.SPAIAmount"
						}
					},
					"PDS_SPAIGrossMarginPct": {
						"modelConfig": {
							"path": "PDS.SPAIGrossMarginPct"
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
