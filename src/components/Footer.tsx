import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>AI 编程工具指南 · 2026 年最新安装使用与 Skills/MCP 推荐</div>
          <div className="flex gap-4">
            <Link to="/tools" className="hover:text-brand">工具库</Link>
            <Link to="/skills" className="hover:text-brand">Skills</Link>
            <Link to="/mcp" className="hover:text-brand">MCP</Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted/70">
          数据整理自 2026 年 7-8 月公开资料、SWE-bench 榜单、GitHub star 与社区反馈。价格与能力变化很快，以官方为准。
        </p>
      </div>
    </footer>
  )
}
