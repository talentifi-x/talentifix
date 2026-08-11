"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { GalleryImage } from "@data/mediaData";

/** Seconds spent scrolling past a single image. Lower is faster. */
const SECONDS_PER_IMAGE = 5;

/**
 * How many times to repeat the image set inside the track.
 * Must stay even so the -50% keyframe lands on an identical frame. Short
 * sets get more copies so the track always overflows a wide viewport.
 */
function copiesFor(count: number) {
  if (count >= 6) return 2;
  if (count >= 3) return 4;
  return 6;
}

export function GccCarousel({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  const copies = copiesFor(images.length);
  const track = Array.from({ length: copies }, () => images).flat();
  // The animation traverses half the track, i.e. copies / 2 sets.
  const duration = (copies / 2) * images.length * SECONDS_PER_IMAGE;

  return (
    <div
      className="group relative w-full"
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {/* Soften both edges so images enter and leave rather than being cut off.
          These sit OUTSIDE the scrolling box below: under prefers-reduced-motion
          that box becomes a horizontal scroller, and absolutely positioned
          children of a scroller drift away with the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-28 bg-linear-to-r from-white to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-28 bg-linear-to-l from-white to-transparent"
      />

      <div className="overflow-hidden motion-reduce:overflow-x-auto">
        {/* Spacing lives on each item as a trailing margin rather than on the
            flex container as a gap. `gap` only goes BETWEEN items, so N items
            carry N-1 gaps and translateX(-50%) would land half a gap short of
            the seam, jolting the strip sideways once per cycle. A trailing
            margin makes every copy exactly the same width, so -50% is exact. */}
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((photo, index) => {
            const isClone = index >= images.length;
            return (
              <li
                key={`${photo.src}-${index}`}
                aria-hidden={isClone || undefined}
                className="mr-4 md:mr-6 shrink-0 h-60 sm:h-75 md:h-90 overflow-hidden rounded-[10px] border border-gray-200 bg-grey-accent"
              >
                <Image
                  src={photo.src}
                  alt={isClone ? "" : photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 768px) 70vw, 480px"
                  /* max-w-none: preflight's `img { max-width: 100% }` resolves
                     against a parent whose width this image defines, which
                     WebKit can collapse. */
                  className="h-full w-auto max-w-none object-cover"
                  loading="lazy"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
