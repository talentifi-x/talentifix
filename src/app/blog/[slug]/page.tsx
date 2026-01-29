import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { blogDataProvider } from '@lib/sanity/dataProvider';
import { urlForImage } from '@lib/sanity/client';
import { JsonTable } from '@components/blog/JsonTable';
import { FaqSection } from '@components/blog/FaqSection';
import { TableOfContents } from '@components/blog/TableOfContents';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string) {
  try {
    // First get the post ID from slug
    const allPosts = await blogDataProvider.getList({
      resource: 'blogPost',
      pagination: { currentPage: 1, pageSize: 100 },
      filters: [],
      sorters: [],
    });
    
    const post = allPosts.data.find((p: any) => p.slug.current === slug);
    
    if (!post) {
      return null;
    }

    // Get full post data
    const result = await blogDataProvider.getOne({
      resource: 'blogPost',
      id: post._id,
    });

    return result.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Talentifi-X',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [urlForImage(post.featuredImage).url()] : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const portableTextComponents = {
  types: {
    jsonTable: ({ value }: any) => <JsonTable data={value} />,
    faqSection: ({ value }: any) => <FaqSection data={value} />,
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-dark mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-dark mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-dark mb-4 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-dark mb-3 mt-6">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : ''}
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary to-[#000099] py-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {post.categories?.map((category: any) => (
                <span
                  key={category._id}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {category.title}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
                
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <TableOfContents items={post.tableOfContents} />
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-grey-accent text-gray-600 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-3">
              {post.featuredImage && (
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={urlForImage(post.featuredImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}