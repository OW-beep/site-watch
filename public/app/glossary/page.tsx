import { GLOSSARY } from "@/lib/glossary";

export const metadata = { title: "用語集", description: "脱デジ道場の記事に出てくる、考え方の用語をやさしく説明した用語集です。MECE、フェルミ推定、仮説など。" };

export default function GlossaryPage() {
  const list = [...GLOSSARY];
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">用語集</span></h1>
      <p className="mt-4 mb-8 text-sm leading-loose">記事に出てくる言葉を、むずかしい言い回しを避けて説明しています。記事の「用語メモ」と同じ内容です。</p>
      <dl className="space-y-4">
        {list.map((t) => (
          <div key={t.term} className="fuda p-4">
            <dt className="font-hand font-semibold text-lg text-shu">{t.term}</dt>
            <dd className="text-sm leading-loose mt-1">{t.desc}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
