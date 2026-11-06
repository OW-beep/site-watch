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
        <p>{SITE_NAME}は、検索やAIが身近になった今こそ、自分の頭で考える力を保つための稽古場です。紙もペンもいらない頭の体操から、仕事にも効く考え方まで、身近な例題で1つずつ練習できます。</p>
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
        <h2 className={h2}>おすすめの順番(ロードマップ)</h2>
        <p className="mb-3">毎日5分で続けたい方は、<Link href="/posts/4shukan-plan" className="underline font-bold">4週間プラン</Link>が便利です。</p>
        <ol className="list-decimal pl-5 space-y-1.5">
          {[["sakini-yoso-1pun", "白帯"], ["mittsu-no-toi", "白帯"], ["kakidashi-memo-a4", "白帯"], ["kozoka-wakeru-nyumon", "黄帯"], ["fermi-nyumon-gohan", "黄帯"], ["logic-tree-uriage", "緑帯"], ["kasetsu-shiko-pyramid", "青帯"], ["ai-shiki-7step", "青帯"], ["kadai-sekkei-helpdesk", "黒帯"]].map(([slug, b]) => {
            const p = all.find((x) => x.slug === slug);
            return p ? <li key={slug}><span className="text-xs font-bold text-shu mr-2">{b}</span><Link href={`/posts/${slug}`} className="underline">{p.title}</Link></li> : null;
          })}
        </ol>
      </section>
      <section>
        <h2 className={h2}>よくある質問</h2>
        <dl className="space-y-4">
          {[
            ["紙とペンがないとできませんか?", "基本は紙とペンですが、メモ用紙の裏でも構いません。印刷して使える稽古シートも用意しています。"],
            ["毎日やる必要がありますか?", "ありません。1日1回、5分でも十分です。続かない日があっても、また戻れば大丈夫です。"],
            ["AIを使ってはいけないのですか?", "いいえ。AIは便利な道具です。このサイトは、考える部分を自分の手に残す使い分けを練習する場です。"],
            ["仕事で使えますか?", "使えます。黄帯以降は、仕事の現場で使う考え方(構造化、フェルミ推定、仮説思考)を、身近な例題で練習します。"],
          ].map(([q, a]) => <div key={q}><dt className="font-bold">Q. {q}</dt><dd>A. {a}</dd></div>)}
        </dl>
      </section>
      <section>
        <h2 className={h2}>ご注意</h2>
        <p>ここで紹介するのは考え方の練習であり、医療・健康を目的としたものではありません。例題の数字は、練習用の仮のものです。くわしくは<Link href="/editorial-policy" className="underline">編集方針</Link>をご覧ください。</p>
      </section>
    </main>
  );
}
