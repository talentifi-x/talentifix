import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllSanityPosts,
  getAllSanityJobs,
} from "@/sanity/lib/queries";
import { blogPosts } from "@data/blogData";
import { livePages } from "@data/content";
import { SITE_URL, jsonLdGraph, pageMetadata, webPageNode } from "@lib/seo";
import { JsonLd } from "@components/seo/JsonLd";
import { PageUpdated } from "@components/content/PageUpdated";

export const metadata: Metadata = pageMetadata({
  title: "Sitemap: Every Page, Open Role and Article",
  description:
    "Browse every page of the TalentiFi-X website in one place: staffing solutions, open roles, hiring insights, articles, events and ways to get in touch.",
  path: "/sitemap.html",
});

export const revalidate = 60;

export default async function SitemapHtmlPage() {
  let articles: { href: string; label: string }[] = [];
  try {
    const posts = await getAllSanityPosts();
    articles = posts.filter((post) => post.slug).map((post) => ({ href: `/blog/${post.slug}`, label: post.title }));
  } catch {
    articles = blogPosts.map((post) => ({ href: `/blog/${post.slug}`, label: post.title }));
  }

  let vacancies: { href: string; label: string }[] = [];
  try {
    const jobs = await getAllSanityJobs();
    vacancies = jobs.filter((job) => job.slug && job.isOpen !== false).map((job) => ({ href: `/jobs/${job.slug}`, label: job.title }));
  } catch {
    // The careers index remains available when the CMS cannot be reached.
  }

  const groups = [
    {
      id: "hiring", title: "Staffing services and technology talent",
      description: "Employers can explore staffing models and the roles covered by each technology specialism. Use these pages to understand the capabilities you need, then share your requirement through Start Hiring. Our service pages cover hiring in India and the USA.",
      links: [
        { href: "/solutions", label: "Staffing solutions and engagement models" },
        ...livePages().map((page) => ({ href: page.path, label: page.navLabel })),
        { href: "/start-hiring", label: "Start hiring: share an employer requirement" },
      ],
    },
    {
      id: "careers", title: "Careers and the talent network",
      description: "Candidates can browse currently listed roles or register their experience and preferences with our talent network. Each vacancy has its own responsibilities, requirements and application instructions. Joining the network is separate from applying to a particular advertised job.",
      links: [
        { href: "/jobs", label: "Browse open roles" },
        { href: "/join-our-network", label: "Join the talent network" },
        ...vacancies,
      ],
    },
    {
      id: "articles", title: "Hiring insights and employer guides",
      description: "Explore practical articles about candidate evaluation, role clarity, AI-assisted hiring and recruitment decisions. The insights index includes topic filters. Individual articles show their publication dates and link to related reading where available.",
      links: [{ href: "/blog", label: "All hiring and recruitment insights" }, ...articles],
    },
    {
      id: "company", title: "About TalentiFi-X and getting in touch",
      description: "Learn about our approach and leadership, explore our industry presence, or contact the team about a hiring need or partnership. The privacy policy explains how personal information is handled when you use our website and forms.",
      links: [
        { href: "/", label: "TalentiFi-X home" },
        { href: "/about", label: "About our approach and leadership" },
        { href: "/contact", label: "Contact our team" },
        { href: "/media", label: "Media and industry presence" },
        { href: "/insights/talentifi-x-gcc-summit-2026", label: "GCC Summit 2026: talent themes from Bengaluru" },
        { href: "/privacy-policy", label: "Privacy policy" },
      ],
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen px-site py-14">
      <JsonLd data={jsonLdGraph({
        ...webPageNode("/sitemap.html", "TalentiFi-X Sitemap", "CollectionPage"),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: groups.flatMap((group) => group.links).map((link, index) => ({
            "@type": "ListItem", position: index + 1, name: link.label, url: `${SITE_URL}${link.href}`,
          })),
        },
      })} />
      <div className="max-w-site mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Sitemap
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Find the TalentiFi-X page that matches what you need: specialist talent
          for your team, a career opportunity, practical hiring guidance or a way
          to contact us. This directory groups the website by purpose so you can
          move directly to the relevant service, article or application page.
        </p>
        <PageUpdated path="/sitemap.html" />
        <nav aria-label="Sitemap sections" className="my-8 flex flex-wrap gap-x-6 gap-y-2">
          {groups.map((group) => <a key={group.id} href={`#${group.id}`} className="min-h-11 py-2.5 text-primary underline">{group.title}</a>)}
        </nav>
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28 rounded-xl border border-gray-100 bg-gray-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-notch text-dark">{group.title}</h2>
              <p className="mt-3 mb-5 leading-relaxed text-gray-600">{group.description}</p>
              <ul className="grid gap-x-8 md:grid-cols-2">
                {group.links.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <Link href={link.href} className="inline-block min-h-11 py-2.5 break-words text-primary hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-600">
          Looking for the machine-readable version? Open the{" "}
          <a href="/sitemap.xml" className="text-primary underline">XML sitemap</a>.
        </p>
      </div>
    </div>
  );
}
