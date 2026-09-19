# Adjudicator: input contract

This file defines the five inputs that BP3 `SPAIAdjudication` builds and passes in **one** call for **all** pending lines of a tender. Every key traces to a live column on 189575-crm-bundle. The columns were verified read-only via clio on 2026-09-20 against the merged schemas of `SPAIScheduleLine`, `Product`, `SPAIStockPosition`, `SPAILocation`, `SPAISubstitutionRule` and `SPAIProductFamily`.

Built by: `bp-scripts/BP3_BuildCandidateSet.cs` (unresolvedLines, candidateProducts, substitutionRules, policyContext) and `bp-scripts/BP3_BuildNetworkStock.cs` (networkStock).
Worked example: `assets/example-input.json`. It contains schedule lines 036 (DIM_TRAP) and 040 (DISCONTINUED) of the Corvina RevC hero schedule, built from `meridian-data-v3`.

**Design rule restated:** products and stock arrive here, supplied by the process. The skill never searches or retrieves them. Knowledge sources hold policy and precedent only.

---

## 1. `unresolvedLines`: array, one element per `SPAIScheduleLine` with `SPAILineStatus` = `Pending`

| Key | Source column / derivation |
|---|---|
| `lineNumber` | `SPAIScheduleLine.SPAILineNumber` |
| `itemRef`, `isAlternate` | `SPAIItemCode`, `SPAIIsAlternative` |
| `productFamily` | `Product.SPAIProductFamily.Name` of the specified product. When that does not resolve, the first `SPAIProductFamily.Name` found in `SPAISpecifiedText` |
| `roomType`, `unitTier` | `SPAIRoomType.Name`, `SPAIUnitTier.Name` |
| `specifiedText`, `specifiedBrand`, `specifiedModel`, `specifiedFinish` | `SPAISpecifiedText`, `SPAISpecifiedBrand`, `SPAISpecifiedModel`, `SPAISpecifiedFinish` |
| `quantity` | `SPAIQuantity` (Order qty) |
| `cutoutW`, `cutoutH`, `cutoutD` | `SPAIRequiredCutoutW`, `H`, `D` (0 = none stated) |
| `notes` | `SPAIScheduleNotes` |
| `regimes` | `{cutout, wels, gems, waterMark}` booleans from the **KS2 §7 Combined eligibility matrix**, looked up by `productFamily` (see §6) |
| `specifiedProduct` | `Product` where `SPAIModelCode` = `specifiedModel`, or `null` when unresolved (typo or ambiguous): `productCode` (`Code`), `lifecycleStatus` (`SPAILifecycleStatus.Name`), `supersededByCode` (`SPAISupersededBy.Code`), `leadTimeWeeks` (`SPAILeadTimeWeeks`), `welsRating` (`SPAIWELSRating`), `energyStarRating` (`SPAIEnergyStarRating`), `networkQtyAvailable` (Σ `SPAIStockPosition.SPAIQtyAvailable`) |
| `floorDiagnostics` | Counts computed by the BP floor for this line: `familyCandidates` (Current and project approved in the family), `cutoutFit`, `cutoutFitFloorFail` (fits but fails WELS, GEMS, WaterMark or rating), `eligible` |

`specifiedProduct` is where **"rating >= specified"** gets its baseline. `SPAIScheduleLine` has no specified-rating column, so the specified product's ratings are the reference. If there is no specified product, the rating floor is waived and only the registration must be present.

`floorDiagnostics` lets the skill tell `DIM_MISMATCH` (`cutoutFit` = 0) apart from `COMPLIANCE_FAIL` (`cutoutFitFloorFail` > 0 and `eligible` = 0) and `NO_EQUIVALENT`. It does not have to see any ineligible product to do so. That is the closed-set rule working as designed.

## 2. `candidateProducts`: array, **capped at 60**, pre-ordered

Only products that passed the floor for at least one pending line are included. The floor conditions are Block 2: exact cut-out, WELS, GEMS and WaterMark per regime, ratings >= specified, project approved, lifecycle Current.

| Key | Source column |
|---|---|
| `productCode` | `Product.Code` (e.g. `MCS-0372`); this is the only value the skill may return |
| `name`, `modelCode`, `brand` | `Name`, `SPAIModelCode`, `SPAIBrand.Name` |
| `productFamily` | `SPAIProductFamily.Name` |
| `lifecycleStatus`, `projectApproved` | `SPAILifecycleStatus.Name`, `SPAIProjectApproved` |
| `cutoutW`, `cutoutH`, `cutoutD` | `SPAICutoutWidthMm`, `SPAICutoutHeightMm`, `SPAICutoutDepthMm` |
| `welsRegistrationNo`, `welsRating` | `SPAIWelsRegistrationNo`, `SPAIWELSRating` |
| `gemsRegistrationNo`, `energyStarRating` | `SPAIGemsRegistrationNo`, `SPAIEnergyStarRating` |
| `waterMarkCertNo` | `SPAIWaterMarkCertNo` |
| `finish`, `leadTimeWeeks` | `SPAIFinish.Name`, `SPAILeadTimeWeeks` |
| `marginPct` | (`SPAITradeSellPrice` − `SPAIWholesaleCost`) ÷ `SPAITradeSellPrice` × 100, rounded to 1 dp. **Display only: never a sort key** |
| `eligibleLines` | `[{lineNumber, preRank}]`: the lines this product passed the floor for, with the BP's deterministic rank (compliance headroom, then availability, then finish match) |

Array order is the best `preRank` across lines, then `productCode`. Margin is never used to order. When more than 60 products qualify, the BP keeps them round-robin by `preRank`, so every line keeps its best candidates.

## 3. `substitutionRules`: array

These are active `SPAISubstitutionRule` records (`SPAIIsActive` = true) whose `SPAIFromProduct` is the specified product of a pending line.

| Key | Source column |
|---|---|
| `ruleCode` | `SPAIRuleCode` |
| `fromProductCode`, `toProductCode` | `SPAIFromProduct.Code`, `SPAIToProduct.Code` |
| `equivalenceBasis` | `SPAIEquivalenceBasis` |
| `finishMatch` | `SPAIFinishMatch` |
| `targetEligibleForLines` | Line numbers for which `toProductCode` passed the floor. An empty array means the rule's target fails the floor for every line, so the rule does not apply ("provided its target passes the compliance floor") |

## 4. `networkStock`: array, candidates only

| Key | Source column |
|---|---|
| `productCode` | `SPAIStockPosition.SPAIProduct.Code` |
| `locationCode`, `locationName` | `SPAILocation.SPAICode`, `SPAILocation.SPAIName` |
| `locationType` | `SPAILocation.SPAILocationType.Name` (Distribution Centre, Retail Store) |
| `sourcingRank` | `SPAILocation.SPAISourcingRank` |
| `qtyOnHand`, `qtyAvailable` | `SPAIQtyOnHand`, `SPAIQtyAvailable` |
| `nextInboundQty`, `nextInboundDate` | `SPAINextInboundQty`, `SPAINextInboundDate` (yyyy-MM-dd) |

Only locations with `SPAILocation.SPAIIsAvailable` = true are sent. Rows where `qtyAvailable` and `nextInboundQty` are both 0 are dropped, because they cannot change a ranking. Availability totals in `specifiedProduct.networkQtyAvailable` and in the BP pre-rank are unaffected (Gap 3, token spend, 2026-09-20).

## 5. `policyContext`: object

`{policy, leadTimeLimitWeeks: 12, candidateCap: 60, regimeSource}`. The policy text itself is not repeated in every payload. It is the attached knowledge source KS1 Substitution Governance Policy, which is policy, and retrieving policy is allowed.

## 6. Regime matrix used by the BP (KS2 §7, transcribed)

| Product family | Cut-out | WELS | GEMS | WaterMark |
|---|---|---|---|---|
| Wall Oven, Cooktop | yes | no | yes | no |
| Dishwasher | yes | **yes** | yes | no |
| Rangehood, Microwave | yes | no | no | no |
| Basin | no | no | no | yes |
| Toilet Suite | no | yes | no | yes |
| Basin Mixer, Shower Set, Kitchen Sink Mixer | no | yes | no | yes |

Project approved and lifecycle Current apply to every family.

> **Open data finding (2026-09-20).** None of the 76 Dishwasher products in `meridian-data-v3/04_products.csv` carries `SPAIWelsRegistrationNo` or `SPAIWELSRating`. With the matrix applied as written, every dishwasher candidate fails the floor. That affects answer-key lines 021 and 039 (DISCONTINUED), 028 (TYPO) and 034 (AMBIGUOUS), and the deterministic EXACT dishwasher lines. The run sheet records the decision (data fix or policy fix) as a prerequisite to Test Gate 2. The BP scripts keep the matrix in one table so the decision is a one-line change.

## 7. Output fields the BP derives (not asked of the model)
02 lists `resolvedCount` and `escalatedCount` as outputs. The prompt's output schema returns only `verdicts`, so `BP3_ApplyVerdicts.cs` counts them: resolved = verdicts with a validated product, escalated = verdicts with a final `requiresHuman` = true.
