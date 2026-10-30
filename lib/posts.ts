import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const dir = path.join(process.cwd(), "content/posts");
export const BELTS = ["white", "yellow", "green", "blue", "black"] as const;
export type Belt = (typeof BELTS)[number];
export type PostMeta = {
  slug: string; title: string; category: string; date: string; updated?: string;
  excerpt: string; belt: Belt; noindex: boolean; tldr: string[];
  training: boolean; minutes?: number; track?: string;
};
export type Toc = { id: string; text: string };

function meta(slug: string, d: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(d.title ?? slug),
    category: String(d.category ?? "稽古日誌"),
    date: String(d.date ?? "2026-01-01"),
    updated: d.updated ? String(d.updated) : undefined,
    excerpt: String(d.excerpt ?? ""),
    belt: ((BELTS as readonly string[]).includes(String(d.belt)) ? d.belt : "white") as Belt,
    noindex: Boolean(d.noindex),
    tldr: Array.isArray(d.tldr) ? d.tldr.map(String) : [],
    training: Boolean(d.training),
    minutes: d.minutes ? Number(d.minutes) : undefined,
    track: d.track ? String(d.track) : undefined,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    return meta(f.replace(/\.md$/, ""), data);
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const toc: Toc[] = [];
  const processed = await remark().use(gfm).use(html, { sanitize: false }).process(content);
  const body = String(processed).replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = `s${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { meta: meta(slug, data), body, toc };
}
