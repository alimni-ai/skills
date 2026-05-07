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
  /** Optional ETA hint shown next to the status badge (per Ines critique #7 :
   * signal "roadmap maîtrisée" instead of "catalog vide"). AR string for
   * RTL-natural rendering. Examples: "الأسبوع 2", "أوّل سبتمبر", "Q3 2026". */
  eta_label?: string;
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
    eta_label: 'الأسبوع ٢',
    why_ar:
      'للذي يبني: Claude Code وكيل برمجة من Anthropic يعمل من الطرفية. يقرأ مستودعك البرمجي، يقترح تعديلات، ويشتغل بأمر واحد. أنت تبقى من يقرر ويراجع.',
    audience_ar:
      'للمطورين الذين يريدون مساعدا داخل مشاريعهم الحقيقية — لا مجرد دردشة منفصلة.',
    build_ar:
      'إصلاح أخطاء، توليد ميزات، مراجعة كود، أتمتة مهام متكررة، وتشغيل وكلاء داخل مستودعاتك.',
    source_url: 'https://docs.claude.com/en/docs/claude-code',
    source_label: 'docs.claude.com/claude-code',
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
    eta_label: 'الأسبوع ٢',
    why_ar:
      'للذي يبني: Codex وكيل برمجي من OpenAI. يكتب كودا، يجربه، ويقترح إصلاحات — لكن المراجعة قبل الاعتماد تبقى لك.',
    audience_ar:
      'للمطورين الذين يفضلون نظام OpenAI، أو يريدون مقارنة المخرجات بين النماذج.',
    build_ar:
      'سكريبتات كاملة، إصلاح PRs، توليد اختبارات، وتنفيذ سير عمل متعدد الخطوات.',
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
    eta_label: 'الأسبوع ٤–٦',
    why_ar:
      'للذي يبني: OpenClaw طبقة تنسيق بين عدة نماذج ذكاء اصطناعي. يربط Claude مع Codex وغيرها لتشغيل سير عمل متعدد النماذج، بدل الاعتماد على نموذج واحد.',
    audience_ar:
      'للمطورين والباحثين الذين يريدون دمج عدة نماذج في سير عمل واحد، مع مراجعة متبادلة.',
    build_ar:
      'وكلاء يطلبون مراجعة ثانية من وكيل آخر، أنظمة مراجعة متبادلة بين Claude وCodex، ومقارنات تلقائية للمخرجات.',
    source_url: 'https://github.com/openclaw/openclaw',
    source_label: 'github.com/openclaw/openclaw',
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
    eta_label: 'الأسبوع ٨',
    why_ar:
      'للذي يبني: n8n منصة مفتوحة المصدر لأتمتة سير العمل بين مئات التطبيقات. تدعم MCP والنماذج اللغوية بشكل أصلي منذ 2026.',
    audience_ar:
      'لكل من يريد ربط أدواته (Gmail، Slack، Notion، Sheets، إلخ) دون كتابة كود كثيف.',
    build_ar:
      'أتمتة الردود، خطوط معالجة المحتوى، مزامنة قواعد بيانات، ووكلاء ذكاء اصطناعي متصلون بأدواتك.',
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
    eta_label: 'الأسبوع ٨',
    why_ar:
      'للذي يبني: MCP بروتوكول 2025–2026 يوحد طريقة ربط نماذج الذكاء الاصطناعي بأدواتك (ملفات، APIs، قواعد بيانات). أصبح معيارا تحت إشراف Linux Foundation منذ ديسمبر 2025.',
    audience_ar:
      'للمطورين الذين يبنون تطبيقات تتجاوز الدردشة — وكلاء يقرأون ويكتبون ويتفاعلون.',
    build_ar:
      'وكلاء يقرأون ملفاتك، يستعلمون قواعد بياناتك، يتحدثون مع APIs خاصة بك، أو يتحكمون بأدواتك المحلية.',
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
