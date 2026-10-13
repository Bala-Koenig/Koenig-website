---
name: koenig
description: "Use when the user needs help finding, choosing, installing, or updating a kstack skill, or is unsure which one fits. Trigger on meta-questions about skills or the library itself: \"what skill should I use for X\", \"is there a skill for X\", \"which skill handles this\", \"what can kstack do\", \"how do I update or install kstack\", \"set up kstack here\", or \"add missing skills\". Also trigger when the user hands over an ambiguous task and it is unclear whether a library skill already covers it; this skill figures out the right one and starts it, or explains that none exists yet. Also use when a request clearly matches a library skill that is not currently loaded. Do not use for questions unrelated to skills or kstack, once the right skill is already known and running, or when the user wants to author a brand new skill or publish one to a marketplace (that is skill authoring, not routing)."
argument-hint: "[what you are trying to do]"
---

# koenig

Match the situation to one skill below and start it. For a model-invocable target, end by doing exactly this: Call the Skill tool with "<target>". A target the model cannot start is named as a plain /label for the owner to run. If nothing matches, answer directly. Read tasks/queue.md first so you can say where the owner is in the chain; if it does not exist, proceed silently.

## The standing workflow

- One task at a time; the queue in tasks/queue.md holds the rest.
- A plan is written and approved before any edit.
- The fence limits edits to the plan's files while work runs.
- Evidence is pasted before anything is called done.
- Every finished task ends as a PR, never a commit to main.

The chain (clarify-task, plan-task, guard, implement-surgical, verify-done, update-memory) hands off stage to stage on its own. clarify-task is the single entry for any work: it splits a bundle into a queue, then scopes the active task and proves what the change could break, before the plan is written. Your job is entry, not micromanagement: start the right skill and step back.

## Where to route

| The owner says something like | Start |
|---|---|
| "I have several things I want done", a list of asks | clarify-task; it splits the bundle into a queue, then scopes the active one |
| "change this", "fix this", "add this" (one ask) | clarify-task; it runs the rest of the chain |
| "is this safe?", "what else could break?" (before a change) | clarify-task; its blast-radius step names and proves the one safety fact |
| "set up this project", or a first run with no docs/architecture.md | /familiarize, which only the owner can run (see first run below) |
| "I did not follow that", "wait, what?", "plain English please" | speak-plain, re-pitch mode (say /speak-plain; the owner runs it) |
| "grill me", "stress-test my thinking" | interview (say /interview; the owner runs it) |
| "review the plan hard", "attack this plan" | plan-adversary; a Track B skill, so when it is not installed, say so and put the plan through interview instead |
| "is it actually done?", "prove it works" | verify-done |
| "guard off", "drop the fence" | guard (it deletes the fence file) |

When unsure which fits, start clarify-task and say why you were unsure. A wrong route costs one question, not one wrong edit.

If a routed skill is not installed, say so plainly and point at Getting kstack below; never imitate the missing skill from memory.

## First run

Before the first task in a project:

1. Check git and the GitHub CLI: `git --version`, `gh --version`, `gh auth status`. If any fails, walk the owner through install and login in plain words (`gh auth login`); every task ends with a PR, so both must work first.
2. Tell the owner, once: work lands as a pull request that gets reviewed and then merged, instead of direct commits to main. Record that in docs/decisions.md so it is not repeated every session.
3. For a project with no docs/architecture.md, offer /familiarize. When it is not installed yet, run the two checks above and proceed; clarify-task reads the code directly.

## Catalogue

Twenty-two third-party skills carried verbatim at pinned versions (catalogue/SOURCES.lock), plus two reference cards (code-review-graph, graphify): grilling, grill-me, grill-with-docs, wait-what, diagnosing-bugs, handoff, wizard, writing-for-agents, git-guardrails, unslop, bro, tdd, technical-writing, karpathy-guidelines, karpathy-autoresearch, karpathy-llm-wiki, systematic-debugging, verification-before-completion, and the four principle leaves. Route to one only when it is installed and fits. Where a kstack skill covers the same ground with project state (speak-plain over unslop, verify-done over verification-before-completion, guard over git-guardrails), prefer the kstack skill.

Three of these act on the network or the repo by design, so keep them off a non-technical owner's default set: karpathy-llm-wiki fetches URLs, karpathy-autoresearch commits and reverts experiments in the user's git repo, and wizard opens URLs and writes GitHub secrets. And do not install git-guardrails globally alongside kstack: its hook blocks every `git push`, including the task-branch push update-memory needs to open a PR, so a global install dead-ends every task at the finish. If a project wants it, scope it to force-push only or leave the kstack guard to do the job.

## Getting kstack

A teammate installs it once, inside Claude Code:

```
/plugin marketplace add <kstack-repo>
/plugin install kstack
```

Updates arrive through the same marketplace: `/plugin` shows and applies them, and this map updates with the library.

## For maintainers

Every skill named in this file must exist in the library. Any add, rename, or removal updates this file in the same change. A router that names a missing skill, or omits a shipped one, lies to everyone who installs it.

Log this run with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" koenig <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.
