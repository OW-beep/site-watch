import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { BELTS } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => !p.noindex).map((p) => ({
    url: `${SITE_URL}/posts/${p.slug}`, lastModified: new Date(p.updated || p.date),
  }));
  const all = getAllPosts().filter((p) => !p.noindex);
  const cats = CATEGORIES.filter((c) => all.some((p) => p.category === c.label)).map((c) => ({ url: `${SITE_URL}/category/${c.slug}` }));
  const levels = BELTS.filter((b) => all.some((p) => p.belt === b)).map((b) => ({ url: `${SITE_URL}/level/${b}` }));
  const fixed = ["", "/start", "/posts", "/training", "/about", "/editorial-policy", "/contact", "/privacy", "/sitemap"].map((p) => ({ url: `${SITE_URL}${p}` }));
  return [...fixed, ...levels, ...cats, ...posts];
}
