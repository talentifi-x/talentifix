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

  // On phones it is one row (short text beside the buttons, about 80 px tall) so
  // it never covers a page's heading and main button; larger screens show the full text.
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-2 sm:px-6 sm:pb-4">
      <div
        role="region"
        aria-label="Cookie consent"
        className={[
          "mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur",
          "transition-all duration-500 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-row items-center gap-3 p-2.5 sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1">
            <p className="hidden text-base font-bold text-[#1E1E24] sm:block">
              We use cookies to improve your experience.
            </p>
            <p className="text-xs leading-4 text-gray-600 sm:text-sm sm:leading-5">
              <span className="sm:hidden">We use optional cookies.</span>
              <span className="hidden sm:inline">
                You can accept or reject non-essential cookies.
              </span>{" "}
              See our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#0000FF] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-none flex-row items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => persistAndClose("rejected")}
              className="min-h-11 rounded-[8px] border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:border-[#0000FF] hover:text-[#0000FF] sm:px-5 sm:py-3"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => persistAndClose("accepted")}
              className="min-h-11 rounded-[8px] bg-linear-to-r from-[#0000FF] to-[#00DDE2] px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:px-5 sm:py-3"
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
