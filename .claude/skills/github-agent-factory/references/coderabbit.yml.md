# CodeRabbit configuration skeleton

Generates `.coderabbit.yaml`.

Placeholders:

- `{{PATH_N}}` / `{{PATH_INSTRUCTION_N}}`: one entry per danger zone and per incident-derived rule from docs/DANGER-ZONES.md and the familiarization gotchas. The instruction states what the reviewer must flag on that path and why, in one or two sentences.

Generator rules:

- Every path instruction is specific to this repo. "Watch for bugs" is not an instruction; "flag any route handler missing the auth wrapper" is.
- When the developer has accepted a decision that a generic reviewer would keep re-raising, add a known-accepted-decisions entry for that path so review noise does not train the developer to ignore the reviewer.
- Reviews are assertive because most PRs will be agent-authored and the human only merges; the human gate is the merge, not the review tone.

```yaml
language: "en-US"
reviews:
  profile: "assertive"
  high_level_summary: true
  request_changes_workflow: false
  auto_review:
    enabled: true
    drafts: false
  path_instructions:
    - path: "{{PATH_1}}"
      instructions: >-
        {{PATH_INSTRUCTION_1}}
    - path: "{{PATH_2}}"
      instructions: >-
        {{PATH_INSTRUCTION_2}}
chat:
  auto_reply: true
```
