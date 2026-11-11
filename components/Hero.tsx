import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react"

import { GlowCard } from "@/components/GlowCard"
import { RotatingFocus } from "@/components/RotatingFocus"
import { BrandIcon } from "@/components/icons"
import { ActionLink } from "@/components/ui/action-link"
import { profile, socials, stats } from "@/lib/site"
import { techDock } from "@/data/skills"

export function Hero() {
  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20" aria-labelledby="hero-title">
      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14">
        <div>
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] py-1 pr-3 pl-1.5 backdrop-blur-xl">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 font-mono text-[9px] tracking-[0.1em] text-emerald-300 uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Available
            </span>
            <span className="text-[11px] text-white/40">
              {profile.availability}
            </span>
          </div>

          <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.14em] text-white/30 uppercase">
            <span>{profile.name}</span>
            <span className="text-white/15">/</span>
            <span>CSE Student</span>
            <span className="text-white/15">|</span>
            <span>Full-Stack Developer</span>
          </p>

          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.6rem,6.2vw,4.35rem)] leading-[0.98] font-medium tracking-[-0.045em] text-white"
          >
            Full-stack systems.
            <br />
            <span className="text-gradient">Hard problems solved.</span>
            <br />
            <span className="text-white/38">Built to hold up.</span>
          </h1>

          <p className="pretty mt-6 max-w-xl text-[15px] leading-7 text-white/46">
            I&apos;m Maksudul Hasan Limon, an undergraduate Computer Science
            and Engineering (CSE) student at Northern University Bangladesh in
            Dhaka. I build production-grade full-stack systems with Next.js,
            Node.js, and TypeScript, and solve algorithmic problems with 770+
            competitive programming solutions.
          </p>

          <div className="mt-5">
            <RotatingFocus />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <ActionLink
              href={profile.resumePath}
              download={profile.resumeFileName}
              newTab
              variant="primary"
              size="lg"
              icon={<Download className="size-4" aria-hidden="true" />}
            >
              Download Resume
            </ActionLink>
            <ActionLink
              href="/projects"
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              Explore Projects
            </ActionLink>
            <ActionLink
              href="/contact"
              variant="ghost"
              size="lg"
              icon={<Mail className="size-4" aria-hidden="true" />}
            >
              Contact Me
            </ActionLink>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0c0c0f]/90 px-3.5 py-3.5 transition-colors hover:bg-[#111116]"
              >
                <div className="text-xl font-medium tracking-tight text-white/90">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[9px] tracking-[0.1em] text-white/30 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(91,77,245,0.18),transparent_70%)] blur-xl"
          />
          <GlowCard className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <span className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                System profile
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-700 dark:text-emerald-300/80">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                ONLINE
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-[#8b7cff]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                <img
                  src="/projects/limon.jpg"
                  alt="Maksudul Hasan Limon"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border border-white/10 bg-[#0c0c0f] dark-fixed">
                  <Sparkles
                    className="size-2.5 text-[#b7adff]"
                    aria-hidden="true"
                  />
                </span>
              </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white/90">
                    {profile.shortName}
                  </div>
                  <div className="mt-1 text-[11px] leading-4 text-white/38">
                    {profile.role}
                  </div>
                  <div className="mt-2 flex items-center gap-1 font-mono text-[9px] text-white/28">
                    <MapPin className="size-2.5" aria-hidden="true" />
                    {profile.location} · UTC+6
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/7 bg-black/20 px-3 py-2.5">
                  <div className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">
                    Degree
                  </div>
                  <div className="mt-1 text-[11px] text-white/65">
                    B.Sc. in CSE
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] text-white/28">
                    {profile.semester}
                  </div>
                </div>
                <div className="rounded-lg border border-white/7 bg-black/20 px-3 py-2.5">
                  <div className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">
                    CGPA
                  </div>
                  <div className="mt-1 text-[11px] text-white/65">
                    {profile.cgpa}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] text-white/28">
                    {profile.credits}
                  </div>
                </div>
              </div>

              <div className="mt-2 rounded-lg border border-white/7 bg-black/20 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">
                    Primary stack
                  </div>
                  <span className="font-mono text-[8px] text-white/22">
                    {techDock.length} core tools
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {[
                    "TypeScript",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "C++",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9px] text-white/42"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/7 bg-black/30 px-3 py-2.5 font-mono text-[10px] dark-fixed">
                <span className="text-emerald-400/80">➜</span>
                <span className="text-white/30">~/limon</span>
                <span className="text-white/20">$</span>
                <span className="truncate text-white/45">
                  build --for-production
                </span>
                <span className="ml-auto h-3 w-1.5 animate-pulse bg-[#8b7cff]/70" />
              </div>

              <div className="mt-3 flex items-center gap-1">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-7 items-center justify-center rounded-md border border-white/8 bg-white/[0.02] text-white/40 transition-colors hover:border-white/20 hover:text-white/75"
                  >
                    <BrandIcon name={social.icon} className="size-3.5" />
                  </a>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
                <span className="font-mono text-[9px] tracking-wider text-white/25 uppercase">
                  Open to opportunities
                </span>
                <ActionLink href="/contact" size="sm" variant="accent">
                  Start a conversation
                </ActionLink>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}
