import type { Locale } from "@/lib/i18n";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  author?: string;
};

export const guides: Record<Locale, Guide[]> = {
  en: [
    {
      slug: "introduction-to-personal-finance",
      title: "Introduction to Personal Finance",
      description:
        "The foundational principles every person should know before making any financial decision — budgeting, saving, debt, and investing explained simply.",
      tag: "Foundations",
      date: "June 21, 2026",
      author: "Moneycho Editorial",
    },
  ],
  nl: [
    // Add Dutch guides here. Each entry needs a matching src/content/nl/[slug].mdx file.
  ],
};
