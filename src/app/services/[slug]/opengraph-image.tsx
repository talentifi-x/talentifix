import { slugsUnder, visiblePageByPath } from "@data/content";
import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return slugsUnder("/services").filter((s) => s.slug !== "software-testing-qa");
}

export default async function ServiceShareImage({ params }: { params: Promise<{ slug: string }> }) {
  const page = visiblePageByPath(`/services/${(await params).slug}`);
  return renderShareImage({
    headline: page?.h1 ?? "Technology staffing and solutions",
    subline: "Human led. AI assisted. Specialist technology hiring.",
  });
}
