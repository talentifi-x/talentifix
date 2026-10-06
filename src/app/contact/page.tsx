import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@components/contact/ContactForm";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us - Talk to Our Hiring Team",
  description:
    "Contact TalentiFi-X to hire AI, ML and cybersecurity talent, build a GCC team or discuss a partnership. Offices in Bengaluru, India, and Houston, Texas.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/assets/contact/colleagues-reviewing-screen-contact.png"
          alt="Two colleagues reviewing a screen together"
          fill
          className="object-cover"
          fetchPriority="high"
          loading="eager"
        />
      </section>

      {/* Contact Form Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <ContactForm />
        </div>
      </div>

      {/* Next Step Section */}
      <div className="w-full px-4 lg:mb-20 flex justify-center">
        <TheNextStepSection />
      </div>
    </main>
  );
}
