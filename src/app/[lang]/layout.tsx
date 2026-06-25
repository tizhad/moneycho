import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, getDictionary, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const BASE_URL = "https://moneycho.com";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "nl" }];
}

// Canonical and hreflang are set per-page so each URL is correct.
// This layout only provides the fallback openGraph site name.
export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: { siteName: "MoneyCho" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang as Locale} nav={dict.nav} />
      <main className="flex-1 min-w-0">{children}</main>
      <Footer lang={lang as Locale} dict={dict.footer} />
    </>
  );
}
