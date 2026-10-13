# kstack third-party catalogue

Skills from other authors that are good enough to ship as they are: 22
community skills, kept verbatim, plus 2 reference cards (code-review-graph.md
and graphify.md). Each folder holds a copy of the upstream skill plus an
ATTRIBUTION.md naming its source, license, and any deliberate differences.
Pins live in SOURCES.lock.

| Entry | What it does | Author | License | Upstream |
|---|---|---|---|---|
| grilling | Questions you in numbered rounds until a plan or idea has no unexamined branch | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| grill-me | One-line shortcut that starts a grilling interview | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| grill-with-docs | The grilling interview, plus decision records and a glossary written as you go | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| wait-what | Makes the agent re-explain its last message in plain words when it did not land | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| diagnosing-bugs | A step-by-step loop for hunting hard bugs and slowdowns, with a human in the loop | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| handoff | Packs up the current conversation so a fresh session can pick up the work | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| wizard | Builds an interactive terminal walkthrough for steps only a human can do, like signing in to a dashboard | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| writing-for-agents | How to write documents that agents actually follow, including skills themselves | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| git-guardrails | A hook that blocks dangerous git commands before they run | Matt Pocock | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| unslop | Cuts AI-sounding phrasing from any writing | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| bro | Restates the last message in plain human language, no jargon | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| tdd | Writes a failing test before the fix, when a cheap test target exists | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| technical-writing | A layered standard for docs, readmes, and PR descriptions | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| principle-fix-root-causes | Trace every problem to its cause and fix it there, not at the symptom | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| principle-prove-it-works | Check the real result before saying something is done | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| principle-guard-the-context-window | Keep bulk output out of the main conversation so it stays sharp | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| principle-laziness-protocol | Prefer the smallest change and deletion over new layers | Lauren Tan (poteto) | MIT | [cursor/plugins, pstack](https://github.com/cursor/plugins) |
| karpathy-guidelines | Habits that prevent common AI coding mistakes: ask first, keep it simple, touch only what you must | Forrest Chang, from Andrej Karpathy's guidance | MIT | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) |
| systematic-debugging | Find the root cause before writing any fix, in four phases | Jesse Vincent | MIT | [obra/superpowers](https://github.com/obra/superpowers) |
| verification-before-completion | No "done" without fresh evidence shown first | Jesse Vincent | MIT | [obra/superpowers](https://github.com/obra/superpowers) |
| code-review-graph | Reference card for an installable code-graph backend that answers "what breaks if I change this" (not vendored; see code-review-graph.md) | Tirth Kanani | MIT | [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) |
| graphify | Reference card for an installable tool that maps a whole corpus (code, docs, PDFs, media) into a queryable knowledge graph (not vendored; see graphify.md) | Safi Shamsi / Graphify Labs | Apache-2.0 / MIT | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) |
| karpathy-autoresearch | Autonomous iteration loop that makes one change, measures it, and keeps or reverts it, with 13 subcommands | Udit Goenka, from Andrej Karpathy's autoresearch loop | MIT | [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) |
| karpathy-llm-wiki | Personal knowledge base the agent maintains: ingest sources into raw/, compile wiki articles, query with citations, lint | Yuhan Lei (Astro-Han), from Andrej Karpathy's LLM Wiki idea | MIT | [Astro-Han/karpathy-llm-wiki](https://github.com/Astro-Han/karpathy-llm-wiki) |

One warning before installing from this table: git-guardrails' hook blocks
every `git push` in any form (catalogue/git-guardrails/scripts/block-dangerous-git.sh),
so installing it globally dead-ends every kstack task at the PR-push step.
Scope it to force-push only, or let the kstack guard cover it.

## How these differ from kstack's own skills

kstack's own skills (under skills/) are written for the kstack chain and follow
its house style. Catalogue entries are other people's work kept verbatim: same
words, same headings, same voice as upstream, apart from a few tiny recorded
fixes listed in SOURCES.lock under "# Deviations". They are synced from pinned
upstream commits by scripts/sync-catalogue.sh, which compares each upstream
against its pin and proposes diffs; nothing moves on its own.

## Security stance

Every file here was read and vetted before it was copied in, including all
shell scripts. Entries added on or before 2026-08-20 were checked against the
dissection reports in evals/dissection/; the three entries added 2026-08-21
(graphify, karpathy-autoresearch, karpathy-llm-wiki) were read in full and are
covered by evals/dissection/6-graphify-karpathy-aug21.md.

Most entries are inert markdown that only instructs the agent and touches
nothing itself. Three act on the network or on your repo by design; each one's
ATTRIBUTION.md spells out what it does and why:

- karpathy-llm-wiki fetches URLs during Ingest (its SKILL.md says "Always
  fetch").
- karpathy-autoresearch commits and reverts experiments in your git repo as
  part of its loop.
- wizard opens URLs in the browser and writes GitHub secrets via `gh secret set`.

Keep these three off a non-technical owner's default set; they are for
developers who opt in knowingly.

When sync-catalogue.sh finds upstream changes, a human reads the diff
before any pin moves; the pins in SOURCES.lock never advance automatically.
