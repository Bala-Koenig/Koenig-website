---
name: update-memory
description: "Refresh only the doc sections a finished change made stale, then close the task: commit, push, PR, pop the queue. Use after verification passes, before starting anything new."
---

# update-memory

Two jobs, in order: refresh the docs the finished change made stale, then close the task. This skill changes the project's memory; merely reading the docs for vocabulary is not this skill.

## Phase 1: refresh what went stale

Read the git diff for the task branch. List the sections of `docs/architecture.md` that mention the touched files, and update only those:

- `docs/architecture.md`: fix the rows whose owning-file or gotcha information the change invalidated. If the task discovered shared code (the plan's Risks section is the usual source), add a gotcha row for it.
- `docs/decisions.md`: append one dated entry if the task settled a technical decision. Format: a heading `## NNNN <date> <slug>` (scan the highest number, add one) plus one to three sentences: context, decision, why. All three gates must hold: hard to reverse, surprising without context, the result of a real trade-off. If any is missing, skip the entry.
- `CLAUDE.md`: touch it only when a statement in it is now wrong, and fix that line alone.

Never rewrite a whole file, and never add content a future task would not need. If the change contradicts a recorded decision, surface it to the owner; never silently override. When nothing is stale, say so in one line ("Nothing in the docs went stale; moving to finish.") and skip cleanly.

## Phase 2: finish

The default branch here means what git reports as the remote head (`git symbolic-ref refs/remotes/origin/HEAD`), or when there is no remote yet, the `init.defaultBranch` setting, falling back to main then master. This skill never commits on that branch, no matter who asks.

1. Delete `tasks/fence.txt`. The task is done, so the guard comes off.
2. Create or switch to the task branch. If HEAD is the default branch, creating the branch is the first action, not a check. clarify-task should have created it before the first edit; if it did not, create it now with `git checkout -b <slug>`, which carries any uncommitted changes onto it, and continue. Work sitting on the default branch because branching was blocked earlier (the plan carries a `Branch: blocked` line) is recovered the same way: move it onto the task branch, never abandon the commit. Same cap as everywhere in the chain, one retry then proceed: attempt it, retry once if denied, then stop and tell the owner in one plain sentence to run `git checkout -b <slug>` and commit.
3. Write the PR body to `tasks/pr-body-<slug>.md` (the task branch's slug, so a multi-task headless run leaves one body per task instead of overwriting a single file) now, before the GitHub check, so every fallback below still leaves the body behind. Three sections, readable by a non-programmer:
   - What changed: two to four plain sentences.
   - What was NOT touched: the plan's Out of scope list, copied verbatim from `tasks/current-plan.md`, and checked against the actual diff; the two must agree. Name here every queue entry that was held or escalated instead of done.
   - How it was verified: the evidence summary pasted from verify-done.
4. Commit on the task branch with a plain one-line message saying what changed. Never stage the working files under `tasks/`; the queue, plan, fence, and PR body are session state, not part of the change.
5. Check the GitHub CLI: `gh --version`, then `gh auth status`. If either fails, stop here: the work is already committed on the task branch and the body is written, so tell the owner exactly what to run (`gh auth login`) and where the work sits. Nothing remote happens until gh works.
6. Push the task branch and open the PR with `gh pr create --body-file tasks/pr-body-<slug>.md`.
7. Mark the task's entry `[done]` in `tasks/queue.md`. Activate nothing.

## Log and hand back

Log this run with the work summary as the detail: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" update-memory completed "<files touched count>, <tests run>, <PR url>"`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

This is the chain's last stop. What happens next follows the one queue rule in clarify-task: interactive (`KSTACK_NO_REPLY` unset) means the session ends here and the next entry starts after a `/clear`; headless (`KSTACK_NO_REPLY=1`) means the next safe entry begins in this same run. Either way this task is done. The closing goes to the owner, not to the Skill tool, as one plain paragraph: what changed and where, where the work sits now (branch and PR link), and how it was verified. If any queue entry is held for the owner's decision, name it and why, every time. Then:

- tell the owner the change is waiting for them as a pull request: the automatic reviews and the preview run on their own, and they merge it when the checks are green and the preview matches what was asked. If this is their first PR, point them at the "What a pull request is" section of PILOT-GUIDE.md in one sentence rather than assuming they know
- if more tasks are queued and this is an interactive session: open a fresh session (/clear) and start the next one, quoting the next entry's one-line scope

Task closed and queue updated.
