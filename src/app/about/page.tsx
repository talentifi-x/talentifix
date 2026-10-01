import React from "react";
import { Metadata } from "next";
import { AboutBanner } from "@components/about/AboutBanner";
import { OurApproach } from "@components/about/OurApproach";
import { WhatWeStandFor } from "@components/about/WhatWeStandFor";
import { BuiltForToday } from "@components/about/BuiltForToday";
import { Leadership } from "@components/about/Leadership";
import TheNextStepSection from "@components/home/TheNextStepSection";

export const metadata: Metadata = {
  title: "About Us: Human-Led, AI-Assisted Staffing",
  alternates: { canonical: "/about" },
  description:
    "Why TalentiFi-X exists: AI-assisted screening plus human-led decisions, to make hiring faster, smarter and more reliable. Meet our leadership and approach.",
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
