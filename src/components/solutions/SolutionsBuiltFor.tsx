import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const SolutionsBuiltFor = () => {
  const cards = [
    {
      title: "Scaling Companies",
      description: "Companies scaling fast.",
      iconSrc: "/assets/Solutions/built-for/scaling-companies.png",
      iconWidth: 182,
      iconHeight: 130,
    },
    {
      title: "Leaders",
      description: "Leaders hiring critical roles.",
      iconSrc: "/assets/Solutions/built-for/leaders-4c50b7.png",
      iconWidth: 120,
      iconHeight: 130,
    },
    {
      title: "Teams",
      description: "Teams that can’t afford mis-hires.",
      iconSrc: "/assets/Solutions/built-for/teams.png",
      iconWidth: 182,
      iconHeight: 130,
    },
    {
      title: "Organizations",
      description: "Organizations that value quality over volume.",
      iconSrc: "/assets/Solutions/built-for/organizations-1bfee0.png",
      iconWidth: 182,
      iconHeight: 164,
    },
  ] as const;

  return (
    <section className="relative w-full bg-[#F2F4F8] overflow-hidden px-6 md:px-14 py-22">
      <div className="pointer-events-none absolute right-20 top-16 hidden md:block opacity-35">
        <Image src="/assets/Solutions/cube-2.png" alt="" width={238} height={298} aria-hidden="true" />
      </div>

      <div className="pointer-events-none absolute left-20 bottom-14 hidden md:block opacity-35">
        <Image src="/assets/Solutions/cube-1.png" alt="" width={171} height={211} aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h3 className="text-[34px] md:text-[54px] font-notch font-bold text-black leading-tight">
          Who These Solutions Are Built For:
        </h3>

        <div className="mt-16 w-full max-w-[1104px] grid grid-cols-1 md:grid-cols-2 gap-12">
          {cards.map((card) => (
            <div
              key={card.title}
              className="h-[374px] w-full bg-white/65 backdrop-blur-[6px] border-[3px] border-white rounded-[10px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] flex flex-col items-center justify-center px-6 sm:px-10 md:px-16"
            >
              <Image
                src={card.iconSrc}
                alt=""
                width={card.iconWidth}
                height={card.iconHeight}
                aria-hidden="true"
                className="object-contain"
              />
              <p className="mt-8 text-[18px] md:text-[20px] font-notch font-bold text-[#1E1E24]">
                {card.title}
              </p>
              <p className="mt-2 text-[12px] md:text-[13px] text-[#1E1E24]/70 font-medium max-w-[260px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-[22px] md:text-[32px] font-notch font-bold text-black leading-tight">
          If hiring matters to your business — these Solutions were{" "}
          <span className="text-[#0000FF]">built for you.</span>
        </p>

        <Link href="/start-hiring" className="mt-10 bg-[#00DDE2] text-[#1E1E24] font-stack-text text-[16px] md:text-[24px] uppercase px-8 py-4 rounded-[5px] hover:bg-[#00c4c9] transition-colors duration-300 flex items-center gap-4">
          Talk to a TalentiFi-X Expert
          <ArrowRight size={32} />
        </Link>
      </div>
    </section>
  );
};
