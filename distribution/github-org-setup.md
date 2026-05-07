# GitHub Org `alimni-ai` + Initial Push — Setup Guide

> Resume queue item **#1** (per `project_alimni_etat_2026-05-07_nuit.md`).
> Status: 🟡 awaiting Hervé hands-on (signup + billing).
> Claude has prepared the checklist + push script. Hervé executes.

**Why this is item #1**: 13 commits live in `/home/creed/alimni`, 0 remote. No remote = no public repo = LinkedIn/X build-notes can't link to install commands, mentor outreach has nowhere to point, AR review can't happen via PR comments. Unblocking this debloque #4 #3 #2 in cascade.

---

## ✅ Pre-flight (Claude verified 2026-05-07)

| Check | State |
|---|---|
| HEAD | `736b32c` (Amiri self-host + ladder copy) |
| Working tree | clean |
| Branch | `main` only |
| Tags | 0 (no tag pushed yet — that's fine) |
| README.md | ✅ AR-first, brand-aligned, install instructions |
| LICENSE | ✅ Apache 2.0 |
| Remote | ⏳ none — to add post-org-creation |

Re-verify before pushing if you want:
```bash
cd /home/creed/alimni
git log --oneline -1   # → 736b32c
git status -s          # → empty
git remote -v          # → empty (will populate after Step 2)
```

---

## Step 1 — Create GitHub organization `alimni-ai`

**Time**: ~5 min. **Where**: github.com (web UI, mobile or desktop).

### 1.a — Open org-creation flow

1. Sign in to GitHub with the account that should own the org.
2. Top-right avatar dropdown → **«Your organizations»** → **«New organization»** button (top-right).
3. (Direct URL: https://github.com/account/organizations/new)

### 1.b — Plan tier

Choose **Free plan** (sufficient for public repos with unlimited collaborators).
- Click «Create a free organization» → green button.

### 1.c — Org details

| Field | Value |
|---|---|
| Organization name | `alimni-ai` (must match — domain-aligned) |
| Contact email | `contact@tenereonline.com` (TENERE LLC corporate, per memory `feedback_tenere_corporate_email_rule.md`) |
| This organization belongs to | **«My personal account»** (not a business — this is a side-business under your personal name) |
| Verify you're not a robot | reCAPTCHA |

→ Click «Next».

### 1.d — Invite members

Skip for now. Click «Complete setup». You can add members later (V2 if Hervé recruits AR mentors as repo collaborators).

### 1.e — Verify email

GitHub sends a verification email to `contact@tenereonline.com` (forwards via CF Email Routing → Workspace mailbox). Click the link in the email to activate the org.

### 1.f — Acceptance for Step 1

- [ ] Org URL responds: https://github.com/alimni-ai (200, public profile)
- [ ] Email verified
- [ ] You see «alimni-ai» in your org switcher

---

## Step 2 — Create repository `skills` under the org

**Where**: org page (https://github.com/alimni-ai) → big green **«New»** button (or top-right + → New repository).

### 2.a — Repo settings

| Field | Value | Why |
|---|---|---|
| Owner | `alimni-ai` | dropdown — must select org, not personal |
| Repo name | `skills` | matches install commands (`github.com/alimni-ai/skills`) |
| Description | `Agentic execution skills in Arabic — Claude Code · Codex · OpenClaw · n8n · MCP. علّمني الذكاء الاصطناعي بالممارسة` | shown in search + on profile |
| Visibility | **Public** | required — this is the canonical install URL, must be reachable by anyone |
| Initialize with README | ❌ **OFF** | we have a README locally (Arabic-first), would conflict |
| Add .gitignore | ❌ **OFF** | we have one locally |
| Choose a license | ❌ **OFF** | we have Apache 2.0 locally |

→ Click «Create repository».

### 2.b — Acceptance for Step 2

- [ ] Repo exists empty: https://github.com/alimni-ai/skills (200, "this repo is empty" landing page)
- [ ] Visibility: Public
- [ ] No GitHub-side README/LICENSE/.gitignore (we'll push ours)

---

## Step 3 — Push the 13 local commits

Once Step 2 is done, in your terminal:

```bash
cd /home/creed/alimni

# Add the org repo as remote origin
git remote add origin git@github.com:alimni-ai/skills.git

# Verify
git remote -v
# Expected:
# origin  git@github.com:alimni-ai/skills.git (fetch)
# origin  git@github.com:alimni-ai/skills.git (push)

# Push main (with -u to track upstream)
git push -u origin main

# (No tags to push yet — git push --tags would no-op)
```

If you don't have SSH keys configured for GitHub, use HTTPS instead:
```bash
git remote add origin https://github.com/alimni-ai/skills.git
# then `git push -u origin main` will prompt for username + Personal Access Token
```

(Generate a PAT at https://github.com/settings/tokens — scope `repo` is sufficient.)

### 3.a — Acceptance for Step 3

- [ ] `git push` succeeds (13 commits sent, ~few MB depending on starter-repo size)
- [ ] https://github.com/alimni-ai/skills shows the repo with 13 commits, README rendered AR-first
- [ ] README banner shows brand correctly (`علّمني · Alimni AI`)
- [ ] Apache 2.0 badge appears on repo page

---

## Step 4 — Branch protection on `main`

**Where**: https://github.com/alimni-ai/skills/settings/branches

Click «Add branch ruleset» (or «Add classic branch protection rule» if simpler).

### 4.a — Recommended ruleset

| Field | Value |
|---|---|
| Ruleset name | `main protection` |
| Enforcement status | **Active** |
| Target branches | `main` (include default branch) |
| Restrict deletions | ✅ ON |
| Block force pushes | ✅ ON |
| Require linear history | ✅ ON (no merge commits, only rebase / squash) |
| Require a pull request before merging | 🟡 Optional V1 (you're solo founder; can enable later when AR reviewers join) |
| Require status checks | ⏸️ skip V1 (no CI yet — telemetry server CI scheduled for W6 per spec) |

→ Click «Create».

**Why**: protects against `git push --force` accidents and accidental branch deletion. PR-required and CI checks deferred to keep solo workflow fast for V1.

### 4.b — Acceptance for Step 4

- [ ] Ruleset shows «Active» on the Rulesets page
- [ ] You cannot force-push (try locally: `git push --force` → rejected by remote)

---

## Step 5 — Repo metadata polish (5 min)

### 5.a — Topics (right sidebar of repo page)

Click the gear icon next to «About» on the repo page, then «Topics»:
```
arabic-ai, agentic-coding, claude-code, codex, mcp, n8n, openclaw, skills, runnable-skills, alimni-ai, arabic-engineering, mena
```

### 5.b — Repo description (gear icon → «About»)

Same as Step 2.a description, plus link to website:
```
https://alimni-ai.com
```

### 5.c — Social preview (Settings → General → scroll to «Social preview»)

⏸️ Defer to W2 (we don't have a polished OG image yet — the landing has a placeholder).

### 5.d — Acceptance for Step 5

- [ ] Topics visible on repo page (right sidebar)
- [ ] About description shows + website link
- [ ] Repo profile renders cleanly when shared on LinkedIn/X (link unfurl test)

---

## Step 6 — Org profile README (optional but recommended, ~10 min)

Create a special repo `alimni-ai/.github` (note the dot prefix) with a `profile/README.md` to show on your org's main page (https://github.com/alimni-ai).

```bash
# In a temp dir
cd /tmp && git clone git@github.com:alimni-ai/.github.git alimni-org-profile 2>/dev/null || (mkdir alimni-org-profile && cd alimni-org-profile && git init && git checkout -b main)
cd alimni-org-profile
mkdir -p profile
cat > profile/README.md <<'EOF'
<div align="center">

# علّمني · Alimni AI

**Agentic execution in Arabic, across tools.**

تعلّم الذكاء الاصطناعي بالممارسة، لا بالمشاهدة فقط

[الموقع · Website](https://alimni-ai.com) · [قناة تيليجرام · Telegram](https://t.me/alimni_ar) · [LinkedIn](https://linkedin.com/company/alimni-ai)

</div>

## What is Alimni AI?

Alimni AI (علّمني — Arabic for «teach me») is the Arabic-first execution layer for agentic AI tools. We ship Arabic-language skills you install in Claude Code, Codex, OpenClaw, n8n, and MCP — not videos you watch.

Every skill comes with code, hands-on labs, and a runnable starter repo. Built for Arabic speakers across MENA + diaspora who are locked out of the agentic AI revolution because everything is in English.

## Repos

- **[skills](https://github.com/alimni-ai/skills)** — the canonical academy: 5 V1 skills, source-of-truth + Claude/Codex compiled artifacts.

## Audience

المغرب · الجزائر · تونس · مصر · الشام · الخليج · المغتربون

EOF
git add profile/README.md
git commit -m "init: org profile README — Alimni AI"
# Need to create the empty repo first via UI: https://github.com/organizations/alimni-ai/repositories/new → name `.github` → Public → empty
git remote add origin git@github.com:alimni-ai/.github.git  # if not already
git push -u origin main
```

Alternatively, simpler: create the `.github` repo via UI → init with README → edit `profile/README.md` directly in browser.

⏸️ This is **optional**. Skip if you want to defer to W2.

---

## ⏱ Total time budget

- Steps 1-3 (org + repo + push): ~10 min
- Step 4 (branch protection): ~3 min
- Step 5 (metadata): ~5 min
- Step 6 (org profile, optional): ~10 min

**Critical path** = Steps 1-3 (push the 13 commits, debloque tout).
**Polish** = Steps 4-6 can wait until evening or W2.

---

## When you're done — what changes for Claude

- Public repo URL: https://github.com/alimni-ai/skills (canonical install URL)
- Build note #1 (item #4) can finally **link to a real repo URL**
- Mentor outreach (item #3) has a credible asset to share
- AR review (item #2) can happen via GitHub PR comments
- LinkedIn AR/EN/FR posts (W1 distribution) become writable

→ Ping me with «pushed» when Step 3 is green and we move to **item #4 — build note #1 LinkedIn AR/EN/FR**, where I prepare the canonical source build note .md and you write the 3 manual variants in your founder voice (anti-Castmagic discipline).

---

**Last updated**: 2026-05-07 nuit (resume from `736b32c`)
