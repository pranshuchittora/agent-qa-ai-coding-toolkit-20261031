import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { tools, categoryMeta } from '../data/tools'
import { skills, skillTypeMeta } from '../data/skills'
import { mcpServers, mcpCategoryMeta } from '../data/mcp'

type Item =
  | { kind: 'tool'; slug: string; title: string; sub: string; meta: string; url: string; score: number }
  | { kind: 'skill'; slug: string; title: string; sub: string; meta: string; url: string; score: number }
  | { kind: 'mcp'; slug: string; title: string; sub: string; meta: string; url: string; score: number }

function norm(s: string) {
  return s.toLowerCase()
}

function buildIndex(): Item[] {
  const items: Item[] = []
  for (const t of tools) {
    const hay = norm([t.name, t.vendor, t.tagline, t.bestFor, t.model, categoryMeta[t.category].name].join(' '))
    items.push({
      kind: 'tool',
      slug: t.slug,
      title: t.name,
      sub: t.tagline,
      meta: `${categoryMeta[t.category].icon} ${categoryMeta[t.category].name} · ${t.price}`,
      url: `/tools/${t.slug}`,
      score: hay.length,
    })
  }
  for (const s of skills) {
    const hay = norm([s.name, s.author, s.oneLiner, s.when].join(' '))
    items.push({
      kind: 'skill',
      slug: s.name,
      title: s.name,
      sub: s.oneLiner,
      meta: `${skillTypeMeta[s.type].icon} ${skillTypeMeta[s.type].name} · ${s.author}`,
      url: '/skills',
      score: hay.length,
    })
  }
  for (const m of mcpServers) {
    const hay = norm([m.name, m.vendor, m.oneLiner, mcpCategoryMeta[m.category].name].join(' '))
    items.push({
      kind: 'mcp',
      slug: m.name,
      title: m.name,
      sub: m.oneLiner,
      meta: `${mcpCategoryMeta[m.category].icon} ${mcpCategoryMeta[m.category].name} · ${m.vendor}`,
      url: '/mcp',
      score: hay.length,
    })
  }
  return items
}

const kindLabel: Record<Item['kind'], string> = {
  tool: '工具',
  skill: 'Skill',
  mcp: 'MCP Server',
}

const kindCls: Record<Item['kind'], string> = {
  tool: 'bg-brand-soft text-brand',
  skill: 'bg-accent-soft text-accent',
  mcp: 'bg-good-soft text-good',
}

const index = buildIndex()

export default function Search() {
  const [params] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [q, setQ] = useState(initial)

  const results = useMemo(() => {
    const kw = q.trim()
    if (!kw) return null
    const needle = norm(kw)
    const tokens = needle.split(/\s+/).filter(Boolean)
    const scored = index
      .map((it) => {
        const hay = norm([it.title, it.sub, it.meta].join(' '))
        const matches = tokens.filter((tk) => hay.includes(tk)).length
        const titleHit = tokens.some((tk) => norm(it.title).includes(tk))
        return { ...it, score: matches * 10 + (titleHit ? 5 : 0) }
      })
      .filter((it) => it.score > 0)
      .sort((a, b) => b.score - a.score)
    return scored.slice(0, 30)
  }, [q])

  const group = (kind: Item['kind']) => results?.filter((r) => r.kind === kind) ?? []

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / 搜索</div>
      <h1 className="text-3xl font-extrabold">全站搜索</h1>
      <p className="mt-2 max-w-3xl text-muted">
        搜工具、Skills、MCP Server:支持中文、英文与关键词组合,如"Claude Code""Playwright""国内直连"。
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-surface p-2 shadow-card focus-within:border-brand/50"
      >
        <svg className="ml-2 shrink-0 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入关键词…"
          autoFocus
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
        />
        {q && (
          <button type="button" onClick={() => setQ('')} className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted transition hover:bg-soft hover:text-ink">
            清空
          </button>
        )}
      </form>

      {q.trim() === '' && (
        <div className="mt-10 rounded-xl border border-line bg-soft p-6 text-sm text-muted">
          试试搜索:<span className="font-medium text-brand">Claude Code</span>、
          <span className="font-medium text-brand">Context7</span>、
          <span className="font-medium text-brand">国内直连</span>、
          <span className="font-medium text-brand">Playwright</span>、<span className="font-medium text-brand">Memory</span>
        </div>
      )}

      {results === null ? null : results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-line bg-soft p-8 text-center">
          <div className="text-3xl">🔍</div>
          <p className="mt-3 font-semibold">没有找到与「{q}」相关的内容</p>
          <p className="mt-1 text-sm text-muted">
            换个关键词试试;或去{' '}
            <a href="https://vvc3303.xyz/ai-fix-guide/" target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">
              AI 排错指南
            </a>{' '}
            搜报错原文。
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          <p className="text-sm text-muted">共 {results.length} 条结果</p>

          {(['tool', 'skill', 'mcp'] as Item['kind'][]).map((kind) => {
            const list = group(kind)
            if (list.length === 0) return null
            return (
              <div key={kind}>
                <h2 className="mb-3 flex items-center gap-2 font-bold">
                  {kindLabel[kind]}
                  <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-medium text-muted">{list.length}</span>
                </h2>
                <div className="space-y-3">
                  {list.map((it) => (
                    <Link
                      key={`${it.kind}-${it.slug}`}
                      to={it.url}
                      className="block rounded-xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-card-lg"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${kindCls[it.kind]}`}>
                          {kindLabel[it.kind]}
                        </span>
                        <span className="font-bold">{it.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted">{it.sub}</p>
                      <div className="mt-2 text-xs text-muted">{it.meta}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
