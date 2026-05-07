# Wakala — Arabic AI Engineering Academy — MVP Design

**Status**: Draft for review
**Author**: Hervé (with Claude + Ines council)
**Date**: 2026-05-07
**Wedge**: Skills-first executable academy
**Target launch**: 10–12 weeks from spec approval

---

## 1. What we are building

**Wakala** (وكيل = "agent" in Arabic) is an Arabic-language engineering academy for agentic coding tools (Claude Code, OpenAI Codex, n8n AI). Each "lesson" is delivered as an installable, runnable skill that the learner adds to their own agent — not as a video to watch.

The product is a public GitHub repository of skills, distributed through a static landing page in Arabic (RTL), founder build-in-public on LinkedIn AR/FR + X + Telegram, and demo clips on YouTube Shorts. Every distribution channel funnels back to a single action: install the skill in your agent.

This is a side-business owned independently of TENERE LLC. It is hosted on the existing `gestion` VPS (Caddy + Cloudflare) following the same operational pattern as Kiosque and RIMAYA.

## 2. Why this product, why now

**Audience**: developers in Maghreb (Morocco, Algeria, Tunisia) and the global Arabic diaspora. They speak Arabic (MSA) but read code/docs in English/French. They are early-adopters of agentic tools but Arabic onboarding content is either non-existent or low-quality video translations.

**Why skills-first, not video-first**: the 2026 SOTA distribution unit is the runnable artifact (Sahil Lavingia's 9 Claude Code skills from his book is the canonical reference). A skill installed in the learner's own agent creates an immediate, embodied learning moment that a passive video cannot. It also dodges the legal exposure of re-uploading translated tutorials.

**Why Maghreb + diaspora as the wedge**: bilingual FR/AR fluency means lower translation friction, the diaspora has EUR/USD purchasing power for future paid tiers, and Hervé's existing distribution (Niger / Francophone Africa LinkedIn presence) extends naturally into Maghreb tech communities.

## 3. Success criteria — measurable

**North-star metric**: weekly skill installs from the GitHub repo (cloning, plugin install, or release download).

**V1 launch targets (12 weeks)**:
- 5 skills published, each tested on Claude Code + Codex
- 50+ GitHub stars
- 200+ skill installs (cumulative)
- Telegram channel: 100+ subscribers
- LinkedIn AR/FR: 12 build-note posts published, 1 viral post (>500 reactions)
- 10 inbound "request a skill" submissions

**V1 is a failure if**, at week 12: <20 stars, <50 installs, no inbound community signal. In that case: pivot to either (a) audience-build phase (ship content not skills) or (b) abandon, no sunk-cost continuation.

## 4. Architecture

```
┌─────────────────────────────────────────────────────┐
│  GitHub repo: github.com/<wakala-org>/skills        │
│  (the product itself — north-star asset)            │
│  Org name finalized in implementation plan          │
│                                                      │
│  /skills/<slug>/                                    │
│    source.md         (single source of truth, AR)   │
│    claude/SKILL.md   (compiled for Claude Code)     │
│    codex/skill.json  (compiled for Codex)           │
│    examples/         (real-world usage)             │
│    test.sh           (smoke test the skill works)   │
└─────────────────────────────────────────────────────┘
                       │
                       │ install button
                       ▼
┌─────────────────────────────────────────────────────┐
│  Landing: wakala.dev (Astro static, RTL, 1 page)    │
│  - Hero AR + value prop                             │
│  - 5 skill cards with "Install" buttons             │
│  - "Request Arabic skill" form (Formspree)          │
│  - Founder section (build-in-public links)          │
│  Hosted on gestion VPS, Caddy reverse-proxy         │
│  CF in front for DNS + edge caching                 │
└─────────────────────────────────────────────────────┘
                       │
                       │ traffic from
                       ▼
┌─────────────────────────────────────────────────────┐
│  Distribution loops                                 │
│  - LinkedIn AR/FR: 1 manual build note/week         │
│  - Telegram broadcast channel @wakala_ar            │
│  - X threads (release notes)                        │
│  - YouTube Shorts: 60s demo clips per skill release │
└─────────────────────────────────────────────────────┘
```

**Single source of truth**: `source.md` is written once in Arabic. A simple Node script (`scripts/build.js`) compiles it into Claude Code SKILL.md format and Codex skill.json format. CI (GitHub Actions) runs `test.sh` on each skill against both harnesses on every PR.

**No backend, no auth, no DB in V1**. The repo IS the product. The landing is static. The "request a skill" form is a Formspree webhook. This keeps maintenance burden minimal and lets us focus on content quality.

## 5. The 5 V1 skills (progression-driven, not tool-list)

Ordering matters: each skill assumes the previous one is installed. This is a curriculum, not a catalog.

| # | Slug | What it teaches | Estimated runtime |
|---|---|---|---|
| 1 | `setup-agentic-ar` | Install & configure Claude Code + Codex, first prompt, troubleshoot env (AR onboarding) | 30 min |
| 2 | `prompt-loop-ar` | The pro reflex: prompt → run → read output → debug → re-prompt. Worked examples in AR. | 45 min |
| 3 | `ship-real-product-ar` | End-to-end: idea → repo → agent-assisted build → deployed product (small CRUD on Vercel/Caddy) | ~2h |
| 4 | `repo-to-agent-ar` | Connect an agent to **your real repo**: Claude Code in an existing codebase, MCP file system, code review patterns | 1h |
| 5 | `n8n-mcp-pipeline-ar` | Automate work via MCP + n8n: capture transcript → translate → publish (the meta-skill — automate the academy itself) | 1.5h |

Skills are written as **independent original content in Arabic**, not as adaptations of existing tutorials. Where another creator is genuinely the inspiration, we credit them with `> Inspired by [creator] — [link]` in the skill front-matter, but we do not copy structure or content.

## 6. Multi-harness packaging strategy

V1 ships **Claude Code + Codex Agent Skills only**. Cursor and Windsurf are explicit V2 (or experimental exports without correctness guarantees).

**Reasoning**: each harness has a different skill format. Maintaining four formats from day one means broken portability is more likely than working portability — and broken portability damages trust faster than limited support.

**Build pipeline**:
- `source.md` written by hand in Arabic, with frontmatter declaring metadata (slug, audience, prerequisites, est-runtime, inspired-by)
- `scripts/build.js` reads `source.md` → emits `claude/SKILL.md` + `codex/skill.json`
- GitHub Actions on push: lint frontmatter, run `test.sh` against Claude Code + Codex CLI (mocked or real)
- Releases tagged `vX.Y.Z`, downloadable as a zip or installable via `claude plugin install` / Codex equivalent

**Compatibility matrix** is published at the repo root (`COMPATIBILITY.md`) — current state of every skill across every harness, so users know what works.

## 7. Distribution & founder cadence

| Channel | Cadence | Format | Time/week |
|---|---|---|---|
| GitHub repo | Continuous | Skills + docs + matrix | (work itself) |
| LinkedIn AR/FR | 1 build note/week | Manual founder voice, no AI rewrite. Story or learning, not promo. | 30–45 min |
| Telegram broadcast `@wakala_ar` | Each release + occasional notes | One-way push. Zero moderation. | 5 min/release |
| X threads | Each skill release | Thread of ~7 tweets walking through the skill's value | 30 min/release |
| YouTube Shorts | Each skill release | 60s demo, screen-rec, AR voiceover with Arabic captions burned-in | 1–2h/release |

**Cadence target**: 1 polished skill every 2 weeks + 1 build note every week. This gives 5 skills + 12 build notes by week 12.

**Anti-AI-rewrite discipline**: per the LinkedIn 2026 algorithm (360Brew downranks AI-templated founder content) and the human-premium doctrine, all founder posts are written manually by Hervé. AI is used as a research/draft tool, never for the published voice.

## 8. Legal & ethical frame

**Source material**: existing tutorials by other creators are inspiration only, never adapted. Skills are written from first principles in Arabic. Where a skill is meaningfully indebted to a specific creator, we credit them by name + link in the frontmatter.

**Embedding video**: the landing or skill examples may embed an originator's video (YouTube embed iframe) with a "watch the original" link. We never re-upload, never strip credit, never overlay our brand on their content.

**Voice & narration**: AR narration in YouTube Shorts uses the founder's own voice or clearly-labeled TTS. **No voice cloning of any creator, ever.** EU AI Act Article 50 (effective August 2026) requires labeling of AI-generated audio for EU audiences — we comply by default.

**Outreach**: when a skill credits a creator, we send a courtesy email/DM explaining what we did and linking the published skill. This is goodwill, not legal obligation, but it builds long-term reputation.

## 9. Brand & identity

- **Name**: Wakala — Arabic for "agent" (وكيل). Short, memorable, dev-feel via `.dev` TLD.
- **Domain**: `wakala.dev` (purchase to be confirmed at infra-setup; if taken, fallback `muhandis.dev`).
- **Email**: `hello@wakala.dev` (not personal, not TENERE).
- **Tone**: dev-community warm, builder-to-builder. Vouvoiement is OK in FR posts, MSA simple in AR. Less corporate than TENERE, more authentic.
- **Visual**: minimal, dark-mode default, monospace + serif AR pairing. Logo TBD at design phase.

## 10. What is explicitly NOT in V1

To keep the wedge sharp, the following are deferred to V2+ (post-week-12 evaluation):

- ❌ Cursor and Windsurf harness packaging
- ❌ User accounts, login, paid tiers
- ❌ Cohort or live workshop program
- ❌ Discord server
- ❌ Mobile app
- ❌ Auto-ingestion pipeline (transcript scraping + LLM translation)
- ❌ Certificate / credentialing system
- ❌ Multi-language (FR-only, EN-only versions)
- ❌ Egyptian / Levant / Gulf dialect adaptations
- ❌ Marketplace for third-party skills

If V1 hits or exceeds success metrics, V2 prioritization is decided based on which inbound signal is loudest (paid demand → tiers; cohort demand → workshop; portability demand → Cursor support).

## 11. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Founder bandwidth collapses across TENERE app + Kiosque + RIMAYA + Wakala | High | High | Cadence sized for 1 skill / 2 weeks (not 1/week). Hard cap on weekly time. Skip-week protocol if blocked. |
| Multi-harness format drift (Claude or Codex changes spec) | Medium | Medium | CI tests against latest CLI weekly. Version-pin in `package.json`. Skills authored to lowest-common-denominator capabilities. |
| Copyright complaint from a creator | Low | High | Independent original content. Credit + courtesy outreach. Take-down protocol: remove on first request, no debate. |
| Launch with no audience (radio silence at week 12) | Medium | High | Build-in-public starts week 1, not week 12. Even before V1 ships, we have an audience watching the build. |
| Domain `wakala.dev` actually taken at purchase | Low | Low | Fallback `muhandis.dev` (verified free). |
| Arabic translation quality criticized publicly | Medium | Medium | Native AR speaker reviews every skill before publish. Public correction protocol: PR welcome, named contributors credited. |
| AI-detection downrank on LinkedIn AR/FR | Medium | Medium | All founder posts written manually. Use AI for research only. |

## 12. Out-of-scope V2+ candidates (not committed)

- **Wakala Pro**: paid tier — premium skills, cohort access, certificate
- **Wakala MCP**: an MCP server that hosts the academy as a queryable skill library inside any agent
- **Wakala for Teams**: white-label academy for MENA companies onboarding their devs to agentic tools
- **Demo studio (Remotion-based)**: programmatic video generation for skill demos, versioned in Git
- **Activepieces integration**: if we ever embed automation in a paid tier, prefer Activepieces (MIT) over n8n (Sustainable Use License blocks SaaS reselling)

## 13. Open questions for V1 implementation plan

These are picked up by the next skill (writing-plans), not resolved here:

- Exact GitHub org name (`wakala-dev`? `wakala-ar`?)
- Choice of Astro vs raw HTML for landing (Astro likely overkill for 1 page)
- Whether to write the build script in Node, Bun, or Deno
- CI runner: GitHub Actions free tier sufficient?
- Telegram bot vs human posting (V1 = human; bot is V2)
- Logo design path (Hervé in Figma, or hire a designer for $200)
- First skill to write (suggested: `setup-agentic-ar` — easiest, most foundational)

---

**End of design.** Implementation plan to follow via `writing-plans` skill once this design is approved.
