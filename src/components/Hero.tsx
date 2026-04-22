import data from "@/data/leaderboard.json";
import AnimatedNumber from "./AnimatedNumber";
import HeroAgentScene from "./HeroAgentScene";
import AgentHoldingLogo from "./AgentHoldingLogo";

export default function Hero() {
  const top = data.leaderboard[0];
  const HERO_STATS = [
    { label: "Professions", value: data.totalCategories },
    { label: "Tasks", value: data.totalTasks },
    { label: "Criteria", value: data.totalCriteria },
  ];

  return (
    <section className="relative pt-32 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Row 1: headline spans both columns */}
        <h1
          className="fade-in-1 font-display text-[2.2rem] sm:text-[2.9rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[3.9rem] leading-[1.06] text-[var(--ink)] mb-8 mt-6"
          style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
        >
          JobBench: Aligning Agent Work with{" "}
          <em
            className="font-emph text-[var(--accent)]"
            style={{ fontStyle: "italic" }}
          >
            Human Will
          </em>
        </h1>

        {/* Row 2: description (left) · pixel scene (right, shifted down) */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-12 items-start mb-12">
          <div className="min-w-0">
            <p className="fade-in-2 max-w-[82ch] text-[15.5px] sm:text-[16.5px] leading-[1.65] text-[var(--ink-soft)] mb-3">
              Measuring agents by GDP alone asks how much of a human&apos;s job
              can be <span className="chip-dark">taken away</span>.
            </p>
            <p className="fade-in-2 max-w-[72ch] text-[15.5px] sm:text-[16.5px] leading-[1.65] text-[var(--ink-soft)] mb-8">
              JobBench asks how much of that job can be{" "}
              <span className="chip-accent">given back</span> — built on the
              work that experts across real-world professions actually want
              delegated to AI.
            </p>

            <div className="fade-in-3 flex flex-col items-start gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#leaderboard"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--paper-raised)] hover:bg-[var(--accent)] transition-colors"
                >
                  Leaderboard
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--rule-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper-raised)] transition-colors"
                >
                  Blog
                </a>
                <a
                  href="mailto:yuetaili00@gmail.com"
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--rule-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper-raised)] transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/Job-Bench/job-bench-eval"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://huggingface.co/JobBench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  Hugging Face ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right column on desktop; stacks below CTAs on mobile */}
          <div className="flex justify-center lg:justify-end pt-2 lg:pt-6 fade-in-3">
            <HeroAgentScene />
          </div>
        </div>

        {/* Mobile callout: full-width stacked leader row, then 3-col stats */}
        <div className="fade-in-3 md:hidden border-t border-[var(--rule)] pt-8">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <AgentHoldingLogo agentScale={4} logoScale={3} />
              <span className="label text-[9px]">agent_01</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="label mb-1">Current leader</div>
              <div
                className="font-display text-[1.35rem] leading-[1.15] text-[var(--ink)] break-words"
                style={{ fontWeight: 600 }}
              >
                {top.displayName}
              </div>
              <div className="text-[12px] text-[var(--ink-faint)] mt-1 break-words">
                {top.family} · via {top.framework}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span className="label">Weighted score</span>
            <span
              className="font-display tnum text-[2.25rem] leading-none text-[var(--accent)]"
              style={{ fontWeight: 600 }}
            >
              {top.overallScore.toFixed(1)}
              <span className="text-[1.1rem] text-[var(--accent)]/70 ml-0.5">%</span>
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--rule)] pt-5">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <AnimatedNumber target={s.value} />
                <div className="label mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop callout: leader + score (left) · benchmark stats (right) */}
        <div className="fade-in-3 hidden md:grid md:grid-cols-2 items-center gap-12 border-t border-[var(--rule)] pt-8">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <AgentHoldingLogo agentScale={4} logoScale={3} />
              <span className="label text-[9px]">agent_01</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="label mb-1">Current leader</div>
              <div
                className="font-display text-2xl lg:text-[1.75rem] text-[var(--ink)] leading-[1.15] break-words"
                style={{ fontWeight: 600 }}
              >
                {top.displayName}
              </div>
              <div className="text-[13px] text-[var(--ink-faint)] mt-1">
                {top.family} · via {top.framework}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="label mb-2">Weighted score</div>
              <div
                className="font-display tnum text-[2.5rem] lg:text-[2.75rem] leading-none text-[var(--accent)]"
                style={{ fontWeight: 600 }}
              >
                {top.overallScore.toFixed(1)}
                <span className="text-[1.25rem] text-[var(--accent)]/70 ml-1">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 border-l border-[var(--rule)] pl-12">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <AnimatedNumber target={s.value} />
                <div className="label mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
