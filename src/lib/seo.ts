import type { Metadata } from "next";

/**
 * Shared SEO primitives: canonical origin, title/description builders and
 * the structured-data nodes that describe the brand.
 *
 * Every canonical URL, sitemap entry and JSON-LD `@id` on the site derives from
 * `SITE_URL`, so they cannot drift apart.
 */

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.talentifix.com";

/**
 * Canonical origin.
 *
 * `talentifix.com` 301s to `www.talentifix.com`, so a configured value pointing at
 * the bare host is normalised to www. Any other host - a Vercel preview URL, for
 * example - passes through untouched so preview builds still self-reference correctly.
 */
export const SITE_URL = RAW_SITE_URL.replace(
  /^https?:\/\/(?:www\.)?talentifix\.com/i,
  "https://www.talentifix.com",
).replace(/\/$/, "");

export const SITE_NAME = "TalentiFi-X";
export const BRAND_SUFFIX = ` | ${SITE_NAME}`;

/** Google truncates titles past roughly this width in search results. */
export const MAX_TITLE_LENGTH = 60;
/** Bing flags titles over 70 characters. Below this, a headline is kept whole rather than clipped. */
export const MAX_TITLE_HARD_LENGTH = 70;
export const MAX_DESCRIPTION_LENGTH = 155;

/** Stable identity for the Organization entity, shared by every page that emits it. */
export const ORG_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;

export const absoluteUrl = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Words that make a clipped title or description read as unfinished ("…About Hiring And"). */
const DANGLING_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "how", "in", "into",
  "of", "on", "or", "the", "to", "what", "why", "with", "&",
]);

/**
 * Trim to `limit`, preferring a word boundary over cutting mid-word.
 *
 * Whitespace (including CMS line breaks) is collapsed first, and trailing
 * connector words are dropped so the cut reads as a finished phrase.
 */
export function truncateAtWord(value: string, limit: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");
  const cut = lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  const words = cut.replace(/[\s,;:.\-–—(]+$/, "").split(" ");
  while (
    words.length > 1 &&
    DANGLING_WORDS.has(words[words.length - 1].toLowerCase().replace(/^[("“‘']+/, ""))
  ) {
    words.pop();
  }
  return words.join(" ").replace(/[\s,;:.\-–—(]+$/, "");
}

/** The longest leading clause (35+ characters) that ends at a natural break: a colon, dash, bracket, comma or sentence end. */
function headlineBeforeBreak(text: string): string | null {
  let best: string | null = null;
  for (const match of text.matchAll(/(: | — | – | - | \(|\? |\. |, )/g)) {
    const keepMark = match[0][0] === "?";
    const head = text
      .slice(0, (match.index ?? 0) + (keepMark ? 1 : 0))
      .replace(/[\s,;:\-–—(]+$/, "");
    if (head.length >= 35 && head.length <= MAX_TITLE_HARD_LENGTH) best = head;
  }
  return best;
}

/**
 * Trim to `limit`, ending on a full sentence when one finishes late enough,
 * otherwise on a word boundary with an ellipsis.
 */
export function truncateAtSentence(value: string, limit: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit + 1);
  const end = Math.max(
    clipped.lastIndexOf(". "),
    clipped.lastIndexOf("! "),
    clipped.lastIndexOf("? "),
  );
  // A sentence that ends too early leaves a description Bing flags as too short.
  if (end >= limit * 0.75) return clipped.slice(0, end + 1);
  return `${truncateAtWord(text, limit - 1)}…`;
}

/**
 * Build a `<title>` that fits the SERP.
 *
 * The brand suffix is appended only when the result still fits inside
 * `MAX_TITLE_LENGTH`; on long editorial titles the headline itself is worth more
 * than a truncated brand name. Returns an `absolute` title so the root layout's
 * `%s | TalentiFi-X` template does not append the brand a second time.
 */
export function buildTitle(
  preferred: string | null | undefined,
  fallback: string,
): { absolute: string } {
  const base = (preferred?.trim() || fallback).replace(/\s+/g, " ").trim();
  if (base.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH) {
    return { absolute: `${base}${BRAND_SUFFIX}` };
  }
  // A whole headline that search engines may shorten beats one we clip mid-phrase.
  if (base.length <= MAX_TITLE_HARD_LENGTH) return { absolute: base };
  const head = headlineBeforeBreak(base);
  if (head) {
    return {
      absolute:
        head.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH ? `${head}${BRAND_SUFFIX}` : head,
    };
  }
  return { absolute: truncateAtWord(base, MAX_TITLE_LENGTH) };
}

/** The default share image (1200x630), drawn in code by app/opengraph-image.tsx. */
export const DEFAULT_SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "TalentiFi-X: human-led, AI-assisted staffing for AI, ML, cybersecurity and GCC teams",
};

type ShareImage = { url: string; width?: number; height?: number; alt?: string };

/**
 * Complete metadata for one page: title, description, canonical and the share
 * tags that WhatsApp, LinkedIn and X read (og:* and twitter:*).
 *
 * In Next.js a page that sets `openGraph` replaces the layout's openGraph object
 * rather than merging with it, so pages that set only part of it lost the site
 * name, URL or image. Every page goes through this helper so the set is always whole.
 */
export function pageMetadata(opts: {
  title: string | { absolute: string };
  description?: string;
  path: string;
  image?: ShareImage;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const shareTitle =
    typeof opts.title === "string" ? `${opts.title}${BRAND_SUFFIX}` : opts.title.absolute;
  const images = [opts.image ?? DEFAULT_SHARE_IMAGE];
  const shared = {
    title: shareTitle,
    description: opts.description,
    url: opts.path,
    siteName: SITE_NAME,
    locale: "en_IN",
    images,
  };
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph:
      opts.type === "article"
        ? {
            ...shared,
            type: "article",
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
            authors: opts.authors,
          }
        : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      site: "@talentifi_x",
      title: shareTitle,
      description: opts.description,
      images,
    },
  };
}

/** Prefer an editor-authored description, else trim the fallback to a sane width. */
export function buildDescription(
  preferred: string | null | undefined,
  fallback: string | null | undefined,
): string | undefined {
  const base = (preferred?.trim() || fallback?.trim()) ?? "";
  if (!base) return undefined;
  return truncateAtSentence(base, MAX_DESCRIPTION_LENGTH);
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

/**
 * `alternateName` lists the spellings people actually search for. The brand is
 * routinely confused with the unrelated "Talentify", so the variants we do own
 * are declared explicitly.
 */
export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: ["TalentiFiX", "Talentifix", "TalentiFi X", "Talentifi-X"],
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logos/logo.png`,
  },
  description:
    "TalentiFi-X delivers AI-assisted, human-led staffing for AI, ML and cybersecurity teams across India.",
  sameAs: [
    "https://www.linkedin.com/company/TalentiFi-X/",
    "https://x.com/talentifi_x",
    "https://www.instagram.com/talentifi_x",
  ],
} as const;

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
} as const;

/** Wrap nodes in a `@graph` document ready to serialise into a script tag. */
export function jsonLdGraph(...nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* ------------------------------------------------------------------ */
/* JobPosting helpers                                                  */
/* ------------------------------------------------------------------ */

/** Map free-text employment type onto schema.org's controlled vocabulary. */
export function toEmploymentTypes(value?: string): string[] | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase();
  const types: string[] = [];
  if (/full[\s_-]?time/.test(v)) types.push("FULL_TIME");
  if (/part[\s_-]?time/.test(v)) types.push("PART_TIME");
  if (/contract/.test(v)) types.push("CONTRACTOR");
  if (/temp/.test(v)) types.push("TEMPORARY");
  if (/intern(ship)?\b/.test(v)) types.push("INTERN");
  return types.length > 0 ? types : undefined;
}

const COUNTRY_CODES: Record<string, string> = {
  india: "IN",
  bharat: "IN",
  "united states": "US",
  usa: "US",
  us: "US",
  uk: "GB",
  "united kingdom": "GB",
};

/**
 * Operating base. Used only when a role's free-text location names no country -
 * e.g. "Basavanagudi, Bengaluru". Google rejects a `jobLocation` without
 * `addressCountry`, so omitting it would silently disqualify the posting from
 * Google Jobs; every role to date is India-based.
 */
const DEFAULT_COUNTRY = "IN";

/**
 * Turn a free-text location such as `"Bengaluru, India - On-site"` into a
 * schema.org Place. Returns undefined only when nothing at all can be parsed.
 */
export function toJobLocation(location?: string) {
  if (!location) return undefined;
  const head = location.split(/[|]|\s-\s/)[0] ?? location;
  const parts = head
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return undefined;

  // A country can appear in any position, not only last.
  let country: string | undefined;
  let countryIndex = -1;
  parts.forEach((part, i) => {
    const code = COUNTRY_CODES[part.toLowerCase()];
    if (code && !country) {
      country = code;
      countryIndex = i;
    }
  });

  const placeParts = parts.filter((_, i) => i !== countryIndex);
  const locality = placeParts[0] ?? parts[0];
  const region = placeParts.length > 1 ? placeParts[placeParts.length - 1] : undefined;

  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      ...(region && region !== locality ? { addressRegion: region } : {}),
      addressCountry: country ?? DEFAULT_COUNTRY,
    },
  };
}

/** Google expects TELECOMMUTE to be declared explicitly for remote roles. */
export function isRemote(location?: string, employmentType?: string): boolean {
  return /remote|work from home|telecommute/i.test(
    `${location ?? ""} ${employmentType ?? ""}`,
  );
}
