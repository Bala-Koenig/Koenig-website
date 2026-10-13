---
name: clarify-task
description: "Use this when picking up work before making any edit: a single request like \"can you fix X\", the next item from a queue, or one message that bundles several asks. It splits a bundle into a queue with one active task, then locks down what the active ask means: the exact file(s) that own it, a do-not-touch list, how to prove it is done, and what the change could break. Trigger on: a change described by its symptom or outcome rather than a file path or exact wording (a typo, a greeting or heading that \"needs to say\" something different); one message carrying two or more separable asks (a numbered list, \"also do X and Y\", \"while you're at it\"); starting the next item in a queue; or an instruction to scope files before touching anything. Do NOT use for pure read-only questions (\"what does this file do\", \"is it safe to touch X\"), or for checking whether completed work succeeded."
---

# clarify-task

Scope the work before anything is edited. If the message carries more than one ask, split it into a queue and pick one. Then pin that one task down: the files that own it, what must not change, the check that proves it done, and what the change could break. Do not proceed to a plan until scope is locked.

## First action: determine the mode

Before anything else, run exactly one command: `echo "NO_REPLY=${KSTACK_NO_REPLY:-unset}"`. This is not optional and not skippable for small tasks; every gate below behaves differently depending on the answer, so the answer must exist before any gate is reached.

- Output `NO_REPLY=1`: this is an unattended run. No reply can ever arrive. Every no-reply rule in this skill and the rest of the chain applies, and stopping to ask the owner anything that is not a held sign-off is a failure.
- Output `NO_REPLY=unset` (or anything else): treat the session as interactive and wait at every gate. Never guess at headlessness; the flag is the only trigger.

Record the answer as the first line of the plan draft (`Mode: headless` or `Mode: interactive`). Later skills read that line instead of re-deriving the mode.

## Load state

Read `docs/architecture.md` first to find the files that plausibly own the ask, then `docs/decisions.md` and `tasks/queue.md`. If any of these files do not exist, proceed silently. Do not flag their absence; read the code itself to find the owning files.

## When the message bundles several asks

One prompt, many asks (a numbered list, "also do X", "while you're at it", several unrelated requests) becomes a queue with exactly one active task. Never silently drop an ask, and never work on more than the active one.

The queue lives in `tasks/queue.md`. Create it if absent:

```
# Task queue

1. [active] 2026-08-20 Fix the received typo in application reply emails
2. [queued] 2026-08-20 Raise the upload limit to 20 MB (needs human sign-off)
3. [done] 2026-08-19 Add the date column to the applicants table
```

One entry per ask: status in brackets, the date, then a one-line scope a non-programmer can read, verb first. Write each entry the moment you have its scope, never batched at the end. An ask that touches a value marked never-change (a config value, a limit, anything the docs flag as fixed) gets `needs human sign-off` on its line; it is never folded into another task and never dropped.

Show the owner the parsed list in plain words, recommend an order (blockers first, risky ones flagged, sign-off ones marked as needing their call), then mark exactly one entry active. The owner reorders, merges, or drops; you never drop one yourself. A single-ask message skips this: write one entry, mark it active, no confirmation round.

### One rule for how the queue runs, interactive and headless

This is the whole rule; it overrides any one-task phrasing elsewhere in the chain.

The mode was determined by the first action above and recorded on the draft's Mode line; that line decides which branch applies here.

- **Interactive (`Mode: interactive`):** one task per session. Confirm the order, run the active task through the chain to its PR, then the session ends and the next entry starts in a fresh session (`/clear`). Never offer to batch ("want me to knock them all out?" breaks the contract this queue exists for).
- **Headless (`Mode: headless`):** the confirmation round cannot hold safe work hostage. State the recommended order and your assumptions, then work through every entry that needs no human decision, one at a time and in order, each through the full chain, in this same run. Do not end the run to ask whether to proceed; proceeding on stated assumptions is the contract of this mode. Hold only entries marked `needs human sign-off` or otherwise needing a decision that is genuinely the owner's alone, and say plainly which are held and why. A caveat is not a hold: when you have a clear recommended action and acting on it is safe and reversible, do it and record the caveat in the closing for the owner to weigh; discovering a wrinkle mid-task and stopping to ask about it, when your own recommendation already answers it, is the stall this mode forbids.

Whichever mode, every entry held for the owner's decision is named, with its reason, in every message that ends the session.

## Read before asking

Look at the actual code before putting any question to the owner. Cite the path and line in your first question. Never ask the owner for a fact you can look up yourself; only decisions belong to the owner.

## The ambiguity rule

When a phrase in the ask matches two or more plausible places, list every candidate in plain words, the human-facing thing first and the file second, one line each, and ask the owner to pick. For example: "Do you mean the reply emails to job applicants (paths/applications.py) or the LinkedIn outreach messages (automations/outreach.py)? Each has a typo." Fixing one silently is a miss. Fixing all of them without asking is also a miss. Never guess between similar paths.

Before writing any draft, list every plausible owner of the ask's key phrase, look at each, and for every candidate you rule out state in one line why. A draft that marks a file out of scope without ever saying why it was a candidate is the silent guess this rule exists to catch.

## Regressions

When the ask is a regression ("it worked before"), find the change that introduced it: check git log for the introducing commit before planning a revert, and ask whether that change was deliberate. A commit message that reads as intentional may be exactly that; reverting a colleague's intentional change is a decision for the owner, never yours to make from a title-vs-diff mismatch alone.

## Settle the three things

Three things must be settled before the draft:

- the exact feature and the files that own it
- what must not change: the do-not-touch list, with explicit file names
- the check that will prove the work is done

Interview only when a decision exists that only the owner can make. A fully specified ask, where the owner already named the exact change and wording, settles all three itself: write them down and proceed. Otherwise call the Skill tool with "interview" and keep going until the three are settled. If the Skill tool cannot start interview (it is user-invoked in some installs), do not stop: ask the same questions directly yourself, numbered with a recommended answer each, and continue under the same rules. In `Mode: headless`, do not stall at any question: take your recommended answer, state the assumption in the draft, and hold only decisions that are genuinely the owner's alone, such as never-change values.

In that same no-reply situation, when `docs/architecture.md` is absent, map the owning files yourself before any edit: read the code to find the files for this task only, not a full map, write them into the draft, and say in plain words that you mapped them yourself. Never edit unmapped in silence.

## Write the draft

Write the outcome into `tasks/current-plan.md`:

```
# Plan draft: <the task in one line>
Mode: <headless or interactive, from the first action>
Files: <owning files>
Out of scope: <do-not-touch list, explicit file names>
Verification: <the check>
```

Note the pinned scope on the active queue entry.

## Blast radius: prove the change is safe before planning it

Most changes are safe because of one fact. Name it and prove it before the plan is written. Skip this only on the fast lane below.

1. **List the files** the task will touch, from the draft's Files line.
2. **For each, find who else uses it.** A text search for the file and each function it defines (`grep -rn "format_greeting" --include='*.py' .`), searched in quotes and by partial name too, because code can be called by name from a table, by reflection, or by a template, so no hits is not proof of no callers. Also read the gotcha column of `docs/architecture.md`. If the code-review-graph tools are installed (`get_impact_radius_tool`, or `.code-review-graph/graph.db` exists), use its impact tools instead of the text search, sanity-check against the gotcha column, and say so in Risks.
3. **Name the one fact** in a plain sentence: "safe because onboarding is the only caller of the new greeting." If it needs an "and", that is two facts; name both.
4. **Prove it with the smallest check:** the existing test suite, a five-line throwaway script that calls the real function, or the app entry in dry-run mode. Run it and paste the output. If none is possible in under two minutes, write "unproven" next to the fact, in those words. Unproven stays unproven.

Append a `## Risks` section to `tasks/current-plan.md`: the one fact with its proof or the word unproven; each cross-path risk in plain words with a file:line cite; one line for what was checked and cleared; and, when a dispatch table or string-keyed routing sits in the touched area, one line recommending a pinning test for it as a queue candidate for the owner (recommend it, never write it here). Add every newly discovered shared file to the do-not-touch list so plan-task copies it into Out of scope and the fence keeps it safe.

## Fast lane

When the task is small AND unambiguous, skip the interview and the blast-radius procedure. All four must hold:

- one clear owning file (from `docs/architecture.md`, or mapped yourself)
- one obvious change, no cross-path risk
- no shared helper touched, and no test pins the current wording
- no config value or limit changed

Then write the mini plan (the same skeleton, filled in) to `tasks/current-plan.md` and state in one line why the fast lane applied. A task touching a flagged constant or a shared file never takes the fast lane. When the four do not all clearly hold, take the normal lane; the fast lane is for the obvious case, not the arguable one.

The fast lane shortens the plan. It never removes approval:

- **`Mode: interactive`:** present the mini plan to the owner in plain words and wait for an explicit yes before any edit. One word is enough. Silence is not approval.
- **`Mode: headless`:** state the mini plan and your assumptions in the draft and proceed to guard and the edit in this same run, without asking whether to proceed. Waiting for a yes that cannot arrive is the failure here, not caution. Ending the run with the work scoped but not done, when nothing needed the owner, is that failure.

The mini plan is written before the first edit, always; an owner saying "right now" or "while you are at it" changes nothing about that order.

## Closing

Before handing off, create and switch to the task branch (`git checkout -b` with a short slug), in both lanes. No edit happens on the default branch. The cap is one retry, then proceed: attempt it, retry once if denied, then stop and proceed on the current branch, telling the owner in one plain sentence that the work continues on the current branch because branching was blocked. Add one line to `tasks/current-plan.md` (`Branch: blocked, create <slug> at commit time`) so the closing steps create it at commit time.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" clarify-task <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads. Then hand off.

Normal lane: `Task pinned and blast radius written. Call the Skill tool with "plan-task".`
Fast lane, after approval: `Fast lane: mini plan approved. Call the Skill tool with "guard".`

If the Skill tool cannot find the handoff target (plan-task or guard), do not stop and ask: state in one plain sentence that the full kstack chain is not installed, then continue the work directly in this session following the plan draft, keeping all scope rules.
