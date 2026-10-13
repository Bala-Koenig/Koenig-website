---
name: work-log
description: "Keep a TSV decision trail (tasks/work-log.tsv) during long or unattended runs so the work can be audited later. Use when a run will outlive one sitting, runs headless, or another skill routes its audit trail here."
---

# work-log

For work a human reviews after the fact, a decision trail lets them reconstruct what was decided, why, and on what evidence, without rerunning the work or reading the whole transcript. One canonical log: `tasks/work-log.tsv`. Rows are for the record, not the owner's chat: never narrate rows or paste the log into messages; the owner-facing closing stays one plain paragraph.

## Format

A single TSV file, one row per decision. TSV because GitHub renders it as a sortable table, `column -s$'\t' -t` and spreadsheets read it, and a row appends with one command. Cells stay single-line. Evidence is a pointer, not prose: a commit SHA, a PR number, a `file:line`, or for non-code work a link, a file path, a screenshot name.

Columns:

- **ts.** ISO8601 timestamp. The timeline axis.
- **phase.** The phase or workstream.
- **decision.** What was chosen or done, one line.
- **why.** The reason in plain words, never a jargon tag.
- **evidence.** The pointer that proves it. Never a paragraph.
- **result.** The outcome or state: `tests green`, `reverted`, `INCONCLUSIVE`, `open`.

An example, illustration only; do not copy these rows into a real log:

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	counted the work first, about 100 components	wanted to know the size before starting a long run	commit 3a9f1c2	found 5 things to sort out before starting
2026-05-24T12:30:00Z	widget	threw out a helper's work because its screenshots were blank	checked the real files instead of trusting its summary	worktree reset	reverted, tightened the instructions for next time
```

## Logging a row

Use the shipped helper so rows stay well-formed: `bash "${CLAUDE_PLUGIN_ROOT}/skills/b/work-log/scripts/wlog.sh" <phase> <decision> <why> <evidence> <result>`. It stamps `ts`, writes the header on first use, strips stray tabs and newlines, and prefixes any cell starting with `=`, `+`, `-`, or `@` with a single quote so a reviewer opening the log in a spreadsheet does not trigger formula execution. If the helper is missing, append with a plain `printf` to `tasks/work-log.tsv` and guard those same bytes yourself.

Write each row the way you would tell a teammate what you did; the speak-plain rules apply to log text too. Log decision points and checkpoints, not every action: a fork chosen, a unit completed with its verification result, a pivot or revert with its trigger, a blocker surfaced. For loop runs, one row per iteration. Skip the trivial and self-evident.

## Where it lives

`tasks/work-log.tsv` stays out of git with the rest of `tasks/`; most work only needs the local trail to keep the run honest. When the work is ambitious enough that a reviewer needs the trail to trust the result, copy the file to a committed path in the PR branch so it renders as a table in the PR.

## Rules

- One row is one decision or checkpoint. If it does not fit on one line, the decision is not crisp yet.
- Append-only. A wrong call gets a new row that supersedes it. Never edit or delete history.
- Prefer evidence produced by committed scripts over hand-made one-offs, so a reviewer can re-run it.

## Audit before handing back

Check the log told the truth. Read this run's transcript under `~/.claude/projects/<encoded-cwd>/*.jsonl`; do not glob across `~/.claude/projects/`, that reads unrelated private chats. Every row maps to a real action; every evidence pointer resolves and shows what the row claims; an unlogged fork or pivot that shaped the work is a gap, add it; padding that nobody would audit gets dropped. Fix the log, not the story: if the work diverged from what a row claims, the row is wrong.

For an unattended run, also spawn a fresh subagent, ideally on a different model, that did none of the work, to read the log and transcript and flag what the owner should still scrutinize: weak or absent evidence, verification claimed without proof, risky calls. End the reply with an Attention section leading with `reviewed by <model>`. "No flags" is a valid value; the model name is not.

## Composing this skill

Other skills route their audit trail here instead of inventing one; deep-familiarize and the github-agent-factory's generated agents do. Reference this skill by name and let it own the format; do not restate the columns.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" work-log <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.
