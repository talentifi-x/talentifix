/**
 * Runs the 3D emblem off the page's main thread. mount.ts hands over the canvas
 * and then only sends short messages (size, visible or not, drag movement); the
 * heavy work (loading three.js, building the model, compiling shaders, drawing
 * each frame) happens here, so it never delays scrolling, typing or clicking.
 */
import { createLogoScene, type LogoScene } from "./scene";

export type ToWorker =
  | { type: "init"; canvas: OffscreenCanvas; width: number; height: number; pixelRatio: number; reducedMotion: boolean }
  | { type: "resize"; width: number; height: number; pixelRatio: number }
  | { type: "active"; active: boolean }
  | { type: "grab" }
  | { type: "turn"; dx: number; dy: number }
  | { type: "release" }
  | { type: "look"; x: number; y: number }
  | { type: "lookAway" };

export type FromWorker = { type: "ready" } | { type: "unavailable" };

// The project's TypeScript settings describe a page, not a worker, so name the two things used here.
const scope = self as unknown as {
  postMessage(message: FromWorker): void;
  addEventListener(type: "message", listener: (event: MessageEvent<ToWorker>) => void): void;
};

let scene: LogoScene | undefined;

scope.addEventListener("message", ({ data }) => {
  switch (data.type) {
    case "init":
      try {
        scene = createLogoScene(data.canvas, {
          width: data.width,
          height: data.height,
          pixelRatio: data.pixelRatio,
          reducedMotion: data.reducedMotion,
          onReady: () => scope.postMessage({ type: "ready" }),
          onUnavailable: () => scope.postMessage({ type: "unavailable" }),
        });
      } catch {
        scope.postMessage({ type: "unavailable" });
      }
      break;
    case "resize":
      scene?.resize(data.width, data.height, data.pixelRatio);
      break;
    case "active":
      scene?.setActive(data.active);
      break;
    case "grab":
      scene?.grab();
      break;
    case "turn":
      scene?.turnBy(data.dx, data.dy);
      break;
    case "release":
      scene?.release();
      break;
    case "look":
      scene?.lookAt(data.x, data.y);
      break;
    case "lookAway":
      scene?.lookAway();
      break;
  }
});
