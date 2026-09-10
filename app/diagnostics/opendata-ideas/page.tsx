"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Loader2, ExternalLink, Sparkles, Lock } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/plan";
import { FREE_MONTHLY_LIMIT, getUsage, incrementUsage } from "@/lib/usageLimits";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

const FEATURE_ID = "opendata-ideas";

type Dataset = {
  title: string;
  notes: string;
  organization: string;
  formats: string[];
  url: string;
};

type ApiResponse = {
  query: string;
  count: number;
  datasets: Dataset[];
};

const ANGLE_TEMPLATES: ((title: string) => string)[] = [
  (t) => `「${t}」の最新データを、経年変化がひと目でわかるグラフにしてみた`,
  (t) => `「${t}」を都道府県・市区町村で比較してランキング化してみた`,
  (t) => `「${t}」から見つけた、意外と知られていない事実トップ5`,
  (t) => `「${t}」を地図に落とし込んで可視化してみた`,
  (t) => `初心者向け：「${t}」の読み方・使い方ガイド`,
  (t) => `「${t}」は本当に増えている？減っている？データで検証`,
];

function pickTemplates(seed: number, count: number) {
  const indices: number[] = [];
  for (let i = 0; i < count; i++) {
    indices.push((seed + i * 2) % ANGLE_TEMPLATES.length);
  }
  return indices.map((i) => ANGLE_TEMPLATES[i]);
}

export default function OpenDataIdeasPage() {
  const { isPro, loaded } = usePlan();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    if (loaded) setUsage(getUsage(FEATURE_ID));
  }, [loaded]);

  const limitReached = !isPro && usage >= FREE_MONTHLY_LIMIT;

  async function run() {
    if (!query.trim() || limitReached) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/opendata-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "検索に失敗しました。");
      } else {
        setData(json);
        if (!isPro) setUsage(incrementUsage(FEATURE_ID));
      }
    } catch {
      setError("検索中にエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Topbar title="オープンデータねたジェネレーター" subtitle="キーワードから実在するオープンデータを探し、記事の切り口を自動生成します" />
      <DiagnosticShell
        title="オープンデータねたジェネレーター"
        description="「船橋市 ゴミ」「保育園 待機児童」のようなキーワードを入れると、政府データカタログサイト（data.go.jp／e-Govデータポータル）から実在するデータセットを検索し、記事の切り口候補を提案します。"
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
                  今月の無料検索回数（{FREE_MONTHLY_LIMIT}回）を使い切りました
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run()}
                  placeholder="例：船橋市 ゴミ、保育園 待機児童、空き家"
                  className="flex-1 text-sm rounded-lg border px-3.5 py-2.5 outline-none"
                  style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                />
                <Button onClick={run} disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  検索する
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
          <div className="space-y-3">
            <div className="text-xs" style={{ color: MUTED }}>
              「{data.query}」で{data.count}件のデータセットが見つかりました（上位{data.datasets.length}件を表示）
            </div>

            {data.datasets.length === 0 && (
              <Card>
                <CardContent className="p-5 text-sm" style={{ color: MUTED }}>
                  該当するデータセットが見つかりませんでした。キーワードを変えてお試しください（自治体名だけ、テーマだけ、など単語数を減らすと見つかりやすくなります）。
                </CardContent>
              </Card>
            )}

            {data.datasets.map((d, i) => {
              const templates = pickTemplates(i, 2);
              return (
                <Card key={d.url + i}>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium inline-flex items-center gap-1.5 hover:underline"
                        style={{ color: TEXT }}
                      >
                        {d.title}
                        <ExternalLink size={12} color={MUTED} />
                      </a>
                      <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>
                        提供元：{d.organization}
                        {d.formats.length > 0 && `　形式：${d.formats.join(" / ")}`}
                      </div>
                      {d.notes && (
                        <div className="text-[12px] mt-1.5 leading-relaxed" style={{ color: MUTED }}>
                          {d.notes}
                          {d.notes.length >= 160 && "…"}
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg border p-3 space-y-1.5" style={{ borderColor: BORDER, background: PANEL2 }}>
                      <div className="text-[11px] font-medium flex items-center gap-1.5" style={{ color: TEXT }}>
                        <Sparkles size={12} color={ACCENT} />
                        記事の切り口候補
                      </div>
                      <ul className="space-y-1">
                        {templates.map((tpl) => (
                          <li key={tpl(d.title)} className="text-[12px] leading-relaxed flex gap-2" style={{ color: TEXT }}>
                            <span style={{ color: ACCENT }}>・</span>
                            {tpl(d.title)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {data.datasets.length > 0 && (
              <Link
                href="/diagnostics/content-mill-checker"
                className="flex items-center gap-2.5 text-[12px] rounded-lg border px-3.5 py-2.5"
                style={{ borderColor: BORDER, background: PANEL2, color: MUTED }}
              >
                <Sparkles size={13} color={ACCENT} />
                候補が決まったら、量産コンテンツ検知チェッカーでタイトルの被り具合もチェックできます
              </Link>
            )}
          </div>
        )}
      </DiagnosticShell>
    </>
  );
}
