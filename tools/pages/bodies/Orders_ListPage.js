define("Orders_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_Number",
							"caption": "#ResourceString(PDS_Number)#",
							"dataValueType": 1,
							"width": 182,
							"sticky": true
						},
						{
							"id": "870cdfc0-dc9a-8589-9a1f-f0a768e6e55f",
							"code": "PDS_Date",
							"path": "Date",
							"caption": "#ResourceString(PDS_Date)#",
							"dataValueType": 7,
							"width": 178
						},
						{
							"id": "0933155f-6eea-5ca6-802e-bd3caa8cf192",
							"code": "PDS_SPAIOrderType",
							"caption": "#ResourceString(PDS_SPAIOrderType)#",
							"dataValueType": 10
						},
						{
							"id": "26cecba6-77d7-5ca4-85f8-c52d7066bfc2",
							"code": "PDS_SPAIPurchaseOrderNo",
							"caption": "#ResourceString(PDS_SPAIPurchaseOrderNo)#",
							"dataValueType": 1
						},
						{
							"id": "10f1b29b-b3d5-532d-9235-937a2c951c7d",
							"code": "PDS_SPAIDeliveryEvent",
							"caption": "#ResourceString(PDS_SPAIDeliveryEvent)#",
							"dataValueType": 10
						},
						{
							"id": "3de54efa-8ad9-cdc5-ca61-07c09afeaab9",
							"code": "PDS_Status",
							"path": "Status",
							"caption": "#ResourceString(PDS_Status)#",
							"dataValueType": 10,
							"referenceSchemaName": "OrderStatus",
							"width": 245
						},
						{
							"id": "a14772af-a953-71b5-3db1-9eb0b2a62346",
							"code": "PDS_Account",
							"path": "Account",
							"caption": "#ResourceString(PDS_Account)#",
							"dataValueType": 10,
							"referenceSchemaName": "Account",
							"width": 232
						},
						{
							"id": "da9c11e5-677a-d2f0-a28f-5c8ffcedda2b",
							"code": "PDS_Contact",
							"path": "Contact",
							"caption": "#ResourceString(PDS_Contact)#",
							"dataValueType": 10,
							"referenceSchemaName": "Contact",
							"width": 169
						},
						{
							"id": "0a482c76-c677-bfb4-9390-9452635f5aed",
							"code": "PDS_Owner",
							"path": "Owner",
							"caption": "#ResourceString(PDS_Owner)#",
							"dataValueType": 10,
							"referenceSchemaName": "Contact",
							"width": 139
						},
						{
							"id": "c3c08e2a-44ac-1f28-3e3c-b882c78b5947",
							"code": "PDS_Amount",
							"path": "Amount",
							"caption": "#ResourceString(PDS_Amount)#",
							"dataValueType": 6,
							"width": 136
						},
						{
							"id": "ef7e1934-3f98-a995-4729-95e0da004ef9",
							"code": "PDS_CurrencySymbol",
							"path": "Currency.Symbol",
							"caption": "#ResourceString(PDS_CurrencySymbol)#",
							"dataValueType": 27,
							"width": 114
						}
					]
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
					"PDS_SPAIOrderType": {
						"modelConfig": {
							"path": "PDS.SPAIOrderType"
						}
					},
					"PDS_SPAIPurchaseOrderNo": {
						"modelConfig": {
							"path": "PDS.SPAIPurchaseOrderNo"
						}
					},
					"PDS_SPAIDeliveryEvent": {
						"modelConfig": {
							"path": "PDS.SPAIDeliveryEvent"
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
