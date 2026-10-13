---
name: plan-task
description: Write the numbered plan for the active task into tasks/current-plan.md and get the owner's approval before touching anything. Use after the task is clarified and its blast radius is known.
---

# plan-task

Turn the plan draft in tasks/current-plan.md (Files, Out of scope, Verification, Risks) into the final plan for the active task. Write it for a reader who has never seen this project before and has questionable taste: name every file, show every change, assume nothing. Don't repeat yourself, and don't build what nobody asked for. This skill writes the plan and stops for approval; it runs no steps itself.

## The plan file shape

Rewrite tasks/current-plan.md in this order:

1. **Summary.** Three or four plain sentences a non-programmer can read in thirty seconds: what will change, where, and how we will know it worked.
2. **Numbered steps.** Each step is one action of 2 to 5 minutes, names its exact file or files, and shows the concrete change: code, wording, values. Split steps only where a reviewer could meaningfully reject one while approving its neighbor. Non-code work splits the same way: "Draft the email" is a step, "Read it aloud" is a step, "Send it" is a step.
3. **Global constraints.** Version floors, limits, naming and copy rules, one line each, with exact values copied verbatim from the draft and docs/architecture.md. Every step implicitly includes this section.
4. **Out of scope.** Copied verbatim from the draft's do-not-touch list, plus every shared file the blast-radius step discovered. This is the do-not-touch list: guard reads the Files and the numbered steps into the fence and never fences a path from this section, so a shared file belongs here to stay protected, and a file the task must actually edit belongs under Files, not here.
5. **Verification.** The draft's check, as the last numbered step.

## No placeholders

These are plan failures; never write them:

- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling", "add validation", "handle edge cases"
- "Write tests for the above" without the actual test
- "Similar to step N" (repeat the content; the reader may take steps out of order)
- a step with no file name, or a step that says what to do without showing how
- an Out of scope list reworded instead of copied verbatim

## Self-review

A checklist you run yourself, not a subagent dispatch: every draft item covered; no placeholder phrases; names consistent across steps (a function called one thing in step 3 and another in step 7 is a bug).

## The approval gate

Present the summary and the steps to the owner and stop. When a reply can arrive, nothing gets edited until the owner says yes explicitly; silence is not approval. If the owner wants changes, revise and re-present. After approval, any change to the plan goes back to the owner for re-approval of the changed part.

The draft's `Mode:` line (written by clarify-task's first action) decides how this gate behaves; if the line is missing, run `echo "NO_REPLY=${KSTACK_NO_REPLY:-unset}"` once and add it. In `Mode: headless`, the gate cannot stall the work it exists to protect: record the plan and your stated assumptions in tasks/current-plan.md, say plainly that the plan is proceeding without a live approval and why, hold anything marked never-change or genuinely the owner's alone, and continue to guard in this same run; stopping to ask for a yes that cannot arrive is the failure this rule prevents. In `Mode: interactive`, always wait for the explicit yes, even when the session feels unattended; the flag, not a feeling, is the only headless trigger.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" plan-task <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

On approval the chain activates the fence on its own: `Plan approved. Call the Skill tool with "guard".`

If the Skill tool cannot find the handoff target (guard), do not stop and ask: state in one plain sentence that the full kstack chain is not installed, then continue the work directly in this session following the plan, keeping all scope rules.
