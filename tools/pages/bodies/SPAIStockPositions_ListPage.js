define("SPAIStockPositions_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIStockPosition"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIStockPosition"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "ff18a1a6-645c-5457-a179-2919e1490f80",
							"code": "PDS_SPAIProduct",
							"caption": "#ResourceString(PDS_SPAIProduct)#",
							"dataValueType": 10
						},
						{
							"id": "1b2d8715-7d01-5e53-8384-75e7e1f6477c",
							"code": "PDS_SPAILocation",
							"caption": "#ResourceString(PDS_SPAILocation)#",
							"dataValueType": 10
						},
						{
							"id": "c46d4f02-d1b5-51f6-8242-28b375fa05f7",
							"code": "PDS_SPAIQtyOnHand",
							"caption": "#ResourceString(PDS_SPAIQtyOnHand)#",
							"dataValueType": 4
						},
						{
							"id": "36771312-86f9-5928-9d3d-702c3202d6c9",
							"code": "PDS_SPAIQtyAllocated",
							"caption": "#ResourceString(PDS_SPAIQtyAllocated)#",
							"dataValueType": 4
						},
						{
							"id": "63b5cc86-3174-57cb-8ff6-74b28061d377",
							"code": "PDS_SPAIQtyAvailable",
							"caption": "#ResourceString(PDS_SPAIQtyAvailable)#",
							"dataValueType": 4
						},
						{
							"id": "e1d916b4-f2f5-51be-99ab-7791f5c4a665",
							"code": "PDS_SPAINextInboundQty",
							"caption": "#ResourceString(PDS_SPAINextInboundQty)#",
							"dataValueType": 4
						},
						{
							"id": "294e13f2-cfa3-5383-b041-2a2b017a0773",
							"code": "PDS_SPAINextInboundDate",
							"caption": "#ResourceString(PDS_SPAINextInboundDate)#",
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
						"entitySchemaName": "SPAIStockPosition",
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
					"PDS_SPAIProduct": {
						"modelConfig": {
							"path": "PDS.SPAIProduct"
						}
					},
					"PDS_SPAILocation": {
						"modelConfig": {
							"path": "PDS.SPAILocation"
						}
					},
					"PDS_SPAIQtyOnHand": {
						"modelConfig": {
							"path": "PDS.SPAIQtyOnHand"
						}
					},
					"PDS_SPAIQtyAllocated": {
						"modelConfig": {
							"path": "PDS.SPAIQtyAllocated"
						}
					},
					"PDS_SPAIQtyAvailable": {
						"modelConfig": {
							"path": "PDS.SPAIQtyAvailable"
						}
					},
					"PDS_SPAINextInboundQty": {
						"modelConfig": {
							"path": "PDS.SPAINextInboundQty"
						}
					},
					"PDS_SPAINextInboundDate": {
						"modelConfig": {
							"path": "PDS.SPAINextInboundDate"
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
					"entitySchemaName": "SPAIStockPosition"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
