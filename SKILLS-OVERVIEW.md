# kstack skills overview

What each skill does, what you get out of it, and where to start. Written for
someone seeing kstack for the first time. Install steps live in PILOT-GUIDE.md;
this file explains what you are installing.

## What kstack is, in three sentences

kstack is a set of 11 skills, 8 that form a working chain plus 3 utilities you
invoke yourself, that make Claude Code work on your project the way a careful
engineer would: one task at a time, a plan you approve before any edit, a
mechanical fence around the approved files, evidence before any claim of
"done", and every change ending as a pull request. It exists because the
common failure of AI coding is not bad code, it is the wrong change in the
wrong place. The skills that grew from community originals were benchmarked
against those originals, on the model your team actually uses.

## Prerequisites

- git, the GitHub CLI (gh) logged in, and Claude Code installed
  (PILOT-GUIDE.md has the copy-paste commands for Mac and Windows)
- A project folder. That is all. The first skill you run builds everything else.

## Which skills to start with

You only need to remember two:

1. **/familiarize** once per project. It reads the codebase, asks you a short
   set of questions, and writes the project's memory files.
2. **/koenig** whenever you are unsure. It routes you to the right skill.

The rest of the chain fires on its own as part of the workflow. Three
utilities never do: interview (called in when a decision needs you),
speak-plain (re-explains anything on request), and tune-up (you run it after a
week) only run when asked for.

## The workflow, start to finish

You say what you want. If you asked for several things, the queue takes them
and you confirm the order. The active task gets pinned to exact files, checked
for side effects, and turned into a short plan you read and approve. A fence
locks edits to the plan's files. The change is made surgically, proven with a
real check, the project memory is updated, and the work lands as a pull request
whose summary a non-programmer can read. Then a fresh session picks up the next
task from the queue.

## Every skill and its end result

The chain, in order:

| Skill | When it runs | What you end up with |
|---|---|---|
| koenig | You ask which skill fits, or hand over something ambiguous | The right skill chosen and started, or a plain answer that none fits |
| familiarize | Once per project, run by you | docs/architecture.md (feature map), docs/decisions.md, a task queue scaffold, a checked gitignore, GitHub set up, the PR workflow explained once |
| clarify-task | A task starts, a message bundles several asks, or an ask names no exact file | Several asks become tasks/queue.md with one marked active and risky ones flagged for your sign-off; the active task pinned: exact owning files, who else uses them, a do-not-touch list, the check that will prove it done. Similar-looking paths are listed for you to pick, never guessed |
| plan-task | After clarify-task, except on small unambiguous fixes | A numbered plan with a 30-second summary you approve before anything is edited |
| guard | Automatically, right after you approve a plan | A live fence: edits outside the plan's files are blocked, and out-of-plan terminal writes and destructive commands are stopped or held for you. A strong seatbelt, not a locked vault |
| implement-surgical | During the edit | The smallest correct change; every changed line traces to the plan; surprises stop the work and come back to you |
| verify-done | Before any claim that work is finished | The named check run fresh with its output pasted, or the word UNVERIFIED with the exact command for you to run. Never "should work" |
| update-memory | After verification | Project memory refreshed, fence dropped, work committed on a branch, pull request opened with what changed, what was not touched, and the evidence |

The three utilities, which run only when called:

| Skill | When it runs | What you end up with |
|---|---|---|
| interview | Called in by familiarize and clarify-task when a decision needs you, or run by you | Sharp numbered questions, each with a recommended answer, that never re-ask what the project has already decided |
| speak-plain | You ask for it, or say "wait, what?" | Any message re-explained in plain language |
| tune-up | You run it after a week or two | A review of how the skills actually performed for you, and concrete improvement proposals you approve or reject |

Two former chain skills, intake and blast-radius, were merged into
clarify-task; if an older report names them, that is where their jobs live now.

## The third-party catalogue

Alongside kstack's own skills sits a catalogue of 22 excellent community
skills kept word-for-word from their authors (Matt Pocock, Lauren Tan, Jesse
Vincent, the karpathy guidelines, and others), plus 2 reference cards, pinned
to audited versions and synced deliberately, never silently.
catalogue/README.md lists them all with links.
Start with kstack's own skills; reach into the catalogue when you want a
specific extra tool, and ask /koenig which one.

## What is recorded

One line per skill run in .claude/kstack/log.jsonl inside your project: when,
which skill, how it ended. It stays on your machine, readable in any text
editor, and it is what /tune-up uses to improve the skills around how you
actually work.

## Where the evidence lives

Here is what actually ran, no more and no less. Most skills passed a single
blinded benchmark run each (n=1), against the original community skills on
Sonnet, across three fix iterations. Three skills (plan-task, familiarize,
tune-up) have never run live at all. The full end-to-end session passed all
nine acceptance checks, including the mechanical fence blocking an
out-of-plan edit, but it was graded by the orchestrator against pre-written
criteria, not by a separate judge. The guard hooks have a 60-case regression
suite that passes. KSTACK-REPORT.md tells the story with the numbers and the
caveats.
