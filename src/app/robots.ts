import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentifix.com"
  ).replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/", "/api", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
