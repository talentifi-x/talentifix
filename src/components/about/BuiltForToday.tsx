import React from "react";
import Image from "next/image";

const cards = [
  {
    title: "The talent market\nhas changed",
    iconSrc: "/assets/about/built-today-market.svg",
    iconWidth: 90,
    iconHeight: 90,
  },
  {
    title: "Candidates move\nfaster",
    iconSrc: "/assets/about/built-today-speed.svg",
    iconWidth: 110,
    iconHeight: 97,
  },
  {
    title: "Hiring mistakes\ncost more",
    iconSrc: "/assets/about/built-today-cost.svg",
    iconWidth: 84,
    iconHeight: 84,
  },
  {
    title: "Expectations\nare higher",
    iconSrc: "/assets/about/built-today-expectations.svg",
    iconWidth: 90,
    iconHeight: 90,
  },
] as const;

export const BuiltForToday = () => {
  return (
    <section className="relative w-full overflow-hidden bg-dark px-4 sm:px-6 md:px-14 py-16 sm:py-20 md:py-22">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/0 to-black/20" />
        <div className="absolute -right-28 top-1/2 hidden md:block h-[520px] w-[520px] -translate-y-1/2 opacity-10">
          <Image src="/assets/about/built-today-favicon.svg" alt="" fill className="object-contain" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-notch font-bold text-white leading-tight">
          Built For Today<span className="text-secondary">.</span>
        </h2>

        <div className="mt-10 sm:mt-12 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[20px] bg-black/15 shadow-[0px_4px_12px_rgba(0,0,0,0.25)] px-6 py-10 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px]"
            >
              <Image
                src={card.iconSrc}
                alt=""
                width={card.iconWidth}
                height={card.iconHeight}
                className="object-contain"
                aria-hidden="true"
              />
              <p className="mt-10 text-[18px] sm:text-[20px] md:text-[24px] font-medium font-stack-text text-white/90 whitespace-pre-line leading-tight">
                {card.title}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 sm:mt-14 text-[20px] sm:text-[24px] md:text-[28px] font-semibold font-notch leading-snug">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-[#7F7FFF] to-primary">
            TalentiFi-X is built for this reality — adaptable, compliant,
            <br className="hidden sm:block" /> and ready for what&apos;s next.
          </span>
        </p>
      </div>
    </section>
  );
};

