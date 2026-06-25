import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Free Financial Calculators & Money Guides | MoneyCho",
    template: "%s | MoneyCho",
  },
  description:
    "Free, simple personal finance calculators. Budget planner, compound interest, debt payoff, retirement, and more.",
  metadataBase: new URL("https://moneycho.com"),
  openGraph: {
    siteName: "MoneyCho",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("moneycho_locale")?.value ?? "nl";
  const lang = ["en", "nl"].includes(raw) ? raw : "nl";

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${sourceSerif4.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
