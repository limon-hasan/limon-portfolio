"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Command,
  CornerDownLeft,
  Download,
  FlaskConical,
  House,
  Layers,
  Mail,
  Search,
  UserRound,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react"

import { BrandIcon } from "@/components/icons"
import { commandGroups, commandItems } from "@/data/commands"
import { cn } from "@/lib/utils"
import type { CommandItem } from "@/types/portfolio"

interface CommandMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null)

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <BrandIcon {...props} name="github" />
)

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <BrandIcon {...props} name="linkedin" />
)

const itemIcons: Record<CommandItem["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  home: House,
  projects: Layers,
  research: FlaskConical,
  about: UserRound,
  contact: Mail,
  project: Briefcase,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  leetcode: Command,
  codeforces: Command,
  codechef: Command,
  download: Download,
  mail: Mail,
}

const groupOrder = commandGroups

const noopSubscribe = () => () => {}

function getShortcutSnapshot() {
  return /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K"
}

function getShortcutServerSnapshot() {
  return "Ctrl K"
}

export function useCommandMenu() {
  const context = useContext(CommandMenuContext)
  if (!context) {
    throw new Error("useCommandMenu must be used inside CommandMenuProvider")
  }
  return context
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const setOpenStable = useCallback((value: boolean) => setOpen(value), [])
  const toggle = useCallback(() => setOpen((value) => !value), [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
        return
      }

      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <CommandMenuContext.Provider
      value={{ open, setOpen: setOpenStable, toggle }}
    >
      {children}
      <CommandMenuDialog open={open} onClose={() => setOpen(false)} />
    </CommandMenuContext.Provider>
  )
}

export function CommandMenuTrigger({ className }: { className?: string }) {
  const { setOpen } = useCommandMenu()
  const shortcut = useSyncExternalStore(
    noopSubscribe,
    getShortcutSnapshot,
    getShortcutServerSnapshot
  )

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-white/55 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80",
        className
      )}
      aria-label="Open command menu"
      aria-keyshortcuts="Meta+K Control+K"
    >
      <Search className="size-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="ml-1 hidden items-center rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/40 sm:inline-flex">
        {shortcut}
      </kbd>
    </button>
  )
}

function CommandMenuDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return groupOrder
      .map((group) => ({
        group,
        items: commandItems.filter((item) => {
          if (item.group !== group) {
            return false
          }
          if (!normalized) {
            return true
          }

          const haystack = [
            item.title,
            item.description,
            item.group,
            ...item.keywords,
          ]
            .join(" ")
            .toLowerCase()

          return haystack.includes(normalized)
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  const flatItems = useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups]
  )

  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(flatItems.length - 1, 0)
  )

  const resetAndClose = useCallback(() => {
    setQuery("")
    setActiveIndex(0)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        resetAndClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, resetAndClose])

  useEffect(() => {
    if (!open) {
      return
    }

    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-command-index="${safeActiveIndex}"]`
    )
    node?.scrollIntoView({ block: "nearest" })
  }, [open, safeActiveIndex])

  const runItem = useCallback(
    (item: CommandItem) => {
      resetAndClose()

      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer")
        return
      }

      if (item.download) {
        const anchor = document.createElement("a")
        anchor.href = item.href
        anchor.download = "Maksudul_Hasan_Limon_Resume.pdf"
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        return
      }

      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href
        return
      }

      router.push(item.href)
    },
    [resetAndClose, router]
  )

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) =>
        flatItems.length === 0 ? 0 : (index + 1) % flatItems.length
      )
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) =>
        flatItems.length === 0
          ? 0
          : (index - 1 + flatItems.length) % flatItems.length
      )
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      const item = flatItems[safeActiveIndex]
      if (item) {
        runItem(item)
      }
      return
    }

    if (event.key === "Escape") {
      event.preventDefault()
      resetAndClose()
    }
  }

  let runningIndex = -1

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.button
            type="button"
            aria-label="Close command menu"
            className="absolute inset-0 cursor-default bg-black/72 backdrop-blur-md"
            onClick={resetAndClose}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/12 bg-[#0c0c10]/96 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(139,124,255,0.08)] backdrop-blur-2xl"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: -12, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: -8, scale: 0.99 }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-4">
              <Search
                className="size-4 shrink-0 text-white/35"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search pages, projects, profiles…"
                className="h-14 w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-autocomplete="list"
                aria-activedescendant={
                  flatItems[safeActiveIndex]
                    ? `command-${flatItems[safeActiveIndex].id}`
                    : undefined
                }
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-md p-1.5 text-white/35 transition-colors hover:bg-white/5 hover:text-white/75"
                aria-label="Close command menu"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={listRef}
              id="command-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(56vh,420px)] overflow-y-auto overscroll-contain p-2"
            >
              {filteredGroups.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                  <Search
                    className="size-5 text-white/20"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-white/55">
                    No matches for “{query}”
                  </p>
                  <p className="text-xs text-white/30">
                    Try a project name, a page, or “resume”.
                  </p>
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <div key={group.group} className="mb-1 last:mb-0">
                    <div className="text-mono-label px-3 pt-3 pb-2 text-white/28">
                      {group.group}
                    </div>
                    {group.items.map((item) => {
                      runningIndex += 1
                      const index = runningIndex
                      const Icon = itemIcons[item.icon]
                      const isActive = index === safeActiveIndex

                      return (
                        <button
                          key={item.id}
                          id={`command-${item.id}`}
                          data-command-index={index}
                          role="option"
                          aria-selected={isActive}
                          type="button"
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => runItem(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                            isActive
                              ? "bg-white/[0.07] text-white"
                              : "text-white/70 hover:bg-white/[0.04]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                              isActive
                                ? "border-[#8b7cff]/30 bg-[#5b4df5]/15 text-[#b7adff]"
                                : "border-white/8 bg-white/[0.025] text-white/40"
                            )}
                          >
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium">
                              {item.title}
                            </span>
                            <span className="block truncate text-[11px] text-white/35">
                              {item.description}
                            </span>
                          </span>
                          {item.external ? (
                            <span className="font-mono text-[10px] text-white/25">
                              ↗
                            </span>
                          ) : null}
                          {isActive ? (
                            <CornerDownLeft
                              className="size-3.5 text-white/30"
                              aria-hidden="true"
                            />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/8 bg-white/[0.015] px-4 py-2.5">
              <div className="flex items-center gap-3 font-mono text-[10px] text-white/30">
                <span className="flex items-center gap-1">
                  <ArrowUp className="size-3" aria-hidden="true" />
                  <ArrowDown className="size-3" aria-hidden="true" />
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="size-3" aria-hidden="true" />
                  open
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <X className="size-3" aria-hidden="true" />
                  close
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/25">
                {flatItems.length} results
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
