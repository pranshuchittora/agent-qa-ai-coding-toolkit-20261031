import { useMemo, useState } from 'react'
import { skills, skillTypeMeta, skillInstallMethods } from '../data/skills'
import Code from '../components/Code'

type TypeFilter = 'all' | 'capability' | 'preference'

export default function Skills() {
  const [active, setActive] = useState<TypeFilter>('all')
  const [kw, setKw] = useState('')

  const list = useMemo(() => {
    let l = active === 'all' ? skills : skills.filter((s) => s.type === active)
    const q = kw.trim().toLowerCase()
    if (q) {
      l = l.filter((s) =>
        [s.name, s.author, s.oneLiner, s.when].join(' ').toLowerCase().includes(q),
      )
    }
    return l
  }, [active, kw])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / Skills</div>
      <h1 className="text-3xl font-extrabold">Agent Skills 推荐</h1>
      <p className="mt-2 max-w-3xl text-muted">
        Agent Skills 是 SKILL.md 文件:任务不匹配时只占约 100 token,匹配时按需加载。自 2025 年 12 月起
        成为开放标准,同一文件在 Claude Code、Cursor、Codex、Gemini CLI、Copilot 等 40+ 工具通用。
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', '全部'],
              ['capability', `${skillTypeMeta.capability.icon} ${skillTypeMeta.capability.name}`],
              ['preference', `${skillTypeMeta.preference.icon} ${skillTypeMeta.preference.name}`],
            ] as [TypeFilter, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                active === k ? 'bg-brand text-white' : 'bg-soft text-muted hover:bg-brand-soft hover:text-brand'
              }`}
            >
              {label} ({k === 'all' ? skills.length : skills.filter((s) => s.type === k).length})
            </button>
          ))}
        </div>
        <input
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          placeholder="搜索 skill 名称 / 用途…"
          className="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand/60 sm:w-64"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((s) => (
          <div key={s.name} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition hover:shadow-card-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="font-bold">{s.name}</div>
              <div className="flex shrink-0 gap-1.5 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    s.official
                      ? 'bg-brand-soft text-brand'
                      : s.type === 'capability'
                        ? 'bg-accent-soft text-accent'
                        : 'bg-good-soft text-good'
                  }`}
                >
                  {s.official ? '官方' : skillTypeMeta[s.type].name}
                </span>
              </div>
            </div>
            <p className="mt-2 flex-1 text-sm text-muted">{s.oneLiner}</p>
            <div className="mt-3">
              <div className="text-xs font-semibold text-muted">安装</div>
              <Code>{s.install}</Code>
            </div>
            <p className="mt-3 text-xs text-muted">
              <span className="font-semibold text-ink">何时用:</span>
              {s.when}
            </p>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-6 rounded-xl border border-line bg-soft p-8 text-center text-sm text-muted">
          没有匹配「{kw}」的 skill,换个关键词试试。
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold">通用安装方式</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {skillInstallMethods.map((m) => (
            <div key={m.name} className="rounded-xl border border-line bg-soft p-4">
              <div className="font-semibold">{m.name}</div>
              <p className="mt-1 text-sm text-muted">{m.detail}</p>
              <div className="mt-2">
                <Code>{m.code}</Code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-warn/40 bg-warn-soft p-4 text-sm text-warn">
        安全提醒:skill 的指令会以你的会话权限执行,可能含脚本。装之前读一遍 SKILL.md,只装可信来源,
        优先官方仓库与高星仓库。
      </div>
    </div>
  )
}
