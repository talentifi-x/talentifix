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
