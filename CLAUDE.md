# The Adjudicator — Meridian Commercial Supply (Creatio build)

Instance `https://189575-crm-bundle.creatio.com/` · clio environment `meridian` · packages `SPAIAdjudicator`, `SPAIMeridianCommercial` · prefix `SPAI`

## Start of every session

1. Read `02d_Session_Status_Report.md` — the current handoff: what is built, what is on disk only, what is next.
2. Read `../graphify-out/GRAPH_REPORT.md` — a one-page map of the whole project (plans, specs, knowledge sources, code), grouped into communities.
3. Do **not** bulk-read the numbered plan docs (`00_`–`03_`) up front. Find the specific section you need first (below), then open only that.

## Finding things: query the graph before opening files

The knowledge graph lives one folder up, so every command needs `--graph`:

```bash
graphify query "<question>" --graph ../graphify-out/graph.json --budget 1500
graphify explain "<node name>" --graph ../graphify-out/graph.json
graphify path "<node A>" "<node B>" --graph ../graphify-out/graph.json
```

- Use the `src=` paths in the output to decide which files to open, then read only those.
- Graph edges tagged INFERRED or AMBIGUOUS are guesses; confirm against the source file before relying on them.
- The graph is a snapshot and can be stale. The files on disk and the live instance (via clio) are the source of truth.

## Where things are

| Path | What |
|---|---|
| `00_Overall_Plan_1.md` | Overall plan, demo storyboard, risk register |
| `01_Build_Plan_1_Infrastructure_1.md` | Data model, objects, pages |
| `02a_Agent_And_Skills_Run_Sheet.md` | AI Studio agent + both skills (paste texts in appendices) |
| `02c_Business_Process_Run_Sheet.md` | All nine business processes, element by element |
| `02e_MCP_Tool_Wiring_Map.md` | MCP tools and the Gate 2 approval split |
| `03_Build_Plan_3_Allocation_Board.md` | Call-off allocation board (Angular micro-frontend) |
| `ai-studio/skills/`, `ai-studio/agents/` | Skill and agent sources (source of truth; `ai-studio/dist/` is a derived copy) |
| `ai-studio/bp-scripts/*.cs` | Script task bodies — pasted into the designer, not compiled class files |
| `ai-studio/tests/` | Test Gate scorers |
| `tools/` | Page generators, data import, master-data fixes (see `tools/README.md`) |
| `src/cs/` | Compiled C# source (e.g. the decision ledger event listener) |

## Do not read

- `packages/` — ~2,600 clio-exported files (localisation JSON, descriptors). Use clio MCP tools (`get-entity-schema-properties`, `get-page`, etc.) to inspect the live schema instead, or grep for one specific name.
- `backup/`, `meridian-data-v*/` raw data, `*.zip` — only when the task is specifically about them.

## End of every session

- Update `02d_Session_Status_Report.md` with what changed, what is built in the instance vs. only on disk, and the next step. The next session starts from it.
- If plan/spec docs changed, tell the user to refresh the graph: run `/graphify --update` from the parent `Creatio Hackathon` folder. For code-only changes, `graphify update ..` is enough (no LLM cost).
