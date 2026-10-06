import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllSanityPostSlugs,
  getAllSanityJobSlugs,
} from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";
import { SITE_URL, pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sitemap: Every Page, Open Role and Article",
  description:
    "Browse every page of the TalentiFi-X website in one place: staffing solutions, open roles, hiring insights, articles, events and ways to get in touch.",
  path: "/sitemap.html",
});

export const revalidate = 60;

const staticPaths = [
  "/",
  "/about",
  "/solutions",
  "/blog",
  "/jobs",
  "/contact",
  "/media",
  "/insights/talentifi-x-gcc-summit-2026",
  "/start-hiring",
  "/join-our-network",
  "/privacy-policy",
];

export default async function SitemapHtmlPage() {
  const baseUrl = SITE_URL;

  let blogSlugs: string[] = [];
  try {
    const slugs = await getAllSanityPostSlugs();
    blogSlugs = slugs.map((item) => item.slug).filter(Boolean);
  } catch {
    blogSlugs = blogPosts.map((post) => post.slug);
  }

  let jobSlugs: string[] = [];
  try {
    const slugs = await getAllSanityJobSlugs();
    jobSlugs = slugs.map((item) => item.slug).filter(Boolean);
  } catch {
    jobSlugs = [];
  }

  const urls = [
    ...staticPaths.map((path) => ({
      path,
      url: `${baseUrl}${path}`,
    })),
    ...blogSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      url: `${baseUrl}/blog/${slug}`,
    })),
    ...jobSlugs.map((slug) => ({
      path: `/jobs/${slug}`,
      url: `${baseUrl}/jobs/${slug}`,
    })),
  ];

  return (
    <main className="w-full bg-white min-h-screen px-6 md:px-10 py-14">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Sitemap
        </h1>
        <p className="text-gray-600 mb-8">
          Explore all pages and blog posts on TalentiFi-X.
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 md:p-8">
          {/* Long addresses wrap on small phones, and each link is 44 px tall to tap. */}
          <ul className="space-y-1">
            {urls.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.path}
                  className="inline-block min-h-11 py-2.5 break-all text-primary hover:underline"
                >
                  {item.url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
