---
name: deep-familiarize
description: "Deep onboarding for a large existing codebase: budget-capped module exploration, a developer interview, then CLAUDE.md and architecture docs future agents can trust. Run once per repo or after a major restructuring."
disable-model-invocation: true
argument-hint: "[repo path] [token budget, default 150k]"
---

# deep-familiarize

Onboard a large hand-written codebase the way a senior engineer would: build a working mental model, not annotated source code. Evidence beats narrative. A comment is a claim, a README is a claim, and every claim gets checked against the code before it is recorded.

## Declare the budget

Say up front how much reading you will do: "I will spend about 150k tokens getting to know this codebase. If I hit the limit, I will stop, write down what I have, and ask before continuing." The argument overrides the 150k default. Hitting the limit means exactly that: write the docs from what was covered, list the areas not read, and wait for the developer's go-ahead.

## Read what already exists

Before exploring: git remote, CLAUDE.md, README, docs/, .claude/kstack/. Existing files are the developer's work; preserve them. CLAUDE.md gets additive lines only, an existing block updated in place, never a rewrite or a duplicate. Existing docs get refreshed sections, never wholesale replacement. Never create AGENTS.md when CLAUDE.md exists. And never document infrastructure you cannot find in the code: a database the README names but the code never opens is a stale claim, recorded as one.

## Keep a progress log

Call the Skill tool with "work-log". This is an obligation, not a habit:

1. One row per module brief, written when that brief is finished; the row is part of finishing the brief.
2. One row per budget checkpoint and per verified claim.
3. Any real run produces at least three rows; a run that ends with fewer has skipped the log, and the developer cannot audit a run they did not watch.

If the Skill tool cannot find work-log, keep tasks/work-log.tsv by hand (ts, phase, decision, why, evidence, result) and carry on.

## Map, then fan out

First pass yourself: directory layout, manifests, entry points, how the app starts, then one implementation path end to end plus its tests; tests reveal intended behavior. Then the complexity gate: a repo one pass covers within budget stays a single pass; a bigger one gets 2 to 4 parallel read-only explorers (the Agent tool, Explore type), one per module or layer, each holding a named slice of the budget. When in doubt, lean simple. Explorers read the actual code, never guess from file names, and stop only when the path from input to output has no hand-waved step. Each reports what the module does, its owning files, its public surface, who calls into it, and anything surprising.

## Hunt what a text search misses

A text search finds literal names; hand-written codebases break in the gaps. Before writing docs, check:

- Dispatch by string or reflection. A search that finds no callers is not proof of no callers: code can be called by name from a table, by reflection, or by a template. Search for the name in quotes and for partial names before believing a function is unused. Every dispatch site found goes in the gotcha column with a warning that its targets must not be renamed or deleted on search evidence alone.
- The dynamic-dispatch gate, mandatory before anything is labeled unused or dead:
  1. Search the symbol's name as a quoted string (`"ExportCsv"`).
  2. Search for string concatenations that could compose it (`"Export" +`, prefix and suffix fragments).
  3. Search for reflection patterns in the codebase: `GetMethod`, `Type.GetType`, `Invoke`, `nameof`, string-keyed dispatch tables, and template or view references (Razor, string templates).
  Only after all three come back empty may a symbol be recorded as dead. A plain-text search with zero hits is not evidence for dispatch-capable code, and any "no callers" claim made without this gate is a defect in the run.
- Dead versus deceptively dead. A method with zero literal references is either genuinely dead or dispatch-called; label which, with the evidence, never just "unused".
- Drifted copy-paste pairs. Two methods with the same shape, often the same comment block: diff them and record what drifted (a skipped case, a rounding, a condition), never just that they look similar.
- Duplicated magic constants. The same literal in several files: record every location; changing one is a bug in the others.
- Stale comments. Verify any comment that claims behavior (caching, retries, ordering) against the code. A comment the code contradicts is recorded as wrong, in those words.
- Shared services. A helper used by more than one feature is blast radius: name every screen or report that moves when it changes.

## Verify before recording

If you can't cite it, it's inference, not fact, and an honest "we couldn't find out why" beats a confident guess. Tag every recorded claim with a tier from references/confidence.md. For history: `git log --oneline -20 -- <file>`, `git blame -L`, and `gh pr view <n> --json title,body,comments` where the remote has pull requests.

## Interview the developer

Call the Skill tool with "interview". If the Skill tool cannot start it (interview is user-invoked in some installs), ask the same questions directly yourself in the interview's numbered format and continue under the same rules. Before the questions, decide whether a reply can arrive, mechanically: an unattended run is launched with `KSTACK_NO_REPLY=1` in the environment (check once with `echo "${KSTACK_NO_REPLY:-}"`); with the flag unset, treat the session as interactive and wait for answers. When the flag is set, the interview's "wait for the user's answers" step does not apply, and this instruction overrides it: print each question round as the record of open questions, take the interview's recommended answers, state them as assumptions in the closing, and CONTINUE THE RUN TO DELIVERY in the same turn, without ending the turn at the round. CLAUDE.md and the three docs below must be written in the same run. Ending the run at a question round is a failure, not caution.

Seed the interview with intent and risk only, never with facts the code answers: what the system is for and who depends on it, what must never change, which areas feel fragile, and why the surprising findings are the way they are. Present each finding with a recommended reading so the developer can confirm in a word.

## Write

Show drafts first. Then produce or refresh:

- `CLAUDE.md`: additive lines only, the minimum an agent must see before editing: the build and test commands actually run this session (with any path quirks; never a command you did not run), pointers to the three docs below, and the dispatch traps in one line each.
- `docs/architecture.md`: the feature map, one row per feature: feature, owning files, gotchas. Every dispatch trap, drifted pair, duplicated constant, and wrong comment lands in the gotcha column of the row it endangers. A `## Vocabulary` section below. Keep the file a digest, under 200 lines.
- `docs/spec.md`: the module inventory, one row per module: module, owner (who to ask, from the interview), public surface, invariants (what must stay true when editing), used by.
- `docs/decisions.md`: seeded with dated `## NNNN <date> <slug>` entries for what the interview settled; only when hard to reverse, surprising without context, and a real trade-off.

Work here later lands as pull requests, so check `gh --version` and `gh auth status`; if either fails, walk the developer through installing the GitHub CLI or `gh auth login`. Once per repo, explain the workflow in two sentences (work lands as a pull request that is reviewed and merged, not as direct commits to main) and record a dated line in docs/decisions.md so no later session repeats it.

## Closing

Tell the developer in plain words what was written or changed, the row counts (features mapped, modules inventoried, gotchas recorded, decisions seeded), and what needs their confirmation: every unproven claim, every comment the code contradicts, every area the budget did not cover.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" deep-familiarize <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the developer reads.

Familiarization complete, docs written. For day-to-day work, call the Skill tool with "koenig". The github-agent-factory skill requires this run's docs; it can now be run on this repo.

If the Skill tool cannot find koenig, say in one plain sentence that the full kstack chain is not installed and end here; the docs stand on their own.
