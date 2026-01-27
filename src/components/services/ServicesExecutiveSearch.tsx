import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const ServicesExecutiveSearch = () => {
  return (
    <section className="w-full bg-white relative">
       <Image
              src="/assets/services/exec-search-bg.svg"
              alt="Permanent Placement background"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-22">
        <div className=" gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-10 ">
            <div className="flex flex-col gap-5">
              <p className="text-[#0000FF] font-bold text-[16px] md:text-[18px] tracking-wide">
                Executive Search
              </p>
              <h3 className="text-dark font-notch font-bold text-[40px] md:text-[56px] leading-tight">
                When Judgement Matters More Than Speed<span className="text-secondary">.</span>
              </h3>
              <p className="text-dark font-medium text-[16px] md:text-[18px] max-w-4xl">
                Leadership hires aren&apos;t about filling positions. They&apos;re about direction, trust, and impact.
              </p>
            </div>

            <div className="flex flex-row gap-6 max-w-7xl">
              <div className="lg:w-1/2 w-full">
                <h4 className="text-dark font-notch font-bold text-[22px] md:text-[35px]">
                  Our Executive Search Philosophy
                </h4>
                <ul className="text-dark text-[14px] md:text-[15px] font-medium list-disc pl-5 space-y-3 mt-6">
                  <li>Deep role and culture discovery</li>
                  <li>Discreet sourcing across trusted networks</li>
                  <li>Human-lead evaluation at every stage</li>
                </ul>
                <div className="text-dark text-[14px] md:text-[15px] font-medium leading-relaxed mt-6">
                  <p>AI supports research.</p>
                  <p>Human lead decisions.</p>
                </div>
              </div>

              <div className="lg:w-1/2 w-full  ">
                <Image
                  src="/services/ai-banner.webp"
                  alt="Executive Search visual"
                  width={1020}
                  height={640}
                  className="w-full h-[300px] rounded-2xl"
                />

              </div>
            </div>

          </div>


        </div>
      </div>

      <div className="w-full bg-dark">
        <div className="max-w-7xl mx-auto px-6  py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="flex items-start gap-8">
              <h4 className="text-white text-[28px] md:text-[36px] font-notch font-bold leading-tight">
                What you can expect:
              </h4>
              <ul className="text-white/85 text-[16px] md:text-[18px] leading-relaxed list-disc pl-5 space-y-2">
                <li>Confidential, insight-driven searches</li>
                <li>Candidates evaluated for leadership style, not just resumes</li>
                <li>Strategic partnership – not transactional hiring</li>
              </ul>
            </div>

            <button className="w-full lg:w-auto flex items-center text-sm justify-center gap-3 border border-secondary text-secondary font-bold tracking-wider uppercase px-8 py-4 rounded-md hover:bg-secondary hover:text-dark transition-colors">
              Find Leader Who Fit
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
