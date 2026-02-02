import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

export const SolutionsBanner = () => {
  return (
    <section className="relative w-full bg-white px-6 md:px-14 py-6 lg:py-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
        <div className="w-full lg:flex-1 text-center lg:text-left">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-notch font-bold text-black mb-6 leading-tight">
            Not Just Roles. Responsibility.
          </h2>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Hiring ins’t about filling sets. It’s about trusting someone with your team, your culture, and your momentum.
          </p>
          <Link
            href="/start-hiring"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 text-white font-bold rounded-sm bg-linear-to-r from-[#0000FF] to-[#000099] hover:from-[#0000CC] hover:to-[#000080] transition-colors"
          >
            HIRE SMARTER <ArrowBigRight className="inline-block" />
          </Link>
        </div>

        <div className="w-full lg:flex-1 flex justify-center">
          <Image
            src="/assets/Solutions/hero-visual.png"
            alt="Hero Visual"
            width={600}
            height={400}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="w-full max-w-[560px] h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};
