"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";

type CookieConsentValue = "accepted" | "rejected";

export function CookieConsent() {
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === "accepted" || stored === "rejected") {
        return;
      }

      setIsRendered(true);
      const id = window.requestAnimationFrame(() => setIsOpen(true));
      return () => window.cancelAnimationFrame(id);
    } catch {
      setIsRendered(true);
      const id = window.requestAnimationFrame(() => setIsOpen(true));
      return () => window.cancelAnimationFrame(id);
    }
  }, []);

  const persistAndClose = (value: CookieConsentValue) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      void value;
    }

    setIsOpen(false);
    window.setTimeout(() => setIsRendered(false), 350);
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div
        role="region"
        aria-label="Cookie consent"
        className={[
          "mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur",
          "transition-all duration-500 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-[#1E1E24] sm:text-base">
              We use cookies to improve your experience.
            </p>
            <p className="text-xs text-gray-600 sm:text-sm">
              You can accept or reject non-essential cookies. See our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#0000FF] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => persistAndClose("rejected")}
              className="w-full rounded-[8px] border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-bold text-gray-700 transition-colors hover:border-[#0000FF] hover:text-[#0000FF] sm:w-auto"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => persistAndClose("accepted")}
              className="w-full rounded-[8px] bg-linear-to-r from-[#0000FF] to-[#00DDE2] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Accept
            </button>
          </div>
        </div>

        <div className="h-1 w-full bg-linear-to-r from-[#0000FF] to-[#00DDE2] opacity-60" />
      </div>
    </div>
  );
}
