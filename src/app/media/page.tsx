import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pressItems } from "@data/mediaData";

export const metadata: Metadata = {
  title: "Media & Industry Presence",
  description:
    "Where TalentiFi-X shows up across the talent and GCC ecosystem - industry participation, event highlights and perspectives on AI-assisted, human-led hiring.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media & Industry Presence | TalentiFi-X",
    description:
      "Industry participation, event highlights and perspectives from TalentiFi-X across the talent and GCC ecosystem.",
    type: "website",
    url: "/media",
  },
};

function PressThumb({ kicker, index }: { kicker: string; index: number }) {
  return (
    <div className="relative w-full aspect-16/9 overflow-hidden bg-grey-accent border-b border-gray-100">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-white to-secondary/15" />
      <span
        aria-hidden="true"
        className="absolute -bottom-8 right-1 text-[130px] leading-none font-notch font-bold text-primary/10 select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative h-full flex flex-col justify-center gap-3 px-6">
        <span className="text-[10px] font-notch font-bold uppercase tracking-[0.22em] text-primary">
          GCC Summit 2026 &middot; Bengaluru
        </span>
        <span className="block text-[20px] md:text-[22px] font-notch font-bold text-dark leading-snug max-w-[85%]">
          {kicker}
        </span>
        <span className="w-12 h-[3px] rounded-full bg-linear-to-r from-primary to-secondary" />
      </div>
    </div>
  );
}

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
            Industry participation, event highlights and perspectives from the
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
                priority
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

      {/* Press grid */}
      <section className="w-full px-6 md:px-8 pb-20 md:pb-28">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-[26px] md:text-[34px] font-notch font-bold text-dark leading-tight">
              From the TalentiFi-X feed<span className="text-secondary">.</span>
            </h2>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed max-w-2xl">
              A selection of where the ideas have shown up. Each card opens the
              original post on LinkedIn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-[10px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <PressThumb kicker={item.kicker} index={index} />

                <div className="flex flex-col flex-1 gap-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-notch font-bold uppercase tracking-[0.18em] text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-sm">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-notch font-bold uppercase tracking-[0.18em] text-dark/40">
                      {item.source}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-notch font-bold text-dark leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-dark/60 text-sm leading-relaxed flex-1">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2 text-primary font-notch font-bold text-[11px] uppercase tracking-[0.18em]">
                      {item.cta}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <time
                      dateTime={item.dateTime}
                      className="text-[11px] text-dark/40 shrink-0"
                    >
                      {item.date}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
