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

/** Editorial labels for the existing archive, not search-volume estimates. */
const POST_TAGS: Record<string, string[]> = {
  "ai-in-staffing-what-should-be-automated-and-what-should-never-be": ["AI in staffing", "Recruitment automation", "Human-led hiring"],
  "ai-in-hiring-what-s-real-what-s-hype-and-what-your-competitors-already-know": ["AI in hiring", "Candidate screening", "Recruitment automation"],
  "why-sending-30-resumes-is-lazy-hiring-and-why-3-5-is-the-future": ["Candidate shortlisting", "Quality of hire", "Recruitment strategy"],
  "why-traditional-staffing-is-broken-in-the-age-of-ai-and-what-comes-next": ["AI-assisted staffing", "Human-led hiring", "Recruitment strategy"],
  "why-your-hiring-process-is-broken-before-anyone-applies": ["Hiring process", "Role clarity", "Job descriptions"],
  "5-moves-that-will-improve-your-hire-quality-this-quarter": ["Quality of hire", "Candidate evaluation", "Hiring strategy"],
  "improve-hiring-quality-5-moves-2026": ["Quality of hire", "Hiring process", "Candidate evaluation"],
  "cost-of-hiring-delay-60-days-impact": ["Cost of hiring delays", "Time to hire", "Workforce planning"],
  "india-us-talent-bridge-2026-global-hiring": ["India-US hiring", "Global talent", "Distributed teams"],
  "india-hiring-market-2026-selective-hiring-trends": ["India hiring market", "Selective hiring", "Talent strategy"],
  "india-hiring-market-spring-2026": ["India hiring market", "Recruitment trends", "AI in hiring"],
  "amoral-drift-ai-hiring-risk": ["AI hiring risk", "Candidate screening", "Human oversight"],
  "bengaluru-tech-talent-evaluation-us-companies-india": ["Hiring tech talent in India", "Bengaluru engineers", "Candidate experience"],
  "bulk-hiring-ai-screening-funnels-india": ["Bulk hiring in India", "AI candidate screening", "Quality of hire"],
  "contract-staffing-india-guide": ["Contract staffing in India", "Contract-to-hire", "Workforce planning"],
  "energy-signal-final-round-interviews-india": ["Final-round interviews", "Candidate evaluation", "Hiring decisions"],
  "hiring-committee-problem": ["Hiring committees", "Candidate evaluation", "Hiring decisions"],
  "how-to-choose-between-two-candidates-same-skills-india": ["Choosing between two candidates", "Candidate evaluation", "Hiring decisions"],
  "how-to-choose-it-staffing-agency-usa": ["IT staffing agency USA", "Staffing agency selection", "Technical hiring"],
  "india-gcc-talent-capability-challenge": ["GCC hiring in India", "Technology talent", "Capability assessment"],
  "one-job-title-five-different-roles-technical-hiring": ["Technical hiring", "Role definition", "Job descriptions"],
  "passive-candidate-recruitment-best-talent": ["Passive candidate recruitment", "Talent sourcing", "Talent pipelines"],
  "precision-hiring-future-of-recruitment": ["Precision in recruitment", "Candidate shortlisting", "Quality of hire"],
  "proactive-talent-pipelining-vs-reactive-hiring": ["Proactive talent pipelining", "Reactive hiring", "Workforce planning"],
  "return-of-trust-in-hiring": ["Trust in hiring", "Candidate verification", "Human-led hiring"],
  "role-clarity-chaotic-hiring-process-india": ["Role clarity", "Hiring process", "Job descriptions"],
  "too-many-job-applications-hiring-challenges": ["Too many job applications", "Candidate screening", "Qualified candidates"],
  "what-signal-looks-like-senior-finance-hiring-india": ["Senior finance hiring in India", "Candidate evaluation", "Finance recruitment"],
  "what-20-years-of-placing-talent-taught-me-about-hiring-and-why-i-built-talentifi-x": ["Human-led hiring", "Recruitment strategy", "TalentiFi-X"],
};

/** Keep visible labels, article:tag metadata and JSON-LD keywords in agreement. */
export function postTags(post: { slug: string; category?: string; tags?: string[] | null }): string[] {
  const clean = (values: string[]) => Array.from(new Map(
    values.filter((value) => typeof value === "string" && value.trim())
      .map((value) => [value.trim().toLowerCase(), value.trim()]),
  ).values()).slice(0, 4);
  const editorTags = clean(post.tags ?? []);
  return editorTags.length ? editorTags : clean(POST_TAGS[post.slug] ?? (post.category ? [post.category] : []));
}

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
