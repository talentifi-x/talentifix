import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@lib/seo";

export type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb path (Home > Blog > Post) plus the matching BreadcrumbList
 * structured data. Pass `withSchema={false}` where the page already emits its own
 * BreadcrumbList inside a larger JSON-LD graph.
 */
export function Breadcrumbs({
  items,
  withSchema = true,
  className = "",
}: {
  items: Crumb[];
  withSchema?: boolean;
  className?: string;
}) {
  return (
    <>
      {/* One line: the current page's name is cut short with an ellipsis. Links get a
          44 px tap height (the WCAG target size for touch). */}
      <nav aria-label="Breadcrumb" className={`text-sm font-sans text-dark/60 ${className}`}>
        <ol className="flex items-center gap-x-1.5">
          {items.map((crumb, i) => {
            const last = i === items.length - 1;
            return (
              <li key={crumb.href} className={`flex items-center gap-1.5 ${last ? "min-w-0" : "shrink-0"}`}>
                {i > 0 && <span aria-hidden="true">›</span>}
                {last ? (
                  // min-w-0 lets the name shrink, so a long title never widens the page.
                  <span aria-current="page" className="min-w-0 text-dark/80 truncate md:max-w-md">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((crumb, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: crumb.name,
              item: absoluteUrl(crumb.href),
            })),
          }}
        />
      )}
    </>
  );
}
