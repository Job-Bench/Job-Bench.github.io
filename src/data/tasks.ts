export type SourceType = "db" | "pdf" | "csv" | "xlsx" | "txt" | "interview";

export type Source = {
  name: string;
  type: SourceType;
  blurb: string;
};

export type Conflict = {
  a: number;
  b: number;
  label: string;
};

export type Challenge = {
  title: string;
  action: string;
  detail: string;
};

export type RoleIcon =
  | "scales"
  | "chart"
  | "newspaper"
  | "bridge"
  | "bank"
  | "derrick";

export type Task = {
  slug: string;
  role: string;
  shortRole: string;
  roleIcon: RoleIcon;
  onet: string;
  desire: number;
  hook: string;
  why: string;
  sources: Source[];
  conflicts: Conflict[];
  challenges: Challenge[];
  outputs: string[];
};

export const TASKS: Task[] = [
  {
    slug: "reporters-1",
    role: "Reporter — Connecticut investigative desk",
    shortRole: "Reporter",
    roleIcon: "newspaper",
    onet:
      "Check reference materials, such as books, news files, or public records, to obtain relevant facts.",
    desire: 4.0,
    hook:
      "Lead in Connecticut drinking water. The state says zero water hazards. The FOIA data says otherwise.",
    why: "Investigative beat reporting is gated by source-verification time — PDFs, FOIA CSVs, and interview cross-checks eat the day.",
    sources: [
      {
        name: "FOIA_water_data.csv",
        type: "csv",
        blurb:
          "Multiple Hartford-area systems exceed the 15 ppb federal action level.",
      },
      {
        name: "CT_2024_Surveillance_Report.pdf",
        type: "pdf",
        blurb:
          "0% of investigated homes identified water as a lead hazard.",
      },
      {
        name: "CDC_2017_2022_Blood_Lead.xlsx",
        type: "xlsx",
        blurb:
          "CT rows only for 2017–2019; 2020–2022 are dagger-marked non-submissions.",
      },
      {
        name: "EPA_LCRI_Factsheet.pdf",
        type: "pdf",
        blurb:
          "10 ppb action level finalized Oct 2024 — not yet enforceable.",
      },
      {
        name: "martinez_interview.txt",
        type: "interview",
        blurb:
          "Pediatric referrals up 30% post-threshold change (Dr. Martinez).",
      },
      {
        name: "NRDC_lead_factsheet.pdf",
        type: "pdf",
        blurb:
          "Waterbury 16.1 ppb vs. Newark 47.9 ppb — trajectory, not point-in-time.",
      },
    ],
    conflicts: [
      { a: 0, b: 1, label: "FOIA exceedances vs. 0% home-hazard finding" },
      { a: 2, b: 4, label: "CDC n=1,666 vs. Martinez 30% clinic-specific" },
      { a: 3, b: 0, label: "Rule finalized vs. current enforcement cycle" },
    ],
    challenges: [
      {
        title: "Reconcile the water-vs-paint contradiction",
        action:
          "The agent must reason about home-investigation methodology vs. system-level monitoring and hold the tension in the argument — not paper it over.",
        detail:
          "The surveillance report shows 0% water hazards; the FOIA CSV shows multiple systems above 15 ppb. Don't paper it over — reason about home-investigation methodology limits vs. system-level monitoring and produce a coherent editorial argument.",
      },
      {
        title: "Fact-check Dr. Martinez's 30% quote",
        action:
          "The agent must catch that 30% is directionally right but conservative against the state's ~66%/~84%, and frame it as clinic-specific.",
        detail:
          "Martinez claims a 30% referrals increase; state data shows ~66% prevalence and ~84% incidence growth. Classify as directionally correct but quantitatively conservative — likely clinic-specific — rather than accept or reject outright.",
      },
      {
        title: "LCRI: finalized vs. enforceable",
        action:
          "The agent must read the EPA factsheet and distinguish \u201Crule finalized\u201D from \u201Caction level in enforcement\u201D — exactly the editor's ask.",
        detail:
          "The Lead and Copper Rule Improvements were finalized October 2024, but the 10 ppb action level does not yet apply to current monitoring cycles. Preserve the editor's explicit distinction.",
      },
      {
        title: "90th-percentile action-level rule",
        action:
          "The agent must apply EPA's 90th-percentile compliance test — a utility is only in exceedance when more than 10% of its samples cross 15 ppb, not on any single high reading.",
        detail:
          "The FOIA CSV contains individual household samples, but EPA's Lead and Copper Rule determines action-level exceedance at the 90th percentile per utility per cycle. Don't flag a system from one bad sample — compute the 90th percentile and report exceedance accordingly.",
      },
    ],
    outputs: [
      "Thesis-driven pitch memo",
      "3-sheet data workbook",
      "15+ entry source verification log",
    ],
  },
  {
    slug: "lawyers-1",
    role: "Lawyer — NC real-estate attorney",
    shortRole: "Lawyer",
    roleIcon: "scales",
    onet: "Study Constitution, statutes, decisions, regulations, and ordinances to determine ramifications for cases.",
    desire: 3.17,
    hook: "Six short-term rentals, a Town's settlement letter, and a Fifth Circuit opinion quietly cited against itself.",
    why: "Constitutional work is research-saturated — hours of opinion reading and ordinance comparison before a single line of advocacy.",
    sources: [
      {
        name: "hignell_stark_5thcir_2022.pdf",
        type: "pdf",
        blurb:
          "Dormant Commerce Clause holding the Town's letter quietly omits.",
      },
      {
        name: "penn_central_takings_test.pdf",
        type: "pdf",
        blurb:
          "Three-factor regulatory takings framework for per-property analysis.",
      },
      {
        name: "client.db — 8 tables",
        type: "db",
        blurb:
          "str_income, ltr_comparables, settlement_offers, fine_accruals, properties…",
      },
      {
        name: "settlement_letter.txt",
        type: "txt",
        blurb:
          "Buries dismissal-with-prejudice language and a §1983 tolling trap.",
      },
      {
        name: "millbrook_vs_belvidere.md",
        type: "txt",
        blurb:
          "Comparative STR ordinances across jurisdictions; columns to reconcile.",
      },
    ],
    conflicts: [
      { a: 0, b: 3, label: "Same case, opposite holdings" },
      { a: 2, b: 3, label: "Per-property math vs. lump-sum offer" },
    ],
    challenges: [
      {
        title: "Turn the Town's own case against the Town",
        action:
          "The agent must distinguish Hignell-Stark's adverse takings holding from its favorable Commerce Clause holding, then wield the one the Town's letter quietly omits.",
        detail:
          "Hignell-Stark's dormant Commerce Clause holding struck down an owner-occupancy rule close to Millbrook's — the agent must distinguish the adverse takings holding on license-vs-fee-simple grounds and mine the favorable holding the Town's counsel omitted.",
      },
      {
        title: "R-1 equal protection on Property 4",
        action:
          "The agent must catch that str_permits proves prior-use status on Property 4 and counter-propose either inclusion or a binding rezoning commitment.",
        detail:
          "77 Seaside is excluded from the transitional permits yet had a valid prior STR permit visible only in str_permits. Singling out one property is an arbitrary classification — counter-propose inclusion or a binding rezoning commitment.",
      },
      {
        title: "Amortization across jurisdictions",
        action:
          "The agent must argue that 180 days with no grandfathering fails the Gage/AVR standard for residential STRs carrying mortgages.",
        detail:
          "AVR, Inc. and City of LA v. Gage involved 1-yr and 5-yr periods for adult-entertainment and industrial uses. 180 days with no grandfathering is constitutionally inadequate for residential STRs carrying mortgages.",
      },
      {
        title: "Dismissal-with-prejudice + tolling trap",
        action:
          "The agent must spot the buried dismissal-with-prejudice language and demand a mutual tolling agreement to preserve §1983 claims.",
        detail:
          "Settlement language would extinguish dormant Commerce Clause and takings claims permanently. Flag it and demand a mutual tolling agreement so §1983 limitations don't run during negotiations.",
      },
    ],
    outputs: [
      "Constitutional memo",
      "Comparative ordinance table",
      "Per-property counter-proposal",
    ],
  },
  {
    slug: "biostatisticians-1",
    role: "Biostatistician — Phase III trial XR-2847",
    shortRole: "Biostatistician",
    roleIcon: "chart",
    onet: "Calculate sample size requirements for clinical studies.",
    desire: 4.0,
    hook:
      "The Statistical Analysis Plan assumes a 15% control event rate. The real cohort says 20.2%.",
    why: "Sample-size work is bookkeeping — chasing exclusion counts, variable mappings, and the right ICH E9 section for every justification.",
    sources: [
      {
        name: "Clinical_Study_Proposal_CVD.csv",
        type: "csv",
        blurb:
          "Hidden parameters: subgroups, effect sizes, interim fractions, power grid.",
      },
      {
        name: "framingham_cohort.csv",
        type: "csv",
        blurb:
          "Apply eligibility filters to recover the empirical 10-year CHD rate.",
      },
      {
        name: "FDA_E9_Statistical_Principles.pdf",
        type: "pdf",
        blurb: "ICH E9 — must cite by section (3.4, 3.5, 4.5, 5.3, 5.7).",
      },
      {
        name: "Sample_Size_Calculator_v2.0.xls",
        type: "xlsx",
        blurb: "Two-proportion cross-validation of the re-powered n.",
      },
      {
        name: "SAP_draft.txt",
        type: "txt",
        blurb: "Assumed 15% control rate — unverified against the cohort.",
      },
    ],
    conflicts: [
      { a: 0, b: 1, label: "SysBP ≠ sysBP — variable names disagree" },
      { a: 1, b: 4, label: "Empirical 20.2% vs. assumed 15%" },
    ],
    challenges: [
      {
        title: "Empirical vs. assumed event rate gap",
        action:
          "The agent must compute the empirical ~20% rate from Framingham on its own and trigger a re-power — not accept the 15% protocol assumption.",
        detail:
          "Filtering Framingham to age 45–70, SysBP 130–159 yields ~20.2% 10-year CHD — far above the 15% assumption. The agent must compute this independently and trigger a sample-size recalculation rather than accept the protocol's number.",
      },
      {
        title: "Hidden parameters inside the proposal CSV",
        action:
          "The agent must mine thresholds, subgroups, effect sizes, and interim fractions from the CSV and fold them into an 8-scenario sensitivity matrix.",
        detail:
          "Inclusion thresholds, the four pre-specified subgroups, sensitivity power levels, effect sizes, and the 50%/75% interim fractions all live in the CSV — not the instructions. The agent must extract them to build the 8-scenario matrix.",
      },
      {
        title: "ICH E9 section-level citation",
        action:
          "The agent must cite ICH E9 at the section level (3.5, 3.4/4.5, 5.7, 5.3) — not point at the document as a whole.",
        detail:
          "The justification must cite Section 3.5 (empirical assumptions), 3.4 and 4.5 (interim analyses), 5.7 (subgroups), and 5.3 (missing data) — by section, not by document.",
      },
      {
        title: "Rebuild the Framingham Risk Score",
        action:
          "The agent must reconstruct the Framingham Risk Score from age, sex, cholesterol, BP, smoking, and diabetes to stratify subgroups itself.",
        detail:
          "Subgroup risk stratification requires reconstructing FRS from age, sex, cholesterol, BP, smoking, and diabetes — none of which is pre-computed. The agent must implement it to flag strata with potential effect modification.",
      },
    ],
    outputs: [
      "Re-powered sample size",
      "8-scenario sensitivity matrix",
      "Subgroup-stratified baseline table",
    ],
  },
  {
    slug: "civil-engineers-1",
    role: "Civil engineer — Miller Creek box culvert",
    shortRole: "Civil eng.",
    roleIcon: "bridge",
    onet: "Estimate quantities and cost of materials, equipment, or labor.",
    desire: 3.25,
    hook:
      "A 15-degree skew turns a rectangular culvert into four asymmetric wing walls — and local prices disagree with WSDOT's.",
    why: "Culvert estimating is source-fragmented — takeoffs, unit-conversion arithmetic, and bid-tab cross-references eat most of the cycle.",
    sources: [
      {
        name: "WSDOT_Bid_Tab_24Z011.pdf",
        type: "pdf",
        blurb:
          "Real bids for Items 5, 11, 20, 21, 56 — benchmark for local unit costs.",
      },
      {
        name: "Material_Labor_Unit_Costs.csv",
        type: "csv",
        blurb: "Local prices — some variance > 25% against WSDOT.",
      },
      {
        name: "Box_Culvert_Specifications.txt",
        type: "txt",
        blurb: "Wing-wall, headwall, apron-slab dimensions buried in prose.",
      },
      {
        name: "Rebar_Schedule.xlsx",
        type: "xlsx",
        blurb:
          "Pre-computed totals that don't verify against bar-weight reference.",
      },
      {
        name: "Geotechnical_Report.pdf",
        type: "pdf",
        blurb:
          "15° skew angle, excavation classification, subgrade preparation.",
      },
    ],
    conflicts: [
      { a: 0, b: 1, label: "Local vs. WSDOT variance > 25%" },
      { a: 2, b: 4, label: "Skew geometry breaks rectangular takeoff" },
    ],
    challenges: [
      {
        title: "Skew geometry on four wing walls",
        action:
          "The agent must apply 15° skew geometry to all four wing walls — obtuse corners extend further than acute — not treat them as rectangular.",
        detail:
          "The 15° skew creates asymmetric wing walls — obtuse corners extend further than acute. The agent must apply this to all four walls rather than treating them as a standard rectangular configuration.",
      },
      {
        title: "WSDOT bid-item identification",
        action:
          "The agent must locate Items 5, 11, 20, 21, 56 inside the WSDOT bid-tab PDF and align each with the correct local unit-cost row.",
        detail:
          "The task names the contract but not the line items — agent must locate Item 5 (Pavement Removal), 11 (Roadway Excavation), 20 (Base Course), 21 (Conc. Pavement), and 56 (Plugging) from the PDF and map each to the local cost row.",
      },
      {
        title: "Reinforcement schedule verification",
        action:
          "The agent must independently verify rebar totals against length × unit weight and correct any discrepancy before the estimate rolls up.",
        detail:
          "Pre-computed rebar totals must be independently verified against length × unit weight per bar designation. Any discrepancy must be corrected before the estimate rolls up.",
      },
      {
        title: "Weighted contingency by confidence tier",
        action:
          "The agent must categorize every line by confidence, apply tiered contingency rates, and compute the weighted average across the cost distribution.",
        detail:
          "Items with strong WSDOT benchmark support warrant lower contingency than items lacking comparable market data. Categorize by confidence, apply tiered rates, compute the weighted average.",
      },
    ],
    outputs: [
      "Skew-adjusted takeoff",
      "Multi-source price reconciliation",
      "Contingency-weighted estimate",
    ],
  },
  {
    slug: "financial-managers-1",
    role: "Financial manager — Riverside Branch",
    shortRole: "Financial mgr.",
    roleIcon: "bank",
    onet:
      "Approve, reject, or coordinate approval of commercial, real estate, or personal loans.",
    desire: 3.0,
    hook:
      "80 loans to re-grade. Two CRE applications that each individually breach the 300% concentration limit.",
    why: "A credit officer's quarter is PDF threshold lookups, multi-factor re-grading, and FDIC benchmark pulls — before any actual judgment happens.",
    sources: [
      {
        name: "riverside_branch_portfolio.db",
        type: "db",
        blurb:
          "80 rated-3-or-worse loans, 12 quarters of deterioration, branch metrics.",
      },
      {
        name: "sample-risk-rating-definitions.pdf",
        type: "pdf",
        blurb: "DSCR, LTV, collateral, delinquency thresholds per grade.",
      },
      {
        name: "fdic-qbp-q4-2024.xlsx",
        type: "xlsx",
        blurb:
          "National delinquency & noncurrent rates by loan category for benchmarking.",
      },
      {
        name: "cdfi-re-scoring-matrix.xls",
        type: "xlsx",
        blurb: "Weighted CRE scoring: collateral, capacity, character, capital.",
      },
      {
        name: "APP-2025-001,004.csv",
        type: "csv",
        blurb:
          "Two competing CRE applications; incomplete on lease %, tenant risk.",
      },
    ],
    conflicts: [
      {
        a: 0,
        b: 1,
        label: "Factors conflict (adequate DSCR + high LTV + delinquency)",
      },
      { a: 4, b: 0, label: "Both apps breach 300% — all three scenarios fail" },
    ],
    challenges: [
      {
        title: "Re-grade 80 loans on four factors at once",
        action:
          "The agent must evaluate DSCR, LTV, collateral, and delinquency jointly across 80 loans, using dominant-factor judgment where they conflict.",
        detail:
          "DSCR, LTV, collateral coverage, and delinquency must be evaluated jointly, then mapped to the PDF's rating scale. Loans where factors conflict (adequate DSCR but high LTV and delinquency) need dominant-factor judgment.",
      },
      {
        title: "CRE concentration with mutually exclusive scenarios",
        action:
          "The agent must compute post-approval concentration for {001, 004, both}, catch that all three breach 300%, and test participation or sell-down.",
        detail:
          "APP-001 and APP-004 individually breach the 300% CRE cap. The agent must compute post-approval concentration for {001, 004, both}, recognize all three breach, then assess whether participation or sell-down can make any workable.",
      },
      {
        title: "Dual-shock stress test",
        action:
          "The agent must combine +200bp with –15% revenue into one stressed DSCR — computing it differently for stabilized CRE vs. construction-to-perm.",
        detail:
          "+200bp rate increase changes debt service, –15% revenue shock changes income; both combine into a stressed DSCR. Calculation differs across stabilized CRE vs. construction-to-permanent.",
      },
      {
        title: "Framework selection by loan type",
        action:
          "The agent must pick NESDCAP for consumer/residential vs. C&I risk definitions for commercial — without being told the mapping.",
        detail:
          "Consumer and residential loans use the NESDCAP scorecard; C&I, SBA, and revolving facilities use the C&I risk rating definitions. Wrong framework = significant analytical error.",
      },
    ],
    outputs: [
      "Loan Decision Matrix (6 apps)",
      "CRE committee memo",
      "Stress-tested DSCR scenarios",
    ],
  },
  {
    slug: "petroleum-engineers-1",
    role: "Petroleum engineer — infill drilling",
    shortRole: "Petroleum eng.",
    roleIcon: "derrick",
    onet:
      "Analyze data to recommend placement of wells and supplementary processes to enhance production.",
    desire: 3.0,
    hook:
      "API numbers in three lengths. Depth conventions off by 50 ft. A decline equation the instructions never wrote down.",
    why: "Field Development reviews drown in API-format reconciliation, hand-fit decline curves, and formation-tops assembly across heterogeneous logs.",
    sources: [
      {
        name: "utah_forge_pason.csv",
        type: "csv",
        blurb: "Wellbore parameters for per-interval ROP regression.",
      },
      {
        name: "boem_well_production_2024.csv",
        type: "csv",
        blurb: "12-digit API; Gulf of Mexico production for Arps fit.",
      },
      {
        name: "mud_logs.xlsx",
        type: "xlsx",
        blurb: "10-digit API; gas detection; Log-Interval depths.",
      },
      {
        name: "cores.xlsx",
        type: "xlsx",
        blurb: "14-digit API; formation lithology; Top/Bottom depths.",
      },
      {
        name: "drilling_operations.db",
        type: "db",
        blurb:
          "Limited Gulf records — flag identifier mismatch as data-quality gap.",
      },
    ],
    conflicts: [
      { a: 2, b: 3, label: "10-digit vs 14-digit API; depth conventions" },
      { a: 1, b: 4, label: "BOEM production has no drilling-side match" },
    ],
    challenges: [
      {
        title: "API number format reconciliation",
        action:
          "The agent must grasp API structure (state-county-well-completion-event) and develop a truncation methodology to reconcile 10/12/14-digit identifiers.",
        detail:
          "Mud logs use 10-digit API, cores 14-digit, BOEM production 12-digit. The agent must understand API structure (state-county-well-completion-event) and develop a truncation methodology to enable cross-referencing.",
      },
      {
        title: "Wellbore segmentation by discontinuity",
        action:
          "The agent must segment at regime shifts, fit per-interval multivariate ROP regressions, and identify the 75th-percentile operating envelope on its own.",
        detail:
          "Segment the wellbore at shifts in WOB/RPM/pump-pressure regime, fit per-interval multivariate ROP regression, then identify the 75th-percentile operating envelope. 2-sigma anomalies must distinguish equipment issues from formation changes.",
      },
      {
        title: "Arps hyperbolic decline — unprompted",
        action:
          "The agent must recall q(t) = qi/(1+b·Di·t)^(1/b) unprompted, bound b to [0, 1], and estimate Di from the time series.",
        detail:
          "q(t) = qi / (1 + b·Di·t)^(1/b) is not in the instructions. The agent must know the equation, that b typically lies in [0, 1], and how to estimate Di from the production time series.",
      },
      {
        title: "Confidence-level criteria for recommendations",
        action:
          "The agent must define quantitative confidence thresholds (R² bands, corroboration count) and apply them consistently across every recommendation.",
        detail:
          "High/medium/low per recommendation with no thresholds given — the agent must establish quantitative criteria (R² bands, corroboration count) and apply them consistently.",
      },
    ],
    outputs: [
      "Interval ROP model",
      "Arps decline parameters",
      "Top-15 intervention ranking",
      "Unified drilling risk matrix",
    ],
  },
];
