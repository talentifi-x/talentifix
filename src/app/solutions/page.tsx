import React from "react";
import { Metadata } from "next";
import { SolutionsBanner } from "../../components/solutions/SolutioinsBanner";
import { SolutionsAISpeed } from "../../components/solutions/SolutioinsAISpeed";
import { SolutionsTemporaryStaffing } from "../../components/solutions/SolutionsTemporaryStaffing";
import { SolutionsPermanentPlacement } from "../../components/solutions/SolutionsPermanentPlacement";
import { SolutionsContractToHire } from "../../components/solutions/SolutionsContractToHire";
import { SolutionsExecutiveSearch } from "../../components/solutions/SolutionsExecutiveSearch";
import { SolutionsIncludes } from "../../components/solutions/SolutionsIncludes";
import { SolutionsBuiltFor } from "../../components/solutions/SolutionsBuiltFor";
import TheNextStepSection from "@components/home/TheNextStepSection";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore TalentiFi-X staffing solutions: temporary staffing, permanent placement, contract-to-hire, and executive search — AI-assisted and human-led.",
};

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
      <SolutionsIncludes />
      <SolutionsBuiltFor />
      <TheNextStepSection />
    </div>
  );
}
