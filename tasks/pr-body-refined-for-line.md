## What changed
On the home page's hero AI search, submitting a query in the "Elaborate more on your requirement…" follow-up box now shows a small line, `Refined for: "[the query you typed]"`, in the site's accent blue (`#0694D1`), placed right below the advice heading and above the recommended-course cards. It only appears after a follow-up search — the first, top-level search never shows it. The recommended-course cards below it already refreshed to match the follow-up query (existing behavior); this change makes that refinement visible to the user.

## What was NOT touched
- `lib/aiSearch.ts` — no data change needed; `classifyAiQuery` already returns fresh courses per query.
- The course-card carousel markup/logic itself.
- The "Search Again" input's styling.
- `Navbar.tsx`.
- `app/microsoft/page.tsx` — checked for the same follow-up-search pattern; it doesn't have one, so there was nothing to mirror there.

No queue entries were held or escalated for this task.

Note for the owner: this same file (`app/(home)/page.tsx`) also carries an earlier, already-verified change from this session — the "Recommended courses" mobile/desktop carousel (queue item 2) — bundled into this same commit since neither had been committed yet.

## How it was verified
Ran the dev server and drove the actual page with a headless browser (Playwright) end to end:
- Typed "i want to learn azure" into the hero search → `Refined for:` line count = 0 (correctly absent), first card = "Microsoft Azure Fundamentals".
- Typed "add power bi" into the follow-up box and clicked "Search Again" → `Refined for:` line count = 1, text = `Refined for: "add power bi"`, computed color = `rgb(6, 148, 209)` (= `#0694D1`, the accent blue), and the first card changed to "Azure Data Fundamentals" — confirming the cards did refresh to the refined query.
