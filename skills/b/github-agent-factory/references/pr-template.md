# Pull request template

Generates `.github/PULL_REQUEST_TEMPLATE.md`.

Placeholders:

- `{{CHECK_COMMANDS}}`: the repo's real check commands, comma-separated (for example `npm run typecheck, npm run build, npm test`). Only commands the factory actually ran during generation.
- `{{LOCATION_LABEL}}`: same as the issue forms (route, screen, command).

The body keeps the three-part shape (What changed / Not touched / Evidence) so a non-technical reader can follow a PR, and the agent checklist keeps the agent honest.

```markdown
Closes #<issue>

## What changed

- <!-- 2 to 4 bullets: the change and why, in plain words -->

## Not touched

- <!-- the out-of-scope list from the approved plan, copied, not summarized -->

## Evidence

<!-- pasted output of the checks, plus the proof for the reported behavior:
     a screenshot, a response body, a before/after. Claims without pasted
     evidence do not count. -->

## Risk class

<!-- R1 / R2 / R3 plus a one-line justification against CONTRIBUTING.md -->

## Preview

Test path: `<{{LOCATION_LABEL}}>`

## Reporter verification

- [ ] Re-ran the repro steps from the issue on the preview
- [ ] Expected behavior confirmed
- [ ] No regression on the same page or path for the other roles

## Agent checklist

- [ ] {{CHECK_COMMANDS}} all green locally, output pasted under Evidence
- [ ] No changes outside the stated scope
- [ ] Branch rebased on the default branch
- [ ] Docs updated if any documented path moved
```
