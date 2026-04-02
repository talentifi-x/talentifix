import { MetadataRoute } from "next";
import { getAllSanityPostSlugs } from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentifix.com"
  ).replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/start-hiring`, lastModified: new Date(), priority: 0.8 },
    {
      url: `${baseUrl}/join-our-network`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sitemap.html`,
      lastModified: new Date(),
      priority: 0.2,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap;
  try {
    const slugs = await getAllSanityPostSlugs();
    blogRoutes = slugs.map(({ slug }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));
  } catch {
    // Sanity unavailable — fall back to static blog posts
    blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
