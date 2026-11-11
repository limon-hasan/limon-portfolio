import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Database,
  FlaskConical,
  Layers,
  Network,
  Satellite,
  Scale,
  Target,
} from "lucide-react"

import { GlowCard } from "@/components/GlowCard"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { ActionLink } from "@/components/ui/action-link"
import { getProjectBySlug } from "@/data/projects"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research dossier: personalized federated learning for satellite ship detection across non-IID clients, plus applied Bengali NLP for misinformation detection.",
  alternates: {
    canonical: "/research",
  },
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "question", label: "Research question" },
  { id: "method", label: "Methodology" },
  { id: "datasets", label: "Datasets" },
  { id: "non-iid", label: "Non-IID challenge" },
  { id: "evaluation", label: "Evaluation" },
  { id: "nlp", label: "Bengali NLP" },
  { id: "open-questions", label: "Open questions" },
]

const pipeline = [
  {
    title: "Dataset contract",
    detail:
      "Normalize four detection benchmarks into one ingestion surface: label format, image resolution policy, split rules, and evaluation boundaries.",
  },
  {
    title: "Client partitioning",
    detail:
      "Simulate cross-silo providers with deliberately non-IID partitions. Client identity maps to domain, not to a random shuffle of the same distribution.",
  },
  {
    title: "Local YOLOv8 training",
    detail:
      "Each client trains a YOLOv8 detector locally on private imagery. Local batch size and round duration are treated as heterogeneous constraints.",
  },
  {
    title: "Flower orchestration",
    detail:
      "The server samples clients per round, dispatches the global checkpoint, collects updates, and aggregates without centralizing raw imagery.",
  },
  {
    title: "Personalization",
    detail:
      "Compare global aggregation against personalized adaptation so the final model is judged per client, not only by a global average.",
  },
  {
    title: "Per-client evaluation",
    detail:
      "Report detection quality per client and per dataset, using mAP across IoU thresholds plus precision and recall.",
  },
]

const datasets = [
  {
    name: "HRSC2016",
    domain: "High-resolution ship detection",
    role: "Oriented-box benchmark for fine-grained ship localization.",
    challenge: "Small objects, dense harbor scenes, rotated annotations.",
  },
  {
    name: "ShipRSImageNet",
    domain: "Large-scale ship recognition",
    role: "Category and scale diversity across a broad image corpus.",
    challenge: "Long-tail class distribution and varied capture conditions.",
  },
  {
    name: "Airbus Ship Detection",
    domain: "Open-ocean segmentation",
    role: "Wide-area scenes with sparse targets and strong imbalance.",
    challenge: "Tiny ships against water, mask-to-box conversion, empty regions.",
  },
  {
    name: "DOTA",
    domain: "Aerial scene detection",
    role: "Multi-class remote-sensing context beyond ship-only imagery.",
    challenge: "Very large images, oriented objects, domain shift across scenes.",
  },
]

const evaluationMetrics = [
  {
    label: "mAP @ IoU",
    detail:
      "Primary detection quality across multiple IoU thresholds, not a single point estimate.",
  },
  {
    label: "Per-client recall",
    detail:
      "Whether a client's ships are being missed after aggregation. A global average can hide this.",
  },
  {
    label: "Per-client precision",
    detail:
      "False positives are operationally expensive in satellite monitoring. Precision is reported alongside recall.",
  },
  {
    label: "Aggregation spread",
    detail:
      "How far a client's personalized model moves from the global checkpoint after each round.",
  },
]

const nlpProject = getProjectBySlug("bengali-fake-news-detection")
const flProject = getProjectBySlug("federated-learning-satellite")

export default function ResearchPage() {
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
        <span className="text-white/45">Research</span>
      </nav>

      <header className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <span className="text-mono-label flex items-center gap-2 text-white/35">
            <span className="inline-block size-1 rounded-full bg-[#a78bfa]" />
            Research dossier · Undergraduate thesis
          </span>
          <h1 className="balance mt-4 text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.045em] text-white">
            Federated vision,
            <br />
            <span className="text-gradient">under real heterogeneity.</span>
          </h1>
          <p className="pretty mt-4 max-w-2xl text-[14.5px] leading-7 text-white/45">
            Personalized federated learning for satellite ship detection across
            non-IID clients. Four benchmarks, YOLOv8 locally, Flower at the
            coordination layer, and an evaluation that refuses to hide per-client
            failure behind a global average.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <ActionLink
              href="/projects/federated-learning-satellite"
              variant="primary"
              size="md"
              icon={<FlaskConical className="size-3.5" aria-hidden="true" />}
            >
              Thesis case study
            </ActionLink>
            <ActionLink href="/contact" variant="secondary" size="md">
              Discuss the research
            </ActionLink>
          </div>
        </div>

        <GlowCard className="p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
              Research profile
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[#a78bfa]/25 bg-[#a78bfa]/10 px-2 py-1 font-mono text-[9px] text-[#c4b5fd]">
              <Satellite className="size-3" aria-hidden="true" />
              Thesis
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: "Datasets", value: "04" },
              { label: "Detector", value: "YOLOv8" },
              { label: "Orchestration", value: "Flower" },
              { label: "Constraint", value: "Non-IID" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/7 bg-black/20 px-3 py-2.5"
              >
                <div className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">
                  {item.label}
                </div>
                <div className="mt-1 text-[13px] font-medium text-white/70">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-white/8 pt-3">
            <div className="flex items-center gap-2 text-[10.5px] text-white/32">
              <Network className="size-3.5 text-[#b7adff]" aria-hidden="true" />
              Cross-silo federation · raw imagery stays local
            </div>
          </div>
        </GlowCard>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <div className="min-w-0">
          <section id="overview" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Abstract"
              title="The model has to work where the data lives."
              description="Satellite imagery is large, sensitive, and geographically partitioned. Centralizing it is expensive and often impossible. Federated learning offers a way to train without moving raw pixels — but only if the federation survives the distribution shift between clients."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Satellite,
                  title: "Privacy boundary",
                  detail:
                    "Each provider keeps raw imagery. Only model updates cross the network.",
                },
                {
                  icon: Scale,
                  title: "Distribution skew",
                  detail:
                    "Geography, sensor quality, and annotation density differ by client.",
                },
                {
                  icon: Target,
                  title: "Per-client quality",
                  detail:
                    "Success is whether each client's detector improves, not just the average.",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/8 bg-white/[0.018] p-4"
                  >
                    <Icon
                      className="size-4 text-[#b7adff]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-3 text-[12.5px] font-medium text-white/70">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[10.5px] leading-4 text-white/32">
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="question" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-2">
              <Target className="size-3.5 text-[#b7adff]" aria-hidden="true" />
              <h2 className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
                Research question
              </h2>
            </div>
            <blockquote className="pretty mt-4 border-l-2 border-[#a78bfa]/60 pl-4 text-[17px] leading-8 text-white/65 sm:text-lg">
              How can personalized federated learning preserve per-client ship
              detection quality when satellite imagery is non-IID and clients are
              operationally heterogeneous?
            </blockquote>
            <p className="pretty mt-4 text-[13px] leading-6 text-white/40">
              The thesis treats federation as a distribution problem first and a
              training-loop problem second. Standard federated averaging assumes
              clients are roughly comparable. Satellite providers are not: one
              client may contribute high-resolution harbor imagery, another
              sparse open-ocean scenes, another a multi-class aerial benchmark
              with different label conventions. Aggregation that ignores this
              can produce a global model that is worse than local training for
              the clients that need it most.
            </p>
          </section>

          <section id="method" className="mt-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Methodology"
              title="A federated loop with explicit contracts."
              description="The pipeline is designed so that data handling, client identity, and evaluation remain comparable across four very different benchmarks."
            />
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {pipeline.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.03}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-white/7 bg-white/[0.018] p-3.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-[#a78bfa]/25 bg-[#5b4df5]/10 font-mono text-[9px] text-[#c4b5fd]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[12.5px] font-medium text-white/70">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[10.5px] leading-4 text-white/32">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/8 bg-[#0a0a0d]">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
                <span className="font-mono text-[9px] tracking-wider text-white/25 uppercase">
                  Federated round · pseudocode
                </span>
                <span className="font-mono text-[9px] text-white/20">
                  flower / python
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[10.5px] leading-5 text-white/45">
                <code>{`for round in range(num_rounds):
    clients = server.sample(k=clients_per_round)
    global_weights = server.current_weights

    updates = []
    for client in clients:
        local = client.train(global_weights, epochs=local_epochs)
        updates.append((client.id, local, len(client.data)))

    server.aggregate(updates)          # FedAvg baseline
    personalized = server.personalize(updates)

    for client in clients:
        report(client.id, evaluate(personalized[client.id]))`}</code>
              </pre>
            </div>
          </section>

          <section id="datasets" className="mt-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Benchmarks"
              title="Four datasets, four kinds of domain shift."
              description="The point is not to combine four benchmarks into one number. It is to force the federation to deal with genuinely different imagery and annotation conventions."
            />

            <div className="mt-5 overflow-hidden rounded-xl border border-white/8">
              <div className="hidden grid-cols-[150px_1fr_1fr] gap-4 border-b border-white/8 bg-white/[0.025] px-4 py-2.5 font-mono text-[8px] tracking-[0.14em] text-white/25 uppercase sm:grid">
                <span>Dataset</span>
                <span>Role in the federation</span>
                <span>Primary challenge</span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.name}
                    className="grid gap-2 px-4 py-3.5 sm:grid-cols-[150px_1fr_1fr] sm:gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/70">
                        <Database
                          className="size-3 text-white/25"
                          aria-hidden="true"
                        />
                        {dataset.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[8px] text-white/22">
                        {dataset.domain}
                      </div>
                    </div>
                    <p className="text-[10.5px] leading-4 text-white/35">
                      {dataset.role}
                    </p>
                    <p className="text-[10.5px] leading-4 text-white/30">
                      {dataset.challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="non-iid" className="mt-16 scroll-mt-24">
            <div className="rounded-2xl border border-[#a78bfa]/18 bg-[#5b4df5]/[0.05] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Scale className="size-3.5 text-[#c4b5fd]" aria-hidden="true" />
                <h2 className="font-mono text-[10px] tracking-[0.16em] text-[#c4b5fd]/60 uppercase">
                  The non-IID challenge
                </h2>
              </div>
              <h3 className="balance mt-3 text-xl font-medium tracking-[-0.02em] text-white/85">
                Averaging assumes a shared distribution that does not exist.
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <p className="pretty text-[11.5px] leading-5 text-white/38">
                  A client with dense harbor imagery and a client with sparse
                  open-ocean scenes produce gradients that point in different
                  directions. When the server averages them uniformly, the
                  largest or easiest client can dominate. The global checkpoint
                  then travels to every client as if it were locally relevant.
                </p>
                <p className="pretty text-[11.5px] leading-5 text-white/38">
                  Personalization is the response: keep the coordination and
                  privacy benefits of federation, but allow each client to adapt
                  the global model toward its own distribution. The trade-off is
                  explicit — more client-specific quality in exchange for a less
                  universal global model.
                </p>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  "Weight updates by client data volume",
                  "Compare global vs. personalized checkpoints",
                  "Report metrics per client, not only global",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-1.5 rounded-lg border border-white/7 bg-black/15 px-2.5 py-2"
                  >
                    <Check
                      className="mt-0.5 size-3 shrink-0 text-[#c4b5fd]/70"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] leading-4 text-white/38">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="evaluation" className="mt-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Evaluation protocol"
              title="Measure what the deployment actually needs."
              description="Detection quality is not a single accuracy number. The evaluation reports localization and per-client behavior, including the clients that aggregation harms."
            />
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {evaluationMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/7 bg-white/[0.018] p-4"
                >
                  <div className="font-mono text-[10px] tracking-wider text-[#c4b5fd]/70">
                    {metric.label}
                  </div>
                  <p className="mt-1.5 text-[10.5px] leading-4 text-white/32">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] leading-4 text-white/24">
              Benchmark values and ablation tables live in the thesis document.
              This dossier describes the system and evaluation design rather than
              publishing unverified headline numbers.
            </p>
          </section>

          <section id="nlp" className="mt-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Applied NLP thread"
              title="Bengali misinformation, beyond the majority class."
              description="A second research thread applies the same evaluation discipline to low-resource language: balanced training, class-aware metrics, and a serving boundary that keeps the model replaceable."
            />

            <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-2xl border border-white/8 bg-white/[0.018] p-4">
                <div className="flex items-center gap-2">
                  <Brain
                    className="size-3.5 text-[#67e8f9]"
                    aria-hidden="true"
                  />
                  <h3 className="text-[12.5px] font-medium text-white/70">
                    Pipeline
                  </h3>
                </div>
                <ol className="mt-3 space-y-2">
                  {[
                    "Bengali-aware normalization and conservative cleaning.",
                    "TF-IDF vectorization with SMOTE-resampled training data.",
                    "Random Forest baseline for interpretable comparison.",
                    "DistilBERT fine-tune for contextual representation.",
                    "Macro-F1, per-class precision, and recall for selection.",
                    "Node.js inference boundary with a stable contract.",
                  ].map((item, index) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-px font-mono text-[9px] text-[#67e8f9]/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10.5px] leading-4 text-white/35">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.018] p-4">
                <div className="flex items-center gap-2">
                  <Layers
                    className="size-3.5 text-[#67e8f9]"
                    aria-hidden="true"
                  />
                  <h3 className="text-[12.5px] font-medium text-white/70">
                    Model comparison
                  </h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg border border-white/7 bg-black/15 p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] text-white/55">
                        TF-IDF + SMOTE + RF
                      </span>
                      <span className="font-mono text-[8px] text-white/25">
                        BASELINE
                      </span>
                    </div>
                    <p className="mt-1 text-[9.5px] leading-4 text-white/28">
                      Cheap, interpretable, strong sparse-signal baseline.
                      Limited context for negation and long-range meaning.
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#22d3ee]/15 bg-[#22d3ee]/[0.04] p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] text-white/55">
                        DistilBERT
                      </span>
                      <span className="font-mono text-[8px] text-[#67e8f9]/50">
                        CONTEXTUAL
                      </span>
                    </div>
                    <p className="mt-1 text-[9.5px] leading-4 text-white/28">
                      Captures context and negation, at higher compute cost and
                      with more sensitivity to labelled data volume.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <ActionLink
                href="/projects/bengali-fake-news-detection"
                variant="secondary"
                size="sm"
              >
                Read the NLP case study
              </ActionLink>
              <ActionLink
                href="/projects/bengali-fake-news-detection"
                variant="ghost"
                size="sm"
              >
                Research note
              </ActionLink>
            </div>
          </section>

          <section id="open-questions" className="mt-16 scroll-mt-24">
            <SectionHeading
              eyebrow="Next"
              title="What the thesis still needs to prove."
              description="Open questions are part of the research, not a footnote. These are the threads I want to push further."
            />
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {[
                {
                  title: "Personalization cost curve",
                  detail:
                    "How much per-client adaptation is worth the loss in global generalization?",
                },
                {
                  title: "Communication efficiency",
                  detail:
                    "Can update compression or client selection reduce rounds without degrading detection?",
                },
                {
                  title: "Annotation shift",
                  detail:
                    "How much of the federated gap comes from label policy rather than image distribution?",
                },
                {
                  title: "Operational deployment",
                  detail:
                    "What does the loop look like when clients have asymmetric uptime and intermittent connectivity?",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/7 bg-white/[0.018] p-4"
                >
                  <h3 className="text-[12px] font-medium text-white/65">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10.5px] leading-4 text-white/30">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-white/8 bg-[#0c0c10]/60 p-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                <BookOpen className="size-3" aria-hidden="true" />
                On this page
              </div>
              <nav aria-label="Research sections" className="mt-3">
                <ul className="flex flex-col gap-0.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-md px-2 py-1.5 text-[10.5px] text-white/32 transition-colors hover:bg-white/[0.04] hover:text-white/70"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-3 rounded-2xl border border-white/8 bg-[#0c0c10]/60 p-4">
              <div className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                Related systems
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {[flProject, nlpProject].map((project) =>
                  project ? (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group"
                    >
                      <span className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-white/50 transition-colors group-hover:text-white">
                        {project.title}
                        <ArrowRight
                          className="size-3 text-white/20 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-0.5 block font-mono text-[8px] text-white/22">
                        {project.category}
                      </span>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
