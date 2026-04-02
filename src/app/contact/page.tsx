import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@components/contact/ContactForm";
import TheNextStepSection from "@components/home/TheNextStepSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TalentiFi-X for hiring, partnerships, or any questions.",
};

export default function ContactPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/assets/contact/hero.png"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
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
