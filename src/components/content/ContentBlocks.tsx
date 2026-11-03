import Link from "next/link";
import { ArrowRight, Check, ChevronDown, HelpCircle, Plus, X } from "lucide-react";
import { resolveHref, visiblePageById, type ContentPage } from "@data/content";
import type { Block, Card } from "@data/content/types";
import type { PostSummary } from "@lib/contentPage";
import { RichText } from "./RichText";
import { cardIcon } from "./cardIcon";

export const cardTitle = "font-notch font-bold text-dark text-[18px] leading-snug";
export const cardText = "mt-2 text-dark/70 text-[15px] leading-relaxed";
export const bodyText = "text-dark/75 text-[17px] leading-[1.75]";

/** Small uppercase label above a list, question set or flow. */
function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-notch font-bold text-dark text-[15px] sm:text-base">{children}</p>;
}

function CardItem({ card }: { card: Card }) {
  // A card linking to a page that is not live falls back like inline links do.
  const href = card.href ? resolveHref(card.href) : null;
  const Icon = cardIcon(card.title);
  const body = (
    <>
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-primary to-secondary opacity-80" aria-hidden="true" />
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10" aria-hidden="true">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <h3 className={`${cardTitle} mt-4 ${href ? "group-hover:text-primary transition-colors" : ""}`}>{card.title}</h3>
      {card.text && (
        <p className={cardText}>
          <RichText text={card.text} />
        </p>
      )}
      {card.items && (
        <>
          {card.itemsLabel && <p className="mt-4 text-dark/60 text-[13px] font-semibold">{card.itemsLabel}</p>}
          {card.items.some((item) => item.length > 40) ? (
            <ul className="mt-2 flex flex-col gap-1.5">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] text-dark/75 leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {card.items.map((item) => (
                <li key={item} className="rounded-md bg-grey-accent px-2 py-1 text-[13px] text-dark/80">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
          Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </span>
      )}
    </>
  );
  const base =
    "relative h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all";
  return href ? (
    <Link href={href} className={`group block ${base} hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-12px_rgba(0,0,255,0.25)]`}>
      {body}
    </Link>
  ) : (
    <div className={`${base} hover:shadow-[0_12px_32px_-16px_rgba(0,0,255,0.2)]`}>{body}</div>
  );
}

/** A grid of link cards (hubs and related sections). */
export function LinkCards({
  links,
  label = "Read more",
  columns = 3,
}: {
  links: { href: string; title: string; text?: string; tag?: string }[];
  label?: string;
  columns?: 2 | 3;
}) {
  return (
    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex h-full flex-col rounded-2xl border border-gray-200/80 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-12px_rgba(0,0,255,0.25)]"
          >
            {link.tag && <span className="mb-3 w-fit rounded-full bg-primary/5 px-2.5 py-1 text-[12px] font-semibold text-primary">{link.tag}</span>}
            <span className={`${cardTitle} group-hover:text-primary transition-colors`}>{link.title}</span>
            {link.text && <span className={`${cardText} flex-1 line-clamp-3`}>{link.text}</span>}
            <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
              {label} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Past this many characters, a run of paragraphs shows its first one and folds the rest. */
const FOLD_AFTER = 600;

/**
 * Paragraphs, set in the reading column. A long run keeps its first paragraph
 * visible and folds the rest behind "Read more"; the text stays in the HTML.
 */
export function Paragraphs({ items, lead = false }: { items: string[]; lead?: boolean }) {
  const style = lead ? "text-dark/80 text-[18px] leading-[1.7]" : bodyText;
  const paragraph = (text: string) => (
    <p key={text.slice(0, 48)} className={style}>
      <RichText text={text} />
    </p>
  );
  const fold = items.length > 1 && items.join(" ").length > FOLD_AFTER;
  if (!fold) return <div className="space-y-5">{items.map(paragraph)}</div>;
  return (
    <div className="space-y-5">
      {paragraph(items[0])}
      <details className="group/more">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-primary font-semibold text-[15px] [&::-webkit-details-marker]:hidden">
          <span className="group-open/more:hidden">Read more</span>
          <span className="hidden group-open/more:inline">Show less</span>
          <ChevronDown className="h-4 w-4 transition-transform group-open/more:rotate-180" aria-hidden="true" />
        </summary>
        <div className="mt-3 space-y-5">{items.slice(1).map(paragraph)}</div>
      </details>
    </div>
  );
}

function Flow({ block, paired = false }: { block: Extract<Block, { type: "flow" }>; paired?: boolean }) {
  const plus = block.joiner === "plus";
  const Joiner = plus ? Plus : ArrowRight;
  const List = plus ? "ul" : "ol";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {paired && (
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            block.muted ? "bg-dark/5 text-dark/50" : "bg-primary text-white"
          }`}
          aria-hidden="true"
        >
          {block.muted ? <X className="h-4 w-4" strokeWidth={2.5} /> : <Check className="h-4 w-4" strokeWidth={3} />}
        </span>
      )}
      {block.label && <span className="text-dark/60 text-[15px] font-semibold">{block.label}</span>}
      <List className="flex flex-wrap items-center gap-2" aria-label={block.label ? `${block.label} ${block.items.join(", ")}` : undefined}>
        {block.items.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            {i > 0 && <Joiner className={`h-4 w-4 shrink-0 ${block.muted ? "text-dark/30" : "text-primary"}`} aria-hidden="true" />}
            <span
              className={`rounded-full px-4 py-2 text-[15px] font-semibold ${
                block.muted ? "border border-dashed border-dark/25 text-dark/55 line-through decoration-dark/25" : "bg-white text-dark shadow-[0_1px_0_rgba(0,0,255,0.08)] ring-1 ring-primary/25"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </List>
    </div>
  );
}

/** A flow panel; a flow followed by its "Not:" counterpart is drawn as one comparison. */
export function FlowPanel({ flows }: { flows: Extract<Block, { type: "flow" }>[] }) {
  const paired = flows.length > 1;
  return (
    <div className="rounded-2xl border border-primary/15 bg-linear-to-br from-primary/[0.04] via-white to-secondary/[0.06] p-5 sm:p-7">
      <div className="flex flex-col gap-5">
        {flows.map((flow) => (
          <Flow key={flow.items.join(">")} block={flow} paired={paired} />
        ))}
      </div>
    </div>
  );
}

export function ContentBlock({ block, posts }: { block: Block; posts: Record<string, PostSummary> }) {
  switch (block.type) {
    case "paragraphs":
      return <Paragraphs items={block.items} />;

    case "list": {
      const intro = block.intro && (
        <Label>
          <RichText text={block.intro} />
        </Label>
      );
      if (block.style === "chips")
        return (
          <div className="rounded-2xl bg-grey-accent/70 p-5 sm:p-7">
            {intro}
            <ul className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-dark/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      const checks = block.style === "checks";
      return (
        <div className={checks ? "rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-7" : ""}>
          {intro}
          <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 ${block.items.length > 5 ? "md:grid-cols-2" : ""}`}>
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-dark/80 text-[16px] leading-relaxed">
                {checks ? (
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                ) : (
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                )}
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "cards": {
      const short = block.items.every((card) => card.text.length < 150 && !card.items);
      const three = block.columns !== 2 && short && block.items.length >= 3;
      return (
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${three ? "lg:grid-cols-3" : ""}`}>
          {block.items.map((card) => (
            <CardItem key={card.title} card={card} />
          ))}
        </div>
      );
    }

    case "steps":
      return (
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((step, i) => (
            <li key={step.title} className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6">
              <span className="absolute -right-2 -top-4 font-notch font-bold text-[88px] leading-none text-primary/[0.06]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-notch font-bold text-sm">
                {i + 1}
              </span>
              <h3 className={`${cardTitle} relative mt-4`}>{step.title}</h3>
              <p className={`${cardText} relative`}>
                <RichText text={step.text} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "flow":
      return <FlowPanel flows={[block]} />;

    case "questions":
      return (
        <div>
          {block.intro && (
            <Label>
              <RichText text={block.intro} />
            </Label>
          )}
          <ul className={`grid grid-cols-1 gap-3 ${block.items.length > 3 ? "sm:grid-cols-2" : ""} ${block.items.length > 6 ? "lg:grid-cols-3" : ""}`}>
            {block.items.map((question) => (
              <li key={question} className="flex items-start gap-3 rounded-xl border border-gray-200/80 bg-white px-4 py-3.5 text-dark/85 text-[15px] font-medium leading-snug">
                <HelpCircle className="mt-px h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <RichText text={question} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "statement":
      return (
        <figure className="relative overflow-hidden rounded-2xl bg-dark px-6 py-9 sm:px-10 sm:py-11">
          <span className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" aria-hidden="true" />
          <span className="relative block h-1 w-12 rounded-full bg-secondary" aria-hidden="true" />
          <blockquote className="relative mt-5 max-w-3xl font-notch font-bold text-white text-[22px] sm:text-[28px] leading-snug">{block.text}</blockquote>
        </figure>
      );

    case "table":
      return (
        <figure>
          <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
              <thead className="bg-grey-accent">
                <tr>
                  {block.head.map((cell) => (
                    <th key={cell} scope="col" className="px-5 py-4 font-notch font-bold text-dark align-bottom">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200/80 align-top hover:bg-primary/[0.02]">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-5 py-4 font-semibold text-dark">
                          <RichText text={cell} />
                        </th>
                      ) : (
                        <td key={i} className="px-5 py-4 text-dark/75 leading-relaxed">
                          <RichText text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-3 text-dark/60 text-[13px]">{block.caption}</figcaption>}
        </figure>
      );

    case "callout":
      return (
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-6">
          {block.title && <p className="font-notch font-bold text-dark text-[18px]">{block.title}</p>}
          <p className={`${block.title ? "mt-2" : ""} text-dark/80 text-[16px] leading-relaxed`}>
            <RichText text={block.text} />
          </p>
        </div>
      );

    case "pageLinks": {
      const pages = block.ids.map((id) => visiblePageById(id)).filter((page): page is ContentPage => Boolean(page));
      if (!pages.length) return null;
      return <LinkCards links={pages.map((page) => ({ href: page.path, title: page.h1, text: page.summary }))} />;
    }

    case "postLinks": {
      const found = block.slugs.map((slug) => posts[slug]).filter((post): post is PostSummary => Boolean(post));
      if (!found.length) return null;
      return <LinkCards links={found.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.introduction, tag: "Article" }))} />;
    }
  }
}
