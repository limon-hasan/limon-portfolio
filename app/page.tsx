import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Download,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { BentoGrid } from "@/components/BentoGrid"
import { GlowCard } from "@/components/GlowCard"
import { Hero } from "@/components/Hero"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { ActionLink } from "@/components/ui/action-link"
import { projects } from "@/data/projects"
import { principles, profile } from "@/lib/site"

const principleIcons: Record<string, LucideIcon> = {
  layers: Layers,
  gauge: Gauge,
  shield: ShieldCheck,
  brain: Brain,
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8">
      <Hero />

      <section className="mt-20 sm:mt-24" aria-labelledby="ecosystem-title">
        <SectionHeading
          eyebrow="The ecosystem"
          title={
            <span id="ecosystem-title">
              Eight systems. One engineering operating system.
            </span>
          }
          description="A flagship booking platform, a competitive programming engine, applied research, and the tools underneath. Built as separate products, designed with the same standards."
          action={
            <ActionLink
              href="/projects"
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="size-3.5" aria-hidden="true" />}
            >
              View all projects
            </ActionLink>
          }
        />
        <div className="mt-7">
          <BentoGrid />
        </div>
      </section>

      <section className="mt-24" aria-labelledby="project-index-title">
        <SectionHeading
          eyebrow="Project index"
          title={
            <span id="project-index-title">The catalog, in strict sequence.</span>
          }
          description="Web and full-stack systems first, then research and machine learning. Each row opens a full engineering case study."
        />

        <Reveal className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c10]/55">
            <div className="hidden grid-cols-[52px_1fr_180px_90px_40px] items-center gap-4 border-b border-white/8 bg-white/[0.02] px-5 py-2.5 font-mono text-[9px] tracking-[0.14em] text-white/25 uppercase sm:grid">
              <span>No.</span>
              <span>System</span>
              <span>Category</span>
              <span>Status</span>
              <span />
            </div>
            <div className="divide-y divide-white/[0.06]">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group grid grid-cols-[38px_1fr_28px] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.028] sm:grid-cols-[52px_1fr_180px_90px_40px] sm:gap-4 sm:px-5"
                >
                  <span className="font-mono text-[11px] text-white/25">
                    {String(project.order).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className="hidden size-1.5 shrink-0 rounded-full sm:block"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium text-white/75 transition-colors group-hover:text-white">
                        {project.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[10.5px] text-white/28">
                        {project.tagline}
                      </span>
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 sm:flex">
                    <span
                      className="size-1 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="font-mono text-[9px] tracking-wide text-white/32 uppercase">
                      {project.category === "AI & Machine Learning"
                        ? "AI / ML"
                        : "Web / Full-stack"}
                    </span>
                  </span>
                  <span className="hidden items-center gap-1.5 sm:flex">
                    <span
                      className={
                        project.status === "Live"
                          ? "size-1.5 rounded-full bg-emerald-400"
                          : project.status === "Research"
                            ? "size-1.5 rounded-full bg-[#a78bfa]"
                            : "size-1.5 rounded-full bg-[#f6c177]"
                      }
                    />
                    <span className="font-mono text-[9px] text-white/32">
                      {project.status}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-3.5 justify-self-end text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24" aria-labelledby="principles-title">
        <SectionHeading
          eyebrow="Engineering principles"
          title={
            <span id="principles-title">How the work gets made.</span>
          }
          description="Four constraints that show up in every project: explicit boundaries, measured behavior, interfaces that respect attention, and research that survives its own assumptions."
          action={
            <ActionLink href="/about" variant="ghost" size="sm">
              About the engineer
            </ActionLink>
          }
        />

        <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {principles.map((principle, index) => {
            const Icon = principleIcons[principle.icon] ?? Sparkles
            return (
              <Reveal key={principle.title} delay={index * 0.05}>
                <GlowCard className="h-full p-5">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-[#b7adff]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3.5 text-[15px] font-medium tracking-tight text-white/85">
                    {principle.title}
                  </h3>
                  <p className="pretty mt-1.5 text-[12.5px] leading-5 text-white/38">
                    {principle.description}
                  </p>
                </GlowCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mt-24" aria-labelledby="closing-cta-title">
        <Reveal>
          <div className="dark-fixed relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-10 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-[#5b4df5]/20 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <span className="text-mono-label text-[#b7adff]/70">
                  Open to the next system
                </span>
                <h2
                  id="closing-cta-title"
                  className="balance mt-3 text-3xl font-medium tracking-[-0.035em] text-white sm:text-[2.4rem] sm:leading-[1.1]"
                >
                  Let&apos;s build something that holds up after launch.
                </h2>
                <p className="pretty mt-3 text-[13.5px] leading-6 text-white/42">
                  Full-stack engineering roles, research collaborations, or a
                  specific product problem. I reply to every serious message.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <ActionLink
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="size-4" aria-hidden="true" />}
                  className="bg-white text-zinc-950 shadow-none hover:bg-zinc-200 dark:bg-white dark:text-[#08080a] dark:shadow-[0_10px_40px_-16px_rgba(255,255,255,0.55)] dark:hover:bg-white/90"
                >
                  Start a conversation
                </ActionLink>
                <ActionLink
                  href={profile.resumePath}
                  download
                  variant="secondary"
                  size="lg"
                  icon={<Download className="size-4" aria-hidden="true" />}
                >
                  Resume
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
