import Image from "next/image";
import { ShieldCheck } from "lucide-react";

/** Faint hexagons at the card's two ends, as in the original artwork. */
function HexDecor() {
  const fixed = (n: number) => Math.round(n * 10) / 10;
  const hex = (x: number, y: number, r: number) =>
    `M${Array.from({ length: 6 }, (_, k) => {
      const a = (k * Math.PI) / 3 + Math.PI / 6;
      return `${fixed(x + r * Math.cos(a))} ${fixed(y + r * Math.sin(a))}`;
    }).join("L")}Z`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <svg viewBox="0 0 200 200" className="absolute -bottom-[6%] -left-[1%] h-[60%] w-auto text-primary opacity-[0.05]">
        <path d={hex(60, 120, 34) + hex(120, 155, 30) + hex(40, 180, 22)} fill="currentColor" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute -right-[1%] top-[4%] h-[70%] w-auto text-primary opacity-[0.05]">
        <path d={hex(140, 60, 36) + hex(80, 30, 26) + hex(165, 135, 28)} fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * The ISO/IEC 27001:2022 card under the hero.
 *
 * From md it is the original artwork's design, rebuilt so it stays sharp: the
 * card, icon and text are live, in fixed sizes per breakpoint (zoom-stable;
 * see CLAUDE.md), and the badge is the artwork's own badge, lifted out at full
 * resolution and served losslessly (public/banner/iso-27001-badge.webp). A
 * soft border and shadow keep the card clear of the white page.
 *
 * Measured from the artwork (1983 x 639): the card is 1909 x 394 and the badge
 * 413 x 494, 1339 in from the card's left edge and 48 above its top; the badge
 * keeps those proportions as shares of the card (left 70.14%, top -12.18%,
 * height 125.38%). The text column stops at 66% so it never reaches the badge.
 */
export const Bannertwo = () => {
  return (
    // White at the top, where the hero ends, fading to the next section's grey
    // (Bannerthree, bg-grey-accent), so the card sits between the two with no seam.
    <section className="w-full bg-linear-to-b from-white from-25% to-grey-accent">
      <div className="w-full max-w-7xl mx-auto px-site">
        {/*
          Phones: the same words as live text, in a card sized for a narrow
          screen, with the badge at the right standing a little out of the card
          as it does on desktop (a smaller copy of the same artwork). The shield
          icon joins from sm, where there is room for it.
        */}
        <div className="md:hidden relative my-8 flex items-center gap-4 rounded-2xl border border-primary/15 bg-linear-to-r from-white to-[#EEF3FF] py-4 pl-5 pr-[112px] sm:pr-[132px] shadow-[0_6px_16px_-12px_rgba(0,0,255,0.22)]">
          <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:flex">
            <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
          </span>
          <p className="flex flex-col leading-tight">
            <span className="font-notch font-bold text-primary text-[20px]">ISO/IEC 27001:2022</span>
            <span className="font-notch font-bold text-dark text-[17px]">Certified</span>
            <span className="mt-1 text-[14px] text-dark/75">Your data. Our responsibility.</span>
          </p>
          <Image
            src="/banner/iso-27001-badge-small.webp"
            alt=""
            width={221}
            height={264}
            unoptimized
            className="absolute right-2 top-1/2 h-[108px] sm:h-[124px] w-auto max-w-none -translate-y-1/2"
          />
        </div>

        {/*
          From md: the original design, in fixed sizes per breakpoint. The card
          is as tall as its content; the badge is placed in % of the card, so it
          keeps its place at every zoom level. The padding leaves room for the
          badge above and below the card.
        */}
        <div className="hidden md:block py-12 lg:py-14">
          <div className="relative flex w-full items-center gap-8 rounded-[24px] py-10 pl-10 pr-[34%] lg:rounded-[30px] lg:py-14 lg:pl-14 border border-[#dbe4fa] bg-[linear-gradient(90deg,#fdfcfe_0%,#f8f9fc_45%,#eef4fd_72%,#e6f0fd_100%)] shadow-[0_14px_30px_-24px_rgba(0,0,255,0.2),0_1px_4px_rgba(15,23,42,0.04)]">
            <HexDecor />
            <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-[#e6edfc] lg:size-20">
              <ShieldCheck className="size-[52%] text-primary" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span aria-hidden="true" className="relative w-[2px] shrink-0 self-stretch bg-[#d2e1f7]" />
            <p className="relative flex min-w-0 flex-col font-sans">
              <span className="text-[28px] font-bold leading-none lg:text-[40px] tracking-[-0.005em] text-primary">ISO/IEC 27001:2022</span>
              <span className="mt-2 text-[23px] font-bold leading-none lg:mt-3 lg:text-[32px] tracking-[-0.01em] text-[#161616]">Certified</span>
              <span className="mt-2.5 text-base leading-none lg:mt-3 lg:text-[22px] text-[#3a3a3a]">Your data. Our responsibility.</span>
            </p>
            <Image
              src="/banner/iso-27001-badge.webp"
              alt=""
              width={413}
              height={494}
              unoptimized
              className="absolute left-[70.14%] top-[-12.18%] h-[125.38%] w-auto max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
