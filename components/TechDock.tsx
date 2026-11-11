"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"

import { TechIcon } from "@/components/TechIcon"
import { techDock } from "@/data/skills"
import { cn } from "@/lib/utils"

export function TechDock() {
  const [activeName, setActiveName] = useState(techDock[0]?.name ?? "")
  const shouldReduceMotion = useReducedMotion()
  const active = techDock.find((skill) => skill.name === activeName) ?? techDock[0]

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-mono-label text-white/35">Tech stack dock</span>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-white">
            The working toolkit
          </h3>
        </div>
        <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/35">
          {techDock.length} core tools
        </span>
      </div>

      <div className="mt-5 grid flex-1 grid-cols-5 gap-1.5">
        {techDock.map((skill) => {
          const isActive = skill.name === activeName
          return (
            <button
              key={skill.name}
              type="button"
              onMouseEnter={() => setActiveName(skill.name)}
              onFocus={() => setActiveName(skill.name)}
              onClick={() => setActiveName(skill.name)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border text-[10px] transition-all duration-200",
                isActive
                  ? "border-zinc-300 bg-zinc-200 text-zinc-900 dark:border-[#8b7cff]/35 dark:bg-[#5b4df5]/12 dark:text-white"
                  : "border-zinc-200/80 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200/70 hover:text-zinc-900 dark:border-white/8 dark:bg-white/[0.02] dark:text-white/45 dark:hover:border-white/18 dark:hover:bg-white/[0.045] dark:hover:text-white/80"
              )}
            >
              {isActive && !shouldReduceMotion ? (
                <motion.span
                  layoutId="tech-dock-active"
                  className="absolute inset-0 rounded-xl border border-zinc-300/70 bg-zinc-200/60 dark:border-[#8b7cff]/25 dark:bg-[#5b4df5]/8"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <TechIcon
                name={skill.icon}
                className={cn(
                  "relative z-10 size-4 transition-colors",
                  isActive
                    ? "text-[#5b4df5] dark:text-[#b7adff]"
                    : "text-zinc-500 dark:text-white/40"
                )}
              />
              <span className="relative z-10 max-w-full truncate px-0.5 font-mono text-[9px] tracking-tight">
                {skill.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 min-h-[54px] rounded-xl border border-white/8 bg-black/20 px-3 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-[#b7adff]">
            {active?.name}
          </span>
          <span className="rounded border border-white/8 px-1.5 py-0.5 font-mono text-[9px] text-white/35">
            {active?.level}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-4 text-white/40">
          {active?.blurb}
        </p>
      </div>
    </div>
  )
}
