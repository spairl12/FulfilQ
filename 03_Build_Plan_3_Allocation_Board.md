# Build Plan 3: The Call-Off Allocation Board
### Standalone Angular micro-frontend. Executed in its own Claude Code session.

**Component:** `usr-calloff-allocation-board`
**Sessions:** Phase 0 on Mon 22 and Tue 23 Sep. Phase 1 on Sat 27 Sep.
**Blocked by:** Build Plan 1 Step 7. Do not start until the verification gate has passed and the objects exist.

---

## 0. Why this component exists, and the native check

Freedom UI can already render a list grouped by call-off phase with colour-coded status. If all you need is "see the lines grouped by phase", **build that instead and stop reading.**

This component earns its build because it needs three things Freedom UI does not do natively:

1. **Drag a line between phases** and have the re-phasing write back
2. **Reassign a line's source location** from a cascade of options, with live stock meters per location
3. **Show a split fill** as a segmented bar: 99 units from Melbourne West DC, 46 across four retail stores, on one card

It also carries three narrative jobs at once, which is why it beat a standalone stock board: it visualises phasing, it visualises the sourcing cascade including store fallback, and it is **how the warehouse-manager constraint change appears on screen**.

---

## Phase 0. Build and prove standalone (no live Creatio)

**Critical discipline: Phase 0 does not touch the instance.** Synthetic data only, hardcoded in the component. Blending build and live-wiring into one pass is what causes multi-hour stalls.

### Step 0.1. Pin the Angular version

Check the existing Flat Plan component's build config for the Angular version and `@creatio-devkit/common` version it was built against. **Match it.** A version mismatch surfaces at Phase 1 wiring time, which is the worst possible moment.

If the Flat Plan export is not to hand, ask before guessing.

> The compiled Flat Plan bundle is a **packaging-convention reference, not a code source.** Do not try to reverse-engineer its logic. Reuse the module federation config shape and rebuild the component logic fresh against this spec.

### Step 0.2. Scaffold

Standard Angular CLI project. Module federation exposing the component as a remote under the custom element name `usr-calloff-allocation-board`.

Use **native HTML5 drag-and-drop events**, not Angular CDK drag-drop. The spec needs drag between containers, not sortable reordering, and native events are simpler to build and debug in one session.

### Step 0.3. The visual spec

```
┌──────────────────────────────────────────────────────────────────────┐
│  Corvina Quarter Stage 2   ·   44 lines   ·   $8.15M                 │
│  [All] [Escalated 3] [Multi-source 3] [Substituted 10]               │
├────────────────────┬────────────────────┬────────────────────────────┤
│ PHASE 1            │ PHASE 2            │ PHASE 3                    │
│ Plumbing rough-in  │ Fitout L1-18       │ Penthouse finishes         │
│ 24 Dec 2026        │ 15 Apr 2027        │ 01 Jul 2027                │
│ 12 lines · $1.1M   │ 26 lines · $6.2M   │ 6 lines · $0.85M           │
├────────────────────┼────────────────────┼────────────────────────────┤
│ ┌────────────────┐ │ ┌────────────────┐ │ ┌────────────────┐         │
│ │ 014 Basin Mixer│ │ │ 001 Wall Oven  │ │ │ 040 Wine Cab.  │         │
│ │ Brightwater    │ │ │ Valdora 600mm  │ │ │ Ambrisi        │         │
│ │ ● DC01   138u  │ │ │ ▓▓▓▓▓▓▓░░ split│ │ │ ⚠ NO EQUIVALENT│         │
│ │ ✓ WELS ✓ WMK   │ │ │ DC01 99 · ST×4 │ │ │ escalated      │         │
│ └────────────────┘ │ │ ✓ GEMS 4.5★    │ │ └────────────────┘         │
│                    │ └────────────────┘ │                            │
└────────────────────┴────────────────────┴────────────────────────────┘
```

**Card anatomy:**

| Element | Shows |
|---|---|
| Line number and description | `SPAILineNumber`, `SPAISpecifiedText` |
| Status stripe (left edge) | Green exact, blue multi-source, amber substituted, red escalated |
| Source badge | Single location name, or a segmented bar for a split fill |
| Compliance chips | `✓ WELS` `✓ GEMS` `✓ WMK`, greyed where not applicable |
| Quantity | `SPAIQuantity`, with shortfall in red if any |

**Interactions:**

1. **Drag card between phase columns** → emits `phase-changed`
2. **Click the source badge** → opens a sourcing popover listing locations in cascade order with live stock meters; selecting one emits `source-changed`
3. **Click the card body** → emits `line-selected` so the host page can open the record
4. **Filter chips** at the top filter the visible cards client-side, no event

**Constraint-change state:** when a line's `constraintFlag` is true, the card gets a pulsing red outline and a "source unavailable" ribbon. This is the visual that carries the warehouse-manager beat.

### Step 0.4. Synthetic test data

Build against a hardcoded fixture that mirrors the real shape. It must include at least: one single-source line, one three-way split fill, one escalated line with no source, one substituted line with compliance chips, and one line with `constraintFlag` true.

Derive the fixture shape from `meridian-data-v2/09_hero_schedule_ANSWER_KEY.csv` so Phase 1 has no surprises.

### Step 0.5. The contract

**Do not skip this. It is the actual deliverable that makes Phase 1 possible.**

**Inputs:**

```ts
@Input() phases: {
  id: string;            // Order record Id
  phaseNumber: number;
  phaseName: string;
  targetDate: string;    // ISO
  lineCount: number;
  phaseValue: number;
}[]

@Input() lines: {
  id: string;            // SPAIScheduleLine Id
  lineNumber: number;
  description: string;   // SPAISpecifiedText
  quantity: number;
  shortfall: number;
  phaseId: string | null;
  status: 'exact' | 'multi-source' | 'substituted' | 'escalated' | 'pending';
  reasonCode: string;
  constraintFlag: boolean;
  compliance: { wels: boolean|null; gems: boolean|null; watermark: boolean|null };
  sources: { locationId: string; locationName: string;
             locationType: 'DC' | 'Store'; qty: number; tier: number }[];
}[]

@Input() locations: {
  id: string; name: string; type: 'DC' | 'Store';
  sourcingRank: number; isAvailable: boolean;
  availableQtyByProduct: Record<string, number>;
}[]

@Input() readOnly: boolean    // true once Gate 1 is approved
```

**Outputs:**

```ts
@Output() phaseChanged   // { lineId, fromPhaseId, toPhaseId }
@Output() sourceChanged  // { lineId, sources: [{ locationId, qty }] }
@Output() lineSelected   // { lineId }
```

### Step 0.6. Verify standalone

Build it, run it, confirm every interaction works against the fixture outside Creatio entirely. Problems caught here are cheap. Problems caught while also wiring live data are expensive.

### Step 0.7. Handoff package

- Bundle location and build output
- Custom element tag name
- The contract above, verbatim
- Any deviation from this spec worth flagging before Phase 1

---

## Phase 1. Wire into Creatio (Sat 27 Sep, separate session)

**Do not attempt this in the Phase 0 session.**

1. Upload the compiled bundle into a Source Code schema in `SPAIAdjudicator`
2. Register the component in the Freedom UI Designer library
3. Place it on the `Opportunity` Adjudication tab, below the summary tiles
4. Bind `phases` to the Opportunity's `Order` records, `lines` to `SPAIScheduleLine` with its `SPAILineSource` detail, `locations` to `SPAILocation` with stock
5. Handle `phaseChanged` → update `SPAICallOffOrder`, write a `SPAIDecisionLedger` row of type `Human override`
6. Handle `sourceChanged` → replace `SPAILineSource` rows, write a ledger row
7. Bind `readOnly` to `SPAIGate1ApprovedOn` being populated

**Check before you start:** the Opportunity page must be Freedom UI, not Classic. Embedding a live-bound custom component on a Classic page is not possible without migrating the page first, and that migration is its own project. On a 10x bundle instance this should be fine, but confirm rather than assume.

---

## Fallback if this is cut

Native Freedom UI: the Schedule Lines list grouped by `SPAICallOffOrder`, with the `SPAILineSource` detail expanded on the record page and conditional formatting on status.

It tells the same story with less impact and costs nothing extra, because Build Plan 1 Step 8.2 already builds it. **That is deliberate.** The fallback exists before the component does, so cutting the component on 20 September costs you nothing you had.

---

## Definition of done

**Phase 0:**
- [ ] Angular and devkit versions matched to the Flat Plan reference
- [ ] Component builds and renders standalone
- [ ] Drag between phases works and emits `phaseChanged`
- [ ] Source popover lists locations in cascade order with stock meters
- [ ] Split fills render as segmented bars
- [ ] `constraintFlag` renders the red outline state
- [ ] `readOnly` disables all interaction
- [ ] Contract written out verbatim in the handoff

**Phase 1:**
- [ ] Bundle registered and placed on the Adjudication tab
- [ ] All three outputs write back correctly
- [ ] Every write-back produces a Decision Ledger row
- [ ] Read-only after Gate 1 verified
