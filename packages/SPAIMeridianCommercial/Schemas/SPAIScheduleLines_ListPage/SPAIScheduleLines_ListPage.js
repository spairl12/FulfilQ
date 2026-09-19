define("SPAIScheduleLines_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIScheduleLine"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAIScheduleLine"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "c4bd1730-ef7f-5b32-a53c-4818c7f70576",
							"code": "PDS_SPAIOpportunity",
							"caption": "#ResourceString(PDS_SPAIOpportunity)#",
							"dataValueType": 10
						},
						{
							"id": "3a37bae2-fc6b-599a-9a80-7d39c48026e6",
							"code": "PDS_SPAIDisplayRef",
							"caption": "#ResourceString(PDS_SPAIDisplayRef)#",
							"dataValueType": 1
						},
						{
							"id": "ed08815b-b10d-591b-a3c2-21d082b62487",
							"code": "PDS_SPAILineNumber",
							"caption": "#ResourceString(PDS_SPAILineNumber)#",
							"dataValueType": 4
						},
						{
							"id": "05b679c9-daa7-5d18-8dec-cff7ae6feffe",
							"code": "PDS_SPAIRoomType",
							"caption": "#ResourceString(PDS_SPAIRoomType)#",
							"dataValueType": 10
						},
						{
							"id": "13fe4cef-69cf-5d4d-8e3b-1963cb1bba1f",
							"code": "PDS_SPAIUnitTier",
							"caption": "#ResourceString(PDS_SPAIUnitTier)#",
							"dataValueType": 10
						},
						{
							"id": "86372179-e865-5286-9147-48eae878da61",
							"code": "PDS_SPAISpecifiedText",
							"caption": "#ResourceString(PDS_SPAISpecifiedText)#",
							"dataValueType": 1
						},
						{
							"id": "f748b0ac-beb1-5480-9831-93f33a398092",
							"code": "PDS_SPAISpecifiedModel",
							"caption": "#ResourceString(PDS_SPAISpecifiedModel)#",
							"dataValueType": 1
						},
						{
							"id": "b5caab24-f58c-528e-a7fa-13ce0178865f",
							"code": "PDS_SPAIQuantity",
							"caption": "#ResourceString(PDS_SPAIQuantity)#",
							"dataValueType": 4
						},
						{
							"id": "e03c7423-4db1-5f8a-ab37-75b52bd6be54",
							"code": "PDS_SPAIQtyReceived",
							"caption": "#ResourceString(PDS_SPAIQtyReceived)#",
							"dataValueType": 4
						},
						{
							"id": "63013ab5-f1e6-5196-855c-3b9d0d144448",
							"code": "PDS_SPAIQtyRemaining",
							"caption": "#ResourceString(PDS_SPAIQtyRemaining)#",
							"dataValueType": 4
						},
						{
							"id": "e77b8197-941c-54d6-9cc9-e4a2c23e166f",
							"code": "PDS_SPAIMatchedProduct",
							"caption": "#ResourceString(PDS_SPAIMatchedProduct)#",
							"dataValueType": 10
						},
						{
							"id": "87117fdf-7699-5081-af24-7696b41a75bf",
							"code": "PDS_SPAILineStatus",
							"caption": "#ResourceString(PDS_SPAILineStatus)#",
							"dataValueType": 10
						},
						{
							"id": "a6b56da1-4b38-5f75-bc13-ca81224fce6c",
							"code": "PDS_SPAIReasonCode",
							"caption": "#ResourceString(PDS_SPAIReasonCode)#",
							"dataValueType": 10
						},
						{
							"id": "9aa4ae31-9162-5d13-a046-e4addec98442",
							"code": "PDS_SPAILineMarginPct",
							"caption": "#ResourceString(PDS_SPAILineMarginPct)#",
							"dataValueType": 5
						},
						{
							"id": "bfd710b9-2726-5e9c-809c-3690d7c67be5",
							"code": "PDS_SPAIEstimatorDecision",
							"caption": "#ResourceString(PDS_SPAIEstimatorDecision)#",
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
						"entitySchemaName": "SPAIScheduleLine",
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
					"PDS_SPAIOpportunity": {
						"modelConfig": {
							"path": "PDS.SPAIOpportunity"
						}
					},
					"PDS_SPAIDisplayRef": {
						"modelConfig": {
							"path": "PDS.SPAIDisplayRef"
						}
					},
					"PDS_SPAILineNumber": {
						"modelConfig": {
							"path": "PDS.SPAILineNumber"
						}
					},
					"PDS_SPAIRoomType": {
						"modelConfig": {
							"path": "PDS.SPAIRoomType"
						}
					},
					"PDS_SPAIUnitTier": {
						"modelConfig": {
							"path": "PDS.SPAIUnitTier"
						}
					},
					"PDS_SPAISpecifiedText": {
						"modelConfig": {
							"path": "PDS.SPAISpecifiedText"
						}
					},
					"PDS_SPAISpecifiedModel": {
						"modelConfig": {
							"path": "PDS.SPAISpecifiedModel"
						}
					},
					"PDS_SPAIQuantity": {
						"modelConfig": {
							"path": "PDS.SPAIQuantity"
						}
					},
					"PDS_SPAIQtyReceived": {
						"modelConfig": {
							"path": "PDS.SPAIQtyReceived"
						}
					},
					"PDS_SPAIQtyRemaining": {
						"modelConfig": {
							"path": "PDS.SPAIQtyRemaining"
						}
					},
					"PDS_SPAIMatchedProduct": {
						"modelConfig": {
							"path": "PDS.SPAIMatchedProduct"
						}
					},
					"PDS_SPAILineStatus": {
						"modelConfig": {
							"path": "PDS.SPAILineStatus"
						}
					},
					"PDS_SPAIReasonCode": {
						"modelConfig": {
							"path": "PDS.SPAIReasonCode"
						}
					},
					"PDS_SPAILineMarginPct": {
						"modelConfig": {
							"path": "PDS.SPAILineMarginPct"
						}
					},
					"PDS_SPAIEstimatorDecision": {
						"modelConfig": {
							"path": "PDS.SPAIEstimatorDecision"
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
					"entitySchemaName": "SPAIScheduleLine"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
