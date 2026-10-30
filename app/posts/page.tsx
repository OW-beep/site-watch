import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "稽古一覧", description: "脱デジ道場の記事一覧です。" };

export default function PostsPage() {
  const posts = getAllPosts().filter((p) => !p.noindex);
  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl mb-8"><span className="marker">稽古一覧</span></h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
    </main>
  );
}
