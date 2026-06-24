export type Guide = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  author?: string;
};

export const guides: Guide[] = [
  {
    slug: "introduction-to-personal-finance",
    title: "Introduction to Personal Finance",
    description:
      "The foundational principles every person should know before making any financial decision — budgeting, saving, debt, and investing explained simply.",
    tag: "Foundations",
    date: "June 21, 2026",
  },
];
