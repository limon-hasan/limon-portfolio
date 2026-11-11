import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  ExternalLink,
  FileText,
  FlaskConical,
  Layers,
  Server,
  SquareCode,
  Target,
  type LucideIcon,
} from "lucide-react"

import { ArchitectureDiagram } from "@/components/ArchitectureDiagram"
import { GlowCard } from "@/components/GlowCard"
import { ProjectVisual } from "@/components/ProjectVisual"
import { Reveal } from "@/components/Reveal"
import { BrandIcon } from "@/components/icons"
import { ActionLink } from "@/components/ui/action-link"
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/data/projects"
import { profile } from "@/lib/site"
import type { Project, ProjectLinkKind } from "@/types/portfolio"

export const dynamicParams = false

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Case study not found" }
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} — Engineering Case Study`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
  }
}

const linkIcons: Record<ProjectLinkKind, LucideIcon> = {
  live: ExternalLink,
  frontend: SquareCode,
  backend: Server,
  github: ExternalLink,
  paper: FileText,
  dataset: Database,
}

function ProjectLinkRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2">
      {project.links.map((link) => {
        const Icon = linkIcons[link.kind]
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center justify-between gap-3 rounded-lg border border-white/9 bg-white/[0.025] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
          >
            <span className="flex items-center gap-2 text-[11.5px] font-medium text-white/65 transition-colors group-hover:text-white">
              {link.kind === "github" ? (
                <BrandIcon name="github" className="size-3.5" />
              ) : (
                <Icon className="size-3.5" aria-hidden="true" />
              )}
              {link.label}
            </span>
            <ArrowUpRight
              className="size-3.5 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
              aria-hidden="true"
            />
          </a>
        )
      })}
      {project.links.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-3 py-3 text-[11px] leading-4 text-white/30">
          Research dossier available on request. The thesis and code are being
          prepared for release.
        </div>
      ) : null}
    </div>
  )
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { previous, next } = getAdjacentProjects(project.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: project.keywords.join(", "),
  }

  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-10 pb-4 sm:px-8 sm:pt-14">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider text-white/28 uppercase"
      >
        <Link href="/" className="transition-colors hover:text-white/60">
          Home
        </Link>
        <span className="text-white/15">/</span>
        <Link href="/projects" className="transition-colors hover:text-white/60">
          Projects
        </Link>
        <span className="text-white/15">/</span>
        <span className="text-white/45">{project.title}</span>
      </nav>

      <header className="mt-7 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-white/40 uppercase">
              <span
                className="size-1 rounded-full"
                style={{ backgroundColor: project.accent }}
              />
              {project.category}
            </span>
            <span className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[9px] text-white/30">
              {String(project.order).padStart(2, "0")} / 08
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 px-2.5 py-1 font-mono text-[9px] text-white/35">
              <span
                className={
                  project.status === "Live"
                    ? "size-1.5 rounded-full bg-emerald-400"
                    : project.status === "Research"
                      ? "size-1.5 rounded-full bg-[#a78bfa]"
                      : "size-1.5 rounded-full bg-[#f6c177]"
                }
              />
              {project.status}
            </span>
          </div>

          <h1 className="mt-5 text-[clamp(2.3rem,5.4vw,3.8rem)] leading-[0.98] font-medium tracking-[-0.045em] text-white">
            {project.title}
          </h1>
          <p className="pretty mt-4 max-w-xl text-[15px] leading-7 text-white/45">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <ActionLink
              href={project.links[0]?.href ?? "/contact"}
              variant="primary"
              size="md"
              external={project.links.length > 0}
              icon={<ExternalLink className="size-3.5" aria-hidden="true" />}
            >
              {project.links[0]?.label ?? "Request the dossier"}
            </ActionLink>
            {project.links[1] ? (
              <ActionLink
                href={project.links[1].href}
                variant="secondary"
                size="md"
                external
              >
                {project.links[1].label}
              </ActionLink>
            ) : null}
            <a
              href={`mailto:${profile.emails.primary}?subject=${encodeURIComponent(`Question about ${project.title}`)}`}
              className="text-[11px] font-medium text-white/35 underline-offset-4 transition-colors hover:text-white/70 hover:underline"
            >
              Ask a question
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#09090c] p-2.5">
          <ProjectVisual
            project={project}
            className="h-[230px] sm:h-[250px]"
          />
        </div>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-4">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="bg-[#0c0c0f]/90 px-4 py-3.5">
            <div className="font-mono text-[8px] tracking-[0.14em] text-white/25 uppercase">
              {metric.label}
            </div>
            <div className="mt-1.5 text-[13px] font-medium text-white/80">
              {metric.value}
            </div>
            <div className="mt-0.5 text-[10px] leading-4 text-white/28">
              {metric.hint}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_286px] lg:gap-12">
        <div className="min-w-0">
          <Reveal>
            <section aria-labelledby="problem-heading">
              <div className="flex items-center gap-2">
                <Target className="size-3.5 text-[#b7adff]" aria-hidden="true" />
                <h2
                  id="problem-heading"
                  className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase"
                >
                  Problem statement
                </h2>
              </div>
              <p className="pretty mt-4 border-l-2 border-[#5b4df5]/60 pl-4 text-[15px] leading-7 text-white/60 sm:text-base">
                {project.problem}
              </p>
            </section>
          </Reveal>

          <Reveal className="mt-10">
            <section aria-labelledby="approach-heading">
              <div className="flex items-center gap-2">
                <Layers className="size-3.5 text-[#b7adff]" aria-hidden="true" />
                <h2
                  id="approach-heading"
                  className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase"
                >
                  Engineering approach
                </h2>
              </div>
              <ol className="mt-4 flex flex-col gap-2.5">
                {project.approach.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-white/7 bg-white/[0.018] px-3.5 py-3"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-[#8b7cff]/25 bg-[#5b4df5]/10 font-mono text-[9px] text-[#b7adff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12.5px] leading-5 text-white/48">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal className="mt-10">
            <section aria-labelledby="architecture-heading">
              <div className="flex items-center gap-2">
                <Layers className="size-3.5 text-[#b7adff]" aria-hidden="true" />
                <h2
                  id="architecture-heading"
                  className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase"
                >
                  System architecture
                </h2>
              </div>
              <div className="mt-4">
                <ArchitectureDiagram architecture={project.architecture} />
              </div>
            </section>
          </Reveal>

          <Reveal className="mt-10">
            <section aria-labelledby="challenges-heading">
              <div className="flex items-center gap-2">
                <FlaskConical
                  className="size-3.5 text-[#b7adff]"
                  aria-hidden="true"
                />
                <h2
                  id="challenges-heading"
                  className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase"
                >
                  Key challenges & optimizations
                </h2>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {project.challenges.map((challenge, index) => (
                  <GlowCard key={challenge.title} className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] font-mono text-[10px] text-white/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[14px] font-medium tracking-tight text-white/85">
                          {challenge.title}
                        </h3>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <div>
                            <div className="font-mono text-[8px] tracking-[0.14em] text-white/22 uppercase">
                              Problem
                            </div>
                            <p className="mt-1 text-[11.5px] leading-5 text-white/38">
                              {challenge.problem}
                            </p>
                          </div>
                          <div>
                            <div className="font-mono text-[8px] tracking-[0.14em] text-white/22 uppercase">
                              Solution
                            </div>
                            <p className="mt-1 text-[11.5px] leading-5 text-white/38">
                              {challenge.solution}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-start gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.035] px-2.5 py-2">
                          <Check
                            className="mt-0.5 size-3 shrink-0 text-emerald-700 dark:text-emerald-300/80"
                            aria-hidden="true"
                          />
                          <p className="text-[10.5px] leading-4 text-emerald-800 dark:text-emerald-200/55">
                            {challenge.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </section>
          </Reveal>

          {project.research ? (
            <Reveal className="mt-10">
              <section
                aria-labelledby="research-heading"
                className="rounded-2xl border border-[#a78bfa]/18 bg-[#5b4df5]/[0.05] p-5"
              >
                <div className="flex items-center gap-2">
                  <FlaskConical
                    className="size-3.5 text-[#c4b5fd]"
                    aria-hidden="true"
                  />
                  <h2
                    id="research-heading"
                    className="font-mono text-[10px] tracking-[0.16em] text-[#c4b5fd]/60 uppercase"
                  >
                    Research note
                  </h2>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Question", value: project.research.question },
                    { label: "Method", value: project.research.method },
                    { label: "Evaluation", value: project.research.evaluation },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="font-mono text-[8px] tracking-[0.14em] text-white/25 uppercase">
                        {item.label}
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-5 text-white/40">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          ) : null}

          {project.datasets ? (
            <Reveal className="mt-8">
              <section aria-labelledby="datasets-heading">
                <div className="flex items-center gap-2">
                  <Database
                    className="size-3.5 text-[#b7adff]"
                    aria-hidden="true"
                  />
                  <h2
                    id="datasets-heading"
                    className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase"
                  >
                    Datasets
                  </h2>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.datasets.map((dataset) => (
                    <span
                      key={dataset}
                      className="rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-1.5 font-mono text-[10px] text-white/45"
                    >
                      {dataset}
                    </span>
                  ))}
                </div>
              </section>
            </Reveal>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-white/8 bg-[#0c0c10]/65 p-4">
            <h2 className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
              Project facts
            </h2>
            <dl className="mt-3 space-y-2.5">
              {[
                { label: "Role", value: project.role },
                { label: "Year", value: project.year },
                { label: "Category", value: project.category },
                { label: "Status", value: project.status },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-3 border-b border-white/6 pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[9px] tracking-wider text-white/25 uppercase">
                    {item.label}
                  </dt>
                  <dd className="max-w-[150px] text-right text-[10.5px] text-white/50">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-5 font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
              Stack
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/7 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[9px] text-white/38"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="mt-5 font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
              Direct links
            </h2>
            <div className="mt-2.5">
              <ProjectLinkRow project={project} />
            </div>

            <div className="mt-4 rounded-lg border border-white/7 bg-white/[0.02] px-3 py-2.5">
              <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider text-white/22 uppercase">
                <span className="size-1 rounded-full bg-emerald-400" />
                Contact
              </div>
              <a
                href={`mailto:${profile.emails.primary}`}
                className="mt-1 block truncate text-[10px] text-white/40 transition-colors hover:text-white/70"
              >
                {profile.emails.primary}
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="highlights-heading">
        <h2
          id="highlights-heading"
          className="font-mono text-[10px] tracking-[0.16em] text-white/28 uppercase"
        >
          Outcomes
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-2 rounded-lg border border-white/7 bg-white/[0.018] px-3 py-2.5"
            >
              <Check
                className="mt-0.5 size-3 shrink-0 text-emerald-700 dark:text-emerald-300/70"
                aria-hidden="true"
              />
              <span className="text-[11.5px] leading-5 text-white/40">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </section>

      <nav
        aria-label="Adjacent projects"
        className="mt-16 grid gap-3 border-t border-white/8 pt-6 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group rounded-xl border border-white/8 bg-white/[0.018] p-4 transition-colors hover:border-white/18 hover:bg-white/[0.035]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/25 uppercase">
              <ArrowLeft className="size-3" aria-hidden="true" />
              Previous · {String(previous.order).padStart(2, "0")}
            </span>
            <span className="mt-2 block text-[13px] font-medium text-white/65 transition-colors group-hover:text-white">
              {previous.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/projects"
            className="group rounded-xl border border-white/8 bg-white/[0.018] p-4 transition-colors hover:border-white/18 hover:bg-white/[0.035]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/25 uppercase">
              <ArrowLeft className="size-3" aria-hidden="true" />
              Back
            </span>
            <span className="mt-2 block text-[13px] font-medium text-white/65 transition-colors group-hover:text-white">
              All projects
            </span>
          </Link>
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border border-white/8 bg-white/[0.018] p-4 text-right transition-colors hover:border-white/18 hover:bg-white/[0.035]"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[9px] tracking-wider text-white/25 uppercase">
              Next · {String(next.order).padStart(2, "0")}
              <ArrowRight className="size-3" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-[13px] font-medium text-white/65 transition-colors group-hover:text-white">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/research"
            className="group rounded-xl border border-white/8 bg-white/[0.018] p-4 text-right transition-colors hover:border-white/18 hover:bg-white/[0.035]"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[9px] tracking-wider text-white/25 uppercase">
              Next
              <ArrowRight className="size-3" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-[13px] font-medium text-white/65 transition-colors group-hover:text-white">
              Research dossier
            </span>
          </Link>
        )}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c"),
        }}
      />
    </article>
  )
}
