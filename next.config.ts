import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const CALCULATOR_SLUGS = [
  'take-home-pay',
  'mortgage',
  'compound-interest',
  'savings-goal',
  'credit-card-payoff',
  'debt-payoff',
  'budget-planner',
  'budget',
  'borrowing-capacity',
  'cash-flow',
  'annuiteit',
  'kosten-koper',
  'rent-vs-buy',
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // Short URLs → NL calculator (locale prefix added by middleware after)
      ...CALCULATOR_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/nl/calculators/${slug}`,
        permanent: false,
      })),
      // EN alias: /en/calculators/annuity → /en/calculators/annuiteit
      {
        source: '/en/calculators/annuity',
        destination: '/en/calculators/annuiteit',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
