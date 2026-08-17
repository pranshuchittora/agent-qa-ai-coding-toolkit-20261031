import { useMemo, useState } from 'react'
import { tools, categoryMeta, type Tool, type ToolCategory } from '../data/tools'
import ToolCard from '../components/ToolCard'

const cats: (ToolCategory | 'all')[] = ['all', 'terminal', 'ide', 'plugin']

type SortKey = 'default' | 'swe' | 'price' | 'china'

const chinaRank: Record<Tool['china'], number> = { excellent: 0, ok: 1, blocked: 2 }

export default function Tools() {
  const [active, setActive] = useState<ToolCategory | 'all'>('all')
  const [kw, setKw] = useState('')
  const [sort, setSort] = useState<SortKey>('default')

  const list = useMemo(() => {
    let l = active === 'all' ? [...tools] : tools.filter((t) => t.category === active)
    const q = kw.trim().toLowerCase()
    if (q) {
      l = l.filter((t) =>
        [t.name, t.vendor, t.tagline, t.bestFor, t.model, categoryMeta[t.category].name]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    }
    if (sort === 'swe') {
      l = l.sort((a, b) => {
        const pa = a.sweBench ? parseFloat(a.sweBench) : -1
        const pb = b.sweBench ? parseFloat(b.sweBench) : -1
        return pb - pa
      })
    } else if (sort === 'china') {
      l = l.sort((a, b) => chinaRank[a.china] - chinaRank[b.china])
    } else if (sort === 'price') {
      l = l.sort((a, b) => (a.freeTier.includes('免费') ? -1 : 1) - (b.freeTier.includes('免费') ? -1 : 1))
    }
    return l
  }, [active, kw, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / 工具库</div>
      <h1 className="text-3xl font-extrabold">AI 编程工具库</h1>
      <p className="mt-2 max-w-3xl text-muted">
        2026 年市场已分化为三种形态:终端 Agent 做深度自治、AI 原生 IDE 做日常体验、IDE 插件做零迁移。
        先想清楚你要"补全"还是"自治"。
      </p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="搜索工具名 / 厂商 / 关键词…"
            className="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand/60 sm:w-64"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted outline-none transition focus:border-brand/60"
          >
            <option value="default">默认排序</option>
            <option value="swe">SWE-bench 高分优先</option>
            <option value="china">国内可用性优先</option>
            <option value="price">免费优先</option>
          </select>
        </div>
      </div>

      {active !== 'all' && (
        <p className="mt-4 rounded-xl bg-soft p-4 text-sm text-muted">
          {categoryMeta[active].icon} <b>{categoryMeta[active].name}</b>:
          {categoryMeta[active].desc}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-6 rounded-xl border border-line bg-soft p-8 text-center text-sm text-muted">
          没有匹配「{kw}」的工具,换个关键词试试。
        </div>
      )}

      <div className="mt-12 overflow-x-auto rounded-xl border border-line shadow-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="sticky top-16 z-10 border-b border-line bg-soft text-left">
              <th className="p-3">工具</th>
              <th className="p-3">形态</th>
              <th className="p-3">价格</th>
              <th className="p-3">SWE-bench</th>
              <th className="p-3">国内可用性</th>
              <th className="p-3">免费档</th>
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
                  {t.china === 'excellent' && <span className="font-medium text-good">国内直连</span>}
                  {t.china === 'ok' && <span className="font-medium text-warn">需代理</span>}
                  {t.china === 'blocked' && <span className="font-medium text-bad">受限</span>}
                </td>
                <td className="p-3 text-muted">{t.freeTier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
