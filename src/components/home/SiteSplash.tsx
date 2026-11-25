import type { CSSProperties } from "react";
import {
  LOGO_COLORS,
  LOGO_HEIGHT,
  LOGO_PIECES,
  LOGO_WIDTH,
  LOGO_WORDMARK,
  LOGO_WORDMARK_BOX,
  piecePath,
} from "./logo3d/logoPieces";
import { SplashGate } from "./SplashGate";

/** Room around the mark for half the width of its outline, in logo units. */
const EDGE = 0.5;
const MARK_BOX = { width: LOGO_WIDTH + EDGE * 2, height: LOGO_HEIGHT + EDGE * 2 };

/**
 * The homepage splash screen: the logo is built in front of the visitor while
 * the 3D emblem starts behind it.
 *
 * Three centred rows. First the logo mark on its own, large: each of its nine
 * pieces is drawn as an outline, in order (frame, then the T, then the F), and
 * filled in, and the outline then fades so what is left is the mark exactly as
 * in the brand file (public/logos/logo.svg), in its blue and cyan. Then the
 * name, its letters appearing one by one. Then a line and a percentage that
 * count up, to 100% once the emblem is ready, and the splash fades out (see
 * SplashGate).
 *
 * It is plain HTML, SVG and CSS in the server response, so it is on screen with
 * the first paint and plays without script. The page underneath is complete
 * and readable by search engines throughout.
 *
 * Shown on a full load of the homepage, not when arriving by a link from
 * another page of the site. Not shown to visitors who prefer reduced motion or
 * have JavaScript off, and it removes itself after 6 seconds whatever happens.
 * Styles and keyframes are in global.css (".site-splash").
 */
export function SiteSplash() {
  const name = LOGO_WORDMARK_BOX;
  return (
    <>
      <div data-site-splash className="site-splash" aria-hidden="true">
        <div className="site-splash__stack">
          <div className="site-splash__emblem">
            <svg
              viewBox={`${-EDGE} ${-EDGE} ${MARK_BOX.width} ${MARK_BOX.height}`}
              className="site-splash__mark"
              style={{ aspectRatio: `${MARK_BOX.width} / ${MARK_BOX.height}` }}
              fill="none"
              strokeLinejoin="round"
              strokeWidth={0.45}
            >
              {LOGO_PIECES.map((piece, i) => (
                <path
                  key={i}
                  d={piecePath(piece)}
                  // pathLength makes every outline 1 unit long, so one dash rule draws them all.
                  pathLength={1}
                  className="site-splash__piece"
                  fill={LOGO_COLORS[piece.color]}
                  stroke={LOGO_COLORS[piece.color]}
                  style={{ "--piece": i } as CSSProperties}
                />
              ))}
            </svg>
          </div>
          <svg
            viewBox={`${name.x} ${name.y} ${name.width} ${name.height}`}
            className="site-splash__name"
            style={{ aspectRatio: `${name.width} / ${name.height}` }}
          >
            {LOGO_WORDMARK.map((d, i) => (
              <path key={i} d={d} className="site-splash__glyph" fill="#000000" style={{ "--glyph": i } as CSSProperties} />
            ))}
          </svg>
          <div className="site-splash__meter">
            <span className="site-splash__bar">
              <span />
            </span>
            {/* The number is drawn by CSS from the same value that moves the line. */}
            <span className="site-splash__pct" />
          </div>
        </div>
      </div>
      <noscript>
        {/* No splash, so the hero's stat bars (which wait for it to lift) show full at once. */}
        <style>
          {".site-splash{display:none!important}.hero-stat-fill,.hero-stat-day{opacity:1!important;transform:none!important}"}
        </style>
      </noscript>
      <SplashGate />
    </>
  );
}
