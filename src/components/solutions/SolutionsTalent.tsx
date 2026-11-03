import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { livePages } from "@data/content";

/** Links from the Solutions hub to each live technology talent page. */
export const SolutionsTalent = () => {
  const pages = livePages("talent");
  if (pages.length === 0) return null;
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14 py-14 lg:py-[72px]">
        <h2 className="text-center font-notch font-bold text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.3] text-black">
          Technology <span className="text-primary">Talent</span>
          <span className="text-primary">.</span>
        </h2>
        <p className="mt-3 text-center text-dark/70 text-[16px] lg:text-[18px]">
          Specialist hiring across the technology functions businesses depend on.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="group flex h-full flex-col rounded-[10px] border border-gray-200 bg-white p-5 hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <h3 className="font-notch font-bold text-dark text-[18px] leading-snug group-hover:text-primary transition-colors">
                  {page.navLabel}
                </h3>
                <span className="mt-2 flex-1 text-dark/70 text-[15px] leading-relaxed">{page.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
