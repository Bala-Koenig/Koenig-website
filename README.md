# kstack

Koenig's curated skill library for Claude Code: scoped, surgical, verified
changes, safe enough for non-technical builders and strict enough for RMS
developers. Version 0.1.0.

Track A is 11 benchmarked skills: 8 model-invoked chain skills (queue the
asks, pin the task to exact files, plan, fence, edit surgically, prove it,
ship a pull request) plus 3 utilities you invoke yourself. Backed by two
mechanical guard hooks, local-only telemetry, and a third-party catalogue of
22 community skills plus 2 reference cards, kept verbatim from their authors.

## Install

Follow `PILOT-GUIDE.md` (about 20 minutes, no coding knowledge needed).
Short version: copy the contents of `skills/a/` into your project's
`.claude/skills/`, copy `scripts/` into `.claude/scripts/` (the skills log
through it), then register the guard hooks per `hooks/README.md`.
Plugin route: `/plugin marketplace add Vardaan97/kstack` in Claude Code, then
install the kstack plugin. For the pilot, the blessed install is the copied
install described in `PILOT-GUIDE.md`; the plugin-marketplace route is still
being finalized.

First run in a project: `/familiarize`. Unsure which skill fits: `/koenig`.

## What is in this folder

| Path | What it is |
|---|---|
| `skills/a/` | The 11 Track A skills: 8 chain skills plus 3 utilities (one folder per skill, SKILL.md each) |
| `SKILLS-OVERVIEW.md` | Plain-words description of every skill and its end result |
| `PILOT-GUIDE.md` | Setup and daily-use guide for pilot users |
| `hooks/` | The two guard scripts, settings snippet, and install README |
| `scripts/` | klog.sh (local telemetry), lint-style.sh, sync-catalogue.sh |
| `catalogue/` | 22 vetted community skills plus 2 reference cards, pinned in SOURCES.lock, with attributions |
| `CREDITS.md` | Every upstream project kstack adapts or redistributes, with licenses |
| `KSTACK-REPORT.md` | The full build-and-validation report: method, numbers, verdicts, limitations |
| `.claude-plugin/` | Plugin and marketplace manifests |

## Evidence

Every skill was benchmarked blind against the community original it grew from,
iterated three times, and the whole chain passed a nine-criterion end-to-end
run including two adversarial probes. `KSTACK-REPORT.md` tells the story;
the raw artifacts live in the working repository under `evals/`.
