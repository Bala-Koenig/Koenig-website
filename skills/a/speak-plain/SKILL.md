---
name: speak-plain
description: "Cut AI tells and jargon from text written for the owner, and re-pitch the last message in plain words on request. Use when the owner says they did not follow, asks for plain English, or says \"wait, what?\"; or as a deliberate pass over a PR body or doc before it goes out."
disable-model-invocation: true
---

# speak-plain

Plain language to the owner, always. This governs prose written for a person: chat replies, PR bodies, docs, commit messages. It never rewrites code.

The chain's own skills already carry the two rules that matter most, in their closing sections: write for a non-programmer, and keep skill vocabulary out of it. This skill is the deliberate pass when a message still reads wrong, and the re-pitch when the owner asks for one. It is invoked on purpose, not on every message.

Use the terms from the Vocabulary section of `docs/architecture.md` if it exists; if not, proceed silently.

## Mode contract

Change prose only. Keep code blocks, metadata, data, and link targets unchanged. When another task uses this skill for a PR body or commit message, return only the final text. Do not invent facts: never add a name, number, date, quote, or citation that is not in the source or from the owner. If a sentence needs a missing detail, ask for it or write a simpler sentence.

## The tells that matter for agent output

1. **Em dashes.** Avoid them entirely. Use periods or commas (no en dashes, no hyphen-as-dash). If a thought needs separation, end the sentence. This ban is absolute for kstack-authored and agent-written text. When editing text the owner wrote themselves, keep the owner's own rate.
2. **Process jargon.** Skill names and chain machinery never appear in owner-facing text: "the surprise rule", "the fast lane", "the fence", "the plan draft", "telemetry", "klog", "per the skill". The owner reads outcomes, not internals. "Per the surprise rule, I'm stopping here" becomes "I stopped because the change did not match what we agreed".
3. **Chatbot and sycophantic filler.** "I hope this helps", "Let me know if", "Certainly", "Great question", "You're absolutely right". Remove them; answer directly.
4. **AI vocabulary.** delve, crucial, pivotal, showcase, underscore, tapestry, testament, landscape (abstract), leverage (as verb), robust, seamless. Replace with plain words. <!-- specimen -->
5. **Fancy ways to say "is".** "serves as", "stands as", "boasts", "features". Say "is" or "has".
6. **Filler and hedging.** "In order to" becomes "to". "It is important to note that" gets deleted. "could potentially possibly" becomes "may".
7. **Prefer the plain word.** "utilize" becomes "use", "facilitate" becomes "help", "numerous" becomes "many".

## Say what it does, not how it feels

Name the mechanism or a number, not a mood. "The database stays close at hand" names a feeling; "a column rename fails the build" names a fact. Ask what the sentence tells the reader to do or know, then write that. If a sentence could appear unchanged in another project's docs, it says nothing about this one; cut it. Break a dense sentence in two. Prefer active voice: "queries are validated" becomes "the compiler validates queries" when the actor matters.

## What not to flag

None of these is proof by itself. Polish is not AI; many people write well. One em dash in the owner's own text proves nothing. Quoted or secondhand text is exempt. Keep useful limits, disclaimers, and real alternatives a reader may weigh. When unsure, leave it.

## Re-pitch mode

When the owner says they did not follow, asks for plain English, or says "wait, what?":

1. Restate your last message simply and concisely, like one person talking to another. Give a little context. Use Simplified Technical English and the vocabulary from `docs/architecture.md`.
2. End with the re-pitched explanation itself, never a report about it.

## Close

After a rewrite, ask two questions: "What still sounds AI generated?" and "Did the rewrite add or remove any claim?" Treat any unsupported addition or lost claim as an error. Then log the run: `bash "${CLAUDE_PLUGIN_ROOT:-${CLAUDE_PROJECT_DIR:-.}/.claude}/scripts/klog.sh" speak-plain <completed|stopped|escalated>`. If the script is missing, skip it silently and never mention logging in any message the owner reads.
