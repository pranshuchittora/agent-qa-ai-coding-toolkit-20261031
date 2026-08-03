import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/tools', label: '工具库' },
  { to: '/skills', label: 'Skills' },
  { to: '/mcp', label: 'MCP' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            AI
          </span>
          <span>AI 编程工具指南</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-soft hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
