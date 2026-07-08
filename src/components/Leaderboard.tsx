"use client";

import { useState, useMemo } from "react";
import data from "@/data/leaderboard.json";
import { PixelBar } from "./PixelArt";

const FAMILY_VAR: Record<string, string> = {
  Anthropic: "var(--fam-anthropic)",
  OpenAI: "var(--fam-openai)",
  Google: "var(--fam-google)",
  xAI: "var(--fam-xai)",
  Moonshot: "var(--fam-moonshot)",
  Alibaba: "var(--fam-alibaba)",
  MiniMax: "var(--fam-minimax)",
  Zhipu: "var(--fam-zhipu)",
  Meta: "var(--fam-meta)",
  Other: "var(--fam-other)",
};

const FAMILY_LOGO: Record<string, string> = {
  Anthropic: "/logos/claude_flower.png",
  OpenAI: "/logos/openai_logo.png",
  Google: "/logos/gemini.png",
  xAI: "/logos/xai.png",
  Moonshot: "/logos/moonshot.png",
  Alibaba: "/logos/qwen.png",
  MiniMax: "/logos/minimax.png",
  Zhipu: "/logos/zhipu.png",
  Meta: "/logos/meta.png",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank > 3) {
    return (
      <span className="tnum text-[var(--ink-faint)] font-mono text-[12px]">
        {rank.toString().padStart(2, "0")}
      </span>
    );
  }
  const cls = rank === 1 ? "medal-1" : rank === 2 ? "medal-2" : "medal-3";
  return (
    <span
      className={`${cls} tnum inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-display`}
      style={{ fontWeight: 600 }}
    >
      {rank}
    </span>
  );
}

export default function Leaderboard() {
  const [familyFilter, setFamilyFilter] = useState<string>("All");

  const families = useMemo(() => {
    const s = new Set(data.leaderboard.map((m) => m.family));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    let items = [...data.leaderboard];
    if (familyFilter !== "All")
      items = items.filter((m) => m.family === familyFilter);
    items.sort((a, b) => a.rank - b.rank);
    return items;
  }, [familyFilter]);

  const maxScore = Math.max(...data.leaderboard.map((m) => m.overallScore));

  return (
    <section
      id="leaderboard"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <div className="label mb-3">§ 02 — Rankings</div>
          <h2
            className="font-display text-[1.9rem] sm:text-[2.25rem] leading-tight text-[var(--ink)]"
            style={{ fontWeight: 500 }}
          >
            Model leaderboard
          </h2>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Family</span>
            {families.map((f) => (
              <button
                key={f}
                onClick={() => setFamilyFilter(f)}
                className="pill"
                data-active={familyFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] px-5 sm:px-7 py-5">
          <div className="space-y-[7px]">
            {filtered.map((m) => (
              <div
                key={m.model}
                className="grid grid-cols-[24px_180px_1fr_auto] sm:grid-cols-[32px_220px_1fr_auto] items-center gap-3 group"
              >
                <div className="flex items-center justify-center">
                  <RankBadge rank={m.rank} />
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[var(--ink)] font-medium min-w-0">
                  {FAMILY_LOGO[m.family] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={FAMILY_LOGO[m.family]}
                      alt=""
                      width={18}
                      height={18}
                      className="shrink-0 rounded-sm"
                      style={{ objectFit: "contain" }}
                    />
                  ) : null}
                  <span className="truncate">{m.displayName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <PixelBar
                      value={m.overallScore}
                      max={maxScore * 1.08}
                      color={FAMILY_VAR[m.family] || FAMILY_VAR.Other}
                      segments={20}
                      height={12}
                    />
                  </div>
                  <span className="tnum text-[12px] font-mono text-[var(--ink)] w-10 text-right">
                    {m.overallScore.toFixed(1)}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 w-28 justify-end text-[11px] text-[var(--ink-faint)] font-mono">
                  <span
                    className="inline-block w-[6px] h-[6px] rounded-full"
                    style={{
                      backgroundColor:
                        FAMILY_VAR[m.family] || FAMILY_VAR.Other,
                    }}
                  />
                  <span className="truncate">{m.framework}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[12px] text-[var(--ink-faint)] font-mono">
          All models run on the same harness — OpenCode v1.14.18 — with
          corresponding max reasoning effort. Grok 4.3 is used as the rubric
          judge. (Earlier runs used Grok 4.1 Fast, since retired by xAI, so
          scores may differ slightly from previously reported results.) The
          Grok judges are chosen mainly for cost: one full eval pass costs
          ~$2 with Grok 4.1 Fast and ~$20 with Grok 4.3. Claude Fable 5 runs
          with fallback to Claude Opus 4.8 on refusals.
        </p>

      </div>
    </section>
  );
}
