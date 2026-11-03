import Link from "next/link";
import { resolveHref } from "@data/content";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = "text-primary font-medium underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors";

/**
 * Plain copy with inline links written as [label](href). Internal links go
 * through `resolveHref`, so a link to a page that is not live falls back to its
 * catalog fallback or renders as plain text; external links open in a new tab.
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    if (href.startsWith("https://")) {
      parts.push(
        <a key={start} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>,
      );
    } else {
      const target = resolveHref(href);
      parts.push(
        target ? (
          <Link key={start} href={target} className={linkClass}>
            {label}
          </Link>
        ) : (
          label
        ),
      );
    }
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
