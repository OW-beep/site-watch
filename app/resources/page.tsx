import Link from "next/link";

export const metadata = { title: "シート・ツール", description: "印刷して使える稽古シートと、判断軸×重みの比較ツール、用語集をまとめたページです。" };

const ITEMS = [
  { href: "/sheets", title: "印刷して使う稽古シート", desc: "書き出しメモ、7ステップ、判断軸×重み表、読書ノート、30日日記チェック表。A4で印刷できます。" },
  { href: "/tools/hikaku", title: "判断軸×重みの比較ツール", desc: "候補を点数にして比べます。引っ越し先、ノート、家電選びに。入力内容は保存されません。" },
  { href: "/glossary", title: "用語集", desc: "MECE、フェルミ推定、仮説など、記事に出てくる言葉をやさしく説明します。" },
];

export default function ResourcesPage() {
  return (
    <main className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">シート・ツール</span></h1>
      <p className="mt-4 mb-8 text-sm leading-loose">紙とペンで稽古するための道具を、無料で用意しています。</p>
      <ul className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="fuda block p-5 h-full">
              <span className="font-hand font-semibold text-lg block mb-2">{i.title}</span>
              <span className="text-sm leading-relaxed text-sumi-soft">{i.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
