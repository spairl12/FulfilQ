define("SPAISubstitutionRules_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAISubstitutionRule"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "SPAISubstitutionRule"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "d4753490-4a2f-5d2c-8d65-043e265991eb",
							"code": "PDS_SPAIRuleCode",
							"caption": "#ResourceString(PDS_SPAIRuleCode)#",
							"dataValueType": 1
						},
						{
							"id": "e5751603-f04d-5070-99bc-e51f41c7da8b",
							"code": "PDS_SPAIFromProduct",
							"caption": "#ResourceString(PDS_SPAIFromProduct)#",
							"dataValueType": 10
						},
						{
							"id": "f8442057-8a99-587f-ae81-b571406f32ad",
							"code": "PDS_SPAIToProduct",
							"caption": "#ResourceString(PDS_SPAIToProduct)#",
							"dataValueType": 10
						},
						{
							"id": "7f523695-aab7-5546-b436-e875d0a1c167",
							"code": "PDS_SPAIFinishMatch",
							"caption": "#ResourceString(PDS_SPAIFinishMatch)#",
							"dataValueType": 12
						},
						{
							"id": "6a36fa71-8db8-50de-8106-17b01bd9ce19",
							"code": "PDS_SPAIEquivalenceBasis",
							"caption": "#ResourceString(PDS_SPAIEquivalenceBasis)#",
							"dataValueType": 1
						},
						{
							"id": "b02b256b-21f5-5e6a-ac17-e42c65801e3a",
							"code": "PDS_SPAIApprovedBy",
							"caption": "#ResourceString(PDS_SPAIApprovedBy)#",
							"dataValueType": 1
						},
						{
							"id": "8d744361-b9f9-54fe-8b2d-5a4d961c4514",
							"code": "PDS_SPAIApprovedOn",
							"caption": "#ResourceString(PDS_SPAIApprovedOn)#",
							"dataValueType": 8
						},
						{
							"id": "3fa7f693-a67b-5fc7-b47e-96e4213c1655",
							"code": "PDS_SPAIIsActive",
							"caption": "#ResourceString(PDS_SPAIIsActive)#",
							"dataValueType": 12
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "SPAISubstitutionRule",
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
					"PDS_SPAIRuleCode": {
						"modelConfig": {
							"path": "PDS.SPAIRuleCode"
						}
					},
					"PDS_SPAIFromProduct": {
						"modelConfig": {
							"path": "PDS.SPAIFromProduct"
						}
					},
					"PDS_SPAIToProduct": {
						"modelConfig": {
							"path": "PDS.SPAIToProduct"
						}
					},
					"PDS_SPAIFinishMatch": {
						"modelConfig": {
							"path": "PDS.SPAIFinishMatch"
						}
					},
					"PDS_SPAIEquivalenceBasis": {
						"modelConfig": {
							"path": "PDS.SPAIEquivalenceBasis"
						}
					},
					"PDS_SPAIApprovedBy": {
						"modelConfig": {
							"path": "PDS.SPAIApprovedBy"
						}
					},
					"PDS_SPAIApprovedOn": {
						"modelConfig": {
							"path": "PDS.SPAIApprovedOn"
						}
					},
					"PDS_SPAIIsActive": {
						"modelConfig": {
							"path": "PDS.SPAIIsActive"
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
					"entitySchemaName": "SPAISubstitutionRule"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
