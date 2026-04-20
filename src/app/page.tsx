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
      </main>
      <Footer />
    </>
  );
}
