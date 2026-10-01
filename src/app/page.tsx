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
import { Bannertwo } from "@components/home/Bannertwo";
import { Bannerthree } from "@components/home/Bannerthree";
import { pageMetadata } from "@lib/seo";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "AI, ML & Cybersecurity Staffing in India & US | TalentiFi-X" },
  description:
    "Human-led, AI-assisted staffing for AI, ML, cybersecurity and GCC teams across India and the US. Fewer resumes, better hires. Tell us the role you need.",
  path: "/",
});

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-white">
      <Banner />
      <Bannertwo />
      <Bannerthree />
      <StorySection />
      <ClientsSection />
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
      <TheNextStepSection />
    </main>
  );
}
