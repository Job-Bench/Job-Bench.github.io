"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  target,
  suffix = "",
  className = "font-display tnum text-[1.75rem] sm:text-[2rem] leading-none text-[var(--ink)]",
  style,
}: {
  target: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1100;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCurrent(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ fontWeight: 600, ...style }}
    >
      {current.toLocaleString()}
      <span className="text-[var(--ink-faint)]">{suffix}</span>
    </div>
  );
}
