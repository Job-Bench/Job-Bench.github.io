import { PixelLogo } from "./PixelArt";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] py-10 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-[13px] text-[var(--ink-faint)]">
          <span className="pixelated">
            <PixelLogo scale={2.5} />
          </span>
          <span
            className="font-display text-[var(--ink)] text-[17px]"
            style={{ fontWeight: 600 }}
          >
            JobBench
          </span>
          <span>·</span>
          <span>2026</span>
          <span>·</span>
          <span>Open source</span>
        </div>
        <div className="flex items-center gap-6 text-[13px] text-[var(--ink-soft)]">
          <a
            href="https://github.com/Job-Bench/job-bench-eval"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://huggingface.co/JobBench"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Hugging Face
          </a>
          <a
            href="/#leaderboard"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Leaderboard
          </a>
          <a
            href="/blog"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}
