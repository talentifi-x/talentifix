import { CATALOG, STATIC_ROUTES } from "./catalog";
import type { Block, ContentPage } from "./types";

/**
 * Checks the copy rules in `types.ts` plus SEO limits and link integrity.
 * Errors fail the build; warnings point at copy worth a second look.
 *
 * Self-contained (relative imports only) so `scripts/check-content.mjs` can run
 * it without Next.js.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 155;

const DATE = /^\d{4}-\d{2}(-\d{2})?$/;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BRAND = /talentifi[\s-]?x|talentify/gi;

/** British forms the site does not use (it is written in US English). */
const UK_SPELLING =
  /\b(organis(e|es|ed|ing|ation|ations|ational)|recognis\w*|specialis(e|es|ed|ing|ation|ations|m|ms)|prioritis\w*|optimis\w*|modernis\w*|standardis\w*|analys(e|ed|ing)|behaviour\w*|colour\w*|favour\w*|centres?|programmes?|modelling|labelling|travell(ed|ing)|licence|defence|catalogue|judgement|utilis\w*|visualis\w*|emphasis(e|es|ed|ing)|containeris\w*|authoris\w*|stabilis\w*|minimis\w*|maximis\w*|categoris\w*|summaris\w*|customis\w*|digitalis\w*|centralis\w*|globalis\w*|realis(e|es|ed|ing)|capitalis\w*|anonymis\w*|practis(e|es|ed|ing)|enrolment|fulfilment)\b/i;

/** Leaked drafting notes and tracking residue: never publishable. */
const LEAKS = [
  "as an ai",
  "i actually prefer",
  "exactly what i don't want",
  "utm_",
  "chatgpt",
  "lorem ipsum",
  "todo",
  "tbd",
  "[insert",
  "{{",
];

/** Phrases that make copy read as machine-written. */
const TELLS = [
  "delve",
  "fast-paced",
  "ever-evolving",
  "game-changer",
  "game changer",
  "unlock",
  "seamless",
  "navigate the complexities",
  "tapestry",
  "elevate",
  "look no further",
  "in conclusion",
  "it is important to note",
  "it's important to note",
  "furthermore",
  "moreover",
  "robust",
  "cutting-edge",
  "world-class",
  "best-in-class",
  "synergy",
  "supercharge",
  "harness the power",
  "embark",
];

/** A figure that needs a cited source. */
const STATISTIC = /\b\d[\d,.]*\s?(%|percent|per cent|million|billion|lakh|crore)|\b\d+(\.\d+)?x (faster|more|higher|lower)\b/i;

const MIN_WORDS: Record<ContentPage["kind"], number> = {
  hub: 120,
  definition: 600,
  talent: 1000,
  solution: 1000,
  market: 1000,
  challenge: 1000,
  comparison: 1000,
  guide: 1000,
};

type Field = { where: string; text: string; links: boolean };

function blockStrings(block: Block): string[] {
  switch (block.type) {
    case "paragraphs":
      return block.items;
    case "list":
    case "questions":
      return [...(block.intro ? [block.intro] : []), ...block.items];
    case "cards":
      return block.items.flatMap((card) => [card.title, card.text, card.itemsLabel ?? "", ...(card.items ?? [])]);
    case "steps":
      return block.items.flatMap((step) => [step.title, step.text]);
    case "flow":
      return [block.label ?? "", ...block.items];
    case "statement":
      return [block.text];
    case "table":
      return [block.caption ?? "", ...block.head, ...block.rows.flat()];
    case "callout":
      return [block.title ?? "", block.text];
    case "pageLinks":
    case "postLinks":
      return [];
  }
}

function fields(page: ContentPage): Field[] {
  const plain = (where: string, text: string | undefined): Field[] =>
    text ? [{ where, text, links: false }] : [];
  return [
    ...plain("navLabel", page.navLabel),
    ...plain("summary", page.summary),
    ...plain("title", page.title),
    ...plain("description", page.description),
    ...plain("eyebrow", page.eyebrow),
    ...plain("h1", page.h1),
    ...plain("lead", page.lead),
    ...page.intro.map((text, i) => ({ where: `intro[${i}]`, text, links: true })),
    ...plain("tagline", page.tagline),
    ...page.sections.flatMap((section) => [
      { where: `section "${section.heading}"`, text: section.heading, links: false },
      ...section.blocks.flatMap((block) =>
        blockStrings(block)
          .filter(Boolean)
          .map((text) => ({ where: `section "${section.heading}" (${block.type})`, text, links: true })),
      ),
    ]),
    ...page.faqs.flatMap((faq, i) => [
      { where: `faq[${i}] question`, text: faq.question, links: false },
      { where: `faq[${i}] answer`, text: faq.answer, links: false },
    ]),
    ...plain("cta.heading", page.cta.heading),
    ...plain("cta.text", page.cta.text),
    ...plain("cta.button", page.cta.button),
  ];
}

/** Visible words on the page, links reduced to their labels. */
export function pageText(page: ContentPage): string {
  return fields(page)
    .filter((field) => !["navLabel", "summary", "title", "description"].includes(field.where))
    .map((field) => field.text.replace(LINK, "$1"))
    .join(" ");
}

const words = (text: string) => text.split(/\s+/).filter(Boolean);

function shingles(text: string, size = 5): Set<string> {
  const tokens = words(text.toLowerCase().replace(/[^a-z0-9\s]/g, " "));
  const set = new Set<string>();
  for (let i = 0; i + size <= tokens.length; i++) set.add(tokens.slice(i, i + size).join(" "));
  return set;
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => words(s).length >= 9);
}

export function validateContentPages(pages: ContentPage[]): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const catalog = new Map(CATALOG.map((entry) => [entry.id, entry]));
  const catalogPaths = new Set(CATALOG.map((entry) => entry.path));

  const seen = { id: new Map<string, string>(), title: new Map<string, string>(), description: new Map<string, string>(), h1: new Map<string, string>() };
  const unique = (kind: keyof typeof seen, value: string, id: string) => {
    const key = value.trim().toLowerCase();
    const other = seen[kind].get(key);
    if (other) errors.push(`${id}: ${kind} duplicates ${other}`);
    else seen[kind].set(key, id);
  };

  for (const page of pages) {
    const err = (message: string) => errors.push(`${page.id}: ${message}`);
    const warn = (message: string) => warnings.push(`${page.id}: ${message}`);

    unique("id", page.id, page.id);
    unique("title", page.title, page.id);
    unique("description", page.description, page.id);
    unique("h1", page.h1, page.id);

    const entry = catalog.get(page.id);
    if (!entry) err("id is not in catalog.ts");
    else {
      if (entry.path !== page.path) err(`path ${page.path} should be ${entry.path}`);
      if (entry.kind !== page.kind) err(`kind ${page.kind} should be ${entry.kind}`);
      if (entry.navLabel !== page.navLabel) err(`navLabel "${page.navLabel}" should be "${entry.navLabel}"`);
    }

    if (page.title.length > TITLE_MAX) err(`title is ${page.title.length} chars (max ${TITLE_MAX}): "${page.title}"`);
    if (page.description.length < DESCRIPTION_MIN || page.description.length > DESCRIPTION_MAX)
      err(`description is ${page.description.length} chars (${DESCRIPTION_MIN}-${DESCRIPTION_MAX}): "${page.description}"`);
    if (page.summary.length > 200) err(`summary is ${page.summary.length} chars (max 200)`);
    if (page.h1.length > 90) err(`h1 is ${page.h1.length} chars (max 90)`);
    if (!DATE.test(page.updated)) err(`updated "${page.updated}" is not YYYY-MM-DD`);
    if (page.published && !DATE.test(page.published)) err(`published "${page.published}" is not YYYY-MM-DD`);
    if (["talent", "solution", "market"].includes(page.kind) && !page.service) err("commercial page needs `service`");
    if (page.kind === "definition" && !page.term) err("definition page needs `term`");
    if (page.kind !== "hub" && page.sections.length < 3) err(`only ${page.sections.length} sections`);
    if (page.kind !== "hub" && page.intro.length === 0) err("intro is empty");

    const faqRange = page.kind === "hub" ? [0, 8] : [4, 12];
    if (page.faqs.length < faqRange[0] || page.faqs.length > faqRange[1])
      err(`${page.faqs.length} FAQs (expected ${faqRange[0]}-${faqRange[1]})`);
    for (const faq of page.faqs) {
      if (!faq.question.trim().endsWith("?")) err(`FAQ is not a question: "${faq.question}"`);
      if (words(faq.answer).length > 120) warn(`long FAQ answer (${words(faq.answer).length} words): "${faq.question}"`);
    }

    const headings = new Set<string>();
    for (const section of page.sections) {
      const key = section.heading.toLowerCase();
      if (headings.has(key)) err(`repeated section heading "${section.heading}"`);
      headings.add(key);
      if (section.blocks.length === 0) err(`section "${section.heading}" has no blocks`);
      for (const block of section.blocks) {
        if (block.type === "table") {
          block.rows.forEach((row, i) => {
            if (row.length !== block.head.length) err(`table in "${section.heading}": row ${i + 1} has ${row.length} cells, head has ${block.head.length}`);
          });
        }
        if (block.type === "pageLinks")
          block.ids.forEach((id) => catalog.has(id) || err(`pageLinks id "${id}" is not in catalog.ts`));
      }
    }

    for (const id of page.related) {
      if (id === page.id) err("related lists the page itself");
      else if (!catalog.has(id)) err(`related id "${id}" is not in catalog.ts`);
    }
    if (new Set(page.related).size !== page.related.length) err("related has duplicates");

    let statistics = 0;
    for (const field of fields(page)) {
      const { text, where } = field;
      // eslint-disable-next-line no-control-regex
      const nonAscii = text.match(/[^\x00-\x7F]/g);
      if (nonAscii) err(`${where}: non-ASCII characters ${JSON.stringify([...new Set(nonAscii)].join(""))} in "${text.slice(0, 80)}"`);
      if (/\S - \S/.test(text) || / -- /.test(text)) err(`${where}: spaced hyphen used as a dash in "${text.slice(0, 80)}"`);
      for (const match of text.match(BRAND) ?? []) if (match !== "TalentiFi-X") err(`${where}: brand written "${match}"`);
      const uk = text.match(UK_SPELLING);
      if (uk) err(`${where}: British spelling "${uk[0]}"`);
      const lower = text.toLowerCase();
      for (const leak of LEAKS) if (lower.includes(leak)) err(`${where}: "${leak}" must not be published`);
      for (const tell of TELLS) if (new RegExp(`\\b${tell}`, "i").test(text)) warn(`${where}: "${tell}" reads as boilerplate`);
      if (STATISTIC.test(text.replace(LINK, "$1"))) statistics++;

      for (const [, label, href] of text.matchAll(LINK)) {
        if (!field.links) err(`${where}: links are not allowed here ("${label}")`);
        else if (href.startsWith("http://")) err(`${where}: insecure link ${href}`);
        else if (href.startsWith("https://")) {
          if (/[?&](utm_|trk=|ref=)/.test(href)) err(`${where}: tracking parameters in ${href}`);
        } else if (!(catalogPaths.has(href) || STATIC_ROUTES.includes(href) || /^\/blog\/[a-z0-9-]+$/.test(href)))
          err(`${where}: unknown internal link ${href}`);
      }
    }
    if (statistics > 0 && !page.sources?.length) err(`${statistics} statistic(s) in the copy but no sources`);
    for (const source of page.sources ?? []) {
      if (!source.url.startsWith("https://")) err(`source "${source.title}" needs an https URL`);
      if (/[?&](utm_|trk=)/.test(source.url)) err(`source "${source.title}" has tracking parameters`);
      if (source.date && !DATE.test(source.date)) err(`source "${source.title}" date "${source.date}" is not YYYY-MM-DD`);
    }

    const count = words(pageText(page)).length;
    if (count < MIN_WORDS[page.kind]) warn(`${count} words (aim for ${MIN_WORDS[page.kind]}+)`);
  }

  // Boilerplate across pages: identical sentences and heavy n-gram overlap.
  const bodies = pages.filter((page) => page.kind !== "hub").map((page) => ({ page, text: pageText(page) }));
  const owners = new Map<string, Set<string>>();
  for (const { page, text } of bodies)
    for (const sentence of sentences(text)) {
      const key = sentence.toLowerCase();
      owners.set(key, (owners.get(key) ?? new Set()).add(page.id));
    }
  for (const [sentence, ids] of owners)
    if (ids.size >= 3) warnings.push(`same sentence on ${ids.size} pages (${[...ids].join(", ")}): "${sentence.slice(0, 100)}"`);

  const sets = bodies.map(({ page, text }) => ({ id: page.id, set: shingles(text) }));
  for (let i = 0; i < sets.length; i++)
    for (let j = i + 1; j < sets.length; j++) {
      const a = sets[i].set;
      const b = sets[j].set;
      let shared = 0;
      for (const gram of a) if (b.has(gram)) shared++;
      const jaccard = shared / (a.size + b.size - shared || 1);
      if (jaccard > 0.08) warnings.push(`${sets[i].id} and ${sets[j].id} share ${(jaccard * 100).toFixed(0)}% of their phrasing`);
    }

  return { errors, warnings };
}
