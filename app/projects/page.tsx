import type { Metadata } from "next"
import { ArrowRight, Boxes, FlaskConical, Layers } from "lucide-react"
import Link from "next/link"

import { ProjectExplorer } from "@/components/ProjectExplorer"
import { projectCountByCategory } from "@/data/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Eight systems across web and full-stack engineering and machine learning research: StudioSpace, Wanderlust, Bazar-Dor, Bangla News 24, FitLog, DevStack, Bengali fake news detection, and personalized federated learning.",
  alternates: {
    canonical: "/projects",
  },
}

const readingGuide = [
  {
    title: "Problem",
    detail: "The constraint that made the build non-trivial.",
    icon: Boxes,
  },
  {
    title: "Architecture",
    detail: "How responsibilities are separated across the system.",
    icon: Layers,
  },
  {
    title: "Challenges",
    detail: "The failure modes, trade-offs, and fixes that mattered.",
    icon: FlaskConical,
  },
]

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-4 sm:px-8 sm:pt-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/28 uppercase">
        <Link href="/" className="transition-colors hover:text-white/60">
          Home
        </Link>
        <span className="text-white/15">/</span>
        <span className="text-white/45">Projects</span>
      </nav>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="text-mono-label flex items-center gap-2 text-white/35">
            <span className="inline-block size-1 rounded-full bg-[#8b7cff]" />
            Selected work · 2024–2026
          </span>
          <h1 className="balance mt-4 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.045em] text-white">
            Systems, in strict sequence.
          </h1>
          <p className="pretty mt-4 max-w-xl text-[14px] leading-6 text-white/42">
            Six web and full-stack products, then two research systems. No
            shuffled grid, no vague categories: the catalog follows a deliberate
            order, and every card opens a full engineering case study.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8">
          <div className="bg-[#0c0c0f]/90 px-4 py-3">
            <div className="text-xl font-medium text-white/90">
              {String(projectCountByCategory.total).padStart(2, "0")}
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider text-white/28 uppercase">
              Total
            </div>
          </div>
          <div className="bg-[#0c0c0f]/90 px-4 py-3">
            <div className="text-xl font-medium text-white/90">
              {String(projectCountByCategory.web).padStart(2, "0")}
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider text-white/28 uppercase">
              Web
            </div>
          </div>
          <div className="bg-[#0c0c0f]/90 px-4 py-3">
            <div className="text-xl font-medium text-[#c4b5fd]">
              {String(projectCountByCategory.ai).padStart(2, "0")}
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-wider text-white/28 uppercase">
              AI / ML
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-2 border-y border-white/8 py-3 sm:grid-cols-3">
        {readingGuide.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex items-start gap-2.5 px-1 py-1">
              <Icon className="mt-0.5 size-3.5 shrink-0 text-white/30" aria-hidden="true" />
              <div>
                <div className="font-mono text-[9px] tracking-[0.12em] text-white/45 uppercase">
                  {item.title}
                </div>
                <div className="mt-0.5 text-[10.5px] leading-4 text-white/28">
                  {item.detail}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10">
        <ProjectExplorer />
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-medium text-white/75">
            Looking for the research depth instead?
          </h2>
          <p className="mt-1 text-[11.5px] text-white/32">
            The federated learning thesis and Bengali NLP methodology live in a
            dedicated research dossier.
          </p>
        </div>
        <Link
          href="/research"
          className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-[#c9c3ff] transition-colors hover:text-white"
        >
          Open research
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}
