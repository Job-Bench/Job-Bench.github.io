// Figures sourced from the JobBench paper, Section "GDPval saturation vs.
// JobBench headroom" (colm2026_conference, figures/jobbench_vs_gdpval_saturation_complexity.pdf).
const SCORE_SERIES = [
  { label: "GPT-5.2 Codex", gdpval: 70.9, jobbench: 24.8 },
  { label: "GPT-5.3 Codex", gdpval: 70.9, jobbench: 33.07 },
  { label: "GPT-5.4", gdpval: 83.0, jobbench: 37.16 },
] as const;

const WORKLOAD = [
  { label: "Wall-clock per task", ratio: 1.64 },
  { label: "Tool calls per task", ratio: 1.33 },
  { label: "Trajectory lines", ratio: 1.30 },
] as const;

function ScoreRow({
  label,
  note,
  score,
  colorVar,
}: {
  label: string;
  note: string;
  score: number;
  colorVar: string;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-[var(--ink)]" style={{ fontWeight: 500 }}>
          {label}
        </span>
        <span className="font-mono text-[11px] text-[var(--ink-faint)]">{note}</span>
      </div>
      <div className="relative h-10 rounded-[3px] bg-[var(--paper-sunken)] overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 flex items-center"
          style={{ width: `${score}%`, background: colorVar }}
        >
          <span className="ml-3 font-mono text-[13.5px] tnum text-[var(--paper-raised)] font-semibold whitespace-nowrap">
            {score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SaturationCompare() {
  const leader = SCORE_SERIES[SCORE_SERIES.length - 1];
  const headroom = 100 - leader.jobbench;

  return (
    <section
      id="saturation"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-[58ch]">
          <div className="label mb-3">§ 03 — Headroom</div>
          <h2
            className="font-display text-[1.9rem] sm:text-[2.25rem] leading-tight text-[var(--ink)]"
            style={{ fontWeight: 500 }}
          >
            Far from saturation
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Score trajectory — main panel */}
          <div className="md:col-span-2 rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] p-6 sm:p-7">
            <div className="flex items-baseline justify-between mb-6">
              <div className="text-[13px] text-[var(--ink-soft)]">
                {leader.label}
              </div>
              <span className="font-mono text-[10.5px] text-[var(--ink-faint)] hidden sm:inline">
                0 ———— 100
              </span>
            </div>

            <ScoreRow
              label="GDPval"
              note="saturating"
              score={leader.gdpval}
              colorVar="var(--fam-openai)"
            />
            <ScoreRow
              label="JobBench"
              note={`${headroom.toFixed(0)} pts headroom`}
              score={leader.jobbench}
              colorVar="var(--accent)"
            />

            <div className="mt-6 pt-4 border-t border-dashed border-[var(--rule)]">
              <div className="grid grid-cols-3 gap-3">
                {SCORE_SERIES.map((p) => (
                  <div key={p.label} className="text-[12px]">
                    <div className="font-mono text-[10.5px] text-[var(--ink-faint)] mb-1 truncate">
                      {p.label}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="tnum font-mono"
                        style={{ color: "var(--fam-openai)" }}
                      >
                        {p.gdpval.toFixed(1)}
                      </span>
                      <span className="text-[var(--ink-ghost)] font-mono text-[10px]">
                        /
                      </span>
                      <span
                        className="tnum font-mono"
                        style={{ color: "var(--accent)" }}
                      >
                        {p.jobbench.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Per-task workload — compact callouts */}
          <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] p-6 sm:p-7">
            <div className="mb-5">
              <div className="label mb-1">Workload</div>
              <div className="text-[13px] text-[var(--ink-soft)]">
                JobBench over GDPval
              </div>
            </div>

            <div className="space-y-4">
              {WORKLOAD.map((w, i) => (
                <div
                  key={w.label}
                  className={`flex items-baseline justify-between gap-3 ${
                    i < WORKLOAD.length - 1
                      ? "pb-4 border-b border-dashed border-[var(--rule)]"
                      : ""
                  }`}
                >
                  <span className="text-[13px] text-[var(--ink)]">
                    {w.label}
                  </span>
                  <span
                    className="font-mono tnum text-[1.65rem] leading-none"
                    style={{
                      color: "var(--accent)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {w.ratio.toFixed(2)}
                    <span
                      className="text-[var(--ink-faint)] text-[13px] font-mono ml-0.5"
                      style={{ fontWeight: 400 }}
                    >
                      &times;
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
