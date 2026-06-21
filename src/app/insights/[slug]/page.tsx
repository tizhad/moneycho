import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "introduction-to-personal-finance" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/${slug}.mdx`);
  return metadata ?? {};
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
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
