import Link from "next/link";
import BeltChip, { BELT_INFO } from "@/components/BeltChip";
import { BELTS, getAllPosts } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

export const metadata = { title: "はじめての方へ", description: `${SITE_NAME}の使い方と、最初に読むのにおすすめの記事を紹介します。` };
const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function StartPage() {
  const all = getAllPosts().filter((p) => !p.noindex);
  const first = ["sakini-yoso-1pun", "mittsu-no-toi", "kakidashi-memo-a4"].map((s) => all.find((p) => p.slug === s)).filter(Boolean);
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-10">
      <h1 className="font-display text-4xl"><span className="marker">はじめての方へ</span></h1>
      <section>
        <h2 className={h2}>このサイトでできること</h2>
        <p>{SITE_NAME}は、スマホやAIが当たり前の時代に、紙とペンで「自分の頭を使う」習慣を取り戻すための稽古場です。身近な例題を使って、考え方の型を1つずつ練習できます。</p>
      </section>
      <section>
        <h2 className={h2}>1. レベルを選ぶ</h2>
        <p className="mb-4">難易度は、柔道の帯のように色で分けています。迷ったら白帯からどうぞ。</p>
        <ul className="space-y-3">
          {BELTS.map((b) => {
            const n = all.filter((p) => p.belt === b).length;
            return n === 0 ? null : (
              <li key={b} className="flex items-start gap-3">
                <BeltChip belt={b} />
                <span><Link href={`/level/${b}`} className="underline font-bold">{BELT_INFO[b].desc}</Link>({n}本)</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2 className={h2}>2. 最初の3本</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          {first.map((p) => p && <li key={p.slug}><Link href={`/posts/${p.slug}`} className="underline font-bold">{p.title}</Link>(約{p.minutes ?? 5}分)</li>)}
        </ul>
      </section>
      <section>
        <h2 className={h2}>3. 稽古の進め方</h2>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>記事を読み、図解で全体をつかむ</li>
          <li>練習問題は、<strong>先に自分の答えを紙に書く</strong></li>
          <li>「回答例と考え方を見る」を開いて、筋道を比べる</li>
          <li>続かない日があっても、また今日から戻ればよい</li>
        </ol>
      </section>
      <section>
        <h2 className={h2}>ご注意</h2>
        <p>ここで紹介するのは考え方の練習であり、医療・健康を目的としたものではありません。例題の数字は、練習用の仮のものです。くわしくは<Link href="/editorial-policy" className="underline">編集方針</Link>をご覧ください。</p>
      </section>
    </main>
  );
}
