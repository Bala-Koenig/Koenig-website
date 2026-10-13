# Learning Map / Learning Path / Mind Map

Documentation for the "find your course" and "course roadmap" feature set: three visitor-facing tools that help a prospective student either (a) discover which course fits them, or (b) see how a given course fits into a broader certification path.

## TL;DR architecture

This is **not** a React/D3 component tree. It's three standalone, hand-written static HTML + vanilla JS prototypes living in `public/`, each embedded into the Next.js app through a one-line `<iframe>` route. One shared data file drives two of the three. A fourth, genuinely React-based piece (`CertificationPath`) is unrelated plumbing-wise — a hardcoded, page-local visual used only on the AZ-104 course page.

| Route | File rendered | What it is |
|---|---|---|
| `/learning-map` | `public/learning-map.html` | 8-step preference wizard ("find your course") |
| `/learning-path` | `public/learning-path.html` | 3-tier roadmap explorer, search + filters |
| `/mind-map` | `public/course-roadmap.html` | Before/Selected/After roadmap, the most polished version |
| *(AZ-104 page only)* | `app/courses/az-104/components/certification-path.tsx` | Hardcoded 4-tier cert path, React/Tailwind |

No D3, no charting/graph library anywhere — every connector line is a hand-computed SVG path using live `getBoundingClientRect()` measurements.

---

## 1. The Next.js routes (iframe shells)

Each route is a thin wrapper: a `Navbar` plus a full-height `<iframe>` pointing at a static file in `public/`. No props, no data fetching, no server logic.

- **`app/learning-map/page.tsx`** → iframes `/learning-map.html`
- **`app/learning-path/page.tsx`** → iframes `/learning-path.html`
- **`app/mind-map/page.tsx`** → iframes `/course-roadmap.html`; it's async (Next 15 `searchParams` is a Promise) and forwards a `?course=` query param into the iframe `src`, so e.g. `/mind-map?course=104` deep-links straight into that course's roadmap.

All the real functional/UI code lives in the `public/*.html` files, not in these route files.

---

## 2. `public/learning-map.html` — "find your path" wizard

Despite the name, this is a **multi-step preference wizard**, not a node/graph visualization.

**Flow:** 7 question steps (Goal → Role → Technology → Skill level → Path type → Course type → Delivery option) followed by an 8th "Enquire" step with a lead-capture form. Each step is a fieldset of radio/checkbox options; the Technology step is multi-select with an "Other" free-text box.

**Data:** 100% hardcoded in-page (`STEPS` array of `{key, title, icon, question, options}`). No external data file, no fetch.

**Design decisions:**
- Inline SVG icon library (`P` object of path strings), rendered via a custom `icon()` helper — no icon package.
- Progressive reveal: later steps start "locked" (dimmed, non-interactive) until prior steps are answered; completed steps auto-collapse and slide out of view to keep focus on the current step.
- A stepper rail of circular icon buttons above the cards mirrors progress (done / now / locked states, checkmark badges, connecting lines that turn green on completion).
- "Chosen answers" pills shown above the cards — clickable to jump back and change an answer.
- Mobile: prev/next arrow nav below the row, horizontal scroll-snap carousel, compressed stepper icons.
- Final step expands to a full-width form (name/email/phone/message) with a summary of all previous answers, and submits via a generated `mailto:` link — there's no backend endpoint; it opens the user's email client with a pre-filled body.
- Fonts: Google Fonts (Bricolage Grotesque + Public Sans) plus a self-hosted "GT Walsheim Pro" webfont; light-mode only.
- Pure vanilla JS, inline `<style>`, hand-rolled SVG icons, zero external JS libraries.

---

## 3. `public/learning-path.html` — simple roadmap explorer

**What it does:** Renders a 3-column flowchart (Beginner / Intermediate / Advanced tiers) of courses for a selected course's learning path, with a search box and Level/OEM/Technology filters above it.

**Data flow:** Loads `learning-path-data.js` via `<script src>`, reads the global `window.LearningPathData` API (see §5). `LP.courses()` gives the searchable/filterable course list; `LP.get(course.id)` (a Promise, resolves synchronously from in-memory data) gives the per-course tier/cert breakdown used to render the map.

**Design decisions:**
- One `<div class="tier">` column per non-empty tier, containing `course-card` divs.
- Connectors are curved SVG bezier paths (`drawWires()`), computed from each card's live bounding rect, joining tiers into a "trunk" — colored blue (before→selected) or green (selected→after), with arrowhead markers.
- Clicking any course-card re-centers the roadmap on that course and pushes browser history (`#c=<id>` hash), so Back/Forward works.
- `fitCards()` hides cards that don't fit the first screen height, always keeping "this course" visible.
- OEM badges double as filter shortcuts.
- Debounced search (350ms) + cascading Level/OEM/Technology `<select>` filters (picking an OEM repopulates Technology options).
- Standalone-course fallback message when a course has no path data.
- Mobile: columns stack vertically, SVG wires are hidden, cards go full-bleed.

---

## 4. `public/course-roadmap.html` — the richest version ("Course Mind Map")

This is what `/mind-map` embeds, and the most developed of the three.

**What it does:** A **Before course | Selected course | After course** 3-column roadmap for one course at a time, plus search, filters, a results grid of matching courses, and animated connector lines between columns.

**Data flow:** Same `learning-path-data.js` API as above, plus derived logic on top:
- `computeSides(course, path)` — splits the course's full tier path into "Before" (lower tiers) and "After" (higher tiers) relative to the selected course's own level.
- `relatedCourses()` — when a course has nothing "after" it, falls back to suggesting same-vendor/same-technology courses at or above its level (a recommendation heuristic, not in the data file itself).
- `durationFor(cert)` / `demoTag(code)` — **explicitly flagged in code comments as placeholder/demo-only**: duration is parsed from the course name text or deterministically faked from `id % 5`; "Popular"/"New" badges are faked from `id % 6`, pending real fields from the catalogue.
- `prereqHtml()` / `parsePrereqs()` — parses the comma-separated `prerequisites` string and turns any sub-string matching an existing course name into a clickable link to that course's roadmap.

**Design decisions:**
- Searchable combo-box dropdowns (`makeCombo()`) for OEM/Technology — a custom accessible combobox built from scratch (role="listbox", aria-expanded, arrow-key nav, Enter/Escape), not a library.
- Removable filter chips row, plus "Clear all".
- Results grid (up to 24 shown, "Show more" paginates), draggable with the mouse (custom click-vs-drag disambiguation) in addition to native touch scroll.
- Hover micro-interaction: hovering a course card dims siblings and animates a small colored dot traveling along the connector SVG path to the next linked card(s), using `getPointAtLength` easing.
- Straight orthogonal connector lines (reworked from curves — see history below) feeding into a shared trunk per column pair.
- Responsive: desktop shows columns side-by-side with horizontal wires; mobile (≤900px) stacks columns vertically with a vertical wire variant.
- `pickDefault()` auto-selects a sensible "Intermediate" course with both neighbors present, for a good default view with no search/filter active.
- Deep-linkable via `?course=<id>` and `#c=<id>`, both read on load and kept in sync with Back/Forward.
- A large trailing comment block in the file explains this page doubles as a **design-review sandbox**: it's "a sample of the roadmap widget for team sign-off before it's embedded into real course pages," and CSS at the bottom deliberately hides the filters/results-grid chrome so only the bare roadmap widget shows.

---

## 5. `public/learning-path-data.js` — the shared data layer

The one real data source for the family (`learning-path.html` and `course-roadmap.html` both load it as a classic `<script src>`; `learning-map.html` doesn't use it — it's a static-questions wizard).

**API:** a single IIFE exposing `window.LearningPathData`:
- `courses()` → full list of `{id, name, url, vendor, technologies, level, hasPath}`.
- `course(id)` → single course lookup, or `null`.
- `get(id)` → **Promise** resolving to the course's path tiers (`[{tier, certs: [{code, url, name, current, prerequisites}]}]`), or `null` for a standalone course. It's wrapped in `Promise.resolve()` purely for API-shape consistency — everything is already in memory, there's no network call.

**Internal representation** (compact/numeric-indexed to keep the file small):
- `D.vendors` / `D.techs` — flat string arrays, referenced by integer index from course entries.
- `D.courses` — tuples of `[id, name, urlSlug, vendorIndex, techIndexArray, levelIndex]`.
- `P` — prerequisite/path map keyed by course id → 3 arrays (one per tier: Beginner/Intermediate/Advanced) of course ids in that tier of this course's path.
- `TIERS = ["Beginner","Intermediate","Advanced"]` — the fixed 3-level model used throughout.
- `build(id)` reconstructs human-readable tier/cert objects on demand from the compact `P` map, including a computed `prerequisites` string (`"None"`, a comma-joined list of ≤3 named prior courses, or a generic `"<Tier> tier (multiple <PriorTier>-level courses available)"` when there are too many to name).

**Scale:** 190+ real OEM/vendor names (Microsoft, AWS, Cisco, Salesforce, Red Hat, etc.) — real catalogue data, not a mock set, which is why the file is multi-megabyte. There's no generation script in the repo that produces this file; it was produced once and committed directly.

---

## 6. `app/courses/az-104/components/certification-path.tsx` — the one React implementation

Architecturally separate from the other three — a real component, not an iframe, rendered inline on the AZ-104 course page (`<CertificationPath certPath={certPath} />`).

```ts
interface Cert { code: string; name: string; current?: boolean; note?: string; duration?: string; vendor?: string }
interface Tier { tier: string; certs: Cert[] }
export function CertificationPath({ certPath }: { certPath: Tier[] })
```

- **Data:** fully hardcoded — `app/courses/az-104/page.tsx` defines a local `certPath` literal (4 tiers: Fundamentals → Associate → Expert → Specialty, e.g. AZ-900 → AZ-104/AZ-204 → AZ-305/AZ-400 → AZ-500) and passes it as a prop. No connection to `learning-path-data.js` or the `/mind-map` data layer — it's page-specific content only.
- **Rendering:** responsive CSS grid (one column per tier) of cert cards with a gradient numbered/icon header per tier, current cert highlighted with a ring + "Current Course" badge + optional note callout.
- **Connector lines:** `useEffect` + `ResizeObserver` + `requestAnimationFrame`, measuring each tier's DOM rect relative to a container ref and computing straight-line SVG connector paths between adjacent tiers — effectively a React/TypeScript reimplementation of the same straight-line-trunk technique used in `course-roadmap.html`, including matching desktop-horizontal vs. mobile-stacked-vertical breakpoint logic.
- **Tech:** React, Tailwind, inline SVG — no chart/diagram library, consistent with the rest of the feature family.

---

## 7. Design-evolution scratch files (`learning-path/` at repo root — untracked)

A root-level `learning-path/` folder (distinct from `public/`) holds earlier drafts, confirmed **untracked by git** and not referenced by any shipped route:

- `course-roadmap-old-hardcoded.html` — the earliest prototype, built for a single hardcoded example course, every card and SVG connector manually pixel-placed/hand-authored with coordinate comments. Includes a "deck of cards" stack effect for additional intermediate options.
- `course-roadmap-data-version.html` — transitional version: same visuals, but wired to `learning-path-data.js` instead of inline hardcoded cards.
- `learning-path-data.js` — a duplicate copy of `public/learning-path-data.js`, byte-identical.

Evolution path: **hardcoded single-course demo → data-driven prototype → `public/course-roadmap.html`** (final iteration, with search/filters/combo-boxes/results grid). Worth deciding whether to commit, `.gitignore`, or delete this folder — it isn't part of the deployed app.

---

## History

Introduced in one commit (`fb61c4a`) as three additive, non-breaking static demo pages plus the shared data file ("No existing files are changed"). Iterated afterward purely on styling/UX polish:

- `0fe2e7a` — Learning Map: GT Walsheim font, progress-based subtitle, friendlier enquiry form text
- `c9e9077` — Learning Map: multi-select Technology with Other box, Customized Learning delivery option
- `0e73d75` / `aac74d8` — Mind-map/learning-map polish: curved → straight connector lines, fixed mobile stacked-connector direction, removed a double-line render artifact, fixed hover travel-dot animation for straight paths; restyled cards (white + colored borders), softened Popular/New tag colors with icons, distinguished "Current Course" (page default) from "Selected Course" (anything the visitor searches/clicks); fixed `learning-map.html` mobile layout (stepper overlap, pill scrolling, checkmarks, prev/next slider).

No commit touches the root-level `learning-path/` scratch folder or `certification-path.tsx` — both are local, uncommitted work.

---

## Notes for future work

- There's no written spec/design doc for this feature elsewhere in the repo — this README plus the git log and the code itself are the only documentation.
- `durationFor()`/`demoTag()` in `course-roadmap.html` are explicitly placeholder/fake data pending real catalogue fields — don't treat them as real.
- Nothing generates `learning-path-data.js`; if the catalogue changes, this file needs to be regenerated/updated by hand (or a generator script should be written).
- `certification-path.tsx` duplicates the connector-line algorithm from the HTML prototypes in React — if this pattern needs to be reused on more course pages, consider extracting it into a shared component rather than copy-pasting again.
