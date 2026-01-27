import React from "react";
import Image from "next/image";

type IncludesIconName = "evaluation" | "screening" | "pricing" | "communicate" | "support";

const IncludesIcon = ({ name }: { name: IncludesIconName }) => {
  return (
    <Image
      src={`/assets/services/includes-icons/${name}.svg`}
      alt=""
      width={72}
      height={72}
      aria-hidden="true"
    />
  );
};

export const ServicesIncludes = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <Image
        src="/assets/services/perm-placement-bg.png"
        alt="Background pattern"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-10"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-22">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[32px] md:text-[48px] font-notch font-bold text-[#1E1E24] leading-tight">
            What Every <span className="text-[#0000FF]">TalentiFi-X</span> Service Includes:
          </h3>
          <p className="mt-3 text-[12px] md:text-[18px] text-dark font-medium">
            No matter the engagement, you get:
          </p>

          <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "evaluation" as const, title: "Evaluation", body: "Human-led candidate evaluation" },
              { icon: "screening" as const, title: "Screening", body: "AI-assisted screening for speed and precision" },
              { icon: "pricing" as const, title: "Pricing", body: "Transparent pricing, no hidden fees" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/20 backdrop-blur-sm border-3 border-white rounded-[12px]  px-10 py-10 flex flex-col items-center"
              >
                <IncludesIcon name={item.icon} />
                <p className="mt-6 text-[18px] md:text-[20px] font-notch font-bold text-[#1E1E24]">
                  {item.title}
                </p>
                <p className="mt-2 text-[12px] md:text-[13px] text-[#1E1E24]/70 font-medium max-w-[220px]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "communicate" as const, title: "Communicate", body: "Clear communication at every stage" },
              { icon: "support" as const, title: "Support", body: "Ongoing support beyond placement" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/20 backdrop-blur-sm border-3 border-white rounded-[12px]  px-10 py-10 flex flex-col items-center"
              >
                <IncludesIcon name={item.icon} />
                <p className="mt-6 text-[18px] md:text-[20px] font-notch font-bold text-[#1E1E24]">
                  {item.title}
                </p>
                <p className="mt-2 text-[12px] md:text-[13px] text-dark/70 font-medium max-w-55">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-36 bottom-2 hidden md:block opacity-20">
        <Image src="/assets/services/cube-2.png" alt="Cube decoration" width={220} height={220} />
      </div>
    </section>
  );
};
