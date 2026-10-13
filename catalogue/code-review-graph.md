# code-review-graph (reference card)

This entry is a reference card, not vendored code. code-review-graph is a PyPI
package plus MCP server, so the catalogue documents how to install and constrain
it instead of copying it.

## What it is

A code-graph backend for review and impact analysis: it parses a repository with
Tree-sitter into a SQLite graph (callers, dependents, tests), serves the graph
over MCP, and answers structural questions like "what breaks if I change this
function" with deterministic edges instead of text search. It also builds a
markdown wiki and can export an Obsidian vault.

- Upstream: https://github.com/tirth8205/code-review-graph
- Author: Tirth Kanani. License: MIT.
- Audited version: 2.3.7, at pinned commit d9c5f04a34ffbe91f5d8c8ab1c988f5d016e7a3f
  (see catalogue/SOURCES.lock). Audit verdict: safe with constraints
  (evals/dissection/5-anthropic-gsd-crg.md, section 3). The audit applies to this
  checkout only.

## Install constraints

Follow all six. They come from the security audit, not from preference.

1. Pin the audited version: `pip install code-review-graph==2.3.7`, and review
   diffs before any upgrade. The installer wires the binary into PostToolUse
   hooks, SessionStart, and a git pre-commit hook, so a future malicious release
   would execute on every edit and commit. Supply-chain trust is the headline
   risk.
2. Local embeddings only. Cloud providers (openai, google, minimax, voyage) send
   repository code to that endpoint. Even local mode downloads a model from
   Hugging Face on first embed. Never set CRG_ALLOW_REMOTE_CODE.
3. Cap the tool surface. The 30-tool default costs about 8k schema tokens per
   turn. Ship the 5-tool allowlist:
   `CRG_TOOLS=query_graph_tool,get_impact_radius_tool,detect_changes_tool,get_review_context_tool,semantic_search_nodes_tool`
4. apply_refactor_tool mutates files. Run it with dry_run first, or exclude it
   via the allowlist (the default allowlist above already excludes it).
5. Run `code-review-graph install --dry-run` first, and know that a real install
   adds a git pre-commit hook. Users rarely expect an MCP install to touch
   commit flow.
6. Prefer stdio serve. If you use `--http`, keep the default loopback bind
   (127.0.0.1).

## Routing

kstack's blast-radius skill uses code-review-graph's impact tools when they are
installed (get_impact_radius_tool in the tool list, or .code-review-graph/graph.db
present), and falls back to its manual procedure otherwise. blast-radius is the
default methodology; this package is the optional structural backend.
