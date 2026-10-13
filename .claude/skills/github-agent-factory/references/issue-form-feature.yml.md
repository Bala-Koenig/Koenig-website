# Feature request form template

Generates `.github/ISSUE_TEMPLATE/3-feature-request.yml`.

Placeholders: `{{AREA_LABEL}}`, `{{AREA_OPTION_1..N}}`, `{{ROLE_OPTION_1..N}}` as in the bug form.

```yaml
name: Feature request
description: Something the app does not do yet
title: "[Feature]: "
labels:
  - "type:feature"
  - "status:needs-triage"
body:
  - type: dropdown
    id: area
    attributes:
      label: "{{AREA_LABEL}}"
      description: Which part of the app is this for?
      options:
        - "{{AREA_OPTION_1}}"
        - "{{AREA_OPTION_2}}"
        - all
        - not-sure
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem
      description: What problem are you trying to solve? Describe the situation, not the feature
    validations:
      required: true

  - type: textarea
    id: story
    attributes:
      label: User story
      placeholder: "As a <role>, I want <capability> so that <outcome>"
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed solution
      description: Only if you have a specific solution in mind
    validations:
      required: false

  - type: dropdown
    id: who
    attributes:
      label: Who will use this
      options:
        - "{{ROLE_OPTION_1}}"
        - "{{ROLE_OPTION_2}}"
        - not-sure
    validations:
      required: true
```
