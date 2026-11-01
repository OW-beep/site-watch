import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { BELTS, getAllPosts } from "@/lib/posts";
import { BELT_INFO } from "@/components/BeltChip";
import { SITE_NAME } from "@/lib/site";

export default function SiteHeader() {
  const posts = getAllPosts().filter((p) => !p.noindex);
  const levels = BELTS.filter((b) => posts.some((p) => p.belt === b));
  const cats = CATEGORIES.filter((c) => posts.some((p) => p.category === c.label));
  return (
    <header className="border-b-[3px] border-sumi bg-paper">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center gap-4 flex-wrap">
        <Link href="/" className="flex items-center gap-3">
          <span className="stamp text-2xl px-2 py-0.5 leading-none">脱</span>
          <span className="font-display text-2xl tracking-wide">{SITE_NAME}</span>
        </Link>
        <nav aria-label="メイン" className="ml-auto flex gap-5 text-sm font-bold flex-wrap">
          <Link href="/start" className="hover:text-shu">はじめての方へ</Link>
          <Link href="/training" className="hover:text-shu">稽古メニュー</Link>
          <Link href="/posts" className="hover:text-shu">記事一覧</Link>
          <Link href="/about" className="hover:text-shu">道場主</Link>
        </nav>
      </div>
      <nav aria-label="レベル" className="border-t-2 border-sumi bg-white">
        <ul className="max-w-5xl mx-auto px-5 py-2 flex items-center gap-2 overflow-x-auto text-xs">
          <li className="font-bold shrink-0 mr-1">レベルで選ぶ</li>
          {levels.map((b) => (
            <li key={b} className="shrink-0">
              <Link href={`/level/${b}`} className={`inline-block border-2 border-sumi px-2.5 py-1 font-bold ${BELT_INFO[b].cls}`}>
                {BELT_INFO[b].label}・{BELT_INFO[b].level}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="カテゴリ" className="border-t-2 border-sumi bg-paper-kraft">
        <ul className="max-w-5xl mx-auto px-5 flex items-center gap-1 overflow-x-auto text-sm">
          <li className="font-bold text-xs shrink-0 mr-2">テーマで選ぶ</li>
          {cats.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link href={`/category/${c.slug}`} className="block px-3 py-2 font-hand font-semibold whitespace-nowrap hover:bg-marker">{c.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
