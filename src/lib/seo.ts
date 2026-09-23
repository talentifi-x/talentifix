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
export const MAX_DESCRIPTION_LENGTH = 155;

/** Stable identity for the Organization entity, shared by every page that emits it. */
export const ORG_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;

export const absoluteUrl = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Trim to `limit`, preferring a word boundary over cutting mid-word. */
export function truncateAtWord(value: string, limit: number): string {
  const text = value.trim();
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");
  const cut = lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return cut.replace(/[\s,;:.-]+$/, "");
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
  const base = (preferred?.trim() || fallback).trim();
  if (base.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH) {
    return { absolute: `${base}${BRAND_SUFFIX}` };
  }
  return { absolute: truncateAtWord(base, MAX_TITLE_LENGTH) };
}

/** Prefer an editor-authored description, else trim the fallback to a sane width. */
export function buildDescription(
  preferred: string | null | undefined,
  fallback: string | null | undefined,
): string | undefined {
  const base = (preferred?.trim() || fallback?.trim()) ?? "";
  if (!base) return undefined;
  return truncateAtWord(base, MAX_DESCRIPTION_LENGTH);
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
