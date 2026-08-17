import { useMemo, useState } from 'react'
import {
  mcpServers,
  mcpCategoryMeta,
  mcpBestPractices,
  mcpStarterBundles,
  type McpCategory,
} from '../data/mcp'
import Code from '../components/Code'

const cats: (McpCategory | 'all')[] = ['all', 'core', 'data', 'web', 'cloud', 'productivity', 'design', 'reasoning']

export default function Mcp() {
  const [active, setActive] = useState<McpCategory | 'all'>('all')
  const [kw, setKw] = useState('')

  const list = useMemo(() => {
    let l = active === 'all' ? mcpServers : mcpServers.filter((m) => m.category === active)
    const q = kw.trim().toLowerCase()
    if (q) {
      l = l.filter((m) =>
        [m.name, m.vendor, m.oneLiner, mcpCategoryMeta[m.category].name].join(' ').toLowerCase().includes(q),
      )
    }
    return l
  }, [active, kw])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / MCP</div>
      <h1 className="text-3xl font-extrabold">MCP Server 推荐</h1>
      <p className="mt-2 max-w-3xl text-muted">
        MCP 是 2024 年底发布的开放协议,让 Claude Code、Cursor、Copilot 等 Agent 通过统一接口连数据库、
        浏览器、API。2026 年 SDK 月下载 9700 万,Server 已超 1 万个——但多数是垃圾,下面只列值得装的。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {mcpBestPractices.map((p) => (
          <div key={p.title} className="rounded-xl border border-warn/40 bg-warn-soft p-4">
            <div className="font-semibold text-warn">{p.title}</div>
            <p className="mt-1 text-sm text-warn/90">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">起步套件(先装这些)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {mcpStarterBundles.map((b) => (
            <div key={b.name} className="rounded-xl border border-line bg-soft p-4">
              <div className="font-semibold">{b.name}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {b.items.map((i) => (
                  <span key={i} className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium shadow-sm">
                    {i}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">{b.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">全部 Server 列表</h2>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
                {c === 'all' ? '全部' : `${mcpCategoryMeta[c].icon} ${mcpCategoryMeta[c].name}`}
                <span className="ml-1 opacity-70">
                  ({c === 'all' ? mcpServers.length : mcpServers.filter((m) => m.category === c).length})
                </span>
              </button>
            ))}
          </div>
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="搜索 server 名称 / 用途…"
            className="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand/60 lg:w-64"
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {list.map((m) => (
            <div key={m.name} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition hover:shadow-card-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold">{m.name}</div>
                <div className="flex shrink-0 gap-1.5 text-xs">
                  {m.stars && (
                    <span className="rounded-full bg-soft px-2 py-0.5 font-medium text-muted">
                      ⭐ {m.stars}
                    </span>
                  )}
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 font-medium text-brand">
                    {mcpCategoryMeta[m.category].name}
                  </span>
                </div>
              </div>
              <div className="mt-1 text-xs text-muted">{m.vendor}</div>
              <p className="mt-2 flex-1 text-sm text-muted">{m.oneLiner}</p>
              <div className="mt-3">
                <div className="text-xs font-semibold text-muted">安装</div>
                <Code>{m.install}</Code>
                {m.env && (
                  <div className="mt-1.5 text-xs text-muted">
                    需要环境变量:<code>{m.env}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-6 rounded-xl border border-line bg-soft p-8 text-center text-sm text-muted">
            没有匹配「{kw}」的 server,换个关键词试试。
          </div>
        )}
      </div>
    </div>
  )
}
