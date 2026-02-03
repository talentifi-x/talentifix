import React from "react";
import Image from "next/image";

const values = [
  "Human-Led Hiring, Always",
  "Ethical And Transparent Processes",
  "Speed Without Shortcuts",
  "Quality Over Volume",
] as const;

export const  WhatWeStandFor = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full px-4 sm:px-6 md:px-14 py-18 sm:py-22">
        <div className="absolute inset-0">
          <Image
            src="/assets/about/what-we-stand-for-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
            priority={false}
          />
          <div className="absolute inset-0 bg-white/55" />
          <div className="absolute inset-0 bg-linear-to-b from-white/30 via-white/55 to-white/75" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center px-10">
          <h2 className="text-[36px] sm:text-[44px] md:text-[54px] font-notch font-bold text-black leading-tight">
            What We <span className="text-primary">Stand for</span>.
          </h2>

          <div className="mt-10 sm:mt-12 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {values.map((label) => (
              <div key={label} className="w-full flex justify-center">
                <div className="w-full max-w-[520px] rounded-full p-[2px] bg-gradient-to-r from-primary to-secondary">
                  <div className="rounded-full bg-white px-6 sm:px-10 py-4 sm:py-5 text-[14px] sm:text-[16px] md:text-[18px] font-bold text-black shadow-[0px_10px_30px_rgba(0,0,0,0.08)]">
                    {label}
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-black px-4 sm:px-6 md:px-14 py-6 sm:py-7">
        <p className="max-w-6xl mx-auto text-center text-white text-[16px] sm:text-[18px] md:text-[20px] font-notch font-semibold leading-tight">
          We don&apos;t send resume stacks. We{" "}
          <span className="text-secondary">deliver candidates</span> who make sense.
        </p>
      </div>
    </section>
  );
};
