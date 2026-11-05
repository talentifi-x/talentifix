import { SHARE_IMAGE_SIZE } from "@lib/seo";
import { renderShareImage } from "@lib/shareImage";

/** This page's own share image; page.tsx points its metadata here with pageShareImage(). */
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function ShareImage() {
  return renderShareImage({
    headline: "Careers at TalentiFi-X: build the future of hiring",
    subline: "Open roles at our Bengaluru office.",
  });
}
