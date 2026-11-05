/**
 * Groups the editor-chosen post categories into four broader topics, so each
 * article can link to 2-3 related posts even though most categories hold only
 * one or two. A category not listed here falls back to the nearest posts in time.
 */
const TOPICS: Record<string, string[]> = {
  ai: ["AI & Staffing", "AI in Recruitment", "Recruitment & AI", "AI & Hiring Risk", "Bulk Hiring & AI"],
  process: ["Hiring Strategy", "Modern Staffing", "Interview Strategy"],
  market: ["Global Hiring", "Hiring Trends", "Tech Hiring", "Finance Hiring"],
  talent: ["Talent Strategy", "Founder's Note"],
};

const topicOf = (category?: string) =>
  Object.keys(TOPICS).find((topic) => category && TOPICS[topic].includes(category));

type PostLike = { slug: string; category?: string; publishedAt?: string };

const time = (post: PostLike) => Date.parse(post.publishedAt ?? "") || 0;

/**
 * Up to `count` posts on the same topic, topped up with posts on other topics;
 * each group ordered by how close its publication date is to the current post's.
 *
 * Nearest in time, not newest first: newest-first sent every post's links to the
 * same three latest articles, which collected 18-23 internal links each while
 * nine older posts had none at all (SEO audit, 5 Nov 2026). Date neighbours
 * spread the links across the whole archive, and a new post still gets links
 * from the posts published just before it.
 */
export function relatedPosts<T extends PostLike>(current: PostLike, all: T[], count = 3): T[] {
  const at = time(current);
  const nearest = (a: T, b: T) =>
    Math.abs(time(a) - at) - Math.abs(time(b) - at) || a.slug.localeCompare(b.slug);
  const others = all.filter((p) => p.slug !== current.slug);
  const topic = topicOf(current.category);
  const sameTopic = topic ? others.filter((p) => topicOf(p.category) === topic).sort(nearest) : [];
  const rest = others.filter((p) => !sameTopic.includes(p)).sort(nearest);
  return [...sameTopic, ...rest].slice(0, count);
}
