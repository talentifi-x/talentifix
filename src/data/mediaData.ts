export type PressItem = {
  id: string;
  /** Editorial category shown on the left of the card meta row. */
  tag: string;
  /** Publication / platform shown on the right of the card meta row. */
  source: string;
  /** Short pull phrase rendered inside the card thumbnail. */
  kicker: string;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
  /** Human readable date shown on the card. */
  date: string;
  /** ISO date for the <time> element. */
  dateTime: string;
};

/**
 * Press / industry-presence items, newest first.
 * Titles and excerpts summarise the linked posts - do not add claims,
 * quotes or named individuals that are not present in the source post.
 */
export const pressItems: PressItem[] = [
  {
    id: "gcc-summit-2026-defined-by-what-they-own",
    tag: "Perspective",
    source: "LinkedIn",
    kicker: "Trusted to own",
    title: "The Next Generation of GCCs Won't Be Defined by Location",
    excerpt:
      "Reflections from GCC Summit 2026 in Bengaluru on why capability centers are increasingly measured by strategic impact rather than cost efficiency - and why judgment and domain depth still matter in AI-shaped work.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7486126627379179520",
    cta: "Read on LinkedIn",
    date: "23 July 2026",
    dateTime: "2026-07-23",
  },
  {
    id: "gcc-summit-2026-three-themes",
    tag: "Event Notes",
    source: "LinkedIn",
    kicker: "AI. Ownership. Innovation.",
    title: "Three Themes That Ran Through GCC Summit 2026",
    excerpt:
      "AI will accelerate capability, ownership will define leadership, and innovation will define the next generation of GCCs - the threads that kept surfacing across conversations at the Summit.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7485174601551912960",
    cta: "Read on LinkedIn",
    date: "21 July 2026",
    dateTime: "2026-07-21",
  },
  {
    id: "gcc-summit-2026-talent-is-the-differentiator",
    tag: "Talent Strategy",
    source: "LinkedIn",
    kicker: "Talent is the differentiator",
    title: "Technology Is Changing Rapidly. The Differentiator Isn't.",
    excerpt:
      "As AI becomes embedded across every organisation, the focus shifts from technology adoption to building teams that combine technical expertise with judgment, ownership and business understanding.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7483964783088828416",
    cta: "Read on LinkedIn",
    date: "17 July 2026",
    dateTime: "2026-07-17",
  },
  {
    id: "gcc-summit-2026-beyond-cost-arbitrage",
    tag: "GCC Ecosystem",
    source: "LinkedIn",
    kicker: "Beyond cost arbitrage",
    title: "India's GCC Story Has Moved Beyond Cost Arbitrage",
    excerpt:
      "One of the strongest themes at GCC Summit 2026: the future won't belong to the largest capability centers, it will belong to the ones building the strongest capabilities.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7483944019203379200",
    cta: "Read on LinkedIn",
    date: "17 July 2026",
    dateTime: "2026-07-17",
  },
];

export type GalleryImage = {
  /** Path under /public, e.g. /media/gcc-summit-2026/talentifi-x-...-01.webp */
  src: string;
  /**
   * Descriptive alt text. Only name an individual or company where the
   * identity has been confirmed by the TalentiFi-X team.
   */
  alt: string;
  /** Optional visible caption, same identity rule as alt text. */
  caption?: string;
};

/**
 * "Conversations Beyond the Stage" gallery.
 * Add 6–8 approved event photographs here and the gallery section on
 * /insights/talentifi-x-gcc-summit-2026 renders automatically. While this
 * array is empty the section is omitted rather than shown with placeholders.
 */
export const gccSummitGallery: GalleryImage[] = [];
