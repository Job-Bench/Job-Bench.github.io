"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        className="h-full bg-[var(--accent)]"
        style={{
          width: `${pct}%`,
          transition: "width 120ms ease-out",
        }}
      />
    </div>
  );
}

export function SectionIndicator({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const onScroll = () => {
      // Pick the last section whose top is above the viewport midline.
      const mid = window.innerHeight * 0.33;
      let current = 0;
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - mid <= 0) current = i;
      }
      setActiveIdx(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return (
    <aside
      aria-label="Section navigation"
      className="hidden lg:block fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <ul className="flex flex-col gap-3 pointer-events-auto">
        {sections.map((s, i) => {
          const active = i === activeIdx;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 justify-end py-0.5"
              >
                <span
                  className={`text-[11px] font-mono tracking-widest uppercase transition-all duration-200 ${
                    active
                      ? "text-[var(--accent)] opacity-100"
                      : "text-[var(--ink-faint)] opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`relative block shrink-0 rounded-full transition-all duration-200 ${
                    active
                      ? "w-[10px] h-[10px] bg-[var(--accent)]"
                      : "w-[6px] h-[6px] bg-[var(--rule-strong)] group-hover:bg-[var(--ink-faint)]"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
