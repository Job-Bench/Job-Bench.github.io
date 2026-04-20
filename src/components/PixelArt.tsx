"use client";

import { useEffect, useState } from "react";

// ---------- Sprite engine ----------
type Sprite = {
  w: number;
  h: number;
  palette: Record<string, string>; // char -> fill; absence = transparent
  rows: string[];
};

function SvgSprite({
  sprite,
  scale = 1,
  className,
  style,
  title,
}: {
  sprite: Sprite;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  const { w, h, rows, palette } = sprite;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) => {
          const fill = palette[c];
          if (!fill) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}

// ---------- Sprites ----------
const INK = "#1a1714";
const ACC = "#7a2d1a";
const ACC_SOFT = "#c06756";
const CREAM = "#fefcf5";

// Agent character (16w × 21h), open eyes
const AGENT_OPEN: Sprite = {
  w: 16,
  h: 21,
  palette: { "#": INK, R: ACC, W: CREAM, c: ACC_SOFT },
  rows: [
    "......####......", // 0 antenna tip
    "......####......", // 1 antenna
    "....########....", // 2 head
    "...##########...", // 3
    "..############..", // 4
    "..##WW####WW##..", // 5 eyes (white)
    "..############..", // 6
    "...##########...", // 7
    "....########....", // 8 neck
    "...##########...", // 9 collar
    "..############..", // 10
    ".##############.", // 11 shoulders
    ".##############.", // 12
    ".####RRRRRR####.", // 13 tie
    ".####RRRRRR####.", // 14
    ".####RRRRRR####.", // 15
    ".##############.", // 16
    "..############..", // 17
    "...##......##...", // 18 legs
    "...##......##...", // 19
    "..####....####..", // 20 feet
  ],
};

const AGENT_BLINK: Sprite = {
  ...AGENT_OPEN,
  rows: [
    ...AGENT_OPEN.rows.slice(0, 5),
    "..############..", // eyes closed
    ...AGENT_OPEN.rows.slice(6),
  ],
};

// Alt pose: arms stretched out wide ("tada!") — rows 11–12 extend to full width.
const AGENT_ARMS_OUT: Sprite = {
  w: 16,
  h: 21,
  palette: { "#": INK, R: ACC, W: CREAM, c: ACC_SOFT },
  rows: [
    "......####......",
    "......####......",
    "....########....",
    "...##########...",
    "..############..",
    "..##WW####WW##..",
    "..############..",
    "...##########...",
    "....########....",
    "...##########...",
    "..############..",
    "################", // arms extended left + right
    "################",
    ".####RRRRRR####.",
    ".####RRRRRR####.",
    ".####RRRRRR####.",
    ".##############.",
    "..############..",
    "...##......##...",
    "...##......##...",
    "..####....####..",
  ],
};

const AGENT_ARMS_OUT_BLINK: Sprite = {
  ...AGENT_ARMS_OUT,
  rows: [
    ...AGENT_ARMS_OUT.rows.slice(0, 5),
    "..############..",
    ...AGENT_ARMS_OUT.rows.slice(6),
  ],
};

// Alt pose: one hand raised in a wave — hand pixel-cluster above the right shoulder.
const AGENT_WAVE: Sprite = {
  w: 16,
  h: 21,
  palette: { "#": INK, R: ACC, W: CREAM, c: ACC_SOFT },
  rows: [
    "......####..##..", // antenna + raised hand
    "......####..##..",
    "....########.##.", // arm bending down to shoulder
    "...##########.#.",
    "..############..",
    "..##WW####WW##..",
    "..############..",
    "...##########...",
    "....########....",
    "...##########...",
    "..############..",
    ".##############.",
    ".##############.",
    ".####RRRRRR####.",
    ".####RRRRRR####.",
    ".####RRRRRR####.",
    ".##############.",
    "..############..",
    "...##......##...",
    "...##......##...",
    "..####....####..",
  ],
};

const AGENT_WAVE_BLINK: Sprite = {
  ...AGENT_WAVE,
  rows: [
    ...AGENT_WAVE.rows.slice(0, 5),
    "..############..",
    ...AGENT_WAVE.rows.slice(6),
  ],
};

// Alt pose: both arms raised straight up — hands at the top corners, ready to
// hoist a trophy overhead. Arms run at cols 1–2 and 13–14 from row 0 down to
// the shoulders at row 11.
const AGENT_VICTORY: Sprite = {
  w: 16,
  h: 21,
  palette: { "#": INK, R: ACC, W: CREAM, c: ACC_SOFT },
  rows: [
    ".##...####...##.", // 0 hands + antenna tip
    ".##...####...##.", // 1 arms + antenna
    ".##.########.##.", // 2 arms + head top
    ".##############.", // 3 arms + head
    ".##############.", // 4 arms + head
    ".###WW####WW###.", // 5 arms + eyes
    ".##############.", // 6
    ".##############.", // 7
    ".##.########.##.", // 8 arms + neck
    ".##############.", // 9 arms + collar
    ".##############.", // 10
    ".##############.", // 11 shoulders
    ".##############.", // 12
    ".####RRRRRR####.", // 13 tie
    ".####RRRRRR####.", // 14
    ".####RRRRRR####.", // 15
    ".##############.", // 16
    "..############..", // 17
    "...##......##...", // 18 legs
    "...##......##...", // 19
    "..####....####..", // 20 feet
  ],
};

const AGENT_VICTORY_BLINK: Sprite = {
  ...AGENT_VICTORY,
  rows: [
    ...AGENT_VICTORY.rows.slice(0, 5),
    ".##############.", // eyes closed (arms still along sides)
    ...AGENT_VICTORY.rows.slice(6),
  ],
};

const AGENT_VARIANTS = {
  neutral: { open: AGENT_OPEN, blink: AGENT_BLINK },
  cheer: { open: AGENT_ARMS_OUT, blink: AGENT_ARMS_OUT_BLINK },
  wave: { open: AGENT_WAVE, blink: AGENT_WAVE_BLINK },
  victory: { open: AGENT_VICTORY, blink: AGENT_VICTORY_BLINK },
} as const;

export type AgentPose = keyof typeof AGENT_VARIANTS;

// Small robot head (9×9) — for logo/navbar
const HEAD: Sprite = {
  w: 9,
  h: 9,
  palette: { "#": INK, R: ACC },
  rows: [
    "....#....",
    "....#....",
    ".#######.",
    "#.#.#.#.#",
    "#.......#",
    "#.R...R.#",
    "#.......#",
    ".#######.",
    "..##.##..",
  ],
};

// ---------- Role sprites (16×16) ----------
// Each sprite represents a profession with one iconic element.
// Palette mapping:
//   K = ink outline     A = accent (ox-blood)    S = accent soft
//   Y = mustard         B = editorial blue        N = editorial green
//   W = cream highlight G = steel gray

const ROLE_PAL = {
  K: INK,
  A: ACC,
  S: ACC_SOFT,
  Y: "#a46f1f",
  B: "#3b5f89",
  N: "#4a7a5a",
  W: CREAM,
  G: "#5a554c",
};

// Scales of justice — for Lawyer
const SPRITE_SCALES: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    "................",
    "........K.......",
    ".......KKK......",
    "........K.......",
    ".KKKKKKKKKKKKKK.",
    "...K....K...K...",
    "...K....K...K...",
    ".KKKKK..K.KKKKK.",
    ".KAAAK..K.KAAAK.",
    "..KKK...K..KKK..",
    "........K.......",
    "........K.......",
    "........K.......",
    ".....KKKKKKK....",
    "....KKKKKKKKK...",
  ],
};

// Ascending bar chart — for Biostatistician
const SPRITE_CHART: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    "................",
    "................",
    ".............KK.",
    ".............AA.",
    "..........KK.AA.",
    "..........BB.AA.",
    ".......KK.BB.AA.",
    ".......NN.BB.AA.",
    "....KK.NN.BB.AA.",
    "....YY.NN.BB.AA.",
    "....YY.NN.BB.AA.",
    "....YY.NN.BB.AA.",
    "KKKKKKKKKKKKKKKK",
    "K...............",
    "K...............",
  ],
};

// Folded newspaper with masthead + columns — for Reporter
const SPRITE_NEWSPAPER: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    ".KKKKKKKKKKKKKK.",
    ".KWWWWWWWWWWWWK.",
    ".KWAAAAAAAAAAWK.",
    ".KWWWWWWWWWWWWK.",
    ".KWKKKKKKKKKKWK.",
    ".KWKKKKKKKKKKWK.",
    ".KWWWWWWWWWWWWK.",
    ".KWKKKWKKKWKKWK.",
    ".KWKKKWKKKWKKWK.",
    ".KWKKKWKKKWKKWK.",
    ".KWKKKWKKKWKKWK.",
    ".KWKKKWKKKWKKWK.",
    ".KWWWWWWWWWWWWK.",
    ".KKKKKKKKKKKKKK.",
    "................",
  ],
};

// Hardhat with ridge — for Civil engineer
const SPRITE_HARDHAT: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    "................",
    "................",
    "......KKKK......",
    ".....KYYYYK.....",
    "....KYYKKYYK....",
    "...KYYYKKYYYK...",
    "..KYYYYYYYYYYK..",
    ".KYYYYYYYYYYYYK.",
    ".KKKKKKKKKKKKKK.",
    "KYYYYYYYYYYYYYYK",
    "KKKKKKKKKKKKKKKK",
    "................",
    "................",
    "................",
    "................",
  ],
};

// Bank facade: pediment + columns — for Financial manager
const SPRITE_BANK: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    "................",
    ".......KK.......",
    "......KKKK......",
    ".....KKKKKK.....",
    "....KKKKKKKK....",
    "...KKKKKKKKKK...",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    "..K..K..K..K..K.",
    "..K..K..K..K..K.",
    "..K..K..K..K..K.",
    "..K..K..K..K..K.",
    ".KKKKKKKKKKKKKK.",
    "KKKKKKKKKKKKKKKK",
    "................",
  ],
};

// Triangular oil derrick with cross-bracing — for Petroleum engineer
const SPRITE_DERRICK: Sprite = {
  w: 16,
  h: 16,
  palette: ROLE_PAL,
  rows: [
    "................",
    "........K.......",
    ".......K.K......",
    ".......K.K......",
    "......K...K.....",
    "......KKKKK.....",
    "......K...K.....",
    ".....K.....K....",
    ".....KKKKKKK....",
    ".....K.....K....",
    "....K.......K...",
    "....KKKKKKKKK...",
    "....K.......K...",
    "...K.........K..",
    "...K.KKKKKKK.K..",
    "KKKKKKKKKKKKKKKK",
  ],
};

const ROLE_SPRITES: Record<string, Sprite> = {
  scales: SPRITE_SCALES,
  chart: SPRITE_CHART,
  newspaper: SPRITE_NEWSPAPER,
  bridge: SPRITE_HARDHAT,
  bank: SPRITE_BANK,
  derrick: SPRITE_DERRICK,
};

// Gold medal (14×14) — red ribbon V above a gold disk with embossed center.
// K = ink outline, R = ribbon red, Y = gold, O = bronze/dark gold, H = cream highlight.
const MEDAL: Sprite = {
  w: 14,
  h: 14,
  palette: {
    K: INK,
    R: "#b83b28", // ribbon red
    Y: "#e8c04a", // bright gold
    O: "#a46f1f", // dark gold / bronze
    H: "#fff4d1", // cream highlight (top-left sheen)
  },
  rows: [
    ".R..........R.",
    ".RR........RR.",
    "..RR......RR..",
    "...RR....RR...",
    "....RR..RR....",
    ".....RRRR.....",
    "....KKKKKK....",
    "..KKYYYYYYKK..",
    ".KYHHYYYYYYYK.",
    "KYHHYYOOOOYYYK",
    "KYYYYOOOOYYYYK",
    ".KYYYOOOOYYYK.",
    "..KKYYYYYYKK..",
    "....KKKKKK....",
  ],
};

// Trophy cup with handles (14×14) — gold cup, dark-gold band, stepped base.
// K = ink, Y = bright gold, O = dark gold, H = cream highlight.
const TROPHY: Sprite = {
  w: 14,
  h: 14,
  palette: {
    K: INK,
    Y: "#e8c04a",
    O: "#a46f1f",
    H: "#fff4d1",
  },
  rows: [
    "..............",
    ".KKKKKKKKKKKK.",
    ".KHYYYYYYYYYK.",
    "KKKYYYYYYYYKKK",
    "K.KYYYYYYYYK.K",
    "KKKYYYYYYYYKKK",
    ".KYYYYYYYYYYK.",
    ".KYOOOOOOOOYK.",
    "..KYOOOOOOYK..",
    "...KKOOOOKK...",
    ".....KYYK.....",
    "....KKYYKK....",
    "...KKKKKKKK...",
    "..KKKKKKKKKK..",
  ],
};

// Pixel checkmark badge (7×7) — for small ornaments
const CHECK: Sprite = {
  w: 7,
  h: 7,
  palette: { "#": INK, R: ACC },
  rows: [
    ".......",
    ".....#.",
    "....##.",
    "#..##..",
    "####...",
    ".##....",
    ".......",
  ],
};

// ---------- Public components ----------

export function PixelLogo({ scale = 3 }: { scale?: number }) {
  return <SvgSprite sprite={HEAD} scale={scale} title="JobBench" />;
}

export function PixelMedal({ scale = 3 }: { scale?: number }) {
  return (
    <SvgSprite
      sprite={MEDAL}
      scale={scale}
      title="gold medal"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function PixelTrophy({ scale = 3 }: { scale?: number }) {
  return (
    <SvgSprite
      sprite={TROPHY}
      scale={scale}
      title="gold trophy"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function RolePixel({
  role,
  scale = 5,
  title,
}: {
  role: string;
  scale?: number;
  title?: string;
}) {
  const sprite = ROLE_SPRITES[role] ?? ROLE_SPRITES.scales;
  return (
    <SvgSprite
      sprite={sprite}
      scale={scale}
      title={title}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function PixelCheck({ scale = 2 }: { scale?: number }) {
  return <SvgSprite sprite={CHECK} scale={scale} />;
}

export function PixelAgent({
  scale = 6,
  pose = "neutral",
  tieColor,
}: {
  scale?: number;
  pose?: AgentPose;
  tieColor?: string;
}) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      setBlink(true);
      setTimeout(() => mounted && setBlink(false), 140);
      setTimeout(tick, 2800 + Math.random() * 2200);
    };
    const first = setTimeout(tick, 1800);
    return () => {
      mounted = false;
      clearTimeout(first);
    };
  }, []);

  const base = AGENT_VARIANTS[pose] ?? AGENT_VARIANTS.neutral;
  const sprite = blink ? base.blink : base.open;
  const finalSprite: Sprite = tieColor
    ? { ...sprite, palette: { ...sprite.palette, R: tieColor } }
    : sprite;

  return (
    <div className="inline-block relative">
      <SvgSprite
        sprite={finalSprite}
        scale={scale}
        title="JobBench agent"
        style={{ imageRendering: "pixelated" }}
      />
      {/* soft floor shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -6,
          width: 8 * scale,
          height: 4,
          background:
            "radial-gradient(ellipse at center, rgba(26,23,20,0.28) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// Stepped pixel bar — 14 segments HP/XP style. The last occupied segment
// fills proportionally (not all-or-nothing) so the bar reflects the true ratio.
export function PixelBar({
  value,
  max,
  color = ACC,
  segments = 14,
  height = 10,
}: {
  value: number;
  max: number;
  color?: string;
  segments?: number;
  height?: number;
}) {
  const ratio = Math.max(0, Math.min(1, value / max));
  const exactFilled = ratio * segments;
  const sunken = "var(--paper-sunken)";
  return (
    <div
      className="flex items-center gap-[2px] tnum"
      style={{ height }}
      aria-label={`${value.toFixed(1)} of ${max.toFixed(1)}`}
    >
      {Array.from({ length: segments }, (_, i) => {
        const frac = Math.max(0, Math.min(1, exactFilled - i));
        const stop = (frac * 100).toFixed(2);
        return (
          <span
            key={i}
            className="block flex-1 h-full rounded-[1px]"
            style={{
              background: `linear-gradient(to right, ${color} ${stop}%, ${sunken} ${stop}%)`,
              transition: "background 0.25s ease",
            }}
          />
        );
      })}
    </div>
  );
}

// Divider: alternating pixel squares in accent
export function PixelDivider({
  count = 9,
  size = 6,
}: {
  count?: number;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 py-2"
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="block"
          style={{
            width: size,
            height: size,
            backgroundColor:
              i % 2 === 0 ? "var(--accent)" : "var(--rule-strong)",
            opacity: i % 2 === 0 ? 0.85 : 0.6,
          }}
        />
      ))}
    </div>
  );
}
