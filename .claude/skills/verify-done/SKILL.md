---
name: verify-done
description: Show fresh evidence before any claim that work is done. Use before saying done, fixed, complete, passing, working, or anything that implies success.
---

# verify-done

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

Evidence before claims, always. Evidence is pasted output, never a summary. A done-claim without the check's output pasted in the same message is a violation by definition.

## The gate

The check is not yours to invent. The plan's last step, `## Verification` in tasks/current-plan.md, was written when the task was clarified and names the exact command or action that proves this work. Before any claim of success:

1. Read the Verification step in tasks/current-plan.md; that named check is the one you run. If the file is missing, say so and name the check in one sentence.
2. Run the named check now, fresh and in full. A run from earlier in the session does not count.
3. Paste the actual output into the same message as the claim.
4. Compare the output to the result the plan expects. Different means not done, with the output as proof.
5. Only then claim done, evidence above the claim.

Skip any step = lying, not verifying. The rule covers exact phrases, paraphrases, and any wording that implies success.

## When the check is a page

For a visual change whose check is "open the page", capture evidence: curl the route and paste the lines that show the change, or attach a screenshot when browser tools exist. The owner confirming the preview stays the final human gate at PR time. If the check cannot run at all (a denied command, a missing tool), the work is not done: write UNVERIFIED next to the claim, with the exact command for the owner to run.

Two blocked attempts is the cap. After two distinct attempts to run the check are denied or blocked, stop retrying variants and take the UNVERIFIED path immediately. Burning the session proving the sandbox is closed helps nobody; the marker and the exact command are the honest ending.

## Red flags

Stop if you catch yourself:

- Using "should", "probably", "seems to"
- Expressing satisfaction before verification ("Great!", "Perfect!", "Done!")
- About to commit, push, or open a PR without verification
- Trusting an agent's success report
- Relying on partial verification
- Thinking "just this once"
- Tired and wanting the work over
- Any wording implying success without having run the check

## Rationalizations

| Excuse | Reality |
|---|---|
| "Should work now" | Run the named check |
| "I'm confident" | Confidence is not evidence |
| "Just this once" | No exceptions |
| "By inspection" | Inspection is a claim, not a check |
| "Linter passed" | A linter is not the compiler |
| "A spell-check passed" | A spell-check is not the document being right |
| "Agent said success" | Verify independently |
| "I'm tired" | Exhaustion is not an excuse |
| "Partial check is enough" | Partial proves nothing |
| "Different words so the rule doesn't apply" | Spirit over letter |

## Forbidden phrases

The shared list; plan-adversary and the factory's reviewer prompts point here. Never write:

- "By inspection" or "looks right" as grounds for done
- "Should work now"
- "Done!" without pasted evidence
- "Perfect!"
- "You're absolutely right!"
- "Great question!", "Great point!", "Excellent feedback!"
- Any thanks-for-feedback formula

## Prove a new check can fail

When the named check is a test written for this task: break the change on purpose, watch the check fail, undo the break, watch it pass. A check that cannot fail proves nothing.

## After the check passes

One sweep before closing: search the sibling code for the same defect pattern just fixed (the same typo, the same drifted condition, the same misused key in a nearby table or module). One targeted grep is enough. Report anything found to the owner as queue candidates in the closing message; never fix them in this task. The fence stays put.

## When the check fails

Paste the failure output, fix within the plan's scope (the fence stays put), and re-run the named check. Two consecutive failures on the same plan step: stop and report to the owner with both outputs.

Violating the letter of this rule is violating the spirit of this rule.

## The closing message

However the session ends, the last message to the owner is one plain paragraph: what changed and where, where the work stands now, and the verification status, either the evidence pasted or UNVERIFIED with the exact command to run. Match the report to the size of the change: a one-line fix gets a two-sentence closing, not a dossier. If any queue entry is held for the owner's decision, name it and why, every time. Ending on a permission question with no statement of what was done breaks this rule the same way a false done-claim does; a message that makes no claim at all is not a loophole, it is the violation.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" verify-done <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

Pass: Verified with the evidence above. Call the Skill tool with "update-memory".
Fail: Verification failed; output pasted above. Returning to the plan step that broke.

If the Skill tool cannot find the handoff target (update-memory) on a pass, do not stop and ask: state in one plain sentence that the full kstack chain is not installed, then close the work directly: commit on the task branch, open the PR if the GitHub CLI is available, and give the owner the plain closing paragraph with the evidence.
