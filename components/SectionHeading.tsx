import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  action?: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-3",
          align === "center" && "items-center"
        )}
      >
        <span className="text-mono-label flex items-center gap-2 text-white/40">
          <span className="inline-block size-1 rounded-full bg-[#8b7cff]" />
          {eyebrow}
        </span>
        <h2 className="balance text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl md:text-[2.1rem] md:leading-[1.15]">
          {title}
        </h2>
        {description ? (
          <p className="pretty max-w-xl text-sm leading-6 text-white/45">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
