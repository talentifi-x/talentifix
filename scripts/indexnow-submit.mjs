/**
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver and others) that
 * pages on the site are new or have changed, so they recrawl them promptly
 * instead of waiting for their next routine crawl.
 *
 * IndexNow proves the request comes from the site owner by fetching the key
 * file at https://www.talentifix.com/<KEY>.txt, so that file (in public/) must
 * be deployed before a submission can succeed.
 *
 * Deliberately zero-dependency, like the other scripts here: global fetch only.
 * Safe to re-run; resubmitting unchanged URLs is harmless, but submit only what
 * actually changed once the initial full submission is done.
 *
 * Env:
 *   INDEXNOW_KEY   optional, defaults to the key below
 *   DRY_RUN=true   list the URLs that would be submitted, send nothing
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs                        every URL in the live sitemap
 *   node scripts/indexnow-submit.mjs blog/some-post jobs     specific paths or full URLs
 *   DRY_RUN=true node scripts/indexnow-submit.mjs
 *
 * In Git Bash, write paths without the leading slash (or pass full URLs):
 * Git Bash rewrites "/blog/x" into a Windows file path before Node sees it.
 */

const SITE = "https://www.talentifix.com";
const HOST = new URL(SITE).host;
const KEY = process.env.INDEXNOW_KEY || "dae11665d71d5ec201887ca2b5eb1232";
const DRY_RUN = process.env.DRY_RUN === "true";
const ENDPOINT = "https://api.indexnow.org/indexnow";

// 200 = accepted, 202 = accepted and the key is still being validated.
const RESPONSES = {
  200: "accepted",
  202: "accepted; key validation pending",
  400: "bad request",
  403: "key not valid: is the key file deployed at the keyLocation?",
  422: "URLs do not belong to the host, or key does not match",
  429: "too many requests; try again later",
};

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

function normalise(arg) {
  const url = new URL(arg, `${SITE}/`);
  if (url.host !== HOST) throw new Error(`${arg} is not on ${HOST}`);
  return url.href;
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length ? args.map(normalise) : await sitemapUrls();
  if (urls.length === 0) throw new Error("No URLs to submit.");

  console.log(`${DRY_RUN ? "[dry run] " : ""}Submitting ${urls.length} URL(s) to IndexNow`);
  for (const url of urls) console.log(`  ${url}`);
  if (DRY_RUN) return;

  // The protocol accepts up to 10,000 URLs per request; this site is far below that.
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  console.log(`IndexNow responded ${res.status}: ${RESPONSES[res.status] ?? "unexpected response"}`);
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text();
    if (body) console.log(body.slice(0, 500));
    process.exitCode = 1;
  }
}

// exitCode rather than process.exit(): exiting while fetch sockets are still
// closing trips a libuv assertion on Windows.
main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
