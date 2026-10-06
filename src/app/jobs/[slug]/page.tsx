import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Mail,
} from "lucide-react";
import {
  getAllSanityJobSlugs,
  getSanityJobBySlug,
  type SanityJobFull,
} from "@/sanity/lib/queries";
import { ApplyButton } from "@/components/jobs/ApplyButton";
import { JsonLd } from "@components/seo/JsonLd";
import {
  ORG_ID,
  SITE_NAME,
  SITE_URL,
  buildDescription,
  buildTitle,
  isRemote,
  jsonLdGraph,
  pageMetadata,
  toEmploymentTypes,
  toJobLocation,
} from "@lib/seo";
import { Breadcrumbs } from "@components/seo/Breadcrumbs";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  try {
    const slugs = await getAllSanityJobSlugs();
    return slugs.filter((s) => !!s.slug).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  // Errors are not caught: a Sanity outage must not be cached as "Role Not Found".
  const job = await getSanityJobBySlug(slug);
  if (!job || job.isOpen === false) {
    return { title: "Role Not Found", robots: { index: false, follow: true } };
  }
  // buildTitle appends the brand only when it fits, so "Careers" is used as the
  // qualifier instead of a second "| TalentiFi-X".
  const description = buildDescription(
    job.metaDescription,
    job.aboutRole ??
      `Open role at ${SITE_NAME}: ${job.title}${job.location ? ` in ${job.location}` : ""}.`,
  );
  return pageMetadata({
    title: buildTitle(job.metaTitle, `${job.title} - Careers`),
    description,
    path: `/jobs/${slug}`,
  });
}

/**
 * JobPosting structured data - the entry ticket for Google Jobs.
 *
 * `validThrough` is deliberately omitted: inventing an expiry date would make
 * Google drop live roles. Open postings simply stay live until removed from the CMS.
 */
function buildJobSchema(job: SanityJobFull, slug: string) {
  const pageUrl = `${SITE_URL}/jobs/${slug}`;

  // Google wants a substantive description; assemble one from the role's own copy.
  const descriptionParts = [
    job.aboutRole,
    job.responsibilities?.length
      ? `What you'll do: ${job.responsibilities.join(" ")}`
      : null,
    job.requirements?.length
      ? `What we're looking for: ${job.requirements.join(" ")}`
      : null,
  ].filter(Boolean);

  const employmentTypes = toEmploymentTypes(job.employmentType);
  const location = toJobLocation(job.location);
  const remote = isRemote(job.location, job.employmentType);

  return jsonLdGraph(
    {
      "@type": "JobPosting",
      "@id": `${pageUrl}#jobposting`,
      title: job.title,
      description:
        descriptionParts.join(" ") || `Open role at ${SITE_NAME}: ${job.title}.`,
      url: pageUrl,
      ...(job.publishedAt ? { datePosted: job.publishedAt } : {}),
      ...(employmentTypes ? { employmentType: employmentTypes } : {}),
      ...(job.department ? { industry: job.department } : {}),
      ...(job.experience ? { experienceRequirements: job.experience } : {}),
      hiringOrganization: { "@id": ORG_ID },
      ...(location ? { jobLocation: location } : {}),
      ...(remote
        ? {
            jobLocationType: "TELECOMMUTE",
            applicantLocationRequirements: {
              "@type": "Country",
              name: "India",
            },
          }
        : {}),
      directApply: true,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: `${SITE_URL}/jobs`,
        },
        { "@type": "ListItem", position: 3, name: job.title, item: pageUrl },
      ],
    },
  );
}

export default async function JobPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  // A fetch error is left to throw: with ISR the last good copy stays online,
  // whereas swallowing it would cache a 404 for a live role.
  const job = await getSanityJobBySlug(slug);

  // Closed roles 404 so Google drops their JobPosting (see getAllSanityJobSlugs).
  if (!job || job.isOpen === false) notFound();

  const applyEmail = job.applyEmail ?? "careers@talentifi-x.com";

  return (
    <div className="w-full bg-white min-h-screen">
      <JsonLd data={buildJobSchema(job, slug)} />

      {/* Hero */}
      <section className="w-full px-6 md:px-14 pt-10 pb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 ">
          {/* Schema is already in the page's JSON-LD graph, so the visible path only. */}
          <Breadcrumbs
            withSchema={false}
            items={[
              { name: "Home", href: "/" },
              { name: "Careers", href: "/jobs" },
              { name: job.title, href: `/jobs/${slug}` },
            ]}
          />
          {job.badge && (
            <span className="inline-block text-primary font-notch font-bold text-base tracking-widest uppercase border border-primary/30 px-5 py-2 rounded-sm bg-primary/5 w-fit">
              {job.badge}
            </span>
          )}

          <h1 className="text-[36px] sm:text-[52px] md:text-[64px] leading-[1.05] font-bold text-dark font-notch tracking-tight">
            {job.title}
            <span className="text-secondary">.</span>
          </h1>

          {/* Quick info strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-dark/70 font-sans text-base border-y border-gray-100 py-5">
            {job.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                {job.employmentType}
              </span>
            )}
            {job.experience && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {job.experience}
              </span>
            )}
            {job.department && (
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                {job.department}
              </span>
            )}
          </div>

          <div>
            <ApplyButton jobTitle={job.title} jobSlug={job.slug} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full px-6 md:px-14 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          {job.aboutRole && (
            <Block title="About the Role">
              <Paragraphs text={job.aboutRole} />
            </Block>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <Block title="What You'll Do">
              <BulletList items={job.responsibilities} />
            </Block>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <Block title="What We're Looking For">
              <BulletList items={job.requirements} />
            </Block>
          )}

          {job.whoYouAre && (
            <Block title="Who You Are">
              <Paragraphs text={job.whoYouAre} />
            </Block>
          )}

          {(job.whyJoinIntro ||
            (job.whyJoinPoints && job.whyJoinPoints.length > 0)) && (
            <Block title="Why TalentiFi-X">
              {job.whyJoinIntro && <Paragraphs text={job.whyJoinIntro} />}
              {job.whyJoinPoints && job.whyJoinPoints.length > 0 && (
                <div className="mt-4">
                  <p className="text-dark/70 font-sans text-lg leading-relaxed mb-3">
                    What you&apos;ll find here:
                  </p>
                  <BulletList items={job.whyJoinPoints} />
                </div>
              )}
            </Block>
          )}

          {/* Apply footer */}
          <Block title="Apply for This Role">
            <p className="text-dark/70 font-sans text-lg leading-relaxed">
              Send your updated CV and a brief note on why this role is the
              right fit for you.
            </p>
            <a
              href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
              className="inline-flex min-h-11 items-center gap-2 text-primary font-bold font-notch text-base mt-2"
            >
              <Mail className="w-5 h-5" />
              {applyEmail}
            </a>
            <p className="text-dark/50 font-sans text-sm mt-4">
              We review every application. If your profile is a strong match,
              our team will reach out within 5 business days.
            </p>
            <div className="mt-6">
              <ApplyButton jobTitle={job.title} jobSlug={job.slug} />
            </div>
          </Block>

          {/* Tag line */}
          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-dark/50 font-sans text-sm">
              TalentiFi-X · Human Led · AI Assisted ·{" "}
              <Link
                href="/"
                className="hover:text-primary transition-colors"
              >
                talentifix.com
              </Link>
            </p>
          </div>

          {/* Back to roles */}
          <Link
            href="/jobs"
            className="inline-flex min-h-11 items-center gap-2 text-dark/60 hover:text-primary font-sans text-sm transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to open roles
          </Link>
        </div>
      </section>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[24px] md:text-[32px] font-bold font-notch text-dark leading-tight">
        {title}
        <span className="text-secondary">.</span>
      </h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function Paragraphs({ text }: { text: string }) {
  const paras = text.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          className="text-dark/70 font-sans text-lg leading-relaxed whitespace-pre-line [&:not(:first-child)]:mt-4"
        >
          {p}
        </p>
      ))}
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-dark/70 font-sans text-lg leading-relaxed"
        >
          <span className="text-primary font-bold shrink-0 mt-0.5">-</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
