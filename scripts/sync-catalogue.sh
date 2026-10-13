#!/usr/bin/env bash
# Catalogue sync: compare each pinned upstream in catalogue/SOURCES.lock against
# its current remote HEAD and report what changed. Never updates anything by
# itself: a human (or a supervised agent) reads the diff, re-vets the files,
# and bumps the pin in SOURCES.lock deliberately.
# Usage: scripts/sync-catalogue.sh          (report only)

set -u
cd "$(dirname "$0")/.." || exit 1
LOCK="catalogue/SOURCES.lock"
[ -f "$LOCK" ] || { echo "missing $LOCK"; exit 1; }

echo "kstack catalogue sync report, $(date +%F)"
echo "----------------------------------------"
grep -E '^https://' "$LOCK" | while read -r url pin _date clone; do
  remote_head=$(git ls-remote "$url" HEAD 2>/dev/null | cut -f1)
  name=$(basename "$url" .git)
  if [ -z "$remote_head" ]; then
    echo "WARN  $name: could not reach upstream ($url)"
  elif [ "$remote_head" = "$pin" ]; then
    echo "OK    $name: pin matches upstream HEAD (${pin:0:10})"
  else
    echo "DIFF  $name: pinned ${pin:0:10}, upstream now ${remote_head:0:10}"
    if [ -d "$clone" ]; then
      echo "      review with: cd $clone && git fetch origin && git diff ${pin:0:10}..FETCH_HEAD -- ."
    fi
  fi
done
echo "----------------------------------------"
echo "To adopt an update: read the diff, re-vet scripts/hooks, update the pin"
echo "in $LOCK, and re-copy only the vetted files into catalogue/."
