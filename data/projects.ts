import type { Project, ProjectCategoryFilter } from "@/types/portfolio"

/**
 * Single source of truth for the portfolio catalog.
 *
 * Ordering is intentional and contractual:
 *   1–6  Web & Full-Stack Systems, in descending project sequence
 *   7–8  AI & Machine Learning, research-led systems
 *
 * Consumers must preserve array order rather than re-sorting by title.
 */
export const projects: Project[] = [
  {
    order: 1,
    slug: "studiospace",
    title: "StudioSpace",
    category: "Web & Full-Stack Systems",
    year: "2026",
    role: "Full-stack engineering",
    status: "Live",
    featured: true,
    accent: "#8b7cff",
    image: "/projects/studiospace.png",
    tagline: "A production-shaped studio booking platform with a hardened auth boundary.",
    summary:
      "StudioSpace is a flagship booking platform for creative studios: browse availability, reserve time slots, and manage listings across a separate Next.js client and REST API. The engineering focus is identity: JWT access tokens verified against JWKS, server-side ownership checks, and a clean seam between the App Router client and the backend.",
    problem:
      "Creative studios still coordinate bookings through DMs and spreadsheets. A public booking product needs to solve three hard problems at once: trustworthy availability, safe account boundaries, and a review workflow that does not leak private data. The authentication boundary is the product boundary — a weak token model would make every booking endpoint unsafe.",
    approach: [
      "Modelled studios, time slots, bookings, and user roles as separate domain entities instead of a single listing record.",
      "Split the system into a Next.js App Router client and a standalone REST API, keeping privileged operations and secrets server-side.",
      "Handled authentication with Better-Auth and verified short-lived JWT access tokens against a JWKS endpoint, caching key sets and handling key rotation without trusting client claims.",
      "Enforced role and ownership checks inside every mutating handler, then mirrored those rules in the UI for feedback rather than security.",
      "Used App Router server components for first paint and client components only where booking state and optimistic feedback require it.",
    ],
    tech: [
      "Next.js App Router",
      "Express",
      "TypeScript",
      "Better-Auth",
      "JWT / JWKS",
      "Tailwind CSS",
    ],
    highlights: [
      "Separate frontend and backend repositories with explicit API contracts.",
      "JWKS-based token verification with cached signing keys.",
      "Role-aware dashboards for owners and customers.",
      "Booking flow designed around conflict detection, not just form submission.",
      "Server-first rendering with interactive booking surfaces.",
    ],
    metrics: [
      { label: "Auth model", value: "JWT + JWKS", hint: "Asymmetric verification, cached key set" },
      { label: "Surfaces", value: "2 repos", hint: "Next.js client + REST API" },
      { label: "Status", value: "Live", hint: "Deployed on Vercel" },
      { label: "Roles", value: "Owner / User", hint: "Ownership checks on mutations" },
    ],
    architecture: {
      overview:
        "A two-repository system. The App Router client renders public studio data on the server, then moves into a client boundary for booking state. Every privileged request carries an access token that the API verifies against JWKS before applying role and ownership policy.",
      nodes: [
        { id: "browser", label: "Browser", detail: "Studio discovery, booking, dashboard", layer: "client" },
        { id: "next", label: "Next.js App Router", detail: "Server components, route handlers, session UI", layer: "gateway" },
        { id: "api", label: "REST API", detail: "Studios, slots, bookings, reviews", layer: "service" },
        { id: "auth", label: "JWKS verifier", detail: "Signature, issuer, audience, expiry", layer: "service" },
        { id: "policy", label: "Policy layer", detail: "Role + resource ownership checks", layer: "service" },
        { id: "db", label: "Persistent store", detail: "Users, studios, slots, booking records", layer: "data" },
      ],
      flow: [
        "Client requests a protected studio or booking resource.",
        "API extracts the bearer token and resolves a signing key from the cached JWKS set.",
        "Claims are validated, then role and ownership policy run before the handler.",
        "The domain mutation is committed and a typed response returns to the App Router client.",
        "The UI reconciles server state instead of trusting optimistic client data.",
      ],
    },
    challenges: [
      {
        title: "Verifying JWTs without coupling to one key",
        problem:
          "A shared secret would force the client and API to share credentials, and rotating keys would break live sessions. The platform needed stateless verification with a rotation path.",
        solution:
          "Resolved the token header to a key ID, fetched the public key set from the JWKS endpoint, cached keys with a rotation-aware fallback, and validated signature, issuer, audience, and expiry on every request.",
        impact:
          "The API can verify identity without storing sessions or sharing private keys, and key rotation no longer requires a coordinated deploy.",
      },
      {
        title: "Keeping authorization honest across two applications",
        problem:
          "Hiding an owner-only button in the client is not authorization. The backend also had to prevent a customer from mutating another owner's studio or another user's booking.",
        solution:
          "Centralized policy checks in the API, treating every identifier from the request as untrusted. Mutations resolve the authenticated user, load the resource, and compare ownership before writing.",
        impact:
          "Authorization lives at the last responsible moment, so the system stays correct even when a request bypasses the UI.",
      },
      {
        title: "Booking conflicts under concurrent requests",
        problem:
          "Two users can attempt the same slot at nearly the same time. A naive read-then-write check leaves a race window that produces double bookings.",
        solution:
          "Validated slot state inside the mutation path, rejected stale or already-reserved slots, and returned actionable conflict responses so the client can refresh availability.",
        impact:
          "The booking surface communicates conflicts as normal domain outcomes rather than generic failures, which keeps the UX calm under contention.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live platform",
        href: "https://fullstack-project1-studiospace-clie.vercel.app/",
      },
      {
        kind: "frontend",
        label: "Frontend repo",
        href: "https://github.com/limon-hasan/fullstack-project1-studiospace-frontend",
      },
      {
        kind: "backend",
        label: "Backend repo",
        href: "https://github.com/limon-hasan/fullstack-project1-studiospace-backend",
      },
    ],
    keywords: ["booking", "jwks", "jwt", "auth", "next.js", "rest", "tailwind", "flagship"],
  },
  {
    order: 2,
    slug: "wanderlust",
    title: "Wanderlust",
    category: "Web & Full-Stack Systems",
    year: "2025",
    role: "Full-stack engineering",
    status: "Live",
    featured: false,
    accent: "#4fd1c5",
    image: "/projects/wanderlust.png",
    tagline: "A full-stack travel platform connecting discovery, listings, and reservations.",
    summary:
      "Wanderlust is an end-to-end travel product with a Node.js/Express API and a MongoDB data layer. The work spans listing discovery, authenticated reservations, and the unglamorous parts of a real product: schema design, error normalization, and state that survives refreshes.",
    problem:
      "Travel discovery demos usually stop at a grid of cards. A believable platform needs listings with relational context, a reservation flow tied to an account, and API responses that the interface can trust. The challenge was building those seams without turning the codebase into a collection of route-specific hacks.",
    approach: [
      "Separated listing, destination, user, and reservation concerns in the data model.",
      "Built the API with Express and MongoDB, returning consistent response envelopes and explicit error codes.",
      "Added authenticated reservations with server-side price and availability checks.",
      "Connected a responsive discovery experience to search and filter state that survives navigation.",
      "Documented the frontend/backend contract so each repository can evolve independently.",
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "Better-Auth",
      "REST APIs",
      "Full-stack architecture",
    ],
    highlights: [
      "Independent frontend and backend deployments.",
      "Account-scoped reservations with server-side validation.",
      "Filterable listing discovery with resilient loading and empty states.",
      "Consistent API response shape across resources.",
    ],
    metrics: [
      { label: "Architecture", value: "MERN", hint: "Express API + MongoDB" },
      { label: "Focus", value: "Reservations", hint: "Account-scoped bookings" },
      { label: "Status", value: "Live", hint: "Public deployment" },
      { label: "Repos", value: "2", hint: "Frontend and backend" },
    ],
    architecture: {
      overview:
        "A classic separated full-stack architecture. The client owns presentation and route state, the Express API owns business rules, and MongoDB stores normalized listing and reservation documents.",
      nodes: [
        { id: "client", label: "Travel client", detail: "Discovery, filters, reservation flow", layer: "client" },
        { id: "api", label: "Express API", detail: "Listings, users, reservations", layer: "service" },
        { id: "validation", label: "Validation layer", detail: "Payload + availability checks", layer: "service" },
        { id: "mongo", label: "MongoDB", detail: "Documents with indexed lookups", layer: "data" },
        { id: "maps", label: "Media & location", detail: "Destination imagery and metadata", layer: "external" },
      ],
      flow: [
        "The client requests a filtered listing collection.",
        "Express validates query parameters and queries indexed MongoDB documents.",
        "A reservation request is authenticated, priced, and availability-checked server-side.",
        "The reservation document is written and the client receives a normalized response.",
      ],
    },
    challenges: [
      {
        title: "Designing documents for relational questions",
        problem:
          "MongoDB makes it easy to embed everything until reservation history and listing discovery need different access patterns.",
        solution:
          "Kept listings and reservations as separate documents with stable references, then indexed the fields used by filters and account queries.",
        impact:
          "The data model can answer both discovery and booking-history queries without duplicating reservation state.",
      },
      {
        title: "Trustworthy prices at checkout",
        problem:
          "Client-calculated totals are a convenience, not a source of truth. A user could modify the request or act on stale availability.",
        solution:
          "Recomputed price and availability inside the API at reservation time, rejecting any mismatch before writing.",
        impact:
          "Checkout stays correct even when the client state is stale or tampered with.",
      },
      {
        title: "Failure states that still feel designed",
        problem:
          "Travel flows involve slow networks and partial data. Generic spinners and raw error strings break trust quickly.",
        solution:
          "Standardized API errors and mapped them to purposeful loading, empty, and recovery states in the interface.",
        impact:
          "The product remains understandable when the network is not perfect, which is most of the time.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live platform",
        href: "https://wanderlust-frontend-livid.vercel.app/",
      },
      {
        kind: "frontend",
        label: "Frontend repo",
        href: "https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-frontend",
      },
      {
        kind: "backend",
        label: "Backend repo",
        href: "https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-backend",
      },
    ],
    keywords: ["travel", "express", "mongodb", "mern", "reservations", "full-stack"],
  },
  {
    order: 3,
    slug: "bazar-dor",
    title: "Bazar-Dor",
    category: "Web & Full-Stack Systems",
    year: "2025",
    role: "Frontend engineering",
    status: "Live",
    featured: false,
    accent: "#f6c177",
    image: "/projects/bazar-dor.png",
    tagline: "Real-time commodity pricing and valuation for everyday market decisions.",
    summary:
      "Bazar-Dor turns scattered commodity prices into a readable market dashboard with authentication, price tracking, and valuation views. The design problem is density: show enough data to be useful without turning a daily price check into a spreadsheet.",
    problem:
      "Commodity prices change constantly and are usually scattered across unstructured sources. A useful product needs a stable price timeline, a way to compare items, and an account layer that keeps personal views private — while staying fast on low-end mobile devices.",
    approach: [
      "Modelled tracked commodities and price observations as a time-based data set.",
      "Built an authenticated dashboard with price movement, comparison, and valuation views.",
      "Designed compact, scannable price cards with clear direction indicators instead of raw tables.",
      "Added derived summaries so the interface answers 'what changed?' before showing the underlying numbers.",
      "Tuned the layout for narrow screens first, then expanded the comparison workspace on desktop.",
    ],
    tech: [
      "React",
      "Next.js",
      "Better-Auth",
      "Tailwind CSS",
      "Price tracking",
      "Responsive dashboard",
    ],
    highlights: [
      "Authenticated market dashboard with private tracked items.",
      "Direction-aware price movement indicators.",
      "Valuation view that turns observations into a usable summary.",
      "Mobile-first data density with a wider desktop comparison layout.",
    ],
    metrics: [
      { label: "Domain", value: "Market data", hint: "Commodity price tracking" },
      { label: "Model", value: "Time series", hint: "Observations over time" },
      { label: "Auth", value: "Account-scoped", hint: "Private tracked views" },
      { label: "Status", value: "Live", hint: "Public deployment" },
    ],
    architecture: {
      overview:
        "A React client authenticated against a market data source. Price observations are normalized into a time-based model, then transformed into the summaries used by the dashboard.",
      nodes: [
        { id: "client", label: "React dashboard", detail: "Price cards, comparison, valuation", layer: "client" },
        { id: "auth", label: "Auth boundary", detail: "Protected personal views", layer: "service" },
        { id: "source", label: "Market data", detail: "Commodity observations", layer: "external" },
        { id: "derived", label: "Derived analytics", detail: "Deltas, comparisons, valuation", layer: "service" },
        { id: "state", label: "Client state", detail: "Tracked items and filters", layer: "client" },
      ],
      flow: [
        "An authenticated user opens the market dashboard.",
        "Price observations are fetched and normalized into a comparable shape.",
        "Derived summaries compute movement and relative value.",
        "The UI renders a scannable card grid, with a denser comparison workspace on larger screens.",
      ],
    },
    challenges: [
      {
        title: "Making volatile data legible",
        problem:
          "Raw price tables force users to do the analysis themselves, and color-only indicators fail for users with color-vision differences.",
        solution:
          "Combined directional icons, explicit deltas, and concise trend summaries so movement is readable without relying on color alone.",
        impact:
          "The dashboard communicates change at a glance while remaining accessible.",
      },
      {
        title: "Protecting personal market views",
        problem:
          "Tracked commodities and valuations are user-specific, but the UI and data layer must agree on who owns them.",
        solution:
          "Scoped every personal view to the authenticated account and treated client-provided identity as untrusted.",
        impact:
          "The account layer is a real boundary rather than a conditional render.",
      },
      {
        title: "Dense interfaces on small screens",
        problem:
          "A comparison matrix is useful on desktop and hostile on a phone. Shrinking the same layout produces unreadable type.",
        solution:
          "Changed the information architecture by breakpoint: summary cards on mobile, expandable comparisons, then a full matrix on wide screens.",
        impact:
          "The product remains usable across devices without maintaining two unrelated interfaces.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live platform",
        href: "https://frontend-project-with-authentication-bazar-dor-ggt4-46mcl0beq.vercel.app/",
      },
      {
        kind: "github",
        label: "GitHub repo",
        href: "https://github.com/limon-hasan/Frontend-project-with-Authentication-Bazar-Dor-",
      },
    ],
    keywords: ["react", "market", "commodity", "pricing", "auth", "dashboard", "analytics"],
  },
  {
    order: 4,
    slug: "bangla-news-24",
    title: "Bangla News 24",
    category: "Web & Full-Stack Systems",
    year: "2025",
    role: "Frontend engineering",
    status: "Live",
    featured: false,
    accent: "#f97362",
    image: "/projects/bangla-news-24.png",
    tagline: "A high-traffic Bengali news portal built around typography and category speed.",
    summary:
      "Bangla News 24 is a category-driven news experience for Bengali readers. The engineering center is the reading system: Bengali Unicode typography, editorial hierarchy, and a responsive aggregation grid that stays fast as story volume grows.",
    problem:
      "Bengali news interfaces often inherit Latin typographic defaults and collapse under dense category layouts. Readers need clear hierarchy, comfortable line length, and fast category switching without losing their place or waiting on a heavy page.",
    approach: [
      "Tuned Bengali Unicode typography for line height, measure, and heading contrast instead of accepting browser defaults.",
      "Structured the portal around category-first navigation with a predictable editorial grid.",
      "Built reusable story cards for lead, standard, and compact densities.",
      "Kept the initial experience server-rendered and limited client-side work to navigation and interactive affordances.",
      "Designed responsive breakpoints around reading comfort rather than device labels.",
    ],
    tech: [
      "Next.js",
      "Bengali Unicode typography",
      "Category aggregation",
      "Responsive editorial grid",
      "Server rendering",
    ],
    highlights: [
      "Bengali-first typographic scale with deliberate line height.",
      "Category aggregation with a stable editorial hierarchy.",
      "Lead, standard, and compact story card variants.",
      "Responsive grid tuned for reading measure.",
    ],
    metrics: [
      { label: "Audience", value: "Bengali", hint: "Unicode-first reading experience" },
      { label: "Model", value: "Category grid", hint: "Lead + standard + compact" },
      { label: "Rendering", value: "Server-first", hint: "Next.js App Router" },
      { label: "Status", value: "Live", hint: "Public deployment" },
    ],
    architecture: {
      overview:
        "A server-rendered Next.js portal with category routes and reusable story card densities. The data flow is intentionally simple: normalize stories, aggregate by category, render the grid.",
      nodes: [
        { id: "reader", label: "Reader", detail: "Category browsing and story reading", layer: "client" },
        { id: "next", label: "Next.js portal", detail: "Category routes and server rendering", layer: "gateway" },
        { id: "aggregation", label: "Story aggregation", detail: "Normalize and group by category", layer: "service" },
        { id: "content", label: "Editorial content", detail: "Story metadata and media", layer: "data" },
        { id: "type", label: "Type system", detail: "Bengali scale and card variants", layer: "client" },
      ],
      flow: [
        "The reader opens a category route.",
        "The server aggregates normalized stories for that category.",
        "Editorial hierarchy is applied through lead, standard, and compact card variants.",
        "The reader gets a server-rendered page with navigation as the only interactive boundary.",
      ],
    },
    challenges: [
      {
        title: "Bengali typography is not a font swap",
        problem:
          "Bengali glyphs carry different vertical metrics and conjunct behavior than Latin. Default line heights make dense news copy feel cramped or unstable.",
        solution:
          "Defined a dedicated type scale with increased line height, controlled measure, and weight-based hierarchy instead of relying on size alone.",
        impact:
          "Long-form Bengali reading stays comfortable across mobile and desktop.",
      },
      {
        title: "A grid that survives breaking news",
        problem:
          "Editorial volume is uneven. A rigid grid leaves holes when a category has three stories and collapses when it has thirty.",
        solution:
          "Composed the layout from density variants, allowing the same card system to scale from a single lead story to a multi-column feed.",
        impact:
          "The portal remains visually stable regardless of how much content is published.",
      },
      {
        title: "Speed on content-heavy pages",
        problem:
          "News readers arrive on slow connections and expect immediate text. A client-rendered shell would delay the only thing they came for.",
        solution:
          "Kept category pages server-rendered and pushed interactivity into small client boundaries.",
        impact:
          "The first paint contains the story hierarchy, not a loading placeholder.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live portal",
        href: "https://bangla-news-24-ecru.vercel.app",
      },
    ],
    keywords: ["next.js", "bengali", "news", "typography", "media", "responsive"],
  },
  {
    order: 5,
    slug: "fitlog",
    title: "FitLog",
    category: "Web & Full-Stack Systems",
    year: "2025",
    role: "Frontend engineering",
    status: "Live",
    featured: false,
    accent: "#a3e635",
    image: "/projects/fitlog.png",
    tagline: "A dark, brutalist workout tracker built around routine consistency.",
    summary:
      "FitLog is a fitness and routine tracker with an interactive exercise library, structured routines, and progress logging. The interface takes a dark brutalist direction: high-contrast type, visible structure, and no decorative softness where a number should be.",
    problem:
      "Fitness apps often optimize for novelty while the actual job is repetition: pick a routine, log the work, see the trend. FitLog needed a fast logging loop, an exercise library that supports discovery, and a visual language that makes progress feel concrete.",
    approach: [
      "Designed the logging loop first: exercise, sets, reps, load, and notes in one pass.",
      "Built an interactive exercise library with filterable movement categories.",
      "Modelled routines as ordered exercise collections rather than loose checklists.",
      "Used a brutalist type and layout system to keep the data hierarchy obvious.",
      "Added progress views that emphasize consistency and trend over gamification.",
    ],
    tech: [
      "Next.js",
      "Dark brutalist UI",
      "Exercise library",
      "Routine logging",
      "Progress tracking",
    ],
    highlights: [
      "One-pass workout logging flow.",
      "Filterable exercise library with movement context.",
      "Ordered routine composition.",
      "Progress visualization oriented around consistency.",
    ],
    metrics: [
      { label: "Design", value: "Brutalist", hint: "High-contrast dark interface" },
      { label: "Core loop", value: "Log", hint: "Exercise → sets → progress" },
      { label: "Library", value: "Filterable", hint: "Movement-based discovery" },
      { label: "Status", value: "Live", hint: "Public deployment" },
    ],
    architecture: {
      overview:
        "A Next.js client with a local-first logging interaction. Exercise definitions are separated from routine composition, and progress views derive from the log rather than storing duplicate summaries.",
      nodes: [
        { id: "client", label: "Next.js client", detail: "Routine, logging, progress views", layer: "client" },
        { id: "library", label: "Exercise library", detail: "Movement metadata and filters", layer: "service" },
        { id: "routine", label: "Routine composer", detail: "Ordered exercise collections", layer: "service" },
        { id: "logs", label: "Workout logs", detail: "Sets, reps, load, notes", layer: "data" },
        { id: "progress", label: "Progress views", detail: "Derived trends and consistency", layer: "client" },
      ],
      flow: [
        "The user selects or composes a routine from the exercise library.",
        "A workout session records ordered sets and load.",
        "Progress views derive trends from the log instead of a separate summary store.",
        "The next session starts from the previous context.",
      ],
    },
    challenges: [
      {
        title: "Fast logging beats feature depth",
        problem:
          "A tracker is abandoned when logging a set takes too many taps. Adding analytics before fixing the loop is backwards.",
        solution:
          "Compressed the primary path into a single surface with sensible defaults, then kept advanced metadata optional.",
        impact:
          "The product supports the habit first and the analysis second.",
      },
      {
        title: "Exercise data needs structure",
        problem:
          "Free-text exercise names make filtering, progress comparison, and routine reuse unreliable.",
        solution:
          "Separated exercise definitions from logged sets so the same movement keeps a stable identity across routines.",
        impact:
          "Trends stay comparable even when routine names change.",
      },
      {
        title: "Brutalism without usability debt",
        problem:
          "High contrast and heavy type can become noise. The interface needed attitude without losing hierarchy.",
        solution:
          "Restricted the brutalist treatment to structural elements — borders, numerals, section labels — while keeping interactive targets conventional.",
        impact:
          "The product has a distinct visual identity and still behaves like a tool.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live app",
        href: "https://nextjs-assignment-project-programmi.vercel.app",
      },
    ],
    keywords: ["next.js", "fitness", "tracker", "brutalist", "exercise", "progress"],
  },
  {
    order: 6,
    slug: "devstack",
    title: "DevStack",
    category: "Web & Full-Stack Systems",
    year: "2025",
    role: "Frontend engineering",
    status: "Live",
    featured: false,
    accent: "#60a5fa",
    image: "/projects/devstack.png",
    tagline: "A comparison engine for frameworks, databases, and architecture trade-offs.",
    summary:
      "DevStack is an interactive tech-stack comparison tool. Instead of another listicle, it presents frameworks and databases as a structured decision matrix: compare capabilities side by side, filter by constraints, and read the trade-off rather than the marketing copy.",
    problem:
      "Stack selection advice is fragmented and frequently context-free. Developers need a consistent comparison surface where the same dimensions are applied to every option, and where the UI can handle a dense matrix without hiding the details.",
    approach: [
      "Normalized frameworks and databases into a shared comparison schema.",
      "Built a side-by-side matrix with consistent dimensions across every option.",
      "Added filtering by project constraints such as ecosystem, data model, and operational weight.",
      "Designed progressive disclosure so the matrix remains readable before expanding into detail.",
      "Kept the comparison state shareable through the URL.",
    ],
    tech: [
      "React",
      "Architecture matrix",
      "Side-by-side analysis",
      "Filter state",
      "Responsive data UI",
    ],
    highlights: [
      "Consistent comparison schema across frameworks and databases.",
      "Constraint-based filtering.",
      "Progressive disclosure for dense comparison data.",
      "Shareable comparison state.",
    ],
    metrics: [
      { label: "Model", value: "Decision matrix", hint: "Shared dimensions per option" },
      { label: "UX", value: "Side-by-side", hint: "Compare without context switching" },
      { label: "Filters", value: "Constraint-led", hint: "Ecosystem, data model, weight" },
      { label: "Status", value: "Live", hint: "Public deployment" },
    ],
    architecture: {
      overview:
        "A React application backed by a normalized local data model. Comparison state is encoded in the URL, and the matrix renders from a shared schema so every option is evaluated on identical dimensions.",
      nodes: [
        { id: "client", label: "React client", detail: "Comparison workspace", layer: "client" },
        { id: "schema", label: "Comparison schema", detail: "Shared dimensions per option", layer: "service" },
        { id: "catalog", label: "Tech catalog", detail: "Framework and database records", layer: "data" },
        { id: "url", label: "URL state", detail: "Shareable comparison selection", layer: "gateway" },
        { id: "filters", label: "Filter engine", detail: "Constraint-based narrowing", layer: "service" },
      ],
      flow: [
        "The user selects two or more technologies.",
        "The comparison state is written to the URL.",
        "The schema aligns each option against the same dimensions.",
        "The matrix renders summary rows first, then expands into detail on demand.",
      ],
    },
    challenges: [
      {
        title: "Apples-to-apples comparison",
        problem:
          "Frameworks and databases have different primitives. Comparing a rendering model to a storage model produces confident nonsense.",
        solution:
          "Defined category-aware dimensions while keeping the interaction model consistent, so the matrix never pretends unlike things are identical.",
        impact:
          "The tool supports a real decision instead of producing a prettier list.",
      },
      {
        title: "Dense data on narrow viewports",
        problem:
          "A wide matrix is the natural representation and the worst possible phone experience.",
        solution:
          "Introduced a staged layout: option cards, then pairwise comparison, then the full matrix at desktop widths.",
        impact:
          "The comparison remains usable without abandoning the matrix on larger screens.",
      },
      {
        title: "State that survives sharing",
        problem:
          "Comparison decisions are worth revisiting, but local component state disappears on refresh.",
        solution:
          "Encoded selected technologies and filters in the URL and treated it as the source of truth.",
        impact:
          "A comparison can be bookmarked, shared, or reopened without a backend.",
      },
    ],
    links: [
      {
        kind: "live",
        label: "Live app",
        href: "https://react-final-project-ph-final-assign.vercel.app",
      },
    ],
    keywords: ["react", "comparison", "frameworks", "databases", "architecture", "matrix"],
  },
  {
    order: 7,
    slug: "bengali-fake-news-detection",
    title: "Bengali Fake News Detection",
    category: "AI & Machine Learning",
    year: "2026",
    role: "Applied NLP research",
    status: "Case study",
    featured: false,
    accent: "#22d3ee",
    tagline: "Misinformation detection for a low-resource language, from classical baselines to transformers.",
    summary:
      "An offline Python NLP pipeline that classifies Bengali news as credible or misleading. The work compares TF-IDF with classical learners against a fine-tuned DistilBERT model and treats class imbalance as a first-class problem with SMOTE resampling.",
    problem:
      "Bengali misinformation is under-served by both datasets and tooling. Tokenization is complex, labelled data is scarce, and fake/real class distributions are rarely balanced. A model that reports high accuracy by predicting the majority class is not useful to a reader or an editor.",
    approach: [
      "Built a reproducible Bengali text preprocessing pipeline with normalization and script-aware cleaning.",
      "Established a classical baseline using TF-IDF vectorization and a Random Forest classifier.",
      "Applied SMOTE to the training distribution to prevent the model from collapsing toward the majority class.",
      "Fine-tuned DistilBERT to capture contextual semantics that bag-of-words features miss.",
      "Compared models on precision, recall, and macro-F1 rather than accuracy alone.",
      "Kept the entire pipeline offline in Python, from preprocessing to evaluation.",
    ],
    tech: [
      "Python",
      "Scikit-Learn",
      "TF-IDF",
      "SMOTE",
      "Random Forest",
      "DistilBERT",
    ],
    highlights: [
      "Two model families compared on a low-resource Bengali corpus.",
      "Class-balancing treated as a modeling requirement, not a preprocessing afterthought.",
      "Evaluation centered on macro-F1 and per-class recall.",
      "Fully offline Python pipeline: preprocessing, training, and evaluation.",
    ],
    metrics: [
      { label: "Models", value: "2 families", hint: "TF-IDF + RF vs DistilBERT" },
      { label: "Imbalance", value: "SMOTE", hint: "Resampled training distribution" },
      { label: "Language", value: "Bengali", hint: "Low-resource NLP pipeline" },
      { label: "Runtime", value: "Offline Python", hint: "No server endpoints" },
    ],
    architecture: {
      overview:
        "An offline training and evaluation pipeline. Raw Bengali text is normalized, vectorized or tokenized depending on the model family, and compared against class-aware metrics entirely offline.",
      nodes: [
        { id: "corpus", label: "Bengali corpus", detail: "Labelled news text", layer: "data" },
        { id: "preprocess", label: "Preprocessing", detail: "Normalize, clean, script-aware splits", layer: "service" },
        { id: "classical", label: "TF-IDF + RF", detail: "Classical baseline", layer: "intelligence" },
        { id: "transformer", label: "DistilBERT", detail: "Contextual fine-tune", layer: "intelligence" },
        { id: "eval", label: "Evaluation", detail: "Macro-F1, precision, recall", layer: "service" },
        { id: "offline", label: "Offline pipeline", detail: "Training + evaluation scripts", layer: "gateway" },
      ],
      flow: [
        "Normalize and clean the Bengali text without destroying script-level signals.",
        "Split the corpus and resample the training distribution with SMOTE for the classical path.",
        "Train TF-IDF + Random Forest and fine-tune DistilBERT.",
        "Compare models with class-aware metrics entirely offline, then document the selected model.",
      ],
    },
    challenges: [
      {
        title: "Accuracy hides majority-class collapse",
        problem:
          "An imbalanced fake/real corpus lets a model score well while failing on the class that matters most — the misleading stories.",
        solution:
          "Applied SMOTE to the training split and evaluated with macro-F1, per-class precision, and recall instead of headline accuracy.",
        impact:
          "Model selection reflects real detection behavior rather than the shape of the dataset.",
      },
      {
        title: "Bengali is not a drop-in English pipeline",
        problem:
          "Aggressive normalization can erase meaningful morphology and script-level signals. Tokenizers trained on English also fragment Bengali terms poorly.",
        solution:
          "Kept the cleaning pipeline conservative, validated tokenization behavior on real headlines, and compared classical and transformer tokenization paths separately.",
        impact:
          "The models see a representation that preserves the signal available in a low-resource language.",
      },
      {
        title: "Research code without a serving detour",
        problem:
          "The deliverable is an evaluated model, not a product endpoint. Wrapping the pipeline in a server would add surface area without adding evidence.",
        solution:
          "Kept the work as an offline Python pipeline with a shared evaluation harness and reproducible scripts.",
        impact:
          "Every reported metric traces back to a re-runnable script rather than a live dependency.",
      },
    ],
    links: [],
    research: {
      question:
        "Can a class-balanced classical baseline remain competitive with a fine-tuned transformer for Bengali misinformation detection under limited labelled data?",
      method:
        "TF-IDF + Random Forest with SMOTE against a fine-tuned DistilBERT model, both evaluated on the same held-out split with class-aware metrics.",
      evaluation:
        "Macro-F1 as the primary selection metric, supported by per-class precision, recall, and confusion-matrix analysis rather than accuracy alone.",
    },
    keywords: ["nlp", "bengali", "fake news", "distilbert", "smote", "tf-idf", "machine learning"],
  },
  {
    order: 8,
    slug: "federated-learning-satellite",
    title: "Personalized Federated Learning on Satellite Vision",
    category: "AI & Machine Learning",
    year: "2026",
    role: "Undergraduate Thesis (Ongoing Research)",
    status: "Research",
    featured: true,
    accent: "#a78bfa",
    tagline: "Distributed ship detection across non-IID satellite clients, without centralizing imagery.",
    summary:
      "An undergraduate thesis investigating personalized federated learning for satellite ship detection. YOLOv8 detectors train on edge clients with heterogeneous, non-IID imagery distributions and aggregate through Flower. The research question is not whether federation works in a clean simulation, but whether it survives realistic client skew across HRSC2016, ShipRSImageNet, Airbus Ship Detection, and DOTA.",
    problem:
      "Satellite imagery is large, sensitive, and geographically partitioned. Centralizing it is expensive and often impossible. Standard federated averaging assumes clients are roughly similar, but real providers differ in sensor resolution, geography, class balance, and annotation density. Naive aggregation can produce a global model that is worse than local training for every client.",
    approach: [
      "Framed the system as a cross-silo federation of satellite imagery providers, each retaining local data.",
      "Trained YOLOv8 detectors locally on heterogeneous dataset partitions.",
      "Used Flower to orchestrate client sampling, local training rounds, and model aggregation.",
      "Studied non-IID behavior by controlling client composition across four detection datasets with different domains and annotation styles.",
      "Compared global aggregation against personalized strategies that retain client-specific adaptation.",
      "Evaluated with detection metrics and per-client performance rather than a single global average.",
    ],
    tech: ["Flower FL", "Python", "YOLOv8", "Computer Vision", "Distributed Training"],
    highlights: [
      "Cross-silo federated learning for satellite object detection.",
      "YOLOv8 training on four heterogeneous detection datasets.",
      "Explicit treatment of non-IID client distributions.",
      "Personalization as a response to client heterogeneity.",
    ],
    metrics: [
      { label: "Datasets", value: "4 domains", hint: "HRSC2016, ShipRSImageNet, Airbus, DOTA" },
      { label: "Orchestration", value: "Flower", hint: "Client sampling + aggregation" },
      { label: "Detector", value: "YOLOv8", hint: "Local detector training" },
      { label: "Constraint", value: "Non-IID", hint: "Heterogeneous client partitions" },
    ],
    architecture: {
      overview:
        "A federated training loop across simulated satellite imagery providers. Flower coordinates rounds, each client trains a YOLOv8 detector on local data, and the server aggregates weights. Personalization keeps the global model from erasing client-specific signal.",
      nodes: [
        { id: "server", label: "Flower server", detail: "Round scheduling, sampling, aggregation", layer: "service" },
        { id: "client-a", label: "Client A", detail: "HRSC2016 partition + YOLOv8", layer: "intelligence" },
        { id: "client-b", label: "Client B", detail: "ShipRSImageNet partition + YOLOv8", layer: "intelligence" },
        { id: "client-c", label: "Client C", detail: "Airbus partition + YOLOv8", layer: "intelligence" },
        { id: "client-d", label: "Client D", detail: "DOTA partition + YOLOv8", layer: "intelligence" },
        { id: "eval", label: "Evaluation", detail: "Per-client detection metrics", layer: "data" },
      ],
      flow: [
        "The server samples a subset of clients for the round.",
        "Each client trains its local YOLOv8 detector on private satellite imagery.",
        "Client updates are returned and aggregated into a global checkpoint.",
        "Personalization adapts the global model toward each client's distribution.",
        "Detection quality is measured per client, not only as a global average.",
      ],
    },
    challenges: [
      {
        title: "Non-IID imagery breaks naive averaging",
        problem:
          "Clients differ in geography, sensor resolution, ship density, and annotation style. A global average can drift toward the largest or easiest client and degrade every local model.",
        solution:
          "Controlled client partitions across four datasets, measured per-client performance, and compared aggregation with personalized adaptation strategies.",
        impact:
          "The evaluation surfaces the clients that federated averaging silently harms — the central risk in cross-silo vision.",
      },
      {
        title: "Client heterogeneity is compute heterogeneity",
        problem:
          "Satellite detection is expensive. Clients cannot be assumed to have identical GPUs, batch sizes, or round durations.",
        solution:
          "Treated local training configuration as part of the federation design, with per-client batch sizing and round-level orchestration rather than assuming synchronized capability.",
        impact:
          "The training loop reflects realistic edge constraints instead of a homogeneous cluster.",
      },
      {
        title: "Detection metrics are not classification metrics",
        problem:
          "A single accuracy number hides localization quality, missed small ships, and class imbalance across datasets.",
        solution:
          "Used detection-oriented evaluation including mAP at IoU thresholds, precision, recall, and per-client breakdowns.",
        impact:
          "Aggregation choices can be judged by what actually matters: whether ships are found and localized.",
      },
      {
        title: "Reproducibility across four datasets",
        problem:
          "Different label formats, image resolutions, and split conventions make cross-dataset claims fragile.",
        solution:
          "Built a shared preprocessing and evaluation harness so each dataset is ingested through the same contract before federation.",
        impact:
          "Comparisons across clients are meaningful rather than an artifact of inconsistent data handling.",
      },
    ],
    links: [],
    datasets: [
      "HRSC2016",
      "ShipRSImageNet",
      "Airbus Ship Detection",
      "DOTA",
    ],
    research: {
      question:
        "How can personalized federated learning preserve per-client ship-detection quality when satellite imagery is non-IID and clients are operationally heterogeneous?",
      method:
        "YOLOv8 detectors trained locally, orchestrated by Flower across controlled non-IID partitions of four satellite detection datasets, with personalized aggregation compared against a global baseline.",
      evaluation:
        "Detection quality measured with mAP across IoU thresholds plus precision and recall, reported per client to expose aggregation fairness rather than only global averages.",
    },
    keywords: [
      "federated learning",
      "satellite",
      "yolov8",
      "flower",
      "python",
      "non-iid",
      "computer vision",
      "thesis",
      "ongoing research",
    ],
  },
]

export const projectCategories: {
  id: ProjectCategoryFilter
  label: string
  description: string
}[] = [
  {
    id: "all",
    label: "All Projects",
    description: "The complete catalog, ordered by category and sequence.",
  },
  {
    id: "web",
    label: "Web & Full-Stack Systems",
    description: "Six production-shaped web products, ordered 01 → 06.",
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    description: "Two applied research systems, ordered 07 → 08.",
  },
]

export const categoryMeta = {
  all: {
    label: "All Projects",
    short: "All",
    description: "The complete catalog, ordered by category and sequence.",
  },
  web: {
    label: "Web & Full-Stack Systems",
    short: "Web",
    description: "Production-shaped web products, ordered 01 → 06.",
  },
  ai: {
    label: "AI & Machine Learning",
    short: "AI / ML",
    description: "Applied research systems, ordered 07 → 08.",
  },
} as const

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(
  category: ProjectCategoryFilter
): Project[] {
  if (category === "web") {
    return projects.filter(
      (project) => project.category === "Web & Full-Stack Systems"
    )
  }

  if (category === "ai") {
    return projects.filter(
      (project) => project.category === "AI & Machine Learning"
    )
  }

  return projects
}

export function getAdjacentProjects(slug: string): {
  previous: Project | null
  next: Project | null
} {
  const index = projects.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

export const webProjects = getProjectsByCategory("web")
export const aiProjects = getProjectsByCategory("ai")

export const projectCountByCategory = {
  web: webProjects.length,
  ai: aiProjects.length,
  total: projects.length,
} as const
