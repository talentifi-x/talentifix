/**
 * Upload a blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-hiring-decision-framework.mjs
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (must have write/editor access)
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

const boldPara = (boldText, restText = "") => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [
    { _type: "span", _key: k(), text: boldText, marks: ["strong"] },
    ...(restText
      ? [{ _type: "span", _key: k(), text: restText, marks: [] }]
      : []),
  ],
});

// ---------------------------------------------------------------------------
// Blog content
// ---------------------------------------------------------------------------

const post = {
  title:
    "How to Choose Between Two Candidates with the Same Skills (Hiring Decision Framework India)",
  slug: "how-to-choose-between-two-candidates-same-skills-india",
  author: "TalentiFi-X Editorial",
  category: "Hiring Strategy",
  readTime: "7 min read",
  introduction:
    "You have been at this for six weeks. Three rounds of interviews, two panel discussions, and one case study. And somehow, the hiring process has delivered you exactly what you did not ask for: a tie. This guide walks through a practical framework for making the final call when two candidates are equally skilled.",
  metaTitle:
    "How to Choose Between Two Candidates with the Same Skills | Hiring Framework India",
  metaDescription:
    "A practical framework for hiring managers in India to choose between two equally skilled candidates using the 18-month test and energy alignment.",
};

const body = [
  para(
    "You have been at this for six weeks. Three rounds of interviews, two panel discussions, and one case study. And somehow, the hiring process has delivered you exactly what you did not ask for: a tie.",
  ),
  para(
    "Two finalists. Same years of experience. Same technical stack. Comparable communication skills. Solid references on both sides. The scorecard is dead even.",
  ),
  para(
    "This is a common challenge in hiring decisions in India scenarios, especially when choosing between candidates in India with similar profiles.",
  ),
  para(
    "This is not a failure of the process. It means your brief was clear and your filters worked. But now comes the part no JD prepares you for: making a decision when the data gives you nothing to stand on.",
  ),
  para(
    "The answer, more often than not, is energy. Not charisma. Not personality.",
  ),
  para(
    "Energy, in the hiring sense, is how a candidate orients toward work, uncertainty, and change. And it is often the deciding factor when choosing between two candidates with the same skills.",
  ),

  heading("Why Skills Parity Is a Good Problem in Hiring Decisions in India"),
  para(
    "Most hiring managers in India spend the bulk of their time filtering for skills. Does the candidate know the right tools? Have they worked at comparable companies? Do they clear the technical bar?",
  ),
  para(
    "By the time you reach two finalists with the same skills, you have already done the hard part.",
  ),
  para(
    "The problem is that the muscle memory of skills-based evaluation does not switch off easily. So you go back to the scorecard, re-read interview notes, ask for another reference, and still land in the same place.",
  ),
  para(
    "Here is what the scorecard cannot tell you: What this person does when priorities shift mid-quarter, when the team is understaffed, or when the product direction changes completely. That is not a skills question.",
  ),
  para(
    "That is a hiring judgement question and a critical part of choosing between candidates in India.",
  ),

  heading("What 'Energy' Means When Choosing Between Candidates in India"),
  para(
    "Energy is not about whether someone is loud or quiet, outgoing or introverted. Those are personality traits and they are largely irrelevant to job performance.",
  ),
  para(
    "In a hiring decision India context, energy refers to a candidate's orientation toward work:",
  ),
  bullet("Do they move toward stability or toward change?"),
  bullet("Do they build within structure or reshape the structure first?"),
  bullet("Do they define success as execution or transformation?"),
  para("Neither type is better."),
  para("But one of them is usually right for the role."),
  para(
    "The mistake most companies make while choosing between candidates in India is not identifying which type the role actually needs.",
  ),

  heading("The 18-Month Test: A Simple Hiring Decision Framework for India"),
  para("Before making the final hiring decision, ask one question:"),
  para(
    "What does this role demand in the next 18 months, certainty or change?",
  ),
  heading("If the answer is certainty:", "h3"),
  para("You need someone who:"),
  bullet("Executes consistently"),
  bullet("Improves existing systems"),
  bullet("Builds reliability"),
  heading("If the answer is change:", "h3"),
  para("You need someone who:"),
  bullet("Challenges the status quo"),
  bullet("Moves fast from problem to solution"),
  bullet("Is comfortable with ambiguity"),
  para("Most roles clearly lean one way, even if the JD does not say so."),
  para(
    "This is one of the most practical frameworks for choosing between two candidates in India.",
  ),

  heading(
    "Choosing Between Candidates India: How Energy Shows Up in Interviews",
  ),
  para("Here is how different candidate types typically behave:"),
  heading("Certainty-Oriented Candidate:", "h3"),
  bullet("Talks about team achievements (we)"),
  bullet("Focuses on process improvements"),
  bullet("Prefers clarity before action"),
  bullet("Values stability"),
  heading("Change-Oriented Candidate:", "h3"),
  bullet("Talks about individual impact (I)"),
  bullet("Describes what they built or changed"),
  bullet("Moves quickly despite ambiguity"),
  bullet("Challenges existing systems"),
  para("This is not a scorecard."),
  para(
    "It is a diagnostic tool to improve your hiring decision process in India.",
  ),

  heading("How to Make the Final Hiring Decision in India (Practical Steps)"),
  para("When you are stuck choosing between two strong candidates, use these:"),
  heading("1. Ask future-focused questions", "h3"),
  bullet("What would you change about this role in 6 months?"),
  bullet("What would your first 30 days look like?"),
  heading("2. Test response to ambiguity", "h3"),
  bullet("What did you do when priorities suddenly changed?"),
  heading("3. Understand their bad day", "h3"),
  bullet("Stability candidates: dislike chaos"),
  bullet("Change candidates: dislike stagnation"),
  para(
    "These questions surface insights that traditional interviews miss, and make candidate selection in India far more accurate.",
  ),

  heading("Why Hiring Decision India Is More Complex Than It Looks"),
  para("Hiring in India comes with unique challenges:"),
  bullet("Long notice periods (60 to 90 days)"),
  bullet("Complex stakeholder involvement"),
  bullet("Informal reference networks"),
  bullet("High cost of wrong hires"),
  para("A wrong hiring decision can take:"),
  bullet("6 to 9 months to surface"),
  bullet("3+ months to correct"),
  para("That is nearly a year of lost productivity."),
  para(
    "Which is why choosing between candidates in India requires more than just comparing resumes.",
  ),

  heading("Quick Summary (For Fast Decision-Making)"),
  bullet("Two strong candidates = your process worked"),
  bullet("Skills will not help you decide at this stage"),
  bullet("Focus on role requirement (certainty vs change)"),
  bullet("Use the 18-month test"),
  bullet("Evaluate energy, not personality"),
  bullet("Align candidate type with business need"),

  heading(
    "Final Thought: Make the Hiring Decision Based on Reality, Not Resumes",
  ),
  para(
    "Two equally skilled candidates are not a problem. They are a signal that your process worked.",
  ),
  para(
    "Now the real work begins: understanding the role deeply enough to know what kind of person it actually needs. Stop looking for answers in the scorecard. They are not there.",
  ),
  para(
    "Look at the next 18 months of the role, and decide whether you need someone who will improve the system or someone who will question it.",
  ),
  para("One of those answers is already clear. Trust it."),
  para(
    "At TalentiFi-X, we help companies improve hiring decision-making processes in India by combining AI-assisted analysis with human judgement, so you do not just hire fast, you hire right.",
  ),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "How do I choose between two candidates with the same skills?",
    answer:
      "Focus on what the role needs in the next 12-18 months. Identify whether you need stability or transformation, and choose the candidate whose working style aligns with that.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is the most important factor in hiring decisions in India?",
    answer:
      "Beyond skills, alignment between the candidate's working style (energy) and the role's actual demands is the most critical factor.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What does energy mean in a hiring decision?",
    answer:
      "Energy refers to how a candidate approaches work, whether they prefer structure or change, execution or innovation.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question:
      "Is it risky to hire a change-oriented candidate for a stable role?",
    answer:
      "Yes. Misalignment often leads to frustration, underperformance, and early exits, especially in Indian hiring environments.",
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
