import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Plus } from "lucide-react";
import { visiblePageById, type ContentPage } from "@data/content";
import type { Block, Card } from "@data/content/types";
import type { PostSummary } from "@lib/contentPage";
import { RichText } from "./RichText";

export const cardTitle = "font-notch font-bold text-dark text-[17px] leading-snug";
export const cardText = "mt-2 text-dark/70 text-[15px] leading-relaxed";
const bodyText = "text-dark/75 text-[17px] leading-relaxed";

function CardItem({ card }: { card: Card }) {
  const body = (
    <>
      <h3 className={`${cardTitle} ${card.href ? "group-hover:text-primary transition-colors" : ""}`}>{card.title}</h3>
      {card.text && (
        <p className={cardText}>
          <RichText text={card.text} />
        </p>
      )}
      {card.items && (
        <>
          {card.itemsLabel && <p className="mt-3 text-dark/60 text-[13px] font-semibold">{card.itemsLabel}</p>}
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {card.items.map((item) => (
              <li key={item} className="rounded bg-grey-accent px-2 py-1 text-[13px] text-dark/80">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
  const base = "h-full rounded-[10px] border border-gray-200 bg-white p-5";
  return card.href ? (
    <Link href={card.href} className={`group block ${base} hover:border-primary/50 hover:shadow-sm transition-all`}>
      {body}
    </Link>
  ) : (
    <div className={base}>{body}</div>
  );
}

/** A grid of link cards (hubs and related sections). */
export function LinkCards({ links }: { links: { href: string; title: string; text?: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex h-full flex-col rounded-[10px] border border-gray-200 bg-white p-5 hover:border-primary/50 hover:shadow-sm transition-all"
          >
            <span className={`${cardTitle} group-hover:text-primary transition-colors`}>{link.title}</span>
            {link.text && <span className={`${cardText} flex-1 line-clamp-3`}>{link.text}</span>}
            <span className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
              Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ContentBlock({ block, posts }: { block: Block; posts: Record<string, PostSummary> }) {
  switch (block.type) {
    case "paragraphs":
      return (
        <div className="max-w-3xl space-y-4">
          {block.items.map((text) => (
            <p key={text.slice(0, 48)} className={bodyText}>
              <RichText text={text} />
            </p>
          ))}
        </div>
      );

    case "list": {
      const intro = block.intro && (
        <p className={`${bodyText} max-w-3xl mb-4`}>
          <RichText text={block.intro} />
        </p>
      );
      if (block.style === "chips")
        return (
          <div>
            {intro}
            <ul className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <li key={item} className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-dark/85">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      return (
        <div>
          {intro}
          <ul className={`grid gap-3 max-w-4xl ${block.items.length > 5 ? "md:grid-cols-2 md:gap-x-8" : ""}`}>
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-dark/80 text-[16px] leading-relaxed">
                {block.style === "checks" ? (
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
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

    case "cards":
      return (
        <div className={`grid gap-4 sm:grid-cols-2 ${block.columns === 2 ? "" : "lg:grid-cols-3"}`}>
          {block.items.map((card) => (
            <CardItem key={card.title} card={card} />
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((step, i) => (
            <li key={step.title} className="rounded-[10px] border border-gray-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-notch font-bold text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`${cardTitle} mt-4`}>{step.title}</h3>
              <p className={cardText}>
                <RichText text={step.text} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "flow": {
      const Joiner = block.joiner === "plus" ? Plus : ArrowRight;
      const List = block.joiner === "plus" ? "ul" : "ol";
      return (
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${block.muted ? "opacity-70" : ""}`}>
          {block.label && <span className="text-dark/60 text-[15px] font-semibold">{block.label}</span>}
          <List className="flex flex-wrap items-center gap-2" aria-label={block.label ? `${block.label} ${block.items.join(", ")}` : undefined}>
            {block.items.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                {i > 0 && <Joiner className={`h-4 w-4 shrink-0 ${block.muted ? "text-dark/40" : "text-primary"}`} aria-hidden="true" />}
                <span
                  className={`rounded-full px-4 py-2 text-[15px] font-semibold ${
                    block.muted ? "border border-dashed border-dark/30 text-dark/60" : "border border-primary/30 bg-primary/5 text-dark"
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

    case "questions":
      return (
        <div>
          {block.intro && (
            <p className={`${bodyText} max-w-3xl mb-4`}>
              <RichText text={block.intro} />
            </p>
          )}
          <ul className={`grid gap-3 max-w-4xl ${block.items.length > 4 ? "sm:grid-cols-2 sm:gap-x-6" : ""}`}>
            {block.items.map((question) => (
              <li key={question} className="flex items-start gap-3 text-dark/85 text-[16px] font-medium leading-relaxed">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
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
        <p className="max-w-3xl border-l-4 border-primary pl-5 font-notch font-bold text-dark text-[21px] sm:text-[24px] leading-snug">
          {block.text}
        </p>
      );

    case "table":
      return (
        <figure className="max-w-5xl">
          <div className="overflow-x-auto rounded-[10px] border border-gray-200 bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
              <thead className="bg-grey-accent">
                <tr>
                  {block.head.map((cell) => (
                    <th key={cell} scope="col" className="px-4 py-3 font-notch font-bold text-dark align-bottom">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200 align-top">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 font-semibold text-dark">
                          <RichText text={cell} />
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-3 text-dark/75 leading-relaxed">
                          <RichText text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-2 text-dark/60 text-[13px]">{block.caption}</figcaption>}
        </figure>
      );

    case "callout":
      return (
        <div className="max-w-3xl rounded-[10px] border border-primary/20 bg-primary/5 p-5">
          {block.title && <p className="font-notch font-bold text-dark text-[17px]">{block.title}</p>}
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
      return <LinkCards links={found.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.introduction }))} />;
    }
  }
}
