# graphify (reference card)

This entry is a reference card, not vendored code. Graphify is a PyPI package
plus CLI/MCP server, so the catalogue documents how to install and constrain it
instead of copying it.

## What it is

A knowledge-graph builder for a whole corpus, not just code: it parses source
files locally with tree-sitter into a graph of concepts and relationships
(calls, imports, inherits, references), folds docs, PDFs, images, and video
into the same graph via a semantic LLM pass, and answers `query` / `path` /
`explain` questions against graph.json instead of grepping files. Every edge
carries a confidence tag (EXTRACTED vs INFERRED). It also detects communities,
writes a GRAPH_REPORT.md, renders an interactive graph.html, and can export a
markdown wiki or an Obsidian vault.

- Upstream: https://github.com/Graphify-Labs/graphify
- Author: Safi Shamsi / Graphify Labs. License: dual Apache-2.0 / MIT
  (LICENSE is Apache-2.0, LICENSE-MIT alongside, per NOTICE).
- Pinned commit: b2cd36267456c166788c95be6e68574064a92a42, cloned 2026-08-21
  (see catalogue/SOURCES.lock). Spot-verified against its README and
  SECURITY.md at that commit: code parsing is local tree-sitter AST with no
  LLM and no network; LLM calls happen only through a user-configured backend
  (or the IDE session's model); the README states "No telemetry, no usage
  tracking, no analytics". One caveat found while verifying: a local (never
  uploaded) query log at ~/.cache/graphify-queries.log — the README's env-var
  table calls it opt-in while its Privacy section describes it as on by
  default; set GRAPHIFY_QUERY_LOG_DISABLE=1 to be sure. The verification
  applies to this checkout only.

## Install constraints

1. Pin the names exactly: GitHub `Graphify-Labs/graphify`, PyPI **`graphifyy`**
   (double-y — `uv tool install graphifyy` / `pipx install graphifyy`).
   Look-alike clones exist; upstream itself warns that other `graphify*`
   packages on PyPI are not affiliated. Do not install anything else that
   sounds like it.
2. For sensitive corpora, keep the semantic pass local: `--backend ollama` (or
   an OpenAI-compatible local server via `OPENAI_BASE_URL`), or skip it
   entirely with `--code-only` — the code graph needs no API key and runs
   fully offline. Cloud backends send doc/PDF/image content to that provider.
3. Treat LLM-backend API keys as environment variables only
   (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, ...). Never put keys on the command
   line or in committed config; graphify itself stores no credentials.
4. Know the side effects: `graphify install` writes skill/instruction files
   and (on hook platforms) PreToolUse hooks; `graphify hook install` adds git
   post-commit/post-checkout hooks. Serve over stdio by default; if you use
   `--transport http`, keep the loopback bind unless you also set `--api-key`.

## When to use it vs code-review-graph

- **graphify** — whole-corpus mapping: code plus non-code artifacts (docs,
  PDFs, images, video) in one graph, community/architecture overviews, wiki
  and Obsidian export. Reach for it when the question is "map everything and
  let me explore it".
- **code-review-graph** — live code review and impact analysis: a
  Tree-sitter-to-SQLite code graph served over MCP with review-oriented tools
  (impact radius, change detection, review context). Reach for it when the
  question is "what breaks if I change this" inside an active review loop.

## Routing

deep-familiarize may use graphify for corpus mapping when it is installed
(`graphify --version` succeeds or graphify-out/graph.json is present), and
falls back to its manual survey procedure otherwise.
