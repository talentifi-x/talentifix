import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Default share image (1200x630) for every page that has no image of its own.
 * Drawn at build time from the logo and the brand font, so it needs no design file.
 * Pages reference it through DEFAULT_SHARE_IMAGE in @lib/seo.
 */
export const alt =
  "TalentiFi-X: human-led, AI-assisted staffing for AI, ML, cybersecurity and GCC teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
              Specialist hiring for AI, ML, cybersecurity and GCC teams
            </div>
            <div style={{ fontSize: 32, fontWeight: 400, color: "#5B5F6B" }}>
              Human led. AI assisted. Bengaluru and Houston.
            </div>
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
      ...size,
      fonts: [
        { name: "Stack Sans Notch", data: bold, weight: 700, style: "normal" },
        { name: "Stack Sans Notch", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
