# Schedule Extractor: field mapping

This is a reference for the builder and for BP1 `SPAITenderIntake`. It maps each output key to the live column it lands in.
It was verified read-only against `SPAIScheduleLine` on 189575-crm-bundle via clio on 2026-09-20 (merged schema, all packages).

## Envelope

| Key | Lands in | Notes |
|---|---|---|
| `extractionStatus` | BP1 gateway only | `success` continues. `partial` or `failed` notifies the owner and ends (02 §4 BP1 step 4) |
| `documentRevision` | BP1 process parameter | Not persisted on a column today |
| `lineCount` | `Opportunity.SPAILineCount` | BP1 step 6 |
| `lines[]` | One `SPAIScheduleLine` per element | Inserted by `bp-scripts/BP1_InsertScheduleLines.cs` with `SPAILineStatus` = `Pending` |

## Line keys

| Key | Column (title) | Type | Mapping rule |
|---|---|---|---|
| `lineNumber` | `SPAILineNumber` (Line number) | Integer | as is |
| `itemRef` | `SPAIItemCode` (Item ref) | ShortText | as is; empty stays empty |
| `isAlternate` | `SPAIIsAlternative` (Approved alternative (ALT)) | Boolean | as is |
| `alternateVariant` | `SPAIAlternateVariant` (Alternate variant) | ShortText | as is |
| `productFamily` | none on the line | none | Used by BP3 to select candidates. When it is empty, BP3 derives the family from the specified product (`Product.SPAIModelCode`) or from a family name found in `specifiedText` |
| `roomType` | `SPAIRoomType` (Room type) | Lookup `SPAIRoomType` | Match by Name: Kitchen, Main Bathroom, Ensuite, Powder Room, Laundry, Butlers Pantry. No match leaves the lookup empty and appends the raw text to `SPAIScheduleNotes` |
| `unitTier` | `SPAIUnitTier` (Unit tier) | Lookup `SPAIUnitTier` | Match by Name: Standard, Premium, Penthouse. Same fallback |
| `specifiedText` | `SPAISpecifiedText` (Specified text) | LongText | as is |
| `specifiedBrand` | `SPAISpecifiedBrand` (Specified brand) | MediumText | as is |
| `specifiedModel` | `SPAISpecifiedModel` (Specified model) | ShortText | as is (typos preserved) |
| `specifiedFinish` | `SPAISpecifiedFinish` (Specified finish) | ShortText | as is |
| `quantity` | `SPAIQuantity` (Order qty) | Integer | Total Qty |
| `cutoutW` / `cutoutH` / `cutoutD` | `SPAIRequiredCutoutW` / `H` / `D` | Integer | 0 means no cut-out stated |
| `notes` | `SPAIScheduleNotes` (Schedule notes) | LongText | as is |
| `extractionConfidence` | `SPAIConfidence` (Confidence) | Float | **Shared column.** BP3 overwrites it with the Adjudicator's confidence for adjudicated lines |

`SPAIDisplayRef` is not written by the extractor. `SPAIItemIdentityEntityEventListener` derives it on save from item ref, ALT and variant.

## Known data condition (hero schedule)

`Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx` has no Item Ref, ALT or product-family columns. On that document `itemRef`, `alternateVariant` and `productFamily` come back empty and `isAlternate` comes back false. That is correct transcription, not a failure. The answer key's ItemRef and ALT values do not arrive through extraction for this tender.

## Example asset
`assets/example-output.json` shows the envelope and three of the 44 lines of the hero RevC workbook: **015** (Penthouse basin, Total Qty 12 against Qty/Unit 2), **017** (the model-code typo `04DW4501X`, left intact) and **020** (the "or equal approved" ambiguous line). The values are transcribed from the workbook the instance was loaded from.
