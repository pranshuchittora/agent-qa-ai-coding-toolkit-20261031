import { Link, useParams } from 'react-router-dom'
import { tools, categoryMeta } from '../data/tools'
import Code from '../components/Code'
import NotFound from './NotFound'

export default function ToolDetail() {
  const { slug } = useParams()
  const tool = tools.find((t) => t.slug === slug)

  if (!tool) return <NotFound />

  const cat = categoryMeta[tool.category]
  const china =
    tool.china === 'excellent'
      ? { label: '国内直连', cls: 'bg-emerald-50 text-emerald-700' }
      : tool.china === 'ok'
        ? { label: '国内访问需代理', cls: 'bg-amber-50 text-amber-700' }
        : { label: '需国际支付 + 代理', cls: 'bg-rose-50 text-rose-700' }

  const specs = [
    { label: '厂商', value: tool.vendor },
    { label: '形态', value: `${cat.icon} ${cat.name}` },
    { label: '价格', value: tool.price },
    { label: '免费档', value: tool.freeTier },
  ]
  if (tool.sweBench) specs.push({ label: 'SWE-bench', value: tool.sweBench })
  if (tool.context) specs.push({ label: '上下文', value: tool.context })
  specs.push({ label: '模型', value: tool.model })

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 text-sm text-muted">
        <Link to="/tools" className="hover:text-brand">工具库</Link> / {tool.name}
      </div>

      <div className="flex flex-wrap items-center gap-3">
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

      <Section title="安装">
        <ol className="list-decimal space-y-2 pl-5">
          {tool.install.map((step, i) => (
            <li key={i} className="text-sm">
              <Code>{step}</Code>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="常用命令 / 使用">
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 font-bold text-emerald-700">优点</h2>
          <ul className="space-y-2">
            {tool.pros.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-emerald-600">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold text-rose-700">缺点 / 注意</h2>
          <ul className="space-y-2">
            {tool.cons.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-rose-600">✗</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-soft p-4 text-sm text-muted">
        价格与功能随版本变化较快，最新信息以官方文档为准。
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-bold">{title}</h2>
      {children}
    </section>
  )
}
