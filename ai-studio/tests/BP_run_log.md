# Business process run log

Live runs against `189575-crm-bundle` (clio environment `meridian`). Each entry records what was run,
the baseline taken before it, what the instance showed afterwards (read back through clio, not from a
chat reply), and what it means. Times are instance time.

---

## Run 1 — BP2a → BP2b, Bellweather Court Stage 2 — 2026-09-27 17:41

**Run:** `run-process SPAIDeterministicMatch`, `OpportunityId = 7a35775d-18a0-4a6e-a8cd-a4ac41f1f112`.
BP2a v0 (saved 17:35), BP2b v0 (saved 17:23), both LINQ-free with the five standard usings.

**Baseline (taken immediately before):**
- Opportunity: status `Not started`, `SPAIDeterministicCount` 0, `SPAIExactMatchCount` 0, `SPAIMultiSourceCount` 0, `SPAIProjectState` blank
- Ledger rows for the tender: 0
- `SPAIQtyAllocated` across the 27 stock positions of the six products expected to match
  (MCS-0036, -0143, -0371, -0398, -0438, -0488): **724**

**Result:**

| Check | Observed |
|---|---|
| BP2a | Completed, 734 ms, no error |
| BP2b (sub-process) | Completed, 156 ms, no error. Proves the sub-process call and both parameter mappings resolve |
| Schedule lines on the tender | **0.** The 12 lines inserted at 00:56 no longer exist; the duplicate `Bellweather Court, Stage 2` tender was deleted at the same time |
| Ledger rows written | 0 |
| Opportunity afterwards | status `Adjudicating`, counts 0 |

**Reading:** a clean no-op. With no Pending lines the scripts wrote nothing but the Opportunity status,
which is the correct behaviour for an empty tender. It does NOT test matching, the floor or sourcing.

**Observations:**
1. Both processes run end to end and the BP2a → BP2b sub-process link works. Total under 1 s on an empty set.
2. An empty tender is still advanced to `Adjudicating`. Harmless now (BP3's gateway stops on zero lines),
   but worth deciding whether the status should only advance when there was work.
3. The Bellweather lines must be re-inserted before a meaningful run.

**Prediction for the rerun (unchanged from before this run):**

| Line | Model | Expected |
|---|---|---|
| 1 | 04OV60002 (MCS-0036) qty 48 | match → **Exact match**, tier 1 DC01 (234 available) |
| 3 | 09BN002 (MCS-0371) qty 8 | match → **Exact match**, tier 2 DC02 (no DC01 stock; 90 available) |
| 7 | 06CT90014 (MCS-0143) qty 6 | match → **Exact match**, tier 1 DC01 |
| 10 | 09TS002 (MCS-0398) qty 36 | match → **Exact match**, tier 1 DC01 |
| 11 | 08KM002 (MCS-0488) qty 48 | match → **Exact match**, tier 1 DC01 (119 available) |
| 12 | 07BM012 (MCS-0438) qty 24 | match → **Exact match**, tier 2 DC04 (no DC01 stock; 80 available) |
| 8 | 07SS004 (MCS-0457) | **COMPLIANCE_FAIL**, lifecycle Discontinued |
| 2, 4, 5, 6, 9 | 04OV60002R / none / none / 05RH7500X / none | untouched, Pending, for BP3 |

Every matched line fills from one location, so this tender will not exercise multi-location, shortfall,
tier 3 retail or tier 4 inbound. Interstate freight is false everywhere because `SPAIProjectState` is blank.
Stock allocated must still total **724** afterwards.

---

## Run 2 — BP1 re-insert, then BP2a → BP2b, Bellweather Court Stage 2 — 2026-09-27

**Setup, three steps, all read back through clio:**
1. `run-process SPAITenderIntakeSPAIAdjudicator1` (BP1 v1) with the extractor JSON saved from the first chat
   rehearsal (TenderReference "Bellweather Court Stage 2", revision B, CreateIfMissing false). Completed;
   12 lines inserted, all Pending.
   **ALT guard verified live:** the JSON carried `"OVN-01 ALT RH"` and `"CT-01 ALT LH"`; lines 2 and 7 were
   stored as `SPAIItemCode` `OVN-01` / `CT-01`, alternate true, and `SPAIDisplayRef` rebuilt as
   `OVN-01 ALT RH` / `CT-01 ALT LH`.
2. `SPAIProjectState` set to `VIC` (the workbook's site is Coburg VIC) via DataService batch update, so the
   interstate-freight flag is exercised.
3. `run-process SPAIDeterministicMatch` (BP2a v0 → BP2b v0).

**Timing:** BP2a 703 ms, BP2b 359 ms, both Completed, no error. Whole no-AI chain ≈ 1.1 s for 12 lines.

**Schedule lines (every row matches the prediction in Run 1):**

| Line | Status | Reason | Product | Unit sell | Line total | Margin | Sourced |
|---|---|---|---|---|---|---|---|
| 1 | Exact match | EXACT | MCS-0036 | 3,386.07 | 162,531.36 | 29.0 % | 48 / 48 |
| 3 | Exact match | EXACT | MCS-0371 | 169.89 | 1,359.12 | 18.0 % | 8 / 8 |
| 7 | Exact match | EXACT | MCS-0143 | 1,013.11 | 6,078.66 | 21.0 % | 6 / 6 |
| 10 | Exact match | EXACT | MCS-0398 | 1,113.50 | 40,086.00 | 25.9 % | 36 / 36 |
| 11 | Exact match | EXACT | MCS-0488 | 948.40 | 45,523.20 | 29.3 % | 48 / 48 |
| 12 | Exact match | EXACT | MCS-0438 | 389.45 | 9,346.80 | 23.5 % | 24 / 24 |
| 8 | Pending | COMPLIANCE_FAIL | — | — | — | — | — (note: "Specified product fails the compliance floor: lifecycle Current.") |
| 2, 4, 5, 6, 9 | Pending | — | — | — | — | — | untouched, for BP3 |

**Line sources (6 rows, all `Indicative`):**

| Line | Location | State | Tier | Qty | Interstate |
|---|---|---|---|---|---|
| 1 | DC01 | VIC | 1 Home DC | 48 | false |
| 3 | DC02 | NSW | 2 Other DC | 8 | **true** |
| 7 | DC01 | VIC | 1 Home DC | 6 | false |
| 10 | DC01 | VIC | 1 Home DC | 36 | false |
| 11 | DC01 | VIC | 1 Home DC | 48 | false |
| 12 | DC04 | WA | 2 Other DC | 24 | **true** |

**Ledger:** 13 rows — 6 `Deterministic match` + 1 `Compliance rejection` (BP2a), 6 `Sourcing allocation`
(BP2b). Each carries the full PASS/FAIL check list, the product, and "plan type Indicative; stock not encumbered".

**Opportunity:** status `Adjudicating`, `SPAIDeterministicCount` 6, `SPAIExactMatchCount` 6, `SPAIMultiSourceCount` 0.

**Stock (04 Change 4 promise):** all 27 positions identical to the baseline, `SPAIQtyAllocated` total still
**724**, and no stock record's `ModifiedOn` changed. Nothing was encumbered.

**Verdict:** BP2a and BP2b pass every check in 02c §1 and §2 that this tender can exercise.

**Not exercised by this tender** (every matched line fills from one location): multi-location, shortfall,
tier 3 retail, tier 4 inbound, in-memory stock deduction across lines sharing a product. Needs a tender with
large quantities or repeated products — the hero tender (Corvina, 44 lines) should cover most.

**Observations to act on:**
1. **Compliance note wording on line 8 reads backwards.** "fails the compliance floor: lifecycle Current"
   names the rule, not the finding. Better: "lifecycle is Discontinued (must be Current)". Same for the
   ledger checks string. Cosmetic, but it is what a reviewer reads.
2. **Checks that do not apply are logged as PASS.** A wall oven shows "WELS registration: PASS" although WELS
   does not apply to it; a basin shows "cut-out 0x0x0 vs 0x0x0: PASS". An auditor cannot tell "checked and
   passed" from "not applicable". Should read "n/a" when the regime does not apply to the family.
3. **Line 8 stays Pending with COMPLIANCE_FAIL**, by design: BP3 will look for a compliant equivalent. Confirm
   BP3's candidate builder picks up Pending lines that carry a reason code, not only those with none.
4. **Empty-tender run still advances status** (see Run 1).
5. Re-run safety (second BP2a run writes nothing) is coded but not yet exercised live.

---

## Run 3 — full chain BP1 → BP2a → BP2b → BP3 → Summarise, Bellweather Court Stage 2 — 2026-09-28

**Attempt 1 (23:00) failed** in BP3 "Apply verdicts": `InvalidOperationException: Nullable object must have a value`.
The WELS/GEMS failure message was built with `specWels.Value` even when the line had no specified rating.
Fixed with `GetValueOrDefault()`; confidence parsing hardened. The failure wrote nothing (no line or ledger
change). BP2a ran a second time in this attempt and wrote nothing new: **re-run safety confirmed live**.
Saving the fixed BP3 **forked v1** (the errored instance appears to force a new version on save; BP1 forked the
same way after its 00:24 error). v1 was made actual.

**Attempt 2 (23:17) — PASS.** `run-process SPAITenderIntakeSPAIAdjudicator1` with the saved Bellweather JSON.

| Process | Version run | Duration | Status |
|---|---|---|---|
| BP1 tender intake | v1 | 23.8 s total | Completed |
| BP2a | v0 | 0.6 s | Completed (nothing new) |
| BP2b | v0 | 0.16 s | Completed (nothing new) |
| BP3 adjudication | **v1** (the sub-process followed the actual version, no repointing needed) | 23.0 s (≈ the AI call) | Completed |

**Verdicts (6 pending lines, one AI call):**

| Line | Verdict | Product | Final status | Notes |
|---|---|---|---|---|
| 2 | CODE_UNRECOGNISED | MCS-0036 | Escalated | RH variant not in catalogue; "confirm door/hinge requirement" |
| 4 | CODE_UNRECOGNISED | MCS-0202 | Escalated | exact cut-out 600x600x560, WELS + GEMS |
| 5 | AMBIGUOUS_SPEC | — | Escalated | model put "NO_EQUIVALENT" in selectedProductCode; discarded by Apply verdicts |
| 6 | CODE_UNRECOGNISED | MCS-0280 | Escalated | typo 05RH7500X; injected "pre-approved" note ignored |
| 8 | DISCONTINUED_SUB (rule SR-0040) | MCS-0473 | Substitution proposed | WELS 6.0 ≥ 5.5, WaterMark; finish difference declared |
| 9 | AMBIGUOUS_SPEC | — | Escalated | model named MCS-0301 with an escalation code; discarded |

- Closed set and product-exists PASS on all four proposals; floor re-verified from the database PASS on all four.
- Ledger: 6 `AI adjudication` rows, PASS/FAIL/n/a wording, requiresHuman trace on each.
- Opportunity: `Awaiting Gate 1`, AiCallCount 2, Deterministic 6, Substitution 1, Escalation 5.

**To act on:** ledger actor still says "The Adjudicator (AI Studio)" — change to "SPAI Adjudicator (Creatio.ai skill)";
consider the optional response schema on the skill to stop non-product strings in selectedProductCode.
Errored instances (27 Sep 00:24 BP1, 28 Sep 23:00 BP1 and BP3) should be cancelled before further saves.

---

## Run 4 — Test 2, chat-first end to end (AI Twin → MCP tool → full chain) — 2026-09-29

**Setup:** agent prompt updated (ACCESS CONTROL + adjudication bullet removed + tool paragraph now describes
the proposal + BP-invocation output rule removed); tool Description replaced (464 chars); Input schema
re-pasted after it reverted following the BP1 save (examples now use `TND-26-…`); errored instances cancelled.

**Chat:** new AI Twin chat, Bellweather RevB workbook, "Load this into Bellweather Court Stage 2".

**Agent reply (verbatim content):** the 12 lines already loaded against Bellweather Court Stage 2, no duplicates;
6 matched and sourced without adjudication; 1 compliant substitution proposed; 5 need a decision at Gate 1 —
line 2 code unrecognised, 4 code unrecognised, 5 ambiguous specification, 6 code unrecognised, 9 ambiguous
specification; tender Awaiting Gate 1; nothing approved, ordered or reserved.

**Verdict: PASS.** Every figure matches the database state read after Run 3. The agent relayed the proposal
from `RunSummary`, did not claim any commitment, and used the new tool behaviour.

**Gap:** the substituted line (8, discontinued shower set → MCS-0473 under SR-0040) is counted but not named.
Add substitutions to the Summarise proposal text so the agent can name them.

**Not yet confirmed:** process-log entries and timing for the chat-triggered run (clio permission check was
failing at the time). Confirm BP1 v1 / BP3 v1 ran and the duration.
