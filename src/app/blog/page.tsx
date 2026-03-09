import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getAllSanityPosts, type SanityPost } from "@/sanity/lib/queries";

export const metadata = {
  title: "Blog | TalentiFi-X",
  description: "Insights on staffing, AI, and the future of hiring.",
};

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
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: p.readTime ?? "5 min read",
    introduction: p.introduction,
    image: p.image ?? "/blogs/b1.png",
  }));

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero */}
      <section className="w-full h-auto lg:h-[calc(100vh-120px)] px-6 md:px-14 py-16 lg:py-0 relative overflow-hidden bg-white flex items-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          {/* Text */}
          <div className="w-full lg:flex-1 flex flex-col gap-6 text-center lg:text-left">
            <span className="inline-block text-primary font-notch font-bold text-base tracking-widest uppercase border border-primary/30 px-5 py-2 rounded-sm bg-primary/5 w-fit mx-auto lg:mx-0">
              Our Blog
            </span>
            <h1 className="text-[42px] sm:text-[60px] md:text-[80px] lg:text-[110px] leading-none font-bold text-dark font-notch tracking-tight">
              Insights<span className="text-secondary">.</span>
              <br />
              Ideas<span className="text-secondary">.</span>
            </h1>
            <p className="text-dark/60 font-sans text-lg md:text-2xl max-w-xl leading-relaxed mt-2 mx-auto lg:mx-0">
              Perspectives on staffing, AI, and building the workforce of
              tomorrow.
            </p>
          </div>

          {/* Image */}
          <div className="w-full lg:flex-1 flex justify-center">
            <Image
              src="/assets/Solutions/hero-visual-blog.png"
              alt="Blog Hero Visual"
              width={700}
              height={467}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="w-full max-w-[660px] h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold font-notch uppercase tracking-wider px-3 py-1 rounded-sm flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                <div className="flex items-center gap-4 text-dark/40 text-xs font-sans">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-dark/30 inline-block" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-[18px] font-bold font-notch text-dark leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {post.title}
                </h2>

                <p className="text-dark/60 font-sans text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.introduction}
                </p>

                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-notch mt-auto pt-2 border-t border-gray-100">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
