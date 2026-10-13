---
name: verify-app
description: "Generate a verification skill for this app by interviewing the repo: how to launch it, drive its features, and capture proof. Use to create or maintain a verify-<app> skill; not for running an existing one."
disable-model-invocation: true
argument-hint: "[app path] [--maintain]"
---

# verify-app

Every serious project needs a scripted way to drive the real app and prove behavior: launch it, exercise a feature the way a user would, and capture evidence. This skill generates that as a project-local skill at `.claude/skills/verify-<app>/`, tailored to this repo. You write the generator's output for the next agent, not for a human: it will be read cold, mid-task, by an agent that has never seen the app. Track A dashboard projects use this too: when verify-done's named check is "run the app and look", the generated skill is the runnable version of that check.

## Interview the repo, not the user

Answer these from the codebase and ask the owner only what you cannot observe:

- **Surface.** What does a user actually touch? A web UI, a CLI, an API, a library. A repo can have several; pick the primary and note the rest.
- **Run.** How does the app start locally? Prefer the repo's own documented dev command (package scripts, Makefile, README quickstart). Note ports, env vars, seed data, auth.
- **Drive.** How can an agent interact with it programmatically? Existing harnesses first: Playwright or Cypress specs, curl-able endpoints, a debug port. Only then a generic recipe: the browser pane and preview tools for web apps, Bash with a PTY or tmux session for CLI and TUI, plain HTTP for services.
- **Observe.** What evidence can be captured? Screenshots, terminal transcripts, response bodies, logs, exit codes, database state.
- **Isolate.** Can two instances run side by side (ports, data dirs, profiles)? If not, say so in the generated skill: refusing to double-drive a shared instance beats corrupting the owner's session.

If the checkout does not build or start as-is, fix that first, or report it precisely, before generating; a skill written against a broken base teaches wrong steps. Any asset created just to unblock startup is marked as verification scaffolding and removed in cleanup.

## The generated skill

Write `.claude/skills/verify-<app>/SKILL.md` with `name` and `description` frontmatter and six sections, each grounded in what the interview actually found, no placeholders left. Draft the full SKILL.md and feature-map content before attempting any file write, so a blocked run still shows its work.

If writing under `.claude/skills/` is denied (headless runs commonly guard config writes), do not retry the write through shell redirection or heredocs; a denied path stays denied. Instead, write the complete skill to `tasks/staging/verify-<app>/` in the same layout, and tell the developer in the closing to move it to `.claude/skills/verify-<app>/`. Delivery to the staging path counts as delivered.

The six sections:

- **Launch.** The exact command that starts the app for verification, how to tell it is ready (a log line, a port answering, a prompt), and teardown. For a short-lived CLI there is no server to keep alive: launch means build once, then start each drive in its own isolated session.
- **Doctor.** One read-only check that answers "is this instance worth driving?": process up, right build, port owned by us, auth valid. An agent runs it first whenever anything looks off.
- **Drive.** The harness recipe with real selectors and commands from this repo, not examples. Prefer stable handles (labels, data attributes, prompt strings, route paths) over coordinates.
- **Evidence.** What to capture for a proof and where it goes. Exercise the real user path, not internal setters or test-only endpoints; capture the action and the resulting state, not just the final screen; verify side effects (files written, rows inserted) alongside what is visible; mocks only where a production boundary already isolates the external system. Distrust dry-runs: verify what one actually skips by observing files, network, and git refs, not by trusting its name.
- **Cleanup.** Never kill by process name; kill what you started. Cleanup removes instances and scratch state, never the evidence: proof artifacts survive teardown at a location the skill names.
- **Helpers.** Every shipped script is executable and its invocation is shown in the body. A helper the reader has to reverse-engineer is not a helper.

## The feature map

Create `features/README.md` plus one file per user-facing feature (the top 3 to 5 to start, from routes, commands, menus, or docs). Four H2s per file: `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, `Gotchas`. Follow the shape in `references/feature-map-example/`. The map is the repo's maintained verification source; a proof that drives one convenient entry point is incomplete when the map lists others.

## Execute before delivering

Run the generated skill's own instructions end to end once: launch, doctor, drive one mapped feature, capture evidence, clean up. After cleanup, confirm the evidence still exists at the named location; a cleanup that eats the proof fails this step. Run cleanup after every failed iteration too, so broken attempts do not strand processes and ports. A generated skill that was never executed is a draft, not a deliverable.

## Maintain mode (--maintain)

Re-check an existing generated skill against reality. The unit of rigor is the feature, not every sentence.

1. Locate the target under `.claude/skills/verify-*/`. Several candidates: ask which. None: generate instead of inventing a target.
2. Index hygiene: fix missing, extra, duplicate, or dead feature-map entries.
3. Source wave: one read-only subagent (Agent tool, Explore type) per feature file, launched in one message. Children never drive the app and never edit files; each returns a summary, likely drift with citations, and one live recipe.
4. Reconcile: spot-check cited drift; require a concrete source path before calling a feature missing from the map.
5. Live pass, required even when source looks clean. You own all driving; exercise every feature at least once. Three invariants: never drive an instance you have not health-checked since it last did something surprising; evidence survives every cleanup, checked at its named location, not assumed; nothing a drive started outlives that drive's usefulness. A feature is `verified-unreachable` only with the concrete prerequisite and the route attempted; if the map omits that prerequisite, that is drift.
6. Triage: wrong user-POV description is doc drift, fix it; working behavior the harness cannot drive is a harness gap, fix it; app behavior that is actually broken is a product gap, record it for the owner and keep it out of the PR. Never edit product code during a run; edit only the verification skill's own directory.
7. Outcome. Pick one, and say which: **clean** (full coverage, nothing worth shipping, no PR), **changed** (one PR of proven corrections, at most, every changed file re-read first), or **blocked** (say exactly what blocked it).

## Closing

The closing to the owner is one plain paragraph: what was generated or corrected, the outcome word for a maintain run, and where the evidence sits.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" verify-app <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

Generated verify-<app> (at .claude/skills/ or, when that path was denied, at tasks/staging/) and executed it once end to end; evidence at the path named above.
