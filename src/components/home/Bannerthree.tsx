import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * TalentiFi-X at GCC Summit 2026: the copy and its parts as before, laid out
 * with the banner given the larger column (its small print needs the width)
 * and served at full quality, the copy on a comfortable line length.
 */
export const Bannerthree = () => {
  return (
    <section className="w-full bg-grey-accent py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-site grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-10 lg:gap-16">
        {/* Copy - first on mobile, left on desktop */}
        <div className="flex max-w-xl flex-col gap-5">
          <span className="w-fit text-primary font-notch font-bold text-xs tracking-[0.2em] uppercase border border-primary/30 bg-primary/5 px-4 py-2 rounded-sm">
            Industry Presence
          </span>

          <h2 className="text-[32px] md:text-[42px] lg:text-[40px] font-notch font-bold text-dark leading-[1.1] tracking-tight">
            {/* Two lines on every screen: "TalentiFi-X at" / "GCC Summit 2026." */}
            <span className="whitespace-nowrap">TalentiFi-X at</span>{" "}
            <span className="whitespace-nowrap">
              GCC Summit 2026<span className="text-secondary">.</span>
            </span>
          </h2>

          <p className="text-dark/70 text-base md:text-lg leading-relaxed">
            As a Delegate Experience Sponsor at GCC Summit 2026 in Bengaluru,
            TalentiFi-X joined business and technology leaders exploring the
            next chapter of Global Capability Centers in India.
          </p>
          <p className="text-dark/70 text-base md:text-lg leading-relaxed">
            The conversations reflected a clear shift in the GCC landscape: from
            cost optimization to capability, from execution to ownership, and
            from technology adoption to technology-led business impact.
          </p>

          <Link
            href="/insights/talentifi-x-gcc-summit-2026"
            className="hover-pop mt-3 flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#0000FF] px-5 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white hover:bg-blue sm:w-fit sm:px-6 sm:text-sm sm:tracking-wider"
          >
            Explore GCC Summit Highlights
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Official GCC Summit banner - second on mobile, right on desktop */}
        <Link
          href="/insights/talentifi-x-gcc-summit-2026"
          aria-label="Explore GCC Summit 2026 highlights"
          className="hover-pop group block overflow-hidden rounded-2xl bg-white ring-1 ring-dark/[0.06] shadow-[0_16px_36px_-26px_rgba(40,30,120,0.4)] duration-300 hover:shadow-[0_22px_44px_-26px_rgba(40,30,120,0.5)]"
        >
          <Image
            src="/banner/gcc-summit-2026-bengaluru-banner.png"
            alt="GCC Summit 2026, Bengaluru, 15 July 2026 - TalentiFi-X, Delegate Experience Sponsor"
            width={1774}
            height={887}
            quality={100}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="w-full h-auto"
          />
        </Link>
      </div>
    </section>
  );
};
