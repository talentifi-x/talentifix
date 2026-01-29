import React from "react";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

/* ---------- Types ---------- */

interface StepData {
  title: string;
  description: string;
}

/* ---------- Reusable UI Pieces ---------- */

const StepCircle: React.FC = () => (
  <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#6AE5FF] to-[#B6C8FF] ring-[6px] ring-[#0000FF]" />
);

const FlowArrow: React.FC = () => (
  <div className="flex items-center justify-center h-[72px]">
    <div className="flex items-center">
      <div className="w-[120px] h-[6px] bg-gradient-to-r from-[#0000FF] to-[#00DDE2] rounded-full" />
      <div className="ml-2 w-0 h-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-[#00DDE2]" />
    </div>
  </div>
);

/* ---------- Main Component ---------- */

export const SolutionsContractToHire: React.FC = () => {
  const steps: StepData[] = [
    {
      title: "Entry",
      description:
        "AI screens for technical and role readiness. Human recruiters validate adaptability and intent. Candidates enter with clarity — not uncertainty.",
    },
    {
      title: "Trial",
      description:
        "You observe performance. Culture alignment becomes visible.",
    },
    {
      title: "Decision",
      description:
        "Decisions become obvious. Informed, confident conversions.",
    },
  ];

  return (
    <section className="w-full">
      {/* TOP SECTION */}
      <div className="w-full bg-[#F2F4F8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-2">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center">
            <p className="text-primary font-bold font-notch text-[28px] md:text-[56px] mb-2">
              Contract-To-Hire
            </p>

            <h3 className="text-dark font-bold text-[36px] mb-6">
              Confidence Before Commitment
              <span className="text-secondary">.</span>
            </h3>

            <p className="text-dark font-medium text-[16px] md:text-[18px] max-w-3xl">
              Sometimes, the best way to know is to work together first.
              Contract-to-hire lets you evaluate talent in real conditions —
              without pressure.
            </p>
          </div>

          {/* CONTENT */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT */}
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <h4 className="text-[28px] md:text-[36px] font-notch font-bold text-dark">
                Our Approach
              </h4>

              <ul className="text-dark text-[16px] md:text-[18px] list-disc pl-5 space-y-3 max-w-2xl mx-auto lg:mx-0">
                <li>AI screens for technical and role readiness</li>
                <li>Human recruiters validate adaptability and intent</li>
                <li>Candidates enter with clarity — not uncertainty</li>
              </ul>
            </div>

            {/* RIGHT – FLOW */}
            <div className="w-full overflow-x-auto md:overflow-visible">
              <div className="min-w-[900px] md:min-w-0">
                <div className="grid grid-rows-[72px_auto] gap-y-6">

                  {/* ROW 1: CIRCLES + ARROWS (LOCKED) */}
                  <div className="grid grid-cols-[260px_120px_260px_120px_260px] items-center justify-center">
                    <div className="flex justify-center">
                      <StepCircle />
                    </div>

                    <FlowArrow />

                    <div className="flex justify-center">
                      <StepCircle />
                    </div>

                    <FlowArrow />

                    <div className="flex justify-center">
                      <StepCircle />
                    </div>
                  </div>

                  {/* ROW 2: TEXT (FREE HEIGHT) */}
                  <div className="grid grid-cols-[260px_120px_260px_120px_260px] justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-dark font-notch font-bold text-[26px]">
                        {steps[0].title}
                      </p>
                      <p className="text-dark text-[15px] font-medium text-center leading-[1.65] w-full max-w-[260px]">
                        {steps[0].description}
                      </p>
                    </div>

                    <div />

                    <div className="flex flex-col items-center gap-3">
                      <p className="text-dark font-notch font-bold text-[26px]">
                        {steps[1].title}
                      </p>
                      <p className="text-dark text-[15px] font-medium text-center leading-[1.65] w-full max-w-[260px]">
                        {steps[1].description}
                      </p>
                    </div>

                    <div />

                    <div className="flex flex-col items-center gap-3">
                      <p className="text-dark font-notch font-bold text-[26px]">
                        {steps[2].title}
                      </p>
                      <p className="text-dark text-[15px] font-medium text-center leading-[1.65] w-full max-w-[260px]">
                        {steps[2].description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}
      <div className="w-full bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 flex flex-col items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <h4 className="text-white text-[28px] md:text-[36px] font-notch font-bold">
              The Impact
            </h4>
            <ul className="text-white/85 text-[16px] md:text-[18px] list-disc pl-5 space-y-2">
              <li>Reduced hiring risk</li>
              <li>Better long-term retention</li>
              <li>Informed, confident conversions</li>
            </ul>
          </div>

          <Link
            href="/contact"
            className="w-full lg:w-[50%] flex items-center justify-center gap-3 border border-secondary text-secondary font-bold uppercase px-8 py-4 rounded-md hover:bg-secondary hover:text-dark transition-colors"
          >
            Reduce Hiring Risk <ArrowBigRight />
          </Link>
        </div>
      </div>
    </section>
  );
};
