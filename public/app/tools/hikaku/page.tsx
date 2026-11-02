import Link from "next/link";
import CompareTool from "@/components/CompareTool";

export const metadata = {
  title: "判断軸×重みの比較ツール",
  description: "候補を、判断軸と重みで点数にして比べる無料ツールです。引っ越し先、ノート、家電など、迷う選択に使えます。入力した内容は保存されません。",
};

export default function HikakuPage() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">判断軸×重みの比較ツール</span></h1>
      <p className="mt-4 mb-8 text-sm leading-loose">
        候補ごとに点数(0〜5点)をつけ、大事な軸ほど大きい重みをかけて合計します。使い方と考え方は、
        <Link href="/posts/hikkoshi-hanteijiku" className="underline">引っ越し先をどう決める?</Link>で解説しています。
        入力した内容は、この画面の中だけで計算され、保存・送信されません。
      </p>
      <CompareTool />
      <section className="mt-12 text-sm leading-loose">
        <h2 className="font-display text-xl mb-3 border-l-8 border-shu pl-3">使うときのコツ</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>軸は4〜5個にしぼる。最重要の軸は、重みを5にする</li>
          <li>点数は絶対評価でなく、候補同士を比べて「一番・真ん中・一番下」でつける</li>
          <li>差が小さいときは、重みを変えて、順位が入れ替わるかを見る。入れ替わるなら、決め手は「何を大事にするか」</li>
        </ul>
      </section>
    </main>
  );
}
