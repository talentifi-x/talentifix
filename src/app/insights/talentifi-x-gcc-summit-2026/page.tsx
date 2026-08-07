import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gccSummitGallery } from "@data/mediaData";

const SLUG = "/insights/talentifi-x-gcc-summit-2026";
const BANNER = "/banner/gcc-summit-2026-bengaluru-banner.png";

/** GCC Summit 2026 took place on this date; used for the Event and Article entities. */
const EVENT_DATE = "2026-07-15";

const SEO_DESCRIPTION =
  "TalentiFi-X, Delegate Experience Sponsor at GCC Summit 2026 in Bengaluru, shares key themes on GCC talent, AI, strategic ownership, innovation and capability.";

export const metadata: Metadata = {
  title: {
    absolute:
      "TalentiFi-X at GCC Summit 2026 Bengaluru | GCC Talent & AI Insights",
  },
  description: SEO_DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: {
    title:
      "TalentiFi-X at GCC Summit 2026 Bengaluru | GCC Talent & AI Insights",
    description: SEO_DESCRIPTION,
    type: "article",
    url: SLUG,
    images: [{ url: BANNER, width: 1774, height: 887 }],
  },
};

const themes = [
  {
    number: "01",
    title: "From Cost to Capability",
    body: "The GCC conversation has moved beyond cost arbitrage. Increasingly, value is being defined by outcomes, innovation, product ownership and contribution to global business strategy.",
  },
  {
    number: "02",
    title: "From Execution to Ownership",
    body: "Trust and demonstrated capability emerged as recurring themes. The opportunity for Indian GCCs is to move beyond executing global mandates and increasingly influence, own and shape them.",
  },
  {
    number: "03",
    title: "AI + Human Capability",
    body: "AI is becoming embedded in how GCCs operate. At the same time, domain depth, judgment, creativity and problem-solving are becoming increasingly important capabilities for the workforce.",
  },
  {
    number: "04",
    title: "Talent as Strategic Infrastructure",
    body: "The next generation of GCC talent will require more than technical expertise. Learning velocity, business understanding, adaptability, domain knowledge and the ability to work effectively with AI are becoming critical.",
  },
];

function buildJsonLd(siteUrl: string) {
  const pageUrl = `${siteUrl}${SLUG}`;
  const bannerUrl = `${siteUrl}${BANNER}`;
  const orgId = `${siteUrl}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "TalentiFi-X",
        url: siteUrl,
        logo: `${siteUrl}/logos/logo.svg`,
        sameAs: [
          "https://www.linkedin.com/company/TalentiFi-X/",
          "https://x.com/talentifi_x",
          "https://www.instagram.com/talentifi_x",
        ],
      },
      {
        "@type": "Event",
        "@id": `${pageUrl}#event`,
        name: "GCC Summit 2026",
        startDate: EVENT_DATE,
        endDate: EVENT_DATE,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: bannerUrl,
        location: {
          "@type": "Place",
          name: "Bengaluru, India",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
        },
        sponsor: { "@id": orgId },
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "TalentiFi-X at GCC Summit 2026",
        description: SEO_DESCRIPTION,
        image: bannerUrl,
        inLanguage: "en-IN",
        datePublished: EVENT_DATE,
        dateModified: EVENT_DATE,
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        author: { "@id": orgId },
        publisher: { "@id": orgId },
        about: { "@id": `${pageUrl}#event` },
        keywords: [
          "GCC Summit 2026 Bengaluru",
          "Global Capability Centers India",
          "GCC talent strategy",
          "AI in GCCs",
          "GCC workforce transformation",
          "strategic capability centers",
          "India GCC ecosystem",
        ],
      },
    ],
  };
}

export default function GccSummit2026Page() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.talentifix.com"
  ).replace(/\/$/, "");

  return (
    <div className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(siteUrl)),
        }}
      />

      {/* 1. Hero */}
      <section className="w-full px-6 md:px-8 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
          <span className="flex items-center gap-3 text-primary font-notch font-bold text-[11px] tracking-[0.28em] uppercase">
            <span
              aria-hidden="true"
              className="w-10 h-px bg-linear-to-r from-primary to-secondary"
            />
            Industry Presence
          </span>

          <h1 className="text-[34px] sm:text-[46px] md:text-[58px] font-notch font-bold text-dark leading-[1.05] tracking-tight">
            TalentiFi-X at GCC Summit 2026
            <span className="text-secondary">.</span>
          </h1>

          <p className="text-[16px] md:text-[18px] font-semibold text-dark/70 tracking-wide">
            Delegate Experience Sponsor | Bengaluru |{" "}
            <time dateTime={EVENT_DATE}>15 July 2026</time>
          </p>

          <p className="text-dark/60 text-lg md:text-xl leading-relaxed">
            India&apos;s GCC story is moving from scale to strategic capability.
            TalentiFi-X was part of the conversations examining what comes next
            for talent, technology, leadership, ownership and innovation.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto mt-10 md:mt-14">
          <div className="rounded-[10px] overflow-hidden border border-gray-200 shadow-sm bg-white">
            <Image
              src={BANNER}
              alt="GCC Summit 2026, Bengaluru, 15 July 2026 - TalentiFi-X, Delegate Experience Sponsor. Strategic partners: Karnataka Digital Economy Mission and Government of Karnataka."
              width={1774}
              height={887}
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. What We Heard */}
      <section className="w-full bg-grey-accent px-6 md:px-8 py-16 md:py-24">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-[30px] md:text-[44px] font-notch font-bold text-dark leading-tight mb-10 md:mb-14">
            What We Heard at GCC Summit 2026
            <span className="text-secondary">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {themes.map((theme) => (
              <article
                key={theme.number}
                className="flex flex-col gap-4 bg-white rounded-[10px] border border-gray-100 border-b-6 border-b-primary shadow-sm p-8 md:p-10"
              >
                <span className="text-[40px] leading-none font-notch font-bold text-primary/25">
                  {theme.number}
                </span>
                <h3 className="text-[22px] md:text-[26px] font-notch font-bold text-dark leading-snug">
                  {theme.title}
                </h3>
                <p className="text-dark/60 text-base md:text-[17px] leading-relaxed">
                  {theme.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Conversations Beyond the Stage - renders once approved photographs are added */}
      {gccSummitGallery.length > 0 && (
        <section className="w-full px-6 md:px-8 py-16 md:py-24">
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-[30px] md:text-[44px] font-notch font-bold text-dark leading-tight mb-5">
              Conversations Beyond the Stage
              <span className="text-secondary">.</span>
            </h2>
            <p className="text-dark/60 text-lg leading-relaxed max-w-3xl mb-10 md:mb-14">
              Beyond the sessions, GCC Summit 2026 created opportunities for the
              TalentiFi-X team to exchange perspectives with leaders across
              technology, innovation, workforce transformation and the broader
              GCC ecosystem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gccSummitGallery.map((photo) => (
                <figure key={photo.src} className="flex flex-col gap-3">
                  <div className="relative w-full aspect-4/3 rounded-[10px] overflow-hidden bg-grey-accent border border-gray-100">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="text-sm text-dark/50 leading-relaxed">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. The GCC Talent Conversation Is Changing */}
      <section className="w-full px-6 md:px-8 py-16 md:py-24">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          <h2 className="text-[30px] md:text-[44px] font-notch font-bold text-dark leading-tight">
            The GCC Talent Conversation Is Changing
            <span className="text-secondary">.</span>
          </h2>

          <p className="text-dark/70 text-lg md:text-xl leading-relaxed">
            As GCCs move from execution centers to strategic capability hubs,
            the talent mandate changes with them.
          </p>
          <p className="text-dark/70 text-lg md:text-xl leading-relaxed">
            The question is no longer only how quickly organizations can hire.
            It is how they identify people with the domain depth, judgment,
            adaptability and technical capability required to build, own and
            influence.
          </p>
          <p className="text-dark/70 text-lg md:text-xl leading-relaxed">
            That is a conversation TalentiFi-X intends to remain part of.
          </p>

          <span className="mt-4 block text-[24px] md:text-[32px] font-notch font-bold text-dark">
            Human Led. AI Assisted<span className="text-secondary">.</span>
          </span>

          {/* Contextual internal links */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-gray-100 text-sm">
            <span className="font-notch font-bold uppercase tracking-[0.18em] text-dark/40 text-[11px]">
              Explore more
            </span>
            <Link
              href="/solutions"
              className="text-primary font-medium hover:underline"
            >
              Our staffing solutions
            </Link>
            <Link
              href="/about"
              className="text-primary font-medium hover:underline"
            >
              About TalentiFi-X
            </Link>
            <Link
              href="/blog"
              className="text-primary font-medium hover:underline"
            >
              Insights on AI-assisted hiring
            </Link>
            <Link
              href="/media"
              className="text-primary font-medium hover:underline"
            >
              Media &amp; industry presence
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Single CTA */}
      <section className="w-full bg-grey-accent px-6 md:px-8 py-16 md:py-20">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] md:text-[38px] font-notch font-bold text-dark leading-tight">
              Building capability, not just headcount
              <span className="text-secondary">.</span>
            </h2>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed max-w-xl">
              Talk to the TalentiFi-X team about the talent your capability
              centers need next.
            </p>
          </div>
          <Link
            href="/start-hiring"
            className="w-fit shrink-0 flex items-center gap-2 bg-[#0000FF] text-white px-8 py-4 rounded-[5px] font-bold text-sm uppercase tracking-wider hover:bg-blue transition-colors"
          >
            Hire Talent
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
