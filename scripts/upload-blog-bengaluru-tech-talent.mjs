/**
 * Upload "Why the Best Engineers in Bengaluru Are Evaluating Your Company as
 * Hard as You're Evaluating Them" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-bengaluru-tech-talent.mjs
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
    "Why the Best Engineers in Bengaluru Are Evaluating Your Company as Hard as You're Evaluating Them",
  slug: "bengaluru-tech-talent-evaluation-us-companies-india",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Tech Hiring",
  readTime: "8 min read",
  introduction:
    "The best engineers in Bengaluru in 2026 evaluate four things before accepting any offer, from any company, Indian or US. Speed of process: how long from first contact to offer. Brief clarity: how well the company communicated the role and its expectations. Recruiter quality: whether the person who reached out treated them as a professional or a pipeline entry. Pre-boarding: whether the company maintained contact and warmth between offer acceptance and Day 1. Get any one of these wrong and the strongest candidates choose elsewhere, regardless of compensation.",
  metaTitle:
    "Why the Best Engineers in Bengaluru Are Evaluating Your Company as Hard as You're Evaluating Them | TalentiFi-X",
  metaDescription:
    "The best tech talent in Bengaluru in 2026 is not passively waiting for offers. They are evaluating speed, brief clarity, recruiter quality, and pre-boarding before they decide. Here is what US companies and Indian enterprises hiring top engineers need to understand.",
};

const body = [
  para(
    "Something has changed in Bengaluru's tech talent market, and a lot of companies hiring there have not caught up with it yet."
  ),
  para(
    "For the better part of two decades, the dominant assumption in India's hiring market was that talent was in surplus. Companies posted roles and chose from applicants. The power sat with the employer."
  ),
  para(
    "That assumption is no longer accurate. Not at the senior and specialist end of the market, not in Bengaluru's technology ecosystem, and certainly not when the competition includes US companies, global product firms, and well-funded startups all chasing the same small pool of exceptional engineers."
  ),
  para(
    "The best engineers in Bengaluru in 2026 are not applying for jobs and waiting to be chosen. They are receiving three to five approaches per week, evaluating them in parallel, and making decisions based on criteria that most hiring companies have never made explicit, or even thought about."
  ),
  para(
    "They are, in other words, hiring you. At the same time you are hiring them."
  ),

  heading("The New Power Dynamic in Bengaluru's Tech Market"),
  para(
    "India produces more engineering graduates annually than any country in the world. This number is accurate and frequently cited by people who use it to conclude that India has an engineering surplus."
  ),
  para(
    "What that number does not tell you is the distribution of quality. The pipeline narrows dramatically as you move up the skill and experience curve. DevOps engineers with six or more years of genuine enterprise experience. Staff Engineers who have led architecture decisions at scale. Data Engineers who have built and maintained production ML pipelines. These professionals are not plentiful. They are scarce."
  ),
  para(
    "Demand from India's own product and service companies alone exceeds supply. Add US companies building GCCs and engineering centres, add global product firms with competitive compensation packages, add well-funded startups offering equity, and the market for exceptional Bengaluru engineers is tight, competitive, and moving fast."
  ),
  para(
    "A senior engineer in this cohort told our team recently that she received four LinkedIn outreach messages in a single morning. All four were from companies hiring for broadly similar roles. Three were generic. One was specific. She responded only to the specific one."
  ),
  blockquote(
    "The best talent in Bengaluru is not scarce of options. It is scarce of quality approaches. The company that approaches them best wins, not necessarily the company that pays most."
  ),

  heading("The Four Things They Are Evaluating"),

  heading("1. Speed of Process", "h3"),
  para(
    "A strong engineer in Bengaluru who decides to explore an opportunity has a finite window of engagement before either their interest cools or a competing offer moves faster. That window, based on our observation of hundreds of searches over the past several years, is roughly three to four weeks from first contact to offer."
  ),
  para(
    "Companies that run six-week, eight-round interview processes, with unexplained gaps between rounds, delayed feedback, and unclear timelines, lose candidates. Not because the candidates are impatient. Because the process itself communicates something about the company."
  ),
  para(
    "A slow, opaque hiring process is not a neutral signal. It signals one of three things. The company does not respect the candidate's time. The company cannot make decisions. Or the company's internal alignment is poor enough that scheduling a panel takes two weeks. None of these are signals a strong engineer wants to investigate further by joining."
  ),
  para(
    "Speed does not mean recklessness. It means a clear timeline communicated upfront, prompt feedback after each round, and a decision process that does not require the candidate to follow up to find out what is happening."
  ),

  heading("2. Brief Clarity", "h3"),
  para(
    "The quality of the role brief, how clearly the opportunity is communicated in the first outreach, is the first evaluation signal a strong candidate receives."
  ),
  para(
    "Generic outreach is disqualifying. A message that says 'I came across your profile and think you could be a great fit for an exciting opportunity at a leading company' tells a strong engineer that they are one of hundreds who received the same message, that nobody has read their work, and that the person sending it does not understand what they do."
  ),
  para(
    "Brief clarity means something specific. The outreach communicates what the role is, why this specific person was identified for it, what the company is building, and what problem the hire will be working on. Not a JD attached to a generic message. A genuine, specific communication that treats the recipient as a professional whose time is worth respecting."
  ),
  linkPara([
    "The engineers who are most sought-after have the most refined radar for this. They can identify a mass-outreach approach in the first sentence. And they respond only to approaches that demonstrate genuine interest in them specifically. This is also why ",
    {
      text: "the energy a candidate brings to a final round interview matters as much as their CV",
      href: "/blog/energy-signal-final-round-interviews-india",
    },
    ". A candidate who agreed to talk because the outreach was genuinely specific shows up differently than one who agreed because the message was vague enough to feel polite.",
  ]),

  heading("3. Recruiter Quality", "h3"),
  para(
    "The recruiter, whether internal or external, is the company's first human representation in the hiring process. Strong engineers in Bengaluru evaluate the recruiter as a proxy for the company's culture and operational quality."
  ),
  para(
    "A recruiter who does not understand the technical role, who cannot answer basic questions about the company's engineering stack, who does not follow up when they say they will, or who treats the conversation as a conversion exercise rather than a professional exchange, is costing the company candidates before a single interview has happened."
  ),
  para(
    "This is not an abstract concern. In our conversations with senior engineers who have declined to proceed with processes they initially expressed interest in, recruiter quality is cited as frequently as compensation mismatch. The message a poor recruiter interaction sends is unmistakable. If this is how they treat candidates, this is probably how they treat employees."
  ),
  para(
    "A strong recruiter, whether internal TA or external partner, knows the role deeply, can speak to the company's engineering challenges specifically, answers questions honestly including 'I don't know, let me find out', and communicates proactively rather than waiting to be chased. This is not a high bar. In Bengaluru's market, it is a differentiating one."
  ),

  heading("4. Pre-Boarding", "h3"),
  para(
    "This is the evaluation signal most companies are completely unaware of, because it happens after the offer is accepted and most hiring teams have mentally moved on."
  ),
  para(
    "The period between offer acceptance and Day 1, which in Bengaluru's market typically spans 30 to 90 days due to notice periods, is when the strongest candidates form their most lasting impression of the company they are joining."
  ),
  para("In that period, one of two things happens."),
  para(
    "The company goes quiet. The offer letter was signed. HR sent a list of documents to submit. The candidate hears nothing personal, nothing warm, nothing that makes them feel that the company is as excited about them joining as they were when the offer was made. In this silence, the previous employer moves in. Colleagues express disbelief that they are leaving. The counter-offer is structured carefully. Day by day, the candidate's confidence in the new company erodes, not because the new company did something wrong, but because they did nothing at all."
  ),
  para(
    "Or the company engages deliberately. The hiring manager sends a personal note within 48 hours of acceptance. The candidate is introduced to two or three teammates before Day 1. The first week's plan is shared. Someone from the team reaches out informally to say they are looking forward to working together. The candidate arrives on Day 1 already feeling like they belong."
  ),
  para(
    "The difference in retention outcomes between these two experiences is significant. And the investment required for the second one, measured in time and attention, is trivial compared to the cost of re-opening the search."
  ),

  heading("Quick Reference: Strong vs Weak Across the Four Signals"),
  bullet(
    "Speed of process. Strong looks like a clear timeline upfront, prompt feedback, offer within three to four weeks. Weak looks like unexplained gaps, delayed feedback, and no clear timeline. The candidate is asking: do they respect my time, and can they make decisions?"
  ),
  bullet(
    "Brief clarity. Strong looks like specific outreach naming their work, clear role context, genuine relevance. Weak looks like a generic message with a JD attached and no personalisation. The candidate is asking: did they actually read my profile, or am I one of hundreds?"
  ),
  bullet(
    "Recruiter quality. Strong looks like deep role knowledge, proactive communication, and honest answers. Weak looks like technical questions left unanswered, the candidate waiting to be chased, and a conversion mindset. The candidate is asking: if this is how they hire, how do they operate?"
  ),
  bullet(
    "Pre-boarding. Strong looks like a personal note within 48 hours, team introductions, a first-week plan shared early. Weak looks like silence between offer and Day 1, and only HR document requests. The candidate is asking: are they as excited about me as they were before I signed?"
  ),

  heading("What US Companies Get Wrong, and What They Get Right"),
  para(
    "US companies hiring in Bengaluru have a specific set of advantages and a specific set of blind spots."
  ),
  para(
    "The advantages are real. Brand credibility with certain candidates. Compensation structures that include equity. Exposure to global-scale technical problems. The opportunity to work directly with US-based engineering teams."
  ),
  para("The blind spots are equally real."),
  para(
    "The first is timeline mismatch. US hiring processes are often designed around a talent market where notice periods are two weeks. In Bengaluru, they are 60 to 90 days. A US hiring manager who expects a candidate to start in three weeks is operating in the wrong market reality. The process needs to account for this, and the pre-boarding strategy needs to be proportionally more deliberate as a result."
  ),
  para(
    "The second is context gap. Strong engineers in Bengaluru want to understand how their work connects to the larger mission. A US company that communicates the role in isolation, without explaining what the Bengaluru team's place in the broader engineering organisation is, what the growth trajectory looks like, and how decisions get made across time zones, loses candidates to companies that communicate this well."
  ),
  linkPara([
    "The third is the recruiter proxy issue. When a US company uses a recruiter in India who clearly does not understand the role technically, the candidate's first impression of the company is formed by that recruiter. Getting the recruiter right is not a cost optimisation decision. It is a brand decision. This is also why ",
    {
      text: "an unclear role definition upstream produces a chaotic hiring process downstream",
      href: "/blog/role-clarity-chaotic-hiring-process-india",
    },
    ". The recruiter is the messenger, but the brief is the message.",
  ]),
  blockquote(
    "US companies that do well in Bengaluru's 2026 market have one thing in common. They treat the India hiring process with the same quality attention they would give a senior hire in their US headquarters. Because the engineers they are competing for have the same options, the same clarity of judgment, and the same standards."
  ),

  heading("What This Means for the India-US Talent Bridge"),
  para(
    "The India-US talent bridge is one of the most important talent flows in the global technology economy. India's engineering depth and the US technology market's demand are genuinely complementary. The bridge, when it works well, is good for both sides."
  ),
  para(
    "But it requires maintenance. Specifically, it requires US companies to show up in Bengaluru's market with the same quality of hiring process that they would deploy in Austin or Seattle. And it requires the right partners on the ground, people who understand both sides of the conversation and can translate between them."
  ),
  para(
    "The engineers who make up Bengaluru's senior technology talent pool are, without exception, in demand. They have options. They are patient enough to wait for the right approach. And they are experienced enough to evaluate what an approach communicates about the company behind it."
  ),
  para(
    "The companies that earn their commitment are not always the highest-paying ones. They are the ones that demonstrated, through the speed of their process, the clarity of their brief, the quality of their recruiter, and the warmth of their pre-boarding, that the candidate's experience of joining matters as much as their experience of working there."
  ),
  para("That is not a high bar. In Bengaluru's 2026 market, it is a differentiating one."),

  heading("Hire Bengaluru's Best Engineers With TalentiFi-X"),
  linkPara([
    "TalentiFi-X was founded by someone who has worked in Bengaluru and Houston for over 25 years. ",
    {
      text: "We operate on both sides of the bridge",
      href: "/about",
    },
    ", and we make sure the companies we represent show up correctly. We understand what the best engineers in India are evaluating, and we calibrate the process accordingly.",
  ]),
  para("Human Led. AI Assisted. Bengaluru and Houston."),
  para("Book a 15-minute discovery call at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "What do the best engineers in Bengaluru evaluate when considering a job?",
    answer:
      "The best engineers in Bengaluru in 2026 evaluate four things. Speed of process, meaning how long from first contact to offer. Brief clarity, meaning how specifically and honestly the opportunity was communicated. Recruiter quality, meaning whether the person who reached out treated them as a professional or a pipeline entry. And pre-boarding, meaning whether the company maintained engagement between offer acceptance and Day 1. These are evaluated in parallel with the more visible factors like compensation, role scope, and company brand.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How do US companies attract top tech talent in India in 2026?",
    answer:
      "US companies that successfully attract top tech talent in Bengaluru share four practices. They communicate the role specifically and early, naming what the candidate will work on and why they were identified. They run tight, well-paced processes with clear timelines and prompt feedback. They brief recruiters deeply enough that technical questions can be answered honestly. And they invest in pre-boarding, the 30 to 90 day window between offer acceptance and Day 1 that most companies treat as silence but the best use to build connection.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is the India-US talent bridge in 2026?",
    answer:
      "The India-US talent bridge refers to the talent flow between India's large, high-quality engineering workforce and US companies' demand for technical talent, particularly in technology, data engineering, and product development. In 2026, this bridge is active and growing, with GCCs, global product companies, and US startups all competing for Bengaluru's senior engineers alongside India's own product and service companies. The bridge works best when US companies approach Indian talent with the same hiring quality standards they apply in their home markets.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Why is Bengaluru's tech talent market competitive in 2026?",
    answer:
      "Bengaluru's tech talent market is competitive at the senior and specialist level because demand significantly exceeds supply. The total pool of engineers is large, but the cohort with six or more years of genuine enterprise-scale experience in high-demand skills like DevOps, Data Engineering, and Staff-level Software Engineering is small. That cohort is simultaneously being approached by Indian product companies, GCCs, global product firms, and US companies building remote and hybrid engineering teams. The result is a market where the strongest candidates have multiple simultaneous options and the capacity to evaluate them carefully.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How important is pre-boarding for retaining Bengaluru engineers?",
    answer:
      "Pre-boarding is critically important in Bengaluru's market due to the 60 to 90 day notice period that most senior engineers serve. This extended window is when counter-offer rates are highest and when the previous employer makes its most determined effort to retain the candidate. Companies that go quiet after offer acceptance lose candidates in this window at a significantly higher rate than companies that maintain deliberate, warm contact throughout the notice period. The investment required, a personal note from the hiring manager, a team introduction, a first-week plan shared early, is trivial compared to the cost of a re-opened search.",
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
