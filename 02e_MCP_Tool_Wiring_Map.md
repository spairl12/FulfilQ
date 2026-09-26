# 02e — MCP Tool Wiring Map: how the agent calls our business processes

Companion to `02a` (agent and skills) and `02c` (business processes). This file owns one question: where
each tool name is written, and who is allowed to call it. Nothing here is deployed by this file.

Verified read-only against `McpTool` on 189575-crm-bundle via clio on 2026-09-26.

---

## 1. The short answer

**No — not "everything in the agent and skill files".** The tools go in the **agent**, and both skills stay
tool-free. That is not a simplification; it is the design.

| Layer | Holds tools? | Why |
|---|---|---|
| Agent "The Adjudicator" (AI Twin chat) | **Yes — both** | The agent is the router and the human's counterpart. Calling a process is a routing act |
| Skill `spai-schedule-extractor` | **No** (`allowed-tools: ""`) | Its contract is "You are transcribing, not solving." A process tool would let it write records mid-transcription |
| Skill `spai-adjudicator` | **No** (`allowed-tools: ""`) | Any tool is a potential retrieval path. Zero tools is what makes the closed-set rule enforceable rather than merely instructed |
| Business processes (BP1–BP8) | n/a | They call the Adjudicator skill *inwards* via the Sub-agent element, with the candidate set passed as a parameter |

The Adjudicator never calls a tool and never appears in a tool call. It runs **inside** BP3, reached by the
Sub-agent element, with a closed candidate set handed to it. That is why the closed-set rule survives
contact with MCP.

## 2. What the two example skills teach — and what not to copy

`creatio-create-record` and `creatio-analyze-record` name their tools explicitly in the body
(`creatio_describe_object`, `creatio_validate_record`, `creatio_aggregate_records`), state the condition for
each call, and close with Common Mistakes and Constraints.

**Copy the form:**
- Stable `snake_case` verb_noun tool names the model can read (`creatio_describe_object`, not `tool3`).
- Every tool reference carries *when to call it* and *what to do with the result*.
- An explicit "do not use this for…" so the model does not reach for the wrong tool.
- Ordering discipline — `analyze-record` is read-only by constraint, `create-record` validates before it writes.

**Do not copy the posture.** Those are general CRM skills whose job *is* to browse the schema and resolve
lookups at will. Ours is the opposite: a governed agent with a closed candidate set. Binding tools to our
skills the way those examples do would hand the Adjudicator the exact capability the compliance floor
depends on it not having.

## 3. Live findings

| # | Finding |
|---|---|
| F13 | Both `McpTool` rows are enabled. `bp2`'s `Description` still reads "Disabled 2026-09-26: placeholder process, no declared parameters…" — the model reads `Description` as tool documentation, so this is actively misleading it |
| F14 | `Description` on `bp1` is the literal string `"BP1"`. Every input and output property is `ProcessSchemaParameter1/2`, described `"Parameter 1"` / `"Parameter 2"`. Discovery works, but the model cannot know what either tool does or what to send |
| F16 | **Delegated access needs an out-of-band authorisation before any chat run.** On the first call the tool result carries an authorization requirement and a consent URL. The agent correctly refuses to relay a link that arrived as tool data, so the call fails rather than prompting. Authorise from the AI Studio Integrations UI, then start a fresh session. **Authorise before recording the demo**, or a cold session shows a failed tool call |
| F15 | A single tool that ran intake **through** human approval would block the MCP call until a person answered. The two tools must split at the approval boundary — which is also what gives the demo its HITL beat in one conversation |

## 4. The two-tool contract

Two tools discovered, two tools needed. The split is the approval boundary.

### Tool 1 — `start_tender_intake` (row `0abf4291-47fa-4c18-b6c4-0b3f84fba7d8`, process `BP1`)

Reversible. Proposes, never commits.

| | |
|---|---|
| Called by | The chat agent, **once per schedule**, immediately after the Schedule Extractor returns |
| Does | Inserts `SPAIScheduleLine` rows → BP2a deterministic match → BP2b sourcing cascade → compliance floor (deterministic, in C#) → BP3 candidate set → Adjudicator via Sub-agent element → writes proposed verdicts |
| Returns | Counts by outcome, the escalated lines with reason codes, a run id |
| Commits | Schedule lines and **proposed** verdicts only. No order, no award, no ledger award entry |

Inputs:

| Rename from | To | Type | Description for the schema |
|---|---|---|---|
| `ProcessSchemaParameter1` | `OpportunityId` | Unique identifier | The opportunity the tender schedule belongs to. |
| `ProcessSchemaParameter2` | `LinesJson` | Unlimited text | The Schedule Extractor's JSON object, passed through unchanged. |
| *(add)* | `DocumentRevision` | Text | The schedule's revision marker as written on the document, for example C. |

Outputs:

| Rename from | To | Type |
|---|---|---|
| `ProcessSchemaParameter1` (lookup-shaped) | `ScheduleRunId` | Unique identifier — retype from the lookup shape, or name it `Opportunity` if it must stay a lookup |
| `ProcessSchemaParameter2` | `RunSummary` | Text |
| *(add)* | `LinesInserted` | Integer |

Model-facing `Description` (replaces `"BP1"`):

> Hand a transcribed finishes schedule to Meridian's fulfilment workflow. Call once per schedule, after the
> Schedule Extractor has returned its JSON. Inserts the schedule lines against the opportunity, runs
> deterministic catalogue matching, applies the compliance floor, builds the capped candidate set,
> adjudicates the unresolved lines, and returns a summary plus the lines that need a human decision.
> Writes proposals only — nothing is ordered or awarded by this call. Do not call it twice for the same
> schedule.

### Tool 2 — `confirm_tender_awards` (row `c6fc7160-2e1f-4a0b-a9b1-0bbd6ee52d11`, process `BP2`)

Irreversible. Human-gated.

| | |
|---|---|
| Called by | The chat agent, **only** after an explicit human approval in the conversation, and only for approved lines |
| Does | BP8: blanket purchase order plus `SPO-<digits>-NN` delivery sub-orders, approved lines to `Awarded`, decision ledger entries |
| Returns | The purchase order reference and the number of lines awarded |
| Guard | Platform **Tool Confirmation (HITL)** bound to this tool and this tool only |

Inputs:

| Rename from | To | Type | Description for the schema |
|---|---|---|---|
| `ProcessSchemaParameter2` (uuid) | `ScheduleRunId` | Unique identifier | The run id returned by start_tender_intake. |
| `ProcessSchemaParameter1` | `ApprovedLineNumbers` | Text | Comma-separated line numbers the person approved, or ALL. |

Outputs: `PurchaseOrderRef` (Text), `BlanketOrderId` (Unique identifier, from the lookup-shaped param),
plus `LinesAwarded` (Integer).

Model-facing `Description` (replaces the disable note — **F13**):

> Commit the adjudicated lines a human has approved: creates the blanket purchase order and its delivery
> sub-orders, sets the approved lines to Awarded, and writes the decision ledger entries. Call only after the
> person in the conversation has explicitly approved the proposal returned by start_tender_intake, and only
> for the line numbers they approved. This call cannot be undone from the conversation.

## 5. Where every name is written

Six places. Only one of them is a skill file, and there the value is empty.

| # | Location | Field | Value |
|---|---|---|---|
| W1 | Creatio → `McpTool` row | `ExternalName` | `start_tender_intake` / `confirm_tender_awards` — the id the model calls |
| W2 | Creatio → `McpTool` row | `Description` | §4 prose. **This is the model's only source of when-to-call.** `Title` mirrors it in words |
| W3 | Creatio → process parameters | Name + description | §4 tables. These regenerate into `InputSchema` / `OutputSchema`, which the model reads to build arguments |
| W4 | AI Studio → agent System Instructions | `## Tools` | §6 below. Prompt change — needs sign-off |
| W5 | AI Studio → skill frontmatter | `allowed-tools` | **`""` on both.** Unchanged, and the governance point |
| W6 | AI Studio → skill bodies | — | **No tool names.** The Extractor already ends "Matching, compliance checking, sourcing and substitution happen downstream"; the Adjudicator already forbids searching. Neither needs a word added |

Re-save each `McpTool` row after W3 so the schema regenerates, then re-run Discover Tools in AI Studio and
confirm the new names and descriptions arrive.

## 6. Governance reconciliation

| Concern | Status |
|---|---|
| Block 1 "never approves a quote, an order or a tender submission" | **Intact, no edit.** The human approves; the agent relays a decision it did not make. The `## Tools` wording says so explicitly, so Block 1 stays verbatim |
| Block 5 "no open query path to the database" | **Intact.** Neither tool accepts a filter or returns a catalogue. The candidate set is built by BP3 in C#, not by anything the model can parameterise |
| Closed-set rule | **Intact.** The Adjudicator has zero tools and is reached inwards by the Sub-agent element |
| Block 8 token discipline | **Unchanged at 2 AI calls per tender** — Extractor in chat, Adjudicator once inside BP3. Tool calls are 2 and carry no model inference |
| Rule 11 RBAC | Requires MCP access mode **delegated**, so a tool call runs as the signed-in user. Also what makes the award attributable |
| New audit row **AU7** | The ledger records which tool call committed the award and under whose identity |
| HITL | Tool Confirmation bound to `confirm_tender_awards` only. Binding it to tool 1 would gate a reversible proposal and cost the demo its rhythm |
