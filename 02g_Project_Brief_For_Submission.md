# The Adjudicator: project brief for the submission video and write-up

**Written:** Monday 29 September 2026, evening Melbourne. **Revision 2:** Gate 2 is now the award approval (see Change 4).
**Audience:** a separate Claude session that is helping to write the video narrative and the written submission. It has no access to the build, the repository or the Creatio instance, so this brief is meant to be complete in itself.

**Competition:** Creatio Agent Arena Hackathon 2026, Industry Agent category. Solo entry.
**Deadline:** 30 September, 23:59 US Eastern, which is **about 14:00 Melbourne on Wednesday 1 October**.
**Deliverables:** a video of **under 5 minutes** with no copyrighted audio, and a written submission covering features, the Creatio capabilities used, and a roadmap.

---

## 1. The story in one paragraph

Meridian Commercial Supply is a **fictional** B2B business. It supplies complete appliance, tapware and sanitaryware packages to head contractors building apartment towers, retirement villages and student housing. It fulfils them from 4 distribution centres and 8 retail stores. When a builder calls a tender, it sends a **finishes schedule**: a spreadsheet written by people, for people. The schedule was usually drawn up 12 to 18 months earlier, so by the time the tender arrives many of the specified products are discontinued or on long factory lead times. An estimator then has to re-solve every line by hand inside a 72-hour tender window. **The Adjudicator** is an AI agent inside Creatio that does that work:

1. It reads the schedule.
2. It matches everything it can without AI.
3. It sources stock across the network.
4. It uses AI only for the lines that genuinely need judgment, and proposes compliant substitutes.
5. It escalates what it cannot honestly resolve.
6. It hands every decision to a person before anything is committed.

### The problem, in one causal sentence

Finishes schedules are drawn 12 to 18 months before a tender is called, so by the time the tender lands a large share of the specified items are dead or delayed, and a human re-solves each one by hand under deadline.

### The thesis the entry is built around

**Governed AI:** the model does only what needs judgment. Everything checkable is checked by the CRM, not trusted to the model. A person approves everything that matters.

---

## 2. Hard rules for the narrative and the write-up

These come from the original plan and still apply:

- **Everything is invented.** Every company, brand, product, person and project is fictional. Never name a real company, brand, person or vendor.
- **Do not attribute the security vocabulary to any vendor's guide.** "Fail closed", "least privilege", "defence in depth" and the others are standard engineering terms. Present them as that, not as quotes from anyone's framework.
- **Do not quote Creatio plan names, pricing or AI allowances.** "Two AI calls per tender" is a **design-time count of model round-trips**, used to compare this design with a naive one. It is not a billing figure. Say "two AI calls", never "two AI Actions out of your allowance".
- **Do not overclaim the platform's security.** Encryption and tenant isolation are inherited from Creatio. Never present them as engineering work done here.
- **Use Creatio's current UI names**, for example AI Twin chat, Creatio.ai skill, Sub-agent element, MCP server, Tool Confirmation. Where an older plan uses different words, the UI wins.

---

## 3. What we started with: the original plan (18 September)

### The core architecture: a deterministic pass first, AI only for what is left

```
44 schedule lines (hero tender: Corvina Quarter Stage 2, 180 dwellings, revision C)
   │
   ├─ Extractor (AI, 1 call) ........ messy human spreadsheet → structured lines
   │
   ├─ Deterministic pass (business processes, 0 AI calls)
   │     exact model-code match
   │     COMPLIANCE FLOOR: WELS registration, GEMS registration, WaterMark certificate, rating parity
   │     sourcing cascade: home DC → other DC → retail store → inbound supply
   │     cut-out tolerance · lead time · margin arithmetic
   │         → most lines resolve here and never reach the model
   │
   └─ Adjudicator (AI, 1 call) ...... all remaining lines, batched into ONE round trip
```

**Two AI calls per tender.** A naive design that sends each line to the model would make 45 to 90.

### What the AI genuinely does, and what it never does

- **The AI does:**
  - read a merged-cell, human-formatted spreadsheet
  - resolve vague specs such as "600mm dishwasher, chrome, or equal approved"
  - recognise a mistyped model code
  - write a substitution justification an estimator could forward to an architect unedited
- **The AI never does:**
  - exact code lookup
  - compliance checks
  - stock checks or sourcing allocation
  - dimensional comparison
  - margin or lead-time arithmetic
  - gate thresholds

  All of these are business-process logic.

### Governance: the heart of the entry

**The compliance floor is a database check, not a prompt instruction.** In Australia, a substitution is a regulated act:

| Regime | What it means here |
|---|---|
| **WELS** (Water Efficiency Labelling and Standards Act 2005) | Tapware, toilets, showers and dishwashers must be registered per model. A substitute is a different model, so it needs its own registration and an equal or better star rating |
| **GEMS** (Greenhouse and Energy Minimum Standards Act 2012) | Ovens, cooktops and dishwashers must be registered, with an equal or better energy rating |
| **WaterMark** (ABCB certification) | Plumbing products must be certified to be installed at all |
| **NCC / AS-NZS 3500** | Installation requirements behind the cut-out and fit checks |
| **Australian Consumer Law s18, s29** | Presenting a substitute as "equivalent" when it is not is a false representation. This is the legal weight behind the written justification |

**Key lines for the narrative:**
- "A prompt instruction can be talked out of. A gateway cannot."
- **The ranking rule:** compliance first, availability second, finish third. **Margin is shown to the estimator and is never used to rank.** An agent that ranked on margin would be quietly swapping products on a customer's specification for the supplier's benefit.
- **Escalation is a correct answer, not a failure.** `NO_EQUIVALENT`, `DIM_MISMATCH`, `COMPLIANCE_FAIL` and `AMBIGUOUS_SPEC` are outcomes the agent is proud to return. Relaxing a compliance rule to manufacture a match is the failure.

**Design principles, each backed by something a judge can click on:**

| Principle | How the build implements it |
|---|---|
| Fail closed | The agent escalates rather than relaxing the compliance floor |
| Least privilege, bounded capability | The AI skill has **no tools**. The candidate products are passed in as a closed list |
| Minimise what leaves the trusted context | The deterministic pass: most lines never reach the model. A decision that never reaches the model can't be hallucinated |
| Defence in depth | The prompt limits selection to the closed list, **and** the business process independently re-checks every returned product code and re-runs the compliance floor before writing |
| Verifiable decisions | The Decision Ledger: append-only, one row per decision, recording actor, checks passed, prior and new value, and time |

**Privacy, proportionate:** the Privacy Act's new automated-decision transparency obligation (APP 1.7, from 10 December 2026) **does not apply**. The agent decides about products, not people. Naming a regulation and correctly scoping it out is a stronger signal than pretending it applies.

**Two human gates** (as originally planned; see Change 4 for how they ended up):
- **Gate 1:** the estimator reviews and approves every line.
- **Gate 2:** a commercial manager signs off tenders above a value threshold before they are submitted, and the tender pack is generated.

### The original demo storyboard (5 minutes)

It was CRM-screen-led:
- the schedule becomes lines
- 27 lines turn green with an "AI calls: 0" counter
- split sourcing across a DC and stores
- one Adjudicator run with amber substitutions and red escalations
- an **Allocation Board** (a custom Angular drag-and-drop component) showing a warehouse change that triggers re-adjudication
- Gate 1, then Gate 2 generating the tender pack
- the Decision Ledger scrolling, and the closing metric: "44 lines, 2 AI calls, N escalations a human owns"

### Original scope

- **In scope:**
  - extraction
  - the deterministic pass with the compliance floor
  - the sourcing cascade
  - AI adjudication
  - substitution
  - call-off phasing as orders
  - Gates 1 and 2
  - the Allocation Board
  - the Decision Ledger
  - a dashboard
  - re-adjudication when a warehouse changes
- **Cut order if time ran short:** dashboard → re-adjudication → Gate 2 document generation → Allocation Board.
- **Never cut:** extraction, the deterministic pass with the compliance floor, substitution, the sourcing cascade, Gate 1, escalation.

---

## 4. What changed on the way, and why

These changes are the "we learned and adapted" part of the story. Most of them made the governance **stronger**, not weaker.

### Change 1: chat-first. The agent now lives in the Creatio AI Twin chat and drives the CRM through MCP tools

- **Before:** business processes triggered the AI, and the user watched CRM screens.
- **Now:** the user drops the spreadsheet into the **AI Twin chat** and types one sentence, such as "Load this into Bellweather Court Stage 2". The agent extracts the schedule and calls a Creatio **MCP server** (named FullfilQ). Its tools run the business processes inside Creatio, and the agent relays the result in plain language.
- **Why:** it's a far more natural user experience. It shows modern platform capability (AI Studio agent, MCP server, tools bound to business processes). It also puts the human approval **in the same conversation**.
- **The tools are split at the approval boundary, one tool per commitment level:**

| Tool | What it does | Human check |
|---|---|---|
| `meridian_tender_intake` | Writes the lines, runs matching, sourcing and AI adjudication, and returns a **proposal**. Approves, orders and reserves nothing | None needed: it is reversible and only proposes |
| `approve_tender_lines` | **Gate 1:** records which lines the person approved or excluded, then sources the approved substitutes. When nothing is left undecided, the tender is Submitted to the builder. Reserves no stock and raises no order | **Tool Confirmation**: the chat pauses and the person must confirm the exact call |
| `approve_tender_award` | **Gate 2:** when the builder awards the tender, approves the award. Creates the purchase orders and deliveries, reserves the stock, and moves the tender to Awarded and the opportunity to Closed won | **Tool Confirmation** |

- **Tools live on the agent, never on a skill.** The AI skills have zero tools, which is what makes the closed-list rule enforceable rather than just instructed.

### Change 2: the Adjudicator became a native Creatio.ai skill, called from inside a business process

- **Before:** an AI Studio skill.
- **Now:** a **Creatio.ai skill** ("SPAI Adjudicator") that the adjudication business process (BP3) calls through the **Sub-agent element**. The process builds the closed candidate list in code, passes it in as one text parameter, and gets the verdicts back as one output parameter.
- **Why:** the business process designer can only reach Creatio.ai skills. The move also puts the model call *inside* the governed process, between two deterministic checks: the floor is checked before the call and again after it.
- **Unchanged:** still one AI call for all unresolved lines, still no tools, still a closed list.

### Change 3: no stock is reserved before the tender is won (the award split)

- **Before:** three seeded "call-off phase" orders existed from the start.
- **Now:**
  - **Before award,** sourcing is only **indicative**: it shows where stock *would* come from and reserves nothing.
  - **At award,** a separate process (BP8) turns the indicative plan into **committed** sourcing and reserves the stock. It creates the builder's blanket purchase order and **one delivery sub-order per event in the builder's construction programme** (for example a prototype unit, then level 1, level 2 and so on), numbered from the builder's PO, such as SPO-0441-01 onwards.
- **Why:** a supplier that reserves stock for tenders it hasn't won starves the jobs it *has* won. This mirrors how the business really works.
- **The data shows both states:**
  - **Kelmore Retirement Village** is a tender won in January 2026 and part-way through delivery. It's the "what an awarded job looks like" reference.
  - **Corvina Quarter** (the hero) is pre-award, with only the builder's construction programme loaded.

### Change 4: both gates now happen in the chat, and Gate 2 became the award approval

- **Before:**
  - Gate 1 was a Creatio task for the estimator.
  - Gate 2 was a commercial manager's sign-off, before submission, on tenders above 5,000,000.
  - The award was a separate, later step.
- **Now:** there are two gates, and both happen in the conversation with Tool Confirmation.

| Gate | When | What the person approves | What changes in Creatio |
|---|---|---|---|
| **Gate 1: line approval** (`approve_tender_lines`) | After the proposal | Which substitutes to accept and which lines to exclude | Line statuses (approved or excluded); approved substitutes sourced (indicative only); one "Human override" ledger row per decision, with the person's words; when nothing is undecided, the tender becomes **Submitted** and the Gate 1 approved date is stamped. **No stock reserved, no order raised** |
| **Gate 2: award approval** (`approve_tender_award`) | After the builder awards the tender and sends its blanket PO number | Committing to the award: reserving stock and raising the orders | Everything below, all at once |

**At Gate 2, and only at Gate 2**, the following change in one step:
- **Opportunity:** status moves to **Awarded**, the native sales stage moves to **Closed won**, and the Gate 2 approved date is stamped. This is the last write, so the record flips only once everything else exists.
- **Blanket purchase order:** created with the builder's PO number, such as BPO-0441, and linked to the builder's construction programme.
- **Delivery sub-orders:** one per event in the builder's programme (prototype unit, level 1, level 2 and so on), numbered SPO-0441-01 onwards. Each gets its own **scheduled delivery** record with date, source location, line count and value.
- **Call-up lines and order products:** one per line per delivery event, showing how many units go at each event. Alternate items keep their "ALT" identity.
- **Stock:** each line's sourcing moves from **indicative to committed**, and stock is reserved: allocated goes up and available goes down at each location.
- **Schedule lines:** each ordered line is linked to its delivery orders through its call-up lines and order lines. Excluded lines are never ordered.
- **Decision Ledger:** one row per line, plus one "Gate 2: award approved" row carrying the person's note.
- **The tender story:** an internal narrative written into an "Adjudication story" field on the Opportunity. It's built from the Decision Ledger: intake, lines resolved with no AI, the one AI adjudication, each Gate 1 decision in the person's own words, and the Gate 2 award.
- **The award pack:** a **customer-facing** document attached to the Opportunity, addressed to the builder's contact. It covers:
  - the lines supplied
  - each approved substitution **with its written justification** and compliance notes
  - the lines not included
  - the delivery programme, with each delivery order number, programme event, date and units

  No prices or margins appear in it. **It is prepared, never sent:** the agent tells the person it is ready, and a person reviews and sends it. So the rule "the agent never communicates with a customer" holds, and every customer-facing word passed through a human.

**Why the change:**
- **The gate sits on the only irreversible, costly action.** Award is the one moment stock is reserved and orders are raised, so that's where a human approval matters most.
- **It is simpler and clearer:** propose → approve the lines → approve the award. Every commitment has a human on it, and every approval shows up on screen as the Tool Confirmation prompt.
- **What was given up:** a separate commercial-manager sign-off on high-value quotes before submission. That, and running Gate 2 as a Creatio task for a named approver who is a different person from the estimator (separation of duties), are **roadmap items**.

**Why the award pack matters to the story:** it closes the loop on the original promise, a substitution justification an estimator could forward to an architect unedited. The Adjudicator writes the justification, a person approves it at Gate 1, and the award pack carries it to the builder. There is **no extra AI call**: every word comes from records that were checked or approved.

**For the video:** the Opportunity record is on screen while the chat drives it. The status moves from Awaiting Gate 1 to Submitted to Awarded, and the stage to Closed won, as the person approves each gate in the chat.

### Change 5: access control, reworded to tell the truth

- **Before:** the plan was for tool calls to run as the signed-in user (delegated access).
- **What happened:** it needed an OAuth setup this instance couldn't provide in the time available.
- **Now:** the agent reaches Creatio through **one named integration identity** with a fixed, least-privilege permission set. It holds no user's credentials and cannot widen its own access. Everything it does is attributable to that identity in the audit log, and **the human gates decide what is committed**.
- **Why this matters for the narrative:** the agent's instructions were **rewritten to say exactly this**, rather than keep a claim ("the agent follows each user's permissions") that was no longer true. **Honesty about the limitation is itself a governance point.** Per-call human approval (Tool Confirmation) is separate from access mode and works regardless.

### Change 6: guardrails added after real test runs

Each of these came from something that happened in testing. They make good "we tested it properly" material.

- **The agent never takes the tender name from the document.** In one run the schedule's project line differed slightly from what the person typed, and a duplicate tender was created. Now:
  - The agent uses only the name the person gave, and points out differences.
  - The intake process does exact, then near-match, lookup.
  - Creating a new tender requires the person to confirm the exact name first.
- **A prompt-injection note is planted in the regression spreadsheet,** and the extractor transcribes it as data rather than obeying it.
- **Re-running is safe.** Every process skips work already done, so a double-click or a retry never duplicates lines or double-reserves stock.
- **Masked references.** The platform's personal-data masking rewrote a tender code like TND-2026-0777 to "TND-[PHONE]", because it looks like a phone number. The intake process now ignores masked codes and falls back to the tender name, and the tender-code format is moving to TND-26-0777.
- **Errors go back to the person, not into a crash.** Any problem the person can fix (an ambiguous tender, a missing PO number, an unreadable line list) returns "Nothing was changed" plus the reason, which the agent relays.

### Change 7: an honest reconciliation of the test answer key (D5)

- **What we found:** a live check found **six hero lines where no compliant product exists in the catalogue at the specified cut-out size**. The only correct answer for those is to escalate (`DIM_MISMATCH`), even though the original answer key expected a substitution.
- **The decision:** score escalation as correct, and **never relax the compliance floor to make a test pass**.
- **For the story:** six lines had no compliant equivalent at all, and the agent escalated every one rather than fudge a fit.

### Change 8: cut or not built (so far)

- **The Allocation Board** (custom drag-and-drop component). No component code exists in the project, and it isn't part of the current build. Treat it as cut unless the builder says otherwise. The planned fallback is a native Creatio list.
- **Re-adjudication when a warehouse changes (BP7).** Specified, but not built. It's the second item in the planned cut order.
- **Dashboard.** Not confirmed as built. It's first in the planned cut order.
- **Gate 2 tender-pack document before submission.** Replaced by the award pack at Gate 2 (see Change 4).

---

## 5. What is built now (as of 29 September, late afternoon)

### The architecture as built

```
Person + spreadsheet
      │
      ▼
AI Twin chat ── agent "The Adjudicator" (AI Studio)
      │            ├── skill: Schedule Extractor (no tools)            ← AI call 1
      │            ├── knowledge: governance policy, regulatory reference, precedent register
      │            ├── tool: meridian_tender_intake
      │            ├── tool: approve_tender_lines   Gate 1 (Tool Confirmation)  [process built]
      │            └── tool: approve_tender_award   Gate 2 (Tool Confirmation)  [written, not built yet]
      │
      ▼  MCP
Creatio MCP server "FullfilQ"
      │
      ▼
BP1  Tender intake ─ finds the tender (or creates it after the person confirms), writes the lines
  └─ BP2a Deterministic match ─ exact codes + compliance floor, 0 AI calls
       └─ BP2b Sourcing cascade ─ home DC → other DC → store → inbound; indicative only
            └─ BP3 Adjudication ─ builds the closed candidate list in code (compliance floor first,
                  margin never a ranking key, max 60 candidates) → Sub-agent element calls the
                  Creatio.ai skill "SPAI Adjudicator" ONCE for all remaining lines
                  (AI call 2) → re-validates every returned code and re-checks the floor →
                  writes verdicts + ledger rows
  └─ Summarise proposal ─ the plain-language result the agent reads back

BP5  Gate 1 approval ─ records decisions → sources approved substitutes → tender Submitted
BP8  Gate 2 award     ─ blanket PO, sub-order + delivery per programme event, commit + reserve
                        stock, tender Awarded, opportunity Closed won
                      ─ then "Prepare award pack": the tender story on the Opportunity + the
                        customer-facing award pack attached for a person to send (no AI call)
```

### The data model (native Creatio wherever possible)

- **Account:** the head contractor.
- **Opportunity:** the tender. It carries an adjudication status that moves through Not started → Matching → Sourcing → Adjudicating → Awaiting Gate 1 → Submitted → **Awarded**, and its native sales stage moves to **Closed won** at award.
- **Product:** native Creatio, extended with the compliance registration fields, ratings, cut-out dimensions, lifecycle status and "superseded by". The catalogue has 494 products.
- **Order:** native Creatio, used for the blanket PO and the delivery sub-orders. Each sub-order has a Delivery record.
- **Custom objects:**
  - Schedule Line
  - Line Source (split fills across locations)
  - Location (4 DCs and 8 stores)
  - Stock Position (about 2,250)
  - Substitution Rule (45 loaded, 33 pass the floor; 12 are deliberately stale to test the floor)
  - Decision Ledger (append-only)
  - Call-up Schedule and Delivery Event (the builder's construction programme)
  - Call-up Line
- **Reason codes drive the logic, never model prose:**
  - EXACT
  - MULTI_SOURCE
  - DISCONTINUED_SUB, LEADTIME_SUB, STOCKOUT_SUB (a substitute is proposed)
  - COMPLIANCE_FAIL, DIM_MISMATCH, NO_EQUIVALENT, AMBIGUOUS_SPEC, CODE_UNRECOGNISED (each needs a human)

### Status by component

| Component | Status |
|---|---|
| Data model, pages, lookups, seed data | Built and loaded |
| Agent "The Adjudicator" in the AI Twin chat, with 3 knowledge sources | Live |
| Skill: Schedule Extractor | Live. Passed its live test runs, including ALT (alternate) item markers and the prompt-injection note |
| Creatio.ai skill: SPAI Adjudicator | Live. Called by BP3 through the Sub-agent element |
| MCP server FullfilQ + tool `meridian_tender_intake` | Live and tested from the chat |
| BP1 intake, BP2a match, BP2b sourcing, BP3 adjudication | **Built, compiled and tested end to end from the chat** |
| BP5 Gate 1 approval | **Built and compiled.** Its tool `approve_tender_lines` is being created now |
| BP8 Gate 2 award approval + tool `approve_tender_award` | Script written and compile-checked offline; not yet built in Creatio |
| BP6 (pre-submission sign-off) | **Dropped**: Gate 2 is now the award approval |
| BP4 delivery check, BP7 re-adjudication, Allocation Board, dashboard | Not built / cut |

### Test evidence so far (real numbers from live runs)

**Regression tender: "Bellweather Court, Stage 2"**, 12 lines, chosen so every extractor rule has a case.

- **What happened:** the person dropped the spreadsheet in the chat and asked for it to be loaded. The agent extracted it and called the intake tool, and the whole chain ran.
- **The agent's reply:**
  - 6 lines matched and sourced **without AI**
  - 1 substitution proposed: line 8, a discontinued shower set, replaced by a compliant equivalent under an approved substitution rule, reason `DISCONTINUED_SUB`
  - 5 lines escalated for a person to decide: 3 × `CODE_UNRECOGNISED`, each with a closest match suggested, and 2 × `AMBIGUOUS_SPEC`
  - the tender set to **Awaiting Gate 1**
  - an explicit statement that **nothing is approved, ordered or reserved**
- **AI calls:** 2 in total. One for extraction in the chat, one for adjudication inside the process.
- **Timing:**
  - The full chain from the tool call took **about 24 seconds**, almost all of it the single adjudication call.
  - A re-run with nothing left to decide finished in **0.6 seconds with no AI call**.
- **Stock:** the stock figures were unchanged after sourcing, which proves that indicative sourcing reserves nothing.
- **Accuracy:** every figure in the agent's reply matched the database, checked record by record.

**Not yet run:**
- the hero tender (Corvina, 44 lines) through the whole chain
- Gate 1 approval
- Gate 2 award approval
- the remaining scored extraction runs on the hero schedule

---

## 6. What is left, in order (deadline about 14:00 Melbourne, 1 October)

1. **Finish Gate 1:**
   - create the `approve_tender_lines` tool record
   - turn on Tool Confirmation
   - update the agent's instructions
   - test on Bellweather
2. **Build Gate 2** (BP8 and the `approve_tender_award` tool). Test on Corvina with the builder's PO BPO-0441, which comes from the award email in the dataset.
3. **Run the hero tender end to end** on Corvina (44 lines): intake → Gate 1 in chat → Gate 2 in chat. Keep the Opportunity on screen throughout. Capture the numbers for the video: lines resolved without AI, substitutions, escalations, AI calls, time taken, and the orders, deliveries and reservations created.
4. **Record the video** and write the submission.
5. **Housekeeping:**
   - export the package
   - set up judge credentials and test them from a private window
   - confirm the instance stays live through judging (1–8 October)
   - clean up test data
   - after the hackathon, rotate the integration credentials

## 7. Suggested video structure (chat-first, under 5 minutes)

A starting point for the narrative session, built only from things that exist or are being finished. **Adjust to what is actually captured on screen.**

| Time | On screen | Beat |
|---|---|---|
| 0:00–0:20 | The messy 44-line schedule, then the finished proposal, fast | Transformation first |
| 0:20–0:45 | Revision C, 180 dwellings, a 72-hour window; discontinued and delayed items | The problem |
| 0:45–1:30 | Drop the spreadsheet into the AI Twin chat with one sentence. The agent extracts it, calls intake, and replies with the proposal | Chat-first: one sentence, and the CRM does the work |
| 1:30–2:15 | Cut to Creatio: lines resolved with no AI, compliance fields, split sourcing across DC and stores, stock still unreserved | The architecture beat: **most lines never touch the model** |
| 2:15–3:00 | Substitutions with written justifications; escalations with reason codes; "escalation is a correct answer" | The AI does judgment and nothing else |
| 3:00–3:40 | **Gate 1** in chat, with the Opportunity visible beside it: the person approves some lines and excludes others; the agent repeats back; the Tool Confirmation prompt appears; the status turns to Submitted; the ledger rows appear | **The human decides, and it's recorded** |
| 3:40–4:10 | **Gate 2** in chat: "the builder awarded it, PO BPO-0441". The agent repeats back, Tool Confirmation appears, the person confirms, and the Opportunity turns **Awarded / Closed won**. Cut to the blanket PO, delivery sub-orders, deliveries and reserved stock | **Nothing is committed until a person approves the award** |
| 4:10–4:40 | Open the **award pack** (substitutions with their justifications, the delivery programme), marked "prepared for review, a person sends it". Then the **tender story** field and the Decision Ledger. The metric: "44 lines, 2 AI calls, N escalations a human owns" | The customer gets a document every word of which a human approved |
| 4:40–5:00 | The Creatio capabilities used | Platform credit |

**Lines worth saying:**
- "A prompt can be talked out of a rule. A gateway can't."
- "Margin is shown to the estimator. It is never used to rank."
- "Escalation isn't a failure. Fudging a fit is."
- "Two AI calls for a 44-line tender. A naive design would make forty-five."
- "The model never sees the database. It sees a closed list of candidates, and its answer is checked again before anything is written."
- "Nothing is reserved until the tender is won, and a person approves the award."
- "The agent prepares the builder's paperwork. A person sends it."

---

## 8. Creatio capabilities used (for the write-up)

- **AI Studio:** the agent, a skill (Schedule Extractor), knowledge sources, and the AI Twin chat channel
- **Creatio.ai skill** (SPAI Adjudicator) with typed input and output parameters, called by the **Sub-agent element** inside a business process
- **MCP server** exposing business processes as agent tools, with hand-written tool descriptions and schemas
- **Tool Confirmation (human in the loop)** on the two tools that commit decisions
- **Business process designer:** processes chained as sub-processes, script tasks, and exclusive gateways
- **Native CRM objects:** Account, Opportunity (including its native sales stage, moved to Closed won at award), Product (extended), Order, Order Product, plus custom objects, and an **entity event listener** on the ledger and item identity
- Platform security **inherited, not claimed:** role-based access, tenant isolation, encryption in transit and at rest

## 9. Roadmap ideas (for the write-up)

- Delegated access, so every tool call runs as the signed-in person
- A delivery check against the builder's programme (BP4): dated escalations at Gate 1, such as "line 14 will miss the Level 3 delivery by 3 weeks" (specified, not built)
- A commercial-manager sign-off before high-value quotes are submitted, and Gate 2 as a Creatio task for a named approver who is a different person from the estimator (separation of duties)
- The Allocation Board: drag lines between delivery events, re-source visually
- Re-adjudication on a warehouse change, touching only the affected lines and making no AI call unless a shortfall remains
- Gate 2 tender-pack generation as a Word printable
- Supplier ETA feeds, ERP write-back, and adjacent industries (commercial fit-outs, hospitality)

---

## 10. Things the narrative session should ask the builder, not assume

- Whether Gate 1 and Gate 2 were finished, and the real numbers from the Corvina run
- Whether the tender-code format changed to TND-26-NNNN before recording, which affects on-screen text
- Whether the dashboard exists
- The final "N escalations" figure for the hero tender
