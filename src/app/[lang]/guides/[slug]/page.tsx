import type { Metadata } from "next";
import { guides } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/${slug}.mdx`);
  return metadata ?? {};
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const { default: Article, metadata } = await import(`@/content/${slug}.mdx`);

  return (
    <>
      <div className="border-b border-emerald-deep/10 mb-12">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {metadata?.tag}
        </span>
        <p className="text-xs uppercase tracking-widest text-emerald-deep/40 mb-12">
          {metadata?.date}
        </p>
      </div>
      <Article />
    </>
  );
}
