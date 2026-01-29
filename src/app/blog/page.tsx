import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogDataProvider } from '@lib/sanity/dataProvider';
import { urlForImage } from '@lib/sanity/client';

export const metadata: Metadata = {
  title: 'Blog - Talentifi-X',
  description: 'Insights and articles about recruitment, hiring, and talent acquisition',
};

async function getBlogPosts() {
  try {
    const result = await blogDataProvider.getList({
      resource: 'blogPost',
      pagination: { currentPage: 1, pageSize: 12 },
      filters: [],
      sorters: [],
    });
    return result.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary to-[#000099] py-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Insights & Articles
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover expert insights on recruitment, hiring strategies, and talent acquisition trends
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && posts[0].isFeatured && (
        <section className="w-full py-16 bg-grey-accent">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-primary font-medium">
                    {posts[0].categories?.[0]?.title}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{formatDate(posts[0].publishedAt)}</span>
                  </div>
                  {posts[0].readingTime && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={16} />
                      <span>{posts[0].readingTime} min read</span>
                    </div>
                  )}
                </div>
                <Link
                  href={`/blog/${posts[0].slug.current}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-[5px] font-bold hover:bg-primary/90 transition-colors"
                >
                  Read Article
                  <ArrowRight size={20} />
                </Link>
              </div>
              <div className="order-1 md:order-2">
                {posts[0].featuredImage && (
                  <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={urlForImage(posts[0].featuredImage).url()}
                      alt={posts[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="w-full py-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-dark">Latest Articles</h2>
            <div className="flex gap-2">
              {['All', 'Recruitment', 'Technology', 'Strategy'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="group">
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {post.featuredImage && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={urlForImage(post.featuredImage).url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {post.categories?.map((category: any) => (
                          <span
                            key={category._id}
                            className="text-primary text-sm font-medium"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}