#!/usr/bin/env bash
# kstack telemetry: one JSONL line per skill invocation, local only.
# Usage: klog.sh <skill> <outcome> [detail]
#   outcome: completed | stopped | escalated | blocked
# Writes to .claude/kstack/log.jsonl in the current project. Never fails the
# caller: any error exits 0 silently. Nothing is ever sent anywhere.

skill="${1:-unknown}"
outcome="${2:-unknown}"
detail="${3:-}"

dir=".claude/kstack"
mkdir -p "$dir" 2>/dev/null || exit 0
ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
# JSON-escape the free-text detail field with python3; fall back to empty.
detail_json=$(printf '%s' "$detail" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' 2>/dev/null || echo '""')
printf '{"ts":"%s","skill":"%s","outcome":"%s","detail":%s}\n' \
  "$ts" "$skill" "$outcome" "$detail_json" >> "$dir/log.jsonl" 2>/dev/null
exit 0
