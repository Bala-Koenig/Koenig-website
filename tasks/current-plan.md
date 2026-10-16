# Plan draft: Create new page "SAP Learning Hub" at /sap-learning-hub
Mode: interactive
Files: app/sap-learning-hub/page.tsx (new), public/sap-learning-hub.html (new placeholder)
Out of scope: every other existing page/route (microsoft, learning-map, learning-path, mind-map, etc.) — untouched; no existing files edited
Verification: `npm run build` (or dev server) compiles, /sap-learning-hub route loads, iframe renders public/sap-learning-hub.html

Fast lane: one clear owning location (brand-new files only), one obvious change (mirror the learning-map/learning-path wrapper pattern), no shared helper touched, no config/limit changed.

Pattern (matches app/learning-map/page.tsx and app/learning-path/page.tsx exactly):
- app/sap-learning-hub/page.tsx: Navbar + full-height iframe pointing to /sap-learning-hub.html
- public/sap-learning-hub.html: minimal placeholder page (title + "content coming soon" note) — owner will overwrite this file with their own HTML later
