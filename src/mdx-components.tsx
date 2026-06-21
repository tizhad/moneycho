import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl md:text-5xl font-bold text-emerald-deep tracking-tight mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl font-bold text-emerald-deep tracking-tight mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-emerald-deep mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-emerald-deep/80 leading-relaxed mb-5">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-emerald-deep/80">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-emerald-deep/80">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-bold text-emerald-deep">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-emerald-deep/70">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-emerald-deep/10 my-12" />,
    ...components,
  };
}
