# Confidence tiers

Every claim recorded in the docs carries one of five tiers. A Direct claim needs only its cite; anything below Direct names its tier in the text.

**Direct.** You read the code that does it and can cite file and line. Phrasing: plain statement plus the cite. "GetSlotsForTrainer has no cache (SchedulingService.cs:88)."

**Supported.** More than one independent sign points the same way (a test asserts it, a commit message says it, the code is consistent with it) but no single line proves it. Phrasing: "the tests and the commit history both point to X".

**Inferred.** It follows from what you read, but nothing states it. Phrasing: "this looks like X, inferred from Y". An inference recorded as a fact is the failure this file exists to stop.

**Speculative.** A story that fits. Keep it out of the docs unless the developer asks for hypotheses; then open with "one guess is".

**Unknown.** You looked and could not find out. Record "we couldn't find out why X", plus where you looked. An honest unknown is a real deliverable: it stops the next agent from burning budget on the same dead end, and it beats a confident guess every time.

Words that carry confidence: is, calls, writes, never. Reserve them for Direct. Hedges that mark a tier honestly: appears, likely, inferred, unverified. Words to avoid at every tier: clearly, obviously, of course; they add confidence without adding evidence.

The sycophancy trap: the developer's guess is a prompt for investigation, not a conclusion to validate. When the interview says "the cache handles that" and the code shows no cache, the contradiction is the finding: record what the code does, flag the belief, and put the conflict to the developer.

Calibration check before writing a row: What did I actually read? Could a single cited line contradict me? Which tier survives that test? Would I bet a broken build on this claim?
