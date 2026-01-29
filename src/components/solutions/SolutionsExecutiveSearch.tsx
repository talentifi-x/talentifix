import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const SolutionsExecutiveSearch = () => {
  return (
    <section className="w-full bg-white relative">
      <Image
        src="/assets/Solutions/exec-search-bg.svg"
        alt="Executive Search background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-22">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h3 className="text-[34px] sm:text-[44px] lg:text-[54px] font-notch font-bold text-dark lg:mb-8 leading-tight">
            Executive <span className="text-primary">Search</span><span className="text-secondary">.</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h3 className="text-[28px] sm:text-[40px] md:text-[44px] font-notch font-bold text-dark leading-tight">
                When Judgment Matters More Than Speed<span className="text-secondary">.</span>
              </h3>
              <p className="text-[14px] md:text-[16px] text-black leading-relaxed max-w-xl">
                Leadership hires aren’t about filling positions.
                <br />
                They’re about direction, trust, and impact.
              </p>
            </div>

            <div className="w-full max-w-3xl rounded-[10px] border-3 border-white px-6 sm:px-10 py-4 shadow-[0px_12px_28px_rgba(0,0,0,0.08)]">
              <p className="text-[18px] text-dark font-medium leading-snug">
                <span className="font-bold">Benefit:</span>
                <br />
                AI supports research.
                <br />
                Humans lead decisions.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-8 lg:pt-2">
            <h4 className="text-[28px] md:text-[36px] font-notch font-bold text-dark leading-tight text-left">
              Our Approach
            </h4>
            {[
              {
                iconSrc: "/assets/Solutions/temp-icon-1.svg",
                alt: "Discovery icon",
                text: "Deep role and culture discovery",
              },
              {
                iconSrc: "/assets/Solutions/temp-icon-2.svg",
                alt: "Sourcing icon",
                text: "Discreet sourcing across trusted networks",
              },
              {
                iconSrc: "/assets/Solutions/temp-icon-3.svg",
                alt: "Evaluation icon",
                text: "Human-led evaluation at every stage",
              },
            ].map((item) => (
              <div key={item.text} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full">
                <div className="w-[120px] h-[68px] bg-white rounded-[6px] flex items-center justify-center shrink-0">
                  <Image src={item.iconSrc} alt={item.alt} width={120} height={68} />
                </div>
                <div className="flex flex-col text-center sm:text-left">
                  <p className="text-[18px] md:text-[20px] font-semibold text-[#1E1E24] leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 gap-10 flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 justify-center">
              <h4 className="text-white text-[28px] md:text-[36px] font-notch font-bold leading-tight">
                The Impact
              </h4>
              <ul className="text-white/85 text-[16px] md:text-[18px] leading-relaxed list-disc pl-5 space-y-2">
                <li>Confidential, insight-driven searches</li>
                <li>Candidates evaluated for leadership style, not just resumes</li>
                <li>Strategic partnership — not transactional hiring</li>
              </ul>
            </div>
          </div>
          <button className="w-full lg:w-[50%] text-center flex items-center justify-center gap-3 border border-secondary text-secondary font-bold tracking-wider uppercase px-8 py-4 rounded-md hover:bg-secondary hover:text-dark transition-colors">
            Find Leaders Who Fit
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
