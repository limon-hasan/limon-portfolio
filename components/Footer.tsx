import Link from "next/link"
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react"

import { BrandIcon } from "@/components/icons"
import { navItems, profile, socials } from "@/lib/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-24 border-t border-white/8">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div className="max-w-md">
            <span className="text-mono-label text-white/35">Next step</span>
            <h2 className="balance mt-4 text-2xl font-medium tracking-[-0.03em] text-white sm:text-[1.75rem]">
              Have a hard product problem or a research idea worth testing?
            </h2>
            <p className="pretty mt-3 text-sm leading-6 text-white/45">
              I am open to full-stack engineering roles and research
              collaborations. The fastest way to reach me is email.
            </p>

            <a
              href={`mailto:${profile.emails.primary}`}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#c9c3ff] transition-colors hover:text-white"
            >
              <Mail className="size-4" aria-hidden="true" />
              {profile.emails.primary}
              <ArrowUpRight
                className="size-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.label} — ${social.handle}`}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.025] text-white/45 transition-colors hover:border-white/20 hover:text-white"
                >
                  <BrandIcon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-mono-label text-white/32">Navigate</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-mono-label text-white/32">Elsewhere</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {social.label}
                    <span className="font-mono text-[10px] text-white/25">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-2 text-xs text-white/35">
              <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>
                {profile.location}
                <br />
                <span className="text-white/25">UTC+6 · Remote friendly</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-xs text-white/30">
            © {year} {profile.name}. Built with Next.js, TypeScript, Tailwind
            CSS, and Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/25 uppercase">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Available for work
            </span>
            <a
              href="#top"
              className="inline-flex items-center gap-1 rounded-md border border-white/8 px-2 py-1 font-mono text-[10px] text-white/35 transition-colors hover:border-white/20 hover:text-white/70"
            >
              <ArrowUp className="size-3" aria-hidden="true" />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
