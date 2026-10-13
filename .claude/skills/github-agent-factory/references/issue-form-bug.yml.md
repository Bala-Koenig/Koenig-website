# Bug report form template

Generates `.github/ISSUE_TEMPLATE/1-bug-report.yml` and `.github/ISSUE_TEMPLATE/config.yml`.

Placeholders:

- `{{AREA_LABEL}}`: what this repo calls its top-level split (Dashboard, Module, Service, App area). From the feature map.
- `{{AREA_OPTION_1..N}}`: the actual areas, one dropdown option each, plus a final `not-sure`. Never invent areas; read them from docs/architecture.md.
- `{{LOCATION_LABEL}}` / `{{LOCATION_PLACEHOLDER}}`: how a reporter names where it happened (a route, a screen, a command, an endpoint). Pick the repo's real vocabulary.
- `{{ROLE_OPTION_1..N}}`: the user roles the repo actually has. Delete the whole role block when the repo has one kind of user.
- `{{SEV_1..4}}`: severity wordings in the repo's own stakes ("Blocking a live conference right now" beats "critical"). Write what a non-technical reporter would recognize.

Rules for the generator:

- Every dropdown option must come from this repo. A form that could belong to any repo is the named failure.
- Time-relative data rule: if the repo seeds or computes data relative to today (bookings, schedules, windows), KEEP the date-window field; otherwise delete it. A calculation-discrepancy report without the window cannot be reproduced.
- Never add fields for infrastructure the repo does not have (databases, deployments, frontend frameworks it lacks).
- Labels referenced here (`type:bug`, `status:needs-triage`) must exist; create them with `gh label create` during generation.

```yaml
name: Bug report
description: Something is broken or behaving wrongly
title: "[Bug]: "
labels:
  - "type:bug"
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
      required: true

  - type: dropdown
    id: role
    attributes:
      label: Your role
      options:
        - "{{ROLE_OPTION_1}}"
        - "{{ROLE_OPTION_2}}"
        - not-sure
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: What were you doing? Step by step, starting from where you began
    validations:
      required: true

  - type: input
    id: date_window
    attributes:
      label: Date window
      description: Which dates were you looking at? The numbers here change with the date, so a report without the window cannot be reproduced.
      placeholder: "2026-08-01 to 2026-08-15"
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      description: What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual behavior
      description: What actually happened? Include any error text word for word
    validations:
      required: true

  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - "S1: {{SEV_1}}"
        - "S2: {{SEV_2}}"
        - "S3: {{SEV_3}}"
        - "S4: {{SEV_4}}"
    validations:
      required: true
```

Also generate `.github/ISSUE_TEMPLATE/config.yml`. If the repo has an in-app or otherwise preferred filing route, add it as a contact link; otherwise only disable blank issues:

```yaml
blank_issues_enabled: false
```
