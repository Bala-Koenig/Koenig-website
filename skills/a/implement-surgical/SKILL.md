---
name: implement-surgical
description: Make only the changes the approved plan names, nothing else. Use when implementing an approved plan or mini plan.
---

# implement-surgical

```
EVERY CHANGED LINE TRACES TO THE PLAN.
```

The plan in tasks/current-plan.md already froze the goal, the files, and the checks. Implement its numbered steps in order, nothing else. The fence blocks edits outside the plan's files mechanically; your job is to not even try. A smaller task means a shorter plan, not a looser scope: the rule that every changed line traces to the plan holds at every size.

## The four principles

**Think before coding.** Don't assume. Don't hide confusion. Surface tradeoffs. The plan made the decisions; if a step still reads two ways, present the readings, don't pick silently.

**Simplicity first.** Minimum code that solves the problem. Nothing speculative. No features beyond what the plan asks. Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify. If you write 200 lines and it could be 50, rewrite it.

**Surgical changes.** Touch only what you must. Clean up only your own mess. Don't "improve" adjacent code, comments, or formatting. Don't refactor things that aren't broken. Match existing style, even if you'd do it differently. If you notice unrelated dead code, mention it, don't delete it. Asked to fix a crash on empty emails, the surgical diff changes the two lines that handle the empty email; the bloated one also rewrites comments, adds a docstring, and validates usernames nobody asked about.

**Goal-driven execution.** Define success criteria. Loop until verified. Each plan step names its check; run it before starting the next step. Where a step is vague, make it verifiable: "Fix the bug" becomes "Write a test that reproduces it, then make it pass". Strong success criteria let you loop independently.

## The orphan rule

Remove imports, variables, and functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked. Plainly: clean up the mess your change made; leave everyone else's mess alone unless asked.

## The surprise rule

Anything the plan did not predict stops the work: a failing test the change should not touch, a file that is not where docs/architecture.md says, a needed edit outside the fence. Stop, tell the owner what you found and why the plan cannot proceed as written, and wait. Never improvise, never widen the plan yourself. A deviation from the plan is signal to surface, not friction to absorb.

## Red flags

If you catch yourself thinking any of these, stop:

- "While I'm here..."
- "This formatting is ugly."
- "One more small improvement."

## Anti-patterns

| Principle | Anti-pattern | Fix |
|---|---|---|
| Think before coding | Silently assumes file format, fields, scope | List assumptions explicitly, ask for clarification |
| Simplicity first | Strategy pattern for single discount calculation | One function until complexity is actually needed |
| Surgical changes | Reformats quotes, adds type hints while fixing bug | Only change lines that fix the reported issue |
| Goal-driven | "I'll review and improve the code" | "Write test for bug X → make it pass → verify no regressions" |

Violating the letter of this rule is violating the spirit of this rule.

## One task at a time

This skill implements one plan for one task. Whether the next queue entry starts in a fresh session or continues in this run is set by the one queue rule in clarify-task: interactive means one task per session and the next starts after a `/clear`; headless means work every safe entry in order in this same run. Either way, finish the active task through the chain before touching the next, and never widen this task to absorb another.

## The closing paragraph

Every message that ends your part of the work, including one that ends on a blocked permission, closes with one short plain paragraph: what changed and where, what was deliberately left alone, and the verification status. If any queue entry is held for the owner's decision, name it and why, every time. Write it for a non-programmer, and keep skill vocabulary out of it: no "surprise rule", "fast lane", "fence", or skill names. Say the plain thing instead ("I stopped because the change did not match what we agreed").

## It's working if

Fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" implement-surgical <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

Changes complete, every line traces to the plan. Call the Skill tool with "verify-done".

If the Skill tool cannot find the handoff target (verify-done), do not stop and ask: state in one plain sentence that the full kstack chain is not installed, then run the plan's verification check yourself and paste its output before any claim of done, keeping the fence.
