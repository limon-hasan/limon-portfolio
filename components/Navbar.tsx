"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Download, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useSyncExternalStore } from "react"

import { CommandMenuTrigger } from "@/components/CommandMenu"
import { ThemeToggle } from "@/components/theme-provider"
import { socials, navItems, profile } from "@/lib/site"
import { cn } from "@/lib/utils"

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true })
  return () => window.removeEventListener("scroll", onStoreChange)
}

function getScrolledSnapshot() {
  return window.scrollY > 12
}

function getScrolledServerSnapshot() {
  return false
}

export function Navbar() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/8 bg-[#08080a]/78 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Maksudul Hasan Limon — home"
        >
          <span className="relative flex size-9 items-center justify-center rounded-xl border border-white/12 bg-[linear-gradient(145deg,rgba(139,124,255,0.22),rgba(255,255,255,0.03))] font-mono text-[11px] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors group-hover:border-[#8b7cff]/40">
            ML
            <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border-2 border-[#08080a] bg-emerald-400" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[13px] font-medium text-white/90">
              Maksudul Limon
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-wider text-white/32 uppercase">
              Full-stack · Problem Solver
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 rounded-full border border-white/8 bg-white/[0.025] p-1 backdrop-blur-xl md:flex"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                  active ? "text-white" : "text-white/48 hover:text-white/85"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CommandMenuTrigger />
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            download={profile.resumeFileName}
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-white/60 transition-colors hover:border-[#8b7cff]/35 hover:bg-[#5b4df5]/10 hover:text-white sm:inline-flex"
          >
            <Download className="size-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">Résumé</span>
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:text-white md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            className="overflow-hidden border-t border-white/8 bg-[#08080a]/96 backdrop-blur-2xl md:hidden"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8"
            >
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex flex-col gap-1 rounded-xl px-3 py-3 transition-colors",
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-white/55 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <span className="text-sm">{item.label}</span>
                    <span className="text-[10px] leading-4 text-white/28">
                      {item.description}
                    </span>
                  </Link>
                )
              })}
              <div className="mt-3 flex items-center gap-2 border-t border-white/8 pt-4">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={profile.resumeFileName}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-950 text-xs font-medium text-zinc-50 dark:bg-white dark:text-[#08080a]"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Download résumé
                </a>
                <a
                  href={`mailto:${profile.emails.primary}`}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-white/12 text-xs font-medium text-white/70"
                >
                  Email me
                </a>
              </div>
              <div className="mt-2 flex items-center gap-3 px-1 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] tracking-wider text-white/35 uppercase hover:text-white/75"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
