import { getAllSanityPosts } from "@/sanity/lib/queries";
import { SITE_URL, truncateAtSentence } from "@lib/seo";

/**
 * /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org).
 * Optional - Google says it does not use it - but it is cheap, and it is built
 * from the same CMS data as the sitemap so it never goes stale.
 */
export const revalidate = 3600;

const PAGES: [path: string, name: string, summary: string][] = [
  ["/solutions", "Staffing solutions", "Temporary staffing, permanent placement, contract-to-hire and executive search."],
  ["/start-hiring", "Start hiring", "Brief us on a role; we reply within 4 business hours."],
  ["/about", "About TalentiFi-X", "Why the firm exists, its human-led, AI-assisted approach, and its founder, Chetan Mangalwedhe."],
  ["/join-our-network", "Join the talent network", "For AI, ML and cybersecurity professionals in India who want to be matched with specialist roles."],
  ["/jobs", "Careers", "Open roles at TalentiFi-X."],
  ["/media", "Media", "Event participation and industry activity, including GCC Summit 2026 in Bengaluru."],
  ["/contact", "Contact", "Offices in Bengaluru, India, and Houston, Texas."],
];

export async function GET() {
  const posts = await getAllSanityPosts().catch(() => []);
  const link = (path: string, name: string, summary?: string) =>
    `- [${name}](${SITE_URL}${path})${summary ? `: ${summary}` : ""}`;

  const text = [
    "# TalentiFi-X",
    "",
    "> TalentiFi-X is a specialist staffing firm that combines AI-assisted screening with human-led hiring decisions. It hires AI and ML engineers, cybersecurity specialists and teams for Global Capability Centres (GCCs) in India, for companies in India and the US. Offices: Bengaluru, India, and Houston, Texas.",
    "",
    "## Key pages",
    "",
    link("/", "Home", "What TalentiFi-X does and who it serves."),
    ...PAGES.map(([path, name, summary]) => link(path, name, summary)),
    "",
    "## Articles",
    "",
    ...posts
      .filter((p) => p.slug && p.title)
      .map((p) => link(`/blog/${p.slug}`, p.title, p.introduction ? truncateAtSentence(p.introduction, 200) : undefined)),
    "",
    "## Optional",
    "",
    link("/sitemap.xml", "XML sitemap"),
    link("/privacy-policy", "Privacy policy"),
    "",
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
