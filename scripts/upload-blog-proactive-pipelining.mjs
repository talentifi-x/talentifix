/**
 * Upload "Proactive Talent Pipelining vs Reactive Hiring" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-proactive-pipelining.mjs
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
    "Proactive Talent Pipelining vs Reactive Hiring: Why Timing Changes Everything",
  slug: "proactive-talent-pipelining-vs-reactive-hiring",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Talent Strategy",
  readTime: "8 min read",
  introduction:
    "Most companies do not actually hire when they need talent. They hire when the absence of talent becomes painful enough to notice. That sounds like a subtle distinction. Operationally, it is one of the most expensive habits in modern hiring. By the time many organisations officially open a role, the team is already overloaded, delivery timelines are slipping, internal urgency is high, and decision-making quality has already started declining. This is reactive hiring. And in India's 2026 talent market, it is becoming one of the biggest hidden business risks companies still underestimate.",
  metaTitle:
    "Proactive Talent Pipelining vs Reactive Hiring: Why Timing Changes Everything | TalentiFi-X",
  metaDescription:
    "Most companies hire only when a role becomes urgent. That delay is expensive. Here is why proactive talent pipelining in India is becoming a major competitive advantage in 2026.",
};

const body = [
  para(
    "The organisations consistently hiring strong talent today are doing something different. They start building relationships before the hiring pressure arrives. That is proactive talent pipelining. And the difference between the two models often determines whether a role gets filled in three weeks or five months."
  ),

  heading("What Proactive Talent Pipelining Actually Means"),
  para(
    "Proactive talent pipelining is not simply collecting resumes in advance. It is the structured process of identifying future hiring needs early, mapping relevant talent markets, building relationships with potential candidates before roles become urgent, and maintaining active visibility into talent availability over time."
  ),
  para(
    "In practice, this means organisations already know who the strongest candidates are, where talent clusters exist, what compensation expectations look like, and which candidates may become available in the near future, all before a formal hiring mandate ever opens."
  ),
  blockquote(
    "Reactive hiring works backward from urgency. Proactive hiring works forward from planning. That difference changes everything downstream."
  ),

  heading("The Real Cost of Reactive Hiring"),
  para(
    "Most companies calculate hiring cost incorrectly. They focus on recruiter fees, sourcing costs, advertising budgets, and compensation negotiation. Those costs are visible. The larger costs usually are not."
  ),
  para(
    "When hiring becomes reactive, managers absorb additional responsibilities, projects slow down, delivery pressure increases, candidate quality drops, and hiring decisions become emotionally rushed. The organisation starts optimising for speed of closure instead of quality of fit. That is where expensive mistakes begin."
  ),
  para(
    "The visible vacancy is rarely the real problem. The operational drag created by delayed hiring usually costs significantly more."
  ),

  heading("Why Timing Changes Candidate Quality"),
  para(
    "This is one of the most misunderstood dynamics in hiring. The strongest candidates are rarely 'actively applying' for long. Especially in technology, finance, GCC leadership, product, and mid-to-senior management hiring."
  ),
  para(
    "Top candidates move through the market differently. Many are selectively exploring, responding through networks, evaluating quietly, or already in conversation before a role becomes public. By the time a reactive hiring process officially starts, the strongest candidates are often already deep into other processes, emotionally committed elsewhere, or no longer available."
  ),
  linkPara([
    "This is why reactive hiring pipelines often feel weaker than expected. The talent market already moved earlier. It is also why ",
    {
      text: "sending 30 resumes for a role rarely solves a hiring problem",
      href: "/blog/why-sending-30-resumes-is-lazy-hiring-and-why-3-5-is-the-future",
    },
    ". The strongest candidates were never in that pool to begin with.",
  ]),

  heading("The 3-Week vs 5-Month Hiring Math"),
  para("Two simplified scenarios make the point clearly."),

  heading("Scenario 1: Reactive Hiring", "h3"),
  para(
    "A key team member resigns. The organisation takes two weeks to align internally, another two weeks to finalise the JD, three weeks sourcing candidates, several rounds of delayed interviews, negotiation delays, notice period waiting, and eventual onboarding. Total timeline: four to five months."
  ),
  para(
    "During that period, delivery slows, teams stretch, managers absorb operational pressure, and candidate drop-offs increase. The role becomes more expensive every week it remains open."
  ),

  heading("Scenario 2: Proactive Talent Pipelining", "h3"),
  para(
    "The company already mapped likely future hiring needs, candidate availability, compensation benchmarks, and relevant talent pools. Relationships already exist before the role officially opens."
  ),
  para(
    "When the hiring trigger happens, outreach begins immediately, interview coordination moves faster, shortlists are more precise, and candidate engagement is stronger. Total timeline: two to four weeks. Not because the market changed. Because preparation changed."
  ),

  heading("Why This Matters More in India Right Now"),
  para(
    "India's hiring market is moving faster than many hiring systems were designed for. Several shifts are accelerating simultaneously: GCC expansion, startup hiring volatility, AI-driven skill transitions, increased counter-offers, and rising demand for experienced mid-to-senior talent."
  ),
  para(
    "This creates a very different market dynamic from even three or four years ago. Candidates now evaluate companies continuously, not only when applying. Strong professionals increasingly maintain active recruiter relationships, passive opportunity awareness, and multiple parallel conversations."
  ),
  linkPara([
    "Organisations waiting until hiring becomes urgent are often entering the market too late. This is especially visible in ",
    {
      text: "senior finance hiring",
      href: "/blog/what-signal-looks-like-senior-finance-hiring-india",
    },
    ", where the strongest CFO and FP&A candidates are typically being courted by two or three organisations at any given time. The companies consistently winning strong talent in India today are usually the ones visible before the search officially begins.",
  ]),

  heading("The Psychological Difference Candidates Feel"),
  para(
    "This part matters more than most companies realise. Reactive hiring creates rushed communication, inconsistent interviews, delayed responses, and unclear expectations. Candidates feel the urgency immediately. And urgency without clarity reduces confidence."
  ),
  para(
    "Proactive hiring processes feel different because the organisation already understands the role, knows what success looks like, communicates more clearly, and moves with greater confidence. That changes candidate perception significantly, especially at senior levels."
  ),
  para(
    "Strong candidates are not only evaluating compensation. They are evaluating organisational maturity. A hiring process that feels controlled is itself a signal that the company knows what it is doing."
  ),

  heading("What High-Performing Hiring Teams Do Differently"),
  para(
    "The strongest talent acquisition teams increasingly operate more like strategic market intelligence functions than transactional recruiting functions. They continuously monitor talent movement, compensation shifts, emerging skill clusters, competitor hiring patterns, and leadership transitions."
  ),
  para("They build three things before active hiring pressure appears:"),
  bullet("Candidate relationships across priority skill clusters"),
  bullet("Market maps showing where target talent currently sits"),
  bullet("Future-ready pipelines aligned to the next 12 to 18 months of growth"),
  para(
    "They understand something many organisations learn too late. The best time to start hiring is usually before the role becomes urgent."
  ),

  heading("The Future of Hiring Will Belong to Prepared Organisations"),
  para(
    "The hiring market is becoming increasingly asymmetric. The companies moving fastest are not necessarily the largest. They are often the most prepared."
  ),
  para(
    "In the next few years, proactive talent pipelining will likely become one of the strongest competitive advantages in hiring, especially across GCC expansion, leadership hiring, AI-driven workforce transformation, and specialised skill markets. Timing increasingly shapes candidate quality, decision quality, and ultimately business momentum itself."
  ),
  para("The strongest hiring systems are rarely reactive. They are designed before the pressure arrives."),

  heading("Build a Proactive Hiring Pipeline With TalentiFi-X"),
  linkPara([
    "TalentiFi-X helps organisations across India and the United States build proactive talent pipelines through ",
    { text: "Human Led, AI Assisted hiring systems", href: "/about" },
    " designed for speed, precision, and long-term fit.",
  ]),
  para("Human Led. AI Assisted. Bengaluru and Houston."),
  para("Start a conversation at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "What is proactive talent pipelining?",
    answer:
      "Proactive talent pipelining is the process of identifying, engaging, and maintaining relationships with potential candidates before roles become urgent. It helps companies reduce hiring delays and improve candidate quality by entering the market before competitors do.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Why is reactive hiring risky?",
    answer:
      "Reactive hiring often leads to rushed decisions, weaker candidate pools, delayed projects, team burnout, and increased operational costs caused by prolonged vacancies. By the time a role officially opens, the strongest candidates are usually already in conversation elsewhere.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How does proactive hiring reduce time-to-fill?",
    answer:
      "Companies with proactive pipelines already understand the market, maintain candidate relationships, and have visibility into talent availability. That allows them to move significantly faster when roles open, often shrinking time-to-fill from four or five months to two or three weeks.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Why do companies lose candidates during reactive hiring?",
    answer:
      "Strong candidates are usually already in active conversations elsewhere by the time reactive hiring begins. Delayed processes, unclear communication, and slow decision-making increase candidate drop-offs and reduce offer acceptance rates.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is the difference between proactive and reactive hiring?",
    answer:
      "Reactive hiring starts after a vacancy becomes urgent. Proactive hiring starts earlier through workforce planning, talent mapping, and relationship-building before active hiring pressure appears. The difference often determines whether a role takes three weeks or five months to fill.",
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
