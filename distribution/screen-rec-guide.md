# Demo Screen-Rec Guide — V1 Gate #6

> Resume queue gate #6 — Hervé hands-on (~15-30 min including retakes).
> Goal: 30-60s screen-rec montrant `claude plugin install` + first prompt
> + deployed URL apparaît. **No face, no voice clone, just terminal capture.**

## Pourquoi cette demo

C'est l'unique evidence concrète tangible que la promesse "trend-to-execution"
n'est pas vide : un visiteur landing voit le proof-block C1 (mock terminal),
mais une **vraie capture vidéo** d'un install qui marche = trust signal 10x
supérieur. Sahil Lavingia + Replit + DeepLearning.AI tous shippent ce type
de demo terminal pour leurs lancements skills.

## Outils recommandés (tu choisis)

| Outil | Plateforme | Coût | Preset 30s |
|---|---|---|---|
| **Tella** | macOS / web | Free tier OK | 1080p 30fps |
| **OBS Studio** | macOS / Linux / Windows | Free | scene "Display Capture" |
| **QuickTime** | macOS native | Free | File → New Screen Recording |
| **Asciinema + svg-term-cli** | Terminal pure | Free | Si tu veux versionner en SVG (Remotion-style, Wissam ref) |

**Reco** : Tella si tu connais ; sinon QuickTime (macOS) ou OBS (Linux).

## Script — exactement quoi capturer (30-60s)

### Frame 1 — Setup (3s)
- Terminal vide, prompt visible, dossier `mkdir my-first-arabic-page && cd my-first-arabic-page`
- Title bar : `~/my-first-arabic-page`

### Frame 2 — Install Claude Code (5s)
```bash
npm install -g @anthropic-ai/claude-code
```
- Capture le succès `added 1 package`
- Run `claude --version` → montre `2.1.132 (Claude Code)`

### Frame 3 — Lancer Claude Code dans le dossier (3s)
```bash
claude
```
- Capture le prompt Claude qui apparaît, prêt à recevoir un prompt AR

### Frame 4 — Premier prompt AR (10-15s)
Tape (ou copie/colle) ce prompt :
```
أنشئ صفحة HTML واحدة بالعربية، اتجاه RTL، فيها عنوان "أولى صفحاتي بالذكاء الاصطناعي" + فقرة قصيرة. أضف README.md عربي.
```
- Capture la réponse Claude qui génère les fichiers
- Quand `index.html` + `README.md` sont créés, montre-les avec `ls`

### Frame 5 — Deploy (10s)
```bash
git init && git add . && git commit -m "أول صفحة عربية"
```
- Skip le push GitHub si trop long pour 60s (tu peux montrer juste `git log` au lieu)
- Show `git log --oneline` : 1 commit visible

### Frame 6 — Final shot (3-5s)
- Optionally: `cat README.md` pour montrer le contenu AR généré, OR
- Run `python3 -m http.server 8080` brief, switch to browser, AR page visible RTL
- Hold 2-3 sec sur la page rendue

### Frame 7 — Brand outro (2s)
- Texte overlay simple (pas obligatoire) : `علّمني · alimni-ai.com`

## Acceptance criteria (avant de garder la take)

- [ ] Durée totale **30-60s** (idéal 45s)
- [ ] Tout le terminal text est **lisible à 1080p** (font size assez grand, pas trop petit)
- [ ] AR text rendering correct dans le terminal (pas de boxes ou ?)
- [ ] **Aucune mention de fausses metrics** (Best Practices 100 etc — le vrai état)
- [ ] **Aucune voix off** (manuel only, ou silence)
- [ ] **Aucune face** (pas de webcam embed)
- [ ] **Pas de sensitive data** (no API keys exposed, no personal email visible)
- [ ] Format export : MP4 H.264, max 30 MB pour upload LinkedIn/X facile

## Post-production minimal (5 min)

- Trim le début/fin si silence > 2s
- Add 1-2 captions burned-in en AR si tu veux (optional) :
  - Frame 1 : `الخطوة ١ — تثبيت الأداة`
  - Frame 4 : `الخطوة ٢ — أوّل برومبت بالعربية`
  - Frame 5 : `الخطوة ٣ — حفظ الأثر`
- Pas d'intro/outro logo lourd — directness > production value

## Où uploader pour distribution

| Channel | Format | Notes |
|---|---|---|
| LinkedIn AR/ENG/FR posts | embed direct (pas de YouTube link) | LinkedIn préfère native video, +60% engagement vs YouTube embed |
| X thread AR + ENG | embed dans le 1er tweet | First-tweet impact = thread reach |
| Telegram channel pin | direct upload | Members voient en preview |
| YouTube Shorts | upload public | SEO + AEO discovery secondary |
| GitHub repo README | embed via image link to YouTube Short | Show-don't-tell on the canonical asset |

## Si la take échoue 3 fois

Soit le script est trop ambitieux pour 60s — coupe Frame 5 deploy, garde juste
Frame 1-4 (install + first prompt + ls show files). C'est OK pour V1.

**Critère de rentabilité** : 1 take "good enough" qui montre **install + AR prompt + AR output** suffit. Pas besoin de perfectionnisme cinéma.

---

**Last updated** : 2026-05-07 nuit (post council AR review pass)
