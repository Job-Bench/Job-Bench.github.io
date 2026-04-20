"use client";

import { Fragment, useMemo, useState } from "react";
import data from "@/data/leaderboard.json";

type LeaderboardEntry = (typeof data.leaderboard)[number];

function getHeatClass(val: number): string {
  if (val <= 10) return "heat-0";
  if (val <= 20) return "heat-1";
  if (val <= 30) return "heat-2";
  if (val <= 40) return "heat-3";
  return "heat-4";
}

// Seven GDP7 domain buckets from the JobBench paper
// (Bus./Fin., Admin, Comp./Math., Arch./Eng., Mgmt., Arts, Other).
// Occupation → domain mapping follows BLS SOC major groups, with
// Legal / Sales / Science / Education collapsed into "Other" to
// mirror the paper's leaderboard table.
const DOMAINS = [
  { key: "busfin", label: "Business / Financial Ops", accent: "var(--fam-alibaba)" },
  { key: "admin", label: "Office / Admin Support", accent: "var(--fam-moonshot)" },
  { key: "compmath", label: "Computer / Mathematical", accent: "var(--fam-google)" },
  { key: "archeng", label: "Architecture / Engineering", accent: "var(--fam-anthropic)" },
  { key: "mgmt", label: "Management", accent: "var(--fam-xai)" },
  { key: "arts", label: "Arts / Media", accent: "var(--fam-minimax)" },
  { key: "other", label: "Other (Legal · Sales · Science · Edu.)", accent: "var(--fam-other)" },
] as const;

type DomainKey = (typeof DOMAINS)[number]["key"];

const OCC_DOMAIN: Record<string, DomainKey> = {
  // Business / Financial Ops
  bookkeeping_accounting_and_auditing_clerks: "busfin",
  human_resources_specialists: "busfin",
  licensing_examiners_and_inspectors: "busfin",
  management_analysts: "busfin",
  personal_financial_advisors: "busfin",
  purchasing_agents_except_wholesale_retail_and_farm_products: "busfin",
  training_and_development_specialists: "busfin",
  // Office / Admin Support
  court_clerks: "admin",
  customer_service_representatives: "admin",
  data_entry_keyers: "admin",
  medical_secretaries: "admin",
  police_fire_and_ambulance_dispatchers: "admin",
  secretaries_and_administrative_assistants_except_legal_medical_and_executive: "admin",
  // Computer / Mathematical
  biostatisticians: "compmath",
  computer_and_information_research_scientists: "compmath",
  computer_user_support_specialists: "compmath",
  statisticians: "compmath",
  web_administrators: "compmath",
  // Architecture / Engineering
  civil_engineers: "archeng",
  mechanical_engineering_technicians: "archeng",
  mechanical_engineers: "archeng",
  petroleum_engineers: "archeng",
  // Management
  computer_and_information_systems_managers: "mgmt",
  financial_managers_branch_or_department: "mgmt",
  medical_and_health_services_managers: "mgmt",
  supply_chain_managers: "mgmt",
  // Arts / Media
  producers: "arts",
  reporters_and_correspondents: "arts",
  technical_writers: "arts",
  // Other (Legal / Sales / Science / Education)
  lawyers: "other",
  online_merchants: "other",
  sales_agents_securities_and_commodities: "other",
  sales_representatives_wholesale_and_manufacturing_technical_and_scientific_products: "other",
  social_science_research_assistants: "other",
  sociology_teachers_postsecondary: "other",
};

// Shorter, human-readable row labels (many paper categories are verbose)
const OCC_SHORT: Record<string, string> = {
  bookkeeping_accounting_and_auditing_clerks: "Bookkeeping & Accounting Clerks",
  human_resources_specialists: "HR Specialists",
  licensing_examiners_and_inspectors: "Licensing Examiners / Inspectors",
  management_analysts: "Management Analysts",
  personal_financial_advisors: "Personal Financial Advisors",
  purchasing_agents_except_wholesale_retail_and_farm_products: "Purchasing Agents",
  training_and_development_specialists: "Training & Development Specialists",
  court_clerks: "Court Clerks",
  customer_service_representatives: "Customer Service Reps",
  data_entry_keyers: "Data Entry Keyers",
  medical_secretaries: "Medical Secretaries",
  police_fire_and_ambulance_dispatchers: "Police / Fire Dispatchers",
  secretaries_and_administrative_assistants_except_legal_medical_and_executive:
    "Secretaries & Admin Assistants",
  biostatisticians: "Biostatisticians",
  computer_and_information_research_scientists: "CS Researchers",
  computer_user_support_specialists: "User Support Specialists",
  statisticians: "Statisticians",
  web_administrators: "Web Administrators",
  civil_engineers: "Civil Engineers",
  mechanical_engineering_technicians: "Mechanical Eng. Technicians",
  mechanical_engineers: "Mechanical Engineers",
  petroleum_engineers: "Petroleum Engineers",
  computer_and_information_systems_managers: "IT / IS Managers",
  financial_managers_branch_or_department: "Financial Managers",
  medical_and_health_services_managers: "Health Services Managers",
  supply_chain_managers: "Supply Chain Managers",
  producers: "Producers",
  reporters_and_correspondents: "Reporters & Correspondents",
  technical_writers: "Technical Writers",
  lawyers: "Lawyers",
  online_merchants: "Online Merchants",
  sales_agents_securities_and_commodities: "Securities Sales Agents",
  sales_representatives_wholesale_and_manufacturing_technical_and_scientific_products:
    "Tech & Sci. Sales Reps",
  social_science_research_assistants: "Soc. Sci. Research Assistants",
  sociology_teachers_postsecondary: "Sociology Teachers (Postsec.)",
};

// Compact header that keeps model names horizontal by splitting
// family + version across two lines. "GPT-5.4" → ["GPT-5.4"], while
// "Claude Sonnet 4.6" → ["Sonnet", "4.6"].
function modelHeaderLines(displayName: string): string[] {
  const stripped = displayName.replace(/^Claude\s+/, "");
  const parts = stripped.split(" ");
  if (parts.length <= 1) return [stripped];
  if (parts.length === 2) return parts;
  // e.g. "GPT-5.3 Codex" → ["GPT-5.3", "Codex"]; "Grok 4.2 Fast" → ["Grok", "4.2 Fast"]
  return [parts[0], parts.slice(1).join(" ")];
}

export default function ScoreBreakdown() {
  const [showAll, setShowAll] = useState(true);

  const models = useMemo(() => {
    const sorted = [...data.leaderboard].sort(
      (a, b) => b.overallScore - a.overallScore
    );
    return showAll ? sorted : sorted.slice(0, 10);
  }, [showAll]);

  const rowsByDomain = useMemo(() => {
    const tasks = data.tasksPerCategory as Record<string, number>;
    const grouped: Record<DomainKey, { occ: string; label: string; tasks: number }[]> = {
      busfin: [], admin: [], compmath: [], archeng: [], mgmt: [], arts: [], other: [],
    };
    for (const occ of data.categories) {
      const dom = OCC_DOMAIN[occ];
      if (!dom) continue;
      grouped[dom].push({
        occ,
        label: OCC_SHORT[occ] ?? occ,
        tasks: tasks[occ] ?? 0,
      });
    }
    for (const k of Object.keys(grouped) as DomainKey[]) {
      grouped[k].sort((a, b) => a.label.localeCompare(b.label));
    }
    return grouped;
  }, []);

  const getCellValue = (model: LeaderboardEntry, occ: string): number => {
    const bd = model.categoryBreakdown as Record<string, { score_pct?: number }>;
    return bd[occ]?.score_pct ?? 0;
  };

  const modelColWidth = 58;

  return (
    <section
      id="scores"
      className="py-20 px-5 sm:px-8 border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <div className="label mb-3">§ 06 — Breakdown</div>
          <h2
            className="font-display text-[1.9rem] sm:text-[2.25rem] leading-tight text-[var(--ink)] mb-2"
            style={{ fontWeight: 500 }}
          >
            Heatmap
          </h2>
        </header>

        <div className="flex flex-wrap items-center gap-4 mb-5 text-[11px] text-[var(--ink-faint)]">
          <span className="label">Scale</span>
          {[
            { cls: "heat-0", label: "0–10%" },
            { cls: "heat-1", label: "10–20%" },
            { cls: "heat-2", label: "20–30%" },
            { cls: "heat-3", label: "30–40%" },
            { cls: "heat-4", label: "40%+" },
          ].map((l) => (
            <span
              key={l.cls}
              className="inline-flex items-center gap-1.5 font-mono"
            >
              <span className={`inline-block w-5 h-3 rounded-[2px] ${l.cls}`} />
              {l.label}
            </span>
          ))}
          <button
            onClick={() => setShowAll(!showAll)}
            className="pill ml-auto"
          >
            {showAll ? "Top 10 models" : "All models"}
          </button>
        </div>

        <div className="rounded-lg border border-[var(--rule)] bg-[var(--paper-raised)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="text-xs mx-auto" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr className="bg-[var(--paper-tint)]">
                  <th
                    className="sticky left-0 z-20 bg-[var(--paper-tint)] px-3 py-2 text-left label border-b border-[var(--rule)]"
                    style={{ width: 160, minWidth: 160, maxWidth: 160 }}
                  >
                    Occupation
                  </th>
                  {models.map((m) => {
                    const lines = modelHeaderLines(m.displayName);
                    return (
                      <th
                        key={m.model}
                        className="px-1 py-2 text-center border-b border-[var(--rule)] align-bottom"
                        style={{ minWidth: modelColWidth, maxWidth: modelColWidth }}
                        title={`${m.displayName} · ${m.framework} · overall ${m.overallScore.toFixed(1)}`}
                      >
                        <div className="flex flex-col items-center leading-tight">
                          {lines.map((ln, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10.5px] text-[var(--ink)] whitespace-nowrap"
                            >
                              {ln}
                            </span>
                          ))}
                          <span className="font-mono text-[9.5px] text-[var(--ink-faint)] mt-0.5 tnum">
                            {m.overallScore.toFixed(1)}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {DOMAINS.map((dom) => {
                  const rows = rowsByDomain[dom.key];
                  if (!rows.length) return null;
                  return (
                    <Fragment key={dom.key}>
                      <tr className="bg-[var(--paper-tint)]">
                        <td
                          className="sticky left-0 z-10 bg-[var(--paper-tint)] px-3 py-1.5 label border-t border-b border-[var(--rule)]"
                          style={{
                            borderLeft: `3px solid ${dom.accent}`,
                            color: "var(--ink-soft)",
                          }}
                        >
                          {dom.label}
                        </td>
                        <td
                          className="border-t border-b border-[var(--rule)] bg-[var(--paper-tint)]"
                          colSpan={models.length}
                        />
                      </tr>
                      {rows.map((r) => (
                        <tr
                          key={r.occ}
                          className="row-hover border-b border-[var(--rule)]"
                        >
                          <td
                            className="sticky left-0 z-10 bg-[var(--paper-raised)] px-3 py-1.5 text-[var(--ink)] text-[12px]"
                            style={{
                              borderLeft: `3px solid ${dom.accent}`,
                              width: 160,
                              minWidth: 160,
                              maxWidth: 160,
                            }}
                            title={
                              data.categoryDisplayNames[
                                r.occ as keyof typeof data.categoryDisplayNames
                              ]
                            }
                          >
                            {r.label}
                          </td>
                          {models.map((m) => {
                            const v = getCellValue(m, r.occ);
                            return (
                              <td
                                key={m.model}
                                className={`px-1 py-1.5 text-center font-mono tnum text-[11px] ${getHeatClass(v)}`}
                                title={`${m.displayName} → ${
                                  data.categoryDisplayNames[
                                    r.occ as keyof typeof data.categoryDisplayNames
                                  ]
                                }: ${v.toFixed(1)}%`}
                                style={{ minWidth: modelColWidth, maxWidth: modelColWidth }}
                              >
                                {v.toFixed(0)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {/* Per-domain per-model average — summary row at end of group */}
                      <tr className="border-b border-[var(--rule)] bg-[var(--paper-tint)]">
                        <td
                          className="sticky left-0 z-10 bg-[var(--paper-tint)] px-3 py-1.5 text-[var(--ink-soft)] text-[11.5px]"
                          style={{
                            borderLeft: `3px solid ${dom.accent}`,
                            width: 160,
                            minWidth: 160,
                            maxWidth: 160,
                            fontStyle: "italic",
                          }}
                        >
                          Avg.
                        </td>
                        {models.map((m) => {
                          const vals = rows.map((r) => getCellValue(m, r.occ));
                          const avg =
                            vals.length > 0
                              ? vals.reduce((a, b) => a + b, 0) / vals.length
                              : 0;
                          return (
                            <td
                              key={m.model}
                              className={`px-1 py-1.5 text-center font-mono tnum text-[11px] ${getHeatClass(avg)}`}
                              title={`${m.displayName} avg on ${dom.label}: ${avg.toFixed(1)}%`}
                              style={{
                                minWidth: modelColWidth,
                                maxWidth: modelColWidth,
                                fontWeight: 600,
                              }}
                            >
                              {avg.toFixed(0)}
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
