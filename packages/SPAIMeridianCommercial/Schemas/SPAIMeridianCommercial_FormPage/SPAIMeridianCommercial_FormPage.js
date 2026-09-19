define("SPAIMeridianCommercial_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAIName",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIName",
					"control": "$PDS_SPAIName",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAICode",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAICode",
					"control": "$PDS_SPAICode",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAILocationType",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILocationType",
					"control": "$PDS_SPAILocationType",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIState",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIState",
					"control": "$PDS_SPAIState",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISuburb",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISuburb",
					"control": "$PDS_SPAISuburb",
					"labelPosition": "auto",
					"type": "crt.Input",
					"multiline": false
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISourcingRank",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISourcingRank",
					"control": "$PDS_SPAISourcingRank",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIIsAvailable",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIIsAvailable",
					"control": "$PDS_SPAIIsAvailable",
					"labelPosition": "auto",
					"type": "crt.Checkbox"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAcceptingFrom",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAcceptingFrom",
					"control": "$PDS_SPAIAcceptingFrom",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAcceptingUntil",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAcceptingUntil",
					"control": "$PDS_SPAIAcceptingUntil",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "date"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "AttachmentList",
				"values": {
					"type": "crt.FileList",
					"masterRecordColumnValue": "$Id",
					"recordColumnName": "RecordId",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 6
					},
					"items": "$AttachmentList",
					"primaryColumnName": "AttachmentListDS_Id",
					"columns": [
						{
							"id": "1a0c3238-24db-566b-b819-7d6ca44eadfe",
							"code": "AttachmentListDS_Name",
							"caption": "#ResourceString(AttachmentListDS_Name)#",
							"dataValueType": 28,
							"width": 200
						}
					],
					"viewType": "gallery",
					"tileSize": "small"
				},
				"parentName": "AttachmentsTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Feed",
				"values": {
					"type": "crt.Feed",
					"feedType": "Record",
					"primaryColumnValue": "$Id",
					"cardState": "$CardState",
					"dataSourceName": "PDS",
					"entitySchemaName": "SPAILocation"
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
			"attributes": {
				"Id": {
					"modelConfig": {
						"path": "PDS.Id"
					}
				},
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
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "SPAILocation"
					},
					"scope": "page"
				},
				"AttachmentListDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SysFile",
						"attributes": {
							"Name": {
								"path": "Name"
							}
						}
					}
				}
			},
			"primaryDataSourceName": "PDS"
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
