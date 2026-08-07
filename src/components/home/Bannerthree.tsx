import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Bannerthree = () => {
  return (
    <section className="w-full bg-grey-accent py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* Copy - first on mobile, left on desktop */}
        <div className="flex flex-col gap-5">
          <span className="w-fit text-primary font-notch font-bold text-[11px] md:text-xs tracking-[0.2em] uppercase border border-primary/30 bg-primary/5 px-4 py-2 rounded-sm">
            Industry Presence
          </span>

          <h2 className="text-[32px] md:text-[42px] font-notch font-bold text-dark leading-tight">
            TalentiFi-X at GCC Summit 2026
            <span className="text-secondary">.</span>
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
            className="mt-2 w-fit flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue transition-colors"
          >
            Explore GCC Summit Highlights
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Official GCC Summit banner - second on mobile, right on desktop */}
        <Link
          href="/insights/talentifi-x-gcc-summit-2026"
          aria-label="Explore GCC Summit 2026 highlights"
          className="group block rounded-[10px] overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
        >
          <Image
            src="/banner/gcc-summit-2026-bengaluru-banner.png"
            alt="GCC Summit 2026, Bengaluru, 15 July 2026 - TalentiFi-X, Delegate Experience Sponsor"
            width={1774}
            height={887}
            sizes="(max-width: 1024px) 100vw, 620px"
            className="w-full h-auto"
          />
        </Link>
      </div>
    </section>
  );
};
