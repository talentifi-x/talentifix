/**
 * Upload "Amoral Drift: The AI Hiring Risk Nobody in Talent Acquisition Is
 * Talking About" blog post to Sanity.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/upload-blog-amoral-drift.mjs
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
    "Amoral Drift: The AI Hiring Risk Nobody in Talent Acquisition Is Talking About",
  slug: "amoral-drift-ai-hiring-risk",
  author: "Chetan Mangalwedhe, Founder & CEO, TalentiFi-X",
  category: "AI & Hiring Risk",
  readTime: "9 min read",
  introduction:
    "Amoral drift in AI hiring is what happens when a system, without any malicious intent, reproduces the bias baked into its training data. Resume screeners learn to prefer candidates from the same universities your last 200 hires came from. Scoring models penalise employment gaps. Sourcing algorithms reinforce the talent pools they already know. Nobody programmed any of this. The AI optimised for patterns that already existed. The output looks objective. It isn't.",
  metaTitle:
    "Amoral Drift: The AI Hiring Risk Nobody in Talent Acquisition Is Talking About | TalentiFi-X",
  metaDescription:
    "AI doesn't discriminate in hiring. It optimises for patterns that already exist, reproducing bias invisibly and at scale. This is amoral drift. Here is what it is, how to spot it, and what HR leaders in India need to do about it in 2026.",
};

const body = [
  para(
    "There is a question most HR leaders and TA teams in India are not asking about their AI hiring tools."
  ),
  para(
    "Not 'does it work?' They have the demos and the dashboards to answer that."
  ),
  para(
    "The question they are not asking is: what exactly is it optimising for?"
  ),
  para(
    "Because the answer to that question, if you dig into it, changes how you think about every AI-powered shortlist you have ever approved."
  ),

  heading("What Amoral Drift Actually Means"),
  para(
    "The term comes from AI ethics. An amoral system is not an immoral one. It has no intention to harm. It's simply indifferent to outcomes outside its objective."
  ),
  para(
    "An AI hiring tool trained on your historical 'successful hires' has one job: find candidates who look like the people who succeeded in your organisation before. It does that job very well. That is the problem."
  ),
  para(
    "Because your previous successful hires were not a random sample of the talent market. They were shaped by every bias, assumption and pattern in your hiring process over the years. Conscious and unconscious. Defensible and indefensible. Intentional and accidental."
  ),
  para(
    "The AI doesn't know this. It can't know this. It sees the data. It finds the pattern. It optimises."
  ),
  para(
    "And the output, a ranked shortlist, a scored candidate pool, a filtered application pipeline, looks entirely objective. It has numbers. It has percentages. It has confidence scores."
  ),
  blockquote(
    "The score is not objectivity. It is your past, quantified and accelerated and invisible."
  ),
  para(
    "That is amoral drift. Not malice. Not a programming error. Just an optimisation system doing exactly what it was told, and telling you exactly what you wanted to hear."
  ),

  heading("Three Ways It Shows Up in Practice"),
  para(
    "Across the searches we have reviewed and the conversations we have had with TA leaders in India, amoral drift tends to appear in three consistent patterns."
  ),

  heading("1. The University Preference Trap", "h3"),
  para(
    "A resume screener trained on a company's last 200 successful hires learns something about those hires: a disproportionate number came from the same five or six universities. Maybe that was coincidence. Maybe it reflected a genuine historical sourcing strategy. Maybe it reflected a preference in the hiring managers who made those calls."
  ),
  para(
    "It doesn't matter. The AI doesn't ask. It observes, it learns, and it begins to quietly down-score candidates from universities outside that cluster. Without anyone explicitly telling it to. Without any audit trail that makes the pattern visible."
  ),
  para(
    "The company never made a policy decision to prefer certain universities. The AI made it for them. And because the output is a number, not a name, it feels like neutrality."
  ),

  heading("2. The Employment Gap Penalty", "h3"),
  para(
    "A predictive scoring model trained on tenure data will notice, over thousands of historical candidates, that people with clean linear career histories, no gaps, no career pivots, no unexplained periods, tended to score better on retention metrics."
  ),
  para("So the model learns to penalise employment gaps."),
  para(
    "It doesn't know why those gaps exist. It doesn't distinguish between a gap caused by redundancy, a gap caused by a caregiving responsibility, a gap caused by health, or a gap caused by someone deliberately taking time to build a skill or raise a child or grieve a loss."
  ),
  para(
    "It sees a gap. It assigns a penalty. The candidate scores lower."
  ),
  para(
    "This quietly removes caregivers, returning mothers, veterans in transition and career changers from shortlists. Not through prejudice. Through pattern matching that was never designed to be fair. It was designed to predict. The two are not the same thing."
  ),

  heading("3. Structural Diversity Decline", "h3"),
  para(
    "This is the most insidious pattern, because it builds slowly and compounds over years."
  ),
  para(
    "A sourcing algorithm that reinforces existing talent pools begins to shrink the effective candidate universe with every search cycle. The candidates it finds look more and more like the candidates it has always found. The pipeline narrows. The organisation becomes slightly more homogenous with every hire."
  ),
  para(
    "Not dramatically. Not in a way that shows up in a single quarter's data. But over three, five, ten years, the cumulative effect is a talent pool that reflects neither the market nor the organisation's own stated values around diversity."
  ),
  para(
    "And because every step of the way the tool was 'working', delivering shortlists, meeting SLAs, producing scores, no alarm was ever triggered."
  ),

  heading("Why This Is Happening More in India Right Now"),
  linkPara([
    "AI adoption in India's hiring market has accelerated significantly over the last 18 months. The pressure to reduce time-to-fill, handle volume, and demonstrate data-driven decision-making has pushed mid-to-large companies toward AI screening tools faster than at any previous point. This is especially visible in ",
    {
      text: "senior finance hiring",
      href: "/blog/what-signal-looks-like-senior-finance-hiring-india",
    },
    ", where AI is now common in early-stage screening for CFO, FP&A and controllership roles.",
  ]),
  para(
    "This is largely positive. AI genuinely helps with volume processing, candidate matching at scale, and removing some of the most blatant forms of human inconsistency from early-stage screening."
  ),
  para("But the adoption has outpaced the audit culture."),
  para(
    "Most companies adopting AI hiring tools in India have not asked the vendor when the model was last audited for disparate impact. Most have not run a test to see whether the tool's outputs vary systematically across candidate demographic groups. Most have not defined what success looks like for the model beyond 'shortlist quality', a metric that the same model is often used to define."
  ),
  para(
    "In India's 2026 hiring market, where roughly 30 to 35 percent of mid-to-large companies now use at least one AI tool in their hiring process, most of those tools have never been audited for amoral drift."
  ),
  para(
    "This is going to be a major issue in the next three to five years. The organisations that get ahead of it now will be the ones with the talent pools, the cultures and the reputations to attract the best people. The ones that don't will wonder why their pipelines keep delivering the same profiles, and why their DE&I numbers never seem to move."
  ),

  heading("The Questions to Ask Your AI Vendor Today"),
  para(
    "If your organisation uses AI-assisted screening, sourcing or scoring in any part of your hiring process, these are the questions you need to ask. Not next quarter. Now."
  ),
  numbered(
    "What data was used to train this model, and how old is it? If the training data is more than two years old or reflects a specific historical period in your hiring, it may be encoding patterns that no longer reflect your needs or your values."
  ),
  numbered(
    "Has the model been tested for disparate impact across demographic groups? Specifically: does it produce different shortlist rates for candidates from different educational backgrounds, genders, career histories or geographies? If the vendor cannot answer this, that is your answer."
  ),
  numbered(
    "How is the model updated when my hiring data changes? If the model is static, trained once and deployed, it will drift further from your current needs with every passing search cycle. A model that learns from your ongoing placements needs to be audited regularly for what it is learning."
  ),
  numbered(
    "What is the human override rate in our shortlists? If your recruiters are consistently overriding the AI's recommendations, adding candidates who scored low or removing candidates who scored high, that is a signal worth examining. The override pattern often reveals where the model is miscalibrated."
  ),
  numbered(
    "Can we see a breakdown of shortlist diversity over the last 12 months? Not just quality metrics. Diversity metrics. If the pipeline is narrowing, the data will show it before the culture does."
  ),

  heading("The Human Led, AI Assisted Answer"),
  para(
    "At TalentiFi-X, Human Led, AI Assisted is not a positioning line. It is a structural decision built directly in response to amoral drift."
  ),
  para(
    "Our AI layer handles the things AI does well and that do not require human judgment: scanning thousands of candidates simultaneously, scoring against a precisely defined success profile, flagging technical qualifications, and surfacing candidates who might not match the JD exactly but match the underlying success pattern."
  ),
  para(
    "Our human layer handles everything that requires something the AI cannot have: context, accountability, and a genuine understanding of what the role needs versus what the historical data says it needed."
  ),
  para(
    "This includes, specifically, the intake conversation, where the success profile is defined before the AI is briefed. It includes the human validation stage, where cultural fit, motivation and potential are assessed by domain experts who can ask a follow-up question. And it includes the offer and post-placement stages, where the decisions being made have consequences for real people's lives and careers."
  ),
  blockquote(
    "The AI is never the last decision-maker. Not because AI is untrustworthy. Because some decisions require having something to lose, and an AI system does not."
  ),
  para(
    "The organisations getting AI right in hiring are not the ones using the most AI. They are the ones being most precise about which decisions belong to the machine and which ones belong to the human."
  ),

  heading("How to Audit Your Hiring AI for Amoral Drift"),
  para(
    "You do not need a data science team to begin this process. You need three things: access to your historical shortlist data, the willingness to ask uncomfortable questions, and a vendor who is not defensive when you ask them."
  ),

  heading("Step 1: Map your last 24 months of shortlists", "h3"),
  para(
    "Pull the candidates your AI tool surfaced and shortlisted versus the candidates your recruiters ultimately advanced. Look for patterns: educational institutions, career trajectory shapes, employment history structures. If the AI's shortlists are significantly skewed toward certain profiles that your recruiters then diversify, the model needs attention."
  ),

  heading("Step 2: Test with anonymised profiles", "h3"),
  para(
    "Create a set of anonymised candidate profiles that are technically equivalent but vary in employment gap history, institution attended and career trajectory. Run them through your AI tool. If the scores vary significantly based on those non-performance-relevant factors, you have found amoral drift in your system."
  ),

  heading("Step 3: Ask the vendor for a disparate impact report", "h3"),
  para(
    "This is a standard analysis in responsible AI deployment. It measures whether the tool produces different outcomes for different demographic groups. Any reputable AI vendor should be able to provide this. If they cannot, or will not, that should significantly affect your decision about whether to continue using the tool."
  ),

  heading("Step 4: Define the human override policy explicitly", "h3"),
  para(
    "Every AI hiring tool should have a documented process for when a human can override the AI's output, and what happens to that override data. If your process treats AI recommendations as the default and human overrides as exceptions that require justification, you have inverted the model. The AI is a tool. The human is the decision-maker."
  ),

  heading("The Bottom Line"),
  para(
    "AI in hiring is not good or bad. It is a tool. Used with precision and with humans in the right seats, it makes the hiring process faster, more consistent, and less subject to the individual biases of any one recruiter."
  ),
  para(
    "Used without audit, without a clear human-machine handover framework, and without the willingness to ask what exactly the model is optimising for, it quietly reproduces the past at scale."
  ),
  para(
    "The hiring market in India is changing faster than at any point in a generation. The talent you need for the next stage of your organisation does not necessarily look like the talent that got you here."
  ),
  blockquote("Make sure your AI knows that."),

  heading("Start a Search With TalentiFi-X"),
  linkPara([
    "TalentiFi-X delivers ",
    {
      text: "3 to 5 precision-matched candidates",
      href: "/blog/why-sending-30-resumes-is-lazy-hiring-and-why-3-5-is-the-future",
    },
    " in 12 days, with human experts in every decision that matters and AI handling everything that does not require judgment.",
  ]),
  linkPara([
    "Read more about ",
    { text: "the way we work", href: "/about" },
    ". Human Led. AI Assisted. Bengaluru and Houston.",
  ]),
  para("Book a 15-minute discovery call at talentifi-x.com."),
];

const faq = [
  {
    _key: k(),
    _type: "faqItem",
    question: "What is amoral drift in AI hiring?",
    answer:
      "Amoral drift is when an AI hiring tool reproduces historical bias without any malicious programming, simply by optimising for patterns in past hiring data. It isn't designed to discriminate. It finds and reinforces patterns that already exist, producing outputs that look objective but reflect your past hiring rather than your future needs.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How does AI reproduce bias in hiring in India?",
    answer:
      "AI hiring tools trained on historical shortlist and placement data learn to prefer candidates who match the profile of previous successful hires. In India this typically shows up as a preference for graduates from certain institutions, a penalty against non-linear career histories, and a gradual narrowing of talent pipelines toward candidates who already look like the existing workforce.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "How do I audit my AI hiring tool for amoral drift?",
    answer:
      "Start by mapping the last 24 months of AI-generated shortlists against actual hiring outcomes. Look for systematic patterns in educational background, career trajectory and employment history. Run anonymised equivalent profiles through the tool and check whether scores vary based on non-performance factors. Then ask your vendor for a disparate impact report. Any reputable vendor should be able to provide one on request.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "What is Human Led, AI Assisted hiring?",
    answer:
      "Human Led, AI Assisted is a hiring model in which AI handles volume processing, pattern matching and speed, while human experts handle cultural fit, motivation, offer strategy and every final decision. The AI is never the last decision-maker. The model is specifically designed to prevent amoral drift by keeping human judgment in the seat for decisions that require context and accountability.",
  },
  {
    _key: k(),
    _type: "faqItem",
    question: "Is AI in hiring bad for diversity in India?",
    answer:
      "AI in hiring is not inherently bad for diversity, but unaudited AI is. Tools trained on historically homogeneous hiring data, never tested for disparate impact, and operating without human oversight will quietly narrow talent pipelines over time. The solution isn't to avoid AI. It's to audit it regularly and keep humans accountable for the final decisions it informs.",
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
