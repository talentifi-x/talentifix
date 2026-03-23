import Link from "next/link";
import { getAllSanityPostSlugs } from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";

export const metadata = {
  title: "Sitemap",
  description: "Sitemap for TalentiFi-X.",
};

export const revalidate = 60;

const staticPaths = [
  "/",
  "/about",
  "/solutions",
  "/blog",
  "/contact",
  "/start-hiring",
  "/join-our-network",
  "/privacy-policy",
];

export default async function SitemapHtmlPage() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentifix.com"
  ).replace(/\/$/, "");

  let blogSlugs: string[] = [];
  try {
    const slugs = await getAllSanityPostSlugs();
    blogSlugs = slugs.map((item) => item.slug).filter(Boolean);
  } catch {
    blogSlugs = blogPosts.map((post) => post.slug);
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
          <ul className="space-y-3">
            {urls.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.path}
                  className="text-primary hover:underline"
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
