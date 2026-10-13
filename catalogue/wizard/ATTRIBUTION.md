# Attribution: wizard

- Upstream repo: https://github.com/mattpocock/skills
- Path: skills/engineering/wizard/
- Pinned commit: 0ab1b63a410a03d3627979a109c8695de27af954 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Matt Pocock

Deviations from upstream:
- none

Note: Includes template.sh, security-vetted clean (dissection R2 s6.2). Note: ask_secret hides input at the prompt, but write_env stores the value in a plaintext .env file.

## Koenig usage note (2026-08-21)

In our testing (catalogue spot-test, evals/results/catalogue-test/), this skill did not engage in a headless `claude -p` run: the transcript shows no skill load, no template.sh read, no stage list, and no script authored, despite an explicit invocation hint. Treat it as interactive-session-only until retested; its confirm step has no way to resolve when no reply can arrive.
