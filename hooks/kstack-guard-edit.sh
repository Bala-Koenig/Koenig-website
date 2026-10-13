#!/usr/bin/env bash
# kstack guard, PreToolUse hook for Edit and Write.
#
# If tasks/fence.txt exists, the file being edited must be inside the
# fence list or one of the always-allowed paths (tasks/,
# docs/architecture.md, docs/decisions.md, CLAUDE.md, .gitignore,
# .claude/kstack/). Everything else is denied with a plain reason. CLAUDE.md
# and .gitignore are always-allowed because update-memory and familiarize
# touch them while a fence is live. The fence file itself, though it sits
# under the always-allowed tasks/, is never editable while active, so a
# session cannot widen its own fence. Edit and Write carry file_path;
# NotebookEdit carries notebook_path and is fenced the same way.
#
# Install modes: in a plugin install the guard skill's frontmatter runs
# this script via CLAUDE_PLUGIN_ROOT. In a copied install (script under
# .claude/hooks/) it is registered through hooks/settings-snippet.json
# with a project-relative path; the fence path below is relative to the
# project directory, which is the working directory for hooks, so both
# modes read the same file.
#
# This is the deny tier and it fails closed: an unparseable payload or a
# missing python3 means deny, never allow. A boundary that fails open is
# not a boundary.
#
# Output contract: exactly one JSON line on stdout, exit 0 always. Allow is
# {}. Deny nests under hookSpecificOutput or Claude Code ignores it.
# No logging, no network, no state written.

set -u

# The guard skill writes this exact literal path and this hook reads the
# same literal path. Do not route it through an environment variable on
# either side; a writer/reader mismatch makes the fence silently inert.
FENCE_FILE="tasks/fence.txt"

PAYLOAD=$(cat 2>/dev/null || true)

emit_allow() {
  printf '{}\n'
  exit 0
}

# Constant fallback, safe to hand-write because nothing variable is in it.
DENY_FALLBACK='{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"kstack guard could not check this edit against the plan fence, so it is blocked. Fix python3, or say guard off to delete tasks/fence.txt and drop the fence."}}'

emit_deny() {
  # Reason passes through json.dumps so a quote in a path cannot produce
  # malformed JSON that Claude Code would silently ignore.
  if ! python3 - "$1" <<'PY'
import json, sys
print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": sys.argv[1]}}))
PY
  then
    printf '%s\n' "$DENY_FALLBACK"
  fi
  exit 0
}

# No fence file means guard is not active. Allow everything.
[ -f "$FENCE_FILE" ] || emit_allow

if ! command -v python3 >/dev/null 2>&1; then
  printf '%s\n' "$DENY_FALLBACK"
  exit 0
fi

# Exit codes: 0 path extracted, 3 unparseable, 4 no path field. Edit and
# Write carry file_path; NotebookEdit carries notebook_path and matches the
# Edit|Write matcher as a substring, so it reaches this hook and must be
# fenced too. A payload with neither field, while a fence is active, is an
# edit whose target we cannot read: deny, because a boundary that fails open
# is not a boundary.
TARGET=$(printf '%s' "$PAYLOAD" | python3 -c '
import json, sys
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(3)
ti = data.get("tool_input") or {}
path = ti.get("file_path")
if path is None:
    path = ti.get("notebook_path")
if path is None:
    sys.exit(4)
if not isinstance(path, str):
    sys.exit(3)
sys.stdout.write(path)
')
rc=$?
if [ "$rc" -eq 4 ]; then
  emit_deny "kstack guard could not find which file this edit targets in the hook payload, so it is blocked while the plan fence in $FENCE_FILE is active. Say guard off to drop the fence."
elif [ "$rc" -ne 0 ]; then
  emit_deny "kstack guard could not read which file this edit targets (the hook payload did not parse), so the edit is blocked while the plan fence in $FENCE_FILE is active. Say guard off to drop the fence."
fi
[ -z "$TARGET" ] && emit_deny "kstack guard received an empty target path, so the edit is blocked while the plan fence in $FENCE_FILE is active. Say guard off to drop the fence."

normalize() {
  # Absolute path, collapsed slashes, no trailing slash (except root).
  local p="$1"
  case "$p" in
    /*) : ;;
    '~') p="$HOME" ;;
    '~/'*) p="$HOME/${p#\~/}" ;;
    *) p="$(pwd)/$p" ;;
  esac
  p=$(printf '%s' "$p" | sed 's#//*#/#g')
  if [ "$p" != "/" ]; then
    p="${p%/}"
  fi
  printf '%s' "$p"
}

resolve_path() {
  # Follow symlinks through the final component with a bounded loop, then
  # physically resolve the parent directory. A file that does not exist
  # yet has no link to follow, so resolving its parent is the right move.
  # A symlink inside the fence pointing outside must be judged by where it
  # points, not where it sits.
  local p="$1" i=0 link dir base
  while [ "$i" -lt 40 ] && [ -L "$p" ]; do
    link=$(readlink "$p") || break
    case "$link" in
      /*) p="$link" ;;
      *) p="$(dirname "$p")/$link" ;;
    esac
    i=$((i + 1))
  done
  dir=$(dirname "$p")
  base=$(basename "$p")
  if dir=$(cd "$dir" 2>/dev/null && pwd -P); then
    if [ "$dir" = "/" ]; then
      printf '/%s' "$base"
    else
      printf '%s/%s' "$dir" "$base"
    fi
  else
    printf '%s' "$p"
  fi
}

RES=$(resolve_path "$(normalize "$TARGET")")

# Fence self-protection. The fence file lives under tasks/, which is
# always-allowed, so without this an agent could edit tasks/fence.txt to add
# its own file and walk out of the fence. Guard creates the fence when none
# exists (this hook allows everything in that state, above), so blocking
# edits to it while it is active stops self-widening without stopping guard's
# own setup. To change scope, the owner approves and guard refreshes after a
# guard off, or edits the plan and re-fences from a clean state.
FENCE_RES=$(resolve_path "$(normalize "$FENCE_FILE")")
if [ "$RES" = "$FENCE_RES" ]; then
  emit_deny "Blocked: $RES is the plan fence itself. kstack guard does not let a session widen its own fence. To change what this task may touch, agree the new scope with the owner, say guard off to drop the fence, and let guard rebuild it from the updated plan."
fi

allowed=0
while IFS= read -r line || [ -n "$line" ]; do
  # Trim leading and trailing whitespace only. Stripping all whitespace
  # destroys paths with internal spaces, which broke the upstream fence.
  line="${line#"${line%%[![:space:]]*}"}"
  line="${line%"${line##*[![:space:]]}"}"
  [ -z "$line" ] && continue
  case "$line" in
    '#'*) continue ;;
  esac
  is_dir=0
  case "$line" in
    */) is_dir=1 ;;
  esac
  entry=$(resolve_path "$(normalize "$line")")
  if [ "$is_dir" -eq 1 ]; then
    # The restored slash in the pattern stops /src from matching /src-old.
    case "$RES" in
      "$entry"|"$entry"/*) allowed=1; break ;;
    esac
  else
    if [ "$RES" = "$entry" ]; then
      allowed=1
      break
    fi
  fi
done <<EOF
docs/architecture.md
docs/decisions.md
CLAUDE.md
.gitignore
tasks/
.claude/kstack/
$(cat "$FENCE_FILE")
EOF

if [ "$allowed" -eq 1 ]; then
  emit_allow
fi

emit_deny "Blocked: $RES is not in the approved plan, so kstack guard stopped this edit. The fence list is $FENCE_FILE. To change this file, add it to the plan with the owner and refresh the fence, or say guard off to delete the fence file and drop the fence."
