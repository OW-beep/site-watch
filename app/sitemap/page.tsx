import Link from "next/link";
import { BELTS, getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { BELT_INFO } from "@/components/BeltChip";

export const metadata = { title: "サイトマップ", description: "脱デジ道場のページ構成の一覧です。レベル別・テーマ別に記事を探せます。" };
const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function SitemapPage() {
  const posts = getAllPosts().filter((p) => !p.noindex);
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-10">
      <h1 className="font-display text-4xl"><span className="marker">サイトマップ</span></h1>
      <section>
        <h2 className={h2}>サイトについて</h2>
        <ul className="grid sm:grid-cols-2 gap-1.5 underline">
          {[["/", "トップページ"], ["/start", "はじめての方へ"], ["/training", "稽古メニュー"], ["/posts", "記事一覧"], ["/about", "運営者情報"], ["/editorial-policy", "編集方針"], ["/privacy", "プライバシーポリシー"], ["/contact", "お問い合わせ"]].map(([h, t]) => <li key={h}><Link href={h}>{t}</Link></li>)}
        </ul>
      </section>
      <section>
        <h2 className={h2}>レベル別</h2>
        <ul className="space-y-1">
          {BELTS.filter((b) => posts.some((p) => p.belt === b)).map((b) => (
            <li key={b}><Link href={`/level/${b}`} className="underline">{BELT_INFO[b].label}・{BELT_INFO[b].level}</Link>({posts.filter((p) => p.belt === b).length}本)</li>
          ))}
        </ul>
      </section>
      {CATEGORIES.map((c) => {
        const list = posts.filter((p) => p.category === c.label);
        if (list.length === 0) return null;
        return (
          <section key={c.slug}>
            <h2 className={h2}><Link href={`/category/${c.slug}`}>{c.label}</Link></h2>
            <ul className="space-y-1">{list.map((p) => <li key={p.slug}><Link href={`/posts/${p.slug}`} className="underline">{p.title}</Link></li>)}</ul>
          </section>
        );
      })}
    </main>
  );
}
