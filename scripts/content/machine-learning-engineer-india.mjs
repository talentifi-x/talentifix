/**
 * Adapted from the user's Blog-1.docx (2 November 2026).
 * Removes the unsupported 38-day benchmark and broad claims about failed hires;
 * adds rating anchors, a worked scorecard example, sources and current links.
 * Editorial instructions and placeholder images are not published as content.
 */
let sequence = 0;
const key = () => `ml${(++sequence).toString(36)}`;
const block = (style, parts, listItem) => {
  const markDefs = [];
  const children = parts.map((part) => {
    if (typeof part === 'string') return { _type: 'span', _key: key(), text: part, marks: [] };
    if (part.href) {
      const mark = key();
      markDefs.push({ _type: 'link', _key: mark, href: part.href });
      return { _type: 'span', _key: key(), text: part.text, marks: [mark] };
    }
    return { _type: 'span', _key: key(), text: part.bold, marks: ['strong'] };
  });
  return { _type: 'block', _key: key(), style, markDefs, children, ...(listItem ? { listItem, level: 1 } : {}) };
};
const p = (...parts) => block('normal', parts);
const h2 = (text) => block('h2', [text]);
const h3 = (text) => block('h3', [text]);
const li = (...parts) => block('normal', parts, 'bullet');
const link = (text, href) => ({ text, href });
const table = (rows) => ({ _type: 'table', _key: key(), rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })) });

export const slug = 'how-to-hire-machine-learning-engineer-india';
export const blogPath = `/blog/${slug}`;
export const relatedSlug = 'one-job-title-five-different-roles-technical-hiring';
export const imageAlt = 'Two professionals reviewing machine learning evaluation charts on a laptop beside a printed interview scorecard';

export const post = {
  _id: `post-${slug}`,
  _type: 'post',
  title: 'How to Hire a Machine Learning Engineer in India: A Practical Guide for 2026',
  slug: { _type: 'slug', current: slug },
  published: true,
  author: 'TalentiFi-X Editorial Team',
  founderInsights: false,
  category: 'Tech Hiring',
  tags: ['ML engineer hiring in India', 'Machine learning staffing', 'Technical interviews', 'Hiring scorecards'],
  introduction: 'Hiring a machine learning engineer in India starts with defining the work. Compare ML, data science, MLOps and LLM roles, assess practical skills, and use an interview scorecard to make an evidence-based decision.',
  metaTitle: 'How to Hire a Machine Learning Engineer in India (2026)',
  metaDescription: 'Hire ML engineers in India: compare roles, assess skills, use a practical interview scorecard, and choose contract or permanent staffing for your team.',
  noindex: false,
};

export const body = [
  p('Start with the work your new hire must deliver: a forecast in a planning tool, a recommendation service, or an assistant grounded in your own documents. Each calls for a different mix of machine learning, software engineering and data skills.'),
  p('An impressive list of frameworks does not tell you whether a candidate can do that work. A useful hiring process connects the business outcome to the role brief, the assessment and the evidence behind the final decision.'),
  p('This guide applies that approach to hiring machine learning engineers in India. It includes role comparisons, practical interview questions and an illustrative scorecard you can adapt to your team.'),

  h2('What Does a Machine Learning Engineer Actually Do?'),
  p('A machine learning engineer builds systems that learn from data and helps keep those systems working reliably in production.'),
  p('The work can include preparing data, training and evaluating models, deploying them into products or internal tools, and monitoring their performance after launch. The exact responsibilities depend on the team: some engineers own the whole pipeline, while others specialize in one part.'),
  p('A notebook experiment and a production service have different requirements. Production work brings latency, cost, reliability, versioning and changing data into the picture. Ask candidates how they handled those constraints, rather than judging only the model they selected.'),
  li('Turn a business problem into a measurable machine learning task.'),
  li('Build or work with data and feature pipelines.'),
  li('Train, compare and evaluate models against a meaningful baseline.'),
  li('Deploy models as services or batch jobs.'),
  li('Monitor model and system behavior, and plan retraining or rollback.'),
  li('Work with product, engineering and business teams on requirements and trade-offs.'),
  p("Google's ", link('Rules of Machine Learning', 'https://developers.google.com/machine-learning/guides/rules-of-ml'), ' emphasizes clear objectives, simple starting points and reliable pipelines. Those are useful topics to explore when interviewing an engineer for production work.'),

  h2('ML Engineer vs Data Scientist vs MLOps Engineer vs LLM Engineer: Which Role Do You Need?'),
  p('Choose the role around the main outcome: analysis, a deployed model, reliable operations, dependable data, or an application built on language models. Titles overlap, so confirm the actual responsibilities with the hiring manager.'),
  table([
    ['Role', 'Main focus', 'Typical work', 'Consider hiring when'],
    ['Data Scientist', 'Analysis and modeling', 'Explore data, test hypotheses, build prototypes and explain results', 'You need insight, experimentation or a proof of concept'],
    ['Machine Learning Engineer', 'Building and shipping models', 'Train, optimize and deploy models into products', 'You have a defined use case and need it in production'],
    ['MLOps Engineer', 'Reliability and automation', 'Build deployment, monitoring, versioning and infrastructure workflows', 'You have models, but releases are slow or fragile'],
    ['Data Engineer', 'Data foundations', 'Build pipelines, storage, quality checks and access controls', 'Your data is scattered, delayed or unreliable'],
    ['LLM / GenAI Engineer', 'Applications using language models', 'Build retrieval, evaluation, integrations and application safeguards', 'You need an assistant, search experience or language-based automation'],
  ]),
  p('These are working distinctions, not fixed industry definitions. Ask what must exist in six months that does not exist today, and which parts of that outcome this person will own.'),
  p('For the wider role-definition problem, read ', link('One Job Title, Five Different Roles', `/blog/${relatedSlug}`), '. If the main gap is upstream data or platform reliability, review our ', link('data and analytics talent', '/talent/data-analytics-talent'), ' and ', link('cloud and DevOps talent', '/talent/cloud-devops-talent'), ' specialisms alongside ', link('AI and machine learning staffing', '/talent/ai-machine-learning-talent'), '.'),

  h2('What Skills Should You Look for in a Machine Learning Engineer?'),
  p('Assess programming, machine learning foundations, data judgment and the engineering skills your particular role requires. Add generative AI skills when language-model applications are part of the work.'),
  h3('1. Programming and Engineering Fundamentals'),
  p('Look for evidence of maintainable code, testing, version control and appropriate system design. Python is relevant to many ML stacks, but assess the languages and interfaces your team actually uses. Ask the candidate to explain how a project would be tested and handed over to another engineer.'),
  h3('2. Machine Learning Foundations'),
  p('Explore model evaluation, overfitting, feature engineering and the trade-offs between approaches. Familiarity with tools such as scikit-learn, PyTorch or TensorFlow can help, but the stronger question is why the candidate chose a method and when a simpler baseline would be sufficient.'),
  h3('3. Data Skills'),
  p('Assess SQL or equivalent data manipulation skills, data-quality checks and the ability to recognize leakage or misleading evaluation results. Ask which information would actually be available when the system makes a prediction.'),
  p('The ', link('scikit-learn guidance on data leakage', 'https://scikit-learn.org/stable/common_pitfalls.html#data-leakage'), ' explains why using information unavailable at prediction time produces overly optimistic evaluation results. A practical interview can ask a candidate to identify that problem in a small example.'),
  h3('4. Production and MLOps Skills'),
  p('For a production role, discuss deployment, monitoring, experiment tracking, containers and the relevant cloud environment. Ask what the candidate personally owned, what failed and how they investigated it. For a junior role, assess a smaller project and the support they would need rather than expecting senior operational ownership.'),
  h3('5. Generative AI Skills (If the Role Needs Them)'),
  p('For language-model applications, explore retrieval-augmented generation, evaluation, integration and deployment safeguards. Ask how the candidate would test answers against a representative set of tasks, handle failures and decide whether retrieval or fine-tuning is appropriate.'),
  p('Separate capabilities from tool preferences. A candidate who understands the problem may be able to learn your framework; a matching keyword does not establish that understanding.'),

  h2('How Do You Define the Role Before You Start Hiring?'),
  p('Write the expected outcome, available data, ownership boundaries and essential skills before selecting a title. An unclear brief makes it harder to tell a capability gap from a mismatch between the candidate and the job.'),
  li('What business problem will this person solve in the first six to twelve months?'),
  li('What data and infrastructure already exist?'),
  li('Is the main responsibility research, building or maintaining?'),
  li('Which skills are needed on day one, and which can be learned?'),
  li('Who will work with this person, review their work and support deployment?'),
  p('Separate must-haves from preferences. A requirement for several clouds, every ML framework and every application domain makes the brief difficult to assess consistently.'),
  table([
    ['Role brief element', 'Weak version', 'Stronger version'],
    ['Outcome', 'Build AI models for the business', 'Deploy a demand forecast into the planning tool within six months, with an agreed baseline and operational owner'],
    ['Must-have skills', 'Python, TensorFlow, PyTorch, Keras, AWS, GCP, Azure and Spark', 'Strong Python, relevant model evaluation and deployment experience on one major cloud'],
    ['Seniority', 'Three to eight years of experience', 'For this senior role: independently owns a production model, its monitoring and incident response'],
  ]),
  p('Illustrative examples, not actual job descriptions. Adjust scope and independence expectations for junior, mid-level and senior positions.'),

  h2('What Hiring Process Works for ML Roles in India?'),
  p('Use a defined brief, targeted sourcing, evidence-based screening, a practical assessment, structured interviews and a coordinated offer process. Agree the assessment criteria before interviewing.'),
  h3('1. Start With the Outcome'),
  p('Write the outcome in one or two sentences and share it with everyone involved. Confirm location, working arrangements, compensation range, reporting line and the support available to the new hire.'),
  h3('2. Source Beyond Job Boards'),
  p('Combine applications with referrals, relevant professional communities, technical talks and specialist sourcing. Use public work as one source of evidence, while recognizing that candidates doing confidential commercial work may not have public repositories. Our article on ', link('why the best candidate may never apply', '/blog/passive-candidate-recruitment-best-talent'), ' explains the role of proactive sourcing.'),
  h3('3. Screen for Evidence, Not Keywords'),
  p('Ask candidates to explain a project, their own contribution, the success measure and one decision they would change. Accept appropriately anonymized examples; do not ask for confidential employer code or data. For entry-level roles, a well-explained academic or personal project can provide relevant evidence.'),
  h3('4. Use a Practical Technical Assessment'),
  p('Use a short case discussion, project review or debugging exercise that reflects the job. State the time limit, evaluation criteria and permitted tools in advance. Offer reasonable alternatives where needed, and avoid asking candidates to produce usable client work as an unpaid assessment.'),
  h3('5. Run Structured Interviews'),
  p('Give candidates comparable opportunities to demonstrate the same competencies. Record evidence and score independently before discussing the decision. That makes disagreements easier to investigate than an unstructured discussion about who seemed impressive. See our article on the ', link('hiring committee problem', '/blog/hiring-committee-problem'), '.'),
  h3('6. Move Fast and Manage the Offer'),
  p('Set an achievable feedback schedule and identify who can approve an offer. Confirm each candidate\'s actual notice period, location expectations and likely start date rather than assuming a standard timeline. Keep agreed contact between acceptance and joining.'),
  p('Candidates also assess the employer\'s clarity and communication. Our article on ', link('how engineers in Bengaluru evaluate your company', '/blog/bengaluru-tech-talent-evaluation-us-companies-india'), ' explores that part of the hiring experience.'),

  h2('Machine Learning Engineer Scorecard: A Template You Can Use'),
  p('Rate each agreed competency from 1 to 5 and record the evidence behind the rating. Use the same role-specific criteria for every candidate, and mark an area "not assessed" when you have insufficient evidence.'),
  table([
    ['Competency', 'What to assess', 'Stronger evidence', 'Concern to explore', 'Example weight'],
    ['Problem framing', 'Connects the business goal to an ML task', 'Clarifies the goal, baseline, data and success metric', 'Selects a model before understanding the problem', '15%'],
    ['ML fundamentals', 'Chooses and evaluates methods', 'Explains trade-offs and when a simpler approach wins', 'Names algorithms without explaining their suitability', '15%'],
    ['Engineering quality', 'Writes testable, maintainable systems', 'Shows clear code, tests and reproducible workflows', 'Cannot explain how the work would be tested or maintained', '20%'],
    ['Production readiness', 'Plans deployment and monitoring', 'Explains release, failure detection and rollback for the role\'s scope', 'Cannot identify operational risks or ownership', '20%'],
    ['Data judgment', 'Recognizes quality, bias and leakage issues', 'Checks data availability, splits and quality', 'Accepts a high score without checking how it was measured', '15%'],
    ['Communication', 'Explains decisions and limitations', 'States assumptions and explains choices clearly', 'Overclaims results or cannot distinguish facts from assumptions', '10%'],
    ['Ownership and learning', 'Identifies contributions and learns from work', 'Explains personal decisions, feedback and improvements', 'Cannot describe their own contribution or lessons learned', '5%'],
  ]),
  p('Illustrative scorecard for a role with production responsibilities. It is an interview aid, not a validated predictor of job performance. Agree competencies, weights and essential requirements before using it; adapt them to the seniority and support available.'),
  h3('How Should Interviewers Use the 1-to-5 Ratings?'),
  li({ bold: '1: ' }, 'The evidence does not meet the agreed requirement, even after relevant follow-up questions.'),
  li({ bold: '2: ' }, 'Shows partial understanding but needs substantial help with the task.'),
  li({ bold: '3: ' }, 'Can handle the agreed task independently at the required level.'),
  li({ bold: '4: ' }, 'Meets the requirement and explains important trade-offs and failure cases.'),
  li({ bold: '5: ' }, 'Shows depth across relevant examples and can explain how to guide others through the work.'),
  p('These anchors need role-specific examples. A score of 3 for a junior role does not imply the same scope of responsibility as a score of 3 for a senior role. Missing evidence needs a follow-up, not an automatic zero.'),
  h3('What Does a Worked Scorecard Example Look Like?'),
  p('Suppose the role is to deploy a weekly demand forecast. In an illustrative interview, the candidate asks how the forecast will affect inventory decisions, proposes a simple baseline, and explains how to evaluate using earlier data to predict a later period. They also outline monitoring and rollback, but need follow-up on operational ownership.'),
  p('Using the rows above, an interviewer might record ratings of 4, 3, 4, 3, 4, 4 and 3. With the example weights, the weighted score is 3.60 out of 5: multiply each rating by its percentage weight and add the results.'),
  p('Keep the evidence alongside the number: "Defined a baseline and evaluation period; described monitoring; clarify who handles a failed batch run." A total score does not cancel a gap in an essential requirement. Discuss the gap and collect further evidence before deciding. This example is fictional, not a client or candidate result.'),

  h2('Common Mistakes When Hiring Machine Learning Engineers'),
  li({ bold: 'Choosing the title before defining the work: ' }, 'An analyst, a research-oriented data scientist and a production engineer can all be capable while fitting different needs.'),
  li({ bold: 'Requiring every tool: ' }, 'Assess transferable capability and identify the few technologies that are genuinely essential.'),
  li({ bold: 'Testing theory alone: ' }, 'Include relevant engineering or project evidence alongside conceptual questions.'),
  li({ bold: 'Applying senior expectations to junior applicants: ' }, 'Match ownership requirements to the level you are hiring and the support you can provide.'),
  li({ bold: 'Leaving candidates without updates: ' }, 'Give a clear schedule and explain delays promptly.'),
  li({ bold: 'Over-trusting automated scores: ' }, 'Keep people accountable for evaluation criteria and hiring decisions. Our article on ', link('amoral drift in AI hiring', '/blog/amoral-drift-ai-hiring-risk'), ' discusses risks in automated screening.'),

  h2('Permanent, Contract or Contract-to-Hire: Which Model Fits?'),
  p('Choose the engagement model around the duration of the need, continuity of ownership and the arrangement you can offer the candidate. Set expectations before the search begins.'),
  table([
    ['Hiring model', 'Useful for', 'Clarify before hiring'],
    ['Permanent', 'Core capability and long-term product ownership', 'Responsibilities, growth, compensation and support'],
    ['Contract', 'Defined projects or a temporary capacity need', 'Scope, duration, knowledge transfer and operational handover'],
    ['Contract-to-hire', 'An engagement with a possible path to permanent employment', 'Conversion criteria, timing and terms; conversion should not be implied as guaranteed'],
  ]),
  p('For a broader employer overview, read our guide to ', link('contract staffing in India', '/blog/contract-staffing-india-guide'), '. You can also explore our ', link('contract-to-hire staffing approach', '/solutions#contract-to-hire'), ' and discuss which arrangement fits your ML requirement.'),

  h2('Why Can Hiring ML Talent in India Be Challenging?'),
  p('The challenge is matching a specific technical need with the right scope, compensation, working arrangement and start date. A broad title can hide those differences until late in the process.'),
  p('Employers should check current availability and expectations for their particular search rather than relying on a single nationwide salary or hiring-time figure. A shortlist deadline, an accepted offer and a joining date measure different stages.'),
  li('Confirm whether the role is based in Bengaluru, another Indian city, or genuinely remote, and state any time-zone overlap.'),
  li('Discuss the candidate\'s notice period and start-date constraints early.'),
  li('Explain the actual product problem, learning opportunities and ownership available.'),
  li('For cross-border teams, clarify who manages the engineer, how collaboration works and which employer or staffing arrangement applies.'),
  p('For GCC teams, the capability question is broader than choosing a location. Read ', link('India Has Won the GCC Location Argument. Can We Win the Talent Argument?', '/blog/india-gcc-talent-capability-challenge'), ' for that perspective.'),

  h2('When Should Companies Consider a Staffing Agency for ML Hiring?'),
  p('Consider a specialist partner when the search needs sourcing capacity or evaluation support your team cannot provide consistently. Agree responsibilities and the evidence required in each candidate submission.'),
  li('The role remains open despite a clear brief and active recruiting.'),
  li('Your team needs support reaching candidates outside the applicant pool.'),
  li('Recruiting capacity is limited or several specialist roles must be filled.'),
  li('You need a partner that can explain contract, contract-to-hire and permanent options.'),
  p('Ask who performs technical evaluation, what evidence accompanies a shortlist, and how the partner handles an unsuitable submission. A recruiter should be clear about where your technical team still needs to assess the candidate.'),
  p('Our ', link('guide to choosing an IT staffing agency in the USA', '/blog/how-to-choose-it-staffing-agency-usa'), ' offers partner-selection questions for US employers, including those building teams across India and the US. Apply local requirements to the actual engagement.'),

  h2('The TalentiFi-X Perspective: Hire for Evidence, Not Titles'),
  p('TalentiFi-X combines AI-assisted sourcing with human recruitment judgment. For an ML requirement, the useful starting point is what the person must build, the capabilities needed and the evidence that would demonstrate them.'),
  p('Our ', link('AI and machine learning staffing page', '/talent/ai-machine-learning-talent'), ' explains the roles and hiring models we support across India and the US. The aim is a relevant shortlist based on the brief, an approach discussed further in our article on ', link('precision hiring', '/blog/precision-hiring-future-of-recruitment'), '.'),
  p('Human Led. AI Assisted.'),

  h2('Looking to Hire Machine Learning Talent?'),
  p('Share the outcome you need, the current team and stack, the location or working arrangement, and the intended engagement model. Those details help turn a broad ML title into a requirement that can be sourced and assessed.'),
  p(link('Explore AI and machine learning staffing', '/talent/ai-machine-learning-talent'), ' or ', link('start a hiring conversation', '/start-hiring'), ' with TalentiFi-X.'),
];

export const faq = [
  ['How do I hire a machine learning engineer in India?', 'Define the business outcome, responsibilities and essential skills first. Source relevant candidates, screen for project evidence, use a practical assessment and structured interviews, then agree a realistic offer and joining timeline. Use the same role-specific scorecard for every candidate.'],
  ['What is the difference between a machine learning engineer and a data scientist?', 'A data scientist often focuses on analysis, experimentation and modeling. A machine learning engineer often focuses on building, deploying and maintaining model-based systems. Responsibilities overlap, so use the actual work and ownership requirements to define the role.'],
  ['What skills should a machine learning engineer have?', 'Assess programming and engineering fundamentals, machine learning evaluation, data judgment and the production skills required by the role. Language-model work may also need retrieval, evaluation and integration skills. Match the depth of each requirement to seniority and available team support.'],
  ['How long does it take to hire an ML engineer in India?', 'There is no single reliable timeline for every ML role. Scope, seniority, compensation, assessment availability and candidate notice periods all affect it. Track time to shortlist, time to accepted offer and time to joining separately, and confirm the candidate\'s actual availability.'],
  ['Should I hire a full-time ML engineer or use contract talent?', 'Permanent hiring can suit ongoing product ownership. Contract talent can suit a defined project or temporary capacity need. Contract-to-hire may fit an engagement with a possible permanent path, provided the timing and conversion terms are clear. Choose around the work and continuity required.'],
  ['How do you assess a machine learning engineer in an interview?', 'Use a job-related case discussion, project review or debugging exercise. Assess problem framing, ML fundamentals, engineering, data judgment and relevant production skills. Record evidence against agreed rating anchors and score independently before discussing the hiring decision.'],
  ['What are the red flags when hiring ML engineers?', 'Explore unexplained model choices, misleading evaluation results, unclear personal contributions and overclaims. Production gaps matter when production ownership is required. Academic or personal projects can be appropriate evidence for junior applicants; judge them against the role rather than rejecting them automatically.'],
  ['When should a company use a staffing agency to hire AI and ML talent?', 'A specialist partner can help when sourcing capacity is limited, a clear requirement remains unfilled, or you need support across different engagement models. Ask how candidates are evaluated, what evidence comes with a shortlist and which assessments remain the hiring team\'s responsibility.'],
].map(([question, answer], i) => ({ _type: 'faqItem', _key: `mlfaq${i + 1}`, question, answer }));

// Insert into the existing article's AI Engineer section, without replacing its body.
export const backlinkBlock = {
  ...p('For a role-specific assessment process, use our ', link('guide to hiring a machine learning engineer in India', blogPath), ', including role comparisons, practical interview questions and a worked hiring scorecard.'),
  _key: 'ml-engineer-india-guide-link',
};

export const textOf = (blocks) => blocks.flatMap((item) => item._type === 'table'
  ? item.rows.flatMap((row) => row.cells)
  : [item.children.map((span) => span.text).join('')]);
export const wordCount = [post.introduction, ...textOf(body), ...faq.flatMap((item) => [item.question, item.answer])].join(' ').split(/\s+/).filter(Boolean).length;
export const readTime = `${Math.ceil(wordCount / 230)} min read`;
