---
name: guard
description: Fence edits to the approved plan's files and block destructive commands for this session. Use immediately after a plan is approved, before the first edit.
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: bash "${CLAUDE_PLUGIN_ROOT:-$CLAUDE_PROJECT_DIR/.claude}/hooks/kstack-guard-bash.sh"
          statusMessage: Checking for destructive commands
    - matcher: "Edit"
      hooks:
        - type: command
          command: bash "${CLAUDE_PLUGIN_ROOT:-$CLAUDE_PROJECT_DIR/.claude}/hooks/kstack-guard-edit.sh"
          statusMessage: Checking the edit fence
    - matcher: "Write"
      hooks:
        - type: command
          command: bash "${CLAUDE_PLUGIN_ROOT:-$CLAUDE_PROJECT_DIR/.claude}/hooks/kstack-guard-edit.sh"
          statusMessage: Checking the edit fence
    - matcher: "NotebookEdit"
      hooks:
        - type: command
          command: bash "${CLAUDE_PLUGIN_ROOT:-$CLAUDE_PROJECT_DIR/.claude}/hooks/kstack-guard-edit.sh"
          statusMessage: Checking the edit fence
---

# guard

```
NO EDITS OUTSIDE THE PLAN'S FILES. NO DESTRUCTIVE COMMANDS WITHOUT A HUMAN.
```

## What the fence is

The fence is a short list of files this session is allowed to change: the files named in the approved plan in tasks/current-plan.md, plus tasks/, docs/architecture.md, docs/decisions.md, CLAUDE.md, .gitignore, and .claude/kstack/ so the chain can keep its own notes. The list lives in tasks/fence.txt, one path per line, files as absolute paths and directories with a trailing slash. Two small scripts check every edit and every terminal command against it before anything runs. A file outside the list is not edited, and a terminal command that would write outside it (a redirect, sed -i, tee) is paused for the owner the same way an edit is, so the terminal is not a way around the plan. Commands that could destroy work get stopped or handed to the owner to approve.

## When it fires

The owner does not start this skill by hand. The chain activates it on its own, right after a plan is approved (plan-task's handoff, or clarify-task's fast lane mini plan), before the first edit.

## The gate

1. Read tasks/current-plan.md and collect the files named under Summary, Files, and the numbered steps. Never add a path listed under Out of scope: that section names the do-not-touch files on purpose, and fencing them in would hand the session the exact files it must not change.
2. Write those paths into tasks/fence.txt, one per line, plus the always-allowed lines: tasks/, docs/architecture.md, docs/decisions.md, CLAUDE.md, .gitignore, .claude/kstack/. Write that exact path. The hook reads the same literal path; never route it through a variable, or writer and reader can disagree and the fence goes silently inert. If the fence file cannot be written, say so to the owner and record the fence list inside tasks/current-plan.md instead; the fence then holds by discipline until the file can be written.
3. Log the activation with one line: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" guard completed`. If the script is missing, skip it silently and never mention logging in any message the owner reads.
4. Announce two bullets: what is fenced (the plan's files) and what is blocked (recursive deletes of home or root, force-pushes to the default branch, hard resets, and similar).

## Red flags

If you catch yourself thinking any of these, stop:

- "This file is just one line over the fence." One line over is over.
- "I'll widen the fence myself, it's obviously needed." Widening requires the owner saying yes and a plan update, in that order.

## Rationalizations

| Excuse | Reality |
|---|---|
| The plan implied this file | The plan names files, it does not imply them |
| sed isn't an edit | The guard now pauses out-of-fence writes from the terminal too; honor the fence in every tool anyway |
| I'll put it back after | Out-of-plan edits are the exact failure being prevented |
| The command is probably safe | Probably is what the ask tier is for |

Violating the letter of this rule is violating the spirit of this rule.

## What a block looks like

When an edit lands outside the fence, the owner sees a message like this:

> Blocked: /project/src/billing.py is not in the approved plan, so kstack guard stopped this edit. The fence list is tasks/fence.txt. To change this file, add it to the plan with the owner and refresh the fence, or say "guard off" to drop the fence.

Dangerous terminal commands either stop with a similar message or pause and ask the owner to approve.

## Honest limits

This prevents accidental edits and pauses the common destructive commands; it is not a security boundary. The edit fence covers Edit, Write, and NotebookEdit, and the terminal check covers the usual Bash write forms (redirection, tee, sed -i, dd, cp and mv into a new path) and the destructive commands it recognizes. An unusual tool or a deliberately obfuscated command the script does not recognize as a write can still get through. The fence is a strong seatbelt with a tripwire behind it, not a locked vault. In a copied install (skills under .claude/skills/ rather than the plugin), the tripwire exists only if the two hook scripts are registered in settings per hooks/README.md; without that registration the fence is behavioral only, and familiarize checks hook registration during setup. On Windows the hooks run only under Git Bash or WSL with python3 on the PATH.

## Turning it off

Say "guard off" and the fence file tasks/fence.txt gets deleted; the hooks stay registered but allow everything. update-memory's finish step deletes it on its own when the task closes. The hooks are session-scoped and die with the conversation.

Guard active: edits fenced to the plan's files, destructive commands blocked. Call the Skill tool with "implement-surgical".

If the Skill tool cannot find the handoff target (implement-surgical), do not stop and ask: state in one plain sentence that the full kstack chain is not installed, then continue the work directly in this session following the approved plan, keeping every scope rule and the fence.
