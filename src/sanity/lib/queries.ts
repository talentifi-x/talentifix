import { client } from "./client";

export interface SanityPost {
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  author?: string;
  readTime: string;
  introduction: string;
  image: string | null;
}

export interface SanityPostFull extends SanityPost {
  body: unknown[];
  faq: { question: string; answer: string }[];
  /** Editor-set date of the last real content change; never Sanity's _updatedAt. */
  lastUpdated?: string;
  imageAlt?: string;
  shareImage?: string | null;
  noindex?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  /** Shows the founder's "with insights from" line and expert card. */
  founderInsights?: boolean;
  /**
   * The studio "Published" toggle. Deliberately NOT filtered out of the
   * single-post query - the page needs to tell "hidden" (404) apart from
   * "Sanity unreachable" (fall back to static data). `undefined` on posts
   * created before the field existed, which counts as published.
   */
  published?: boolean;
}

/** Slug plus last-modified stamp, for accurate `<lastmod>` in the sitemap. */
export interface SanitySitemapEntry {
  slug: string;
  updatedAt?: string;
}

/**
 * Posts are visible unless the toggle is explicitly off. Using `!= false`
 * rather than `== true` means the posts that predate the field stay live
 * without needing a backfill.
 */
const VISIBLE = `_type == "post" && published != false`;

export async function getAllSanityPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[${VISIBLE}] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      readTime,
      introduction,
      // Sanity serves an image under any readable name added after its URL, so the
      // file name Google sees describes the post instead of the asset hash.
      "image": mainImage.asset->url + "/" + slug.current + "." + mainImage.asset->extension
    }`,
  );
}

export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[${VISIBLE}] { "slug": slug.current }`);
}

/**
 * Kept separate from `getAllSanityPostSlugs` because `generateStaticParams`
 * rejects any key that is not a route param.
 *
 * `<lastmod>` is the editor-set content date, not `_updatedAt`: Sanity bumps
 * `_updatedAt` on every save (a typo fix, an SEO field), and a lastmod that
 * moves without real changes teaches Google to ignore it. Posts marked
 * "Hide from Google" stay on the site but leave the sitemap.
 */
export async function getSanityPostSitemapEntries(): Promise<
  SanitySitemapEntry[]
> {
  return client.fetch(
    `*[${VISIBLE} && noindex != true] { "slug": slug.current, "updatedAt": coalesce(lastUpdated, publishedAt) }`,
  );
}

export async function getSanityPostBySlug(
  slug: string,
): Promise<SanityPostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      published,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      founderInsights,
      readTime,
      introduction,
      "image": mainImage.asset->url + "/" + slug.current + "." + mainImage.asset->extension,
      "imageAlt": mainImage.alt,
      "shareImage": shareImage.asset->url,
      noindex,
      body,
      faq,
      metaTitle,
      metaDescription,
      lastUpdated
    }`,
    { slug },
  );
}

export interface SanityJob {
  title: string;
  slug: string;
  badge?: string;
  isOpen?: boolean;
  location?: string;
  employmentType?: string;
  experience?: string;
  department?: string;
  applyEmail?: string;
  publishedAt?: string;
}

export interface SanityJobFull extends SanityJob {
  aboutRole?: string;
  responsibilities?: string[];
  requirements?: string[];
  whoYouAre?: string;
  whyJoinIntro?: string;
  whyJoinPoints?: string[];
  metaTitle?: string;
  metaDescription?: string;
  updatedAt?: string;
}

export async function getAllSanityJobs(): Promise<SanityJob[]> {
  return client.fetch(
    `*[_type == "job"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      badge,
      isOpen,
      location,
      employmentType,
      experience,
      department,
      applyEmail,
      publishedAt
    }`,
  );
}

/**
 * Closed roles are left out of the static params and the sitemap, and their
 * page returns 404, so Google drops the JobPosting instead of listing a dead job.
 * `!= false` keeps roles that predate the toggle open.
 */
const OPEN_JOB = `_type == "job" && isOpen != false`;

export async function getAllSanityJobSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[${OPEN_JOB}] { "slug": slug.current }`);
}

/** Slug plus last-modified stamp, for accurate `<lastmod>` in the sitemap. */
export async function getSanityJobSitemapEntries(): Promise<
  SanitySitemapEntry[]
> {
  return client.fetch(
    `*[${OPEN_JOB}] { "slug": slug.current, "updatedAt": _updatedAt }`,
  );
}

export async function getSanityJobBySlug(
  slug: string,
): Promise<SanityJobFull | null> {
  return client.fetch(
    `*[_type == "job" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      badge,
      isOpen,
      location,
      employmentType,
      experience,
      department,
      applyEmail,
      publishedAt,
      aboutRole,
      responsibilities,
      requirements,
      whoYouAre,
      whyJoinIntro,
      whyJoinPoints,
      "updatedAt": _updatedAt,
      metaTitle,
      metaDescription
    }`,
    { slug },
  );
}
