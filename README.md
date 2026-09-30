# FulfilQ, The Adjudicator

A governed Creatio agent for **Meridian Commercial Supply**, a fictional supplier of appliance, tapware and
sanitaryware packages to residential builders. A builder sends a tender schedule; FulfilQ turns it into a
compliant, sourced proposal, and a person decides every commitment.

Built for the **Creatio Agent Arena Hackathon 2026**, Industry Agent category.
Every company, brand, product, person and project in this repository is invented.

## The problem

Tender schedules are drawn up 12 to 18 months before a tender is called. By the time the tender arrives, many
of the specified products are discontinued or on long lead times, and an estimator re-solves each line by hand
inside a 72-hour tender window.

## What FulfilQ does

1. **Reads the schedule** dropped into the Creatio.ai chat: a messy, human-formatted spreadsheet.
2. **Resolves what it can without AI.** Exact catalogue match, then the **compliance floor** as a database check:
   WELS registration and star rating, GEMS energy registration and rating, WaterMark certification, the exact
   cut-out size, and that the product is current and project approved. Then stock is sourced across the network:
   home DC, other DCs, retail stores, inbound supply.
3. **Uses AI only for what is left**, in **one call for all remaining lines**, against a **closed list** of
   candidates that already passed the floor. Every answer is re-checked by the CRM before it is written.
4. **Hands every decision to a person.**
   - **Gate 1**, in the chat: approve or exclude the proposed replacements. The agent repeats the choice back and
     waits for a yes.
   - **Gate 2**, in the chat: approve the builder's award. Only now is stock reserved and are orders raised: a
     blanket PO, and a sub-order and delivery for each event in the builder's construction programme.
5. **Prepares the paperwork, never sends it.** The award writes a readable story of every decision onto the
   opportunity and attaches a customer-facing award pack for a person to review and send.

A 44-line tender takes **two AI calls**: one to read the schedule, one to adjudicate what the CRM could not.
A design that sent each line to the model would make forty-five.

## Architecture

```
Person + tender schedule
      │
      ▼
Creatio.ai chat ── agent FulfilQ (AI Studio)
      │               ├─ skill: Schedule Extractor (no tools)          AI call 1
      │               ├─ knowledge: governance policy, regulatory reference, precedent register
      │               ├─ tool: meridian_tender_intake
      │               ├─ tool: approve_tender_lines   Gate 1
      │               └─ tool: approve_tender_award   Gate 2
      ▼  MCP
Creatio MCP server ── business processes
      │
      ├─ Tender intake:   insert lines → catalogue match + compliance floor → stock sourcing → summary
      │                   → adjudication in the background: closed candidate set → Creatio.ai skill
      │                     "SPAI Adjudicator" via the Sub-agent element (AI call 2) → re-validate → write
      ├─ Gate 1 approval: record decisions → source approved replacements → submit, refresh the scorecard
      └─ Award:           blanket PO, sub-order + delivery per programme event, commit and reserve stock,
                          Awarded / Closed won → tender story + award pack
```

Tools live on the agent, never on a skill. The adjudicating skill has no tools at all, which is what makes the
closed-set rule enforceable rather than merely instructed.

## Governance

| Principle | How it is built |
|---|---|
| Fail closed | Escalation is a correct answer. The agent refuses rather than relaxing a compliance rule |
| Deterministic before probabilistic | The compliance floor is a CRM check that runs before and after the AI call |
| Closed set | The model may only choose from candidates the process gives it; the process re-validates every code |
| Margin never ranks | Candidates are ordered by compliance, then availability, then finish. Margin is shown to the estimator, never used to choose |
| A person commits | Nothing is reserved or ordered before Gate 2; both gates repeat the decision back and wait for a yes |
| Verifiable decisions | An append-only Decision Ledger records actor, checks, prior and new value for every step |
| Honest access control | Tool calls run as one named integration identity with a fixed permission set, and the agent says so |
| Customer-facing text | Prepared by the CRM from approved records, and sent by a person |

## Repository map

| Path | Contents |
|---|---|
| `ai-studio/agents/the-adjudicator/` | The agent's system instructions and configuration |
| `ai-studio/skills/` | Skill sources: the Schedule Extractor and the adjudicator |
| `ai-studio/bp-scripts/` | Script-task bodies for every business process (pasted into the process designer) |
| `ai-studio/paste/` | Exactly what is pasted into the instance: the Creatio.ai skill, MCP tool records, script bodies |
| `ai-studio/tests/` | Scorers, the regression sample, the run log, and seven test and demo tenders |
| `src/cs/` | C# entity listeners: the insert-only ledger and item identity |
| `packages/` | clio export of the Creatio packages `SPAIAdjudicator` and `SPAIMeridianCommercial` |
| `tools/import/` | Seed data import, the test-tender builder, and a stock snapshot/restore for repeatable runs |
| `meridian-data-v2/`, `meridian-data-v4/` | Fictional seed data: catalogue, stock, substitution rules, tenders, programmes |
| `00_`–`02g_*.md` | Plans, run sheets, handover briefs and the submission brief, in build order |

## Reproducing it

1. Install the packages in `packages/` into a Creatio instance with Creatio.ai and AI Studio, using clio.
2. Load the seed data with `tools/import/imp.py` (steps are listed in `tools/README.md`).
3. Build the business processes from `02c_Business_Process_Run_Sheet.md`, pasting the bodies from
   `ai-studio/paste/scripts-2026-09-29/`.
4. Create the Creatio.ai skill from `ai-studio/paste/spai-adjudicator-creatio-skill.md`, the MCP tools from
   `ai-studio/paste/mcp-tools-gate1-and-award.md`, and the agent from `ai-studio/agents/the-adjudicator/`.
5. Build the test tenders with `python3 tools/import/test_tenders.py build --apply`, take a stock snapshot, and
   run a tender schedule from `ai-studio/tests/tenders/` through the chat.

## Status

Built and tested end to end in a live Creatio instance: intake, Gate 1 and Gate 2 on real test tenders, with the
records checked after each step. On the roadmap: delegated access so each call runs as the signed-in person, a
delivery check that escalates items that will miss a programme date, re-adjudication when a warehouse changes, and
reading the builder's per-delivery quantities at award.
