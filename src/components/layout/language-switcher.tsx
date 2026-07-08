"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const LOCALE_COOKIE = "moneycho_locale";

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter();

  function switchLocale(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.push(`/${locale}`);
  }

  return (
    <div className="flex items-center gap-1 text-[0.75rem] font-medium">
      {(["en", "nl"] as Locale[]).map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`min-w-11 min-h-11 px-2 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer flex items-center justify-center ${
            locale === lang
              ? "text-emerald-deep font-semibold"
              : "text-text-tertiary hover:text-emerald-deep"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
