import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PROBLEMS } from "@/lib/problems";
import BeltChip from "@/components/BeltChip";

export const metadata = {
  title: "悩みから探す",
  description: "考えがまとまらない、決められない、AIに頼りすぎが不安、見積もりが苦手。読者の困りごと別に、解決できる記事・ツール・シートを案内します。",
};

export default function ProblemsPage() {
  const posts = getAllPosts().filter((p) => !p.noindex);
  return (
    <main className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">悩みから探す</span></h1>
      <p className="mt-4 mb-10 text-sm leading-loose">いま困っていることを選んでください。一言の答えと、解決できる記事・ツール・シートを案内します。</p>
      <ul className="space-y-6">
        {PROBLEMS.map((p) => (
          <li key={p.q} className="fuda p-5">
            <h2 className="font-hand font-semibold text-xl leading-snug">{p.q}</h2>
            <p className="mt-2 text-sm font-bold text-shu">{p.a}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {p.links.map((l) => {
                if (typeof l !== "string") return <li key={l.href + l.label}>🔧 <Link href={l.href} className="underline">{l.label}</Link></li>;
                const post = posts.find((x) => x.slug === l);
                return post ? (
                  <li key={l} className="flex items-start gap-2"><span className="shrink-0 mt-0.5"><BeltChip belt={post.belt} /></span>
                    <Link href={`/posts/${l}`} className="underline">{post.title}</Link></li>
                ) : null;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
