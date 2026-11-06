import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { BELTS } from "@/lib/posts";
import { PROBLEMS } from "@/lib/problems";
import { BELT_INFO } from "@/components/BeltChip";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

const KUN = [
  "スマホは置いて、まず考えるべし",
  "AIの答えは、一度疑ってかかるべし",
  "迷ったら、紙に書き出すべし",
  "続かなくても、恥じるべからず",
];

export const metadata = { alternates: { canonical: SITE_URL } };

export default function Home() {
  const all = getAllPosts().filter((p) => !p.noindex);
  const latest = all.slice(0, 6);
  const levels = BELTS.filter((b) => all.some((p) => p.belt === b));
  const cats = CATEGORIES.filter((c) => all.some((p) => p.category === c.label));
  return (
    <main className="max-w-5xl mx-auto px-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION, inLanguage: "ja" },
        { "@context": "https://schema.org", "@type": "Person", name: `${SITE_NAME} 道場主`, url: `${SITE_URL}/about`, knowsAbout: ["フェルミ推定", "ロジックツリー", "仮説思考", "課題設計"] },
      ]) }} />
      <section className="pt-14 pb-12 text-center">
        <span className="stamp text-sm px-3 py-1 mb-6">入門者 随時募集中</span>
        <h1 className="font-display text-5xl md:text-7xl leading-tight mt-4">
          <span className="marker">{SITE_NAME}</span>
        </h1>
        <p className="font-hand font-semibold text-xl md:text-2xl mt-6">{SITE_TAGLINE}</p>
        <p className="text-sm text-sumi-soft mt-4 max-w-xl mx-auto leading-relaxed">
          検索もAIも、答えはくれます。でも、問うのも、選ぶのも、確かめるのも、自分の頭。身近な例題で、考える力を少しずつ鍛える稽古場です。
        </p>
        <ul className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
          {[["/category/taiso", "紙もペンもいらない頭の体操", "通勤中や待ち時間に、1〜3分で。頭の中だけでできます。"], ["/level/white", "紙とペンで考える稽古", "書き出す・分ける・比べる。5分から始められます。"], ["/training", "仕事にも効く考え方", "ざっくり計算、原因のしぼり込みなどを、身近な例題で。"]].map(([h, t, d]) => (
            <li key={h}><Link href={h} className="fuda block p-4 h-full"><span className="font-hand font-semibold text-lg block">{t}</span><span className="text-xs text-sumi-soft leading-relaxed block mt-1">{d}</span></Link></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pb" className="mb-14">
        <h2 id="pb" className="font-display text-2xl mb-2">悩みから探す</h2>
        <p className="text-sm text-sumi-soft mb-5">いま困っていることを選ぶと、一言の答えと解決できるページを案内します。</p>
        <ul className="grid md:grid-cols-2 gap-3 text-sm">
          {PROBLEMS.slice(0, 6).map((p) => (
            <li key={p.q}><Link href="/problems" className="fuda block p-3 leading-relaxed"><span className="font-bold">{p.q}</span><span className="block text-xs text-shu mt-1">{p.a}</span></Link></li>
          ))}
        </ul>
        <p className="mt-4 text-sm"><Link href="/problems" className="underline font-bold">ほかの悩みも見る →</Link></p>
      </section>

      <section aria-labelledby="lv" className="mb-14">
        <h2 id="lv" className="font-display text-2xl mb-2">レベルで選ぶ</h2>
        <p className="text-sm text-sumi-soft mb-5">難易度を帯の色で分けています。いまの自分に合うところから、どうぞ。</p>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {levels.map((b) => (
            <li key={b}>
              <Link href={`/level/${b}`} className="fuda block h-full">
                <span className={`block border-b-2 border-sumi px-3 py-1.5 text-xs font-bold ${BELT_INFO[b].cls}`}>{BELT_INFO[b].label}・{BELT_INFO[b].level}</span>
                <span className="block p-3 text-xs leading-relaxed">{BELT_INFO[b].desc}<span className="block mt-2 font-bold text-shu">{all.filter((p) => p.belt === b).length}本</span></span>
              </Link>
            </li>
          ))}
        </ul>
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
        <h2 id="cat" className="font-display text-2xl mb-6">テーマで選ぶ</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {cats.map((c) => (
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
        <div className="grid md:grid-cols-2 gap-6">
          {latest.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>

      <section className="mt-16 text-center">
        <Link href="/about" className="font-hand font-semibold underline">道場主について</Link>
      </section>
    </main>
  );
}
