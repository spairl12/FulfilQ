# The Adjudicator: Overall Plan  ·  v2
### Creatio Agent Arena Hackathon 2026 · Industry Agent category

**Build window:** 18 to 30 September 2026. Deadline 23:59 ET on 30 Sep, which is approximately **14:00 Melbourne on Wednesday 1 October**.
**Team:** solo
**Competition instance:** `https://189575-crm-bundle.creatio.com/` (Creatio 10x)
**Package:** `SPAIAdjudicator` · **Schema prefix:** `SPAI`
**Credentials:** supplied at runtime, never written into these files. Rotate after judging closes.

---

## 1. The premise

**Meridian Commercial Supply** is a fictional B2B project supply business. It tenders complete appliance, tapware and sanitaryware packages to head contractors building multi-residential towers, retirement villages and student accommodation, and fulfils them from four distribution centres and eight retail stores.

Every company, brand, product, person and project in this build is invented.

**The Adjudicator** adjudicates every line of an architectural finishes schedule: matches it to catalog stock, sources it across the network, proposes a compliant substitution when the specified item is dead or unavailable, phases the delivery against construction milestones, and escalates what it cannot honestly resolve.

### The problem, in one causal sentence

Architectural finishes schedules are drawn 12 to 18 months before a tender is called, so by the time the tender lands a significant share of the specified items are discontinued or facing long factory lead times, and an estimator has to re-solve each one by hand inside a 72-hour tender window.

---

## 2. The architecture, and why it is the entry

Most entries will send everything to the LLM. This one runs a **deterministic pass first**, and only the residue reaches the model.

```
44 schedule lines
      │
      ├─ Extractor (LLM, 1 call) .......... unstructured XLSX → structured lines
      │
      ├─ Deterministic pass (BP, 0 calls)
      │     exact model code match
      │     COMPLIANCE FLOOR: WELS reg, GEMS reg, WaterMark cert, rating parity
      │     sourcing cascade: home DC → other DC → retail store → inbound
      │     cut-out tolerance · lead time · margin arithmetic
      │           ↓
      │     ~27 lines resolved, never touch the LLM
      │
      └─ Adjudicator (LLM, 1 call) ........ the ~17 lines needing judgment,
                                             batched into one round-trip
```

**Two AI Actions per tender.** A naive per-line design would be 45 to 90.

Say the number out loud in the video. It is the clearest evidence of platform understanding you can give a judge assessing "effective use of Creatio AI Studio".

### What the LLM genuinely does

Parse a merged-cell human-formatted XLSX. Resolve `"600mm dishwasher, chrome, or equal approved"`. Recognise `04DW9001X` as a typo. Write a substitution justification an estimator could forward to an architect unedited.

### What the LLM never does

Exact code lookup, compliance verification, stock checks, sourcing allocation, dimensional comparison, margin calculation, lead-time thresholds, phase assignment, gate thresholds. All business process formulas and gateways.

---

## 3. Governance

This is the section the entry is built around. It is a page and a half, not a treatise.

### 3.1 The compliance floor is a database check, not a prompt instruction

A substitution changes what product goes into someone's building. In Australia that is a regulated act, and the regulation is specific and checkable.

| Regime | Requirement | How it binds The Adjudicator |
|---|---|---|
| **WELS** (Water Efficiency Labelling and Standards Act 2005) | Tapware, toilets, showers, urinals and dishwashers must be registered and labelled before supply. Registration is per model. | A substitution is a **different registered model**. `SPAIWelsRegistrationNo` must be present, and the star rating must equal or beat what was specified. |
| **GEMS** (Greenhouse and Energy Minimum Standards Act 2012) | Regulated appliances must meet Minimum Energy Performance Standards and carry the energy label. | `SPAIGemsRegistrationNo` must be present on ovens, cooktops and dishwashers, rating equal or better. |
| **WaterMark** (ABCB certification scheme) | Plumbing and drainage products must be certified to be installed under the National Construction Code. | `SPAIWaterMarkCertNo` required on all tapware and sanitaryware. An uncertified basin mixer cannot be installed however well it fits. |
| **NCC / AS-NZS 3500** | Installation requirements the certified product must satisfy in situ. | Backs the cut-out and fitment constraints. |
| **Australian Consumer Law s18, s29** | Prohibits misleading conduct and false representations about goods. | An "or equivalent approved" substitution presented as equivalent when it is not **is** a false representation. This is the legal weight behind the written justification. |

Every one of these is enforced in BP2 before a candidate ever reaches the model. A prompt instruction can be talked out of. A gateway cannot.

### 3.2 Ranking rule, non-negotiable

Compliance first. Availability second. Finish third. **Margin is disclosed to the estimator and is never a ranking input.** The prompt says so explicitly and the candidate ordering is computed before the model sees it.

An agent that ranked on margin would be quietly substituting products on a customer's specification for the supplier's benefit. That is the failure mode a governance theme exists to prevent, and a sharp judge will go looking for it.

### 3.3 Escalation is a duty, not a fallback

The hero schedule contains one line with no compliant equivalent anywhere in the catalog and two lines whose cut-out dimensions defeat the obvious swap. The agent must return `NO_EQUIVALENT` and `DIM_MISMATCH` and hand them to a human.

**Relaxing a compliance criterion to manufacture a match is a failure, not a solution.**

### 3.4 Design principles, each with the mechanism that implements it

Standard security-engineering discipline, applied to an agent. Each line names something a judge can click on.

| Principle | Mechanism in this build |
|---|---|
| **Fail closed** | The agent refuses rather than relaxing a compliance floor. `NO_EQUIVALENT` is a correct answer. |
| **Least privilege, bounded capability** | Sub-agent tools are the boundary of data access. The candidate set is passed in as a closed list. RBAC governs AI access identically to data access. |
| **Minimise what leaves the trusted context** | The deterministic pass. 27 of 44 lines are resolved inside Creatio and never reach the model. A decision that never reaches the model cannot be hallucinated. |
| **Defence in depth** | The prompt constrains selection to the closed set, **and** BP3 independently validates the returned code against `Product` before writing. Two guardrails where one looked sufficient. |
| **Verifiable decisions** | `SPAIDecisionLedger`: append-only, insert-only permissions, every decision with actor, compliance checks passed, and timestamp. |

Use this vocabulary. Do not attribute it to any vendor's security guide in the submission or the video.

### 3.5 Data handling, proportionate

Bounded LLM context: the model sees what the skill sends it, not the database. Tenant-isolated storage. RBAC. Encryption in transit and at rest, inherited from the platform, never claimed as engineering work.

**On automated decision-making:** the Privacy Act's new transparency obligation (APP 1.7) commences 10 December 2026 and requires disclosure of automated decisions that use personal information and significantly affect an individual's rights. **It does not bite here, and the reason is worth stating:** The Adjudicator decides about products, not people. No individual's rights are determined by it.

Naming a regulation and scoping it out correctly is a stronger signal than pretending it applies.

### 3.6 Two gates

| Gate | Who | Powers |
|---|---|---|
| Gate 1 | Estimator (Tobias Renn) | Review every line, accept or reject each substitution, reassign sourcing, adjust margin, approve |
| Gate 2 | Commercial Manager (Priya Anand) | Required above a value threshold. Generates the tender pack, marks ready for dispatch |

---

## 4. Object model

Native CRM wherever Creatio has a concept, custom only where it does not.

```
Account (Halloran Bright Constructions)
  └─ Opportunity (TND-2026-0141, Corvina Quarter Stage 2)
        ├─ SPAIScheduleLine  ×44        the adjudicated lines
        │     └─ SPAILineSource ×N      split fills across locations
        ├─ Quote → QuoteProduct         the priced submission
        └─ Order → OrderProduct  ×3     the three call-off phases
              └─ SPAIDelivery           the physical drop
```

Supporting: `Product` (extended, 494 SKUs), `SPAILocation` (4 DCs + 8 stores), `SPAIStockPosition` (2,251), `SPAISubstitutionRule` (99), `SPAIDecisionLedger`, `SPAIDriver` (lookup only), `Contact`.

---

## 5. Scope

### In

Schedule extraction · deterministic matching with compliance floor · sourcing cascade including retail store fallback · LLM adjudication with reason codes · substitution against approved equivalences · call-off phasing as Orders · Gate 1 and Gate 2 · the Call-Off Allocation Board · Decision Ledger · one dashboard · re-adjudication on constraint change

### Out

| Cut | Reason |
|---|---|
| Tender portal polling | Not buildable, no credentials, earns nothing |
| Teams meeting booking | Integration cost, no demo payoff |
| Outbound supplier ETA service | Not worth a session |
| Invoices | You do not invoice a tender you have not won |
| Driver module with sections and layouts | Dispatch optimisation is a different problem domain. Lookup only, roadmap slide |
| Custom document generator | Native MS Word printable |
| Third sub-agent for prose | Folded into the Adjudicator's output |
| ERP writeback, adjacent industries | Roadmap and market sizing |

---

## 6. Demo storyboard

Five-minute cap, front-loaded.

| Time | On screen | Beat |
|---|---|---|
| 0:00 – 0:20 | Split screen: the 44-line schedule, then the finished quote, fast-forward | Transformation before explanation |
| 0:20 – 0:45 | Revision C. 180 dwellings. Closes in 72 hours | The problem in the architect's own document |
| 0:45 – 1:10 | Opportunity instantiates, lines populate | Intake |
| 1:10 – 1:45 | 27 lines resolve green. **AI calls counter: 0.** Compliance badges tick through | The architecture beat |
| 1:45 – 2:15 | Three lines split across DC and four retail stores | The sourcing cascade |
| 2:15 – 3:00 | Adjudicator runs once. Amber substitutions with justifications. Two red on cut-out, one red with no equivalent | Substitution and escalation |
| 3:00 – 3:40 | **Allocation Board.** Cards across three phases with source badges. Warehouse manager's change lands, cards turn red, estimator drags and re-sources, re-adjudication fires | The live-system beat |
| 3:40 – 4:15 | Gate 1, margin disclosed not optimised. Gate 2, tender pack generates | Governance and close |
| 4:15 – 4:45 | Decision Ledger scrolls. Summary: 44 lines, 2 AI Actions, 3 escalations a human owns | The metric |
| 4:45 – 5:00 | Creatio capability list | Platform credit |

**If a feature is not in this table, question whether it is being built.**

---

## 7. Timeline

Thirteen days. The Allocation Board is prioritised early per your call, and drafted as a standalone plan so a separate session can execute it.

| Date | Work | Plan |
|---|---|---|
| **Thu 18 Sep** | clio, package, prefix, lookups. **Check instance expiry against 1 to 8 Oct judging** | 1, Steps 0-2 |
| **Fri 19 Sep** | Product extension with compliance fields, custom objects, native object verification | 1, Steps 3-5 |
| **Sat 20 Sep** | Data import, verification gate. **Objects now exist: Plan 3 is unblocked** | 1, Steps 6-7 |
| **Sun 21 Sep** | Freedom UI, sections, Adjudication tab, dashboard | 1, Step 8 |
| **Mon 22 Sep** | Allocation Board Phase 0, standalone Angular | **3** |
| **Tue 23 Sep** | Allocation Board Phase 0 complete and verified standalone | **3** |
| **Wed 24 Sep** | Deterministic BPs, sourcing cascade, phase allocation, gates | 1, Step 9 |
| **Thu 25 Sep** | Governance KB, Extractor sub-agent, five clean extraction runs | 2, A |
| **Fri 26 Sep** | Adjudicator sub-agent, prompt iteration against the answer key | 2, B |
| **Sat 27 Sep** | BP1 intake and BP3 adjudication wiring. Allocation Board Phase 1, wire live | 2, C + 3 |
| **Sun 28 Sep** | Re-adjudication on constraint change. **SCOPE FREEZE end of day** | 2, D |
| **Mon 29 Sep** | Five scored end-to-end runs. Fix only | test |
| **Tue 30 Sep** | Record, cut, write up, submit | video |
| **Wed 1 Oct** | Buffer until 14:00 Melbourne. Not working time | buffer |

### Honest note on slack

There is none. The board costs two days and they came out of the buffer. If Sunday 20 September ends without the verification gate passing, drop the Allocation Board that night rather than compressing the test day. **Monday 29 and Tuesday 30 are not negotiable.**

### Cut order

1. Dashboard
2. Re-adjudication segment (falls back to a list refresh)
3. Gate 2 document generation (pre-built PDF attachment)
4. Allocation Board (falls back to a native Freedom UI list grouped by phase)

**Never cut:** extraction, the deterministic pass with compliance floor, substitution, sourcing cascade, Gate 1, the escalation lines.

---

## 8. Risk register

| Risk | Mitigation |
|---|---|
| Instance expires before 8 October | **Check today.** Request extension from organisers now |
| `Quote` or `Order` absent from this bundle | Plan 1 Step 5 verifies before depending on them. Fallback to custom objects is specified there |
| Extractor returns inconsistent JSON | Structured output schema. Tested on day 1 of the agent layer, five runs |
| Adjudicator invents a SKU | Closed candidate set in, plus independent validation against `Product` before write |
| Allocation Board eats the test day | Hard gate: if the 20 Sep verification fails, the board is dropped that night |
| AI allowance exhausted by testing | Two calls per run by design. Test deterministic paths with sub-agent elements disabled |
| Angular version mismatch with the instance | Plan 3 Phase 0 pins the version against the Flat Plan reference before building |

---

## 9. Submission checklist

- [ ] Judge test credentials created and verified from a private window
- [ ] Instance confirmed live through 8 October
- [ ] Video under 5 minutes, no copyrighted audio
- [ ] Write-up: features, Creatio capabilities used, roadmap
- [ ] Repository URL if the rules require one
- [ ] No real company, brand, person or vendor security guide named anywhere
- [ ] No AI Action counts, plan names or Creatio pricing quoted
- [ ] Package exported and committed

---

## 10. What is estimated and what is not

The AI Action figures are **design-time counts of LLM round-trips**, for comparing this design against a naive one. They are not a billing forecast. Do not quote Creatio plan allowances or pricing in the submission.

The Creatio.ai terminology here follows the 8.3.4-onward naming (Sub-Agent, AI Tool, Sub-agent element). Where this document and the 10x UI disagree, **the UI wins**, and the write-up uses whatever the UI says.
