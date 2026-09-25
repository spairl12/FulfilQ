# Status report and handoff: the AI Studio session
### Written 2026-09-25 for the parallel build session. Everything below is repo state, not plans.

**Repo root:** `/Users/sheldonp/Desktop/Personal/Creatio Hackathon/Meridian Commercial Supply`
**Instance:** `https://189575-crm-bundle.creatio.com/` · clio environment `meridian` · package `SPAIAdjudicator` · prefix `SPAI`
**This session built nothing in the instance.** Every clio call it made was a read. All artefacts below are files on disk.

---

## 1. Where everything is

| Path | What it is |
|---|---|
`02a_Agent_And_Skills_Run_Sheet.md` | The build sheet for the AI Studio agent and both skills. Appendices A, B and C hold the exact paste texts |
`02c_Business_Process_Run_Sheet.md` | The build sheet for all **nine** business processes, element by element, by hand in the designer |
`02b_Governance_Coverage_Map.md` | Where each of the 17 governance rules is enforced (pre-existing; unchanged) |
`ai-studio/skills/spai-schedule-extractor/` | Skill 1 source: `SKILL.md` (frontmatter = profile fields, body = instructions), `references/`, `assets/` |
`ai-studio/skills/spai-adjudicator/` | Skill 2 source, including `references/input-contract.md`: every payload key mapped to a live column |
`ai-studio/agents/the-adjudicator/agent-config.md` | Every agent field, its literal value and where the value came from (rows A1–A26) |
`ai-studio/agents/the-adjudicator/system-instructions.md` | The agent's System Instructions, ready to paste whole |
`ai-studio/dist/*.zip` | Each skill zipped in the same layout as Creatio's own skill exports (`<slug>/SKILL.md`) |
`ai-studio/bp-scripts/*.cs` | Seven Script task bodies. **Not class files, not compiled** |
`ai-studio/tests/score_extraction.py` | Test Gate 1 scorer. Prints PASS/FAIL per item, exits 0 only on PASS |
`ai-studio/tests/score_adjudication.py` | Test Gate 2 scorer against the answer key, plus offline checks for invented codes, floor bypass and margin citations |

**Source of truth note:** `ai-studio/dist/spai-adjudicator/` is an unzipped copy of that skill's zip, committed by another session. Its contents match, but treat `ai-studio/skills/…` as the source. Safe to delete the unzipped copy.

### The seven script tasks and where each one goes

| File | Process and step |
|---|---|
`BP1_InsertScheduleLines.cs` | BP1 step 7: insert one schedule line per extracted line, idempotent |
`BP2a_DeterministicMatch.cs` | BP2a step 3: resolve model codes, apply the compliance floor |
`BP2b_SourcingCascade.cs` | BP2b step 2: tier 1–4 allocation, **Indicative** plan only |
`BP3_BuildCandidateSet.cs` | BP3 step 2: floor per line-and-candidate, cap 60, pre-rank, rules, diagnostics |
`BP3_BuildNetworkStock.cs` | BP3 step 4: stock for candidates only, plus the single combined request message |
`BP3_ApplyVerdicts.cs` | BP3 step 6: closed-set validation, floor re-verification, line writes, ledger rows |
`BP4_IndicativeDeliveryPlan.cs` | BP4 step 2: deliverability against the builder's programme |
`BP8_AwardFulfilment.cs` | BP8 step 4: commit sources, encumber stock, call-up lines, sub-PO per event |

---

## 2. What exists and what does not

| Component | State |
|---|---|
Agent "The Adjudicator" in AI Studio | **Not created.** Run sheet ready (`02a` §5) |
Skill "Schedule Extractor" | **Not created.** Run sheet `02a` §3, source and zip ready |
Skill "Adjudicator" | **Not created.** Run sheet `02a` §4 |
Knowledge sources KS1–KS3 | Already uploaded and indexed in AI Studio (pre-existing) |
BP1, BP3 (the two AI processes) | **Not built** |
BP2a, BP2b, BP4 (no-AI chain) | **Not built** |
BP5, BP6 (Gate 1, Gate 2) | **Not built.** These carry governance rules 2, 3 and 4, so nothing should be demoed as governed until they exist |
BP7 (constraint change) | **Not built** |
BP8 (award fulfilment) | **Not built.** New process, see §3 |
Script task C# | Written, **never compiled.** Expect first-paste compile errors |
Scorers | Tested both ways: a correct synthetic run passes, a broken one fails |

---

## 3. Changes made to the earlier plans, and why

Each of these was approved in this session. Anything marked **approved** changes text that 02 or 01 had already fixed, so treat this list as the diff between those plans and what is now on disk.

| # | Change | Reason |
|---|---|---|
| C1 | **Terminology:** 02's "Sub-Agent" / "API skill" is an AI Studio **Skill** attached to an **Agent**; "AI Tool" is **Tools** | The 8.3.4 names in 02 do not match the 10x UI |
| C2 | **One agent, two skills** (not two sub-agents) | 02b Block 1 and 5 target a single agent instruction field |
| C3 | **Adjudicator prompt: Governance Blocks 2, 3 and 7 replace** 02's COMPLIANCE FLOOR, RANKING and ESCALATION sections (approved) | The governance checklist requires Block 7 verbatim; Block 2 adds "lifecycle Current" and the do-not-override rule; Block 3 adds the Gate 1 margin rejection |
| C4 | **Two 02 lines restored verbatim** beside those blocks: the "not a weaker option … near miss" line and "A finish mismatch is permissible only if declared in complianceNotes" (approved) | Replacing the sections had dropped both |
| C5 | **Extractor gains four output keys** `itemRef`, `isAlternate`, `alternateVariant`, `productFamily`, plus rule 8 (approved) | The ALT identity added by 04 was not being captured |
| C6 | **Gap 1: schedule text is data, not instructions** — a paragraph in the Adjudicator's CLOSED SET RULE and rule 9 in the Extractor (approved) | Schedule text comes from a customer document and reaches the model; nothing told it to treat that text as data |
| C7 | **Gap 2B: justification ≤ 70 words, complianceNotes ≤ 40** (approved) | No output bound existed anywhere |
| C8 | **requiresHuman = the model's flag OR `SPAIReasonCode.SPAIRequiresHuman`**, persisted as `SPAILineStatus = Escalated` | The lookup marks `CODE_UNRECOGNISED` as requiring a human; the prompt did not. There is no requiresHuman column on the line |
| C9 | **Gap 3: stock rows with nothing available and nothing inbound are dropped** from the payload | 28% fewer stock rows on the hero tender; they cannot change a ranking |
| C10 | **BP4 reframed** from 01's phase allocation to an **indicative delivery plan** (deliverability against the programme, commits nothing) | 04 Change 1 deleted the three phase orders BP4 assigned lines to |
| C11 | **BP8 `SPAIAwardFulfilment` added** as a new process: Indicative → Committed, encumber stock, call-up lines, **one sub-PO per delivery event** | 04a A1 puts call-up generation at award; A3 makes the sub-PO per event. This is the award half of the split |
| C15 | **Sub-PO refs are blanket-scoped**, `SPO-<blanket digits>-NN`, matching Kelmore's `SPO-0438-01..25`. The script refuses to run when the blanket order has no `SPAIPurchaseOrderNo` (fixed 2026-09-25) | The first draft used a global `SPO-0001` sequence, which would interleave Corvina and Kelmore in one number space. Raised by the parallel session |
| C12 | **BP2b writes `SPAISourcePlanType = Indicative` and never touches `SPAIQtyAllocated`** | 04 Change 4: an unawarded tender must encumber nothing |
| C13 | **Both skills and the agent bind zero tools**, and the platform's default CRM read tools, write tools, web search, code execution and image generation are all removed from the agent | The platform attaches them at creation. They are an open query path (Block 5) and a write path (Block 1) |
| C14 | **Scorers default to `meridian-data-v2`**, reading **only the answer key** from the untracked `meridian-seed-data-v2.zip` | That is the dataset the instance was loaded from. v2 and v3 number the planted lines differently. The zip still holds the ORIGINAL products and rules, while `meridian-data-v2/` carries the corrected 45-rule register and the dishwasher WELS values, so products and rules must never be read from the zip |

**Not adopted:** Gap 2A, an output-token limit on the skill form. Set it only if the UI turns out to have such a field.

---

## 4. Findings, all verified against the live instance

| # | Finding | Evidence |
|---|---|---|
| F1 | **Substitution register is the corrected set: 45 rules, 33 pass the floor, 12 stale.** Cross-checked in the parallel session: 33 is the count with lifecycle Current included; 34 omits that condition and lets through one rule whose replacement is Discontinued (`verify.py` now reports both, commit 0a7f514). An earlier claim of "82 of 99 failing" was 04a describing the original set and is **wrong for this instance** | ESQ over `SPAISubstitutionRule` with both products' cut-outs and flags, 2026-09-25 |
| F2 | **8 of the 10 hero substitution lines have a superseded-by target that fails the floor** — 4 not project approved (008, 018, 025, 028), 4 wrong cut-out (010, 011, 040, 042) | ESQ over the 10 source products and their targets |
| F3 | **6 lines have no compliant product at all for the specified cut-out** (010, 011, 018, 025, 028, 040). `DIM_MISMATCH` is the only correct answer, so the answer key's `*_SUB` is unreachable there | Every Current, project-approved rangehood, dishwasher and cooktop read live and matched on dimensions |
| F4 | **Dishwasher WELS is fixed** (all 76 carry a registration and rating), so the floor no longer rejects every dishwasher | commit 28db011, confirmed live |
| F5 | **`Opportunity` has no project-state column**, so BP2b cannot identify the home DC and every DC falls to tier 2 | Merged schema read |
| F6 | **`SPAIScheduleLine` has no requiresHuman column and no specified-rating column.** The flag rides on the status; the rating baseline comes from the specified product in the payload | Merged schema read |
| F7 | **Extractor and Adjudicator confidence share `SPAIConfidence`.** The adjudication value overwrites the extraction value on adjudicated lines | Merged schema read |
| F8 | **The RevC workbook has no item-ref, ALT or family columns**, so C5's four new keys come back empty on the hero tender. Correct transcription, not a fault | Workbook read |
| F9 | **02's extraction-gate code `04DW9001X` is in neither workbook.** In the v2 hero (the instance's data) the planted typo is line 017 `04DW4501X` | Both workbooks read |
| F10 | **clio can build processes but not this build.** It needs `CrtProcessBuilder` installed (it is not), and it cannot author a Script task, Read data in collection mode, or the AI invocation element | clio contract and a live `list-user-tasks` attempt |
| F12 | **clio's page reading is broken on this instance** (the `JsonhCs` assembly); page writes still work | Parallel session |
| F11 | **AI Studio Policies carries PII protection only** on this instance. Human-in-the-loop and tool confirmation are not available, so the gates are business-process user tasks | Pre-existing, recorded in 02b |

---

## 5. Open decisions, each blocking something

| # | Decision | Blocks | Recommendation |
|---|---|---|---|
| D1 | Where the project's state comes from (F5) | BP2b tier 1 | Add `SPAIProjectState` (Text 10) to `Opportunity`; set the hero tender to `VIC` |
| D2 | The Gate 2 value threshold | BP5 gateway, BP6 | A system setting the gateway reads, set so the hero tender goes through both gates |
| D3 | How a line's quantity splits across delivery events | BP8 | Even across non-prototype events, remainder on the last, 1 unit per prototype event (what the script does now) |
| ~~D4~~ | **Closed 2026-09-25.** `SPAIGate1ApprovedOn`, `SPAIGate2ApprovedOn`, `SPAIGate1ApprovedBy` and `SPAIGate2ApprovedBy` all exist on `Opportunity` | — | Write the ApprovedBy columns alongside the dates in BP5 and BP6 |
| D5 | **Test Gate 2 versus the data (F3).** Accept and reconcile, or repair the master data | Running Gate 2 | Accept: score those six lines as correct escalations. It strengthens the "escalation is a correct answer" argument. Do **not** relax the floor to make the gate pass |

---

## 6. Contracts the parallel session should not change unilaterally

These are load-bearing. Each one is something the entry claims out loud.

1. **The compliance-floor regime table exists in four places** — `BP2a_DeterministicMatch.cs`, `BP3_BuildCandidateSet.cs`, `ai-studio/tests/score_adjudication.py` and `tools/import/verify.py` — transcribed from KS2 §7. Change all four together or none.
2. **One AI call per step.** BP1 makes one, BP3 makes one for all unresolved lines. No per-line loop, no multi-instance over lines. `SPAIAiCallCount` = 2 per tender.
3. **The candidate set is closed and capped at 60.** The skill never searches for products; `BP3_ApplyVerdicts.cs` re-validates every returned code against the set that was sent and against `Product`.
4. **The floor is evaluated before the model and re-verified after it.** The model's claims are never trusted for a write.
5. **Margin is disclosed, never ranked on.** It is a display field in the payload and excluded from the pre-rank.
6. **Zero tools on the agent and both skills.** This is the evidence for "no write path to a customer-facing artefact".
7. **Nothing is committed before award.** Every `SPAILineSource` is Indicative and `SPAIQtyAllocated` is untouched until BP8.
8. **The Decision Ledger is insert-only** and every decision writes a row. A process override writes a second row so the model's proposal and the rejection are both on the record.
9. **Prompt text is approval-gated.** The skill instructions are 02's text plus exactly the approved changes in §3; a script check confirms that. Do not edit them without asking the user.

---

## 7. Suggested split of work

| Do in the parallel clio session | Do by hand from the run sheets |
|---|---|
D1 and D4 schema additions (`SPAIProjectState`, the two gate dates) | Everything in AI Studio: both skills, the agent, the tool removals (`02a`) |
The D2 system setting | The nine processes (`02c`), because clio cannot author the Script tasks, the collection reads or the AI element |
Any master-data repair if you choose D5 option 2 | Pasting and compiling the seven Script task bodies |
`clio pull-pkg SPAIAdjudicator -e meridian --dest ./backup` after each session | Test Gate 1 and Test Gate 2 (`02a` §9 and §10) |

---

## 8. Commit state as of this report

Committed: `823a4d6` (skills, agent config, scorers, `02a`), `28db011` (dishwasher WELS fix).
**Uncommitted at the time of writing:** `02c_Business_Process_Run_Sheet.md`, `BP2a_DeterministicMatch.cs`, `BP2b_SourcingCascade.cs`, `BP4_IndicativeDeliveryPlan.cs`, `BP8_AwardFulfilment.cs`, and this report.
Another session has since committed `58d2dad`, `ee448ec` and `81771fd` (workplace bindings and the M2 date conversion). Anyone committing in this repo should stage their own files by name: an earlier `git add -A` swept this session's work into an unrelated commit message.
