# Agent "The Adjudicator": configuration values

Every field of the agent, the literal value to enter, and where the value comes from. The run sheet (`02a_Agent_And_Skills_Run_Sheet.md` §4) walks through these in UI order.
Field names come from the native `ai-studio-agent-composer` export (v1, exported 2026-09-19). The label shown in the UI is marked **verify in UI** wherever the export gives only the config key.

| # | Config key (export) | UI label | Value | Source |
|---|---|---|---|---|
| A1 | name | Name (verify in UI) | `The Adjudicator` | 02 §3 role line "You are The Adjudicator" |
| A2 | `promptMode` / `inlinePrompt` | **System Instructions** (label named in composer Key rules) | Paste the whole of `system-instructions.md` | Composer system-prompt scaffold + Governance Blocks 1 and 5 verbatim |
| A3 | `conversationStart.welcomeTitle` | Welcome title (verify in UI) | `Adjudicate a tender schedule` | Composer 4a: 3-7 words, business purpose |
| A4 | `conversationStart.welcomeMessage` | Welcome message (verify in UI) | `Send me a finishes schedule to transcribe, or a set of unresolved schedule lines with their pre-screened candidate products to adjudicate. Every line comes back with a reason code; where compliance cannot be proven I escalate to an estimator rather than guess.` | Composer 4a |
| A5 | `publicProfile.description` | Description (verify in UI) | `Transcribes construction finishes schedules and adjudicates unresolved tender lines against a closed, pre-screened candidate set, escalating whenever compliance cannot be proven.` | Composer 4a: one-sentence catalogue summary |
| A6 | `publicProfile.fullDescription` | Full description (verify in UI) | See **A6 text** below | Composer 4a: 2-4 paragraphs covering capabilities, inputs, outputs and boundaries |
| A7 | `publicProfile.examplePrompts` | Example prompts (verify in UI) | See **A7 prompts** below (3 items) | Composer 4a: 3 safe, realistic prompts |
| A8 | `profileSummary` | none (mirror) | Same text as A5 | Composer 4a: "mirror publicProfile.description" |
| A9 | `profileDetails` | none (mirror) | Same text as A6 | Composer 4a: "mirror publicProfile.fullDescription" |
| A10 | `publicProfile.avatarIcon` | Icon (verify in UI) | `double-check` | Composer 4b valid key list. Stands for verified decisions; not `workflow`, which is reserved |
| A11 | `publicProfile.avatarColor` | Color (verify in UI) | `navyBlue` | Composer 4b valid key list. Not the `sparkles`/`burntCoral` default pair |
| A12 | `modelId` | Model (verify in UI) | Leave at the platform default | Composer Key rules: "When no model is specified, omit the modelId field" |
| A13 | `maxIterations` | none | Leave unset (default 200) | Composer Key rules: "Omit it" |
| A14 | Knowledge sources | Knowledge (verify in UI) | Attach **KS1 Substitution Governance Policy**, **KS2 Regulatory Compliance Reference**, **KS3 Substitution Precedent Register** | Already uploaded; knowledge-manager export |
| A15 | `memory.enrichmentEnabled` | Enrichment (verify in UI) | On | Composer 3a: "Set memory.enrichmentEnabled: true" |
| A16 | `memory.topK` | Top K / results (verify in UI) | `5` | Composer 3a: "memory.topK: 5" |
| A17 | Citations preference | Citations (verify in UI) | On | Knowledge-manager export: "citations preference captured" |
| A18 | `config.tools`: hosted tools | Tools (verify in UI) | **Remove** web search, code execution and image generation | Composer 3a: platform seeds these; "Honor an explicit opt-out". Governance: closed-set rule, Block 5 bounded context |
| A19 | Creatio CRM read tools (default-attached) | Tools or Integrations (verify in UI) | **Remove all** | Composer 3b: attached automatically at creation. Governance Block 5: "It has no open query path to the database" |
| A20 | Creatio CRM write tools (attached if tenant-enabled) | Tools or Integrations (verify in UI) | **Remove all** (confirm none are listed) | Governance Block 1 out-of-scope list; 02b rule 1 |
| A21 | Integrations | Integrations | None | 02b rule 1: no write path to a customer-facing artefact |
| A22 | Skills | Skills | Attach `Schedule Extractor` (`spai-schedule-extractor`) and `Adjudicator` (`spai-adjudicator`). Nothing else | Design rule: two skills, not more |
| A23 | Scope | Scope (verify in UI) | The narrowest scope that still lets the BP run-as user and the demo users invoke the agent | Knowledge form offers Personal or wider; confirm the agent form's options |
| A24 | Agent mode | (verify in UI) | Whichever mode the BP invocation element requires (Step 0, R3) | Skill `compatibility`: sdk, builder, flow |
| A25 | Draft | Save draft version (verify in UI) | Save after A1-A24 | Composer step 6 |
| A26 | Deploy | Publish / Deploy (verify in UI) | Deploy to this environment only after Test Gate 1 passes | Composer step 7 |

## A6 text (full description)

```
The Adjudicator handles the two judgement steps in Meridian's tender pipeline. It transcribes a head contractor's finishes schedule into structured lines exactly as written, and it adjudicates the schedule lines that deterministic matching and the sourcing cascade could not resolve.

For adjudication it receives every unresolved line of a tender in one request, together with a closed set of candidate products that the business process has already screened against the compliance floor, the human-approved substitution rules, network stock for those candidates and the governing policy. It returns one verdict per line: a reason code, the selected product (only ever one from the supplied set, or none), a confidence, and a one-sentence justification an estimator can forward to an architect.

It never searches the catalogue, never sets price or margin, never communicates with customers and never approves anything. Margin is disclosed to it but is never a reason for a selection. Where compliance cannot be proven it escalates, and an estimator reviews the line at Gate 1 before anything leaves the business.
```

## A7 prompts (example prompts)

| Title | Prompt |
|---|---|
| Transcribe a schedule | `Transcribe the attached finishes schedule for Corvina Quarter Stage 2 into schedule lines.` |
| Adjudicate unresolved lines | `Adjudicate these unresolved schedule lines against the supplied candidate products, substitution rules and network stock.` |
| Explain an escalation | `Under the Substitution Governance Policy, why is DIM_MISMATCH a correct outcome rather than a failure?` |

Prompts 1 and 2 need their input attached or pasted; with no input the agent replies that the input is missing (Core workflow step 1). Prompt 3 is answered from KS1 only.
