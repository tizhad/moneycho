import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guides";
import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://moneycho.com";

type ArticleMetadata = {
  title?: string;
  description?: string;
  tag?: string;
  date?: string;
  author?: string;
};

type MdxModule = {
  default: React.ComponentType;
  metadata?: ArticleMetadata;
};

async function loadMdx(lang: string, slug: string): Promise<MdxModule> {
  try {
    return (await import(`@/content/${lang}/${slug}.mdx`)) as MdxModule;
  } catch {
    return (await import(`@/content/${slug}.mdx`)) as MdxModule;
  }
}

export const dynamicParams = false;

export function generateStaticParams({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const langGuides = (guides as Record<string, typeof guides.en>)[lang] ?? [];
  return langGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const { metadata } = await loadMdx(lang, slug);
  const author = metadata?.author ?? "Moneycho";
  const publishedTime = metadata?.date
    ? new Date(metadata.date).toISOString()
    : undefined;

  return {
    title: metadata?.title,
    description: metadata?.description,
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      type: "article",
      publishedTime,
      authors: [author],
      url: `${BASE_URL}/${lang}/guides/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug, lang } = await params;

  let mdxModule: MdxModule;
  try {
    mdxModule = await loadMdx(lang, slug);
  } catch {
    notFound();
  }

  const { default: Article, metadata } = mdxModule!;
  const author = metadata?.author ?? "Moneycho";
  const publishedIso = metadata?.date
    ? new Date(metadata.date).toISOString()
    : new Date().toISOString();
  const pageUrl = `${BASE_URL}/${lang}/guides/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata?.title,
    description: metadata?.description,
    author: {
      "@type": "Organization",
      name: author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Moneycho",
      url: BASE_URL,
    },
    datePublished: publishedIso,
    dateModified: publishedIso,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-emerald-deep/10 mb-12">
        <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
          {metadata?.tag}
        </span>
        <div className="flex items-center gap-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-emerald-deep/40">
            {metadata?.date}
          </p>
          <span className="text-emerald-deep/20">·</span>
          <p className="text-xs uppercase tracking-widest text-emerald-deep/40">
            {author}
          </p>
        </div>
      </div>
      <Article />
    </>
  );
}
