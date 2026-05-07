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
| 1 | [Replit](replit/notes.md) | Strongest strategic signal — Jordanian founder, $9B, agentic coding pivot | 2-5h hands-on | 🟡 not started |
| 1 | [Scrimba](scrimba/notes.md) | Best educational UX inspiration; engagement ≠ pricing power proof | 2-5h hands-on | 🟡 not started |
| 1 | [Hugging Face](huggingface/notes.md) | Long-term ecosystem inspiration; distribution layer moat | 2-5h hands-on | 🟡 not started |
| 2 | [Maven](maven/notes.md) | Cohort monetization model; ~$30K/cohort benchmark | 30-60min web | 🟡 not started |
| 2 | [Nas.io](nasio/notes.md) | MENA community dynamics (founder MENA roots) | 30-60min web | 🟡 not started |
| 2 | [DeepLearning.AI](deeplearning-ai/notes.md) | Trust layer + frontier-lab partnerships | 30-60min web | 🟡 not started |

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
