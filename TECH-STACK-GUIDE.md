# Koenig tech stack guide

This guide tells Claude Code which technologies to use when it builds a project for Koenig. It is a menu with one recommended choice per project type, not a survey. Every recommendation has been checked against the state of each product as of August 2026, including what the free plans actually include. Where a price or limit could change, it is marked "as of Aug 2026". House decisions already in production at Koenig (Vercel for dashboards, Neon Postgres for the conference-app platform, GitHub pull requests with preview links as the review step) are baked in.

How to use it: paste this whole file into Claude Code together with your project idea, then ask Claude to pick the matching project type from the table below and build it. You do not need to understand every term; Claude does. If you are a developer and disagree with a pick, override it, but say so explicitly, because Claude is instructed to start from this menu.

## Pick your project type

| What you are building | Recommended stack | Why |
|---|---|---|
| Internal dashboard or admin panel | Next.js + Prisma + Neon + shadcn/ui, deploy Vercel | The house standard; PR previews make review safe |
| Chatbot or AI assistant | Next.js + Claude API (streaming) + Neon, deploy Vercel | Simplest path to a streaming chat with server-side keys |
| AI agent that does work | Claude Agent SDK in a small worker, run by GitHub Actions | The agent loop is prebuilt; scheduling and logs come free |
| Real-time internal tool | Convex + Next.js, deploy Vercel | Live updates without writing sync code; only when truly live |
| Company or marketing website | Astro, deploy Cloudflare | Fast static pages, free hosting with no commercial-use catch |
| E-commerce or payments | Next.js + Stripe hosted Checkout, deploy Vercel Pro | Never build your own payment forms |
| Scheduled jobs and API glue | Scripts in a repo, run by GitHub Actions on a schedule | Versioned, reviewed, free at pilot scale |
| Automated workflows (visual) | n8n self-hosted, on a small VPS via Coolify | Non-programmers can see and edit the flow |
| Mobile app | Expo (React Native) + EAS | One codebase for iOS and Android; but read the honesty note |
| Data app or reporting | Metabase self-hosted first; custom Next.js app second | Most reporting needs are a BI tool, not a build |

## Internal dashboard or admin panel

Use Next.js (the React web framework Koenig already deploys everywhere) with Prisma (a tool that lets code talk to the database in TypeScript instead of raw SQL), a Neon Postgres database (Postgres is the standard relational database; Neon hosts it and scales it to zero when idle), and shadcn/ui (a set of ready-made, good-looking interface components). Deploy on Vercel, the hosting platform Koenig's dashboards already run on. Every change lands as a pull request with a preview URL the owner clicks before merging; that workflow is the safety net and is not optional.

If the data lives in an existing system such as RMS, do not copy the database. Have the Next.js app call that system's REST API (a standard way for one system to ask another for data over the web) and only add a Neon database for anything new the tool itself owns.

Cost at pilot scale: Neon's free plan gives 0.5 GB storage per project and 100 compute-hours a month as of Aug 2026, which covers a typical internal tool. Vercel's free Hobby plan is for non-commercial use; internal Koenig tools sit in a gray zone, so run them on the team's existing Vercel Pro account ($20 per seat per month as of Aug 2026) rather than a personal free account.

Free and open-source route: if the tool is really just "view and edit rows in a database", skip custom code entirely. NocoDB or Baserow (both self-hostable, spreadsheet-style interfaces over a real database) or Appsmith (a self-hostable drag-and-drop admin panel builder) can be run for free on a small server. Choose these when nobody will maintain custom code; choose Next.js when the tool needs custom logic or Koenig branding.

When not to use this: if the requirement is one chart on one table, use the reporting section below instead.

Alternative: Supabase (a hosted Postgres bundle that includes auth and file storage) instead of Neon, when you want those extras from one vendor. One older Koenig event app already runs on it.

## Chatbot or AI assistant

Use Next.js on Vercel with the Claude API as the model layer and a Neon Postgres database for conversation history. The Claude API key lives only in Vercel's environment variables (the platform's built-in place for secrets); the browser talks to your own server route, and only that server route talks to Claude. Stream the responses (send the answer word by word as it is generated) so the chat feels alive; the Anthropic SDK supports this directly and Claude Code knows how to wire it.

The case for Convex here: Convex is a backend platform where the database pushes changes to every open browser tab automatically. That buys you multi-device sync, shared sessions, and typing indicators without extra code. Evaluate it seriously when the chatbot is a shared surface, for example a support inbox several staff watch at once, or an assistant whose conversation must appear on a phone and a laptop simultaneously. Convex's free plan (1 million function calls and 0.5 GB storage a month as of Aug 2026) covers a pilot comfortably.

The honest default though is that a single user talking to a bot in one tab needs none of that. Plain Next.js with streaming and Postgres history is fewer moving parts and matches the rest of the Koenig estate, so it is the recommendation unless the realtime case above applies.

Cost at pilot scale: the only meaningful cost is Claude API usage, which is pay per token; a pilot with a handful of users is typically a few dollars a month. Everything else fits the free tiers already described.

When not to use this: if the "chatbot" is actually supposed to take actions (create records, send emails, run reports), that is an agent; use the next section.

Alternative: Convex + Next.js, per the realtime case above.

## Building an AI agent

An agent is different from a chatbot: it does work. It reads data, calls tools, produces files or records, and only sometimes talks to a human. Use the Claude Agent SDK (Anthropic's library that packages the full Claude Code agent loop, including file access, shell commands, and web search, so you write a prompt and a config instead of a loop) as the default brain. When the agent only needs a few custom tools and no file system, the plain Claude API tool-use loop (you define the tools, the SDK runs the call-tool-return-result cycle) is the lighter option and Claude Code can scaffold either.

Where it runs: for scheduled work, which is most Koenig agent ideas (nightly summaries, weekly report drafting, data hygiene sweeps), run the agent as a script in a GitHub repo triggered by GitHub Actions on a schedule. You get logs, history, and the PR review workflow for free. For an always-on agent that reacts to events, run a small worker on Railway (a hosting platform for long-running processes, from $5 a month as of Aug 2026). For one-off runs, a developer can run Claude Code headless on their own machine.

State and safety: store anything the agent must remember between runs in a Neon Postgres database, not in files on the worker. Put a human approval gate in front of every side effect that matters: the agent drafts the email, opens the PR, or writes to a staging table, and a person clicks approve. At Koenig the natural gate is the one already in use: the agent opens a pull request and the owner reviews it.

Free and open-source route: GitHub Actions on a private repo includes 2,000 free runner minutes a month as of Aug 2026, which is plenty for scheduled agents. The Claude API itself is the only unavoidable spend.

When not to use this: if the task is a fixed sequence of steps with no judgment in it, it is an automation, not an agent; use the scheduled jobs or workflows sections, which are cheaper and more predictable.

Alternative: Anthropic's Managed Agents (in beta as of Aug 2026), where Anthropic hosts the agent loop, the sandbox, and the schedule. Worth a look once it suits production use, because it removes the worker entirely.

## Real-time internal tools and lightweight ERP flows

Use Convex when the tool is genuinely live: several people watching the same list, presence indicators (who is online), instant updates when a colleague changes a record, or background jobs whose progress users watch. Convex gives you all of that as the default behavior of its database, plus built-in scheduled functions, and its free plan covers a pilot.

Be honest about whether you need it. A tool one person uses at a time, or where seeing a change ten seconds late costs nothing, does not need realtime. Plain Next.js + Neon with TanStack Query refetching on an interval (polling: the page quietly re-asks the server for fresh data every few seconds) is simpler, matches the house stack, and is the right call for most internal CRUD (create, read, update, delete) tools. Realtime infrastructure for a tool that is not really live is over-engineering.

The middle option is Supabase Realtime, which pushes database changes over a live connection (200 concurrent connections on the free plan as of Aug 2026). Pick it when you are already on Supabase; do not adopt Supabase just for this.

When not to use Convex: when the data of record lives in RMS or another existing system. Convex wants to own the data to make it reactive; syncing it against an external source of truth cancels most of the benefit.

Alternative: Next.js + Neon + polling, as above, and promote to Convex only if users actually complain about staleness.

## Company or marketing website and landing pages

Use Astro (a web framework built for content sites that ships almost no JavaScript to the visitor, so pages load fast) and deploy to Cloudflare (whose free plan hosts static sites with generous limits and, unlike Vercel's free tier, has no non-commercial restriction; Cloudflare also acquired Astro in January 2026, so the pairing is first-party). Content lives as Markdown files in the GitHub repo, edited through PRs like everything else.

When is plain cheap hosting actually right: choose Hostinger (traditional shared hosting, from about $3 a month on multi-year terms as of Aug 2026, renewing higher) when the site is WordPress, when a non-technical person must edit pages through a visual editor without touching Git, or when you want bundled email hosting on the domain. That is a real and common case for small marketing sites. The trade is slower pages, no PR previews, and manual updates.

Cost at pilot scale: Cloudflare's free plan carries a static marketing site indefinitely; the only cost is the domain. Vercel would work equally well technically but hosting a commercial marketing site there requires the Pro plan.

When not to use Astro: when the site is really an application with logins and data. That is a Next.js project; see the dashboard section.

Alternative: Next.js on Vercel Pro, sensible when the marketing site and a web app share one codebase and team.

## E-commerce or payments-touching site

Keep this short because the rule is short: use Stripe, and use Stripe's hosted Checkout page (Stripe renders and hosts the payment form; card numbers never touch your servers). Never build your own card form and never store card data. The site around it is Next.js on Vercel Pro (payments are commercial use by definition). Stripe has no monthly fee and charges per transaction as of Aug 2026.

For selling a handful of fixed items with no custom site at all, Stripe Payment Links (a checkout URL you create in the Stripe dashboard and share) need zero code and are the honest first step.

When not to use this: heavy catalog e-commerce with inventory, shipping, and tax across countries is a product category of its own; buy a platform (for example Shopify) rather than building.

Alternative: Razorpay instead of Stripe for India-first payments, with the same hosted-checkout rule.

## Automations and scheduled jobs

For cron jobs (tasks that run on a clock), email digests, and API-to-API glue, the default is a small repo of scripts run by GitHub Actions on a schedule. It is versioned, reviewed through PRs like all Koenig work, free at pilot scale (2,000 minutes a month on private repos as of Aug 2026), and the logs of every run are kept for you. Claude Code can scaffold the workflow file and the script in one pass.

Use Vercel crons instead when the job is part of an existing Next.js app and needs the app's code and environment: note that on Vercel's free tier crons run at most once per day with hour-level precision as of Aug 2026, so anything more frequent needs Vercel Pro or a GitHub Actions trigger hitting the app's API route. Use a Railway or Fly.io worker only when the job must run continuously or longer than a few minutes per run; Railway starts at $5 a month and Fly.io is pay-as-you-go with no free tier anymore as of Aug 2026.

Email sending inside these jobs goes through Resend (see the email section).

When not to use GitHub Actions: jobs that must fire within seconds of an event, or run for hours; that is worker territory.

Alternative: Vercel crons or a Railway worker, per the rules above.

## Automated workflows

This is the glue-and-schedule category with more shape than a single script: form-to-sheet-to-notification chains, multi-step syncs between SaaS tools, digests assembled from three sources. Two roads:

Code-first (recommended default): the same small-repo-plus-GitHub-Actions pattern as the previous section, just with more steps. It fits the kstack PR workflow, every change is reviewed and reversible, and Claude Code is very good at writing and modifying these scripts on request, which lowers the "only a developer can touch it" barrier that used to justify visual tools.

Visual workflow tool: n8n (a self-hostable workflow builder where each step is a box on a canvas and non-programmers can follow the flow). The self-hosted Community Edition is free with unlimited workflows and executions as of Aug 2026; you pay only for a small server, and Coolify (see the GitHub and hosting notes below) can run it alongside other Koenig self-hosted tools. Choose n8n when the owner is non-technical and will genuinely maintain the flow themselves, especially for chains of third-party SaaS boxes where n8n's prebuilt connectors save real work.

Be honest about the liability: a visual workflow lives outside Git. Nobody reviews changes, there is no preview, and a year later nobody remembers why box 14 exists. If a workflow becomes important, rewrite it as code in a repo. Treat n8n as the place where workflows are born, not where critical ones retire.

Developer-grade alternatives, one line each: Windmill (open source, AGPL) turns scripts into workflows and simple UIs and suits developer-maintained automation; Trigger.dev (open source) is a TypeScript background-jobs platform with retries and queues for when jobs outgrow GitHub Actions.

## Mobile app

Use Expo (the standard toolkit for React Native, which builds real iOS and Android apps from one TypeScript codebase) with EAS, Expo's build-and-update cloud service. The free tier includes 30 builds a month (up to 15 iOS) and over-the-air updates for 1,000 monthly users as of Aug 2026, enough for an internal pilot. The backend is whatever the matching web archetype above prescribes; the app is just another client of the same API.

The honesty note: most "we need an app" requests at pilot stage are better served by the responsive web app you are already building. A Next.js site works on every phone today, needs no app-store review, and updates instantly. Build a native app only when you need push notifications, offline use, camera or hardware access, or app-store presence as a requirement in itself.

When not to use Expo: a two-screen internal lookup tool. That is a web page.

Alternative: a responsive web app, which is the default answer until one of the native triggers above is real.

## Data apps and reporting

If the ask is "charts on top of our database", do not build an app. Self-host Metabase (an open-source business intelligence tool where non-programmers click together charts and dashboards from a connected database; AGPL licensed, free for unlimited users as of Aug 2026). Point it read-only at the Neon or RMS reporting database and most reporting requests end there, with zero code to maintain.

Build a custom data app with Next.js + TanStack Query (fetching and caching) + TanStack Table (powerful tables) + a chart library only when the output is a product: customer-facing, interactive in ways a BI tool cannot do, or embedded in another Koenig app. Deploy on Vercel like any dashboard, data from Neon via Prisma.

When not to use Metabase: when row-level permissions per viewer matter and must be enforced in the app, or when the charts are one feature inside a larger tool you are building anyway.

Alternative: the custom Next.js data app, per the rule above.

## Cross-cutting picks

### Database

Neon is the default: serverless Postgres, the house choice, one database per project just as the conference platform provisions one per event. Plain-words rule for the rest: use Supabase when you want database, auth, and file storage from one vendor and accept its free-tier pause after a week of inactivity; use Convex when the realtime case from the sections above genuinely applies; use SQLite (a database that is just a single file, via Turso if it must be hosted; Turso's free plan includes 5 GB as of Aug 2026) for tiny single-user tools; use MongoDB Atlas (free 512 MB cluster as of Aug 2026) only when the data is genuinely document-shaped and a developer asks for it. PlanetScale no longer has a free tier as of Aug 2026, so it is off the pilot menu. Default to Neon whenever there is no strong reason otherwise.

### Auth

Auth means logins: proving who the user is. Use Clerk as the default: it is a hosted service with prebuilt sign-in screens, and as of a February 2026 change its free plan covers 50,000 monthly retained users, far past any pilot. Free and open-source route: Better Auth, a TypeScript library you own and run inside your Next.js app with no per-user pricing ever; note that Auth.js (formerly NextAuth) moved into maintenance mode in 2026 and its own maintainers point new projects to Better Auth, so do not start anything new on Auth.js. Use Supabase Auth only when the project is already on Supabase. Internal tools that should be Koenig-only: restrict sign-in to the company Google Workspace domain, which all three options support.

### ORM

An ORM lets your code read and write the database in TypeScript instead of hand-written SQL. Use Prisma: the most widely adopted option, and since Prisma 7 (late 2025) it dropped its heavyweight engine, removing the old size complaint. Drizzle, one line: pick it when a developer on the project prefers writing near-SQL and is deploying to edge runtimes where every kilobyte counts.

### UI

Use shadcn/ui with Tailwind CSS (a styling approach where design lives in small utility classes). shadcn/ui copies component code into your repo rather than installing a black-box library, so Claude Code can read and modify every component. It is the ecosystem default, and free open-source dashboard templates built on it give admin panels a finished look on day one.

### Email

Use Resend for sending email from apps (receipts, digests, notifications). The free plan sends 3,000 emails a month with a 100 per day cap on one domain as of Aug 2026, which fits pilots. Verify the sending domain properly (SPF and DKIM, the DNS records that stop mail landing in spam); Claude Code will list the records to add. This is app mail, not people mail; staff mailboxes stay where they are.

### File storage

Uploads and generated files go in object storage, not the database. Default to the storage next to your stack: Vercel Blob for Vercel apps (1 GB free as of Aug 2026), Supabase Storage on Supabase projects (1 GB free). For anything bigger or long-lived, use Cloudflare R2 (10 GB free as of Aug 2026, and no fee for data leaving it, which is the cost that bites elsewhere).

### Env and secrets hygiene

Secrets are API keys, database passwords, and tokens. They never appear in code, in the repo, or in a chat. Locally they live in a .env file that is listed in .gitignore (so Git never uploads it); in production they live in the platform's environment settings (Vercel project settings, GitHub Actions secrets, Railway variables). Claude Code follows this by default; if any tool or person asks you to paste a key into a file that gets committed, stop and ask a developer.

### The TanStack family

TanStack Query manages data fetching in the browser: caching, retries, background refresh, and the polling pattern recommended above. Use it in any Next.js app that reads data after page load; it matters in every data-heavy tool.

TanStack Router is a standalone type-safe router for React apps built with Vite (a fast build tool) rather than Next.js. It matters only when a project deliberately skips Next.js, which at Koenig should be rare.

TanStack Start is a full-stack framework built on that router, a leaner alternative to Next.js. It reached its 1.0 release candidate in late 2025 and is production-usable as of Aug 2026, but Next.js remains the Koenig default because the whole estate, and the team's accumulated fixes, live there. Revisit if a project is client-heavy and a developer champions it.

### GitHub as a platform

Every Koenig project lives in a GitHub repo; that is the existing kstack workflow, and it is also a platform in its own right. Four things it gives every project for free:

Repos plus PRs plus previews: every change is a pull request, the hosting platform attaches a preview URL, the owner clicks it and approves. This is the review chain non-technical owners at Koenig already use, and no project ships outside it.

GitHub Actions: the free runner for CI (automatic checks on every PR), scheduled jobs, and agent runs, with 2,000 free minutes a month on private repos and unlimited standard usage on public ones as of Aug 2026. Minutes drain faster on Windows (2x) and macOS (10x) runners, so schedule jobs on Linux.

GitHub Pages: free static hosting straight from a repo. It beats Vercel when the output is a purely static page with no server code and no preview-per-PR requirement: docs, a report, a single landing page. The moment you want server routes or PR previews, use Vercel or Cloudflare.

Issues and reviews: the coordination layer. Owners file requests as issues, Claude's work arrives as PRs referencing them, and the review conversation is the audit trail.

One more self-hosting note: Koenig has explored in-house hosting, and Coolify (an open-source, self-hostable deployment platform, free software with the most-starred position in its category as of Aug 2026) is the pick for that road. One cheap VPS running Coolify can carry Metabase, n8n, Umami (an MIT-licensed, lightweight self-hosted web analytics tool, the free-and-private alternative to Google Analytics), and similar tools for the cost of the server alone. Use it for the self-hosted toolbelt; keep customer-facing apps on managed platforms where uptime is someone else's pager.

## Rules Claude should follow when scaffolding

1. Start from the recommended stack for the matching project type above. Deviate only when the project owner explicitly overrides, and say in the README that you did.
2. Build the smallest thing that works first. One page, one table, one happy path; expand after the owner has clicked the preview.
3. Every project gets a GitHub repo on day one. All changes land as pull requests with a preview deployment; never push straight to main.
4. Secrets only ever go in platform environment settings or an untracked .env file. Never in code, never in the repo, never echoed into a chat or log.
5. Prefer the free tier and the open-source option when they honestly cover pilot scale, and say in the README which limit will be hit first when the project grows.
6. Pick boring defaults over novel ones. A technology enters a Koenig project through this guide or an explicit owner decision, not because it looked interesting.
7. Payments, credentials, and personal data get the conservative path every time: hosted checkout, hosted auth or a maintained library, and the least data stored that does the job.
8. Write the README for the project owner, not for developers: what it is, where it runs, how to ask for changes.

## Sources checked

All verified via official pages and current comparisons, as of Aug 2026:

- vercel.com/docs/limits and Vercel changelog (Hobby limits, cron cadence, commercial-use restriction)
- neon.com pricing (free plan storage and compute hours, per-project model)
- convex.dev pricing (free plan function calls and storage)
- supabase.com pricing (free tier limits, project pausing, realtime connections)
- cloudflare.com Workers and Pages docs (free plan requests, R2 free storage)
- netlify.com changelog April 2026 (credit-based free plan)
- hostinger.com plans (shared hosting intro and renewal pricing)
- github.com pricing and Actions billing docs (free minutes, January 2026 pricing change, OS multipliers)
- nextjs.org blog (16.3 current as of Aug 2026)
- astro.build blog (Cloudflare acquisition January 2026, v6 beta)
- tanstack.com blog (Start v1 release candidate status)
- clerk.com pricing and changelog (February 2026 free plan change to 50,000 MRU)
- better-auth.com blog (Auth.js maintenance mode announcement)
- prisma.io and orm comparisons (Prisma 7 engine change, Drizzle positioning)
- resend.com pricing (free plan 3,000 emails per month, 100 per day)
- planetscale.com pricing (no free tier; paid from $5 per month)
- turso.tech pricing (free plan 5 GB)
- mongodb.com Atlas docs (free cluster 512 MB)
- railway.com, render.com, fly.io pricing pages and 2026 comparisons (Railway $5 hobby, Render free web services, Fly trial-only)
- expo.dev pricing (EAS free builds and update MAUs)
- docs.n8n.io (Community Edition free self-hosting)
- windmill.dev and trigger.dev repos (open-source status)
- metabase.com and github.com/metabase (AGPL, actively released)
- coolify.io and its GitHub repo (v4 stable 2026, most-starred self-hosted PaaS)
- nocodb.com, baserow.io, appsmith.com (active maintenance; note NocoDB left AGPL in January 2026)
- umami.is (MIT license, lightweight self-hosting)
- anthropic.com and code.claude.com docs (Claude API tool use, Agent SDK, Managed Agents beta)
- stripe.com docs (hosted Checkout, Payment Links; product shape verified, per-transaction rates not restated here)

Unverified and stated cautiously in the text: GitHub Pages exact bandwidth caps (long-standing soft limits, not re-verified, so no numbers are quoted); Razorpay current fee schedule (named as an India-first alternative only).
