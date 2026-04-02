import React from "react";

export const StatsSection = () => {
  return (
    <section className="w-full bg-grey-accent py-20 px-6 md:px-8 lg:px-16 flex flex-col items-center">
      <h2 className="text-[30px] md:text-[42px] lg:text-[54px] font-notch font-bold text-dark mb-16 text-center leading-tight">
        The Hidden Cost No One Talks About
      </h2>
      <div className="flex flex-col md:flex-row gap-8 w-full font-notch max-w-300">
        {/* Card 1 */}
        <div className="flex-1 bg-linear-to-b from-grey to-white shadow-lg rounded-[10px] p-10 flex flex-col lg:flex-row items-center justify-center gap-10 min-h-62.5 transform hover:-translate-y-1 transition-transform duration-300 border-b-6 border-secondary">
          <span className="text-[52px] lg:text-[75px] font-bold text-primary leading-none">
            42
          </span>
          <div className="flex flex-col items-center lg:text-left text-center">
            <span className="text-[28px] lg:text-[44px] font-bold text-primary uppercase tracking-wider t">
              Days
            </span>
            <span className="text-[18px] text-dark">to fill one role.</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex-1 bg-linear-to-b from-grey to-white shadow-lg rounded-[10px] p-10 flex flex-col lg:flex-row items-center justify-center gap-6 min-h-62.5 transform hover:-translate-y-1 transition-transform duration-300 border-b-6 border-secondary">
          <span className="text-[42px] lg:text-[65px] font-bold text-primary leading-none">
            20-30
          </span>
          <div className="flex flex-col items-center lg:text-left text-center">
            <span className="text-[28px] lg:text-[44px] font-bold text-primary uppercase tracking-wider ">
              Resumes
            </span>
            <span className="text-[18px] text-dark">
              that look right and feel wrong
            </span>
          </div>
        </div>
      </div>
      <p className="mt-16 text-[18px] md:text-[24px] lg:text-[28px] text-center max-w-225 text-dark leading-relaxed font-bold">
        A hire that works on paper, but{" "}
        <span className="text-primary">not in reality.</span>
        <br className="hidden md:block" />
      </p>
      <p className="mt-2 text-[16px] md:text-[20px] lg:text-[22px] text-center max-w-225 text-dark leading-relaxed font-light">
        Multiply this across teams, quarters, and years.
      </p>
    </section>
  );
};
