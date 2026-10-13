---
name: interview
description: Interview the user in numbered rounds until a plan, idea, or task has no unexamined branch. Use when the user wants their thinking stress-tested or grilled, or when decisions outside any active task need the user's call.
disable-model-invocation: true
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Before the first round, read `docs/architecture.md`, `docs/decisions.md`, and the outcomes of prior interviews (`tasks/current-plan.md`, `tasks/queue.md`) if they exist. A decision already recorded there is a settled node in the tree: never re-ask it, and let it push the frontier outward from the start. If the user's idea contradicts a recorded decision, that contradiction is itself a frontier question. If any of these files don't exist, proceed silently. Don't flag their absence.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round. Waiting applies only when a reply can arrive; the no-reply rule below overrides it.

Format a round like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Write every question in plain words a non-programmer can answer, naming the human-facing thing first and the file second; the recommended answer lets the user accept by number.

Each answered round reshapes the tree. Recompute the frontier and ask the next round. A question that depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment, dispatch a sub-agent to find it, and hold back only the questions downstream of it; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

Interview one task at a time. When the incoming message bundles two or more separate asks, cover only the single active task; splitting the bundle is clarify-task's job, not this skill's. Work that needs no decision never waits behind questions about work that does.

The no-reply rule: it applies exactly when the launcher set `KSTACK_NO_REPLY=1` in the environment (check once with `echo "${KSTACK_NO_REPLY:-}"`); with the flag unset, wait for answers, even when the run feels unattended. With the flag set, do not wait at any round. Adopt your own recommended answer for every frontier question at once, record each as a stated assumption, recompute the frontier, and run the tree to completion in this same run. One exception holds even here: a question that turns on a never-change value or a sign-off the owner alone can give (a rate limit, a spend cap, anything the docs flag as fixed) is not yours to answer. Hold it, name it in the closing as awaiting the owner, and let the safe branches run to completion around it. Ending the run at a question round when no reply can arrive is a failure, not caution; the work the interview was clarifying must still be delivered, minus only what genuinely needs the owner.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding; in a no-reply run, the stated assumption list stands in for that confirmation and the closing repeats it.

Then append the outcomes to `docs/decisions.md` as compact dated entries: a heading `## NNNN <date> <slug>` (scan for the highest number, increment) plus 1 to 3 sentences covering context, decision, and why. Record an entry only when it is hard to reverse, surprising without context, and the result of a real trade-off; if any of the three is missing, skip it.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" interview <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads. Control returns to the skill that invoked you; when run standalone, end with:
`Interview complete. Outcomes appended to docs/decisions.md.`
