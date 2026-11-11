import type { ComponentType } from "react"
import {
  ArrowRight,
  Database,
  ExternalLink,
  FileText,
  Server,
  SquareCode,
} from "lucide-react"
import Link from "next/link"

import { GlowCard } from "@/components/GlowCard"
import { ProjectVisual } from "@/components/ProjectVisual"
import { BrandIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { Project, ProjectLink, ProjectLinkKind } from "@/types/portfolio"

const linkIcons: Partial<
  Record<ProjectLinkKind, ComponentType<{ className?: string }>>
> = {
  live: ExternalLink,
  frontend: SquareCode,
  backend: Server,
  paper: FileText,
  dataset: Database,
}

function ProjectLinkChip({ link }: { link: ProjectLink }) {
  const Icon = linkIcons[link.kind] ?? ExternalLink
  const isGithub = link.kind === "github"

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/8 bg-white/[0.025] px-2 text-[10px] font-medium text-white/50 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white/85"
      aria-label={`${link.label} — ${link.kind}`}
    >
      {isGithub ? (
        <BrandIcon name="github" className="size-3" />
      ) : (
        <Icon className="size-3" aria-hidden="true" />
      )}
      {link.label}
    </a>
  )
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const visibleTech = project.tech.slice(0, 3)
  const remainingTech = project.tech.length - visibleTech.length

  return (
    <GlowCard className={cn("group h-full p-0", className)}>
      <div className="relative overflow-hidden border-b border-white/8 bg-[#09090c] p-3">
        <ProjectVisual
          project={project}
          className="h-[210px] transition-transform duration-500 ease-out group-hover:scale-[1.015] sm:h-[220px]"
        />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 h-16 bg-gradient-to-t from-[#09090c]/60 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-white/30 uppercase">
            <span
              className="size-1 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            {String(project.order).padStart(2, "0")} ·{" "}
            {project.category === "AI & Machine Learning" ? "AI / ML" : "Web"}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/30 uppercase">
            <span
              className={cn(
                "size-1.5 rounded-full",
                project.status === "Live"
                  ? "bg-emerald-400"
                  : project.status === "Research"
                    ? "bg-[#a78bfa]"
                    : "bg-[#f6c177]"
              )}
            />
            {project.status}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-white">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-[#d9d6ff]"
          >
            {project.title}
          </Link>
        </h3>

        <p className="pretty mt-2 line-clamp-2 text-[13px] leading-5 text-white/42">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/7 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[9px] text-white/38"
            >
              {tech}
            </span>
          ))}
          {remainingTech > 0 ? (
            <span className="rounded border border-white/7 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[9px] text-white/25">
              +{remainingTech}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/7 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.links.slice(0, 2).map((link) => (
              <ProjectLinkChip key={link.href} link={link} />
            ))}
            {project.links.length > 2 ? (
              <span className="inline-flex h-7 items-center rounded-md border border-white/7 px-2 font-mono text-[9px] text-white/25">
                +{project.links.length - 2}
              </span>
            ) : null}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-[11px] font-medium text-white/55 transition-colors hover:text-white"
          >
            Case study
            <ArrowRight
              className="size-3 transition-transform group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </GlowCard>
  )
}
