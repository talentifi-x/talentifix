export type CoverageItem = {
  id: string;
  /** Publication or platform name, shown as the card heading. */
  publication: string;
  /** Badge text: the PR tracker's type for press pieces, a topic tag for our LinkedIn posts. */
  type: string;
  /** The published headline. */
  title: string;
  href: string;
  /** Link label; defaults to "Read on {publication}". */
  cta?: string;
  date: string;
  dateTime: string;
  /** The article's own share image, saved locally (800x450 webp). */
  image: string;
  imageAlt: string;
};

export type PublicationLogo = { src: string; width: number; height: number };

/**
 * Publication logos for the press cards, keyed by CoverageItem.publication.
 * Taken from each publication's own site (Wikimedia Commons for NDTV, Hindustan
 * Times and LinkedIn); the Analytics Insight and CXO Xperts marks were recoloured
 * dark because the originals are white.
 */
export const publicationLogos: Record<string, PublicationLogo> = {
  "Adgully": { src: "/media/press/logos/adgully.webp", width: 165, height: 55 },
  "Analytics Insight": { src: "/media/press/logos/analytics-insight.webp", width: 300, height: 40 },
  "Business Standard": { src: "/media/press/logos/business-standard.webp", width: 389, height: 41 },
  "Business Today": { src: "/media/press/logos/business-today.webp", width: 525, height: 59 },
  "CXO Herald": { src: "/media/press/logos/cxo-herald.webp", width: 269, height: 53 },
  "CXO Today": { src: "/media/press/logos/cxo-today.webp", width: 253, height: 61 },
  "CXO Xperts": { src: "/media/press/logos/cxo-xperts.webp", width: 160, height: 64 },
  "Hindustan Times": { src: "/media/press/logos/hindustan-times.svg", width: 460, height: 59 },
  "Deccan Herald": { src: "/media/press/logos/deccan-herald.webp", width: 803, height: 63 },
  "HR Today": { src: "/media/press/logos/hr-today.svg", width: 321, height: 59 },
  "India Today": { src: "/media/press/logos/india-today.svg", width: 244, height: 30 },
  "LinkedIn": { src: "/media/press/logos/linkedin.svg", width: 291, height: 79 },
  "Lokmat Times": { src: "/media/press/logos/lokmat-times.webp", width: 613, height: 64 },
  "NDTV": { src: "/media/press/logos/ndtv.svg", width: 250, height: 52 },
  "Rediff": { src: "/media/press/logos/rediff.svg", width: 150, height: 43 },
  "Sugermint": { src: "/media/press/logos/sugermint.webp", width: 319, height: 64 },
  "The Hans India": { src: "/media/press/logos/hans-india.webp", width: 331, height: 64 },
  "The Week": { src: "/media/press/logos/the-week.webp", width: 224, height: 64 },
};

/**
 * Press coverage, newest first, from "Master Tracker Talentifix - 2026 Coverages"
 * (rows with a live coverage link). Each link was checked to name TalentiFi-X or
 * Chetan Mangalwedhe; The Week, NDTV and HR Today block automated checks and
 * were confirmed by hand on 5 Oct 2026. Sugermint blocks automated checks too; it
 * was confirmed through a reader proxy on 22 Oct 2026. LinkedIn reshares of
 * pieces already listed here are left out.
 *
 * Lokmat Times and Deccan Herald were added to match chetanmangalwedhe.com/media.
 * The Lokmat piece is a scanned e-paper page, so it cannot be text-checked, and
 * the Deccan Herald story (4141033) does not name TalentiFi-X or Chetan in its
 * online text.
 *
 * TalentiFi-X's own LinkedIn posts from GCC Summit 2026 sit in the same list by
 * date. Their titles summarise the posts: do not add claims, quotes or named
 * individuals that are not in the source post.
 */
export const pressCoverage: CoverageItem[] = [
  {
    id: "analytics-insight-human-ai-workforce",
    publication: "Analytics Insight",
    type: "Authored Article",
    title: "The Human-AI Workforce: What Should Companies Automate, and What Should They Never Automate?",
    href: "https://www.analyticsinsight.net/artificial-intelligence/the-human-ai-workforce-what-should-companies-automate-and-what-should-they-never-automate",
    date: "19 October 2026",
    dateTime: "2026-10-19",
    image: "/media/press/analytics-insight-human-ai-workforce.webp",
    imageAlt: "A humanoid robot seated in a row of job candidates waiting for interviews",
  },
  {
    id: "the-week-unhireable-candidate",
    publication: "The Week",
    type: "Authored Article",
    title: "The rise of the 'unhireable' candidate: When good professionals don't fit recruitment filters",
    href: "https://www.theweek.in/news/biz-tech/2026/10/12/the-rise-of-the-unhireable-candidate-when-good-professionals-dont-fit-recruitment-filters.html",
    date: "12 October 2026",
    dateTime: "2026-10-12",
    image: "/media/press/the-week-unhireable-candidate.webp",
    imageAlt: "A job seeker resting their head on a desk beside a laptop that reads Job Search",
  },
  {
    id: "lokmat-times-entry-level-jobs",
    publication: "Lokmat Times",
    type: "Print Column",
    title: "Entry-Level Jobs Are Disappearing. What Will Freshers Do Instead?",
    href: "https://epaper.lokmat.com/lokmattimes/main-editions/Nagpur%20Main/2026-09-27/11",
    cta: "Read the e-paper",
    date: "27 September 2026",
    dateTime: "2026-09-27",
    image: "/media/press/lokmat-times-entry-level-jobs.webp",
    imageAlt: "Young graduates waiting on a row of chairs in a long corridor",
  },
  {
    id: "business-today-non-english-speaking-executives",
    publication: "Business Today",
    type: "Industry Story",
    title: "BT Big Story: Why India Inc is warming up to non-English-speaking executives",
    href: "https://www.businesstoday.in/jobs/story/bt-big-story-why-india-inc-is-warming-up-to-non-english-speaking-executives-557092-2026-09-23",
    date: "23 September 2026",
    dateTime: "2026-09-23",
    image: "/media/press/business-today-non-english-speaking-executives.webp",
    imageAlt: "A leader speaking with a team of Indian professionals around a meeting table",
  },
  {
    id: "business-standard-ai-agents-safety",
    publication: "Business Standard",
    type: "Industry Story",
    title: "As AI agents grow more autonomous, India faces a safety-regulation test",
    href: "https://www.business-standard.com/technology/tech-news/ai-agents-safety-india-guardrails-frontier-models-hugging-face-openai-126092301026_1.html",
    date: "23 September 2026",
    dateTime: "2026-09-23",
    image: "/media/press/business-standard-ai-agents-safety.webp",
    imageAlt: "A network of AI agent icons connected to a central hub",
  },
  {
    id: "india-today-forward-deployed-engineers",
    publication: "India Today",
    type: "Industry Story",
    title: "The next AI job is not just coding: Meet the engineers who solve people problems",
    href: "https://www.indiatoday.in/jobs/story/fde-jobs-in-india-forward-deployed-engineers-ai-jobs-with-business-coding-skills-educ-2994960-2026-09-15",
    date: "15 September 2026",
    dateTime: "2026-09-15",
    image: "/media/press/india-today-forward-deployed-engineers.webp",
    imageAlt: "Engineers and business colleagues discussing a system diagram in an office",
  },
  {
    id: "cxo-herald-new-war-for-talent",
    publication: "CXO Herald",
    type: "Interview",
    title: "The New War for Talent Is Not About Hiring More People. It Is About Hiring People Who Multiply",
    href: "https://cxoherald.com/interview-the-new-war-for-talent-is-not-about-hiring-more-people-it-is-about-hiring-people-who-multiply/",
    date: "15 September 2026",
    dateTime: "2026-09-15",
    image: "/media/press/cxo-herald-new-war-for-talent.webp",
    imageAlt: "Chetan Mangalwedhe, founder and CEO of TalentiFi-X",
  },
  {
    id: "business-standard-global-tech-layoffs",
    publication: "Business Standard",
    type: "Industry Story",
    title: "From Oracle to Amazon: Tech giants drive global wave of layoffs in 2026",
    href: "https://www.business-standard.com/industry/news/global-tech-layoffs-2026-oracle-amazon-dell-uber-paypal-it-sector-job-cuts-126091100188_1.html",
    date: "11 September 2026",
    dateTime: "2026-09-11",
    image: "/media/press/business-standard-global-tech-layoffs.webp",
    imageAlt: "A hand moving a wooden puzzle piece with a person icon away from the others",
  },
  {
    id: "deccan-herald-ai-layoffs-rehire",
    publication: "Deccan Herald",
    type: "Industry Story",
    title: "AI layoffs are coming back to haunt companies: 30% may rehire workers by 2029",
    href: "https://www.deccanherald.com/business/jobs-and-careers/ai-layoffs-are-coming-back-to-haunt-companies-30-may-rehire-workers-by-2029-4141033",
    date: "10 September 2026",
    dateTime: "2026-09-10",
    image: "/media/press/deccan-herald-ai-layoffs-rehire.webp",
    imageAlt: "An empty modern office with rows of unoccupied desks and chairs",
  },
  {
    id: "ndtv-middle-class-career-ladder",
    publication: "NDTV",
    type: "Industry Story",
    title: "Middle-Class Career Ladder Is Changing: What Happens When AI Takes Over Entry-Level Work",
    href: "https://www.ndtv.com/business-news/middle-class-career-ladder-changing-what-happens-when-artificial-intelligence-takes-over-entry-level-job-11995505",
    date: "3 September 2026",
    dateTime: "2026-09-03",
    image: "/media/press/ndtv-middle-class-career-ladder.webp",
    imageAlt: "Illustration of robots climbing a career ladder as an office worker falls from it",
  },
  {
    id: "hindustan-times-hiring-reset",
    publication: "Hindustan Times",
    type: "Authored Article",
    title: "India Inc's hiring reset is showing up on the balance sheet",
    href: "https://www.hindustantimes.com/ht-insight/economy/india-inc-s-hiring-reset-is-showing-up-on-the-balance-sheet-101787998487133.html",
    date: "29 August 2026",
    dateTime: "2026-08-29",
    image: "/media/press/hindustan-times-hiring-reset.webp",
    imageAlt: "A hand holding an Indian flag in front of rising green arrows",
  },
  {
    id: "rediff-ai-rejecting-your-cv",
    publication: "Rediff",
    type: "Authored Article",
    title: "Is AI Rejecting Your CV? 9 Mistakes To Avoid",
    href: "https://www.rediff.com/getahead/report/is-ai-rejecting-your-cv-9-mistakes-to-avoid/20260813.htm",
    date: "13 August 2026",
    dateTime: "2026-08-13",
    image: "/media/press/rediff-ai-rejecting-your-cv.webp",
    imageAlt: "A young professional working on a laptop at home",
  },
  {
    id: "adgully-ai-biggest-risk",
    publication: "Adgully",
    type: "Industry Story",
    title: "AI's biggest risk? The scale of a mistake",
    href: "https://www.adgully.com/post/19071/ais-biggest-risk-the-scale-of-a-mistake",
    date: "10 August 2026",
    dateTime: "2026-08-10",
    image: "/media/press/adgully-ai-biggest-risk.webp",
    imageAlt: "A robot and a professional facing each other across a set of balance scales",
  },
  {
    id: "ndtv-learning-free-online",
    publication: "NDTV",
    type: "Industry Story",
    title: "Learning Is Free Online, So Why Are Parents Paying Lakhs For Education?",
    href: "https://www.ndtv.com/business-news/learning-is-free-online-so-why-is-education-costlier-than-ever-11877260",
    date: "9 August 2026",
    dateTime: "2026-08-09",
    image: "/media/press/ndtv-learning-free-online.webp",
    imageAlt: "A child attending an online class on a laptop at home",
  },
  {
    id: "the-week-ai-gen-z-job-market",
    publication: "The Week",
    type: "Industry Story",
    title: "From IT to construction: How AI is reshaping India's job market for Gen Z",
    href: "https://www.theweek.in/magazine/theweek/specials/2026/08/08/from-it-to-construction-how-ai-is-reshaping-indias-job-market-for-gen-z.html",
    date: "8 August 2026",
    dateTime: "2026-08-08",
    image: "/media/press/the-week-ai-gen-z-job-market.webp",
    imageAlt: "Illustration of a long queue of young job seekers outside a government building",
  },
  {
    id: "hans-india-students-job-market",
    publication: "The Hans India",
    type: "Authored Article",
    title: "What students should know before entering the job market",
    href: "https://www.thehansindia.com/hans/education-careers/what-students-should-know-before-entering-the-job-market-1103472",
    date: "31 July 2026",
    dateTime: "2026-07-31",
    image: "/media/press/hans-india-students-job-market.webp",
    imageAlt: "Young professionals working on laptops in front of a wall of puzzle pieces",
  },
  {
    id: "sugermint-rebuilding-hiring-ai-age",
    publication: "Sugermint",
    type: "Interview",
    title: "Rebuilding Hiring for the AI Age: Interview with Chetan Mangalwedhe, Founder & CEO of TalentiFi-X",
    href: "https://sugermint.com/chetan-mangalwedhe-talentifi-x-interview/",
    date: "28 July 2026",
    dateTime: "2026-07-28",
    image: "/media/press/sugermint-rebuilding-hiring-ai-age.webp",
    imageAlt: "Chetan Mangalwedhe, founder and CEO of TalentiFi-X",
  },
  {
    id: "gcc-summit-2026-defined-by-what-they-own",
    publication: "LinkedIn",
    type: "Perspective",
    title: "The Next Generation of GCCs Won't Be Defined by Location",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7486126627379179520",
    date: "23 July 2026",
    dateTime: "2026-07-23",
    image: "/media/press/gcc-summit-2026-defined-by-what-they-own.webp",
    imageAlt: "TalentiFi-X named Delegate Experience Sponsor at GCC Summit 2026, Bengaluru",
  },
  {
    id: "gcc-summit-2026-three-themes",
    publication: "LinkedIn",
    type: "Event Notes",
    title: "Three Themes That Ran Through GCC Summit 2026",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7485174601551912960",
    date: "21 July 2026",
    dateTime: "2026-07-21",
    image: "/media/press/gcc-summit-2026-three-themes.webp",
    imageAlt: "The TalentiFi-X team at the GCC Summit 2026 media wall in Bengaluru",
  },
  {
    id: "gcc-summit-2026-talent-is-the-differentiator",
    publication: "LinkedIn",
    type: "Talent Strategy",
    title: "Technology Is Changing Rapidly. The Differentiator Isn't.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7483964783088828416",
    date: "17 July 2026",
    dateTime: "2026-07-17",
    image: "/media/press/gcc-summit-2026-talent-is-the-differentiator.webp",
    imageAlt: "TalentiFi-X team members with a fellow delegate at GCC Summit 2026, Bengaluru",
  },
  {
    id: "gcc-summit-2026-beyond-cost-arbitrage",
    publication: "LinkedIn",
    type: "GCC Ecosystem",
    title: "India's GCC Story Has Moved Beyond Cost Arbitrage",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7483944019203379200",
    date: "17 July 2026",
    dateTime: "2026-07-17",
    image: "/media/press/gcc-summit-2026-beyond-cost-arbitrage.webp",
    imageAlt: "Two members of the TalentiFi-X team at GCC Summit 2026, Bengaluru",
  },
  {
    id: "business-standard-sovereign-ai-talent-pyramid",
    publication: "Business Standard",
    type: "Industry Story",
    title: "Beyond AI engineers: Sovereign AI may redefine India's IT talent pyramid",
    href: "https://www.business-standard.com/technology/artificial-intelligence/beyond-ai-engineers-sovereign-ai-may-redefine-india-s-it-talent-pyramid-126063000144_1.html",
    date: "30 June 2026",
    dateTime: "2026-06-30",
    image: "/media/press/business-standard-sovereign-ai-talent-pyramid.webp",
    imageAlt: "The words Artificial Intelligence above silhouettes of people working at desks",
  },
  {
    id: "cxo-xperts-hiring-right-talent",
    publication: "CXO Xperts",
    type: "Interview",
    title: "The XPERT Talks: The Future of AI-Powered Hiring with Chetan Mangalwedhe",
    href: "https://www.youtube.com/watch?v=z_ioiiUn_28",
    cta: "Watch on YouTube",
    date: "30 June 2026",
    dateTime: "2026-06-30",
    image: "/media/press/cxo-xperts-hiring-right-talent.webp",
    imageAlt: "The XPERT Talks video thumbnail featuring Chetan Mangalwedhe of TalentiFi-X",
  },
  {
    id: "the-week-limits-of-algorithmic-hiring",
    publication: "The Week",
    type: "Authored Article",
    title: "The limits of algorithmic hiring: Why AI cannot judge human potential",
    href: "https://www.theweek.in/news/biz-tech/2026/06/26/guest-opinion-ai-hiring-challenges.html",
    date: "26 June 2026",
    dateTime: "2026-06-26",
    image: "/media/press/the-week-limits-of-algorithmic-hiring.webp",
    imageAlt: "Two colleagues reviewing a laptop and clipboard against a backdrop of AI graphics",
  },
  {
    id: "hr-today-duplicate-intelligence",
    publication: "HR Today",
    type: "Authored Article",
    title: "Why Artificial Intelligence Should Be Renamed \"Duplicate Intelligence\"",
    href: "https://hrtoday.in/insights/why-artificial-intelligence-should-be-renamed-duplicate-intelligence/",
    date: "24 June 2026",
    dateTime: "2026-06-24",
    image: "/media/press/hr-today-duplicate-intelligence.webp",
    imageAlt: "HR Today banner for Duplicate Intelligence, with a photo of Chetan Mangalwedhe",
  },
  {
    id: "cxo-today-trust-in-ai-workflows",
    publication: "CXO Today",
    type: "Interview",
    title: "Building Trust in AI Workflows: TalentiFi-X's Blueprint for Modern Enterprise Hiring",
    href: "https://cxotoday.com/corner-office/building-trust-in-ai-workflows-talentifi-xs-blueprint-for-modern-enterprise-hiring/",
    date: "10 June 2026",
    dateTime: "2026-06-10",
    image: "/media/press/cxo-today-trust-in-ai-workflows.webp",
    imageAlt: "Chetan Mangalwedhe, founder and CEO of TalentiFi-X",
  },
  {
    id: "hr-today-amoral-drift",
    publication: "HR Today",
    type: "Authored Article",
    title: "Amoral Drift: The AI Hiring Risk Nobody in Talent Acquisition Is Talking About",
    href: "https://hrtoday.in/insights/amoral-drift-the-ai-hiring-risk-nobody-in-talent-acquisition-is-talking-about/",
    date: "29 May 2026",
    dateTime: "2026-05-29",
    image: "/media/press/hr-today-amoral-drift.webp",
    imageAlt: "HR Today banner for Amoral Drift, with a photo of Chetan Mangalwedhe",
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
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-1.jpg",
    width: 800,
    height: 600,
    alt: "Three members of the TalentiFi-X team in business attire at the GCC Summit 2026 sponsor backdrop in Bengaluru.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-2.jpg",
    width: 1600,
    height: 1200,
    alt: "TalentiFi-X team members in front of the GCC Summit 2026 partner wall, which carries the TalentiFi-X logo alongside other sponsors.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-3.jpg",
    width: 800,
    height: 1066,
    alt: "Two TalentiFi-X delegates wearing event lanyards beside the GCC Summit 2026 sponsor backdrop.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-4.jpg",
    width: 800,
    height: 1066,
    alt: "Three TalentiFi-X delegates at the GCC Summit 2026 backdrop featuring the Government of Karnataka and Karnataka Digital Economy Mission logos.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-5.jpg",
    width: 800,
    height: 1066,
    alt: "Two TalentiFi-X team members at an exhibitor stand on the GCC Summit 2026 floor.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-6.jpg",
    width: 800,
    height: 1066,
    alt: "Two delegates in business attire in front of the GCC Summit 2026 sponsor wall.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-7.jpg",
    width: 1200,
    height: 1600,
    alt: "TalentiFi-X team members on the GCC Summit 2026 exhibition floor in Bengaluru.",
  },
  {
    src: "/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-8.jpg",
    width: 1200,
    height: 1600,
    alt: "Four TalentiFi-X team members wearing exhibitor badges at the GCC Summit 2026 sponsor backdrop.",
  },
];
