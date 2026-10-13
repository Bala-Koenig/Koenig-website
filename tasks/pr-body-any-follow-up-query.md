## What changed
The hero AI search's "Elaborate more on your requirement…" follow-up box now re-searches for **any** non-empty text typed into it. Previously it silently did nothing unless the text matched one of a hard-coded set of topic keywords (azure, security, devops, m365, data, cisco, etc.) — so a query like "advance aws" produced no result at all: no `Refined for` line, no course-card update. Now any follow-up query re-classifies; if it isn't specifically recognized, it falls back to a general Microsoft-courses recommendation (which the engine already had for exactly this case) rather than doing nothing.

## What was NOT touched
- `lib/aiSearch.ts` — no data change; its existing generic fallback branch already returns sane default advice + courses for unrecognized queries.
- The main hero search box's own gating — it still only opens results for a recognized topic, unchanged.
- The `Refined for` line itself — it was already correct, it just wasn't firing.
- `Navbar.tsx`, `app/microsoft/page.tsx`.

No queue entries were held or escalated for this task. One queue candidate for the owner to consider later (not fixed here, out of this task's scope): the *main* hero search box has the same kind of topic-keyword gate — it only opens the results panel for a recognized topic. Worth deciding separately whether that should also change.

## How it was verified
Drove the real page with a headless browser against `npm run dev`:
- Typed "azure security" into the hero box → advice heading showed the security-branch text.
- Typed "advance aws" into the follow-up box and clicked "Search Again" → `Refined for: "advance aws"` appeared, and the advice heading changed to the generic-fallback text ("Following course might meet your requirement.") — confirming the follow-up query, previously ignored, now genuinely re-classifies.
