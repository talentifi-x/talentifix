import React from "react";
import { ServicesBanner } from "@components/services/ServicesBanner";
import { ServicesAISpeed } from "@components/services/ServicesAISpeed";
import { ServicesTemporaryStaffing } from "@components/services/ServicesTemporaryStaffing";
import { ServicesPermanentPlacement } from "@components/services/ServicesPermanentPlacement";
import { ServicesContractToHire } from "@components/services/ServicesContractToHire";
import { ServicesExecutiveSearch } from "@components/services/ServicesExecutiveSearch";
import { ServicesIncludes } from "@components/services/ServicesIncludes";
import { ServicesBuiltFor } from "@components/services/ServicesBuiltFor";

export default function Services() {
  return (
    <div className="w-full">
     
      <ServicesBanner />
      <ServicesAISpeed />
      <ServicesTemporaryStaffing />
      <ServicesPermanentPlacement />
      <ServicesContractToHire />
      <ServicesExecutiveSearch />
      <ServicesIncludes />
      <ServicesBuiltFor />
    </div>
  );
}