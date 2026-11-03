/**
 * Content model for the SEO/AEO/GEO page set: talent specialisms, solutions,
 * markets, hiring challenges and Hiring Intelligence (comparisons, guides,
 * definitions). Every page is plain data rendered by one template, so the
 * structure, structured data and internal links stay consistent.
 *
 * Copy rules, enforced by `validate.ts` at build time and by
 * `node scripts/check-content.mjs`:
 * - plain ASCII: no long dashes, curly quotes, arrows or ellipsis characters
 *   (flows are drawn by the `flow` block, not typed as arrows)
 * - the brand spelled TalentiFi-X, US spelling
 * - no statistic without an entry in `sources`
 *
 * Strings in blocks may contain inline links written as [label](/path) or
 * [label](https://...). A link to a page that is not live is shown as plain text.
 */

export type PageKind =
  | "hub"
  | "talent"
  | "solution"
  | "market"
  | "challenge"
  | "comparison"
  | "guide"
  | "definition";

export interface Card {
  title: string;
  text: string;
  /** Optional detail list, e.g. the technologies a capability covers. */
  items?: string[];
  /** Line shown above `items`, e.g. "Relevant technologies include:". */
  itemsLabel?: string;
  href?: string;
}

export interface Step {
  title: string;
  text: string;
}

export type Block =
  /** Body copy. */
  | { type: "paragraphs"; items: string[] }
  /** A list. `chips` suits long role lists, `checks` suits criteria. */
  | { type: "list"; items: string[]; intro?: string; style?: "bullets" | "checks" | "chips" }
  /** Titled cards; titles render as h3. */
  | { type: "cards"; items: Card[]; columns?: 2 | 3 }
  /** Numbered steps; titles render as h3. */
  | { type: "steps"; items: Step[] }
  /** A sequence drawn with arrows (or plus signs), e.g. Build, Test, Deploy. */
  | { type: "flow"; items: string[]; joiner?: "arrow" | "plus"; label?: string; muted?: boolean }
  /** Questions the reader should be asking, shown as a list. */
  | { type: "questions"; items: string[]; intro?: string }
  /** A short emphasized line that sums up the section. */
  | { type: "statement"; text: string }
  /** A comparison or reference table; the first column is the row label. */
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  /** A boxed note, e.g. a key takeaway. */
  | { type: "callout"; title?: string; text: string }
  /** Hub pages: cards for the listed content pages that are live. */
  | { type: "pageLinks"; ids: string[] }
  /** Hub pages: cards for published blog posts, by slug. */
  | { type: "postLinks"; slugs: string[] };

/** A photo in /public, shown with next/image. Alt text describes what it shows. */
export interface ContentImage {
  src: string;
  alt: string;
}

export interface Section {
  /** Rendered as the section's h2. */
  heading: string;
  /** Optional photo shown beside the section's opening text. */
  image?: ContentImage;
  /** Anchor id; defaults to a slug of the heading. */
  id?: string;
  blocks: Block[];
}

export interface Faq {
  question: string;
  /** Plain text, 1 to 4 sentences, answering the question in its first sentence. */
  answer: string;
}

export interface Source {
  /** Title of the cited report or article. */
  title: string;
  publisher: string;
  /** Canonical URL with tracking parameters removed. */
  url: string;
  /** Publication date as YYYY-MM-DD or YYYY-MM, when known. */
  date?: string;
}

export interface ContentPage {
  /** Stable id from `catalog.ts`; related links point at ids, not paths. */
  id: string;
  kind: PageKind;
  path: string;
  /**
   * Only `live` pages are routed, listed in sitemaps and linked in production.
   * `draft` pages render only when SHOW_DRAFT_PAGES=1 (local review, previews).
   */
  status: "live" | "draft";
  /** Short label for menus, breadcrumbs and link cards. */
  navLabel: string;
  /** One sentence for link cards and llms.txt. */
  summary: string;
  /** <title> without the brand: at most 60 characters; the brand is added when it fits. */
  title: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  primaryKeyword: string;
  /** Secondary and topic keywords the copy covers (planning aid, not emitted as a meta tag). */
  keywords: string[];
  eyebrow: string;
  h1: string;
  /** Hero subheading. */
  lead?: string;
  /** Hero paragraphs. The first answers the page's main question directly. */
  intro: string[];
  /** Brand line shown under the hero copy, e.g. "Human Led. AI Assisted." */
  tagline?: string;
  /** Optional photo beside the hero copy. */
  heroImage?: ContentImage;
  sections: Section[];
  faqs: Faq[];
  cta: { heading: string; text: string; button: string };
  /** Ids of related content pages; links appear only for live pages. */
  related: string[];
  /** Related blog posts by slug; unpublished posts are skipped. */
  relatedPosts: string[];
  /** External evidence cited in the copy. Required for any statistic. */
  sources?: Source[];
  /** Service structured data for commercial pages. */
  service?: { serviceType: string; areaServed: string[]; cities?: string[] };
  /** Definition pages: the term defined (DefinedTerm structured data). */
  term?: string;
  /** Last substantive update, YYYY-MM-DD. Shown on the page and used as dateModified. */
  updated: string;
  /** First publication, YYYY-MM-DD (articles: comparisons, guides, definitions). */
  published?: string;
}
