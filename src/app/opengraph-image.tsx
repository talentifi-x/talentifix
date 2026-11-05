import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

/**
 * Default share image (1200x630) for every page that has no image of its own.
 * Drawn at build time from the logo and the brand font, so it needs no design file.
 * Pages reference it through DEFAULT_SHARE_IMAGE in @lib/seo.
 */
export const alt =
  "TalentiFi-X: human-led, AI-assisted staffing for AI, ML, cybersecurity and GCC teams";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareImage({
    headline: "Specialist hiring for AI, ML, cybersecurity and GCC teams",
    subline: "Human led. AI assisted. Bengaluru and Houston.",
  });
}
