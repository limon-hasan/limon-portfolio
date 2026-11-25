<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository notes

Single Next.js 16 (App Router, Turbopack) portfolio site. No monorepo, no test suite, no CI. `CLAUDE.md` only imports this file — edit `AGENTS.md`.

## Verify with

```bash
npm run typecheck   # tsc --noEmit (strict)
npm run lint        # eslint flat config: next core-web-vitals + TS
npm run build       # the only check that exercises SSG for every route
```

Run them in that order. There is no test runner; don't add one unless asked.

Build gotcha: `next build` may exit 1 with `SecurityFatalError` ("affected by a known security vulnerability") *after* all pages generate — it did on 16.4.4 before the 16.4.6 upgrade. Rerun the same command; it completes (and prints the advisory as a warning). Only compile/type errors are real failures.

`npm run format` rewrites every `*.ts`/`*.tsx` in the repo (not md/json/css). The committed tree is not fully Prettier-formatted, so a repo-wide run creates large unrelated diffs — prefer `npx prettier --write <paths>` for the files you touched. Config: no semicolons, double quotes, LF, width 80, Tailwind class sorting against `app/globals.css`.

## Content is data-driven

- Project content, ordering, and counts live in `data/projects.ts`; profile, nav items, and stats in `lib/site.ts`. Edit data, not page copy.
- Array order is contractual (web projects first, then AI/ML). Use `formatProjectOrder`, `getCategoryOrderRange`, `projectCountByCategory`, and `featuredWebProjects` instead of hardcoding values like `"08"`, `"Six"`, or `"01 — 06"`; those helpers feed the catalog tabs, case-study counters, homepage index, OG artwork, and `sitemap.ts`.
- A new entry in `projects` automatically appears in `/projects`, `/projects/[slug]`, the `Ctrl+K` palette (via `data/commands.ts`), the homepage index, and the sitemap. No other registration step.
- `app/projects/[slug]/page.tsx` uses `dynamicParams = false` + `generateStaticParams`, so a slug missing from the data 404s at build time; there is no runtime route.
- Screenshots live at `public/projects/<slug>.png` and are referenced as `image: "/projects/<slug>.png"`. Render them through `ProjectVisual` → `ProjectThumbnail`, which falls back to generated mockups if a file is missing; don't reintroduce raw `<img>` tags.

## UI conventions

- Dark-first design. Light mode is not authored per component: `app/globals.css` remaps white-alpha utilities whenever `.dark` is absent. Any intentionally dark surface (browser mock frames, terminal wells, badges) must keep `dark-fixed`, or it inverts in light mode.
- Colors are mostly hardcoded hex (`#08080a`, `#0c0c10`, accent `#8b7cff`) — copy nearby components rather than inventing tokens.
- shadcn is configured as `base-nova` on `@base-ui/react`, not Radix, and `shadcn` itself is a dev-only CLI. `cn` and `cva` come from the `cn` / `class-variance-authority` packages, re-exported through `lib/utils.ts`. `hooks/` is empty.
- Path alias `@/*` maps to the repo root.

## Contact form

`app/contact/actions.ts` is a Server Action with Zod validation, a hidden `company` honeypot, and an in-memory per-IP rate limit (3 messages / 10 min). That limiter is per-process — it does not hold across multiple instances. With `RESEND_API_KEY` set it POSTs to Resend; otherwise dev logs the message and production returns a "not configured" error. Optional env in `.env.local`: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

## Don't

- Don't remove or rewrite the `nextjs-agent-rules` block above; `next dev` re-adds it.
- Don't commit `.next/` or `tsconfig.tsbuildinfo`; both are generated.
