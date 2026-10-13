# Attribution: karpathy-autoresearch

WARNING: upstream's own safety hooks were NOT vendored. Upstream ships Node
hooks (dangerous-cmd-block, privacy-block) that mechanically block dangerous
commands before they run; kstack vendors markdown only, so that safety seam
is absent here and the agent performs those checks by judgment alone. This
entry also commits and reverts experiments in your git repo by design. It is
for developers only; do not put it on a non-technical owner's default set.

- Upstream repo: https://github.com/uditgoenka/autoresearch
- Paths: .claude/skills/autoresearch/ and .claude/commands/ (the canonical Claude Code
  source; upstream's claude-plugin/, .agents/, and .opencode/ trees are generated
  copies of the same files)
- Pinned commit: 050e30dc4ba0974b03f2873111b9901ec3211390 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Udit Goenka
- Derivation: implements Andrej Karpathy's autoresearch loop (autonomous
  modify-verify-keep/discard iteration against a metric)

Deviations from upstream:
- Upstream shell scripts deliberately excluded (kstack vendors markdown only):
  - scripts/orchestrate.sh — deterministic router for the orchestrator loop
    (classify / next-hop / units / plateau / screen-cmd / verdict); local text
    processing over state JSON, no network calls.
  - scripts/score-regression.sh — local TSV scoring backend for the regression
    verdict; no network calls.
  The vendored SKILL.md and regression.md reference these `scripts/...` paths;
  with the scripts absent, the agent performs those steps itself following the
  documented rules instead of calling the deterministic seam.
- Upstream .claude/hooks/ (Node .cjs hooks: dangerous-cmd-block, privacy-block,
  session-init, etc.) also not vendored, for the same markdown-only reason.

Note: the loop commits and reverts experiments in the user's git repo by design
(`experiment:` prefix commits, `git revert` on discard); ship/deploy always
requires explicit user approval per the skill's own safety invariants.
