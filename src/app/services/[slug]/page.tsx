import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { slugsUnder, visiblePageByPath } from "@data/content";
import { ContentPageView } from "@components/content/ContentPageView";
import { contentMetadata, postsForPage } from "@lib/contentPage";
import { pageShareImage } from "@lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return slugsUnder("/services").filter((s) => s.slug !== "software-testing-qa");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = visiblePageByPath(`/services/${(await params).slug}`);
  return page ? contentMetadata(page, { image: pageShareImage(page.path, page.h1) }) : {};
}

export default async function ServicePage({ params }: Props) {
  const page = visiblePageByPath(`/services/${(await params).slug}`);
  if (!page) notFound();
  return <ContentPageView page={page} posts={await postsForPage(page)} />;
}
