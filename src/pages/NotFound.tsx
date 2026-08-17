import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <div className="text-6xl">🤖💨</div>
      <h1 className="mt-4 text-2xl font-bold">404 · 页面不存在</h1>
      <p className="mt-2 max-w-md text-muted">
        你要找的内容可能已被移动或删除。试试搜索,或从下面几个入口重新出发。
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90">
          回到首页
        </Link>
        <Link
          to="/search"
          className="rounded-xl border border-line bg-surface px-6 py-3 font-semibold text-ink transition hover:border-brand/50"
        >
          全站搜索
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {[
          ['/tools', '工具库'],
          ['/skills', 'Skills'],
          ['/mcp', 'MCP'],
          ['/relays', '中转接入'],
        ].map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted transition hover:border-brand/50 hover:text-brand"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
