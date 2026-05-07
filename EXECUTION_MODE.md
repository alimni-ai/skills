# Alimni AI — Execution Mode

> Mixed mode: subagent for deterministic code, inline for content/brand/voice, HITL gates at milestones.
> Locked from Plan v1 (2026-05-07) and approved by Hervé.
> Council Claude+Ines reframing 2026-05-07 nuit: positioning = "agentic execution in Arabic, **across tools**" (anti-lock-in), moat = **dynamic feedback loop** (not static curation+exec+community), V1 target = **3 MVE-complete + 2 MVE-partial** (not 5 uniform skills), audience expanded with **B2B targets** (MENA schools/bootcamps/freelancers) + **mobile-first/low-spec** consideration.

## Why mixed mode

Two failure modes were rejected:

- **Full subagent** → quality collapse on AR content, brand judgment, founder voice. Skills would feel translated. LinkedIn posts would trip Originality.ai detectors and get downranked by LinkedIn 360Brew (-45% engagement per 2026 measurements).
- **Full inline** → founder bandwidth collapse. The 5–8h/week budget cannot absorb mechanical code work + content + ops + distribution simultaneously over 12 weeks.

Mixed mode is the only configuration that respects both quality and bandwidth constraints.

## Wissam framework — Rollout 4 phases

The mapping below applies the canonical Wissam rollout framework:

- **Phase 1 — Deterministic** (no LLM): brand decisions, registrar purchases, handles. Pure human judgment.
- **Phase 2 — LLM-augmented**: well-specified code drafted by subagent, reviewed by CI + Hervé spot-check.
- **Phase 3 — HITL with eval gates**: skill content (founder voice + AR native review), distribution posts, milestone go/no-go gates.
- **Phase 4 — Autonomous agent**: not in V1. Reserved for V2 (auto-ingestion pipeline, MCP server).

## Task → mode mapping

| Task | Mode | Phase | Owner | Reason |
|---|---|---|---|---|
| 1 — Brand-lock + subdomain setup | 🧑 Inline | 1 | Hervé | Domain purchase, trademark scan, social handles, Caddy/CF setup — pure judgment + ops |
| 2 — Repo + CI + build script | 🤖 Subagent | 2 | Subagent (review by Hervé + CI) | TDD-friendly, no founder voice required |
| 3 — Skill #1 `setup-agentic-ar` | 🧑 Inline | 3 HITL | Hervé writes, native AR reviewer | Founder voice + AR content non-delegable |
| 4 — Landing + deploy | 🔀 Mixed | 2+3 | Subagent (Astro scaffolding) + Hervé (AR copy) | Code by subagent, copy by Hervé |
| 5 — Skill #2 `prompt-loop-ar` | 🧑 Inline | 3 HITL | Hervé + native AR reviewer | Same as Task 3 |
| 6 — Telemetry + Telegram + W6 gate | 🔀 Mixed | 2+3 HITL | Subagent (Express server + tests) + Hervé (deploy + W6 migration decision) | Code by subagent, gate decision by Hervé |
| 7 — Skill #3 flagship + conditional migration | 🔀 Mixed | 2+3 HITL | Hervé writes skill + builds product, subagent assists Caddy/DNS migration if triggered | Highest stakes — founder voice critical |
| 8 — Publish + push + Gate 2 | 🧑 Inline | 3 HITL | Hervé | Distribution = manual posts, founder voice |
| 9 — Skill #4 `repo-to-agent-ar` | 🧑 Inline | 3 HITL | Hervé + native AR reviewer | Founder examples (real TENERE/Kiosque sessions) |
| 10 — Skill #4 publish + outreach | 🧑 Inline | 3 HITL | Hervé | Personal DMs to creators, non-delegable |
| 11 — Skill #5 `n8n-mcp-pipeline-ar` | 🔀 Mixed | 2+3 HITL | Subagent (n8n + MCP scaffolding) + Hervé (AR content + pipeline test) | Infra by subagent, content by Hervé |
| 12 — V1 close + retrospective + Gate 3 | 🧑 Inline | 3 HITL | Hervé | Personal retrospective + gate approval |

**Aggregate distribution:**
- 🤖 Subagent: ~25% of total time (Tasks 2, 6, parts of 4, 7, 11)
- 🧑 Inline: ~70% of total time (Tasks 1, 3, 5, 7-content, 8, 9, 10, 11-content, 12)
- 🚦 HITL gates: ~5% (W4 + W6 activation snapshot + W8 + W12 + native AR reviews)

## HITL placements (canonical 4 — per Wissam workflow card)

| Placement | When | What |
|---|---|---|
| (a) Approval gate before irreversible action | Before each go/no-go gate (W4, W6 activation snapshot, W8, W12) and before public launch (W4 step 4.8, W12 step 12.6) | Hervé reviews + approves explicitly. Council consult Claude+Ines if conflicting signals. |
| (b) Confidence routing (LLM uncertainty) | Any subagent step that signals "unclear" or fails CI more than once | Escalate to Hervé immediately, do not retry blindly |
| (c) Checkpoint serialization | Weekly `git tag w<N>-<milestone>` | Built-in pause point — Hervé can resume from any tag if interrupted |
| (d) Timeout safety net | Skip-week protocol: any week >10h actual work logged | Following week is build note only, no skill work |

## Subagent rules of engagement

When dispatching a subagent for a code task:

1. **Brief the subagent with the full plan section + spec sections it depends on.** No assumed context.
2. **TDD non-negotiable:** failing test first, then implementation, then passing test, then commit. No exceptions.
3. **No social media access.** Subagents cannot post on LinkedIn / X / Telegram / TikTok / IG / etc. Hervé manual only for all public-facing voice.
4. **No domain or DNS changes** without Hervé approval.
5. **No AR content writing.** Subagents may scaffold skill directories, but skill body content is always written by Hervé.
6. **Smoke gate before any deploy** (per memory `feedback_no_blind_push_to_public_site.md` — non-negotiable for `alimni-ai.com` and any *.tenereonline.com host touched): headless chromium 6 gates.
7. **Pin SemVer exact** for any third-party dependency (per Wissam anti-pattern: never `latest` or `npx -y` for MCP packages — Q1-2026 supply chain wave).

## Inline rules of engagement

When working inline with Hervé:

1. **Wissam-first checkpoint** at every turn (per memory `feedback_wissam_first_rule.md`).
2. **Council mode default** for substantive decisions (Claude + Ines + Wissam).
3. **No AI-rewrite of founder voice**: LinkedIn AR/ENG/FR variants, X threads, build notes are written by Hervé manually. AI assists research/outline only.
4. **AR native review mandatory** before any skill publish.
5. **Skip-week protocol respected** — escalate to Hervé immediately if a week exceeds 10h.

## W6 activation snapshot (informational only)

Single-track hosting (spec §9 revised 2026-05-07) means there is no domain-migration decision baked into the plan. The W6 checkpoint at Step 6.11 of Task 6 is now an honest activation-signal snapshot (completions / stars / subs / feedback / skip-weeks used) — it shapes Task 7's effort budget, not domain plumbing. See plan Step 6.11.

## When to update this file

- A task changes mode (e.g., a content task becomes subagent-friendly because we built a content scaffolding helper)
- A new HITL gate is added
- The skip-week protocol is invoked (log the date in a "skip-week ledger" appendix)
- V2 planning starts (this file becomes obsolete or migrates to a V2 version)

---

**Last reviewed:** 2026-05-07 (initial creation, Plan v1 commit `<unified>`)
