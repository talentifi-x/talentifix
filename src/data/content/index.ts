import { CATALOG } from "./catalog";
import { TALENT_PAGES } from "./pages/talent";
import type { ContentPage, PageKind } from "./types";
import { validateContentPages } from "./validate";

export type { ContentPage, PageKind } from "./types";

/**
 * Every content page with copy. Pages listed in `catalog.ts` but missing here
 * simply do not exist yet: links to them fall back or disappear.
 */
export const CONTENT_PAGES: ContentPage[] = [...TALENT_PAGES];

/** Drafts render only for review builds (SHOW_DRAFT_PAGES=1), never in production. */
const SHOW_DRAFTS = process.env.SHOW_DRAFT_PAGES === "1";

export const isLive = (page: ContentPage) => page.status === "live";
export const isVisible = (page: ContentPage) => isLive(page) || SHOW_DRAFTS;

const byId = new Map(CONTENT_PAGES.map((page) => [page.id, page]));
const byPath = new Map(CONTENT_PAGES.map((page) => [page.path, page]));
const catalogById = new Map(CATALOG.map((entry) => [entry.id, entry]));
const catalogByPath = new Map(CATALOG.map((entry) => [entry.path, entry]));

/** Pages that can be visited in this build, optionally of one kind. */
export function visiblePages(kind?: PageKind): ContentPage[] {
  return CONTENT_PAGES.filter((page) => isVisible(page) && (!kind || page.kind === kind));
}

/** Published pages only: what sitemaps, llms.txt and site navigation list. */
export function livePages(kind?: PageKind): ContentPage[] {
  return CONTENT_PAGES.filter((page) => isLive(page) && (!kind || page.kind === kind));
}

export function visiblePageById(id: string): ContentPage | undefined {
  const page = byId.get(id);
  return page && isVisible(page) ? page : undefined;
}

export function visiblePageByPath(path: string): ContentPage | undefined {
  const page = byPath.get(path);
  return page && isVisible(page) ? page : undefined;
}

/**
 * Where a link written in the copy should point in this build. Links to content
 * pages that are not visible use the catalog's fallback (a section of /solutions)
 * or, without one, return null so the label renders as plain text.
 */
export function resolveHref(href: string): string | null {
  const [path, hash] = href.split("#");
  const entry = catalogByPath.get(path);
  if (!entry) return href;
  if (byPath.has(path) && isVisible(byPath.get(path)!)) return hash ? `${path}#${hash}` : path;
  return entry.fallbackHref ?? null;
}

/** A link to a catalog page by id, using its fallback while the page is not visible. */
export function linkFor(id: string): { href: string; label: string; summary?: string; kind: PageKind } | null {
  const entry = catalogById.get(id);
  if (!entry) return null;
  const page = visiblePageById(id);
  if (page) return { href: page.path, label: page.navLabel, summary: page.summary, kind: page.kind };
  return entry.fallbackHref ? { href: entry.fallbackHref, label: entry.navLabel, kind: entry.kind } : null;
}

export type Crumb = { name: string; href: string };

/** Home, then each visible ancestor, then the page itself. */
export function breadcrumbsFor(page: ContentPage): Crumb[] {
  const trail: Crumb[] = [];
  let parent = catalogById.get(page.id)?.parent;
  while (parent) {
    if (typeof parent !== "string") {
      trail.unshift({ name: parent.name, href: parent.href });
      break;
    }
    const ancestor = visiblePageById(parent);
    if (ancestor) trail.unshift({ name: ancestor.navLabel, href: ancestor.path });
    parent = catalogById.get(parent)?.parent;
  }
  return [{ name: "Home", href: "/" }, ...trail, { name: page.navLabel, href: page.path }];
}

/** Slugs of visible pages directly under `prefix`, for generateStaticParams. */
export function slugsUnder(prefix: string): { slug: string }[] {
  assertValidContent();
  return visiblePages()
    .filter((page) => page.path.startsWith(`${prefix}/`) && !page.path.slice(prefix.length + 1).includes("/"))
    .map((page) => ({ slug: page.path.slice(prefix.length + 1) }));
}

let validated = false;

/** Fails the build on copy-rule errors; prints warnings once. */
export function assertValidContent() {
  if (validated) return;
  validated = true;
  const { errors, warnings } = validateContentPages(CONTENT_PAGES);
  if (warnings.length && process.env.NODE_ENV !== "test")
    console.warn(`Content warnings (${warnings.length}):\n${warnings.map((w) => `  - ${w}`).join("\n")}`);
  if (errors.length) throw new Error(`Content errors (${errors.length}):\n${errors.map((e) => `  x ${e}`).join("\n")}`);
}
