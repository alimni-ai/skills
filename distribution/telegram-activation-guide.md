# Telegram Channel `@alimni_ar` — Activation Guide — V1 Gate #8

> Resume queue gate #8 — Hervé hands-on (~10-15 min).
> Goal: activate broadcast channel `@alimni_ar` with description AR + 2-3
> seed posts + welcome pin, ready to receive subscribers from launch posts.

## Pourquoi maintenant

Tes 6 channels primary distribution incluent Telegram broadcast. Si LinkedIn AR
post link `https://t.me/alimni_ar` → channel mort = link broken = trust killer.
Channel must be alive AVANT publish posts.

## Setup minimal — 5 étapes

### 1. Créer le channel (si pas déjà fait au gate #1.4)

Open Telegram (mobile or web) :
- Menu (☰) → **New Channel**
- Choisis **Public Channel** (vs Private)
- Channel name : `Alimni AI · علّمني`
- Public link : `t.me/alimni_ar`
- Description :
  ```
  علّمني الذكاء الاصطناعي بالعربية — منظومة تنفيذ للأدوات الوكيلة الحديثة.

  Teach me AI in Arabic — agentic execution academy.

  🌐 alimni-ai.com
  💻 github.com/alimni-ai/skills
  ```

### 2. Channel photo (logo)

Upload logo `علّمني` Arabic-script master logo (depuis ton brand assets).
Taille : 512×512 px minimum, format PNG transparent.

### 3. Channel settings importants

Settings → Channel info :
- **Sign messages** : ON (tes posts apparaissent comme "علّمني via Hervé Davies Paul")
- **Reactions** : Allow tous emojis
- **Auto-delete messages** : OFF
- **Restrictions** : aucune (free public access)

### 4. 3 seed posts avant invitation publique

**Post 1 — Welcome (à pin après publish)** :
```
علّمني الذكاء الاصطناعي 🚀

هذه قناة broadcast لـ علّمني AI — منظومة عربية لتعلم وبناء الأدوات الوكيلة الحديثة.

ما ستجد هنا:
🌿 إعلانات إصدار المهارات الجديدة
📊 ملاحظات الأسبوع (build notes)
🎯 طلبات المجتمع للأدوات القادمة

🌐 alimni-ai.com
💻 github.com/alimni-ai/skills

اضغط 👁 ليصبح الإشعار صامتا، أو 🔔 لاستقبال كل تحديث.
```

→ Après publish, click "..." → **Pin**.

**Post 2 — أول مهارة** :
```
🌿 أول مهارة جاهزة: setup-agentic-ar

تثبيت Claude Code وCodex بالعربية. ٣٠ دقيقة من "لا شيء" إلى رابط منشور باسمك.

```bash
npm install -g @anthropic-ai/claude-code
```

📚 المهارة كاملة:
github.com/alimni-ai/skills/tree/main/skills/setup-agentic-ar
```

**Post 3 — AI Tools Tracker** :
```
🧩 مسار 3 مستويات لكل أداة:

١. صفحة Trend عربية
٢. دليل عربي تفصيلي
٣. مختبر تنفيذي (artifact)

ابدأ من: alimni-ai.com/tools

5 أدوات مغطاة حاليا:
• Claude Code (جاهز الآن)
• Codex (جاهز الآن)
• OpenClaw (قيد الإعداد)
• n8n (قيد الإعداد)
• MCP (قيد الإعداد)
```

### 5. Verification publique

Avant de partager le channel link :
- [ ] `https://t.me/alimni_ar` ouvre dans navigateur web (publique)
- [ ] Description visible
- [ ] Photo profil rendue
- [ ] 3 seed posts publiés
- [ ] Welcome post pinned (haut de la liste)
- [ ] Test d'un device autre que le tien (ami/famille) : tu peux **rejoindre comme subscriber** sans friction

## Acceptance criteria

- [ ] `t.me/alimni_ar` retourne 200 + page channel publique visible
- [ ] Logo + description AR + EN visible
- [ ] ≥1 post pinned (welcome)
- [ ] ≥3 seed posts visibles
- [ ] Tu testes en mode "incognito" ou autre device : channel rejoignable

## Si conflict de username `@alimni_ar`

Backup options :
- `@alimni_ai_ar` (suffix _ar pour Arabic)
- `@alimni_official`
- `@alimnidev`

→ Si fallback, **mettre à jour le link dans le build note** (`distribution/build-notes/2026-05-07-week-1-foundations.md` mentionne `@alimni_ar` dans Telegram pin section).

## Post-launch — première activité

Après les 6 channels publish (LinkedIn AR/ENG/FR + X AR/ENG + Telegram pin) :
- Le pin Telegram = ton seed post #1 ci-dessus
- À chaque nouveau LinkedIn post weekly : copier le résumé en AR (pas tout le texte) + lien GitHub vers le commit/release dans Telegram
- 1 pin = welcome ; 1 post/sem mini = build update

## Anti-pattern à éviter

- ❌ **Pas créer un Telegram GROUPE** (multi-way chat) — tu serais responsable de la modération MENA dev community = burn-out (per spec §10 V1 exclusion)
- ❌ Pas de sticker ou emoji-spam dans les posts
- ❌ Pas de cross-post automatique LinkedIn → Telegram (algo Telegram pénalise les copies plates)
- ❌ Pas de polling/voting features V1 (engagement debt)

---

**Last updated** : 2026-05-07 nuit
