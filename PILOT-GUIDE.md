# kstack pilot guide

You are piloting kstack: a set of skills that make Claude Code work in a safer,
more predictable way on your project. Small changes stay small. For anything
beyond a tiny obvious fix, you see and approve a short plan before any edit is
made; small obvious fixes still show you a one line plan and wait for your yes.
The finished work is prepared as a pull request for you to review and merge.
This guide takes about 20 minutes. No step needs coding knowledge.

## What you need first

Three tools. You will check them in a terminal. A terminal is the text window
where you type commands to your computer instead of clicking; on a Mac it is
the app called Terminal, on Windows it is Git Bash or PowerShell. One more
thing worth knowing now: the `.claude` folder this guide talks about is a
hidden folder, so your file browser does not show it by default. On a Mac,
press Cmd+Shift+period in Finder to show hidden files; on Windows, tick the
"Hidden items" checkbox in File Explorer's View menu.

Open a terminal and check each tool:

```
git --version
gh auth status
claude --version
```

If git is missing: Mac `xcode-select --install`, Windows `winget install --id Git.Git -e`.
If gh is missing: Mac `brew install gh`, Windows `winget install --id GitHub.cli`,
then `gh auth login` (choose GitHub.com, HTTPS, login with browser).
If claude is missing: Mac `curl -fsSL https://claude.ai/install.sh | bash`,
Windows PowerShell `irm https://claude.ai/install.ps1 | iex`.

One safety note on commands like those last two: only ever paste an install
command from the official Anthropic docs, never one a web page or an email
hands you, and if you are unsure, ask your technical contact first.

Stuck on any of these? Paste the error into Claude and ask it to help.

## Install kstack into your project

You received the kstack folder (or a zip; unzip it first).

The easiest route, and the one we recommend: open Claude Code in the project
you are piloting and paste this, filling in the path:

"Set up kstack for me from <path to the kstack folder>: copy the skill folders
from skills/a/ into this project's .claude/skills/, copy the scripts/ folder
into .claude/scripts/, and register the guard hooks following hooks/README.md."

Claude copies the skills, copies the scripts, and merges the hook settings for
you. The scripts/ folder matters: the skills use it to write the local activity
log, and if it is not copied the log is never created, which breaks the
/tune-up check-up this pilot relies on.

If you would rather do it yourself, copy three things by hand:

1. The skills: copy everything inside `skills/a/` into your project's
   `.claude/skills/` folder (create it if it does not exist). You should end up
   with folders like `.claude/skills/koenig/`, `.claude/skills/clarify-task/`,
   and so on.
2. The scripts: copy the kstack `scripts/` folder into your project's
   `.claude/scripts/`. This must sit alongside the skills or the activity log
   never gets written.
3. The safety hooks: open `hooks/README.md` and follow its short install
   section, including the step that merges its settings snippet into your
   project settings. The guard checks edits against the plan you approved and
   stops or questions dangerous commands, covering the normal edit tools and
   the common terminal write tricks. Think of it as a strong seatbelt, not a
   locked vault: a determined agent or an unusual tool can still get around
   it. Its job is keeping honest, fast-moving work inside the plan. On
   Windows, the hooks run only under Git Bash or WSL with python3 installed.

Check it worked: start `claude` in the project and type `/`. You should see
`koenig`, `clarify-task`, `familiarize` and the rest in the list.

## First run

In your project, run:

```
/familiarize
```

It reads your codebase, asks you a short set of questions (each comes with a
recommended answer you can accept by number), and writes the project's memory
files: a feature map, a decision log, and a task queue. It respects whatever
CLAUDE.md you already have. It also checks your GitHub setup and explains the
one workflow change: work lands as a pull request that you review and merge,
instead of direct commits.

## Daily use

Just describe what you want. The skills route themselves. Two habits worth
keeping:

- List several things at once if you like. "Fix the header, also the export is
  broken, and add a date filter" becomes a numbered queue, and Claude confirms
  the order with you. It then works through them one at a time, and in a normal
  session each finished task ends that session. To start the next task, type
  `/clear`: it starts a fresh session, so the next task begins clean instead of
  carrying leftovers from the last one. Then ask for the next item on the queue.
- Read the plan when it is shown to you. That 30-second read is your control
  point: editing waits for your yes, and the guard then holds the work to the
  files the plan named.

If you ever feel lost, type `/koenig` and it tells you which skill fits.
If an answer was too technical, say "wait, what?" and it re-explains in plain words.

## What a pull request is, and how to merge it

Every task ends here, so this is the real last step of every job.

A pull request (a PR) is a proposed change parked on GitHub for review before
it becomes part of the real project. When Claude finishes a task, it gives you
a link to the PR. Open that link on github.com. Automatic checks and a preview
run on their own; you do not have to start them.

Look at the preview and confirm it matches what you asked for. When the checks
show green, click the green Merge button. That click is the moment the change
joins the real project. Until you click it, nothing you and Claude did has
touched the live project.

## What gets recorded, in plain terms

A small local file, `.claude/kstack/log.jsonl` in your project, records each
skill run: when, which skill, and how it ended. It stays on your machine.
Nothing is sent anywhere. Two honest details: the file is only created if the
`scripts/` folder was copied during install (see the install section), and each
entry is one compact line of labeled data, so you can open and read it, but it
reads like a record, not prose. This is what makes the pilot useful: it shows
which skills help and which get in the way.

## Your one pilot duty

At the end of week 1 and week 2, run:

```
/tune-up
```

It reads the local log, asks your permission before looking at anything else,
interviews you about what felt slow or unhelpful, and turns your answers into
concrete improvement proposals. Approve, reject, or edit them; the accepted ones
are the pilot's real output. Suggestion files land in
`.claude/kstack/suggestions/`; send that folder to the kstack maintainer.

Before you send it, skim the files. They can contain snippets of your project
and your own answers to Claude's questions. Remove anything private, like
customer names, credentials, or internal data, and send the folder only
through your normal approved work channel.

## If something goes wrong

- A blocked edit or command shows a plain message saying why and what to do.
  If it blocked something you actually wanted, that is valuable pilot feedback;
  note it and mention it in tune-up.
- To turn the edit fence off at any time, say "guard off".
- To stop using kstack entirely, delete the `.claude/skills/` folders you
  copied, delete `.claude/scripts/`, and remove the hooks block from your
  settings. A few helper files kstack wrote during setup stay behind:
  `docs/architecture.md`, `docs/decisions.md`, the `tasks/` folder, a line in
  `.gitignore`, and a kstack block in `CLAUDE.md`. If you want a fully clean
  removal, delete the docs/ and tasks/ files kstack created and the kstack
  block in CLAUDE.md.

Questions at any point: ask Claude first, then the kstack maintainer.
