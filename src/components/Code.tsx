import { useState } from 'react'

export default function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard 不可用时静默失败 */
    }
  }

  return (
    <div className="group relative">
      <pre className="pr-12">{children}</pre>
      <button
        onClick={copy}
        aria-label="复制命令"
        className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium transition ${
          copied ? 'bg-good text-white' : 'bg-white/10 text-slate-300 opacity-0 hover:bg-white/20 group-hover:opacity-100'
        }`}
      >
        {copied ? '✓ 已复制' : '复制'}
      </button>
    </div>
  )
}
