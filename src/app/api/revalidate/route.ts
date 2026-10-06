import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { SITE_URL } from "@lib/seo";
import { pingIndexNow } from "@lib/indexnow";

/**
 * Sanity publish webhook: refreshes the affected pages within seconds of a
 * publish (instead of waiting for the next ISR window) and tells IndexNow
 * search engines the URLs changed.
 *
 * Sanity setup (sanity.io/manage > API > Webhooks):
 *   URL         https://www.talentifix.com/api/revalidate
 *   Dataset     production · Trigger on: create, update, delete
 *   Filter      _type in ["post", "job"]
 *   Projection  {_type, "slug": slug.current}
 *   Secret      the same value as SANITY_WEBHOOK_SECRET in Vercel
 */

type Payload = { _type?: string; slug?: string };

/** Pages that render a document of this type, listing pages included. */
function affectedPaths({ _type, slug }: Payload): string[] {
  switch (_type) {
    case "post":
      return ["/blog", ...(slug ? [`/blog/${slug}`] : [])];
    case "job":
      return ["/jobs", ...(slug ? [`/jobs/${slug}`] : [])];
    default:
      return [];
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  // Also waits for Sanity's eventual consistency, so the refreshed pages read the new content.
  const { isValidSignature, body } = await parseBody<Payload>(req, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const paths = body ? affectedPaths(body) : [];
  if (paths.length === 0) {
    return NextResponse.json({ message: "Nothing to revalidate", type: body?._type ?? null });
  }

  for (const path of paths) revalidatePath(path);
  revalidatePath("/sitemap.xml");

  const indexNow = await pingIndexNow(paths.map((path) => `${SITE_URL}${path}`));
  return NextResponse.json({ revalidated: paths, indexNow });
}
