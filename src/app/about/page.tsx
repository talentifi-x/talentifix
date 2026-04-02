import React from "react";
import { Metadata } from "next";
import { AboutBanner } from "@components/about/AboutBanner";
import { OurApproach } from "@components/about/OurApproach";
import { WhatWeStandFor } from "@components/about/WhatWeStandFor";
import { BuiltForToday } from "@components/about/BuiltForToday";
import { Leadership } from "@components/about/Leadership";
import TheNextStepSection from "@components/home/TheNextStepSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TalentiFi-X — who we are, what we stand for, and why we're rebuilding staffing for the modern workforce.",
};

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
