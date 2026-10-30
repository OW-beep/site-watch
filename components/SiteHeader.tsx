import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="border-b-[3px] border-sumi bg-paper">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center gap-4 flex-wrap">
        <Link href="/" className="flex items-center gap-3">
          <span className="stamp text-2xl px-2 py-0.5 leading-none">脱</span>
          <span className="font-display text-2xl tracking-wide">{SITE_NAME}</span>
        </Link>
        <nav aria-label="メイン" className="ml-auto flex gap-5 text-sm font-bold">
          <Link href="/training" className="hover:text-shu">稽古メニュー</Link>
          <Link href="/posts" className="hover:text-shu">記事一覧</Link>
          <Link href="/about" className="hover:text-shu">道場主</Link>
          <Link href="/contact" className="hover:text-shu">問い合わせ</Link>
        </nav>
      </div>
      <nav aria-label="カテゴリ" className="border-t-2 border-sumi bg-paper-kraft">
        <ul className="max-w-5xl mx-auto px-5 flex gap-1 overflow-x-auto text-sm">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} className="block px-3 py-2 font-hand font-semibold whitespace-nowrap hover:bg-marker">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
