import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostFooterNav({ prev, next }: { prev?: PostMeta; next?: PostMeta }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="前後の記事" className="grid sm:grid-cols-2 gap-5 mt-14">
      {prev ? (
        <Link href={`/posts/${prev.slug}`} className="fuda block p-4">
          <span className="text-xs text-shu font-bold">← 前の記事</span>
          <span className="block font-hand font-semibold mt-1 leading-snug">{prev.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={`/posts/${next.slug}`} className="fuda block p-4 sm:text-right">
          <span className="text-xs text-shu font-bold">次の記事 →</span>
          <span className="block font-hand font-semibold mt-1 leading-snug">{next.title}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}
