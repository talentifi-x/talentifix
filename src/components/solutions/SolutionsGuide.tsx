import React from "react";
import Link from "next/link";

/**
 * Points buyers comparing agencies to the guides that answer that question: the
 * agency checklist and the contract staffing guide for India (the page Google
 * already shows for "contract staffing in india").
 */
export const SolutionsGuide = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14 pb-14 lg:pb-[72px]">
        <div className="rounded-[10px] border border-primary/20 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="max-w-[640px]">
            <h2 className="font-notch font-bold text-dark text-[22px] md:text-[26px] leading-tight">
              Comparing IT staffing partners<span className="text-primary">?</span>
            </h2>
            <p className="mt-2 text-dark/70 text-[16px] leading-relaxed">
              Our guide sets out the 10 questions to ask any technology staffing agency, from how it
              screens candidates to how it prices contract, contract-to-hire and direct hire roles.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <Link
              href="/blog/how-to-choose-it-staffing-agency-usa"
              className="inline-flex min-h-11 items-center justify-center px-6 py-3 bg-primary text-white rounded-sm font-sans font-medium hover:opacity-90 transition-opacity"
            >
              How to choose an IT staffing agency
            </Link>
            <Link
              href="/blog/contract-staffing-india-guide"
              className="inline-flex min-h-11 items-center justify-center px-6 py-3 border border-primary text-primary rounded-sm font-sans font-medium hover:bg-primary/5 transition-colors"
            >
              Contract staffing in India: the guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
