import React from "react";
import Image from "next/image";
import Link from "next/link";

export const SolutionsTemporaryStaffing = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Image
        src="/assets/Solutions/temp-staffing-bg.svg"
        alt=""
        width={1468}
        height={716}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[172px] -translate-x-1/2 opacity-100 max-w-none"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14 py-14 lg:py-[88px]">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center font-notch font-bold text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.3] text-black">
            Temporary <span className="text-primary">Staffing</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        <div className="mt-14 lg:mt-[77px] flex flex-col items-center gap-10 lg:gap-14">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-10">
            <h3 className="font-notch font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.3] text-dark text-center lg:text-left">
              When Speed Matters -<br />
              and Quality Can’t Slip<span className="text-primary">.</span>
            </h3>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.3] text-dark text-center lg:text-left max-w-[540px]">
              Some roles are urgent. Projects can’t wait.
              Demand spikes without warning. Temporary staffing
              <br />
              shouldn’t feel temporary in quality.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-[10px] border-[3px] border-white bg-white/30 backdrop-blur-[24px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] px-6 sm:px-10 lg:px-12 py-8">
              <h4 className="lg:text-left text-center  font-notch font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.3] text-dark">
                Our Approach<span className="text-primary">.</span>
              </h4>
              <p className="mt-4 lg:text-left text-center font-semibold text-[14px]  lg:text-[13px] leading-[1.3] text-dark">
                We don’t rush resumes. We accelerate decisions.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-icon-1.svg"
                    alt=""
                    width={105}
                    height={105}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    AI rapidly screens large talent pools for role readiness
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-icon-2.svg"
                    alt=""
                    width={90}
                    height={90}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    Human recruiters validate reliability, intent, and fit
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-icon-3.svg"
                    alt=""
                    width={90}
                    height={90}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    Candidates are deployment-ready, not “figure-it-out-later” hires
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border-[3px] border-white bg-white/30 backdrop-blur-[24px] shadow-[0px_4px_7px_rgba(0,0,0,0.07)] px-6 sm:px-10 lg:px-12 py-8">
              <h4 className="lg:text-left text-center font-notch font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.3] text-dark">
                The Impact<span className="text-primary">.</span>
              </h4>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-impact-1.svg"
                    alt=""
                    width={90}
                    height={91}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    Rapid workforce deployment
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-impact-2.svg"
                    alt=""
                    width={90}
                    height={90}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    Reduced downtime and project delays
                  </p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src="/assets/Solutions/temp-impact-3.svg"
                    alt=""
                    width={88}
                    height={88}
                    aria-hidden="true"
                    className="object-contain w-17.5 h-17.5"
                  />
                  <p className="text-center text-[14px] sm:text-[15px] lg:text-[12px] font-semibold leading-[1.3] text-dark max-w-[250px]">
                    Talent aligned to your working style and expectations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 border-2 border-primary text-primary rounded-[5px] px-6 sm:px-8 py-4 font-stack-text uppercase text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.3] hover:bg-primary hover:text-white transition-colors"
          >
            Get Temporary Talent, Done Right
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
