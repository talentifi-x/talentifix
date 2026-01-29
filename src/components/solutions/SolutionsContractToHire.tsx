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
  <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#6AE5FF] to-[#B6C8FF] ring-[5px] ring-[#0000FF]" />
);

const FlowArrow: React.FC = () => (
  <div className="flex items-center justify-center h-[60px] w-full">
    <div className="flex items-center">
      <div className="w-[182px] h-[5px] bg-gradient-to-r from-[#0000FF] to-[#00DDE2] rounded-full" />
      <div className="ml-2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#00DDE2]" />
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
    <section className="w-full overflow-x-hidden">
      {/* TOP SECTION */}
      <div className="w-full bg-[#F2F4F8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-4">
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
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-6 items-start">
            {/* LEFT (NARROWER) */}
            <div className="flex flex-col gap-8 text-center lg:text-left max-w-[420px]">
              <h4 className="text-[28px] md:text-[36px] font-notch font-bold text-dark">
                Our Approach
              </h4>

              <ul className="text-dark text-[16px] md:text-[18px] list-disc pl-5 space-y-3">
                <li>AI screens for technical and role readiness</li>
                <li>Human recruiters validate adaptability and intent</li>
                <li>Candidates enter with clarity — not uncertainty</li>
              </ul>
            </div>

            {/* RIGHT – FLOW (WIDER) */}
            <div className="w-full">
              {/* DESKTOP LAYOUT (Horizontal) */}
              <div className="hidden lg:block w-full overflow-x-auto">
                <div className="w-full max-w-[900px]">
                  <div className="grid grid-rows-[60px_auto] gap-y-6 pt-4">

                    {/* ROW 1: CIRCLES + ARROWS */}
                    <div className="grid grid-cols-[minmax(180px,1fr)_80px_minmax(180px,1fr)_80px_minmax(180px,1fr)] items-center">
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

                    {/* ROW 2: TEXT */}
                    <div className="grid grid-cols-[minmax(180px,1fr)_80px_minmax(180px,1fr)_80px_minmax(180px,1fr)]">
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-dark font-notch font-bold text-[26px]">
                          {steps[0].title}
                        </p>
                        <p className="text-dark text-[15px] font-medium text-center leading-[1.65] max-w-[220px]">
                          {steps[0].description}
                        </p>
                      </div>

                      <div />

                      <div className="flex flex-col items-center gap-3">
                        <p className="text-dark font-notch font-bold text-[26px]">
                          {steps[1].title}
                        </p>
                        <p className="text-dark text-[15px] font-medium text-center leading-[1.65] max-w-[220px]">
                          {steps[1].description}
                        </p>
                      </div>

                      <div />

                      <div className="flex flex-col items-center gap-3">
                        <p className="text-dark font-notch font-bold text-[26px]">
                          {steps[2].title}
                        </p>
                        <p className="text-dark text-[15px] font-medium text-center leading-[1.65] max-w-[220px]">
                          {steps[2].description}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* MOBILE/TABLET LAYOUT (Vertical) */}
              <div className="block lg:hidden w-full pl-4 sm:pl-10 mt-8">
                <div className="flex flex-col">
                  {steps.map((step, index) => (
                    <div key={step.title} className="flex gap-6">
                      {/* Left: Graphic Column */}
                      <div className="flex flex-col items-center">
                        {/* Circle */}
                        <div className="relative z-10 shrink-0">
                           <StepCircle />
                        </div>
                        
                        {/* Connecting Line (if not last) */}
                        {index !== steps.length - 1 && (
                          <div className="flex-1 w-[6px] bg-gradient-to-b from-[#0000FF] to-[#00DDE2] my-[-2px] min-h-[80px] relative">
                             {/* Arrowhead at bottom of line */}
                             <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#00DDE2]" />
                          </div>
                        )}
                      </div>

                      {/* Right: Content Column */}
                      <div className="flex flex-col pt-2 pb-12">
                        <h4 className="text-[28px] font-notch font-bold text-dark leading-tight mb-3">
                          {step.title}
                        </h4>
                        <p className="text-[16px] font-medium text-dark leading-relaxed max-w-[300px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
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
