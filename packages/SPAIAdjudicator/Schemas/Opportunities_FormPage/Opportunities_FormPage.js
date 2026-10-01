define("Opportunities_FormPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"name": "RequeueQueueItemButton"
			},
			{
				"operation": "remove",
				"name": "PostponeQueueItemButton"
			},
			{
				"operation": "remove",
				"name": "SideAreaProfileFieldFlexContainer"
			},
			{
				"operation": "move",
				"name": "ForecastCategory",
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "remove",
				"name": "CloseReason"
			},
			{
				"operation": "remove",
				"name": "Winner"
			},
			{
				"operation": "remove",
				"name": "ListAction_eslrggs"
			},
			{
				"operation": "remove",
				"name": "DecisionMaker"
			},
			{
				"operation": "remove",
				"name": "addRecord_0hxbi4r"
			},
			{
				"operation": "remove",
				"name": "SideAreaProfileFieldGridContainer"
			},
			{
				"operation": "merge",
				"name": "Amount",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "move",
				"name": "Amount",
				"parentName": "OverviewFieldsContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "DueDate",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "move",
				"name": "DueDate",
				"parentName": "OverviewFieldsContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "remove",
				"name": "ForecastCommit"
			},
			{
				"operation": "remove",
				"name": "IsPrimary"
			},
			{
				"operation": "remove",
				"name": "PredictiveProbability"
			},
			{
				"operation": "remove",
				"name": "Type"
			},
			{
				"operation": "remove",
				"name": "Industry"
			},
			{
				"operation": "remove",
				"name": "EmployeesNumber"
			},
			{
				"operation": "remove",
				"name": "AnnualRevenue"
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"allowToggleClose": true
				}
			},
			{
				"operation": "remove",
				"name": "OverviewAnalyticsContainer"
			},
			{
				"operation": "remove",
				"name": "DaysInFunnelMetric"
			},
			{
				"operation": "remove",
				"name": "DaysAtCurrentStageMetric"
			},
			{
				"operation": "remove",
				"name": "EmailsSentMetric"
			},
			{
				"operation": "remove",
				"name": "OutgoingCallsMetric"
			},
			{
				"operation": "remove",
				"name": "CustomerNeed"
			},
			{
				"operation": "merge",
				"name": "CreatedOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					},
					"labelPosition": "above"
				}
			},
			{
				"operation": "move",
				"name": "CreatedOn",
				"parentName": "OverviewFieldsContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "Contact",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"labelPosition": "above",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"tooltip": ""
				}
			},
			{
				"operation": "merge",
				"name": "Account",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"labelPosition": "above",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"tooltip": ""
				}
			},
			{
				"operation": "move",
				"name": "Account",
				"parentName": "OverviewFieldsContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "Title",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"labelPosition": "above",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"tooltip": ""
				}
			},
			{
				"operation": "move",
				"name": "Title",
				"parentName": "OverviewFieldsContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "OpportunityType"
			},
			{
				"operation": "remove",
				"name": "Group"
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					},
					"labelPosition": "above",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"tooltip": ""
				}
			},
			{
				"operation": "remove",
				"name": "Description"
			},
			{
				"operation": "remove",
				"name": "ClosingDetails"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamToolsContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamAddButton"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamRefreshButton"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamSettingsButton"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamExportDataButton"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamImportDataButton"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamSearchFilter"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamListContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityTeamList"
			},
			{
				"operation": "remove",
				"name": "CompetitorsExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "CompetitorsToolsContainer"
			},
			{
				"operation": "remove",
				"name": "CompetitorsToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "CompetitorsAddButton"
			},
			{
				"operation": "remove",
				"name": "CompetitorsRefreshButton"
			},
			{
				"operation": "remove",
				"name": "CompetitorsSettingsButton"
			},
			{
				"operation": "remove",
				"name": "CompetitorsExportDataButton"
			},
			{
				"operation": "remove",
				"name": "CompetitorsImportDataButton"
			},
			{
				"operation": "remove",
				"name": "CompetitorsSearchFilter"
			},
			{
				"operation": "remove",
				"name": "CompetitorsListContainer"
			},
			{
				"operation": "remove",
				"name": "CompetitorsList"
			},
			{
				"operation": "remove",
				"name": "MeddpiccTab"
			},
			{
				"operation": "remove",
				"name": "MeddpiccAssessment"
			},
			{
				"operation": "remove",
				"name": "ProcessingTab"
			},
			{
				"operation": "remove",
				"name": "Timeline"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_Call"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_Email"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_Task"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_SysFile"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_Feed"
			},
			{
				"operation": "remove",
				"name": "TimelineTile_Lead"
			},
			{
				"operation": "remove",
				"name": "MessageComposer"
			},
			{
				"operation": "remove",
				"name": "EmailComposer"
			},
			{
				"operation": "remove",
				"name": "FeedComposer"
			},
			{
				"operation": "remove",
				"name": "TimelineFilter_Entity"
			},
			{
				"operation": "remove",
				"name": "TimelineFilter_Date"
			},
			{
				"operation": "remove",
				"name": "TimelineFilter_Owner"
			},
			{
				"operation": "remove",
				"name": "TimelineFilter_SystemMessages"
			},
			{
				"operation": "remove",
				"name": "OpportunityInsightsTab"
			},
			{
				"operation": "remove",
				"name": "CustomerPerspectiveExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "CustomerPerspectiveToolsContainer"
			},
			{
				"operation": "remove",
				"name": "CustomerPerspectiveToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "CustomerPerspectiveFieldsContainer"
			},
			{
				"operation": "remove",
				"name": "What"
			},
			{
				"operation": "remove",
				"name": "Why"
			},
			{
				"operation": "remove",
				"name": "WhyNow"
			},
			{
				"operation": "remove",
				"name": "BuyingProcess"
			},
			{
				"operation": "remove",
				"name": "OurPerspectiveExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "OurPerspectiveToolsContainer"
			},
			{
				"operation": "remove",
				"name": "OurPerspectiveToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "OurPerspectiveFieldsContainer"
			},
			{
				"operation": "remove",
				"name": "Strength"
			},
			{
				"operation": "remove",
				"name": "Weaknesses"
			},
			{
				"operation": "remove",
				"name": "WhyOurCompany"
			},
			{
				"operation": "remove",
				"name": "EngagementTactic"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionToolsContainer"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionContainer"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionFeed"
			},
			{
				"operation": "remove",
				"name": "NextKeyActionList"
			},
			{
				"operation": "remove",
				"name": "ProductsTab"
			},
			{
				"operation": "remove",
				"name": "ProductSuggestions"
			},
			{
				"operation": "remove",
				"name": "ProductsExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "ProductsToolsContainer"
			},
			{
				"operation": "remove",
				"name": "ProductsToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "ProductsAddButton"
			},
			{
				"operation": "remove",
				"name": "ProductsRefreshButton"
			},
			{
				"operation": "remove",
				"name": "ProductsSettingsButton"
			},
			{
				"operation": "remove",
				"name": "ProductsExportDataButton"
			},
			{
				"operation": "remove",
				"name": "ProductsImportDataButton"
			},
			{
				"operation": "remove",
				"name": "ProductsSearchFilter"
			},
			{
				"operation": "remove",
				"name": "ProductsListContainer"
			},
			{
				"operation": "remove",
				"name": "ProductsList"
			},
			{
				"operation": "remove",
				"name": "ProductsList_ExportToExcelBulkAction"
			},
			{
				"operation": "remove",
				"name": "ProductsList_DeleteBulkAction"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductToolsContainer"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductRefreshButton"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductSettingsButton"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductExportDataButton"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductSearchFilter"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductListContainer"
			},
			{
				"operation": "remove",
				"name": "RecommendedProductList"
			},
			{
				"operation": "remove",
				"name": "HistoryTab"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryExpansionGridContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryFlexContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryRefreshBtn"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistorySettingsBtn"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryExportDataBtn"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistorySearchFilter"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistoryGridContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory_AddTagsBulkAction"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory_RemoveTagsBulkAction"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory_ExportToExcelBulkAction"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory_MergeBulkAction"
			},
			{
				"operation": "remove",
				"name": "OpportunityHistory_DeleteBulkAction"
			},
			{
				"operation": "remove",
				"name": "StageHistoryExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "StageHistoryToolsContainer"
			},
			{
				"operation": "remove",
				"name": "StageHistoryToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "StageHistoryRefreshButton"
			},
			{
				"operation": "remove",
				"name": "StageHistorySettingsButton"
			},
			{
				"operation": "remove",
				"name": "StageHistoryExportDataButton"
			},
			{
				"operation": "remove",
				"name": "StageHistorySearchFilter"
			},
			{
				"operation": "remove",
				"name": "StageHistoryListContainer"
			},
			{
				"operation": "remove",
				"name": "StageHistoryList"
			},
			{
				"operation": "remove",
				"name": "LeadsExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "LeadsToolsContainer"
			},
			{
				"operation": "remove",
				"name": "LeadsToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "LeadsAddButton"
			},
			{
				"operation": "remove",
				"name": "LeadsRefreshButton"
			},
			{
				"operation": "remove",
				"name": "LeadsSettingsButton"
			},
			{
				"operation": "remove",
				"name": "LeadsExportDataButton"
			},
			{
				"operation": "remove",
				"name": "LeadsImportDataButton"
			},
			{
				"operation": "remove",
				"name": "LeadsSearchFilter"
			},
			{
				"operation": "remove",
				"name": "LeadsQuickFilterFlexContainer"
			},
			{
				"operation": "remove",
				"name": "QuickFilterShowAllLeads"
			},
			{
				"operation": "remove",
				"name": "LeadsListContainer"
			},
			{
				"operation": "remove",
				"name": "LeadsList"
			},
			{
				"operation": "remove",
				"name": "OrdersExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "OrdersToolsContainer"
			},
			{
				"operation": "remove",
				"name": "OrdersToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "OrdersAddButton"
			},
			{
				"operation": "remove",
				"name": "OrdersRefreshButton"
			},
			{
				"operation": "remove",
				"name": "OrdersSettingsButton"
			},
			{
				"operation": "remove",
				"name": "OrdersExportDataButton"
			},
			{
				"operation": "remove",
				"name": "OrdersImportDataButton"
			},
			{
				"operation": "remove",
				"name": "OrdersSearchFilter"
			},
			{
				"operation": "remove",
				"name": "OrdersQuickFilterFlexContainer"
			},
			{
				"operation": "remove",
				"name": "QuickFilterShowAllOrders"
			},
			{
				"operation": "remove",
				"name": "OrdersListContainer"
			},
			{
				"operation": "remove",
				"name": "OrdersList"
			},
			{
				"operation": "remove",
				"name": "InvoicesExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "InvoicesToolsContainer"
			},
			{
				"operation": "remove",
				"name": "InvoicesToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "InvoicesAddButton"
			},
			{
				"operation": "remove",
				"name": "InvoicesRefreshButton"
			},
			{
				"operation": "remove",
				"name": "InvoicesSettingsButton"
			},
			{
				"operation": "remove",
				"name": "InvoicesExportDataButton"
			},
			{
				"operation": "remove",
				"name": "InvoicesImportDataButton"
			},
			{
				"operation": "remove",
				"name": "InvoicesSearchFilter"
			},
			{
				"operation": "remove",
				"name": "InvoicesQuickFilterFlexContainer"
			},
			{
				"operation": "remove",
				"name": "QuickFilterShowAllInvoices"
			},
			{
				"operation": "remove",
				"name": "InvoicesListContainer"
			},
			{
				"operation": "remove",
				"name": "InvoicesList"
			},
			{
				"operation": "remove",
				"name": "DataGrid_o1m7u6h_ExportToExcelBulkAction"
			},
			{
				"operation": "remove",
				"name": "DataGrid_o1m7u6h_DeleteBulkAction"
			},
			{
				"operation": "remove",
				"name": "DocumentsExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "DocumentsToolsContainer"
			},
			{
				"operation": "remove",
				"name": "DocumentsToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "DocumentsAddButton"
			},
			{
				"operation": "remove",
				"name": "DocumentsRefreshButton"
			},
			{
				"operation": "remove",
				"name": "DocumentsSettingsButton"
			},
			{
				"operation": "remove",
				"name": "DocumentsExportDataButton"
			},
			{
				"operation": "remove",
				"name": "DocumentsImportDataButton"
			},
			{
				"operation": "remove",
				"name": "DocumentsSearchFilter"
			},
			{
				"operation": "remove",
				"name": "DocumentsQuickFilterFlexContainer"
			},
			{
				"operation": "remove",
				"name": "QuickFilterShowAllDocuments"
			},
			{
				"operation": "remove",
				"name": "DocumentsListContainer"
			},
			{
				"operation": "remove",
				"name": "DocumentsList"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerExpansionPanel"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerToolsContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerToolsFlexContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerAddButton"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerRefreshButton"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerSettingsButton"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerExportDataButton"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerImportDataButton"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerSearchFilter"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerListContainer"
			},
			{
				"operation": "remove",
				"name": "OpportunitiesByCustomerList"
			},
			{
				"operation": "merge",
				"name": "CardToggleTabPanel",
				"values": {
					"allowToggleClose": true
				}
			},
			{
				"operation": "remove",
				"name": "NextStepsTabContainer"
			},
			{
				"operation": "remove",
				"name": "NextStepsTabContainerHeaderContainer"
			},
			{
				"operation": "remove",
				"name": "NextStepsTabContainerHeaderLabel"
			},
			{
				"operation": "remove",
				"name": "AddNextStepsButton"
			},
			{
				"operation": "remove",
				"name": "CreateTaskButton"
			},
			{
				"operation": "remove",
				"name": "CreateEmailButton"
			},
			{
				"operation": "remove",
				"name": "NextSteps"
			},
			{
				"operation": "remove",
				"name": "PlaybookTabContainer"
			},
			{
				"operation": "remove",
				"name": "PlaybookTabContainerHeaderContainer"
			},
			{
				"operation": "remove",
				"name": "PlaybookTabContainerHeaderLabel"
			},
			{
				"operation": "remove",
				"name": "Playbook"
			},
			{
				"operation": "insert",
				"name": "Button_snthhxa",
				"values": {
					"type": "crt.Button",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "SPAIOppCallUpsGridDS"
						}
					},
					"size": "large"
				},
				"parentName": "CardToggleContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_njr36ed",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "SideContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate1ApprovedBy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate1ApprovedBy",
					"control": "$PDS_SPAIGate1ApprovedBy",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true,
					"listActions": [],
					"controlActions": []
				},
				"parentName": "GridContainer_njr36ed",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ListAction_6gqc9v9",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "ComboBox.AddNewRecord",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "SPAIField_SPAIGate1ApprovedBy",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate1ApprovedOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate1ApprovedOn",
					"control": "$PDS_SPAIGate1ApprovedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime",
					"readonly": true
				},
				"parentName": "GridContainer_njr36ed",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate2ApprovedBy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate2ApprovedBy",
					"control": "$PDS_SPAIGate2ApprovedBy",
					"labelPosition": "auto",
					"type": "crt.ComboBox",
					"mode": "List",
					"showValueAsLink": true,
					"readonly": true,
					"listActions": [],
					"controlActions": []
				},
				"parentName": "GridContainer_njr36ed",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ListAction_5fz6h5k",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "ComboBox.AddNewRecord",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "SPAIField_SPAIGate2ApprovedBy",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIField_SPAIGate2ApprovedOn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"label": "$Resources.Strings.PDS_SPAIGate2ApprovedOn",
					"control": "$PDS_SPAIGate2ApprovedOn",
					"labelPosition": "auto",
					"type": "crt.DateTimePicker",
					"pickerType": "datetime",
					"readonly": true
				},
				"parentName": "GridContainer_njr36ed",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_uvh4l64",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_uvh4l64_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "OverviewTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_guwh4a0",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_uvh4l64",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_hh9onby",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_guwh4a0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_qanq0uy",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_qanq0uy_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAIScheduleLine"
						}
					}
				},
				"parentName": "FlexContainer_hh9onby",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_9ko8mpo",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_9ko8mpo_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_qhwy93sDS"
						}
					}
				},
				"parentName": "FlexContainer_hh9onby",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_ka7o6ez",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_ka7o6ez_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_hh9onby",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_xxvc5wx",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_xxvc5wx_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_qhwy93s"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_ka7o6ez",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_91omypo",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_91omypo_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIScheduleLine"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_ka7o6ez",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_sxeq98s",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_sxeq98s_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_sxeq98s_GridDetail_qhwy93s",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_qhwy93s"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_sxeq98s_SearchValue",
							"GridDetailSearchFilter_sxeq98s_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_hh9onby",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_xgt4ugq",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_uvh4l64",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_qhwy93s",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 6
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_qhwy93s",
					"primaryColumnName": "GridDetail_qhwy93sDS_Id",
					"columns": [
						{
							"id": "45789e93-117b-a3db-ae39-3c980980aeed",
							"code": "GridDetail_qhwy93sDS_SPAISpecifiedText",
							"caption": "#ResourceString(GridDetail_qhwy93sDS_SPAISpecifiedText)#",
							"dataValueType": 30
						}
					],
					"placeholder": false,
					"visible": true,
					"fitContent": true
				},
				"parentName": "GridContainer_xgt4ugq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_eo9n1dz",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_eo9n1dz_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_1m2b8s4",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_1m2b8s4_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_eo9n1dz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_y9ybf3e",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_1m2b8s4",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_c25bqwf",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_y9ybf3e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_27mnh2r",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_27mnh2r_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "Product"
						}
					}
				},
				"parentName": "FlexContainer_c25bqwf",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_skdhkua",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_skdhkua_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_j2hpszzDS"
						}
					}
				},
				"parentName": "FlexContainer_c25bqwf",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_lrzb8uc",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_lrzb8uc_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_c25bqwf",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_2oq8de1",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_2oq8de1_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_j2hpszz"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_lrzb8uc",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_t3cb45i",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_t3cb45i_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "Product"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_lrzb8uc",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_5ysp8x4",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_5ysp8x4_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [],
						"from": [
							"GridDetailSearchFilter_5ysp8x4_SearchValue",
							"GridDetailSearchFilter_5ysp8x4_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_c25bqwf",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_tjunfll",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_1m2b8s4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_j2hpszz",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 22
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_j2hpszz",
					"primaryColumnName": "GridDetail_j2hpszzDS_Id",
					"columns": [
						{
							"id": "2abc320a-4508-eaea-6a66-b7d037fbaa0b",
							"code": "GridDetail_j2hpszzDS_Name",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_Name)#",
							"dataValueType": 28,
							"width": 231
						},
						{
							"id": "917cc8d4-6e10-5e8d-95c0-83d243cf561d",
							"code": "GridDetail_j2hpszzDS_SPAIBrand",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIBrand)#",
							"dataValueType": 10
						},
						{
							"id": "2c2c11d9-3811-f2dc-aef0-1fc8fd52c01b",
							"code": "GridDetail_j2hpszzDS_Category",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_Category)#",
							"dataValueType": 10
						},
						{
							"id": "35938e59-73ae-d0dc-a4d9-62d3edb98951",
							"code": "GridDetail_j2hpszzDS_Code",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_Code)#",
							"dataValueType": 27
						},
						{
							"id": "b1682be3-352d-d2b8-309f-baf25590fec6",
							"code": "GridDetail_j2hpszzDS_SPAIComplianceVerifiedOn",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIComplianceVerifiedOn)#",
							"dataValueType": 8
						},
						{
							"id": "6b881796-90d2-1708-035e-dbe52a9d8d11",
							"code": "GridDetail_j2hpszzDS_SPAICutoutDepthMm",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAICutoutDepthMm)#",
							"dataValueType": 4
						},
						{
							"id": "bfb7fd2f-12dd-ee9d-78d1-61a1f677e351",
							"code": "GridDetail_j2hpszzDS_SPAICutoutHeightMm",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAICutoutHeightMm)#",
							"dataValueType": 4
						},
						{
							"id": "d8c8e13c-cdec-26a4-2002-f28b4d56cb88",
							"code": "GridDetail_j2hpszzDS_SPAICutoutWidthMm",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAICutoutWidthMm)#",
							"dataValueType": 4
						},
						{
							"id": "c511eb68-0ede-4c9a-083e-5c1c780534d8",
							"code": "GridDetail_j2hpszzDS_SPAIEnergyStarRating",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIEnergyStarRating)#",
							"dataValueType": 31
						},
						{
							"id": "f7f3a900-14d4-c55d-fcc8-31e10d6e0096",
							"code": "GridDetail_j2hpszzDS_SPAIFinish",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIFinish)#",
							"dataValueType": 10
						},
						{
							"id": "82e34a2e-64b1-b45a-496a-f3d642602fb6",
							"code": "GridDetail_j2hpszzDS_SPAIGemsRegistrationNo",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIGemsRegistrationNo)#",
							"dataValueType": 27
						},
						{
							"id": "b2982990-cf7e-e94d-1e26-25652f0f9008",
							"code": "GridDetail_j2hpszzDS_SPAIProductFamily",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIProductFamily)#",
							"dataValueType": 10
						},
						{
							"id": "60eeef0f-6f47-8e44-c04d-9e5b1f897b74",
							"code": "GridDetail_j2hpszzDS_SPAIProjectApproved",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIProjectApproved)#",
							"dataValueType": 12
						},
						{
							"id": "6ee96cad-9b42-7cda-0b49-7b1bb29f056f",
							"code": "GridDetail_j2hpszzDS_SPAIWaterMarkCertNo",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIWaterMarkCertNo)#",
							"dataValueType": 27
						},
						{
							"id": "1cf23126-9fae-45f6-0de1-c1a82b5f3772",
							"code": "GridDetail_j2hpszzDS_SPAIWELSRating",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIWELSRating)#",
							"dataValueType": 31
						},
						{
							"id": "44e0cb79-552e-3e64-d5ee-b6092e845e54",
							"code": "GridDetail_j2hpszzDS_SPAIWelsRegistrationNo",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIWelsRegistrationNo)#",
							"dataValueType": 27
						},
						{
							"id": "868aa1ee-a8e6-5b21-ba3e-302703b954cd",
							"code": "GridDetail_j2hpszzDS_SPAIWholesaleCost",
							"caption": "#ResourceString(GridDetail_j2hpszzDS_SPAIWholesaleCost)#",
							"dataValueType": 6
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_tjunfll",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_stl6pxr",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_stl6pxr_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_dhe24ua",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_dhe24ua_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_stl6pxr",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_96zq631",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_dhe24ua",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_j5mzwe9",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_96zq631",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_ebcnaha",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_ebcnaha_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAICallUpSchedule"
						}
					}
				},
				"parentName": "FlexContainer_j5mzwe9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_58x6j6p",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_58x6j6p_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_vkscgrbDS"
						}
					}
				},
				"parentName": "FlexContainer_j5mzwe9",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_utuimqc",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_utuimqc_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_j5mzwe9",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_4w5ui2g",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_4w5ui2g_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_vkscgrb"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_utuimqc",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_issi2la",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_issi2la_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAICallUpSchedule"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_utuimqc",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_w2c3x00",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_w2c3x00_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_w2c3x00_GridDetail_vkscgrb",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_vkscgrb"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_w2c3x00_SearchValue",
							"GridDetailSearchFilter_w2c3x00_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_j5mzwe9",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_wfw16ve",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": null
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": [],
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "stretch"
				},
				"parentName": "ExpansionPanel_dhe24ua",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_vkscgrb",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 6
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_vkscgrb",
					"primaryColumnName": "GridDetail_vkscgrbDS_Id",
					"columns": [
						{
							"id": "57a579ff-3d90-2744-69a9-e9715de4821d",
							"code": "GridDetail_vkscgrbDS_SPAIScheduleRef",
							"caption": "#ResourceString(GridDetail_vkscgrbDS_SPAIScheduleRef)#",
							"dataValueType": 27
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_wfw16ve",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_e2mawjw",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_e2mawjw_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_i0wg121",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_i0wg121_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_e2mawjw",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_mv5hsyn",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_i0wg121",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_r1m015b",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_mv5hsyn",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_5sc0vcb",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_5sc0vcb_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAIStockPosition"
						}
					}
				},
				"parentName": "FlexContainer_r1m015b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_x3bpc67",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_x3bpc67_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_v8h2ka6DS"
						}
					}
				},
				"parentName": "FlexContainer_r1m015b",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_e9es3gv",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_e9es3gv_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_r1m015b",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_ts6g0sl",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_ts6g0sl_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_v8h2ka6"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_e9es3gv",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_40yq0ti",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_40yq0ti_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIStockPosition"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_e9es3gv",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_hzcmbod",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_hzcmbod_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_hzcmbod_GridDetail_v8h2ka6",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_v8h2ka6"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_hzcmbod_SearchValue",
							"GridDetailSearchFilter_hzcmbod_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_r1m015b",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_8kvcfgc",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_i0wg121",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_v8h2ka6",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 18
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_v8h2ka6",
					"primaryColumnName": "GridDetail_v8h2ka6DS_Id",
					"columns": [
						{
							"id": "77bfde98-c303-ba8f-1bf7-684a52688c5e",
							"code": "GridDetail_v8h2ka6DS_SPAIProduct",
							"caption": "#ResourceString(GridDetail_v8h2ka6DS_SPAIProduct)#",
							"dataValueType": 10
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_8kvcfgc",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_snldyq1",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_snldyq1_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_sho4lst",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_sho4lst_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_snldyq1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_jokvzss",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_sho4lst",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_ihz292e",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_jokvzss",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_mt7kx3n",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_mt7kx3n_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAILocation"
						}
					}
				},
				"parentName": "FlexContainer_ihz292e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_mg62gn9",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_mg62gn9_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_4jnbdzeDS"
						}
					}
				},
				"parentName": "FlexContainer_ihz292e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_1k1nu2o",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_1k1nu2o_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_ihz292e",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_tr4escz",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_tr4escz_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_4jnbdze"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_1k1nu2o",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_cjgpq2q",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_cjgpq2q_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAILocation"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_1k1nu2o",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_cmmv2ep",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_cmmv2ep_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_cmmv2ep_GridDetail_4jnbdze",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_4jnbdze"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_cmmv2ep_SearchValue",
							"GridDetailSearchFilter_cmmv2ep_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_ihz292e",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_mah5zf6",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_sho4lst",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_4jnbdze",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 18
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_4jnbdze",
					"primaryColumnName": "GridDetail_4jnbdzeDS_Id",
					"columns": [
						{
							"id": "065bb53c-2870-ddb2-fe71-a76ca7120199",
							"code": "GridDetail_4jnbdzeDS_SPAIName",
							"caption": "#ResourceString(GridDetail_4jnbdzeDS_SPAIName)#",
							"dataValueType": 28
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_mah5zf6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIAdjudicationTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "#ResourceString(SPAIAdjudicationTab_caption)#",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAIAdjButtonsRow",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "small",
					"alignItems": "center",
					"wrap": "wrap",
					"items": []
				},
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 0
			},
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
			},
			{
				"operation": "insert",
				"name": "SPAIApproveGate1Button",
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAIApproveGate1Button_caption",
					"color": "default",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "3b41a420-17ff-4543-aa41-41d2cf026c52",
							"statusName": "Awaiting Gate 2"
						}
					}
				},
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAISubmitGate2Button",
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAISubmitGate2Button_caption",
					"color": "default",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "41c6d33c-ec68-4f98-8b1b-bc1910292fa9",
							"statusName": "Submitted"
						}
					}
				},
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIRunAdjudicationButton",
				"values": {
					"type": "crt.Button",
					"caption": "$Resources.Strings.SPAIRunAdjudicationButton_caption",
					"color": "primary",
					"size": "medium",
					"iconPosition": "only-text",
					"visible": false,
					"clicked": {
						"request": "spai.SetAdjudicationStatusRequest",
						"params": {
							"statusId": "9ee1691d-65ed-4082-ab21-3484bed32747",
							"statusName": "Matching"
						}
					}
				},
				"parentName": "SPAIAdjButtonsRow",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAITilesGrid",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					},
					"items": []
				},
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAITile_Lines",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Lines_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Lines_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAILineCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Lines_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "steel-blue",
							"icon": {
								"iconName": "list-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAITile_Exact",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Exact_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Exact_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIExactMatchCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Exact_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "green",
							"icon": {
								"iconName": "checkmark-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAITile_Multi",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Multi_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Multi_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIMultiSourceCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Multi_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "blue",
							"icon": {
								"iconName": "diagram-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAITile_Subst",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 4,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Subst_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Subst_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAISubstitutionCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Subst_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "orange",
							"icon": {
								"iconName": "reload-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAITile_Escal",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 5,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Escal_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Escal_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIEscalationCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Escal_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "red",
							"icon": {
								"iconName": "warning-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SPAITile_NoAI",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_NoAI_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_NoAI_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIDeterministicCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 0,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_NoAI_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "dark-green",
							"icon": {
								"iconName": "calculator-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SPAITile_AICalls",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_AICalls_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_AICalls_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIAiCallCount"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 0
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_AICalls_config_text_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "vivid-purple",
							"icon": {
								"iconName": "copilot-action-button-icon"
							}
						},
						"theme": "without-fill",
						"comparison": {
							"type": null,
							"text": ""
						}
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SPAITile_Margin",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 3,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Margin_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Margin_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIGrossMarginPct"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 1,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Margin_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "dark-turquoise",
							"icon": {
								"iconName": "coins-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SPAITile_Hours",
				"values": {
					"type": "crt.IndicatorWidget",
					"visible": true,
					"layoutConfig": {
						"column": 4,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 3
					},
					"config": {
						"title": "#ResourceString(SPAITile_Hours_title)#",
						"data": {
							"providing": {
								"attribute": "SPAITile_Hours_Data",
								"schemaName": "Opportunity",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "Opportunity"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "SPAIHoursToClose"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "PDS.Id"
									}
								]
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"decimalPrecision": 1,
								"thousandSeparator": ","
							}
						},
						"text": {
							"template": "#ResourceString(SPAITile_Hours_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium",
							"labelPosition": "above-under"
						},
						"layout": {
							"color": "navy-blue",
							"icon": {
								"iconName": "clock-icon"
							}
						},
						"theme": "without-fill"
					}
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "Timer_qtiwcf0",
				"values": {
					"layoutConfig": {
						"column": 5,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 3
					},
					"type": "crt.Timer",
					"caption": "#ResourceString(Timer_qtiwcf0_caption)#",
					"labelType": "headline-1",
					"labelThickness": "semibold",
					"labelEllipsis": false,
					"labelColor": "#0B8500",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "end",
					"timerType": "countdown-to-specific-date",
					"showNegativeCountDownValue": true,
					"negativeTextColor": "#D2310D",
					"positiveTextColor": "#0B8500",
					"positiveTextValue": "",
					"negativeTextValue": "",
					"label": "$Resources.Strings.null",
					"readonly": true,
					"control": "$PDS_DueDate_b2zvo3k",
					"visible": true,
					"labelPosition": "auto",
					"placeholder": "",
					"tooltip": "",
					"headingLevel": null
				},
				"parentName": "SPAITilesGrid",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "Input_udzvfl4",
				"values": {
					"type": "crt.Input",
					"label": "$Resources.Strings.PDS_SPAIAdjudicationStory_v0jxnsi",
					"control": "$PDS_SPAIAdjudicationStory_v0jxnsi",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": true,
					"labelPosition": "above",
					"visible": true
				},
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesPanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "#ResourceString(SPAIScheduleLinesPanel_title)#",
					"expanded": true,
					"togglePosition": "before",
					"titleWidth": 20,
					"fullWidthHeader": true,
					"fitContent": true,
					"items": [],
					"tools": []
				},
				"parentName": "SPAIAdjudicationTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesGridWrap",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "SPAIScheduleLinesPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$SPAIScheduleLinesGrid",
					"primaryColumnName": "SPAIScheduleLinesGridDS_Id",
					"fitContent": true,
					"visible": true,
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 16
					},
					"columns": [
						{
							"id": "b6eddb79-b38c-5459-b51f-a5886d79a43d",
							"code": "SPAIScheduleLinesGridDS_SPAILineNumber",
							"path": "SPAILineNumber",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineNumber)#",
							"dataValueType": 4,
							"width": 80
						},
						{
							"id": "77912170-572c-5ae5-9c19-f6026e854f08",
							"code": "SPAIScheduleLinesGridDS_SPAIRoomType",
							"path": "SPAIRoomType",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIRoomType)#",
							"dataValueType": 10,
							"width": 130
						},
						{
							"id": "daa7cc43-c37b-55a8-adf7-f08fa54561d6",
							"code": "SPAIScheduleLinesGridDS_SPAIUnitTier",
							"path": "SPAIUnitTier",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIUnitTier)#",
							"dataValueType": 10,
							"width": 110
						},
						{
							"id": "001079fa-5039-5e77-8031-aa0cd9285bad",
							"code": "SPAIScheduleLinesGridDS_SPAISpecifiedText",
							"path": "SPAISpecifiedText",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAISpecifiedText)#",
							"dataValueType": 30,
							"width": 260
						},
						{
							"id": "e93c51b5-1a00-58fa-a437-70ff85ec888e",
							"code": "SPAIScheduleLinesGridDS_SPAISpecifiedModel",
							"path": "SPAISpecifiedModel",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAISpecifiedModel)#",
							"dataValueType": 27,
							"width": 130
						},
						{
							"id": "4c4864c1-cff6-59ec-9b68-1b859a0bcd84",
							"code": "SPAIScheduleLinesGridDS_SPAIQuantity",
							"path": "SPAIQuantity",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIQuantity)#",
							"dataValueType": 4,
							"width": 90
						},
						{
							"id": "eb8796d2-78fd-5f8b-bf68-7a19389a73b9",
							"code": "SPAIScheduleLinesGridDS_SPAIMatchedProduct",
							"path": "SPAIMatchedProduct",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIMatchedProduct)#",
							"dataValueType": 10,
							"width": 200
						},
						{
							"id": "80f8ae23-90f1-5d69-ab98-365de45a17de",
							"code": "SPAIScheduleLinesGridDS_SPAILineStatus",
							"path": "SPAILineStatus",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineStatus)#",
							"dataValueType": 10,
							"width": 170
						},
						{
							"id": "2b421609-6892-5c28-83e3-535438a37c14",
							"code": "SPAIScheduleLinesGridDS_SPAIReasonCode",
							"path": "SPAIReasonCode",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIReasonCode)#",
							"dataValueType": 10,
							"width": 190
						},
						{
							"id": "db56946d-a310-5aac-97b0-5f8e2d82c853",
							"code": "SPAIScheduleLinesGridDS_SPAIAdjudicationNote",
							"path": "SPAIAdjudicationNote",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIAdjudicationNote)#",
							"dataValueType": 30,
							"width": 260
						},
						{
							"id": "1995a55b-f8d1-59cb-9440-8205a2caf623",
							"code": "SPAIScheduleLinesGridDS_SPAIComplianceNotes",
							"path": "SPAIComplianceNotes",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIComplianceNotes)#",
							"dataValueType": 30,
							"width": 240
						},
						{
							"id": "bd99c3ec-1557-50f5-b71a-29273a2127ff",
							"code": "SPAIScheduleLinesGridDS_SPAILineMarginPct",
							"path": "SPAILineMarginPct",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAILineMarginPct)#",
							"dataValueType": 31,
							"width": 100
						},
						{
							"id": "93157c49-5aaf-56f0-bf3e-a96cb72b8ec8",
							"code": "SPAIScheduleLinesGridDS_SPAIQtyRemaining",
							"path": "SPAIQtyRemaining",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIQtyRemaining)#",
							"dataValueType": 4,
							"width": 170
						},
						{
							"id": "6693b931-a7d2-55b3-8fcb-2f372be3d6e1",
							"code": "SPAIScheduleLinesGridDS_SPAIEstimatorDecision",
							"path": "SPAIEstimatorDecision",
							"caption": "#ResourceString(SPAIScheduleLinesGridDS_SPAIEstimatorDecision)#",
							"dataValueType": 10,
							"width": 150
						}
					]
				},
				"parentName": "SPAIScheduleLinesGridWrap",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesToolsContainer",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"color": "transparent",
					"items": []
				},
				"parentName": "SPAIScheduleLinesPanel",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesToolsRow",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"alignItems": "center",
					"gap": "none",
					"items": [],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "SPAIScheduleLinesToolsContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesAddButton",
				"values": {
					"type": "crt.Button",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "SPAIScheduleLine",
							"defaultValues": [
								{
									"attributeName": "SPAIOpportunity",
									"value": "$Id"
								}
							]
						}
					}
				},
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesRefreshButton",
				"values": {
					"type": "crt.Button",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "SPAIScheduleLinesGridDS"
						}
					}
				},
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesSettingsButton",
				"values": {
					"type": "crt.Button",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesExport",
				"values": {
					"type": "crt.MenuItem",
					"icon": "export-button-icon",
					"caption": "#ResourceString(SPAIScheduleLinesExport_caption)#",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "SPAIScheduleLinesGrid"
						}
					}
				},
				"parentName": "SPAIScheduleLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesImport",
				"values": {
					"type": "crt.MenuItem",
					"icon": "import-button-icon",
					"caption": "#ResourceString(SPAIScheduleLinesImport_caption)#",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIScheduleLine"
						}
					}
				},
				"parentName": "SPAIScheduleLinesSettingsButton",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SPAIScheduleLinesSearch",
				"values": {
					"type": "crt.SearchFilter",
					"iconOnly": true,
					"placeholder": "#ResourceString(SPAIScheduleLinesSearch_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SPAIScheduleLinesSearch_SPAIScheduleLinesGrid",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SPAIScheduleLinesGrid"
										]
									}
								]
							}
						],
						"from": [
							"SPAIScheduleLinesSearch_SearchValue",
							"SPAIScheduleLinesSearch_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Summaries_m84lxd7",
				"values": {
					"type": "crt.Summaries",
					"items": []
				},
				"parentName": "SPAIScheduleLinesToolsRow",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "TabContainer_9tn690h",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_9tn690h_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GridContainer_ulhopl9",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					}
				},
				"parentName": "TabContainer_9tn690h",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_mffykht",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_mffykht_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_9tn690h",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_2d13ahs",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_mffykht",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_nslxalp",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_2d13ahs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_ub5ix7d",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_ub5ix7d_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_ce4c5jmDS"
						}
					}
				},
				"parentName": "FlexContainer_nslxalp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_w497a51",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_w497a51_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_nslxalp",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_2qwtvcs",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_2qwtvcs_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_ce4c5jm"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_w497a51",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_an9w5qo",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_an9w5qo_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "SPAIDecisionLedger"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_w497a51",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_ab6m8k2",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_ab6m8k2_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_ab6m8k2_GridDetail_ce4c5jm",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_ce4c5jm"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_ab6m8k2_SearchValue",
							"GridDetailSearchFilter_ab6m8k2_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_nslxalp",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_9ydg158",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_mffykht",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_ce4c5jm",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 20
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_ce4c5jm",
					"primaryColumnName": "GridDetail_ce4c5jmDS_Id",
					"columns": [
						{
							"id": "d1941c93-03b6-c604-5fc2-a3d51a09651a",
							"code": "GridDetail_ce4c5jmDS_SPAIActor",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIActor)#",
							"dataValueType": 28,
							"width": 157
						},
						{
							"id": "a5a58be6-af1c-9c57-0bab-4c445ae5381a",
							"code": "GridDetail_ce4c5jmDS_SPAIComplianceChecks",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIComplianceChecks)#",
							"dataValueType": 30,
							"width": 214
						},
						{
							"id": "72def149-ef0a-0ec5-9ea8-7fcf369d6205",
							"code": "GridDetail_ce4c5jmDS_SPAIConfidence",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIConfidence)#",
							"dataValueType": 32,
							"width": 99
						},
						{
							"id": "4b2a744d-65e8-9e50-7841-7c3e7be76887",
							"code": "GridDetail_ce4c5jmDS_SPAIDecisionType",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIDecisionType)#",
							"dataValueType": 10
						},
						{
							"id": "12cf1a90-8205-2cb3-5c25-57ad36609d03",
							"code": "GridDetail_ce4c5jmDS_SPAINewValue",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAINewValue)#",
							"dataValueType": 28
						},
						{
							"id": "efc664af-a73b-f7a9-998c-56f48cc0ac85",
							"code": "GridDetail_ce4c5jmDS_SPAIOccurredOn",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIOccurredOn)#",
							"dataValueType": 7
						},
						{
							"id": "36e76883-b222-1933-8126-6609196582e1",
							"code": "GridDetail_ce4c5jmDS_SPAIProposedProduct",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIProposedProduct)#",
							"dataValueType": 10
						},
						{
							"id": "fb85625d-3698-f943-fa78-f826c607d414",
							"code": "GridDetail_ce4c5jmDS_SPAIReasonCode",
							"caption": "#ResourceString(GridDetail_ce4c5jmDS_SPAIReasonCode)#",
							"dataValueType": 10
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_9ydg158",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_pgg7s1k",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_pgg7s1k_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "CallupAllocationBoard_96l4hu9",
				"values": {
					"type": "spai.CallupAllocationBoard",
					"contextMode": "portfolio",
					"opportunityId": "",
					"showOpportunityFilter": true,
					"showSettingsButton": true,
					"configName": "DeliveryScheduleBoard"
				},
				"parentName": "TabContainer_pgg7s1k",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_u6u4ot1",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_u6u4ot1_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_85uj2xu",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_85uj2xu_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_u6u4ot1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_50qg2vv",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_85uj2xu",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_s9v3km4",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_50qg2vv",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_pqovsbg",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_pqovsbg_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "Order"
						}
					}
				},
				"parentName": "FlexContainer_s9v3km4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_48hu2jn",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_48hu2jn_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_nl8f34fDS"
						}
					}
				},
				"parentName": "FlexContainer_s9v3km4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_ykvwvr8",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_ykvwvr8_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_s9v3km4",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_qzoky8u",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_qzoky8u_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_nl8f34f"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_ykvwvr8",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_g1hvj4x",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_g1hvj4x_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "Order"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_ykvwvr8",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_8544660",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_8544660_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_8544660_GridDetail_nl8f34f",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_nl8f34f"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_8544660_SearchValue",
							"GridDetailSearchFilter_8544660_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_s9v3km4",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_lfjyeez",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_85uj2xu",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_nl8f34f",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 24
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_nl8f34f",
					"primaryColumnName": "GridDetail_nl8f34fDS_Id",
					"columns": [
						{
							"id": "2948ab63-3c34-9f29-51bf-d0275b792b57",
							"code": "GridDetail_nl8f34fDS_Number",
							"caption": "#ResourceString(GridDetail_nl8f34fDS_Number)#",
							"dataValueType": 28
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_lfjyeez",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_ejisqxa",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAIAiCallCount_23tm2dn",
					"control": "$PDS_SPAIAiCallCount_23tm2dn",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberInput_ffv97v1",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAIDeterministicCount_niejw54",
					"control": "$PDS_SPAIDeterministicCount_niejw54",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NumberInput_216lq5d",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAIExactMatchCount_jbkvsgn",
					"control": "$PDS_SPAIExactMatchCount_jbkvsgn",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NumberInput_dg72h7k",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAISubstitutionCount_7nljbf6",
					"control": "$PDS_SPAISubstitutionCount_7nljbf6",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NumberInput_7u6op2m",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAIEscalationCount_4olxmzn",
					"control": "$PDS_SPAIEscalationCount_4olxmzn",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NumberInput_9forwz0",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_SPAILineCount_i7v7re3",
					"control": "$PDS_SPAILineCount_i7v7re3",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "FeedTabContainer",
				"propertyName": "items",
				"index": 6
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"PDS_SPAIAdjudicationStatus_spai": {
						"modelConfig": {
							"path": "PDS.SPAIAdjudicationStatus"
						}
					},
					"SPAIScheduleLinesGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "SPAIScheduleLinesGridDS",
							"filterAttributes": [
								{
									"name": "SPAIScheduleLinesSearch_SPAIScheduleLinesGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SPAIScheduleLinesGridDS_Id": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.Id"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineNumber": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineNumber"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIRoomType": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIRoomType"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIUnitTier": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIUnitTier"
									}
								},
								"SPAIScheduleLinesGridDS_SPAISpecifiedText": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAISpecifiedText"
									}
								},
								"SPAIScheduleLinesGridDS_SPAISpecifiedModel": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAISpecifiedModel"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIQuantity": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIQuantity"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIMatchedProduct": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIMatchedProduct"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineStatus": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineStatus"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIReasonCode": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIReasonCode"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIAdjudicationNote": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIAdjudicationNote"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIComplianceNotes": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIComplianceNotes"
									}
								},
								"SPAIScheduleLinesGridDS_SPAILineMarginPct": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAILineMarginPct"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIQtyRemaining": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIQtyRemaining"
									}
								},
								"SPAIScheduleLinesGridDS_SPAIEstimatorDecision": {
									"modelConfig": {
										"path": "SPAIScheduleLinesGridDS.SPAIEstimatorDecision"
									}
								}
							}
						}
					},
					"PDS_SPAIGate1ApprovedBy": {
						"modelConfig": {
							"path": "PDS.SPAIGate1ApprovedBy"
						}
					},
					"PDS_SPAIGate1ApprovedOn": {
						"modelConfig": {
							"path": "PDS.SPAIGate1ApprovedOn"
						}
					},
					"PDS_SPAIGate2ApprovedBy": {
						"modelConfig": {
							"path": "PDS.SPAIGate2ApprovedBy"
						}
					},
					"PDS_SPAIGate2ApprovedOn": {
						"modelConfig": {
							"path": "PDS.SPAIGate2ApprovedOn"
						}
					},
					"PDS_SPAIDeterministicCount_niejw54": {
						"modelConfig": {
							"path": "PDS.SPAIDeterministicCount"
						}
					},
					"PDS_SPAIAiCallCount_23tm2dn": {
						"modelConfig": {
							"path": "PDS.SPAIAiCallCount"
						}
					},
					"PDS_SPAIEscalationCount_4olxmzn": {
						"modelConfig": {
							"path": "PDS.SPAIEscalationCount"
						}
					},
					"PDS_SPAIExactMatchCount_jbkvsgn": {
						"modelConfig": {
							"path": "PDS.SPAIExactMatchCount"
						}
					},
					"PDS_SPAISubstitutionCount_7nljbf6": {
						"modelConfig": {
							"path": "PDS.SPAISubstitutionCount"
						}
					},
					"GridDetail_ce4c5jm": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_ce4c5jmDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_ab6m8k2_GridDetail_ce4c5jm",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_ce4c5jmDS_SPAIActor": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIActor"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIComplianceChecks": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIComplianceChecks"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIConfidence": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIConfidence"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIDecisionType": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIDecisionType"
									}
								},
								"GridDetail_ce4c5jmDS_SPAINewValue": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAINewValue"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIOccurredOn": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIOccurredOn"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIProposedProduct": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIProposedProduct"
									}
								},
								"GridDetail_ce4c5jmDS_SPAIReasonCode": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.SPAIReasonCode"
									}
								},
								"GridDetail_ce4c5jmDS_Id": {
									"modelConfig": {
										"path": "GridDetail_ce4c5jmDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_j2hpszz": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_j2hpszzDS",
							"filterAttributes": [
								{
									"loadOnChange": true,
									"name": "GridDetail_j2hpszz_PredefinedFilter"
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_j2hpszzDS_Name": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.Name"
									}
								},
								"GridDetail_j2hpszzDS_SPAIBrand": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIBrand"
									}
								},
								"GridDetail_j2hpszzDS_Category": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.Category"
									}
								},
								"GridDetail_j2hpszzDS_Code": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.Code"
									}
								},
								"GridDetail_j2hpszzDS_SPAIComplianceVerifiedOn": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIComplianceVerifiedOn"
									}
								},
								"GridDetail_j2hpszzDS_SPAICutoutDepthMm": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAICutoutDepthMm"
									}
								},
								"GridDetail_j2hpszzDS_SPAICutoutHeightMm": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAICutoutHeightMm"
									}
								},
								"GridDetail_j2hpszzDS_SPAICutoutWidthMm": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAICutoutWidthMm"
									}
								},
								"GridDetail_j2hpszzDS_SPAIEnergyStarRating": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIEnergyStarRating"
									}
								},
								"GridDetail_j2hpszzDS_SPAIFinish": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIFinish"
									}
								},
								"GridDetail_j2hpszzDS_SPAIGemsRegistrationNo": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIGemsRegistrationNo"
									}
								},
								"GridDetail_j2hpszzDS_SPAIProductFamily": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIProductFamily"
									}
								},
								"GridDetail_j2hpszzDS_SPAIProjectApproved": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIProjectApproved"
									}
								},
								"GridDetail_j2hpszzDS_SPAIWaterMarkCertNo": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIWaterMarkCertNo"
									}
								},
								"GridDetail_j2hpszzDS_SPAIWELSRating": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIWELSRating"
									}
								},
								"GridDetail_j2hpszzDS_SPAIWelsRegistrationNo": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIWelsRegistrationNo"
									}
								},
								"GridDetail_j2hpszzDS_SPAIWholesaleCost": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.SPAIWholesaleCost"
									}
								},
								"GridDetail_j2hpszzDS_Id": {
									"modelConfig": {
										"path": "GridDetail_j2hpszzDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_j2hpszz_PredefinedFilter": {
						"value": {
							"items": {
								"566d0d81-e9c8-4a7a-96a0-496d9cc86354": {
									"filterType": 2,
									"comparisonType": 2,
									"isEnabled": true,
									"trimDateTimeParameterToDate": false,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "SPAIBrand"
									},
									"isAggregative": false,
									"dataValueType": 10,
									"referenceSchemaName": "SPAIBrand",
									"isNull": false
								}
							},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "Product"
						}
					},
					"GridDetail_vkscgrb": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_vkscgrbDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_w2c3x00_GridDetail_vkscgrb",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_vkscgrbDS_SPAIScheduleRef": {
									"modelConfig": {
										"path": "GridDetail_vkscgrbDS.SPAIScheduleRef"
									}
								},
								"GridDetail_vkscgrbDS_Id": {
									"modelConfig": {
										"path": "GridDetail_vkscgrbDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_4jnbdze": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_4jnbdzeDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_cmmv2ep_GridDetail_4jnbdze",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_4jnbdzeDS_SPAIName": {
									"modelConfig": {
										"path": "GridDetail_4jnbdzeDS.SPAIName"
									}
								},
								"GridDetail_4jnbdzeDS_Id": {
									"modelConfig": {
										"path": "GridDetail_4jnbdzeDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_v8h2ka6": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_v8h2ka6DS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_hzcmbod_GridDetail_v8h2ka6",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_v8h2ka6DS_SPAIProduct": {
									"modelConfig": {
										"path": "GridDetail_v8h2ka6DS.SPAIProduct"
									}
								},
								"GridDetail_v8h2ka6DS_Id": {
									"modelConfig": {
										"path": "GridDetail_v8h2ka6DS.Id"
									}
								}
							}
						}
					},
					"Parameter_q8l08xk_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"Parameter_fpx7x9n_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"LookupAttribute_85sj3qr_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"PDS_SPAIGate1ApprovedBy_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"PDS_SPAIGate2ApprovedBy_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"GridDetail_nl8f34f": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_nl8f34fDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_8544660_GridDetail_nl8f34f",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_nl8f34fDS_Number": {
									"modelConfig": {
										"path": "GridDetail_nl8f34fDS.Number"
									}
								},
								"GridDetail_nl8f34fDS_Id": {
									"modelConfig": {
										"path": "GridDetail_nl8f34fDS.Id"
									}
								}
							}
						}
					},
					"PDS_DueDate_b2zvo3k": {
						"modelConfig": {
							"path": "PDS.DueDate"
						}
					},
					"GridDetail_qhwy93s": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_qhwy93sDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_sxeq98s_GridDetail_qhwy93s",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_qhwy93sDS_SPAISpecifiedText": {
									"modelConfig": {
										"path": "GridDetail_qhwy93sDS.SPAISpecifiedText"
									}
								},
								"GridDetail_qhwy93sDS_Id": {
									"modelConfig": {
										"path": "GridDetail_qhwy93sDS.Id"
									}
								}
							}
						}
					},
					"PDS_SPAIAdjudicationStory_v0jxnsi": {
						"modelConfig": {
							"path": "PDS.SPAIAdjudicationStory"
						}
					},
					"PDS_SPAILineCount_i7v7re3": {
						"modelConfig": {
							"path": "PDS.SPAILineCount"
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"CardState"
				],
				"values": {
					"modelConfig": {}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"ProductsList",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"RecommendedProductList",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"OpportunityTeamList",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"CompetitorsList",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"GridDetail_rnogu7n",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"GridDetail_n4l8edn",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"GridDetail_iwda2md",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Timeline_AllTileFilters"
				],
				"values": {
					"modelConfig": {}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"OpportunityHistory",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"OpportunityHistory_PredefinedFilter"
				],
				"values": {
					"modelConfig": {}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"GridDetail_h0s6i43",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"DataGrid_o1m7u6h",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"DataGrid_o1m7u6h_PredefinedFilter"
				],
				"values": {
					"modelConfig": {}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"GridDetail_zuuqj1c",
					"modelConfig"
				],
				"values": {
					"filterAttributes": []
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"SPAIScheduleLinesGridDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIScheduleLine",
							"attributes": {
								"SPAILineNumber": {
									"path": "SPAILineNumber"
								},
								"SPAIRoomType": {
									"path": "SPAIRoomType"
								},
								"SPAIUnitTier": {
									"path": "SPAIUnitTier"
								},
								"SPAISpecifiedText": {
									"path": "SPAISpecifiedText"
								},
								"SPAISpecifiedModel": {
									"path": "SPAISpecifiedModel"
								},
								"SPAIQuantity": {
									"path": "SPAIQuantity"
								},
								"SPAIMatchedProduct": {
									"path": "SPAIMatchedProduct"
								},
								"SPAILineStatus": {
									"path": "SPAILineStatus"
								},
								"SPAIReasonCode": {
									"path": "SPAIReasonCode"
								},
								"SPAIAdjudicationNote": {
									"path": "SPAIAdjudicationNote"
								},
								"SPAIComplianceNotes": {
									"path": "SPAIComplianceNotes"
								},
								"SPAILineMarginPct": {
									"path": "SPAILineMarginPct"
								},
								"SPAIQtyRemaining": {
									"path": "SPAIQtyRemaining"
								},
								"SPAIEstimatorDecision": {
									"path": "SPAIEstimatorDecision"
								}
							}
						}
					},
					"TimelineTile_Document_9jh7k1vDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Document"
						}
					},
					"TimelineTile_Invoice_7mkrbtlDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Invoice"
						}
					},
					"TimelineTile_Order_8ns2b2rDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Order"
						}
					},
					"GridDetail_ce4c5jmDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIDecisionLedger",
							"attributes": {
								"SPAIActor": {
									"path": "SPAIActor"
								},
								"SPAIComplianceChecks": {
									"path": "SPAIComplianceChecks"
								},
								"SPAIConfidence": {
									"path": "SPAIConfidence"
								},
								"SPAIDecisionType": {
									"path": "SPAIDecisionType"
								},
								"SPAINewValue": {
									"path": "SPAINewValue"
								},
								"SPAIOccurredOn": {
									"path": "SPAIOccurredOn"
								},
								"SPAIProposedProduct": {
									"path": "SPAIProposedProduct"
								},
								"SPAIReasonCode": {
									"path": "SPAIReasonCode"
								}
							}
						}
					},
					"GridDetail_j2hpszzDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Product",
							"attributes": {
								"Name": {
									"path": "Name"
								},
								"SPAIBrand": {
									"path": "SPAIBrand"
								},
								"Category": {
									"path": "Category"
								},
								"Code": {
									"path": "Code"
								},
								"SPAIComplianceVerifiedOn": {
									"path": "SPAIComplianceVerifiedOn"
								},
								"SPAICutoutDepthMm": {
									"path": "SPAICutoutDepthMm"
								},
								"SPAICutoutHeightMm": {
									"path": "SPAICutoutHeightMm"
								},
								"SPAICutoutWidthMm": {
									"path": "SPAICutoutWidthMm"
								},
								"SPAIEnergyStarRating": {
									"path": "SPAIEnergyStarRating"
								},
								"SPAIFinish": {
									"path": "SPAIFinish"
								},
								"SPAIGemsRegistrationNo": {
									"path": "SPAIGemsRegistrationNo"
								},
								"SPAIProductFamily": {
									"path": "SPAIProductFamily"
								},
								"SPAIProjectApproved": {
									"path": "SPAIProjectApproved"
								},
								"SPAIWaterMarkCertNo": {
									"path": "SPAIWaterMarkCertNo"
								},
								"SPAIWELSRating": {
									"path": "SPAIWELSRating"
								},
								"SPAIWelsRegistrationNo": {
									"path": "SPAIWelsRegistrationNo"
								},
								"SPAIWholesaleCost": {
									"path": "SPAIWholesaleCost"
								}
							}
						}
					},
					"GridDetail_vkscgrbDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAICallUpSchedule",
							"attributes": {
								"SPAIScheduleRef": {
									"path": "SPAIScheduleRef"
								}
							}
						}
					},
					"GridDetail_4jnbdzeDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAILocation",
							"attributes": {
								"SPAIName": {
									"path": "SPAIName"
								}
							}
						}
					},
					"GridDetail_v8h2ka6DS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIStockPosition",
							"attributes": {
								"SPAIProduct": {
									"path": "SPAIProduct"
								}
							}
						}
					},
					"GridDetail_nl8f34fDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "Order",
							"attributes": {
								"Number": {
									"path": "Number"
								}
							}
						}
					},
					"GridDetail_qhwy93sDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SPAIScheduleLine",
							"attributes": {
								"SPAISpecifiedText": {
									"path": "SPAISpecifiedText"
								}
							}
						}
					}
				}
			},
			{
				"operation": "remove",
				"path": [
					"dependencies"
				],
				"properties": [
					"ProductsListDS",
					"RecommendedProductListDS",
					"OpportunityTeamListDS",
					"CompetitorsListDS",
					"StageHistoryListDS",
					"OpportunitiesByCustomerListDS",
					"NextKeyActionListDS",
					"LeadsListDS",
					"OpportunityHistoryDS",
					"OrdersListDS",
					"DataGrid_o1m7u6hDS",
					"DocumentsListDS"
				]
			},
			{
				"operation": "merge",
				"path": [
					"dependencies"
				],
				"values": {
					"SPAIScheduleLinesGridDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					],
					"GridDetail_ce4c5jmDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					],
					"GridDetail_vkscgrbDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					],
					"GridDetail_nl8f34fDS": [
						{
							"attributePath": "Opportunity",
							"relationPath": "PDS.Id"
						}
					],
					"GridDetail_qhwy93sDS": [
						{
							"attributePath": "SPAIOpportunity",
							"relationPath": "PDS.Id"
						}
					]
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
			{
				request: "spai.SetAdjudicationStatusRequest",
				handler: async (request, next) => {
					const { $context } = request;
					await $context.set("PDS_SPAIAdjudicationStatus_spai", {
						value: request.statusId,
						displayValue: request.statusName
					});
					await sdk.HandlerChainService.instance.process({
						type: "crt.SaveRecordRequest",
						preventCardClose: true,
						$context,
						scopes: [...request.scopes]
					});
					return next?.handle(request);
				}
			}
		]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});