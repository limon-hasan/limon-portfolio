"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }

    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/8 bg-white/[0.025] px-2 font-mono text-[9px] tracking-wider text-white/35 uppercase transition-colors hover:border-white/20 hover:text-white/70"
      aria-label={`Copy ${email} to clipboard`}
    >
      {copied ? (
        <Check className="size-3 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
      ) : (
        <Copy className="size-3" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
