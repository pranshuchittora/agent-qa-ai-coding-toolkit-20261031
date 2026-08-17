import { relayProviders, modelRelayConfigs } from '../data/relays'
import Code from '../components/Code'

const riskCls: Record<string, string> = {
  官方: 'bg-good-soft text-good',
  推荐: 'bg-accent-soft text-accent',
  谨慎: 'bg-warn-soft text-warn',
}

const quickPick = [
  {
    icon: '💳',
    title: '有国际卡 + 会配代理',
    body: '想要最全模型、最稳服务 → 官方直连,一步到位。',
    target: 'official',
  },
  {
    icon: '🔀',
    title: '想省事、一个 Key 多家模型',
    body: 'BYOK 工具改个 BASE_URL 即用 → OpenRouter 聚合。',
    target: 'openrouter',
  },
  {
    icon: '🛡️',
    title: '零成本、怕第三方跑路',
    body: '会写一点 Node/JS → Cloudflare Workers 自建转发。',
    target: 'self-host',
  },
  {
    icon: '🀄',
    title: '只要国内稳定 + 便宜',
    body: 'DeepSeek / 通义 / Kimi 国内直连即可,完全不用中转。',
    target: 'domestic',
  },
]

export default function Relays() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 text-sm text-muted">首页 / 中转接入</div>
      <h1 className="text-3xl font-extrabold">API 中转与接入指南</h1>
      <p className="mt-2 max-w-3xl text-muted">
        国内直连不上 Claude / GPT / Gemini 官方 API 时,用「中转/聚合」把请求转发到官方,再让工具走一套
        OpenAI 兼容地址即可。下面按模型族给出配置,具体哪个工具看它的详情页。
      </p>

      {/* 场景速选 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">30 秒对号入座</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickPick.map((p) => (
            <div key={p.title} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand/40">
              <span className="text-2xl">{p.icon}</span>
              <h3 className="mt-2 text-sm font-bold">{p.title}</h3>
              <p className="mt-1 flex-1 text-xs text-muted">{p.body}</p>
              <a
                href={`#${p.target}`}
                className="mt-3 text-xs font-semibold text-brand hover:underline"
              >
                看方案详情 ↓
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">先选一个接入方式</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relayProviders.map((p) => (
            <div key={p.slug} id={p.slug} className="flex scroll-mt-24 flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition hover:shadow-card-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold">{p.name}</div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${riskCls[p.risk]}`}>
                  {p.risk}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.features.map((f) => (
                  <span key={f} className="rounded-md bg-soft px-2 py-0.5 text-xs font-medium text-muted">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted">
                {p.pointsUrl && (
                  <a
                    href={p.pointsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mr-3 font-medium text-brand hover:underline"
                  >
                    前往开通 ↗
                  </a>
                )}
                提示:{p.note}
              </div>
            </div>
          ))}
        </div>

        {/* 对比表 */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-line shadow-card">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-line bg-soft text-left">
                <th className="p-3">方案</th>
                <th className="p-3">风险</th>
                <th className="p-3">国内直连</th>
                <th className="p-3">成本</th>
                <th className="p-3">适合谁</th>
              </tr>
            </thead>
            <tbody>
              {relayProviders.map((p) => (
                <tr key={p.slug} className="border-b border-line last:border-0 hover:bg-soft/60">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${riskCls[p.risk]}`}>{p.risk}</span>
                  </td>
                  <td className="p-3 text-muted">
                    {p.slug === 'official' || p.slug === 'openrouter' ? '需代理' : p.slug === 'self-host' ? '自管域名可加速' : '直连'}
                  </td>
                  <td className="p-3 text-muted">
                    {p.slug === 'official' ? '官方按量' : p.slug === 'openrouter' ? '按量' : p.slug === 'self-host' ? '免费额度' : '低价按量'}
                  </td>
                  <td className="p-3 text-muted">{p.slug === 'official' ? '重度用户' : p.slug === 'openrouter' ? '省事派' : p.slug === 'self-host' ? '动手派' : '国内用户'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">按模型族的配置模板</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {modelRelayConfigs.map((c) => (
            <div key={c.id} className="flex flex-col rounded-xl border border-line bg-soft p-5">
              <div className="flex items-center gap-2 font-bold">
                <span>{c.icon}</span>
                {c.label}
              </div>
              <p className="mt-2 text-sm text-muted">{c.desc}</p>
              <div className="mt-3 rounded-lg bg-surface p-3 text-xs font-semibold text-muted">
                适用:{c.when}
              </div>
              <div className="mt-3 space-y-1.5">
                {c.envKeys.map((e) => (
                  <div key={e.key} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                    <code className="rounded bg-brand-soft px-1.5 py-0.5 font-semibold text-brand">
                      {e.key}
                    </code>
                    <span className="text-muted">{e.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex-1 space-y-2">
                {c.example.map((line, i) => (
                  <Code key={i}>{line}</Code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm text-brand">
        中转站只负责转发,模型还是官方那套。把 Key 给第三方前先想清楚;充小额试用、别拿生产 Key 去第三方平台。
      </div>
    </div>
  )
}
