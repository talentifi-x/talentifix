# TalentiFi-X website: instructions for AI coding agents

Next.js (App Router) + React + Tailwind CSS v4, built with `pnpm build` (the
project's `refine build`). Deploys run from `master` on Vercel.

## Layout must be zoom-stable

Browser zoom shrinks the CSS viewport in both directions (on a 1366px laptop,
125% zoom is 1093 CSS px wide; on 1536px, 110% is 1396 and 90% is 1707). At
90%, 100%, 110% and 125% zoom (and still sensibly at 150%) every page must keep
the same layout structure: same columns, same visible elements, same order.
Zoom should scale the page like a picture. Phones and tablets keep their own
layouts.

Rules:

1. **No vw/vh sizing.** Use fixed px/rem for font-size, line-height, padding,
   margin, gap, width and height, stepped at only two breakpoints: tablet
   (`md:`, 768px) and desktop (`lg:`, 1024px). No `vw`, `vh`, `svh`, `dvh`,
   `cqw`/`cqi`, and no `clamp(...vw...)`.
   - The one allowed `vw` is the page gutter, `--site-gutter:
     clamp(20px, 5.6vw, 88px)` in `src/styles/global.css`, applied with the
     `px-site` utility.
   - Allowed exceptions: image `sizes` hints (they only choose a download
     size); a first-screen hero's `min-h-[calc(100svh-var(--site-header-height))]`
     (a minimum that can grow); scrollable overlays that must fit the window
     (modals, the mobile menu, the blog search dialog, the sticky table of
     contents); the home hero's phone-only cap that keeps the 3D logo inside the
     first phone screen.
2. **One desktop layout from 1024px up.** Do not use `xl:`, `2xl:` or
   `min-[NNNNpx]:` variants (1024px or more) that change layout, visibility,
   column count or order; put the value on `lg:`. Rules below 1024px are fine.
3. **Content-driven heights.** Sections are as tall as their content. Use
   padding, or a `min-h-*` that can grow, never a fixed height around text, and
   never pair a fixed height with `overflow-hidden`.
4. **Containers.** Content is capped at 1400px with the fluid gutter:
   - `max-w-7xl px-site mx-auto` for a container that carries the gutter
     (`--container-7xl` is 1400px plus two gutters);
   - `px-site` on a full-bleed section plus `max-w-site mx-auto` (1400px) inside.
5. **Fluid columns.** Grids use `fr`, `%` or `minmax(0,1fr)`; no fixed-px column
   widths that overflow at about 1093px. Images sit in aspect-ratio boxes with
   `object-cover`/`object-contain`.
6. **Header.** Full desktop nav, icons and the primary CTA from 1024px up;
   hamburger only below 1024px.
7. **Decorative chips over images** (badges, stat cards) are positioned in % of
   their own panel. If one must disappear on small panels, use a container
   query on the panel, never a viewport breakpoint above 1024px.

**Check every layout change** on a production build (`pnpm build` then
`npx next start`; dev-mode hot reload can hang headless browsers) at
1024x576, 1093x615, 1229x691, 1396x785, 1536x864 and 1707x960, plus a phone
width (390x844). Every desktop size must show the same structure with nothing
cropped, hidden or overflowing sideways.

## Other project notes

- Keep the existing design when fixing a quality problem (blur, contrast,
  spacing); redesign only when asked, and keep copy unchanged unless asked.
- Homepage changes are shown to the owner for approval before they are pushed.
- `pnpm lint` is currently broken: Next.js 16 removed `next lint`, and ESLint
  10 no longer reads `.eslintrc.json` (it needs a flat `eslint.config.mjs`).
  Use `npx tsc --noEmit -p .` for type checks.
