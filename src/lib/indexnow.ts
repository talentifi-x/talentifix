import { SITE_URL } from "@lib/seo";

/**
 * IndexNow tells Bing (and Yandex, Seznam, Naver) that URLs changed, so they
 * recrawl now instead of on their next routine visit. The key must match the
 * file served at /<key>.txt (public/). scripts/indexnow-submit.mjs uses the same key.
 */
export const INDEXNOW_KEY = "dae11665d71d5ec201887ca2b5eb1232";
const PRODUCTION_HOST = "www.talentifix.com";

export type IndexNowResult = { status: number | "skipped"; urls: string[] };

/**
 * Submit absolute URLs. Skipped outside production (a preview deployment must
 * not announce its own host) and when there is nothing to send. Never throws:
 * a failed ping must not fail the publish that triggered it.
 */
export async function pingIndexNow(urls: string[]): Promise<IndexNowResult> {
  const host = new URL(SITE_URL).host;
  if (host !== PRODUCTION_HOST || urls.length === 0) return { status: "skipped", urls };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return { status: res.status, urls };
  } catch {
    return { status: 0, urls };
  }
}
