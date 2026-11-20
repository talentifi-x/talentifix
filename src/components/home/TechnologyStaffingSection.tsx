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
    <div className="flex flex-col gap-6 w-full">
      <h3 id={id} className="text-primary font-notch font-bold text-sm md:text-base tracking-[0.18em] uppercase">
        {title}
      </h3>
      <ul aria-labelledby={id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {links.map((link) => (
          <li
            key={link.id}
            className="group relative flex flex-col gap-2 md:gap-3 rounded-[10px] border border-gray-200/80 bg-white p-5 md:p-6 shadow-[0px_4px_7px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              {/* The whole card is clickable; the link text stays the search phrase alone. */}
              <Link
                href={link.href}
                className="font-bold text-[16px] md:text-[17px] leading-snug text-dark group-hover:text-primary after:absolute after:inset-0 after:rounded-[10px] focus-visible:outline-none"
              >
                {link.text}
              </Link>
              <ArrowRight
                className="mt-0.5 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-dark/70">{link.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Links from the homepage to every specialist talent and service page, with the
 * phrase each page targets as its link text. Added after "Where We Specialize"
 * (SEO update, 20 Nov 2026) so the strongest page on the site passes authority
 * and context to the pages built for those searches.
 */
export function TechnologyStaffingSection() {
  const { talent, services } = specialistLinks();
  return (
    <section
      id="technology-staffing-services"
      aria-labelledby="technology-staffing-heading"
      className="w-full bg-[#F7F9FC] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
          <h2
            id="technology-staffing-heading"
            className="text-[40px] md:text-[54px] font-notch font-bold text-dark leading-tight"
          >
            Technology Staffing Services<span className="text-secondary">.</span>
          </h2>
          <p className="text-[20px] md:text-[24px] text-dark">
            Specialist hiring for the technology roles and engagement models employers ask us about most, in India and
            the USA.
          </p>
        </div>

        <LinkGroup id="technology-talent-heading" title="Technology talent we hire" links={talent} />
        <LinkGroup id="staffing-services-heading" title="Staffing and engineering services" links={services} />

        <Link
          href="/start-hiring"
          className="inline-flex min-h-11 items-center gap-2 font-bold text-primary hover:underline underline-offset-4"
        >
          Tell us the role you need
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
