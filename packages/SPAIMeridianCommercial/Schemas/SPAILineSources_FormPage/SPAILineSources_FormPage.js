define("SPAILineSources_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "SPAIField_SPAILocation",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAILocation",
					"control": "$PDS_SPAILocation",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIScheduleLine",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIScheduleLine",
					"control": "$PDS_SPAIScheduleLine",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIQtyAllocated",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIQtyAllocated",
					"control": "$PDS_SPAIQtyAllocated",
					"labelPosition": "auto",
					"type": "crt.NumberInput"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAISourceTier",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAISourceTier",
					"control": "$PDS_SPAISourceTier",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIInterstateFreight",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIInterstateFreight",
					"control": "$PDS_SPAIInterstateFreight",
					"labelPosition": "auto",
					"type": "crt.Checkbox"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIAllocatedOn",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIAllocatedOn",
					"control": "$PDS_SPAIAllocatedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime"
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
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
							"id": "d8d92d82-4d2d-57ef-a37b-e4b45184eaea",
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
					"entitySchemaName": "SPAILineSource"
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
				"PDS_SPAILocation": {
					"modelConfig": {
						"path": "PDS.SPAILocation"
					}
				},
				"PDS_SPAIScheduleLine": {
					"modelConfig": {
						"path": "PDS.SPAIScheduleLine"
					}
				},
				"PDS_SPAIQtyAllocated": {
					"modelConfig": {
						"path": "PDS.SPAIQtyAllocated"
					}
				},
				"PDS_SPAISourceTier": {
					"modelConfig": {
						"path": "PDS.SPAISourceTier"
					}
				},
				"PDS_SPAIInterstateFreight": {
					"modelConfig": {
						"path": "PDS.SPAIInterstateFreight"
					}
				},
				"PDS_SPAIAllocatedOn": {
					"modelConfig": {
						"path": "PDS.SPAIAllocatedOn"
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "SPAILineSource"
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
