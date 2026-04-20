"use client";

import { useMemo, useState } from "react";
import { TASKS, type Source, type SourceType } from "@/data/tasks";
import { RolePixel } from "./PixelArt";
import {
  SourceTypeGlyph,
  RoleGlyph,
  BoltIcon,
  LightbulbIcon,
  FlowIcon,
  PackageIcon,
  LayersIcon,
  FilesIcon,
  SparkIcon,
} from "./TaskIcons";

function MustArrow({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 6h8.5" />
      <path d="M7 3l3 3-3 3" />
    </svg>
  );
}

const TYPE_META: Record<
  SourceType,
  { label: string; color: string; bg: string }
> = {
  db: { label: "DB", color: "#3b5f89", bg: "#dde5ee" },
  pdf: { label: "PDF", color: "#7a2d1a", bg: "#ecd6cf" },
  csv: { label: "CSV", color: "#4a7a5a", bg: "#d8e5db" },
  xlsx: { label: "XLS", color: "#a46f1f", bg: "#efe1c3" },
  txt: { label: "TXT", color: "#6d4a7a", bg: "#e0d5e5" },
  interview: { label: "INT", color: "#3d7b86", bg: "#cee1e4" },
};

function TypeBadge({ type }: { type: SourceType }) {
  const meta = TYPE_META[type];
  return (
    <span
      className="inline-flex items-center gap-1 tnum font-mono text-[10px] leading-none px-1.5 py-[3px] rounded-sm"
      style={{ color: meta.color, background: meta.bg, letterSpacing: "0.04em" }}
    >
      <SourceTypeGlyph type={type} size={10} color={meta.color} />
      {meta.label}
    </span>
  );
}

function DesireDial({ value }: { value: number }) {
  const pct = Math.round((value / 5) * 100);
  return (
    <div className="flex items-center gap-2">
      <div
        className="relative h-1.5 w-20 overflow-hidden rounded-full"
        style={{ background: "var(--paper-sunken)" }}
      >
        <div
          className="absolute inset-y-0 left-0 dial-grow"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, var(--accent) 0%, var(--accent-ink) 100%)",
          }}
        />
      </div>
      <span className="tnum font-mono text-[11px] text-[var(--ink)]">
        {value.toFixed(2)}<span className="text-[var(--ink-faint)]">/5</span>
      </span>
    </div>
  );
}

type ConflictLink = { partnerIdx: number; partnerName: string; label: string };

function SourceRow({
  source,
  index,
  conflicts,
  highlighted,
  expanded,
  onToggle,
  onHover,
}: {
  source: Source;
  index: number;
  conflicts: ConflictLink[];
  highlighted: boolean;
  expanded: boolean;
  onToggle: () => void;
  onHover: (i: number | null) => void;
}) {
  const hasConflict = conflicts.length > 0;
  return (
    <div
      className="source-row group"
      data-highlight={highlighted}
      data-conflict={hasConflict}
      data-expanded={expanded}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="source-row-col">
        <button
          type="button"
          className="source-row-head"
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <TypeBadge type={source.type} />
          <span className="font-mono text-[12px] text-[var(--ink)] truncate flex-1 min-w-0">
            {source.name}
          </span>
          {hasConflict && (
            <span
              className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider px-1.5 py-[2px] rounded-sm shrink-0"
              style={{
                color: "var(--alert)",
                background: "#f2d7d0",
                letterSpacing: "0.08em",
              }}
            >
              <BoltIcon size={9} color="var(--alert)" />
              {conflicts.length > 1 ? `${conflicts.length} tensions` : "tension"}
            </span>
          )}
          <span className="source-caret font-mono text-[11px] shrink-0" aria-hidden="true">
            {expanded ? "▾" : "▸"}
          </span>
        </button>

        <div className="source-row-body">
          <div className="source-row-body-inner">
            <p className="mt-1 text-[12px] leading-[1.5] text-[var(--ink-soft)]">
              {source.blurb}
            </p>
            {conflicts.map((c, i) => (
              <div key={i} className="source-conflict-line">
                <span className="scl-arrow" aria-hidden="true">
                  ↳
                </span>
                <span className="scl-bolt">
                  <BoltIcon size={9} color="var(--alert)" />
                </span>
                <span className="scl-text">
                  conflicts with{" "}
                  <span className="scl-partner">
                    {c.partnerName.split(".")[0]}
                  </span>
                  <span className="scl-em-dash"> — </span>
                  <span className="scl-label">{c.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="source-row-trail" aria-hidden="true">
        <span className="trail-dot" />
      </div>
    </div>
  );
}

function AgentNode({
  role,
  roleIcon,
}: {
  role: string;
  roleIcon: string;
}) {
  const roleLabel = role.split("—")[0].trim().toLowerCase();
  return (
    <div className="agent-node">
      <div className="role-pixel-frame" aria-label={`${roleLabel} sprite`}>
        <span className="role-pixel-sparkle rp-s1" />
        <span className="role-pixel-sparkle rp-s2" />
        <span className="role-pixel-sparkle rp-s3" />
        <div className="role-pixel-inner">
          <RolePixel role={roleIcon} scale={5} title={`${roleLabel} pixel art`} />
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="label">Agent</div>
        <div className="font-mono text-[10px] text-[var(--ink-faint)] mt-0.5 max-w-[140px] mx-auto leading-tight">
          reasoning over {roleLabel} sources
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({
  challenge,
  index,
  expanded,
  onToggle,
}: {
  challenge: { title: string; action: string; detail: string };
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="challenge-card text-left w-full"
      data-expanded={expanded}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="challenge-num font-mono tnum">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4
              className="font-display text-[14px] text-[var(--ink)] leading-tight"
              style={{ fontWeight: 500 }}
            >
              {challenge.title}
            </h4>
            <span
              className="challenge-caret font-mono text-[12px] text-[var(--ink-faint)] shrink-0"
              aria-hidden="true"
            >
              {expanded ? "–" : "+"}
            </span>
          </div>

          {/* Everything below the title folds together — context first, then
              the agent's TL;DR action line, all revealed on expand. */}
          <div className="challenge-body">
            <div className="challenge-body-inner">
              <div className="challenge-body-divider" />
              <p className="text-[12px] leading-[1.6] text-[var(--ink-soft)]">
                {challenge.detail}
              </p>
              <div className="challenge-action mt-3">
                <span
                  className="shrink-0 mt-[2px] inline-flex"
                  style={{ color: "var(--accent)" }}
                >
                  <MustArrow size={11} />
                </span>
                <p className="text-[12.5px] leading-[1.55] text-[var(--ink)]">
                  {challenge.action}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function TaskWorkflows() {
  const [idx, setIdx] = useState(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(0);
  const [hoveredSource, setHoveredSource] = useState<number | null>(null);
  const [expandedSources, setExpandedSources] = useState<Set<number>>(
    () => new Set()
  );
  const [heroOpenMobile, setHeroOpenMobile] = useState(false);

  const task = TASKS[idx];

  const conflictPartnersBySource = useMemo(() => {
    const m: Record<number, number[]> = {};
    task.conflicts.forEach((c) => {
      (m[c.a] ||= []).push(c.b);
      (m[c.b] ||= []).push(c.a);
    });
    return m;
  }, [task]);

  const conflictLinksBySource = useMemo(() => {
    const m: Record<number, ConflictLink[]> = {};
    task.conflicts.forEach((c) => {
      (m[c.a] ||= []).push({
        partnerIdx: c.b,
        partnerName: task.sources[c.b].name,
        label: c.label,
      });
      (m[c.b] ||= []).push({
        partnerIdx: c.a,
        partnerName: task.sources[c.a].name,
        label: c.label,
      });
    });
    return m;
  }, [task]);

  const fileTypes = useMemo(() => {
    const s = new Set(task.sources.map((x) => x.type));
    return s.size;
  }, [task]);

  const highlightedSources = useMemo(() => {
    const s = new Set<number>();
    if (hoveredSource != null) {
      s.add(hoveredSource);
      (conflictPartnersBySource[hoveredSource] || []).forEach((i) => s.add(i));
    }
    return s;
  }, [hoveredSource, conflictPartnersBySource]);

  const selectTask = (i: number) => {
    if (i === idx) return;
    setIdx(i);
    setExpandedChallenge(0);
    setHoveredSource(null);
    setExpandedSources(new Set());
  };

  const toggleSource = (i: number) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const expandAllSources = () => {
    setExpandedSources(new Set(task.sources.map((_, i) => i)));
  };

  const collapseAllSources = () => {
    setExpandedSources(new Set());
  };

  const allExpanded = expandedSources.size === task.sources.length;

  return (
    <section
      id="task-workflows"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="label mb-3">§ 05 — Inside a task</div>
          <h2
            className="font-display text-[1.8rem] sm:text-[2.15rem] leading-tight text-[var(--ink)] mb-3"
            style={{ fontWeight: 500 }}
          >
            What the agent is actually{" "}
            <span className="font-emph text-[var(--accent)]">up against</span>
          </h2>
          <p className="text-[14px] text-[var(--ink-soft)] max-w-2xl leading-[1.6]">
            Every JobBench task is a small dossier. Pick one role to see the
            details.
          </p>
        </header>

        {/* Role tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="label mr-1">Role</span>
          {TASKS.map((t, i) => (
            <button
              key={t.slug}
              onClick={() => selectTask(i)}
              className="pill"
              data-active={i === idx}
            >
              <RoleGlyph
                role={t.roleIcon}
                size={12}
                color={i === idx ? "var(--paper-raised)" : "var(--ink-soft)"}
              />
              {t.shortRole}
            </button>
          ))}
        </div>

        <div key={task.slug} className="task-panel">
          {/* Compact hero: title + dial on one row, then hook, why, ONET stacked clean */}
          <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] p-5 sm:p-6 mb-3 task-hero">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
              <h3
                className="font-display text-[20px] text-[var(--ink)] flex items-start gap-2 min-w-0 leading-[1.25]"
                style={{ fontWeight: 500 }}
              >
                <span
                  className="inline-flex items-center justify-center shrink-0 rounded-sm mt-[1px]"
                  style={{
                    width: 28,
                    height: 28,
                    background: "var(--accent-tint)",
                    color: "var(--accent-ink)",
                  }}
                >
                  <RoleGlyph role={task.roleIcon} size={16} />
                </span>
                <span className="break-words">{task.role}</span>
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="label">Automation desire</span>
                <DesireDial value={task.desire} />
              </div>
            </div>

            <div
              className="text-[14px] italic text-[var(--ink-soft)] leading-[1.55] border-l-2 pl-3 mb-3"
              style={{ borderColor: "var(--accent)" }}
            >
              {task.hook}
            </div>

            <button
              type="button"
              onClick={() => setHeroOpenMobile((v) => !v)}
              aria-expanded={heroOpenMobile}
              className="w-full flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--ink-faint)] hover:text-[var(--accent)] transition-colors py-1"
            >
              <span>
                {heroOpenMobile ? "Hide why desired" : "Show why desired"}
              </span>
              <span aria-hidden>{heroOpenMobile ? "▲" : "▼"}</span>
            </button>

            <div className={heroOpenMobile ? "block mt-2" : "hidden"}>
              <div className="flex items-start gap-2 text-[12.5px] text-[var(--ink-soft)] leading-[1.55]">
                <span
                  className="shrink-0 mt-[2px] inline-flex"
                  style={{ color: "var(--warn)" }}
                >
                  <LightbulbIcon size={13} />
                </span>
                <p>
                  <span
                    className="label mr-1"
                    style={{ color: "var(--warn)" }}
                  >
                    Why desired
                  </span>
                  {task.why}
                </p>
              </div>

              <p className="mt-2 text-[11.5px] text-[var(--ink-faint)] font-mono leading-[1.5]">
                <span className="text-[var(--ink-soft)]">
                  Corresponding O*NET:
                </span>{" "}
                {task.onet}
              </p>
            </div>
          </div>

          {/* Thin metadata strip — at-a-glance counts below hero */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 px-1 text-[11px] font-mono text-[var(--ink-faint)]">
            <span className="inline-flex items-center gap-1.5">
              <FilesIcon size={11} color="var(--ink-faint)" />
              <span className="text-[var(--ink)] tnum font-semibold">
                {task.sources.length}
              </span>{" "}
              sources
              <span className="text-[var(--ink-ghost)]">
                · {fileTypes} types
              </span>
            </span>
            <span className="text-[var(--ink-ghost)]">·</span>
            <span className="inline-flex items-center gap-1.5">
              <BoltIcon size={11} color="var(--alert)" />
              <span
                className="tnum font-semibold"
                style={{ color: "var(--alert)" }}
              >
                {task.conflicts.length}
              </span>{" "}
              contradictions
            </span>
          </div>

          {/* Main diagram: sources → agent → outputs */}
          <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] overflow-hidden mb-5">
            <div
              className="px-5 py-2.5 border-b border-[var(--rule)] flex items-center justify-between"
              style={{ background: "var(--paper-tint)" }}
            >
              <div className="label inline-flex items-center gap-1.5">
                <FlowIcon size={11} color="var(--ink-faint)" />
                Source flow
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={allExpanded ? collapseAllSources : expandAllSources}
                  className="font-mono text-[10px] text-[var(--ink-soft)] hover:text-[var(--ink)] underline decoration-dotted underline-offset-2 transition-colors"
                >
                  {allExpanded ? "collapse all" : "expand all"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_210px_220px] gap-0">
              {/* Sources column */}
              <div className="p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-[var(--rule)]">
                <div className="label mb-3 inline-flex items-center gap-1.5">
                  <LayersIcon size={11} color="var(--ink-faint)" />
                  Heterogeneous inputs
                </div>
                <div className="space-y-2">
                  {task.sources.map((s, i) => (
                    <SourceRow
                      key={i}
                      index={i}
                      source={s}
                      conflicts={conflictLinksBySource[i] || []}
                      highlighted={highlightedSources.has(i)}
                      expanded={expandedSources.has(i)}
                      onToggle={() => toggleSource(i)}
                      onHover={setHoveredSource}
                    />
                  ))}
                </div>
              </div>

              {/* Agent column */}
              <div
                className="relative flex items-center justify-center p-5 border-b lg:border-b-0 lg:border-r border-[var(--rule)]"
                style={{ background: "var(--paper)" }}
              >
                <AgentNode role={task.role} roleIcon={task.roleIcon} />
              </div>

              {/* Outputs column */}
              <div className="p-4 sm:p-5">
                <div className="label mb-3 inline-flex items-center gap-1.5">
                  <PackageIcon size={11} color="var(--ink-faint)" />
                  Deliverables
                </div>
                <ul className="space-y-2">
                  {task.outputs.map((o, i) => (
                    <li
                      key={i}
                      className="output-chip"
                      style={{ animationDelay: `${300 + i * 90}ms` }}
                    >
                      <span
                        className="output-dot"
                        style={{ background: "var(--accent)" }}
                      />
                      <span className="text-[13px] text-[var(--ink)] leading-tight">
                        {o}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Challenges */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-3">
              <h3
                className="font-display text-[16px] text-[var(--ink)] inline-flex items-center gap-2"
                style={{ fontWeight: 500 }}
              >
                <SparkIcon size={13} color="var(--accent)" />
                Reasoning challenges by design
              </h3>
              <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                click for full detail
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {task.challenges.map((c, i) => (
                <ChallengeCard
                  key={i}
                  challenge={c}
                  index={i}
                  expanded={expandedChallenge === i}
                  onToggle={() =>
                    setExpandedChallenge(expandedChallenge === i ? null : i)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
