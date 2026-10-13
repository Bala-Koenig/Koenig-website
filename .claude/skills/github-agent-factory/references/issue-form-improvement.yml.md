# Improvement form template

Generates `.github/ISSUE_TEMPLATE/2-improvement.yml`.

Placeholders: same `{{AREA_LABEL}}`, `{{AREA_OPTION_1..N}}`, `{{LOCATION_LABEL}}`, `{{LOCATION_PLACEHOLDER}}`, and `{{ROLE_OPTION_1..N}}` as the bug form; keep the two forms' dropdowns identical so triage can compare like with like.

Generator rule: when familiarization recorded known debt (duplicated constants, drifted pairs, naming splits), generate a THIRD form alongside this one, `4-tech-debt.yml`, seeded with those items as a dropdown of known problems plus an `other` option. Debt the docs already name should be filed against a list, never re-described from scratch.

```yaml
name: Improvement
description: An existing feature works, but it could work better
title: "[Improve]: "
labels:
  - "type:improvement"
  - "status:needs-triage"
body:
  - type: dropdown
    id: area
    attributes:
      label: "{{AREA_LABEL}}"
      description: Which part of the app does this affect?
      options:
        - "{{AREA_OPTION_1}}"
        - "{{AREA_OPTION_2}}"
        - not-sure
    validations:
      required: true

  - type: input
    id: location
    attributes:
      label: "{{LOCATION_LABEL}}"
      placeholder: "{{LOCATION_PLACEHOLDER}}"
    validations:
      required: false

  - type: textarea
    id: current
    attributes:
      label: Current behavior
      description: What does it do today?
    validations:
      required: true

  - type: textarea
    id: proposed
    attributes:
      label: Proposed behavior
      description: What should it do instead? Describe the ideal behavior, not the code
    validations:
      required: true

  - type: textarea
    id: why
    attributes:
      label: Why it matters
      description: Who is affected and how often?
    validations:
      required: true
```
