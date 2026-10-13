---
name: plan-adversary
description: Attack a written plan with independent reviewers and return one synthesized verdict with an explicit decision gate. Use when the user wants a plan reviewed, challenged, or red-teamed before implementation.
argument-hint: "[plan file, default tasks/current-plan.md]"
---

# plan-adversary

```
NO SILENT SCOPE CHANGES. NO AUTO-APPLIED FIXES. THE OWNER DECIDES.
```

Adversarial review of a plan before implementation. The target is tasks/current-plan.md unless the owner points at another plan file or a GitHub issue. The deliverable is a synthesized verdict. Do NOT auto-apply changes. Read docs/architecture.md and docs/decisions.md; if any of these files don't exist, proceed silently. Don't flag their absence.

The adversarial signal comes from reviewer diversity, not assigned personas: each reviewer reads different evidence, not a costume. Agreement across reviewers is high-confidence signal; a lone finding weighs less.

## The gate

Run all seven steps before any verdict is delivered.

1. **State the intent.** One paragraph, from the plan and the task. Reviewers challenge whether the plan achieves the intent well, not whether the intent itself is correct; doubt about the intent goes to the final gate as a challenge. If the intent is unclear, ask now, once.
2. **Pick a scope posture and commit.** Expansion (propose more), selective (baseline untouched, expansions offered one by one), hold (rigor only, the default), reduction (cut to minimum viable). In every posture the owner is 100 percent in control: every scope change is an explicit opt-in; the review never silently adds or removes scope. Raise posture concerns once, then execute faithfully.
3. **Design it twice.** Sketch at least one structurally distinct alternative before attacking: whole-shape alternatives, not point fixes inside one shape, each with effort, risk, and a recommendation. A plan that survives comparison is stronger evidence.
4. **Spawn 2 or 3 read-only reviewers** (Agent tool, Explore type) in one message, each seat with a different evidence package: correctness (the plan plus its owning files), regression (the plan plus the callers and shared code it touches), scope (the plan plus the original request and decisions.md). Build every prompt from references/reviewer-prompt.md; each seat's lens is in references/plan-rubric.md. A seat that finds nothing wrong says "no findings" and stops; an empty review is a valid outcome.
5. **Synthesize.** Merge duplicates, note which seats raised each finding, mark disagreements. Nitpick gravity: reviewers tend to fill their review, so if a seat's findings are all nits and style preferences, the plan is probably fine. Say so.
6. **Verify before believing.** Check each finding against the repo before it enters the verdict; a hypothetical needs a reachable path. When a check is out of reach, say "I can't verify this without X. Should I investigate, ask, or proceed?"
7. **Classify, then hold one gate** (below).

## Classifying decisions

- **Mechanical**: one clearly right answer, checkable in the repo (a wrong path, a value the code contradicts, a step naming a missing file). Resolve these yourself and list them resolved, with evidence. Resolving replaces the owner's answer, never the analysis, and never edits the plan.
- **Taste**: defensible either way (granularity, ordering, naming). Decide, attach a recommendation, surface at the final gate.
- **Challenge**: the reviewers think the owner's stated direction is wrong. Never auto-decided. Present it as: what you said, what we recommend, why, what context we might be missing, and if we're wrong, the cost is. The owner's direction is the default; the review must make the case for change.

## The verdict

Bucket every finding as Act on, Consider, Noted, or Dismissed, each with the seats that raised it and a one-line rationale. More than 5 Act on items means you are not filtering. Dismissed is a trust mechanism: showing what was rejected and why lets the owner overrule you. Append the verdict to the plan file under `## Adversary verdict` (posture, buckets, agreement map, round number); every byte above that section stays unchanged. Give the owner the plain version in chat, ending with one report line: N decisions = M mechanical resolved + K taste recommendations + J challenges. That is the single stop; never drip questions during the run.

## The revision loop

If the owner wants changes, the plan's author (plan-task or the owner) revises, and the review reruns on what changed plus anything the change could disturb. Three rounds is the cap. After round 3 without approval, stop and escalate: name what is still contested and the cost of each open path.

## Red flags

Stop if you catch yourself:

- Editing the plan above the verdict section, even "just a typo"
- Writing a reviewer brief containing "do not flag" (pre-judging)
- Manufacturing a finding so the review looks thorough
- Widening or trimming scope because "we're here anyway"
- Adding a second question stop before the gate

## Rationalizations

| Excuse | Reality |
|---|---|
| "The fix is obvious, I'll apply it" | Obvious fixes are proposals; the owner applies them |
| "This extra step is clearly needed" | Then it will survive being proposed at the gate |
| "A clean pass looks lazy" | A clean pass is a verdict; say the plan holds |
| "One more round will converge" | Three is the cap; escalate |

Violating the letter of this rule is violating the spirit of this rule.

## Used by generated agents

The github-agent-factory's generated agents run this skill inside their triage loop; their reviewer prompts derive from references/reviewer-prompt.md, so changes here propagate at generation time.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" plan-adversary <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

Completion line: Verdict delivered. Nothing was auto-applied; the plan is unchanged until you act on the buckets above.

On approval the normal chain proceeds: `Plan approved. Call the Skill tool with "guard".` If the Skill tool cannot find guard, say in one sentence that the full kstack chain is not installed; the scope rules still hold.
