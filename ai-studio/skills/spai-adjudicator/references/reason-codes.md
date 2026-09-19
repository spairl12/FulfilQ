# Adjudicator: reason codes

These are the eight codes the skill may return. Each one is bound to the live `SPAIReasonCode` lookup: `SPAICode` holds the code and `SPAIRequiresHuman` holds the escalation flag. That was verified read-only via clio on 2026-09-20. The lookup also holds `EXACT` and `MULTI_SOURCE`, which only the deterministic BPs write. The skill never returns them.

| Code | Lookup name (en-US) | Lookup `SPAIRequiresHuman` | Prompt sets `requiresHuman` | Product selected? |
|---|---|---|---|---|
| `DISCONTINUED_SUB` | Discontinued, compliant equivalent proposed | false | only if confidence < 0.75 | yes |
| `LEADTIME_SUB` | Lead time exceeded, equivalent proposed | false | only if confidence < 0.75 | yes |
| `STOCKOUT_SUB` | Insufficient network stock, equivalent proposed | false | only if confidence < 0.75 | yes |
| `CODE_UNRECOGNISED` | Model code not found, closest match proposed | **true** | only if confidence < 0.75 | yes |
| `AMBIGUOUS_SPEC` | Specification too vague to resolve | true | always | no |
| `DIM_MISMATCH` | No equivalent fits the specified cut-out | true | always | no |
| `COMPLIANCE_FAIL` | Candidate failed WELS, GEMS or WaterMark check | true | always | no |
| `NO_EQUIVALENT` | No compliant equivalent exists | true | always | no |

## The line's final `requiresHuman` value (decided 2026-09-20)
`BP3_ApplyVerdicts.cs` sets the line's flag to **the model's `requiresHuman` OR the lookup's `SPAIRequiresHuman`**. The stricter value always wins, so a `CODE_UNRECOGNISED` line always reaches Gate 1 mandatory review, even when the model's confidence is 0.75 or higher. The prompt is not changed.

## Escalation outcomes are successes
`AMBIGUOUS_SPEC`, `DIM_MISMATCH`, `COMPLIANCE_FAIL` and `NO_EQUIVALENT` are correct answers (02 design rule). BP3 writes them to `SPAILineStatus` = `Escalated` or `No match` and never retries them.

`SPAIScheduleLine` has **no requiresHuman column**. The final flag is kept as the line status, which is what the Gate 1 list filters on:

| Condition (after BP3 validation) | `SPAILineStatus` written by BP3 |
|---|---|
| `NO_EQUIVALENT` | No match |
| any other code with final requiresHuman = true (always true for `CODE_UNRECOGNISED`, `AMBIGUOUS_SPEC`, `DIM_MISMATCH`, `COMPLIANCE_FAIL`) | Escalated |
| `*_SUB` with final requiresHuman = false | Substitution proposed |

Each of the three is still reviewed at Gate 1 (02b rule 2). "Escalated" means the review is mandatory (02b rule 4).
