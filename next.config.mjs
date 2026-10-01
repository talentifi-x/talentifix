import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Baseline Content-Security-Policy. It restricts what can frame the site, where
 * forms may post and which <base>/<object> tags are honoured - the directives
 * that cannot break the GA, Clarity or Sanity scripts the pages load. Script and
 * style allow-lists are a later hardening step (they need nonces, which would
 * turn the ISR pages dynamic). The embedded Studio is excluded below.
 */
const contentSecurityPolicy = [
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Public files renamed for SEO on 1 Oct 2026; Google Images may still hold the old addresses. */
const renamedImages = [
  ["/assets/Solutions/hero-visual-blog.png", "/assets/Solutions/hiring-insights-isometric-blocks.png"],
  ["/assets/Solutions/hero-visual.png", "/assets/Solutions/staffing-solutions-isometric-blocks.png"],
  ["/assets/contact/hero.png", "/assets/contact/colleagues-reviewing-screen-contact.png"],
  ["/banner-home/banner.webp", "/banner-home/talentifi-x-3d-logo-staffing-rebuilt.webp"],
  ["/banner-home/bg-rebuild.webp", "/banner-home/talentifi-x-logo-data-streams-background.webp"],
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => [
    `/gcc/${n}.jpg`,
    `/gcc/gcc-summit-2026-bengaluru-talentifi-x-team-${n}.jpg`,
  ]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // AVIF stays OFF until Next.js is on >= 16.3.3: GHSA-2xp9-vwfh-vxw4 is a
    // critical remote-code-execution bug in AVIF image optimisation on earlier
    // versions. After upgrading, add: formats: ["image/avif", "image/webp"].
    qualities: [100, 75],
  },
  async redirects() {
    return [
      // /services was replaced by /solutions in January 2026.
      { source: "/services", destination: "/solutions", permanent: true },
      // Addresses people guess for the careers and blog pages.
      { source: "/careers", destination: "/jobs", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      ...renamedImages.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Everything except the embedded Sanity Studio, whose login flow is its own.
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
      },
      {
        // Form endpoints and the Studio are never search results.
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
