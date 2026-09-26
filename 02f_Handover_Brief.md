# 02f — Handover brief

**Written 2026-09-26, end of the MCP/BP1 session.** This supersedes `02d_Session_Status_Report.md`
as the first thing to read. 02d is still accurate about the data model and the earlier decisions;
this file is accurate about where the build actually stands.

Instance `https://189575-crm-bundle.creatio.com/` · clio environment `meridian` · packages
`SPAIAdjudicator`, `SPAIMeridianCommercial` · prefix `SPAI` · AI Studio org "SPAI Relentless Logic".

---

## 1. Read this much, in this order

1. This file, all of it.
2. `02e_MCP_Tool_Wiring_Map.md` — how the chat agent reaches the business processes. Short.
3. `02c_Business_Process_Run_Sheet.md` §4 (BP1) and §1, §2, §5 (BP2a, BP2b, BP3) — the next things to build.
4. `02a_Agent_And_Skills_Run_Sheet.md` §7 and §8 only — governance placement and the coverage table.

Do **not** bulk-read `00_`–`03_`. Find the section first. `CLAUDE.md` has the graph-query workflow
for locating things without opening files.

---

## 2. What is being built

"The Adjudicator" for the Creatio Agent Arena Hackathon 2026. Meridian Commercial Supply is a
fictional B2B supplier of appliances and fixtures to residential construction. A head contractor
issues a finishes schedule — a spreadsheet of product lines written by humans for humans. The agent
transcribes it, matches what it can deterministically, and adjudicates only the lines that are left,
proposing compliant substitutions where the specified product cannot be supplied.

**The demo is chat-first.** A user drops the spreadsheet into the Creatio AI Twin chat, types a
sentence, and the agent sets everything up in Creatio, coming back to that same user for approval
before anything is committed.

### The design rules that must not be quietly changed

These were decided deliberately and are the spine of the submission. Changing any of them is a
conversation with the user, not a refactor.

| Rule | Why |
|---|---|
| **Two skills only** — Schedule Extractor and Adjudicator | A third narrative skill was cut on purpose |
| **The Adjudicator receives ALL unresolved lines in ONE call** | A 44-line tender is 2 LLM calls, never 45 |
| **The candidate product set is passed in as a CLOSED list** | The skill must never search or retrieve products |
| **The compliance floor is checked deterministically in the BP, before the skill runs** | Not by the model |
| **Margin is disclosed but is NEVER a ranking input** | An output whose justification cites margin fails Gate 1 |
| **Escalation is a correct answer** | NO_EQUIVALENT, DIM_MISMATCH, COMPLIANCE_FAIL, AMBIGUOUS_SPEC |
| **Knowledge sources hold POLICY AND PRECEDENT only** | Never products, stock or prices |

---

## 3. Architecture as it now stands

```
  user + spreadsheet
          │
          ▼
   AI Twin chat ── agent "The Adjudicator"
          │            ├── skill: Schedule Extractor   (no tools)
          │            ├── skill: Adjudicator          (no tools)
          │            └── tool:  meridian_tender_intake   ← the ONLY tool
          │
          ▼  (MCP call)
   Creatio MCP server "FullfilQ"
          │
          ▼
   BP1 "Meridian: tender intake"
          └── later: BP2a → BP2b → BP3 as sub-processes
                              └── BP3 calls the Adjudicator skill
                                  via the Sub-agent element
```

**Tools live on the agent, never on a skill.** Both skills keep `allowed-tools: ""`. That is what
makes the closed-set rule enforceable rather than merely instructed: the Adjudicator has no tool it
could use to go looking for a product. It runs *inside* BP3, reached by the Sub-agent element, with
the candidate set handed to it as a parameter.

**Two AI calls per tender, unchanged.** Extraction happens in the chat; adjudication happens once
inside BP3. BP1 has no AI call at all — the extractor's JSON arrives as a tool argument.

**The tool surface is deliberately two tools, split at the approval boundary.** `meridian_tender_intake`
is reversible and proposes; a second tool (not yet built) commits the awards and is the only thing
Tool Confirmation gates. See `02e` §4 for the full contract.

---

## 4. What exists live, and what is on disk only

### Live and working
| Thing | State |
|---|---|
| Data model, pages, lookups | Built. `01_` is the reference |
| Seed data | Loaded from **`meridian-data-v2`** (not v3). 45 substitution rules, 33 pass the floor |
| Skill `spai-schedule-extractor` | Published, attached, **one live test run passed every content check** |
| Skill `spai-adjudicator` | Published, attached. Never run live |
| Agent "The Adjudicator" | Deployed. Channel: AI Twin. Knowledge KS1–KS3 attached |
| MCP server `FullfilQ` | `IsOnline: true`. Endpoint `/0/rest/ToolServiceMcp/FullfilQ/v1/mcp` |
| MCP tool `meridian_tender_intake` | Record `2282843d-8a21-4d87-8478-7959c7d41c2f`. Description and both schemas hand-written with real descriptions |
| **BP1 "Meridian: tender intake"** | Built and compiled. Process `b321611c-050b-4b9c-8903-77fd95291e12`. **Tested end to end, twice** |

### On disk, not built
| Thing | Where the spec is |
|---|---|
| BP2a, BP2b, BP3, BP4, BP5, BP6, BP7, BP8 | `02c`, element by element, with C# in `ai-studio/bp-scripts/` |
| The second MCP tool (`confirm_tender_awards`) | `02e` §4 |
| Allocation board | `03_` |

### Source of truth for files
- `ai-studio/skills/*/SKILL.md` — skill sources. `ai-studio/dist/*.zip` is derived; do not edit it.
- `ai-studio/paste/*-instructions.md` — body-only text for the AI Studio instructions editor,
  which takes the body **without** frontmatter.
- `ai-studio/agents/the-adjudicator/system-instructions.md` — the agent prompt. **Edited this session.**
- `ai-studio/bp-scripts/*.cs` — script-task bodies, not class files. Paste from the first
  non-comment line.
- `ai-studio/tests/` — Gate scorers. `score_sample.py` scores the 12-line regression template.

---

## 5. BP1 in detail — the one process that exists

**Caption** `Meridian: tender intake` · **Code** `SPAITenderIntake` · **Package** `SPAIAdjudicator`

Canvas is three elements: **Simple start → Script task "Insert schedule lines" → End.** Not a signal
start: the MCP tool call is the trigger.

### Parameters
| Name | Type | Direction |
|---|---|---|
| `TenderReference` | Text | Input |
| `CreateIfMissing` | Boolean | Input |
| `OpportunityId` | Unique identifier | Input (optional; for process-to-process calls) |
| `LinesJson` | Unlimited text | Input |
| `DocumentRevision` | Text | Input |
| `InsertedCount` | Integer | Output |
| `SkippedCount` | Integer | Output |
| `ResolvedOpportunity` | Text | Output |
| `OpportunityCreated` | Boolean | Output |
| `RunSummary` | Text | Output |

Parameter names bind to the tool's JSON keys **by name**. Rename a parameter and the tool schema
must be regenerated or hand-edited to match.

### What the script does
`ai-studio/bp-scripts/BP1_InsertScheduleLines.cs`, pasted into the script task.

1. Resolves the tender from `TenderReference`: tender code first, then a title contains-match, then
   a UUID if that is what was passed. Ambiguous or unfound throws a message the agent relays.
2. If nothing matches and `CreateIfMissing` is true, creates the Opportunity at **Qualification**,
   owned by the caller, tender code set when the reference looks like one. Default is false, so a
   typo cannot quietly become a second tender — a human has to confirm first.
3. Inserts one `SPAIScheduleLine` per extracted line, status **Pending**, mapping `roomType` and
   `unitTier` text to the real lookups and keeping unmatched text in the notes.
4. **Idempotent**: skips line numbers already present, so a re-run or a double-click cannot duplicate.
5. Writes `RunSummary` naming the tender it wrote to.

### Two platform lessons, both expensive to relearn
- **The Usings grid takes ONE namespace per entry.** Pasting a comma-separated list generates
  `using A, B, C;` and fails at the *generated file's* line 11 with `CS1002/CS1022/CS0116` — errors
  that point at the namespace and give no hint a Usings row is at fault. The bad row survives until
  deleted, so later entries look guilty. This script needs **no** usings.
- **A Formula element will not carry `[#Parameter#].ToString()`.** Build concatenated strings in the
  script task where the types are explicit.

---

## 6. Test evidence so far

### BP1, run live twice on Opportunity `4adedb6d-7539-4fd6-8f38-2fa6b6cd6262` (419 / Clearsoft)
```
run 1: {"InsertedCount":2,"SkippedCount":0,"RunSummary":"Inserted 2 schedule lines for revision C. 0 already present."}
run 2: {"InsertedCount":0,"SkippedCount":2,"RunSummary":"Inserted 0 schedule lines for revision C. 2 already present."}
```
Records verified field by field from clio, not from the chat reply: room and tier resolved to the
right lookup records, quantity 12 and 8, cut-outs 900/595/570 and 0/0/0, the model code `04DW90005`
intact, line 2's brand and model correctly empty with "or equal approved" preserved, confidence
0.97 and 0.92, status Pending, `SPAIQtyRemaining` back-filled.

**Two test rows remain on that opportunity** — the user was asked to delete them by hand. This
session's tooling is blocked from deleting records.

### Extraction Gate 1 (`02a` §9)
One of five hero runs done; it passed every content check. Four to go.
Scorer: `python3 ai-studio/tests/score_extraction.py run1.json … run5.json`
Hero workbook: `meridian-data-v2/Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx`

### Regression template
`ai-studio/tests/sample/Bellweather_Court_Stage2_Finishes_Schedule_RevB.xlsx` — 12 lines chosen so
every extractor rule has a case, including ALT markers and a prompt-injection note. Scored by
`score_sample.py` against `Bellweather-expected.json`.

### Adjudication Gate 2 (`02a` §10) — read `02c` §10 first
**D5:** six hero lines (010, 011, 018, 025, 028, 040) have **no compliant product at the specified
cut-out at all**, so DIM_MISMATCH is the only correct answer and the answer key's `*_SUB`
expectation is unreachable. Both sessions agreed to accept and reconcile this. **Never relax the
compliance floor to make a gate pass.**

---

## 7. Where we are stuck

### Blocked: delegated access
The user wants tool calls to run as the signed-in person. Switched to delegated; the first tool call
returned an authorization requirement **inside the tool result**, and the agent correctly refused to
relay a sign-in link that arrived as tool data. Twice.

**Diagnosis:** the OAuth app is `client_credentials` (created by clio's
`create-server-to-server-oauth-app`, clientId `03B5733725FB43BCFE00B0D7F80E5279`, bound to
**Supervisor**). That grant type has no user, no browser, no redirect URI, so it cannot complete a
consent flow. Delegated needs an **authorization_code** client with AI Studio's callback registered
on `189575-crm-bundle-is.creatio.com` — an Identity Service admin task clio cannot do.

**Current state: integration credentials.** Everything works, but every record is created by
Supervisor. Consequence: this line in the agent's system instructions is **false** under integration
or agent-owned credentials —

> AI access follows the same role-based permissions as the underlying data. A user without read
> access to an object cannot obtain it through the agent.

Replacement wording drafted and offered, not yet applied (a prompt change needs the user's yes):

> The agent reaches Creatio through a single, named integration identity with a fixed,
> least-privilege permission set. It holds no user's credentials and cannot widen its own access.
> Every action it takes is attributable to that identity in the audit log, and the human gates below
> determine what is committed.

**Do not conflate delegated access with HITL.** Per-call human approval is Tool Confirmation and
works under every access mode. The demo's approval beat is unaffected by this problem.

### In flight right now
The user is adding `CreateIfMissing` and `OpportunityCreated` to BP1 and re-pasting the updated
script. A compile error was reported against the *previous* version of the script with the
parameters not yet created; the error text was never captured. If it recurs, the first suspect is
`FilterComparisonType.Contain` on the title lookup — the only genuinely new platform call.

### Open, smaller
- **`SPAIDisplayRef` is blank on every hero line.** The listener derives it from item ref and ALT,
  and the hero schedule has neither column. That is the column a human scans in the Gate 1 review
  list. Decide whether it falls back to the line number.
- The MCP tool record still advertises the pre-rename schema (`OpportunityId` required, no
  `TenderReference`). **It must be updated only after** BP1's parameters exist, or the agent will
  send a tender name to a workflow with nowhere to put it. An attempted update failed with an
  opaque error and did **not** apply; the record is unchanged and needs a retry, possibly with a
  shorter Description.
- `02a` and `02c` still describe the pre-chat architecture. The chat-first design, the tool
  contract, **D6** and an `AU7` audit row are written up only in `02e`.

---

## 8. Next steps, in order

1. **Finish BP1's parameter change** — compile, then update the MCP tool schema to add
   `TenderReference` / `CreateIfMissing` and drop `OpportunityId` from `required`.
2. **Rehearse the real handoff.** New chat, drop the Bellweather workbook, name the tender in
   words, let the agent run both steps unprompted. **This tests the biggest unknown in the design:
   whether the model passes the extractor's JSON envelope through intact rather than summarising
   it.** Verify the landed rows against `Bellweather-expected.json`.
3. **Build BP2a, BP2b, BP3** from `02c`. This is where adjudication actually lives, and it is the
   bulk of the remaining work.
   - **D6 (new, needs recording in `02c`):** BP2a, BP2b and BP3 currently specify record-signal
     starts. A Sub-process element cannot call a signal-started process, so they move to **simple
     starts** taking `OpportunityId`. BP7 already calls BP2b as a sub-process and wants this anyway.
   - **Measure how long the chain takes.** BP3 makes the adjudication AI call, and the whole chain
     would run inside one MCP tool call. If a 44-line adjudication exceeds the tool-call timeout we
     must split it. Do not design around this before seeing a real number.
4. **Build BP8 and the second tool** (`confirm_tender_awards`), with Tool Confirmation bound to it.
5. **Finish Gate 1** — four more hero runs.
6. **Write the chat-first architecture into `02a`/`02c`** — tool contract, D6, coverage rows, AU7.
7. **Revisit delegated access**, timeboxed. Fall back to agent-owned and apply the replacement
   ACCESS CONTROL wording if it cannot be made to work.

---

## 9. Decisions and findings

**Closed decisions D1–D5** are in `02d` §5 and `02c` §11. **D6** is above, new and not yet written
into `02c`.

**Findings F1–F12** (live-instance check) are in `02a` §11. **F13–F16** (MCP and delegated access)
are in `02e` §3.

---

## 10. How to work on this repo

**Hard stops the user set, still in force:**
1. **Do not build anything live in the instance without asking.** The run sheets exist so a person
   executes them by hand.
2. **Do not change prompt text without quoting the old and the new and waiting for a yes.** This
   covers both SKILL.md bodies and the agent's system instructions.
3. **Do not alter the two-skill structure, the one-call batching rule, or the closed-set rule.**
4. **Do not design around an unverified platform limitation.** Verify it first.

**Also:**
- **Telemetry is declined.** The clio hook asks on every call. Send nothing.
- **Never commit `meridian-seed-data-v2.zip`** — it contains the answer key.
- **Browser verification is manual.** Give the user a checklist; do not drive a browser.
- **Record deletion is blocked** for this tooling. Ask the user to delete by hand.
- Do **not** attach `query-creatio-records`, `gemini_search` or any web-search tool to The
  Adjudicator. Each is a retrieval path that breaks the closed-set rule.
- Bind only internal channels. Block 1 forbids customer-facing communication.
- The Supervisor-bound OAuth app should be rotated or deleted after the hackathon.
- Commit style: a short imperative subject, then why rather than what.
