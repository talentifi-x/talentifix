import Image from "next/image";
import Link from "next/link";
import { founderNode } from "@lib/seo";

/** On-site profile: the Leadership section of /about, which carries his Person schema. */
export const FOUNDER_PROFILE_PATH = "/about#leadership";

const linkedIn = founderNode.sameAs.find((url) => url.includes("linkedin.com"));

/**
 * The founder's expert card, shown on posts that draw on his views. It links
 * the article to his profile on /about and to his own site, the same entity
 * the structured data names as the post's contributor.
 */
export function ExpertInsight() {
  return (
    <section
      aria-labelledby="expert-insight"
      className="mt-14 rounded-[10px] border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
    >
      <h2
        id="expert-insight"
        className="font-notch font-bold text-primary text-xs uppercase tracking-wider mb-4"
      >
        Expert insight
      </h2>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        <Link href={FOUNDER_PROFILE_PATH} className="shrink-0" tabIndex={-1} aria-hidden="true">
          <Image
            src="/assets/about/leadership-chet.png"
            alt=""
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-secondary"
          />
        </Link>
        <div className="min-w-0">
          <p className="font-notch font-bold text-dark text-[20px] md:text-[22px] leading-tight">
            <Link href={FOUNDER_PROFILE_PATH} className="hover:text-primary transition-colors">
              {founderNode.name}
            </Link>
          </p>
          <p className="font-sans text-dark/60 text-sm mt-1">Founder, TalentiFi-X</p>
          <p className="font-sans text-dark/70 text-base leading-relaxed mt-3">
            With nearly three decades across staffing, IT services and enterprise technology,
            Chetan has led large-scale talent and technology initiatives for Fortune 500
            organizations. He founded TalentiFi-X to combine AI-assisted speed with experienced
            human judgment.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 mt-4 font-sans text-sm font-medium">
            <li>
              <Link
                href={FOUNDER_PROFILE_PATH}
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-2 hover:opacity-75"
              >
                Full profile
              </Link>
            </li>
            <li>
              <a
                href={founderNode.url}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-2 hover:opacity-75"
              >
                chetanmangalwedhe.com
              </a>
            </li>
            {linkedIn && (
              <li>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center text-primary underline underline-offset-2 hover:opacity-75"
                >
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
