"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useMemo, useState } from "react"

import { ProjectCard } from "@/components/ProjectCard"
import {
  categoryMeta,
  getProjectsByCategory,
  projectCategories,
  projectCountByCategory,
} from "@/data/projects"
import { cn } from "@/lib/utils"
import type { ProjectCategoryFilter } from "@/types/portfolio"

const groupMeta = [
  {
    id: "web" as const,
    label: "Web & Full-Stack Systems",
    range: "01 — 06",
    description:
      "Product engineering across booking, travel, market data, media, fitness, and developer tooling.",
  },
  {
    id: "ai" as const,
    label: "AI & Machine Learning",
    range: "07 — 08",
    description:
      "Applied research in low-resource NLP and personalized federated learning for satellite vision.",
  },
]

export function ProjectExplorer() {
  const [active, setActive] = useState<ProjectCategoryFilter>("all")
  const shouldReduceMotion = useReducedMotion()

  const groups = useMemo(() => {
    if (active === "all") {
      return groupMeta
    }

    return groupMeta.filter((group) => group.id === active)
  }, [active])

  const totalVisible = getProjectsByCategory(active).length

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-white/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mask-fade-x -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:px-0"
        >
          {projectCategories.map((category) => {
            const isActive = category.id === active
            const count =
              category.id === "all"
                ? projectCountByCategory.total
                : category.id === "web"
                  ? projectCountByCategory.web
                  : projectCountByCategory.ai

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                onClick={() => setActive(category.id)}
                className={cn(
                  "relative inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/40 hover:text-white/75"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="project-tab-active"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                ) : null}
                <span className="relative z-10">{category.label}</span>
                <span
                  className={cn(
                    "relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px]",
                    isActive
                      ? "bg-[#5b4df5]/25 text-[#c9c3ff]"
                      : "bg-white/[0.04] text-white/28"
                  )}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-white/28 uppercase">
          <span>{String(totalVisible).padStart(2, "0")} projects</span>
          <span className="h-3 w-px bg-white/12" />
          <span>{categoryMeta[active].short}</span>
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-[12.5px] leading-5 text-white/35">
        {categoryMeta[active].description} Order is intentional: category
        first, then descending project sequence.
      </p>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="mt-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            {groups.map((group) => {
              const groupProjects = getProjectsByCategory(group.id)
              return (
                <section key={group.id} aria-label={group.label}>
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          group.id === "web" ? "bg-[#4fd1c5]" : "bg-[#a78bfa]"
                        )}
                      />
                      <h2 className="font-mono text-[10px] tracking-[0.16em] text-white/38 uppercase">
                        {group.label}
                      </h2>
                      <span className="font-mono text-[9px] text-white/20">
                        {group.range}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/25">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {groupProjects.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        layout={!shouldReduceMotion}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 14, scale: 0.995 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.35,
                          delay: shouldReduceMotion ? 0 : index * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
