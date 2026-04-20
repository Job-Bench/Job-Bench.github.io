"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PixelLogo } from "./PixelArt";

const NAV_LINKS = [
  { label: "Leaderboard", href: "/#leaderboard" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--rule)] bg-[var(--paper)]/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="pixelated -translate-y-[1px] group-hover:rotate-[-4deg] transition-transform duration-300">
              <PixelLogo scale={3} />
            </span>
            <span
              className="font-display text-xl tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors"
              style={{ fontWeight: 600 }}
            >
              JobBench
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[13px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="h-4 w-px bg-[var(--rule)]" />
            <a
              href="https://github.com/Job-Bench/job-bench-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://huggingface.co/JobBench"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1.5"
            >
              <span aria-hidden>🤗</span>
              Hugging Face
            </a>
          </div>

          <button
            className="md:hidden text-[var(--ink-soft)] p-2 text-lg"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "×" : "≡"}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[var(--rule)] py-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] py-2 px-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
