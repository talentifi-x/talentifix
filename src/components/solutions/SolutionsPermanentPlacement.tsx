import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const SolutionsPermanentPlacement = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <Image
        src="/assets/Solutions/perm-placement-bg.png"
        alt="Permanent Placement background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-10"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-22">
        <div className="w-full flex flex-col items-center text-center">
          <p className="text-primary font-notch font-bold text-[24px] md:text-[56px] tracking-wide mb-4">
            Permanent <span className="text-dark">Placement</span>
          </p>
          <h3 className="text-dark  font-bold  text-[28px] md:text-[36px] leading-tight">
            Because the Right Hire Compounds Over Time<span className="text-secondary">.</span>
          </h3>
          <p className="mt-4 text-dark font-medium text-[14px] md:text-[18px] max-w-3xl">
            A wrong hire costs more than a vacant role. We go beyond skills and titles.
          </p>

          <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                value: "3-5",
                title: "Finalists.",
                description: "Only interview-ready candidates reach your desk",
              },
              {
                value: "12",
                title: "Days",
                description: "Average time to qualified Candidates.",
              },
              {
                value: "94%",
                title: "Retention",
                description: "90-Day retention match accuracy.",
              },
            ].map((card, index) => (
              <div
                key={card.title}
                className="relative rounded-3xl bg-white border-t-3 border-primary px-6 sm:px-10 py-8 sm:py-10 shadow-[0px_14px_30px_rgba(0,0,0,0.08)] overflow-hidden min-h-[320px] md:h-100"
              >
                {/* <div className="absolute top-0 left-10 right-10 h-[6px] bg-[#0000FF] rounded-full" /> */}
                <svg
                  className="absolute inset-0 w-full h-full "
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`perm-card-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D9FBFF" stopOpacity="0" />
                      <stop offset="70%" stopColor="#D9FBFF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#D9FBFF" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,76 46,46 56,62 100,24 100,100 0,100"
                    fill={`url(#perm-card-grad-${index})`}
                  />
                  <polyline
                    points="0,76 46,46 56,62 100,24"
                    fill="none"
                    stroke="#00DDE2"
                    strokeOpacity="0.15"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="relative flex flex-col top-6 md:top-10">
                  <div className="text-[#0000FF] font-notch font-bold text-[64px] md:text-[72px] leading-none text-left">
                    {card.value}
                  </div>
                  <div className="mt-4 text-dark font-notch font-bold text-[22px] md:text-[40px] text-center">
                    {card.title}
                  </div>
                  <p className="mt-3 text-dark text-[12px] md:text-[18px] font-medium text-center max-w-[240px] mx-auto">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 text-[#1E1E24] font-notch font-bold text-[18px] md:text-[24px]">
            This isn&apos;t faster hiring. It&apos;s smarter hiring.
          </p>

          <button className="mt-8 inline-flex items-center gap-3 bg-[#00DDE2] text-[#1E1E24] font-bold tracking-wider uppercase px-10 py-4 rounded-[6px] hover:bg-[#00c4c9] transition-colors">
            Hire For The Long Term
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
