import React from "react";
import Image from "next/image";

export const Solutionsection = () => {
  return (
    <section className="w-full relative lg:py-24 py-16 flex flex-col items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-white">
        <Image
          src="/banner-home/solution.webp"
          alt="Solution Background"
          fill
          sizes="100vw"
          className="object-cover opacity-10 "
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-16 flex flex-col items-center gap-20">
        {/* Header */}
        <div className="text-center flex flex-col gap-6">
          <h2 className="text-[40px] md:text-[54px] font-notch font-bold text-dark leading-tight">
            What Changes When the System is Right
            <span className="text-secondary">.</span>
          </h2>
          <p className="text-[20px] md:text-[24px] text-dark font-normal">
            Instead of hoping a hire works, you understand why they will.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card 1 */}
          <div className="relative bg-linear-to-b from-white to-[#F2F4F8] rounded-[10px] h-[374px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col items-center justify-center">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary z-20" />

            {/* Diagonal Line Graphic */}
            <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
              <Image
                src="/assets/figma/solution-card-line.svg"
                alt="Line"
                width={350}
                height={312}
                className="w-full h-auto opacity-100"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
              <span className="text-[80px] md:text-[95px] font-notch font-bold leading-none bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary">
                3-5
              </span>
              <div className="flex flex-col gap-1 text-[18px] text-dark">
                <p className="font-bold">Finalists.</p>
                <p>Instead of 30 Resumes.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-linear-to-b from-white to-[#F2F4F8] rounded-[10px] h-[374px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col items-center justify-center">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary z-20" />

            {/* Diagonal Line Graphic */}
            <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
              <Image
                src="/assets/figma/solution-card-line.svg"
                alt="Line"
                width={350}
                height={312}
                className="w-full h-auto opacity-100"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
              <span className="text-[80px] md:text-[95px] font-notch font-bold leading-none bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary">
                12
              </span>
              <div className="flex flex-col gap-1 text-[18px] text-dark">
                <p className="font-bold">Days</p>
                <p>Instead of 42 Days.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-linear-to-b from-white to-[#F2F4F8] rounded-[10px] h-[374px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col items-center justify-center">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary z-20" />

            {/* Diagonal Line Graphic */}
            <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
              <Image
                src="/assets/figma/solution-card-line.svg"
                alt="Line"
                width={350}
                height={312}
                className="w-full h-auto opacity-100"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
              <span className="text-[80px] md:text-[95px] font-notch font-bold leading-none bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary">
                94%
              </span>
              <div className="flex flex-col gap-1 text-[18px] text-dark">
                <p className="font-bold">90-Day Retention</p>
                <p>and quality match accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[24px] text-dark font-normal">
          Not luck. <span className="font-bold">Design.</span>
        </p>
      </div>
    </section>
  );
};
