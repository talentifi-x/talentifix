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
  /** Natural pixel size of the file. Reserves layout space so the carousel
   *  does not shift while images load. Any aspect ratio is fine - the
   *  carousel is fixed-height and derives each width automatically. */
  width: number;
  height: number;
};

/**
 * "Conversations Beyond the Stage" carousel on
 * /insights/talentifi-x-gcc-summit-2026.
 *
 * To add a photo: drop the file into /public/gcc and append an entry below.
 * Nothing else needs changing - the carousel adapts to any number of images,
 * keeps a constant scroll speed and stays seamless. The whole section is
 * omitted when this array is empty.
 */
export const gccSummitGallery: GalleryImage[] = [
  {
    src: "/gcc/1.jpg",
    width: 800,
    height: 600,
    alt: "Three members of the TalentiFi-X team in business attire at the GCC Summit 2026 sponsor backdrop in Bengaluru.",
  },
  {
    src: "/gcc/2.jpg",
    width: 1600,
    height: 1200,
    alt: "TalentiFi-X team members in front of the GCC Summit 2026 partner wall, which carries the TalentiFi-X logo alongside other sponsors.",
  },
  {
    src: "/gcc/3.jpg",
    width: 800,
    height: 1066,
    alt: "Two TalentiFi-X delegates wearing event lanyards beside the GCC Summit 2026 sponsor backdrop.",
  },
  {
    src: "/gcc/4.jpg",
    width: 800,
    height: 1066,
    alt: "Three TalentiFi-X delegates at the GCC Summit 2026 backdrop featuring the Government of Karnataka and Karnataka Digital Economy Mission logos.",
  },
  {
    src: "/gcc/5.jpg",
    width: 800,
    height: 1066,
    alt: "Two TalentiFi-X team members at an exhibitor stand on the GCC Summit 2026 floor.",
  },
  {
    src: "/gcc/6.jpg",
    width: 800,
    height: 1066,
    alt: "Two delegates in business attire in front of the GCC Summit 2026 sponsor wall.",
  },
  {
    src: "/gcc/7.jpg",
    width: 1200,
    height: 1600,
    alt: "TalentiFi-X team members on the GCC Summit 2026 exhibition floor in Bengaluru.",
  },
  {
    src: "/gcc/8.jpg",
    width: 1200,
    height: 1600,
    alt: "Four TalentiFi-X team members wearing exhibitor badges at the GCC Summit 2026 sponsor backdrop.",
  },
];
