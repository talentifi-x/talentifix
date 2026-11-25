import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageQuestions } from "@components/content/PageQuestions";
import { ContactForm } from "@components/contact/ContactForm";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { JsonLd } from "@components/seo/JsonLd";
import {
  ORG_ID,
  SITE_NAME,
  SITE_URL,
  jsonLdGraph,
  organizationNode,
  pageMetadata,
  webPageNode,
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
    ...webPageNode("/contact", `Contact ${SITE_NAME}`, "ContactPage"),
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
      <div className="w-full max-w-7xl mx-auto px-site py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <ContactForm />
        </div>
      </div>

      <PageQuestions
        title="Contact and hiring questions"
        updatedPath="/contact"
        items={[
          {
            question: "How do I contact TalentiFi-X about hiring?",
            answer: <>Use the form above or email <a href={`mailto:${organizationNode.contactPoint.email}`}>{organizationNode.contactPoint.email}</a> to discuss a hiring requirement, a broader workforce plan or a partnership. Tell us which company you represent and the best way to reach you. If you already have a role brief, our <Link href="/start-hiring">Start Hiring form</Link> provides a dedicated route for employer requirements. You can explore the <Link href="/solutions">staffing models</Link> before choosing an engagement.</>,
          },
          {
            question: "What information should I include in a hiring enquiry?",
            answer: <>Include the role title, essential skills, seniority, work location and preferred start date. A budget range, expected project duration and remote, hybrid or onsite requirements help explain the scope. Describe the work the person will own and the team they will join, as well as any interview stages already planned. If the brief is still developing, share the business problem you need the hire to solve.</>,
          },
          {
            question: "Can I discuss hiring in both India and the USA?",
            answer: <>Yes. TalentiFi-X supports technology hiring in India and the USA, with offices listed in Bengaluru and Houston. Specify the country and city where the person will work, the team they will support and any time-zone overlap required. You can discuss contract staffing, contract-to-hire, permanent placement or executive search. The appropriate approach and engagement terms depend on the particular role and hiring location.</>,
          },
          {
            question: "Where should candidates send their profiles?",
            answer: <>Technology professionals can <Link href="/join-our-network">join our talent network</Link> with their experience, skills, preferences and CV. For a specific advertised vacancy, visit <Link href="/jobs">open roles</Link> and follow that role’s application instructions. The employer enquiry form is intended for hiring and business conversations. Review our <Link href="/privacy-policy">privacy policy</Link> before sharing personal information, and use the application route that matches your purpose.</>,
          },
        ]}
      />

      {/* Next Step Section */}
      <div className="w-full lg:mb-20 flex justify-center">
        <TheNextStepSection />
      </div>
    </div>
  );
}
