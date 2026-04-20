type Institution = {
  name: string;
  logo: string;
  /** Visual scale factor to compensate for logos with awkward aspect ratios.
   *  1 = default, >1 = display larger, <1 = display smaller. */
  scale?: number;
};

const INSTITUTIONS: Institution[] = [
  { name: "University of Washington", logo: "/institutions/uw.svg", scale: 1.0 },
  { name: "UC Santa Barbara", logo: "/institutions/ucsb.svg", scale: 1.05 },
  { name: "Stanford University", logo: "/institutions/stanford.png", scale: 1.15 },
  { name: "Carnegie Mellon University", logo: "/institutions/cmu.png", scale: 0.95 },
  { name: "University of Notre Dame", logo: "/institutions/notre-dame.svg", scale: 0.9 },
  { name: "IBM Research", logo: "/institutions/ibm-research.svg", scale: 1.15 },
  { name: "BakeAI", logo: "/institutions/bakeai.png", scale: 0.9 },
  { name: "Michigan State University", logo: "/institutions/msu.png", scale: 0.95 },
  { name: "UC Berkeley", logo: "/institutions/berkeley.png", scale: 1.05 },
];

// Uniform box height — every logo renders at the same height; width flexes with the grid.
// Per-logo `scale` tweaks just pre-shrink/expand a bit so wildly different aspect ratios
// look balanced visually.
const BOX_H = 40; // px

export default function Partners() {
  return (
    <section className="py-14 px-5 sm:px-8 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-8 text-center">In collaboration with</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 items-center gap-x-3 md:gap-x-2 gap-y-8">
          {INSTITUTIONS.map((inst) => {
            const s = inst.scale ?? 1;
            return (
              <div
                key={inst.name}
                title={inst.name}
                className="flex items-center justify-center group min-w-0"
                style={{ height: BOX_H }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={inst.logo}
                  alt={inst.name}
                  className="opacity-75 group-hover:opacity-100 transition-opacity"
                  style={{
                    maxHeight: BOX_H * s,
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "grayscale(0.1)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
