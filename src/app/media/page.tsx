import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pressCoverage } from "@data/mediaData";
import { PressCard } from "@components/media/PressCard";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Press Coverage & Industry Presence",
  description:
    "TalentiFi-X in the press: articles and interviews with founder Chetan Mangalwedhe in Business Standard, Hindustan Times, NDTV, India Today and more.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero */}
      <section className="w-full px-6 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          <span className="flex items-center gap-3 text-primary font-notch font-bold text-[11px] tracking-[0.28em] uppercase">
            <span
              aria-hidden="true"
              className="w-10 h-px bg-linear-to-r from-primary to-secondary"
            />
            Press
          </span>

          <h1 className="text-[44px] sm:text-[64px] md:text-[86px] leading-[0.95] font-notch font-bold text-dark tracking-tight">
            In the <span className="text-primary">media</span>
            <span className="text-secondary">.</span>
          </h1>

          <p className="text-dark/60 text-lg md:text-xl leading-relaxed max-w-2xl">
            Press coverage, industry participation and perspectives from the
            TalentiFi-X team on talent, AI and the next generation of Global
            Capability Centers.
          </p>
        </div>
      </section>

      {/* Industry Presence credential */}
      <section className="w-full px-6 md:px-8 pb-16 md:pb-20">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-[26px] md:text-[34px] font-notch font-bold text-dark leading-tight mb-8">
            Industry Presence<span className="text-secondary">.</span>
          </h2>

          <div className="rounded-[10px] border border-gray-200 bg-white shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            {/* The official banner is never cropped - it carries the event
                branding and sponsor designation. */}
            <div className="bg-grey-accent p-4 md:p-6 lg:h-full lg:flex lg:items-center">
              <Image
                src="/banner/gcc-summit-2026-bengaluru-banner.png"
                alt="GCC Summit 2026, Bengaluru, 15 July 2026 - TalentiFi-X, Delegate Experience Sponsor"
                width={1774}
                height={887}
                sizes="(max-width: 1024px) 100vw, 700px"
                className="w-full h-auto rounded-sm"
                fetchPriority="high"
                loading="eager"
              />
            </div>

            <div className="flex flex-col gap-4 p-8 md:p-10 justify-center">
              <span className="w-fit text-[10px] font-notch font-bold uppercase tracking-[0.22em] text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-sm">
                Event Sponsorship
              </span>

              <h3 className="text-[28px] md:text-[34px] font-notch font-bold text-dark leading-tight">
                GCC Summit 2026
              </h3>

              <span className="block text-[17px] md:text-[19px] font-notch font-semibold text-dark/80">
                Delegate Experience Sponsor
              </span>

              <span className="block text-sm text-dark/50 tracking-wide">
                Bengaluru | July 2026
              </span>

              <Link
                href="/insights/talentifi-x-gcc-summit-2026"
                className="mt-3 w-fit flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue transition-colors"
              >
                View Highlights
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Press and perspectives: media coverage plus our own LinkedIn posts, by date */}
      <section className="w-full px-6 md:px-8 pb-20 md:pb-28">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-[26px] md:text-[34px] font-notch font-bold text-dark leading-tight">
              Press &amp; Perspectives<span className="text-secondary">.</span>
            </h2>
            <p className="text-dark/70 text-base md:text-lg leading-relaxed max-w-2xl">
              Articles by and interviews with founder Chetan Mangalwedhe, stories that
              draw on his view of hiring, AI and the job market, and our own notes from
              GCC Summit 2026. Each card opens the original piece.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressCoverage.map((item) => (
              <li key={item.id}>
                <PressCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-grey-accent px-6 md:px-8 py-16 md:py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] md:text-[38px] font-notch font-bold text-dark leading-tight">
              Human Led. AI Assisted<span className="text-secondary">.</span>
            </h2>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed max-w-xl">
              Talk to us about building the capability your teams need next.
            </p>
          </div>
          <Link
            href="/start-hiring"
            className="w-fit shrink-0 flex items-center gap-2 bg-[#0000FF] text-white px-8 py-4 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue transition-colors"
          >
            Hire Talent
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
