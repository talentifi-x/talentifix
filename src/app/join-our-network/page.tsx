import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageQuestions } from "@components/content/PageQuestions";
import { JsonLd } from "@components/seo/JsonLd";
import { CandidateRegistrationForm } from "@components/candidates/CandidateRegistrationForm";
import { jsonLdGraph, pageMetadata, webPageNode } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Join Our Talent Network - AI & Cyber Roles",
  description:
    "Are you an AI, ML or cybersecurity professional in India? Join the TalentiFi-X talent network to be matched with specialist roles that fit your skills.",
  path: "/join-our-network",
});

export default function JoinOurNetworkPage() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <JsonLd data={jsonLdGraph(webPageNode("/join-our-network", "Join the TalentiFi-X Talent Network"))} />
      <div className="w-full max-w-7xl mx-auto px-site py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <CandidateRegistrationForm />
        </div>
      </div>
      <PageQuestions
        title="Questions about joining our talent network"
        updatedPath="/join-our-network"
        items={[
          { question: "Who should join the talent network?", answer: <>This registration form is for professionals exploring AI, machine learning, data science and cybersecurity opportunities in India. Share your experience, technical skills, preferred working arrangement and availability so your profile describes the work you want to do.</> },
          { question: "What should I prepare before registering?", answer: <>Have your contact details, location, skills, experience and work preferences ready. Upload a CV in PDF, DOC or DOCX format, no larger than 5 MB. You can also share a LinkedIn profile or relevant project links. Read the <Link href="/privacy-policy">privacy policy</Link> and the consent statement before submitting.</> },
          { question: "Does joining the network apply me to a specific job?", answer: <>Registration shares your profile for recruitment consideration; it is not an application to a named vacancy or a guarantee of an interview. For an advertised position, check the requirements on the <Link href="/jobs">open roles page</Link> and use that position’s application instructions.</> },
        ]}
      />
    </div>
  );
}
