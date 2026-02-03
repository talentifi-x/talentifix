import React from "react";
import Image from "next/image";

export const Leadership = () => {
  return (
    <section className="relative w-full bg-white px-4 sm:px-6 md:px-14 pt-16 sm:pt-20 md:pt-22 overflow-hidden lg:-mb-[120px]">
      <div className="max-w-5xl mx-auto">
      <div className="pointer-events-none absolute left-1/2 top-[83px] hidden md:block h-[737px] w-[533px] -translate-x-[410px] opacity-20">
        <Image src="/assets/about/leadership-deco.svg" alt="" fill className="object-contain" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-[34px] sm:text-[44px] md:text-[54px] font-notch font-bold text-black leading-tight">
          Leadership.
        </h2>

        <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-6 lg:gap-3.5">
          <div className="w-full lg:w-[419px] lg:h-[816px] h-full">
            <div className="rounded-[5px] border-2 border-secondary bg-white/80 p-[13px]">
              <div className="relative overflow-hidden rounded-[3px] aspect-[419/680] w-full">
                <Image
                  src="/assets/about/leadership-chet.png"
                  alt="Chet Mann"
                  fill
                  sizes="(max-width: 1024px) 100vw, 419px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className=" p-px">
             <div className="bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,white_85%),linear-gradient(to_bottom,rgba(0,0,255,0.09)_20%,rgba(0,0,221,0.16))] px-8 pt-[37px] pb-[37px] lg:w-[662px] lg:min-h-[542px]">


                <p className="text-[34px] sm:text-[44px] md:text-[54px] font-notch font-bold text-secondary leading-tight">
                  Chet Mann
                </p>
                <p className="mt-2 text-[20px] font-stack-text font-semibold text-dark">
                  Founder, Talentifi-X
                </p>

                <div className="mt-6 space-y-5 text-[16px] font-stack-text text-dark leading-relaxed">
                  <p>
                    With nearly three decades of experience across staffing, IT services, and enterprise technology,
                    Chet Mann has spent his career navigating change — and building through it.
                  </p>
                  <p>
                    His work spans large-scale talent and technology initiatives for Fortune 500 organizations, always
                    focused on turning disruption into measurable business outcomes.
                  </p>
                  <p>
                    Guided by the belief that “in the noise of change, true leaders find the signals,” Chet founded
                    Talentifi-X to rebuild hiring for today’s reality — combining AI-assisted speed with experienced
                    human judgment.
                  </p>
                  <p className="text-primary font-medium">
                    Talentifi-X reflects that vision: modern, ethical, and built for what’s next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
