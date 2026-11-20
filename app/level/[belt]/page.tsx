import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import BeltChip, { BELT_INFO } from "@/components/BeltChip";
import { BELTS, getAllPosts } from "@/lib/posts";
import type { Belt } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const used = () => BELTS.filter((b) => getAllPosts().some((p) => !p.noindex && p.belt === b));
export function generateStaticParams() { return used().map((belt) => ({ belt })); }
export function generateMetadata({ params }: { params: { belt: string } }) {
  const b = BELT_INFO[params.belt as Belt];
  return b ? { title: `${b.label}・${b.level}の記事`, description: `${b.label}(${b.level})向けの稽古と記事の一覧です。${b.desc}。` } : {};
}

export default function LevelPage({ params }: { params: { belt: string } }) {
  const belt = params.belt as Belt;
  if (!used().includes(belt)) notFound();
  const info = BELT_INFO[belt];
  const posts = getAllPosts().filter((p) => !p.noindex && p.belt === belt);
  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${info.label}・${info.level}`, item: `${SITE_URL}/level/${belt}` } ] },
      ]) }} />
      <nav className="text-xs text-sumi-soft mb-6" aria-label="パンくず">
        <Link href="/">ホーム</Link> › {info.label}・{info.level}
      </nav>
      <BeltChip belt={belt} />
      <h1 className="font-display text-4xl mt-3"><span className="marker">{info.label}・{info.level}</span></h1>
      <p className="mt-3 mb-8 text-sm text-sumi-soft">{info.desc}。全{posts.length}本。</p>
      <div className="grid md:grid-cols-2 gap-6">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </main>
  );
}
