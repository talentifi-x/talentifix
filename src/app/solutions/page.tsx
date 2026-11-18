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
