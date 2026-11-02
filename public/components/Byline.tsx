import Link from "next/link";
export default function Byline({ date, updated }: { date: string; updated?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sumi-soft border-y-2 border-sumi/15 py-3 mb-8">
      <span>執筆:<Link href="/about" className="underline">脱デジ道場 道場主</Link></span>
      <span>公開日:{date}</span>
      {updated && <span>更新日:{updated}</span>}
      <Link href="/editorial-policy" className="underline">編集方針</Link>
    </div>
  );
}
