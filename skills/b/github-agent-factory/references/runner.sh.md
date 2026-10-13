# Runner script template

Generates `scripts/agent/triage-runner.sh`: the headless driver the scheduler fires. It decides whether a run is worth spending, takes the locks, and starts one `claude -p` pass of the triage skill.

Placeholders:

- `{{REPO_PATH}}`: absolute local path of the repo checkout.
- `{{REPO_SLUG}}`: org/repo.
- `{{LOG_PATH}}`: absolute path of the run log, outside the repo tree.
- `{{GIT_USER_NAME}}` / `{{GIT_USER_EMAIL}}`: the identity for agent commits. Use a noreply address; never a personal one.
- `{{MODEL}}`: the model for the pass.
- `{{LOCK_TTL_MINUTES}}`: how old a remote lock may be before it is presumed dead (default 120).
- `{{SECRET_READ_LINES}}`: one line per secret the pass needs, reading it BY NAME from the platform's secret store into an exported variable. macOS: `export NAME="$(security find-generic-password -a agent -s <service> -w)"`. Linux or CI: the environment or `secret-tool`. Never a path to a plaintext file; if a secret is missing, log and exit, never prompt and never fall back to a file.

## Locking (the fix for the claim-guard heuristic)

The blueprint this template comes from guessed queue ownership from comment timing (any issue activity in the last 45 minutes meant "someone else is probably running"). That heuristic stood the runner down on CI noise and, worse, on the very maintainer comments meant to release work. Replace guessing with two real locks:

1. **Machine lock.** `mkdir` a lock directory containing the runner's PID. `mkdir` is atomic; a second start on the same machine exits with a logged SKIP. A leftover lock whose PID is dead (`kill -0` fails) is stale: remove and retake it.
2. **Remote mutex, cross-machine.** Atomic creation of a git ref on GitHub: `gh api` POST to `repos/{{REPO_SLUG}}/git/refs` with `ref=refs/agent-locks/triage` pointing at a freshly created empty commit. Creation fails if the ref exists, which IS the lock. The lock commit's committer date is the acquisition time, so staleness is a fact, not a guess: a lock older than `{{LOCK_TTL_MINUTES}}` is presumed dead; delete it, log the override loudly, and take the lock. Delete the ref in the exit trap.
3. Per-issue ownership inside a run belongs to the triage skill's claim markers, not to the runner.

`--force` skips the queue guard only, never the locks: an operator starting a deliberate run has judged the queue, not the mutex.

## Shape

```bash
#!/usr/bin/env bash
# Headless triage runner for {{REPO_SLUG}}. Fired by the scheduler.
set -u
REPO="{{REPO_PATH}}"
LOG="{{LOG_PATH}}"
LOCKDIR="${TMPDIR:-/tmp}/agent-triage-{{REPO_SLUG_SAFE}}.lock"
RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)-$$"

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1" >> "$LOG"; }

# 1. Machine lock (atomic mkdir; stale if the recorded PID is dead).
if ! mkdir "$LOCKDIR" 2>/dev/null; then
  oldpid="$(cat "$LOCKDIR/pid" 2>/dev/null || echo 0)"
  if [ "$oldpid" -gt 0 ] && kill -0 "$oldpid" 2>/dev/null; then
    log "SKIP: run $oldpid holds the machine lock"; exit 0
  fi
  log "STALE machine lock (pid $oldpid dead): retaking"
  rm -rf "$LOCKDIR"; mkdir "$LOCKDIR" || exit 0
fi
echo $$ > "$LOCKDIR/pid"
trap 'rm -rf "$LOCKDIR"; release_remote_lock' EXIT

cd "$REPO" || { log "FATAL: repo missing"; exit 1; }

# 2. Queue guard: spend a pass only when something is actionable.
#    ({{QUEUE_GUARD}}: gh issue list counting the actionable status labels;
#    --force skips this check, and only this check.)

# 3. Remote mutex: acquire refs/agent-locks/triage (atomic ref creation;
#    presume dead and override, loudly, only past {{LOCK_TTL_MINUTES}}).

# 4. Secrets, by name, from the store. Missing secret: log and exit.
{{SECRET_READ_LINES}}

log "RUN $RUN_ID: starting headless triage pass"
claude -p "Execute ONE full pass of the issue-triage pipeline for
{{REPO_SLUG}}. cd into '$REPO' first. Read and follow
.claude/skills/triage-issues/SKILL.md EXACTLY, RUN_ID=$RUN_ID. Do all
branch work in a disposable git worktree, git fetch origin FIRST, git
user {{GIT_USER_NAME}} <{{GIT_USER_EMAIL}}>. The skill's HARD BOUNDARIES
are absolute. Finish with the run summary, including seat health and
rulings, to stdout." \
  --model {{MODEL}} --permission-mode acceptEdits \
  --allowedTools "Bash Read Edit Write Glob Grep Agent Task WebFetch TodoWrite" \
  >> "$LOG" 2>&1
log "DONE $RUN_ID (exit $?)"
```

Generator rules: expand the numbered comments 2 and 3 into real code, define `release_remote_lock`, keep every path absolute, and register the deny-list hook (`.claude/settings.json` PreToolUse pointing at the copied check-commands.sh) so the headless session inherits it. Test the lock before delivering: start the runner twice at once and show the second exiting on the lock.
