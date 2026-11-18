/**
 * Publish the ML engineer hiring guide and add its contextual backlink to the
 * existing role-definition article. Uses the existing Sanity HTTP connection.
 *
 * node scripts/upload-blog-machine-learning-engineer-india.mjs --dry-run
 * node scripts/upload-blog-machine-learning-engineer-india.mjs --dry-run --check-links
 * node scripts/upload-blog-machine-learning-engineer-india.mjs --publish
 *
 * Publishing needs SANITY_API_TOKEN. The manual GitHub Actions workflow uses
 * the repository's existing secret; no credentials are written to this repo.
 * Existing articles are never replaced. The creation and backlink insertion
 * are atomic, and the backlink patch checks the fetched revision.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { post, body, faq, slug, blogPath, relatedSlug, imageAlt, backlinkBlock, textOf, wordCount, readTime } from './content/machine-learning-engineer-india.mjs';

const publish = process.argv.includes('--publish');
assert(!(publish && process.argv.includes('--dry-run')), 'Choose publish or dry-run, not both.');
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wb6i9ign';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
assert.equal(projectId, 'wb6i9ign', 'This publisher is scoped to the TalentiFi-X project.');
assert.equal(dataset, 'production', 'This publisher is scoped to the production dataset.');
const api = `https://${projectId}.api.sanity.io/v2026-03-09`;
const token = process.env.SANITY_API_TOKEN;
const files = [
  { name: `${slug}.webp`, width: 1920, height: 880, field: 'mainImage' },
  { name: `${slug}-social.webp`, width: 1200, height: 630, field: 'shareImage' },
].map((asset) => ({ ...asset, data: readFileSync(new URL(`../Blogs/images/${asset.name}`, import.meta.url)) }));
const links = [...new Set(body.flatMap((item) => (item.markDefs ?? []).map((mark) => mark.href)))];
const text = textOf(body).join('\n');

assert(post.metaTitle.length <= 60, 'SEO title too long.');
assert(post.metaDescription.length >= 120 && post.metaDescription.length <= 155, 'SEO description must be 120-155 characters.');
assert(post.tags.length <= 4, 'Use at most four visible topics.');
assert(!body.some((item) => item.style === 'h1'), 'The template supplies the only H1.');
assert.equal(body.filter((item) => item._type === 'table').length, 4);
assert.equal(faq.length, 8);
assert(imageAlt.length > 20 && imageAlt.length < 200, 'Provide descriptive image alt text.');
assert(!/38 days|38-day|TABLE \d|Web team:|BUTTON:|Summary line/.test(text + JSON.stringify(faq)), 'Editorial notes or unsupported statistic found.');
assert(links.includes('/talent/ai-machine-learning-talent'));
assert(links.includes(`/blog/${relatedSlug}`));
assert(new Set(body.map((item) => item._key)).size === body.length, 'Duplicate body keys.');
let previousLevel = 1;
for (const item of body) {
  if (/^h\d$/.test(item.style ?? '')) {
    const level = Number(item.style[1]);
    assert(level <= previousLevel + 1, 'Heading level skipped.');
    previousLevel = level;
  }
  if (item._type === 'table') {
    assert(item.rows.length >= 2);
    assert(item.rows.every((row) => row.cells.length === item.rows[0].cells.length), 'Uneven table rows.');
  }
  for (const span of item.children ?? []) {
    assert(span.marks.every((mark) => mark === 'strong' || item.markDefs.some((def) => def._key === mark)), 'Unresolved text mark.');
  }
}
for (const asset of files) {
  assert.equal(asset.data.toString('ascii', 0, 4), 'RIFF');
  assert.equal(asset.data.toString('ascii', 8, 12), 'WEBP');
  assert(asset.data.length < 300_000, 'Cover image needs optimization.');
}
console.log(JSON.stringify({ title: post.title, words: wordCount, readTime, h2: body.filter((item) => item.style === 'h2').length, tables: 4, faqs: 8, links: links.length, imageBytes: files.map((asset) => asset.data.length) }, null, 2));

async function request(path, options = {}) {
  const response = await fetch(`${api}${path}`, {
    ...options,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Sanity ${path.split('?')[0]} returned HTTP ${response.status}.`);
  return response.json();
}

if (process.argv.includes('--check-links')) {
  const outcomes = await Promise.allSettled(links.filter((href) => href.startsWith('/')).map(async (href) => {
    const url = new URL(href, 'https://www.talentifix.com');
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assert.equal(response.status, 200, `${href} returned ${response.status}`);
    if (url.hash) {
      const html = await response.text();
      assert(html.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${href}`);
    }
    return href;
  }));
  const failures = outcomes.filter((result) => result.status === 'rejected');
  for (const failure of failures) console.error(failure.reason.message);
  assert.equal(failures.length, 0, 'Fix internal links before publishing.');
  console.log(`Verified ${outcomes.length} internal link destinations.`);
}

if (!publish) {
  console.log('Dry run passed. No assets or documents were uploaded.');
  process.exit(0);
}
assert(token, 'Publishing requires the existing SANITY_API_TOKEN secret.');

const query = `*[_type == "post" && slug.current in ${JSON.stringify([slug, relatedSlug])}]`;
const { result: documents } = await request(`/data/query/${dataset}?perspective=raw&query=${encodeURIComponent(query)}`);
assert(!documents.some((doc) => doc._id.startsWith('drafts.')), 'An editor has a draft for a target article. Resolve that draft before publishing.');
const existing = documents.filter((doc) => doc.slug?.current === slug);
const related = documents.filter((doc) => doc.slug?.current === relatedSlug);
assert(existing.length <= 1 && related.length === 1, 'Unexpected duplicate or missing target article.');
assert(related[0].published !== false, 'The related article is hidden.');
if (existing.length) {
  assert.equal(existing[0]._id, post._id, 'The slug is already used by another document.');
  assert(existing[0].published !== false && existing[0].noindex !== true, 'Existing post was hidden; refusing to republish it.');
  console.log('Guide already exists; preserving all current editorial fields.');
}

const target = related[0];
const hasBacklink = target.body.some((item) => (item.markDefs ?? []).some((mark) => mark.href === blogPath || mark.href === `https://www.talentifix.com${blogPath}`));
const mutations = [];
if (!hasBacklink) {
  assert(!target.body.some((item) => item._key === backlinkBlock._key), 'Backlink key already exists with different content.');
  const section = target.body.findIndex((item) => item.style === 'h2' && item.children?.map((span) => span.text).join('') === 'The Same Problem Exists With "AI Engineer"');
  assert(section >= 0, 'Could not find the intended AI Engineer section.');
  const nextHeading = target.body.findIndex((item, index) => index > section && item.style === 'h2');
  assert(nextHeading > section, 'Could not find the end of the intended section.');
  const afterKey = target.body[nextHeading - 1]._key;
  mutations.push({ patch: {
    id: target._id,
    ifRevisionID: target._rev,
    insert: { after: `body[_key==${JSON.stringify(afterKey)}]`, items: [backlinkBlock] },
  } });
}

if (!existing.length) {
  const imageFields = {};
  for (const file of files) {
    const { document: asset } = await request(`/assets/images/${dataset}?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST', headers: { 'Content-Type': 'image/webp' }, body: file.data,
    });
    assert.equal(asset.metadata.dimensions.width, file.width);
    assert.equal(asset.metadata.dimensions.height, file.height);
    imageFields[file.field] = { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: imageAlt };
  }
  const publishedAt = new Date().toISOString();
  mutations.unshift({ create: { ...post, ...imageFields, body, faq, readTime, publishedAt, lastUpdated: publishedAt } });
}

if (mutations.length) {
  await request(`/data/mutate/${dataset}?visibility=sync`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations }),
  });
  console.log(`Committed ${mutations.length} document changes atomically.`);
} else {
  console.log('Guide and reciprocal article link already exist; no document changes needed.');
}
console.log(`Published article: https://www.talentifix.com${blogPath}`);
