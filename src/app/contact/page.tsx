import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@components/contact/ContactForm";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { JsonLd } from "@components/seo/JsonLd";
import {
  ORG_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  jsonLdGraph,
  organizationNode,
  pageMetadata,
} from "@lib/seo";

const PAGE_URL = `${SITE_URL}/contact`;
const BENGALURU_OFFICE_ID = `${PAGE_URL}#bengaluru-office`;

/**
 * The Bengaluru office as a local business (EmploymentAgency is schema.org's
 * LocalBusiness type for staffing firms), tied to the Organization by @id.
 * The address is the one in the footer and the Organization node.
 *
 * Houston is left out until it is confirmed that the office receives visitors:
 * local-business markup (and a Google Business Profile) is only for a place
 * clients can actually go to.
 */
const contactSchema = jsonLdGraph(
  {
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: `Contact ${SITE_NAME}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": BENGALURU_OFFICE_ID },
  },
  {
    "@type": "EmploymentAgency",
    "@id": BENGALURU_OFFICE_ID,
    name: SITE_NAME,
    url: PAGE_URL,
    image: `${SITE_URL}/logos/logo.png`,
    email: organizationNode.contactPoint.email,
    address: organizationNode.address[0],
    areaServed: ["IN", "US"],
    parentOrganization: { "@id": ORG_ID },
  },
);

export const metadata: Metadata = pageMetadata({
  title: "Contact Us - Talk to Our Hiring Team",
  description:
    "Contact TalentiFi-X to hire AI, ML and cybersecurity talent, build a GCC team or discuss a partnership. Offices in Bengaluru, India, and Houston, Texas.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <JsonLd data={contactSchema} />
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
    </div>
  );
}
