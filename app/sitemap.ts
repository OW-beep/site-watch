import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => !p.noindex).map((p) => ({
    url: `${SITE_URL}/posts/${p.slug}`, lastModified: new Date(p.updated || p.date),
  }));
  const cats = CATEGORIES.map((c) => ({ url: `${SITE_URL}/category/${c.slug}` }));
  const fixed = ["", "/posts", "/training", "/about", "/contact", "/privacy"].map((p) => ({ url: `${SITE_URL}${p}` }));
  return [...fixed, ...cats, ...posts];
}
