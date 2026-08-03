import { Link } from 'react-router-dom'
import { categoryMeta, type Tool } from '../data/tools'

const chinaBadge: Record<Tool['china'], { label: string; cls: string }> = {
  excellent: { label: '国内直连', cls: 'bg-emerald-50 text-emerald-700' },
  ok: { label: '需代理/注意', cls: 'bg-amber-50 text-amber-700' },
  blocked: { label: '需国际支付+代理', cls: 'bg-rose-50 text-rose-700' },
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const cat = categoryMeta[tool.category]
  const china = chinaBadge[tool.china]
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-bold text-lg">{tool.name}</div>
          <div className="text-xs text-muted">{tool.vendor}</div>
        </div>
        <span className="shrink-0 rounded-full bg-soft px-2 py-0.5 text-xs font-medium text-muted">
          {cat.icon} {cat.name}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm text-muted">{tool.tagline}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-md bg-brand-soft px-2 py-0.5 font-medium text-brand">
          {tool.price}
        </span>
        <span className={`rounded-md px-2 py-0.5 font-medium ${china.cls}`}>{china.label}</span>
      </div>
      <div className="mt-3 text-xs font-medium text-brand opacity-0 transition group-hover:opacity-100">
        查看安装与使用 →
      </div>
    </Link>
  )
}
