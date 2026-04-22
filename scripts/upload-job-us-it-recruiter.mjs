/**
 * Upload a job posting to Sanity.
 *
 * Usage (Node 20+ required — uses --env-file):
 *   node --env-file=.env scripts/upload-job-us-it-recruiter.mjs
 *
 * Required env vars (already used by the Next.js app):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (must have write/editor access)
 *
 * The script uses `createOrReplace` with a deterministic _id derived from the
 * slug, so running it again updates the same document instead of duplicating.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_TOKEN (needs write access)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-09",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Job posting content
// ---------------------------------------------------------------------------

const job = {
  title: "Senior US IT Recruiter",
  slug: "senior-us-it-recruiter",
  badge: "Now Hiring · Immediate Joiners Preferred",
  isOpen: true,
  location: "Basavanagudi, Bengaluru — On-site",
  employmentType:
    "Full-time | US Night Shift · 6:30 PM – 3:30 AM IST | Mon–Fri",
  experience: "5+ Years Experience",
  department: "US IT Recruitment",
  applyEmail: "careers@talentifi-x.com",

  aboutRole: `TalentiFi-X is looking for a seasoned Senior US IT Recruiter to join our high-performing team in Bengaluru. If you have 5+ years of hands-on experience in US staffing, know your way around C2C, W2, and 1099, and consistently deliver quality IT talent across the US market — this role was built for you.

We work with diverse US clients across cutting-edge tech roles. You'll have strong leadership support, a performance-driven culture, and real room to grow.

Immediate joiners are strongly preferred.`,

  responsibilities: [
    "Manage end-to-end US IT recruitment across C2C, W2, and 1099 engagements",
    "Source, screen, and close candidates across diverse technologies and skill sets",
    "Partner closely with US-based clients and hiring managers to understand role requirements",
    "Build and maintain strong candidate pipelines to ensure consistent, timely closures",
    "Use platforms including Dice, Monster, and LinkedIn Recruiter for active sourcing",
    "Maintain accurate records, track pipeline health, and report on delivery metrics",
  ],

  requirements: [
    "5+ years of proven experience in US IT recruitment",
    "Strong understanding of US staffing tax terms — C2C, W2, 1099",
    "Knowledge of US compliance requirements and staffing regulations",
    "Hands-on experience with Dice, Monster, and LinkedIn Recruiter",
    "Excellent communication and negotiation skills",
    "Ability to work independently and deliver consistently under pressure",
    "Strong relationship-building skills with clients and candidates alike",
  ],

  whoYouAre: `You understand the US market — not just the tools, but the culture, the timelines, and what it takes to close in a competitive environment. You're organised, proactive, and you don't let pipelines go cold. You thrive working nights, you're used to working across time zones, and you take ownership of your numbers.

If that sounds like you — we'd like to meet you.`,

  whyJoinIntro: `TalentiFi-X is built on a simple belief — hiring is a human discipline, accelerated by intelligence. Our Human Led · AI Assisted model means our recruiters work smarter, not just harder. You'll work with a team that takes quality seriously and a leadership team that invests in its people.`,

  whyJoinPoints: [
    "Diverse US clients across technology domains",
    "Cutting-edge and high-demand tech roles",
    "Performance-driven culture with leadership that's accessible",
    "Clear growth path as TalentiFi-X scales in the US market",
    "A team that celebrates closures and supports each other",
  ],

  metaTitle:
    "Senior US IT Recruiter | TalentiFi-X Careers | Bengaluru Night Shift",
  metaDescription:
    "TalentiFi-X is hiring a Senior US IT Recruiter in Bengaluru. 5+ years US staffing experience required. C2C, W2, 1099. Night shift. Immediate joiners preferred. Apply now.",
};

// ---------------------------------------------------------------------------
// Build Sanity document
// ---------------------------------------------------------------------------

const doc = {
  _id: `job-${job.slug}`,
  _type: "job",
  title: job.title,
  slug: { _type: "slug", current: job.slug },
  badge: job.badge,
  isOpen: job.isOpen,
  location: job.location,
  employmentType: job.employmentType,
  experience: job.experience,
  department: job.department,
  applyEmail: job.applyEmail,
  publishedAt: new Date().toISOString(),
  aboutRole: job.aboutRole,
  responsibilities: job.responsibilities,
  requirements: job.requirements,
  whoYouAre: job.whoYouAre,
  whyJoinIntro: job.whyJoinIntro,
  whyJoinPoints: job.whyJoinPoints,
  metaTitle: job.metaTitle,
  metaDescription: job.metaDescription,
};

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

console.log(`Uploading job "${job.title}" to dataset "${dataset}"...`);

try {
  const result = await client.createOrReplace(doc);
  console.log(`✓ Uploaded: ${result._id}`);
  console.log(`  View at: /jobs/${job.slug}`);
} catch (err) {
  console.error("✗ Upload failed:", err.message);
  process.exit(1);
}
