import type { Metadata } from "next"
import {
  ArrowRight,
  Brain,
  Gauge,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { GlowCard } from "@/components/GlowCard"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TechIcon } from "@/components/TechIcon"
import { BrandIcon } from "@/components/icons"
import { ActionLink } from "@/components/ui/action-link"
import { competitiveProfiles, skillGroups } from "@/data/skills"
import {
  principles,
  profile,
  socials,
  stats,
  timeline,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Maksudul Hasan Limon: B.Sc. in Computer Science and Engineering at Northern University Bangladesh, Dhaka College, full-stack systems, and competitive programming.",
  alternates: {
    canonical: "/about",
  },
}

const principleIcons: Record<string, LucideIcon> = {
  layers: Layers,
  gauge: Gauge,
  shield: ShieldCheck,
  brain: Brain,
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-4 sm:px-8 sm:pt-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/28 uppercase"
      >
        <Link href="/" className="transition-colors hover:text-white/60">
          Home
        </Link>
        <span className="text-white/15">/</span>
        <span className="text-white/45">About</span>
      </nav>

      <header className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <span className="text-mono-label flex items-center gap-2 text-white/35">
            <span className="inline-block size-1 rounded-full bg-[#8b7cff]" />
            About · Dhaka, Bangladesh
          </span>
          <h1 className="balance mt-4 text-[clamp(2.3rem,5.4vw,3.8rem)] leading-[1.02] font-medium tracking-[-0.045em] text-white">
            Engineer by training.
            <br />
            <span className="text-gradient">Systems person by habit.</span>
          </h1>
          <p className="pretty mt-5 max-w-xl text-[14.5px] leading-7 text-white/45">
            I&apos;m Maksudul Hasan Limon, an undergraduate Computer Science
            and Engineering (CSE) student at Northern University Bangladesh in
            Dhaka. I build production-grade full-stack systems with Next.js,
            Node.js, and TypeScript, and solve algorithmic problems with 770+
            competitive programming solutions.
          </p>
          <p className="pretty mt-3 max-w-xl text-[13.5px] leading-6 text-white/35">
            The through-line is not a framework. It is a preference for explicit
            boundaries, measured behavior, and interfaces that respect the
            people using them. I like problems where the data model, the auth
            model, and the evaluation model all have to agree.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <ActionLink href="/contact" variant="primary" size="md">
              Work with me
            </ActionLink>
            <ActionLink
              href={profile.github}
              variant="secondary"
              size="md"
              external
              icon={<BrandIcon name="github" className="size-3.5" />}
            >
              GitHub
            </ActionLink>
            <ActionLink
              href={profile.resumePath}
              variant="ghost"
              size="md"
              download={profile.resumeFileName}
              newTab
            >
              Resume
            </ActionLink>
          </div>
        </div>

        <GlowCard className="p-5">
          <div className="flex items-start gap-4">
            <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-[#8b7cff]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <img
                src="/projects/limon.jpg"
                alt="Maksudul Hasan Limon"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-white/90">
                {profile.name}
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/38">
                {profile.role}
              </div>
              <div className="mt-2 flex items-center gap-1 font-mono text-[9px] text-white/28">
                <MapPin className="size-2.5" aria-hidden="true" />
                {profile.location}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {stats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/7 bg-black/20 px-3 py-2.5"
              >
                <div className="text-[15px] font-medium text-white/80">
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-[8px] tracking-wider text-white/25 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-white/8 pt-3">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white/30 transition-colors hover:text-white/75"
                aria-label={social.label}
              >
                <BrandIcon name={social.icon} className="size-4" />
              </a>
            ))}
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] text-emerald-700 dark:text-emerald-300/60">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Available
            </span>
          </div>
        </GlowCard>
      </header>

      <section className="mt-20" aria-labelledby="journey-heading">
        <SectionHeading
          eyebrow="The journey"
          title={
            <span id="journey-heading">A path built on problems, not titles.</span>
          }
          description="Formal training gave me the vocabulary. Projects and research gave me the habits: define the constraint, build the smallest honest system, measure it, then improve the seam that actually failed."
        />

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-3">
            {timeline.map((entry, index) => (
              <Reveal key={entry.title} delay={index * 0.05}>
                <div className="relative rounded-2xl border border-white/8 bg-white/[0.018] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.14em] text-[#b7adff]/60 uppercase">
                        {entry.period}
                      </div>
                      <h3 className="mt-1.5 text-[15px] font-medium text-white/80">
                        {entry.title}
                      </h3>
                      <div className="mt-0.5 text-[11px] text-white/35">
                        {entry.institution} · {entry.location}
                      </div>
                    </div>
                    <span className="flex size-8 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03]">
                      <GraduationCap
                        className="size-4 text-white/35"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <p className="pretty mt-3 text-[11.5px] leading-5 text-white/35">
                    {entry.description}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-1.5 text-[10.5px] leading-4 text-white/32"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#8b7cff]/60" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <GlowCard className="h-full p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-[#b7adff]" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                  What I optimize for
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  {
                    title: "A system that can be explained",
                    detail:
                      "If I cannot draw the request path and name the failure modes, I do not understand the feature yet.",
                  },
                  {
                    title: "Evidence over intuition",
                    detail:
                      "Latency, error rates, macro-F1, per-client recall. The metric should match the decision.",
                  },
                  {
                    title: "Interfaces as contracts",
                    detail:
                      "Typed boundaries, accessible states, and predictable behavior are part of the backend's job too.",
                  },
                  {
                    title: "Momentum with a finish line",
                    detail:
                      "Ship the smallest honest version, then invest in the seam the evidence says is weakest.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 border-b border-white/6 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[9px] text-white/20">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="text-[11.5px] font-medium text-white/60">
                        {item.title}
                      </div>
                      <p className="mt-0.5 text-[10px] leading-4 text-white/30">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="principles-heading">
        <SectionHeading
          eyebrow="Engineering principles"
          title={
            <span id="principles-heading">The constraints I bring to a team.</span>
          }
          description="These are not slogans. They show up as decisions in the case studies: where validation lives, what gets measured, and what the interface refuses to hide."
        />
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {principles.map((principle, index) => {
            const Icon = principleIcons[principle.icon] ?? Sparkles
            return (
              <Reveal key={principle.title} delay={index * 0.04}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-white/8 bg-white/[0.018] p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-[#b7adff]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[13px] font-medium text-white/75">
                      {principle.title}
                    </h3>
                    <p className="pretty mt-1 text-[11px] leading-5 text-white/34">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="skills-heading">
        <SectionHeading
          eyebrow="Technical range"
          title={
            <span id="skills-heading">The stack, grouped by responsibility.</span>
          }
          description="Not a wall of logos. Each group maps to a layer of the systems I build, from algorithmic foundations to model training and deployment."
        />

        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.03}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.018] p-4">
                <h3 className="font-mono text-[9px] tracking-[0.14em] text-white/38 uppercase">
                  {group.category}
                </h3>
                <p className="mt-1.5 text-[10px] leading-4 text-white/25">
                  {group.caption}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/7 bg-white/[0.025] px-2 py-1 text-[10px] text-white/45"
                    >
                      <TechIcon
                        name={skill.icon}
                        className="size-3 text-white/30"
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="problem-solving-heading">
        <SectionHeading
          eyebrow="Problem solving"
          title={
            <span id="problem-solving-heading">
              Algorithms are a training ground, not a personality.
            </span>
          }
          description="Competitive programming keeps the fundamentals sharp: complexity, invariants, edge cases, and the discipline of proving a solution instead of hoping it passes."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {competitiveProfiles.map((platform) => (
            <a
              key={platform.platform}
              href={platform.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-2xl border border-white/8 bg-white/[0.018] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.035]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-medium text-white/70">
                  <BrandIcon
                    name={
                      platform.platform === "LeetCode"
                        ? "leetcode"
                        : platform.platform === "CodeChef"
                          ? "codechef"
                          : "codeforces"
                    }
                    className="size-4"
                    style={{ color: platform.accent }}
                  />
                  {platform.platform}
                </span>
                <span className="font-mono text-[10px] text-white/30">
                  @{platform.handle}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-white/38">{platform.focus}</p>
              <p className="mt-1.5 text-[10px] leading-4 text-white/25">
                {platform.note}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-white/35 transition-colors group-hover:text-white/70">
                View live profile
                <ArrowRight className="size-3" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <div className="dark-fixed relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-9 sm:px-9">
            <div className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-[#5b4df5]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-lg">
                <span className="text-mono-label text-[#b7adff]/70">
                  Next chapter
                </span>
                <h2 className="balance mt-3 text-2xl font-medium tracking-[-0.03em] text-white sm:text-[1.9rem]">
                  Looking for a team that cares about the seam.
                </h2>
                <p className="pretty mt-2 text-[12.5px] leading-5 text-white/38">
                  I am seeking full-stack engineering roles where the system,
                  the interface, and the evidence all matter.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionLink
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="bg-white text-zinc-950 shadow-none hover:bg-zinc-200 dark:bg-white dark:text-[#08080a] dark:shadow-[0_10px_40px_-16px_rgba(255,255,255,0.55)] dark:hover:bg-white/90"
                >
                  Contact me
                </ActionLink>
                <ActionLink href="/projects" variant="secondary" size="md">
                  See the work
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
