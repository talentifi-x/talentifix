import React from "react";
import { Metadata } from "next";
import { PrimaryClientContactForm } from "@components/contact/PrimaryClientContactForm";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start Hiring - Request AI & Tech Talent",
  description:
    "Tell us about the role you need to fill, from AI and ML engineers to cybersecurity specialists. Share a few details and we reply within 4 business hours.",
  path: "/start-hiring",
});

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
