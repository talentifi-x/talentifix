/**
 * The oversized footer wordmark and its blur. It is SVG text that fills the
 * footer's width (95% of it, up to 1430px, as the old 20vw type did), so it scales with the layout at every screen
 * size and zoom level: no viewport units, nothing to hide when zoomed in.
 *
 * FONT_SIZE is the wordmark's natural size in the 1000-unit-wide drawing
 * (measured in the browser for Stack Sans Notch bold with tight tracking), so
 * textLength only corrects rounding and never visibly stretches the letters.
 */
const FONT_SIZE = 210;
const HEIGHT = Math.round(FONT_SIZE * 0.96);
const BASELINE = Math.round(FONT_SIZE * 0.8);

export const FooterWordmark = () => {
  return (
    <>
      <div className="w-full flex justify-center mt-10 md:-mb-6 lg:-mb-12 relative z-0">
        {/* Decorative wordmark - not a heading, so every page keeps a single H1 */}
        <svg viewBox={`0 0 1000 ${HEIGHT}`} className="block h-auto w-[95%] max-w-[1430px] select-none" aria-hidden="true">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0000FF" />
              <stop offset="1" stopColor="#00DDE2" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y={BASELINE}
            textAnchor="middle"
            fontSize={FONT_SIZE}
            fontWeight="700"
            letterSpacing="-0.025em"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-wordmark)"
            style={{ fontFamily: "var(--font-notch)" }}
          >
            TalentiFi-X
          </text>
        </svg>
      </div>

      {/* Non-moving Blur for Big Text Bottom - Scrolls with footer */}
      <div className="absolute bottom-0 left-0 w-full h-30 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent backdrop-blur-[1px]" />
      </div>
    </>
  );
};
