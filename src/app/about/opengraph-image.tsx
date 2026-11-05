import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

/** This page's own share image; page.tsx points its metadata here with pageShareImage(). */
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function ShareImage() {
  return renderShareImage({
    headline: "About TalentiFi-X: staffing rebuilt for the AI age",
    subline: "Human led. AI assisted. Bengaluru and Houston.",
  });
}
