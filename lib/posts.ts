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
  sources: string[]; fieldNote?: string;
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
    sources: Array.isArray(d.sources) ? d.sources.map(String) : [],
    fieldNote: d.field_note ? String(d.field_note) : undefined,
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
  // 「**」の直後に日本語が続くと太字にならない仕様への対策:先に<strong>へ変換する
  const normalized = content.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  const processed = await remark().use(gfm).use(html, { sanitize: false }).process(normalized);
  const body = String(processed).replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = `s${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const sized = body.replace(/<img src="(\/images\/[^"]+\.svg)" alt="([^"]*)">/g, (m, src: string, alt: string) => {
    try {
      const svg = fs.readFileSync(path.join(process.cwd(), "public", src), "utf8");
      const w = svg.match(/<svg[^>]*\swidth="(\d+)"/)?.[1];
      const h = svg.match(/<svg[^>]*\sheight="(\d+)"/)?.[1];
      return w && h ? `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">` : m;
    } catch { return m; }
  });
  const withFig = sized.replace(/<p>(<img [^>]*alt="([^"]*)"[^>]*>)<\/p>/g, (_m, img: string, alt: string) =>
    `<figure class="fig"><p class="fig-hint">← 図は、横にスクロールできます</p><div class="fig-scroll">${img}</div><figcaption>${alt}</figcaption></figure>`);
  return { meta: meta(slug, data), body: withFig, toc };
}
