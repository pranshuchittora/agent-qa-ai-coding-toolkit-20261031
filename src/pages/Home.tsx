import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tools } from '../data/tools'
import { skills } from '../data/skills'
import { mcpServers, mcpCategoryMeta } from '../data/mcp'
import ToolCard from '../components/ToolCard'

const sections = [
  {
    to: '/tools',
    icon: '🧰',
    title: '工具库',
    desc: '主流 AI 编程工具的安装、配置、使用与优缺点,按终端 Agent / AI 原生 IDE / IDE 插件分三类。',
  },
  {
    to: '/skills',
    icon: '⚙️',
    title: 'Agent Skills',
    desc: '必装 skills:能力扩展与编码偏好两类,附安装命令。同文件跨 40+ 工具通用。',
  },
  {
    to: '/mcp',
    icon: '🔌',
    title: 'MCP Servers',
    desc: '热门 MCP 分七类整理 + 起步套件,附安装命令与"别装超过 7 个"的安全铁律。',
  },
]

const stats = [
  { value: `${tools.length}`, label: '款工具收录', sub: '终端 Agent / IDE / 插件' },
  { value: `${skills.length}`, label: '个精选 Skills', sub: '能力扩展 + 编码偏好' },
  { value: `${mcpServers.length}`, label: '个 MCP Server', sub: '七大类值得装的' },
  { value: '40+', label: '工具兼容 Skills', sub: '同一文件通用' },
]

const faqs = [
  {
    q: '这些工具信息多久更新一次?',
    a: '内容基于 2026 年 7-8 月的公开资料、SWE-bench 榜单与社区反馈整理。AI 工具迭代极快,价格与能力请以官方为准,本站会持续修订。',
  },
  {
    q: '为什么 MCP 别装超过 5–7 个?',
    a: '每个 server 都吃上下文并拖慢 Agent,超过 7 个会明显变慢变笨。MCP 是"菜单"不是"购物车",先装起步套件里的 5 个就够覆盖 90% 场景。',
  },
  {
    q: '国内用户怎么选最省心?',
    a: '不想折腾代理:Trae + 通义灵码 + DeepSeek 系,国内直连零门槛;想要最强能力:Claude Code / Cursor + 中转接入,详见「中转接入」页的对比。',
  },
  {
    q: '安装或使用报错去哪查?',
    a: '每个工具详情页都挂了对应排错专栏,也可以直接去 AI 排错指南(ai-fix-guide)搜报错原文,或把报错复制来咨询。',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  const hotMcp = mcpServers.filter((m) => m.category === 'core').slice(0, 4)

  return (
    <div>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-mesh absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <span className="animate-fade-up inline-block rounded-full border border-brand/30 bg-surface px-4 py-1.5 text-sm font-medium text-brand shadow-sm">
            ✦ 2026 年最新 · 基于真实调研
          </span>
          <h1 className="animate-fade-up mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl" style={{ animationDelay: '0.06s' }}>
            热门 AI 编程工具的
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              安装使用一本通
            </span>
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-muted" style={{ animationDelay: '0.12s' }}>
            从终端 Agent 到 AI 原生 IDE,从 Skills 到 MCP——选型、安装、配置一次讲清,
            以及该给你的 Agent 装什么扩展。
          </p>

          <form
            onSubmit={submit}
            className="animate-fade-up mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-line bg-surface p-2 shadow-card-lg"
            style={{ animationDelay: '0.18s' }}
          >
            <svg className="ml-2 shrink-0 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜工具 / Skills / MCP,如:Claude Code、Playwright、Context7"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
            />
            <button type="submit" className="shrink-0 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90">
              搜索
            </button>
          </form>

          <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '0.24s' }}>
            <Link to="/tools" className="rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand/90">
              开始选工具 →
            </Link>
            <Link to="/mcp" className="rounded-xl border border-line bg-surface px-6 py-3 font-semibold text-ink transition hover:border-brand/50">
              看 MCP 推荐
            </Link>
          </div>

          {/* 数据统计条 */}
          <div className="animate-fade-up mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: '0.3s' }}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-surface/80 p-4 backdrop-blur">
                <div className="bg-gradient-to-r from-brand to-accent bg-clip-text text-2xl font-extrabold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-muted">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 三大板块 ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">三大板块</h2>
            <p className="mt-1 text-sm text-muted">选型、扩展、连接,一站配齐你的 AI 编程工作流</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-card-lg"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand/10 to-accent/10 transition group-hover:scale-125" />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-2xl shadow-sm">
                  {s.icon}
                </span>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium text-muted">
                    {s.to === '/tools' ? `${tools.length} 款` : s.to === '/skills' ? `${skills.length} 个` : `${mcpServers.length} 个`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
                <div className="mt-4 text-sm font-medium text-brand transition group-hover:translate-x-0.5">
                  去看看 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 工具速览 ============ */}
      <section className="border-t border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">工具速览</h2>
              <p className="mt-1 text-sm text-muted">先看关键词,点进详情拿安装与使用命令</p>
            </div>
            <Link to="/tools" className="text-sm font-medium text-brand hover:underline">
              全部 {tools.length} 款 →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 6).map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 热门 MCP ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">热门 MCP 起步</h2>
            <p className="mt-1 text-sm text-muted">核心必备类,先装这几个就覆盖 90% 场景</p>
          </div>
          <Link to="/mcp" className="text-sm font-medium text-brand hover:underline">
            全部 {mcpServers.length} 个 →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {hotMcp.map((m) => (
            <div key={m.name} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition hover:shadow-card-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold">{m.name}</div>
                <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                  {mcpCategoryMeta[m.category].name}
                </span>
              </div>
              <div className="mt-1 text-xs text-muted">{m.vendor}</div>
              <p className="mt-2 flex-1 text-sm text-muted">{m.oneLiner}</p>
              <code className="mt-3 block truncate rounded-md bg-soft px-2 py-1 text-xs text-muted" title={m.install}>
                {m.install}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 怎么选 ============ */}
      <section id="how" className="border-t border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">怎么选</h2>
          <p className="mt-1 text-sm text-muted">先想清楚你要"补全"还是"自治",再按场景对号入座</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: '⌨️',
                title: '要深度自治',
                body: '复杂重构、跑命令验证、整库推理 → 终端 Agent(Claude Code / Codex / Gemini CLI)',
                tag: '深度任务',
              },
              {
                icon: '🖥️',
                title: '要日常体验',
                body: '补全、多文件编辑、内联 diff → AI 原生 IDE(Cursor / Devin Desktop / Trae)',
                tag: '日常编辑',
              },
              {
                icon: '🧩',
                title: '要零迁移',
                body: '不换编辑器、企业合规、生态优先 → 插件(Copilot / Cline / 通义灵码)',
                tag: '插件方案',
              },
            ].map((c) => (
              <div key={c.title} className="group rounded-xl border border-line bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand/40">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{c.tag}</span>
                </div>
                <h3 className="mt-3 font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm text-brand">
            高频组合:Cursor(日常编辑)+ Claude Code(深度任务),一套 $40/月覆盖大多数场景。
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold">常见问题</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line bg-surface p-5 shadow-card transition open:border-brand/40">
              <summary className="flex items-center justify-between gap-3 font-semibold">
                {f.q}
                <span className="shrink-0 text-muted transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ 跨站 CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-accent p-8 text-white sm:p-10">
          <div className="bg-grid absolute inset-0 opacity-20" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">安装或使用报错?</h2>
              <p className="mt-2 max-w-md text-sm text-white/85">
                去「AI 排错指南」按报错原文找答案:Claude Code、CCSwitch、Ollama、Python 环境、
                MCP 配置……全是真实踩坑整理的实战教程。
              </p>
            </div>
            <a
              href="https://vvc3303.xyz/ai-fix-guide/"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-brand shadow-lg transition hover:bg-white/90"
            >
              去排错指南 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
