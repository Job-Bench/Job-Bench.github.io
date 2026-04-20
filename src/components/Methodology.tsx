"use client";

import { useState } from "react";

const PRINCIPLES = [
  {
    num: "i",
    title: "Human-desire grounded",
    line: "Built on 1,500+ professionals rating which of their own tasks they want delegated to AI.",
  },
  {
    num: "ii",
    title: "Professional reasoning, not knowledge delivery",
    line: "Agents must triangulate contradictory sources and show the reasoning chain — not just the answer.",
  },
  {
    num: "iii",
    title: "Fact-anchored rubrics",
    line: "Every rubric is binary and anchored — no credit for a right answer via wrong reasoning.",
  },
  {
    num: "iv",
    title: "Heterogeneous real-world data",
    line: "SQLite, multi-year CSVs, regulatory PDFs, contradictory disclosures — the pre-processing experts most want offloaded.",
  },
];

export default function Methodology() {
  const [open, setOpen] = useState<string | null>("i");

  return (
    <section
      id="methodology"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="label mb-3">§ 04 — Methodology</div>
          <h2
            className="font-display text-[1.7rem] sm:text-[2rem] leading-tight text-[var(--ink)]"
            style={{ fontWeight: 600 }}
          >
            From knowledge delivery to{" "}
            <span className="font-emph text-[var(--accent)] align-middle">
              professional reasoning
            </span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {PRINCIPLES.map((p) => {
            const isOpen = open === p.num;
            return (
              <button
                key={p.num}
                type="button"
                onClick={() => setOpen(isOpen ? null : p.num)}
                aria-expanded={isOpen}
                className={`group relative text-left overflow-hidden rounded-lg border bg-[var(--paper-raised)] px-7 pt-5 pb-6 min-h-[200px] flex flex-col transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  isOpen
                    ? "border-[var(--accent)]"
                    : "border-[var(--rule)] hover:border-[var(--rule-strong)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-emph text-[var(--accent)] text-[13px]"
                    style={{ fontWeight: 400 }}
                  >
                    {p.num}.
                  </span>
                  <span
                    aria-hidden
                    className={`text-[var(--ink-faint)] text-lg leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-[var(--accent)]" : ""
                    }`}
                  >
                    +
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-6">
                  <h3
                    className="font-display text-[var(--ink)] text-[1.4rem] sm:text-[1.55rem] leading-[1.15] text-center"
                    style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    {p.title}
                  </h3>
                </div>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pt-3 mt-1 border-t border-[var(--rule)] transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
                        {p.line}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
