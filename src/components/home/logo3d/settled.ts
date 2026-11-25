/**
 * A one-way signal from the hero emblem to the splash screen: "the emblem is
 * settled", meaning the 3D model is on screen, or this device is keeping the
 * vector logo, or the emblem is not in view. The splash waits for it, so the
 * visitor never sees the hero before its emblem is there.
 */
const EVENT = "tfx:logo-settled";
let settled = false;

export function markLogoSettled() {
  if (settled) return;
  settled = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Runs `callback` once the emblem is settled (at once if it already is). Returns a function that stops waiting. */
export function onLogoSettled(callback: () => void): () => void {
  if (settled) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
