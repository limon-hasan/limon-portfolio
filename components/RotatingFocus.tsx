"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const focuses = [
  "booking systems with real auth boundaries",
  "federated vision for satellite imagery",
  "Bengali NLP under class imbalance",
  "interfaces for dense technical data",
]

export function RotatingFocus() {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % focuses.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [shouldReduceMotion])

  const current = focuses[index]

  return (
    <div className="flex min-h-6 items-center gap-2 font-mono text-[10px] tracking-wide text-white/35 sm:text-[11px]">
      <span className="text-white/22">FOCUS</span>
      <span className="h-3 w-px bg-white/12" />
      <span className="relative inline-flex min-w-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            initial={shouldReduceMotion ? false : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="truncate text-[#b7adff]/80"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}
