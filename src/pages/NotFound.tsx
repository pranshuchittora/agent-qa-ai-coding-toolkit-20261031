import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <div className="text-6xl">🔍</div>
      <h1 className="mt-4 text-2xl font-bold">页面不存在</h1>
      <p className="mt-2 text-muted">你要找的内容可能已被移动或删除。</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90"
      >
        回到首页
      </Link>
    </div>
  )
}
