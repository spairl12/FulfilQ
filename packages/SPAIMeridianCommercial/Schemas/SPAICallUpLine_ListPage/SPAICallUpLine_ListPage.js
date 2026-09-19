define("SPAICallUpLine_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAICallUpLine"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAICallUpLine"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "e2429b83-ee64-5db3-85e0-a641e5d14597",
							"code": "PDS_SPAIScheduleLine",
							"caption": "#ResourceString(PDS_SPAIScheduleLine)#",
							"dataValueType": 10
						},
						{
							"id": "e67ef413-7f91-5026-b624-b849387768cf",
							"code": "PDS_SPAIDeliveryEvent",
							"caption": "#ResourceString(PDS_SPAIDeliveryEvent)#",
							"dataValueType": 10
						},
						{
							"id": "5ee4be62-f62b-563a-844d-d4c425d616cb",
							"code": "PDS_SPAISubPO",
							"caption": "#ResourceString(PDS_SPAISubPO)#",
							"dataValueType": 10
						},
						{
							"id": "a6a806ec-ab96-53f3-8c71-f886042a27e3",
							"code": "PDS_SPAIQtyRequired",
							"caption": "#ResourceString(PDS_SPAIQtyRequired)#",
							"dataValueType": 4
						},
						{
							"id": "a1808583-f148-5dea-a05b-14ae0b7df461",
							"code": "PDS_SPAIQtyDelivered",
							"caption": "#ResourceString(PDS_SPAIQtyDelivered)#",
							"dataValueType": 4
						},
						{
							"id": "1324bd2b-20a9-5b9f-91ff-3e198bc7f114",
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
						"entitySchemaName": "SPAICallUpLine",
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
					"PDS_SPAIDeliveryEvent": {
						"modelConfig": {
							"path": "PDS.SPAIDeliveryEvent"
						}
					},
					"PDS_SPAISubPO": {
						"modelConfig": {
							"path": "PDS.SPAISubPO"
						}
					},
					"PDS_SPAIQtyRequired": {
						"modelConfig": {
							"path": "PDS.SPAIQtyRequired"
						}
					},
					"PDS_SPAIQtyDelivered": {
						"modelConfig": {
							"path": "PDS.SPAIQtyDelivered"
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
					"entitySchemaName": "SPAICallUpLine"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
