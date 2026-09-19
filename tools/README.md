# Build tooling: The Adjudicator

Everything here runs against the clio environment `meridian` (register it with `clio reg-web-app`).

| Path | Purpose |
|---|---|
| `import/imp.py` | Seed importer: CSV → DataService `BatchQuery` via `clio call-service`. Ids are deterministic (uuid5 of file + code), so every step is re-runnable and skips rows that already exist. Run `python3 imp.py <step> ...` in this order: `brands families locations drivers accounts contacts products superseded stock rules tenders alignment fulfilment callup_lookups corvina_programme kelmore_programme kelmore_subpos kelmore_lines kelmore_callups`. One-off migrations: `retire_phases` (trade-phase orders), `retire_v3` (the superseded v3 load), `rules_v2fix` (swap the original 99-rule register for the corrected 45). Master data is `meridian-data-v2/`; the delivery programme and Kelmore fulfilment are `meridian-data-v4/` 20–27 (Addendum A). v3 is not used. |
| `import/verify.py` | Build Plan 1 Step 7 gate: record counts plus verification queries 1–6 (Q5 ≥ 5, Q6 ≥ 3 are blocking), then the Foundation Change Spec queries FS Q1–Q6 and Addendum A checks A6-1..6 plus the rule-floor count. |
| `data/gen_order_schedule.py` | Fictional inbound PO email + call-up order schedule for Corvina (BPO-0441, one sub-PO per delivery event on the v4 builder programme). |
| `pages/bodies/*.js` | **Canonical** Freedom UI page bodies as deployed. Save one with `clio` MCP `update-page` (Opportunities_FormPage needs `target-package-uid` = SPAIAdjudicator, or it lands in a virtual package). |
| `pages/gen_*.py` | Generators that produced the first versions of those bodies. `gen_opp.py` is superseded by `bodies/Opportunities_FormPage.js`, which carries later fixes. |
| `../src/cs/` | C# source-code schemas in SPAIAdjudicator (each needs a compile): `SPAIDecisionLedgerEntityEventListener` (insert-only ledger) and `SPAIItemIdentityEntityEventListener` (Display ref + remaining qty on schedule and order lines). |
| `../docs/` | KS1 §2.9 availability clause and AI Twin boundary block. |
| `../packages/` | Unzipped `clio pull-pkg` exports of SPAIAdjudicator and SPAIMeridianCommercial. Refresh them after every build session. |
