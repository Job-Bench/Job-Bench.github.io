"use client";

import { useEffect, useState } from "react";
import { PixelAgent, RolePixel, type AgentPose } from "./PixelArt";

type Role = {
  key: string;
  label: string;
  pose: AgentPose;
  tie: string; // tie color — swaps per role so the agent visibly changes too
};

// Each role gets its own agent pose + tie color, so the duck morphs as tasks rotate.
const ROLES: Role[] = [
  { key: "scales",    label: "LAWYER",     pose: "neutral", tie: "#7a2d1a" }, // ox-blood
  { key: "chart",     label: "BIOSTATS",   pose: "wave",    tie: "#3b5f89" }, // editorial blue
  { key: "newspaper", label: "REPORTER",   pose: "neutral", tie: "#4a7a5a" }, // editorial green
  { key: "bridge",    label: "CIVIL ENG.", pose: "cheer",   tie: "#a46f1f" }, // mustard
  { key: "bank",      label: "FINANCE",    pose: "neutral", tie: "#2d3a4a" }, // slate
  { key: "derrick",   label: "PETRO ENG.", pose: "wave",    tie: "#b83b28" }, // red
];

// Four transition flavors — rotated per switch so it doesn't feel looped.
const TRANSITIONS = ["burst", "wipe-v", "wipe-h", "glitch"] as const;
type Transition = (typeof TRANSITIONS)[number];

const CYCLE_MS = 3200;
const OUT_MS = 360;

export default function HeroAgentScene() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [tx, setTx] = useState<Transition>("burst");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      if (!mounted) return;
      setTx(TRANSITIONS[tick % TRANSITIONS.length]);
      setPhase("out");
      t2 = setTimeout(() => {
        if (!mounted) return;
        setIdx((i) => (i + 1) % ROLES.length);
        setTick((n) => n + 1);
        setPhase("in");
        t1 = setTimeout(step, CYCLE_MS);
      }, OUT_MS);
    };

    t1 = setTimeout(step, CYCLE_MS);
    return () => {
      mounted = false;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [tick]);

  const current = ROLES[idx];

  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="hero-scene-chrome">
        <span className="hero-scene-dot hsd-r" />
        <span className="hero-scene-dot hsd-y" />
        <span className="hero-scene-dot hsd-g" />
        <span className="hero-scene-title">work_feed.sh</span>
        <span className="hero-scene-rec">
          <span className="rec-dot" />
          REC
        </span>
      </div>

      <div className="hero-scene-body">
        {/* The whole scene is one unified picture that pixel-transitions together */}
        <div
          key={`stage-${idx}-${phase}-${tx}`}
          className="hero-stage"
          data-phase={phase}
          data-tx={tx}
        >
          {/* Left: agent — pose + tie swap with each role */}
          <div className="hero-scene-agent">
            <PixelAgent
              key={`agent-${idx}`}
              scale={4}
              pose={current.pose}
              tieColor={current.tie}
            />
            <div className="hero-agent-tag">agent_01</div>
          </div>

          {/* Middle: data flow — visual tether between agent and role */}
          <div className="hero-scene-pipe" aria-hidden="true">
            <span className="pipe-dot pd1" />
            <span className="pipe-dot pd2" />
            <span className="pipe-dot pd3" />
          </div>

          {/* Right: role workstation — no hammer; the role sits on a floor */}
          <div className="hero-scene-role">
            <div className="hero-role-stage">
              <div className="hero-role-box">
                <RolePixel role={current.key} scale={4} />
              </div>
            </div>
            <div className="hero-scene-floor" />
          </div>
        </div>
      </div>

      <div className="hero-scene-caption">
        <span className="hero-caption-prefix">
          <span className="caret-blink" style={{ marginRight: 4 }}>
            ▌
          </span>
          now working on:
        </span>
        <span
          key={`cap-${idx}`}
          className="hero-caption-role"
          data-phase={phase}
        >
          {current.label}
        </span>
      </div>
    </div>
  );
}
