import Link from "next/link";
import BeltChip, { BELT_INFO } from "@/components/BeltChip";
import { BELTS, getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

export const metadata = {
  title: "稽古メニュー",
  description: "頭の使い方を鍛える稽古の一覧です。白帯(入門)から黒帯(実務レベル)まで、難易度を帯の色で分けています。",
};

const order = (p: PostMeta) => BELTS.indexOf(p.belt);
const TRACKS = [
  { key: "頭の体操", title: "頭の体操(紙もペンもいらない)", lead: "通勤中や待ち時間に、頭の中だけでできる練習です。1〜3分で試せます。" },
  { key: "基礎", title: "基礎の型", lead: "紙とペンだけでできる、考える習慣の練習です。" },
  { key: "仕事に効く考え方", title: "仕事にも効く考え方", lead: "ざっくり計算、原因のしぼり込み、先に仮の答えを置く方法など、仕事の現場でも使われる考え方を、身近な題材から練習します。" },
  { key: "AI時代の考え方", title: "AI時代の考え方", lead: "AIが難しい依頼に答えるときの「進め方」を、人が使える形に分けて練習します。" },
];

export default function TrainingPage() {
  const items = getAllPosts().filter((p) => p.training && !p.noindex);
  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">稽古メニュー</span></h1>
      <p className="mt-4 text-sm leading-loose max-w-2xl">
        頭の使い方を鍛える稽古の一覧です。難易度を<strong>帯の色</strong>で分けています。迷ったら、白帯から始めてください。
        ここで紹介するのは考え方の練習であり、医療・健康を目的としたものではありません。
      </p>

      <section aria-labelledby="obi" className="fuda mt-8 p-5 bg-paper-kraft">
        <h2 id="obi" className="font-display text-xl mb-4">帯の見方</h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {BELTS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <BeltChip belt={b} />
              <Link href={`/level/${b}`} className="leading-relaxed underline">{BELT_INFO[b].desc}</Link>
            </li>
          ))}
        </ul>
      </section>

      {TRACKS.map((t) => {
        const list = items.filter((p) => (p.track || "基礎") === t.key).sort((a, b) => order(a) - order(b) || (a.date < b.date ? -1 : 1));
        if (list.length === 0) return null;
        return (
          <section key={t.key} className="mt-14" aria-labelledby={`t-${t.key}`}>
            <h2 id={`t-${t.key}`} className="font-display text-2xl">{t.title}</h2>
            <p className="text-sm text-sumi-soft mt-2 mb-6">{t.lead}</p>
            <ul className="space-y-4">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}`} className="fuda flex flex-col sm:flex-row sm:items-center gap-3 p-4">
                    <span className="shrink-0"><BeltChip belt={p.belt} /></span>
                    <span className="flex-1">
                      <span className="block font-hand font-semibold text-lg leading-snug">{p.title}</span>
                      <span className="block text-xs text-sumi-soft mt-1 leading-relaxed">{p.excerpt}</span>
                    </span>
                    {p.minutes && <span className="text-xs font-bold text-shu shrink-0">約{p.minutes}分</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
