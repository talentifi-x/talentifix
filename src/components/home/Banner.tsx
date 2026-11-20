import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";

export const Banner = () => {
  return (
    <section className="w-full pt-8 sm:pt-12 pb-14 sm:pb-20 lg:pb-24 px-6 md:px-8 bg-[#F7F9FC]">
      {/*
        Below lg the text comes first and the graphic follows, so a phone's first
        screen shows the H1, the slogan and both actions (it used to show only the
        art). From lg it is the two-column layout: text left, graphic right.
      */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center items-start justify-between gap-10 sm:gap-12 relative">
        <div className="flex flex-col gap-7 sm:gap-8 w-full lg:w-auto z-10">
          {/* The H1 carries the search phrase; the slogan stays the visual headline. */}
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-notch font-bold text-[13px] sm:text-sm md:text-base leading-relaxed tracking-[0.16em] sm:tracking-[0.18em] uppercase">
              AI, ML &amp; cybersecurity staffing in India and the US
            </h1>
            <p className="text-[56px] sm:text-[64px] md:text-[80px] leading-[0.95] font-bold text-dark font-notch tracking-tight">
              Staffing<span className="text-secondary">.</span> <br />
              Rebuilt<span className="text-secondary">.</span>
            </p>
          </div>

          {/*
            Both actions share one height, size and alignment. On phones the label
            drops to 15px with tighter padding so "Find your next opportunity"
            stays on one line next to its arrow; on the narrowest phones it may
            wrap, and then it wraps centred.
          */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-1 sm:mt-4 w-full sm:max-w-140 lg:max-w-none">
            <Link
              href="/start-hiring"
              className="bg-primary text-white min-h-14 px-4 sm:px-8 py-3.5 rounded-[5px] flex items-center justify-center gap-2 text-[15px] sm:text-base font-bold uppercase text-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {/* The arrow sits inline after the last word, so a wrapped label stays centred with it. */}
              <span className="text-balance">
                Hire{" "}
                <span className="whitespace-nowrap">
                  Smarter
                  <ArrowRight size={20} className="inline-block ml-2 -mt-0.5 align-middle" aria-hidden="true" />
                </span>
              </span>
            </Link>
            <Link
              href="/join-our-network"
              className="bg-white text-primary border-2 border-primary min-h-14 px-4 sm:px-8 py-3 rounded-[5px] flex items-center justify-center gap-2 text-[15px] sm:text-base font-bold uppercase text-center hover:bg-primary/5 transition-colors"
            >
              <span className="text-balance">
                Find Your Next{" "}
                <span className="whitespace-nowrap">
                  Opportunity
                  <ArrowRight size={20} className="inline-block ml-2 -mt-0.5 align-middle" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/*
          Right Content - 3D Graphic.

          Below lg it is a plain stack - card, art, card - so the space between
          each card and the logo is the art's own empty margin plus gap-3, and
          stays close to constant as the width grows. (An earlier 2:3 box with
          the cards pinned to its corners grew that space with the width while
          the cards stayed the same size.) At phone widths a card wide enough
          to read cannot sit in a corner void beside the logo, so it sits above
          and below instead.

          From lg the stage is a fixed-ratio box, so the art's rendered rect -
          and the logo inside it - lands in the same place at every width, and
          the cards are pinned against it as in the reference. The art is inset
          11% to open the corner voids the hexagon leaves empty: its silhouette
          runs x 18.9-83.5% and y 8.0-92.3% of the source, so the art carries
          almost no slack of its own. The bottom card sits off the stage edge
          and overhangs left so its shadow has room and it stays clear of the
          hexagon's lower-left edge.

          The container used to be overflow-hidden, for an image box that
          overflowed this column. Nothing does now, and the clip was cutting the
          card shadows into a hard line.
        */}
        {/* 500px at lg (1024-1279) leaves the text column room for both buttons on
            one line; 600px from xl as before. The stage keeps its ratio, so the
            pinned cards scale with it. */}
        <div className="relative flex flex-col gap-3 w-full max-w-[380px] mx-auto lg:block lg:mx-0 lg:max-w-none lg:w-[500px] xl:w-[600px] shrink-0 lg:aspect-3000/2604">
          {/*
            No blurred glow behind the art. The asset is opaque and carries the
            section's own #F7F9FC as its background, which is what makes its
            rectangle invisible; a glow behind it would tint only the area
            outside that rectangle and draw the edge back in. The artwork has
            its own glow baked in.

            The background is baked in rather than shipped as alpha because
            Next serves JPEG to any client that does not send
            Accept: image/webp, and that flattens transparency onto black.
          */}

          {/* Floating Stats Card 1 (Top Right) */}
          {/* Phone sizes were 10-11px labels; they now start at 12-13px so the cards read at arm's length. */}
          <div className="self-end lg:absolute lg:top-[3%] lg:right-0 z-20 flex items-center gap-3 rounded-xl lg:rounded-2xl bg-white p-3 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
            <span className="flex size-9 lg:size-11 shrink-0 items-center justify-center rounded-lg lg:rounded-xl bg-primary">
              <Check
                className="size-5 lg:size-6 text-white"
                strokeWidth={3.5}
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-[24px] sm:text-[26px] lg:text-[32px] font-bold leading-none text-dark">
                94%
              </span>
              <span className="mt-1 text-xs lg:text-sm leading-tight text-gray-600">
                90-day retention
              </span>
            </span>
          </div>

          <div className="relative w-full aspect-3000/2604 lg:absolute lg:inset-[11%] lg:w-auto lg:aspect-auto">
            <Image
              src="/banner-home/talentifi-x-3d-logo-staffing-rebuilt.webp"
              alt="TalentiFi-X emblem in blue and turquoise glass"
              fill
              sizes="(max-width: 1023px) 380px, (max-width: 1279px) 500px, 600px"
              className="object-contain"
              // The page's LCP element: preload puts it in <head> so it downloads with the HTML.
              preload
              fetchPriority="high"
              loading="eager"
            />
          </div>

          {/* Floating Stats Card 2 (Bottom Left) */}
          <div className="self-start lg:absolute lg:bottom-[4%] lg:-left-[4%] z-20 flex w-[160px] lg:w-[185px] flex-col gap-2 lg:gap-3 rounded-xl lg:rounded-2xl bg-white p-3 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
            <span className="flex size-9 lg:size-11 items-center justify-center rounded-lg lg:rounded-xl bg-primary/10">
              <Clock
                className="size-5 lg:size-6 text-primary"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
            <span className="text-[13px] lg:text-[16px] font-bold leading-snug text-dark">
              12 days to qualified candidates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
