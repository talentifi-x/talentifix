"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO_COLORS, LOGO_HEIGHT, LOGO_PIECES, LOGO_WIDTH, piecePath } from "./logoPieces";
import { mountLogo3D } from "./mount";
import { markLogoSettled } from "./settled";

/**
 * pending: the model is starting; the emblem's place shows only its glow.
 * live:    the 3D model is on screen.
 * flat:    this visitor keeps the vector logo (see below).
 */
type Phase = "pending" | "live" | "flat";

/** The soft white glow where the two streams meet. The model brings its own once it is live. */
const HALO =
  "radial-gradient(closest-side, #ffffff 0%, #f4f9ff 56%, #ecf5ff 80%, rgba(236, 245, 255, 0.38) 90%, rgba(236, 245, 255, 0) 100%)";

/**
 * The hero emblem: the live glass 3D model.
 *
 * No picture ever stands in for the model. On a full page load the splash
 * screen covers the hero until the model is on screen; otherwise the emblem's
 * place shows only its glow for the moment the model takes to start, and the
 * model then fades in. Once it is live the visitor can drag it to turn it.
 *
 * The model runs in a background worker where the browser allows (mount.ts), so
 * starting it does not hold up the page.
 *
 * Some visitors keep the vector logo instead: those who prefer reduced motion,
 * use data saver or are on a low-memory device, and anyone whose browser has no
 * WebGL (or loses it). It is the brand mark in its own colours, drawn as SVG.
 */
export function HeroLogo3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("pending");
  // If a worker cannot draw the model, the canvas it was given is spent: a new
  // canvas (new key) is mounted and the model runs on the page's thread instead.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const keepFlat = () => {
      setPhase("flat");
      markLogoSettled();
    };
    const device = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      device.connection?.saveData ||
      (device.deviceMemory ?? 8) < 4 ||
      (navigator.hardwareConcurrency ?? 8) < 4
    ) {
      keepFlat();
      return;
    }

    let stop: (() => void) | undefined;
    // Start once the emblem is in view. If it is not, nothing is waiting on it: say so, and start when it is.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        markLogoSettled();
        return;
      }
      if (stop) return;
      stop = mountLogo3D(canvas, {
        dragTarget: gripRef.current ?? undefined,
        // The whole hero: the emblem turns to face the mouse anywhere in it.
        followTarget: canvas.closest("section") ?? undefined,
        thread: attempt === 0 ? "auto" : "page",
        onReady: () => {
          setPhase("live");
          markLogoSettled();
        },
        onUnavailable: keepFlat,
        onWorkerFailed: () => setAttempt(1),
      });
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [attempt]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${phase === "live" ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: HALO }}
      />

      {/* The vector logo. Always in the page, so the emblem has a name for screen readers; visible only in the flat phase. */}
      <svg
        role="img"
        aria-label="TalentiFi-X logo"
        viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}
        className={`hero-logo-flat pointer-events-none absolute left-1/2 top-1/2 h-[73%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_28px_rgba(0,0,255,0.2)] transition-opacity duration-500 ${phase === "flat" ? "opacity-100" : "opacity-0"}`}
      >
        {LOGO_PIECES.map((piece, i) => (
          <path key={i} d={piecePath(piece)} fill={LOGO_COLORS[piece.color]} />
        ))}
      </svg>
      {/* Without JavaScript the model can never start, so the vector logo shows. */}
      <noscript>
        <style>{".hero-logo-flat{opacity:1!important}"}</style>
      </noscript>

      <canvas
        key={attempt}
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full transition-[opacity,scale] duration-700 ease-out ${phase === "live" ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      />

      {/*
        The grip: the part of the canvas the emblem itself covers. Once the model
        is live the visitor can drag here to turn it (mouse or finger). Vertical
        swipes still scroll the page on touch screens; sideways ones turn it.
      */}
      <div
        ref={gripRef}
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-[76%] w-[56%] -translate-x-1/2 -translate-y-1/2 touch-pan-y select-none ${phase === "live" ? "cursor-grab" : "pointer-events-none"}`}
      />
    </>
  );
}
