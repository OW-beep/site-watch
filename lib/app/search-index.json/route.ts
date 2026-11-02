import { getAllPosts } from "@/lib/posts";
export const dynamic = "force-static";
export function GET() {
  const items = getAllPosts().filter((p) => !p.noindex).map((p) => ({ s: p.slug, t: p.title, c: p.category, e: p.excerpt.slice(0, 90) }));
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
