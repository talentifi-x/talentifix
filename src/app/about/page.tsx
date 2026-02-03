import React from "react";
import { AboutBanner } from "@components/about/AboutBanner";
import { OurApproach } from "@components/about/OurApproach";
import { WhatWeStandFor } from "@components/about/WhatWeStandFor";
import { BuiltForToday } from "@components/about/BuiltForToday";
import { Leadership } from "@components/about/Leadership";
import TheNextStepSection from "@components/home/TheNextStepSection";

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      <AboutBanner />
      <OurApproach />
      <WhatWeStandFor />
      <BuiltForToday />
      <Leadership />
      <TheNextStepSection />
    </main>
  );
}
