/**
 * Flip `published: true` on blog posts once their scheduled moment has passed.
 *
 * Run on a cron by .github/workflows/publish-scheduled-blogs.yml, but it is a
 * plain script and can be run by hand too.
 *
 * Deliberately zero-dependency: it talks to the Sanity HTTP API with global
 * fetch, so CI needs no `npm install` step and a run takes a few seconds.
 *
 * It is safe to run at any time, any number of times:
 *   - a post whose time has not arrived is skipped
 *   - a post already published is skipped (so re-runs are no-ops, and a post
 *     deliberately unpublished later is not silently resurrected on a re-run
 *     within the same window)
 *
 * Env:
 *   SANITY_API_TOKEN               required, needs write access
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  optional, defaults below
 *   NEXT_PUBLIC_SANITY_DATASET     optional, defaults to production
 *   DRY_RUN=true                   report what would happen, change nothing
 *   FORCE=true                     ignore the schedule and publish everything
 *
 * Usage:
 *   node --env-file=.env.local scripts/publish-scheduled-posts.mjs
 *   DRY_RUN=true node --env-file=.env.local scripts/publish-scheduled-posts.mjs
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wb6i9ign";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const DRY_RUN = process.env.DRY_RUN === "true";
const FORCE = process.env.FORCE === "true";

if (!token) {
  console.error("Missing SANITY_API_TOKEN (needs write access)");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Schedule
//
// `at` is the UTC instant, which is what the comparison uses. `local` is the
// same moment written in IST (UTC+5:30) purely so the intent stays readable.
// Add a row to schedule another post; nothing else needs changing.
// ---------------------------------------------------------------------------

const SCHEDULE = [
  {
    slug: "precision-hiring-future-of-recruitment",
    local: "2026-09-03 05:00 IST",
    at: "2026-09-02T23:30:00Z",
  },
  {
    slug: "return-of-trust-in-hiring",
    local: "2026-09-04 17:00 IST",
    at: "2026-09-04T11:30:00Z",
  },
];

const API = `https://${projectId}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${token}` };

async function query(groq) {
  const res = await fetch(`${API}/data/query/${dataset}?query=${encodeURIComponent(groq)}`, {
    headers: auth,
  });
  if (!res.ok) throw new Error(`query failed: ${res.status} ${await res.text()}`);
  return (await res.json()).result;
}

async function publish(id) {
  const res = await fetch(`${API}/data/mutate/${dataset}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({
      mutations: [{ patch: { id, set: { published: true } } }],
    }),
  });
  if (!res.ok) throw new Error(`mutate failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------------------------------------------------------------------------

const now = new Date();
console.log(`now: ${now.toISOString()}   dataset: ${dataset}`);
if (DRY_RUN) console.log("DRY_RUN: no changes will be written");
if (FORCE) console.log("FORCE: schedule times ignored");
console.log("");

const ids = SCHEDULE.map((s) => `post-${s.slug}`);
const docs = await query(
  `*[_id in [${ids.map((i) => `"${i}"`).join(",")}]]{_id, published, title}`,
);
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));

let published = 0;
let failed = 0;

for (const item of SCHEDULE) {
  const id = `post-${item.slug}`;
  const doc = byId[id];
  const due = FORCE || now >= new Date(item.at);

  if (!doc) {
    console.log(`  MISSING  ${item.slug} - no such document, skipping`);
    failed += 1;
    continue;
  }
  if (doc.published === true) {
    console.log(`  ALREADY  ${item.slug} - already published`);
    continue;
  }
  if (!due) {
    const mins = Math.round((new Date(item.at) - now) / 60000);
    console.log(`  WAITING  ${item.slug} - due ${item.local} (${item.at}), in ${mins} min`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`  WOULD    ${item.slug} - due ${item.local}, would publish now`);
    published += 1;
    continue;
  }

  try {
    await publish(id);
    console.log(`  PUBLISHED ${item.slug} - was due ${item.local}`);
    published += 1;
  } catch (err) {
    console.error(`  FAILED   ${item.slug}: ${err.message}`);
    failed += 1;
  }
}

console.log(`\n${published} published, ${failed} failed.`);
if (failed > 0) process.exit(1);
