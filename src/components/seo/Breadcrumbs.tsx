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
      <nav aria-label="Breadcrumb" className={`text-sm font-sans text-dark/60 ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((crumb, i) => {
            const last = i === items.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2 min-w-0">
                {i > 0 && <span aria-hidden="true">›</span>}
                {last ? (
                  <span aria-current="page" className="text-dark/80 truncate max-w-[60vw] md:max-w-md">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
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
