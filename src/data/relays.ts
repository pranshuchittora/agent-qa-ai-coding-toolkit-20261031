// API 接入与中转配置数据
// 适用于国内访问 Claude / OpenAI / Gemini 等模型 API 需要中转的情况

export type RelayId = 'claude' | 'gpt' | 'gemini' | 'byok' | 'domestic'

export interface ModelRelayConfig {
  id: RelayId
  label: string
  icon: string
  desc: string
  when: string
  envKeys: { key: string; value: string }[]
  example: string[]
}

export const modelRelayConfigs: ModelRelayConfig[] = [
  {
    id: 'claude',
    label: 'Claude（Anthropic）',
    icon: '🌪',
    desc: 'Claude Code 依赖 Anthropic API。官方全球版国内需代理 + 国际支付，可用官方 API Key 或兼容的中转地址。',
    when: '工具跑 Claude 模型时（Claude Code 等）',
    envKeys: [
      { key: 'ANTHROPIC_BASE_URL', value: 'https://api.anthropic.com' },
      { key: 'ANTHROPIC_AUTH_TOKEN', value: '<你的 Claude API Key>' },
      { key: 'ANTHROPIC_MODEL', value: 'claude-sonnet-5' },
    ],
    example: [
      'export ANTHROPIC_BASE_URL=https://你的中转地址',
      'export ANTHROPIC_AUTH_TOKEN=sk-xxxxxx',
      'claude',
    ],
  },
  {
    id: 'gpt',
    label: 'OpenAI / Codex',
    icon: '🌀',
    desc: 'OpenAI Codex 走 OpenAI 兼容接口。多数终端 Agent（Aider、OpenCode、Cline 等）都能通过这套环境变量换到任意 OpenAI 兼容中转。',
    when: '工具用 GPT 系列或 OpenAI 兼容模型时',
    envKeys: [
      { key: 'OPENAI_BASE_URL', value: 'https://api.openai.com/v1' },
      { key: 'OPENAI_API_KEY', value: '<sk-...>' },
    ],
    example: [
      'export OPENAI_BASE_URL=https://你的中转地址/v1',
      'export OPENAI_API_KEY=sk-xxxxxx',
    ],
  },
  {
    id: 'gemini',
    label: 'Gemini（Google）',
    icon: '💎',
    desc: 'Gemini CLI 用 GEMINI_API_KEY 直连。官方国内需代理；BYOK 工具可通过 OpenAI 兼容层转发 Gemini 模型。',
    when: '工具用 Gemini 模型时（Gemini CLI 等）',
    envKeys: [
      { key: 'GEMINI_API_KEY', value: '<Gemini API Key>' },
      { key: 'GOOGLE_CLOUD_PROJECT', value: '' },
    ],
    example: ['export GEMINI_API_KEY=AIza-xxxx', 'gemini'],
  },
  {
    id: 'byok',
    label: '自带 Key / 多模型（BYOK）',
    icon: '🔑',
    desc: 'Aider、OpenCode、Cline 这类 BYOK 工具最灵活：改一个 BASE_URL 就能切换官方直连、国际聚合或你的中转，不受厂商绑定。',
    when: '工具支持自定义模型与 Key（Aider / OpenCode / Cline）',
    envKeys: [
      { key: 'OPENAI_BASE_URL', value: 'https://openrouter.ai/api/v1' },
      { key: 'OPENAI_API_KEY', value: '<聚合平台或中转 Key>' },
    ],
    example: [
      'export OPENAI_BASE_URL=https://openrouter.ai/api/v1',
      'export OPENAI_API_KEY=sk-or-xxxx',
      'aider --model openai/gpt-5.5',
    ],
  },
  {
    id: 'domestic',
    label: '国内模型（无需中转）',
    icon: '🀃',
    desc: '通义灵码、DeepSeek、Kimi 等国产模型国内直连即可，无需中转，价格便宜、无支付门槛，是低延迟首选。',
    when: '工具支持国内模型或本地推理',
    envKeys: [{ key: '环境变量', value: '见各厂商文档' }],
    example: ['# DeepSeek / 通义 / Moonshot 官方控制台取 Key 即可'],
  },
]

export interface RelayProvider {
  slug: string
  name: string
  tag: string
  desc: string
  pointsUrl?: string
  features: string[]
  risk: '官方' | '推荐' | '谨慎'
  note: string
}

export const relayProviders: RelayProvider[] = [
  {
    slug: 'official',
    name: '官方直连',
    tag: '最稳',
    desc: '直接在 Anthropic / OpenAI / Google 官方控制台开通 API Key。模型最全、最稳、售后最靠谱，只需代理与一张国际卡。',
    pointsUrl: 'https://platform.openai.com',
    features: ['模型与上下文最新', '官方 SLA 与文档', '账单规范'],
    risk: '官方',
    note: '国内访问需代理 + 国际支付；适合注册方便、愿意走官方的用户。',
  },
  {
    slug: 'openrouter',
    name: 'OpenRouter',
    tag: '国际聚合',
    desc: '一个 Key 就聚合各家模型，OpenAI 兼容格式，BYOK 工具改个 BASE_URL 即用，充值和调用都很成熟。',
    pointsUrl: 'https://openrouter.ai',
    features: ['单 Key 多模型', 'OpenAI 兼容', '按量计费省成本'],
    risk: '推荐',
    note: '平台在海外，连接时通常仍需代理；是国内爱好者常用的性价比聚合。',
  },
  {
    slug: 'self-host',
    name: '自建转发（Cloudflare Workers）',
    tag: '零成本自管',
    desc: '在 Cloudflare Workers 上套一层代理，把你的 API 请求转发到官方，自己唯一，无平台跑路风险，免费额度够个人用。',
    features: ['免费额度', '绑自己域名轻松加速', 'Key 不经过第三方'],
    risk: '推荐',
    note: '需要基础 Node/JS 能力；本质仍是转发到官方，你仍需官方 Key。',
  },
  {
    slug: 'third-party',
    name: '第三方中转平台',
    tag: '便捷但需甄别',
    desc: '市场上有大量按量售卖的第三方 API 中转站，价格低、国内直连，但良莠不齐。只建议选经营久、有真实口碑的。',
    features: ['国内直连方便', '价格便宜', '常见于贴吧/GitHub 圈'],
    risk: '谨慎',
    note: '注意资金与隐私风险：不建议往不知名平台充大额，或提交真实生产 Key。',
  },
]

export function matchRelayId(model: string): RelayId {
  const m = model.toLowerCase()
  if (m.includes('claude') || m.includes('anthropic')) return 'claude'
  if (m.includes('gemini')) return 'gemini'
  if (m.includes('qwen') || m.includes('deepseek') || m.includes('moonshot') || m.includes('kimi'))
    return 'domestic'
  if (m.includes('gpt') || m.includes('openai') || m.includes('codex') || m.includes('copilot'))
    return 'gpt'
  return 'byok'
}