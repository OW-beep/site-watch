import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

const hasPosts = (label: string) => getAllPosts().some((p) => !p.noindex && p.category === label);
export function generateStaticParams() { return CATEGORIES.filter((c) => hasPosts(c.label)).map((c) => ({ category: c.slug })); }
export function generateMetadata({ params }: { params: { category: string } }) {
  const c = getCategoryBySlug(params.category);
  return c ? { title: c.label, description: c.desc } : {};
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategoryBySlug(params.category);
  if (!c || !hasPosts(c.label)) notFound();
  const posts = getAllPosts().filter((p) => p.category === c.label && !p.noindex);
  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: c.label, item: `${SITE_URL}/category/${c.slug}` } ] },
      ]) }} />
      <nav className="text-xs text-sumi-soft mb-6" aria-label="パンくず">
        <Link href="/">ホーム</Link> › {c.label}
      </nav>
      <h1 className="font-display text-4xl"><span className="marker">{c.label}</span></h1>
      <p className="mt-3 mb-8 text-sm text-sumi-soft">{c.desc}</p>
      <div className="grid md:grid-cols-2 gap-6">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </main>
  );
}
