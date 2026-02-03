import React from "react";
import Image from "next/image";

const chips = [
  "HIRING BECAME SLOW",
  "PROCESSES BECAME LAZY",
  "RESULTS BECAME UNPREDICTABLE",
] as const;

export const AboutBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/about/banner.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
          priority={false}
        />
        <div className="absolute inset-0 bg-white/45" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-white/25 to-secondary/10" />
      </div>

      <div className="relative z-10 w-full px-4  md:px-14 py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative rounded-[18px] bg-gradient-to-r from-secondary to-primary p-[2px] ">
            {/* Mask layer (blocks gradient bleed) */}
            <div className="absolute inset-[2px] rounded-[16px] bg-white "></div>
            <div className="relative overflow-hidden rounded-[16px] bg-transparent backdrop-blur-[24px] px-10  md:px-12 py-10 sm:py-12">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/18 blur-3xl" />
                <div className="absolute -right-20 -bottom-28 h-96 w-96 rounded-full bg-primary/14 blur-3xl" />
                {[
                  { top: "18%", left: "12%", size: 10 },
                  { top: "28%", left: "36%", size: 7 },
                  { top: "20%", left: "72%", size: 9 },
                  { top: "52%", left: "18%", size: 6 },
                  { top: "62%", left: "54%", size: 8 },
                  { top: "50%", left: "84%", size: 6 },
                ].map((dot, index) => (
                  <span
                    key={index}
                    className="absolute rounded-full bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.65)]"
                    style={{
                      top: dot.top,
                      left: dot.left,
                      width: dot.size,
                      height: dot.size,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="text-[30px] sm:text-[40px] md:text-[52px] font-notch font-bold text-dark leading-tight">
                  Built for <span className="text-primary">Modern Hiring</span>
                  <span className="text-secondary">.</span>
                </h1>
                <p className="mt-2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-dark max-w-3xl">
                  TalentiFi-X was created to fix what traditional staffing hasn&apos;t kept up with.
                </p>

                <div className="mt-6 sm:mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-6">
                  {chips.map((label) => (
                    <div
                      key={label}
                      className="rounded-[6px] border-2 border-primary bg-white/20 backdrop-blur-[10px] px-4 py-5 text-[10px] sm:text-[11px] md:text-[12px] font-bold text-dark uppercase tracking-wide shadow-[0px_6px_20px_rgba(0,0,0,0.06)]"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <p className="mt-7 sm:mt-10 text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-dark">
                  We believed it could be done better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
