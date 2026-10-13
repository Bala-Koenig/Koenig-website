# DANGER-ZONES seed

Generates `docs/DANGER-ZONES.md`: the files where a wrong edit becomes an incident.

Placeholders:

- `{{R3_ROW_N}}` / `{{R2_ROW_N}}`: table rows seeded from deep-familiarize's gotcha column and the interview's risk-zone answers.
- `{{HEAD_SHA}}` / `{{DATE}}`: the last-verified stamp, required by the docs-drift gate.

The incidents-as-guardrails pattern: every row carries the reason a wrong edit here hurts, stated as the incident it causes or once caused ("a bad rewrite takes down routing everywhere", "renaming this key silently marks everything unread for every user"). A row without a reason gets deleted by the next skeptic; the incident is what makes the rule stick. When familiarization found a landmine (a reflection dispatch, a drifted pair, a duplicated constant), it goes in as a row with the concrete failure it produces.

```markdown
# Danger zones: files where a wrong edit becomes an incident

Two tiers. Do-not-touch (R3): agents analyze and comment only; implementation
is human-only. Handle-with-care (R2 minimum): plan first, pass the panel,
smallest viable diff. Risk classes are defined in CONTRIBUTING.md; ambiguity
always rounds up.

## Do-not-touch without a human (R3)

| path | why dangerous | what to do instead |
|---|---|---|
| {{R3_ROW_1}} | <the incident a wrong edit causes, concretely> | File an R3 analysis on the issue and stop |

## Handle with care (R2 minimum)

| path | why careful | rule |
|---|---|---|
| {{R2_ROW_1}} | <who breaks when this changes, concretely> | <the invariant to preserve> |

_Last verified: {{HEAD_SHA}} ({{DATE}})_
```
