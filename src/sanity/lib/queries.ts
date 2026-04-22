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
