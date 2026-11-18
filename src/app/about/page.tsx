import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AboutBanner } from "@components/about/AboutBanner";
import { OurApproach } from "@components/about/OurApproach";
import { WhatWeStandFor } from "@components/about/WhatWeStandFor";
import { BuiltForToday } from "@components/about/BuiltForToday";
import { Leadership } from "@components/about/Leadership";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { JsonLd } from "@components/seo/JsonLd";
import { founderNode, jsonLdGraph, pageMetadata, pageShareImage, webPageNode } from "@lib/seo";
import { PageQuestions } from "@components/content/PageQuestions";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Human-Led, AI-Assisted Staffing",
  description:
    "Why TalentiFi-X exists: AI-assisted screening plus human-led decisions, to make hiring faster, smarter and more reliable. Meet our leadership and approach.",
  path: "/about",
  image: pageShareImage("/about", "About TalentiFi-X: human-led, AI-assisted staffing, founded by Chetan Mangalwedhe"),
});

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* The founder shown in the Leadership section, as a Person entity. */}
      <JsonLd
        data={jsonLdGraph({
          ...webPageNode("/about", "About TalentiFi-X", "AboutPage"),
          mentions: { "@id": founderNode["@id"] },
        }, founderNode)}
      />
      <AboutBanner />
      <OurApproach />
      <WhatWeStandFor />
      <BuiltForToday />
      <Leadership />
      <PageQuestions
        title="Questions about TalentiFi-X"
        updatedPath="/about"
        items={[
          { question: "Who founded TalentiFi-X?", answer: <>Chetan “Chet” Mangalwedhe founded TalentiFi-X. His background spans staffing, IT services and enterprise technology; the leadership profile above explains the experience behind our human-led, AI-assisted approach.</> },
          { question: "Where can employers see your hiring specialisms?", answer: <>Our talent pages describe the roles, capabilities and evaluation considerations for each technology discipline. Start with <Link href="/talent/software-engineering-talent">software engineering</Link>, <Link href="/talent/cybersecurity-talent">cybersecurity</Link> or our <Link href="/solutions">staffing solutions</Link> to connect your requirement with a hiring model.</> },
        ]}
      />
      <TheNextStepSection />
    </div>
  );
}
