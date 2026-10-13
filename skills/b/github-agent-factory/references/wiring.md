# Wiring instructions template

Generates `WIRING.md` at the repo root: the manual steps between generated files and a live loop, written for the developer to follow with a browser and a terminal. The factory does none of these; that is deliberate, because every one of them is an authority grant.

Placeholders:

- `{{REPO_SLUG}}`, `{{DEFAULT_BRANCH}}`, `{{CHECK_NAMES}}` (the CI job names branch protection will require), `{{SECRET_TABLE_ROWS}}` (one row per secret: name, which component reads it, which store it lives in), `{{LAUNCHD_LABEL}}`, `{{RUNNER_PATH}}`.

```markdown
# Wiring: what you must do by hand

Everything generated today is inert until you finish this list. Do the
steps in order; stop at the tier you want live.

## Tier 1 (safe to do now)

1. Branch protection on `{{DEFAULT_BRANCH}}`
   (Settings, Branches, Add rule): require a pull request before merging,
   require the status checks {{CHECK_NAMES}}, block force pushes, and
   restrict who can merge to yourself. The agent relies on these being
   enforced by GitHub, not by its own good behavior.
2. Install the CodeRabbit app on {{REPO_SLUG}} so `.coderabbit.yaml`
   takes effect.
3. Push the generated files on a branch and merge them like any PR, so CI
   and the docs-drift gate run on them once before anything else does.

## Tier 2 (each step arms part of the loop)

4. Secrets into the store, by name. Values never go into any file in or
   near this repo.

   | name | read by | store |
   |---|---|---|
   {{SECRET_TABLE_ROWS}}

5. External seat sign-in (only if configured): authenticate the backend
   once, then run the seat script by hand on a scrap plan file and confirm
   the JSON line reports health status "ran".
6. First supervised run: `bash {{RUNNER_PATH}} --force`, watched, before
   any schedule exists. Read the whole run log and the run summary. Do not
   schedule a loop you have not watched once.
7. Load the scheduler:
   `launchctl load ~/Library/LaunchAgents/{{LAUNCHD_LABEL}}.plist`
   (or install the crontab line). This is the on switch. Unloading it is
   the off switch, and the runner's locks make repeated fires safe.

## Turning it off

Unload the scheduler; that stops new runs. A run already in flight
finishes its current issue and releases its claims. `/hold` on an issue
pauses that issue without touching the loop.
```
