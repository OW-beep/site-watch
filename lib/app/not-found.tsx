import Link from "next/link";
export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-5 py-24 text-center">
      <p className="stamp text-xl px-3 py-1">道に迷いました</p>
      <h1 className="font-display text-3xl mt-6">ページが見つかりません</h1>
      <p className="mt-4 text-sm"><Link href="/" className="underline">道場の入口に戻る</Link></p>
    </main>
  );
}
