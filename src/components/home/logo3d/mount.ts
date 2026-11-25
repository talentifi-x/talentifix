/**
 * Puts the 3D emblem on a canvas and connects it to the page: its size, whether
 * it is on screen, and the visitor's drag.
 *
 * Where the browser allows it, the model runs in a background worker
 * (scene.worker.ts): the canvas is handed over and three.js never loads on the
 * page's own thread. Otherwise the same scene runs on the page's thread, loaded
 * on demand.
 */
import type { LogoScene } from "./scene";
import type { FromWorker, ToWorker } from "./scene.worker";

export type Logo3DOptions = {
  /** Called once the first frame is on screen. */
  onReady?: () => void;
  /** Called if WebGL is unavailable or is lost. */
  onUnavailable?: () => void;
  /**
   * Called instead of onUnavailable if the model was given to a worker and the
   * worker could not draw at all. The canvas is spent (it cannot be taken back),
   * so the caller should mount again on a fresh canvas with `thread: "page"`.
   */
  onWorkerFailed?: () => void;
  /** "page" keeps the model on the page's own thread. Default: a worker where the browser has one. */
  thread?: "auto" | "page";
  /** Element the visitor drags to turn the emblem. Defaults to the canvas's parent. */
  dragTarget?: HTMLElement;
  /**
   * While a mouse moves over this element (the hero), the emblem turns to face
   * it; when the mouse leaves, the emblem settles back. Not for touch.
   */
  followTarget?: HTMLElement;
};

type Size = { width: number; height: number; pixelRatio: number };

/** One running model, whichever thread it is on. */
type Link = Omit<LogoScene, "resize"> & {
  resize(size: Size): void;
  state: "starting" | "ready" | "unavailable";
  /** True while a worker has the canvas and has not yet drawn a frame. */
  untried: boolean;
  listeners: Pick<Logo3DOptions, "onReady" | "onUnavailable" | "onWorkerFailed">;
};

/**
 * A canvas can be handed to a worker only once, and React runs effects twice in
 * development, so the model outlives a quick unmount: it is kept per canvas and
 * shut down only if nothing has re-mounted it a moment later.
 */
const running = new WeakMap<HTMLCanvasElement, { link: Link; shutdown: number }>();
const SHUTDOWN_MS = 250;

/**
 * Can a canvas be handed to a worker here? This only checks that the pieces
 * exist. Whether the worker can actually draw WebGL is found out by trying
 * (see onWorkerFailed): testing for it up front means creating a WebGL context
 * on the page's thread, which costs the very time the worker is there to save.
 */
function canUseWorker(canvas: HTMLCanvasElement) {
  return (
    typeof Worker !== "undefined" &&
    typeof OffscreenCanvas !== "undefined" &&
    typeof canvas.transferControlToOffscreen === "function"
  );
}

function settle(link: Link, state: "ready" | "unavailable") {
  const failedInWorker = state === "unavailable" && link.untried;
  link.untried = false;
  link.state = state;
  if (state === "ready") link.listeners.onReady?.();
  else if (failedInWorker && link.listeners.onWorkerFailed) link.listeners.onWorkerFailed();
  else link.listeners.onUnavailable?.();
}

function workerLink(canvas: HTMLCanvasElement, size: Size, reducedMotion: boolean): Link {
  const worker = new Worker(new URL("./scene.worker.ts", import.meta.url), { type: "module" });
  const send = (message: ToWorker, transfer: Transferable[] = []) => worker.postMessage(message, transfer);
  const link: Link = {
    state: "starting",
    untried: true,
    listeners: {},
    resize: (next) => send({ type: "resize", ...next }),
    setActive: (active) => send({ type: "active", active }),
    grab: () => send({ type: "grab" }),
    turnBy: (dx, dy) => send({ type: "turn", dx, dy }),
    release: () => send({ type: "release" }),
    lookAt: (x, y) => send({ type: "look", x, y }),
    lookAway: () => send({ type: "lookAway" }),
    dispose: () => worker.terminate(),
  };
  worker.addEventListener("message", ({ data }: MessageEvent<FromWorker>) => settle(link, data.type));
  worker.addEventListener("error", () => settle(link, "unavailable"));
  const offscreen = canvas.transferControlToOffscreen();
  send({ type: "init", canvas: offscreen, ...size, reducedMotion }, [offscreen]);
  return link;
}

function mainThreadLink(canvas: HTMLCanvasElement, size: Size, reducedMotion: boolean): Link {
  let scene: LogoScene | undefined;
  let disposed = false;
  // Calls made before the scene has loaded are replayed in order.
  const waiting: ((scene: LogoScene) => void)[] = [];
  const call = (fn: (scene: LogoScene) => void) => (scene ? fn(scene) : void waiting.push(fn));
  const link: Link = {
    state: "starting",
    untried: false,
    listeners: {},
    resize: (next) => call((s) => s.resize(next.width, next.height, next.pixelRatio)),
    setActive: (active) => call((s) => s.setActive(active)),
    grab: () => call((s) => s.grab()),
    turnBy: (dx, dy) => call((s) => s.turnBy(dx, dy)),
    release: () => call((s) => s.release()),
    lookAt: (x, y) => call((s) => s.lookAt(x, y)),
    lookAway: () => call((s) => s.lookAway()),
    dispose: () => {
      disposed = true;
      scene?.dispose();
    },
  };
  import("./scene")
    .then(({ createLogoScene }) => {
      if (disposed) return;
      scene = createLogoScene(canvas, {
        ...size,
        reducedMotion,
        onReady: () => settle(link, "ready"),
        onUnavailable: () => settle(link, "unavailable"),
      });
      waiting.splice(0).forEach((fn) => fn(scene!));
    })
    .catch(() => settle(link, "unavailable"));
  return link;
}

/**
 * Starts the model on `canvas`, sized to `canvas.parentElement`.
 * Returns a function that disconnects it from the page and shuts it down.
 */
export function mountLogo3D(
  canvas: HTMLCanvasElement,
  { onReady, onUnavailable, onWorkerFailed, dragTarget, followTarget, thread = "auto" }: Logo3DOptions = {},
): () => void {
  const host = canvas.parentElement;
  if (!host) return () => {};

  const measure = (): Size => ({
    width: host.clientWidth,
    height: host.clientHeight,
    // Capped at 2x: beyond that the extra pixels cost GPU time and are not visible.
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const existing = running.get(canvas);
  if (existing) window.clearTimeout(existing.shutdown);
  const entry = existing ?? {
    link: (thread === "auto" && canUseWorker(canvas) ? workerLink : mainThreadLink)(canvas, measure(), reducedMotion),
    shutdown: 0,
  };
  if (!existing) running.set(canvas, entry);
  const { link } = entry;
  link.listeners = { onReady, onUnavailable, onWorkerFailed };
  if (link.state === "ready") onReady?.();
  if (link.state === "unavailable") onUnavailable?.();

  const resizeObserver = new ResizeObserver(() => {
    const size = measure();
    if (size.width && size.height) link.resize(size);
  });
  resizeObserver.observe(host);

  // Animate only while the emblem is on screen and the tab is visible.
  let onScreen = true;
  const sync = () => link.setActive(onScreen && !document.hidden);
  const observer = new IntersectionObserver(([item]) => {
    onScreen = item.isIntersecting;
    sync();
  });
  observer.observe(host);
  document.addEventListener("visibilitychange", sync);

  // Drag to turn. Nothing moves with the pointer unless a button or finger is down.
  const grip = dragTarget ?? host;
  let dragId = -1;
  let last = { x: 0, y: 0 };
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragId = event.pointerId;
    last = { x: event.clientX, y: event.clientY };
    grip.setPointerCapture(event.pointerId);
    grip.style.cursor = "grabbing";
    // Keeps the drag from selecting text or starting an image drag.
    event.preventDefault();
    link.grab();
  };
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== dragId) return;
    link.turnBy(event.clientX - last.x, event.clientY - last.y);
    last = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerId !== dragId) return;
    dragId = -1;
    grip.style.cursor = "";
    link.release();
  };
  if (!reducedMotion) {
    grip.addEventListener("pointerdown", onPointerDown);
    grip.addEventListener("pointermove", onPointerMove);
    grip.addEventListener("pointerup", onPointerUp);
    grip.addEventListener("pointercancel", onPointerUp);
  }

  // Follow the mouse over the hero. Positions are measured from the emblem's
  // centre and scaled by the hero's half-size, so the edge of the hero is a
  // full turn. At most one message per frame, however fast the mouse moves.
  const follow = followTarget && !reducedMotion && window.matchMedia("(pointer: fine)").matches ? followTarget : null;
  let pointer: { x: number; y: number } | null = null;
  let lookFrame = 0;
  const sendLook = () => {
    lookFrame = 0;
    if (!pointer || !follow) return;
    const area = follow.getBoundingClientRect();
    const emblem = host.getBoundingClientRect();
    const x = (pointer.x - (emblem.left + emblem.width / 2)) / (area.width / 2);
    const y = (pointer.y - (emblem.top + emblem.height / 2)) / (area.height / 2);
    link.lookAt(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  };
  const onFollowMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!lookFrame) lookFrame = window.requestAnimationFrame(sendLook);
  };
  const onFollowLeave = () => {
    pointer = null;
    window.cancelAnimationFrame(lookFrame);
    lookFrame = 0;
    link.lookAway();
  };
  if (follow) {
    follow.addEventListener("pointermove", onFollowMove);
    follow.addEventListener("pointerleave", onFollowLeave);
  }

  return () => {
    if (follow) {
      follow.removeEventListener("pointermove", onFollowMove);
      follow.removeEventListener("pointerleave", onFollowLeave);
      window.cancelAnimationFrame(lookFrame);
    }
    resizeObserver.disconnect();
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    grip.removeEventListener("pointerdown", onPointerDown);
    grip.removeEventListener("pointermove", onPointerMove);
    grip.removeEventListener("pointerup", onPointerUp);
    grip.removeEventListener("pointercancel", onPointerUp);
    grip.style.cursor = "";
    link.listeners = {};
    link.release();
    entry.shutdown = window.setTimeout(() => {
      link.dispose();
      running.delete(canvas);
    }, SHUTDOWN_MS);
  };
}
