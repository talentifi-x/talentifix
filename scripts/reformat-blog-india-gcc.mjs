/**
 * Rewrite the body of the India GCC post as flowing editorial prose.
 *
 * The docx import preserved the source layout literally, which produced long
 * runs of one-line paragraphs and fragment bullets ("Cost. Scale. Location.",
 * "Build.", "Lead.", "Transform."). This rebuilds the same argument and the
 * same facts in the house style used by the bulk-hiring post: full paragraphs,
 * descriptive H2 sections, numbered H3 sub-sections, one pull quote, and a
 * closing CTA.
 *
 * Every statistic and source attribution from the original is preserved
 * verbatim. Nothing is added that was not in the source document.
 *
 * The post stays `published: false`.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/reformat-blog-india-gcc.mjs
 */

import { createClient } from "next-sanity";

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

const SLUG = "india-gcc-talent-capability-challenge";

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------

let n = 0;
const k = () => `k${(++n).toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const span = (text) => [{ _type: "span", _key: k(), text, marks: [] }];
const blk = (style, text) => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: span(text),
});

const p = (text) => blk("normal", text);
const h2 = (text) => blk("h2", text);
const h3 = (text) => blk("h3", text);
const quote = (text) => blk("blockquote", text);

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const body = [
  p("India no longer needs a long introduction in the global Global Capability Centre conversation. The country has established itself as one of the world's most important GCC destinations, supported by deep technology talent, a mature services ecosystem, engineering capability and decades of experience working with global enterprises. Deloitte describes India as accounting for more than half of all GCCs established worldwide, and notes that these centres are evolving beyond cost-efficient delivery into engines for innovation, digital transformation and enterprise value creation."),
  p("But success creates its own challenge. As more global enterprises expand their India operations, as existing centres take on larger mandates, and as GCCs move further up the value chain, the question changes. It is no longer whether India can attract more GCCs. It is whether India can build enough specialised talent, mid-senior capability and leadership to power what those GCCs are becoming."),
  quote("India has won the location argument. Now it needs to win the talent argument."),

  h2("The GCC Equation Is Changing"),
  p("The original GCC proposition was relatively straightforward: cost, scale and location. Those factors still matter, but the strategic role of the centre has changed significantly."),
  p("Modern GCCs increasingly participate in product development, engineering, R&D, analytics, cybersecurity, finance, governance, supply chain and enterprise strategy. Recent reporting notes that the capability of a GCC is increasingly defined not by the technology stack it operates, but by the business discipline it serves."),
  p("That creates a fundamentally different talent requirement. A centre built primarily for process execution can optimise heavily around scale. A centre expected to build products, own global platforms, make complex decisions and influence enterprise strategy needs something else entirely. It needs capability."),

  h2("From Cost Arbitrage to Capability Advantage"),
  p("This may be the most important shift in India's GCC story. The first generation of the model demonstrated that high-quality global work could be delivered efficiently from India. The next generation has to demonstrate that some of the world's most important enterprise capabilities can be built and led from here."),
  p("That changes what organisations compete for. The conversation moves from how many people we can hire to what capabilities we can build."),
  p("Increasingly, organisations need professionals who can do more than execute defined tasks. They need people capable of solving ambiguous problems, combining technology with domain understanding, owning outcomes, working across global teams, influencing stakeholders, building products and platforms, and eventually leading global mandates. The talent equation becomes less about workforce size and more about talent depth."),

  h2("More GCCs, More Competition, the Same Talent Pool"),
  p("India's GCC hiring momentum remains strong. An August 2026 survey of more than 100 CHROs and senior talent acquisition leaders found that 52% of Indian GCCs plan to increase hiring in FY27, up from 47% in the previous survey, with approximately 150,000 new roles projected for the coming fiscal year."),
  p("That sounds like a straightforward growth story. Underneath it is a more complicated talent problem. The same survey identified quality mismatch as the single biggest hiring constraint, cited by 24% of respondents, alongside compensation inflation and a thinning leadership pipeline."),
  p("The tension is simple. The number of opportunities can grow faster than the supply of people ready to perform them, and that tension becomes most visible exactly where GCCs compete hardest: for specialised and experienced professionals."),

  h2("The Mid-Senior Talent Challenge"),
  p("The structure of GCC hiring is changing as well. Economic Times reporting based on TeamLease Digital data says GCCs added nearly 200,000 net employees in FY26, compared with around 110,000 in IT services. More importantly, that hiring is increasingly concentrated around specialised mid-level talent. Around 75 to 77% of the GCC workforce consists of professionals with three to eight years of experience, while demand for mid-to-senior talent reportedly rose from 60% in 2023 to more than 77% in 2025-26."),
  p("The reason is that experience alone is not what GCCs are buying. They increasingly need combinations of capability: a technology professional who understands banking, an engineer who understands automotive systems, a data specialist who understands healthcare, a cybersecurity professional who understands enterprise risk, or a product leader capable of working across markets."),
  p("Recent GCC reporting describes the hardest roles to fill as those sitting at the intersection of multiple skill sets, particularly at mid-senior and senior levels. That intersection is precisely where scarcity becomes most pronounced, and where the right candidate may not carry the obvious job title."),

  h2("The Talent Challenge Goes Far Beyond AI"),
  p("AI deserves attention, but it should not consume the entire GCC talent conversation. Recent August reporting from ETGCC makes exactly this point. As GCCs take on deeper business mandates, demand is expanding across R&D, engineering, governance, finance, supply chain, strategy and industry-specific disciplines. The most difficult role to fill might be a battery engineer, a clinical data specialist or a risk actuary rather than an AI engineer."),
  p("The distinction matters. The future GCC workforce will not simply consist of more technologists. It will increasingly require people who can connect technology with domain, engineering with business, data with decision-making, and execution with ownership."),
  p("That makes talent discovery considerably more complex than keyword matching. The value of a candidate often lies in the combination of capabilities they hold rather than in any single line on their CV."),

  h2("Why GCC Recruitment Must Move From Volume to Precision"),
  p("If talent requirements become more specialised, recruitment models have to evolve with them. Traditional high-volume hiring asks how quickly we can generate enough candidates. Capability-led hiring asks how quickly we can identify the few people who genuinely fit the requirement. Those are very different problems."),
  p("For specialised GCC hiring, another hundred profiles do not necessarily improve the outcome. A smaller shortlist of professionals with the right combination of technical capability, domain experience, leadership potential and business context is usually far more valuable."),
  p("This asks more of recruiters than reading a job description. They need to understand the business mandate, the capability being created, the adjacent talent pools, the transferable skills, the competitor organisations, the candidate motivations and the realities of the market. More profiles are not the same thing as more choice."),

  h2("Hiring Alone Will Not Close the Gap"),
  p("There is a further implication. India cannot solve every capability shortage by moving experienced professionals from one GCC to another. Eventually the ecosystem has to create more talent than it consumes, which means a GCC talent strategy has to extend well beyond recruitment into four connected activities."),
  p("Hire. Bring specialised capability into the organisation where it is genuinely required, rather than by default."),
  p("Build. Develop skills internally through structured learning, deliberate exposure and progressively more complex responsibility."),
  p("Redeploy. Identify people whose existing domain knowledge can be combined with new capabilities rather than replaced by them."),
  p("Lead. Create pathways that turn strong functional professionals into leaders capable of owning global mandates."),
  p("This is already part of the industry conversation. At the ETGCCWorld Talent Conclave in August 2026, leaders discussed building rather than simply buying talent, rethinking career paths, and ensuring people evolve as quickly as GCC mandates do. The long-term answer to scarcity cannot be more competition for scarce talent. It has to include creating more of it."),

  h2("India's GCC Leadership Opportunity"),
  p("Perhaps the most important capability challenge sits at the top. India has already demonstrated that it can execute global work. The next milestone is demonstrating that increasingly significant global decisions can be owned from India."),
  p("This is already happening. As GCCs take ownership of products and enterprise-critical functions, leadership positions carrying global mandates are emerging within India rather than being held exclusively at headquarters."),
  p("That changes the leadership question. A mature GCC cannot depend indefinitely on leadership being imported from headquarters. It needs people locally who can build, lead and transform: leaders who understand the enterprise globally while operating with deep local context, who can manage complexity rather than only delivery, and who can influence headquarters rather than only receive instruction from it."),
  p("The strongest indicator of India's GCC maturity may therefore not be how many people these centres employ. It may be how many global leaders they produce."),

  h2("Why Headcount Is an Incomplete Metric"),
  p("Headcount remains useful. It tells us something about scale, investment and employment. But it tells us relatively little about what a GCC is actually capable of doing."),
  p("Two centres employing 5,000 people can create radically different strategic value. One may execute defined processes. The other may own products, intellectual property, engineering platforms, analytics, transformation programmes and global decision-making. Same headcount, very different capability."),
  p("As GCCs mature, leaders need a richer set of workforce questions than how many people do we have. Which capabilities do we own? Where are the critical skill gaps? How deep is the leadership bench? Which capabilities are we building internally, and where are we overly dependent on external hiring? Which global mandates could this workforce own next? Those questions connect talent strategy directly to business strategy."),

  h2("What Should GCC Leaders Do Differently?"),
  p("The next phase requires talent acquisition, workforce planning and business leadership to operate far more closely together."),
  h3("1. Build capability maps, not just hiring plans"),
  p("Identify the capabilities the centre will need over the next 12 to 36 months rather than planning solely around current vacancies."),
  h3("2. Separate volume roles from capability-critical roles"),
  p("Not every position requires the same recruitment model. High-volume roles can optimise for efficiency. Specialised and leadership roles require deeper market mapping, assessment and engagement."),
  h3("3. Look beyond exact-match candidates"),
  p("Highly specialised talent often sits in adjacent industries, functions or job titles. Recruit for transferable capability where the role allows it."),
  h3("4. Build before scarcity becomes urgent"),
  p("If an organisation knows it will need product leaders, cybersecurity specialists or domain experts two years from now, talent development should begin before those positions become vacancies."),
  h3("5. Treat leadership as infrastructure"),
  p("Leadership development should not begin when a senior role opens. A sustainable GCC needs a visible pipeline of people capable of assuming larger global mandates."),

  h2("The Next GCC Advantage Won't Come From Headcount"),
  p("India's GCC opportunity remains enormous, but the conversation is maturing. The next competitive advantage will not come from putting more people into a building, opening another centre or processing more applications. It will come from what those people are capable of owning."),
  p("Talent, leadership, depth, domain expertise, business judgment and specialised capability are the layers that will separate the centres that matter from the centres that merely operate. The countries, cities and GCCs that build those layers most effectively will be best positioned for the next chapter."),
  p("India has already proved that global enterprises can operate from here. The next opportunity is considerably bigger: to prove that global capability can be built, owned and led from here."),

  h2("Talk to TalentiFi-X About Your GCC Talent Strategy"),
  p("TalentiFi-X builds specialised and mid-senior talent pipelines for Global Capability Centres across India and the US, using our Human Led, AI Assisted methodology, with human experts in every decision that matters."),
  p("Human Led. AI Assisted. Bengaluru and Houston."),
  p("Book a 15-minute discovery call at talentifix.com."),
];

// ---------------------------------------------------------------------------
// Patch
// ---------------------------------------------------------------------------

const words = body.reduce((a, b) => a + b.children[0].text.split(/\s+/).length, 0);
const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

const counts = body.reduce((a, b) => {
  a[b.style] = (a[b.style] ?? 0) + 1;
  return a;
}, {});

console.log(`Reformatting "${SLUG}" in dataset "${dataset}"...`);
console.log(`  blocks: ${JSON.stringify(counts)}`);
console.log(`  ${words} words -> ${readTime}`);

try {
  const res = await client
    .patch(`post-${SLUG}`)
    .set({ body, readTime })
    .commit();
  console.log(`  OK  ${res._id}`);
  console.log(`      published: ${res.published} (must stay false)`);
} catch (err) {
  console.error(`  FAIL: ${err.message}`);
  process.exit(1);
}
