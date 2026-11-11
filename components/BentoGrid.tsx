import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  GraduationCap,
  MapPin,
  Network,
  Satellite,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import { GlowCard } from "@/components/GlowCard"
import { ProjectVisual } from "@/components/ProjectVisual"
import { Reveal } from "@/components/Reveal"
import { SolvingMetrics } from "@/components/SolvingMetrics"
import { TechDock } from "@/components/TechDock"
import { ActionLink } from "@/components/ui/action-link"
import { aiProjects, getProjectBySlug } from "@/data/projects"
import { profile } from "@/lib/site"

const flagship = getProjectBySlug("studiospace") ?? aiProjects[0]

const spotlightProjects = aiProjects

export function BentoGrid() {
  return (
    <div className="grid grid-cols-12 gap-3.5">
      <Reveal className="col-span-12 lg:col-span-7 lg:row-span-2">
        <GlowCard className="h-full p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b7cff]/25 bg-[#5b4df5]/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-[#c9c3ff] uppercase">
              <Sparkles className="size-3" aria-hidden="true" />
              Flagship
            </span>
            <span className="font-mono text-[10px] tracking-wider text-white/25">
              01 / 08
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.035em] text-white sm:text-[1.75rem]">
                {flagship.title}
              </h3>
              <p className="mt-1 max-w-md text-[13px] leading-5 text-white/45">
                {flagship.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-white/40">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
          </div>

          <Link
            href={`/projects/${flagship.slug}`}
            className="group/visual mt-5 block overflow-hidden rounded-xl border border-white/8"
            aria-label={`Open ${flagship.title} case study`}
          >
            <ProjectVisual
              project={flagship}
              className="h-[300px] transition-transform duration-500 ease-out group-hover/visual:scale-[1.015] sm:h-[330px]"
            />
          </Link>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {flagship.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/7 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[9px] text-white/38"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {flagship.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/7 bg-black/20 px-2.5 py-2"
              >
                <div className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">
                  {metric.label}
                </div>
                <div className="mt-1 truncate text-[11px] font-medium text-white/70">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <span className="font-mono text-[8px] tracking-[0.14em] text-white/25 uppercase">
              Engineering focus
            </span>
            <ul className="mt-2 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {flagship.highlights.slice(0, 4).map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2 text-[10.5px] leading-4 text-white/40"
                >
                  <span
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-[#8b7cff]/60"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
            <div className="flex items-center gap-2">
              <ActionLink
                href={flagship.links[0]?.href ?? "/projects"}
                size="sm"
                variant="primary"
                external
              >
                Live platform
              </ActionLink>
              <ActionLink
                href={`/projects/${flagship.slug}`}
                size="sm"
                variant="ghost"
              >
                Case study
              </ActionLink>
            </div>
            <div className="flex items-center gap-2">
              {flagship.links.slice(1).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[9px] tracking-wider text-white/30 uppercase transition-colors hover:text-white/70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </GlowCard>
      </Reveal>

      <Reveal className="col-span-12 md:col-span-6 lg:col-span-5" delay={0.05}>
        <GlowCard className="h-full p-5">
          <SolvingMetrics />
        </GlowCard>
      </Reveal>

      <Reveal className="col-span-12 md:col-span-6 lg:col-span-5" delay={0.1}>
        <GlowCard className="relative h-full overflow-hidden p-5">
          <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-[#5b4df5]/18 blur-3xl" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-mono-label flex items-center gap-2 text-[#b7adff]/70">
                <Brain className="size-3" aria-hidden="true" />
                AI / ML spotlight
              </span>
              <h3 className="mt-2 text-lg font-medium tracking-tight text-white">
                Research at the edge of the network
              </h3>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-[#a78bfa]/25 bg-[#a78bfa]/10 px-2 py-1 font-mono text-[9px] text-[#c4b5fd]">
              <Satellite className="size-3" aria-hidden="true" />
              Thesis
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {spotlightProjects.map((project, index) => {
              const Icon = index === 0 ? Network : Brain
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.022] p-3 transition-colors hover:border-[#a78bfa]/25 hover:bg-[#5b4df5]/[0.06]"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#b7adff]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[12.5px] font-medium text-white/85">
                        {project.title}
                      </span>
                      <ArrowUpRight
                        className="size-3 shrink-0 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-[10.5px] leading-4 text-white/35">
                      {project.tagline}
                    </span>
                    <span className="mt-1.5 flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/7 px-1 py-0.5 font-mono text-[8px] text-white/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-3">
            <span className="font-mono text-[9px] text-white/25">
              04 datasets · non-IID · Flower
            </span>
            <Link
              href="/research"
              className="group inline-flex items-center gap-1 text-[11px] font-medium text-white/50 transition-colors hover:text-white"
            >
              Research notes
              <ArrowRight
                className="size-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </GlowCard>
      </Reveal>

      <Reveal className="col-span-12 lg:col-span-7" delay={0.15}>
        <GlowCard className="h-full p-5">
          <TechDock />
        </GlowCard>
      </Reveal>

      <Reveal className="col-span-12 lg:col-span-5" delay={0.2}>
        <GlowCard className="h-full p-5">
          <span className="text-mono-label text-white/35">Currently</span>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-white">
            Final year, building in public
          </h3>
          <p className="pretty mt-2 text-[12.5px] leading-5 text-white/42">
            Finishing a Computer Science and Engineering degree while shipping
            full-stack products and running federated vision experiments.
            Looking for a team that treats systems and interfaces as one craft.
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2.5 rounded-lg border border-white/7 bg-white/[0.02] px-3 py-2">
              <GraduationCap
                className="mt-0.5 size-3.5 shrink-0 text-white/35"
                aria-hidden="true"
              />
              <div>
                <div className="text-[11px] text-white/65">
                  {profile.degree}
                </div>
                <div className="mt-0.5 font-mono text-[9px] text-white/28">
                  {profile.university} · {profile.semester}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-white/7 bg-white/[0.02] px-3 py-2">
              <MapPin
                className="mt-0.5 size-3.5 shrink-0 text-white/35"
                aria-hidden="true"
              />
              <div>
                <div className="text-[11px] text-white/65">
                  {profile.location}
                </div>
                <div className="mt-0.5 font-mono text-[9px] text-white/28">
                  UTC+6 · remote friendly
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Full-stack roles", "Problem solving", "Research collab"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-white/[0.025] px-2 py-1 font-mono text-[9px] text-white/38"
                >
                  {item}
                </span>
              )
            )}
          </div>

          <Link
            href="/about"
            className="group mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50 transition-colors hover:text-white"
          >
            The full story
            <ArrowRight
              className="size-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </GlowCard>
      </Reveal>
    </div>
  )
}
