import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TheOriginSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-dark py-20 md:py-24 lg:py-28">
      {/* One soft brand glow, top right */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[40%] h-[90%] w-[50%] rounded-full bg-primary/25 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-site lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
        {/* The story */}
        <div className="flex flex-col items-start gap-6 md:gap-8">
          <h2 className="font-notch text-[40px] font-bold leading-tight text-white lg:text-[54px]">
            The Origin Story<span className="text-secondary">.</span>
          </h2>
          <p className="text-[20px] leading-snug text-white md:text-[26px] lg:text-[30px]">
            TalentiFi-X was built after <span className="text-secondary">23+ years in staffing.</span> Years spent
            seeing what slows teams down. What causes mis-hires. What gets ignored.
          </p>
          <p className="text-[17px] leading-snug text-white/60 md:text-[20px]">
            Experience gave us clarity. Urgency gave us momentum.
          </p>
          <Link
            href="/blog/what-20-years-of-placing-talent-taught-me-about-hiring-and-why-i-built-talentifi-x"
            className="hover-pop group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-secondary"
          >
            Read why we built TalentiFi-X
            <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* The span of experience, as type rather than a panel */}
        <div className="flex flex-col gap-8 lg:border-l lg:border-white/10 lg:pl-16">
          <div>
            <p className="font-notch text-[96px] font-bold leading-[0.9] text-white md:text-[128px] lg:text-[144px]">
              23<span className="text-secondary">+</span>
            </p>
            <p className="mt-3 text-[17px] text-white/60 md:text-[18px]">years in staffing and recruitment</p>
          </div>

          <div>
            <div aria-hidden="true" className="relative h-2">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-white/40 to-secondary" />
              <span className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white/70" />
              <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_10px_2px_rgba(0,221,226,0.6)]" />
            </div>
            <div className="mt-3 flex justify-between font-notch text-[18px] font-bold md:text-[20px]">
              <span className="text-white/70">1999</span>
              <span className="text-secondary">Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheOriginSection;
