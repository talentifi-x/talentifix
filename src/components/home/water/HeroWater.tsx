"use client";

import { useEffect, useRef, useState } from "react";
import type { FromWater, ToWater } from "./water.worker";

/**
 * Moving water over the hero's streams: a transparent canvas the size of the
 * streams drawing, drawn by a shader in a background worker (water.worker.ts),
 * so it costs the page's main thread nothing. It fades in once the first frame
 * is ready.
 *
 * It is an extra, not part of the design's meaning: visitors who prefer reduced
 * motion, save data or have a low-powered device keep the still drawing, and so
 * does any browser that cannot hand a canvas to a worker.
 */

type Entry = { worker: Worker; shutdown: number; ready: boolean; onReady?: () => void };

/**
 * A canvas can be handed to a worker only once, and React runs effects twice in
 * development, so the worker outlives a quick unmount: it is kept per canvas and
 * shut down only if nothing has re-mounted it a moment later.
 */
const running = new WeakMap<HTMLCanvasElement, Entry>();
const SHUTDOWN_MS = 250;
/** The water is soft, so it is drawn at a little over half the screen's resolution. */
const RESOLUTION = 0.6;

function canRun(canvas: HTMLCanvasElement) {
  const device = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return !(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    device.connection?.saveData ||
    (device.deviceMemory ?? 8) < 4 ||
    (navigator.hardwareConcurrency ?? 8) < 4 ||
    typeof Worker === "undefined" ||
    typeof OffscreenCanvas === "undefined" ||
    typeof canvas.transferControlToOffscreen !== "function"
  );
}

function pixelSize(canvas: HTMLCanvasElement) {
  const scale = Math.min(window.devicePixelRatio || 1, 2) * RESOLUTION;
  return { width: canvas.clientWidth * scale, height: canvas.clientHeight * scale };
}

export function HeroWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let entry = running.get(canvas);
    if (entry) {
      window.clearTimeout(entry.shutdown);
    } else {
      if (!canRun(canvas)) return;
      const worker = new Worker(new URL("./water.worker.ts", import.meta.url), { type: "module" });
      const created: Entry = { worker, shutdown: 0, ready: false };
      worker.addEventListener("message", ({ data }: MessageEvent<FromWater>) => {
        if (data.type !== "ready") return;
        created.ready = true;
        created.onReady?.();
      });
      const offscreen = canvas.transferControlToOffscreen();
      const message: ToWater = { type: "init", canvas: offscreen, ...pixelSize(canvas) };
      worker.postMessage(message, [offscreen]);
      running.set(canvas, created);
      entry = created;
    }
    const current = entry;
    const send = (message: ToWater) => current.worker.postMessage(message);
    current.onReady = () => setLive(true);
    if (current.ready) setLive(true);

    const resizeObserver = new ResizeObserver(() => send({ type: "resize", ...pixelSize(canvas) }));
    resizeObserver.observe(canvas);

    // Animate only while the streams are on screen and the tab is visible.
    let onScreen = true;
    const sync = () => send({ type: "active", active: onScreen && !document.hidden });
    const observer = new IntersectionObserver(([item]) => {
      onScreen = item.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      current.onReady = undefined;
      current.shutdown = window.setTimeout(() => {
        current.worker.terminate();
        running.delete(canvas);
      }, SHUTDOWN_MS);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out ${live ? "opacity-100" : "opacity-0"}`}
    />
  );
}
