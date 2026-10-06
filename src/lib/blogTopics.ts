/**
 * Groups the editor-chosen post categories into four broader topics, so each
 * article can link to 2-3 related posts even though most categories hold only
 * one or two. A category not listed here falls back to the newest posts.
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

/** Up to `count` posts on the same topic (newest first), topped up with the newest others. */
export function relatedPosts<T extends PostLike>(current: PostLike, all: T[], count = 3): T[] {
  const others = all
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  const topic = topicOf(current.category);
  const sameTopic = topic ? others.filter((p) => topicOf(p.category) === topic) : [];
  const rest = others.filter((p) => !sameTopic.includes(p));
  return [...sameTopic, ...rest].slice(0, count);
}
