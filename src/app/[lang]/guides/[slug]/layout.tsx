export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>
  );
}
