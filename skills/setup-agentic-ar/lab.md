# Lab — setup-agentic-ar

> **الهدف (Goal)**: في نهاية هذا المختبر، يكون لديك **GitHub repo** فيه صفحة عربية،
> و**رابط حيّ منشور** يمكنك مشاركته على واتساب / لينكدإن.
>
> **الزمن المقدّر (Estimated time)**: 30 دقيقة (mobile-friendly في الخطوات 1-2 فقط)
>
> **المتطلّبات**: terminal محلّي + حساب GitHub + حساب Vercel أو Cloudflare Pages.

---

## القاعدة الذهبية لعلّمني (Alimni golden rule)

> **لا تنتهي هذه المهارة بدون رابط منشور.**
> "أنهيت الدرس" ليست شهادة. **الرابط الحيّ هو الشهادة.**

هذا المختبر مصمَّم بحيث ينتج عنه أثر منشور تلقائيًا. اختبار `test.sh`
سيتحقّق من وجوده.

---

## قبل البدء — توقعات وسلامة

> **انتبه**: الوكلاء قد يقترحون أوامر تعدل ملفات أو تحذف. اقرأ كل أمر قبل
> الموافقة. الأداة ذكية لكن المراجعة تبقى عملك.

> **هل أنت على هاتف فقط؟** يمكنك قراءة هذا المختبر بالكامل من الهاتف،
> لكن التنفيذ يحتاج بيئة طرفية: حاسوب محلي، أو GitHub Codespaces، أو
> Gitpod، أو Replit (إن توفر). لا تثبيت محلي = لا أثر منشور = لا مهارة
> مكتملة.

## Setup (الإعداد) — 5 دقائق

### 1. تثبيت Claude Code

انسخ الأمر كما هو:

```bash
npm install -g @anthropic-ai/claude-code
```

التحقق:

```bash
claude --version
```

> إن لم يعمل: تأكد أن Node.js مثبت (`node --version` ≥ 20)، أو ارجع إلى
> [وثائق Anthropic الرسمية](https://docs.claude.com/en/docs/claude-code)
> للنسخة الحالية.

### 2. تثبيت Codex

انسخ الأمر كما هو:

```bash
npm install -g @openai/codex
```

أو على macOS:

```bash
brew install --cask codex
```

التحقق:

```bash
codex --version
```

> **ملاحظة**: لا تحتاج اشتراكين مدفوعين في الوقت ذاته. هدف هذه المهارة
> هو معرفة الأداتين معا. اختر واحدة للعمل اليومي بناء على المهارة #2.

### 3. تجهيز مجلد العمل

انسخ الأوامر كما هي:

```bash
mkdir my-first-arabic-page
cd my-first-arabic-page
git init
```

---

## Exercise (التمرين الأساسي) — 20 دقيقة

### الخطوة 1 — أوّل برومبت عربي

افتح Claude Code في المجلّد:

```bash
claude
```

أدخل البرومبت التالي **بالعربية**:

> أنشئ موقعًا بسيطًا من ملف HTML واحد، باللغة العربية، اتجاه RTL،
> يحتوي على:
> - عنوان: "أوّل صفحة عربية بنيتُها بالذكاء الاصطناعي"
> - فقرة قصيرة (٣ أسطر) تشرح الفكرة
> - Footer فيه اسمي والتاريخ
> أضف ملف README.md عربي يصف ما يفعله الموقع.
> أضف ملف `lesson-1-output.md` فيه: البرومبت الأصلي + ناتج الوكيل + رابط النشر النهائي (سأملؤه لاحقًا).

### الخطوة 2 — مراجعة الناتج (لا تنفّذ بعد)

اقرأ الكود المولّد:
- هل `<html lang="ar" dir="rtl">` موجود؟
- هل النصّ مفهوم لقارئ عربي؟
- هل META charset = UTF-8؟

إن وجدت خطأ: استخدم برومبت تصحيحي (مثال: "النصّ يظهر بالاتجاه الخاطئ، صحّح القالب").

### الخطوة 3 — التشغيل المحلّي

```bash
python3 -m http.server 8080   # أو أي خادم static بسيط
```

افتح `http://localhost:8080` وتأكّد أنّ النصّ يظهر بشكل صحيح من اليمين إلى اليسار.

### الخطوة 4 — دفع repo إلى GitHub

```bash
git add .
git commit -m "أوّل صفحة عربية بالذكاء الاصطناعي"

# أنشئ repo جديدًا على github.com (واجهة الويب)، ثمّ:
git branch -M main
git remote add origin git@github.com:<username>/my-first-arabic-page.git
git push -u origin main
```

### الخطوة 5 — النشر على Vercel أو Cloudflare Pages

**Vercel**:
1. اذهب إلى vercel.com → New Project
2. استورد repo
3. اضغط Deploy
4. ستحصل على رابط مثل: `my-first-arabic-page.vercel.app`

**Cloudflare Pages** (إن كان مفضّلًا):
1. dash.cloudflare.com → Workers & Pages → Create
2. Connect to Git → اختر repo
3. Deploy

### الخطوة 6 — تحديث lesson-1-output.md

افتح `lesson-1-output.md` وأضف الرابط الحيّ:

```markdown
## رابط النشر النهائي
https://my-first-arabic-page.vercel.app
```

ادفع التحديث:
```bash
git add lesson-1-output.md
git commit -m "إضافة رابط النشر"
git push
```

---

## Acceptance criteria (معايير القبول)

✅ المهارة مكتملة عندما يتحقّق الآتي **كلّه**:

- [ ] لديك `claude --version` و`codex --version` يعطيان رقم نسخة (ليس "command not found")
- [ ] لديك repo عام (أو خاص حسب رغبتك) على GitHub بإسم على الأقلّ commit واحد
- [ ] الـ repo يحتوي على `index.html` بـ `<html lang="ar" dir="rtl">`
- [ ] الـ repo يحتوي على `README.md` عربي
- [ ] الـ repo يحتوي على `lesson-1-output.md` فيه البرومبت + الناتج + **الرابط الحيّ**
- [ ] الرابط الحيّ يفتح صفحة عربية تظهر بشكل صحيح RTL
- [ ] أرسلتَ الرابط لشخصٍ واحد على الأقلّ (واتساب / لينكدإن / مجموعة علّمني)

> **القاعدة الذهبية الثانية**: المشاركة الاجتماعية ليست تجميلا — هي **جزء من المهارة**.
> الأثر غير المرئي = أثر غير منشور.

---

## Common errors and how to debug

| الخطأ | التشخيص | الحلّ |
|---|---|---|
| `claude: command not found` | الأداة غير في PATH | أعد فتح terminal أو أضف يدويًا `~/.local/bin` إلى PATH |
| النصّ يظهر معكوسًا في المتصفّح | `dir="rtl"` ناقص | أضفه إلى `<html>` |
| رموز غريبة بدلًا من العربية | UTF-8 مفقود | أضف `<meta charset="utf-8">` كأوّل عنصر في `<head>` |
| Vercel deploy فشل | لم يُعرَّف framework | اختَر "Other" أو "Static" في إعدادات Project |
| `git push` يطلب كلمة سرّ | لم تربط SSH key | اتبع: github.com/settings/keys |

---

## ما بعد المهارة — انتقالك للمهارة #2

بعد هذا الأثر المنشور، أنت جاهز لـ **prompt-loop-ar**: حلقة البرومبت
الاحترافيّة (`prompt → run → read → debug → re-prompt`).

ستتعلّم هناك كيف تعمل **داخل** المشروع الذي بنيته للتوّ، بدلًا من بنائه
من الصفر مرّة أخرى.
