import { Metadata } from "next";
import { Banner } from "@components/home/Banner";
import { StorySection } from "@components/home/StorySection";
import { StatsSection } from "@components/home/StatsSection";
import { StatementSection } from "@components/home/StatementSection";
import { Solutionsection } from "@components/home/SolutionSection";
import { RebuildSection } from "@components/home/RebuildSection";
import { WhoSection } from "@components/home/WhoSection";
import { HumanLeadSection } from "@components/home/HumanLeadSection";
import { FormalOfferingSection } from "@components/home/FormalOfferingSection";
import YourChapterSection from "@components/home/YourChapterSection";
import HowItWorksSection from "@components/home/HowItWorksSection";
import WhereWeSpecializeSection from "@components/home/WhereWeSpecializeSection";
import TheOriginSection from "@components/home/TheOriginSection";
import TheNextStepSection from "@components/home/TheNextStepSection";
import { ClientsSection } from "@components/home/ClientsSection";
import { MediaSection } from "@components/home/MediaSection";
import { Bannertwo } from "@components/home/Bannertwo";
import { Bannerthree } from "@components/home/Bannerthree";
import { SiteSplash } from "@components/home/SiteSplash";
import { TechnologyStaffingSection, specialistLinksJsonLd } from "@components/home/TechnologyStaffingSection";
import Link from "next/link";
import { PageQuestions } from "@components/content/PageQuestions";
import { JsonLd } from "@components/seo/JsonLd";
import { jsonLdGraph, pageMetadata, webPageNode } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "AI, ML & Cybersecurity Staffing in India & US | TalentiFi-X" },
  description:
    "Human-led, AI-assisted IT staffing in India and the US for AI, ML, cybersecurity, data, cloud, QA and offshore engineering teams. Share the role you need.",
  path: "/",
});

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-white">
      <SiteSplash />
      <JsonLd
        data={jsonLdGraph(webPageNode("/", "AI, ML & Cybersecurity Staffing in India & US"), specialistLinksJsonLd())}
      />
      <Banner />
      <Bannertwo />
      <Bannerthree />
      <ClientsSection />
      <TechnologyStaffingSection />
      <StorySection />
      <MediaSection />
      <StatsSection />
      <StatementSection />
      <RebuildSection />
      <Solutionsection />
      <WhoSection />
      <HumanLeadSection />
      <FormalOfferingSection />
      <YourChapterSection />
      <HowItWorksSection />
      <WhereWeSpecializeSection />
      <TheOriginSection />
      <PageQuestions
        title="Staffing questions employers ask"
        updatedPath="/"
        items={[
          { question: "What roles does TalentiFi-X help employers hire?", answer: <>We support hiring across AI and machine learning, software engineering, data and analytics, cloud and DevOps, cybersecurity, and ERP and SAP. Explore our <Link href="/talent/ai-machine-learning-talent">AI and machine learning staffing</Link> or the other talent specialisms to define the skills and responsibilities your role needs.</> },
          { question: "Can you support hiring in India and the USA?", answer: <>Yes. TalentiFi-X supports technology hiring in India and the USA. Share the work location, working arrangement, required experience and preferred start date so our team can discuss the specific requirement and available engagement options.</> },
          { question: "Which staffing models can we discuss?", answer: <>Our <Link href="/solutions">staffing solutions</Link> cover temporary and contract staffing, contract-to-hire, permanent placement and executive search. The suitable model depends on project duration, ongoing ownership and whether you plan to convert a contract engagement into a permanent role.</> },
          { question: "How do we start a hiring conversation?", answer: <>Use <Link href="/start-hiring">Start Hiring</Link> to share your requirement. Include the role, core skills, location, budget range and timeline. If you are exploring a broader talent need or partnership, use the <Link href="/contact">contact page</Link>.</> },
        ]}
      />
      <TheNextStepSection />
    </div>
  );
}
