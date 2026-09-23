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
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

/** Slug plus last-modified stamp, for accurate `<lastmod>` in the sitemap. */
export interface SanitySitemapEntry {
  slug: string;
  updatedAt?: string;
}

export async function getAllSanityPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      readTime,
      introduction,
      "image": mainImage.asset->url
    }`,
  );
}

export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "post"] { "slug": slug.current }`);
}

/**
 * Kept separate from `getAllSanityPostSlugs` because `generateStaticParams`
 * rejects any key that is not a route param.
 */
export async function getSanityPostSitemapEntries(): Promise<
  SanitySitemapEntry[]
> {
  return client.fetch(
    `*[_type == "post"] { "slug": slug.current, "updatedAt": _updatedAt }`,
  );
}

export async function getSanityPostBySlug(
  slug: string,
): Promise<SanityPostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      readTime,
      introduction,
      "image": mainImage.asset->url,
      body,
      faq,
      metaTitle,
      metaDescription,
      "updatedAt": _updatedAt
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

export async function getAllSanityJobSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "job"] { "slug": slug.current }`);
}

/** Slug plus last-modified stamp, for accurate `<lastmod>` in the sitemap. */
export async function getSanityJobSitemapEntries(): Promise<
  SanitySitemapEntry[]
> {
  return client.fetch(
    `*[_type == "job"] { "slug": slug.current, "updatedAt": _updatedAt }`,
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
