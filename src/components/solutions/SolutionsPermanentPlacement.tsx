import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const SolutionsPermanentPlacement = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/assets/Solutions/perm-placement-bg.png"
        alt="Permanent Placement background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-10"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-22">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h3 className="text-[34px] sm:text-[44px] lg:text-[54px] font-notch font-bold text-dark lg:mb-8 leading-tight">
            Permanent <span className="text-primary">Placement</span><span className="text-secondary">.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h3 className="text-[28px] sm:text-[40px] md:text-[44px] font-notch font-bold text-dark leading-tight">
              Because the Right Hire Compounds Over Time<span className="text-secondary">.</span>
            </h3>
            <div className="text-[14px] md:text-[16px] text-black leading-relaxed max-w-xl mx-auto lg:mx-0 space-y-2">
              <p>Permanent hires shape culture.</p>
              <p>They influence performance long after onboarding.</p>
              <p>A wrong hire costs more than a vacant role.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start gap-8 lg:pt-2">
            <h4 className="text-[28px] md:text-[36px] font-notch font-bold text-dark leading-tight text-left">
              Our Approach
            </h4>

            <div className="w-full max-w-2xl text-center lg:text-left">
              <p className="text-[18px] md:text-[20px] font-semibold text-[#1E1E24] leading-snug">
                We go beyond skills and titles.
              </p>
              <div className="mt-4 space-y-3">
                <p className="text-[14px] md:text-[16px] text-black leading-relaxed">
                  → AI evaluates experience, career patterns, and role alignment
                </p>
                <p className="text-[14px] md:text-[16px] text-black leading-relaxed">
                  → Humans assess culture fit, communication, and long-term potential
                </p>
              </div>
            </div>

            <div className="w-full max-w-3xl rounded-[10px] border-3 border-white px-6 sm:px-10 py-4 shadow-[0px_12px_28px_rgba(0,0,0,0.08)]">
              <p className="text-[18px] text-dark font-medium leading-snug">
                Only 3–5 finalists reach your desk — all interview-ready
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 gap-10 flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-20 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 justify-center w-full">
              <h4 className="text-white text-[28px] md:text-[36px] font-notch font-bold leading-tight">
                The Impact
              </h4>
              <ul className="text-white/85 text-[16px] md:text-[18px] leading-relaxed list-disc pl-5 space-y-2">
                <li>12-day average to qualified candidates</li>
                <li>94% match accuracy</li>
                <li>94% 90-day retention</li>
              </ul>
            </div>
          </div>

          <p className="text-white font-notch font-bold text-[18px] md:text-[24px] text-center">
            This isn’t faster hiring. It’s smarter hiring.
          </p>

          <button className="w-full lg:w-[50%] text-center flex items-center justify-center gap-3 border border-secondary text-secondary font-bold tracking-wider uppercase px-8 py-4 rounded-md hover:bg-secondary hover:text-dark transition-colors ">
            Hire for the Long Term
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
