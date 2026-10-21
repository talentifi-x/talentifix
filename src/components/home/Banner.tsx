import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";

export const Banner = () => {
  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-8 bg-[#F7F9FC]">
      <div className=" max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-center items-start justify-between lg:gap-12 relative overflow-hidden">
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

          The stage is a fixed-ratio box, so the art's rendered rect - and the
          logo inside it - lands in the same place at every width, which is
          what lets the two cards be positioned against it instead of against
          a container that does not track it.

          The art is inset rather than filling the stage. That inset is what
          opens the corner voids the cards sit in: the logo's silhouette runs
          x 18.9-82.7% and y 8.0-92.3% of the source, so the art carries almost
          no slack of its own.

          Below lg the stage is taller and the art is inset vertically far
          enough that the cards clear the logo outright, because at phone
          widths a card wide enough to read cannot fit in a corner void beside
          it. From lg there is room for the reference composition, with the
          cards tucked into the corners the hexagon leaves empty.
        */}
        <div className="relative w-full max-w-[380px] mx-auto lg:mx-0 lg:max-w-none lg:w-[600px] shrink-0 aspect-2/3 lg:aspect-3000/2604">
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
          <div className="absolute inset-x-0 inset-y-[18%] lg:inset-[11%]">
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

          {/* Floating Stats Card 1 (Top Right) */}
          <div className="absolute top-0 right-0 z-20 flex items-center gap-2.5 sm:gap-3 rounded-xl lg:rounded-2xl bg-white p-2.5 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
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

          {/* Floating Stats Card 2 (Bottom Left) */}
          <div className="absolute bottom-0 left-0 z-20 flex w-[132px] sm:w-[160px] lg:w-[185px] flex-col gap-1.5 sm:gap-2 lg:gap-3 rounded-xl lg:rounded-2xl bg-white p-2.5 sm:p-3.5 lg:p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)]">
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
