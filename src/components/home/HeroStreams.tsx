import type { CSSProperties, ReactNode } from "react";
import { HeroWater } from "./water/HeroWater";

/**
 * The backdrop of the homepage hero, drawn in code: blue data streams from the
 * left (AI) and red silk waves from the right (people), flowing in to meet
 * behind the emblem. It follows the brand's "Rebuild" artwork but is vector, so
 * it is sharp at every size and weighs a few KB instead of an image download.
 *
 * It is an illustration on a 1536 x 1024 canvas (the artwork's proportions),
 * scaled as one piece. The streams meet at (CX, CY); the hero pins that point to
 * the centre of the emblem.
 *
 * The drawing is SVG in the server HTML, with no script. The shapes never
 * change. Its motion is a transform or an opacity change on a whole layer,
 * which the browser runs on the compositor without redrawing:
 * - pulses of light run along the data lines and the silk threads towards the
 *   emblem, and broad soft light rolls along the blue band and over the silk
 *   (see FlowTrain),
 * - the dot texture inside the blue band drifts towards the emblem,
 * - the nodes on the data lines twinkle,
 * - on wider screens the veils and the silk sway a fraction of a degree.
 * On top, HeroWater draws moving water over both streams, pouring into the
 * emblem, with a shader in a background worker.
 * All of it stops for visitors who prefer reduced motion.
 */

const W = 1536;
const H = 1024;
const CX = 775.4;
const CY = 496;
/** The data streams run to here, under the emblem's halo, so they reach the emblem itself. */
const BLUE_END = 706;
/** The silk waves begin here, under the halo on the other side. */
const RED_START = 846;

const VIEW = { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", fill: "none" } as const;
const LAYER = "absolute inset-0 h-full w-full";

type P = [number, number];

/** A small filled circle as path data, so many dots can share one element. */
const dot = (x: number, y: number, r: number) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const round1 = (n: number) => Math.round(n * 10) / 10;
/** A fraction as a CSS percentage, to a thousandth of a percent. */
const pct = (fraction: number) => `${Math.round(fraction * 100000) / 1000}%`;

/** Repeatable pseudo-random number in [0, 1): the same drawing on every render. */
function rand(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A smooth path through the points (Catmull-Rom converted to cubic Béziers), in whole pixels. */
function spline(points: P[], close = false) {
  const r = Math.round;
  const last = points.length - 1;
  const at = (i: number) => (close ? points[(i + points.length) % points.length] : points[Math.max(0, Math.min(last, i))]);
  const d = [`M${r(points[0][0])} ${r(points[0][1])}`];
  for (let i = 0; i < (close ? points.length : last); i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    d.push(
      `C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ` +
        `${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)} ${r(p2[0])} ${r(p2[1])}`,
    );
  }
  return d.join("") + (close ? "Z" : "");
}

/* ------------------------------------------------------------------ */
/* Blue: data streams                                                  */
/* ------------------------------------------------------------------ */

type Stream = { edge: number; end: number; wobble: number; seed: number };

/** How far a stream has gathered at distance t (0 = screen edge, 1 = centre): fast at first, then level, like a horn. */
const gather = (t: number) => 1 - Math.pow(1 - t, 2.05);

function streamPoint(s: Stream, t: number): P {
  const ripple = s.wobble * Math.sin(s.seed + t * 6.2) * (1 - t) * Math.min(1, t * 5);
  return [lerp(-14, BLUE_END, t), lerp(s.edge, s.end, gather(t)) + ripple];
}
const streamCurve = (s: Stream, n = 9) => Array.from({ length: n }, (_, i) => streamPoint(s, i / (n - 1)));

/** A filled band between two streams. */
function streamBand(top: Stream, bottom: Stream) {
  return spline([...streamCurve(top), ...streamCurve(bottom).reverse()], true);
}

const BLUE_TOP: Stream = { edge: 326, end: CY - 42, wobble: 18, seed: 0.9 };
const BLUE_BOTTOM: Stream = { edge: 756, end: CY + 50, wobble: 12, seed: 3.4 };
const BLUE_CORE = streamBand(BLUE_TOP, BLUE_BOTTOM);
const BLUE_TOP_EDGE = spline(streamCurve(BLUE_TOP));
const BLUE_BOTTOM_EDGE = spline(streamCurve(BLUE_BOTTOM));

/** Pale veils around the core: wider, softer, blurred. */
const BLUE_VEILS = [
  streamBand({ edge: 216, end: CY - 84, wobble: 30, seed: 0.4 }, { edge: 560, end: CY + 6, wobble: 14, seed: 2.2 }),
  streamBand({ edge: 420, end: CY - 8, wobble: 12, seed: 5.1 }, { edge: 846, end: CY + 92, wobble: 30, seed: 4.3 }),
  streamBand({ edge: 266, end: CY - 64, wobble: 22, seed: 6.6 }, { edge: 806, end: CY + 72, wobble: 22, seed: 7.9 }),
];

const BLUE_LINES = Array.from({ length: 30 }, (_, i) => {
  const u = (i + 0.5) / 30;
  const stream: Stream = {
    edge: lerp(340, 746, u) + (rand(i * 3.1) - 0.5) * 9,
    end: CY + 4 + (u - 0.5) * 82,
    wobble: 3 + 9 * rand(i * 5.7),
    seed: i * 1.9,
  };
  return { stream, d: spline(streamCurve(stream)), weight: rand(i * 7.7) };
});

/** Long, loose lines of light sweeping in above and below the stream. */
const BLUE_SWEEPS = [
  { edge: 232, end: CY - 62, wobble: 34, seed: 0.7 },
  { edge: 268, end: CY - 54, wobble: 26, seed: 2.9 },
  { edge: 300, end: CY - 48, wobble: 30, seed: 5.2 },
  { edge: 786, end: CY + 58, wobble: 28, seed: 1.6 },
  { edge: 818, end: CY + 66, wobble: 34, seed: 4.1 },
  { edge: 852, end: CY + 74, wobble: 24, seed: 6.4 },
].map((stream, i) => ({ d: spline(streamCurve(stream, 11)), weight: rand(i * 3.3 + 9) }));
const BLUE_SWEEP_PATHS = BLUE_SWEEPS.map((sweep) => sweep.d).join("");

/** Glowing nodes sitting on the data lines. */
const BLUE_NODES = Array.from({ length: 27 }, (_, k) => {
  const line = BLUE_LINES[Math.floor(rand(k * 2.3) * BLUE_LINES.length)];
  const t = 0.03 + rand(k * 4.1) * 0.82;
  const [x, y] = streamPoint(line.stream, t);
  return { x: Math.round(x), y: Math.round(y), size: 0.55 + rand(k * 9.3) * 0.9, group: k % 3 };
});

/** Tiny specks of light between the lines. */
const BLUE_SPECKS = Array.from({ length: 46 }, (_, k) => {
  const t = 0.02 + rand(k * 3.7 + 50) * 0.86;
  const [x, y] = streamPoint({ edge: lerp(300, 780, rand(k * 6.1 + 50)), end: CY + 4 + (rand(k * 8.3) - 0.5) * 100, wobble: 0, seed: 0 }, t);
  return { x: Math.round(x), y: Math.round(y), r: 0.7 + rand(k * 1.3 + 50) * 1.1, o: 0.35 + rand(k * 2.9 + 50) * 0.55 };
});

/* ------------------------------------------------------------------ */
/* Red: silk waves                                                     */
/* ------------------------------------------------------------------ */

type Wave = { edge: number; amp: number; freq: number; phase: number };

/** A point on a wave at distance s (0 = centre, 1 = screen edge), moved `offset` px down. */
function wavePoint(w: Wave, s: number, offset = 0): P {
  const base = lerp(CY + 30 + (w.edge - 520) * 0.3, w.edge, Math.pow(s, 1.15));
  const swell = w.amp * Math.pow(s, 0.85) * Math.sin(w.phase + w.freq * s * Math.PI * 2);
  return [lerp(RED_START, W + 16, s), base + swell + offset];
}

/**
 * A ribbon of silk along a wave. A full ribbon is a thread at the centre and
 * widens towards the screen edge; a lobe (s0..s1) is rounded at both ends, like
 * the liquid shapes in the artwork.
 */
function ribbon(w: Wave, thick: number, s0 = 0, s1 = 1, n = 10) {
  const lobe = s0 > 0 || s1 < 1;
  const half = (s: number) => {
    const u = (s - s0) / (s1 - s0);
    const body = lobe ? Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.6) : 0.42 + 0.58 * Math.pow(s, 0.8);
    return (thick / 2) * body * (1 + 0.22 * Math.sin(w.phase * 1.7 + s * 6.5));
  };
  const at = (i: number) => s0 + ((s1 - s0) * i) / (n - 1);
  const top = Array.from({ length: n }, (_, i) => wavePoint(w, at(i), -half(at(i))));
  const bottom = Array.from({ length: n }, (_, i) => wavePoint(w, at(n - 1 - i), half(at(n - 1 - i))));
  return spline([...top, ...bottom], true);
}
const waveLine = (w: Wave, offset = 0, n = 10) => spline(Array.from({ length: n }, (_, i) => wavePoint(w, i / (n - 1), offset)));

/** Wide, pale veils behind the silk. */
const RED_VEILS = [
  ribbon({ edge: 300, amp: 44, freq: 0.9, phase: 0.4 }, 170),
  ribbon({ edge: 404, amp: 38, freq: 1.1, phase: 2.1 }, 140),
  ribbon({ edge: 650, amp: 46, freq: 0.8, phase: 4.0 }, 150),
];

const RED_WAVES: { wave: Wave; thick: number; tone: "coral" | "pink" | "light" }[] = [
  { wave: { edge: 388, amp: 30, freq: 1.25, phase: 0.9 }, thick: 50, tone: "light" },
  { wave: { edge: 430, amp: 34, freq: 1.45, phase: 2.6 }, thick: 60, tone: "pink" },
  { wave: { edge: 474, amp: 28, freq: 1.3, phase: 4.4 }, thick: 66, tone: "coral" },
  { wave: { edge: 516, amp: 36, freq: 1.6, phase: 1.7 }, thick: 58, tone: "pink" },
  { wave: { edge: 556, amp: 30, freq: 1.35, phase: 3.5 }, thick: 64, tone: "coral" },
  { wave: { edge: 596, amp: 38, freq: 1.5, phase: 5.6 }, thick: 50, tone: "light" },
  { wave: { edge: 630, amp: 32, freq: 1.2, phase: 0.2 }, thick: 42, tone: "pink" },
];
const RED_RIBBONS = RED_WAVES.map(({ wave, thick, tone }) => ({ d: ribbon(wave, thick), edge: waveLine(wave, -thick * 0.42), tone }));
const RED_RIBBON_PATHS = RED_RIBBONS.map((r) => r.d).join("");
const RED_RIBBON_EDGES = RED_RIBBONS.map((r) => r.edge).join("");

/** Rounded lobes of deeper coral in front, each with a pale highlight along its upper side. */
const RED_LOBES = [
  { wave: { edge: 528, amp: 30, freq: 1.5, phase: 2.2 }, thick: 36, s0: 0.22, s1: 0.66 },
  { wave: { edge: 574, amp: 34, freq: 1.4, phase: 3.9 }, thick: 44, s0: 0.34, s1: 0.84 },
  { wave: { edge: 492, amp: 26, freq: 1.7, phase: 5.0 }, thick: 28, s0: 0.16, s1: 0.52 },
  { wave: { edge: 612, amp: 30, freq: 1.3, phase: 0.8 }, thick: 32, s0: 0.48, s1: 0.94 },
  { wave: { edge: 452, amp: 28, freq: 1.55, phase: 1.1 }, thick: 26, s0: 0.4, s1: 0.8 },
].map((l) => ({
  d: ribbon(l.wave, l.thick, l.s0, l.s1),
  shine: ribbon({ ...l.wave, edge: l.wave.edge - l.thick * 0.2 }, l.thick * 0.3, l.s0 + 0.05, l.s1 - 0.07),
}));
const RED_LOBE_PATHS = RED_LOBES.map((l) => l.d).join("");

/** Fine threads following the waves. */
const RED_THREADS = Array.from({ length: 11 }, (_, i) => ({
  d: waveLine({ edge: 366 + i * 27, amp: 22 + rand(i * 4.7) * 24, freq: 1.1 + rand(i * 2.9) * 0.7, phase: i * 1.37 }),
  weight: rand(i * 6.3),
}));
const RED_THREAD_PATHS = RED_THREADS.map((t) => t.d).join("");

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

type Stops = readonly (readonly [number, string, number])[];

/** A left-to-right gradient across one side of the drawing. */
function Across({ id, from, to, stops }: { id: string; from: number; to: number; stops: Stops }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={from} y1={0} x2={to} y2={0}>
      {stops.map(([offset, color, opacity]) => (
        <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </linearGradient>
  );
}

// Offsets run from the screen edge (0) to the centre (1) on the blue side. Each
// stream keeps its colour right up to the emblem (its last stretch runs under the
// emblem glow, which carries the colour on), so the two read as one piece.
const BLUE = {
  core: [[0, "#1a58bd", 0.96], [0.3, "#247cd9", 0.95], [0.6, "#3fa9ec", 0.92], [0.82, "#6cc4f3", 0.9], [0.93, "#96d6f8", 0.84], [1, "#bfe8fb", 0.72]],
  veil: [[0, "#5fb0ee", 0.5], [0.55, "#a2daf9", 0.42], [0.86, "#bfe6ff", 0.36], [1, "#d6efff", 0.22]],
  line: [[0, "#8fd8ff", 0.4], [0.3, "#c6efff", 0.92], [0.9, "#ffffff", 0.95], [1, "#ffffff", 0.6]],
  edge: [[0, "#dff5ff", 0.85], [0.7, "#ffffff", 0.8], [1, "#ffffff", 0.45]],
  sweep: [[0, "#ffffff", 0], [0.12, "#e6f7ff", 0.75], [0.7, "#ffffff", 0.7], [1, "#ffffff", 0]],
} as const satisfies Record<string, Stops>;

// ...and from the centre (0) to the screen edge (1) on the red side.
const RED = {
  coral: [[0, "#f5a094", 0.62], [0.05, "#f5a094", 0.8], [0.5, "#ec786c", 0.92], [0.82, "#f0938a", 0.86], [1, "#f5aca2", 0.76]],
  pink: [[0, "#f9c0b8", 0.52], [0.05, "#f9c0b8", 0.68], [0.5, "#f4a097", 0.8], [1, "#f8bdb6", 0.68]],
  light: [[0, "#fcd9d4", 0.46], [0.06, "#fcd9d4", 0.62], [0.6, "#fac6c0", 0.68], [1, "#fbd3ce", 0.58]],
  veil: [[0, "#fbd0ca", 0.26], [0.15, "#fbd0ca", 0.4], [1, "#f8bcb4", 0.4]],
  lobe: [[0, "#f6a79c", 0.3], [0.3, "#ee8073", 0.92], [0.65, "#e7695c", 0.94], [1, "#f1968b", 0.88]],
  thread: [[0, "#ffffff", 0.45], [0.15, "#fff3f1", 0.8], [0.7, "#ffe4e0", 0.7], [1, "#ffd9d4", 0.55]],
} as const satisfies Record<string, Stops>;

/** The light that flows along the streams: blue side (edge 0 to centre 1), then red side (centre 0 to edge 1). */
const FLOW = {
  line: [[0, "#ffffff", 0], [0.1, "#ffffff", 1], [0.85, "#ffffff", 1], [1, "#ffffff", 0.4]],
  glow: [[0, "#bdefff", 0], [0.1, "#bdefff", 0.55], [0.8, "#d6f6ff", 0.5], [1, "#ffffff", 0]],
  sweep: [[0, "#6cc6ff", 0], [0.14, "#6cc6ff", 0.85], [0.75, "#a6e0ff", 0.7], [1, "#ffffff", 0]],
  band: [[0, "#ffffff", 0], [0.12, "#ffffff", 0.3], [0.78, "#ffffff", 0.2], [1, "#ffffff", 0]],
  thread: [[0, "#ffffff", 0.5], [0.08, "#ffffff", 0.95], [1, "#ffffff", 0.8]],
  threadGlow: [[0, "#ffd0c8", 0], [0.1, "#ffd0c8", 0.55], [1, "#ffd9d2", 0.45]],
  silk: [[0, "#fff3f0", 0], [0.12, "#fff3f0", 0.5], [1, "#fff3f0", 0.38]],
} as const satisfies Record<string, Stops>;

/** A soft tint behind each stream. */
const WASH =
  "radial-gradient(ellipse 34% 30% at 8% 52%, rgba(40, 120, 220, 0.2), transparent 72%), " +
  "radial-gradient(ellipse 32% 26% at 93% 52%, rgba(240, 120, 110, 0.16), transparent 72%)";

/** Fades the drawing out at its four edges, so it never ends in a visible line. */
const EDGES =
  "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%), " +
  "linear-gradient(to right, transparent 0%, #000 5.5%, #000 94.5%, transparent 100%)";

const sway = (from: number, to: number, seconds: number, delay = 0) =>
  ({ "--sway-from": `${from}deg`, "--sway-to": `${to}deg`, "--sway-duration": `${seconds}s`, "--sway-delay": `${delay}s` }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Flow                                                                */
/* ------------------------------------------------------------------ */

/** Where a pulse sits in one spacing of a train: its brightest point and its length, both 0-1 of the spacing. */
type Pulse = readonly [at: number, length: number];

/**
 * The window of a train as a CSS mask: soft pulses shaped like comets, bright
 * at the head, which leads in the direction of travel, with a long fading tail.
 * `step` is one spacing as a fraction of the window's width.
 */
function pulseMask(pulses: readonly Pulse[], step: number, towardsRight: boolean) {
  const stops = ["transparent 0%"];
  for (const [at, length] of pulses) {
    const head = length * 0.25;
    const [from, to] = towardsRight ? [at - length, at + head] : [at - head, at + length];
    stops.push(`transparent ${pct(from * step)}`, `#000 ${pct(at * step)}`, `transparent ${pct(to * step)}`);
  }
  stops.push(`transparent ${pct(step)}`);
  return `repeating-linear-gradient(90deg, ${stops.join(", ")})`;
}

/**
 * A train of pulses of light travelling along one side of the drawing towards
 * the emblem, over a bright copy of some of its lines or shapes (`children`).
 *
 * It is a window and a picture. The picture, the bright copy, sits exactly on
 * the originals. The window is a mask of evenly spaced soft pulses that slides
 * towards the emblem by one spacing per cycle and starts again, which is
 * seamless because the pulses repeat at that spacing. So that the window moves
 * and the picture does not, the picture slides back by the same distance. Both
 * are transforms (.hero-flow in global.css): the light travels with no
 * redrawing at all.
 */
function FlowTrain({
  side,
  period,
  seconds,
  delay = 0,
  pulses,
  children,
}: {
  /** "blue" runs left to right over the data streams; "red" right to left over the silk. */
  side: "blue" | "red";
  /** Spacing of the pulses, as a fraction of the drawing's width. */
  period: number;
  /** Time to travel one spacing. */
  seconds: number;
  delay?: number;
  pulses: readonly Pulse[];
  children: ReactNode;
}) {
  const blue = side === "blue";
  // The stretch of the drawing the stream covers, as fractions of its width.
  const start = blue ? 0 : RED_START / W;
  const span = blue ? BLUE_END / W : 1 - start;
  // The window covers the stream plus one spacing upstream, so it never comes up short as it slides.
  const outer = span + period;
  const step = period / outer;
  const mask = pulseMask(pulses, step, blue);
  return (
    <div
      className="hero-flow absolute inset-y-0 overflow-hidden"
      style={
        {
          left: pct(blue ? -period : start),
          width: pct(outer),
          maskImage: mask,
          WebkitMaskImage: mask,
          "--flow-window": pct(blue ? step : -step),
          "--flow-picture": pct(blue ? -period : period),
          "--flow-duration": `${seconds}s`,
          "--flow-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <svg
        {...VIEW}
        className="hero-flow-picture absolute inset-y-0 h-full max-w-none"
        style={{ left: pct(blue ? step : -start / outer), width: pct(1 / outer) }}
      >
        {children}
      </svg>
    </div>
  );
}

/** The data lines in three sets, each with its own train of pulses, so the light never moves in step. */
const linesOf = (set: number) =>
  BLUE_LINES.filter((_, i) => i % 3 === set)
    .map((line) => line.d)
    .join("");
const BLUE_TRAINS = [
  { d: linesOf(0) + BLUE_TOP_EDGE, period: 0.13, seconds: 2.4, delay: 0, pulses: [[0.42, 0.34]], sweeps: false },
  { d: linesOf(1) + BLUE_BOTTOM_EDGE, period: 0.17, seconds: 3.3, delay: -1.4, pulses: [[0.3, 0.22], [0.84, 0.3]], sweeps: false },
  { d: linesOf(2), period: 0.11, seconds: 1.9, delay: -0.7, pulses: [[0.62, 0.42]], sweeps: true },
] as const;

/** The dot texture in the blue band drifts this far per cycle: eight dot spacings, so the loop is seamless. */
const DOT_SPACING = 11;
const DRIFT = DOT_SPACING * 8;

/** The blue band as a mask image: where the dot texture shows, fading out towards the emblem. */
const DOTS_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">` +
    `<linearGradient id="f" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${BLUE_END}" y2="0">` +
    `<stop offset="0" stop-color="#fff"/><stop offset="0.3" stop-color="#fff" stop-opacity="0.75"/>` +
    `<stop offset="0.56" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<path d="${BLUE_CORE}" fill="url(#f)"/></svg>`,
)}")`;

export function HeroStreams({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ maskImage: EDGES, WebkitMaskImage: EDGES, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
    >
      <div className={LAYER} style={{ backgroundImage: WASH }} />

      {/* ---------------- Blue: data streams ---------------- */}

      {/* Veils. */}
      <svg {...VIEW} className={`${LAYER} hero-sway blur-[9px]`} style={sway(-0.4, 0.35, 13)}>
        <defs>
          <Across id="hs-blue-veil" from={0} to={BLUE_END} stops={BLUE.veil} />
        </defs>
        {BLUE_VEILS.map((d) => (
          <path key={d} d={d} fill="url(#hs-blue-veil)" />
        ))}
      </svg>

      {/* The sweeps and the core band. */}
      <svg {...VIEW} className={LAYER}>
        <defs>
          <Across id="hs-blue-core" from={0} to={BLUE_END} stops={BLUE.core} />
          <Across id="hs-blue-sweep" from={0} to={BLUE_END} stops={BLUE.sweep} />
          {/* Lighter along the top, deeper along the bottom: gives the band its volume. */}
          <linearGradient id="hs-blue-depth" gradientUnits="userSpaceOnUse" x1={0} y1={330} x2={0} y2={750}>
            <stop offset={0} stopColor="#ffffff" stopOpacity={0.26} />
            <stop offset={0.45} stopColor="#ffffff" stopOpacity={0} />
            <stop offset={1} stopColor="#0a3d91" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <path d={BLUE_SWEEP_PATHS} stroke="url(#hs-blue-sweep)" strokeWidth={1.6} strokeLinecap="round" opacity={0.75} />
        <path d={BLUE_CORE} fill="url(#hs-blue-core)" />
        <path d={BLUE_CORE} fill="url(#hs-blue-depth)" />
      </svg>

      {/* The band's dot-matrix texture, drifting towards the emblem inside the band. */}
      <div
        className={LAYER}
        style={{
          maskImage: DOTS_MASK,
          WebkitMaskImage: DOTS_MASK,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <svg
          viewBox={`${-DRIFT} 0 ${W + DRIFT} ${H}`}
          preserveAspectRatio="none"
          fill="none"
          className="hero-drift absolute inset-y-0 h-full max-w-none"
          style={{ left: pct(-DRIFT / W), width: pct((W + DRIFT) / W), "--drift": pct(DRIFT / (W + DRIFT)) } as CSSProperties}
        >
          <defs>
            <pattern id="hs-matrix" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
              <circle cx={2} cy={2} r={1.1} fill="#c3ebff" />
            </pattern>
          </defs>
          <rect x={-DRIFT} width={BLUE_END + DRIFT} height={H} fill="url(#hs-matrix)" opacity={0.55} />
        </svg>
      </div>

      {/* Broad soft light rolling along the band. */}
      <FlowTrain side="blue" period={0.3} seconds={5.6} delay={-3} pulses={[[0.6, 0.55]]}>
        <path d={BLUE_CORE} fill="url(#hs-flow-band)" />
      </FlowTrain>

      {/* The data lines, the band's edges and the specks. */}
      <svg {...VIEW} className={LAYER}>
        <defs>
          <Across id="hs-blue-line" from={0} to={BLUE_END} stops={BLUE.line} />
          <Across id="hs-blue-edge" from={0} to={BLUE_END} stops={BLUE.edge} />
          <Across id="hs-flow-line" from={0} to={BLUE_END} stops={FLOW.line} />
          <Across id="hs-flow-glow" from={0} to={BLUE_END} stops={FLOW.glow} />
          <Across id="hs-flow-sweep" from={0} to={BLUE_END} stops={FLOW.sweep} />
          <Across id="hs-flow-band" from={0} to={BLUE_END} stops={FLOW.band} />
        </defs>
        {[0, 1, 2].map((weight) => (
          <path
            key={weight}
            d={BLUE_LINES.filter((line) => Math.min(2, Math.floor(line.weight * 3)) === weight)
              .map((line) => line.d)
              .join("")}
            stroke="url(#hs-blue-line)"
            strokeWidth={1.1 + weight * 0.55}
            strokeLinecap="round"
            opacity={0.55 + weight * 0.2}
          />
        ))}
        <path d={BLUE_TOP_EDGE} stroke="url(#hs-blue-edge)" strokeWidth={2.2} strokeLinecap="round" />
        <path d={BLUE_BOTTOM_EDGE} stroke="url(#hs-blue-edge)" strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
        <path d={BLUE_SPECKS.map((s) => dot(s.x, s.y, round1(s.r))).join("")} fill="#ffffff" opacity={0.62} />
      </svg>

      {/* Pulses of light running along the data lines (and the sweeps) into the emblem. */}
      {BLUE_TRAINS.map((train) => (
        <FlowTrain key={train.period} side="blue" period={train.period} seconds={train.seconds} delay={train.delay} pulses={train.pulses}>
          {train.sweeps && <path d={BLUE_SWEEP_PATHS} stroke="url(#hs-flow-sweep)" strokeWidth={2.2} strokeLinecap="round" />}
          <path d={train.d} stroke="url(#hs-flow-glow)" strokeWidth={6.5} strokeLinecap="round" />
          <path d={train.d} stroke="url(#hs-flow-line)" strokeWidth={2.2} strokeLinecap="round" />
        </FlowTrain>
      ))}

      {/* Nodes, in three layers that twinkle out of step. */}
      {[0, 1, 2].map((group) => (
        <svg
          key={group}
          {...VIEW}
          className={`${LAYER} hero-twinkle`}
          style={{ "--twinkle-duration": `${3.2 + group * 1.3}s`, "--twinkle-delay": `${-group * 1.1}s` } as CSSProperties}
        >
          {/* A soft glow (one blurred element) under bright cores (another). */}
          <path
            d={BLUE_NODES.filter((n) => n.group === group).map((n) => dot(n.x, n.y, round1(8 * n.size))).join("")}
            fill="#a9e2ff"
            opacity={0.6}
            style={{ filter: "blur(5px)" }}
          />
          <path
            d={BLUE_NODES.filter((n) => n.group === group).map((n) => dot(n.x, n.y, round1(2.6 * n.size))).join("")}
            fill="#ffffff"
          />
        </svg>
      ))}

      {/* ---------------- Red: silk waves ---------------- */}

      {/* Veils. */}
      <svg {...VIEW} className={`${LAYER} hero-sway blur-[8px]`} style={sway(0.5, -0.45, 15, -4)}>
        <defs>
          <Across id="hs-red-veil" from={RED_START} to={W} stops={RED.veil} />
        </defs>
        {RED_VEILS.map((d) => (
          <path key={d} d={d} fill="url(#hs-red-veil)" />
        ))}
      </svg>

      {/* The ribbons, each with a pale highlight along its upper edge. */}
      <svg {...VIEW} className={`${LAYER} hero-sway`} style={sway(-0.45, 0.4, 12, -2)}>
        <defs>
          <Across id="hs-red-coral" from={RED_START} to={W} stops={RED.coral} />
          <Across id="hs-red-pink" from={RED_START} to={W} stops={RED.pink} />
          <Across id="hs-red-light" from={RED_START} to={W} stops={RED.light} />
          <Across id="hs-red-thread" from={RED_START} to={W} stops={RED.thread} />
          <Across id="hs-flow-thread" from={RED_START} to={W} stops={FLOW.thread} />
          <Across id="hs-flow-thread-glow" from={RED_START} to={W} stops={FLOW.threadGlow} />
          <Across id="hs-flow-silk" from={RED_START} to={W} stops={FLOW.silk} />
        </defs>
        {RED_RIBBONS.map((r) => (
          <path key={r.d} d={r.d} fill={`url(#hs-red-${r.tone})`} />
        ))}
        <path d={RED_RIBBON_EDGES} stroke="url(#hs-red-thread)" strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
      </svg>

      {/* Light rolling over the ribbons towards the emblem; it sways with them. */}
      <div className={`${LAYER} hero-sway`} style={sway(-0.45, 0.4, 12, -2)}>
        <FlowTrain side="red" period={0.24} seconds={4.6} delay={-1} pulses={[[0.32, 0.5]]}>
          <path d={RED_RIBBON_PATHS} fill="url(#hs-flow-silk)" />
          <path d={RED_RIBBON_EDGES} stroke="url(#hs-flow-thread)" strokeWidth={1.8} strokeLinecap="round" />
        </FlowTrain>
      </div>

      {/* Lobes and fine threads in front. */}
      <svg {...VIEW} className={`${LAYER} hero-sway`} style={sway(0.35, -0.4, 9.5, -6)}>
        <defs>
          <Across id="hs-red-lobe" from={RED_START} to={W} stops={RED.lobe} />
        </defs>
        <path d={RED_LOBE_PATHS} fill="url(#hs-red-lobe)" />
        <path d={RED_LOBES.map((l) => l.shine).join("")} fill="#fff1ee" opacity={0.42} />
        <path d={RED_THREAD_PATHS} stroke="url(#hs-red-thread)" strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
      </svg>

      {/* Light rolling over the lobes, and pulses running along the threads; they sway with them. */}
      <div className={`${LAYER} hero-sway`} style={sway(0.35, -0.4, 9.5, -6)}>
        <FlowTrain side="red" period={0.28} seconds={5.2} delay={-2.5} pulses={[[0.3, 0.55]]}>
          <path d={RED_LOBE_PATHS} fill="url(#hs-flow-silk)" />
        </FlowTrain>
        <FlowTrain side="red" period={0.15} seconds={2.7} pulses={[[0.3, 0.3], [0.74, 0.22]]}>
          <path d={RED_THREAD_PATHS} stroke="url(#hs-flow-thread-glow)" strokeWidth={6} strokeLinecap="round" />
          <path d={RED_THREAD_PATHS} stroke="url(#hs-flow-thread)" strokeWidth={2} strokeLinecap="round" />
        </FlowTrain>
      </div>

      {/* Moving water over both streams, flowing into the emblem. */}
      <HeroWater />
    </div>
  );
}
