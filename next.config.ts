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
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return CALCULATOR_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/nl/calculators/${slug}`,
      permanent: false,
    }));
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
