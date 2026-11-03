import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@components/seo/Breadcrumbs";
import { JsonLd } from "@components/seo/JsonLd";
import { FaqSection } from "@components/blog/FaqSection";
import { breadcrumbsFor, type ContentPage } from "@data/content";
import { contentJsonLd, relatedGroups, type PostSummary } from "@lib/contentPage";
import { ContentBlock, LinkCards } from "./ContentBlocks";
import { RichText } from "./RichText";

const COMMERCIAL = new Set<ContentPage["kind"]>(["talent", "solution", "market"]);

/** Facts the whole site already states; shown beside the hero of service pages. */
const AT_A_GLANCE = [
  "Contract, contract-to-hire, direct hire and executive search",
  "3 to 5 interview-ready candidates per role",
  "A reply within 4 business hours",
];

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Heading({ children, id, className = "" }: { children: string; id?: string; className?: string }) {
  const ends = /[.?!]$/.test(children);
  return (
    <h2 id={id} className={`scroll-mt-36 text-[28px] sm:text-[34px] lg:text-[40px] leading-tight font-notch font-bold text-dark ${className}`}>
      {children}
      {!ends && <span className="text-secondary">.</span>}
    </h2>
  );
}

function Shell({ children, tinted = false, id }: { children: React.ReactNode; tinted?: boolean; id?: string }) {
  return (
    <section id={id} className={`w-full px-6 md:px-8 py-14 lg:py-20 ${tinted ? "bg-grey-accent" : "bg-white"} scroll-mt-36`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

/**
 * Template for every content page (talent, solutions, markets, hiring
 * challenges, Hiring Intelligence). Fully server-rendered: copy, FAQs, links and
 * structured data are in the HTML that search engines and AI assistants read.
 */
export function ContentPageView({ page, posts }: { page: ContentPage; posts: Record<string, PostSummary> }) {
  const crumbs = breadcrumbsFor(page);
  const related = relatedGroups(page);
  const relatedPosts = page.relatedPosts.map((s) => posts[s]).filter((post): post is PostSummary => Boolean(post));
  const insights = [
    ...related.insights.map((link) => ({ href: link.href, title: link.label, text: link.summary })),
    ...relatedPosts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.introduction })),
  ];
  const commercial = COMMERCIAL.has(page.kind);
  const sectionIds = page.sections.map((section) => section.id ?? slug(section.heading));
  const longH1 = page.h1.length > 60;

  return (
    <div className="w-full bg-white">
      <JsonLd data={contentJsonLd(page, crumbs)} />

      {page.status === "draft" && (
        <div className="w-full bg-amber-100 px-6 py-2 text-center text-sm font-semibold text-amber-900">
          Draft for review: not published, not indexed.
        </div>
      )}

      {/* Hero */}
      <section className="w-full px-6 md:px-8 pt-4 pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={crumbs} withSchema={false} className="mb-6" />
          <div className={`grid gap-10 items-start ${commercial ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16" : ""}`}>
            <div className="max-w-4xl">
              <span className="inline-block text-primary font-notch font-bold text-xs sm:text-sm tracking-widest uppercase border border-primary/30 px-4 py-1.5 rounded-sm bg-primary/5">
                {page.eyebrow}
              </span>
              <h1
                className={`mt-5 font-notch font-bold text-dark leading-[1.1] ${
                  longH1 ? "text-[30px] sm:text-[38px] lg:text-[46px]" : "text-[34px] sm:text-[44px] lg:text-[54px]"
                }`}
              >
                {page.h1}
                {!/[.?!]$/.test(page.h1) && <span className="text-secondary">.</span>}
              </h1>
              {page.lead && <p className="mt-5 text-dark text-[20px] sm:text-[22px] font-semibold leading-snug">{page.lead}</p>}
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-dark/70 text-[17px] md:text-lg leading-relaxed">
                  <RichText text={paragraph} />
                </p>
              ))}
              {page.tagline && <p className="mt-5 font-notch font-bold text-primary text-lg">{page.tagline}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/start-hiring"
                  className="inline-flex min-h-11 items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm font-sans font-semibold hover:opacity-90 transition-opacity"
                >
                  Start hiring <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center px-6 py-3 border border-primary text-primary rounded-sm font-sans font-semibold hover:bg-primary/5 transition-colors"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
            {commercial && (
              <aside aria-label="At a glance" className="rounded-[10px] border border-gray-200 bg-grey-accent p-6">
                <p className="font-notch font-bold text-dark text-lg">At a glance</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {[page.summary, ...AT_A_GLANCE].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-dark/80 text-[15px] leading-relaxed">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-dark/60 text-[13px]">Updated {formatDate(page.updated)}</p>
              </aside>
            )}
          </div>
          {!commercial && <p className="mt-6 text-dark/60 text-[13px]">Updated {formatDate(page.updated)}</p>}
        </div>
      </section>

      {/* On this page */}
      {page.sections.length >= 5 && (
        <nav aria-label="On this page" className="w-full border-y border-gray-200 bg-white px-6 md:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <p className="font-notch font-bold text-dark text-lg">On this page</p>
            <ol className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {page.sections.map((section, i) => (
                <li key={sectionIds[i]}>
                  <a
                    href={`#${sectionIds[i]}`}
                    className="flex min-h-11 items-center text-[15px] text-dark/75 hover:text-primary transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              {page.faqs.length > 0 && (
                <li>
                  <a href="#faq" className="flex min-h-11 items-center text-[15px] text-dark/75 hover:text-primary transition-colors">
                    Frequently asked questions
                  </a>
                </li>
              )}
            </ol>
          </div>
        </nav>
      )}

      {/* Sections */}
      {page.sections.map((section, i) => (
        <Shell key={sectionIds[i]} tinted={i % 2 === 0}>
          <Heading id={sectionIds[i]}>{section.heading}</Heading>
          <div className="mt-8 flex flex-col gap-8">
            {section.blocks.map((block, j) => (
              <ContentBlock key={j} block={block} posts={posts} />
            ))}
          </div>
        </Shell>
      ))}

      {/* Sources */}
      {page.sources && page.sources.length > 0 && (
        <Shell tinted={page.sections.length % 2 === 0}>
          <h2 className="font-notch font-bold text-dark text-[22px]">Sources</h2>
          <ol className="mt-4 flex flex-col gap-2 max-w-4xl list-decimal pl-5 text-dark/75 text-[15px] leading-relaxed">
            {page.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary">
                  {source.title}
                </a>
                , {source.publisher}
                {source.date && <>, {formatDate(source.date.length === 7 ? `${source.date}-01` : source.date)}</>}
              </li>
            ))}
          </ol>
        </Shell>
      )}

      {/* Related */}
      {(related.talent.length > 0 || related.solutions.length > 0 || insights.length > 0) && (
        <Shell>
          <div className="flex flex-col gap-14">
            {related.talent.length > 0 && (
              <div>
                <Heading>Related talent areas</Heading>
                <div className="mt-8">
                  <LinkCards links={related.talent.map((link) => ({ href: link.href, title: link.label, text: link.summary }))} />
                </div>
              </div>
            )}
            {related.solutions.length > 0 && (
              <div>
                <Heading>Related hiring solutions</Heading>
                <div className="mt-8">
                  <LinkCards links={related.solutions.map((link) => ({ href: link.href, title: link.label, text: link.summary }))} />
                </div>
              </div>
            )}
            {insights.length > 0 && (
              <div>
                <Heading>Related insights</Heading>
                <div className="mt-8">
                  <LinkCards links={insights} />
                </div>
              </div>
            )}
          </div>
        </Shell>
      )}

      {/* FAQ: visible answers, mirrored in the FAQPage data */}
      {page.faqs.length > 0 && (
        <section id="faq" className="w-full bg-grey-accent px-6 md:px-8 py-14 lg:py-20 scroll-mt-36">
          <div className="max-w-4xl mx-auto">
            <Heading>Frequently asked questions</Heading>
            <div className="mt-8">
              <FaqSection faqs={page.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="w-full px-6 md:px-8 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto rounded-[10px] bg-linear-to-br from-primary to-blue px-6 py-12 md:px-12 text-center">
          <h2 className="text-[28px] sm:text-[36px] font-notch font-bold text-white leading-tight">
            {page.cta.heading}
            {!/[.?!]$/.test(page.cta.heading) && <span className="text-secondary">.</span>}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/85 text-lg leading-relaxed">{page.cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/start-hiring"
              className="inline-flex min-h-11 items-center gap-2 px-6 py-3 bg-white text-primary rounded-sm font-sans font-semibold hover:bg-white/90 transition-colors"
            >
              {page.cta.button} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex min-h-11 items-center px-6 py-3 border border-white text-white rounded-sm font-sans font-semibold hover:bg-white/10 transition-colors"
            >
              All staffing solutions
            </Link>
          </div>
          <p className="mt-6 text-white/80 text-[15px]">We reply within 4 business hours.</p>
        </div>
      </section>
    </div>
  );
}
