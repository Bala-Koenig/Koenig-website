#!/usr/bin/env bash
# Style linter for kstack-authored skills.
# Checks skills/ (our own work) only. catalogue/ keeps upstream text as-is.
# Fails on: em dashes, en dashes used as dashes, curly quotes, and a short list
# of AI-tell words we never want inside instruction text.
# Usage: scripts/lint-style.sh [path]   (default: skills/)

set -u
TARGET="${1:-skills/}"
cd "$(dirname "$0")/.." || exit 1
fail=0

# Em dash, en dash, curly quotes
if grep -rn --include='*.md' -e $'—' -e $'–' -e $'“' -e $'”' -e $'‘' -e $'’' "$TARGET" 2>/dev/null; then
  echo "FAIL: em/en dashes or curly quotes found above."
  fail=1
fi

# AI-tell vocabulary (word-boundary, case-insensitive).
# Lines carrying the marker <!-- specimen --> are exempt: they quote banned
# words on purpose (e.g. speak-plain's own pattern list).
WORDS='delve|tapestry|testament to|underscores|pivotal|crucially|seamlessly|leverage[sd]? the|holistic|robustly|elevate your|supercharge|game.changer|revolutioniz'
if grep -rniE --include='*.md' "\b($WORDS)" "$TARGET" 2>/dev/null | grep -v 'specimen'; then
  echo "FAIL: AI-tell vocabulary found above."
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "lint-style: clean ($TARGET)"
fi
exit "$fail"
