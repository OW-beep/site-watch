import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 8000;
const USER_AGENT = "SaitoWotchiSiteChecker/1.0 (+diagnostic tool)";

const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^169\.254\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^\[::1\]$/,
];

function isBlockedHost(hostname: string) {
  return BLOCKED_HOST_PATTERNS.some((p) => p.test(hostname));
}

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal, headers: { "User-Agent": USER_AGENT, ...(init.headers || {}) } });
  } finally {
    clearTimeout(timeout);
  }
}

function extractTag(html: string, regex: RegExp): string | null {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMetaContent(html: string, attrPattern: string): string | null {
  const regex = new RegExp(`<meta[^>]+${attrPattern}[^>]+content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attrPattern}`, "i");
  const m = html.match(regex) || html.match(alt);
  return m ? decodeEntities(m[1].trim()) : null;
}

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  const rawUrl = (body.url || "").trim();
  if (!rawUrl) {
    return NextResponse.json({ error: "URLを入力してください。" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl.match(/^https?:\/\//i) ? rawUrl : `https://${rawUrl}`);
  } catch {
    return NextResponse.json({ error: "URLの形式が正しくありません。" }, { status: 400 });
  }

  if (!/^https?:$/.test(target.protocol)) {
    return NextResponse.json({ error: "http または https のURLのみ対応しています。" }, { status: 400 });
  }
  if (isBlockedHost(target.hostname)) {
    return NextResponse.json({ error: "このホストは診断できません。" }, { status: 400 });
  }

  const startedAt = Date.now();
  let res: Response;
  try {
    res = await fetchWithTimeout(target.toString(), { redirect: "follow" });
  } catch (e) {
    return NextResponse.json(
      { error: "サイトへの接続に失敗しました（タイムアウトまたはアクセス不可）。URLを確認してください。" },
      { status: 200 }
    );
  }
  const responseTimeMs = Date.now() - startedAt;

  const html = await res.text().catch(() => "");
  const finalUrl = res.url || target.toString();

  const title = extractTag(html, /<title[^>]*>([^<]*)<\/title>/i);
  const metaDescription = extractMetaContent(html, 'name=["\']description["\']');
  const canonical = extractTag(html, /<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']/i);
  const viewport = extractMetaContent(html, 'name=["\']viewport["\']');
  const ogTitle = extractMetaContent(html, 'property=["\']og:title["\']');
  const ogDescription = extractMetaContent(html, 'property=["\']og:description["\']');
  const ogImage = extractMetaContent(html, 'property=["\']og:image["\']');
  const lang = extractTag(html, /<html[^>]+lang=["\']([^"\']+)["\']/i);
  const h1Matches = html.match(/<h1[^>]*>/gi) || [];
  const robotsMeta = extractMetaContent(html, 'name=["\']robots["\']');

  const origin = `${target.protocol}//${target.host}`;

  let robotsTxt: { present: boolean; statusCode?: number; blocksAll?: boolean; sitemapDeclared?: boolean } = {
    present: false,
  };
  try {
    const r = await fetchWithTimeout(`${origin}/robots.txt`);
    const text = r.ok ? await r.text().catch(() => "") : "";
    robotsTxt = {
      present: r.ok,
      statusCode: r.status,
      blocksAll: /Disallow:\s*\/\s*$/im.test(text) && !/Allow:/i.test(text),
      sitemapDeclared: /Sitemap:/i.test(text),
    };
  } catch {
    robotsTxt = { present: false };
  }

  let sitemapXml: { present: boolean; statusCode?: number } = { present: false };
  try {
    const r = await fetchWithTimeout(`${origin}/sitemap.xml`);
    sitemapXml = { present: r.ok, statusCode: r.status };
  } catch {
    sitemapXml = { present: false };
  }

  return NextResponse.json({
    url: rawUrl,
    fetchedUrl: finalUrl,
    statusCode: res.status,
    responseTimeMs,
    checks: {
      title: { present: !!title, value: title || undefined, length: title?.length },
      metaDescription: { present: !!metaDescription, value: metaDescription || undefined, length: metaDescription?.length },
      canonical: { present: !!canonical, value: canonical || undefined },
      viewport: { present: !!viewport, value: viewport || undefined },
      ogTitle: { present: !!ogTitle, value: ogTitle || undefined },
      ogDescription: { present: !!ogDescription, value: ogDescription || undefined },
      ogImage: { present: !!ogImage, value: ogImage || undefined },
      lang: { present: !!lang, value: lang || undefined },
      h1: { count: h1Matches.length },
      robotsMeta: { present: !!robotsMeta, value: robotsMeta || undefined },
      robotsTxt,
      sitemapXml,
    },
  });
}
