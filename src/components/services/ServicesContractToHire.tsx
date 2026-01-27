import React from "react";
import { ArrowRight } from "lucide-react";

export const ServicesContractToHire = () => {
  return (
    <section className="w-full bg-[#F2F4F8]">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-22">
        <p className="text-primary font-bold font-notch text-[16px] md:text-[24px] tracking-wide mb-4">
          Contract-To-Hire
        </p>
        <h3 className="text-dark font-notch font-bold text-[40px] md:text-[56px] leading-tight">
          Confidence Before Commitment<span className="text-secondary">.</span>
        </h3>
        <p className="mt-4 text-dark font-medium text-[16px] md:text-[18px] max-w-5xl">
          Sometimes, the best way to know is to work together first. Evaluate talent in real conditions, without pressure.
        </p>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              {[
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
              ].map((step, index) => (
                <div key={step.title} className="relative flex-1 flex flex-col items-center text-center">
                  <div className="relative w-[86px] h-[86px] rounded-full bg-gradient-to-br from-[#6AE5FF] to-[#B6C8FF] ring-[6px] ring-[#0000FF]">
                    {index < 2 && (
                      <div className="hidden md:block absolute left-23 top-1/2 -translate-y-1/2 w-[140px] h-[8px] bg-gradient-to-r from-[#0000FF] to-[#00DDE2] rounded-full" />
                    )}
                    {index < 2 && (
                      <div className="hidden md:block absolute left-56.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rotate-45 border-r-[6px] border-t-[6px] border-[#00DDE2]" />
                    )}
                  </div>
                  <p className="mt-6 text-dark font-notch font-bold text-[22px] md:text-[26px]">
                    {step.title}
                  </p>
                  <p className="mt-3 text-dark text-[14px] md:text-[15px] font-medium max-w-55">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0px_14px_30px_rgba(0,0,0,0.08)] px-10 py-10">
              <h4 className="text-[#1E1E24] font-notch font-bold text-[18px] md:text-[20px] text-center">
                Why Clients Choose This
              </h4>
              <ul className="mt-6 text-[#1E1E24]/80 text-[14px] md:text-[15px] font-medium list-disc pl-5 space-y-3">
                <li>Reduce hiring risk</li>
                <li>Better long-term retention</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="inline-flex items-center gap-3 bg-[#0000FF] hover:bg-[#0000cc] text-white font-bold tracking-wider uppercase px-10 py-4 rounded-[6px] transition-colors shadow-[0px_10px_24px_rgba(0,0,0,0.12)]">
            Reduce Hiring Risk
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
