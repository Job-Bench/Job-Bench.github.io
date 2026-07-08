"use client";

import { useState } from "react";
import Link from "next/link";
import { PixelAgent } from "./PixelArt";

type Row = [string, React.ReactNode];

const GDPVAL_ROWS: Row[] = [
  ["Task selection", "By economic exposure"],
  ["What it measures", "Knowledge delivery from clean inputs"],
  ["The professional", "Labor to be displaced"],
];

const JOBBENCH_ROWS: Row[] = [
  [
    "Task selection",
    <>
      From{" "}
      <strong className="text-[var(--ink)]" style={{ fontWeight: 600 }}>
        Workbank
      </strong>{" "}
      — 1,500+ workers&apos; automation preferences
    </>,
  ],
  [
    "What it measures",
    "Professional reasoning across messy, contradictory sources",
  ],
  [
    "The professional",
    <>
      A craft to be{" "}
      <strong className="text-[var(--ink)]" style={{ fontWeight: 600 }}>
        enhanced
      </strong>
      , not replaced
    </>,
  ],
];

export default function Thesis() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="thesis"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <div
            className="label mb-4"
            style={{ fontSize: "13px", letterSpacing: "0.18em" }}
          >
            § 01 — Why Human Will
          </div>

          <div className="grid gap-x-10 gap-y-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end mb-8">
            <h2
              className="font-display text-[1.9rem] sm:text-[2.25rem] leading-[1.1] text-[var(--ink)] max-w-[22ch]"
              style={{ fontWeight: 600, letterSpacing: "-0.018em" }}
            >
              Economics alone is not enough.
            </h2>

            {/* Editorial pixel-agent vignette, balances right-side whitespace */}
            <div className="hidden md:flex items-end gap-4 shrink-0 pb-1">
              <div className="crt-frame shrink-0">
                <div className="agent-bob">
                  <PixelAgent scale={3} />
                </div>
              </div>
              <div className="text-[12px] text-[var(--ink-faint)] leading-relaxed pb-1 max-w-[18ch]">
                <div className="label mb-1">agent_01 says</div>
                <em
                  className="font-display text-[14px] text-[var(--ink)]"
                  style={{ fontStyle: "italic" }}
                >
                  &ldquo;Let me reconcile. You decide.&rdquo;
                </em>
              </div>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-5 md:grid-cols-2 text-[15px] text-[var(--ink-soft)] leading-[1.72]">
            <div className="space-y-5">
              <p>
                The conversation about AI in the workplace has been framed
                almost entirely in economic terms:{" "}
                <em
                  className="text-[var(--ink)]"
                  style={{ fontStyle: "italic" }}
                >
                  what fraction of working hours can agents absorb? how much of
                  GDP is exposed to automation?
                </em>{" "}
                Benchmarks like OpenAI&apos;s{" "}
                <strong
                  className="text-[var(--ink)]"
                  style={{ fontWeight: 700 }}
                >
                  GDPval
                </strong>{" "}
                inherit this framing by design — they select tasks that
                represent economic value, and score agents on whether they can
                deliver the professional knowledge output.
              </p>

              <p
                className="pl-4 text-[var(--ink)] text-[17px]"
                style={{
                  borderLeft: "3px solid var(--accent)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: "-0.002em",
                }}
              >
                We believe this framing, on its own, is not enough.
              </p>
            </div>

            <p>
              If agents are going to share the professional workplace with
              humans, the question is not only{" "}
              <em className="text-[var(--ink)]" style={{ fontStyle: "italic" }}>
                what work is most economically valuable to automate
              </em>
              , but{" "}
              <em className="text-[var(--ink)]" style={{ fontStyle: "italic" }}>
                what work do the humans in that role actually want automated?
              </em>{" "}
              This is a{" "}
              <strong style={{ color: "var(--accent)", fontWeight: 700 }}>
                humanist problem
              </strong>
              . It treats the professional not as labor to be displaced, but as
              a collaborator whose judgment about their own craft matters — and
              it is the premise JobBench is built on.
            </p>
          </div>
        </header>

        {/* Two-column framing contrast */}
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          {/* GDPval side */}
          <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] px-5 sm:px-6 py-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: "var(--ink-faint)" }}
              >
                The economic question
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <h3
                className="font-display text-[1.1rem] text-[var(--ink)]"
                style={{ fontWeight: 700, letterSpacing: "-0.012em" }}
              >
                GDPval
              </h3>
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--ink-faint)" }}
              >
                OpenAI
              </span>
            </div>
            <p
              className={`text-[14px] text-[var(--ink-soft)] leading-[1.55] ${
                open ? "mb-4 pb-4 border-b border-[var(--rule)]" : ""
              }`}
              style={{ fontStyle: "italic" }}
            >
              &ldquo;What fraction of a human&apos;s job is economically
              valuable to automate?&rdquo;
            </p>
            {open && (
              <ul className="space-y-2.5 text-[13px] text-[var(--ink-soft)] leading-[1.5]">
                {GDPVAL_ROWS.map(([k, v]) => (
                  <li
                    key={String(k)}
                    className="grid grid-cols-[92px_1fr] gap-3"
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest pt-[2px]"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {k}
                    </span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* VS divider */}
          <div className="hidden md:flex items-center justify-center px-1">
            <span
              className="font-display text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "var(--ink-faint)" }}
            >
              vs
            </span>
          </div>

          {/* JobBench side */}
          <div
            className="rounded-lg border bg-[var(--paper-raised)] px-5 sm:px-6 py-5 relative"
            style={{
              borderColor: "var(--accent)",
              boxShadow: "3px 3px 0 var(--accent)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                The humanist question
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <h3
                className="font-display text-[1.1rem] text-[var(--ink)]"
                style={{ fontWeight: 700, letterSpacing: "-0.012em" }}
              >
                JobBench
              </h3>
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--accent)", opacity: 0.8 }}
              >
                Ours
              </span>
            </div>
            <p
              className={`text-[14px] text-[var(--ink)] leading-[1.55] ${
                open ? "mb-4 pb-4" : ""
              }`}
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                borderBottom: open ? "1px solid var(--rule)" : "none",
              }}
            >
              &ldquo;What work do the humans in that role actually want
              automated?&rdquo;
            </p>
            {open && (
              <ul className="space-y-2.5 text-[13px] text-[var(--ink-soft)] leading-[1.5]">
                {JOBBENCH_ROWS.map(([k, v], i) => (
                  <li key={i} className="grid grid-cols-[92px_1fr] gap-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest pt-[2px]"
                      style={{ color: "var(--accent)", opacity: 0.85 }}
                    >
                      {k}
                    </span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-[12px] font-mono text-[var(--ink-faint)] hover:text-[var(--accent)] transition-colors"
          >
            {open ? "Hide comparison details" : "Show comparison details"}
            <span aria-hidden>{open ? "▲" : "▼"}</span>
          </button>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-mono text-[var(--ink-faint)] hover:text-[var(--accent)] transition-colors"
          >
            Read the full essay <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
