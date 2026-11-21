"use client";

import type { PostBook } from "@/lib/posts";
import {
  buildRakutenBookLink,
  buildRakutenKoboLink,
  buildAmazonBookLink,
} from "@/lib/affiliate";
import { trackEvent } from "@/lib/analytics";

// 記事ページ末尾（著者紹介の前）に表示する「この記事の本を買える枠」。
// 記事フロントマターの books: に { title, author, isbn, note } を書いた記事だけに表示されます。
// リンクは lib/affiliate.ts のヘルパーで生成し、環境変数にアフィリエイトIDが
// 設定されていれば自動で成果報酬付きリンクになります（未設定時は通常の検索リンク）。
// 姉妹サイト BookHome の ArticleBooks と同じ流儀（PR表記・GA4イベント affiliate_click）。
export default function ArticleBooks({
  books,
  heading,
  slug,
}: {
  books: PostBook[];
  heading?: string;
  slug: string;
}) {
  if (!books || books.length === 0) return null;

  const btn =
    "inline-block text-sm font-bold no-underline px-4 py-2 rounded-full border-2 bg-white leading-tight";

  return (
    <section className="fuda p-5 bg-white mt-12" aria-label="この記事の本を買える場所">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="font-display text-lg">{heading ?? "この記事で紹介した本"}</p>
        <span className="bg-sumi text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PR</span>
      </div>
      <p className="text-xs text-sumi-soft mt-2 leading-relaxed">
        気になった本は、そのまま購入できます（楽天ブックス・Amazon・楽天Koboへのリンクです）。
      </p>
      {books.map((b) => (
        <div
          className="pt-4 mt-4 border-t border-dashed border-sumi/30 first:border-t-0 first:pt-0"
          key={`${b.title}-${b.isbn ?? ""}`}
        >
          <p>
            <span className="font-bold">『{b.title}』</span>
            {b.author && <span className="text-xs text-sumi-soft ml-2">{b.author}</span>}
          </p>
          {b.note && <p className="text-sm text-sumi-soft leading-relaxed mt-1">{b.note}</p>}
          <div className="flex flex-wrap gap-2 mt-3">
            <a
              className={`${btn} text-[#BF0000] border-[#BF0000]`}
              href={buildRakutenBookLink({ isbn: b.isbn, title: b.title })}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() =>
                trackEvent("affiliate_click", {
                  channel: "rakuten_books",
                  placement: "article_books",
                  article: slug,
                  title: b.title,
                })
              }
            >
              楽天ブックスで買う
            </a>
            <a
              className={`${btn} text-[#B96A00] border-[#E47911]`}
              href={buildAmazonBookLink({ isbn: b.isbn, title: b.title })}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() =>
                trackEvent("affiliate_click", {
                  channel: "amazon",
                  placement: "article_books",
                  article: slug,
                  title: b.title,
                })
              }
            >
              Amazonで買う
            </a>
            <a
              className={`${btn} text-[#0F7A8A] border-[#0F7A8A]`}
              href={buildRakutenKoboLink({ title: b.title })}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() =>
                trackEvent("affiliate_click", {
                  channel: "rakuten_kobo",
                  placement: "article_books",
                  article: slug,
                  title: b.title,
                })
              }
            >
              楽天Kobo（電子書籍）
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
