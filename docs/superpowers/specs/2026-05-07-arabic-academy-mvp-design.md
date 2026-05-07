# Alimni AI (علّمني) — Arabic AI Engineering Academy — MVP Design

**Status**: Draft for review
**Author**: Hervé (with Claude + Ines council)
**Date**: 2026-05-07
**Wedge**: Skills-first executable academy
**Target launch**: 10–12 weeks from spec approval

---

## 1. What we are building

**Alimni AI** (علّمني — Arabic imperative meaning «teach me») is an Arabic-language engineering academy for agentic coding tools (Claude Code, OpenAI Codex, n8n AI). The brand IS the pitch: an invitation, in any Arabic dialect, to «teach me artificial intelligence».

Each lesson is delivered as an installable, runnable skill that the learner adds to their own agent — not as a video to watch. The product is a public GitHub repository of skills, distributed through a static landing page in Arabic (RTL), founder build-in-public on LinkedIn AR/ENG/FR + X + Telegram + YouTube Shorts (with TikTok / Instagram Reels secondary repurposing). Every distribution channel funnels back to a single action: install the skill in your agent.

This is a side-business owned independently of TENERE LLC. V1 is hosted directly on the standalone domain `alimni-ai.com` (acquired 2026-05-07 at Cloudflare Registrar), served by Caddy on the existing `gestion` VPS — same operational reuse of infra (Caddy + CF + backup pipeline) as Kiosque, RIMAYA, BCF cadrage, but with a brand-aligned URL from W0. No transitional sub-domain, no W6 migration needed.

## 2. Why this product, why now

**Audience (primary)** — Arabic-speaking developers and aspiring developers **locked out of the AI revolution** because nearly all agentic-tools content is in English or French. This explicitly includes **monolingual or Arabic-primary speakers** across Maghreb (Morocco, Algeria, Tunisia), Levant (Lebanon, Jordan, Palestine, Syria), Egypt, Gulf (KSA, UAE, Qatar), and the global Arabic diaspora — **regardless of their EN/FR fluency**. The market is large (200M+ Arabic-first tech-curious users) and dramatically under-served.

**Audience (secondary)** — bilingual AR + EN/FR developers in MENA and diaspora who prefer Arabic-first learning content for cultural and pedagogical reasons.

**The pain we solve** — «I can read the Arabic alphabet, but every Claude Code / Codex / Cursor tutorial is in English with broken auto-subtitles. I'm locked out of agentic tools.» Alimni AI removes that wall by shipping the lesson AS A RUNNABLE ARTIFACT in Arabic — no transcript dependence, no translation friction, immediate embodied learning.

**Why skills-first, not video-first**: the 2026 SOTA distribution unit is the runnable artifact (Sahil Lavingia's 9 Claude Code skills from his book is the canonical reference). A skill installed in the learner's own agent creates an immediate, embodied learning moment that a passive video cannot. It also dodges the legal exposure of re-uploading translated tutorials.

**Why this audience as the wedge**: massively under-served (no Arabic-first agentic-tools academy exists in 2026), wide geographic reach (any Arabic-first user across MENA + diaspora), strong moral + commercial alignment (close the language gap), and Hervé's positioning + existing distribution in Francophone Africa extends naturally into Maghreb tech and broader MENA tech communities.

## 3. Success criteria — measurable

**North-star metric**: weekly skill installs from the GitHub repo (cloning, plugin install, or release download).

**V1 launch targets (12 weeks)**:

*Reach metrics:*
- 5 skills published, each tested on Claude Code + Codex
- 50+ GitHub stars
- 200+ skill installs (cumulative)
- Telegram channel: 100+ subscribers
- LinkedIn AR/FR: 12 build-note posts published, 1 viral post (>500 reactions)
- 10 inbound "request a skill" submissions

*Activation metrics (deeper signal — required, not just nice-to-have):*
- **30+ users have executed at least one skill end-to-end** (real completion, not just install)
- **10+ users have shared a real output or substantive feedback** (PR, issue, testimonial, demo screenshot, retweet-with-quote)

Reach without activation = vanity. We track activation via skill-end telemetry (opt-in `alimni-telemetry: true` flag in `source.md` frontmatter, anonymous completion ping) + manual count of public engagement signals.

**V1 is a failure if**, at week 12: <20 stars, <50 installs, <10 activations, no inbound community signal. In that case: pivot to either (a) audience-build phase (ship content not skills) or (b) abandon, no sunk-cost continuation.

## 4. Architecture

```
┌─────────────────────────────────────────────────────┐
│  GitHub repo: github.com/<alimni-ai-org>/skills        │
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
│  Landing: alimni-ai.com (Astro static, RTL, 1 page)    │
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
│  - Telegram broadcast channel @alimni_ar            │
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

### Distribution principle (locked, non-negotiable)

**One source asset, repurposed into N platform variants.** We never produce 10 different pieces for 10 platforms. We write or record once, then adapt format and language manually per platform. Automation is allowed only for **format adaptation** (vertical video crop, caption resize, X→Threads cross-post via Buffer/Hypefury). It is **forbidden** for written voice (no AI translation of LinkedIn variants — Originality.ai documents -45% engagement on AI-rewritten founder posts in 2026, and LinkedIn's 360Brew model downranks them). The GitHub repo is the canonical source for skill releases; the weekly build note Markdown file is the canonical source for storytelling.

### 🟢 Primary — every release and every build note

| Channel | Cadence | Source asset | Adaptation | Time/release |
|---|---|---|---|---|
| GitHub repo | Continuous | The work itself | — | (the work) |
| LinkedIn AR | 1 build note / week | Build note .md (canonical) | Manual MSA, dev-community register | 15 min |
| LinkedIn ENG | 1 build note / week | Same build note | Manual native ENG, builder/AI/dev register, global reach + diaspora | 15 min |
| LinkedIn FR | 1 build note / week | Same build note | Manual native FR, founder network + Maghreb bilingual | 15 min |
| X (thread) | Each skill release | Skill release notes (canonical) | Manual ENG + AR variants, ~7 tweets each | 30 min |
| Telegram broadcast `@alimni_ar` | Each release + notes | Same as LinkedIn AR | One-way push, 1 message + image | 5 min |
| YouTube Shorts | Each skill release | 60s demo screen-rec | AR voiceover + AR/EN burned-in captions | 1–2h |

### 🟡 Secondary — repurposed from primary assets, every skill release (not for build notes)

| Channel | Source asset reused | Adaptation | Time/release |
|---|---|---|---|
| TikTok | YT Shorts vertical video | TikTok-sized captions AR, hashtag rewrite | 15 min |
| Instagram Reels | YT Shorts vertical video | Caption rewrite for IG audience | 15 min |
| YouTube long-form | Expanded screen-rec (5–8 min) of the skill in action | New voiceover, more depth | 1–2h |
| Threads (Meta) | Auto-cross-post from X via Buffer/Hypefury free tier | None (auto, format-only) | 0 |

### 🟠 Opportunistic — bounded count across V1, not weekly

| Channel | Trigger | Asset | Time |
|---|---|---|---|
| Product Hunt | V1 close (W12) or flagship skill (W8) | Landing + 5 skills as the launch | 2h prep |
| Hacker News | V1 close (W12) | Show HN with V1 retrospective | 1h prep |
| Reddit (r/arabs, r/learnprogramming, r/SideProject) | V1 launch (W4) + V1 close (W12) | Adapted post, no link spam, value-first | 1h per push |
| AR/MENA dev community drops (existing Slack/Discord servers Hervé already belongs to) | Each major release | Polite share, no broadcast spam | 30 min |

### 🔴 Excluded from V1 (documented reasoning)

- **Facebook** — different demographic (gen-X, not dev-first), low ROI for MENA dev audience
- **Snapchat** — not dev-relevant
- **Mastodon** — niche anglo tech, weak AR signal
- **Bluesky** — weak AR signal in 2026 (revisit V2 if TikTok/Instagram saturate)
- **Alimni AI Discord server (own community)** — moderation debt for solo founder; revisit V2 only if inbound community demand justifies it

### Cadence target

- 1 polished skill every 2 weeks → 5 skills by week 12
- 1 build note every week → 12 build notes by week 12, each with 3 LinkedIn language variants
- No daily posting on any channel
- No moderation-debt commitments (no own Discord, no own Slack workspace, no own forum) in V1

### Anti-AI-rewrite discipline

All founder-voice content (LinkedIn AR + ENG + FR variants, X threads, build notes, retrospective) is manually authored by Hervé. AI is used as a research, outline, and proofread tool — never as the published voice. This is enforced by self-discipline plus a periodic Originality.ai check (sample 1 post / month) to confirm AI-detection score stays <30%.

### Bandwidth math (verified vs the 5–8h/week budget)

| Activity | Time/week (avg) |
|---|---|
| Skill creation (drafting, AR review, harness test) | 4–6h |
| Primary distribution (3× LinkedIn + X + Telegram + YT Shorts averaged across release weeks) | 1.3h |
| Secondary repurposing (TikTok + IG Reels + YT long-form during release weeks) | 0.7h |
| Opportunistic pushes (averaged: 4 events × 2h ÷ 12 weeks) | 0.7h |
| Telemetry monitoring + admin | 0.2h |
| **Total** | **6.9–8.9h / week** |

This sits at the upper edge of the budget. The **skip-week protocol** (any week logged >10h triggers a skip-week the following week, build note only) absorbs spikes. If we consistently exceed 9h/week for 2 weeks in a row, the council reassesses (drop a secondary channel, push a release back).

## 8. Legal & ethical frame

**Source material — strict rule**: third-party tutorials serve **only as references and inspiration, with credited links** — never as a source for translation or adaptation. We do **not** translate, paraphrase, or adapt third-party transcripts into Arabic skill content **without explicit written permission** from the creator. This is a hard rule, not a guideline. Skills are written from first principles in Arabic. Where a skill is meaningfully indebted to a specific creator's framing or insight, we credit them by name + link in the frontmatter (`inspired-by:` field) and link to their original work.

**Embedding video**: the landing or skill examples may embed an originator's video (YouTube embed iframe) with a "watch the original" link. We never re-upload, never strip credit, never overlay our brand on their content. Embeds are subject to the original platform's terms (YouTube ToS allows embedding by default unless the creator disabled it).

**Voice & narration**: AR narration in YouTube Shorts uses the founder's own voice or clearly-labeled TTS. **No voice cloning of any creator, ever.** EU AI Act Article 50 (effective August 2026) requires labeling of AI-generated audio for EU audiences — we comply by default.

**Outreach**: when a skill credits a creator, we send a courtesy email/DM explaining what we did and linking the published skill. This is goodwill, not legal obligation, but it builds long-term reputation.

## 9. Brand & identity

- **Name**: **Alimni AI** — from the Arabic imperative علّمني («teach me»). Universal across all Arabic dialects (MSA, Maghreb, Levant, Egyptian, Gulf). The brand IS the pitch: invites the AR-first learner to ask the academy directly to teach them.
- **Visual identity**:
  - **Primary logo**: Arabic-script `علّمني` — visible everywhere (landing hero, GitHub avatar, social profiles, YT thumbnails, email signatures). For AR-first audience, this is the immediate signal of belonging.
  - **Secondary mark**: Latin transliteration `Alimni AI` — used in URLs, English/French distribution contexts, and product UI labels.
  - **Always paired** in social bios, hero sections, and OG images so AR-monolingual users instantly recognize they're in the right place.
- **Tagline (AR primary)**: علّمني الذكاء الاصطناعي بالعربية — «Teach me AI in Arabic».
- **Tagline (EN/FR secondary)**: «Teach me AI — in Arabic.» / «Apprends-moi l'IA — en arabe.»
- **Domain strategy — single-track (locked, revised 2026-05-07)**:
  - **`alimni-ai.com` is the canonical domain from W0**, acquired 2026-05-07 at Cloudflare Registrar ($12/yr, status: registered with WHOIS privacy ON, auto-renew ON, ICANN-confirmed). Hosted by Caddy on the `gestion` VPS via DNS A record + CF proxy ON.
  - **Why no transitional sub-domain**: with zero traffic at W0 there is no SEO/links to lose by starting on the wrong host. `alimni.tenereonline.com` would have signaled wrong parentage (Alimni is independent of TENERE), forced 301 redirects later, and required updating bios + install commands at migration time. Direct-to-canonical eliminates that debt.
  - **Why infra reuse is still preserved**: same gestion VPS, same Caddy, same CF DNS workflow, same backup pipeline (now adding `alimni-ai.com` to the backup target list). Only the host header changes.
  - **Typo-redirect insurance**: also acquire `alimniai.com` ($12/yr) and configure as permanent 301 → `alimni-ai.com`. Optional but strongly recommended ($12 insurance vs. losing typo traffic + squatter risk). Decision pending Hervé in `brand-lock-report.md`.
  - **GitHub repo URL `github.com/alimni-ai/skills` is immutable from day 1** — install commands in skills, videos, and posts never break, regardless of any future hosting changes.
- **Brand-lock checklist (mandatory before any public commit to the name)**:
  1. **Domain purchase** — purchase `alimni-ai.com` at Cloudflare Registrar ($12/yr), simultaneously purchase `alimniai.com` ($12/yr) for typo redirect insurance. Total: $24/yr.
  2. **Trademark search** — clear "ALIMNI" + "ALIMNI AI" + "علّمني" against USPTO (US), EUIPO (EU), and WIPO Madrid in Nice classes 9 (software) + 41 (educational services). Document results. **Specific check**: surface any "Alumni AI" alumni-engagement products to verify they are in different sub-classes (alumni-management ≠ AI engineering education) — coexistence acceptable if no class overlap.
  3. **Reputational/conflict scan** — Google "Alimni AI" / "علّمني AI" / "Alimni dev", X handle search, GitHub org search, LinkedIn page search. Specifically check for existing AI/dev brands using "Alimni" since 2024-2026 (recent enough to risk active conflict). "alumni-management AI" tools are a separate category and not a blocker.
  4. **Social handles** — secure `@alimni_ai` (or chosen variant) on X, LinkedIn page «Alimni AI — Arabic AI Engineering Academy», Telegram channel `@alimni_ar` (broadcast, not group), GitHub org `alimni-ai`, Bluesky `@alimni-ai.com` (custom domain handle, free after domain purchase). All using `hello@alimni-ai.com` once Cloudflare Email Routing is live (Step 1.5b); use `contact@tenereonline.com` only as fallback if email routing isn't ready when claiming a handle.
- **Fallbacks if any blocker**:
  - First fallback: `allimni-ai.com` (double-l, more AR-faithful transliteration)
  - Second fallback: `mu3allim-ai.com` (Arabish, "teacher")
  - Third fallback: `muhandis.dev` (engineer)
  - Then back to brainstorming round if nothing clears.
- **Email**: `hello@alimni-ai.com` is the public-facing brand email from W0, set up via Cloudflare Email Routing. CF Email Routing destination is `contact@tenereonline.com` (TENERE corporate operational inbox — single-inbox principle per memory `feedback_tenere_corporate_email_rule.md`), not Hervé's personal Gmail directly. Visitors interact only with `hello@alimni-ai.com`; routing to the TENERE corporate inbox is internal plumbing.
- **Tone**: warm, pedagogical, invitational, dev-community. AR-first whenever possible. Vouvoiement OK in FR posts, MSA simple in AR. Less corporate than TENERE, more inclusive of self-taught learners.
- **Visual**: minimal, dark-mode default, AR-script-first hero, monospace (Latin code) + serif AR pairing. Logo iteration at design phase (V1 = stylized علّمني calligraphy, can be iterated by hired designer post-W4).

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

**Monetization principle — non-negotiable**: V1 is **100% free**. No paid tier, no premium content, no payment integration, no Stripe/Paddle/LemonSqueezy hookup, no "early-bird" pricing teaser. **No monetization mechanism is built before V1 success metrics (§3) are met** — including activation thresholds (30+ end-to-end completions, 10+ real feedback signals). Premium products are designed only after we have **proven** real usage, not assumed it. This avoids the classic indie-product trap of charging into a vacuum and burning credibility on a paywall before there is anything worth paying for.

If V1 hits or exceeds success metrics, V2 prioritization is decided based on which inbound signal is loudest (paid demand → tiers; cohort demand → workshop; portability demand → Cursor support). Until then, we resist all monetization temptation, including from external advice that says "just charge for it."

## 11. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Founder bandwidth collapses across TENERE app + Kiosque + RIMAYA + Alimni AI | High | High | Cadence sized for 1 skill / 2 weeks (not 1/week). Hard cap on weekly time. Skip-week protocol if blocked. |
| Multi-harness format drift (Claude or Codex changes spec) | Medium | Medium | CI tests against latest CLI weekly. Version-pin in `package.json`. Skills authored to lowest-common-denominator capabilities. |
| Copyright complaint from a creator | Low | High | Independent original content. Credit + courtesy outreach. Take-down protocol: remove on first request, no debate. |
| Launch with no audience (radio silence at week 12) | Medium | High | Build-in-public starts week 1, not week 12. Even before V1 ships, we have an audience watching the build. |
| Domain `alimni-ai.com` actually taken at purchase | Low | Low | Fallback `muhandis.dev` (verified free). |
| Arabic translation quality criticized publicly | Medium | Medium | Native AR speaker reviews every skill before publish. Public correction protocol: PR welcome, named contributors credited. |
| AI-detection downrank on LinkedIn AR/FR | Medium | Medium | All founder posts written manually. Use AI for research only. |

## 12. Out-of-scope V2+ candidates (not committed)

- **Alimni AI Pro**: paid tier — premium skills, cohort access, certificate
- **Alimni AI MCP**: an MCP server that hosts the academy as a queryable skill library inside any agent
- **Alimni AI for Teams**: white-label academy for MENA companies onboarding their devs to agentic tools
- **Demo studio (Remotion-based)**: programmatic video generation for skill demos, versioned in Git
- **Activepieces integration**: if we ever embed automation in a paid tier, prefer Activepieces (MIT) over n8n (Sustainable Use License blocks SaaS reselling)

## 13. Open questions for V1 implementation plan

These are picked up by the next skill (writing-plans), not resolved here:

- Exact GitHub org name (`alimni-dev`? `alimni-ar`?)
- Choice of Astro vs raw HTML for landing (Astro likely overkill for 1 page)
- Whether to write the build script in Node, Bun, or Deno
- CI runner: GitHub Actions free tier sufficient?
- Telegram bot vs human posting (V1 = human; bot is V2)
- Logo design path (Hervé in Figma, or hire a designer for $200)
- First skill to write (suggested: `setup-agentic-ar` — easiest, most foundational)

---

**End of design.** Implementation plan to follow via `writing-plans` skill once this design is approved.
