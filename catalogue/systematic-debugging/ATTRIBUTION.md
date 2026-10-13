# Attribution: systematic-debugging

- Upstream repo: https://github.com/obra/superpowers
- Path: skills/systematic-debugging/
- Pinned commit: b36e0829c6d0140e93cfef2ca599b1b07d4a7797 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Jesse Vincent

Deviations from upstream:
- SKILL.md: "superpowers:" namespace stripped from the two skill cross-links.

Note: Includes root-cause-tracing.md, defense-in-depth.md, condition-based-waiting.md, and find-polluter.sh (security-vetted clean; it runs the repo's own test suite, dissection R4 s8.1). condition-based-waiting.md mentions condition-based-waiting-example.ts, which is not vendored; see the upstream repo.

## Koenig usage note (2026-08-21)

In environments where tests cannot execute (headless sandboxes, restricted machines), this skill's run-the-test steps deadlock: the failing-test-before-fix requirement can never be met, and the skill has no protocol for that case (observed in the catalogue spot-test, evals/results/catalogue-test/). The Koenig practice: state the limitation, fall back to reading the test and reasoning about its expected output, and mark every conclusion unverified using verify-done's UNVERIFIED language with the exact command for the owner to run.
