/**
 * Upload "One Job Title, Five Different Roles: Why Technical Hiring Starts With
 * Role Definition" to Sanity, published, with its hero image.
 *
 * Source: the Blog 3 brief dated 4 Nov 2026, published as written. Changes from the
 * brief: US spelling to match the site, the URL under /blog, the meta description
 * cut to 155 characters, the arrow flows and "Instead of / Ask" pairs set as
 * tables, and internal links placed on existing words. Source tags became links:
 * the "AKA Security" analysis could not be found, so that line now cites CyberSN's
 * 2026 jobs report, which makes the same point; the "(Greenhouse)" tag pointed at
 * job postings that will close, so that line carries no link. The FAQ is new and
 * only restates the article.
 *
 * Text is plain ASCII. The script refuses to upload if a long dash, curly quote or
 * other non-ASCII character slips in, or if an SEO field is over its limit.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-one-job-title-five-roles.mjs --dry-run
 *   node --env-file=.env.local scripts/upload-blog-one-job-title-five-roles.mjs
 *   node --env-file=.env.local scripts/upload-blog-one-job-title-five-roles.mjs --update
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
  new URL("../Blogs/images/talentifix-blog-one-job-title-five-different-roles-technical-hiring.webp", import.meta.url),
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

const SOURCES = {
  cybersn: "https://cybersn.com/resources/reports/cybersecurity-jobs-report",
  aihr: "https://www.aihr.com/blog/skills-based-hiring/",
  linkedin:
    "https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/skills-based-hiring-march-2025.pdf",
};

// ---------------------------------------------------------------------------
// Post fields
// ---------------------------------------------------------------------------

const post = {
  title: "One Job Title, Five Different Roles: Why Technical Hiring Starts With Role Definition",
  slug: "one-job-title-five-different-roles-technical-hiring",
  author: "TalentiFi-X Editorial Team",
  category: "Hiring Strategy",
  publishedAt: "2026-11-04T09:00:00.000Z",
  introduction:
    "\"We need a Security Engineer\" sounds like a clear hiring requirement. It often isn't. Here is why broad technical job titles attract mismatched candidates, and how to define a role around the problem, the outcomes and the capabilities first.",
  metaTitle: "One Job Title, Five Different Roles: Fixing Technical Hiring",
  metaDescription:
    "Why Security Engineer and AI Engineer titles attract mismatched candidates, and how technical hiring gets better when roles start with the problem.",
  imageAlt:
    "Hiring manager and recruiter at an office table with one blank job brief in the center and five different candidate folders arranged around it",
};

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const body = [
  p("\"We need a Security Engineer.\""),
  p("It sounds like a clear hiring requirement."),
  p("It often isn't."),
  p(
    "Depending on the company, that one title could describe an Application Security Engineer, a Cloud Security Engineer, a Detection and Response Engineer, a technically strong GRC professional, or the person expected to own the entire security function because there is no team yet.",
  ),
  p("The same problem is showing up across technology hiring."),
  p(
    "\"We need an AI Engineer\" could mean someone who builds and evaluates RAG systems, someone who works on model fine-tuning, an engineer who builds agentic workflows, or a software engineer integrating AI APIs into an existing product.",
  ),
  p("These are not interchangeable roles."),
  p(
    "They need different technical depth, different experience, different interview questions and often completely different career backgrounds.",
  ),
  p("Yet companies frequently begin the hiring process with the same broad job title."),
  p("That creates a problem long before the first resume arrives."),

  h2("The Technical Hiring Problem Often Starts Before the Search"),
  p("When a technical role is poorly defined, the hiring funnel can look healthy on paper."),
  p(
    "Applications come in. Recruiters find candidates. Search results are full. The hiring manager has plenty of resumes to review.",
  ),
  p("But the quality of the funnel is misleading."),
  p(
    "Many of the candidates may be good at what they do. They simply may not be good at the specific problem the company needs solved.",
  ),
  p("That distinction matters."),
  p("The problem is not necessarily a shortage of talent."),
  p("It can be a shortage of ", { a: "role clarity", href: "/blog/role-clarity-chaotic-hiring-process-india" }, "."),
  quote(
    "A vague requirement creates a broad search. A broad search creates a noisy candidate pool. And a noisy candidate pool forces recruiters and hiring managers to spend more time figuring out what they were actually looking for in the first place.",
  ),
  p(
    "This matters even more in technical hiring because technology roles are becoming increasingly specialized.",
  ),
  p(
    { a: "Security", href: "/talent/cybersecurity-talent" },
    " is no longer one discipline. ",
    { a: "AI engineering", href: "/talent/ai-machine-learning-talent" },
    " is not one discipline either. ",
    { a: "Cloud engineering", href: "/talent/cloud-devops-talent" },
    ", ",
    { a: "data", href: "/talent/data-analytics-talent" },
    ", ",
    { a: "software engineering", href: "/talent/software-engineering-talent" },
    " and platform roles have all developed into increasingly distinct areas of expertise.",
  ),
  p("The title alone often doesn't tell you enough."),

  h2("Why \"Security Engineer\" Can Mean Five Different Jobs"),
  p("Consider a company that opens a position called Security Engineer."),
  p("What exactly will this person own?"),
  h3("1. Application Security"),
  p(
    "The person may work closely with software engineering teams to find and fix vulnerabilities in applications and development workflows. The role could involve:",
  ),
  li("Application security"),
  li("Secure software development"),
  li("Code analysis"),
  li("Threat modeling"),
  li("Vulnerability management"),
  li("Security testing"),
  li("Developer security enablement"),
  p("This is a very different role from someone responsible for monitoring security events."),
  h3("2. Cloud Security"),
  p(
    "Another company may use \"Security Engineer\" for someone responsible for securing cloud infrastructure. That could involve:",
  ),
  li("Cloud security architecture"),
  li("Identity and access management"),
  li("Infrastructure security"),
  li("Cloud configuration"),
  li("Security controls"),
  li("Container or workload security"),
  li("Cloud monitoring"),
  p("The candidate profile changes considerably."),
  h3("3. Detection & Response"),
  p(
    "A third organization may actually be looking for someone who builds and improves its detection and response capability. That could mean:",
  ),
  li("Security monitoring"),
  li("Detection engineering"),
  li("Incident response"),
  li("Threat detection"),
  li("Security operations"),
  li("SIEM environments"),
  li("Automation"),
  p(
    "Security hiring data reflects how loose the titles have become. ",
    { a: "CyberSN's 2026 cybersecurity jobs report", href: SOURCES.cybersn },
    ", which tracks US security job postings, counts demand by the work a posting asks for rather than the title on the listing, because, in its own words, job titles are noisy.",
  ),
  p("The title is evolving. That makes the underlying job definition even more important."),
  h3("4. GRC With a Technical Edge"),
  p(
    "A fourth company could be looking for someone working across governance, risk and compliance, but with enough technical understanding to engage deeply with engineering and security teams. That could involve:",
  ),
  li("Security governance"),
  li("Risk assessment"),
  li("Compliance"),
  li("Controls"),
  li("Audit readiness"),
  li("Security frameworks"),
  li("Technical risk"),
  p("Again, \"Security Engineer\" doesn't communicate enough."),
  h3("5. \"Own Everything\""),
  p("And sometimes the requirement is simply: \"We need someone to own security.\""),
  p(
    "There is no security team yet. There is no established security function. There may not even be a clear boundary between security engineering, governance, incident response and architecture.",
  ),
  p(
    "That is not a Security Engineer role in the same sense as the four examples above. It is closer to building a security function.",
  ),
  p("The hiring strategy should be completely different."),

  h2("The Same Problem Exists With \"AI Engineer\""),
  p("AI is making this problem even more visible."),
  p("\"AI Engineer\" has become a broad label for several different types of work. Depending on the company, the role might focus on:"),
  li("RAG and retrieval"),
  li("LLM evaluation and application reliability"),
  li("Agentic workflows and tool use"),
  li("Model fine-tuning"),
  li("Integrating AI capabilities into an existing software product"),
  p(
    "Read a handful of current AI engineering job postings and the variation is obvious. Some describe engineers working on agentic pipelines, retrieval infrastructure, vector databases, evaluation and production systems. Others focus on building retrieval and LLM systems directly into products.",
  ),
  p("These candidates may all have \"AI Engineer\" somewhere in their experience."),
  p("But their actual capabilities can be very different."),
  p(
    "That is why a search based mainly on the job title can produce an impressive-looking but poorly matched candidate pool.",
  ),

  h2("A Good Candidate Can Still Be the Wrong Candidate"),
  p("This is one of the most important distinctions in technical recruitment. A candidate can be:"),
  li("highly experienced"),
  li("technically strong"),
  li("well qualified"),
  li("working at a respected company"),
  li("excellent in interviews"),
  p("and still be wrong for the role."),
  p("Why?"),
  p(
    "Because hiring is not about finding the best candidate in the abstract. It is about finding the person whose capabilities match the problem the organization needs solved.",
  ),
  p(
    "A Cloud Security Engineer may be an excellent security professional. That does not make them the right person to build an AppSec program.",
  ),
  p(
    "An ML Engineer may have deep experience training models. That does not automatically make them the right person to build a production RAG application.",
  ),
  p(
    "A GRC professional may understand security frameworks exceptionally well. That does not mean they should be expected to build detection pipelines.",
  ),
  quote("Good candidate does not always mean good fit."),
  p("That distinction becomes particularly important when technical job titles are broad."),

  h2("The Three Questions to Ask Before Opening a Technical Role"),
  p("Before searching for candidates, the hiring manager and talent team should answer three questions."),
  h3("1. What Problem Will This Person Own?"),
  p("Not: what are their responsibilities?"),
  p("Instead: what problem are we hiring this person to solve?"),
  p("This pulls the conversation away from generic job-description language."),
  p(
    "For example, instead of \"Responsible for cloud security and security best practices,\" ask: \"What cloud security problem is currently creating risk for the organization?\"",
  ),
  p(
    "Perhaps the answer is: \"We are moving 70% of our infrastructure to the cloud and need someone to establish the security architecture, controls and monitoring model.\"",
  ),
  p("Now the role becomes much clearer."),
  quote("The problem defines the capability."),
  h3("2. What Does Success Look Like in the First 90 Days?"),
  p(
    "A job description can contain twenty responsibilities and still fail to explain what success means. The first 90 days are often a better test.",
  ),
  p("Ask: if we hire the right person today, what should be different 90 days from now?"),
  p("For a Cloud Security role, that might mean:"),
  li("establishing an initial cloud security baseline"),
  li("identifying critical gaps"),
  li("prioritizing remediation"),
  li("implementing key controls"),
  li("creating visibility across the cloud environment"),
  p("For an AI Engineer, it might mean:"),
  li("taking an existing prototype into production"),
  li("improving retrieval quality"),
  li("establishing evaluation criteria"),
  li("reducing latency"),
  li("improving reliability"),
  li("integrating the system with an existing product"),
  p("Now the recruiter knows what to look for."),
  p("More importantly, the candidate knows what they are actually being hired to accomplish."),
  p(
    "Skills-based hiring guidance increasingly recommends tying required capabilities to observable outcomes rather than relying mainly on titles, credentials or years of experience. ",
    { a: "AIHR's practical guide to skills-based hiring", href: SOURCES.aihr },
    ", for example, advises rewriting job descriptions around skills and measurable outcomes.",
  ),
  h3("3. What Can We Teach, and What Has to Walk In on Day One?"),
  p("Not every skill needs to be a hiring filter."),
  p("This is where many technical job descriptions become unnecessarily restrictive. A hiring manager may list:"),
  li("10 tools"),
  li("5 certifications"),
  li("3 programming languages"),
  li("8 platforms"),
  li("7 years of experience"),
  p("and call all of them \"must-have\"."),
  p("But are they really?"),
  p(
    "The better questions are: which capabilities are essential on day one, and which skills can a strong candidate reasonably learn?",
  ),
  p(
    "For example, if the actual requirement is deep cloud security architecture, familiarity with one specific cloud security tool may be learnable. If the requirement is building detection systems at scale, hands-on detection engineering experience may not be.",
  ),
  p(
    "Separating essential capability from learnable knowledge makes the hiring brief sharper and often expands the relevant talent pool without lowering the bar. ",
    { a: "LinkedIn's research on skills-based hiring", href: SOURCES.linkedin },
    " found that a skills-based approach could widen talent pools by 6.1x globally.",
  ),

  h2("From Job Description to Hiring Brief"),
  p(
    "A conventional technical job description often starts with the title and works down. A better hiring brief starts with the problem.",
  ),
  table([
    ["Conventional job description", "Hiring brief"],
    ["Title", "Problem: what needs to be solved?"],
    ["Responsibilities", "Outcomes: what should be different after the person joins?"],
    ["Requirements", "Capabilities: what does the person need to be able to do?"],
    ["Qualifications", "Evidence: what would prove that they have done it before?"],
  ]),
  p("That is a meaningful shift. It also improves the screening process."),
  table([
    ["Instead of asking", "Ask"],
    ["Does this person have \"AI experience\"?", "Have they taken an AI system from prototype to production?"],
    ["Do they have security experience?", "Have they built or operated the security capability this role actually requires?"],
    ["Have they worked with AWS?", "Have they solved the cloud security problems this environment is facing?"],
  ]),
  p("The question becomes more precise. So does the search."),

  h2("Why Clearer Roles Usually Produce Better Candidate Pools"),
  p(
    "The objective of a hiring process is not to generate the maximum number of applications. It is to generate enough relevant candidates to make a confident decision.",
  ),
  p(
    "When a role is vague, recruiters compensate by searching more broadly. That can ",
    { a: "increase volume while reducing relevance", href: "/blog/too-many-job-applications-hiring-challenges" },
    ".",
  ),
  p("A clearer brief does the opposite. It narrows the search around the capabilities that actually matter."),
  p(
    "This is one reason skills-based hiring is increasingly focused on observable capabilities, structured evaluation and outcome-based job descriptions.",
  ),
  p("The result is not necessarily more candidates. It can be fewer candidates who make more sense."),
  p(
    "And that is usually a ",
    { a: "better hiring funnel", href: "/blog/precision-hiring-future-of-recruitment" },
    ".",
  ),

  h2("Where AI Helps in Technical Recruitment"),
  p("Once the role is clearly defined, AI becomes extremely useful. AI can help recruitment teams:"),
  li("map role requirements"),
  li("identify related skills"),
  li("expand title variations"),
  li("structure screening criteria"),
  li("surface potentially relevant profiles"),
  li("identify gaps in a hiring brief"),
  li("generate role-specific interview questions"),
  li("compare candidate evidence against defined requirements"),
  p("This can significantly reduce the mechanical work involved in searching and screening."),
  p("But there is an important boundary."),
  quote("AI can help interpret the requirement. It cannot define the business requirement by itself."),
  p(
    "If the hiring manager says \"Find me a Security Engineer,\" AI can find thousands of people associated with security engineering.",
  ),
  p(
    "It cannot know whether the organization actually needs AppSec, Cloud Security, Detection & Response, GRC or a first security hire unless someone provides that context.",
  ),
  p("That context comes from the business."),

  h2("The Human Conversation That Saves the Most Time"),
  p(
    "The most valuable part of technical recruitment may happen before a single candidate is searched. It is the conversation between the hiring manager and the talent team.",
  ),
  p("Ask:"),
  li("What problem are we solving?"),
  li("What does success look like?"),
  li("What must this person already know?"),
  li("What can we teach?"),
  li("What decisions will they own?"),
  li("What will they actually be doing every week?"),
  li("Who will they work with?"),
  li("What happens if we hire the wrong profile?"),
  p("These questions turn a job title into a hiring strategy."),
  p("And that is where technology can then do its best work."),

  h2("Technical Hiring Is Moving From Titles to Capability"),
  p(
    "Job titles will always matter. They help candidates search. They help companies organize teams. They create a common language.",
  ),
  p(
    "But titles are becoming less reliable as a complete description of technical capability. That is particularly true in fast-moving areas such as AI, cybersecurity, cloud and data. The same title can represent very different work across different companies.",
  ),
  p("The future of technical hiring therefore needs a second layer beneath the title:"),
  quote("What does this person actually need to be able to do?"),
  p(
    "That is the question that makes sourcing better. It makes screening better. It makes interviewing better. And ultimately, it makes hiring decisions better.",
  ),

  h2("A Simple Framework for Hiring Technical Talent"),
  p("Before opening your next technical role, define these five things."),
  h3("01. The Problem"),
  p("What business or technical problem will this person own?"),
  h3("02. The Scope"),
  p("What will they actually be responsible for?"),
  h3("03. The Outcomes"),
  p("What should they accomplish in the first 90 days?"),
  h3("04. The Capabilities"),
  p("What must they already know or be able to do?"),
  h3("05. The Evidence"),
  p("What experience, work or behavior would prove those capabilities?"),
  p("Only then should the search begin."),
  p(
    "Because the quality of a technical search is heavily influenced by the quality of the requirement behind it.",
  ),

  h2("Final Thought"),
  p("A vague job description does not just create a sourcing problem. It creates a signal problem."),
  p(
    "When the requirement is unclear, the market sends back every reasonable interpretation of the title. That means more profiles. More screening. More interviews. More disagreement.",
  ),
  p("And often, more time spent discovering what the company actually needed in the first place."),
  p("The answer is not always a better search algorithm. Sometimes it is a better question at the beginning."),
  quote("What problem are we actually hiring this person to solve?"),
  p(
    "Once that is clear, the title becomes easier to define. The search becomes narrower. The candidates become more relevant. And the hiring decision becomes much easier to defend.",
  ),
];

// ---------------------------------------------------------------------------
// FAQ (rendered after the body, and emitted as FAQPage structured data)
// ---------------------------------------------------------------------------

const faq = [
  [
    "Why do broad technical job titles attract the wrong candidates?",
    "A title like Security Engineer or AI Engineer can describe several different jobs. When the role is not defined beyond the title, the search pulls in every reasonable interpretation of it, so the candidate pool looks full but many candidates are strong in a different specialty from the one the company needs.",
  ],
  [
    "What can \"Security Engineer\" mean in practice?",
    "Depending on the company, it can mean application security, cloud security, detection and response, governance, risk and compliance with a technical edge, or a first security hire expected to build the whole function. Each needs a different candidate profile and a different hiring strategy.",
  ],
  [
    "What should a hiring manager define before opening a technical role?",
    "Five things: the problem the person will own, the scope of the role, the outcomes expected in the first 90 days, the capabilities they must already have, and the evidence that would prove they have done this work before.",
  ],
  [
    "What is the difference between a job description and a hiring brief?",
    "A conventional job description lists the title, responsibilities, requirements and qualifications. A hiring brief starts with the problem, then the outcomes, the capabilities and the evidence, which makes sourcing and screening more precise.",
  ],
  [
    "Can AI define a technical role for you?",
    "No. AI can map requirements, expand title variations, structure screening criteria and surface relevant profiles once the role is clear. It cannot know whether the business needs AppSec, cloud security or a first security hire unless someone provides that context.",
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

const UK_SPELLING =
  /\b\w*(ised|ising|isation|yse|ysed|elling|elled)\b|\b(organis\w*|specialis\w*|prioritis\w*|programme|behaviour\w*|colour\w*|centre|modelling|favour\w*|labour)\b/i;

for (const text of allText) {
  const bad = text.match(/[^\x20-\x7E]/);
  check(!bad, `Non-ASCII character "${bad?.[0]}" in: ${text.slice(0, 60)}`);
  check(!/ - |--/.test(text), `Dash used as punctuation in: ${text.slice(0, 60)}`);
  check(!/talentifi-x|\bTX\b/i.test(text.replace(/TalentiFi-X/g, "")), `Brand misspelt in: ${text.slice(0, 60)}`);
  const uk = text.match(UK_SPELLING);
  check(!uk, `UK spelling "${uk?.[0]}" in: ${text.slice(0, 60)}`);
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
