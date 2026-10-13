#!/usr/bin/env bash
# kstack guard, PreToolUse hook for the Bash tool.
#
# Reads the hook payload as JSON on stdin, looks at the command, and prints
# exactly one JSON line on stdout. Allow is {}. Ask and deny nest under
# hookSpecificOutput; Claude Code silently ignores a top-level decision, so
# the nesting is not optional.
#
# Tiers:
#   deny  (HIGH)   recursive rm of root or home, force-push to the default
#                  branch, git reset --hard, git clean -f, git branch -D on
#                  the default branch.
#   ask   (MEDIUM) recursive rm, drop table, truncate, forced pushes in
#                  general, checkout/restore dot, kubectl delete, docker
#                  rm -f and prune, a write outside the plan fence, deleting
#                  the fence itself, plus project patterns and the
#                  obfuscation tripwire.
#
# Two design rules the earlier version got wrong, restored here:
#   1. Normalize before matching. A command is canonicalized (leading path
#      stripped to a basename, empty quote pairs removed, git/kubectl global
#      options that sit before the subcommand dropped) so `git -C . reset
#      --hard`, `/bin/rm -rf /`, and `g''it clean -fd` are seen for what they
#      are, not waved through on a surface mismatch.
#   2. Split compound commands and judge each part. `rm -rf ~ || true` no
#      longer downgrades to ask because a trailing `|| true` made the whole
#      string "not simple". Each segment between ; && || | and newline is
#      canonicalized and run through the deny tier on its own.
#
# The fence: while tasks/fence.txt exists a Bash command that writes a file
# outside the fenced paths (redirection, tee, sed -i, dd of=, cp/mv target)
# is sent to ask, matching the Edit/Write hook. Ask, not deny: an interactive
# owner can approve a legitimate out-of-fence write, while a headless run
# (acceptEdits) auto-denies it, which is the behavior the chain wants.
#
# Failure polarity: if the payload cannot be parsed, or python3 is missing,
# this script asks. Nothing destructive gets waved through on an error.
# No logging, no network, no state written. The only extra files read are
# tasks/fence.txt (the plan fence) and .claude/kstack/careful-patterns.txt,
# which can add ask rules but can never remove a built-in one.

set -u

FENCE_FILE="tasks/fence.txt"

PAYLOAD=$(cat 2>/dev/null || true)

emit_allow() {
  printf '{}\n'
  exit 0
}

# This constant is hand-written JSON, which is safe only because it is a
# constant. Anything with variable text goes through python3 json.dumps.
ASK_FALLBACK='{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"kstack guard could not safety-check this command. Approve only if you know exactly what it does."}}'

emit() {
  # $1 is ask or deny, $2 is the human reason. json.dumps does the quoting
  # so a stray quote in a path cannot produce malformed JSON that Claude
  # Code would silently ignore.
  if ! python3 - "$1" "$2" <<'PY'
import json, sys
print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": sys.argv[1],
    "permissionDecisionReason": sys.argv[2]}}))
PY
  then
    printf '%s\n' "$ASK_FALLBACK"
  fi
  exit 0
}

if ! command -v python3 >/dev/null 2>&1; then
  printf '%s\n' "$ASK_FALLBACK"
  exit 0
fi

# Parse with a real JSON parser. A grep extractor truncates at the first
# escaped quote, which once let a smuggled rm -rf ride behind a commit
# message. Exit codes: 0 command extracted, 3 unparseable, 4 no command
# field in an otherwise valid payload.
CMD=$(printf '%s' "$PAYLOAD" | python3 -c '
import json, sys
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(3)
cmd = (data.get("tool_input") or {}).get("command")
if cmd is None:
    sys.exit(4)
if not isinstance(cmd, str):
    sys.exit(3)
sys.stdout.write(cmd)
')
rc=$?
if [ "$rc" -eq 4 ]; then
  emit_allow
elif [ "$rc" -ne 0 ]; then
  emit ask "kstack guard could not safety-check this command (the hook payload did not parse as JSON). Approve only if you know exactly what it does."
fi
[ -z "$CMD" ] && emit_allow

# Obfuscation tripwire, run on the whole command before it is split. IFS
# splitting and base64 indirection hide what a command runs; curl or wget
# piped straight into a shell or interpreter is the download-and-execute
# pattern the guard exists to catch. We do not try to out-parse bash; these
# get flagged to the owner.
if printf '%s' "$CMD" | grep -qE '\$\{IFS\}|\$IFS|\$\(echo[^)]*base64[^)]*\)|base64[[:space:]]+(-d|--decode)[^|]*\|[[:space:]]*(sh|bash)'; then
  emit ask "This command uses shell splitting or decoding tricks (IFS or base64 indirection) that hide what it really runs. Approve only if you wrote it and know why it needs that."
fi
if printf '%s' "$CMD" | grep -qE '(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(ba|z)?sh|(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(python3?|node|perl|ruby)'; then
  emit ask "This downloads a script from the network and pipes it straight into a shell or interpreter, running whatever the server sends. Approve only if you trust that exact URL and know what it installs."
fi

strip_quotes() {
  # Remove one layer of matching quotes from a token.
  local t="$1"
  case "$t" in
    \"*\") t="${t#\"}"; t="${t%\"}" ;;
    \'*\') t="${t#\'}"; t="${t%\'}" ;;
  esac
  printf '%s' "$t"
}

# Canonicalize one command segment for pattern matching. Tokenizes with a
# real shell lexer (shlex) so quotes are honored, then: reduces the leading
# executable to its basename (/bin/rm -> rm, g''it -> git), drops git and
# kubectl global options that precede the subcommand (git -C DIR reset ->
# git reset), and drops -m/-k/--message arguments whole so a keyword inside a
# commit message or a test selector cannot trip the destructive-keyword
# rules. On a lexer error (unbalanced quotes) it falls back to whitespace
# splitting, which is no worse than the old behavior.
canon() {
  python3 - "$1" <<'PY'
import sys, shlex
seg = sys.argv[1]
try:
    toks = shlex.split(seg, posix=True)
except Exception:
    toks = seg.split()
out = []
cmd0 = None
skip = False
first = True
for t in toks:
    if skip:
        skip = False
        continue
    if first:
        t = t.rsplit('/', 1)[-1]
        cmd0 = t
        out.append(t)
        first = False
        continue
    if cmd0 == 'sudo' and not t.startswith('-'):
        t = t.rsplit('/', 1)[-1]
        cmd0 = t
        out.append(t)
        continue
    if cmd0 == 'git':
        if t in ('-C', '-c', '--git-dir', '--work-tree', '--namespace'):
            skip = True
            continue
        if t.startswith(('--git-dir=', '--work-tree=', '-C', '-c')):
            continue
        if t in ('--no-pager', '--paginate', '--bare', '--literal-pathspecs', '--no-optional-locks'):
            continue
    if cmd0 == 'kubectl':
        if t in ('--context', '--namespace', '--kubeconfig', '--cluster', '--user', '--as', '--token', '--server', '-n'):
            skip = True
            continue
        if t.startswith(('--context=', '--namespace=', '--kubeconfig=')) or (t.startswith('-n') and len(t) > 2):
            continue
    if t in ('-m', '--message', '-k'):
        skip = True
        continue
    if t.startswith('--message=') or (t.startswith('-m') and len(t) > 2) or (t.startswith('-k') and len(t) > 2):
        continue
    out.append(t)
sys.stdout.write(' '.join(out))
PY
}

default_branch() {
  local ref
  if ref=$(git symbolic-ref -q refs/remotes/origin/HEAD 2>/dev/null); then
    printf '%s' "${ref#refs/remotes/origin/}"
    return 0
  fi
  if git show-ref --verify -q refs/remotes/origin/main 2>/dev/null; then
    printf 'main'; return 0
  fi
  if git show-ref --verify -q refs/remotes/origin/master 2>/dev/null; then
    printf 'master'; return 0
  fi
  local init
  init=$(git config --get init.defaultBranch 2>/dev/null)
  if [ -n "$init" ]; then printf '%s' "$init"; return 0; fi
  printf 'main'
}

# Deny predicates. Each takes a canonicalized segment as $1.
is_rm_of_root_or_home() {
  local c="$1"
  case "$c" in
    rm\ *|sudo\ rm\ *) : ;;
    *) return 1 ;;
  esac
  printf '%s' "$c" | grep -qE '(^|[[:space:]])(-[a-zA-Z]*[rR][a-zA-Z]*|--recursive)([[:space:]]|$)' || return 1
  set -f
  local found=0 tok t
  for tok in $c; do
    case "$tok" in
      sudo|rm|--|-*) continue ;;
      *'>'*|*'<'*|'&'*) continue ;;
    esac
    t=$(strip_quotes "$tok")
    case "$t" in
      /|'~'|'~/'|'$HOME'|'$HOME/'|'${HOME}'|'${HOME}/'|/\*|//) found=1 ;;
      *) set +f; return 1 ;;
    esac
  done
  set +f
  [ "$found" -eq 1 ]
}

is_force_push_to_default() {
  local c="$1"
  case "$c" in
    git\ push*|sudo\ git\ push*) : ;;
    *) return 1 ;;
  esac
  local force=0 tok t refcount=0 refs="" db cur
  set -f
  for tok in $c; do
    case "$tok" in
      -f|--force) force=1; continue ;;
      --force-with-lease*|--force-if-includes) continue ;;
      sudo|git|push) continue ;;
      -*) continue ;;
    esac
    t=$(strip_quotes "$tok")
    case "$t" in
      +*) force=1; t="${t#+}" ;;
    esac
    case "$t" in
      *:*) t="${t##*:}" ;;
    esac
    refcount=$((refcount + 1))
    if [ "$refcount" -ge 2 ]; then
      refs="$refs $t"
    fi
  done
  set +f
  [ "$force" -eq 1 ] || return 1
  db=$(default_branch)
  if [ "$refcount" -ge 2 ]; then
    for t in $refs; do
      [ "$t" = "$db" ] && return 0
    done
    return 1
  fi
  cur=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf '')
  [ -n "$cur" ] && [ "$cur" = "$db" ]
}

is_reset_hard() {
  local c="$1"
  case "$c" in
    git\ reset*|sudo\ git\ reset*) : ;;
    *) return 1 ;;
  esac
  local tok
  set -f
  for tok in $c; do
    if [ "$tok" = "--hard" ]; then set +f; return 0; fi
  done
  set +f
  return 1
}

is_clean_force() {
  local c="$1"
  case "$c" in
    git\ clean*|sudo\ git\ clean*) : ;;
    *) return 1 ;;
  esac
  local tok
  set -f
  for tok in $c; do
    case "$tok" in
      --force) set +f; return 0 ;;
      --*) : ;;
      -[a-zA-Z]*) case "$tok" in *f*) set +f; return 0 ;; esac ;;
    esac
  done
  set +f
  return 1
}

is_branch_delete_default() {
  local c="$1"
  case "$c" in
    git\ branch*|sudo\ git\ branch*) : ;;
    *) return 1 ;;
  esac
  local del=0 tok t db
  set -f
  for tok in $c; do
    [ "$tok" = "-D" ] && del=1
  done
  if [ "$del" -ne 1 ]; then set +f; return 1; fi
  db=$(default_branch)
  for tok in $c; do
    case "$tok" in
      sudo|git|branch|-*) continue ;;
    esac
    t=$(strip_quotes "$tok")
    if [ "$t" = "$db" ]; then set +f; return 0; fi
  done
  set +f
  return 1
}

is_artifact_rm() {
  # A whole segment that is nothing but a recursive rm of well-known build
  # artifacts is safe and should not even ask.
  printf '%s' "$1" | grep -qE '^[[:space:]]*rm[[:space:]]+(-[a-zA-Z]*[rR][a-zA-Z]*[[:space:]]+|--recursive[[:space:]]+)+(([^[:space:];&|#(`]*/)?(node_modules|\.next|dist|__pycache__|\.cache|build|\.turbo|coverage|\.pytest_cache|\.venv|\.tox|\.mypy_cache|\.ruff_cache|target|vendor|out)/?[[:space:]]*)+$'
}

# Fence membership, mirrors the Edit/Write hook so a Bash write is judged by
# the same rule an Edit would be.
_normalize() {
  local p="$1"
  case "$p" in
    /*) : ;;
    '~') p="$HOME" ;;
    '~/'*) p="$HOME/${p#\~/}" ;;
    *) p="$(pwd)/$p" ;;
  esac
  p=$(printf '%s' "$p" | sed 's#//*#/#g')
  if [ "$p" != "/" ]; then p="${p%/}"; fi
  printf '%s' "$p"
}
_resolve() {
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
    if [ "$dir" = "/" ]; then printf '/%s' "$base"; else printf '%s/%s' "$dir" "$base"; fi
  else
    printf '%s' "$p"
  fi
}
FENCE_RES=""
fence_target_path() {
  # Absolute resolved path of tasks/fence.txt, computed once.
  if [ -z "$FENCE_RES" ]; then
    FENCE_RES=$(_resolve "$(_normalize "$FENCE_FILE")")
  fi
  printf '%s' "$FENCE_RES"
}
path_in_fence() {
  # 0 if the given raw path is inside the fence or an always-allowed path.
  local res allowed=0 line is_dir entry
  res=$(_resolve "$(_normalize "$1")")
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [ -z "$line" ] && continue
    case "$line" in '#'*) continue ;; esac
    is_dir=0
    case "$line" in */) is_dir=1 ;; esac
    entry=$(_resolve "$(_normalize "$line")")
    if [ "$is_dir" -eq 1 ]; then
      case "$res" in "$entry"|"$entry"/*) allowed=1; break ;; esac
    else
      [ "$res" = "$entry" ] && { allowed=1; break; }
    fi
  done <<EOF
docs/architecture.md
docs/decisions.md
CLAUDE.md
.gitignore
tasks/
.claude/kstack/
$(cat "$FENCE_FILE" 2>/dev/null)
EOF
  [ "$allowed" -eq 1 ]
}

# Collect candidate write-destination paths from a segment: redirection
# targets, tee/sed -i/dd of= targets, cp/mv destinations. Emits one raw path
# per line. Best-effort by design; anything it catches that is out of fence
# goes to ask, never deny.
write_targets() {
  local seg="$1" tok prev="" cmd0="" first=1 last="" ntok=0
  set -f
  for tok in $seg; do
    case "$tok" in
      '>'|'>>'|'1>'|'2>'|'&>'|'1>>'|'2>>')
        prev="REDIR"; continue ;;
      '>'*|'>>'*|'1>'*|'2>'*|'&>'*)
        t="${tok#*>}"; t="${t#>}"; t=$(strip_quotes "$t")
        [ -n "$t" ] && printf '%s\n' "$t"
        prev=""; continue ;;
    esac
    if [ "$prev" = "REDIR" ]; then
      t=$(strip_quotes "$tok"); [ -n "$t" ] && printf '%s\n' "$t"; prev=""; continue
    fi
    case "$tok" in
      of=*) t="${tok#of=}"; t=$(strip_quotes "$t"); [ -n "$t" ] && printf '%s\n' "$t" ;;
    esac
    if [ "$first" -eq 1 ]; then cmd0="${tok##*/}"; first=0; fi
    ntok=$((ntok+1))
    last="$tok"
  done
  set +f
  case "$cmd0" in
    tee)
      set -f
      for tok in $seg; do
        case "$tok" in
          tee|/*tee|-*) continue ;;
          *) t=$(strip_quotes "$tok"); [ -n "$t" ] && printf '%s\n' "$t" ;;
        esac
      done
      set +f ;;
    sed)
      case " $seg " in
        *' -i'*|*' -i'''*)
          t=$(strip_quotes "$last")
          case "$t" in -*) : ;; *) [ -n "$t" ] && printf '%s\n' "$t" ;; esac ;;
      esac ;;
    cp|mv|install)
      t=$(strip_quotes "$last")
      case "$t" in -*) : ;; *) [ -n "$t" ] && printf '%s\n' "$t" ;; esac ;;
  esac
}

# Split the command into segments on ; && || | and newline, respecting
# quotes. We split on newline, so no segment can itself contain one; that
# makes newline a safe inter-segment delimiter that survives a shell
# variable (a NUL does not). Blank pieces collapse to empty lines and are
# skipped in each pass.
SEGMENTS=$(printf '%s' "$CMD" | python3 -c '
import sys
s=sys.stdin.read(); segs=[]; cur=""; i=0; n=len(s); q=None
while i<n:
    c=s[i]
    if q:
        cur+=c
        if c==q: q=None
        i+=1; continue
    if c in "\x27\"":
        q=c; cur+=c; i+=1; continue
    if s[i:i+2] in ("\x26\x26","||"):
        segs.append(cur); cur=""; i+=2; continue
    if c in ";|\n":
        segs.append(cur); cur=""; i+=1; continue
    cur+=c; i+=1
segs.append(cur)
sys.stdout.write("\n".join(seg.replace("\n"," ") for seg in segs))
')

FENCE_ACTIVE=0
[ -f "$FENCE_FILE" ] && FENCE_ACTIVE=1

# Pass 1: deny tier, per segment. A deny anywhere wins.
while IFS= read -r seg; do
  [ -z "${seg//[[:space:]]/}" ] && continue
  cseg=$(canon "$seg")
  if is_rm_of_root_or_home "$cseg"; then
    emit deny "This delete targets your home folder or the root of the disk. kstack guard blocks it outright. If you truly mean it, run it yourself in a terminal outside this session."
  fi
  if is_force_push_to_default "$cseg"; then
    emit deny "This force-push would rewrite history on the default branch ($(default_branch)). kstack guard blocks it. Push a task branch and open a pull request instead."
  fi
  if is_reset_hard "$cseg"; then
    emit deny "git reset --hard throws away uncommitted work with no undo. kstack guard blocks it. If you want this, run it yourself in a terminal outside this session."
  fi
  if is_clean_force "$cseg"; then
    emit deny "git clean with -f permanently deletes untracked files. kstack guard blocks it. If you want this, run it yourself in a terminal outside this session."
  fi
  if is_branch_delete_default "$cseg"; then
    emit deny "This would delete the default branch ($(default_branch)). kstack guard blocks it."
  fi
done <<< "$SEGMENTS"

# Pass 2: ask tier, per segment. First match wins.
while IFS= read -r seg; do
  [ -z "${seg//[[:space:]]/}" ] && continue
  cseg=$(canon "$seg")
  clow=$(printf '%s' "$cseg" | tr '[:upper:]' '[:lower:]')
  cmd0="${cseg%% *}"

  # Fence: deleting or moving the fence file turns the guard off. Ask so the
  # owner does it consciously; a headless run cannot silently disarm itself.
  if [ "$FENCE_ACTIVE" -eq 1 ]; then
    case "$cmd0" in
      rm|mv|shred|unlink)
        set -f
        for tok in $cseg; do
          case "$tok" in rm|mv|shred|unlink|-*) continue ;; esac
          if [ "$(_resolve "$(_normalize "$(strip_quotes "$tok")")")" = "$(fence_target_path)" ]; then
            set +f
            emit ask "This removes the plan fence (tasks/fence.txt), which turns kstack guard off for this project. Approve only if you mean to stop fencing edits."
          fi
        done
        set +f ;;
    esac
  fi

  # Recursive rm, unless the whole segment is just build-artifact cleanup.
  if printf '%s' "$cseg" | grep -qE '(^|[[:space:]])rm[[:space:]]+(-[a-zA-Z]*[rR]|--recursive)'; then
    if ! is_artifact_rm "$cseg"; then
      emit ask "Recursive delete. Check the target path before approving; deleted files do not come back."
    fi
  fi
  # Destructive SQL keywords, skipped when the segment's command only prints
  # or searches text (echo, printf, grep and friends cannot drop a table).
  case "$cmd0" in
    echo|printf|grep|egrep|fgrep|rg|ag|true|false) : ;;
    *)
      if printf '%s' "$clow" | grep -qE 'drop[[:space:]]+(table|database)'; then
        emit ask "This drops a database table or a whole database. Approve only if you have a backup or truly do not need the data."
      fi
      if printf '%s' "$clow" | grep -qE '(^|[^[:alnum:]_])truncate([^[:alnum:]_]|$)'; then
        emit ask "truncate wipes data in place. Approve only if losing that data is fine."
      fi ;;
  esac
  if printf '%s' "$cseg" | grep -qE 'git[[:space:]]+push' && printf '%s' "$cseg" | grep -qE '(^|[[:space:]])(-f|--force)([[:space:]]|$)|[[:space:]]\+[^[:space:]]'; then
    emit ask "Forced git push. This rewrites remote history. Approve only if nobody else builds on that branch."
  fi
  if printf '%s' "$cseg" | grep -qE 'git[[:space:]]+reset[[:space:]]+--hard'; then
    emit ask "git reset --hard inside a compound command. It throws away uncommitted work. Approve only if you are sure nothing unsaved matters."
  fi
  if printf '%s' "$cseg" | grep -qE 'git[[:space:]]+clean[[:space:]]+(-[a-zA-Z]*f|--force)'; then
    emit ask "git clean with -f inside a compound command. It permanently deletes untracked files."
  fi
  if printf '%s' "$cseg" | grep -qE 'git[[:space:]]+branch[[:space:]].*-D'; then
    emit ask "Force-deleting a branch. Approve only if its commits are merged or truly unwanted."
  fi
  if printf '%s' "$cseg" | grep -qE 'git[[:space:]]+(checkout|restore)[[:space:]]+\.([[:space:]]|$)'; then
    emit ask "This discards every local change in the working tree. Approve only if nothing unsaved matters."
  fi
  # kubectl delete, unless it is a dry run (which changes nothing).
  if printf '%s' "$cseg" | grep -qE 'kubectl[[:space:]]+delete'; then
    if ! printf '%s' "$cseg" | grep -qE '\-\-dry-run'; then
      emit ask "kubectl delete removes live cluster resources. Check the target before approving."
    fi
  fi
  if printf '%s' "$cseg" | grep -qE 'docker[[:space:]]+(rm[[:space:]]+-f|system[[:space:]]+prune)'; then
    emit ask "This force-removes docker containers or prunes the system. Check what would be lost before approving."
  fi
done <<< "$SEGMENTS"

# Pass 3: fence-write coverage. A Bash write outside the fenced paths asks,
# so redirection and in-place editors cannot walk around the Edit/Write hook.
if [ "$FENCE_ACTIVE" -eq 1 ]; then
  while IFS= read -r seg; do
    [ -z "${seg//[[:space:]]/}" ] && continue
    while IFS= read -r target || [ -n "$target" ]; do
      [ -z "$target" ] && continue
      case "$target" in
        /dev/*|/dev/null) continue ;;
      esac
      if ! path_in_fence "$target"; then
        emit ask "This command writes to $target, which is not in the approved plan (tasks/fence.txt). kstack guard fences Bash writes the same way it fences edits. Approve only if that file is meant to change; a headless run will block it."
      fi
    done < <(write_targets "$seg")
  done <<< "$SEGMENTS"
fi

# Project-added patterns, consulted after the built-ins so a project can only
# add rules, never suppress one. One POSIX extended regex per line, blank
# lines and # comments skipped, invalid regexes skipped.
PATFILE=".claude/kstack/careful-patterns.txt"
if [ -f "$PATFILE" ]; then
  while IFS= read -r pat || [ -n "$pat" ]; do
    case "$pat" in
      ''|'#'*) continue ;;
    esac
    printf '' | grep -qE -- "$pat" 2>/dev/null
    [ $? -eq 2 ] && continue
    if printf '%s' "$CMD" | grep -qE -- "$pat"; then
      emit ask "Project rule matched: $pat"
    fi
  done < "$PATFILE"
fi

emit_allow
