import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import React, { Suspense } from "react";

import { dataProvider } from "@providers/data-provider";
import { ToastProvider } from "@providers/toast";
import "@styles/globals.css";
import "react-international-phone/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TalentiFi-X | Intelligent Staffing for the AI Age",
    template: "%s | TalentiFi-X",
  },
  description:
    "TalentiFi-X rebuilds staffing for the AI age. Human-led, AI-assisted hiring for AI, ML, and cybersecurity talent across India. Staffing. Rebuilt.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: "TalentiFi-X",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@talentifi_x",
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
  return (
    <html lang="en">
      <head>
          <meta
            name="google-site-verification"
            content="3azo_OyDlmZcAfe6yTtHcD8uSPP-0t_YKq7RORI58XQ"
          />
          {/* Canonical URLs are set per-page via metadata */}
      </head>
      <body className={inter.className}>
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
        <ToastProvider>
          <Suspense>
            <RefineKbarProvider>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "npR5mU-ltUWyO-Yh0HB5",
                }}
              >
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
                  <RefineKbar />
                </div>
              </Refine>
            </RefineKbarProvider>
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
