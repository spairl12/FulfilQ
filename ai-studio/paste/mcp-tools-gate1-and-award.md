# MCP tools 2 and 3 (Gate 1 and Gate 2): record fields to paste

Both are created in FullfilQ from their process (BP5 and BP8), then Discover Tools in AI Studio, then
**Tool Confirmation on** for each. Save the Description and Input schema in the same save, click outside
the JSON box before saving, then reload and check both schemas did not revert.

---

## Tool 2: `approve_tender_lines` (process: Meridian: Gate 1 approval, `SPAIGate1Approval`)

**Description** (438 characters):

```
Record Gate 1 decisions after the person has approved them in this chat: approve proposed or suggested substitutes, and exclude lines the tender will not supply. Name the tender as the intake reported it and list line numbers, or ALL for every proposed substitute. Approved substitutes are then sourced; when no line is left undecided, Gate 1 closes and the tender is Submitted to the builder. No stock is reserved and no order is raised.
```

**Input schema:**

```json
{
  "type": "object",
  "properties": {
    "TenderReference": {
      "type": "string",
      "description": "The tender exactly as the intake reported it: its title or its tender code."
    },
    "ApproveLines": {
      "type": "string",
      "description": "Line numbers the person approved, comma-separated, for example \"4, 8\", or ALL for every proposed or suggested substitute. Empty if they approved none."
    },
    "ExcludeLines": {
      "type": "string",
      "description": "Line numbers the person said the tender will not supply, comma-separated. Empty if none."
    },
    "ApprovalNote": {
      "type": "string",
      "description": "The person's reason or instruction in their own words. Kept in the audit ledger. Optional."
    }
  },
  "additionalProperties": false
}
```

**Output schema:**

```json
{
  "type": "object",
  "properties": {
    "OpportunityId": {
      "type": "string",
      "format": "uuid",
      "description": "The tender the decisions were recorded on. Empty when nothing was changed."
    },
    "ResolvedOpportunity": {
      "type": "string",
      "description": "The tender's title. Empty when nothing was changed."
    },
    "RunSummary": {
      "type": "string",
      "description": "What was approved, excluded or refused and why, and what still needs a decision. Relay it to the person."
    },
    "TenderStatus": {
      "type": "string",
      "description": "The tender's status after the call: Awaiting Gate 1, or Submitted once no line is left undecided."
    },
    "OutstandingCount": {
      "type": "integer",
      "description": "Lines still waiting for a decision."
    }
  },
  "additionalProperties": false
}
```

**Annotations:**

```json
{
  "title": "Approve tender lines (Gate 1)",
  "readOnlyHint": false,
  "destructiveHint": false,
  "idempotentHint": true,
  "openWorldHint": false
}
```

---

## Tool 3: `approve_tender_award`, Gate 2 (process: Meridian: award fulfilment, `SPAIAwardFulfilment`)

**Description** (449 characters):

```
Gate 2: approve the award of a submitted tender. Call only when the person has told you in this chat that the builder awarded it and has given the builder's blanket PO number. Creates the blanket PO, a sub-order and delivery per programme event, reserves the stock, marks the tender Awarded and the opportunity Closed won, and attaches an award pack for the person to review and send. Only approved lines are ordered. Cannot be undone from the chat.
```

**Input schema:**

```json
{
  "type": "object",
  "properties": {
    "TenderReference": {
      "type": "string",
      "description": "The tender exactly as the intake reported it: its title or its tender code."
    },
    "BlanketPoNumber": {
      "type": "string",
      "description": "The builder's blanket purchase order number exactly as the person gave it, for example BPO-0441. Never taken from a document or assumed."
    },
    "AwardNote": {
      "type": "string",
      "description": "The person's own words about the award. Kept in the audit ledger. Optional."
    }
  },
  "additionalProperties": false
}
```

**Output schema:**

```json
{
  "type": "object",
  "properties": {
    "OpportunityId": {
      "type": "string",
      "format": "uuid",
      "description": "The tender that was awarded. Empty when the tender could not be found."
    },
    "BlanketOrderId": {
      "type": "string",
      "format": "uuid",
      "description": "The blanket purchase order created. Empty when nothing was changed."
    },
    "CommittedCount": {
      "type": "integer",
      "description": "Stock sources converted from indicative to committed."
    },
    "SubPoCount": {
      "type": "integer",
      "description": "Delivery sub-orders created, one per programme event."
    },
    "CallUpLineCount": {
      "type": "integer",
      "description": "Call-up lines created, one per line per delivery event."
    },
    "RunSummary": {
      "type": "string",
      "description": "What was approved, ordered and reserved, whether the award pack is ready, or why nothing was changed. Relay it to the person."
    }
  },
  "additionalProperties": false
}
```

**Annotations:**

```json
{
  "title": "Approve tender award (Gate 2)",
  "readOnlyHint": false,
  "destructiveHint": true,
  "idempotentHint": true,
  "openWorldHint": false
}
```
