import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import { text, layout, buttons } from "@/lib/design";

export const metadata: Metadata = {
  title: "Personal Finance Guides",
  description:
    "Free, practical guides on budgeting, saving, debt, investing, and retirement — written for Canadians at every stage of their financial journey.",
};

export default function GuidesPage() {
  return (
    <div className={layout.section}>
      <div className="mb-16 border-b border-emerald-deep/20 pb-8">
        <span className={`${text.eyebrow} block mb-4`}>Free Resources</span>
        <h1 className={`${text.sectionHeading} text-4xl md:text-5xl`}>
          Personal Finance Guides
        </h1>
      </div>

      <div className="grid gap-px bg-emerald-deep/10 border border-emerald-deep/10">
        {guides.map((guide, i) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-paper p-8 md:p-12 hover:bg-emerald-deep/[0.03] transition-colors flex flex-col md:flex-row md:items-start md:justify-between gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className={`${text.eyebrow}`}>{guide.tag}</span>
                <span className="text-emerald-deep/20">·</span>
                <span className="text-xs text-emerald-deep/40 uppercase tracking-widest">
                  {guide.date}
                </span>
              </div>
              <h2 className={`${text.cardTitle} text-2xl md:text-3xl mb-3`}>
                {guide.title}
              </h2>
              <p className="text-emerald-deep/70 text-sm leading-relaxed max-w-xl">
                {guide.description}
              </p>
            </div>
            <span className="text-2xl text-emerald-deep/30 group-hover:text-emerald-deep transition-colors shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
