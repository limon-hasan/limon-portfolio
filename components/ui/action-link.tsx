"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "accent" | "ghost"

const variants: Record<Variant, string> = {
  primary:
    "bg-zinc-950 text-zinc-50 hover:bg-zinc-800 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.45)] dark:bg-white dark:text-[#08080a] dark:hover:bg-white/90 dark:shadow-[0_10px_40px_-16px_rgba(255,255,255,0.55)]",
  secondary:
    "border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100 dark:border-white/12 dark:bg-white/[0.035] dark:text-white dark:hover:border-white/25 dark:hover:bg-white/[0.07]",
  accent:
    "border border-indigo-200 bg-indigo-500/10 text-[#4338ca] hover:border-indigo-300 hover:bg-indigo-500/20 dark:border-[#8b7cff]/30 dark:bg-[#5b4df5]/18 dark:text-[#d9d6ff] dark:hover:bg-[#5b4df5]/28 dark:hover:border-[#8b7cff]/50",
  ghost:
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white",
}

interface ActionLinkProps {
  href: string
  children: ReactNode
  variant?: Variant
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: ReactNode
  external?: boolean
  download?: boolean | string
  newTab?: boolean
  ariaLabel?: string
}

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-[0.8125rem]",
  lg: "h-12 gap-2.5 px-5 text-sm",
} as const

export function ActionLink({
  href,
  children,
  variant = "secondary",
  size = "md",
  className,
  icon,
  external,
  download,
  newTab,
  ariaLabel,
}: ActionLinkProps) {
  const classes = cn(
    "group/action inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap transition-all duration-200 select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8b7cff]",
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {external ? (
        <ArrowUpRight
          className="size-3.5 opacity-50 transition-transform duration-200 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5 group-hover/action:opacity-90"
          aria-hidden="true"
        />
      ) : null}
    </>
  )

  if (external || newTab || download || href.startsWith("mailto:")) {
    const shouldOpenNewTab = external || newTab
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(shouldOpenNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download ? { download: download === true ? "" : download } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  )
}
