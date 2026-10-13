# Attribution: diagnosing-bugs

- Upstream repo: https://github.com/mattpocock/skills
- Path: skills/engineering/diagnosing-bugs/
- Pinned commit: 0ab1b63a410a03d3627979a109c8695de27af954 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Matt Pocock

Deviations from upstream:
- none

Note: Includes scripts/hitl-loop.template.sh, security-vetted clean (dissection R2 s6.3). The Redact section is a model for keeping secrets out of captured output.

## Koenig usage note (2026-08-21)

In environments where tests cannot execute (headless sandboxes, restricted machines), this skill's loop-first mandate deadlocks: Phase 1's executed feedback loop can never be built, and the skill's own text then forbids proceeding (observed in the catalogue spot-test, evals/results/catalogue-test/). The Koenig practice: state the limitation, fall back to reading the test and reasoning about its expected output, and mark every conclusion unverified using verify-done's UNVERIFIED language with the exact command for the owner to run.
