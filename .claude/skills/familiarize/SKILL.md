---
name: familiarize
description: "Onboard this project: read the code, interview the owner, and write docs/architecture.md and docs/decisions.md. Run once per project or after big changes landed outside the chain."
disable-model-invocation: true
argument-hint: "[optional: token budget, default 30k]"
---

# familiarize

Onboard the project once: read the code, ask the owner only what code cannot answer, write the docs the chain runs on, and set up GitHub. Respect everything that already exists.

## Declare the budget

Say up front how much reading you will do, in plain words: "I will spend about 30k tokens getting to know this project. If I hit the limit, I will stop, write down what I have, and ask before continuing." Use the budget from the argument if given, 30k otherwise.

## Explore before asking

Read what is already there first: git remote, CLAUDE.md, docs/, tasks/, .claude/kstack/, the README. Existing files are the owner's work; preserve them. CLAUDE.md gets only the few kstack lines it is missing (see Write below), never a rewrite. Existing docs get refreshed sections, never wholesale replacement. Never create AGENTS.md when CLAUDE.md already exists.

Then read the code. A small project (a few dozen files) is one direct pass. A bigger one gets parallel read-only subagents (the Agent tool, Explore type), one per area, each reporting what the area does, its owning files, and anything surprising. Infer what the project does from what the code does; the owner is only for intentions. Don't ask questions you can answer by reading the code.

If the budget runs out mid-run, stop, write the docs from what you have, list what was not covered, and ask the owner whether to continue.

## Interview the owner

Call the Skill tool with "interview". If the Skill tool cannot start it (interview is user-invoked in some installs), do not stop and do not tell the owner to run a command: ask the same questions directly yourself, numbered with a recommended answer each, and continue under the same rules. Seed the questions with what code cannot answer: what this project is for and what matters most to the owner, what must never change (values, wording, behavior), and which paths feel risky or fragile. Present what exploration found with a recommended answer per question so the owner can accept in a word; skip anything exploration already settled.

The no-reply rule: when the launcher set `KSTACK_NO_REPLY=1` in the environment (check once with `echo "${KSTACK_NO_REPLY:-}"`), no reply can arrive, so do not wait at any question and do not end the run at a question round: adopt your own recommended answer for each, record every adoption as a stated assumption, and write the docs below in this same run. The closing lists every assumption and open question for the owner to correct later; docs written on stated assumptions beat no docs and a stalled run. With the flag unset, wait for the owner's answers as normal.

## Write

Show drafts before writing when a reply can arrive. In a no-reply run (`KSTACK_NO_REPLY=1`), showing means including what was written in the closing message; write the docs anyway. Then produce or refresh:

- `docs/architecture.md`: the feature map, a table with one row per feature: feature, owning files, gotchas. Below it a `## Vocabulary` section: `**Term**:` one or two sentences, then `_Avoid_: synonyms`. Keep the whole file a digest, under 200 lines: read once, know the project.
- `docs/decisions.md`: seeded with dated entries, a heading `## NNNN <date> <slug>` plus one to three sentences each, for what the interview settled. Record an entry only when it is hard to reverse, surprising without context, and the result of a real trade-off.
- `tasks/queue.md`: the empty scaffold (`# Task queue` and nothing else). Add `tasks/` to `.gitignore` while you are here: the queue, plans, fence, and PR body are session working state and must never land in a repo diff.
- `CLAUDE.md`: additive lines only. A pointer to the workflow (asks come in through clarify-task, which queues a bundle and scopes the active task; work lands as pull requests) and pointers to the three files above. Update an existing kstack block in place; never append a duplicate.

## Safety pass

Check that `.gitignore` covers `.env` files, key files, and credential stores. Scan the code for hardcoded passwords, tokens, and API keys. If you find any, STOP and tell the owner what and where before any commit or push; a secret must never land in a repo.

## Guard hooks

Check how the guard's hooks are wired. In a plugin install the guard skill registers them itself; nothing to do. In a copied install (kstack under `.claude/skills/`), read `.claude/settings.json` for the two kstack-guard hook entries. If they are missing, tell the owner plainly: the edit fence will be behavioral only, a promise without a tripwire, until the two-minute registration in hooks/README.md is done.

## GitHub

Check the tools first: run `gh --version`, then `gh auth status`. If either fails, explain in plain words how to install the GitHub CLI or run `gh auth login`, and wait; nothing that ends in a pull request works until gh does. In a no-reply run (`KSTACK_NO_REPLY=1`), do not wait: name the failing check in the closing as the owner's to fix and carry on, because the docs below do not depend on gh.

If the project has no GitHub repo, offer to create a private one and push. Create only on an explicit yes.

Then, once per project, explain the workflow change in two sentences: from now on, work lands as a pull request that gets reviewed and then merged, instead of direct commits to main. Record a dated line for this in docs/decisions.md so no later session repeats it; if the line is already there, say nothing.

## Closing

Tell the owner what was created or changed, how many rows the feature map has, and anything that still needs their action (a gh login, a secret to remove, areas not yet read). Invite the first task: tell me the first thing you want changed, and I will queue it.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" familiarize <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.

Setup complete. For your first piece of work, call the Skill tool with "clarify-task".

If the Skill tool cannot find clarify-task, say in one plain sentence that the full kstack chain is not installed and end here; the docs and GitHub setup stand on their own.
