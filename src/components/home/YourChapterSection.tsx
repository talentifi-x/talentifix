import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const YourChapterSection = () => {
  return (
    <section className="relative w-full lg:py-24 py-16 px-6 md:px-8 overflow-hidden bg-white">
      {/* Decorative Background - Bottom Left Glow */}
      <div className="absolute -left-50 bottom-0 w-150 h-150 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-20 relative z-10">
        {/* Main Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="lg:text-[54px] text-[48px] font-bold font-notch text-black leading-tight">
            Your <span className="text-[#0000FF]">Chapter</span>
            <span className="text-secondary">.</span>
          </h2>
          <p className="lg:text-2xl text-[20px] font-sans text-black">
            You are not inventory. <strong>You are potential.</strong>
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-8">
          {/* Left Column: Text. One even card with a blue accent down its left
              edge, matching the rounded image card beside it. */}
          <div className="flex-1 rounded-[10px] border border-[#E5E7EB] p-8 lg:p-12 relative overflow-hidden bg-white/70 backdrop-blur-sm shadow-[0_12px_32px_-18px_rgba(15,23,42,0.22)]">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-linear-to-b from-[#0000FF] via-[#0000FF]/60 to-secondary" />

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-[36px] sm:text-[44px] lg:text-[48px] font-bold font-notch text-black leading-[1.1]">
                  How <span className="text-[#0000FF]">TalentiFi-X</span>
                  <br />
                  Works for You
                </h3>
                <p className="text-lg text-black">
                  You are not inventory. <strong>You are potential.</strong>
                </p>
              </div>

              <ul className="flex flex-col gap-5">
                {[
                  "Opportunities aligned with your skills and ambition",
                  "Clear, honest communication at every step",
                  "Respect for your time and privacy",
                  "Human guidance – not automated rejection loops",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-sm bg-[#0000FF] flex items-center justify-center shrink-0 mt-1">
                      <Check className="text-white w-4 h-4 stroke-3" />
                    </div>
                    <span className="text-lg text-dark font-medium leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-1 text-lg text-black mt-2">
                <p>AI finds opportunities.</p>
                <p className="font-bold">Human help shape your future.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 relative">
            <div className="relative p-2 border-3 border-secondary rounded-[10px] h-full">
              <div className="relative w-full h-full min-h-125 rounded-md overflow-hidden">
                <Image
                  src="/assets/figma/your-chapter-image.png"
                  alt="Professional seated at a desk with a laptop and notebook"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourChapterSection;
