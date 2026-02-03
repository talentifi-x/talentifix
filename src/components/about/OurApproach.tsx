import React from "react";
import Image from "next/image";

const items = [
  {
    title: "AI helps us scale\nand move quickly.",
    iconSrc: "/assets/about/approach-scale.svg",
    iconAlt: "",
  },
  {
    title: "Humans ensure judgment, cultural\nfit, and long-term success.",
    iconSrc: "/assets/about/approach-team.svg",
    iconAlt: "",
  },
  {
    title: "The result is fewer\ncandidates, better matches,\nand clarity at every step.",
    iconSrc: "/assets/about/approach-choice.svg",
    iconAlt: "",
  },
] as const;

export const OurApproach = () => {
  return (
    <section className="relative w-full bg-white px-4 sm:px-6 md:px-14 py-6 sm:py-10 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mx-auto w-full max-w-5xl rounded-[12px] bg-white  px-6 sm:px-10 md:px-14 py-12 sm:py-14">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-notch font-bold text-dark leading-tight">
              Our Approach<span className="text-secondary">.</span>
            </h2>

            <p className="mt-4 text-[16px] sm:text-[18px] md:text-[22px] font-medium text-dark/80 max-w-4xl leading-relaxed">
              TalentiFi-X combines{" "}
              <span className="text-primary font-bold">AI-assisted screening</span> with{" "}
              <span className="text-primary font-bold">human-led decision-making</span> to deliver faster,
              smarter, and more reliable hiring outcomes.
            </p>

            <div className="mt-10 sm:mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {items.map(({ title, iconSrc, iconAlt }) => (
                <div key={title} className="flex flex-col items-center gap-5">
                  <div className="relative h-[76px] w-[76px]">
                    <Image src={iconSrc} alt={iconAlt} fill className="object-contain" />
                  </div>
                  <p className="whitespace-pre-line text-[13px] sm:text-[14px] md:text-[14px] font-semibold text-dark/80 leading-snug max-w-[260px]">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
