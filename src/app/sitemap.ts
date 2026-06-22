import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

const BASE_URL = "https://moneycho.com";
const locales = ["en", "nl"] as const;
const now = new Date();

function urls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  return locales.map((lang) => ({
    url: `${BASE_URL}/${lang}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guideUrls = guides.flatMap((g) =>
    urls(`/guides/${g.slug}`, 0.7, "monthly")
  );

  return [
    ...urls("", 1.0, "weekly"),
    ...urls("/calculators", 0.9, "weekly"),
    ...urls("/calculators/budget", 0.8, "monthly"),
    ...urls("/calculators/compound-interest", 0.8, "monthly"),
    ...urls("/calculators/mortgage", 0.8, "monthly"),
    ...urls("/calculators/debt-payoff", 0.8, "monthly"),
    ...urls("/calculators/savings-goal", 0.8, "monthly"),
    ...urls("/calculators/credit-card-payoff", 0.8, "monthly"),
    ...urls("/guides", 0.8, "weekly"),
    ...guideUrls,
  ];
}
