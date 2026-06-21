import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Moneycho — Free Personal Finance Calculators",
    template: "%s | Moneycho",
  },
  description:
    "Free, simple personal finance calculators. Budget planner, compound interest, debt payoff, retirement, and more.",
  metadataBase: new URL("https://moneycho.com"),
  openGraph: {
    siteName: "Moneycho",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
