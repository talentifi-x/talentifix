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
  /**
   * The studio "Published" toggle. Deliberately NOT filtered out of the
   * single-post query - the page needs to tell "hidden" (404) apart from
   * "Sanity unreachable" (fall back to static data). `undefined` on posts
   * created before the field existed, which counts as published.
   */
  published?: boolean;
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
      "image": mainImage.asset->url
    }`,
  );
}

export async function getAllSanityPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[${VISIBLE}] { "slug": slug.current }`);
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
      readTime,
      introduction,
      "image": mainImage.asset->url,
      body,
      faq
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
      metaTitle,
      metaDescription
    }`,
    { slug },
  );
}
