"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, Search, Lock } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/plan";
import { FREE_MONTHLY_LIMIT, getUsage, incrementUsage } from "@/lib/usageLimits";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

const FEATURE_ID = "site-checker";

type CheckState = "ok" | "warn" | "fail";

type CheckResult = {
  label: string;
  state: CheckState;
  detail: string;
};

type ApiResponse = {
  url: string;
  fetchedUrl: string;
  statusCode: number;
  responseTimeMs: number;
  checks: {
    title: { present: boolean; value?: string; length?: number };
    metaDescription: { present: boolean; value?: string; length?: number };
    canonical: { present: boolean; value?: string };
    viewport: { present: boolean; value?: string };
    ogTitle: { present: boolean; value?: string };
    ogDescription: { present: boolean; value?: string };
    ogImage: { present: boolean; value?: string };
    lang: { present: boolean; value?: string };
    h1: { count: number };
    robotsMeta: { present: boolean; value?: string };
    robotsTxt: { present: boolean; statusCode?: number; blocksAll?: boolean; sitemapDeclared?: boolean };
    sitemapXml: { present: boolean; statusCode?: number };
  };
};

function buildChecklist(data: ApiResponse): CheckResult[] {
  const c = data.checks;
  const list: CheckResult[] = [];

  list.push({
    label: "HTTPステータス",
    state: data.statusCode >= 200 && data.statusCode < 400 ? "ok" : "fail",
    detail: `${data.statusCode}（応答時間 約${data.responseTimeMs}ms）`,
  });

  list.push({
    label: "titleタグ",
    state: c.title.present ? (c.title.length && c.title.length > 60 ? "warn" : "ok") : "fail",
    detail: c.title.present
      ? `「${c.title.value}」（${c.title.length}文字）${c.title.length && c.title.length > 60 ? "・やや長め" : ""}`
      : "titleタグが見つかりません",
  });

  list.push({
    label: "meta description",
    state: c.metaDescription.present ? (c.metaDescription.length && c.metaDescription.length > 160 ? "warn" : "ok") : "warn",
    detail: c.metaDescription.present
      ? `「${c.metaDescription.value}」（${c.metaDescription.length}文字）`
      : "meta descriptionが設定されていません",
  });

  list.push({
    label: "canonicalタグ",
    state: c.canonical.present ? "ok" : "warn",
    detail: c.canonical.present ? c.canonical.value! : "canonicalタグが見つかりません",
  });

  list.push({
    label: "viewport設定",
    state: c.viewport.present ? "ok" : "fail",
    detail: c.viewport.present ? c.viewport.value! : "viewportメタタグが見つかりません（モバイル表示に影響する可能性）",
  });

  list.push({
    label: "OGP（og:title / description / image）",
    state: c.ogTitle.present && c.ogDescription.present && c.ogImage.present ? "ok" : c.ogTitle.present || c.ogImage.present ? "warn" : "fail",
    detail: [
      c.ogTitle.present ? "og:title あり" : "og:title なし",
      c.ogDescription.present ? "og:description あり" : "og:description なし",
      c.ogImage.present ? "og:image あり" : "og:image なし",
    ].join(" / "),
  });

  list.push({
    label: "html lang属性",
    state: c.lang.present ? "ok" : "warn",
    detail: c.lang.present ? `lang="${c.lang.value}"` : "lang属性が設定されていません",
  });

  list.push({
    label: "h1タグの数",
    state: c.h1.count === 1 ? "ok" : c.h1.count === 0 ? "fail" : "warn",
    detail: `${c.h1.count}個（推奨は1ページに1つ）`,
  });

  if (c.robotsMeta.present) {
    const blocked = /noindex/i.test(c.robotsMeta.value || "");
    list.push({
      label: "robots meta",
      state: blocked ? "fail" : "ok",
      detail: `content="${c.robotsMeta.value}"${blocked ? "（インデックスがブロックされています）" : ""}`,
    });
  }

  list.push({
    label: "robots.txt",
    state: !c.robotsTxt.present ? "warn" : c.robotsTxt.blocksAll ? "fail" : "ok",
    detail: !c.robotsTxt.present
      ? "robots.txtが見つかりません"
      : c.robotsTxt.blocksAll
      ? "サイト全体をDisallowしている可能性があります"
      : c.robotsTxt.sitemapDeclared
      ? "取得できました（sitemapの記載あり）"
      : "取得できました（sitemapの記載なし）",
  });

  list.push({
    label: "sitemap.xml",
    state: c.sitemapXml.present ? "ok" : "warn",
    detail: c.sitemapXml.present ? `/sitemap.xml にアクセスできました` : "/sitemap.xml が見つかりません（別パスの可能性もあります）",
  });

  return list;
}

const STATE_META: Record<CheckState, { color: string; Icon: typeof CheckCircle2 }> = {
  ok: { color: "#34D399", Icon: CheckCircle2 },
  warn: { color: "#F5A623", Icon: AlertTriangle },
  fail: { color: "#F0576B", Icon: XCircle },
};

export default function SiteChecker() {
  const { isPro, loaded } = usePlan();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    if (loaded) setUsage(getUsage(FEATURE_ID));
  }, [loaded]);

  const limitReached = !isPro && usage >= FREE_MONTHLY_LIMIT;

  async function run() {
    if (!url.trim() || limitReached) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/site-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "診断に失敗しました。");
      } else {
        setData(json);
        if (!isPro) setUsage(incrementUsage(FEATURE_ID));
      }
    } catch {
      setError("診断中にエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  const checklist = data ? buildChecklist(data) : [];
  const okCount = checklist.filter((c) => c.state === "ok").length;

  return (
    <>
      <Topbar title="URLサイト診断" subtitle="URLを入力するだけで、公開情報からSEOの基本項目をチェックします" />
      <DiagnosticShell
        title="URLサイト診断"
        description="Search Console連携がない外部サイトでも、公開されているHTML・robots.txt・sitemap.xmlから簡易チェックができます。競合調査にも使えます。"
      >
        <Card>
          <CardContent className="p-5 space-y-3">
            {!isPro && (
              <div className="text-[11px]" style={{ color: limitReached ? "#F0576B" : MUTED }}>
                無料プランの利用状況：今月 {usage} / {FREE_MONTHLY_LIMIT} 回
              </div>
            )}
            {limitReached ? (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 flex-wrap"
                style={{ borderColor: "#F0576B55", background: "#F0576B14" }}
              >
                <div className="flex items-center gap-2 text-sm" style={{ color: "#F0576B" }}>
                  <Lock size={15} />
                  今月の無料診断回数（{FREE_MONTHLY_LIMIT}回）を使い切りました
                </div>
                <Link
                  href="/pricing"
                  className="text-xs px-3.5 py-1.5 rounded-md font-medium flex-shrink-0"
                  style={{ background: ACCENT, color: "#FFFFFF" }}
                >
                  Proで無制限にする
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run()}
                  placeholder="example.com または https://example.com"
                  className="flex-1 text-sm rounded-lg border px-3.5 py-2.5 outline-none font-mono"
                  style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                />
                <Button onClick={run} disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  診断する
                </Button>
              </div>
            )}
            {error && (
              <div className="text-[13px] rounded-lg px-3.5 py-2.5" style={{ background: "#F0576B14", color: "#F0576B" }}>
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {data && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: TEXT }}>
                    {data.fetchedUrl}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>
                    {okCount} / {checklist.length} 項目が良好です
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => {
                  const meta = STATE_META[item.state];
                  return (
                    <div
                      key={item.label}
                      className="rounded-lg border p-3 flex items-start gap-2.5"
                      style={{ borderColor: BORDER }}
                    >
                      <meta.Icon size={16} color={meta.color} className="flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium" style={{ color: TEXT }}>
                          {item.label}
                        </div>
                        <div className="text-[12px] mt-0.5 leading-relaxed break-words" style={{ color: MUTED }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </DiagnosticShell>
    </>
  );
}
