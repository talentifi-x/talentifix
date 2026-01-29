import React from "react";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export const SolutionsContractToHire = () => {
  const steps = [
    {
      title: "Entry",
      description:
        "AI screens for technical readiness + Human validation of adaptability.",
    },
    {
      title: "Trial",
      description:
        "You observe performance. Culture alignment becomes visible.",
    },
    {
      title: "Decision",
      description:
        "Decision become obvious. Informed, confident conversions.",
    },
  ];

  return (
    <section className="w-full bg-[#F2F4F8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header Section */}
        <div className="flex flex-col md:items-center text-center">
          <p className="text-primary font-bold font-notch text-[28px] md:text-[56px] tracking-wide mb-2 md:mb-4">
            Contract-To-Hire
          </p>
          <h3 className="text-dark font-bold  text-[36px] md:text-[36px] leading-[1.1] mb-6">
            Confidence Before<br className="md:hidden" /> Commitment<span className="text-secondary">.</span>
          </h3>
          <p className="text-dark font-medium text-[16px] md:text-[18px] leading-relaxed">
            Sometimes, the best way to know is to work together first. Evaluate talent in real conditions, without pressure.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-start">
          {/* Steps Column */}
          <div className="lg:col-span-2 w-full">
            {/* Mobile View: Vertical Timeline */}
            <div className="flex md:hidden flex-col w-full relative pl-2">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
                  {/* Connecting Line (Vertical) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[38px] top-[76px] bottom-[-6px] w-[6px] bg-gradient-to-b from-[#0000FF] to-[#00DDE2] -translate-x-1/2 z-0">
                      {/* Arrow Head */}
                      <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] border-b-[4px] border-r-[4px] border-[#00DDE2] rotate-45" />
                    </div>
                  )}

                  {/* Circle */}
                  <div className="relative z-10 shrink-0 w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#6AE5FF] to-[#B6C8FF] ring-[6px] ring-[#0000FF] shadow-lg" />

                  {/* Content */}
                  <div className="flex flex-col pt-2 gap-2">
                    <h4 className="text-[24px] font-notch font-bold text-dark leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[14px] font-medium text-dark leading-relaxed max-w-[240px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Horizontal Layout */}
            <div className="hidden md:flex flex-row items-center justify-between gap-10 w-full">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex-1 flex flex-col items-center text-center">
                  <div className="relative w-[86px] h-[86px] rounded-full bg-gradient-to-br from-[#6AE5FF] to-[#B6C8FF] ring-[6px] ring-[#0000FF]">
                    {index < 2 && (
                      <div className="absolute left-23 top-1/2 -translate-y-1/2 w-[140px] h-[8px] bg-gradient-to-r from-[#0000FF] to-[#00DDE2] rounded-full" />
                    )}
                    {index < 2 && (
                      <div className="absolute left-56.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rotate-45 border-r-[6px] border-t-[6px] border-[#00DDE2]" />
                    )}
                  </div>
                  <p className="mt-6 text-dark font-notch font-bold text-[26px]">
                    {step.title}
                  </p>
                  <p className="mt-3 text-dark text-[15px] font-medium max-w-55">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card Column */}
          <div className="w-full flex justify-center lg:block">
            <div className="w-full max-w-md bg-white rounded-[10px] border border-transparent shadow-[0px_4px_20px_rgba(0,0,0,0.05)] px-8 py-10 flex flex-col items-center text-center">
              <h4 className="text-[#1E1E24] font-notch font-bold text-[20px] mb-6">
                Why Clients Choose This
              </h4>
              <ul className="text-[#1E1E24]/80 text-[16px] font-medium space-y-2 flex flex-col items-center">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E1E24]/80 block" />
                  Reduce hiring risk
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E1E24]/80 block" />
                  Better long-term retention
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
       <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center capitalize justify-center gap-2 px-8 py-3 text-white font-bold rounded-sm bg-linear-to-r from-[#0000FF] to-[#000099] hover:from-[#0000CC] hover:to-[#000080] transition-colors"
          >
            REDUCE HIRING RISK  <ArrowBigRight className="inline-block" />
          </Link>
          </div>
      </div>
    </section>
  );
};
