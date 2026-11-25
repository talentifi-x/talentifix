"use client";

import { useLayoutEffect } from "react";
import { onLogoSettled } from "./logo3d/settled";

/** The longest the splash stays once this script is running, whatever happens. */
const MAX_MS = 5000;
/** Used only if the browser cannot report when the build animation ends. */
const BUILD_MS = 1900;
/** Time for the count to reach 100% before the fade starts. */
const COMPLETE_MS = 380;
/** The fade-out in global.css, plus a little. */
const FADE_MS = 700;

/**
 * Has the splash played since this page was loaded? Kept outside the component
 * so that coming back to the homepage by a link does not play it again.
 */
let played = false;

/**
 * Takes the splash down when both are true: its build animation has finished,
 * and the hero emblem is settled (3D model on screen, or not going to be).
 * The count then runs to 100% and the splash fades. Renders nothing.
 */
export function SplashGate() {
  // Before paint, so a return visit by a link never flashes the splash.
  useLayoutEffect(() => {
    const splash = document.querySelector<HTMLElement>("[data-site-splash]");
    if (!splash) return;
    if (played) {
      splash.setAttribute("data-seen", "");
      return;
    }

    let stopped = false;
    let built = false;
    let settled = false;
    let fadeTimer = 0;
    let removeTimer = 0;

    const finish = () => {
      if (stopped || played) return;
      played = true;
      splash.setAttribute("data-complete", "");
      fadeTimer = window.setTimeout(() => {
        splash.setAttribute("data-done", "");
        removeTimer = window.setTimeout(() => splash.setAttribute("data-seen", ""), FADE_MS);
      }, COMPLETE_MS);
    };
    const check = () => {
      if (built && settled) finish();
    };
    const onBuilt = () => {
      built = true;
      check();
    };

    // The count runs for exactly as long as the build, so its end is the clock.
    const meter = splash.querySelector(".site-splash__meter");
    const building = meter?.getAnimations?.()[0];
    let buildTimer = 0;
    if (building) building.finished.then(onBuilt, onBuilt);
    else buildTimer = window.setTimeout(onBuilt, BUILD_MS);

    const stopWaiting = onLogoSettled(() => {
      settled = true;
      check();
    });
    const maxTimer = window.setTimeout(finish, MAX_MS);

    return () => {
      stopped = true;
      stopWaiting();
      window.clearTimeout(buildTimer);
      window.clearTimeout(maxTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return null;
}
