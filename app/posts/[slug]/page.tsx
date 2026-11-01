import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import BeltChip from "@/components/BeltChip";
import Byline from "@/components/Byline";
import PostCard from "@/components/PostCard";
import PostFooterNav from "@/components/PostFooterNav";
import { getAllPosts, getPost } from "@/lib/posts";
import { getCategoryByLabel } from "@/lib/categories";
import { termsIn } from "@/lib/glossary";
import { SITE_NAME, SITE_URL, SLOT_ARTICLE } from "@/lib/site";

export function generateStaticParams() { return getAllPosts().map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title, description: meta.excerpt,
    alternates: { canonical: `${SITE_URL}/posts/${meta.slug}` },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title: meta.title, description: meta.excerpt, publishedTime: meta.date },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const { meta, body, toc } = post;
  const cat = getCategoryByLabel(meta.category);
  const terms = termsIn(body.replace(/<[^>]+>/g, ""));
  const list = getAllPosts().filter((p) => !p.noindex);
  const i = list.findIndex((p) => p.slug === meta.slug);
  const next = i > 0 ? list[i - 1] : undefined;   // 新しい記事
  const prev = i >= 0 ? list[i + 1] : undefined;  // 古い記事
  const related = list.filter((p) => p.category === meta.category && p.slug !== meta.slug).slice(0, 2);
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: meta.title, datePublished: meta.date, dateModified: meta.updated || meta.date,
      author: { "@type": "Person", name: `${SITE_NAME} 道場主` }, mainEntityOfPage: `${SITE_URL}/posts/${meta.slug}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: meta.category, item: cat ? `${SITE_URL}/category/${cat.slug}` : SITE_URL },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE_URL}/posts/${meta.slug}` } ] },
  ];
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-xs text-sumi-soft mb-6" aria-label="パンくず">
        <Link href="/">ホーム</Link> › {cat ? <Link href={`/category/${cat.slug}`}>{cat.label}</Link> : meta.category}
      </nav>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <Link href={`/level/${meta.belt}`}><BeltChip belt={meta.belt} /></Link>
        {meta.training && meta.minutes && <span className="text-xs font-bold text-shu">約{meta.minutes}分の稽古</span>}
      </div>
      <h1 className="font-hand font-semibold text-3xl md:text-4xl leading-snug mb-5">{meta.title}</h1>
      <Byline date={meta.date} updated={meta.updated} />

      {meta.tldr.length > 0 && (
        <section className="fuda p-5 bg-marker/40 mb-8">
          <p className="font-display text-lg mb-2">今日の要点</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">{meta.tldr.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      )}
      {toc.length >= 3 && (
        <nav className="border-2 border-sumi bg-white p-5 mb-8 text-sm" aria-label="目次">
          <p className="font-bold mb-2">目次</p>
          <ol className="list-decimal pl-5 space-y-1">{toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="underline">{t.text}</a></li>)}</ol>
        </nav>
      )}
      {terms.length > 0 && (
        <aside className="border-2 border-sumi bg-white p-5 mb-8 text-sm" aria-label="用語メモ">
          <p className="font-bold mb-3">用語メモ(むずかしい言葉の説明)</p>
          <dl className="space-y-2 leading-relaxed">
            {terms.map((t) => (<div key={t.term}><dt className="inline font-bold text-shu">{t.term}</dt><dd className="inline">:{t.desc}</dd></div>))}
          </dl>
        </aside>
      )}

      <article className="prose prose-lg max-w-none prose-dojo" dangerouslySetInnerHTML={{ __html: body }} />
      <AdUnit slot={SLOT_ARTICLE} />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl mb-4">同じテーマの記事</h2>
          <div className="grid md:grid-cols-2 gap-5">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}
      <PostFooterNav prev={prev} next={next} />
    </main>
  );
}
