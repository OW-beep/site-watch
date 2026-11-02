import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategoryByLabel } from "@/lib/categories";
import BeltChip from "./BeltChip";

export default function PostCard({ post }: { post: PostMeta }) {
  const cat = getCategoryByLabel(post.category);
  return (
    <Link href={`/posts/${post.slug}`} className="fuda block p-5 h-full">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <BeltChip belt={post.belt} />
        <span className="text-xs font-bold text-shu">{cat ? cat.label : post.category}</span>
        {post.training && post.minutes ? <span className="text-xs text-sumi-soft ml-auto">約{post.minutes}分</span> : <time className="text-xs text-sumi-soft ml-auto">{post.date}</time>}
      </div>
      <h3 className="font-hand font-semibold text-lg leading-snug mb-2">{post.title}</h3>
      <p className="text-sm text-sumi-soft leading-relaxed line-clamp-3">{post.excerpt}</p>
    </Link>
  );
}
