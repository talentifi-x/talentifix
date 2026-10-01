import { MetadataRoute } from "next";
import {
  getSanityPostSitemapEntries,
  getSanityJobSitemapEntries,
} from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";
import { SITE_URL } from "@lib/seo";

/**
 * Rebuild the sitemap at most once an hour. Without this it is generated only at
 * deploy time, so posts published in Sanity never reach it until the next deploy.
 */
export const revalidate = 3600;

/**
 * `lastModified` is set only where a real modification date exists (Sanity's
 * `_updatedAt`). Stamping every entry with the build time - which is what
 * `new Date()` did - tells Google the whole site changed on every deploy, and it
 * responds by ignoring the signal entirely. Omitting it is the honest default.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/solutions`, priority: 0.8 },
    { url: `${baseUrl}/blog`, priority: 0.9 },
    { url: `${baseUrl}/jobs`, priority: 0.9 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/media`, priority: 0.7 },
    { url: `${baseUrl}/insights/talentifi-x-gcc-summit-2026`, priority: 0.7 },
    { url: `${baseUrl}/start-hiring`, priority: 0.8 },
    { url: `${baseUrl}/join-our-network`, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3 },
    { url: `${baseUrl}/sitemap.html`, priority: 0.2 },
  ];

  let blogRoutes: MetadataRoute.Sitemap;
  try {
    const entries = await getSanityPostSitemapEntries();
    blogRoutes = entries
      .filter(({ slug }) => !!slug)
      .map(({ slug, updatedAt }) => ({
        url: `${baseUrl}/blog/${slug}`,
        ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
        priority: 0.7,
      }));
  } catch {
    // Sanity unavailable - fall back to static blog posts, which carry no
    // modification stamp, so lastModified is omitted rather than invented.
    blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      priority: 0.7,
    }));
  }

  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const entries = await getSanityJobSitemapEntries();
    jobRoutes = entries
      .filter(({ slug }) => !!slug)
      .map(({ slug, updatedAt }) => ({
        url: `${baseUrl}/jobs/${slug}`,
        ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
        priority: 0.8,
      }));
  } catch {
    // Sanity unavailable - job listings live only in the CMS, so omit them
    jobRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}
