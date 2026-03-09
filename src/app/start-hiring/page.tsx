import React from "react";
import { Metadata } from "next";
import { PrimaryClientContactForm } from "@components/contact/PrimaryClientContactForm";

export const metadata: Metadata = {
  title: "Start Hiring",
  description:
    "Ready to hire top AI, ML, and cybersecurity talent? Tell us about your role and we'll respond within 4 hours.",
};

export default function StartHiringPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <PrimaryClientContactForm />
        </div>
      </div>
    </main>
  );
}
