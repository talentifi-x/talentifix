/**
 * Upload "When Your Hiring Process Keeps Breaking Down, Look at the Role, Not
 * the Process" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-role-clarity.mjs
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

const numbered = (text, level = 1) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  listItem: "number",
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
    "When Your Hiring Process Keeps Breaking Down, Look at the Role, Not the Process",
  slug: "role-clarity-chaotic-hiring-process-india",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Hiring Strategy",
  readTime: "8 min read",
  introduction:
    "When a hiring process repeatedly breaks down, extending timelines, producing wrong shortlists, or collapsing at the offer stage, the cause is almost never the process itself. It is an underdefined role upstream. Process chaos is a symptom. The role definition is the disease. Fixing the process without fixing the role is like treating a fever without treating the infection.",
  metaTitle:
    "When Your Hiring Process Keeps Breaking Down, Look at the Role, Not the Process | TalentiFi-X",
  metaDescription:
    "If your hiring process keeps stalling, extending timelines, or producing wrong hires, the problem is almost never the process. It is an underdefined role upstream. Here is how to diagnose and fix role clarity before the next search begins.",
};

const body = [
  para(
    "Every hiring manager has been here. The search has been running for 11 weeks. The shortlist has been refreshed three times. Four candidates have reached the final round. None of them were right. The recruiter is frustrated. The business is stalled. The team covering the gap is stretched."
  ),
  para(
    "The instinct, at this point, is to look at the process. Change the sourcing strategy. Add another interview round. Bring in a new recruiter. Brief a second agency."
  ),
  para("The instinct is wrong."),
  para(
    "In 23 years of running searches across India and the US, I have seen this pattern more times than I can count. In roughly 70% of cases where a search stalls, extends, or collapses, the problem was never the process. The problem was the role definition. Or rather, the absence of one."
  ),

  heading("What 'Process Chaos' Actually Looks Like"),
  para(
    "Process chaos in hiring has a specific texture. It is recognisable once you know what you are looking at."
  ),
  bullet(
    "Shortlists keep being rejected. Not because the candidates are weak, but because different stakeholders evaluate them against different criteria."
  ),
  bullet(
    "Interview rounds keep multiplying. Each round reveals a new requirement that the previous rounds did not assess for."
  ),
  bullet(
    "Offers are made and declined. The role described in the interview is not the role the candidate discovers in the offer letter or in the conversation with the hiring manager."
  ),
  bullet(
    "The same search re-opens six months later. The person hired in the rushed final stage of the previous drive did not last."
  ),
  bullet(
    "The recruiter cannot brief accurately. Every time they think they understand the role, a stakeholder adds or changes something."
  ),
  para(
    "Each of these symptoms feels like a different problem. A sourcing problem. A panel alignment problem. A compensation problem. A recruiter quality problem."
  ),
  para(
    "They are the same problem, expressed at different stages of the funnel. The role was never clearly defined. And so every part of the process that depends on a clear role definition, which is every part of the process, is operating without a foundation."
  ),
  blockquote(
    "You cannot source accurately for a role that has not been defined. You cannot screen accurately for a role that has not been defined. You cannot evaluate, shortlist, or offer for a role that has not been defined. Process quality is downstream of role clarity. Always."
  ),

  heading("The Four Ways Roles Get Underdefined in India"),
  para(
    "Role clarity problems in India have specific causes that are worth naming, because naming them is the first step to fixing them."
  ),

  heading("1. The JD That Was Written in 30 Minutes", "h3"),
  para(
    "Most job descriptions in India are written by HR from a template, in a hurry, from memory of the last time this role existed in the organisation. The hiring manager reviews it briefly, makes a few edits, and approves it. The whole process takes less than an hour."
  ),
  para(
    "The output is a document that describes skills and experience, but not outcomes. It tells a candidate what they need to have done before. It does not tell them what success looks like in this role, in this team, at this stage of the company's growth."
  ),
  para(
    "A JD is not a role definition. It is a candidate filter. The two are different documents, and most organisations only write the first one."
  ),

  heading("2. The Role That Means Different Things to Different Stakeholders", "h3"),
  para(
    "This is the most common cause of extended searches in India's mid-to-large enterprise environment."
  ),
  para(
    "The CEO wants someone who can build the function from scratch. The CHRO wants someone who can inherit the existing team and run it steadily. The direct manager wants someone who will do the work they currently do not have time for. The board wants someone with a specific brand-name background."
  ),
  linkPara([
    "These are four different roles. They were never discussed in the same room before the search began. So the recruiter was briefed on all four simultaneously, and produced shortlists that satisfied none of them, because no single candidate can be all four things. The disagreement surfaces in the debrief, disguised as candidate rejection. It is not a candidate problem. It is a ",
    {
      text: "stakeholder alignment problem that the committee structure makes worse",
      href: "/blog/hiring-committee-problem",
    },
    ", and it should have been resolved in the intake meeting.",
  ]),

  heading("3. The Role That Evolved While the Search Was Running", "h3"),
  para(
    "India's business environment in 2026 moves fast. Companies pivot. Priorities shift. The VP of Engineering role that was scoped for a legacy system maintenance challenge becomes a greenfield build role six weeks into the search, because the board approved a new product line."
  ),
  para(
    "This happens. The problem is not the change. The problem is that the search continues without the brief being updated. Candidates are still being evaluated against the old criteria. The shortlist arrives. Nobody is right. And the recruiter is blamed for a problem they were never given the information to solve."
  ),

  heading("4. The Role That Was Created to Solve the Wrong Problem", "h3"),
  para(
    "Sometimes the role itself is the wrong solution to the business problem."
  ),
  para(
    "A company is growing fast and losing customers. The instinct is to hire a VP of Customer Success. But the actual problem is that the product has gaps the CS team cannot compensate for. No hire resolves that. The VP of Customer Success arrives, discovers the real problem, and either leaves or fails."
  ),
  para(
    "This is the hardest role clarity problem to diagnose, because it requires someone to say, before the search begins, 'are we hiring for the right thing?' That conversation is uncomfortable. It is also the most valuable conversation in the hiring process."
  ),

  heading("The Role Definition Conversation: What It Is, and Why It Doesn't Happen"),
  para(
    "A proper role definition is not a longer JD. It is a structured conversation. Forty-five minutes, two designated decision-makers, three specific questions. It happens before a recruiter is briefed, before a JD is written, and before a single candidate is sourced."
  ),
  para("The three questions are:"),
  numbered(
    "What does success in this role look like at 12 months? Specific outcomes, not skills. This surfaces whether decision-makers agree on what the role actually needs to produce. Sourcing and shortlisting are impossible without this anchor."
  ),
  numbered(
    "What would make this hire a failure at 12 months? This surfaces hidden constraints, team dynamics, cultural non-negotiables, and stakeholder misalignment. It is the most revealing question in hiring, and the most consistently skipped."
  ),
  linkPara([
    "3. What is the one quality, beyond skills, that this role demands right now? This surfaces the energy and orientation the role requires. Certainty or change. Stability or transformation. It prevents the most common ",
    {
      text: "energy-role misalignment failures",
      href: "/blog/energy-signal-final-round-interviews-india",
    },
    ", where a technically qualified candidate fails because the energy they brought was wrong for the context.",
  ]),
  para(
    "These three questions take 45 minutes. They surface every misalignment that would otherwise emerge over eight weeks of a stalled search. They are the cheapest investment in any hiring process, and the most consistently skipped."
  ),
  para(
    "The reason they don't happen is not laziness. It is urgency. The role is open. The business needs someone now. There is no time for a 45-minute alignment conversation before the search begins."
  ),
  para(
    "This is the same logic that produces the 11-week search. Urgency traded 45 minutes at the start for eight weeks of process chaos downstream. The math never works out in urgency's favour."
  ),
  blockquote(
    "Every week a search runs without a defined role costs the business more than the 45 minutes the intake conversation would have taken. The investment-return ratio on role clarity is the highest in hiring. It is also the most consistently ignored."
  ),

  heading("How to Diagnose Whether Your Process Chaos Is Actually a Role Problem"),
  para(
    "Not every hiring breakdown is a role clarity problem. Some are genuinely process problems. A slow approval chain. A compensation band that is below market. A sourcing strategy that is not reaching the right talent pool."
  ),
  para(
    "Here is a simple diagnostic. Ask these questions about the last search that broke down."
  ),
  bullet(
    "Could you write, right now, a single sentence that describes what success looks like for this hire at 12 months? If not, the role was not defined."
  ),
  bullet(
    "If you asked the three most important decision-makers for this role to write that sentence independently, would their answers match? If not, the role was not aligned."
  ),
  bullet(
    "Did the brief change between the start of the search and the end? If yes, how many rounds of candidates were evaluated against the wrong criteria?"
  ),
  bullet(
    "Were there candidates who made it to the final round but were rejected for reasons that were not in the original brief? If yes, the brief was incomplete, and the process was compensating for it."
  ),
  bullet(
    "Did the eventual hire, if one was made, last beyond 12 months? If not, was the failure a performance issue or a role definition issue?"
  ),
  para(
    "Three or more 'yes' answers to these questions points clearly to a role clarity problem. The process was not the failure. It was doing what processes do when given incomplete instructions, producing incomplete output."
  ),

  heading("Fixing the Role Before Fixing the Process"),
  para("The sequence matters."),
  para(
    "Before the next search begins, before a JD is written, before a recruiter is briefed, before a job is posted, the following needs to happen."
  ),
  numbered(
    "Identify the two designated decision-makers for this role. Not a committee. Two people with final authority and accountability for the outcome."
  ),
  numbered(
    "Schedule a 45-minute intake conversation. No slides, no template, no HR form. Three questions. A whiteboard or a notepad. Honest answers."
  ),
  numbered(
    "Write a one-page role definition, not a JD. What success looks like at 90 days, six months, and 12 months. What failure looks like. What the one non-negotiable quality is. What the team dynamics are. What the hard parts of this role are that a candidate should know before they accept."
  ),
  numbered(
    "Review the role definition with all stakeholders who will interview. Not to get consensus on every point, but to surface disagreements before they appear in the debrief."
  ),
  numbered("Then brief the recruiter."),
  para(
    "This sequence takes three to five days from role opening to first recruiter briefing. Most companies consider this slow. It is, in fact, the fastest path to a completed search, because every day spent on role clarity at the start saves a multiple of days in process chaos downstream."
  ),

  heading("The Pattern That Repeats"),
  para(
    "I have seen this pattern in companies of every size, at every stage of growth, across every sector in India."
  ),
  para(
    "The search breaks down. The process gets blamed. The process gets fixed. A new screening tool, a new interview framework, a new recruiter. The next search runs through the upgraded process. It breaks down again."
  ),
  para(
    "Because the process was not the problem. The role was the problem. And the role was never looked at."
  ),
  para(
    "The most expensive hiring process in any organisation is the one that is run on an undefined role. It costs recruiter time, hiring manager time, candidate time, and business momentum. And it produces either a wrong hire or an extended vacancy, both of which cost more than the intake conversation that was skipped."
  ),
  para("When the process keeps breaking down, look upstream. The problem is almost always there."),

  heading("Fix the Role Before You Brief the Recruiter"),
  linkPara([
    "TalentiFi-X begins every search with a 45-minute intake that surfaces the role definition most organisations skip. That conversation is why our brief-to-shortlist average is 12 days, not 38. ",
    {
      text: "Read more about how we work",
      href: "/about",
    },
    ".",
  ]),
  para("Human Led. AI Assisted. Bengaluru and Houston."),
  para("Book a 15-minute discovery call at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "Why does the hiring process keep breaking down?",
    answer:
      "When a hiring process repeatedly stalls, extends, or produces wrong hires, the cause is almost never the process itself. It is an underdefined role upstream. Process chaos is a symptom. The underlying cause is a role that was not clearly defined before sourcing began. No agreed success definition, no stakeholder alignment on what the role needs to produce, and no clear criteria for evaluation. Fixing the process without fixing the role definition will produce the same breakdown in the next search.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What causes a chaotic hiring process in India?",
    answer:
      "In India's hiring market, chaotic processes are most commonly caused by JDs written without outcome definitions, stakeholders with conflicting and unspoken ideas of what the role requires, briefs that change mid-search without being communicated to the recruiter, and roles that were created to solve the wrong business problem. Each of these is a role clarity problem disguised as a process problem.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How does role clarity affect hiring outcomes?",
    answer:
      "Role clarity is the foundation of every downstream hiring decision. Sourcing, screening, evaluation, and offer conversations all depend on a clear and agreed definition of what the role needs to produce. Without it, shortlists cannot be assessed consistently, interview feedback produces conflicting signals, and offers are made to candidates who do not fully understand what they are accepting. Hiring failures consistently trace back to vague or misaligned role definitions at the intake stage.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is a role definition and how is it different from a job description?",
    answer:
      "A job description describes what a candidate needs to have done before joining. Skills, experience, qualifications. A role definition describes what the hire needs to produce after joining. Specific outcomes at 30, 60, and 90 days. What success looks like at 12 months. What failure looks like. And what non-negotiable quality the role demands right now. Most organisations write the first and skip the second. The second is what makes the search work.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How long should a role definition conversation take?",
    answer:
      "A properly facilitated role definition conversation, covering success at 12 months, failure signals, and the one non-negotiable quality, takes 45 minutes with two designated decision-makers. This is the most consistently skipped and highest-ROI conversation in any hiring process. Every week a search runs without a defined role costs the business significantly more than 45 minutes.",
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
