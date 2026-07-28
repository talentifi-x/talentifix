/**
 * Upload "What Signal Looks Like in Senior Finance & Accounting Hiring in
 * India" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-finance-signal.mjs
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

/**
 * Paragraph with inline links. Pass an array of plain strings or
 * { text, href } objects. Internal hrefs (starting with "/") render through
 * Next.js Link; external hrefs open in a new tab.
 */
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
    "What Signal Looks Like in Senior Finance & Accounting Hiring in India",
  slug: "what-signal-looks-like-senior-finance-hiring-india",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Finance Hiring",
  readTime: "8 min read",
  introduction:
    "Senior finance hiring in India has changed. At the top end of the market, technical capability is no longer the differentiator it once was. Most experienced finance candidates already cover the basics: financial reporting, ERP systems, DCF modelling, forecasting, consolidation, controllership fundamentals, and compliance frameworks. None of that signals exceptional finance leadership anymore. It signals readiness to play. The real signal today is something else entirely: the ability to translate complexity into decisions, operate through ambiguity without losing rigour, and push back when numbers are being used to support the wrong conclusion.",
  metaTitle:
    "What Signal Looks Like in Senior Finance & Accounting Hiring in India | TalentiFi-X",
  metaDescription:
    "Senior finance hiring in India has changed. Technical skills are no longer enough. Here is what actually predicts success in CFO hiring, FP&A recruitment, and senior finance leadership in 2026.",
};

const body = [
  para(
    "That shift is quietly redefining finance hiring in India in 2026. And most organisations still have not adjusted their hiring processes to match it.",
  ),

  heading(
    "The Finance Hiring Market Has Changed Faster Than Most Companies Realise",
  ),
  para(
    "Demand for senior finance talent across India has accelerated dramatically over the last three years. GCC expansion, PE-backed growth, startup maturity, cross-border operations, increased investor scrutiny, and tighter capital environments have all combined to elevate finance from operational reporting into strategic influence.",
  ),
  para(
    "The modern CFO is no longer expected to just close books accurately. They are expected to shape decisions, challenge assumptions, manage uncertainty, communicate with boards, support growth strategy, and influence operational direction. The same is increasingly true for FP&A leaders, finance business partners, controllership heads, and strategic finance professionals.",
  ),
  para(
    "But while the role evolved, many hiring processes did not. Most finance hiring still evaluates candidates through credentials that are increasingly common at senior levels. The result is predictable. Companies interview multiple technically qualified candidates and still struggle to identify who will actually create impact inside the business. Technical strength alone rarely predicts finance leadership success anymore.",
  ),

  heading("What Most Companies Still Measure"),
  para(
    "In many senior finance hiring processes, the evaluation still revolves around years of experience, Big Four pedigree, ERP exposure, reporting depth, modelling capability, audit familiarity, and industry background.",
  ),
  para(
    "These things matter. But at senior levels, they are not differentiators. They are entry tickets.",
  ),
  para(
    "A technically strong finance candidate who cannot influence decision-making, navigate ambiguity, or challenge flawed business assumptions will often struggle despite an excellent resume. This is where many finance hiring processes in India break down. The strongest finance leaders are rarely just the people with the cleanest technical profile. They are the people who create clarity when the business environment becomes uncertain.",
  ),

  heading("What Signal Actually Looks Like"),
  para(
    "Across the finance leadership searches we have run, three traits consistently predict long-term success more reliably than most resume filters do.",
  ),

  heading("1. They Translate Complexity Into Decisions", "h3"),
  para(
    "Many finance professionals can build models. Far fewer can explain financial complexity in a way operational leaders can actually use. This matters enormously in GCC environments, fast-scaling companies, founder-led businesses, and matrixed enterprises.",
  ),
  para(
    "The strongest finance leaders know how to simplify without oversimplifying, communicate risk clearly, frame trade-offs, and help non-finance stakeholders make better decisions. Finance today is increasingly a strategic communication role, not just an analytical one. A finance leader who cannot influence business conversations often becomes operationally invisible, regardless of technical capability.",
  ),

  heading("2. They Handle Ambiguity Without Losing Rigour", "h3"),
  para(
    "This is one of the clearest differentiators in senior finance hiring today. Business conditions no longer move in stable, linear cycles. Forecasts shift. Markets tighten. Priorities change. Assumptions fail.",
  ),
  para(
    "The best finance leaders remain analytically disciplined even when certainty disappears. They operate through incomplete information, changing priorities, uncertain projections, and executive pressure without compromising decision quality. That ability becomes particularly valuable during expansion, restructuring, M&A integration, fundraising, or rapid operational scale.",
  ),
  para(
    "Technical precision matters. But adaptability under uncertainty matters just as much.",
  ),

  heading("3. They Push Back When Numbers Are Being Misused", "h3"),
  para(
    "This may be the strongest signal of all. The most effective finance leaders are not passive validators of executive decisions. They are decision-quality protectors.",
  ),
  para(
    "They know when assumptions are unrealistic, when projections are politically influenced, or when financial narratives are drifting away from operational reality. And importantly, they are willing to say so.",
  ),
  para(
    "That does not mean being confrontational. It means maintaining analytical integrity even under pressure. The strongest finance leaders understand something many organisations learn too late.",
  ),
  blockquote(
    "Finance exists not only to explain the business to leadership, but sometimes to protect leadership from misreading the business itself.",
  ),
  para(
    "That capability rarely appears on resumes. But it consistently appears in high-performing finance organisations.",
  ),

  heading("The Interview Question That Reveals It"),
  para(
    "One of the most effective questions in senior finance hiring is surprisingly simple.",
  ),
  blockquote(
    "Tell me about a time the data supported one conclusion, but the business wanted a different answer.",
  ),
  para(
    "This question reveals far more than technical competence. It surfaces judgement, stakeholder management, communication maturity, analytical integrity, and leadership behaviour under pressure.",
  ),
  para(
    "The strongest responses usually involve nuance, tension, difficult trade-offs, and imperfect outcomes. Because real finance leadership rarely operates in clean textbook scenarios.",
  ),

  heading("Why This Matters More in India Right Now"),
  para(
    "India's finance ecosystem is evolving rapidly. GCCs are expanding aggressively. Indian startups are becoming operationally mature. Global reporting standards are tightening. Cross-border finance teams are becoming more common.",
  ),
  linkPara([
    "Finance leadership expectations are changing as a result. The question is no longer 'Can this person manage reporting?' It is increasingly 'Can this person help leadership make better decisions under uncertainty?' For senior roles where AI screening is now part of the process, leaders also need to understand ",
    {
      text: "the risk of amoral drift in AI hiring",
      href: "/blog/amoral-drift-ai-hiring-risk",
    },
    ", which can quietly narrow the candidate pool before any human ever sees it.",
  ]),
  para(
    "That changes what companies should optimise for in hiring. And it changes what candidates should develop if they want long-term leadership relevance. The strongest finance professionals in India today combine four things:",
  ),
  bullet("Technical depth"),
  bullet("Business communication"),
  bullet("Strategic judgement"),
  bullet("Operational clarity"),

  heading("The Future of CFO Hiring in India"),
  para(
    "The future of CFO hiring and FP&A recruitment in India will favour professionals who can operate across both analytical rigour and business influence. Modern finance leadership increasingly sits at the intersection of capital, operations, growth, risk, and strategic decision-making.",
  ),
  para(
    "The strongest finance leaders are rarely the loudest people in the room. They are often the ones who create clarity, challenge flawed assumptions, influence decisions calmly, and maintain discipline when pressure increases.",
  ),
  para("That is increasingly what real signal looks like in finance hiring."),

  heading("Start a Finance Leadership Search With TalentiFi-X"),
  linkPara([
    "TalentiFi-X delivers curated shortlists of ",
    {
      text: "3 to 5 precision-matched candidates",
      href: "/blog/why-sending-30-resumes-is-lazy-hiring-and-why-3-5-is-the-future",
    },
    " in 12 days, combining AI-assisted sourcing with experienced human evaluation. Every search is anchored to a 45-minute intake conversation that defines what success actually looks like in the role, before a single profile is reviewed.",
  ]),
  linkPara([
    "Our ",
    { text: "Human Led, AI Assisted methodology", href: "/about" },
    " is built specifically to prevent the kind of drift you see in unaudited AI hiring. Bengaluru and Houston.",
  ]),
  para("Start a search at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "What predicts success in senior finance hiring?",
    answer:
      "The strongest predictors are strategic judgement, communication capability, ambiguity management, and the ability to influence business decisions, not just technical finance expertise. Technical depth is now a baseline expectation at senior levels rather than a differentiator.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What are companies looking for in CFO hiring in India?",
    answer:
      "Companies are increasingly looking for CFOs who combine analytical rigour with business leadership, stakeholder influence, operational understanding, and decision-making capability under uncertainty. The role has shifted from operational reporting toward strategic influence.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What matters most in FP&A recruitment in India?",
    answer:
      "Beyond modelling and reporting, strong FP&A professionals are expected to translate financial complexity into actionable business insights and support leadership decision-making. The ability to influence non-finance stakeholders is now central to the role.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Are technical finance skills enough for senior finance hiring?",
    answer:
      "No. At senior levels, technical skills are now considered baseline expectations. Long-term success depends more on judgement, communication, leadership behaviour under pressure, and strategic influence than on resume credentials alone.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What does real signal look like in finance leadership hiring?",
    answer:
      "Real signal typically includes the ability to handle ambiguity, challenge assumptions constructively, influence stakeholders, and maintain analytical integrity under pressure. It rarely appears on a resume but consistently shows up in interview behaviour when the right questions are asked.",
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
