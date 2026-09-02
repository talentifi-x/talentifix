/**
 * Rewrite the bodies of the remaining three September 2026 posts as flowing
 * editorial prose, matching the house style of the bulk-hiring post and of
 * scripts/reformat-blog-india-gcc.mjs.
 *
 * The docx import preserved the source layout literally, which produced long
 * runs of one-line paragraphs and fragment bullets. This rebuilds the same
 * argument, in the same order, with the same facts, as full paragraphs under
 * descriptive H2 sections, with numbered H3 sub-sections, one pull quote each,
 * and a closing CTA.
 *
 * Every statistic and source attribution is preserved verbatim. Nothing is
 * added that was not in the source document.
 *
 * All three posts stay `published: false`.
 *
 * Usage (Node 20+ required):
 *   node --env-file=.env.local scripts/reformat-blogs-september-2026.mjs
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

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------

let n = 0;
const k = () => `k${(++n).toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const span = (text) => [{ _type: "span", _key: k(), text, marks: [] }];
const blk = (style, text, extra = {}) => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: span(text),
  ...extra,
});

const p = (text) => blk("normal", text);
const h2 = (text) => blk("h2", text);
const h3 = (text) => blk("h3", text);
const quote = (text) => blk("blockquote", text);
const li = (text) => blk("normal", text, { listItem: "bullet", level: 1 });

const CTA_TAIL = [
  p("Human Led. AI Assisted. Bengaluru and Houston."),
  p("Book a 15-minute discovery call at talentifix.com."),
];

// ---------------------------------------------------------------------------
// 1. The Best Candidate May Never Apply
// ---------------------------------------------------------------------------

const passiveCandidates = [
  p("For decades, one of the most familiar hiring processes has looked the same. A role opens, a job is posted, applications arrive, recruiters shortlist, and interviews begin. It works, and for a great many roles it works well."),
  p("But it starts with an assumption that becomes increasingly limiting when organisations hire for specialised, mid-senior or business-critical roles: that the right person will apply. What if they do not? The professional with exactly the domain experience you need may already be employed. The engineering leader capable of building your next team may be performing successfully somewhere else. The specialist who understands both your technology and your industry may not have visited a job portal in months."),
  p("They are not necessarily unavailable. They simply are not applicants yet, and that distinction should change the way organisations think about talent acquisition."),

  h2("What Is a Passive Candidate?"),
  p("A passive candidate is generally a professional who is not actively searching or applying for a new job but may be willing to consider the right opportunity. This is different from an active candidate who is already searching for roles, submitting applications or engaging directly with employers."),
  p("The distinction matters because job advertisements naturally reach people who are already looking, browsing, or sufficiently interested to apply. They do not necessarily reach the entire available talent market. LinkedIn's recruiting guidance currently notes that 36% of workers are looking for new roles, while the remaining workforce represents a broader passive market that may still be reachable. An organisation relying predominantly on inbound applications may therefore be searching within only one part of the potential talent pool."),

  h2("The Applicant Pool Is Not the Talent Pool"),
  p("This is perhaps the most important distinction in the whole conversation. Your applicant pool consists of people who found your opportunity and decided to apply. Your talent pool consists of people capable of succeeding in the role. Those two groups overlap, but they are not identical."),
  p("Imagine there are 500 professionals in a particular market with the combination of skills, experience and domain knowledge required for a critical role. Only 50 may be actively considering a move. Perhaps only 20 encounter your vacancy. And maybe eight ultimately apply."),
  quote("If your process begins and ends with those eight applicants, you are not choosing the best person in the market. You are choosing the best person among the people who happened to apply."),
  p("That is a fundamentally different proposition, and it is the gap that proactive sourcing exists to close."),

  h2("Why the Problem Becomes Bigger for Specialised Hiring"),
  p("For high-volume or relatively common roles, inbound recruitment can generate a strong candidate pool. The equation changes as requirements become more specific. Consider a role requiring technical expertise combined with domain knowledge, leadership experience and industry context. Every additional requirement narrows the available market."),
  p("This is particularly relevant for organisations hiring experienced professionals in areas where specialised capability is already scarce. India's GCC ecosystem provides a useful example. Recent ET GCC reporting has highlighted the difficulty GCCs face finding professionals who combine technical depth with business judgment and domain expertise. For these roles, generating another hundred applications may not solve the problem. Finding the right ten people might."),

  h2("Why High Performers Often Are Not Actively Looking"),
  p("Strong professionals do not necessarily need to search continuously for their next opportunity. They may already have meaningful responsibilities, competitive compensation, strong relationships, career momentum, autonomy, interesting problems to solve, or simple confidence in their current organisation. That does not mean they will never move. It means the threshold for moving is higher."),
  p("LinkedIn's guidance on passive recruitment recommends understanding what might motivate these professionals, including career growth, autonomy, compensation, relationships, flexibility and alignment with an organisation's mission and values."),
  p("This creates an important difference between recruiting an applicant and engaging passive talent. An applicant has already demonstrated interest. A passive candidate has not. The first question is therefore not whether they are qualified. It is whether there is a compelling enough reason for them to have a conversation at all."),

  h2("Passive Talent Requires a Different Recruitment Model"),
  p("You cannot recruit someone who is not looking in exactly the same way as someone who is. Passive recruitment requires organisations to move from reactive hiring toward proactive talent discovery, and that shift rests on three practices."),

  h3("1. Define capability before searching"),
  p("Before sourcing begins, organisations need clarity about what actually matters. Which skills are genuinely non-negotiable, and which are preferred rather than essential? What business problem will this person solve? What could they reasonably learn after joining? Poorly defined requirements dramatically shrink an already specialised talent pool."),

  h3("2. Map the market, not just the applications"),
  p("Instead of asking only who applied, recruiters should also ask who in the market could genuinely do this job. That means mapping the relevant companies, industries, adjacent sectors, professional communities, geographies, career paths and transferable capabilities. The objective is to understand the available talent universe before narrowing it to active candidates."),

  h3("3. Source beyond job boards"),
  p("A passive talent strategy can draw from professional networks, employee referrals, existing candidate databases, company alumni, professional associations, industry communities and conferences. LinkedIn specifically recommends proactive sourcing across several of these channels to expand the pipeline beyond job applicants. The job advertisement remains useful. It simply should not be the entire sourcing strategy."),

  h2("The First Message Matters More Than You Think"),
  p("A common recruitment mistake is treating passive talent like active applicants. Consider receiving a note explaining that there is an exciting opportunity matching your profile, and would you please share an updated CV. For someone actively applying, that may be acceptable. For a successful professional who was not considering leaving their organisation five minutes ago, it provides very little reason to engage."),
  p("Effective passive outreach needs context. Why this person specifically? What about their experience prompted the approach? Why might the opportunity be relevant to their career, and what problem would they have the chance to solve? Why is the conversation worth their time?"),
  p("Personalisation is not inserting someone's first name into a template. It is demonstrating that you understand why you are speaking to them."),

  h2("Do Not Ask Passive Candidates to Behave Like Applicants"),
  p("If the recruiter initiated the conversation, requiring the candidate to immediately complete a long application, upload multiple documents and navigate a complicated process creates unnecessary friction. LinkedIn's passive recruiting guidance similarly recommends simplifying evaluation, because these candidates have little incentive to tolerate lengthy processes when they were not seeking another role in the first place."),
  p("The early candidate experience should feel like a professional conversation, not administrative processing."),

  h2("Recruiting Passive Talent Is Also About Timing"),
  p("Not every excellent candidate will move today, and that does not make the conversation unsuccessful. A professional might be six months from completing a major project, waiting on a promotion, unwilling to relocate, satisfied with their current leadership, or simply at the wrong stage personally."),
  p("A mature talent strategy recognises that relationship-building and immediate hiring are not the same thing. Someone who says not now may become an exceptional hire twelve months later. This is why organisations benefit from building talent communities and maintaining relationships long before a vacancy becomes urgent."),

  h2("The Recruiter's Role Is Changing"),
  p("Once recruitment expands beyond processing inbound applications, the recruiter's role changes significantly. They become part market mapper, part researcher, part advisor, part relationship builder, part evaluator and part closer."),
  p("Technology can accelerate discovery, organise information and make large talent markets easier to navigate. But identifying a person is only the beginning. Someone still needs to understand why this individual would move, what matters to them, whether the opportunity genuinely advances their career, and whether there is real alignment between what the organisation needs and what the candidate wants. Above all, someone needs to create enough trust for the candidate to consider changing something that is already working."),

  h2("From Application Generation to Talent Discovery"),
  p("This leads to a broader change in how recruitment effectiveness should be measured. Traditional metrics emphasise how many applications were received. For specialised hiring, more useful questions include:"),
  li("How much of the relevant talent market did we identify?"),
  li("How many qualified passive candidates did we engage?"),
  li("How relevant was the shortlist?"),
  li("How quickly did we reach credible candidates?"),
  li("What percentage of shortlisted candidates progressed?"),
  li("Did the eventual hire perform and stay?"),
  p("Volume is easy to measure. Relevance is what creates value."),

  h2("What Should Employers Do Differently?"),
  p("For organisations struggling with specialised or hard-to-fill roles, the answer may not be another job advertisement. It may be a different question. Instead of asking how to get more people to apply, ask where the people capable of doing this job are, whether they are looking or not. Then build the recruitment strategy around reaching that market."),
  p("In practice that means combining inbound hiring with proactive sourcing, market mapping, referrals, talent intelligence, thoughtful outreach and long-term relationship building. The person who can create the most value for your organisation may not currently be searching for you. Your recruitment strategy needs to be capable of finding them anyway."),

  h2("Great Hiring Does Not Just Find Applicants. It Finds Talent."),
  p("The strongest recruitment strategies do not abandon applications or job boards. They simply recognise their limits. Active applicants remain an important source of talent. But when the requirement becomes more specialised, more senior or more business-critical, organisations need visibility beyond the people actively knocking on the door."),
  p("The best candidate may already be employed. They may be performing exceptionally well. They may be happy, may not have an updated CV, and may have absolutely no intention of applying to your vacancy today. That does not mean they are not your next great hire. It means the conversation has not started yet."),

  h2("Talk to TalentiFi-X About Hard-to-Fill Roles"),
  p("TalentiFi-X runs market mapping and proactive sourcing for specialised, mid-senior and business-critical roles across India and the US, using our Human Led, AI Assisted methodology, with human experts in every decision that matters."),
  ...CTA_TAIL,
];

// ---------------------------------------------------------------------------
// 2. The Future of Hiring Isn't More. It's More Precise.
// ---------------------------------------------------------------------------

const precisionHiring = [
  p("For a long time, recruitment was built around a straightforward equation: more candidates meant more choice, which meant a better chance of finding the right person. So recruitment systems became very good at generating volume. More applications, more profiles, larger databases, bigger pipelines, more sourcing channels. When organisations needed to scale quickly, that model made sense."),
  p("The talent problem many companies face today is different. For a specialised role, receiving 500 applications is not an advantage if only 10 people have the capability the organisation actually needs. For a senior position, a database containing thousands of profiles matters very little if the process cannot distinguish experience on paper from the ability to create impact. And for a business-critical hire, speed means little if the person ultimately hired is wrong for the role."),
  quote("The future of recruitment is not about generating more. It is about becoming more precise. Right skills, right context, right fit."),

  h2("What Is Precision Hiring?"),
  p("Precision hiring is a recruitment approach that prioritises the relevance, capability and likely success of candidates rather than maximising the volume of applicants or profiles. It combines clear role definition, skills-based sourcing, contextual assessment, talent intelligence, structured evaluation, technology-assisted discovery and human judgment to identify candidates genuinely suited to the work and the organisation."),
  p("The objective is not to create the largest possible candidate funnel. It is to create the most relevant one. Mass recruitment asks how many candidates we can reach. Precision hiring asks how quickly we can identify the candidates who could actually succeed. Those are different questions, and they produce different recruitment systems."),

  h2("Why Hiring Is Moving From Volume to Precision"),
  p("The shift is not happening because volume has become irrelevant. High-volume recruitment remains essential in industries and roles where organisations genuinely need to hire large numbers of people. It is happening because not every hiring problem is a volume problem. As roles become more specialised and organisations become more deliberate about headcount, the cost of a poor hiring decision becomes increasingly difficult to ignore."),
  p("LinkedIn's Future of Recruiting research found that 89% of talent acquisition professionals believe measuring quality of hire will become increasingly important, while only 25% say they are highly confident in their organisation's ability to measure it effectively. That gap tells us something important. Companies do not simply want recruitment teams to produce candidates. They increasingly need them to produce better hiring outcomes."),

  h2("Mass Hiring and Precision Hiring Are Not Opposites"),
  p("Precision hiring does not mean mass hiring is outdated. An organisation hiring hundreds of customer service professionals, frontline workers or entry-level employees may legitimately need a high-volume recruitment engine. The question is whether the same model should be used to hire a cybersecurity architect, a product leader, a domain specialist, a senior engineer, a GCC functional leader or an executive. Probably not. Different talent problems require different recruitment architectures."),
  p("The problem begins when volume becomes the default measure of recruitment performance regardless of the role. A recruiter can deliver 100 profiles and still fail to solve the hiring problem. Another can deliver six and solve it. The number alone tells us very little."),

  h2("The Candidate Funnel Is Changing"),
  p("Traditional recruitment funnels tend to begin wide: 1,000 applications, 200 screened, 50 shortlisted, 10 interviewed, one hired. Precision hiring attempts to improve what happens before and during that funnel rather than simply pushing more volume through it."),
  li("Can the role be defined more accurately?"),
  li("Can irrelevant requirements be removed?"),
  li("Can better talent pools be identified?"),
  li("Can candidates be evaluated on actual capabilities?"),
  li("Can technology surface stronger matches earlier?"),
  li("Can recruiters understand the business context well enough to recognise adjacent talent?"),
  li("Can the shortlist become smaller without reducing quality?"),
  p("The goal is not to process the funnel faster. It is to improve the signal inside it."),

  h2("Precision Hiring Starts Before Sourcing"),
  p("One of the biggest recruitment mistakes happens before the first candidate is contacted: the requirement itself is unclear. A hiring manager may ask for ten years of experience, exposure to one exact industry, a particular degree, a specific technology stack, experience at a certain type of company, and several capabilities that are desirable but not genuinely essential. The recruiter then searches for an exact match, and the talent pool becomes unnecessarily small."),
  p("Precision hiring begins by asking what someone genuinely needs to be able to do to succeed in this role. Which skills are essential, and which can be learned? What business problem will this person own, and what outcomes are expected in the first year? What context is necessary, and which requirements are simply historical preferences? The clearer the answers, the more precise the search becomes."),

  h2("1. Right Skills"),
  p("The first pillar of precision hiring is straightforward: can the person actually do the work? This sounds obvious, but hiring has historically relied heavily on proxies for capability such as degrees, previous employers, job titles, years of experience and industry labels. Those signals can be useful, but they do not always tell the complete story."),
  p("Skills-first hiring moves the emphasis toward what candidates can actually do. LinkedIn reports that 93% of recruiting professionals believe accurately assessing candidate skills is crucial to improving quality of hire. Its platform data also found that companies making the most skills-based searches were 12% more likely to make a quality hire than companies making no skills-based searches."),
  p("The question changes from whether a candidate looks like the people we have hired before, to whether they have the capability we need next."),

  h2("2. Right Context"),
  p("Skills alone are not enough. Two candidates can possess the same technical skill and still be very different hires. One may have applied it inside a twenty-person startup, another inside a highly regulated global bank. One may have worked with mature systems, another may have built something from zero. One may be exceptional individually, another experienced in leading teams through complexity."),
  p("Precision hiring looks beyond keyword matches to understand where a skill was applied, the complexity of the environment, the scale of responsibility, the business problems solved, the stakeholders involved, the decisions owned and the outcomes created. This becomes particularly important in specialised and mid-senior hiring, where the same keyword can represent very different levels of capability. Matching a skill is useful. Understanding its context is better."),

  h2("3. Right Fit"),
  p("Fit is sometimes treated as an intuitive or vague recruitment concept. It should not be. The useful question is not whether a candidate is personally similar to the existing team. It is whether the person can succeed within the realities of the role and the organisation: leadership expectations, working style, pace, decision-making environment, level of ambiguity, collaboration requirements, career motivations, location and flexibility expectations, and what the candidate actually wants next."),
  p("LinkedIn's quality-of-hire framework illustrates how multidimensional the outcome can be. Talent teams report using job performance, retention, hiring-manager satisfaction, skills match, team feedback and new-hire satisfaction when assessing quality of hire. Precision cannot stop at technical matching, because a person can have the right skills and still be wrong for the environment."),

  h2("Why More Applications Do Not Necessarily Mean Better Hiring"),
  p("Recruitment dashboards naturally favour metrics that are easy to count: applications received, profiles sourced, candidates contacted, interviews scheduled, time to fill. These have value, but they primarily measure activity and efficiency rather than outcome."),
  p("Consider two teams. Team A receives 800 applications, screens 250 candidates, sends 30 profiles, schedules 15 interviews and makes one hire. Team B maps the relevant talent market, identifies 40 credible professionals, engages 15, presents six, interviews four and makes one strong hire."),
  p("Which team performed better? Without knowing the eventual quality of the hire, we cannot answer, and that is precisely the point. Recruitment volume is an input. Hiring quality is an outcome."),

  h2("Quality of Hire Is Becoming the More Important Metric"),
  p("This is where precision hiring becomes a business conversation rather than a recruitment methodology. If an organisation wants better hiring outcomes, it needs to define what better means. LinkedIn's research shows organisations already use several dimensions to assess quality of hire, including job performance, retention, hiring-manager satisfaction, skills match, team fit and time to productivity."),
  p("Different organisations will weight those measures differently. For one company the most important outcome may be performance after twelve months, for another retention, for another speed to productivity. For a leadership role, the impact on the broader team may matter most. Precision hiring therefore requires talent acquisition to work backwards: define the desired outcome first, then design sourcing, screening and assessment around identifying the candidates most likely to produce it."),

  h2("Skills-First Hiring Expands Precision Rather Than Narrowing It"),
  p("There is an interesting misconception here. Being more precise sounds like searching within a smaller talent pool. Done correctly, it does the opposite. If organisations stop relying on rigid proxies such as exact job titles, pedigree or unnecessarily narrow career paths, they can identify qualified candidates who would previously have been filtered out."),
  p("LinkedIn says focusing on skills and abilities rather than work history can expand qualified talent pools significantly, in some cases by as much as 20 times."),
  quote("Precision does not mean narrow. Precision means knowing what matters."),
  p("An organisation can search a much broader market while simultaneously becoming more accurate about whom it advances."),

  h2("Where Technology Helps"),
  p("Modern recruitment technology can dramatically improve the search. It helps organisations analyse large candidate pools, identify skills, surface patterns, discover adjacent candidates, automate repetitive screening steps, organise talent intelligence and reduce the time recruiters spend on administrative work."),
  p("LinkedIn's 2025 Future of Recruiting research found talent professionals using generative AI reported saving around 20% of their workweek, with some of that time redirected toward screening and skills assessment. That is where technology becomes most valuable. Not because it removes humans from recruitment, but because it allows humans to spend less time processing information and more time interpreting it."),

  h2("Where Human Judgment Still Matters"),
  p("Precision hiring cannot be reduced to an algorithmic match score. A system can identify that two candidates possess similar skills. A recruiter still needs to understand how deeply those skills have been applied, what the candidate actually owned, why they are considering a move, what kind of environment allows them to perform, whether their ambition matches what the role can offer, and what is not visible in the profile. Sometimes the most important question is whether the organisation is searching for the wrong candidate altogether."),
  p("This is the distinction behind a Human Led, AI Assisted recruitment model. Technology improves reach, pattern recognition and efficiency. Humans provide context, judgment, relationships and accountability. Precision comes from combining both."),

  h2("The Recruiter Becomes a Talent Advisor"),
  p("If recruitment is measured less by the number of profiles generated and more by the quality of hiring outcomes, the recruiter's role changes too. They can no longer operate primarily as a CV supplier. They need to understand the business, the role, the talent market, the available skills, candidate motivations, compensation realities, competitive demand and what a successful hire actually looks like."),
  p("Sometimes the most valuable contribution a recruiter can make is not finding another candidate. It is telling the business that the candidate they have described barely exists, or that the capability they need exists under a different job title, or that they are filtering out people who could succeed because one requirement is unnecessarily narrow, or that the market has moved and their compensation has not. That is where recruitment becomes advisory rather than transactional."),

  h2("Precision Hiring for Specialised and Mid-Senior Roles"),
  p("The approach becomes especially relevant as role complexity increases. For a specialised hire, an organisation may need technical capability, domain expertise, business context, stakeholder ability and leadership potential simultaneously. Each additional dimension makes simplistic keyword matching less useful."),
  p("This is why specialised recruitment often requires market mapping, proactive sourcing, skills assessment, structured interviews, reference validation, contextual evaluation and deeper recruiter involvement. The objective is not to find the candidate containing the highest number of keywords. It is to understand who can solve the problem the organisation is hiring them to solve."),

  h2("What Should Employers Change?"),
  p("Organisations do not need to rebuild their entire recruitment function overnight. The shift can begin with six questions."),
  h3("1. Are we defining jobs or defining capabilities?"),
  p("Start with what the person needs to accomplish rather than with a list of attributes."),
  h3("2. Are we measuring applications or relevance?"),
  p("Track the percentage of candidates who genuinely meet the requirement."),
  h3("3. Are we searching for pedigree or skills?"),
  p("Separate essential capabilities from historical preferences."),
  h3("4. Are we assessing experience or impact?"),
  p("Ask what candidates actually changed, built, solved or improved."),
  h3("5. Are recruiters processing requirements or advising the business?"),
  p("Give recruiters enough context to challenge assumptions."),
  h3("6. Are we optimising time-to-hire alone, or quality of hire too?"),
  p("Speed matters, but speed toward the wrong candidate is not efficiency."),

  h2("What Should Precision Hiring Measure?"),
  p("A precision hiring dashboard should go beyond raw application numbers. Useful measures include shortlist relevance, or what percentage of submitted candidates progress. The interview-to-offer ratio, or how efficiently the shortlist converts. Skills match, or whether the selected candidate demonstrates the capabilities defined at the beginning. Time to productivity, or how quickly the new hire becomes effective. Hiring-manager satisfaction, or whether the process solved the actual business requirement. Retention, or whether the person remains and succeeds. And quality of hire, or what value the employee creates after joining."),
  p("The objective is not to eliminate traditional recruitment metrics. It is to connect them to business outcomes."),

  h2("Precision Hiring Is Not About Hiring Fewer People"),
  p("This distinction deserves emphasis. Precision hiring does not mean hire less. It means waste less: fewer irrelevant applications, fewer unsuitable profiles, fewer unnecessary interviews, fewer mismatched expectations, fewer poor hiring decisions, and more recruiter time spent understanding the talent that actually matters."),
  p("An organisation that needs 5,000 people should still hire 5,000 people. The question is whether its hiring system can become more precise while doing so."),

  h2("The Future of Hiring Is Not More. It Is More Precise."),
  p("Recruitment has spent decades getting better at reach. The next opportunity is getting better at relevance. More candidates will not automatically solve a skills shortage. More profiles will not automatically produce stronger shortlists. More interviews will not automatically create better hires."),
  p("The organisations that move ahead will increasingly ask whether they have the right skills, whether they understand the context, whether they are assessing what actually predicts success, whether recruiters are equipped to exercise judgment, and whether they are measuring quality after the candidate becomes an employee."),
  p("Because recruitment is not successful when a vacancy disappears from the dashboard. It is successful when the right person succeeds in the role. Right skills, right context, right fit. That is precision hiring."),

  h2("Talk to TalentiFi-X About Precision Hiring"),
  p("TalentiFi-X designs precision hiring processes for specialised and mid-senior roles across India and the US, using our Human Led, AI Assisted methodology, with human experts in every decision that matters."),
  ...CTA_TAIL,
];

// ---------------------------------------------------------------------------
// 3. The Return of Trust in Hiring
// ---------------------------------------------------------------------------

const trustInHiring = [
  p("Hiring has always involved a degree of uncertainty. A CV is a representation. An interview is a performance. A reference is a perspective. A hiring decision is ultimately a judgment about what someone is likely to do in the future, based on what we can learn about their past."),
  p("What is changing is the quality of the signals available to employers. Candidates now have access to powerful tools that help them improve CVs, tailor applications, prepare interview responses and present their experience more effectively. That is not inherently a problem; better tools can help strong candidates communicate their capabilities more clearly. But there is a consequence. When presentation becomes easier for everyone to improve, presentation alone becomes less useful as a differentiator."),
  quote("The question is no longer who looks strongest on paper. It is which signals we can trust."),

  h2("What Does Trust Mean in Hiring?"),
  p("Trust in hiring does not mean relying on instinct or personal chemistry. It means building enough credible evidence to make a confident employment decision. That evidence may come from demonstrated skills, verified work history, measurable past impact, structured interviews, work samples, credible references, consistent career narratives, and conversations that allow genuine depth to emerge."),
  p("The goal is not to eliminate uncertainty, because hiring will always involve uncertainty. The goal is to improve the quality of the signals used to make the decision."),

  h2("The Hiring Signal Problem"),
  p("Recruitment works through signals. A degree signals education. A job title signals responsibility. An employer brand signals experience in a particular environment. A CV signals career history. An interview signals communication, thinking and preparedness. References signal how others experienced working with the candidate. None of these signals is perfect, but when several independent signals point in the same direction, confidence increases."),
  p("The challenge begins when signals become increasingly easy to manufacture, optimise or standardise. A polished application used to require significant writing ability, time or professional assistance. Now almost anyone can produce a well-structured document quickly. Candidates can rehearse likely questions, improve wording and optimise their profiles before interacting with a recruiter."),
  p("There is nothing inherently wrong with this. The issue is signal compression. If almost every serious applicant can present themselves well, employers need additional ways to understand who can actually perform."),

  h2("Polish Is No Longer Proof"),
  p("A strong CV still matters. But a strong CV proves one thing most reliably: that the candidate submitted a strong CV. It does not automatically prove that they drove the outcomes described, that they operated at the level implied, that they can reproduce the same performance elsewhere, or that they possess the depth the new role requires."),
  p("This becomes increasingly important in specialised and senior hiring. A candidate can know the correct terminology, include the right keywords and structure achievements convincingly. Hiring quality depends on what exists behind those words. That is why modern recruitment needs to move from presentation assessment to capability verification."),

  h2("From What Candidates Say to What Employers Can Verify"),
  p("Hiring has traditionally relied heavily on self-reported information. Candidates tell organisations what they did, what they achieved, how they lead, what they know and how they solve problems. The strongest hiring processes then test those claims, and increasingly that second step is more valuable than the first."),
  p("The signals begin to shift toward four things that are harder to manufacture because they require evidence, consistency and context: demonstrated skills, past impact, credible references and real conversations."),

  h2("1. Demonstrated Skills"),
  p("The strongest way to understand whether someone can perform a task is often to observe how they approach it. That does not mean putting every candidate through lengthy assessments. It means creating opportunities to see capability rather than relying only on claims about capability."),
  p("Depending on the role, this could involve a work sample, a technical exercise, a portfolio, a case discussion, a presentation, a problem-solving conversation, or a structured discussion about previous work. The objective is not to create more recruitment stages. It is to make the existing stages more informative. A ten-minute conversation about how a candidate solved a real problem can tell you more than twenty minutes of rehearsed competency questions."),

  h2("2. Past Impact"),
  p("Experience and impact are not the same thing. Two candidates may both say they spent five years in product management. One may have managed an existing roadmap. The other may have built a new product line, navigated difficult stakeholder trade-offs and taken responsibility for commercial outcomes. Same job category, very different level of impact."),
  p("Instead of asking only what someone was responsible for, hiring teams can ask what changed because they were there. What did the candidate build, improve, fix, scale, save, launch, transform or influence? The more concrete the answer, the stronger the signal."),

  h2("3. Credible References"),
  p("Reference checks are sometimes treated as a final administrative step, which underuses them. A credible reference can help verify scope, performance, working style, leadership behaviour, strengths, areas for development, and the environment in which someone performed best."),
  p("The value of a reference is not simply whether someone says the candidate was good. It is the detail. Can the referee describe how the candidate handled difficult situations? What did colleagues rely on them for? How did they perform under pressure? Would the referee hire them again, and what type of role should they take next? Specificity creates trust. Generic praise does not."),

  h2("4. Real Conversations"),
  p("As recruitment becomes more digital, genuine conversation may become more valuable rather than less. Not because technology is bad, but because many digital signals can be standardised. A thoughtful conversation reveals things that rarely appear in a CV."),
  li("How does someone reason when they do not immediately know the answer?"),
  li("Can they explain complexity simply?"),
  li("Do they understand why a past decision worked?"),
  li("Can they acknowledge mistakes?"),
  li("Can they distinguish personal contribution from team achievement?"),
  li("Can they ask intelligent questions about the opportunity?"),
  p("These are powerful indicators of depth, and they are difficult to reduce to a keyword match."),

  h2("The Paradox: More Digital Hiring Increases the Value of Human Signals"),
  p("This is one of the most interesting consequences of hiring technology. As systems become better at creating, screening, matching, ranking, summarising and organising information, the signals that cannot be easily commoditised become more valuable: reputation, trust, judgment, relationships and demonstrated capability."),
  p("The more digital the hiring environment becomes, the more employers may value signals rooted in authentic human experience. That does not mean returning to old-fashioned, unstructured recruitment. It means using technology for what it does well while strengthening the areas where human evaluation creates better evidence."),

  h2("The CV Is Not Dead"),
  p("There is a temptation to frame every change in recruitment dramatically. The CV is dead. The interview is dead. The recruiter is dead. None of these claims is particularly useful. The CV remains an efficient way to understand someone's career history, the interview remains useful, and recruiters remain essential."),
  p("What is changing is the weight we place on each signal. A CV may become the starting point rather than the proof. An interview may need to move beyond rehearsed questions. References may become more meaningful, work samples may carry more weight, talent networks may become more important, and recruiters may increasingly be valued for their ability to interpret context rather than simply process applications."),

  h2("Trust Matters Most in Senior and Specialised Hiring"),
  p("The more important the role, the more expensive weak signals become. For a senior hire, a polished CV can conceal significant differences in actual capability. Titles are not standardised across organisations; a vice president in one company may have broader responsibility than a senior vice president elsewhere. A leader may have worked inside a successful business without being the person responsible for that success. A candidate may have participated in a transformation without leading it."),
  p("Senior recruitment therefore requires deeper verification. Who did the candidate influence? What decisions did they own? What changed under their leadership? What did former colleagues trust them to handle, and why did their organisation give them larger responsibilities? The higher the stakes, the more hiring becomes a process of building confidence through evidence."),

  h2("Trust Also Matters in Passive Candidate Recruitment"),
  p("There is another side to this conversation. Employers need to trust candidates, but candidates also need to trust employers. This is especially true when engaging passive talent. A strong professional who is already employed is being asked to consider real disruption: leaving a known manager, changing teams, risking reputation, potentially relocating, giving up accumulated trust, and joining an organisation they may know relatively little about."),
  p("That decision requires confidence, so recruitment cannot become a one-way verification exercise. Is the role genuinely what it has been presented as? Does the hiring manager understand what they want? Is the organisation transparent about expectations? Can the recruiter answer difficult questions? Is the process respectful, and are commitments consistent? Trust is reciprocal."),

  h2("The Return of Reputation"),
  p("As formal application signals become easier to polish, professional reputation becomes more important. Reputation is built slowly. It comes from people who have worked with you, projects you have delivered, leaders willing to recommend you, colleagues who seek you out again, communities where your expertise is recognised, and a body of work that exists beyond a single job application."),
  p("For many specialised professionals this already matters. A respected engineer may be known within a technical community. A sales leader may be known by customers and former colleagues. A senior executive may be known across an industry. A recruiter who understands these networks gains information that a CV database alone cannot provide."),

  h2("Why Referrals May Become More Valuable"),
  p("Employee referrals have always been valuable because they introduce an additional signal: someone is willing to attach their reputation to this candidate. That does not mean referred candidates should bypass assessment, nor that referrals are inherently fairer or more accurate. Handled poorly, they can create their own biases."),
  p("But the underlying principle is useful. Recruitment becomes stronger when hiring decisions draw on multiple independent sources of evidence. A CV says one thing, a structured interview says another, a work sample adds another, and a credible recommendation provides another. When they align, confidence grows."),

  h2("Trust Should Not Mean Hiring People We Know"),
  p("This distinction is critical. A trust-based hiring model should not become a closed network where organisations only hire people already connected to existing employees. That would reduce access and diversity rather than improve hiring."),
  quote("The objective is not to trust people because we know them. It is to build trustworthy evidence about people we do not."),
  p("That requires structured assessment, transparent criteria and multiple signals. Trust should improve fairness. It should not replace it."),

  h2("Why Structured Interviews Matter More, Not Less"),
  p("If candidates can prepare more effectively, interview design needs to improve. Generic questions about a candidate's biggest weakness, where they see themselves in five years, or a request to tell me about yourself can still have conversational value, but they often generate highly prepared responses."),
  p("A stronger structured interview focuses on evidence. Ask a candidate about a decision they made with incomplete information, then probe. What information was missing? What options did they consider? What happened, and what would they do differently? Who disagreed with them, and what was their personal contribution? The depth of the follow-up matters more than the cleverness of the first question."),

  h2("AI Can Help Hiring. Trust Still Needs Accountability."),
  p("AI can strengthen recruitment in meaningful ways. It helps teams search larger talent markets, identify patterns, summarise candidate information, support skills matching, reduce administrative work and improve recruiter productivity."),
  p("But employers should be careful not to confuse algorithmic output with objective truth. A recommendation, ranking or match score still needs interpretation. The more consequential the hiring decision, the more important it becomes that humans understand why a candidate is being advanced or rejected. Technology can generate signals. Someone still needs to own the judgment."),

  h2("The Recruiter Becomes a Signal Interpreter"),
  p("This may be the most valuable role of the modern recruiter: not simply finding information, but interpreting it. Which signals are meaningful and which are superficial? What is missing, and what requires verification? Where does the candidate's context differ from the hiring manager's assumptions? What does the reference reveal that the CV does not, and what does the career pattern suggest? Where is there genuine evidence of capability?"),
  p("This requires judgment, and judgment becomes more valuable as information becomes more abundant."),

  h2("Hiring Teams Need Better Signal Architecture"),
  p("A strong hiring process should deliberately decide which signals matter at each stage, rather than letting one impressive interview dominate the decision."),
  h3("Stage 1: Profile"),
  p("Use the CV to understand broad career history and potential relevance."),
  h3("Stage 2: Recruiter conversation"),
  p("Understand motivation, context, career trajectory and basic alignment."),
  h3("Stage 3: Skills evidence"),
  p("Validate the most important capabilities the job requires."),
  h3("Stage 4: Hiring manager evaluation"),
  p("Assess depth, judgment and the ability to solve relevant business problems."),
  h3("Stage 5: References"),
  p("Verify past performance, leadership behaviour and working context."),
  h3("Stage 6: Decision"),
  p("Combine evidence across signals. The objective is not more process. It is better evidence per stage."),

  h2("What Should Employers Measure?"),
  p("If trust and capability matter, recruitment metrics need to reflect that. Beyond applications and time-to-fill, organisations can measure shortlist-to-interview conversion, which shows whether recruiters are sending genuinely relevant candidates. Interview-to-offer conversion, which shows whether assessment is aligned with sourcing. Offer acceptance, which shows whether candidates trust and value the opportunity. Quality of hire, which shows whether the person performs after joining. Early attrition, which shows whether expectations and fit were understood correctly. Hiring-manager confidence, which shows whether the process provided enough evidence to make a sound decision. And reference consistency, which shows whether external signals align with the candidate's own claims."),
  p("Good recruitment does not simply create more information. It creates better confidence."),

  h2("The Future of Hiring Will Be About Verification"),
  p("The next phase of recruitment will not be won by the company with the biggest database, nor by the candidate with the most polished application, nor by the recruiter who can send the most profiles. The differentiator will increasingly be the ability to identify and verify genuine capability."),
  p("That means asking better questions, looking for evidence, understanding context, checking reputation, assessing skills, building real relationships and applying human judgment where it matters. Because when presentation becomes abundant, trust becomes scarce. And scarce things become valuable."),

  h2("The Return of Trust in Hiring"),
  p("The future of hiring is not a rejection of technology. It is a recognition of what technology changes. When candidates can present themselves more effectively, recruiters need better ways to distinguish presentation from performance. When information becomes easier to generate, verification becomes more important. When hiring becomes more digital, authentic human signals become more valuable."),
  p("The CV is not dead. It is simply no longer enough on its own. The strongest hiring decisions will increasingly be built around skills, impact, references and real conversations, and around one fundamental question: can we verify capability, not just presentation?"),

  h2("Talk to TalentiFi-X About Verified Hiring"),
  p("TalentiFi-X builds evidence-led assessment and reference processes for senior and specialised hiring across India and the US, using our Human Led, AI Assisted methodology, with human experts in every decision that matters."),
  ...CTA_TAIL,
];

// ---------------------------------------------------------------------------
// Patch
// ---------------------------------------------------------------------------

const jobs = [
  { slug: "passive-candidate-recruitment-best-talent", body: passiveCandidates },
  { slug: "precision-hiring-future-of-recruitment", body: precisionHiring },
  { slug: "return-of-trust-in-hiring", body: trustInHiring },
];

console.log(`Reformatting ${jobs.length} posts in dataset "${dataset}"...\n`);

let ok = 0;
for (const job of jobs) {
  const words = job.body.reduce(
    (a, b) => a + b.children[0].text.split(/\s+/).length,
    0,
  );
  const readTime = `${Math.max(1, Math.round(words / 200))} min read`;
  const counts = job.body.reduce((a, b) => {
    const key = b.listItem ? "bullet" : b.style;
    a[key] = (a[key] ?? 0) + 1;
    return a;
  }, {});

  try {
    const res = await client
      .patch(`post-${job.slug}`)
      .set({ body: job.body, readTime })
      .commit();
    ok += 1;
    console.log(`  OK  ${res._id}`);
    console.log(`      ${JSON.stringify(counts)}`);
    console.log(`      ${words} words -> ${readTime} | published: ${res.published}`);
  } catch (err) {
    console.error(`  FAIL ${job.slug}: ${err.message}`);
  }
}

console.log(`\n${ok}/${jobs.length} reformatted.`);
if (ok !== jobs.length) process.exit(1);
