/**
 * Upload a job posting to Sanity.
 *
 * Usage (Node 20+ required — uses --env-file):
 *   node --env-file=.env.local scripts/upload-job.mjs
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
  title: "Senior Manager – Business Development",
  slug: "senior-manager-business-development",
  badge: "Now Hiring",
  isOpen: true,
  location: "Bengaluru, India — On-site",
  employmentType: "Full-time | Day Shift",
  experience: "10+ Years Experience",
  department: "Domestic Staffing & Staff Augmentation",
  applyEmail: "careers@talentifi-x.com",

  aboutRole: `TalentiFi-X is growing — and we're looking for a high-impact Senior Manager – Business Development to lead our growth across India's staffing market.

This is a role for someone who knows how to open doors, build relationships, and close. If you have a decade of experience in staffing sales, an established network in India's enterprise ecosystem, and the drive to build something meaningful — we'd like to talk.`,

  responsibilities: [
    "Drive new business acquisition across domestic staffing and staff augmentation",
    "Own the full sales lifecycle — from lead generation and pitching to closure and collections",
    "Build lasting relationships with procurement, sourcing, and leadership stakeholders",
    "Identify and manage RFP / RFI / RFQ opportunities end-to-end",
    "Lead market research, cold outreach, and strategic lead-generation initiatives",
    "Represent TalentiFi-X at industry forums, webinars, and networking events",
    "Engage CXOs and key decision-makers to establish TalentiFi-X as a preferred staffing partner",
    "Manage pipeline health, drive consistent follow-ups, and hit revenue targets",
    "Enable Tier-1 vendor onboarding with mid to large enterprise and Fortune 1000 clients",
  ],

  requirements: [
    "Proven BD / Inside Sales track record within staffing",
    "Strong background in Domestic Staffing / Staff Augmentation",
    "Hands-on experience in lead generation, cold calling, and enterprise sales",
    "Familiarity with RFP / RFI / RFQ processes",
    "Excellent communication, negotiation, and stakeholder management",
    "A demonstrated ability to achieve and scale revenue consistently",
  ],

  whoYouAre: `You're not waiting for leads to come to you. You have a hunter mindset, an established network in India's staffing ecosystem, and you thrive in environments where performance is visible and rewarded. You've worked with mid to large enterprise clients and you know what it takes to get to a Fortune 1000 vendor list — and stay on it.`,

  whyJoinIntro: `We're not a traditional staffing company. TalentiFi-X was built on a single belief — that the best hiring outcomes come from human judgment, accelerated by intelligence. Our Human Led · AI Assisted model means you'll be working with a team that combines deep talent expertise with smart systems.`,

  whyJoinPoints: [
    "A high-performance, target-driven culture",
    "Direct access to leadership and decision-makers",
    "Real growth opportunities as the company scales",
    "Work that matters — helping India's best companies find their best people",
  ],

  metaTitle:
    "Senior Manager – Business Development | TalentiFi-X Careers | Bengaluru",
  metaDescription:
    "TalentiFi-X is hiring a Senior Manager – Business Development in Bengaluru. 10+ years in domestic staffing and enterprise sales required. Apply now.",
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
