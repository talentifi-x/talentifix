import { slugsUnder, visiblePageByPath } from "@data/content";
import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

/** Each talent page's own share image: its headline instead of the site default. */
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return slugsUnder("/talent");
}

export default async function TalentShareImage({ params }: { params: Promise<{ slug: string }> }) {
  const page = visiblePageByPath(`/talent/${(await params).slug}`);
  return renderShareImage({
    headline: page?.h1 ?? "Specialist technology staffing",
    subline: "Human led. AI assisted. Specialist technology hiring.",
  });
}
