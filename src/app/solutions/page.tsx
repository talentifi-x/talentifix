import React from "react";
import { SolutionsBanner } from "../../components/solutions/SolutioinsBanner";
import { SolutionsAISpeed } from "../../components/solutions/SolutioinsAISpeed";
import { SolutionsTemporaryStaffing } from "../../components/solutions/SolutionsTemporaryStaffing";
import { SolutionsPermanentPlacement } from "../../components/solutions/SolutionsPermanentPlacement";
import { SolutionsContractToHire } from "../../components/solutions/SolutionsContractToHire";
import { SolutionsExecutiveSearch } from "../../components/solutions/SolutionsExecutiveSearch";
import { SolutionsIncludes } from "../../components/solutions/SolutionsIncludes";
import { SolutionsBuiltFor } from "../../components/solutions/SolutionsBuiltFor";
import TheNextStepSection from "@components/home/TheNextStepSection";

export default function Solutions() {
  return (
    <div className="w-full">
      <SolutionsBanner />
      <SolutionsAISpeed />
      <SolutionsTemporaryStaffing />
      <SolutionsPermanentPlacement />
      <SolutionsContractToHire />
      <SolutionsExecutiveSearch />
      <SolutionsIncludes />
      <SolutionsBuiltFor />
       <TheNextStepSection />
    </div>
  );
}
