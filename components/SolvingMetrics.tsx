"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Braces } from "lucide-react"

import { BrandIcon } from "@/components/icons"
import {
  competitiveEnvironment,
  competitiveProfiles,
  topicMastery,
} from "@/data/skills"
import { cn } from "@/lib/utils"

function LevelBars({ level }: { level: number }) {
  return (
    <span
      className="flex items-center gap-[3px]"
      role="img"
      aria-label={`${level} out of 4 coverage`}
    >
      {[1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className={cn(
            "h-2.5 w-[3px] rounded-full transition-colors",
            bar <= level ? "bg-[#8b7cff]/80" : "bg-white/10"
          )}
        />
      ))}
    </span>
  )
}

export function SolvingMetrics() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-mono-label text-white/35">
            Competitive engine
          </span>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-white">
            Algorithms under time pressure
          </h3>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/40">
          <Braces className="size-3 text-[#b7adff]" aria-hidden="true" />
          C++17
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {competitiveProfiles.map((platform) => (
          <a
            key={platform.platform}
            href={platform.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group rounded-xl border border-white/8 bg-white/[0.022] p-3 transition-colors hover:border-white/18 hover:bg-white/[0.045]"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                <BrandIcon
                  name={
                    platform.platform === "LeetCode"
                      ? "leetcode"
                      : platform.platform === "CodeChef"
                        ? "codechef"
                        : "codeforces"
                  }
                  className="size-3.5"
                  style={{ color: platform.accent }}
                />
                {platform.platform}
              </span>
              <ArrowUpRight
                className="size-3 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
                aria-hidden="true"
              />
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-white/50">
              @{platform.handle}
            </div>
            <p className="mt-1 truncate text-[10px] text-white/28">
              {platform.focus}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-mono-label text-[9px] text-white/28">
          Practice matrix
        </span>
        <span className="font-mono text-[9px] text-white/22">
          self-assessed coverage
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        {topicMastery.map((topic, index) => (
          <motion.div
            key={topic.topic}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.025 }}
            className="flex items-center justify-between gap-2"
          >
            <span className="truncate text-[10px] text-white/45">
              {topic.topic}
            </span>
            <LevelBars level={topic.level} />
          </motion.div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
        {competitiveEnvironment.map((item) => (
          <div key={item.label} className="flex items-baseline gap-1.5">
            <span className="font-mono text-[9px] tracking-wider text-white/22 uppercase">
              {item.label}
            </span>
            <span className="truncate text-[10px] text-white/50">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
