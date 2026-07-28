/**
 * Upload "The Energy Signal: How to Decode What Candidates Tell You in Final
 * Round Interviews" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-energy-signal.mjs
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
    "The Energy Signal: How to Decode What Candidates Tell You in Final Round Interviews",
  slug: "energy-signal-final-round-interviews-india",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "Interview Strategy",
  readTime: "8 min read",
  introduction:
    "In a final round interview, candidate energy is the most honest signal available to a hiring manager. Energy divides into two types. Certainty energy is confidence grounded in what has already been built, best suited for roles requiring execution and stability. Change energy is restlessness and drive toward new problems, best suited for roles requiring transformation and growth. Misreading one for the other is one of the most consistent causes of strong candidates failing in roles they were technically qualified for.",
  metaTitle:
    "The Energy Signal: How to Decode What Candidates Tell You in Final Round Interviews | TalentiFi-X",
  metaDescription:
    "Learn how to read candidate energy in final round interviews, the most underused signal in hiring. Discover how certainty energy versus change energy reveals fit, motivation, and whether a hire will last.",
};

const body = [
  para(
    "After 23 years of placing talent across India and the US, I have sat in on or debriefed more final round interviews than I can count."
  ),
  para(
    "The thing that separates the hires that last from the hires that don't, more consistently than any technical assessment, any reference check, any competency framework, is energy."
  ),
  para(
    "Not enthusiasm. Enthusiasm is performable. A candidate who wants the job will perform enthusiasm regardless of fit."
  ),
  para(
    "Energy is different. Energy is the thing that is present before the candidate decides to show it. It is in how they sit forward when a particular topic comes up. It is in the questions they ask unprompted. It is in what they linger on when given the choice to go anywhere."
  ),
  blockquote(
    "Energy cannot be faked for 45 minutes. And in a final round interview, it is telling you something very specific about whether this person is the right hire for this particular role, right now."
  ),

  heading("The Two Types of Energy, and Why They Signal Different Things"),
  para(
    "Over years of observation, I have come to think about candidate energy in two categories. Not better or worse. Not more or less intelligent. Just fundamentally different in what they signal about what a person needs from a role to do their best work."
  ),

  heading("Certainty Energy", "h3"),
  para(
    "Certainty energy is the energy of someone who has built something and knows it works. They speak with the confidence of a person who has been in this territory before. Not arrogantly, but with the settled assurance of someone who does not need to prove anything."
  ),
  para(
    "In an interview, certainty energy sounds like specific examples delivered without prompting, precise numbers from memory, a clear articulation of exactly what they did versus what the team did, and a calm willingness to say 'I don't know' when something falls outside their experience."
  ),
  para(
    "Certainty energy candidates are not performing. They are reporting. There is a difference in texture that experienced interviewers feel immediately. It is the difference between a story being told and a fact being recalled."
  ),
  para(
    "This energy is the signal for roles that require execution, stability, and the compounding of established expertise. A Finance Director who needs to close the books accurately every month. A Senior Engineer who needs to maintain and scale a system that cannot afford experimental energy. A Sales Manager who needs to run a proven playbook against a defined market."
  ),
  para(
    "Certainty energy is not complacency. It is mastery expressed as calm. It signals that this person has been here before and knows what it takes. In a role that requires that, it is the most valuable thing in the room."
  ),

  heading("Change Energy", "h3"),
  para(
    "Change energy is the energy of someone who is oriented toward what is not yet built. They light up at problems, not solutions. They ask 'what if' more than 'what has worked'. Their examples tend to be about moments of transformation. The team they rebuilt. The process they redesigned. The market they entered that nobody believed in."
  ),
  para(
    "In an interview, change energy sounds like forward-leaning questions about where the company is going rather than what it has done, enthusiasm that spikes when the conversation turns to challenges rather than achievements, and a slight restlessness when describing roles that settled into routine."
  ),
  para(
    "Change energy candidates are not unfocused. They are directional, pointed at a horizon that is not yet clear. The best ones have learned to channel that energy into structured action. But the orientation is unmistakable."
  ),
  para(
    "This energy is the signal for roles that require transformation, growth, and the building of new capabilities. A VP of Product joining a company to rebuild the roadmap from scratch. A Country Manager opening a new geography with no playbook. A CHRO hired to dismantle a culture that is no longer serving the business."
  ),
  para(
    "Change energy is not instability. It is potential expressed as forward motion. It signals that this person thrives in ambiguity and is energised by building what does not yet exist. In a role that requires that, it is exactly what you need."
  ),

  heading("Why Misreading Energy Produces Strong Candidates in Wrong Roles"),
  para(
    "This is where most hiring decisions go wrong. Not at the skills assessment, not at the reference check, but at the energy read."
  ),
  para(
    "A candidate with certainty energy is placed in a transformation role. They are technically excellent. They have the right background. But the role demands that they tear down what exists and rebuild it differently. Their certainty, the thing that made them impressive in the interview, becomes resistance when the context requires change. They are not performing badly. They are performing perfectly for a role that does not exist in this organisation at this moment."
  ),
  para(
    "Or the reverse. A candidate with change energy is placed in an execution role. They move fast, bring new ideas, challenge the existing process constantly. The team finds them exhausting. The role needed someone to run the machine, not rebuild it. Within eight months, not because they were weak but because the energy was wrong for the context, they are looking for something more challenging."
  ),
  para(
    "In both cases, the interview went well. The references were strong. The offer was competitive. The hire failed anyway."
  ),
  para("Not a talent problem. An energy-role alignment problem."),

  heading("Quick Reference: Reading the Two Energies"),
  para("In the interview itself, the two energies show up as recognisable patterns."),
  bullet(
    "Certainty energy is specific, settled, and precise. The candidate reports rather than pitches. Change energy is forward-leaning, questioning, and animated by problems."
  ),
  bullet(
    "On achievements, certainty energy shows clear ownership and exact numbers, with a careful 'I did' versus 'we did' distinction. Change energy tells transformation stories. What changed because of me."
  ),
  bullet(
    "On challenges, certainty energy is methodical. The candidate has seen this before and has a framework. Change energy is energised. They treat the challenge as the opportunity."
  ),
  bullet(
    "On routine, certainty energy is comfortable. Execution is satisfying. Change energy is slightly restless. Routine signals it is time to move."
  ),
  bullet(
    "Misplaced, certainty energy resists change in transformation roles. Misplaced, change energy exhausts the team in execution-heavy roles."
  ),

  heading("How to Actually Read Energy in a Final Round Interview"),
  para("Reading energy is not mystical. It is observational. There are specific signals to watch for."),

  heading("Watch What They Lean Into", "h3"),
  para(
    "Energy reveals itself in what a candidate chooses to expand on when given the choice. Ask an open question, 'Tell me about a time you are most proud of in your career', and watch what they reach for. Do they reach for something they built and maintained? Or something they disrupted and transformed?"
  ),
  para(
    "The content of the answer matters less than the emotional temperature when they tell it. Where does the energy go up?"
  ),

  heading("Listen to the Questions They Ask You", "h3"),
  para(
    "A final round interview is also the candidate interviewing the company. The questions they ask, unprompted, at the end of the conversation, are one of the most reliable energy signals available."
  ),
  para(
    "Certainty energy questions tend to be about infrastructure, team and process. What does the current team structure look like? What systems and tools are already in place? What does the first 90 days look like?"
  ),
  para(
    "Change energy questions tend to be about direction, problem and possibility. What is the biggest thing this role needs to change? What hasn't worked that you've tried? Where does the company need to be in three years that it isn't today?"
  ),
  para(
    "Neither set of questions is more intelligent. They are different maps of what energises each person."
  ),

  heading("Notice the Texture of Ambiguity", "h3"),
  para(
    "How a candidate responds to ambiguity in the interview is a precise signal of how they will respond to ambiguity in the role."
  ),
  para(
    "Ask them: 'If you joined and found that the brief we've described is not entirely accurate, that the role is messier or less defined than we've outlined, how would you respond?'"
  ),
  para(
    "Certainty energy candidates will ask clarifying questions. They want to understand the structure before they operate within it. This is not rigidity. It is how they are built to work best."
  ),
  para(
    "Change energy candidates will often lean forward. Ambiguity is interesting to them, not threatening. The answer tends to start with 'that's actually where I do my best work'."
  ),
  para(
    "Both responses are valid. The question is whether the role you are filling is defined or ambiguous. Match accordingly."
  ),

  heading("Watch the Energy When You Describe the Hard Parts", "h3"),
  para(
    "Every role has things that are genuinely difficult. The team dynamic that needs managing. The stakeholder who is resistant. The technical debt that needs addressing before the exciting work can happen."
  ),
  para("In the final round, describe these things honestly. Not to scare the candidate. To signal."),
  para(
    "Certainty energy candidates will nod, ask specific questions about the hard parts, and demonstrate that they have a framework for navigating them. They are not discouraged. They are calibrating."
  ),
  para(
    "Change energy candidates will often get more engaged, not less. The hard parts are where the work is. Their energy will tell you whether the difficulty is interesting or exhausting to them."
  ),
  para(
    "If a candidate's energy drops noticeably when you describe the challenges and recovers when you describe the upside, that is worth noting. It is a signal that they want the outcome without the difficulty. That hire rarely works."
  ),

  heading("The India-Specific Context: Why Energy Reads Differently Here"),
  para(
    "There is an important cultural layer to this in India that interviewers, particularly those hiring from multinational or US-origin companies, frequently miss."
  ),
  para(
    "In India's professional culture, expressing strong personal ambition or dissatisfaction directly in an interview carries social risk. A candidate with significant change energy may not express it as overtly as a US or European counterpart would. The restlessness is present, but it is coded differently."
  ),
  para(
    "It shows up as highly specific questions about growth trajectory. As careful, considered comments about what the previous role 'could have been'. As a brightness in the conversation when future possibilities are raised that is subtly absent when past achievements are discussed."
  ),
  linkPara([
    "An interviewer who is only listening for explicit statements will miss this. An interviewer who is watching the energy, where it goes up, where it goes down, what prompts the candidate to lean forward and what prompts them to settle back, will read it accurately. This kind of careful observation is also why ",
    {
      text: "small, focused decision groups produce better hires than large committees",
      href: "/blog/hiring-committee-problem",
    },
    ". Energy signals get lost in a room of seven evaluators who are taking turns rather than watching.",
  ]),
  para(
    "In India's interview context, energy is expressed more often through questions than declarations, more through engagement than assertion. The signal is the same. The frequency is different. Learn to listen for it."
  ),

  heading("What to Do With the Energy Read"),
  para(
    "Reading energy correctly is only useful if it connects back to the role. Before the final round, every hiring manager should be able to answer one question: does this role primarily require certainty or change?"
  ),
  para(
    "A role that requires someone to take an existing function and run it with excellence for the next three years needs certainty energy. A role that requires someone to build something new, enter a new market, or transform a function that is not working needs change energy."
  ),
  linkPara([
    "In our intake process at TalentiFi-X, we ask this question explicitly. Not 'what skills do you need?' but 'what energy does this role demand right now, at this stage of the organisation?' The answer changes the brief. It changes what signals we look for in the pool. It also changes which AI signals we lean on and which we discount, because ",
    {
      text: "AI systems can quietly drift toward patterns that no longer reflect what the role actually needs",
      href: "/blog/amoral-drift-ai-hiring-risk",
    },
    ".",
  ]),
  para(
    "By the time a candidate reaches the final round, the question is rarely 'can they do this job?' It is: 'will this role give them what they need to do their best work?'"
  ),
  para("Energy is how you answer that question honestly. Everything else is performance."),

  heading("Work With TalentiFi-X"),
  linkPara([
    "TalentiFi-X builds shortlists where skills are a baseline and energy-role alignment is the deciding criterion. ",
    {
      text: "Our methodology is Human Led, AI Assisted",
      href: "/about",
    },
    ", because the hire that lasts is not always the most impressive CV in the room.",
  ]),
  para("Human Led. AI Assisted. Bengaluru and Houston."),
  para("Book a 15-minute discovery call at talentifix.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "What does candidate energy signal in a final round interview?",
    answer:
      "Candidate energy in a final round interview signals role alignment. Certainty energy, characterised by settled confidence and specific reporting of past achievements, signals fit for roles requiring execution and stability. Change energy, characterised by forward-leaning curiosity and enthusiasm for problems, signals fit for roles requiring transformation and growth. Misreading one for the other is a leading cause of strong candidates failing in roles they were technically qualified for.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How do you read candidates in final interviews in India?",
    answer:
      "In India's professional culture, candidate energy is expressed more through questions than declarations. Watch what candidates lean into when given open-ended questions. Listen to whether their final-round questions focus on existing structure (certainty energy) or future direction and problems (change energy). Notice their response to ambiguity and to the hard parts of the role. Energy in India's interview context is coded. It shows up as engagement levels, question quality, and where the conversation brightens, not necessarily as explicit statements.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is the difference between certainty energy and change energy in hiring?",
    answer:
      "Certainty energy is the confidence of someone who has built something and knows it works. Settled, specific, oriented toward execution and mastery. Change energy is the drive of someone oriented toward what is not yet built. Curious, problem-focused, energised by transformation. Both are valuable. The question is which one the role demands at this moment in the organisation's growth.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What questions reveal candidate energy in a final round interview?",
    answer:
      "Ask open questions and watch what the candidate expands on. 'Tell me about a time you are most proud of' reveals what kind of work energises them. 'How would you respond if the role turned out to be messier than described?' reveals their relationship to ambiguity. Describe the genuinely hard parts of the role and watch whether the candidate's energy goes up or down. Listen carefully to the questions they ask you. Infrastructure and process questions signal certainty energy. Direction and possibility questions signal change energy.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Why do strong candidates fail in roles they were qualified for?",
    answer:
      "The most common cause is energy-role misalignment. Placing a certainty energy candidate in a transformation role, or a change energy candidate in an execution role. Skills and experience can be assessed through structured interviews and reference checks. Energy alignment requires a different kind of observation. When this read is skipped or misread, technically strong candidates fail for reasons that have nothing to do with capability.",
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
