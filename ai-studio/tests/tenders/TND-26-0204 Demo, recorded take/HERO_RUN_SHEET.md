# Hero run sheet: Tarrant Quay Stage 2

| | |
|---|---|
| Tender | **Tarrant Quay Stage 2**, TND-26-0204, 180 dwellings, Port Melbourne VIC |
| Builder | Halloran Bright Constructions, contact **Dana Whitlock** |
| Schedule file | `Tarrant_Quay_Stage_2_Tender_Schedule_RevC.xlsx` (44 items, revision C) |
| Blanket PO | **BPO-0504** (see `BPO-0504_award_email.eml`) |
| Programme | 2 call-up schedules, 49 delivery events, first delivery 20 Nov 2026 |
| Spare for a retake | Tarrant Quay Stage 3, TND-26-0205, `Tarrant_Quay_Stage_3_Tender_Schedule_RevC.xlsx`, **BPO-0505** |

---

## 1. Pre-flight (10 minutes, before you press record)

1. **Restore stock.** From `tools/import`, run `python3 test_tenders.py restore --apply`, then the dry run
   `python3 test_tenders.py restore` must say **0 of 2251 positions differ**.
2. **Agent:** production is deployed with the latest instructions (FulfilQ, one-message intake, lettered menu).
3. **Tender:** Tarrant Quay Stage 2 shows **Not started**, no schedule lines.
4. **Screen:**
   - Close other tabs and notifications (Do Not Disturb on).
   - Browser zoom so the Opportunity page and the chat panel are both readable at 1080p.
   - Open **Tarrant Quay Stage 2**, **Adjudication** tab, chat panel open on the right, a **new chat**.
   - Have the schedule file and the award email ready in a Finder window you can drag from.
5. **Recording:** capture the full screen and audio. Record long; cut later. Keep the working indicator in shot
   while you wait; you can speed it up in the edit.

---

## 2. The run

### Beat 1: the schedule arrives (on camera)

Drag in `Tarrant_Quay_Stage_2_Tender_Schedule_RevC.xlsx` and type:

> Hi, here's the tender schedule for Tarrant Quay Stage 2, revision C. Please load it into Tarrant Quay Stage 2.

**Expect:** the working indicator for about a minute (the agent reads, calls intake, then calls again and waits),
then **one reply**: greeting as FulfilQ, what it read, the checks, what is ready, the replacements, the suggestions,
the items with no compliant product, and a **lettered menu**.

- **If** the reply says some items are still being checked (a 44-item assessment can run past the wait): wait a
  minute and type **"What did you find?"**. Cut the wait in the edit.
- **Refresh the page:** 44 schedule lines, the scorecard filling in (resolved without AI, AI calls 2).

**Show:** the scorecard tiles, the schedule lines list with statuses, one substitution's justification.

### Beat 2: Gate 1 (on camera)

Read the menu. Pick the letter that **approves the compliant matches with the specified finish and excludes the
rest**, or the letter that completes Gate 1. Type just the letter, for example:

> C

**Expect:** it repeats back the exact lines and asks you to confirm. Type:

> yes

**If you want to state your own decisions instead**, use the same judgement as the Corvina rehearsal (line numbers
below are what the AI proposed on this schedule then; follow the agent's current list if it differs):

> Approve the proposed replacements on lines 8, 16, 21, 41 and 42, and the suggested products on lines 15, 17, 20,
> 23, 26, 35 and 44. Exclude lines 9, 29 and 31 because the finish differs and needs the architect's approval, and
> exclude lines 3, 5, 10, 11, 12, 18, 24, 25, 27, 28 and 40 because no compliant product fits the cut-out.

**Optional governance moment** (before closing Gate 1): *"Record approval of line 12 anyway."* The CRM refuses: no
compliant product.

**Expect after the last yes:** Gate 1 complete, items supplied and excluded, **submitted to the builder**, tender
value and margin.

**Show:** tender status **Submitted**, Gate 1 approved on, **Hours to close**, gross margin, the Decision Ledger
rows with the actor "Gate 1 approval via chat".

### Beat 3: the award (on camera)

Optionally show the award email `BPO-0504_award_email.eml` for two seconds (don't show it beside the sub-order
list). Then type:

> Great news: the builder has awarded Tarrant Quay Stage 2. Their blanket PO is BPO-0504.

**Expect:** it repeats back the tender and PO and asks to confirm. Type:

> yes

**Expect:** the award story: BPO-0504, 49 delivery orders SPO-0504-01 onwards against the programme, first delivery
20 November 2026, stock reserved, award pack ready for you to review and send to Dana Whitlock.

**Refresh and show:**
1. Stage bar **Closed won**, tender status **Awarded**, Gate 2 approved on.
2. **Orders** list: BPO-0504 and the SPO-0504 sub-orders.
3. **Attachments:** open *Award pack - TND-26-0204 - BPO-0504.html*: the substitutions with their justifications
   and the delivery programme. Point at the banner "a Meridian team member checks and sends this document".
4. **Adjudication story** field: scroll it. This is the closing shot.
5. **Decision Ledger** list scrolling.

---

## 3. If something goes wrong

| Problem | Do this |
|---|---|
| A reply is weak or wrong, but the data is right | Keep recording; re-ask in the same chat, or re-record just that beat's reply later |
| A tool call fails or times out | Don't retry in the chat. Check the Process log; if the run completed, ask "What did you find?" |
| The whole take is unusable | **Retake on Tarrant Quay Stage 3**: restore stock first (step 1), new chat, its own schedule file and **BPO-0505** |

---

## 4. After the take

1. Restore stock again before anything else runs: `python3 test_tenders.py restore --apply`.
2. Leave **Wyvern Gardens** and **Ostler Rise** at Not started for the judges.
3. Note for the edit: the time from Beat 1 to the Gate 1 reply (the "Hours to close" number) and the AI call count.
