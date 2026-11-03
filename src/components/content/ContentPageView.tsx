import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@components/seo/Breadcrumbs";
import { JsonLd } from "@components/seo/JsonLd";
import { FaqSection } from "@components/blog/FaqSection";
import { breadcrumbsFor, type ContentPage } from "@data/content";
import type { Block, Section } from "@data/content/types";
import { contentJsonLd, relatedGroups, type PostSummary } from "@lib/contentPage";
import { ContentBlock, FlowPanel, LinkCards, Paragraphs } from "./ContentBlocks";
import { RichText } from "./RichText";

const COMMERCIAL = new Set<ContentPage["kind"]>(["talent", "solution", "market"]);

/** Facts the whole site already states; shown beside the hero of service pages. */
const AT_A_GLANCE = [
  "Contract, contract-to-hire, direct hire and executive search",
  "3 to 5 interview-ready candidates per role",
  "A reply within 4 business hours",
];

/** Longest opening the hero shows; the rest of the intro continues just below it. */
const HERO_INTRO_MAX = 260;

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const pad = (n: number) => String(n).padStart(2, "0");

/** The brand heading style: the last word in blue, ending on a blue full stop. */
function TwoTone({ text }: { text: string }) {
  const trimmed = text.trim();
  const ends = /[.?!]$/.test(trimmed);
  const cut = trimmed.lastIndexOf(" ");
  return (
    <>
      {cut > 0 ? trimmed.slice(0, cut + 1) : ""}
      <span className="text-primary">
        {cut > 0 ? trimmed.slice(cut + 1) : trimmed}
        {!ends && "."}
      </span>
    </>
  );
}

/**
 * Keeps the hero to one screen: a long first paragraph is split at a sentence
 * boundary and the remainder opens the page body, so no copy is dropped or reordered.
 */
function splitIntro(intro: string[]): { hero: string; rest: string[] } {
  const [first = "", ...others] = intro;
  if (first.length <= HERO_INTRO_MAX) return { hero: first, rest: others };
  // Split after sentence-ending punctuation (and any closing quote); every character is kept.
  const sentences = first.split(/(?<=[.!?]["')\]]?)\s+/);
  let hero = "";
  let i = 0;
  while (i < sentences.length && (hero ? hero.length + 1 : 0) + sentences[i].length <= HERO_INTRO_MAX) {
    hero = hero ? `${hero} ${sentences[i]}` : sentences[i];
    i++;
  }
  if (!hero) return { hero: first, rest: others };
  const tail = sentences.slice(i).join(" ");
  return { hero, rest: tail ? [tail, ...others] : others };
}

type FlowBlock = Extract<Block, { type: "flow" }>;

/** Pairs a flow with the "Not:" flow that follows it, so both read as one comparison. */
function groupBlocks(blocks: Block[]): (Block | { type: "flowPair"; flows: FlowBlock[] })[] {
  const out: (Block | { type: "flowPair"; flows: FlowBlock[] })[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];
    if (block.type === "flow" && !block.muted && next?.type === "flow" && next.muted) {
      out.push({ type: "flowPair", flows: [block, next] });
      i++;
    } else out.push(block);
  }
  return out;
}

function SectionView({
  section,
  index,
  id,
  tinted,
  posts,
}: {
  section: Section;
  index: number;
  id: string;
  tinted: boolean;
  posts: Record<string, PostSummary>;
}) {
  const [first, ...others] = section.blocks;
  const lead = first?.type === "paragraphs" ? first : null;
  const blocks = groupBlocks(lead ? others : section.blocks);
  return (
    <section id={id} className={`w-full px-6 md:px-8 py-16 lg:py-24 scroll-mt-36 ${tinted ? "bg-grey-accent/60" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
          <div className={lead ? "lg:col-span-5" : "lg:col-span-10"}>
            <p className="font-notch font-bold text-primary text-sm tracking-[0.2em]" aria-hidden="true">
              {pad(index + 1)}
            </p>
            <h2 className="mt-3 font-notch font-bold text-dark text-[29px] sm:text-[36px] lg:text-[40px] leading-[1.12]">
              <TwoTone text={section.heading} />
            </h2>
          </div>
          {lead && (
            <div className="lg:col-span-7 lg:pt-10">
              <Paragraphs items={lead.items} lead />
            </div>
          )}
        </div>
        {blocks.length > 0 && (
          <div className="mt-10 lg:mt-12 flex flex-col gap-10">
            {blocks.map((block, j) =>
              block.type === "flowPair" ? (
                <FlowPanel key={j} flows={block.flows} />
              ) : block.type === "paragraphs" ? (
                <div key={j} className="grid grid-cols-1 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-start-6 lg:col-span-7">
                    {j === blocks.length - 1 && block.items.length === 1 && block.items[0].length <= 140 ? (
                      // A short last line closes the section, so it gets weight.
                      <p className="border-l-4 border-secondary pl-5 font-notch font-bold text-dark text-[19px] sm:text-[21px] leading-snug">
                        <RichText text={block.items[0]} />
                      </p>
                    ) : (
                      <Paragraphs items={block.items} />
                    )}
                  </div>
                </div>
              ) : (
                <ContentBlock key={j} block={block} posts={posts} />
              ),
            )}
          </div>
        )}
      </div>
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
    ...related.insights.map((link) => ({ href: link.href, title: link.label, text: link.summary, tag: "Guide" })),
    ...relatedPosts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.introduction, tag: "Article" })),
  ];
  const commercial = COMMERCIAL.has(page.kind);
  const sectionIds = page.sections.map((section) => section.id ?? slug(section.heading));
  const { hero, rest } = splitIntro(page.intro);
  const showToc = page.sections.length >= 5;
  const h1Size =
    page.h1.length <= 40
      ? "text-[36px] sm:text-[46px] lg:text-[54px]"
      : page.h1.length <= 66
        ? "text-[32px] sm:text-[40px] lg:text-[46px]"
        : "text-[29px] sm:text-[36px] lg:text-[40px]";
  const linkLists = [
    { title: "Talent areas", links: related.talent },
    { title: "Hiring solutions", links: related.solutions },
  ].filter((list) => list.links.length > 0);

  return (
    <div className="w-full bg-white">
      <JsonLd data={contentJsonLd(page, crumbs)} />

      {page.status === "draft" && (
        <div className="w-full bg-amber-100 px-6 py-2 text-center text-sm font-semibold text-amber-900">
          Draft for review: not published, not indexed.
        </div>
      )}

      {/* Hero: sized to fit one screen on a laptop */}
      <section
        className="relative w-full overflow-hidden px-6 md:px-8 pt-3 pb-12 lg:pb-14"
        style={{
          backgroundImage:
            "radial-gradient(48rem 26rem at 88% -8%, rgba(0, 221, 226, 0.14), transparent 70%), radial-gradient(42rem 24rem at 0% 0%, rgba(0, 0, 255, 0.06), transparent 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={crumbs} withSchema={false} className="mb-3" />
          <div className={`grid grid-cols-1 gap-10 ${commercial ? "lg:grid-cols-12 lg:gap-12 lg:items-center" : ""}`}>
            <div className={commercial ? "lg:col-span-8" : "max-w-4xl"}>
              <span className="inline-block text-primary font-notch font-bold text-xs tracking-[0.18em] uppercase border border-primary/25 px-3.5 py-1.5 rounded-full bg-white/70">
                {page.eyebrow}
              </span>
              <h1 className={`mt-4 font-notch font-bold text-dark leading-[1.08] ${h1Size}`}>
                <TwoTone text={page.h1} />
              </h1>
              {page.lead && <p className="mt-4 text-dark text-[18px] sm:text-[20px] font-semibold leading-snug max-w-3xl">{page.lead}</p>}
              {hero && (
                <p className="mt-3 text-dark/70 text-[16px] sm:text-[17px] leading-relaxed max-w-3xl">
                  <RichText text={hero} />
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/start-hiring"
                  className="inline-flex min-h-11 items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm font-sans font-semibold hover:opacity-90 transition-opacity"
                >
                  Start hiring <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center px-6 py-3 border border-primary text-primary rounded-sm font-sans font-semibold bg-white/70 hover:bg-primary/5 transition-colors"
                >
                  Talk to our team
                </Link>
                {page.tagline && <span className="ml-1 font-notch font-bold text-primary text-[15px]">{page.tagline}</span>}
              </div>
              {!commercial && <p className="mt-5 text-dark/55 text-[13px]">Updated {formatDate(page.updated)}</p>}
            </div>
            {commercial && (
              <aside
                aria-label="At a glance"
                className="relative lg:col-span-4 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,255,0.35)]"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary to-secondary" aria-hidden="true" />
                <p className="font-notch font-bold text-dark text-[17px]">At a glance</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {[page.summary, ...AT_A_GLANCE].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-dark/80 text-[14px] leading-relaxed">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-gray-100 pt-4 text-dark/55 text-[12px]">Updated {formatDate(page.updated)}</p>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* The rest of the introduction, beside the page contents */}
      {(rest.length > 0 || showToc) && (
        <section className="w-full border-y border-gray-100 bg-white px-6 md:px-8 py-14 lg:py-16">
          <div className={`max-w-6xl mx-auto grid grid-cols-1 gap-10 ${rest.length > 0 && showToc ? "lg:grid-cols-12 lg:gap-14" : ""}`}>
            {rest.length > 0 && (
              <div className={showToc ? "lg:col-span-7" : "max-w-3xl"}>
                <span className="block h-1 w-12 rounded-full bg-secondary" aria-hidden="true" />
                <div className="mt-6 space-y-5">
                  {rest.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-dark/80 text-[18px] sm:text-[19px] leading-[1.7]">
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            )}
            {showToc && (
              <nav aria-label="On this page" className={rest.length > 0 ? "lg:col-span-5" : ""}>
                {/* Collapsed on phones, where the full list would fill the screen; always open on desktop. */}
                <details className="group/toc rounded-2xl border border-gray-200/80 bg-grey-accent/50 p-6 lg:hidden">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-notch font-bold text-dark text-[17px]">
                    On this page
                    <span className="text-primary text-sm font-sans font-semibold group-open/toc:hidden">{page.sections.length} sections</span>
                    <span className="hidden text-primary text-sm font-sans font-semibold group-open/toc:inline">Close</span>
                  </summary>
                  <ol className="mt-3 grid grid-cols-1">
                    {page.sections.map((section, i) => (
                      <li key={sectionIds[i]}>
                        <a href={`#${sectionIds[i]}`} className="flex min-h-11 items-baseline gap-3 py-1.5 text-[15px] text-dark/75 hover:text-primary">
                          <span className="font-notch font-bold text-primary/50 text-xs tracking-widest">{pad(i + 1)}</span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
                <div className="hidden rounded-2xl border border-gray-200/80 bg-grey-accent/50 p-6 lg:block">
                  <p className="font-notch font-bold text-dark text-[17px]">On this page</p>
                  <ol className={`mt-3 grid grid-cols-1 ${rest.length > 0 ? "" : "sm:grid-cols-2 lg:grid-cols-3 gap-x-8"}`}>
                    {page.sections.map((section, i) => (
                      <li key={sectionIds[i]}>
                        <a
                          href={`#${sectionIds[i]}`}
                          className="group flex min-h-10 items-baseline gap-3 py-1.5 text-[15px] text-dark/75 hover:text-primary transition-colors"
                        >
                          <span className="font-notch font-bold text-primary/50 text-xs tracking-widest group-hover:text-primary">{pad(i + 1)}</span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    ))}
                    {page.faqs.length > 0 && (
                      <li>
                        <a href="#faq" className="group flex min-h-10 items-baseline gap-3 py-1.5 text-[15px] text-dark/75 hover:text-primary transition-colors">
                          <span className="font-notch font-bold text-primary/50 text-xs tracking-widest group-hover:text-primary">FAQ</span>
                          <span>Frequently asked questions</span>
                        </a>
                      </li>
                    )}
                  </ol>
                </div>
              </nav>
            )}
          </div>
        </section>
      )}

      {/* Sections */}
      {page.sections.map((section, i) => (
        <SectionView key={sectionIds[i]} section={section} index={i} id={sectionIds[i]} tinted={i % 2 === 0} posts={posts} />
      ))}

      {/* Sources */}
      {page.sources && page.sources.length > 0 && (
        <section className="w-full bg-white px-6 md:px-8 py-12 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-notch font-bold text-dark text-[20px]">Sources</h2>
            <ol className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2 list-decimal pl-5 text-dark/70 text-[14px] leading-relaxed">
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
          </div>
        </section>
      )}

      {/* Keep exploring: related talent, solutions and reading */}
      {(linkLists.length > 0 || insights.length > 0) && (
        <section className="w-full bg-grey-accent/60 px-6 md:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-notch font-bold text-dark text-[29px] sm:text-[36px] lg:text-[40px] leading-[1.12]">
              <TwoTone text="Keep exploring" />
            </h2>
            <div className={`mt-10 grid grid-cols-1 gap-10 ${linkLists.length > 0 && insights.length > 0 ? "lg:grid-cols-12 lg:gap-12" : ""}`}>
              {linkLists.length > 0 && (
                <div className={`grid grid-cols-1 content-start gap-8 ${insights.length > 0 ? "lg:col-span-4" : "sm:grid-cols-2"}`}>
                  {linkLists.map((list) => (
                    <div key={list.title}>
                      <h3 className="font-notch font-bold text-dark text-[17px]">{list.title}</h3>
                      <ul className="mt-3 divide-y divide-gray-200/80 rounded-2xl border border-gray-200/80 bg-white">
                        {list.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex min-h-12 items-center justify-between gap-3 px-5 py-3 text-[15px] font-medium text-dark/85 hover:text-primary transition-colors"
                            >
                              {link.label}
                              <ArrowUpRight className="h-4 w-4 shrink-0 text-dark/30 group-hover:text-primary transition-colors" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {insights.length > 0 && (
                <div className={linkLists.length > 0 ? "lg:col-span-8" : ""}>
                  <h3 className="font-notch font-bold text-dark text-[17px]">Related insights</h3>
                  <div className="mt-3">
                    <LinkCards links={insights} columns={linkLists.length > 0 ? 2 : 3} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ: visible answers, mirrored in the FAQPage data */}
      {page.faqs.length > 0 && (
        <section id="faq" className="w-full bg-white px-6 md:px-8 py-16 lg:py-24 scroll-mt-36">
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 className="font-notch font-bold text-dark text-[29px] sm:text-[36px] lg:text-[40px] leading-[1.12]">
                <TwoTone text="Frequently asked questions" />
              </h2>
              <p className="mt-4 text-dark/70 text-[16px] leading-relaxed">Have a question that is not answered here?</p>
              <Link href="/contact" className="mt-3 inline-flex min-h-11 items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Talk to our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <FaqSection faqs={page.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="w-full px-6 md:px-8 pb-16 lg:pb-24">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-linear-to-br from-primary to-blue px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <span className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-notch font-bold text-white text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.12]">
                {page.cta.heading}
                {!/[.?!]$/.test(page.cta.heading) && <span className="text-secondary">.</span>}
              </h2>
              <p className="mt-4 max-w-2xl text-white/85 text-[17px] leading-relaxed">{page.cta.text}</p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start gap-3 lg:items-end">
              <Link
                href="/start-hiring"
                className="inline-flex min-h-12 items-center gap-2 px-6 py-3 bg-white text-primary rounded-sm font-sans font-semibold hover:bg-white/90 transition-colors"
              >
                {page.cta.button} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/solutions" className="inline-flex min-h-11 items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
                All staffing solutions <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <p className="text-white/75 text-[14px]">We reply within 4 business hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
