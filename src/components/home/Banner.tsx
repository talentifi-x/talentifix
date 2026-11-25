import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroStreams } from "./HeroStreams";
import { HeroLogo3D } from "./logo3d/HeroLogo3D";

/**
 * The two sides of the hero, one card each, in the colours of the stream behind
 * them: what AI does on the blue side, what people do on the coral side. Each
 * ends with the proof point that belongs to it: AI's speed (12 days to
 * qualified candidates) and human judgement (94% 90-day retention).
 */
const SIDES = [
  {
    title: "AI now does",
    lead: "What machines do best:",
    items: ["Speed", "Scale", "Pattern Recognition"],
    icon: "/icons/cloud.svg",
    paint: "linear-gradient(135deg, #0000FF 15%, #00B8F0 100%)",
    bar: "from-primary to-secondary",
    chip: "border-primary/15 bg-primary/[0.06] text-primary",
    figure: "12 days",
    measure: "to qualified candidates",
    figureColor: "text-primary",
    graphic: "days",
  },
  {
    title: "Humans do",
    lead: "what only humans can:",
    items: ["Judgement", "Intuition", "Cultural Understanding"],
    icon: "/icons/inspire.svg",
    paint: "linear-gradient(135deg, #D44A3D 15%, #F29A8E 100%)",
    bar: "from-[#E0574A] to-[#F6B1A7]",
    chip: "border-[#E0574A]/20 bg-[#E0574A]/[0.07] text-[#B5372B]",
    figure: "94%",
    measure: "90-day retention",
    figureColor: "text-[#C23F32]",
    graphic: "fill",
  },
] as const;

/** The 12 days, from pale blue to the brand blue. */
const DAYS = Array.from({ length: 12 }, (_, i) => {
  const t = i / 11;
  const mix = (from: number, to: number) => Math.round(from + (to - from) * t);
  return `rgb(${mix(160, 0)} ${mix(205, 0)} ${mix(255, 255)})`;
});

const CARD =
  "pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white/70 py-4 pl-5 pr-4 text-left " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_48px_-28px_rgba(15,23,42,0.5)] backdrop-blur-xl " +
  "lg:w-[284px] lg:py-5 lg:pl-6 lg:pr-5";

/**
 * One side: a slim bar in the side's colour, the line icon painted in it, the
 * heading and lead-in, the three points as chips, and the proof point drawn as
 * a strip of 12 days or a line filled to 94%.
 */
function SideCard({ side }: { side: (typeof SIDES)[number] }) {
  const icon = `url(${side.icon})`;
  return (
    <div className={CARD}>
      <span aria-hidden="true" className={`absolute inset-y-5 left-0 w-1 rounded-r-full bg-linear-to-b ${side.bar}`} />
      <div className="flex items-center gap-3">
        {/* The icon file is the shape; the colour is painted through it. */}
        <span
          aria-hidden="true"
          className="size-10 shrink-0 lg:size-11"
          style={{
            background: side.paint,
            maskImage: icon,
            WebkitMaskImage: icon,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight text-dark lg:text-xl">{side.title}</p>
          <p className="text-[13px] leading-snug text-dark/65">{side.lead}</p>
        </div>
      </div>
      <ul aria-label={side.lead.replace(":", "")} className="mt-3 flex flex-wrap gap-1.5">
        {side.items.map((item) => (
          <li key={item} className={`rounded-full border px-2.5 py-1 text-xs font-semibold leading-none lg:text-[13px] ${side.chip}`}>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-3.5 border-t border-dark/10 pt-3">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className={`whitespace-nowrap text-[22px] font-bold leading-none tracking-tight lg:text-2xl ${side.figureColor}`}>{side.figure}</span>
          <span className="text-xs font-medium text-dark/65 lg:text-[13px]">{side.measure}</span>
        </p>
        {side.graphic === "days" ? (
          <span aria-hidden="true" className="mt-2 flex h-1 w-full gap-[3px]">
            {DAYS.map((color, i) => (
              <span
                key={color}
                className="hero-stat-day h-full flex-1 rounded-full"
                style={{ backgroundColor: color, "--day": i } as CSSProperties}
              />
            ))}
          </span>
        ) : (
          <span aria-hidden="true" className="mt-2 flex h-1 w-full overflow-hidden rounded-full bg-[#E0574A]/15">
            <span className="hero-stat-fill h-full w-[94%] rounded-full bg-linear-to-r from-[#E0574A] to-[#F6B1A7]" />
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Homepage hero, kept to the essentials: the keyword H1, the slogan, two
 * actions, and the glass 3D emblem where the blue data streams meet the red
 * silk waves (HeroStreams), with "AI now does" on the blue side and "Humans
 * do" on the coral side.
 *
 * Sizes are fixed px per breakpoint (zoom-stable; see CLAUDE.md), so browser
 * zoom scales the hero like a picture instead of rearranging it.
 * - From lg it is one desktop layout: a grid whose rows are the H1, the
 *   slogan, the actions and a 400px emblem row, centred in at least one screen
 *   (min-height, so a short or zoomed-in window makes it taller, never crops
 *   it). The two side cards share the emblem's row, over the streams. Every
 *   item names its row: two items share the last one, and without that the
 *   grid would push one of them into a new, empty row.
 * - Below lg the first screen holds everything down to the emblem: that block
 *   is capped at the screen's height and the emblem's row shrinks to fit, so
 *   the whole emblem is in the first screen on phones (the one place a screen
 *   height is used for sizing; phones do not change layout on zoom). The side
 *   cards follow underneath.
 */
export const Banner = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-7xl px-site pb-9 text-center sm:pb-12 lg:grid lg:min-h-[calc(100svh-var(--site-header-height,7.5rem))] lg:grid-cols-1 lg:grid-rows-[auto_auto_auto_auto] lg:content-center lg:pb-10 lg:pt-10">
        {/*
          The first screen on phones and tablets. From lg its children join the grid
          directly. It stops 2.75rem short of the screen: the site has a fixed white
          fade along the bottom edge, and the emblem should stay clear of it.
        */}
        <div className="flex max-h-[max(calc(100svh-var(--site-header-height,7.5rem)-2.75rem),26rem)] flex-col items-center pt-6 sm:pt-10 lg:contents">
          {/* The H1 carries the search phrase; the slogan stays the visual headline. */}
          <h1 className="relative z-10 shrink-0 lg:col-start-1 lg:row-start-1 text-primary font-notch font-bold text-[13px] sm:text-sm md:text-base leading-relaxed tracking-[0.16em] sm:tracking-[0.18em] uppercase text-balance">
            AI, ML &amp; cybersecurity staffing in India and the US
          </h1>
          <p className="relative z-10 mt-3 shrink-0 lg:col-start-1 lg:row-start-2 text-[36px] min-[390px]:text-[42px] sm:text-[72px] lg:text-[92px] leading-[0.95] font-bold text-dark font-notch tracking-tight">
            Staffing<span className="text-secondary">.</span> Rebuilt<span className="text-secondary">.</span>
          </p>

          {/*
            Both actions share a height. Side by side from sm; on phones they
            fill the width, and under 390px the labels drop to 14px so both stay
            on one line from 360px (on 320px phones the longer one wraps,
            centred, with its arrow kept after the last word).
          */}
          <div className="relative z-10 mt-5 flex w-full shrink-0 flex-col justify-center gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:gap-4 lg:col-start-1 lg:row-start-3 lg:justify-self-center">
            <Link
              href="/start-hiring"
              className="bg-primary text-white min-h-12 sm:min-h-14 px-3 min-[390px]:px-5 sm:px-8 py-3 rounded-[5px] flex items-center justify-center text-sm min-[390px]:text-[15px] sm:text-base font-bold uppercase text-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <span className="text-balance sm:whitespace-nowrap">
                Discuss Your Hiring{" "}
                <span className="whitespace-nowrap">
                  Needs
                  <ArrowRight size={20} className="inline-block ml-2 -mt-0.5 align-middle" aria-hidden="true" />
                </span>
              </span>
            </Link>
            <Link
              href="/join-our-network"
              className="bg-white/90 text-primary border-2 border-primary min-h-12 sm:min-h-14 px-3 min-[390px]:px-5 sm:px-8 py-2.5 rounded-[5px] flex items-center justify-center text-sm min-[390px]:text-[15px] sm:text-base font-bold uppercase text-center backdrop-blur-sm hover:bg-white transition-colors"
            >
              <span className="text-balance sm:whitespace-nowrap">
                Explore Career{" "}
                <span className="whitespace-nowrap">
                  Opportunities
                  <ArrowRight size={20} className="inline-block ml-2 -mt-0.5 align-middle" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>

          {/*
            The emblem's row: 280px tall on phones and 430px on tablets (giving
            some back when the screen is short), 400px from lg.

            The streams are placed by their own centre: the point where the two
            meet (50.48% across the drawing, 48.44% down) is pinned to the centre
            of the row, where the emblem is. The drawing has a fixed width per
            breakpoint (2000px from lg), wider than the window on ordinary
            screens, so its faded side edges are off-screen and the streams run
            to the screen edge; zooming shows more or less of it, never a
            different arrangement.

            The emblem's canvas is 118% of the row's height, because the model
            keeps a margin around itself for its glow: the emblem itself is 86%
            of the row. The canvas is transparent there and sits under the text,
            so the overlap is harmless; the section clips it at narrow widths.
          */}
          <div className="relative mt-4 min-h-[140px] w-full shrink basis-[280px] sm:mt-6 sm:min-h-[260px] sm:basis-[430px] lg:col-start-1 lg:row-start-4 lg:mt-4 lg:h-[400px] lg:min-h-0 lg:basis-auto">
            <HeroStreams className="absolute left-1/2 top-1/2 z-0 aspect-3/2 w-[900px] sm:w-[1000px] md:w-[1300px] lg:w-[2000px] -translate-x-[50.48%] -translate-y-[48.44%]" />
            <div className="absolute left-1/2 top-1/2 z-[1] aspect-3000/2604 h-[118%] max-h-[700px] -translate-x-1/2 -translate-y-1/2">
              <HeroLogo3D />
            </div>
          </div>
        </div>

        {/*
          AI on the blue side, people on the coral side. From lg the two cards
          share the emblem's grid row, one at each side, and let clicks through
          to the emblem between them. Below lg they follow the emblem: stacked
          on phones, side by side from sm.
        */}
        <div className="relative z-10 mx-auto mt-6 grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-2 sm:gap-4 lg:pointer-events-none lg:col-start-1 lg:row-start-4 lg:mx-0 lg:mt-3 lg:flex lg:max-w-none lg:items-center lg:justify-between lg:self-center lg:px-[2%]">
          <SideCard side={SIDES[0]} />
          <SideCard side={SIDES[1]} />
        </div>
      </div>

      {/*
        The streams drawing is taller than the hero, so the section's edge would
        cut it off in a straight line. This fades it to white first, so the hero
        runs into the white top of the section below. It is z-0 and comes after
        the streams, so it covers them but stays under the emblem (z-1) and the
        cards (z-10).
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[22%] max-h-44 bg-linear-to-b from-white/0 to-white" />
    </section>
  );
};
