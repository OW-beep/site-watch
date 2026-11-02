import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="print:hidden mt-24 border-t-[3px] border-sumi bg-sumi text-paper">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <p className="font-display text-xl">{SITE_NAME}</p>
        <p className="text-sm opacity-80 mt-1">{SITE_TAGLINE}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-6">
          <li><Link href="/about" className="underline">運営者情報</Link></li>
          <li><Link href="/privacy" className="underline">プライバシーポリシー</Link></li>
          <li><Link href="/contact" className="underline">お問い合わせ</Link></li>
          <li><Link href="/editorial-policy" className="underline">編集方針</Link></li>
          <li><Link href="/start" className="underline">はじめての方へ</Link></li>
          <li><Link href="/posts" className="underline">記事一覧</Link></li>
          <li><Link href="/resources" className="underline">シート・ツール</Link></li>
          <li><Link href="/glossary" className="underline">用語集</Link></li>
          <li><Link href="/sitemap" className="underline">サイトマップ</Link></li>
          <li><a href="/feed.xml" className="underline">RSS</a></li>
        </ul>
        <p className="text-xs opacity-60 mt-8">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
