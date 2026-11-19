import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function SoftwareTestingShareImage() {
  return renderShareImage({
    headline: "Software Testing & QA Services",
    subline: "Human-led. Automation-first. Built for continuous quality.",
  });
}
