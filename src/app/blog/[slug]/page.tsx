import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { FaqSection } from "@components/blog/FaqSection";
import { TableOfContents } from "@components/blog/TableOfContents";
import { blogPosts, BlogSection } from "@data/blogData";
import {
  getSanityPostBySlug,
  getAllSanityPostSlugs,
  type SanityPostFull,
} from "@/sanity/lib/queries";

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

const toId = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ─── Metadata ────────────────────────────────────────────────────────────────

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityPost = await getSanityPostBySlug(slug).catch(() => null);
  if (sanityPost) {
    return {
      title: sanityPost.title,
      description: sanityPost.introduction?.slice(0, 160),
      openGraph: {
        title: sanityPost.title,
        description: sanityPost.introduction?.slice(0, 160) ?? undefined,
        ...(sanityPost.image ? { images: [{ url: sanityPost.image }] } : {}),
        type: "article",
      },
    };
  }
  // Fallback to static blogPosts data when Sanity is unavailable
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      title: staticPost.title,
      description: staticPost.introduction.slice(0, 160),
      openGraph: {
        title: staticPost.title,
        description: staticPost.introduction.slice(0, 160),
        type: "article",
      },
    };
  }
  return { title: "Post Not Found" };
}

export async function generateStaticParams() {
  const slugs = await getAllSanityPostSlugs().catch(() => []);
  return slugs;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BulletList({
  items,
  dotClass = "bg-primary",
}: {
  items: string[];
  dotClass?: string;
}) {
  return (
    <ul className="flex flex-col gap-2.5 ml-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 font-sans text-dark/70 text-base leading-relaxed"
        >
          <span
            className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full ${dotClass}`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function CardList({
  items,
  accent = "border-primary",
}: {
  items: { title: string; description: string }[];
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-3 mt-1">
      {items.map((card, i) => (
        <div
          key={i}
          className={`border-l-4 ${accent} bg-white rounded-r-lg pl-4 pr-5 py-3 shadow-sm`}
        >
          <p className="font-notch font-bold text-dark text-[15px] mb-1">
            {card.title}
          </p>
          <p className="font-sans text-dark/60 text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function TwoColumn({
  leftLabel,
  leftItems,
  leftDot,
  leftBg,
  leftBorder,
  rightLabel,
  rightItems,
  rightDot,
  rightBg,
  rightBorder,
}: {
  leftLabel: string;
  leftItems: string[];
  leftDot: string;
  leftBg: string;
  leftBorder: string;
  rightLabel: string;
  rightItems: string[];
  rightDot: string;
  rightBg: string;
  rightBorder: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      <div className={`${leftBg} ${leftBorder} border rounded-lg p-4`}>
        <p className="font-notch font-bold text-sm uppercase tracking-wider mb-3 text-primary">
          {leftLabel}
        </p>
        <ul className="flex flex-col gap-2">
          {leftItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-sans text-dark/70 text-sm"
            >
              <span
                className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${leftDot}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${rightBg} ${rightBorder} border rounded-lg p-4`}>
        <p className="font-notch font-bold text-sm uppercase tracking-wider mb-3 text-dark">
          {rightLabel}
        </p>
        <ul className="flex flex-col gap-2">
          {rightItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-sans text-dark/70 text-sm"
            >
              <span
                className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${rightDot}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionContent({ section }: { section: BlogSection }) {
  const hasAiHuman =
    (section.ai_roles ?? section.ai_responsibilities) &&
    (section.human_roles ?? section.human_responsibilities);

  return (
    <div className="flex flex-col gap-4">
      {section.content && (
        <p className="text-dark/70 font-sans text-base md:text-lg leading-relaxed">
          {section.content}
        </p>
      )}

      {/* Generic bullet lists */}
      {section.points && <BulletList items={section.points} />}
      {section.benefits && <BulletList items={section.benefits} />}
      {section.challenges && <BulletList items={section.challenges} />}
      {section.causes && <BulletList items={section.causes} />}
      {section.indicators && <BulletList items={section.indicators} />}
      {section.needs && <BulletList items={section.needs} />}
      {section.advantages && <BulletList items={section.advantages} />}
      {section.capabilities && <BulletList items={section.capabilities} />}
      {section.misconceptions && <BulletList items={section.misconceptions} />}
      {section.successful_partners && (
        <BulletList items={section.successful_partners} />
      )}
      {section.future_characteristics && (
        <BulletList items={section.future_characteristics} />
      )}
      {section.effects && <BulletList items={section.effects} />}
      {section.impacts && (
        <BulletList items={section.impacts} dotClass="bg-dark/40" />
      )}
      {section.risks && (
        <BulletList items={section.risks} dotClass="bg-amber-400" />
      )}
      {section.not_defined_by && (
        <BulletList items={section.not_defined_by} dotClass="bg-dark/30" />
      )}
      {section.defined_by && <BulletList items={section.defined_by} />}

      {/* Card lists */}
      {section.issues && (
        <CardList items={section.issues} accent="border-primary" />
      )}
      {section.automation_areas && (
        <CardList items={section.automation_areas} accent="border-primary" />
      )}
      {section.human_only_areas && (
        <CardList items={section.human_only_areas} accent="border-secondary" />
      )}

      {/* AI vs Human two-column */}
      {hasAiHuman && (
        <TwoColumn
          leftLabel="AI Handles"
          leftItems={(section.ai_roles ?? section.ai_responsibilities)!}
          leftDot="bg-primary"
          leftBg="bg-primary/5"
          leftBorder="border-primary/20"
          rightLabel="Humans Handle"
          rightItems={(section.human_roles ?? section.human_responsibilities)!}
          rightDot="bg-secondary"
          rightBg="bg-secondary/10"
          rightBorder="border-secondary/30"
        />
      )}

      {/* Insight callout */}
      {section.insight && (
        <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-lg px-5 py-4 mt-1">
          <p className="font-sans text-dark/80 text-base leading-relaxed italic">
            {section.insight}
          </p>
        </div>
      )}

      {/* Warning */}
      {section.warning && (
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-5 py-4">
          <p className="font-sans text-amber-900/80 text-base leading-relaxed">
            {section.warning}
          </p>
        </div>
      )}

      {/* Q&A */}
      {section.question && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg px-5 py-4 flex flex-col gap-2">
          <p className="font-notch font-bold text-primary text-base">
            {section.question}
          </p>
          {section.explanation && (
            <p className="font-sans text-dark/70 text-base">
              {section.explanation}
            </p>
          )}
        </div>
      )}

      {/* Vision */}
      {section.vision && (
        <div className="bg-dark/5 border-l-4 border-dark/20 rounded-r-lg px-5 py-4">
          <p className="font-sans text-dark/80 text-base leading-relaxed italic">
            {section.vision}
          </p>
        </div>
      )}

      {section.impact && (
        <p className="text-dark/70 font-sans text-base leading-relaxed">
          {section.impact}
        </p>
      )}
      {section.candidate_expectations && (
        <p className="text-dark/70 font-sans text-base leading-relaxed">
          {section.candidate_expectations}
        </p>
      )}
      {section.summary && (
        <p className="text-dark/70 font-sans text-base leading-relaxed">
          {section.summary}
        </p>
      )}

      {/* Key message pill */}
      {section.key_message && (
        <div className="flex justify-start mt-2">
          <span className="inline-block bg-primary text-white font-notch font-bold text-sm tracking-widest uppercase px-6 py-3 rounded-sm">
            {section.key_message}
          </span>
        </div>
      )}

      {section.conclusion && (
        <p className="text-dark/70 font-sans text-base leading-relaxed">
          {section.conclusion}
        </p>
      )}
      {section.closing && (
        <p className="text-dark font-sans text-base leading-relaxed font-semibold">
          {section.closing}
        </p>
      )}
    </div>
  );
}

// ─── Sanity post renderer ─────────────────────────────────────────────────────

function SanityPostPage({ post }: { post: SanityPostFull }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Build TOC by scanning body for h2 blocks
  type RawBlock = {
    _type: string;
    style?: string;
    children?: { text: string }[];
  };
  const bodyBlocks = (post.body ?? []) as RawBlock[];
  const tocItems = [
    ...bodyBlocks
      .filter(
        (b) => b._type === "block" && (b.style === "h2" || b.style === "h3"),
      )
      .map((b) => ({
        title: b.children?.map((c) => c.text).join("") ?? "",
        id: toId(b.children?.map((c) => c.text).join("") ?? ""),
        level: b.style === "h3" ? 2 : 1,
      })),
    ...(post.faq && post.faq.length > 0
      ? [{ title: "Frequently Asked Questions", id: "faq", level: 1 }]
      : []),
  ];

  const portableComponents: PortableTextComponents = {
    block: {
      h2: ({ value, children }) => {
        const text =
          (value as RawBlock).children?.map((c) => c.text).join("") ?? "";
        return (
          <h2
            id={toId(text)}
            className="text-[20px] md:text-[26px] font-notch font-bold text-dark mb-5 pb-3 border-b border-gray-200 scroll-mt-36 mt-12"
          >
            {children}
          </h2>
        );
      },
      h3: ({ value, children }) => {
        const text =
          (value as RawBlock).children?.map((c) => c.text).join("") ?? "";
        return (
          <h3
            id={toId(text)}
            className="text-[18px] md:text-[22px] font-notch font-bold text-dark mb-3 mt-8 scroll-mt-36"
          >
            {children}
          </h3>
        );
      },
      normal: ({ children }) => (
        <p className="text-dark/70 font-sans text-base md:text-lg leading-relaxed mb-4">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-lg px-5 py-4 my-4">
          <p className="font-sans text-dark/80 text-base leading-relaxed italic">
            {children}
          </p>
        </div>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="flex flex-col gap-2.5 ml-1 mb-4">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="flex flex-col gap-2.5 ml-4 mb-4 list-decimal">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3 font-sans text-dark/70 text-base leading-relaxed">
          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li className="font-sans text-dark/70 text-base leading-relaxed">
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-dark">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
    },
    types: {
      image: ({
        value,
      }: {
        value: { asset?: { url?: string }; alt?: string };
      }) =>
        value?.asset?.url ? (
          <div className="relative my-8 rounded-lg overflow-hidden aspect-video">
            <Image
              src={value.asset.url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        ) : null,
    },
  };

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen">
      {/* Hero image */}
      <div className="w-full h-80 md:h-115 relative overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-primary/10" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-dark/20 via-dark/10 to-[#F7F9FC]" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        {/* Back link */}
        <div className="pt-8 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-notch hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start mt-2">
          {/* Sticky TOC */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0 sticky top-8">
              <TableOfContents items={tocItems} />
            </aside>
          )}

          {/* Article */}
          <article className="flex-1 min-w-0">
            <header className="mb-10">
              <div className="flex items-center gap-4 text-dark/40 text-xs font-sans mb-4">
                <span>{date}</span>
                {post.readTime && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-dark/30 inline-block" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-[32px] md:text-[50px] font-notch font-bold text-dark leading-tight mb-5">
                {post.title}
              </h1>
              <div className="w-14 h-1 bg-primary rounded-full mb-6" />
              {post.introduction && (
                <p className="text-dark/70 font-sans text-base md:text-lg leading-relaxed">
                  {post.introduction}
                </p>
              )}
            </header>

            {/* Mobile TOC */}
            {tocItems.length > 0 && (
              <div className="lg:hidden mb-10">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Body */}
            {post.body && post.body.length > 0 && (
              <div className="flex flex-col gap-0">
                <PortableText
                  value={
                    post.body as Parameters<typeof PortableText>[0]["value"]
                  }
                  components={portableComponents}
                />
              </div>
            )}

            {/* FAQ */}
            {post.faq && post.faq.length > 0 && (
              <section id="faq" className="scroll-mt-36 mt-12">
                <h2 className="text-[20px] md:text-[26px] font-notch font-bold text-dark mb-5 pb-3 border-b border-gray-200">
                  Frequently Asked Questions
                </h2>
                <FaqSection faqs={post.faq} />
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost = await getSanityPostBySlug(slug).catch(() => null);
  if (sanityPost) return <SanityPostPage post={sanityPost} />;

  // Fall back to static data
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const tocItems = [
    ...post.sections.map((s) => ({
      title: s.heading,
      id: toId(s.heading),
      level: 1,
    })),
    { title: "Frequently Asked Questions", id: "faq", level: 1 },
  ];

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen">
      {/* ── Hero image ── */}
      <div className="w-full h-80 md:h-115 relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-dark/20 via-dark/10 to-[#F7F9FC]" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">
          <span className="inline-flex items-center gap-2 bg-primary text-white text-xs font-notch font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        {/* Back link */}
        <div className="pt-8 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-notch hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start mt-2">
          {/* ── LEFT: Sticky Table of Contents ── */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0 sticky top-8">
            <TableOfContents items={tocItems} />
          </aside>

          {/* ── RIGHT: Article ── */}
          <article className="flex-1 min-w-0">
            {/* Title + meta */}
            <header className="mb-10">
              <div className="flex items-center gap-4 text-dark/40 text-xs font-sans mb-4">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-dark/30 inline-block" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-[32px] md:text-[50px] font-notch font-bold text-dark leading-tight mb-5">
                {post.title}
              </h1>
              <div className="w-14 h-1 bg-primary rounded-full mb-6" />
              <p className="text-dark/70 font-sans text-base md:text-lg leading-relaxed">
                {post.introduction}
              </p>
            </header>

            {/* Mobile TOC (shown only on small screens) */}
            <div className="lg:hidden mb-10">
              <TableOfContents items={tocItems} />
            </div>

            {/* ── Sections ── */}
            <div className="flex flex-col gap-12">
              {post.sections.map((section) => {
                const id = toId(section.heading);
                return (
                  <section key={id} id={id} className="scroll-mt-36">
                    <h2 className="text-[20px] md:text-[26px] font-notch font-bold text-dark mb-5 pb-3 border-b border-gray-200">
                      {section.heading}
                    </h2>
                    <SectionContent section={section} />
                  </section>
                );
              })}

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-36">
                <h2 className="text-[20px] md:text-[26px] font-notch font-bold text-dark mb-5 pb-3 border-b border-gray-200">
                  Frequently Asked Questions
                </h2>
                <FaqSection faqs={post.faq} />
              </section>
            </div>

            {/* Tagline footer */}
            {post.tagline && (
              <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                <p className="font-notch font-bold text-dark/30 text-base tracking-widest uppercase">
                  {post.tagline}
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
