/**
 * Upload "How to Choose an IT Staffing Agency in the USA in 2026" to Sanity,
 * with its hero image, published and dated 2 October 2026.
 *
 * Text is plain ASCII: no em or en dashes, curly quotes or ellipses. The script
 * refuses to upload if any slip in, or if an SEO field is over its limit.
 *
 * The body uses the "table" block type, so the site must be running the code
 * that renders it (PostTable) before this body goes live; older code hides it.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-it-staffing-agency-usa.mjs --dry-run
 *   node --env-file=.env.local scripts/upload-blog-it-staffing-agency-usa.mjs
 *   node --env-file=.env.local scripts/upload-blog-it-staffing-agency-usa.mjs --update
 *
 * --update patches only the body, read time and founder toggle of the live post,
 * so edits made in the studio to other fields are kept.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
// next-sanity re-exports the client; @sanity/client is not resolvable under pnpm.
import { createClient } from "next-sanity";

const DRY_RUN = process.argv.includes("--dry-run");
const UPDATE = process.argv.includes("--update");

const IMAGE_PATH = fileURLToPath(
  new URL(
    "../Blogs/images/talentifix-blog-how-to-choose-it-staffing-agency-usa.webp",
    import.meta.url,
  ),
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
const quote = (text) => block("blockquote", [text]);
const ask = (text) => block("normal", [{ b: text }]);
const li = (...parts) => block("normal", parts, "bullet");
const num = (text) => block("normal", [text], "number");
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
  title: "How to Choose an IT Staffing Agency in the USA in 2026",
  slug: "how-to-choose-it-staffing-agency-usa",
  author: "TalentiFi-X Editorial Team",
  category: "Modern Staffing",
  publishedAt: "2026-10-02T09:00:00.000Z",
  introduction:
    "Most IT staffing agencies promise the same things. These 10 questions help you find the one that can actually deliver the right people for your contract, contract-to-hire or direct hire technology roles.",
  metaTitle: "How to Choose an IT Staffing Agency in the USA | 2026 Guide",
  metaDescription:
    "Choosing an IT staffing agency in the USA? Ask these 10 questions before you pick a partner for contract, contract-to-hire or direct hire tech roles.",
  imageAlt:
    "Hiring leader comparing staffing partners: two spill piles of unsuitable resumes, one delivers three verified tech candidates",
};

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const body = [
  p(
    "Choosing an IT staffing agency should be simple. You have an open technology role, the staffing company finds qualified candidates, you interview the strongest ones and you hire.",
  ),
  p("In practice, it rarely works that neatly."),
  p(
    "Most IT staffing companies promise similar things: large talent networks, faster hiring, experienced recruiters, rigorous screening and access to hard-to-find technology professionals.",
  ),
  p(
    "So the difficult question for an employer is not whether an agency can find resumes. It is whether the agency can consistently identify people who are actually right for the role, the business and the environment they will work in.",
  ),
  p(
    "That distinction matters more every year. Technology roles keep getting more specialized, and AI is changing both how candidates apply and how recruiters source and evaluate talent.",
  ),
  p(
    "So, how should a company choose an IT staffing agency in the USA? Start with these ten questions.",
  ),

  h2("Quick Answer: What Should You Look for in an IT Staffing Agency?"),
  p("A strong IT staffing agency should be able to show:"),
  li("Expertise in the technology roles you are hiring for"),
  li("The ability to reach both active and passive candidates"),
  li("A clearly defined screening process"),
  li("An understanding of your industry and business context"),
  li("The right contract, contract-to-hire and direct hire options"),
  li("Transparent commercial terms"),
  li("Evidence of previous delivery"),
  li("Responsible use of recruitment technology and AI"),
  li("Clear communication and accountability"),
  li("The willingness to challenge unrealistic hiring requirements when necessary"),
  p(
    "That last point is often overlooked. A good staffing partner does not simply accept a job description and start forwarding resumes. It helps improve the hiring decision itself.",
  ),

  h2("1. Does the Agency Understand the Technology Talent You Need?"),
  p(
    '"IT staffing" is an enormous category. Hiring a full-stack developer is different from hiring a cybersecurity architect, and finding a data engineer is different from finding an AI product leader.',
  ),
  p(
    "Cloud, DevOps, enterprise applications, cybersecurity, data engineering, AI and software development each have their own talent markets, skill combinations and candidate expectations.",
  ),
  p("Before engaging an IT staffing company, ask:"),
  ask("What technology roles have you successfully recruited for recently?"),
  p(
    "Then go deeper. Ask whether the recruiters handling your account understand the technologies, seniority and business context involved.",
  ),
  p(
    "A recruiter doesn't need to be an engineer. But they do need enough domain knowledge to tell the difference between a candidate whose resume contains the right keywords and one who has actually done the work. That is why a specialized technology staffing agency is often a better fit for technical roles than a generalist one.",
  ),

  h2("2. How Does the Agency Evaluate Candidates Before Sending Them to You?"),
  p("Ask a very simple question:"),
  ask("What happens between finding a candidate and sending that candidate to us?"),
  p(
    "The answer tells you a lot. A staffing company should be able to explain its screening process clearly. Depending on the role, that could include:",
  ),
  li("Experience validation"),
  li("A technical or skills assessment"),
  li("Structured recruiter interviews"),
  li("A review of relevant projects"),
  li("A communication assessment"),
  li("Availability and compensation alignment"),
  li("Work authorization checks where applicable"),
  li("The candidate's motivation for considering the opportunity"),
  li("An assessment against the actual requirements of the role"),
  p(
    "More assessments are not the goal. The goal is making sure your hiring managers spend their time with relevant candidates. ",
    {
      a: "A shortlist of five genuinely relevant people",
      href: "/blog/why-sending-30-resumes-is-lazy-hiring-and-why-3-5-is-the-future",
    },
    " can be more valuable than a database of 50,000 profiles.",
  ),

  h2("3. Are You Paying for Access to Candidates or for Recruitment Judgment?"),
  p("This may be the most important question on the list."),
  p(
    "Technology has made candidate discovery much easier. LinkedIn, job boards, professional communities, talent databases and AI-assisted sourcing tools have dramatically expanded the number of potential candidates a recruiter can identify.",
  ),
  p(
    "That means candidate access on its own is becoming less of a differentiator. The value now lies in knowing the answers to harder questions:",
  ),
  li("Who should we approach?"),
  li("Who is genuinely qualified?"),
  li("Who is realistically movable?"),
  li("Who fits this particular environment?"),
  li("Which requirements matter, and which ones don't?"),
  p(
    "That is recruitment judgment. As Chetan Mangalwedhe, Founder of TalentiFi-X, puts it:",
  ),
  quote('"The recruiter who sends you fewer candidates may actually be doing more work."'),
  p("A long candidate list shows sourcing activity. A strong shortlist shows judgment."),

  h2("4. Can the Agency Reach Candidates Who Aren't Actively Applying?"),
  p(
    "One of the biggest mistakes companies make is assuming the applicant pool represents the available talent market. It doesn't.",
  ),
  p(
    "Many of the strongest technology professionals are already employed and are not applying for jobs at all. They may still consider the right opportunity, which makes ",
    {
      a: "passive candidate recruitment",
      href: "/blog/passive-candidate-recruitment-best-talent",
    },
    " especially important for specialized, mid-senior and leadership roles.",
  ),
  p("Ask the staffing agency:"),
  ask("How do you find candidates beyond job-board applicants?"),
  p(
    "A credible answer should involve some combination of recruiter networks, direct sourcing, professional communities, referrals, previous candidate relationships, market mapping and targeted outreach.",
  ),
  p(
    "Advertising your vacancy more widely is not the point. Expanding the talent pool beyond the people already looking for work is.",
  ),

  h2("5. Does the Agency Understand Your Business, Not Just Your Job Description?"),
  p("Two companies can hire for the same job title and need very different people."),
  p(
    "Take a data engineer. One organization may need someone building infrastructure inside a fast-moving startup. Another may need someone operating within a highly regulated financial institution. The technologies may overlap, but the environment, expectations, risk tolerance and stakeholder complexity probably won't.",
  ),
  p("That's why a staffing partner should ask questions before it starts sourcing:"),
  li("What is the team building?"),
  li("Why does this role exist?"),
  li("What does success look like after six months?"),
  li("Which skills are non-negotiable?"),
  li("Which requirements can be learned on the job?"),
  li("Who will this person work with?"),
  li("Why would a strong candidate leave their current position for this opportunity?"),
  p(
    "If an agency asks very little before promising candidates, that should concern you. Good recruitment starts with diagnosis, not sourcing.",
  ),

  h2("6. Which Staffing Model Is Right for the Role?"),
  p(
    "Not every technology requirement should result in the same type of hire. Three common models in U.S. IT staffing are:",
  ),
  table([
    ["Hiring model", "Typically suited to"],
    [
      "Contract staffing",
      "Projects, temporary capability needs, flexible workforce requirements or specialized expertise",
    ],
    [
      "Contract-to-hire",
      "Situations where the company wants a potential path to permanent employment after an initial contract period",
    ],
    [
      "Direct hire",
      "Long-term positions where the professional joins the company's workforce directly",
    ],
  ]),
  p(
    "These are three distinct decisions, not interchangeable products. A good staffing agency shouldn't automatically recommend whichever model is most convenient for the agency. It should help you work out which model fits the business requirement.",
  ),
  p(
    "For particularly senior or strategic roles, an executive search approach may be more appropriate.",
  ),
  p(
    "You can see how TalentiFi-X runs each model on our solutions page: ",
    { a: "contract staffing", href: "/solutions#temporary-staffing" },
    ", ",
    { a: "contract-to-hire", href: "/solutions#contract-to-hire" },
    ", ",
    { a: "direct hire", href: "/solutions#permanent-placement" },
    " and ",
    { a: "executive search", href: "/solutions#executive-search" },
    ".",
  ),

  h2("7. How Transparent Is the Agency About Pricing and Commercial Terms?"),
  p(
    "Price matters. But comparing staffing companies purely on the lowest fee or markup can be misleading. The better question is:",
  ),
  ask("What exactly are we paying for?"),
  p(
    "Depending on the engagement, you should understand the placement fees or bill rates, conversion terms, replacement provisions, payment terms and any other contractual obligations before the search begins.",
  ),
  p(
    "For contract staffing, it is also important to understand who employs the worker and how employment-related responsibilities such as payroll, taxes and benefits are handled.",
  ),
  p("There should be no surprise economics after you have already selected a candidate."),

  h2("8. How Does the Agency Use AI?"),
  p(
    "In 2026, asking whether a staffing company uses AI isn't particularly useful. Most modern recruitment operations use automation or AI somewhere. The better question is:",
  ),
  ask("Where do you use AI, and where do humans retain judgment?"),
  p(
    "AI can help with candidate discovery, matching, workflow automation, data analysis and administrative tasks. But matching is not the same as deciding.",
  ),
  p(
    "An algorithm can spot similarities between a candidate profile and a job requirement. It cannot fully understand why a particular career move makes sense for a person, how someone will operate inside a specific leadership environment, or which seemingly imperfect candidate may actually have the most potential.",
  ),
  p(
    "Technology should make recruiters better at their work. It should not remove accountability for the hiring recommendation. That is the line we draw between ",
    {
      a: "what should be automated and what should never be",
      href: "/blog/ai-in-staffing-what-should-be-automated-and-what-should-never-be",
    },
    ". At TalentiFi-X, we sum the principle up simply:",
  ),
  ask("Human Led. AI Assisted."),

  h2("9. Will the Recruiter Challenge Your Hiring Brief?"),
  p(
    "This is one of the most underused tests when selecting a staffing partner. Imagine telling an agency:",
  ),
  quote(
    '"We need ten years of experience, seven specialized technologies, experience in our exact industry and this compensation range."',
  ),
  p("There are two possible responses. The first:"),
  quote('"Absolutely. We\'ll start searching."'),
  p("The second might be:"),
  quote(
    '"The market is unlikely to give you all of those things at that compensation. Let\'s identify which requirements actually determine success."',
  ),
  p(
    "The second conversation may be less comfortable at first. It may also be far more valuable.",
  ),
  p(
    "A staffing partner can see candidate availability, compensation expectations, competing roles and shifting skill combinations. That intelligence should improve the brief. If your recruiter agrees with every requirement you give them, you may have an order taker rather than a talent partner.",
  ),

  h2("10. How Will You Measure Whether the Partnership Is Working?"),
  p(
    "Don't wait until several months into the relationship to decide what success means. Agree on it early. Useful measures include:",
  ),
  li(
    { b: "Time to first qualified shortlist: " },
    "How quickly does the agency produce candidates worth interviewing?",
  ),
  li(
    { b: "Interview-to-submission ratio: " },
    "How many submitted candidates are actually selected for interviews?",
  ),
  li({ b: "Offer acceptance: " }, "Are selected candidates accepting the opportunity?"),
  li({ b: "Quality of hire: " }, "Does the person perform well after joining?"),
  li({ b: "Retention: " }, "Do permanent hires stay and contribute?"),
  li(
    { b: "Hiring-manager satisfaction: " },
    "Is the agency reducing the workload on your internal team, or just creating more resumes to review?",
  ),
  p(
    "Time-to-fill still matters, but speed alone is an incomplete measure. Closing the requisition is not the finish line. Making a successful hire is.",
  ),

  h2("Red Flags When Choosing an IT Staffing Agency"),
  p("Be cautious when an agency:"),
  li("Promises unrealistic hiring timelines before understanding the role"),
  li("Sends large numbers of poorly matched resumes"),
  li("Cannot explain its candidate screening process"),
  li("Talks a lot about database size but little about candidate quality"),
  li("Cannot demonstrate relevant technology or industry experience"),
  li("Is vague about fees, markups or contractual terms"),
  li("Cannot explain how it uses AI in candidate evaluation"),
  li("Doesn't ask meaningful questions about your business"),
  li("Never challenges an unrealistic requirement"),
  p("A staffing agency should reduce noise for your hiring team, not add to it."),

  h2("IT Staffing Agency Evaluation Checklist"),
  p("Before selecting an IT staffing partner, ask these ten questions:"),
  num("Have you recruited successfully for the technologies and roles we need?"),
  num("How do you screen candidates before submitting them?"),
  num("How do you evaluate candidate quality beyond keyword matching?"),
  num("How do you reach passive candidates?"),
  num("How will you learn our business and team context?"),
  num("Which hiring model do you recommend, and why?"),
  num("What are your complete commercial and contractual terms?"),
  num("How do you use AI, and where does human judgment remain?"),
  num(
    "Will you challenge our hiring assumptions when market evidence suggests we should reconsider them?",
  ),
  num("How will we measure quality and performance?"),
  p(
    "If an agency cannot answer these questions clearly before you sign an agreement, it is unlikely to become more transparent after you do.",
  ),

  h2("From Filling Roles to Building Capability"),
  p(
    "The staffing industry is changing. Technology has made candidate discovery faster, AI has made matching more scalable, and automation has taken over many administrative tasks.",
  ),
  p(
    "None of that removes the central challenge of hiring: making a good judgment about another human being.",
  ),
  p(
    "The best IT staffing agency isn't necessarily the one with the largest database, the fastest promise or the lowest fee. It is the partner that understands what you're trying to build, knows the talent market, separates signal from noise and has enough expertise to tell you when the hiring brief itself needs to change.",
  ),
  p("Because ultimately, companies don't need more resumes. They need the right capability."),

  h2("About TalentiFi-X"),
  p(
    "TalentiFi-X is a ",
    { a: "talent acquisition and staffing company", href: "/solutions" },
    " operating across the United States and India. Its approach combines technology-enabled recruitment with human judgment across temporary staffing, permanent placement, contract-to-hire and executive search.",
  ),
  ask("Human Led. AI Assisted."),
];

// ---------------------------------------------------------------------------
// FAQ (rendered after the body, and emitted as FAQPage structured data)
// ---------------------------------------------------------------------------

const faq = [
  [
    "What is an IT staffing agency?",
    "An IT staffing agency helps companies source, evaluate and hire technology professionals. Depending on the provider and the engagement, this can include contract staffing, contract-to-hire, direct hire and specialized technology recruitment.",
  ],
  [
    "When should a company use an IT staffing agency?",
    "Companies commonly use IT staffing agencies when they need specialized technical talent, have difficult-to-fill positions, need extra recruiting capacity, want flexible contract talent or want access to candidates beyond their existing applicant pool.",
  ],
  [
    "What is the difference between IT staffing and IT recruitment?",
    "The terms are often used interchangeably. Staffing usually includes flexible workforce models such as contract and contract-to-hire, while recruitment can refer more broadly to sourcing and hiring permanent employees.",
  ],
  [
    "What is contract-to-hire?",
    "Contract-to-hire is an arrangement in which a professional starts on a contract basis with the possibility of moving to permanent employment, subject to the agreed terms and the employer's decision.",
  ],
  [
    "Should I choose a specialized IT staffing agency?",
    "For highly technical or niche positions, specialization can be valuable. Recruiters who know the domain are better equipped to understand skill combinations, candidate markets and role-specific screening requirements.",
  ],
  [
    "How much does an IT staffing agency cost?",
    "Costs vary considerably with the staffing model, role, location, scarcity of skills, seniority and provider. Direct hire arrangements often use placement fees, while contract staffing typically uses a bill rate. Ask for the complete commercial model and terms before engaging an agency.",
  ],
  [
    "How quickly can an IT staffing agency find candidates?",
    "There is no responsible universal answer. Timing depends on role complexity, compensation, location, work model, required skills, market supply and your own interview process. Be cautious of any provider that promises a fixed hiring timeline before it understands the requirement.",
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
  check(!/talentifi-x/i.test(text.replace(/TalentiFi-X/g, "")), `Brand misspelt in: ${text.slice(0, 60)}`);
}
check(post.metaTitle.length <= 60, `metaTitle is ${post.metaTitle.length} chars (max 60)`);
check(
  post.metaDescription.length >= 120 && post.metaDescription.length <= 155,
  `metaDescription is ${post.metaDescription.length} chars (120-155)`,
);
check(post.slug.length <= 96, `slug is ${post.slug.length} chars (max 96)`);
check(post.imageAlt.trim().length > 0, "mainImage alt text is required");
check(!body.some((b) => b.style === "h1"), "body must not contain an H1");

console.log(`Title            ${post.title.length} chars`);
console.log(`Meta title       ${post.metaTitle.length} / 60`);
console.log(`Meta description ${post.metaDescription.length} / 155`);
console.log(`Introduction     ${post.introduction.length} chars`);
console.log(`Slug             ${post.slug.length} / 96`);
console.log(`Image alt        ${post.imageAlt.length} chars`);
console.log(`Body             ${body.length} blocks, ${body.filter((b) => b.style === "h2").length} H2`);
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

if (UPDATE) {
  try {
    const result = await client
      .patch(`post-${post.slug}`)
      .set({ body, readTime, founderInsights: true })
      .commit();
    console.log(`\nUpdated body, read time and founder toggle: ${result._id}`);
  } catch (err) {
    console.error("Update failed:", err.message);
    process.exit(1);
  }
  process.exit(0);
}

try {
  console.log(`\nUploading hero image to dataset "${dataset}"...`);
  const asset = await client.assets.upload("image", readFileSync(IMAGE_PATH), {
    filename: "talentifix-blog-how-to-choose-it-staffing-agency-usa.webp",
    contentType: "image/webp",
  });
  console.log(`  Image asset: ${asset._id}`);

  const doc = {
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    published: true,
    author: post.author,
    founderInsights: true,
    publishedAt: post.publishedAt,
    category: post.category,
    readTime,
    introduction: post.introduction,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: post.imageAlt,
    },
    body,
    faq,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    noindex: false,
  };

  const result = await client.createOrReplace(doc);
  console.log(`Uploaded and published: ${result._id}`);
  console.log(`  /blog/${post.slug}`);
} catch (err) {
  console.error("Upload failed:", err.message);
  process.exit(1);
}
