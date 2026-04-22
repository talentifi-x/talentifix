import Image from "next/image";
import { getAllSanityPosts, type SanityPost } from "@/sanity/lib/queries";
import BlogGrid from "./BlogGrid";

export const metadata = {
  title: "Blog",
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
              className="w-full max-w-165 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      <BlogGrid posts={allPosts} />
    </div>
  );
}
