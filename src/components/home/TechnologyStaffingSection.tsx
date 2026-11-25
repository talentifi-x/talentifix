import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { livePages, type ContentPage } from "@data/content";
import { SITE_URL, absoluteUrl } from "@lib/seo";

/**
 * Card copy for each specialist page. `text` is the link text: the search phrase
 * the page targets, short enough to read as a title. `blurb` is one line that
 * adds to it rather than repeating it. Pages without an entry fall back to their
 * menu label and summary, so a newly published page still appears.
 */
const CARD_COPY: Record<string, { text: string; blurb: string }> = {
  "talent-ai-ml": { text: "AI & machine learning staffing", blurb: "AI, ML and LLM engineers, MLOps, data science and AI leadership." },
  "talent-software": { text: "Software engineering staffing", blurb: "Backend, frontend, full-stack, mobile and platform engineers." },
  "talent-data": { text: "Data & analytics staffing", blurb: "Data analysts, BI developers, data scientists and data architects." },
  "talent-cloud": { text: "Cloud & DevOps staffing", blurb: "Cloud, DevOps, platform engineering, SRE and FinOps talent." },
  "talent-cyber": { text: "Cybersecurity staffing", blurb: "Security engineering, SOC, IAM, GRC and security leadership." },
  "talent-erp": { text: "ERP & SAP staffing", blurb: "SAP S/4HANA consultants, integration specialists and ERP leaders." },
  "talent-data-engineering": { text: "Senior data engineering talent for cloud analytics", blurb: "Snowflake, Databricks, dbt and real-time streaming engineers." },
  "talent-generative-ai-llm-usa": { text: "Contract generative AI & LLM engineers, USA", blurb: "RAG, fine-tuning and LLMOps engineers on contract or contract-to-hire." },
  "service-software-testing-qa": { text: "Software testing & QA services", blurb: "Manual and automated testing for web, mobile and APIs, built into CI/CD." },
  "service-fintech-cybersecurity": { text: "Contract cybersecurity staffing for fintech", blurb: "AppSec, SOC 2 and cloud security contractors for fintech platforms." },
  "service-automation-testing": { text: "Automation testing & QA engineer staffing, India", blurb: "SDETs skilled in Playwright, Cypress, Selenium and CI/CD quality gates." },
  "service-offshore-engineering": { text: "Dedicated offshore software engineering teams, India", blurb: "Full-stack, backend and cloud engineers in India, on hours that overlap yours." },
};

type SpecialistLink = { id: string; href: string; text: string; blurb: string };

const toLink = (page: ContentPage): SpecialistLink => ({
  id: page.id,
  href: page.path,
  text: CARD_COPY[page.id]?.text ?? page.navLabel,
  blurb: CARD_COPY[page.id]?.blurb ?? page.summary,
});

/** Every live talent and service page, grouped the way the homepage shows them. */
export function specialistLinks() {
  return {
    talent: livePages("talent").map(toLink),
    services: livePages("solution").map(toLink),
  };
}

/** The same links as structured data, so the homepage lists the services it offers. */
export function specialistLinksJsonLd() {
  const { talent, services } = specialistLinks();
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#technology-staffing-services`,
    name: "Technology staffing services",
    itemListElement: [...talent, ...services].map((link, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: link.text,
      url: absoluteUrl(link.href),
    })),
  };
}

function LinkGroup({ id, title, links }: { id: string; title: string; links: SpecialistLink[] }) {
  if (!links.length) return null;
  return (
    <div className="flex w-full flex-col gap-5 md:gap-6">
      {/* The group's label, then a thin rule that fades out across the row. */}
      <div className="flex items-center gap-4">
        <h3 id={id} className="shrink-0 text-primary font-notch font-bold text-sm md:text-base tracking-[0.18em] uppercase">
          {title}
        </h3>
        <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-primary/25 to-transparent" />
      </div>
      <ul aria-labelledby={id} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {links.map((link) => (
          <li
            key={link.id}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#dbe4fa] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-24px_rgba(0,0,255,0.22)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_22px_40px_-24px_rgba(0,0,255,0.35)] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 md:p-6"
          >
            {/* The brand line (blue to cyan) slides across the top on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
            />
            <div className="flex items-start justify-between gap-3">
              {/* The whole card is clickable; the link text stays the search phrase alone. */}
              <Link
                href={link.href}
                className="font-bold text-[16px] md:text-[17px] leading-snug text-dark transition-colors group-hover:text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
              >
                {link.text}
              </Link>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/[0.07] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
              >
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-dark/65">{link.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Links from the homepage to every specialist talent and service page, with the
 * phrase each page targets as its link text. Placed after the client section so
 * visitors can find relevant services before the longer company story.
 */
export function TechnologyStaffingSection() {
  const { talent, services } = specialistLinks();
  return (
    <section
      id="technology-staffing-services"
      aria-labelledby="technology-staffing-heading"
      // Grey at the top like the client logos above, white at the bottom like the story below.
      className="w-full bg-linear-to-b from-grey-accent to-white py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-site flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
          <h2
            id="technology-staffing-heading"
            className="text-[40px] md:text-[54px] font-notch font-bold text-dark leading-tight"
          >
            Technology Staffing Services<span className="text-secondary">.</span>
          </h2>
          <div className="flex max-w-3xl flex-col gap-4 text-[17px] leading-relaxed text-dark/80 md:text-[19px]">
            <p>
              TalentiFi-X helps employers in India and the USA hire technology professionals across AI and machine
              learning, software engineering, cloud and DevOps, cybersecurity, data and analytics, and ERP and SAP.
            </p>
            <p>
              We support contract staffing, contract-to-hire and permanent recruitment, with recruiters assessing
              candidates against the role&apos;s technical requirements and business context. Share the skills,
              location and timeline you need to start a hiring conversation.
            </p>
          </div>
        </div>

        <LinkGroup id="technology-talent-heading" title="Technology talent we hire" links={talent} />
        <LinkGroup id="staffing-services-heading" title="Staffing and engineering services" links={services} />

        <Link
          href="/start-hiring"
          className="inline-flex min-h-12 items-center gap-2 rounded-[5px] border-2 border-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Tell us the role you need
          <ArrowRight className="size-[18px]" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
