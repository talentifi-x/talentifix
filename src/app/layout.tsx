import { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import React from "react";
import { preconnect } from "react-dom";

import { ToastProvider } from "@providers/toast";
import { JsonLd } from "@components/seo/JsonLd";
import { SITE_URL, jsonLdGraph, organizationNode, websiteNode } from "@lib/seo";
// react-international-phone/style.css is imported by the three forms that use the
// phone field, so it no longer loads on every page.
import "@styles/global.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Headline font, self-hosted as WOFF2 (about 30 KB a weight, down from 78 KB TTF)
 * with long-lived caching and a size-matched fallback while it loads. Only the
 * weights the site uses are listed; extra-bold text renders with Bold, as before.
 * Not preloaded, so it never competes with the hero image for bandwidth.
 */
const stackSansNotch = localFont({
  src: [
    { path: "../fonts/StackSansNotch-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/StackSansNotch-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/StackSansNotch-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/StackSansNotch-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-stack-sans-notch",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TalentiFi-X | Intelligent Staffing for the AI Age",
    template: "%s | TalentiFi-X",
  },
  description:
    "TalentiFi-X rebuilds staffing for the AI age. Human-led, AI-assisted hiring for AI, ML, and cybersecurity talent across India. Staffing. Rebuilt.",
  // Icons come from the file conventions in this folder: favicon.ico (16-48px),
  // icon.png (192px) and apple-icon.png (180px), all square.
  openGraph: {
    siteName: "TalentiFi-X",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@talentifi_x",
  },
  // Search Console ownership. Bing is verified by public/BingSiteAuth.xml; the
  // meta tag below is only emitted if that env var is ever set.
  verification: {
    google: "3azo_OyDlmZcAfe6yTtHcD8uSPP-0t_YKq7RORI58XQ",
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { BackToTop } from "@components/layout/BackToTop";
import { CookieConsent } from "@components/layout/CookieConsent";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Open the Google Analytics connections early (Lighthouse's only preconnect
  // candidate on 29 Sep 2026). React renders these as <link rel="preconnect"> in <head>.
  preconnect("https://www.googletagmanager.com");
  preconnect("https://www.google-analytics.com");

  return (
    <html lang="en" className={stackSansNotch.variable}>
      <body className={inter.className}>
        {/* Sitewide brand identity - every other page references these by @id. */}
        <JsonLd data={jsonLdGraph(organizationNode, websiteNode)} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VDENLSNNWP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VDENLSNNWP');
          `}
        </Script>
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
        <ToastProvider>
          <div className="bg-(--color-bg) min-h-screen w-full">
            <Link
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-[5px] focus:font-bold"
            >
              Skip to main content
            </Link>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <BackToTop />
            <CookieConsent />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
