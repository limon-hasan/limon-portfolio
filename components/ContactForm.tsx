"use client"

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react"
import { useActionState, useEffect, useRef } from "react"

import { submitContact } from "@/app/contact/actions"
import { cn } from "@/lib/utils"
import type { ContactField, ContactFormState } from "@/types/portfolio"

const initialState: ContactFormState = {
  status: "idle",
  message: "",
}

const fieldClasses =
  "w-full rounded-lg border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm text-white placeholder:text-white/22 transition-colors focus:border-[#8b7cff]/50 focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-[#5b4df5]/15 aria-invalid:border-red-400/50 aria-invalid:ring-red-400/10"

function FieldError({
  id,
  messages,
}: {
  id: string
  messages?: string[]
}) {
  if (!messages || messages.length === 0) {
    return null
  }

  return (
    <p id={id} className="mt-1.5 flex items-center gap-1 text-[11px] text-red-300/80">
      <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
      {messages[0]}
    </p>
  )
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state])

  function errorsFor(field: ContactField) {
    return state.fieldErrors?.[field]
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4"
      noValidate
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {state.status !== "idle" ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[12px] leading-5",
            state.status === "success"
              ? "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/[0.07] dark:text-emerald-200/85"
              : "border-red-500/30 bg-red-500/[0.05] text-red-800 dark:border-red-400/20 dark:bg-red-400/[0.06] dark:text-red-200/80"
          )}
        >
          {state.status === "success" ? (
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <AlertCircle
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
          )}
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-white/55"
          >
            Name
            <span className="font-mono text-[9px] text-white/22">required</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className={fieldClasses}
            aria-invalid={Boolean(errorsFor("name"))}
            aria-describedby={errorsFor("name") ? "name-error" : undefined}
          />
          <FieldError id="name-error" messages={errorsFor("name")} />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-white/55"
          >
            Email
            <span className="font-mono text-[9px] text-white/22">required</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            className={fieldClasses}
            aria-invalid={Boolean(errorsFor("email"))}
            aria-describedby={errorsFor("email") ? "email-error" : undefined}
          />
          <FieldError id="email-error" messages={errorsFor("email")} />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-white/55"
        >
          Subject
          <span className="font-mono text-[9px] text-white/22">required</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          minLength={4}
          maxLength={120}
          placeholder="Role, collaboration, or a specific system"
          className={fieldClasses}
          aria-invalid={Boolean(errorsFor("subject"))}
          aria-describedby={errorsFor("subject") ? "subject-error" : undefined}
        />
        <FieldError id="subject-error" messages={errorsFor("subject")} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-white/55"
        >
          Message
          <span className="font-mono text-[9px] text-white/22">
            20–4,000 chars
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          placeholder="What are you building, and where could I help?"
          className={cn(fieldClasses, "min-h-[132px] resize-y")}
          aria-invalid={Boolean(errorsFor("message"))}
          aria-describedby={errorsFor("message") ? "message-error" : undefined}
        />
        <FieldError id="message-error" messages={errorsFor("message")} />
      </div>

      <div className="flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] leading-4 text-white/28">
          Your details are used only to reply. No newsletters, no lists.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[13px] font-medium text-[#08080a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  )
}
