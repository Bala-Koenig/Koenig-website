# Plan review lenses

One lens per seat. Paste the matching section into the seat's prompt as {LENS_FROM_PLAN_RUBRIC}. Shared calibration for all seats: only flag issues that would cause real problems during implementation. Approve unless there are serious gaps. Also look for the reframing that makes whole branches of the plan disappear: the strongest finding is often a restructure that deletes phases, not a fix inside one.

## Correctness seat

Evidence package: the plan plus the files it names as owning files.

- Will the steps, followed exactly, produce the claimed outcome? Trace each step against the code it names.
- What runs twice? A step that is not safe to repeat needs to say so.
- What if it crashes halfway? Is there a point where the work is half-applied and nothing says how to continue or back out?
- Completeness: every change the outcome needs has a step; nothing is left to "and so on".
- Buildability: could someone follow this plan without getting stuck? A step with no file name, or a step that says what without how, is a finding.
- Decomposition: are steps sized so a reviewer could reject one while approving its neighbor?

## Regression seat

Evidence package: the plan plus the callers and shared code of everything it touches.

- Blast radius: for each touched file, function, or value, who else uses it? A helper with two callers changed for one of them is the classic miss.
- A text search that finds no callers is not proof of no callers: check for name-in-quotes dispatch, reflection, and templates before believing something is unused.
- Irreversible steps: which steps cannot be undone (deletes, migrations, sent messages)? Are they last, and marked?
- Missing rollback: if verification fails at the end, does the plan say how to get back?
- Does any step undo something that currently works?

## Scope seat

Evidence package: the plan plus the original request and docs/decisions.md.

- Does the plan do more than the owner asked? Every extra step is a proposal for the gate, never a silent inclusion.
- Does it do less? A quietly dropped part of the request is a finding, not a simplification.
- Does any step contradict a recorded decision in docs/decisions.md? Name the entry.
- Unowned dependencies: does a step depend on something nobody in the plan creates or controls?
- Structure smells: a step that only forwards to another step (pass-through), or phases organized purely by execution order instead of by what could be accepted or rejected together.
