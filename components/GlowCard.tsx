"use client"

import type { CSSProperties, PointerEvent, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Card wrapper that tracks the pointer and exposes `--spot-x` / `--spot-y`
 * to the CSS spotlight layer. Purely visual: no state changes are required
 * for the effect, and the card remains a normal DOM surface for children.
 */
export function GlowCard({ children, className, style }: GlowCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
  }

  return (
    <div
      className={cn(
        "spotlight-card surface-panel rounded-2xl",
        className
      )}
      style={style}
      onPointerMove={handlePointerMove}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}
