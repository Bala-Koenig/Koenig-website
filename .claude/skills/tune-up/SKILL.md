---
name: tune-up
description: Review how kstack has actually been working in this project and turn the evidence into concrete skill improvements. Use when the owner asks for a toolkit check-up, typically after a week or two of use.
disable-model-invocation: true
---

# tune-up

The toolkit gets reviewed the way the code does: on evidence, with the owner deciding what changes.

## Ask before reading

Say in plain words what this run reads: the local kstack log at `.claude/kstack/log.jsonl`, and recent session transcripts for this project at `~/.claude/projects/<encoded-cwd>/*.jsonl`. The log needs no permission. Transcripts do: ask the owner and wait for a yes before opening any. Either way, everything stays on this machine; nothing is sent anywhere. Never glob across all of `~/.claude/projects/`; that reads private chats from unrelated projects.

## Read the log

Summarize the log in plain words: which skills fired and how often, the outcomes (completed vs stopped vs escalated), and how many tasks finished. Then name every kstack skill that never fired. A skill that never fires is a finding, not a success: it triggers wrong, it duplicates something else, or it solves a problem this project does not have.

## Read the transcripts, only after a yes

Fan out two or three read-only subagents (Agent tool, Explore type) over the most recent transcripts. Each hunts for:

- moments the owner corrected the agent twice on the same thing
- skills that fired at the wrong time, or missed their moment
- interview questions the owner brushed off as pointless
- fence blocks that were friction rather than protection
- out-of-scope edits that slipped through anyway

Reviewers cite the transcript file and a short quote for every finding, and write nothing.

## Interview the owner

Call the Skill tool with "interview". If the Skill tool cannot start it (interview is user-invoked in some installs), ask the same questions directly yourself in the interview's numbered format and continue. Seed the first round with four questions: what felt slow, what felt unsafe, what the owner routes around, and what they wish existed.

## Findings become proposals

Each proposal names three things: the skill file, the exact change (current text quoted, proposed text quoted), and why the evidence supports it (a log count, a transcript quote, or an interview answer). A finding with no concrete edit behind it is a note for the summary, not a proposal.

Put each proposal to the owner with three routes, and a recommendation:

1. Apply locally now: write the edited copy to this project's `.claude/skills/<skill-name>/SKILL.md`, which overrides the plugin version in this project only.
2. Suggest to the kstack repo: write the full proposal to `.claude/kstack/suggestions/<date>-<slug>.md`, a file the owner can share or file as an issue.
3. Drop it.

Never edit a kstack plugin skill in place, and never apply anything silently. Local overrides and repo suggestions are the only two paths a change can take. Record each accepted local change in `docs/decisions.md` as a dated entry: heading `## NNNN <date> tune-up-<slug>` (scan the highest number, add one) plus one sentence on what changed and on what evidence.

## Close

Give the owner the plain summary: what the log showed, what the reviews and the interview found, and where each proposal went (applied locally, suggested to the repo, dropped). Then log the run: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" tune-up <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.
