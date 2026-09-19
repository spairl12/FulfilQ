# Build Plan 2: Agent Run Sheet  ·  v2
### Done by hand in the Creatio UI. This is your task sheet.

**Prerequisite:** Build Plan 1 complete, verification gate passed.
**Sessions:** Thu 25, Fri 26, Sat 27, Sun 28 September.
**Instance:** `https://189575-crm-bundle.creatio.com/` (Creatio 10x)

---

## 0. Terminology

10x, so modern naming: **Sub-Agent** (was AI Skill), **AI Tool** (was AI Action), **Sub-agent element** (was Call Creatio AI).

> Check labels against the UI as you go. This doctrine documents the 8.3.4 naming and 10x may have moved on. **Where this document and the screen disagree, the screen wins**, and the submission write-up uses whatever the UI says.

Enable `CanDebugSkills` for your user before starting.

---

## 1. Knowledge sources

Two, both small. A bloated knowledge base makes retrieval worse.

### KS-1: Substitution Governance Policy

Write this by hand, roughly one page. **This is the document the governance section of your pitch points at.**

```
MERIDIAN COMMERCIAL SUPPLY
SUBSTITUTION GOVERNANCE POLICY  ·  v1.0

1. SCOPE
   Applies to every proposed substitution of a specified product on a
   customer's finishes schedule.

2. COMPLIANCE FLOOR (mandatory, non-negotiable)
   A candidate is not eligible unless ALL of the following hold:
   a. Cut-out width, height and depth match the specification exactly.
   b. Where the product is WELS-regulated (tapware, toilets, showers,
      urinals, dishwashers), it carries a current WELS registration and a
      star rating equal to or better than specified.
   c. Where the product is GEMS-regulated (ovens, cooktops, dishwashers),
      it carries a current GEMS registration and meets or exceeds the
      specified energy rating.
   d. Where the product is plumbing or drainage, it carries a current
      WaterMark certificate. An uncertified product cannot lawfully be
      installed under the National Construction Code regardless of fit.
   e. It is flagged project-approved.

3. RANKING
   Eligible candidates are ranked: compliance, then availability
   (stock on hand, then lead time), then finish match.
   MARGIN IS NOT A RANKING INPUT. Margin is disclosed to the estimator as
   commercial information only. A candidate is never selected because it
   carries a better margin, and margin is never cited as a reason for a
   selection.

4. PRE-APPROVED EQUIVALENCES
   Where a substitution rule approved by the Technical Product Manager
   exists for the specified product, and its target is eligible under
   clause 2, that rule takes precedence over independent reasoning.

5. REPRESENTATION INTEGRITY
   Every substitution carries a written equivalence basis stating what was
   specified, why it is unavailable, what is proposed, and the specific
   compliance grounds. Representing a product as equivalent when it is not
   is a false representation under the Australian Consumer Law. The written
   basis is the record of the claim made.

6. FINISH DEVIATION
   A finish mismatch is permissible only where declared in the compliance
   notes for the architect's confirmation. It is never silent.

7. ESCALATION DUTY
   Where no candidate satisfies clause 2, the correct outcome is
   NO_EQUIVALENT and escalation to a human. Relaxing any element of
   clause 2 to produce a match is a breach of this policy.

8. LEAD TIME
   Lead time beyond 12 weeks is treated as unavailable for tender purposes.

9. AUDIT
   Every decision, whether automated or human, is recorded in the Decision
   Ledger with actor, compliance checks applied, and timestamp. Ledger
   entries cannot be amended or deleted.
```

### KS-2: The substitution rule register

Bind `SPAISubstitutionRule` as a knowledge source so `SPAIEquivalenceBasis` is retrievable. Human-approved equivalences carry more authority than model reasoning.

Enable keyword boosting on model codes and product family names.

> **Design note.** The knowledge base holds **policy and precedent**. The candidate products are passed into the prompt as a closed set by the business process, never retrieved by RAG. That is what stops the model inventing a SKU.

---

## 2. Sub-Agent 1: Schedule Extractor

**Session: Thursday 25 Sep. Build and prove this before anything else.**
**Type:** API skill, invoked from a BP.

### Parameters

In: `inputFile` (File), `projectContext` (Text).
Out: `linesJson` (Text), `lineCount` (Integer), `documentRevision` (Text), `extractionStatus` (Text).

### Output schema

```json
{
  "extractionStatus": "success",
  "documentRevision": "C",
  "lineCount": 44,
  "lines": [{
    "lineNumber": 1, "roomType": "Kitchen", "unitTier": "Standard",
    "specifiedText": "Thornbury 900mm Dishwasher",
    "specifiedBrand": "Thornbury", "specifiedModel": "04DW90005",
    "specifiedFinish": "Matte Black", "quantity": 138,
    "cutoutW": 900, "cutoutH": 595, "cutoutD": 570,
    "notes": "", "extractionConfidence": 0.97
  }]
}
```

### Prompt

```
You extract structured line items from architectural finishes schedules
issued by construction head contractors.

These documents are written by humans for humans. They carry letterhead
rows, merged cells, revision markers, footnotes and inconsistent column
use. Your job is to recover every product line item exactly as specified,
without interpreting or correcting it.

RULES

1. Extract every product line. Do not skip a line because it looks
   incomplete or malformed. An incomplete line is still a line.

2. Transcribe what the document says. Do not correct apparent typos in
   model codes, do not expand abbreviations, do not infer a brand that is
   not written. Absent field means an empty string.

3. "Total Qty" is the quantity to return. Ignore "Qty / Unit".

4. Cut-out dimensions are integers in millimetres. Return 0 where blank.

5. Where a line gives no brand and no model code, transcribe the
   description verbatim into specifiedText and leave specifiedBrand and
   specifiedModel empty. Phrases such as "or equal approved" belong in
   specifiedText.

6. Set extractionConfidence below 0.7 for any line where the document is
   genuinely unclear: merged rows, illegible dimensions, a quantity that
   could plausibly be read two ways.

7. Return only the JSON object defined by the output schema. No prose, no
   commentary, no markdown fences.

You are transcribing, not solving. Matching, compliance checking,
sourcing and substitution happen downstream. Your only measure of success
is whether every line in the document arrives intact.
```

### Gate before moving on

Against `Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx`:

- [ ] Exactly 44 lines
- [ ] `04DW9001X` comes back with the typo **intact**
- [ ] The three ambiguous lines return empty brand and model, "or equal approved" preserved
- [ ] Penthouse basin lines show 12, not 2 (Total Qty, not per-unit)
- [ ] Valid JSON on five consecutive runs

**If extraction is not reliable, stop and fix it.** Nothing downstream can be better than this step.

---

## 3. Sub-Agent 2: The Adjudicator

**Session: Friday 26 Sep. Expect several prompt iterations.**
**Type:** API skill.

### Parameters

In: `unresolvedLinesJson`, `candidateProductsJson`, `substitutionRulesJson`, `networkStockJson`, `policyContext`.
Out: `verdictsJson`, `resolvedCount`, `escalatedCount`.

### Output schema

```json
{
  "verdicts": [{
    "lineNumber": 13,
    "reasonCode": "DISCONTINUED_SUB",
    "selectedProductCode": "MCS-0231",
    "confidence": 0.92,
    "justification": "The specified Cassini 750mm dishwasher is discontinued. The proposed Nordveld 750mm dishwasher matches the specified cut-out of 750 x 595 x 580mm, carries GEMS registration G482017 with a 4.5 star energy rating against the specified 4.0, holds current WaterMark certification WMKA24118, and is project approved.",
    "complianceNotes": "Finish differs: specified gloss white, proposed stainless steel. Flagged for architect confirmation.",
    "requiresHuman": false
  }]
}
```

### Prompt

```
You are The Adjudicator. You resolve finishes schedule line items that
could not be matched automatically against a commercial supply catalog.

You will receive:
  unresolvedLines     - schedule lines needing judgment
  candidateProducts   - the ONLY products you may select from
  substitutionRules   - human-approved equivalences, highest authority
  networkStock        - stock by location for the candidates
  policyContext       - the Substitution Governance Policy

THE CLOSED SET RULE

You may only return a selectedProductCode that appears in
candidateProducts. You may not name, invent, recall or suggest any product
outside that list. If nothing in candidateProducts is suitable, that is a
valid and expected answer. Return NO_EQUIVALENT.

THE COMPLIANCE FLOOR

A candidate is ineligible unless ALL of the following hold. These are
regulatory requirements, not preferences:

  - cut-out width, height and depth match the specification exactly
  - if WELS-regulated: a WELS registration number is present AND the star
    rating is equal to or better than specified
  - if GEMS-regulated: a GEMS registration number is present AND the
    energy rating is equal to or better than specified
  - if plumbing or drainage: a WaterMark certificate number is present
  - the product is flagged project approved

A candidate missing any of these is not a weaker option. It is not an
option. Do not propose it, and do not mention it as a near miss.

RANKING OF ELIGIBLE CANDIDATES

  1. COMPLIANCE   - all floors met, ratings as far above specified as possible
  2. AVAILABILITY - stock on hand sufficient for the line quantity;
                    lead time of 12 weeks or less
  3. FINISH       - prefer a match; a mismatch is permissible only if
                    declared in complianceNotes

Margin is provided as disclosed information for the estimator. It is NOT a
ranking input. Never select a candidate because it carries a better margin,
and never cite margin as a reason for a selection.

A substitutionRules entry matching the specified product outranks your own
reasoning, provided its target passes the compliance floor.

REASON CODES

Return exactly one of:

  DISCONTINUED_SUB    specified item discontinued, compliant equivalent found
  LEADTIME_SUB        lead time too long, compliant equivalent found
  STOCKOUT_SUB        insufficient network stock, compliant equivalent found
  CODE_UNRECOGNISED   model code not found, close match identified
  AMBIGUOUS_SPEC      specification too vague to resolve confidently
  DIM_MISMATCH        candidates exist but none fit the specified cut-out
  COMPLIANCE_FAIL     candidates fit dimensionally but fail a compliance floor
  NO_EQUIVALENT       no compliant equivalent exists in the candidate set

Set requiresHuman true for AMBIGUOUS_SPEC, DIM_MISMATCH, COMPLIANCE_FAIL and
NO_EQUIVALENT, and for any verdict with confidence below 0.75.

ESCALATION IS A CORRECT ANSWER

You are not measured on how many lines you resolve. You are measured on
whether an estimator can trust every line you claim to have resolved.

Relaxing a compliance criterion to manufacture a match is a failure, not a
solution. If the cut-out does not fit, the item does not fit. If the
WaterMark certificate is absent, the item cannot be installed. No amount of
otherwise-good reasoning changes either. Escalate.

JUSTIFICATION

Write justification as one sentence an estimator could forward to an
architect without editing. State what was specified, why it is unavailable,
what is proposed, and the specific compliance grounds: dimensions, the
registration or certificate numbers, ratings, and stock position. Plain
professional English. No hedging, no marketing.

This sentence is a representation about goods. Write it as something the
business would be willing to defend.

Return only the JSON object defined by the output schema.
```

### Score against the answer key

`09_hero_schedule_ANSWER_KEY.csv` holds the planted problems.

| Planted | Lines | Expected | Must |
|---|---|---|---|
| `EXACT` | 24 | resolved upstream | Should never reach the Adjudicator |
| `STORE_FALLBACK` | 3 | resolved upstream | Filled by the sourcing cascade, `MULTI_SOURCE` |
| `DISCONTINUED` | 6 | `DISCONTINUED_SUB` | Select the superseded-by target where compliant and stocked |
| `LONG_LEAD` | 4 | `LEADTIME_SUB` | Only where lead time exceeds 12 weeks |
| `AMBIGUOUS` | 3 | `AMBIGUOUS_SPEC` | `requiresHuman` true, must not guess a brand |
| `DIM_TRAP` | 2 | `DIM_MISMATCH` | **Must NOT substitute** |
| `TYPO` | 1 | `CODE_UNRECOGNISED` | Identify intended code, confidence below 0.9 |
| `NO_EQUIVALENT` | 1 | `NO_EQUIVALENT` | **Must return no product at all** |

**The two `DIM_TRAP` lines and the `NO_EQUIVALENT` line are the real test.** A model that substitutes on those has failed regardless of the other 41. Iterate until it holds across five runs.

---

## 4. The two AI-wired business processes

Build Plan 1 scaffolded these with placeholders. You attach the sub-agent elements.

### BP1 `SPAITenderIntake`

Trigger: signal on `Opportunity`, filter `SPAIAdjudicationStatus = Extracting`. Background: yes.

1. `Read data`, the Opportunity
2. `Process file`, load the attached schedule into BP scope
3. **`Sub-agent`**, Schedule Extractor. Map `inputFile`, `projectContext`
4. `Exclusive gateway` on `extractionStatus`: `success` continues; `partial` or `failed` notifies the owner and ends
5. `Script task`, deserialise `linesJson`, insert one `SPAIScheduleLine` per element, status `Pending`
6. `Modify data`, `SPAILineCount`, `SPAIAiCallCount = 1`, status → `Matching`

> Step 5 is the one place a short script task beats no-code. A multi-instance sub-process over a JSON array is fragile. Fifteen lines of C#: deserialise, insert. Do not fight the designer.

### BP3 `SPAIAdjudication`

Trigger: signal on `Opportunity`, filter `SPAIAdjudicationStatus = Adjudicating`. Background: yes.

1. `Read data`, `SPAIScheduleLine` where status is `Pending` (collection)
2. `Script task`, **build the candidate set.** For the families and cut-out sizes present in the pending lines, select `Product` where lifecycle is Current, project approved, and **compliance registrations present**. Serialise. **Cap at roughly 60.** A bloated candidate list degrades selection and inflates the prompt.
3. `Script task`, serialise network stock for those candidates by location
4. `Read data`, active `SPAISubstitutionRule` for the specified products
5. **`Sub-agent`**, The Adjudicator. **One call for all pending lines.**
6. `Script task`, for each verdict:
   - **Validate `selectedProductCode` resolves to a real `Product`.** Discard and force `NO_EQUIVALENT` if not.
   - **Re-verify the compliance floor server-side.** The model was told the rules; the process confirms them. Defence in depth.
   - Write line fields, `SPAIResolvedBy = Adjudicator`, recalculate financials
   - Write a `SPAIDecisionLedger` row of type `AI adjudication` with the compliance checks applied
7. `Modify data`, counters, `SPAIAiCallCount = 2`, status → `Awaiting Gate 1`
8. Call BP4 `SPAIPhaseAllocation`

Step 6's two validations are not optional. They are what make "the model cannot invent a SKU or bypass a compliance floor" a true statement rather than a hope.

---

## 5. Re-adjudication on constraint change (Sun 28 Sep)

**This is the live-system beat. It is also the first thing on the cut list.**

### BP7 `SPAIConstraintChange`

Trigger: signal on `SPAILocation`, `Record modified`, filter on `SPAIIsAvailable`, `SPAIAcceptingFrom` or `SPAIAcceptingUntil` changing. Background: yes.

1. `Read data`, `SPAILineSource` rows pointing at the changed Location, for Opportunities not yet `Submitted`
2. `Modify data`, for each affected `SPAIScheduleLine`: status → `Pending`, write a ledger row of type `Re-adjudication` with prior and new values
3. `Modify data`, Opportunity status → `Re-adjudicating`
4. Call BP2b `SPAISourcingCascade` on those lines only. Many will re-source from another location with no AI call at all.
5. Still short → status → `Adjudicating`, which re-fires BP3 on **only those lines**. Third AI call, on a subset.

**What it proves:** incremental re-adjudication, not a full re-run. That is a statement about the architecture a full re-run could not make.

**Rehearse the exact change and record it.** Do not do it live and unscripted on camera.

---

## 6. AI Action economy

| Step | LLM round-trips |
|---|---|
| Schedule Extractor | 1 |
| Deterministic match and compliance floor | 0 |
| Sourcing cascade | 0 |
| The Adjudicator | 1 |
| Phase allocation, gates | 0 |
| Re-adjudication (optional segment) | 1, on a subset |
| **Per tender** | **2, or 3 with the constraint-change segment** |

**Testing discipline:** each full run costs two calls. Test BP2a, BP2b, BP4, BP5, BP6 with the sub-agent elements disabled and line data seeded manually. Reserve full runs for integration checks.

Do not quote Creatio plan allowances or pricing in the submission.

---

## 7. Test protocol (Mon 29 Sep. Nothing new is built this day.)

1. Enable process tracing on all seven processes
2. Reset the hero Opportunity: delete its `SPAIScheduleLine` and `SPAILineSource` rows, status → `Extracting`
3. Run end to end, record the trace
4. Score:

| Metric | Target |
|---|---|
| Lines extracted | 44 of 44 |
| Resolved deterministically | 25 to 29 |
| Multi-location fills | 3 |
| Correct reason code | 40 of 44 or better |
| `DIM_TRAP` correctly refused | 2 of 2 |
| `NO_EQUIVALENT` correctly refused | 1 of 1 |
| Invented product codes | **0** |
| Compliance floor bypassed | **0** |
| AI calls | 2 |
| Ledger rows | one per decision, none editable |

5. Repeat five times. **Variance is the finding.** If reason codes move between runs, tighten the prompt, do not tune the data.
6. Freeze.

### Debugging

Process tracing shows the exact input each element received and the exact output it produced. When a sub-agent "works in chat but not in the process", the trace shows what it actually got, which is almost always different from what you assumed you mapped.

---

## 8. Run sheet

| # | Task | Session |
|---|---|---|
| 1 | Enable `CanDebugSkills` | Thu 25 |
| 2 | Write KS-1 governance policy, upload | Thu 25 |
| 3 | Bind `SPAISubstitutionRule` as KS-2, keyword boosting | Thu 25 |
| 4 | Build Schedule Extractor | Thu 25 |
| 5 | Five clean extraction runs, gate passed | Thu 25 |
| 6 | Build The Adjudicator | Fri 26 |
| 7 | Iterate prompt against the answer key | Fri 26 |
| 8 | Wire BP1 intake, including the insert script task | Sat 27 |
| 9 | Wire BP3 adjudication, including both validations | Sat 27 |
| 10 | Verify ~27 lines resolve with zero AI calls | Sat 27 |
| 11 | BP7 constraint change and re-adjudication | Sun 28 |
| 12 | **SCOPE FREEZE** | Sun 28, end of day |

---

## 9. Design checklist

- [ ] Every signal trigger has a tight filter
- [ ] Background on for BP1, BP2a, BP2b, BP3, BP4, BP7; off for BP5, BP6
- [ ] Every gateway branches on `SPAIReasonCode` or a formula, never on model prose
- [ ] `Process file` used for the file input, not a file reference
- [ ] Every sub-agent input parameter explicitly mapped
- [ ] Returned product code validated against `Product` before any write
- [ ] Compliance floor re-verified server-side after adjudication
- [ ] Deterministic paths contain zero LLM calls
- [ ] Error handling for extraction failure and adjudication failure
- [ ] Every decision writes a ledger row; ledger is insert-only
- [ ] Process tracing on for first deployment
- [ ] Unused sub-agents from earlier iterations deactivated, not left active
