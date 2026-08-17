import { Link } from 'react-router-dom'

const nav = [
  { to: '/tools', label: '工具库' },
  { to: '/skills', label: 'Skills' },
  { to: '/mcp', label: 'MCP' },
  { to: '/relays', label: '中转接入' },
  { to: '/search', label: '搜索' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
                AI
              </span>
              AI 编程工具指南
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              2026 年热门 AI 编程工具的安装、配置、选型一本通——从终端 Agent 到 AI 原生 IDE，
              从 Skills 到 MCP 与国内接入。
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">快速导航</div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {nav.map((l) => (
                <Link key={l.to} to={l.to} className="text-muted transition hover:text-brand">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">相关站点</div>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href="https://vvc3303.xyz/ai-fix-guide/"
                target="_blank"
                rel="noreferrer"
                className="block text-muted transition hover:text-brand"
              >
                AI 排错指南 ← 安装/使用报错去这里
              </a>
              <p className="text-xs text-muted/70">
                数据整理自 2026 年 7-8 月公开资料、SWE-bench 榜单、GitHub star 与社区反馈。
                价格与能力变化很快,以官方为准。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-xs text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} AI 编程工具指南 · 本站仅作信息整理,不构成购买建议</div>
          <div>
            <Link to="/tools" className="hover:text-brand">工具库</Link>
            <span className="mx-2">·</span>
            <Link to="/skills" className="hover:text-brand">Skills</Link>
            <span className="mx-2">·</span>
            <Link to="/mcp" className="hover:text-brand">MCP</Link>
            <span className="mx-2">·</span>
            <Link to="/relays" className="hover:text-brand">中转接入</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
