import React from "react";
import Image from "next/image";
import Link from "next/link";

export const SolutionsPermanentPlacement = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Image
        src="/assets/Solutions/perm-placement-bg.svg"
        alt="The permanent placement background"
        width={1769}
        height={819}
        aria-hidden="true"
        className="pointer-events-none  absolute left-1/2 top-[161px] -translate-x-1/2 opacity-100 max-w-none"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14 py-14 lg:py-[72px]">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center font-notch font-bold text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.3] text-black">
            Permanent <span className="text-primary">Placement</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        <div className="py-6 mt-10 lg:mt-14 flex flex-col items-center gap-10 lg:gap-14">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-10">
            <h3 className="font-notch font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.3] text-dark text-center lg:text-left max-w-[664px]">
              Because the Right Hire
              <br className="hidden sm:block" />
              Compounds Over Time<span className="text-primary">.</span>
            </h3>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.3] text-dark text-center lg:text-left max-w-[560px]">
              Permanent hires shape culture.
              <br />
              They influence performance long after onboarding.
              <br />
              A wrong hire costs more than a vacant role.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-[10px] border-[3px] border-white bg-white/30 backdrop-blur-[24px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] px-6 sm:px-10 lg:px-12 py-8">
              <div className="flex flex-col gap-4">
                <h4 className="font-notch font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.3] text-dark lg:text-left text-center">
                  Our Approach<span className="text-primary">.</span>
                </h4>
                <p className="text-[14px] sm:text-[16px] font-semibold lg:text-[14px] leading-[1.3] text-dark text-center lg:text-left">
                  We go beyond skills and titles.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/perm-approach-1.svg"
                    alt=""
                    width={90}
                    height={90}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] leading-[1.3] text-dark font-semibold max-w-[250px]">
                    AI evaluates experience, career patterns, and role alignment
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/perm-approach-2.svg"
                    alt=""
                    width={90}
                    height={91}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] leading-[1.3] text-dark font-semibold max-w-[250px]">
                    Humans assess culture fit, communication, and long-term potential
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/perm-approach-3.svg"
                    alt=""
                    width={100}
                    height={100}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] leading-[1.3] text-dark font-semibold max-w-[250px]">
                    Only 3–5 finalists reach your desk, all interview-ready
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border-[3px] border-white bg-white/30 backdrop-blur-[24px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] px-6 sm:px-10 lg:px-12 py-8">
              <div className="flex flex-col gap-4">
                <h4 className="font-notch font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.3] text-dark lg:text-left text-center">
                  The Impact<span className="text-primary">.</span>
                </h4>
                <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.3] text-black text-center lg:text-left">
                  This isn’t faster hiring. It’s smarter hiring.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
                <div className="flex flex-col items-center gap-6">
                  <p className="font-notch font-bold text-[48px] sm:text-[56px] lg:text-[50px] leading-[1.3] bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                    12
                  </p>
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    day average to qualified candidates
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <p className="font-notch font-bold text-[48px] sm:text-[56px] lg:text-[50px] leading-[1.3] bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                    94%
                  </p>
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    match accuracy
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <p className="font-notch font-bold text-[48px] sm:text-[56px] lg:text-[50px] leading-[1.3] bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
                    94%
                  </p>
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    90-day retention
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 border-2 border-primary text-primary rounded-[5px] px-6 sm:px-8 py-4 font-stack-text uppercase text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.3] hover:bg-primary hover:text-white transition-colors"
          >
            Hire for the Long Term
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M21.5666 17.3334H5.33331V14.6667H21.5666L14.1 7.20004L16 5.33337L26.6666 16L16 26.6667L14.1 24.8L21.5666 17.3334Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
