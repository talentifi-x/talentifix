import React from "react";
import { Metadata } from "next";
import { AboutBanner } from "@components/about/AboutBanner";
import { OurApproach } from "@components/about/OurApproach";
import { WhatWeStandFor } from "@components/about/WhatWeStandFor";
import { BuiltForToday } from "@components/about/BuiltForToday";
import { Leadership } from "@components/about/Leadership";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { JsonLd } from "@components/seo/JsonLd";
import { SITE_URL, founderNode, jsonLdGraph, pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Human-Led, AI-Assisted Staffing",
  description:
    "Why TalentiFi-X exists: AI-assisted screening plus human-led decisions, to make hiring faster, smarter and more reliable. Meet our leadership and approach.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* The founder shown in the Leadership section, as a Person entity. */}
      <JsonLd
        data={jsonLdGraph({
          "@type": "AboutPage",
          "@id": `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: "About TalentiFi-X",
          about: { "@id": founderNode.worksFor["@id"] },
          mentions: { "@id": founderNode["@id"] },
        }, founderNode)}
      />
      <AboutBanner />
      <OurApproach />
      <WhatWeStandFor />
      <BuiltForToday />
      <Leadership />
      <TheNextStepSection />
    </main>
  );
}
