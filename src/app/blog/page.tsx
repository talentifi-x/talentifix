import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageUpdated } from "@components/content/PageUpdated";
import { JsonLd } from "@components/seo/JsonLd";
import { getAllSanityPosts, type SanityPost } from "@/sanity/lib/queries";
import BlogGrid from "./BlogGrid";
import { jsonLdGraph, pageMetadata, webPageNode } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hiring & Recruitment Insights for Tech Teams",
  description:
    "Practical insights on AI-assisted hiring, GCC talent strategy, talent pipelining and candidate evaluation, from TalentiFi-X's specialist staffing team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogPage() {
  let sanityPosts: SanityPost[] = [];
  try {
    sanityPosts = await getAllSanityPosts();
  } catch {
    // Sanity unreachable
  }

  const allPosts = sanityPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category ?? "Blog",
    author: p.author,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: p.readTime ?? "5 min read",
    introduction: p.introduction,
    image: p.image,
    imageAlt: p.imageAlt?.trim() ?? "",
  }));

  return (
    <div className="w-full bg-white min-h-screen">
      <JsonLd data={jsonLdGraph(webPageNode("/blog", "Hiring & Recruitment Insights", "CollectionPage"))} />
      {/* Hero */}
      <section className="w-full lg:min-h-[calc(100svh-var(--site-header-height,7.5rem))] px-site py-16 lg:py-20 relative overflow-hidden bg-white flex items-center">
        <div className="relative z-10 w-full max-w-site mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          {/* Text */}
          <div className="w-full lg:flex-1 flex flex-col gap-6 text-center lg:text-left">
            {/* The label is the H1 (the search phrase); the slogan below is styling only. */}
            <h1 className="inline-block text-primary font-notch font-bold text-base tracking-widest uppercase border border-primary/30 px-5 py-2 rounded-sm bg-primary/5 w-fit mx-auto lg:mx-0">
              Hiring &amp; recruitment insights
            </h1>
            <p className="text-[42px] sm:text-[60px] md:text-[80px] lg:text-[110px] leading-none font-bold text-dark font-notch tracking-tight">
              Insights<span className="text-secondary">.</span>
              <br />
              Ideas<span className="text-secondary">.</span>
            </p>
            <p className="text-dark/70 font-sans text-lg md:text-2xl max-w-xl leading-relaxed mt-2 mx-auto lg:mx-0">
              Perspectives on staffing, AI, and building the workforce of
              tomorrow.
            </p>
          </div>

          {/* Image */}
          <div className="w-full lg:flex-1 flex justify-center">
            <Image
              src="/assets/Solutions/hiring-insights-isometric-blocks.png"
              alt="Isometric illustration of connected data blocks"
              width={700}
              height={467}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="w-full max-w-165 h-auto"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="font-notch text-2xl font-bold text-dark md:text-3xl">
          What can employers learn from these hiring insights?
        </h2>
        <p className="mt-4 text-dark/75 leading-relaxed">
          These articles cover role definition, candidate evaluation, AI-assisted
          screening and staffing decisions for technology teams in India and the
          USA. Use the topic filters below to find guidance for the hiring problem
          you are working on.
        </p>
        <p className="mt-4 text-dark/75 leading-relaxed">
          For market-specific starting points, read our{" "}
          <Link href="/blog/contract-staffing-india-guide" className="text-primary underline">contract staffing guide for India</Link>{" "}
          or our guide to{" "}
          <Link href="/blog/how-to-choose-it-staffing-agency-usa" className="text-primary underline">choosing an IT staffing agency in the USA</Link>.
          Each article carries its own publication date. For a current hiring
          requirement, explore our <Link href="/solutions" className="text-primary underline">staffing solutions</Link>.
        </p>
        <PageUpdated path="/blog" />
      </section>
      <BlogGrid posts={allPosts} />
    </div>
  );
}
