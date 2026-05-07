# Alimni AI — competitive research lab

Reverse-engineering notes per `wissam-reverse-engineering-method` skill.
**Founder-grade analysis, not surface research.**

> Translation is a commodity. Cultural legitimacy is the moat.
> Alimni AI = Replit execution + Scrimba pedagogy + Hugging Face ecosystem
> + Maven monetization + Nas.io MENA community + Arabic-native AI workflows

---

## Tier ordering (deliberate, not equal-weight)

| Tier | Platform | Why | Time investment | Status |
|---|---|---|---|---|
| 1 | [Replit](replit/notes.md) | Strongest strategic signal — Jordanian founder, $9B, agentic coding pivot | 2-5h hands-on | 🟢 Track A done · 🟡 Track B pending |
| 1 | [Scrimba](scrimba/notes.md) | Best educational UX inspiration; engagement ≠ pricing power proof | 2-5h hands-on | 🟢 Track A done · 🟡 Track B pending |
| 1 | [Hugging Face](huggingface/notes.md) | Long-term ecosystem inspiration; distribution layer moat | 2-5h hands-on | 🟢 Track A done · 🟡 Track B pending |
| 2 | [Maven](maven/notes.md) | Cohort monetization model; ~$30K/cohort benchmark | 30-60min web | 🟢 Track A done |
| 2 | [Nas.io](nasio/notes.md) | MENA community dynamics (founder MENA roots) | 30-60min web | 🟢 Track A done |
| 2 | [DeepLearning.AI](deeplearning-ai/notes.md) | Trust layer + frontier-lab partnerships | 30-60min web | 🟢 Track A done |

**Anti-targets** (study only as Tier 3 anti-pattern, do NOT replicate):
- **Coursera / Udemy** — video-first, passive, slow, cert-heavy. Old-model EdTech.

---

## How this lab works (Track A + Track B in parallel)

### Track A — Claude alone (web/Reddit/docs research)

I can do these without your hands:

- Pricing page deep analysis (WebFetch each company's `/pricing`)
- Reddit thread aggregation (top 10 threads per platform, summarize sentiment)
- Content engine analysis (YT subscriber counts, X engagement, LinkedIn cadence)
- Public docs → moat extraction
- Founder background research
- AI transition timeline (what changed after GPT/Claude per platform)
- Competitive intelligence on MENA-specific moves (any Arabic press release?)

Estimated effort: 2-3h Claude time per Tier-1 platform, ~30-60min per Tier-2.

### Track B — Hervé hands-on

These require you to be the user:

- Sign up + onboarding stopwatch
- Take a real lesson / install / publish action
- Pay if needed (Maven cohort, Scrimba Pro, Replit teams)
- Capture authenticated dashboard screenshots into `<platform>/screenshots/`
- Lurk in their community for 1 week (Discord/Slack/Telegram)
- Write the "why do users emotionally return" paragraph

Estimated effort: 2-5h hands-on per Tier-1 platform.

### Synthesis — together

Once both tracks are done per platform, we write:
- Sections 1-10 of `notes.md` from combined evidence
- The copy/avoid matrix at root level (this README updated)
- Spec/plan amendments where the research warrants

---

## What I (Claude) need from you to execute Track A fully

Inventory (honest):

1. **Nothing blocking** — I can start Track A on all 6 platforms tomorrow with
   the WebSearch + WebFetch tools I already have. No accounts needed.

2. **Optional accelerators** (would 2-5x the depth):
   - Your existing Reddit account → I can search "saved" / "subscribed" subreddits
     more strategically than cold search (not strictly needed)
   - Read access to your existing X/Twitter feed where you already follow
     these companies (not strictly needed)

3. **Browser-side evidence** (optional, for Track B-lite I could partially do):
   - I have access to `superpowers-chrome:browsing` skill which lets me drive
     a Chrome session via DevTools Protocol
   - For PUBLIC pages (pricing, marketing, docs), I can browse + screenshot
     programmatically without your hands
   - For AUTHENTICATED pages (logged-in dashboards, paid lessons, community),
     I cannot — those need your hands

## What I need from you to execute Track B

To do this properly per the method (2-5h Tier-1 platforms):

1. **Time budget** — be honest. The full method on 3 Tier-1 platforms = 6-15h
   founder time. Splitable over the V1 12-week timeline (1.5h/week).

2. **Account access** — sign up Replit (free tier OK), Scrimba (free tier OK),
   Hugging Face (free OK). Maven cohort = paid, defer to Track A web research
   for V1.

3. **Screenshot pipeline** — mobile-take-screenshot OR drop them in
   `research/<platform>/screenshots/`. We then describe + analyze together.

4. **Daily 5-min ritual** (for retention loop reverse engineering): note when a
   platform pushes you a notification or email, and what trigger it was.
   Memory-keep this for 7-10 days per platform.

---

## Schedule proposal (12 weeks parallel with V1 build)

| Week | Track A (Claude) | Track B (Hervé) | Output |
|---|---|---|---|
| W1 | Replit Track A (web/Reddit/docs/content engine) | Replit signup + 1h hands-on | `replit/notes.md` partial |
| W2 | Scrimba Track A | Scrimba signup + 1h hands-on | `scrimba/notes.md` partial |
| W3 | HF Track A | HF signup + 1h hands-on | `huggingface/notes.md` partial |
| W4 | Tier 2 platforms (Maven/Nas.io/DLAI) Track A only | Replit deep dive 2-3h hands-on | All Tier 2 done |
| W5 | Synthesis pass: copy/avoid matrix v1 | Scrimba deep dive | Synthesis doc |
| W6 | Reddit pulse refresh on all 6 | HF deep dive | Refreshed sentiment |
| W7-W12 | Refresh as competitors move | Spot-check as new info surfaces | Synthesis maintained |

---

## When this research influences a strategic decision

The 6 Alimni defensible moves (council 2026-05-07) are based on web research +
Ines council, not yet on the deep reverse-engineering method. Once Track A+B
are complete per platform, **revisit** the 6 moves and either:

- Confirm them with new evidence
- Refine pricing / cohort design / mentor framework based on what works in the
  reverse-engineered platforms
- Identify new moves we missed

The skill `wissam-arabic-builder-ecosystem` will be updated with the deep
findings as they come in.

---

# 🎯 Copy / Avoid Matrix v1 (Track A synthesis, 2026-05-07)

> Decision-grade synthesis. Not a list of impressions — each row is a tactical
> pattern with attribution and a concrete Alimni implication. Track B (hands-on)
> may refine these, but the patterns below are robust enough to drive V1
> decisions today.

## ✅ Patterns to COPY

| # | Pattern | Source | Why it works | How Alimni applies |
|---|---|---|---|---|
| C1 | Zero-setup → running artifact in <10 min | Replit | First "I made something real" moment is the dopamine anchor | Skill #1 ends with deployed Astro page in Arabic, not "completed lesson" |
| C2 | Interactive lab inside the lesson (pause + edit + run) | Scrimba | Addresses 12.6% MOOC completion rate by making passivity impossible | `lesson.md` + `lab.md` + `test.sh`, pass = green = unit of progress |
| C3 | Cohort + live + peer accountability | Maven | 96% completion vs 12% MOOC median — social pressure beats gamification | Institutional cohort W7-W8: synchronous live sessions + mentor reviews |
| C4 | Frontier-lab co-built courses | DeepLearning.AI | Trust transfer from model-maker to course; partner co-promotes | V2: Arabic Skills cohort co-built with Anthropic; pitch when V1 ships |
| C5 | WhatsApp-first community | Nas.io | MENA reality — WhatsApp >>> Discord/Slack for non-technical audiences | V1: WhatsApp business link in footer + outreach automation playbook |
| C6 | Library-as-funnel (open-source distribution) | Hugging Face | `pip install transformers` = passive top-of-funnel paid marketing can't buy | Codex skill JSONs + Claude SKILL.mds installable via standard tool flows |
| C7 | Three-tier monetization (Free / Subscription / Cohort) | Scrimba ($0/$39/$750) | Each tier gates a different value (content vs path vs feedback) | Free skill index → MENA-priced subscription → high-ticket institutional cohort |
| C8 | Newsletter as heartbeat | DeepLearning.AI's "The Batch" | Slow-cooked trust + new-course cadence = retention floor | V2: Arabic AI weekly digest (1 skill + 1 model news + 1 community win) |
| C9 | Single-source-many-channels content | Scrimba (course excerpts repurposed) | One canonical artifact, multiple cuts → 5x leverage on production cost | One skill = lesson.md (canonical) → YT cuts + LinkedIn + X threads + newsletter |
| C10 | Founder voice as distribution multiplier | Replit (Amjad), Nas.io (Nuseir), DLAI (Andrew) | Top 3 platforms studied all have a loud founder; quiet ones struggle | Hervé's voice on Arabic AI X/LinkedIn is leverage, not vanity — operator playbook |
| C11 | Personalized mentor feedback as premium upsell | Maven, Scrimba Bootcamp | "Direct access to the instructor" = value students pay for, not access to recordings | When Alimni runs cohort, mentor reviews on student labs is the upsell anchor |
| C12 | Template / starter-repo corpus as durable moat | Replit (millions of repls), HF (1M models) | Time-compounded artifact corpus is unrenewable; new entrants can't backfill | Each skill ships `starter-repo/` — Arabic-native corpus over 12-24 months = moat |
| C13 | Free 1-2h short course as funnel | DeepLearning.AI | Low friction, high value, advertises tooling within the course | Skill #1 lesson + lab + cheatsheet sized for one-sitting completion |

## ⛔ Patterns to AVOID

| # | Trap | Source (the cautionary tale) | Why it kills | What Alimni does instead |
|---|---|---|---|---|
| A1 | Opaque consumption pricing | Replit (Lemkin July 2025: $607/week, $8K/mo projected from Agent loops) | One sticker-shock incident = brand-defining bad press; alignment broken (failures = revenue) | Flat tier OR transparent token cap. "Alimni skill never costs more than X" promise on pricing page |
| A2 | Agent that breaks working code with no rollback | Replit ("fix one thing, break ten") | Erodes trust in the tool's purpose; magic becomes liability | Every harness MUST snapshot/rollback. "Last green state" is non-negotiable |
| A3 | Video-first dependency for content production | Scrimba (great until you scale to many languages) | Production cost gates ship velocity; Arabic LLM voice tools improving fast | Text-first with optional voice; never let video gate a skill ship |
| A4 | Old-content rot | Scrimba ("some older courses dated") | 2026 skills age into 2028 zombies if no review cycle | Quarterly maturity review (Maturity ladder); explicit sunset of stale skills |
| A5 | Hosted-inference billing for students | Hugging Face (rising costs, sticker shock at scale) | Academy ≠ infra provider; mixed identity, wrong moat | Students bring own Anthropic/OpenAI keys; Alimni is curator, not endpoint host |
| A6 | All-in-one feature sprawl | Nas.io (memberships + courses + 1:1 + challenges + ads + leads) | Brand dilution; "what is this?" in customer's mind | Alimni does ONE thing: agentic execution academy in Arabic |
| A7 | Pure marketplace with discovery gating | Maven (no search appearance until paid signups) | Chicken-and-egg for new instructors; structural cold-start | Alimni catalog is curated by Alimni team; open from day 1 |
| A8 | Founder-only acquisition | Nas.io / Replit reliance on single voice | Fragile if founder pivots, distracted, or burns out | Catalog quality + community + content engine = three legs, not one |
| A9 | Certificate-as-product | Coursera/Udemy/DLAI weakness | Trust ceiling — "won't get you a job alone" | Credential is the *executed artifact* (deployed page, working agent), not PDF cert |
| A10 | Coursera-style platform dependency | DLAI relies on Coursera distribution | Loss of control on UX, pricing, audience | Alimni owns alimni-ai.com end to end; HF/distribution layers are amplifiers, not hosts |
| A11 | Synchronous-only delivery | Maven (cohort start dates create activation gaps) | Impulse-buy → multi-day wait → drop-off | V1 async-first; cohorts are upsell layer, not core delivery |
| A12 | Trust-fragility (account closures, opaque billing complaints) | Nas.io Trustpilot complaints | In low-trust markets like MENA, isolated complaints damage disproportionately | Transparent billing, refund-friendly, never "account closed mysteriously" |
| A13 | AI-native UI rewrites | Replit Agent 4 "infinite canvas" | Right bet for 2027+, wrong bet for V1 alienates dev audience | V1 stays text-first, terminal-friendly, mobile-first; canvas experiments deferred |

## ⚫ ANTI-PATTERN tier (Tier 3: study only to NOT replicate)

| Anti-pattern | Why we know it's wrong | Source |
|---|---|---|
| Video-first, passive consumption | 12.6% MOOC median completion proves passivity fails | Coursera, Udemy (Tier 3) |
| Certificate-as-primary-credential | "Won't get you a job alone" universally true | Coursera, EdX |
| Generic "AI for Everyone" content with no Arabic specialization | Plenty of supply globally; no differentiation | Most existing AI MOOCs |

---

## 🧱 The Alimni Stack (synthesis)

> Alimni AI = Replit execution + Scrimba pedagogy + HF ecosystem + Maven cohort
> dynamics + Nas.io WhatsApp-MENA + DLAI trust-via-frontier-labs — all
> Arabic-native.

Each platform contributes a layer:

1. **Execution layer** (Replit) — every skill produces a *running artifact*, not "completed lesson". Zero-setup → deploy in <10 min.
2. **Pedagogy layer** (Scrimba) — interactive lab inside the lesson; pass = green = unit of progress; small wins compound.
3. **Distribution layer** (Hugging Face) — open-source skills installable via standard tool flows; library-as-funnel.
4. **Cohort layer** (Maven) — institutional cohort with mentor reviews as premium upsell; 90%+ completion target.
5. **Community layer** (Nas.io for MENA) — WhatsApp-first, not Discord-first; matches MENA reality.
6. **Trust layer** (DeepLearning.AI) — frontier-lab partnerships (Anthropic V2 priority); newsletter heartbeat.

The unique-to-Alimni element: **Arabic-native** at every layer. Translation is
a commodity; Arabic-native cultural legitimacy is the moat that compounds.

---

## 🎯 Highest-leverage Track A insight (single-line takeaway)

> **Trust + Execution = Alimni's combined moat. DLAI has trust; Replit has
> execution. Alimni should be the only one with both, *in Arabic*.**

This is the strongest single positioning insight from the whole study. Every V1
decision should be evaluated against: "does this strengthen trust, strengthen
execution, or both?"

---

## Track A → Track B handoff

What changes once Hervé does the hands-on (signup, build, lurk, screenshot):

- Section 2 (Activation): real stopwatch numbers replace estimates
- Section 3 (Retention): real day 1/3/7/30 nudges captured from inbox
- Section 5 (Community): real lurking sentiment, not aggregated reviews
- Section 8 (Weaknesses): user-paraphrased complaints become verbatim Reddit quotes
- Section 11 (Final synthesis): "Why do users emotionally return" written from real usage

Schedule: 1.5h/week founder budget over W1-W6 of V1 timeline. Per
`research/README.md` schedule table above.
