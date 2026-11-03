import type { Metadata } from "next";
import { getAllSanityPosts } from "@/sanity/lib/queries";
import { linkFor, visiblePageById, type ContentPage, type Crumb } from "@data/content";
import { ORG_ID, SITE_URL, WEBSITE_ID, absoluteUrl, buildTitle, jsonLdGraph, pageMetadata } from "@lib/seo";

/** Blog posts a content page links to, keyed by slug. */
export type PostSummary = { slug: string; title: string; introduction?: string };

const ARTICLE_KINDS = new Set<ContentPage["kind"]>(["comparison", "guide", "definition"]);
const SERVICE_KINDS = new Set<ContentPage["kind"]>(["talent", "solution", "market"]);

export function contentMetadata(page: ContentPage): Metadata {
  const article = ARTICLE_KINDS.has(page.kind);
  return {
    ...pageMetadata({
      title: buildTitle(page.title, page.h1),
      description: page.description,
      path: page.path,
      type: article ? "article" : "website",
      publishedTime: article ? page.published : undefined,
      modifiedTime: article ? page.updated : undefined,
    }),
    ...(page.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * The published posts a page links to (related posts and postLinks blocks), in
 * the listed order. A Sanity outage drops the posts rather than the page.
 */
export async function postsForPage(page: ContentPage): Promise<Record<string, PostSummary>> {
  const wanted = new Set([
    ...page.relatedPosts,
    ...page.sections.flatMap((section) => section.blocks.flatMap((block) => (block.type === "postLinks" ? block.slugs : []))),
  ]);
  if (wanted.size === 0) return {};
  try {
    const posts = await getAllSanityPosts();
    return Object.fromEntries(
      posts
        .filter((post) => post.slug && wanted.has(post.slug))
        .map(({ slug, title, introduction }) => [slug, { slug, title, introduction }]),
    );
  } catch {
    return {};
  }
}

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/**
 * One JSON-LD graph per page: WebPage (or CollectionPage), BreadcrumbList, the
 * page's main entity (Service, Article or DefinedTerm), FAQPage and, on hubs, an
 * ItemList of the pages they link to. The Organization and WebSite nodes come
 * from the root layout and are referenced by @id.
 */
export function contentJsonLd(page: ContentPage, crumbs: Crumb[]) {
  const url = absoluteUrl(page.path);
  const isHub = page.kind === "hub";
  const article = ARTICLE_KINDS.has(page.kind);
  const nodes: Record<string, unknown>[] = [
    {
      "@type": isHub ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.h1,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      dateModified: page.updated,
      ...(page.service ? { about: { "@id": `${url}#service` } } : {}),
      ...(page.term ? { about: { "@id": `${url}#term` } } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.href),
      })),
    },
  ];

  if (page.service && SERVICE_KINDS.has(page.kind)) {
    nodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.h1,
      serviceType: page.service.serviceType,
      description: page.description,
      url,
      provider: { "@id": ORG_ID },
      areaServed: [
        ...(page.service.cities ?? []).map((name) => ({ "@type": "City", name })),
        ...page.service.areaServed.map((name) => ({ "@type": "Country", name })),
      ],
    });
  }

  if (article) {
    nodes.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: page.h1.length <= 110 ? page.h1 : page.title,
      description: page.description,
      datePublished: page.published ?? page.updated,
      dateModified: page.updated,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      inLanguage: "en",
      ...(page.sources?.length ? { citation: page.sources.map((source) => source.url) } : {}),
    });
  }

  if (page.term) {
    nodes.push({
      "@type": "DefinedTerm",
      "@id": `${url}#term`,
      name: page.term,
      description: plain(page.intro[0] ?? page.description),
      url,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        "@id": `${SITE_URL}/hiring-intelligence#glossary`,
        name: "TalentiFi-X hiring glossary",
      },
    });
  }

  if (isHub) {
    const ids = page.sections.flatMap((section) => section.blocks.flatMap((block) => (block.type === "pageLinks" ? block.ids : [])));
    const items = ids.map((id) => visiblePageById(id)).filter((p): p is ContentPage => Boolean(p));
    if (items.length)
      nodes.push({
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.h1, url: absoluteUrl(item.path) })),
      });
  }

  if (page.faqs.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return jsonLdGraph(...nodes);
}

/** Related links grouped the way the client's pages list them: talent, solutions, insights. */
export function relatedGroups(page: ContentPage) {
  const links = page.related.map((id) => linkFor(id)).filter((link): link is NonNullable<typeof link> => Boolean(link));
  return {
    talent: links.filter((link) => link.kind === "talent"),
    solutions: links.filter((link) => link.kind === "solution" || link.kind === "market"),
    insights: links.filter((link) => !["talent", "solution", "market"].includes(link.kind)),
  };
}
