# أوّل صفحة عربية بنيتُها بالذكاء الاصطناعي

> هذا starter-repo لمهارة `setup-agentic-ar` من Alimni AI.
> اقرأ `lab.md` في مهارة Alimni أوّلًا، ثمّ ارجع إلى هنا.

## ما يحتوي هذا المستودع

- `index.html` — قالب صفحة عربية RTL أساسيّة (للتعديل عبر Claude Code أو Codex)
- `lesson-1-output.md` — ملفّ ستملؤه أثناء التمرين (البرومبت الأصلي، الناتج، رابط النشر)
- `vercel.json` — إعداد جاهز للنشر على Vercel (يمكنك حذفه إذا اخترت Cloudflare Pages)
- `.gitignore` — تجاهل الملفّات المؤقّتة

## الاستخدام السريع

انسخ الأوامر كما هي:

### الخيار أ — استنساخ كامل (إن كان لديك إنترنت سريع)

```bash
git clone https://github.com/alimni-ai/skills.git
cd skills/skills/setup-agentic-ar/starter-repo

claude   # أو :  codex
```

### الخيار ب — sparse checkout (إنترنت محدود / موبايل)

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/alimni-ai/skills.git
cd skills
git sparse-checkout set skills/setup-agentic-ar/starter-repo
cd skills/setup-agentic-ar/starter-repo

claude   # أو :  codex
```

### الخيار ج — تنزيل ZIP فقط (بدون git)

نزل ZIP مباشرة من:
`https://github.com/alimni-ai/skills/archive/refs/heads/main.zip`

ثم فك الضغط وادخل إلى مجلد `skills-main/skills/setup-agentic-ar/starter-repo/`.

### بعد الاستنساخ

اتبع التعليمات الكاملة في `lab.md` داخل مهارة Alimni.

## بعد الإنهاء

تحقّق من الـ acceptance criteria في `lab.md`:

- [ ] صفحة index.html تظهر باللغة العربية بشكل صحيح (RTL، خطّ مقروء)
- [ ] رفعت الصفحة على Vercel أو Cloudflare Pages
- [ ] ملف lesson-1-output.md يحتوي البرومبت الأصلي + الناتج + الرابط الحيّ
- [ ] الرابط الحيّ يعمل من جهاز آخر (هاتفك مثلًا)

## الترخيص

Apache-2.0 — يمكنك استخدام هذا starter-repo بحرّيّة.

---

**جزء من**: [Alimni AI — منظومة تنفيذ للذكاء الاصطناعي بالعربية](https://alimni-ai.com)
