/**
 * Upload "Bulk Hiring at Scale Without Dropping Quality" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-bulk-hiring-funnel.mjs
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
// Portable Text helpers
// ---------------------------------------------------------------------------

let keyCounter = 0;
const k = () =>
  `k${(++keyCounter).toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const para = (text) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const heading = (text, style = "h2") => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const bullet = (text, level = 1) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  listItem: "bullet",
  level,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const blockquote = (text) => ({
  _type: "block",
  _key: k(),
  style: "blockquote",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const linkPara = (parts) => {
  const children = [];
  const markDefs = [];
  for (const part of parts) {
    if (typeof part === "string") {
      children.push({ _type: "span", _key: k(), text: part, marks: [] });
    } else {
      const linkKey = k();
      markDefs.push({ _type: "link", _key: linkKey, href: part.href });
      children.push({
        _type: "span",
        _key: k(),
        text: part.text,
        marks: [linkKey],
      });
    }
  }
  return { _type: "block", _key: k(), style: "normal", markDefs, children };
};

// ---------------------------------------------------------------------------
// Blog content
// ---------------------------------------------------------------------------

const post = {
  title:
    "Bulk Hiring at Scale Without Dropping Quality: How AI Screening Funnels Work",
  slug: "bulk-hiring-ai-screening-funnels-india",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Bulk Hiring & AI",
  readTime: "9 min read",
  introduction:
    "In AI-assisted bulk hiring, a screening funnel works like this. AI scores every applicant across 50+ parameters: technical skills, career trajectory, role fit, behavioural signals, and red flag detection. Only the top 10% of scored candidates pass to human reviewers. The quality bar is set once, at the intake stage, and held consistently across every candidate regardless of volume. This is how organisations run hiring drives of 50 to 500 roles without the quality drop that traditionally comes with scale.",
  metaTitle:
    "Bulk Hiring at Scale Without Dropping Quality: How AI Screening Funnels Work | TalentiFi-X",
  metaDescription:
    "Running a bulk hiring drive in India? Learn how AI screening funnels score candidates across 50+ parameters, pass only the top 10% to human reviewers, and maintain quality at scale.",
};

const body = [
  para(
    "Bulk hiring has always forced a choice. Move fast and accept lower quality. Or move carefully and accept that you will not fill the roles in time."
  ),
  para(
    "Most HR leaders in India have lived both sides of this. The hiring drive that filled 200 seats in 6 weeks, and then spent the next 12 months managing the attrition and performance gaps that came with it. Or the careful, deliberate search that produced strong hires but took so long that business momentum stalled."
  ),
  para(
    "AI changes this trade-off. Not by removing it, but by restructuring it. The choice is no longer between speed and quality. It is between building the screening funnel correctly at the start, or not."
  ),

  heading("Why Bulk Hiring Breaks Quality in the Traditional Model"),
  para(
    "The traditional model for high-volume recruitment is a manual funnel. Thousands of applications arrive. A team of recruiters screens them CV by CV, sometimes with a simple keyword filter, sometimes without. Each recruiter brings their own standards, their own biases, and their own fatigue."
  ),
  para(
    "By the time a recruiter has reviewed 200 CVs in a day, their judgment at number 200 is meaningfully different from their judgment at number 10. This is not a character flaw. It is human physiology. Attention degrades under volume."
  ),
  para(
    "The result is inconsistency. The same candidate might clear screening with one recruiter and be filtered out by another. The same role might produce different shortlists depending on who reviewed the applications that day. And the quality bar, if it was defined at all, drifts as the drive continues and the pressure to fill seats mounts."
  ),
  blockquote(
    "In bulk hiring, the enemy of quality is not speed. It is inconsistency. And inconsistency is the inevitable output of a manual process applied at scale."
  ),
  para("This is the problem that AI screening funnels are specifically designed to solve."),

  heading("How an AI Screening Funnel Actually Works"),
  para(
    "An AI screening funnel is not a keyword filter. It is not an ATS with a scoring plugin. It is a structured evaluation system that applies the same criteria, consistently, without fatigue, without bias drift, to every candidate in the pool, regardless of whether there are 500 or 50,000 of them."
  ),

  heading("Step 1: Define the Success Profile Before the Funnel Opens", "h3"),
  para(
    "This is the step most organisations skip, and it is the step that determines whether the entire drive succeeds or fails."
  ),
  para(
    "Before a single application is received, the hiring team defines the success profile for the role. Not just skills and qualifications, but the specific outcomes expected at 30, 60, and 90 days. What does a strong hire look like at Month 3? What does a weak hire look like at Month 6? What are the non-negotiables that are disqualifying regardless of how good the candidate looks on paper?"
  ),
  linkPara([
    "This conversation, which takes about 45 minutes for a well-facilitated intake session, becomes the input that programmes the AI funnel. The funnel is only as good as the criteria it is scoring against. A vague success profile produces a vague shortlist. This is also the moment where you can prevent ",
    {
      text: "amoral drift in your AI hiring tool",
      href: "/blog/amoral-drift-ai-hiring-risk",
    },
    ", because the criteria are being defined by humans against current needs rather than inherited from historical training data.",
  ]),

  heading("Step 2: AI Scores Every Applicant Across 50+ Parameters", "h3"),
  para(
    "Once the success profile is defined, the AI layer processes every application in the pool simultaneously. The scoring is not binary. It is a weighted ranking across multiple dimensions."
  ),
  bullet(
    "Technical Qualification. Skills, certifications, tools, and domain experience versus role requirements. This is the baseline filter."
  ),
  bullet(
    "Career Trajectory. Progression pattern, tenure, growth rate, and role transitions. This predicts learning velocity and ambition alignment."
  ),
  bullet(
    "Role Fit Score. Proximity of past roles to the success profile defined in intake. This is the most predictive parameter for early productivity."
  ),
  bullet(
    "Behavioural Signals. Language patterns in applications, consistency of narrative, specificity of achievements. This surfaces candidates who communicate with clarity and ownership."
  ),
  bullet(
    "Red Flag Detection. Unexplained gaps, inconsistencies, pattern anomalies. These are flagged for human review, not automatic rejection."
  ),
  bullet(
    "Contextual Markers. Industry background, company size experience, cross-functional exposure. This assesses environmental fit beyond the role itself."
  ),
  para(
    "The output is a ranked list, not a filtered list. Every candidate receives a score. The top 10% of that ranked list is passed to human reviewers. The remaining 90% is held, not deleted, because the threshold can be adjusted and the pool can be re-queried if the initial shortlist does not produce enough finalists."
  ),

  heading("Step 3: Human Reviewers See Only the Top 10%", "h3"),
  para(
    "This is the structural shift that makes bulk hiring work without quality loss."
  ),
  para(
    "In a traditional model, a recruiter reviewing 1,000 applications is making 1,000 screening decisions of varying quality, with increasing fatigue, and no consistent standard."
  ),
  para(
    "In an AI-assisted funnel, that same recruiter reviews 100 applications, the top-scored 10%, each of which has already been evaluated against the same 50+ parameter framework. Their job is not to screen. It is to assess the things the AI cannot assess: cultural fit signals, motivation, potential that does not show up in a CV, and the nuanced judgment call about whether this person will elevate the team around them."
  ),
  para(
    "The quality of that human evaluation is significantly higher when it is applied to 100 pre-screened candidates than when it is applied to 1,000 raw applications. The recruiter is not working harder. The AI has done the work that exhausts human attention, leaving human judgment available for the work that actually requires it."
  ),

  heading("Step 4: The Quality Bar Is Fixed, Not Adjusted for Volume", "h3"),
  para(
    "The single most common failure in bulk hiring is allowing the quality bar to shift as the drive progresses."
  ),
  para(
    "Drive starts. First two weeks: strong shortlists, careful decisions. Week 4: pressure builds, seats not filling fast enough. Week 6: bar drops. Week 8: roughly 30% of the hires made in weeks 6 to 8 are regretted within 90 days."
  ),
  para(
    "An AI funnel prevents this. Not because AI is inflexible, but because the success profile defined at intake becomes the fixed reference point for every candidate scored throughout the drive. The 500th candidate is evaluated against the same criteria as the 5th. The bar does not drift because volume does not affect the scoring model."
  ),
  blockquote(
    "The quality bar in bulk hiring must be set once and held consistently. The AI funnel's job is to make that consistency technically possible at scale. The human's job is to make sure the bar was set correctly in the first place."
  ),

  heading("What the Numbers Look Like in Practice"),
  para(
    "Across bulk hiring mandates, a well-structured AI screening funnel typically produces large differences in measurable outcomes compared with a manual process."
  ),
  bullet(
    "Time to first shortlist drops from 15 to 25 days down to 4 to 6 days."
  ),
  bullet(
    "Recruiter hours per 100 hires drop from 280 to 350 hours down to 60 to 80 hours."
  ),
  bullet(
    "Screening consistency moves from variable and recruiter-dependent to fixed across every candidate."
  ),
  bullet(
    "Quality of hires at 90 days improves from an industry average around 65% retention to 90% or higher in well-managed funnels."
  ),
  bullet(
    "Candidate experience improves because response times are faster and the process is structured rather than ad-hoc."
  ),
  para(
    "These numbers do not come from the AI alone. They come from the combination of a well-defined intake, a properly parameterised funnel, and human reviewers who are evaluating the right candidates for the right reasons."
  ),

  heading("The Three Mistakes That Break AI Screening Funnels"),
  para(
    "Not every organisation that adopts AI for bulk hiring gets these results. The failures are almost always traceable to one of three mistakes."
  ),

  heading("1. Skipping the Intake", "h3"),
  para(
    "Running an AI funnel without a properly defined success profile is like running a search engine without a query. The AI will score candidates, but against what? Default parameters, historical patterns, or whatever criteria the vendor built into the model. None of these are your role, your team, or your stage of growth."
  ),
  para("The intake is not optional. It is the most important 45 minutes in the entire hiring drive."),

  heading("2. Trusting the Score as the Decision", "h3"),
  para(
    "An AI score is a ranking, not a verdict. The top-scored candidate is the most statistically likely fit based on the defined parameters. They are not guaranteed to be the right hire. Human reviewers exist in this process for a reason, because some things that determine whether a hire succeeds are not in any dataset."
  ),
  para(
    "Organisations that automate the final decision, that allow a score above a certain threshold to trigger an offer, are removing the accountability that makes the whole model work. AI informs. Humans decide. That line is non-negotiable at any volume."
  ),

  heading("3. Not Auditing the Funnel Mid-Drive", "h3"),
  para(
    "A bulk hiring drive that runs for 8 to 12 weeks is long enough for conditions to change. The market shifts. Early hires reveal that the success profile was slightly miscalibrated. Feedback from hiring managers surfaces a pattern in the shortlists that was not anticipated."
  ),
  linkPara([
    "A well-managed AI funnel is reviewed at the midpoint of any significant drive. Are the top-scored candidates converting at the expected rate? Are there patterns in the rejections that suggest the model is missing something? Is the quality bar holding? This kind of mid-drive review is also the strongest defence against ",
    {
      text: "the committee dynamics that derail many hiring drives",
      href: "/blog/hiring-committee-problem",
    },
    ", because it surfaces stakeholder misalignment early enough to fix before it produces 30 wrong hires.",
  ]),

  heading("Bulk Hiring and Culture: The Question Most Companies Don't Ask"),
  para(
    "There is a question that rarely gets asked in bulk hiring discussions, and it is the most important one. If you are going from 100 people to 300 people in 18 months, does the culture scale with the headcount?"
  ),
  para(
    "The companies that have done this successfully did not just fill seats. They defined, in advance, what the cultural non-negotiables were for every hire at every level. And they built those non-negotiables into the intake, not as soft preferences, but as scored criteria."
  ),
  para(
    "The AI funnel can score for cultural indicators. It cannot define what your culture is. That is a human job, done at the intake stage, before the first application arrives."
  ),
  para(
    "Bulk hiring without cultural precision is not scaling. It is dilution at speed. The quality drop that comes with it is not inevitable, but it is guaranteed if the intake conversation never happened."
  ),

  heading("The Bottom Line"),
  para(
    "AI screening funnels do not eliminate the difficulty of bulk hiring. They restructure it. The difficulty moves from the screening stage, where it cannot be managed well at volume, to the intake stage, where it can be managed well and where the investment pays compound dividends across every candidate scored in the drive."
  ),
  para(
    "50 parameters. Top 10% to human review. Quality bar fixed from Day 1. That is not a technology story. It is a process story enabled by technology. And the organisations that understand the distinction are the ones hiring at scale without the quality loss everyone else has accepted as inevitable."
  ),

  heading("Talk to TalentiFi-X About Your Next Bulk Hiring Drive"),
  linkPara([
    "TalentiFi-X builds and manages AI screening funnels for high-volume hiring across India and the US, using ",
    { text: "our Human Led, AI Assisted methodology", href: "/about" },
    ", with human experts in every decision that matters.",
  ]),
  para("Human Led. AI Assisted. Bengaluru and Houston."),
  para("Book a 15-minute discovery call at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "How does AI screening work in bulk hiring?",
    answer:
      "In AI-assisted bulk hiring, a screening funnel scores every applicant across 50+ parameters including technical qualification, career trajectory, role fit, behavioural signals, and red flag detection. The AI ranks all candidates and passes only the top 10% to human reviewers. Scoring criteria are defined once during the intake stage and held consistently across every candidate, regardless of volume.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How do you maintain quality in high-volume recruitment in India?",
    answer:
      "Quality in high-volume recruitment is maintained through three practices. A precise success profile defined at intake before sourcing begins. An AI funnel that applies that profile consistently to every candidate without fatigue or bias drift. And human reviewers who evaluate only the top-scored candidates, focusing their judgment on cultural fit and motivation rather than spending it on basic screening.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What parameters does AI use to screen candidates at scale?",
    answer:
      "AI screening at scale typically evaluates technical skills and certifications, career trajectory and progression pattern, role fit against a defined success profile, behavioural signals in application language, red flag detection for inconsistencies, and contextual markers like industry background and company size experience. The weighting of each parameter is configured against the specific role requirements defined in the intake.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is the difference between AI screening and a keyword filter in bulk hiring?",
    answer:
      "A keyword filter is binary. A candidate either has the keyword or they don't. AI screening is a weighted multi-parameter ranking system. It evaluates each candidate across dozens of dimensions simultaneously, produces a ranked score, and identifies candidates who match the underlying success profile even when their CV does not match the JD exactly. A keyword filter finds CVs that contain certain words. AI screening finds candidates likely to succeed in the role.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How many roles can an AI screening funnel handle simultaneously?",
    answer:
      "A well-structured AI screening funnel can process thousands of applications across multiple roles simultaneously. The practical limit is not technical capacity, it is intake quality. Each role requires a properly defined success profile before the funnel can score accurately for it. Organisations running bulk drives of 50 to 500 simultaneous roles typically run a structured intake process for role families or clusters, with shared parameters where role requirements overlap.",
  },
];

// ---------------------------------------------------------------------------
// Build Sanity document
// ---------------------------------------------------------------------------

const doc = {
  _id: `post-${post.slug}`,
  _type: "post",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  author: post.author,
  publishedAt: new Date().toISOString(),
  category: post.category,
  readTime: post.readTime,
  introduction: post.introduction,
  body,
  faq,
};

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

console.log(`Uploading post "${post.title}" to dataset "${dataset}"...`);

try {
  const result = await client.createOrReplace(doc);
  console.log(`✓ Uploaded: ${result._id}`);
  console.log(`  View at: /blog/${post.slug}`);
} catch (err) {
  console.error("✗ Upload failed:", err.message);
  process.exit(1);
}
