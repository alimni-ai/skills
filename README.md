<div align="center">

# علّمني · Alimni AI

**Agentic execution in Arabic, across tools.**

تعلّم الذكاء الاصطناعي بالممارسة، لا بالمشاهدة فقط

[الموقع · Website](https://alimni-ai.com) · [قناة تيليجرام · Telegram](https://t.me/alimni_ar) · [LinkedIn](https://linkedin.com/company/alimni-ai)

</div>

---

## بالعربية أولاً (Arabic-first)

> **علّمني** هي طبقة تنفيذ بالعربية لأدوات الذكاء الاصطناعي الوكيلة (Claude Code · Codex · n8n · MCP).
>
> ليست دروسًا تشاهدها، بل **مهارات تثبّتها في وكيلك وتشغّلها مباشرة**. كلّ مهارة تأتي مع كود، تمارين عملية، ومستودع جاهز للاستخدام.
>
> الجمهور: المتحدّثون بالعربية الذين يجدون أنفسهم مقصيين من الموجة الذكاء الاصطناعي لأنّ المحتوى التقني كلّه بالإنجليزية أو الفرنسية. المغرب، الجزائر، تونس، مصر، الشام، الخليج، والمغتربون.

### كيف تثبّت مهارة (How to install a skill)

```bash
# Claude Code
claude plugin install alimni-ai/skills/setup-agentic-ar

# OpenAI Codex
codex skill add alimni-ai/skills/setup-agentic-ar
```

كلّ مهارة تعمل على كلا الـ harness بشكل أصلي (انظر `COMPATIBILITY.md`).

---

## In English

**Alimni AI** (علّمني — Arabic for «teach me») is a pedagogy layer for the practice of agentic coding, in Arabic, **across tools** (Claude Code, OpenAI Codex, n8n, MCP servers, future tools).

We do not produce videos. We ship **runnable, installable skills** that the learner adds to their own agent and executes end-to-end. The lesson IS the artifact.

### Why this exists

200M+ Arabic speakers are locked out of the agentic AI revolution because nearly all content is in English or French. Translation alone is a commodity. Our wedge is **Arabic pedagogy + first-rate execution + community feedback compounding into a learning loop** — not a translated MOOC.

### Audience

- **Primary** — Arabic-first developers and aspiring developers across MENA + diaspora, regardless of EN/FR fluency
- **Activation** — AR-primary bilingual technical practitioners (the segment that shows up first)
- **Monetization** (V2) — MENA private schools, bootcamps, freelance agencies, local trainers, government/foundation programs (Mohammed bin Rashid Centre, Misk, etc.)

### Mobile-first / low-spec friendly

Each skill declares in its frontmatter whether it is mobile-friendly (Termux on Android), online-IDE friendly (StackBlitz, Replit, Codespaces), or requires a local terminal. We do not assume Western dev setup.

---

## Repository structure

```
/skills/<slug>/                  Per-skill directory (the product)
  source.md                      Single source of truth — Arabic, with frontmatter
  lab.md                         Hands-on exercise the learner runs
  starter-repo/                  Template project the lab builds (when applicable)
  claude/SKILL.md                Compiled for Claude Code (auto-built)
  codex/skill.json               Compiled for Codex (auto-built)
  cheatsheet.md                  Commands + glossary AR/EN (Mature stage)
  examples/                      Real-world usage (Mature stage)
  credits.md                     Sources, inspirations, licensing (Mature stage)
  test.sh                        Smoke test the skill works
  MATURITY.md                    Current stage + iteration history

/scripts/
  build.js                       source.md → claude/SKILL.md + codex/skill.json
  new-skill.sh                   Scaffold a new skill directory
  lint-frontmatter.js            Validate skill frontmatter schema
  test-skills.js                 Run all test.sh files

/distribution/
  build-notes/                   Weekly LinkedIn-style log (manual, founder voice)
  feedback-loop-log.md           Every substantive return logged + what it improved
  brand-lock-report.md           Brand-lock status snapshot

/landing/                        Astro static landing site (W4)
/telemetry/                      Opt-in completion ping endpoint (W6)

COMPATIBILITY.md                 Skill × harness support matrix
MATURITY.md                      Skill × maturity stage index
LICENSE                          Apache-2.0
```

---

## Skill maturity ladder

A skill progresses through four stages based on completeness + community-tested-ness:

| Stage | Files required | Meaning |
|---|---|---|
| 🌱 **MVE-partial** | `source.md` + `lab.md` + `test.sh` + `MATURITY.md` | Installable + runnable. Collecting first feedback. |
| 🌿 **MVE-complete** | + `starter-repo/` + `claude/SKILL.md` + `codex/skill.json` | Tested on both harnesses. Full execution path. |
| 🌳 **Mature** | + `cheatsheet.md` + `examples/` + `credits.md` + ≥1 community-feedback iteration logged | Loop closure proven. |
| 🌲 **Reference** | + Arabic walkthrough video + GPT/Claude assistant config + Termux/online IDE compat note | Production-grade canonical reference. |

V1 target: **3 skills at 🌿 MVE-complete + 2 at 🌱 MVE-partial.** See `MATURITY.md` for current state.

---

## V1 curriculum (12 weeks, biweekly)

| # | Slug | What it teaches | Target stage |
|---|---|---|---|
| 1 | `setup-agentic-ar` | Install & configure Claude Code + Codex, first prompt, troubleshoot env | 🌿 MVE-complete |
| 2 | `prompt-loop-ar` | The pro reflex: prompt → run → debug → re-prompt | 🌿 MVE-complete |
| 3 | `ship-real-product-ar` | End-to-end: idea → repo → agent build → deploy (flagship) | 🌿 MVE-complete |
| 4 | `repo-to-agent-ar` | Connect an agent to your real codebase via MCP | 🌱 MVE-partial |
| 5 | `n8n-mcp-pipeline-ar` | Automate via MCP + n8n (the meta-skill) | 🌱 MVE-partial |

---

## How feedback flows (the moat)

The only real moat is the **dynamic feedback loop**:

```
better labs → more end-to-end executions → more substantive returns
   ↑                                                ↓
improvement                                     learning
   ↑                                                ↓
←  more trust  ←  curated taste  ←  data  ←  iteration
```

Every issue, PR, demo screenshot, retweet-with-quote is logged in
`distribution/feedback-loop-log.md` with what it improved. Skills graduate
from 🌱 to 🌿 to 🌳 by **closing this loop**, not by adding more files
in private.

---

## Contributing

This is a side-business owned by [Hervé Davies Paul](https://github.com/hpdav)
(independent of TENERE LLC). Contributions welcome via PR — please open an
issue first to discuss scope. Skills are written as **independent original
content in Arabic**, never as adaptations of existing tutorials. When
inspired by another creator, credit them via `> Inspired by [creator] —
[link]` in the skill frontmatter.

For partnership inquiries (B2B, MENA institutions): `hello@alimni-ai.com`.

---

## License

Apache-2.0 — see `LICENSE`. You may use, modify, and redistribute these
skills for any purpose including commercial. Attribution is required.
The Alimni AI name and the calligraphic logo (علّمني) are trademarks of
the project owner and are NOT covered by the Apache-2.0 grant.
