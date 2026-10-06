import {
  getSanityPostSitemapEntries,
  getSanityJobSitemapEntries,
} from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";
import { SITE_URL } from "@lib/seo";

/**
 * Rebuild the sitemap at most once an hour, so posts published in Sanity reach it
 * without a deploy.
 *
 * This is a plain route handler on purpose, like /llms.txt. A metadata `sitemap.ts`
 * with `revalidate` is published to Vercel as a static file with the revalidate
 * dropped, so the live sitemap only changed on deploy (seen on 6 Oct 2026: still the
 * build copy 85 minutes later, while /llms.txt with the same setting refreshed).
 */
export const revalidate = 3600;

type Entry = { url: string; lastModified?: string; priority: number };

/**
 * `lastModified` is set only where a real modification date exists (a post's
 * editor-set "Last Updated" or publish date, a job's `_updatedAt`). Stamping
 * every entry with the build time - which is what
 * `new Date()` did - tells Google the whole site changed on every deploy, and it
 * responds by ignoring the signal entirely. Omitting it is the honest default.
 */
async function sitemapEntries(): Promise<Entry[]> {
  const baseUrl = SITE_URL;

  const staticRoutes: Entry[] = [
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

  let blogRoutes: Entry[];
  try {
    const entries = await getSanityPostSitemapEntries();
    blogRoutes = entries
      .filter(({ slug }) => !!slug)
      .map(({ slug, updatedAt }) => ({
        url: `${baseUrl}/blog/${slug}`,
        ...(updatedAt ? { lastModified: new Date(updatedAt).toISOString() } : {}),
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

  let jobRoutes: Entry[] = [];
  try {
    const entries = await getSanityJobSitemapEntries();
    jobRoutes = entries
      .filter(({ slug }) => !!slug)
      .map(({ slug, updatedAt }) => ({
        url: `${baseUrl}/jobs/${slug}`,
        ...(updatedAt ? { lastModified: new Date(updatedAt).toISOString() } : {}),
        priority: 0.8,
      }));
  } catch {
    // Sanity unavailable - job listings live only in the CMS, so omit them
    jobRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const urls = (await sitemapEntries()).map(
    ({ url, lastModified, priority }) =>
      `<url>\n<loc>${escapeXml(url)}</loc>\n${lastModified ? `<lastmod>${lastModified}</lastmod>\n` : ""}<priority>${priority}</priority>\n</url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
