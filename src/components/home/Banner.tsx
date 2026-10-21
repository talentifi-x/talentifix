import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";

export const Banner = () => {
  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-8 bg-[#F7F9FC]">
      <div className=" max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-center items-start justify-between lg:gap-12 relative">
        {/* Left Content. The graphic above now reserves a band under the art for
            the bottom-left card, so the old sm:-mt-20 would pull this text into
            it; the gap it used to close is part of that band. */}
        <div className="flex flex-col gap-8 mt-4 lg:mt-0 z-10">
          <h1 className="text-[50px] md:text-[80px] leading-none font-bold text-dark font-notch tracking-tight">
            Staffing<span className="text-secondary">.</span> <br />
            Rebuilt<span className="text-secondary">.</span>
          </h1>

          <div className="flex flex-col  gap-4 mt-4">
            <Link
              href="/start-hiring"
              className="bg-primary text-white px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Hire Smarter
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/join-our-network"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-[5px] flex items-center justify-center gap-2 font-bold uppercase hover:bg-gray-50 transition-colors"
            >
              Find Your Next Opportunity
              <ArrowRight size={20} />
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
        <div className="relative flex flex-col gap-3 w-full max-w-[380px] mx-auto lg:block lg:mx-0 lg:max-w-none lg:w-[600px] shrink-0 lg:aspect-3000/2604">
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
          <div className="self-end lg:absolute lg:top-[3%] lg:right-0 z-20 flex items-center gap-2.5 sm:gap-3 rounded-xl lg:rounded-2xl bg-white p-2.5 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
            <span className="flex size-7 sm:size-9 lg:size-11 shrink-0 items-center justify-center rounded-md sm:rounded-lg lg:rounded-xl bg-primary">
              <Check
                className="size-4 sm:size-5 lg:size-6 text-white"
                strokeWidth={3.5}
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-[20px] sm:text-[26px] lg:text-[32px] font-bold leading-none text-dark">
                94%
              </span>
              <span className="mt-1 text-[10px] sm:text-xs lg:text-sm leading-tight text-gray-500">
                90-day retention
              </span>
            </span>
          </div>

          <div className="relative w-full aspect-3000/2604 lg:absolute lg:inset-[11%] lg:w-auto lg:aspect-auto">
            <Image
              src="/banner-home/talentifi-x-3d-logo-staffing-rebuilt.webp"
              alt="Staffing Rebuilt 3D Graphic"
              fill
              sizes="(max-width: 1023px) 380px, 600px"
              className="object-contain"
              fetchPriority="high"
              loading="eager"
            />
          </div>

          {/* Floating Stats Card 2 (Bottom Left) */}
          <div className="self-start lg:absolute lg:bottom-[4%] lg:-left-[4%] z-20 flex w-[132px] sm:w-[160px] lg:w-[185px] flex-col gap-1.5 sm:gap-2 lg:gap-3 rounded-xl lg:rounded-2xl bg-white p-2.5 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
            <span className="flex size-7 sm:size-9 lg:size-11 items-center justify-center rounded-md sm:rounded-lg lg:rounded-xl bg-primary/10">
              <Clock
                className="size-4 sm:size-5 lg:size-6 text-primary"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
            <span className="text-[11px] sm:text-[13px] lg:text-[16px] font-bold leading-snug text-dark">
              12 days to qualified candidates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
