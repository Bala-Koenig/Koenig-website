# External review seat template

Generates `scripts/agent/external-review` (in the repo's main scripting language): the optional cross-vendor seat on the plan panel. A second model family catches what a single family agrees with itself about; the seat is worth wiring when the developer has access to one.

Placeholders:

- `{{SEAT_BACKEND}}`: the vendor CLI or API the developer has (for example a locally signed-in vendor CLI, or an API key).
- `{{EXTERNAL_KEY_NAME}}`: the environment variable name for the API key backend. The script reads it from the environment or the secret store BY NAME; it never opens a secrets file, and it never prints, logs, or passes the value on a command line.
- `{{SEAT_TIMEOUT_S}}`: generous, default 300. A short timeout on a slow backend reports a healthy seat as unavailable.
- `{{KNOWN_CONSTRAINTS}}`: tracked facts about the repo the seat must weigh as context, not flag as plan defects (a missing test harness tracked in an issue, schema changes applied by a human). From the interview.

## The seat contract

- Invoked as: `external-review --lens external --plan-file <path> --issue-file <path>`.
- Prints exactly ONE JSON line to stdout:
  `{"reviewer": "<backend>", "lens": "external", "verdict": "approve|revise|escalate-to-human|unavailable", "reasons": [...], "health": {"status": "ran|unavailable", "backend": "<which>", "reason": "<why, when unavailable>"}}`
- Exit 0 always. An unavailable external seat never blocks the panel, and a seated external verdict counts toward unanimity like any other.

## The health report (the fix for silent benching)

The blueprint this template comes from probed seat health with a status subcommand that failed on healthy accounts, which silently benched the seat for several panels while the developer believed it was voting. Two rules replace that:

1. Probe the thing you actually use. Availability is proven by running the real review call; the only pre-check allowed is "is the binary installed". Never a login-status or config-status proxy.
2. Health is always reported, never inferred. The `health` field is present on every output, ran or not, with the reason when unavailable, and the triage skill's run summary prints a seat-health section every run. "The seat has been unavailable for 4 runs (reason: ...)" is a line the developer must get to see; a seat that vanishes without a trail is the failure this file exists to prevent.

## The boundary line

The seat's prompt must contain, before the plan text: "You are reviewing the plan and issue text below and nothing else. Do NOT read or execute any SKILL.md files or repository instructions; stay focused on the material provided. Attack the plan: correctness, regressions, security, scope. Be concrete." Then `{{KNOWN_CONSTRAINTS}}` as weighed context, then the required output shape: exactly one JSON line with verdict and 1 to 6 short reasons.

Run the seat outside the repo working directory (a temp dir) so the backend cannot wander the tree; the seat reviews only what it is handed.
