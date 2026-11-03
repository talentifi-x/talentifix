import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { slugsUnder, visiblePageByPath } from "@data/content";
import { ContentPageView } from "@components/content/ContentPageView";
import { contentMetadata, postsForPage } from "@lib/contentPage";

type Props = { params: Promise<{ slug: string }> };

// Related article titles come from Sanity; refresh them hourly.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return slugsUnder("/talent");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = visiblePageByPath(`/talent/${(await params).slug}`);
  return page ? contentMetadata(page) : {};
}

export default async function TalentPage({ params }: Props) {
  const page = visiblePageByPath(`/talent/${(await params).slug}`);
  if (!page) notFound();
  return <ContentPageView page={page} posts={await postsForPage(page)} />;
}
