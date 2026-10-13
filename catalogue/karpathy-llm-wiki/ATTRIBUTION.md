# Attribution: karpathy-llm-wiki

WARNING: upstream's check_evidence.py lint script was NOT vendored (kstack
vendors markdown only), so the evidence checks in the Lint section's
Mechanical Reports have no script backing them here. They are manual: the
agent, or you, must grep the wiki's claims against raw/ by hand, or install
the upstream skill to get the script. The compile-time locate-before-write
rule still applies, but nothing verifies it mechanically after the fact.

- Upstream repo: https://github.com/Astro-Han/karpathy-llm-wiki
- Paths: SKILL.md and references/
- Pinned commit: eafcc77001e496cc43499e4923b663aec722c813 (see catalogue/SOURCES.lock)
- License: MIT
- Author: Yuhan Lei (Astro-Han), unofficial implementation of Andrej Karpathy's
  LLM Wiki idea (gist 442a6bf555914893e9891c11519de94f)

Capability note (intentional, know before you use it): the Ingest operation
fetches URLs BY DESIGN — the skill instructs the agent to retrieve source
content "using whatever web or file tools your environment provides" and save
it into raw/. There are no hidden scripts doing this; all network access
happens through the agent's own web tools, visible in the session. If you do
not want the agent fetching URLs, ingest by pasting text or pointing at local
files instead.

Deviations from upstream:
- scripts/check_evidence.py not vendored (kstack vendors markdown only). It was
  read and vetted: pure-local Python (re/sys/dataclasses/pathlib only, no
  network, no subprocess) that greps wiki claims against raw/ sources. The
  vendored SKILL.md's Lint section references it; without the script, run the
  "Mechanical Reports" checks manually or install the upstream skill.
