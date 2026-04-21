"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kt_consent_v1";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(choice: Choice) {
  window.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prior = localStorage.getItem(STORAGE_KEY);
    if (prior === "granted" || prior === "denied") {
      applyConsent(prior);
      return;
    }
    setVisible(true);
  }, []);

  const choose = (choice: Choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[90] rounded-[var(--radius-card)] border border-ink-200 bg-white shadow-soft-lg p-5 sm:p-6"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <p className="text-sm text-ink-700 leading-relaxed">
        We use cookies for analytics to understand how visitors use the site.
        No ads, no tracking across sites.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => choose("granted")}
          className="flex-1 rounded-full bg-ink-900 text-white text-sm font-semibold px-4 py-2 hover:bg-ink-800 transition-colors cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={() => choose("denied")}
          className="flex-1 rounded-full bg-ink-100 text-ink-700 text-sm font-semibold px-4 py-2 hover:bg-ink-200 transition-colors cursor-pointer"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
