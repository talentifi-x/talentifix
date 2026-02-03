import { DevtoolsProvider } from "@providers/devtools";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";

import { dataProvider } from "@providers/data-provider";
import { ToastProvider } from "@providers/toast";
import "@styles/global.css";
import "react-international-phone/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talentifi-X",
  description: "Intelligent Hiring Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { BackToTop } from "@components/layout/BackToTop";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <Suspense >

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
                  <Header />
                  <div className="">
                    {children}
                  </div>
                  <Footer />
                  <BackToTop />
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
