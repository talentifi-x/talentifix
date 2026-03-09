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

export const metadata: Metadata = {
  title: "Intelligent Hiring for the AI Age",
  description:
    "TalentiFi-X delivers AI-assisted, human-led staffing for tech teams. Fewer resumes. Better hires. Staffing. Rebuilt.",
  openGraph: {
    title: "TalentiFi-X | Intelligent Hiring for the AI Age",
    description:
      "TalentiFi-X delivers AI-assisted, human-led staffing for tech teams. Fewer resumes. Better hires. Staffing. Rebuilt.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-white">
      <Banner />
      <StorySection />
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
