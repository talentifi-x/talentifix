import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SHARE_IMAGE_SIZE } from "@lib/seo";

/**
 * The 1200x630 share image every page uses, drawn in code from the logo and the
 * brand font: a headline, a supporting line and the brand bar. The default image
 * (app/opengraph-image.tsx) and the page-specific ones all call this, so they
 * stay one design.
 *
 * A page with its own image passes `pageShareImage(path, alt)` from @lib/seo to
 * `pageMetadata({ image })`.
 */
export { SHARE_IMAGE_SIZE };

export async function renderShareImage({ headline, subline }: { headline: string; subline: string }) {
  const [bold, regular, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/static/StackSansNotch-Bold.ttf")),
    readFile(join(process.cwd(), "public/static/StackSansNotch-Regular.ttf")),
    readFile(join(process.cwd(), "public/logos/logo.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          fontFamily: "Stack Sans Notch",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px 56px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            width={402}
            height={98}
            alt=""
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#1E1E24",
                lineHeight: 1.1,
                maxWidth: 1000,
              }}
            >
              {headline}
            </div>
            <div style={{ fontSize: 32, fontWeight: 400, color: "#5B5F6B" }}>{subline}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 72px",
            background: "linear-gradient(90deg, #0000FF, #00DDE2)",
            color: "#FFFFFF",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <span>Staffing. Rebuilt.</span>
          <span>talentifix.com</span>
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: [
        { name: "Stack Sans Notch", data: bold, weight: 700, style: "normal" },
        { name: "Stack Sans Notch", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
