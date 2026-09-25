# Build Plan 2c: Business Process Run Sheet
### All nine processes, built by hand in the Creatio process designer.

**Instance:** `https://189575-crm-bundle.creatio.com/` (Creatio 10x) · **Package:** `SPAIAdjudicator` · **Prefix:** `SPAI`
**Companion sheets:** `02a_Agent_And_Skills_Run_Sheet.md` (the agent and the two skills) · `02b_Governance_Coverage_Map.md` (where each rule is enforced)
**Sources:** 01 §9 (BP2a, BP2b, BP4, BP5, BP6) · 02 §4–§5 (BP1, BP3, BP7) · 04 Changes 1 and 4 and 04a A1/A3 (delivery events, the award split, sub-PO per event)
**Scripts:** `ai-studio/bp-scripts/*.cs`. None has been compiled. **Compile and trace-test each one as you paste it.**

> **Why by hand.** clio can build processes, but only after its `CrtProcessBuilder` package is installed, and it explicitly cannot author a Script Task. It also cannot build Read data in collection mode, and the AI invocation element is not in its catalogue. Those three are the core of this build, so the whole set is hand-built. Checked 2026-09-25.

---

## 0. Before you start

| # | Do this | Why |
|---|---|---|
| S1 | Confirm `CurrentPackageId` is `SPAIAdjudicator` | Everything you create lands in the package that gets exported |
| S2 | Turn on process tracing for every process as you create it | 02 §7: the trace is the only way to see what an element actually received |
| S3 | Know the three element labels you will reach for constantly: **Read data**, **Modify data**, **Script task** | Named as the designer names them |
| S4 | After pasting any Script task: **save, then compile the package, then restart if prompted** | A Script task is the one in-process element whose C# makes the process need a compile |
| S5 | Decide the four open values in §11 before BP2b, BP6 and BP8 | Each one is a real decision, not a default I can pick for you |

**Element conventions used throughout**
- Every signal-started process runs with **Background mode on**, on every element that offers it. Nobody is waiting at a screen (02 §9 design checklist).
- Every signal trigger carries a **tight filter**. A trigger with no filter fires on every save of every record of that object.
- Every gateway branches on a **field or a formula**, never on model prose (02 §9).
- Script task bodies end with `return true;`. Process parameters are read with `Get<T>("Name")` and written with `Set("Name", value)`.

**The status ladder.** `Opportunity.SPAIAdjudicationStatus` drives the whole chain, and each process advances it. The values are: Not started · Extracting · Matching · Sourcing · Adjudicating · Awaiting Gate 1 · Awaiting Gate 2 · Submitted · Re-adjudicating.

| Status set by | Process that fires on it | Status it leaves behind |
|---|---|---|
| a user pressing `Run adjudication` | BP1 `SPAITenderIntake` | Matching |
| BP1 | BP2a `SPAIDeterministicMatch` | Sourcing |
| BP2a | BP2b `SPAISourcingCascade` (sub-process) | Adjudicating |
| BP2b | BP3 `SPAIAdjudication` | Awaiting Gate 1 |
| BP3 | BP4 `SPAIIndicativeDeliveryPlan` (sub-process) | Awaiting Gate 1 |
| Gate 1 approval | BP5 `SPAIGate1Approval` | Awaiting Gate 2 or Submitted |
| Gate 2 sign-off | BP6 `SPAIGate2SignOff` | Submitted |
| award (manual) | BP8 `SPAIAwardFulfilment` | Submitted (unchanged; fulfilment records appear) |
| a location changing | BP7 `SPAIConstraintChange` | Re-adjudicating |

Build in this order: **BP2a → BP2b → BP4 → BP1 → BP3 → BP5 → BP6 → BP7 → BP8.** The no-AI processes first, so you can test the chain with seeded lines before the agent exists (02 §6: "Test BP2a, BP2b, BP4, BP5, BP6 with the sub-agent elements disabled").

---

## 1. BP2a `SPAIDeterministicMatch`

**Caption:** Meridian: deterministic match and compliance floor · **Trigger:** record signal · **Background:** on
**Purpose:** resolve each line's specified model code against `Product` and apply the compliance floor. No AI, no substitutions.

### Parameters
| Name | Type | Direction | Notes |
|---|---|---|---|
| `OpportunityId` | Unique identifier | Variable | from the signal's record |
| `ProjectState` | Text | Variable | read in element 2, passed to BP2b |
| `MatchedCount` | Integer | Variable | script output |
| `FloorFailCount` | Integer | Variable | script output |
| `UnresolvedCount` | Integer | Variable | script output |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `Opportunity`, event **Record modified**, filter `SPAIAdjudicationStatus = Matching`. Background on |
| 2 | **Read data** | Object `Opportunity`, first record, filter `Id = ` element 1's record. Columns: `SPAIProjectName`, `SPAITenderCode`, `Account`. Map `OpportunityId` ← `Id` |
| 3 | **Script task** "Match and apply the compliance floor" | Paste `bp-scripts/BP2a_DeterministicMatch.cs`. In: `OpportunityId`. Out: `MatchedCount`, `FloorFailCount`, `UnresolvedCount` |
| 4 | **Modify data** | Object `Opportunity`, filter `Id = OpportunityId`. Set `SPAIDeterministicCount` = `MatchedCount`, `SPAIAdjudicationStatus` = **Sourcing** |
| 5 | **Sub-process** | Calls BP2b `SPAISourcingCascade`. Map `OpportunityId` and `ProjectState` |
| 6 | **End** | |

The floor lives in one dictionary at the top of the script, transcribed from KS2 §7. The same table is in `BP3_BuildCandidateSet.cs`, `ai-studio/tests/score_adjudication.py` and `tools/import/verify.py`. **Change all four together or not at all.**

✅ **Verify after building**
- [ ] Trace shows the script ran once, not once per line
- [ ] `MatchedCount + FloorFailCount + UnresolvedCount` equals the number of Pending lines when it started
- [ ] Every matched line has `SPAIMatchedProduct`, `SPAIUnitCost`, `SPAIUnitSell`, `SPAILineTotal`, `SPAIResolvedBy = Deterministic`, and status still **Pending**
- [ ] Each failed line has `SPAIReasonCode = COMPLIANCE_FAIL` and a note naming which condition failed
- [ ] One ledger row per touched line, type `Deterministic match` or `Compliance rejection`

---

## 2. BP2b `SPAISourcingCascade`

**Caption:** Meridian: sourcing cascade · **Trigger:** none, called as a sub-process · **Background:** on
**Purpose:** allocate each matched line across the network, tier by tier. Writes an **indicative** plan and encumbers nothing (04 Change 4).

### Parameters
| Name | Type | Direction | Notes |
|---|---|---|---|
| `OpportunityId` | Unique identifier | **In** | |
| `ProjectState` | Text | **In** | decides the home DC. Blank means tier 1 is skipped: see §11 D1 |
| `FilledCount`, `MultiSourceCount`, `ShortfallCount` | Integer | Out | script outputs |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Simple start** | Required, or a sub-process call cannot resolve it (BPMN rule R16) |
| 2 | **Script task** "Allocate across the network" | Paste `bp-scripts/BP2b_SourcingCascade.cs`. In: `OpportunityId`, `ProjectState` |
| 3 | **Modify data** | Object `Opportunity`, filter `Id = OpportunityId`. Set `SPAIExactMatchCount` = `FilledCount`, `SPAIMultiSourceCount` = `MultiSourceCount`, `SPAIAdjudicationStatus` = **Adjudicating** |
| 4 | **End** | |

The cascade is tier 1 home DC → tier 2 other DCs → tier 3 retail stores → tier 4 inbound supply arriving before the first delivery event. A line filled from one location becomes **Exact match** / `EXACT`; from several, **Sourced multi-location** / `MULTI_SOURCE`; not filled, it stays **Pending** with `SPAIQtyShortfall` set, for the Adjudicator.

✅ **Verify after building**
- [ ] `SPAILineSource` rows exist with `SPAISourcePlanType = Indicative` on **every** row
- [ ] **No `SPAIStockPosition.SPAIQtyAllocated` value changed.** Note one before and after. This is the 04 Change 4 promise
- [ ] At least one line shows tier 3, a retail store: that is the fallback the demo turns on
- [ ] Interstate rows carry `SPAIInterstateFreight = true`
- [ ] Counters on the Opportunity match the line list; status is **Adjudicating**

---

## 3. BP4 `SPAIIndicativeDeliveryPlan`

**Caption:** Meridian: indicative delivery plan · **Trigger:** none, called as a sub-process · **Background:** on
**Purpose:** check each resolved line against the builder's programme and record whether it can be delivered by the first event that needs it. Commits nothing.

> **This replaces 01 §9's phase-allocation table.** 04 Change 1 deleted the three seeded phase orders; 04a A1 moved call-up lines and sub-POs to award. You chose the split, so BP4 is the indicative half and BP8 is the award half.

### Parameters
| Name | Type | Direction |
|---|---|---|
| `OpportunityId` | Unique identifier | **In** |
| `CheckedCount`, `NotDeliverableCount` | Integer | Out |
| `FirstEventOn` | Date/Time | Out |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Simple start** | |
| 2 | **Script task** "Check deliverability against the programme" | Paste `bp-scripts/BP4_IndicativeDeliveryPlan.cs`. In: `OpportunityId` |
| 3 | **Exclusive gateway** | `NotDeliverableCount > 0` → element 4 (label "Lines not deliverable"); default → element 5 |
| 4 | **Modify data** | Object `Opportunity`, set `SPAIEscalationCount` = `SPAIEscalationCount + NotDeliverableCount` (formula) |
| 5 | **End** | |

A tender with no programme loaded exits cleanly with both counts at 0 rather than inventing dates. Corvina has 2 call-up schedules and 49 events and no blanket PO, which is exactly the intended pre-award state (04a A1).

✅ **Verify after building**
- [ ] `FirstEventOn` matches the earliest `SPAIDeliveryEvent.SPAIScheduledOn` of the tender's schedules
- [ ] Any line marked not deliverable has a note naming the shortfall and the date, and status **Escalated**
- [ ] One ledger row per checked line
- [ ] No `SPAICallUpLine`, `Order` or `OrderProduct` row was created. **Nothing is committed here**

---

## 4. BP1 `SPAITenderIntake`

**Caption:** Meridian: tender intake · **Trigger:** record signal · **Background:** on
**Purpose:** read the attached finishes schedule, call the Schedule Extractor, and insert one schedule line per document line.

### Parameters
| Name | Type | Direction | Notes |
|---|---|---|---|
| `OpportunityId` | Unique identifier | Variable | |
| `ProjectContext` | Text | Variable | built in element 3 |
| `LinesJson` | Unlimited text | Variable | the skill's reply |
| `ExtractionStatus`, `DocumentRevision` | Text | Variable | |
| `LineCount`, `InsertedCount`, `SkippedCount` | Integer | Variable | |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `Opportunity`, **Record modified**, filter `SPAIAdjudicationStatus = Extracting`. Background on |
| 2 | **Read data** | Object `Opportunity`, first record, `Id =` the signal record. Columns `SPAIProjectName`, `SPAITenderCode`, `SPAIDwellingCount` |
| 3 | **Formula** | `ProjectContext` = `[#Read Opportunity.SPAIProjectName#] + " · tender " + [#Read Opportunity.SPAITenderCode#]` |
| 4 | **Process file** | Load the attached schedule into process scope. 02 §9: use the file element, **not** a file reference |
| 5 | **AI invocation element** (label from 02a Step 0, R3) | Agent **The Adjudicator**, skill **Schedule Extractor**. Map `inputFile` ← element 4's file, `projectContext` ← `ProjectContext`. Out: `LinesJson`, `ExtractionStatus`, `DocumentRevision`, `LineCount` |
| 6 | **Exclusive gateway** | `ExtractionStatus = "success"` → element 7 (label "Extracted"). `partial` or `failed` → element 9 (label "Extraction failed") |
| 7 | **Script task** "Insert schedule lines" | Paste `bp-scripts/BP1_InsertScheduleLines.cs`. In: `OpportunityId`, `LinesJson`. Out: `InsertedCount`, `SkippedCount` |
| 8 | **Modify data** | Object `Opportunity`: `SPAILineCount` = `LineCount`, `SPAIAiCallCount` = 1, `SPAIScheduleReceivedOn` = current date/time, `SPAIAdjudicationStatus` = **Matching** |
| 9 | **Perform task** (failure arm) | Assign to the Opportunity owner. Subject: "Schedule extraction failed for [#…SPAITenderCode#] — review the attachment". Then **End** |
| 10 | **End** | |

The insert script is idempotent: it skips line numbers already present, so a re-run cannot double-insert. It also preserves the item ref and ALT identity, and keeps unmatched room or tier text in the notes rather than dropping it.

✅ **Verify after building**
- [ ] Trace shows exactly **one** AI call
- [ ] Line count equals the document's line count, and `InsertedCount + SkippedCount` equals it too
- [ ] Spot-check three lines against the workbook: quantity is Total Qty, cut-outs are millimetres, a typo model code is intact
- [ ] Status is **Matching**, `SPAIAiCallCount` is 1
- [ ] Re-run the process on the same Opportunity: `InsertedCount` is 0 and no duplicate lines appear
- [ ] Then run Test Gate 1 in `02a` §9

---

## 5. BP3 `SPAIAdjudication`

**Caption:** Meridian: adjudication · **Trigger:** record signal · **Background:** on
**Purpose:** one AI call for every unresolved line of the tender, then validate everything it returned.

### Parameters
| Name | Type | Direction | Notes |
|---|---|---|---|
| `OpportunityId` | Unique identifier | Variable | |
| `UnresolvedLinesJson`, `CandidateProductsJson`, `SubstitutionRulesJson`, `PolicyContextJson`, `CandidateProductCodesJson`, `NetworkStockJson`, `AdjudicatorRequestJson`, `VerdictsJson` | Unlimited text | Variable | |
| `PendingLineCount`, `ResolvedCount`, `EscalatedCount`, `OverrideCount` | Integer | Variable | |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `Opportunity`, **Record modified**, filter `SPAIAdjudicationStatus = Adjudicating`. Background on |
| 2 | **Script task** "Build candidate set" | Paste `bp-scripts/BP3_BuildCandidateSet.cs`. In: `OpportunityId`. Out: `UnresolvedLinesJson`, `CandidateProductsJson`, `SubstitutionRulesJson`, `PolicyContextJson`, `CandidateProductCodesJson`, `PendingLineCount` |
| 3 | **Exclusive gateway** | `PendingLineCount = 0` → element 7 (label "Nothing to adjudicate"). Otherwise → element 4. **No AI call is made on an empty set** |
| 4 | **Script task** "Build network stock" | Paste `bp-scripts/BP3_BuildNetworkStock.cs`. In: `CandidateProductCodesJson` plus the four JSON parameters. Out: `NetworkStockJson`, `AdjudicatorRequestJson` |
| 5 | **AI invocation element** | Agent **The Adjudicator**, skill **Adjudicator**. **If the element takes typed inputs:** map the five inputs from 02a §4.3. **If it takes one message:** send `AdjudicatorRequestJson`. Out: `VerdictsJson`. **Exactly one invocation. No loop, no multi-instance** |
| 6 | **Script task** "Apply verdicts" | Paste `bp-scripts/BP3_ApplyVerdicts.cs`. In: `OpportunityId`, `VerdictsJson`, `CandidateProductCodesJson`, `UnresolvedLinesJson`. Out: `ResolvedCount`, `EscalatedCount`, `OverrideCount` |
| 7 | **Modify data** | Object `Opportunity`: `SPAIAiCallCount` = 2, `SPAISubstitutionCount` = `ResolvedCount`, `SPAIEscalationCount` = `EscalatedCount`, `SPAIAdjudicationStatus` = **Awaiting Gate 1** |
| 8 | **Sub-process** | BP4 `SPAIIndicativeDeliveryPlan`. Map `OpportunityId` |
| 9 | **End** | |

Element 6 is the enforcement step, and 02 §4 calls its two validations "not optional": the returned product code must be in the set that was sent **and** resolve to a real `Product`, and the compliance floor is re-checked from the database. A failure forces `NO_EQUIVALENT` or `COMPLIANCE_FAIL`, clears the product, and writes a second ledger row of type `Compliance rejection`. It also sets each line's human-review flag to the stricter of the model's flag and the reason code's own.

✅ **Verify after building**
- [ ] Trace shows exactly **one** AI call for the whole tender, and `SPAIAiCallCount` is 2
- [ ] The candidate array in the trace holds **60 or fewer** products, and every one carries `eligibleLines`
- [ ] `networkStock` in the trace has no row with both `qtyAvailable` and `nextInboundQty` at 0
- [ ] Every verdict produced a ledger row; each override produced two
- [ ] `SPAIComplianceChecks` on a ledger row reads as a list of PASS/FAIL checks, including the requiresHuman line
- [ ] No line has a `SPAIMatchedProduct` that was absent from the candidate set
- [ ] Then run Test Gate 2 in `02a` §10, and read §10 of this sheet first

---

## 6. BP5 `SPAIGate1Approval`

**Caption:** Meridian: Gate 1 estimator review · **Trigger:** record signal · **Background:** **off** (a person is waiting)
**Purpose:** the first hard human gate. 02b rules 2 and 4 depend on this process existing.

### Parameters
| Name | Type | Direction |
|---|---|---|
| `OpportunityId` | Unique identifier | Variable |
| `TotalSell` | Currency | Variable |
| `Gate1Result` | Text | Variable |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `Opportunity`, **Record modified**, filter `SPAIAdjudicationStatus = Awaiting Gate 1`. Background on for the trigger only |
| 2 | **Read data** | Object `Opportunity`, first record. Columns `Owner`, `SPAITotalSell`, `SPAITenderCode` |
| 3 | **Perform task** | Subject "Gate 1: review every adjudicated line on [#…SPAITenderCode#]". Performer: the Opportunity **Owner**. Connected to the Opportunity. **Background off.** The process stops here until a person acts, which is what makes this control hard |
| 4 | **Exclusive gateway** | Branch on the task's **result** (a result selection, not a formula): *Done* → element 5; *Cancelled* → element 9 |
| 5 | **Script task or Modify data** "Recalculate totals" | Sum `SPAILineTotal` over the tender's lines into `SPAITotalSell`, and `SPAIGrossMarginPct` from cost and sell. A Read data in aggregation mode plus a Formula also does this |
| 6 | **Add data** | Object `SPAIDecisionLedger`. `SPAIActor` = current user's name, `SPAIDecisionType` = **Human override**, `SPAIOpportunity` = `OpportunityId`, `SPAIOccurredOn` = current date/time, `SPAIPriorValue` = "Awaiting Gate 1", `SPAINewValue` = "Gate 1 approved", `SPAIComplianceChecks` = "Estimator reviewed every adjudicated line" |
| 7 | **Modify data** | Object `Opportunity`: `SPAIGate1ApprovedOn` = current date/time and `SPAIGate1ApprovedBy` = current user (both exist, D4 closed), `SPAIAdjudicationStatus` = **Awaiting Gate 2** if `SPAITotalSell` is above the threshold, otherwise **Submitted** |
| 8 | **Exclusive gateway** | `SPAITotalSell >= ` threshold (§11 D2) → Gate 2 arm, label "Above threshold"; default → "Below threshold" |
| 9 | **End** | |

**What Gate 1 must show the estimator.** 02b rule 16 is mitigated here: the review list shows the justification **and** the margin side by side, so a margin-driven proposal is visible to a human. Use the Adjudication tab list from 01 §8, filtered to `SPAILineStatus` in (Substitution proposed, Escalated, No match).

✅ **Verify after building**
- [ ] The process **halts** at element 3. Confirm the Opportunity sits at Awaiting Gate 1 with an open task
- [ ] Cancelling the task does not advance the status
- [ ] Approving writes exactly one `Human override` ledger row
- [ ] Above-threshold tenders land on Awaiting Gate 2; below-threshold land on Submitted
- [ ] A line flagged Escalated appears in the Gate 1 list. **This is the proof for 02b rule 4**

---

## 7. BP6 `SPAIGate2SignOff`

**Caption:** Meridian: Gate 2 commercial sign-off · **Trigger:** record signal · **Background:** off
**Purpose:** the second hard gate, and the only place a customer-facing document is produced (02b rule 1).

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `Opportunity`, **Record modified**, filter `SPAIAdjudicationStatus = Awaiting Gate 2` |
| 2 | **Read data** | Object `Opportunity`. Columns `SPAITotalSell`, `SPAIGrossMarginPct`, `SPAITenderCode`, and the Gate 2 approver contact (01 §9 and the `SPAIOppContactRole` value **Gate 2 approver**) |
| 3 | **Perform task** | Subject "Gate 2: commercial sign-off for [#…SPAITenderCode#] at [#…SPAITotalSell#]". Performer: the Gate 2 approver, or the Commercial Manager role. Background off |
| 4 | **Exclusive gateway** | On the task result: *Done* → element 5; *Cancelled* → element 8 |
| 5 | **Preconfigured page or a printable** | Generate the MS Word printable **Commercial Tender Submission** (01 §9). This is the external representation, so it exists only on this arm |
| 6 | **Add data** | `SPAIDecisionLedger`: `SPAIDecisionType` = **Human override**, `SPAIActor` = current user, `SPAINewValue` = "Gate 2 signed off, submission issued" |
| 7 | **Modify data** | Object `Opportunity`: `SPAIAdjudicationStatus` = **Submitted**, `SPAIGate2ApprovedOn` = current date/time, `SPAIGate2ApprovedBy` = current user |
| 8 | **End** | |

✅ **Verify after building**
- [ ] The printable generates on the approved arm only
- [ ] A cancelled sign-off leaves the status at Awaiting Gate 2
- [ ] One `Human override` ledger row per sign-off
- [ ] **No process before this one produces a customer-facing document.** That statement is 02b rule 1, and this is where you prove it

---

## 8. BP7 `SPAIConstraintChange`

**Caption:** Meridian: constraint change re-adjudication · **Trigger:** record signal · **Background:** on
**Purpose:** the live-system beat. A location going unavailable re-sources and, only if needed, re-adjudicates the affected lines (02 §5).

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Signal start** | Object `SPAILocation`, **Record modified**, filter on `SPAIIsAvailable`, `SPAIAcceptingFrom` or `SPAIAcceptingUntil` changing. Background on |
| 2 | **Read data** | Object `SPAILineSource`, **collection**, filter: `SPAILocation = ` the changed location **and** `SPAIScheduleLine.SPAIOpportunity.SPAIAdjudicationStatus != Submitted` |
| 3 | **Script task** "Reset affected lines" | For each row: delete or zero the `SPAILineSource`, set the line's status to **Pending**, and write a ledger row of type **Re-adjudication** with the prior and new values. Write this one in the designer following the pattern in `BP2b_SourcingCascade.cs` |
| 4 | **Modify data** | Object `Opportunity` (those affected): `SPAIAdjudicationStatus` = **Re-adjudicating** |
| 5 | **Sub-process** | BP2b `SPAISourcingCascade` on the affected Opportunity. Many lines re-source from another location with **no AI call at all** |
| 6 | **Exclusive gateway** | `ShortfallCount > 0` → element 7 (label "Still short"); default → element 8 |
| 7 | **Modify data** | `SPAIAdjudicationStatus` = **Adjudicating**, which re-fires BP3 on the subset. Third AI call, on a subset only |
| 8 | **End** | |

**What it proves:** incremental re-adjudication rather than a full re-run. **Rehearse the exact change and record it** (02 §5). Do not do it live and unscripted on camera.

✅ **Verify after building**
- [ ] Turning one location off touches only the lines sourced from it
- [ ] Lines that re-source elsewhere consume **zero** AI calls
- [ ] `SPAIAiCallCount` goes to 3 only when a shortfall remains
- [ ] Each reset line has a `Re-adjudication` ledger row carrying prior and new values

---

## 9. BP8 `SPAIAwardFulfilment`

**Caption:** Meridian: award fulfilment · **Trigger:** none, run manually from the Opportunity · **Background:** on
**Purpose:** the award half of the split. Everything 04 Change 4 forbids before award happens here, and only here.

### Parameters
| Name | Type | Direction | Notes |
|---|---|---|---|
| `OpportunityId` | Unique identifier | **In** | |
| `BlanketOrderId` | Unique identifier | Variable | created in element 2 |
| `PrototypeQty` | Integer | **In** | default 1 (§11 D3) |
| `CommittedCount`, `CallUpLineCount`, `SubPoCount` | Integer | Out | |

### Elements
| # | Element | Configuration |
|---|---|---|
| 1 | **Simple start** | Run it from a `Run business process` button on the Opportunity, shown only when status is **Submitted** |
| 2 | **Add data** | Object `Order`: the **blanket** PO. `SPAIOrderType` = **Blanket**, `SPAIPurchaseOrderNo` = the builder's blanket ref, Account = the head contractor. Map its Id into `BlanketOrderId` |
| 3 | **Modify data** | Object `SPAICallUpSchedule`, filter `SPAIOpportunity = OpportunityId`: set `SPAIBlanketOrder` = `BlanketOrderId`. The programme was loaded with no PO (04a A1); award is when it gets one |
| 4 | **Script task** "Commit sources and raise the call-up" | Paste `bp-scripts/BP8_AwardFulfilment.cs`. In: `OpportunityId`, `BlanketOrderId`, `PrototypeQty` |
| 5 | **Add data** | `SPAIDecisionLedger`: `SPAIDecisionType` = **Human override**, `SPAIActor` = current user, `SPAINewValue` = "Tender awarded, fulfilment raised" |
| 6 | **End** | |

The script converts every `SPAILineSource` to **Committed**, increments `SPAIQtyAllocated` and decrements `SPAIQtyAvailable` on the matching stock positions, creates one `SPAICallUpLine` per (line, delivery event), raises **one sub-PO per delivery event** (04a A3), and writes an `OrderProduct` per sub-PO line carrying the item ref and ALT identity so `SPAIDisplayRef` derives on save.

**Sub-PO refs are blanket-scoped**, the shape Kelmore already uses: blanket `BPO-0438` gives `SPO-0438-01` through `SPO-0438-25`. The blanket ref therefore decides Corvina's sub-PO refs, so set `SPAIPurchaseOrderNo` on the blanket order in element 2 (for example `BPO-0441`) before the script runs. Without one the script refuses, rather than falling back to a global sequence that would interleave the two projects in one number space.

✅ **Verify after building**
- [ ] Before running: every `SPAILineSource` is Indicative and `SPAIQtyAllocated` is untouched. After: every row is Committed and the allocations moved
- [ ] `SubPoCount` equals the number of delivery events for the tender, one to one (04a A3 and its verification query 3), and the refs read `SPO-<blanket digits>-01` upward
- [ ] For each line, the sum of `SPAICallUpLine.SPAIQtyRequired` equals `SPAIQuantity` (04a A6 query 5)
- [ ] Each ALT line's `OrderProduct` shows a display ref such as `OVN-01 ALT RH`
- [ ] Corvina before award still answers **0** to 04a queries 1 and 2

---

## 10. Test gate reconciliation: what the live data can and cannot produce

Verified live on 2026-09-25, against the hero tender in the instance:

| Fact | Number |
|---|---|
| Substitution rules loaded | **45**, of which **33 pass the compliance floor** and 12 are deliberately stale. This is the corrected register, as you said |
| Hero lines expecting a substitution | 10 |
| Of those, superseded-by target passes the floor | **2** (lines 021 and 023) |
| Target fails because it is not project approved | 4 (lines 008, 018, 025, 028) |
| Target fails on cut-out | 4 (lines 010, 011, 040, 042) |
| Lines with **no** compliant product anywhere in the catalogue for the specified cut-out | **6** (010, 011, 018, 025, 028, 040) |

I checked every Current, project-approved rangehood, dishwasher and cooktop live. On those six lines the specified cut-out exists on no eligible product, so `DIM_MISMATCH` is the only correct answer and the answer key's expected `*_SUB` cannot be reached by correct behaviour.

**What this means for Test Gate 2 in `02a` §10.** The gate table is reproduced from 02 and stays unchanged. Before you run it, record which rows the data cannot satisfy, the same way §9 records the `04DW9001X` reconciliation. Two options, and it is your call:

1. **Accept and reconcile (recommended).** Score those six lines as correct when they return `DIM_MISMATCH`. This is a stronger story, not a weaker one: six lines had no compliant equivalent at all and the agent escalated every one rather than fudge a fit. Escalation being a correct answer is the entry's thesis.
2. **Repair the master data.** Approve the four unapproved targets and align the cut-outs on the rest. Four are one-field changes; the cut-out ones mean editing dimensions on products the DIM_TRAP lines depend on, so it risks the trap itself. Late and riskier.

Either way, **do not change the compliance floor to make the gate pass.** That is the one thing the whole entry claims it never does.

---

## 11. Open decisions (settle before the process that needs them)

| # | Decision | Needed by | Recommendation |
|---|---|---|---|
| D1 | **Where does the project's state come from?** `Opportunity` has no state column (verified: `SPAIProjectName`, `SPAITenderCode`, counters, no state). Without it, tier 1 "home DC" cannot be identified and every DC is tier 2 | BP2b | Add `SPAIProjectState` (Text 10) to `Opportunity` and set it on the hero tender to `VIC`. The alternative, reading the head contractor's account address, is indirect and often blank |
| D2 | **The Gate 2 value threshold** | BP5 element 8, BP6 | A system setting `SPAIGate2ThresholdAud` read by the gateway, so it can be shown and changed without editing a process. Pick a value that puts the hero tender above it, so the demo runs both gates |
| D3 | **How is a line's quantity split across delivery events?** The programme gives dates, not per-level quantities | BP8 | Even spread across non-prototype events with the remainder on the last, and `PrototypeQty = 1` per prototype event. That is what the script does today. If the real sheet apportions by dwellings per level, replace the split block |
| D4 | ~~Do the Gate 1 and Gate 2 date columns exist?~~ **Closed 2026-09-25:** `SPAIGate1ApprovedOn`, `SPAIGate2ApprovedOn`, `SPAIGate1ApprovedBy` and `SPAIGate2ApprovedBy` all exist on `Opportunity`, verified in the parallel session. BP5 and BP6 are not blocked | — | Write the ApprovedBy columns alongside the dates |

---

## 12. Definition of done

- [ ] Nine processes exist in `SPAIAdjudicator`, each with tracing on
- [ ] Package compiles clean after every Script task is pasted
- [ ] The no-AI chain (BP2a → BP2b → BP4) runs end to end on seeded lines with **zero** AI calls
- [ ] BP1 and BP3 each make exactly one AI call, and `SPAIAiCallCount` reaches 2 per tender
- [ ] BP5 halts until a human acts; BP6 is the only process that generates a customer-facing document
- [ ] Pre-award: every source row is Indicative and no stock is encumbered. Post-BP8: every row is Committed and the call-up exists
- [ ] Every decision writes a ledger row, and the ledger still refuses an edit as Supervisor
- [ ] Test Gate 1 and Test Gate 2 run from `02a`, with §10's reconciliation recorded
- [ ] `clio pull-pkg SPAIAdjudicator -e meridian --dest ./backup`, then commit
