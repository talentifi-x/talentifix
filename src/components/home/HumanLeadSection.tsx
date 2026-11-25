import React from "react";
import Image from "next/image";
import { ArrowRight, Check, Cpu, ShieldCheck, UserRoundCheck } from "lucide-react";

// "EEOC-aligned AI usage" was dropped: the EEOC withdrew its AI hiring guidance
// in January 2025, so there is no current EEOC standard to be aligned with.
const COMMITMENTS = [
  "Human oversight at every AI layer",
  "Equal-opportunity safeguards in AI use",
  "Continuous audits for fairness",
  "Data privacy and security by design",
];

export const HumanLeadSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F2F4F8] py-16 md:py-20 lg:py-24">
      {/* Background Image */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image src="/assets/figma/human-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-10" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] top-[10%] z-0 h-[60%] w-[40%] rounded-full bg-secondary/20 blur-[110px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-site md:gap-14 lg:gap-16">
        {/* Heading */}
        <h2 className="max-w-4xl text-center font-notch text-[40px] font-bold leading-tight text-black md:text-[54px]">
          {/* nowrap keeps each hyphenated word on one line on phones ("AI-" / "Assisted"). */}
          <span className="whitespace-nowrap">Human-Led.</span>{" "}
          <span className="whitespace-nowrap">
            AI-Assisted<span className="text-primary">.</span>
          </span>{" "}
          <span className="text-primary">Always</span>
          <span className="text-secondary">.</span>
        </h2>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* AI does the volume, a person makes the call */}
          <div className="hover-pop flex flex-col gap-8 rounded-3xl border border-white bg-white/85 p-7 shadow-[0_18px_44px_-28px_rgba(0,0,255,0.35)] backdrop-blur-md md:p-10">
            <div aria-hidden="true" className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-primary/[0.07] px-3.5 py-2 text-[13px] font-semibold text-primary">
                <Cpu className="size-4" strokeWidth={2} />
                AI
              </span>
              <span className="h-px flex-1 bg-linear-to-r from-primary/40 to-secondary" />
              <ArrowRight className="-ml-2 size-4 text-secondary" />
              <span className="flex items-center gap-2 rounded-full bg-dark px-3.5 py-2 text-[13px] font-semibold text-white">
                <UserRoundCheck className="size-4" strokeWidth={2} />
                Human
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-notch text-[24px] font-bold leading-snug text-dark md:text-[30px]">
                AI screens <span className="text-primary">10,000+</span> profiles...
                <br />
                But it never makes the final call.
              </p>
              <p className="text-[17px] leading-relaxed text-dark/70 md:text-[19px]">
                Technology supports the process.
                <br />
                Humans own the outcome.
              </p>
            </div>
          </div>

          {/* The rules the AI works under */}
          <div className="hover-pop relative flex flex-col gap-7 overflow-hidden rounded-3xl bg-dark p-7 text-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.7)] md:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-[20%] -top-[40%] h-[90%] w-[70%] rounded-full bg-primary/40 blur-[90px]" />
            <div className="relative flex items-center gap-4">
              <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-secondary">
                <ShieldCheck className="size-6" strokeWidth={1.75} />
              </span>
              <p className="font-notch text-[22px] font-bold leading-snug md:text-[26px]">Ethics, Transparency & Compliance</p>
            </div>
            <ul className="relative grid grid-cols-1 gap-x-6 gap-y-4 border-t border-white/10 pt-7 sm:grid-cols-2 lg:grid-cols-1">
              {COMMITMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-snug text-white/85 md:text-[17px]">
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-dark">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-[22px] font-normal text-black md:text-2xl">
          Trust isn’t claimed.{" "}
          <span className="whitespace-nowrap text-[30px] font-bold text-primary md:text-4xl">It’s engineered.</span>
        </p>
      </div>
    </section>
  );
};
