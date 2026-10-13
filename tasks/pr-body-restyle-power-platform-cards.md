## What changed

Restyled the course cards and pagination on `/technologies/power-platform` (the "Certification Explorer" section) to match the visual design already used on `/microsoft`'s course cards and pagination pill.

Cards: the level badge is now a light pill (was a colored gradient badge), "Download Syllabus" moved from a footer button to a small text link under the course title, the code chip is now a light-gray chip, and the price/rating row shows enrolled+rating on the left with one large price on the right. The footer now has an outline "View Course" button and a filled "Enquire now" button (opens the existing request-info modal) in place of the old "Download Syllabus"/"View Course" pair.

Pagination: both the desktop and mobile pagination blocks now render inside a single rounded pill container (matching `/microsoft`), with "Previous"/"Next" text next to the arrow icons and a border-highlight style for the active page number instead of a filled circle.

Applied at both desktop and mobile breakpoints, per the owner's explicit instruction that this page is exempt from the project's standing "mobile-only changes" rule.

## What was NOT touched

- `app/microsoft/page.tsx` — used only as a visual reference, never edited
- Every other component under `app/technologies/power-platform/components/` (Hero, TrustedCompanies, CourseLeadForm, RelatedTech, CourseOverview, SampleCertificate, UniqueOfferings, UpcomingBatches, Comparison, Awards, Testimonials, FAQ, TrainingProfessionals, FinalCTA, ScrollProgress) — none render cards or pagination
- The filter drawer, technology bottom-sheet, syllabus modal, and request-info modal inside CourseListings.tsx — same file, unrelated UI, left as-is
- No queue entries were held or escalated; this was the only active item.

## How it was verified

- Fresh `curl http://localhost:3000/technologies/power-platform` → `HTTP 200`
- New markup confirmed present in the rendered HTML: `cert-pill-level` (13), `cert-syllabus-link` (14), `cert-price-lg` (13), `cert-btn-view` (14), `cert-btn-enquire` (14), `cert-pagination-wrap` (3)
- Old markup (`cert-badge`, `cert-btn-brochure`, `cert-btn-details`) confirmed gone from this component (the only remaining substring matches are an unrelated `.ub-cert-badge` class in a different, untouched component)
- Dev server log showed clean compiles and `200` responses throughout, no new errors (one pre-existing, unrelated React key warning in the `Comparison` component)
- Visual side-by-side comparison against `/microsoft` is left to the owner to confirm in the browser — no screenshot/browser tool was available in this session
