import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const KUN = [
  "スマホは置いて、まず考えるべし",
  "AIの答えは、一度疑ってかかるべし",
  "迷ったら、紙に書き出すべし",
  "続かなくても、恥じるべからず",
];

export default function Home() {
  const latest = getAllPosts().filter((p) => !p.noindex).slice(0, 6);
  return (
    <main className="max-w-5xl mx-auto px-5">
      <section className="pt-14 pb-12 text-center">
        <span className="stamp text-sm px-3 py-1 mb-6">入門者 随時募集中</span>
        <h1 className="font-display text-5xl md:text-7xl leading-tight mt-4">
          <span className="marker">{SITE_NAME}</span>
        </h1>
        <p className="font-hand font-semibold text-xl md:text-2xl mt-6">{SITE_TAGLINE}</p>
        <p className="text-sm text-sumi-soft mt-4 max-w-xl mx-auto leading-relaxed">
          スマホを置いて、紙とペンで頭を使う稽古場。やってみた記録と、続けるための「型」を載せています。
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link href="/category/nyumon" className="fuda px-6 py-3 font-bold bg-marker">まずは入門から</Link>
          <Link href="/training" className="fuda px-6 py-3 font-bold">稽古メニューを見る</Link>
        </div>
      </section>

      <section aria-labelledby="kun" className="fuda p-6 md:p-8 bg-paper-kraft">
        <h2 id="kun" className="font-display text-2xl mb-4">道場訓</h2>
        <ol className="space-y-2 font-hand font-semibold text-lg">
          {KUN.map((k, i) => (
            <li key={k}><span className="text-shu mr-2">{["一", "二", "三", "四"][i]}、</span>{k}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="cat" className="mt-16">
        <h2 id="cat" className="font-display text-2xl mb-6">稽古場を選ぶ</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} className="fuda block p-4 h-full">
                <span className="stamp text-xl px-2 leading-none">{c.kanji}</span>
                <p className="font-hand font-semibold text-lg mt-3">{c.label}</p>
                <p className="text-xs text-sumi-soft mt-1 leading-relaxed">{c.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="new" className="mt-16">
        <h2 id="new" className="font-display text-2xl mb-6">新着の稽古</h2>
        {latest.length === 0 ? (
          <p className="text-sm text-sumi-soft">稽古の準備中です。もうしばらくお待ちください。</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {latest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        )}
      </section>

      <section className="mt-16 text-center">
        <Link href="/about" className="font-hand font-semibold underline">道場主について</Link>
      </section>
    </main>
  );
}
