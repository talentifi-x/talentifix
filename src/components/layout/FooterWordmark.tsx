"use client";

import React, { useEffect, useState } from "react";

/**
 * The oversized footer wordmark and its blur, hidden when the page is zoomed in
 * (it would overflow). The only part of the footer that needs the browser.
 */
export const FooterWordmark = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const checkZoom = () => {
      // Heuristic: compare window.outerWidth (browser window) with innerWidth (viewport)
      // When zooming in, innerWidth decreases, so the ratio increases.
      // Threshold 1.02 accounts for minor rounding differences.
      const zoomLevel = window.outerWidth / window.innerWidth;
      setIsZoomed(zoomLevel > 1.02);
    };

    checkZoom();
    window.addEventListener("resize", checkZoom);
    return () => window.removeEventListener("resize", checkZoom);
  }, []);

  if (isZoomed) return null;

  return (
    <>
      <div className="w-full flex justify-center mt-10 md:-mb-6 lg:-mb-12 relative z-0">
        {/* Decorative wordmark - not a heading, so every page keeps a single H1 */}
        <div className="text-[20vw] md:text-[clamp(150px,20vw,300px)] font-bold font-notch bg-linear-to-r from-[#0000FF] to-secondary bg-clip-text text-transparent text-center select-none whitespace-nowrap leading-none tracking-tight">
          TalentiFi-X
        </div>
      </div>

      {/* Non-moving Blur for Big Text Bottom - Scrolls with footer */}
      <div className="absolute bottom-0 left-0 w-full h-30 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent backdrop-blur-[1px]" />
      </div>
    </>
  );
};
