# Build Plan 1: Infrastructure  ·  v2
### Executed by Claude Code + clio against the competition instance

**Target:** `https://189575-crm-bundle.creatio.com/` (Creatio 10x)
**Package:** `SPAIAdjudicator` · **Prefix:** `SPAI`
**Effort:** 4 sessions (18, 19, 20, 21 Sep) plus Step 9 on 24 Sep
**Input data:** the `meridian-data-v2` folder (twelve CSVs plus the hero XLSX)

> **Scope note for the executing agent.** This plan builds the data model, the seed data, the Freedom UI, the dashboard, and the **business processes that contain no AI**. It does NOT build sub-agents, knowledge sources, or the Angular component. Those are Build Plans 2 and 3.

---

## Step 0. Connect clio

```bash
dotnet tool install -g clio

clio reg-web-app meridian \
  --url https://189575-crm-bundle.creatio.com/ \
  --login <supplied at runtime> \
  --password <supplied at runtime>

clio ping -e meridian
clio set-dev-mode meridian --active true
```

Version is confirmed **Creatio 10x**. `clio ver` reports clio's own components, not the instance, so it is not the command for this.

---

## Step 1. Package and prefix

**Order matters. The prefix must be set before any schema is created.**

1. Set `SchemaNamePrefix` to `SPAI`
2. Create package `SPAIAdjudicator`, depending on the base platform package plus whichever Sales application package on this bundle supplies `Opportunity`, `Product`, `Quote` and `Order`
3. Set `CurrentPackageId` to `SPAIAdjudicator`

```bash
clio set-syssetting SchemaNamePrefix SPAI -e meridian
```

> **Hazard.** If `CurrentPackageId` points elsewhere, everything you create in the visual designers silently lands in the wrong package and will not export. Verify before creating anything and again at the start of every session.

---

## Step 2. Lookups

| Schema | Values / source |
|---|---|
| `SPAIBrand` | `01_brands.csv` (10). Columns: Category, Tier, CountryOfOrigin |
| `SPAIProductFamily` | `02_product_families.csv` (10). Columns: Category, HasCutout |
| `SPAILocationType` | Distribution Centre, Retail Store |
| `SPAILifecycleStatus` | Current, Superseded, Discontinued |
| `SPAIFinish` | Stainless Steel, Matte Black, Brushed Brass, Chrome, Gloss White, Gunmetal |
| `SPAIRoomType` | Kitchen, Ensuite, Main Bathroom, Laundry, Butlers Pantry, Powder Room |
| `SPAIUnitTier` | Standard, Premium, Penthouse |
| `SPAILineStatus` | Pending, Exact match, Sourced multi-location, Substitution proposed, Substitution approved, Substitution rejected, Escalated, No match |
| `SPAIAdjudicationStatus` | Not started, Extracting, Matching, Sourcing, Adjudicating, Awaiting Gate 1, Awaiting Gate 2, Submitted, Re-adjudicating |
| `SPAISourceTier` | 1 Home DC, 2 Other DC, 3 Retail store, 4 Inbound supply |
| `SPAIDecisionType` | Deterministic match, Compliance rejection, Sourcing allocation, AI adjudication, Human override, Re-adjudication |
| `SPAIEstimatorDecision` | Pending, Accepted, Rejected, Amended |
| `SPAIDriver` | `12_drivers.csv` (5). **Lookup only. No section, no layout.** |

### `SPAIReasonCode`: build this one carefully

BP gateways branch on this and never on model prose. Columns: `Code` (text), `RequiresHuman` (boolean).

| Code | Name | RequiresHuman |
|---|---|---|
| `EXACT` | Exact catalog match | No |
| `MULTI_SOURCE` | Fulfilled across multiple locations | No |
| `DISCONTINUED_SUB` | Discontinued, compliant equivalent proposed | No |
| `LEADTIME_SUB` | Lead time exceeded, equivalent proposed | No |
| `STOCKOUT_SUB` | Insufficient network stock, equivalent proposed | No |
| `COMPLIANCE_FAIL` | Candidate failed WELS, GEMS or WaterMark check | Yes |
| `DIM_MISMATCH` | No equivalent fits the specified cut-out | Yes |
| `NO_EQUIVALENT` | No compliant equivalent exists | Yes |
| `AMBIGUOUS_SPEC` | Specification too vague to resolve | Yes |
| `CODE_UNRECOGNISED` | Model code not found, closest match proposed | Yes |

---

## Step 3. Extend `Product`

Native object, deliberately. Depth of interaction with real CRM structures is a scoring criterion.

| Column | Type | Notes |
|---|---|---|
| `SPAIModelCode` | Text (50) | **Indexed.** Primary deterministic match key |
| `SPAIBrand` | Lookup → `SPAIBrand` | |
| `SPAIProductFamily` | Lookup → `SPAIProductFamily` | |
| `SPAILifecycleStatus` | Lookup | |
| `SPAISupersededBy` | Lookup → `Product` | Self-referencing |
| `SPAILeadTimeWeeks` | Integer | |
| `SPAICutoutWidthMm` / `HeightMm` / `DepthMm` | Integer | |
| `SPAIEnergyStarRating` | Decimal (0.1) | |
| `SPAIWELSRating` | Decimal (0.1) | |
| `SPAIFinish` | Lookup → `SPAIFinish` | |
| `SPAIWholesaleCost` | Currency | |
| `SPAITradeSellPrice` | Currency | |
| `SPAIProjectApproved` | Boolean | |
| **`SPAIWelsRegistrationNo`** | Text (30) | **Compliance floor.** WELS Act registration |
| **`SPAIGemsRegistrationNo`** | Text (30) | **Compliance floor.** GEMS Act registration |
| **`SPAIWaterMarkCertNo`** | Text (30) | **Compliance floor.** ABCB WaterMark certificate |
| `SPAIComplianceVerifiedOn` | Date | |

The three compliance fields are what make the governance section real rather than rhetorical. BP2 checks them; the model never has to be trusted to.

---

## Step 4. Custom objects

### 4.1 `SPAILocation`

One object covers distribution centres and retail stores. Do not build separate Warehouse and Store objects.

| Column | Type |
|---|---|
| `SPAICode` | Text (10) |
| `SPAILocationType` | Lookup → `SPAILocationType` |
| `SPAIState` | Text (10) |
| `SPAISuburb` | Text (100) |
| `SPAISourcingRank` | Integer (lower is preferred) |
| `SPAIAcceptingFrom` / `SPAIAcceptingUntil` | Date (the warehouse manager's constraint window) |
| `SPAIIsAvailable` | Boolean |

`SPAIAcceptingFrom`, `SPAIAcceptingUntil` and `SPAIIsAvailable` are what the warehouse manager changes to trigger re-adjudication. They must exist even if re-adjudication is later cut.

### 4.2 `SPAIStockPosition`

| Column | Type |
|---|---|
| `SPAIProduct` | Lookup → `Product` (required) |
| `SPAILocation` | Lookup → `SPAILocation` (required) |
| `SPAIQtyOnHand` / `SPAIQtyAllocated` / `SPAIQtyAvailable` | Integer |
| `SPAINextInboundQty` | Integer |
| `SPAINextInboundDate` | Date |

Composite index on (`SPAIProduct`, `SPAILocation`).

### 4.3 `SPAIScheduleLine`: the workhorse

| Column | Type | Notes |
|---|---|---|
| `SPAIOpportunity` | Lookup → `Opportunity` | |
| `SPAILineNumber` | Integer | |
| `SPAIRoomType`, `SPAIUnitTier` | Lookup | |
| `SPAISpecifiedText` | Text (500) | |
| `SPAISpecifiedBrand` | Text (100) | May be empty |
| `SPAISpecifiedModel` | Text (50) | May be empty or malformed |
| `SPAISpecifiedFinish` | Text (50) | |
| `SPAIQuantity` | Integer | Total, not per-unit |
| `SPAIRequiredCutoutW` / `H` / `D` | Integer | |
| `SPAIScheduleNotes` | Text (500) | |
| `SPAIMatchedProduct` | Lookup → `Product` | |
| `SPAILineStatus` | Lookup | Drives colour coding |
| `SPAIReasonCode` | Lookup | Drives gateways |
| `SPAIAdjudicationNote` | Text (500) | The equivalence basis. ACL artefact |
| `SPAIComplianceNotes` | Text (500) | Which floors passed, any finish deviation |
| `SPAIConfidence` | Decimal (0.01) | |
| `SPAIResolvedBy` | Text (50) | `Deterministic` / `Adjudicator` / `Human` |
| `SPAIQtySourced` / `SPAIQtyShortfall` | Integer | |
| `SPAIUnitCost` / `SPAIUnitSell` / `SPAILineTotal` | Currency | |
| `SPAILineMarginPct` | Decimal (0.1) | Disclosed, never ranked |
| `SPAICallOffOrder` | Lookup → `Order` | Which phase |
| `SPAIEstimatorDecision` | Lookup | |

### 4.4 `SPAILineSource`: the split-fill object

A line can be filled from several locations. This is what makes the store fallback visible.

| Column | Type |
|---|---|
| `SPAIScheduleLine` | Lookup → `SPAIScheduleLine` |
| `SPAILocation` | Lookup → `SPAILocation` |
| `SPAIQtyAllocated` | Integer |
| `SPAISourceTier` | Lookup → `SPAISourceTier` |
| `SPAIInterstateFreight` | Boolean |
| `SPAIAllocatedOn` | Date/Time |

### 4.5 `SPAIDelivery`

| Column | Type |
|---|---|
| `SPAIOrder` | Lookup → `Order` |
| `SPAIFromLocation` | Lookup → `SPAILocation` |
| `SPAIScheduledOn` | Date |
| `SPAIDriver` | Lookup → `SPAIDriver` |
| `SPAIStatus` | Lookup (Planned, Dispatched, Delivered) |
| `SPAILineCount` / `SPAIValue` | Integer / Currency |

### 4.6 `SPAISubstitutionRule`

| Column | Type |
|---|---|
| `SPAIRuleCode` | Text (20) |
| `SPAIFromProduct` / `SPAIToProduct` | Lookup → `Product` |
| `SPAIEquivalenceBasis` | Text (500) |
| `SPAIFinishMatch` | Boolean |
| `SPAIApprovedBy` | Text (100) |
| `SPAIApprovedOn` | Date |
| `SPAIIsActive` | Boolean |

### 4.7 `SPAIDecisionLedger`: append-only

| Column | Type |
|---|---|
| `SPAIScheduleLine` | Lookup → `SPAIScheduleLine` |
| `SPAIOpportunity` | Lookup → `Opportunity` |
| `SPAISequence` | Integer |
| `SPAIDecisionType` | Lookup → `SPAIDecisionType` |
| `SPAIActor` | Text (100) |
| `SPAIProposedProduct` | Lookup → `Product` |
| `SPAIComplianceChecks` | Text (500) |
| `SPAIReasonCode` | Lookup |
| `SPAIConfidence` | Decimal (0.01) |
| `SPAIPriorValue` / `SPAINewValue` | Text (250) |
| `SPAIOccurredOn` | Date/Time |

**Permissions: insert only.** Revoke update and delete on this object for every role including the supervisor. That restriction is the point of the object.

---

## Step 5. Native objects: verify, then extend

### 5.1 Verify first

Confirm `Quote`, `QuoteProduct`, `Order` and `OrderProduct` exist on this bundle. **Report what you find before proceeding.**

If `Quote` or `Order` is absent, fall back to custom `SPAIQuote` / `SPAIQuoteLine` / `SPAICallOffOrder` with the same shape, and say so. Do not silently improvise.

### 5.2 Extend `Opportunity`

`SPAITenderCode`, `SPAIProjectName`, `SPAIHeadContractor`, `SPAIDwellingCount`, `SPAITenderCloseOn`, `SPAIScheduleReceivedOn`, `SPAIAdjudicationStatus`, `SPAILineCount`, `SPAIExactMatchCount`, `SPAIMultiSourceCount`, `SPAISubstitutionCount`, `SPAIEscalationCount`, `SPAIDeterministicCount`, `SPAIAiCallCount`, `SPAITotalCost`, `SPAITotalSell`, `SPAIGrossMarginPct`, `SPAIHoursToClose` (formula), `SPAIGate1ApprovedBy` / `On`, `SPAIGate2ApprovedBy` / `On`.

`SPAIDeterministicCount` and `SPAIAiCallCount` appear on screen in the video. They must be real fields fed by the processes, not captions.

### 5.3 Extend `Order` to carry the call-off phase

`SPAIPhaseNumber`, `SPAIPhaseName`, `SPAITargetDate`, `SPAIScope`, `SPAIPrimaryLocation` (lookup → `SPAILocation`), `SPAIOpportunity`.

---

## Step 6. Data import

**Order is mandatory.**

| # | File | Target | Rows |
|---|---|---|---|
| 1 | `01_brands.csv` | `SPAIBrand` | 10 |
| 2 | `02_product_families.csv` | `SPAIProductFamily` | 10 |
| 3 | `03_locations.csv` | `SPAILocation` | 12 |
| 4 | `12_drivers.csv` | `SPAIDriver` | 5 |
| 5 | `10_accounts.csv` | `Account` | 5 |
| 6 | `11_contacts.csv` | `Contact` | 8 |
| 7 | `04_products.csv` | `Product` | 494 |
| 8 | `04_products.csv` 2nd pass | `Product.SPAISupersededBy` | self-reference |
| 9 | `05_stock_positions.csv` | `SPAIStockPosition` | 2,251 |
| 10 | `06_substitution_rules.csv` | `SPAISubstitutionRule` | 99 |
| 11 | `07_tenders.csv` | `Opportunity` | 3 |
| 12 | `08_calloff_phases.csv` | `Order` | 3 |

**`09_hero_schedule_ANSWER_KEY.csv` is NOT imported.** It is the scoring fixture for Build Plan 2. It must never enter the instance.

---

## Step 7. Verification gate

Run all of these and **report the actual numbers**. Steps 8 and 9 do not start until they pass, and **Build Plan 3 does not start until they pass.**

```sql
-- 1. Substitution rules resolve on both sides
SELECT COUNT(*) FROM SPAISubstitutionRule
WHERE SPAIFromProductId IS NULL OR SPAIToProductId IS NULL;          -- expect 0

-- 2. Model codes unique
SELECT SPAIModelCode, COUNT(*) FROM Product
WHERE SPAIModelCode IS NOT NULL GROUP BY SPAIModelCode HAVING COUNT(*) > 1;   -- expect none

-- 3. Stock positions resolve
SELECT COUNT(*) FROM SPAIStockPosition
WHERE SPAIProductId IS NULL OR SPAILocationId IS NULL;               -- expect 0

-- 4. Compliance coverage
SELECT COUNT(*) FROM Product p
JOIN SPAIProductFamily f ON f.Id = p.SPAIProductFamilyId
WHERE f.Category IN ('Tapware','Sanitaryware') AND (p.SPAIWaterMarkCertNo IS NULL OR p.SPAIWaterMarkCertNo = '');
-- expect 0

-- 5. CRITICAL: discontinued items with a stocked, approved, dimensionally
--    matching replacement. Without this the demo has no substitution beat.
SELECT COUNT(*) FROM Product p
JOIN Product r ON r.Id = p.SPAISupersededById
JOIN SPAIStockPosition s ON s.SPAIProductId = r.Id
WHERE p.SPAILifecycleStatusId = <Discontinued>
  AND r.SPAIProjectApproved = 1
  AND s.SPAIQtyAvailable > 100
  AND r.SPAICutoutWidthMm = p.SPAICutoutWidthMm
  AND r.SPAICutoutHeightMm = p.SPAICutoutHeightMm;
-- expect > 5   (source data verifies at 13)

-- 6. CRITICAL: store fallback is possible. Products where DC stock alone
--    is short of 138 but DC plus retail stores covers it.
SELECT COUNT(*) FROM (
  SELECT s.SPAIProductId,
         SUM(CASE WHEN l.SPAILocationTypeId = <DC>    THEN s.SPAIQtyAvailable ELSE 0 END) dc,
         SUM(s.SPAIQtyAvailable) total
  FROM SPAIStockPosition s JOIN SPAILocation l ON l.Id = s.SPAILocationId
  GROUP BY s.SPAIProductId
) x WHERE x.dc < 138 AND x.total >= 138;
-- expect >= 3
```

If query 5 or 6 fails, **stop and report.** The seed data needs regenerating and that is a fifteen-minute fix on day three, not a crisis on day twelve.

---

## Step 8. Freedom UI

### 8.1 The Adjudication tab on `Opportunity`

**Summary tile row:** Lines · Exact match · Multi-source · Substituted · Escalated · **Resolved without AI** · **AI calls** · Gross margin % · Hours to close

**Schedule Lines list**, filtered to the Opportunity. Columns: line number, room, tier, specified text, specified model, quantity, matched product, line status, reason code, adjudication note, compliance notes, margin %, call-off order, estimator decision.

Conditional formatting on `SPAILineStatus`:

| Status | Colour |
|---|---|
| Exact match, Substitution approved | Green |
| Multi-source | Blue |
| Substitution proposed | Amber |
| Escalated, No match | Red |
| Pending | Grey |

**Buttons:** `Run adjudication`, `Approve Gate 1`, `Submit for Gate 2`. Wire to `SPAIAdjudicationStatus` only.

**Business rules:** hide each gate button unless status matches; make line fields read-only once `SPAIGate1ApprovedOn` is set.

> **Time-box conditional formatting to one hour.** If it fights you, ship a text status column and move on.

### 8.2 Detail lists

`SPAILineSource` as a detail on the Schedule Line page. This is where the store fallback is visible before the Allocation Board exists, and it is the fallback if Plan 3 is cut.

### 8.3 Sections

`SPAILocation`, `SPAIStockPosition`, `SPAISubstitutionRule`, `SPAIScheduleLine`, `SPAIDelivery`, `SPAIDecisionLedger` (read-only list). Group into a `Meridian Commercial` workplace.

### 8.4 Dashboard, one only

Lines by reason code · substitution rate by product family · **resolved deterministically vs by AI** · stock allocation by location type · tender value by call-off phase.

---

## Step 9. Business processes with no AI (24 Sep session)

Claude Code builds all four of these. They contain no sub-agent element.

### BP2a `SPAIDeterministicMatch`

Trigger: signal on `Opportunity`, filter `SPAIAdjudicationStatus = Matching`. Background: yes.

Per line, via multi-instance sub-process:
1. `Read data`, `Product` where `SPAIModelCode = SPAISpecifiedModel`
2. Not found → leave `Pending`, end instance
3. Found → **compliance floor** formula: lifecycle is Current **and** project approved **and** (WaterMark cert present if tapware or sanitaryware) **and** (WELS reg present and rating ≥ specified if WELS-regulated) **and** (GEMS reg present and rating ≥ specified if energy-regulated) **and** cut-out W/H/D all match
   - Fails → `SPAIReasonCode = COMPLIANCE_FAIL`, write ledger row, leave `Pending`
   - Passes → continue to BP2b
4. Write `SPAIDecisionLedger` row, type `Deterministic match` or `Compliance rejection`

### BP2b `SPAISourcingCascade`

Called as a sub-process from BP2a for every compliant line. **Zero AI.**

```
required = SPAIQuantity
1. Home DC   (SPAILocation where State = project state, type = DC, IsAvailable)
2. Other DCs (by SPAISourcingRank)
3. Retail stores (by SPAISourcingRank)          ← the fallback
4. Inbound supply arriving before the phase target date
```

At each tier, allocate `min(remaining, SPAIQtyAvailable)`, create an `SPAILineSource` row with the tier and an interstate-freight flag, decrement remaining. Stop at zero.

- Filled from one location → `SPAILineStatus = Exact match`, `SPAIReasonCode = EXACT`
- Filled from several → `Sourced multi-location`, `MULTI_SOURCE`
- Not filled → leave `Pending` for adjudication, set `SPAIQtyShortfall`

Then `SPAIResolvedBy = Deterministic`, calculate line financials, write a ledger row of type `Sourcing allocation`.

On completion: update Opportunity counters, set status to `Adjudicating`.

### BP4 `SPAIPhaseAllocation`

Runs after adjudication. No AI.

| Condition | Call-off Order |
|---|---|
| Family in (Toilet Suite, Basin Mixer, Shower Set) | Phase 1, Plumbing rough-in |
| Unit tier in (Standard, Premium) | Phase 2, Fitout |
| Unit tier is Penthouse | Phase 3, Penthouse finishes |

Then create `OrderProduct` rows per line and one `SPAIDelivery` per (Order, source Location) pair.

### BP5 / BP6 `SPAIGate1Approval` / `SPAIGate2SignOff`

Gate 1: user task to the Opportunity owner, gateway on outcome, recalculate totals, ledger row of type `Human override` for any changed line, then gateway on `SPAITotalSell` against threshold.

Gate 2: user task, generate the MS Word printable "Commercial Tender Submission", set Gate 2 fields, status `Submitted`.

### Scaffold only, do not configure

`SPAITenderIntake` and `SPAIAdjudication` are created as empty processes with their triggers and variables defined. The sub-agent element cannot be configured until Build Plan 2 creates the sub-agents. **Leave a clearly commented placeholder where it goes.**

---

## Step 10. Export

```bash
clio pull-pkg SPAIAdjudicator -e meridian --dest ./backup
```

At the end of every session. Commit it.

---

## Definition of done

- [ ] `CurrentPackageId` verified as `SPAIAdjudicator`
- [ ] All lookups populated, `SPAIReasonCode` has all 10 codes
- [ ] `Quote` and `Order` presence reported; fallback declared if absent
- [ ] 494 products with compliance registration numbers, model codes indexed
- [ ] 2,251 stock positions across 12 locations
- [ ] `SPAIDecisionLedger` permissions verified as insert-only
- [ ] **All six verification queries reported with actual numbers, 5 and 6 passing**
- [ ] Adjudication tab renders with tiles and colour-coded line list
- [ ] BP2a, BP2b, BP4, BP5, BP6 built and runnable; BP1 and BP3 scaffolded with placeholders
- [ ] Package exported and committed
