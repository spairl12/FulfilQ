define("Opportunities_FormPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIAdjudicationStatusField",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_SPAIAdjudicationStatus_spai",
					"control": "$PDS_SPAIAdjudicationStatus_spai",
					"labelPosition": "left",
					"mode": "List",
					"showValueAsLink": false,
					"readonly": true
				},
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": ["attributes"],
				"values": {
					"PDS_SPAIAdjudicationStatus_spai": {
						"modelConfig": {
							"path": "PDS.SPAIAdjudicationStatus"
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/
	};
});
