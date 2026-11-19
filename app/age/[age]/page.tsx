import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import AgeChip, { AGE_INFO } from "@/components/AgeChip";
import { AGES, getAllPosts } from "@/lib/posts";
import type { Age } from "@/lib/posts";

const used = () => AGES.filter((a) => getAllPosts().some((p) => !p.noindex && p.age === a));
export function generateStaticParams() { return used().map((age) => ({ age })); }
export function generateMetadata({ params }: { params: { age: string } }) {
  const a = AGE_INFO[params.age as Age];
  return a ? { title: `${a.label}できる稽古`, description: `${a.label}できる、脱デジ道場の稽古の一覧です。${a.desc}。` } : {};
}

export default function AgePage({ params }: { params: { age: string } }) {
  const age = params.age as Age;
  if (!used().includes(age)) notFound();
  const info = AGE_INFO[age];
  const posts = getAllPosts().filter((p) => !p.noindex && p.age === age);
  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <AgeChip age={age} />
      <h1 className="font-display text-4xl mt-3"><span className="marker">{info.label}できる稽古</span></h1>
      <p className="mt-3 mb-8 text-sm text-sumi-soft">{info.desc}。全{posts.length}本。難易度は帯(白帯=入門〜黒帯=実務)で分けています。</p>
      <div className="grid md:grid-cols-2 gap-6">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </main>
  );
}
