# Prompting coding agents well

A short guide for everyone at Koenig who uses Claude Code or a similar coding agent, whether you write code daily or have never opened a terminal. Ten minutes to read, immediately usable.

## The mental model

A prompt is a brief to a capable colleague. That colleague is fast, well read, and takes you literally. They cannot read your mind, and they will fill every gap you leave with a guess. A good brief has four things: the goal (what you want), the context (where it lives and what already exists), the constraints (what must not change), and the done-condition (how both of you will know it worked). Everything below is just that idea applied at different sizes.

## The five parts of a good coding prompt

1. **Goal.** What you want, as an outcome, not steps. "Add a weekly summary email to the inquiry agent" beats "open agent.py and add a function".
2. **Where it lives.** Name files, folders, or an example to copy. "The email templates are in templates/, follow the style of booking-confirmation.html."
3. **What must not change.** "Do not touch the RMS sync job or change any existing template."
4. **How to verify.** A check the agent can run itself. "Run the tests in tests/email/ and show me the output."
5. **What to do when unsure.** "If anything is ambiguous, ask me before writing code."

Not every prompt needs all five. Small tasks need one or two. The bigger and vaguer the task, the more parts you should fill in.

## Match the prompt to the size of the task

### Small fix: two lines is fine

- BAD: "There's something wrong with the dashboard, the numbers look off, can you make it right and also tidy it up a bit while you're there?"
- GOOD: "The trainer utilisation dashboard shows 0% for trainers with no sessions this week. It should show 'No sessions' instead. Only change that display logic."

If you could describe the change in one sentence, just say it plainly; if kstack is installed you still get a quick one line plan to approve, and that is fine, it takes seconds. The one thing still worth adding is the fence: "only change X".

### Medium feature: use the five parts

- BAD: "Add filters to the reports page."
- GOOD: "Goal: let users filter the course revenue report by region and month. It lives in reports/revenue/, copy how the existing course-type filter works. Do not change the underlying RMS query or any other report. When done, run the report tests and show me a screenshot with filters applied. Ask me first if the region list should come from RMS or be hardcoded."

### Large or vague work: plan first, interview style

- BAD: "Build a LinkedIn automation that posts our upcoming courses."
- GOOD: "I want a LinkedIn automation that posts upcoming course promotions. Before writing any code, interview me about what I have not thought through: posting schedule, which courses qualify, approval flow, what happens when a course is cancelled. Then write a plan I can read in two minutes. Wait for my approval before implementing."

For large work, switch the agent into plan mode so it holds off editing files while you talk. Anthropic's own guidance and HumanLayer's context engineering work agree on the reason: reviewing a 200 line plan is far cheaper than reviewing 2000 lines of code, and by the time wrong code exists, the cost of fixing the misunderstanding is at its maximum.

## Terminal tools that multiply a prompt

Verified against the Claude Code version installed on 2026-08-21; re-check per release.

One line each on when to reach for them in Claude Code:

- **Plan mode (Shift+Tab).** Any task where you are unsure of the approach or it touches several files. The agent reads and plans but cannot edit until you approve.
- **/clear between tasks.** Every time you switch to an unrelated task. A session full of leftovers from the last job makes the agent worse at this one.
- **/goal.** When the task has a checkable end state: "/goal all tests in tests/email pass and no other test file changed". A separate model re-checks after every turn and the agent keeps working until it holds.
- **Queued follow-ups.** Type your next message while the agent works and press Enter. It queues instead of interrupting, so you never lose a thought.
- **/effort.** Turn it down (low) for routine edits to save time and cost, up (high or xhigh) for gnarly debugging or architecture work.
- **Images and file paths.** Paste a screenshot of the broken dashboard, reference files with @, or pipe a log in with "cat error.log | claude". Showing beats describing.
- **Extended thinking (Option+T).** Toggle it on for problems that need real reasoning, like a race condition or a migration plan.
- **Checkpoints (/rewind).** Went down a bad path? Rewind code and conversation to any earlier point instead of arguing the agent back.
- **"Show me your plan first."** The universal insurance line when you cannot use plan mode. Costs one sentence, catches wrong directions before they become wrong code.
- **Headless mode (claude -p "prompt").** For scripts and batch jobs, like running the same migration prompt over a list of files. If kstack is installed, launch unattended runs as `KSTACK_NO_REPLY=1 claude -p "prompt"`: the flag tells the skills nobody can answer questions, so safe work proceeds on stated assumptions instead of stalling at an approval no one will give, while anything needing your sign-off is held and named. Without the flag the skills wait at every gate, which is the right behavior when a person is watching.

## Three safety habits

- Never paste passwords, API keys, tokens, or real customer data into the agent. If a task seems to need one, stop and ask your technical contact instead.
- Never approve a command you cannot explain in your own words. Ask the agent to explain it first; it will, gladly, and the explanation often catches the problem.
- When you can, test on non-production systems or copied data first, and let the pull request review be the gate before anything reaches the real thing.

## What the pros do

Attributed one-liners from people whose guidance held up, with sources at the end:

- **Andrej Karpathy: make surgical changes.** Every changed line should trace directly to the request. No "improving" adjacent code. Prompt for it: "touch only what you must".
- **Karpathy: define success criteria the agent can loop on.** "Fix the bug" becomes "write a test that reproduces it, then make it pass".
- **Simon Willison: show, don't describe.** His favourite pattern is pointing the agent at existing working examples and asking it to combine or follow them. An agent in a codebase with good test patterns writes good tests without being told how.
- **Willison: hoard things you know how to do.** Once you figure out a trick, save the prompt and a working example. Agents can reuse a documented trick forever.
- **Matt Pocock: prompt the positive.** "Don't write long comments" plants "long comments" in the agent's head. Say what you want instead: "write one-line comments". Save prohibitions for hard guardrails, and pair them with the positive target.
- **Pocock: use leading words.** Short dense phrases like "vertical slice" or "surgical change" get echoed in the agent's reasoning and steer it more reliably than paragraphs of rules.
- **Lauren Tan (poteto): classify a question before you ask it.** If the answer is a fact anyone could observe by running something, don't ask the human and don't ask the agent to guess; have the agent run it. Save your questions for genuine preference calls no experiment can settle.
- **HumanLayer: review the plan, not the code.** The cheapest place to catch a misunderstanding is the plan. Gate implementation on a plan you actually read.
- **Addy Osmani: feed exact errors, not vibes.** Instead of "make it better", paste the failing test output, the linter error, or the review comment. The agent fixes exactly what you show it.

## Do and don't

| Don't | Do |
|---|---|
| "Make the dashboard better" | "Paste screenshot. Match this design. Screenshot your result, list the differences, fix them" |
| "Fix login, also add the export button, also update the docs" | One task per session. Queue the rest or /clear between them |
| "Don't use any external libraries, don't change the API, don't..." (ten prohibitions) | State the target: "use only what's already in package.json, keep the API as is" |
| "Fix the bug in the email agent" | "Inquiry replies go out with an empty subject when the course name has a comma. Check the template rendering in agent/templates.py. Write a failing test first" |
| "What does our RMS booking API return?" | "Read the booking client in rms/client.py and tell me what the API returns" (it can look it up; make it look) |
| "Don't write duplicate code" | "Follow the pattern in reports/course_filter.py" |
| Correcting the same mistake a third time in one session | /clear, then rewrite the original prompt including what you learned |
| "Refactor everything in this folder" | "Split rms_sync.py into fetch, transform, and write modules. All existing tests must pass unchanged" |
| "Is it done?" then trusting "yes" | "Show me the test output and the command you ran." Evidence, not assertions |
| Writing steps: "open the file, find line 40, change..." | Describe the outcome and let the agent find the files |

## If you have kstack installed

kstack front-loads most of this guide for you. The chain pins your task to exact files, asks the clarifying questions, makes you approve a plan, fences edits to the plan's files, and refuses to say "done" without pasted evidence. So your prompt can be short: say what you want in plain words and let /koenig route it, or run /familiarize once on a new project first.

Two things still belong in every prompt, because no tool can guess them:

- **The exact name of the thing.** "The inquiry email agent" if that is what the repo calls it, not "the email thing". If you know the file or flow name, say it; if you don't, say so and kstack's clarify step will list candidates instead of guessing.
- **What must not change.** You know the business risk the tools cannot: "do not touch anything that writes to RMS" is one sentence for you and a saved incident for everyone else.

## Sources

- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/goal
- https://code.claude.com/docs/en/interactive-mode
- https://code.claude.com/docs/en/model-config
- Karpathy's advice is paraphrased from his public posts, via the karpathy-guidelines skill (github.com/multica-ai/andrej-karpathy-skills)
- https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/
- https://simonwillison.net/guides/agentic-engineering-patterns/hoard-things-you-know-how-to-do/
- https://simonwillison.net/2026/Jan/26/tests/
- https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md (Pocock's advice is partly paraphrased from his public posts)
- https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md
- https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md
- https://addyosmani.com/blog/ai-coding-workflow/
