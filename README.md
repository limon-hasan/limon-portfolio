# Maksudul Hasan Limon — Portfolio

A production-shaped developer portfolio for **Maksudul Hasan Limon**, an undergraduate CSE student and full-stack developer. Built with the Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide.

The site pairs a dark, Linear/Vercel-inspired interface with detailed case studies for eight systems across web engineering and applied machine learning.

## Highlights

- **Bento home** — hero, flagship StudioSpace card, competitive-programming metrics, AI/ML spotlight, and an interactive tech dock.
- **Strictly ordered project catalog** — six web/full-stack systems followed by two AI/ML systems, split into category tabs on `/projects`.
- **Dynamic case studies** — architecture, constraints, implementation notes, and outcomes for every project at `/projects/[slug]`.
- **Research dossier** — methodology and evaluation notes for federated learning for satellite vision and Bengali fake-news detection.
- **Command palette** — press `Cmd/Ctrl + K` or `/` to navigate, search projects, open profiles, or download the résumé.
- **Working contact form** — Server Action with Zod validation, honeypot, in-memory rate limiting, and optional Resend delivery.
- **Real metadata** — canonical URLs, Open Graph and Twitter artwork, `sitemap.xml`, `robots.txt`, and a web manifest.
- **Accessible motion** — route transitions and reveals respect `prefers-reduced-motion`.

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions, Turbopack) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4, custom design tokens in `app/globals.css` |
| Motion | Framer Motion |
| Icons | Lucide React + custom brand SVGs |
| Validation | Zod |
| Email | Resend (optional) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # Start the dev server
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
npm run format     # Prettier
```

## Environment variables

Create `.env.local` in the project root. Every variable is optional for local development.

```bash
# Canonical site URL used by metadata, sitemap, robots, and OG images.
NEXT_PUBLIC_SITE_URL=https://limonhasan.dev

# Contact delivery through Resend. Without a key, messages are logged to the
# server console in development. In production the form returns a clear error
# asking visitors to email directly.
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=maksudulhasanlimon@gmail.com
CONTACT_FROM_EMAIL="Portfolio <hello@your-verified-domain.com>"
```

`CONTACT_FROM_EMAIL` must use a domain verified in Resend. `CONTACT_TO_EMAIL` defaults to the primary address in `lib/site.ts`.

## Project structure

```text
app/
  about/               Academic and engineering background
  contact/             Contact page and Server Action
  projects/            Catalog and dynamic case-study routes
  research/            Federated learning and Bengali NLP
  globals.css          Design tokens, utilities, and motion defaults
  layout.tsx           Fonts, metadata, shell, JSON-LD
components/            UI, navigation, command palette, visuals
data/                  Projects, skills, and command definitions
lib/                   Site profile and utilities
types/                 Shared interfaces
public/                Résumé PDF and static assets
```

All portfolio content lives in `data/` and `lib/site.ts`, so copy, metrics, and links can be updated without touching layout code.

## Contact form behavior

1. Zod validates every field on the server.
2. A hidden honeypot field silently accepts bot submissions.
3. A per-IP in-memory limit allows three messages per ten minutes.
4. With `RESEND_API_KEY` set, the message is delivered through Resend with `reply_to` set to the sender.
5. Without a key, development logs the message; production reports that delivery is not configured.

For multi-instance deployments, replace the in-memory rate limiter with a shared store such as Upstash Redis.

## Deployment

The site deploys cleanly to Vercel. Set `NEXT_PUBLIC_SITE_URL` and the Resend variables in the project settings, then deploy. Update `NEXT_PUBLIC_SITE_URL` to the final domain so canonical URLs and social images resolve correctly.

## Content notes

- Project previews are generated with CSS and SVG rather than screenshots, keeping the repository light and the visuals consistent.
- Research pages describe methodology and evaluation design rather than inventing benchmark results.
