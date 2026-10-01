import React from "react";
import { Metadata } from "next";
import { CandidateRegistrationForm } from "@components/candidates/CandidateRegistrationForm";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Join Our Talent Network - AI & Cyber Roles",
  description:
    "Are you an AI, ML or cybersecurity professional in India? Join the TalentiFi-X talent network to be matched with specialist roles that fit your skills.",
  path: "/join-our-network",
});

export default function JoinOurNetworkPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <CandidateRegistrationForm />
        </div>
      </div>
    </main>
  );
}
