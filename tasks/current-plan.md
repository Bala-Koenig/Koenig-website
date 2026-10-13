# Plan draft: Add "Topics Covered in This Course" section to AZ-104 page
Mode: interactive

Files: app/courses/az-104/page.tsx (single inline section, added between the "Skills You'll Gain" block and the "Prerequisites" heading, around line 492)

Out of scope: every other file/component (course-scheduler.tsx, checkout/page.tsx, all other ./components/*.tsx) — untouched. No other section on the page is modified.

Content: 32 short curriculum tags flattened from the existing Day 1–4 `topics` arrays already defined in the Curriculum accordion section (lines ~645-669 of the same file) — Day 1: Azure AD, RBAC, Subscriptions, Azure Policy, Management Groups, Resource Locks, Custom Roles, Conditional Access; Day 2: Storage Accounts, Blob Storage, Azure Files, Storage Security, SAS Tokens, Lifecycle Management, Storage Tiers, File Sync; Day 3: Virtual Machines, App Services, Containers, Azure Kubernetes, Availability Sets, Scale Sets, Azure Functions, ARM Templates; Day 4: VNets, NSGs, Azure DNS, Network Peering, VPN Gateway, Load Balancer, Application Gateway, Azure Firewall. Numbered 1-32 in that order.

Design: heading "Topics Covered in This Course" ("Covered" in the koenig-blue→cyan gradient text, matching other section headings on the page), one-line subtitle below it, then wrapped numbered-pill chips (small teal circle with the number + topic name) in a white card with light border + subtle shadow, footnote below the chips stating the topics come from the actual course curriculum. Responsive at both mobile and desktop widths — new content, not a style tweak to an existing element, so it is not restricted to mobile-only.

Verification: `npm run dev` already running at localhost:3000 — reload /courses/az-104, confirm the new section renders between Skills chips and Prerequisites, chips wrap correctly at mobile width (~400px) and desktop width, numbering is 1-32 in the stated day order, no visual regression to Skills or Prerequisites blocks above/below it.

## Risks
- One fact: safe because this is a purely additive, self-contained JSX block with no shared helper, no prop/type change, and no existing test references this area of the page — proven by grep showing no test files reference az-104/page.tsx.
- Cross-path risk: none — section is inline JSX, doesn't touch CourseScheduler, checkout, or any component file.
- Checked and cleared: confirmed page.tsx has no automated tests currently (checked for *.test.* / *.spec.* referencing az-104).

Branch: blocked, create fix/az104-topics-covered-section at commit time (working branch fix/az104-public-bullets already has uncommitted changes; will not create a new branch mid-flight — see note to owner)
