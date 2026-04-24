import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Thesis from "@/components/Thesis";
import Leaderboard from "@/components/Leaderboard";
import SaturationCompare from "@/components/SaturationCompare";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import Methodology from "@/components/Methodology";
import TaskWorkflows from "@/components/TaskWorkflows";
import Footer from "@/components/Footer";
import { PixelDivider } from "@/components/PixelArt";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Thesis />
        <Leaderboard />
        <SaturationCompare />
        <Methodology />
        <TaskWorkflows />
        <div className="max-w-5xl mx-auto">
          <PixelDivider />
        </div>
        <ScoreBreakdown />

        <section className="py-14 px-5 sm:px-8 border-t border-[var(--rule)]">
          <div className="mx-auto max-w-6xl">
            <p className="label mb-3">Cite</p>
            <pre className="text-[11.5px] font-mono text-[var(--ink-soft)] bg-[var(--paper-raised)] border border-[var(--rule)] rounded-md px-5 py-4 overflow-x-auto leading-[1.75] whitespace-pre">{`@misc{jobbench-2026,
  title   = {JobBench: Aligning Agent Work with Human Will},
  author  = {JobBench Team},
  year    = {2026},
  url     = {https://job-bench.github.io/}
}`}</pre>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
