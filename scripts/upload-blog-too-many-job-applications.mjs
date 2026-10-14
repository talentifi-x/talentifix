/**
 * Upload "Too Many Job Applications, Not Enough Qualified Candidates: What's
 * Broken in Hiring?" to Sanity, published, with its hero image.
 *
 * Source: Talentifi-X_Application_Paradox_Blog_Web_Team_Brief.docx. Published as
 * written; changes from the brief: brand spelled TalentiFi-X, the SEO title cut to
 * 60 characters, the URL under /blog, and a few short clauses that carry the
 * internal links the brief asks for. The Company A / Company B table keeps its
 * "illustrative" label. FAQs go in the FAQ field (crawlable, FAQPage data).
 *
 * Text is plain ASCII. The script refuses to upload if a long dash, curly quote or
 * other non-ASCII character slips in, or if an SEO field is over its limit.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-too-many-job-applications.mjs --dry-run
 *   node --env-file=.env.local scripts/upload-blog-too-many-job-applications.mjs
 *   node --env-file=.env.local scripts/upload-blog-too-many-job-applications.mjs --update
 *
 * --update patches only the body, read time and hero image of the live post, so
 * edits made in the studio to other fields are kept.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
// next-sanity re-exports the client; @sanity/client is not resolvable under pnpm.
import { createClient } from "next-sanity";

const DRY_RUN = process.argv.includes("--dry-run");
const UPDATE = process.argv.includes("--update");

/** Absolute path to the hero image, or null to publish without one. */
const IMAGE_PATH = fileURLToPath(
  new URL("../Blogs/images/talentifix-blog-too-many-job-applications-hiring-challenges.webp", import.meta.url),
);

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------

let keyCounter = 0;
const k = () =>
  `k${(++keyCounter).toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/**
 * A block from mixed parts: a string is plain text, { b } is bold,
 * { a, href } is a link.
 */
const block = (style, parts, list) => {
  const markDefs = [];
  const children = parts.map((part) => {
    if (typeof part === "string") {
      return { _type: "span", _key: k(), text: part, marks: [] };
    }
    if (part.href) {
      const key = k();
      markDefs.push({ _type: "link", _key: key, href: part.href });
      return { _type: "span", _key: k(), text: part.a, marks: [key] };
    }
    return { _type: "span", _key: k(), text: part.b, marks: ["strong"] };
  });
  return {
    _type: "block",
    _key: k(),
    style,
    markDefs,
    children,
    ...(list ? { listItem: list, level: 1 } : {}),
  };
};

const p = (...parts) => block("normal", parts);
const h2 = (text) => block("h2", [text]);
const h3 = (text) => block("h3", [text]);
const quote = (text) => block("blockquote", [text]);
const ask = (text) => block("normal", [{ b: text }]);
const li = (...parts) => block("normal", parts, "bullet");
/** First row is the header; the site renders it as a real <table>. */
const table = (rows) => ({
  _type: "table",
  _key: k(),
  rows: rows.map((cells) => ({ _type: "tableRow", _key: k(), cells })),
});

// ---------------------------------------------------------------------------
// Post fields
// ---------------------------------------------------------------------------

const post = {
  title: "Too Many Job Applications, Not Enough Qualified Candidates: What's Broken in Hiring?",
  slug: "too-many-job-applications-hiring-challenges",
  author: "TalentiFi-X Editorial Team",
  category: "Hiring Strategy",
  publishedAt: "2026-10-14T09:00:00.000Z",
  introduction:
    "Some companies receive hundreds of applications for a single role and still cannot find candidates who meet their requirements. Here is why application volume is not candidate quality, and what employers can do about it.",
  metaTitle: "Too Many Job Applications? Why Companies Still Can't Hire",
  metaDescription:
    "Why do companies receive hundreds of applications but struggle to hire? Explore recruitment challenges, candidate quality and smarter hiring strategies.",
  imageAlt:
    "Recruiter at an office desk holding a tall stack of printed job applications, with a small clipped pile of shortlisted resumes set apart",
};

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const body = [
  p("600 applications. Zero offers."),
  p("It sounds like a job seeker's nightmare."),
  p("But there's another side to this story."),
  p(
    "Some companies are receiving hundreds of applications for a single position and still struggling to identify candidates who meet their requirements.",
  ),
  p(
    "Job seekers feel invisible. Recruiters feel overwhelmed. Hiring managers feel frustrated. And despite all the activity, positions remain unfilled.",
  ),
  p("How can candidates struggle to find jobs while companies struggle to find talent?"),
  p("The answer may lie in one of the biggest contradictions of modern recruitment."),
  p("We've made applying for jobs easier than ever. But have we made hiring any better?"),

  h2("Why Are Companies Receiving So Many Job Applications?"),
  p(
    "Companies can receive large numbers of applications because online job platforms make opportunities accessible to wider audiences, application processes are increasingly automated, and candidates often apply to multiple positions to improve their chances of receiving a response.",
  ),
  p(
    "AI-assisted resume writing and job application tools can further reduce the effort required to submit applications.",
  ),
  p(
    "However, application volume varies significantly by industry, role, location, compensation and employer.",
  ),
  p(
    "A popular entry-level remote position may attract substantial interest, while a specialized engineering or leadership position may struggle to generate enough relevant applications.",
  ),
  quote(
    "A high number of applications does not necessarily indicate a healthy talent pipeline. It indicates interest in the vacancy. Whether that interest translates into qualified, available and suitable candidates is another question.",
  ),

  h2("The Application Paradox: More Candidates, Fewer Meaningful Connections"),
  p("Consider two situations."),
  h3("Candidate A"),
  p(
    "A recent graduate applies to 300 positions. Most applications receive no meaningful response. The candidate begins applying more broadly, hoping that increasing the number of applications will improve the chances of securing an interview.",
  ),
  h3("Company B"),
  p(
    "A company advertises an entry-level position. It receives hundreds of applications. The recruitment team must identify candidates who meet the actual requirements while managing a large screening workload.",
  ),
  p("Both sides are investing more effort. Yet neither necessarily achieves a better outcome."),
  p("This creates what we can call the application paradox."),
  p(
    "As candidates experience low response rates, they may increase their application volume. As application volume rises, recruiters face greater screening demands. That can make timely, meaningful evaluation more difficult, reinforcing frustration on both sides.",
  ),
  quote("More applications. More screening. More frustration. Not necessarily better hiring."),
  p(
    "This is a useful way to understand the problem, although it is not a universal explanation for every difficult job search or unfilled vacancy.",
  ),

  h2("Why More Applications Don't Always Mean Better Candidates"),
  p(
    "A larger applicant pool can improve hiring outcomes when it includes more qualified people. But application volume alone is not a measure of candidate quality.",
  ),
  p("Imagine two hiring scenarios."),
  table([
    ["Hiring metric", "Company A", "Company B"],
    ["Applications received", "500", "80"],
    ["Candidates meeting core requirements", "25", "30"],
    ["Candidates shortlisted", "10", "10"],
    ["Candidates hired", "1", "1"],
  ]),
  ask("Illustrative example, not actual recruitment data."),
  p(
    "Company A received more than six times as many applications. Yet Company B identified more candidates meeting its requirements.",
  ),
  p("The difference is not simply volume. It is relevance."),
  quote(
    "For employers, the question changes from: How many applications did we receive? To: How many relevant candidates did we actually reach?",
  ),
  p(
    "A recruitment process that generates hundreds of applications but produces few qualified candidates may need better role definition, sourcing, targeting or screening. Simply increasing advertising spend may not solve the underlying problem.",
  ),

  h2("The Three Problems Behind High-Volume Recruitment"),
  p(
    "The application paradox is not caused by one issue. It often reflects several recruitment challenges operating simultaneously.",
  ),
  h3("1. Poorly Defined Job Requirements"),
  p(
    "Many job descriptions are built around long lists of requirements: years of experience, technical skills, industry-specific exposure, certifications and particular tools.",
  ),
  p("But how many of those requirements are essential? And how many are simply preferences?"),
  p(
    "When companies fail to distinguish between critical capabilities and desirable qualifications, they risk attracting unsuitable applications while discouraging potentially capable candidates.",
  ),
  quote(
    "A stronger hiring process begins by asking: What must this person actually be capable of doing? Not simply: What should their resume contain?",
  ),
  p(
    "For example, instead of demanding experience with every tool in a technology stack, employers can identify the foundational skills required to perform the role and determine which tools can realistically be learned. Better job descriptions improve the quality of the hiring conversation before applications even arrive.",
  ),
  h3("2. Screening Processes That Prioritize Keywords Over Capability"),
  p(
    "Applicant tracking systems and automated screening tools can help recruiters organize applications and identify relevant information. But screening becomes problematic when superficial indicators are treated as definitive evidence of ability.",
  ),
  p(
    "A resume may contain every required keyword without demonstrating meaningful experience. Another candidate may describe equivalent experience using different terminology.",
  ),
  p("Neither keyword presence nor absence should automatically determine the quality of a candidate."),
  p("A strong screening process should evaluate:"),
  li("Relevant skills and demonstrated experience"),
  li("Evidence of completed work"),
  li("Role-specific technical capability"),
  li("Problem-solving ability"),
  li("Communication and collaboration"),
  li("Availability and practical employment requirements"),
  p(
    "The objective is not to eliminate technology from screening. It is to ensure technology supports sound hiring judgment.",
  ),
  h3("3. The Growing Gap Between Applications and Hiring Intent"),
  p(
    "Submitting an application does not always mean a candidate is genuinely interested in or suitable for the specific opportunity. Some candidates apply broadly. Others may not fully understand the role, location requirements, compensation range or expectations.",
  ),
  p(
    "This creates additional work for recruitment teams. Employers can reduce avoidable mismatches by making job advertisements more transparent.",
  ),
  quote("Better information at the beginning can reduce unnecessary screening later."),

  h2("Is AI Making the Recruitment Problem Worse?"),
  p("AI is changing both sides of the hiring process."),
  p(
    "Candidates can use AI to improve resumes, prepare applications and identify relevant opportunities. Employers can use AI-assisted tools for sourcing, screening support, scheduling and recruitment administration.",
  ),
  p("These developments can create efficiencies. But they also introduce a challenge."),
  quote(
    "When creating a polished application becomes easier, presentation alone becomes a weaker signal of capability.",
  ),
  p(
    "A well-written resume does not necessarily demonstrate that a candidate can perform the work. Equally, a candidate using AI to improve the clarity of a resume should not automatically be considered less capable.",
  ),
  p(
    "The important distinction is between how a candidate presents their experience and whether that experience is genuine and relevant.",
  ),
  p("For employers, the answer is not necessarily more automation. It is better assessment."),
  p(
    "Structured interviews, relevant work samples, technical discussions and evidence of previous outcomes can provide a more complete picture than resume presentation alone.",
  ),
  p("AI can support the process. But employers still need accountable hiring decisions."),

  h2("Why Are Entry-Level Candidates Finding It Difficult to Get Hired?"),
  p(
    "Entry-level hiring presents a particular challenge. Employers often want candidates who can contribute quickly. Graduates need opportunities to develop the experience employers value.",
  ),
  quote("Companies want experience. Graduates need employment to gain experience."),
  p(
    "The problem becomes more complicated when entry-level job descriptions include requirements that are difficult for genuinely inexperienced candidates to meet.",
  ),
  p(
    "Employers should therefore distinguish between capabilities that must exist on day one and capabilities that can be developed through training.",
  ),
  p(
    "For early-career positions, useful assessment signals may include academic projects, internships, portfolios, practical exercises, problem-solving ability and evidence of learning.",
  ),
  p(
    "These indicators should be evaluated in context, with reasonable accommodations and awareness that access to internships, equipment and professional networks is unequal.",
  ),
  p(
    "An effective entry-level recruitment process should identify potential without expecting every graduate to arrive fully trained.",
  ),
  quote(
    "If companies stop creating opportunities for junior talent, where will their experienced professionals come from in five years?",
  ),

  h2("How Can Companies Improve Candidate Quality Without Increasing Application Volume?"),
  p(
    "The solution begins before the screening stage. Employers need to improve how they define, attract, identify and evaluate talent.",
  ),
  h3("1. Define the Capability Before Advertising the Role"),
  p(
    "Identify the business problem the position exists to solve. Separate essential skills from preferences. Define what successful performance looks like. A clear hiring brief makes sourcing and evaluation more effective.",
  ),
  h3("2. Reach Relevant Candidates Instead of Relying Only on Applications"),
  p(
    "The applicant pool is not the entire talent market. Some qualified professionals are ",
    { a: "employed and not actively searching", href: "/blog/passive-candidate-recruitment-best-talent" },
    ". Direct sourcing, professional networks, referrals and specialized recruitment partners can help employers reach candidates beyond job advertisements.",
  ),
  h3("3. Evaluate Demonstrated Skills"),
  p(
    "Use assessment methods appropriate to the role. For technical positions, this may include relevant coding discussions, architecture reviews or work samples. For business roles, it may include structured problem-solving exercises or evidence of previous results. Assessments should be proportionate, job-related and respectful of candidates' time.",
  ),
  h3("4. Improve Screening Quality"),
  p(
    "Automation can reduce administrative effort. But recruiters should understand how screening tools evaluate candidates and review their effectiveness. Monitor whether relevant candidates are being overlooked. Avoid relying on unexplained scores or keyword matching as the sole basis for consequential decisions.",
  ),
  h3("5. Measure Hiring Outcomes, Not Just Recruitment Activity"),
  p(
    "A successful recruitment process is not defined by the number of applications received. It should be evaluated through measures such as shortlist relevance, interview conversion, offer acceptance, hiring-manager satisfaction, performance and retention.",
  ),

  h2("High-Volume Hiring vs Precision Hiring: What's the Difference?"),
  p(
    "High-volume hiring and precision hiring are not necessarily competing models. High-volume hiring describes a recruitment requirement involving many positions or applicants. ",
    { a: "Precision hiring", href: "/blog/precision-hiring-future-of-recruitment" },
    " describes an approach that emphasizes relevance, evidence and fit. Organizations may need both.",
  ),
  table([
    ["High-volume recruitment focus", "Precision hiring focus"],
    ["Application quantity", "Candidate relevance"],
    ["Broad sourcing", "Targeted sourcing"],
    ["Resume filtering", "Capability assessment"],
    ["Recruitment activity", "Hiring outcomes"],
    ["Speed of processing", "Speed with quality"],
    ["Filling positions", "Building capability"],
  ]),
  quote("A large recruitment funnel is useful only when it produces the talent the business needs."),

  h2("When Should Companies Consider a Staffing Agency?"),
  p(
    "Companies may benefit from working with a staffing agency when their internal recruitment teams face persistent challenges in identifying relevant candidates.",
  ),
  li(
    { b: "High application volumes with low candidate relevance: " },
    "Recruiters spend considerable time screening applicants who do not meet essential requirements.",
  ),
  li(
    { b: "Specialized or hard-to-fill positions: " },
    "The required skills are scarce or difficult to evaluate through conventional recruitment methods.",
  ),
  li(
    { b: "Limited access to passive candidates: " },
    "The organization needs to reach qualified professionals who are not actively applying.",
  ),
  li(
    { b: "Insufficient internal recruitment capacity: " },
    "Hiring requirements exceed the time or specialist expertise available within the internal talent acquisition team.",
  ),
  li({ b: "Repeated hiring delays: " }, "Positions remain open despite substantial recruitment activity."),
  p(
    "A staffing partner can provide additional sourcing capacity, market knowledge and screening expertise, along with flexible models such as ",
    { a: "contract staffing in India", href: "/blog/contract-staffing-india-guide" },
    ", ",
    { a: "contract-to-hire staffing", href: "/solutions#contract-to-hire" },
    " or ",
    { a: "IT staffing services", href: "/solutions" },
    " for specialist technology roles. However, employers should evaluate staffing agencies on the quality of their recruitment process rather than simply the number of resumes they promise. Our guide on ",
    { a: "how to choose an IT staffing agency", href: "/blog/how-to-choose-it-staffing-agency-usa" },
    " sets out the questions worth asking.",
  ),
  quote(
    "Can this partner help us make better hiring decisions? Not merely: Can this partner send us more candidates?",
  ),

  h2("The TalentiFi-X Perspective: Hiring Needs Better Signals, Not Just Bigger Funnels"),
  p(
    "At ",
    { a: "TalentiFi-X", href: "/" },
    ", we believe recruitment technology should help organizations identify relevant talent more effectively while preserving human judgment in hiring decisions.",
  ),
  p(
    "Technology can make sourcing faster. Automation can make recruitment workflows more efficient. AI can support the identification of potential matches.",
  ),
  p(
    "But identifying a possible match is only part of recruitment. Understanding a candidate's experience, evaluating capability and determining suitability for a particular business environment require context and accountability.",
  ),
  quote("Human Led. AI Assisted."),
  p(
    "The goal is not simply to increase the number of candidates entering the recruitment process. It is to improve the quality of the connections between businesses and talent.",
  ),

  h2("The Future of Hiring Isn't About More Applications"),
  p("The frustration surrounding modern recruitment is understandable."),
  p("Candidates want opportunities. Employers want capable people. Recruiters want to make successful placements."),
  p("Yet increasing application volume does not automatically bring these objectives closer together."),
  p("The opportunity is to redesign recruitment around relevance."),
  p(
    "Clearer requirements. Better sourcing. More meaningful assessments. Smarter technology. And stronger human judgment.",
  ),
  quote(
    "The future of hiring should not be defined by how many people apply. It should be defined by how effectively the right people and the right opportunities find each other.",
  ),

  h2("Looking for a More Effective Way to Hire?"),
  p(
    "TalentiFi-X supports organizations with ",
    { a: "talent acquisition and staffing solutions", href: "/solutions" },
    " across the United States and India.",
  ),
  p("Explore our approach to technology-enabled, human-led recruitment."),
  p({ a: "Explore TalentiFi-X Staffing Solutions", href: "/" }),
  ask("Human Led. AI Assisted."),
];

// ---------------------------------------------------------------------------
// FAQ (rendered after the body, and emitted as FAQPage structured data)
// ---------------------------------------------------------------------------

const faq = [
  [
    "Why do companies receive hundreds of applications but struggle to hire?",
    "Companies may receive many applications because applying online is relatively easy and candidates often apply broadly. However, many applicants may not meet the role's essential requirements. Poorly defined job descriptions, inefficient screening and limited access to relevant talent can further complicate hiring.",
  ],
  [
    "Does receiving more job applications improve hiring outcomes?",
    "Not necessarily. More applications can increase the number of qualified candidates, but only if the additional applicants are relevant. Application volume alone does not measure hiring quality.",
  ],
  [
    "How can employers screen hundreds of job applications efficiently?",
    "Employers can improve screening by defining essential requirements, using structured evaluation criteria, automating administrative tasks and assessing relevant skills. Screening systems should support human oversight and be reviewed for effectiveness.",
  ],
  [
    "What is precision hiring?",
    "Precision hiring is an approach focused on identifying candidates whose skills, experience and capabilities align closely with a business requirement. It prioritizes relevance and hiring outcomes rather than application volume alone.",
  ],
  [
    "How can companies attract more qualified candidates?",
    "Companies can improve candidate relevance through clearer job descriptions, transparent role expectations, targeted sourcing, employee referrals, specialist recruitment networks and job-related assessment processes.",
  ],
  [
    "Can AI improve recruitment screening?",
    "AI can support recruitment screening by organizing information, identifying possible matches and reducing administrative work. However, employers should evaluate tool accuracy, fairness and suitability, and retain appropriate human oversight.",
  ],
  [
    "When should a company hire a recruitment agency?",
    "A recruitment agency may be useful when an organization needs specialized talent, lacks sufficient internal recruiting capacity, faces persistent hiring delays or needs access to candidates beyond its existing applicant pool.",
  ],
  [
    "What is the difference between candidate quantity and candidate quality?",
    "Candidate quantity refers to the number of people applying or entering a recruitment pipeline. Candidate quality refers to how well those individuals meet relevant job requirements and demonstrate the capabilities needed for success.",
  ],
].map(([question, answer]) => ({ _key: k(), _type: "faqItem", question, answer }));

// ---------------------------------------------------------------------------
// Checks: run before anything is sent to Sanity
// ---------------------------------------------------------------------------

const bodyText = body.flatMap((b) =>
  b._type === "table"
    ? b.rows.flatMap((row) => row.cells)
    : [b.children.map((c) => c.text).join("")],
);
const faqText = faq.flatMap((f) => [f.question, f.answer]);
const allText = [
  post.title,
  post.author,
  post.category,
  post.introduction,
  post.metaTitle,
  post.metaDescription,
  post.imageAlt,
  ...bodyText,
  ...faqText,
];

const words = [...bodyText, ...faqText, post.introduction]
  .join(" ")
  .split(/\s+/)
  .filter(Boolean).length;
const readTime = `${Math.ceil(words / 230)} min read`;

const problems = [];
const check = (ok, message) => ok || problems.push(message);

for (const text of allText) {
  const bad = text.match(/[^\x20-\x7E]/);
  check(!bad, `Non-ASCII character "${bad?.[0]}" in: ${text.slice(0, 60)}`);
  check(!/ - |--/.test(text), `Dash used as punctuation in: ${text.slice(0, 60)}`);
  check(!/talentifi-x|\bTX\b/i.test(text.replace(/TalentiFi-X/g, "")), `Brand misspelt in: ${text.slice(0, 60)}`);
}
check(post.metaTitle.length <= 60, `metaTitle is ${post.metaTitle.length} chars (max 60)`);
check(
  post.metaDescription.length >= 120 && post.metaDescription.length <= 155,
  `metaDescription is ${post.metaDescription.length} chars (120-155)`,
);
check(post.slug.length <= 96, `slug is ${post.slug.length} chars (max 96)`);
check(!IMAGE_PATH || post.imageAlt.trim().length > 0, "mainImage alt text is required");
check(!body.some((b) => b.style === "h1"), "body must not contain an H1");

console.log(`Title            ${post.title.length} chars`);
console.log(`Meta title       ${post.metaTitle.length} / 60`);
console.log(`Meta description ${post.metaDescription.length} / 155`);
console.log(`Introduction     ${post.introduction.length} chars`);
console.log(`Slug             ${post.slug.length} / 96`);
console.log(`Hero image       ${IMAGE_PATH ? "yes" : "none"}`);
console.log(`Body             ${body.length} blocks, ${body.filter((b) => b.style === "h2").length} H2, ${body.filter((b) => b._type === "table").length} tables`);
console.log(`FAQ              ${faq.length} items`);
console.log(`Words            ${words} -> ${readTime}`);

if (problems.length > 0) {
  console.error("\nRefusing to upload:");
  for (const message of problems) console.error(`  - ${message}`);
  process.exit(1);
}
console.log("\nAll checks passed.");
if (DRY_RUN) process.exit(0);

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

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

/** Uploads the hero image (Sanity dedupes identical files) and returns the field value. */
async function uploadMainImage() {
  if (!IMAGE_PATH) return undefined;
  console.log(`\nUploading hero image to dataset "${dataset}"...`);
  const asset = await client.assets.upload("image", readFileSync(IMAGE_PATH), {
    filename: `talentifix-blog-${post.slug}.webp`,
    contentType: "image/webp",
  });
  console.log(`  Image asset: ${asset._id}`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: post.imageAlt,
  };
}

if (UPDATE) {
  try {
    const mainImage = await uploadMainImage();
    const result = await client
      .patch(`post-${post.slug}`)
      .set({ body, readTime, ...(mainImage ? { mainImage } : {}) })
      .commit();
    console.log(`\nUpdated body, read time and hero image: ${result._id}`);
  } catch (err) {
    console.error("Update failed:", err.message);
    process.exit(1);
  }
  process.exit(0);
}

try {
  const mainImage = await uploadMainImage();

  const doc = {
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    published: true,
    author: post.author,
    founderInsights: false,
    publishedAt: post.publishedAt,
    category: post.category,
    readTime,
    introduction: post.introduction,
    ...(mainImage ? { mainImage } : {}),
    body,
    faq,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    noindex: false,
  };

  const result = await client.createOrReplace(doc);
  console.log(`\nUploaded and published: ${result._id}`);
  console.log(`  /blog/${post.slug}`);
} catch (err) {
  console.error("Upload failed:", err.message);
  process.exit(1);
}
