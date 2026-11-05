import { livePages, type ContentPage } from "@data/content";

/**
 * Words in a post's title, slug or category that tie it to one specialist talent
 * page, by content id. Checked in order; the first match wins.
 *
 * The AI rule needs a role word after "AI" ("AI engineers", "ML team"), so the
 * many posts about AI *in* hiring ("AI in staffing", "AI hiring risk") are not
 * sent to the page about hiring AI engineers.
 */
const RULES: [id: string, pattern: RegExp][] = [
  ["talent-cyber", /cyber|\bsecurity\b/i],
  ["talent-erp", /\bsap\b|s\/4hana|\berp\b/i],
  ["talent-cloud", /devops|\bsre\b|\bcloud\b|platform engineer/i],
  ["talent-data", /\bdata[\s-](engineer|scien|analy)|\banalytics\b/i],
  ["talent-ai-ml", /\b(ai|ml|machine[\s-]learning|llm|genai)[\s/&-]+(engineers?|talent|developers?|teams?|specialists?|scientists?|researchers?)\b/i],
  ["talent-software", /software|developer|full[\s-]?stack|back[\s-]?end|front[\s-]?end|\btech(nical)?[\s-](talent|hiring|teams?|roles?)\b/i],
];

type PostLike = { title: string; slug: string; category?: string };

/**
 * The live talent pages for a post's "How TalentiFi-X can help" block: the one
 * matching the post's subject (if any) first, then the rest.
 *
 * Before this, only 1 of 29 posts linked to a /talent page from the article
 * (SEO audit, 5 Nov 2026); the service pages were reached only from the menu
 * and footer.
 */
export function talentLinksForPost(post: PostLike): { match?: ContentPage; pages: ContentPage[] } {
  const pages = livePages("talent");
  const haystack = `${post.title} ${post.slug.replace(/-/g, " ")} ${post.category ?? ""}`;
  const id = RULES.find(([, pattern]) => pattern.test(haystack))?.[0];
  const match = pages.find((page) => page.id === id);
  return { match, pages: match ? [match, ...pages.filter((page) => page !== match)] : pages };
}
