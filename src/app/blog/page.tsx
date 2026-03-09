import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogData";

export const metadata = {
  title: "Blog | TalentiFi-X",
  description: "Insights on staffing, AI, and the future of hiring.",
};

export default function BlogPage() {
  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen">
      {/* Hero */}
      <section className="w-full pt-20 pb-16 px-6 md:px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <span className="inline-block text-primary font-notch font-bold text-sm tracking-widest uppercase border border-primary/30 px-4 py-1.5 rounded-sm bg-primary/5 w-fit">
            Our Blog
          </span>
          <h1 className="text-[56px] md:text-[80px] leading-none font-bold text-dark font-notch tracking-tight">
            Insights<span className="text-secondary">.</span>
            <br />
            Ideas<span className="text-secondary">.</span>
          </h1>
          <p className="text-dark/60 font-sans text-base md:text-lg max-w-xl leading-relaxed mt-2">
            Perspectives on staffing, AI, and building the workforce of
            tomorrow.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full pb-24 px-6 md:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
