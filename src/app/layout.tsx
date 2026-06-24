import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MoneyCho — Free Personal Finance Calculators",
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
      className={`${inter.variable} ${dmSerifDisplay.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
