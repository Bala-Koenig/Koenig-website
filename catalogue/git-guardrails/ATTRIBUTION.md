# Attribution: git-guardrails

- Upstream repo: https://github.com/mattpocock/skills
- Path: skills/misc/git-guardrails-claude-code/
- Pinned commit: 0ab1b63a410a03d3627979a109c8695de27af954 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Matt Pocock

Deviations from upstream:
- none

Note: Includes scripts/block-dangerous-git.sh, security-vetted clean (dissection R2 s6.1). Known limits, by design: fails open when jq is missing, and substring matching is a seatbelt, not a sandbox. kstack's own guard skill supersedes it for kstack users; catalogued for standalone use.
