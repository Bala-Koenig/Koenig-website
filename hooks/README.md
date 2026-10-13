# kstack hooks

## Installing the guard hooks

Two small scripts protect your project while Claude works. One watches
terminal commands and stops or questions the destructive ones. The other
checks every file edit against the fence, the list of files the approved
plan is allowed to touch.

What the guard does and does not do, stated plainly so you can trust it:
it blocks accidental out-of-plan edits and the common destructive commands,
across the Edit and Write tools and the usual Bash write forms (redirection,
`tee`, `sed -i`, `dd`, `cp`/`mv` into a new path). It is a strong seatbelt,
not a locked vault. A determined or adversarial agent, or an unusual tool
the script does not recognize as a write, can still get around it. The value
is that a well-meaning agent working fast does not wander outside the plan by
accident, and that the destructive commands it does recognize are stopped or
questioned. Treat it as accident prevention, not a security boundary.

The hooks can be registered two ways. Both use the same snippet.

### Way 1: plugin install

If you use kstack as a plugin, the guard skill registers both hooks for
the session on its own when a plan is approved, and they go away when the
conversation ends. Nothing to install.

If you want the protection always on, in every session, merge the block
from `settings-snippet.json` (next to this file) into your project's
`.claude/settings.json`. The snippet's commands resolve through
CLAUDE_PLUGIN_ROOT, so in a plugin install they point at the plugin's own
copies of the scripts. No files to copy.

### Way 2: copied install (no plugin)

If kstack sits in `.claude/skills/` instead of a plugin,
CLAUDE_PLUGIN_ROOT is not set and the guard skill cannot register working
hooks by itself. Do this once:

1. Copy `kstack-guard-bash.sh` and `kstack-guard-edit.sh` into a folder
   named `.claude/hooks/` inside your project.
2. Merge the block from `settings-snippet.json` into your project's
   `.claude/settings.json` (create it if it does not exist). If your
   settings file already has a `hooks` section, add the two entries to it
   instead of replacing it. The snippet's commands fall back to
   `.claude/hooks/` in your project when CLAUDE_PLUGIN_ROOT is unset, so
   the same snippet works here too.
3. Start a new Claude Code session. Hook changes only load on start.

Without this registration the fence in a copied install is behavioral
only: Claude promises to stay inside the plan, but no script enforces it.
The familiarize skill checks for this registration during setup and tells
you which state you are in.

## What to expect afterward

- Ordinary commands and edits run exactly as before.
- A dangerous command either stops with a short explanation or pauses and
  asks you to approve it.
- Edits outside the plan are blocked only while the fence file
  `tasks/fence.txt` exists. The guard skill writes that file when a plan
  is approved, and deleting it (say "guard off") lifts the fence.
- While the fence is up, a Bash command that writes to a file outside the
  plan (a redirect, `sed -i`, `tee`, and so on) is paused for your approval,
  the same as an edit would be, so the terminal is not a way around the plan.
- The fence file cannot be edited while it is active, so a session cannot
  quietly widen its own scope. To change what a task may touch, agree the new
  scope with the owner and let guard rebuild the fence.

Both scripts need bash and python3. macOS and Linux ship with both. On
Windows they run only under Git Bash or WSL with `python3` on the PATH; a
plain PowerShell or CMD session cannot run them, so on stock Windows the
fence is behavioral only (Claude promises to stay in the plan, but no script
enforces it) until you install one of those. They never touch the network
and never write logs or any other files.
