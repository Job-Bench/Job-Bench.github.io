import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PixelAgent, PixelDivider } from "@/components/PixelArt";
import {
  ReadingProgress,
  Reveal,
  SectionIndicator,
} from "@/components/BlogChrome";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "reasoning", label: "Reasoning" },
  { id: "case-study", label: "Case study" },
  { id: "evaluation", label: "Evaluation" },
  { id: "enhancement", label: "Enhancement" },
  { id: "kicker", label: "Closing" },
];

export const metadata: Metadata = {
  title: "Aligning Agent Work With Human Desire — JobBench",
  description:
    "Why JobBench measures AI agents by what professionals actually want automated, not by GDP exposure alone.",
};

type Cell = { label: string; body: string };
type WhyPart = { em: string; body: string };

const CASES: {
  occ: string;
  desire: Cell;
  gdpval: Cell;
  jobbench: Cell;
  why: WhyPart[];
}[] = [
  {
    occ: "Reporters · Journalists",
    desire: {
      label: "Fact-checking",
      body: "check reference materials — books, news files, public records — to obtain relevant facts.",
    },
    gdpval: {
      label: "Article edit",
      body: "edit a story from a source packet and return one publishable article.",
    },
    jobbench: {
      label: "Cross-year evidence synthesis",
      body: "cross-reference water-quality CSVs, EPA guidance, and surveillance data across years; verify threshold exceedances, identify high-risk communities, and assemble a multi-part editorial package.",
    },
    why: [
      {
        em: "JobBench aligns with the real reporting burden",
        body: " by requiring cross-dataset verification before publication; ",
      },
      {
        em: "GDPval captures only article editing",
        body: " after the source packet has already been assembled.",
      },
    ],
  },
  {
    occ: "Technical Sales Reps",
    desire: {
      label: "Proposal explanation",
      body: "prepare sales presentations or proposals that explain product specifications or applications.",
    },
    gdpval: {
      label: "Quote revision",
      body: "revise a quotation from pricing and freight references.",
    },
    jobbench: {
      label: "Bid-response package assembly",
      body: "integrate an RFQ, site survey, internal pricing, product catalog, and competitor quote; verify certifications and build a compliance matrix.",
    },
    why: [
      {
        em: "JobBench aligns with the real pre-sale burden",
        body: " by requiring proposal assembly across specs, pricing, compliance, and competitor context; ",
      },
      {
        em: "GDPval captures only isolated quote revision",
        body: ".",
      },
    ],
  },
  {
    occ: "Lawyers",
    desire: {
      label: "Statute study + outcome analysis",
      body: "study statutes, regulations, and ordinances, and analyze likely case outcomes using legal precedents.",
    },
    gdpval: {
      label: "Closed-world memo",
      body: "draft a memo from a self-contained fact pattern.",
    },
    jobbench: {
      label: "Settlement evaluation + takings analysis",
      body: "query a multi-table STR property database for per-property fine exposure and lost-income projections, apply Penn Central and Hignell-Stark to the Town's offer, and draft a comparative ordinance table plus a case-law-grounded counter-proposal.",
    },
    why: [
      {
        em: "JobBench aligns with the real legal-preparation burden",
        body: " by requiring quantitative fine-exposure calculations, precedent application (Penn Central, Hignell-Stark), and an actionable counter-proposal; ",
      },
      {
        em: "GDPval captures only closed-world memo analysis",
        body: " from a self-contained fact pattern.",
      },
    ],
  },
];

// Row metadata — bg = colored panel, ink = body text, accent = bold-prefix emphasis
const ROW_META = [
  {
    key: "desire",
    label: "Real expert-reported desire",
    bg: "#e8ddc9",
    stripe: "#c9a66a",
    ink: "#3d3220",
    accent: "#2c5175",
  },
  {
    key: "gdpval",
    label: "GDPval",
    bg: "#d9e6d4",
    stripe: "#6b9a6a",
    ink: "#2a3f2e",
    accent: "#1f4d2a",
  },
  {
    key: "jobbench",
    label: "JobBench",
    bg: "#f1d2c3",
    stripe: "#c06756",
    ink: "#4a1e12",
    accent: "#7a2d1a",
  },
  {
    key: "why",
    label: "Why JobBench aligns",
    bg: "#e1bfb1",
    stripe: "#8a3d2b",
    ink: "#3d1408",
    accent: "#5a1c0f",
  },
] as const;

type RowKey = (typeof ROW_META)[number]["key"];

function CellContent({
  occ,
  rowKey,
  accent,
}: {
  occ: (typeof CASES)[number];
  rowKey: RowKey;
  accent: string;
}) {
  if (rowKey === "why") {
    return (
      <>
        {occ.why.map((part, i) => (
          <span key={i}>
            <strong style={{ color: accent, fontWeight: 700 }}>
              {part.em}
            </strong>
            {part.body}
          </span>
        ))}
      </>
    );
  }
  const cell = occ[rowKey] as Cell;
  return (
    <>
      <strong style={{ color: accent, fontWeight: 700 }}>
        {cell.label}:
      </strong>{" "}
      {cell.body}
    </>
  );
}

export default function BlogPost() {
  return (
    <>
      <ReadingProgress />
      <SectionIndicator sections={SECTIONS} />
      <Navbar />
      <main className="flex-1 pt-28 pb-24">
        <article className="mx-auto max-w-[680px] px-5 sm:px-8">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] font-mono text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors"
            >
              <span aria-hidden>←</span> Back to benchmark
            </Link>
          </div>

          {/* Meta */}
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--ink-faint)] tracking-widest uppercase mb-6">
              <span className="inline-block h-px w-8 bg-[var(--rule-strong)]" />
              <span>Blog</span>
              <span className="text-[var(--ink-ghost)]">·</span>
              <span>Apr 17, 2026</span>
              <span className="text-[var(--ink-ghost)]">·</span>
              <span>JobBench Team</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="intro"
              className="scroll-mt-24 font-display text-[2.1rem] sm:text-[2.7rem] leading-[1.08] text-[var(--ink)] mb-5"
              style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              JobBench: Aligning Agent Work with{" "}
              <span className="font-emph text-[var(--accent)] align-middle">
                Human Desire
              </span>
            </h1>

            <p className="text-[14.5px] text-[var(--ink-soft)] leading-[1.65] mb-10 max-w-[58ch]">
              Measuring agents by GDP alone asks how much of a human&apos;s job
              can be <span className="chip-dark">taken away</span>. Measuring
              agents by human desire asks how much of that job can be{" "}
              <span className="chip-accent">given back</span>.
            </p>
          </Reveal>

          {/* Agent decoration */}
          <Reveal delay={140}>
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-[var(--rule)]">
              <div className="crt-frame shrink-0">
                <div className="agent-bob">
                  <PixelAgent scale={4} />
                </div>
              </div>
              <div className="text-[13px] text-[var(--ink-faint)] leading-relaxed">
                <div className="label mb-1">agent_01 says</div>
                <em
                  className="font-display text-[16px] text-[var(--ink)]"
                  style={{ fontStyle: "italic" }}
                >
                  &ldquo;Let me reconcile. You decide.&rdquo;
                </em>
              </div>
            </div>
          </Reveal>

          {/* Body */}
          <Reveal>
            <div className="prose-body">
              <p className="first-para">
                The conversation about AI in the workplace has been framed
                almost entirely in economic terms:{" "}
                <em>
                  What fraction of working hours can agents absorb? How much of
                  GDP is exposed to automation?
                </em>{" "}
                Benchmarks like OpenAI&apos;s GDPval inherit this framing by
                design — they select tasks that represent economic value, and
                score agents on whether they can deliver the professional
                knowledge output.
              </p>

              <p className="callout-rule">
                We believe this framing, on its own, is not enough.
              </p>

              <p>
                If agents are going to share the professional workplace with
                humans, the question is not only{" "}
                <em>what work is most economically valuable to automate</em>,
                but{" "}
                <em>
                  what work do the humans in that role actually want automated
                </em>
                ? This is a humanist problem: it treats the professional not as
                labor to be displaced, but as a collaborator whose judgment
                about their own craft matters.
              </p>
            </div>
          </Reveal>

          {/* Pull quote */}
          <Reveal delay={60}>
            <blockquote className="pull-quote">
              What work do the humans in that role actually{" "}
              <span className="font-emph text-[var(--accent)]">want</span>{" "}
              automated?
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="prose-body">
              <p>
                Ask a lawyer, a reporter, a biostatistician what they want an
                agent to take off their plate, and the answer is remarkably
                consistent: what they want offloaded is the tedious,
                high-volume, error-prone pre-processing that stands between
                them and the work they actually value — reconciling
                contradictory data sources, cross-referencing claims against
                raw records, pulling facts out of messy document dumps, tracing
                citations through cases.
              </p>

              <p>
                JobBench is a benchmark built on that principle. Every one of
                its 60+ tasks across 30+ professions — lawyers, reporters,
                biostatisticians, civil engineers, financial managers,
                petroleum engineers, court clerks, supply chain managers, and
                more — is constructed from the work experts in that field say
                they most want a capable agent to handle.
              </p>

              <p>
                We design tasks on top of <strong>Workbank</strong>, a
                worker-centered survey in which more than 1,500 workers, for
                each O*NET task summary of their own occupation, indicate
                whether they would want an AI agent to take that work over.
                From Workbank we selected the 30+ occupations at the
                intersection of high average worker desire for automation and
                high economic impact. Within each occupation, we sampled the
                task summaries rated highest in automation desire and, through
                annotators, experts, and AI assistance, designed them into
                full benchmark evaluations.
              </p>
            </div>
          </Reveal>

          <PixelDivider />

          <Reveal>
            <h2 id="reasoning" className="section-h2 scroll-mt-24">
              From knowledge delivery to professional reasoning
            </h2>
            <div className="prose-body">
              <p>
                GDPval tasks test whether an agent can produce{" "}
                <em>knowledge delivery</em> from clean inputs — a legal memo
                from a statute summary, a news report from a press release.
                JobBench tests whether it can hold messy, contradictory
                information streams in one head and analyze them with{" "}
                <em>professional reasoning integrity</em>: bringing in domain
                knowledge, triangulating across multiple heterogeneous sources,
                and following thin clues out to external documents. The
                deliverable is not only the memo or the article, but the
                reasoning chain behind it — the part that experienced
                professionals spend most of their hours on, and most want to
                hand off.
              </p>
            </div>
          </Reveal>

          {/* Case study panels */}
          <div
            id="case-study"
            className="scroll-mt-24 not-prose my-12 max-w-none -mx-2 sm:-mx-8 md:-mx-20 lg:-mx-32"
          >
            <Reveal>
              <div className="mb-4 px-2 sm:px-8">
                <div className="label mb-1.5">Case study</div>
                <p className="font-display text-[17px] sm:text-[19px] text-[var(--ink)] leading-snug max-w-[60ch]" style={{ fontWeight: 500 }}>
                  JobBench aligns better with human desire.
                </p>
                <p className="text-[13px] text-[var(--ink-soft)] mt-1.5 max-w-[70ch] leading-relaxed">
                </p>
              </div>
            </Reveal>

            {/* Table grid */}
            <Reveal>
              <div className="px-2 sm:px-8 mt-6 overflow-x-auto">
                <div
                  className="reveal-grid grid gap-2 min-w-[880px]"
                  style={{
                    gridTemplateColumns:
                      "minmax(160px, 200px) repeat(3, minmax(240px, 1fr))",
                  }}
                >
                  <div />
                  {CASES.map((c) => (
                    <div key={c.occ} className="px-3 pb-1">
                      <div className="label mb-1">Occupation</div>
                      <div
                        className="font-display text-[15px] text-[var(--ink)]"
                        style={{ fontWeight: 600 }}
                      >
                        {c.occ}
                      </div>
                    </div>
                  ))}

                  {ROW_META.map((r, idx) => (
                    <div key={r.key} className="contents">
                      <div
                        className="case-row rounded-l-md flex items-start gap-3 px-4 py-5"
                        style={{
                          backgroundColor: r.bg,
                          borderLeft: `4px solid ${r.stripe}`,
                        }}
                      >
                        <div>
                          <div
                            className="font-mono text-[10px] tracking-widest uppercase mb-1.5"
                            style={{ color: r.accent, opacity: 0.85 }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <div
                            className="font-display text-[15px] leading-tight"
                            style={{ color: r.accent, fontWeight: 700 }}
                          >
                            {r.label}
                          </div>
                        </div>
                      </div>

                      {CASES.map((c, ci) => (
                        <div
                          key={c.occ}
                          className={`case-row px-4 py-5 text-[13.5px] leading-[1.6] ${
                            ci === CASES.length - 1 ? "rounded-r-md" : ""
                          }`}
                          style={{ backgroundColor: r.bg, color: r.ink }}
                        >
                          <CellContent
                            occ={c}
                            rowKey={r.key}
                            accent={r.accent}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <h2 id="evaluation" className="section-h2 scroll-mt-24">
              Evaluation that rewards reasoning integrity
            </h2>
            <div className="prose-body">
              <p>
                <strong>2,066 binary evaluation criteria</strong>, with an
                average of 32 criteria per task. Every criterion is anchored to
                deterministic numbers, specific reasoning steps, or documented
                professional judgments. Scores are rewarded only if the entire
                reasoning chain behind them is sound — no partial credit for
                surfacing the right fact via a wrong inference. This mirrors
                how senior professionals actually evaluate junior work, and it
                exposes a reasoning gap that inclusion-based knowledge
                checklists conceal.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 id="enhancement" className="section-h2 scroll-mt-24">
              Enhancement, not replacement
            </h2>
            <div className="prose-body">
              <p>
                The better future of human–AI collaboration is not only the one
                in which agents fully replace human professionals. It is one in
                which agents take on the tedious, massive, error-prone work
                that experts have long wanted to be free of — the data
                reconciliation, the cross-referencing, the fact-checking
                against contradictory sources — so that humans can spend more
                of their time on what their training and judgment are uniquely
                for:{" "}
                <em>deciding, advocating, creating, and caring</em>.
              </p>
            </div>
          </Reveal>

          {/* Kicker */}
          <Reveal>
            <aside
              id="kicker"
              className="scroll-mt-24 mt-14 pt-10 border-t border-[var(--rule)]"
            >
              <p
                className="font-display text-[17px] sm:text-[19px] leading-[1.55] text-[var(--ink)] max-w-[54ch]"
                style={{ fontWeight: 500, fontStyle: "italic" }}
              >
                Measuring agents by GDP alone asks how much of a human&apos;s
                job can be <span className="chip-dark">taken away</span>.
                Measuring agents by human desire asks how much of that job
                can be <span className="chip-accent">given back</span>. That is
                the premise of JobBench — a picture that economics cannot
                complete alone.
              </p>
              <div className="label mt-6">— JobBench Team</div>
            </aside>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href="/#leaderboard"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--paper-raised)] hover:bg-[var(--accent)] transition-colors"
            >
              Explore the leaderboard →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--rule-strong)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper-raised)] transition-colors"
            >
              Back to JobBench
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
