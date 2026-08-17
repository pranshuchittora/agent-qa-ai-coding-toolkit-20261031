import { Link, useParams } from 'react-router-dom'
import { tools, categoryMeta } from '../data/tools'
import { modelRelayConfigs, matchRelayId } from '../data/relays'
import Code from '../components/Code'
import NotFound from './NotFound'

const tocItems = [
  { id: 'overview', label: '概览' },
  { id: 'access', label: 'API 接入 / 中转' },
  { id: 'install', label: '安装' },
  { id: 'usage', label: '常用命令' },
  { id: 'pros-cons', label: '优缺点' },
  { id: 'related', label: '相关工具' },
]

export default function ToolDetail() {
  const { slug } = useParams()
  const tool = tools.find((t) => t.slug === slug)

  if (!tool) return <NotFound />

  const cat = categoryMeta[tool.category]
  const china =
    tool.china === 'excellent'
      ? { label: '国内直连', cls: 'bg-good-soft text-good' }
      : tool.china === 'ok'
        ? { label: '国内访问需代理', cls: 'bg-warn-soft text-warn' }
        : { label: '需国际支付 + 代理', cls: 'bg-bad-soft text-bad' }

  const specs = [
    { label: '厂商', value: tool.vendor },
    { label: '形态', value: `${cat.icon} ${cat.name}` },
    { label: '价格', value: tool.price },
    { label: '免费档', value: tool.freeTier },
  ]
  if (tool.sweBench) specs.push({ label: 'SWE-bench', value: tool.sweBench })
  if (tool.context) specs.push({ label: '上下文', value: tool.context })
  specs.push({ label: '模型', value: tool.model })

  const relayMeta = modelRelayConfigs.find((c) => c.id === matchRelayId(tool.model))
  const relay = relayMeta
    ? {
        ...relayMeta,
        byokHint:
          relayMeta.id === 'byok'
            ? '该工具支持自定义 Key,改 OPENAI_BASE_URL 即可接入任意 OpenAI 兼容中转。'
            : undefined,
      }
    : null

  const related = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">
        <Link to="/tools" className="hover:text-brand">工具库</Link> / {tool.name}
      </div>

      {/* 目录导航 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tocItems.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted transition hover:border-brand/50 hover:text-brand"
          >
            {t.label}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3" id="overview">
        <h1 className="text-3xl font-extrabold">{tool.name}</h1>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${china.cls}`}>
          {china.label}
        </span>
      </div>
      <p className="mt-2 text-lg text-muted">{tool.tagline}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {specs.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-soft p-3">
            <div className="text-xs text-muted">{s.label}</div>
            <div className="mt-1 text-sm font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <Section title="API 接入 / 中转" id="access">
        {relay ? (
          <div className="rounded-xl border border-line bg-soft p-4">
            <div className="flex items-center gap-2 font-bold">
              <span>{relay.icon}</span>
              {relay.label}
            </div>
            <p className="mt-2 text-sm text-muted">{relay.desc}</p>
            <div className="mt-3 space-y-1.5">
              {relay.envKeys.map((e) => (
                <div key={e.key} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                  <code className="rounded bg-brand-soft px-1.5 py-0.5 font-semibold text-brand">
                    {e.key}
                  </code>
                  <span className="text-muted">{e.value}</span>
                </div>
              ))}
            </div>
            {relay.byokHint && (
              <p className="mt-3 text-xs text-muted">👉 {relay.byokHint}</p>
            )}
            <Link
              to="/relays"
              className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
            >
              查看全部接口方式与中转对比 →
            </Link>
          </div>
        ) : (
          <p className="rounded-xl bg-soft p-4 text-sm text-muted">
            未匹配到固定接入模板,此工具一般支持自定义 Key / 中转,可查看{' '}
            <Link to="/relays" className="font-medium text-brand hover:underline">
              接入指南
            </Link>
            。
          </p>
        )}
      </Section>

      <Section title="安装" id="install">
        <ol className="list-decimal space-y-2 pl-5">
          {tool.install.map((step, i) => (
            <li key={i} className="text-sm">
              <Code>{step}</Code>
            </li>
          ))}
        </ol>
      </Section>

      <div className="mt-6 rounded-xl border border-warn/40 bg-warn-soft p-4">
        <div className="font-semibold text-warn">安装或使用遇到问题?</div>
        <p className="mt-1 text-sm text-warn/90">
          去{' '}
          <a
            href={`https://vvc3303.xyz/ai-fix-guide/${tool.troubleshoot ?? 'other'}/`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline"
          >
            AI 排错指南
          </a>{' '}
          {tool.troubleshoot
            ? `(${pillarNames[tool.troubleshoot] ?? '其他工具'}专栏)`
            : '搜索'}
          找对应报错教程,或直接搜索你的报错原文。
        </p>
      </div>

      <Section title="常用命令 / 使用" id="usage">
        <div className="space-y-3">
          {tool.usage.map((u, i) => (
            <Code key={i}>{u}</Code>
          ))}
        </div>
      </Section>

      <Section title="适合谁">
        <p className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm font-medium text-brand">
          {tool.bestFor}
        </p>
      </Section>

      <Section title="优缺点" id="pros-cons">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-bold text-good">优点</h3>
            <ul className="space-y-2">
              {tool.pros.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="text-good">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-bad">缺点 / 注意</h3>
            <ul className="space-y-2">
              {tool.cons.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="text-bad">✗</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section title={`同形态对比 · ${cat.name}`} id="related">
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                to={`/tools/${t.slug}`}
                className="group rounded-xl border border-line bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-card-lg"
              >
                <div className="font-bold">{t.name}</div>
                <div className="text-xs text-muted">{t.vendor}</div>
                <p className="mt-2 line-clamp-2 text-xs text-muted">{t.tagline}</p>
                <div className="mt-3 text-xs font-medium text-brand opacity-0 transition group-hover:opacity-100">
                  查看对比 →
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <div className="mt-10 rounded-xl bg-soft p-4 text-sm text-muted">
        价格与功能随版本变化较快,最新信息以官方文档为准。需要跨工具对比?回{' '}
        <Link to="/tools" className="font-medium text-brand hover:underline">工具库总览</Link>{' '}
        看对比表格。
      </div>
    </div>
  )
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="mb-3 font-bold">{title}</h2>
      {children}
    </section>
  )
}

const pillarNames: Record<string, string> = {
  ollama: 'Ollama',
  claude: 'Claude',
  ccswitch: 'CCSwitch',
  python: 'Python 环境',
  mcp: 'MCP 配置',
  codex: 'Codex',
  other: '其他工具',
}
