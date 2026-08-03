import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { skills } from '../data/skills'
import { mcpServers } from '../data/mcp'
import ToolCard from '../components/ToolCard'

const sections = [
  {
    to: '/tools',
    icon: '🧰',
    title: '工具库',
    desc: '11 款主流 AI 编程工具的安装、配置、使用与优缺点，按终端 Agent / AI 原生 IDE / IDE 插件分三类。',
    stat: `${tools.length} 款工具`,
  },
  {
    to: '/skills',
    icon: '⚙️',
    title: 'Agent Skills',
    desc: '精选 16 个必装 skills：能力扩展与编码偏好两类，附安装命令。同文件跨 40+ 工具通用。',
    stat: `${skills.length} 个精选`,
  },
  {
    to: '/mcp',
    icon: '🔌',
    title: 'MCP Servers',
    desc: 'Top 热门 MCP 分七类整理 + 起步套件，附安装命令与"别装超过 7 个"的安全铁律。',
    stat: `${mcpServers.length} 个 Server`,
  },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-soft to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand shadow-sm">
            2026 年最新 · 基于真实调研
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            热门 AI 编程工具的
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              安装使用一本通
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            从终端 Agent 到 AI 原生 IDE，从 Skills 到 MCP——选型、安装、配置一次讲清，
            以及该给你的 Agent 装什么扩展。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/tools"
              className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90"
            >
              开始选工具 →
            </Link>
            <Link
              to="/mcp"
              className="rounded-xl border border-line bg-white px-6 py-3 font-semibold text-ink transition hover:border-brand/50"
            >
              看 MCP 推荐
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">三大板块</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xs font-medium text-muted">{s.stat}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
              <div className="mt-4 text-sm font-medium text-brand">去看看 →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">工具速览</h2>
            <Link to="/tools" className="text-sm font-medium text-brand hover:underline">
              全部 11 款 →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 6).map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">怎么选</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: '⌨️',
              title: '要深度自治',
              body: '复杂重构、跑命令验证、整库推理 → 终端 Agent（Claude Code / Codex / Gemini CLI）',
            },
            {
              icon: '🖥️',
              title: '要日常体验',
              body: '补全、多文件编辑、内联 diff → AI 原生 IDE（Cursor / Devin Desktop / Trae）',
            },
            {
              icon: '🧩',
              title: '要零迁移',
              body: '不换编辑器、企业合规、生态优先 → 插件（Copilot / Cline / 通义灵码）',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-line bg-white p-6">
              <span className="text-2xl">{c.icon}</span>
              <h3 className="mt-3 font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm text-brand">
          高频组合：Cursor（日常编辑）+ Claude Code（深度任务），一套 $40/月覆盖大多数场景。
        </p>
      </section>
    </div>
  )
}
