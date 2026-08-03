import { useState } from 'react'
import { tools, categoryMeta, type ToolCategory } from '../data/tools'
import ToolCard from '../components/ToolCard'

const cats: (ToolCategory | 'all')[] = ['all', 'terminal', 'ide', 'plugin']

export default function Tools() {
  const [active, setActive] = useState<ToolCategory | 'all'>('all')
  const list = active === 'all' ? tools : tools.filter((t) => t.category === active)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / 工具库</div>
      <h1 className="text-3xl font-extrabold">AI 编程工具库</h1>
      <p className="mt-2 max-w-3xl text-muted">
        2026 年市场已分化为三种形态：终端 Agent 做深度自治、AI 原生 IDE 做日常体验、IDE 插件做零迁移。
        先想清楚你要"补全"还是"自治"。
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              active === c
                ? 'bg-brand text-white'
                : 'bg-soft text-muted hover:bg-brand-soft hover:text-brand'
            }`}
          >
            {c === 'all' ? '全部' : `${categoryMeta[c].icon} ${categoryMeta[c].name}`}
            <span className="ml-1 opacity-70">
              ({c === 'all' ? tools.length : tools.filter((t) => t.category === c).length})
            </span>
          </button>
        ))}
      </div>

      {active !== 'all' && (
        <p className="mt-4 rounded-xl bg-soft p-4 text-sm text-muted">
          {categoryMeta[active].icon} <b>{categoryMeta[active].name}</b>：
          {categoryMeta[active].desc}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>

      <div className="mt-12 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line bg-soft text-left">
              <th className="p-3">工具</th>
              <th className="p-3">形态</th>
              <th className="p-3">价格</th>
              <th className="p-3">SWE-bench</th>
              <th className="p-3">国内可用性</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-soft/60">
                <td className="p-3 font-medium">{t.name}</td>
                <td className="p-3 text-muted">{categoryMeta[t.category].name}</td>
                <td className="p-3 text-muted">{t.price}</td>
                <td className="p-3">{t.sweBench ?? '—'}</td>
                <td className="p-3">
                  {t.china === 'excellent' && <span className="text-emerald-600">国内直连</span>}
                  {t.china === 'ok' && <span className="text-amber-600">需代理</span>}
                  {t.china === 'blocked' && <span className="text-rose-600">受限</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
