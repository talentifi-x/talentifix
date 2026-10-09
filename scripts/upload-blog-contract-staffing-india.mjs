/**
 * Upload "Contract Staffing in India: A Complete Guide for Employers in 2026"
 * to Sanity, published and dated 3 October 2026.
 *
 * Text is plain ASCII: no em or en dashes, curly quotes, arrows or ellipses.
 * The script refuses to upload if any slip in, or if an SEO field is over its
 * limit.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-contract-staffing-india.mjs --dry-run
 *   node --env-file=.env.local scripts/upload-blog-contract-staffing-india.mjs
 *   node --env-file=.env.local scripts/upload-blog-contract-staffing-india.mjs --update
 *
 * --update patches only the body, read time, founder toggle and hero image of the
 * live post, so edits made in the studio to other fields are kept.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
// next-sanity re-exports the client; @sanity/client is not resolvable under pnpm.
import { createClient } from "next-sanity";

const DRY_RUN = process.argv.includes("--dry-run");
const UPDATE = process.argv.includes("--update");

/** Absolute path to the hero image, or null to publish without one. */
const IMAGE_PATH = fileURLToPath(
  new URL("../Blogs/images/talentifix-blog-contract-staffing-india-guide.webp", import.meta.url),
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
  title: "Contract Staffing in India: A Complete Guide for Employers in 2026",
  slug: "contract-staffing-india-guide",
  author: "TalentiFi-X Editorial Team",
  category: "Modern Staffing",
  publishedAt: "2026-10-03T09:00:00.000Z",
  introduction:
    "Contract staffing gives employers in India a way to bring in specialized capability for as long as the business needs it. This guide covers how it works, what it costs, compliance and how to choose a partner.",
  metaTitle: "Contract Staffing Services in India: Employer Guide 2026",
  metaDescription:
    "Learn how contract staffing works in India: benefits, costs, compliance considerations and how to choose the right contract staffing partner.",
  imageAlt:
    "Hiring leader beside a stable core of permanent team profiles, with contract specialists joining project modules on a timeline",
};

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const body = [
  p(
    "India's workforce model is changing. Companies increasingly need specialized capabilities without necessarily needing every one of them permanently.",
  ),
  p(
    "A technology transformation may require cloud engineers for a defined period. A new implementation may create temporary demand for developers or data professionals. A growing company may need extra capacity before it is ready to expand permanent headcount.",
  ),
  p(
    "This is where contract staffing becomes valuable. But it is often misunderstood as simply a faster or cheaper alternative to permanent hiring. It isn't.",
  ),
  p(
    "Used well, contract staffing is a workforce strategy. It gives organizations another way to access capability, respond to changing demand and shape their workforce around what the business actually needs.",
  ),
  p(
    "So how does contract staffing work in India, when should companies use it, and what should an employer consider before choosing a contract staffing company? Let's break it down.",
  ),

  h2("What Is Contract Staffing?"),
  p(
    { a: "Contract staffing", href: "/solutions#temporary-staffing" },
    " is a hiring model in which professionals work for an organization for a defined period or requirement, rather than joining it as conventional permanent employees. Depending on the contractual structure, the professional may be employed by a staffing company and deployed to work with the client organization.",
  ),
  p("Contract assignments can be structured around:"),
  li("A defined project"),
  li("A particular period"),
  li("Temporary increases in workload"),
  li("Specialized skill requirements"),
  li("Technology implementations"),
  li("Replacement or interim requirements"),
  li("Flexible workforce needs"),
  p(
    "The precise employment, payroll and statutory responsibilities depend on the contractual arrangement between the parties. That point matters, because not every contract staffing arrangement is structured the same way.",
  ),
  p(
    "Before an engagement begins, companies should establish clearly who the employer is, which entity handles payroll and statutory obligations, and which responsibilities sit with the client and which with the staffing provider.",
  ),

  h2("How Does Contract Staffing Work in India?"),
  p(
    "A typical contract staffing engagement begins with the employer identifying a workforce requirement. For example:",
  ),
  quote(
    '"We need four data engineers with specific cloud experience for a nine-month transformation project."',
  ),
  p(
    "A staffing partner then works to understand the requirement, identify suitable professionals, screen candidates and present a relevant shortlist. Once candidates are selected, the commercial and employment structure agreed between the employer, the staffing company and the professional determines how the engagement runs.",
  ),
  p("A simplified process looks like this:"),
  num("Requirement"),
  num("Talent search"),
  num("Screening"),
  num("Client interview"),
  num("Selection"),
  num("Contracting and onboarding"),
  num("Deployment"),
  num("Assignment management"),
  p(
    'The important point is that contract staffing should not simply mean "find someone quickly." It should mean "find the appropriate capability for the period and business requirement in which it is needed."',
  ),

  h2("Why Are Companies Using Contract Staffing in India?"),
  p(
    "There isn't one reason. Different organizations use contract staffing to solve different workforce problems.",
  ),
  h3("1. Access to Specialized Skills"),
  p("Some capabilities are extremely valuable but may not be needed permanently. Consider:"),
  li("Cloud migration"),
  li("Cybersecurity projects"),
  li("Enterprise technology implementation"),
  li("Data engineering"),
  li("AI and ML initiatives"),
  li("Software modernization"),
  li("ERP implementation"),
  li("Digital transformation"),
  p(
    "A company may need significant specialist capability for twelve months without needing the same team indefinitely. Contract staffing provides another route to that talent.",
  ),

  h3("2. Greater Workforce Flexibility"),
  p(
    "Business demand is rarely constant. Projects begin and end, clients are won and lost, technology priorities change, new markets open and companies reorganize. A workforce made up entirely of fixed permanent roles can make it harder to respond to those changes.",
  ),
  p(
    "Contract staffing lets organizations build flexible capacity around their permanent capability. That doesn't mean replacing permanent employees with contractors. It means designing a workforce where different forms of talent serve different business requirements.",
  ),

  h3("3. Faster Access to Talent"),
  p(
    "Permanent recruitment can involve many stages. Sourcing, interviews, notice periods and onboarding can all stretch the time between identifying a need and having someone actually doing the work.",
  ),
  p(
    "Contract staffing can sometimes provide faster access, particularly when the staffing partner maintains active networks of professionals open to project-based work. Still, be cautious of universal promises such as:",
  ),
  quote('"We can fill every contract role in 48 hours."'),
  p("The availability of talent depends on:"),
  li("Skill scarcity"),
  li("Compensation"),
  li("Location"),
  li("Seniority"),
  li("Work model"),
  li("Project duration"),
  li("Candidate availability"),
  li("Interview requirements"),
  p("Speed matters. Relevance matters more."),

  h3("4. Project-Based Workforce Planning"),
  p("Consider a company implementing a new enterprise platform. It might need:"),
  li("Solution architects"),
  li("Developers"),
  li("Integration specialists"),
  li("Data professionals"),
  li("Testing professionals"),
  li("Project managers"),
  p(
    "Once the implementation matures, the team it needs may look very different. Hiring every capability permanently can create a mismatch between project demand and long-term workforce demand. Contract staffing lets organizations align some talent requirements more closely with the lifecycle of the work.",
  ),

  h3("5. Access to Talent Without Depending Only on Applicants"),
  p(
    "One important advantage of working with a specialized staffing company is access to candidates beyond those applying directly to you. This matters most for niche technology requirements, because ",
    {
      a: "the available talent market is larger than the applicant pool",
      href: "/blog/passive-candidate-recruitment-best-talent",
    },
    ".",
  ),
  p("A staffing partner can reach professionals through:"),
  li("Existing candidate relationships"),
  li("Direct sourcing"),
  li("Referrals"),
  li("Professional networks"),
  li("Specialist communities"),
  li("Previous recruitment engagements"),
  p(
    "The objective shouldn't be generating more applications. It should be finding more relevant talent.",
  ),

  h2("Contract Staffing vs Permanent Hiring"),
  p(
    "Neither model is inherently better. Contract staffing and ",
    { a: "permanent hiring", href: "/solutions#permanent-placement" },
    " solve different workforce problems.",
  ),
  table([
    ["Factor", "Contract Staffing", "Permanent Hiring"],
    ["Employment horizon", "Defined/flexible", "Long term"],
    [
      "Best suited for",
      "Projects, temporary capacity, specialist requirements",
      "Core long-term capability",
    ],
    ["Workforce flexibility", "Higher", "Lower"],
    ["Continuity", "Depends on assignment", "Typically stronger"],
    ["Talent model", "Flexible workforce", "Permanent workforce"],
    ["Knowledge retention", "Requires planning", "Generally easier"],
    ["Hiring decision", "Assignment-specific", "Long-term organizational decision"],
  ]),
  p('So the better question isn\'t "Should we hire contractors or permanent employees?" It is:'),
  quote(
    '"Which capabilities need to live permanently inside the organization, and which do we need for a particular period or outcome?"',
  ),
  p("That is a workforce design question, not simply a recruitment question."),

  h2("Contract Staffing vs Contract-to-Hire"),
  p(
    "These terms are sometimes confused. Contract staffing generally means engaging someone for a defined assignment or period. ",
    { a: "Contract-to-hire", href: "/solutions#contract-to-hire" },
    " is a contract engagement with the possibility of the professional moving into a permanent role, subject to the agreed arrangement and both parties' decisions.",
  ),
  p(
    'Contract-to-hire can be useful when an organization expects a requirement to become permanent but wants an initial contract period first. It should not be treated as an informal "trial employment" mechanism without understanding the contractual and employment implications involved. The terms should be clear from the beginning.',
  ),

  h2("What Does Contract Staffing Cost in India?"),
  p("There is no single standard price for contract staffing services in India. Costs can vary with:"),
  li("The role"),
  li("Skill scarcity"),
  li("Candidate experience"),
  li("Location"),
  li("Assignment duration"),
  li("Compensation"),
  li("Hiring volume"),
  li("Employment structure"),
  li("Statutory obligations"),
  li("Benefits"),
  li("Insurance, where applicable"),
  li("Staffing provider services"),
  li("Commercial margin"),
  p(
    "So be cautious about comparing staffing partners on a single headline number. Ask for a transparent explanation of the commercial structure. Depending on the arrangement, it may look like this:",
  ),
  ask(
    "Candidate compensation + applicable employment and statutory costs + agreed staffing or service margin = client billing",
  ),
  p(
    "The exact components will depend on the engagement. A good contract staffing company should be able to explain its commercial model before deployment begins.",
  ),

  h2("Compliance Considerations for Contract Staffing in India"),
  p(
    "Compliance is where employers need to be most careful. India's employment and labour law framework is not something to reduce to a generic online checklist.",
  ),
  p(
    "Obligations can vary with the employment structure, the establishment, the workforce, the nature of the work, the location and the applicable legislation. Depending on the arrangement, areas to consider may include employment documentation, wages, social security obligations, working conditions, workplace policies, statutory records, and how responsibilities are divided between the contractor or staffing provider and the client organization.",
  ),
  p(
    "India has also been moving from its earlier framework of numerous central labour laws to four labour codes:",
  ),
  li("Code on Wages"),
  li("Industrial Relations Code"),
  li("Code on Social Security"),
  li("Occupational Safety, Health and Working Conditions Code"),
  p(
    "How these requirements apply should be evaluated against the current legal position and your specific employment arrangement. Employers should take qualified legal and compliance advice rather than treating any staffing article, including this one, as legal guidance.",
  ),

  h2("IT Contract Staffing in India"),
  p(
    "Technology is one of the clearest use cases for contract staffing, because technology demand often changes faster than traditional workforce planning cycles. A company may suddenly need capability in:",
  ),
  li({ b: "Software Engineering: " }, "frontend, backend, full-stack and mobile development"),
  li({ b: "Cloud & DevOps: " }, "cloud architecture, DevOps, SRE and platform engineering"),
  li({ b: "Data: " }, "data engineering, analytics, data science and business intelligence"),
  li(
    { b: "Artificial Intelligence: " },
    "AI engineering, machine learning, MLOps and emerging GenAI capabilities",
  ),
  li({ b: "Cybersecurity: " }, "security engineering, cloud security, SOC and governance capabilities"),
  li({ b: "Enterprise Applications: " }, "ERP, CRM and large-scale technology implementations"),
  p(
    "The challenge isn't simply finding someone whose CV contains the right technology. It is understanding:",
  ),
  li("What has this person actually built?"),
  li("At what scale?"),
  li("In what environment?"),
  li("What did they personally own?"),
  li("Are those capabilities relevant to the project in front of us?"),
  p("That is why technical contract staffing needs more than keyword matching."),

  h2("How Should Companies Choose a Contract Staffing Partner in India?"),
  p("Before signing with a staffing company, ask these questions."),
  h3("1. Does the agency understand the roles we hire for?"),
  p(
    "Generic sourcing capability and specialist recruitment capability are not the same thing. Ask for evidence of experience in the relevant skill categories.",
  ),
  h3("2. How are candidates screened?"),
  p("Understand what happens before a resume reaches your hiring manager."),
  h3("3. Can the agency access passive talent?"),
  p("The strongest candidate may not currently be applying anywhere."),
  h3("4. Who is responsible for employment and payroll?"),
  p("This should be explicit."),
  h3("5. How are statutory and compliance responsibilities divided?"),
  p("Never leave this ambiguous."),
  h3("6. What is included in the commercial rate?"),
  p("Understand the complete cost structure."),
  h3("7. How quickly can the agency realistically deliver?"),
  p("Look for evidence rather than extraordinary promises."),
  h3("8. What happens if a contractor leaves during an assignment?"),
  p("Understand the replacement and continuity process."),
  h3("9. How does the staffing company protect confidential information?"),
  p(
    "This matters most for contractors working with proprietary technology, customer data or sensitive business systems.",
  ),
  h3("10. Will the agency challenge an unrealistic hiring requirement?"),
  p(
    "This is an underrated indicator of expertise. A staffing partner shouldn't simply take orders. It should bring market intelligence to the conversation.",
  ),
  p(
    "Hiring technology talent in the US as well? Our guide on ",
    {
      a: "how to choose an IT staffing agency in the USA",
      href: "/blog/how-to-choose-it-staffing-agency-usa",
    },
    " covers the same decision for US roles.",
  ),

  h2("Red Flags When Choosing a Contract Staffing Company"),
  p("Be cautious when a provider:"),
  li("Promises candidates before properly understanding the requirement"),
  li("Sends large numbers of irrelevant resumes"),
  li("Cannot explain who employs the contractor"),
  li("Is unclear about payroll or statutory responsibilities"),
  li("Offers an opaque commercial structure"),
  li("Lacks expertise in your skill category"),
  li("Cannot explain its screening method"),
  li("Promises identical turnaround times for every role"),
  li("Focuses on database size rather than candidate relevance"),
  li("Cannot explain how candidate and company data are handled"),
  p("A staffing company should reduce complexity for the client, not introduce new uncertainty."),

  h2("Contract Staffing Should Be About Capability, Not Just Headcount"),
  p(
    'The most useful way to think about contract staffing isn\'t "How can we add people without adding permanent employees?" It is "What capability does the business need, and for how long?"',
  ),
  p(
    "Sometimes the right answer is permanent hiring. Sometimes it is contract talent. Sometimes it is reskilling someone already inside the organization. And sometimes the requirement itself needs to be redesigned.",
  ),
  p(
    "A strong staffing partner does more than put resumes against requisitions. It understands the requirement and the talent market, and helps the organization find the right capability through the right workforce model.",
  ),
  p(
    "Flexible staffing should not mean compromising on hiring quality. Flexibility is the model. Capability is still the objective.",
  ),

  h2("About TalentiFi-X"),
  p(
    "TalentiFi-X operates across India and the United States, providing talent acquisition solutions across ",
    { a: "temporary staffing", href: "/solutions#temporary-staffing" },
    ", ",
    { a: "permanent placement", href: "/solutions#permanent-placement" },
    ", ",
    { a: "contract-to-hire", href: "/solutions#contract-to-hire" },
    " and ",
    { a: "executive search", href: "/solutions#executive-search" },
    ".",
  ),
  p(
    "TalentiFi-X combines technology-enabled recruitment with human judgment to help organizations identify relevant talent while maintaining human accountability in the hiring process.",
  ),
  ask("Human Led. AI Assisted."),
];

// ---------------------------------------------------------------------------
// FAQ (rendered after the body, and emitted as FAQPage structured data)
// ---------------------------------------------------------------------------

const faq = [
  [
    "What is contract staffing in India?",
    "Contract staffing is a workforce model in which professionals are engaged for a defined period, project or business requirement rather than being hired into conventional permanent positions. The employment and commercial structure depends on the arrangement between the staffing provider, the client and the professional.",
  ],
  [
    "Is contract staffing the same as temporary staffing?",
    "The terms overlap, but they aren't always used the same way. Temporary staffing often refers broadly to short-duration workforce needs, while contract staffing can also include specialized professionals engaged for longer projects or defined assignments.",
  ],
  [
    "Is contract staffing suitable for IT companies?",
    "Yes. Contract staffing can be particularly useful for technology projects that need specialized capabilities for a defined period, including software development, cloud, data, cybersecurity, enterprise applications and AI-related work.",
  ],
  [
    "What is the difference between contract staffing and permanent staffing?",
    "Permanent staffing focuses on long-term employees who become part of the organization's ongoing workforce. Contract staffing is generally structured around defined assignments, periods or flexible workforce requirements.",
  ],
  [
    "Can a contract employee become permanent?",
    "That depends on the contractual arrangement and the decisions of the parties involved. Contract-to-hire models specifically create a potential path from an initial contract engagement to permanent employment.",
  ],
  [
    "How much do contract staffing companies charge in India?",
    "There is no universal rate. Pricing depends on factors such as compensation, skill scarcity, duration, employment structure, statutory obligations, the services provided and the staffing company's commercial model.",
  ],
  [
    "What should employers check before using a contract staffing agency?",
    "Check the agency's recruitment expertise, screening process, employment structure, payroll responsibilities, compliance model, commercial terms, replacement process, data security practices and experience with the skills you need.",
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
      .set({ body, readTime, founderInsights: true, ...(mainImage ? { mainImage } : {}) })
      .commit();
    console.log(`\nUpdated body, read time, founder toggle and hero image: ${result._id}`);
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
    founderInsights: true,
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
