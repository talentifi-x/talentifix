import React from "react";
import { Metadata } from "next";
import { SolutionsBanner } from "../../components/solutions/SolutioinsBanner";
import { SolutionsAISpeed } from "../../components/solutions/SolutioinsAISpeed";
import { SolutionsTemporaryStaffing } from "../../components/solutions/SolutionsTemporaryStaffing";
import { SolutionsPermanentPlacement } from "../../components/solutions/SolutionsPermanentPlacement";
import { SolutionsContractToHire } from "../../components/solutions/SolutionsContractToHire";
import { SolutionsExecutiveSearch } from "../../components/solutions/SolutionsExecutiveSearch";
import { SolutionsGuide } from "../../components/solutions/SolutionsGuide";
import { SolutionsTalent } from "../../components/solutions/SolutionsTalent";
import { SolutionsIncludes } from "../../components/solutions/SolutionsIncludes";
import { SolutionsBuiltFor } from "../../components/solutions/SolutionsBuiltFor";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { pageMetadata, pageShareImage } from "@lib/seo";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Contract & Permanent Staffing in India & USA",
  description:
    "Contract staffing, permanent recruitment and contract-to-hire for technology teams in India and the USA. Explore hiring models with TalentiFi-X.",
  path: "/solutions",
  image: pageShareImage("/solutions", "TalentiFi-X staffing solutions: contract, contract-to-hire, permanent placement and executive search"),
});

const SolutionsDivider = () => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-site">
        <div className="h-px w-full bg-grey" />
      </div>
    </div>
  );
};

export default function Solutions() {
  return (
    <div className="w-full">
      <SolutionsBanner />
      <SolutionsAISpeed />
      <section id="quality-engineering" className="w-full bg-grey-accent/60 px-site py-16 lg:py-24">
        <div className="max-w-site mx-auto grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="text-primary font-notch font-bold text-sm tracking-[0.18em] uppercase">Quality engineering</p>
            <h2 className="mt-3 font-notch font-bold text-dark text-[32px] sm:text-[40px] leading-tight">
              Build quality into every <span className="text-primary">release.</span>
            </h2>
            <p className="mt-5 text-dark/75 text-[17px] leading-relaxed">
              Explore software testing and QA support for web, mobile and API applications, from functional validation to automation and CI/CD integration.
            </p>
          </div>
          <Link href="/services/software-testing-qa" className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all">
            <ShieldCheck className="h-10 w-10 text-primary" aria-hidden="true" />
            <h3 className="mt-5 font-notch font-bold text-dark text-[24px] group-hover:text-primary">Software Testing &amp; QA</h3>
            <p className="mt-3 text-dark/70 text-[16px] leading-relaxed">Human-led. Automation-first. Functional, non-functional, manual and automated testing built around your product.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-primary font-semibold">Explore QA services <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>
        </div>
      </section>
      <SolutionsTalent />
      <SolutionsTemporaryStaffing />
      <SolutionsDivider />
      <SolutionsPermanentPlacement />
      <SolutionsDivider />
      <SolutionsContractToHire />
      <SolutionsDivider />
      <SolutionsExecutiveSearch />
      <SolutionsGuide />
      <SolutionsIncludes />
      <SolutionsBuiltFor />
      <TheNextStepSection />
    </div>
  );
}
