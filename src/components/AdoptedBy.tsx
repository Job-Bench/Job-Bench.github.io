type Adopter = {
  model: string;
  org: string;
  logo: string;
};

const ADOPTERS: Adopter[] = [
  { model: "Muse Spark 1.1", org: "Meta", logo: "/logos/meta.png" },
  { model: "Kimi K3", org: "Moonshot", logo: "/logos/moonshot.png" },
];

export default function AdoptedBy() {
  return (
    <section className="py-12 px-5 sm:px-8 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="label mb-4">Adopted by</p>
        <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--ink-soft)] mb-6">
          JobBench has been adopted by Meta&apos;s{" "}
          <span className="chip-accent">Muse Spark 1.1</span> and Moonshot&apos;s{" "}
          <span className="chip-accent">Kimi K3</span>{" "}
          <span aria-hidden>🎉</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ADOPTERS.map((a) => (
            <div
              key={a.model}
              className="flex items-center gap-2.5 rounded-md border border-[var(--rule)] bg-[var(--paper-raised)] px-4 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.logo}
                alt=""
                width={20}
                height={20}
                className="shrink-0 rounded-sm"
                style={{ objectFit: "contain" }}
              />
              <span className="text-[13px] font-medium text-[var(--ink)]">
                {a.model}
              </span>
              <span className="text-[11px] font-mono text-[var(--ink-faint)]">
                {a.org}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
