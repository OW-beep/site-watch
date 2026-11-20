import Link from "next/link";
export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-5 py-24 text-center">
      <p className="stamp text-xl px-3 py-1">道に迷いました</p>
      <h1 className="font-display text-3xl mt-6">ページが見つかりません</h1>
      <p className="mt-4 text-sm leading-relaxed">
        お探しのページは、移転したか、削除された可能性があります。
        URLをご確認のうえ、よければ下の入口からどうぞ。
      </p>
      <ul className="mt-8 space-y-3 text-sm font-bold">
        <li><Link href="/" className="fuda inline-block px-5 py-3">道場の入口(トップ)に戻る</Link></li>
        <li><Link href="/posts" className="underline">記事一覧から探す →</Link></li>
        <li><Link href="/start" className="underline">はじめての方へ →</Link></li>
        <li><Link href="/problems" className="underline">悩みから探す →</Link></li>
      </ul>
    </main>
  );
}
