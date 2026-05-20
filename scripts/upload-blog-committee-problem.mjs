/**
 * Upload "The Committee Problem" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-committee-problem.mjs
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

// ---------------------------------------------------------------------------
// Blog content
// ---------------------------------------------------------------------------

const post = {
  title:
    "The Committee Problem: Why More Evaluators Produce Worse Hiring Decisions",
  slug: "hiring-committee-problem",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Hiring Strategy",
  readTime: "8 min read",
  introduction:
    "In India's hiring market, search processes involving more than 3 decision-makers with equal voting authority take on average 2.4x longer to close, without producing better hires. The fix: 2 designated decision-makers, a pre-agreed success definition, and independent scoring before any group discussion. This is the structural answer to the committee problem.",
  metaTitle:
    "The Committee Problem: Why More Evaluators Produce Worse Hiring Decisions",
  metaDescription:
    "Discover why hiring committees with 5+ evaluators slow decisions and lose top candidates. Learn how 2 decision-makers with a pre-agreed success definition beats a 7-person panel every time. Backed by data from India's hiring market in 2026.",
};

const body = [
  para(
    "A client called us last year with a problem that, on the surface, sounded like a sourcing problem."
  ),
  para(
    "They had been trying to fill a VP Engineering role for four months. The role was important: this hire would lead a team of 22 engineers, own the product roadmap delivery, and report directly to the CEO. They had reviewed more than 40 profiles. They had interviewed six candidates across multiple rounds. And they still had not made an offer."
  ),
  para(
    "When we sat down with them to understand what was happening, the sourcing was fine. The candidates were strong. The feedback after each interview had been largely positive. The problem was something else entirely."
  ),
  para("Their hiring committee had seven people."),

  heading("Why Seven People Cannot Agree on Anything"),
  para(
    "Seven people in a hiring decision is not unusual. In India's mid-to-large enterprise environment, it is arguably the norm, particularly for senior roles. HR is involved. The direct manager is involved. Two or three senior stakeholders are involved. The CEO wants visibility. Someone from Finance has to sign off on the headcount."
  ),
  para(
    "On paper, this looks like rigour. More perspectives. More diverse input. Reduced risk of a bad decision."
  ),
  para(
    "In practice, it is the most reliable way to lose a strong candidate in a market where the best people have three conversations happening simultaneously."
  ),
  para("Here is what actually happens in a seven-person panel:"),
  bullet(
    "The first person who speaks in the debrief sets the anchor. Everyone else evaluates the candidate relative to that initial framing, not relative to the role."
  ),
  bullet(
    "Each stakeholder has a slightly different picture of what the role is. That misalignment was never surfaced before the interviews began. It surfaces now, in the debrief, disguised as disagreement about the candidates."
  ),
  bullet(
    "Accountability diffuses. With seven people involved, nobody owns the decision. The person who is most passionate about moving forward is balanced by the person who is most cautious, and the result is inertia."
  ),
  bullet(
    "The timeline extends by weeks. Getting seven schedules aligned for a debrief takes time. Getting seven opinions aligned for an offer decision takes more time. The process drags."
  ),
  para(
    "By the time our client had aligned their seven-person committee on a first-choice candidate, she had two other offers on the table. Both moved faster. She chose one of them."
  ),
  blockquote(
    "The committee problem is not about the quality of the evaluators. It is about the structure of the decision. Seven opinions without a clear decision framework does not produce seven times the rigour. It produces seven times the friction."
  ),

  heading("The Data Behind the Problem"),
  para(
    "At TalentiFi-X, we have reviewed dozens of slow or failed searches across our client base in India and the US. In our analysis, searches involving more than three decision-makers with equal voting authority take an average of 2.4 times longer to close than searches with two designated decision-makers."
  ),
  para(
    "That number does not include the time spent by the company's internal team managing the logistics of a multi-stakeholder process. It does not include the productivity cost of a senior role remaining open while the committee deliberates. And it does not include the damage to the company's employer brand, because every strong candidate who goes through a slow, unclear process tells someone about it."
  ),
  para(
    "India's 2026 talent market makes this problem more expensive than it has ever been. Consider the numbers:"
  ),
  heading("India Market 2026: Key Hiring Metrics", "h3"),
  bullet(
    "Average time-to-fill for specialised roles: 38 days. Your process cannot absorb unnecessary delays."
  ),
  bullet(
    "Notice period for mid-senior tech roles: 60 to 90 days. Candidates are making parallel decisions throughout."
  ),
  bullet(
    "Counter-offer acceptance increase: 2.8x in the last 2 years. Every week of delay is a week for the previous employer to act."
  ),
  bullet(
    "First-slate approval rate at TalentiFi-X: 90%+. Fewer evaluators plus a better brief equals faster alignment."
  ),
  para(
    "The market does not wait for committees to align. The candidates you want are being considered by your competitors right now. Your process is either fast enough to compete or it is not."
  ),

  heading("What the Research Says About Group Decision-Making"),
  para(
    "The committee problem in hiring is not a new phenomenon. Organisational psychology has documented the mechanisms behind it for decades."
  ),
  para(
    "Groupthink, the tendency for group members to conform to an emerging consensus rather than maintain independent judgment, is well established in team decision research. In hiring panels, it is amplified by status dynamics: junior evaluators defer to senior ones, dissenting views get softened in the interest of group harmony, and the most confident voice in the room has an outsized influence on outcomes."
  ),
  para(
    "Anchoring bias is the specific mechanism at play in most hiring debriefs. The first substantive assessment shared in a group discussion, whether it is positive or negative, creates a reference point that subsequent evaluators unconsciously calibrate against. Studies consistently show that the order in which evaluators speak in a debrief significantly changes the outcome of the conversation."
  ),
  para(
    "The structural fix is straightforward: have every evaluator submit an independent scorecard before any group discussion takes place. Scores first, conversation second. This eliminates anchoring bias from the debrief without removing the value of group discussion. You still get multiple perspectives. You just get them in their genuine form, rather than filtered through whoever spoke first."
  ),

  heading("The Real Root Cause: Misalignment That Was Never Surfaced"),
  para(
    "In our experience, the committee problem is almost always a symptom of something upstream. The underlying issue is almost never that the evaluators disagree about the candidates. It is that they had subtly different pictures of the role, and that misalignment was never resolved before the search began."
  ),
  para(
    "One stakeholder is thinking about the gap today: who can step in and deliver immediately? Another is thinking about where the team needs to be in eighteen months: who can lead through the next stage of growth? A third is thinking about team dynamics: who will work well with the existing senior engineer who has strong opinions about architecture decisions?"
  ),
  para("All three are reasonable considerations. None of them are the same role."),
  para(
    "When those three stakeholders sit in a debrief together, the disagreement that surfaces looks like a disagreement about Candidate A versus Candidate B. It is actually a disagreement about what the role needs to be, a conversation that should have happened in the intake meeting, before a single recruiter was briefed."
  ),
  para(
    "The most important meeting in any hiring process is the one that never gets scheduled: the pre-search alignment conversation where all decision-makers agree on what success looks like in this role, in this team, in this market, at this stage."
  ),

  heading("What a High-Functioning Hiring Structure Actually Looks Like"),
  para(
    "The companies that consistently make fast, high-quality hiring decisions have one structural element in common: clarity of authority."
  ),
  para(
    "Not fewer perspectives. Fewer decision-makers with voting authority. The distinction matters."
  ),
  heading("Two Designated Decision-Makers", "h3"),
  para(
    "Every hiring process needs exactly two people with final decision authority: the business owner of the role (typically the direct manager or functional leader) and one HR or talent representative. These two people own the outcome. They are accountable for the quality of the hire and the speed of the process. Everyone else in the process is an input, not a vote."
  ),
  para(
    "Stakeholders who need visibility can still interview. They submit scorecards. Their observations are incorporated. But they are not in the room when the final decision is made, because distributing decision authority across seven people does not distribute the accountability. It eliminates it."
  ),
  heading("A Pre-Agreed Success Definition", "h3"),
  para(
    "Before any candidate is sourced, the two decision-makers answer three questions together:"
  ),
  numbered(
    "What does success in this role look like at twelve months: specific outcomes, not just skills?"
  ),
  numbered(
    "What would make this hire a failure at twelve months: what patterns or gaps are disqualifying?"
  ),
  numbered(
    "What is the one quality that matters most for this specific role, in this specific team, at this specific stage?"
  ),
  para(
    "That conversation takes forty-five minutes. It surfaces the misalignment before it derails a shortlist. And it gives every interviewer a shared framework to evaluate against, which means the debrief produces useful signal instead of competing opinions."
  ),
  heading("Independent Scoring Before Group Discussion", "h3"),
  para(
    "Every evaluator completes a structured scorecard within twenty-four hours of their interview, before any debrief conversation happens. The scorecard is anchored to the pre-agreed success definition, not to free-form impressions."
  ),
  para(
    "Only after all scorecards are submitted does the debrief conversation happen. The conversation becomes about resolving genuine disagreements in the data, not about who can make the most compelling case for their preferred candidate."
  ),

  heading("How This Plays Out in Practice: A Before and After"),
  para(
    "Before: A Series B SaaS company in Bengaluru has a six-person hiring panel for a Director of Product role. The process takes nine weeks. The eventual hire is the candidate who interviewed last, not because they were the strongest, but because by that point the team had aligned enough context to agree on what they were looking for. Two stronger candidates had accepted other offers in the interim."
  ),
  para(
    "After: The same company, two mandates later, restructures to two decision-makers with a forty-five-minute intake call before sourcing begins. TalentiFi-X delivers four finalists in eleven days. The first-slate approval rate is immediate. The offer goes out in the same week as the final interview. The candidate accepts."
  ),
  para(
    "The candidate pool was comparable. The market was the same. The only difference was the structure of the decision."
  ),

  heading("The Cost of Getting This Wrong"),
  para(
    "A mis-hire at the Director level in India's 2026 market costs approximately 3 to 4 times the annual salary, including replacement recruitment costs, lost productivity during the gap, manager time absorbed in managing underperformance, and team morale impact. For a 25 LPA role, that is a Rs 75 lakh to Rs 1 crore event."
  ),
  para(
    "But the cost that is harder to quantify is the one that accumulates over time: the talent that chose your competitor because your process was slow, the employer brand that erodes with every candidate who had a poor experience in your panel, and the team productivity that dips every quarter a critical role stays open."
  ),
  para(
    "The committee problem is not a minor inefficiency. It is one of the most expensive structural problems in Indian hiring, and one of the most preventable."
  ),
  blockquote(
    "The answer is not to involve fewer people in hiring. It is to be precise about who has authority to decide, to align that group before the search begins, and to protect the independence of individual evaluation before any group conversation takes place."
  ),

  heading("A Practical Checklist: Restructuring Your Hiring Panel"),
  para(
    "If your current hiring processes involve large committees, here is where to start:"
  ),
  numbered(
    "Designate exactly two decision-makers per search: the business owner and one HR/talent representative."
  ),
  numbered(
    "Schedule a 45-minute intake alignment meeting before briefing any recruiter. Answer the three success definition questions together."
  ),
  numbered(
    "Brief all other evaluators on the success definition before they interview, not the JD, the success definition."
  ),
  numbered(
    "Require independent scorecards within 24 hours of each interview, anchored to the success criteria agreed in intake."
  ),
  numbered(
    "Hold the debrief only after all scorecards are submitted. Start with the data, then discuss."
  ),
  numbered(
    "Set a decision timeline at the start of the process, not as an afterthought when a candidate is waiting for an answer."
  ),

  heading("The Bottom Line"),
  para(
    "The committee problem is widespread, expensive, and almost entirely self-inflicted."
  ),
  para(
    "Two people with clear authority and a pre-agreed definition of success will consistently outperform a seven-person panel: faster decisions, fewer lost candidates, and hires that last longer because the success criteria were defined before the search began rather than negotiated in the debrief."
  ),
  para(
    "The rigour in hiring does not come from how many people evaluate a candidate. It comes from how clearly the success definition was established before the first resume was reviewed."
  ),

  heading("Ready to Restructure Your Hiring Process?"),
  para(
    "TalentiFi-X delivers 3 to 5 precision-matched candidates in 12 days, with a structured intake process that surfaces and resolves stakeholder misalignment before sourcing begins."
  ),
  para(
    "Start with a 15-minute discovery call at talentifi-x.com."
  ),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "Why do large hiring committees produce worse decisions?",
    answer:
      "Large hiring panels introduce anchoring bias, diffuse accountability, and create alignment delays that extend timelines by an average of 2.4x without improving hire quality. The core issue is that committee members often have different underlying pictures of the role, a misalignment that surfaces as candidate disagreement rather than role definition disagreement.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How many people should be involved in a hiring decision?",
    answer:
      "Two designated decision-makers, the direct manager or functional leader, and one HR representative, consistently outperform larger panels on speed and hire quality. Other stakeholders can provide input through structured scorecards without holding voting authority.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is anchoring bias in recruitment?",
    answer:
      "Anchoring bias in hiring occurs when the first assessment shared in a group debrief creates a reference point that subsequent evaluators unconsciously calibrate against. This distorts independent judgment. The fix is independent scoring before any group discussion takes place.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What should you do before starting a hiring search in India?",
    answer:
      "Before briefing any recruiter, hold a 45-minute intake alignment meeting with both decision-makers. Answer three questions: what does success look like at 12 months, what would make this hire a failure, and what is the one quality that matters most for this specific role. This eliminates the most common cause of slow or failed searches.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How does the committee problem affect hiring timelines in India?",
    answer:
      "In India's 2026 talent market, where specialised roles take an average of 38 days to fill and notice periods run 60 to 90 days, multi-stakeholder alignment delays directly cost companies top candidates. Strong candidates in India are managing 3 to 4 parallel processes simultaneously. A slow committee process reliably produces second-choice outcomes.",
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
