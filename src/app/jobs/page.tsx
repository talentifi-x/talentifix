import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { getAllSanityJobs, type SanityJob } from "@/sanity/lib/queries";

export const metadata = {
  title: "Open Roles",
  description:
    "Join TalentiFi-X. Explore open roles across staffing, business development, and engineering.",
};

export const revalidate = 60;

export default async function JobsPage() {
  let jobs: SanityJob[] = [];
  try {
    jobs = await getAllSanityJobs();
  } catch {
    // Sanity unreachable
  }

  const openJobs = jobs.filter((j) => j.isOpen !== false);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero */}
      <section className="w-full px-6 md:px-14 py-20 lg:py-28 relative overflow-hidden bg-white">
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 text-center">
          <span className="inline-block text-primary font-notch font-bold text-base tracking-widest uppercase border border-primary/30 px-5 py-2 rounded-sm bg-primary/5 w-fit mx-auto">
            Careers
          </span>
          <h1 className="text-[42px] sm:text-[60px] md:text-[80px] lg:text-[110px] leading-none font-bold text-dark font-notch tracking-tight">
            Open Roles<span className="text-secondary">.</span>
          </h1>
          <p className="text-dark/60 font-sans text-lg md:text-2xl max-w-2xl leading-relaxed mt-2 mx-auto">
            Build the future of hiring with us. Human Led · AI Assisted.
          </p>
        </div>
      </section>

      {/* Jobs list */}
      <section className="w-full pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {openJobs.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-dark/50 font-sans text-lg">
                No open roles right now. Check back soon — or send your CV to{" "}
                <a
                  href="mailto:careers@talentifi-x.com"
                  className="text-primary font-bold underline"
                >
                  careers@talentifi-x.com
                </a>
                .
              </p>
            </div>
          )}

          {openJobs.map((job) => (
            <Link
              key={job.slug}
              href={`/jobs/${job.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white rounded-[10px] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  {job.badge && (
                    <span className="bg-primary text-white text-xs font-bold font-notch uppercase tracking-wider px-3 py-1 rounded-sm">
                      {job.badge}
                    </span>
                  )}
                  {job.department && (
                    <span className="text-dark/50 font-sans text-sm">
                      {job.department}
                    </span>
                  )}
                </div>

                <h2 className="text-[24px] md:text-[32px] font-bold font-notch text-dark leading-tight group-hover:text-primary transition-colors">
                  {job.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-dark/60 font-sans text-sm">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </span>
                  )}
                  {job.employmentType && (
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {job.employmentType}
                    </span>
                  )}
                  {job.experience && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      {job.experience}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-notch whitespace-nowrap">
                View Role
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
