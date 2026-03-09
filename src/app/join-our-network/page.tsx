import React from "react";
import { Metadata } from "next";
import { CandidateRegistrationForm } from "@components/candidates/CandidateRegistrationForm";

export const metadata: Metadata = {
  title: "Join Our Network",
  description:
    "Are you an AI, ML, or cybersecurity professional in India? Join TalentiFi-X's talent network for your next opportunity.",
};

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
