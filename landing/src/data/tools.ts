// ──────────────────────────────────────────────────────────────────────────
// Alimni AI — AI tools tracker (trend-to-execution)
//
// Per memory feedback_alimni_no_brute_redirect.md : every tool publicly
// surfaced must have at minimum a Level 1 Trend Page with status. Sources
// (official EN/FR docs, third-party tutos) are credits, not the user journey.
//
// Maturity levels:
//   level 1 — Trend Page (this stub)
//   level 2 — Arabic Guide (install/config/commands/errors/glossary)
//   level 3 — Executable Lab (repo/skill/workflow/agent/artifact)
//
// Statuses (visible on cards):
//   'ready'     — جاهز الآن
//   'wip'       — قيد الإعداد
//   'requested' — مطلوب من المجتمع
//
// `ar_review: 'pending'` flag marks AR copy as Claude-drafted, awaiting
// Hervé native review before being treated as canonical.
// ──────────────────────────────────────────────────────────────────────────

export type ToolStatus = 'ready' | 'wip' | 'requested';
export type ToolLevel = 1 | 2 | 3;
export type ToolCategory = 'agent' | 'orchestration' | 'automation' | 'protocol';

export interface Tool {
  slug: string;
  name_ar: string;
  name_en: string;
  icon: string;
  status: ToolStatus;
  level: ToolLevel;
  category: ToolCategory;
  why_ar: string;
  audience_ar: string;
  build_ar: string;
  source_url: string;
  source_label: string;
  ar_review: 'pending' | 'approved';
}

export const categoryMeta: Record<ToolCategory, { ar: string; en: string }> = {
  agent: { ar: 'وكيل', en: 'Agent' },
  orchestration: { ar: 'تنسيق', en: 'Orchestration' },
  automation: { ar: 'أتمتة', en: 'Automation' },
  protocol: { ar: 'بروتوكول', en: 'Protocol' }
};

export const tools: Tool[] = [
  {
    slug: 'claude-code',
    name_ar: 'كلود كود · Claude Code',
    name_en: 'Claude Code',
    icon: '⚡',
    status: 'wip',
    level: 1,
    category: 'agent',
    why_ar:
      'Claude Code هو محرّر الذكاء الاصطناعي الوكيل من Anthropic. يعمل مباشرة في الطرفيّة، يفهم مستودعك البرمجي بالكامل، ويُنفِّذ مهامّ معقّدة بأمر واحد.',
    audience_ar:
      'للمطوّرين الذين يريدون مساعدًا حقيقيًّا داخل مشاريعهم — لا مجرّد دردشة منفصلة.',
    build_ar:
      'إصلاح الأخطاء، توليد ميزات جديدة، مراجعة الأكواد، أتمتة المهامّ المتكرّرة، وإطلاق وكلاء على مستودعاتك الحقيقيّة.',
    source_url: 'https://claude.com/claude-code',
    source_label: 'claude.com/claude-code',
    ar_review: 'pending'
  },
  {
    slug: 'codex',
    name_ar: 'Codex',
    name_en: 'Codex',
    icon: '🧠',
    status: 'wip',
    level: 1,
    category: 'agent',
    why_ar:
      'Codex هو محرّك OpenAI لتنفيذ المهامّ البرمجيّة عبر وكلاء ذكيّين. يكتب الأكواد، يُنفِّذها، ويُصلح أخطاءه بنفسه.',
    audience_ar:
      'للمطوّرين الذين يفضّلون نظام OpenAI، أو يريدون مقارنة المخرجات بين النماذج.',
    build_ar:
      'كتابة سكريبتات كاملة، إصلاح PRs، توليد الاختبارات، وتنفيذ سير عمل متعدّد الخطوات.',
    source_url: 'https://developers.openai.com/codex',
    source_label: 'developers.openai.com/codex',
    ar_review: 'pending'
  },
  {
    slug: 'openclaw',
    name_ar: 'OpenClaw',
    name_en: 'OpenClaw',
    icon: '🧬',
    status: 'wip',
    level: 1,
    category: 'orchestration',
    why_ar:
      'OpenClaw طبقة تنسيق بين عدّة نماذج ذكاء اصطناعي. يربط Claude مع Codex وغيرها لتشغيل سير عمل متعدّد النماذج. أداة جوهريّة في عصر "متعدّد المزوّدين".',
    audience_ar:
      'للمطوّرين والباحثين الذين يريدون دمج قوّة عدّة نماذج في سير عمل واحد، بدل الاعتماد على نموذج واحد.',
    build_ar:
      'وكلاء يستشيرون عدّة نماذج (dual-think)، أنظمة مراجعة متبادلة بين Claude وCodex، ومقارنات تلقائيّة للمخرجات.',
    source_url: 'https://github.com/openclaw',
    source_label: 'github.com/openclaw',
    ar_review: 'pending'
  },
  {
    slug: 'n8n',
    name_ar: 'n8n',
    name_en: 'n8n',
    icon: '🔗',
    status: 'wip',
    level: 1,
    category: 'automation',
    why_ar:
      'n8n منصّة مفتوحة المصدر لأتمتة سير العمل بين مئات التطبيقات. تدعم MCP والنماذج اللغويّة بشكل أصليّ منذ 2026، وأصبحت معيارًا في أتمتة الذكاء الاصطناعي.',
    audience_ar:
      'لكلّ من يريد ربط أدواته (Gmail، Slack، Notion، Sheets، إلخ) دون كتابة كود كثيف.',
    build_ar:
      'أتمتة الردود، خطوط معالجة المحتوى، مزامنة قواعد البيانات، ووكلاء ذكاء اصطناعي متّصلون بأدواتك اليوميّة.',
    source_url: 'https://n8n.io',
    source_label: 'n8n.io',
    ar_review: 'pending'
  },
  {
    slug: 'mcp',
    name_ar: 'MCP · بروتوكول السياق',
    name_en: 'Model Context Protocol',
    icon: '🔌',
    status: 'wip',
    level: 1,
    category: 'protocol',
    why_ar:
      'MCP بروتوكول 2025–2026 يُوحِّد طريقة ربط نماذج الذكاء الاصطناعي بأدواتك (ملفّات، APIs، قواعد بيانات). أصبح معيارًا تحت إشراف Linux Foundation منذ ديسمبر 2025.',
    audience_ar:
      'للمطوّرين الذين يبنون تطبيقات ذكاء اصطناعي تتجاوز "الدردشة فقط" — وكلاء يقرؤون ويكتبون ويتفاعلون.',
    build_ar:
      'وكلاء يقرؤون ملفّاتك، يستعلمون قواعد بياناتك، يتحدّثون مع APIs خاصّة بك، أو يتحكّمون بأدواتك المحلّيّة.',
    source_url: 'https://modelcontextprotocol.io',
    source_label: 'modelcontextprotocol.io',
    ar_review: 'pending'
  }
];

export const statusMeta: Record<ToolStatus, { ar: string; en: string }> = {
  ready: { ar: 'جاهز الآن', en: 'Ready now' },
  wip: { ar: 'قيد الإعداد', en: 'In preparation' },
  requested: { ar: 'مطلوب من المجتمع', en: 'Community-requested' }
};
