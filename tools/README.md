# Build tooling: The Adjudicator

Everything here runs against the clio environment `meridian` (register it with `clio reg-web-app`).

| Path | Purpose |
|---|---|
| `import/imp.py` | Seed importer: CSV → DataService `BatchQuery` via `clio call-service`. Ids are deterministic (uuid5 of file + code), so every step is re-runnable and skips rows that already exist. Run `python3 imp.py <step> ...` in this order: `brands families locations drivers accounts contacts products superseded stock rules tenders phases alignment`. |
| `import/verify.py` | Build Plan 1 Step 7 gate: record counts plus verification queries 1–6 (Q5 ≥ 5, Q6 ≥ 3 are blocking). |
| `pages/bodies/*.js` | **Canonical** Freedom UI page bodies as deployed. Save one with `clio` MCP `update-page` (Opportunities_FormPage needs `target-package-uid` = SPAIAdjudicator, or it lands in a virtual package). |
| `pages/gen_*.py` | Generators that produced the first versions of those bodies. `gen_opp.py` is superseded by `bodies/Opportunities_FormPage.js`, which carries later fixes. |
| `../src/cs/` | C# source for `SPAIDecisionLedgerEntityEventListener` (deployed as a source-code schema in SPAIAdjudicator; needs a compile). |
| `../packages/` | Unzipped `clio pull-pkg` exports of SPAIAdjudicator and SPAIMeridianCommercial. Refresh them after every build session. |
