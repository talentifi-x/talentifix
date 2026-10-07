import React from "react";
import { Metadata } from "next";
import { SolutionsBanner } from "../../components/solutions/SolutioinsBanner";
import { SolutionsAISpeed } from "../../components/solutions/SolutioinsAISpeed";
import { SolutionsTemporaryStaffing } from "../../components/solutions/SolutionsTemporaryStaffing";
import { SolutionsPermanentPlacement } from "../../components/solutions/SolutionsPermanentPlacement";
import { SolutionsContractToHire } from "../../components/solutions/SolutionsContractToHire";
import { SolutionsExecutiveSearch } from "../../components/solutions/SolutionsExecutiveSearch";
import { SolutionsGuide } from "../../components/solutions/SolutionsGuide";
import { SolutionsIncludes } from "../../components/solutions/SolutionsIncludes";
import { SolutionsBuiltFor } from "../../components/solutions/SolutionsBuiltFor";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Staffing Solutions for AI & Tech Hiring",
  description:
    "Temporary staffing, permanent placement, contract-to-hire and executive search from TalentiFi-X: AI-assisted screening, human-led decisions, real results.",
  path: "/solutions",
});

const SolutionsDivider = () => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
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
