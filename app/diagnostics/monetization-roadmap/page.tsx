"use client";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

type Genre = "itblog" | "civic" | "kids" | "game" | "gadget" | "global" | "app";
type Scale = "launch" | "growth" | "mature";
type Trend = "up" | "flat" | "down";

const GENRES: { key: Genre; label: string; example: string }[] = [
  { key: "itblog", label: "ITブログ・専門ブログ", example: "専門性の高い記事を積み上げるタイプのサイト" },
  { key: "civic", label: "行政・公共データ系", example: "公共性が高く、広告表現に配慮が必要なサイト" },
  { key: "kids", label: "子育て・教育系", example: "読者との信頼関係を重視するサイト" },
  { key: "game", label: "ゲーム・エンタメ系", example: "滞在時間やページ回遊が発生しやすいサイト" },
  { key: "gadget", label: "ガジェット・レビュー系", example: "商品紹介との相性が良いサイト" },
  { key: "global", label: "海外・英語圏向け", example: "国内より競合の強い市場で戦うサイト" },
  { key: "app", label: "アプリ・サービス開発系", example: "SEOより先にプロダクト自体の発信が先行するサイト" },
];

const SCALES: { key: Scale; label: string }[] = [
  { key: "launch", label: "立ち上げ期（〜20記事）" },
  { key: "growth", label: "成長期（20〜100記事）" },
  { key: "mature", label: "成熟期（100記事〜）" },
];

const TRENDS: { key: Trend; label: string }[] = [
  { key: "up", label: "アクセスは増加傾向" },
  { key: "flat", label: "アクセスは横ばい" },
  { key: "down", label: "アクセスは伸び悩み・減少傾向" },
];

type Channel = { name: string; reason: string };

function roadmap(genre: Genre, scale: Scale, trend: Trend): Channel[] {
  const channels: Channel[] = [];

  if (scale === "launch") {
    channels.push({
      name: "収益化より先に、露出とインデックスの実績づくり",
      reason: "立ち上げ期はAdSense等の審査基準を満たしにくいことが多く、まず検索結果に表示される実績を積む方が近道です。",
    });
  }

  if (genre === "civic") {
    channels.push({
      name: "AdSense申請の検討",
      reason: "公共性の高いデータ系サイトは信頼性が評価されやすく、パフォーマンスが良いなら申請を先送りする理由は少ないです。",
    });
  }

  if (genre === "kids" && trend !== "up") {
    channels.push({
      name: "SNS・YouTube Shortsなど、SEO以外の集客",
      reason: "子育て・教育系は検索流入だけでなく共感ベースの拡散と相性が良く、集客実績を先に積む戦略が有効です。",
    });
  } else if (genre === "kids") {
    channels.push({
      name: "AdSense申請（トラフィックが伴ってきたタイミングで）",
      reason: "アクセスが増加傾向にあるなら、実績を根拠に申請を検討する段階に入っています。",
    });
  }

  if (genre === "game") {
    channels.push({
      name: "ASPアフィリエイト（現状維持）＋AdSense本命化",
      reason: "ゲーム・エンタメ系はページ回遊が起きやすく、広告面での収益化と相性が良いジャンルです。",
    });
    channels.push({
      name: "Reddit・Show HN等の配信チャネルへの投稿",
      reason: "コンテンツが合格ラインでもトラフィックが不足している場合、配信チャネルへの露出が最短の一手になりやすいです。",
    });
  }

  if (genre === "gadget") {
    channels.push({
      name: "ASPアフィリエイト（既存収益源の維持）",
      reason: "レビュー系は成果報酬型のアフィリエイトと相性が良く、既に案件がある場合は安定運用を優先すべきです。",
    });
    if (scale !== "launch") {
      channels.push({
        name: "有料機能・ツールの検証（無料モデルでまず検証）",
        reason: "新機能はいきなり課金化せず、無料で使える形で反応を見てから収益化判断をするのが手堅い進め方です。",
      });
    }
  }

  if (genre === "global") {
    channels.push({
      name: "被リンク・権威性の獲得施策",
      reason: "競合が強い海外市場では、広告収益化より先に検索エンジンからの信頼（権威性）を積み上げる方が結果につながりやすいです。",
    });
  }

  if (genre === "itblog") {
    if (scale === "mature" && trend !== "down") {
      channels.push({
        name: "AdSense（合格後の収益最適化）＋有料ツール・PDF等の検証",
        reason: "記事の質と量が揃っている段階では、広告に加えて独自の有料機能で収益源を広げる余地があります。",
      });
    } else {
      channels.push({
        name: "AdSense申請に向けた実績づくり",
        reason: "専門ブログは記事の質だけでなく、インデックス状況とトラフィック実績が申請の可否を左右します。",
      });
    }
  }

  if (genre === "app") {
    channels.push({
      name: "note.com・SNS発信、YouTuberタイアップ等の外部露出",
      reason: "アプリ・サービス系はSEOが育つ前に外部露出が先行することが多く、認知獲得を優先する動きは理にかなっています。",
    });
    channels.push({
      name: "アフィリエイト（関連商品）は補助的に",
      reason: "本命はプロダクト自体の利用者獲得のため、広告収益は当面補助的な位置づけで問題ありません。",
    });
  }

  if (trend === "down" && genre !== "kids") {
    channels.push({
      name: "新規収益源の追加より、既存コンテンツのテコ入れ",
      reason: "アクセスが減少傾向にある場合、収益チャネルを増やすより先に既存記事の見直し・統合を優先した方が効果的です。",
    });
  }

  // de-duplicate by name just in case
  const seen = new Set<string>();
  return channels.filter((c) => (seen.has(c.name) ? false : (seen.add(c.name), true)));
}

export default function MonetizationRoadmap() {
  const [genre, setGenre] = useState<Genre>("itblog");
  const [scale, setScale] = useState<Scale>("growth");
  const [trend, setTrend] = useState<Trend>("flat");
  const [submitted, setSubmitted] = useState(false);

  const channels = submitted ? roadmap(genre, scale, trend) : [];

  return (
    <>
      <Topbar title="収益化ロードマップ診断" subtitle="9サイトの実際の戦略の違いをもとに、優先すべき収益化の方向性を提案します" />
      <DiagnosticShell
        title="収益化ロードマップ診断"
        description="ジャンル・規模・トラフィック傾向を選ぶと、優先度の高い収益化の方向性を提案します。"
      >
        <Card>
          <CardContent className="p-5 space-y-5">
            <div>
              <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
                サイトのジャンル
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => {
                      setGenre(g.key);
                      setSubmitted(false);
                    }}
                    className="text-left rounded-lg border px-3.5 py-2.5 transition-colors"
                    style={{
                      borderColor: genre === g.key ? ACCENT : BORDER,
                      background: genre === g.key ? ACCENT + "1A" : PANEL2,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: genre === g.key ? ACCENT : TEXT }}>
                      {g.label}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>
                      {g.example}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
                規模
              </div>
              <div className="flex flex-wrap gap-2">
                {SCALES.map((s) => (
                  <Chip key={s.key} active={scale === s.key} onClick={() => { setScale(s.key); setSubmitted(false); }} label={s.label} />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
                トラフィック傾向
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDS.map((t) => (
                  <Chip key={t.key} active={trend === t.key} onClick={() => { setTrend(t.key); setSubmitted(false); }} label={t.label} />
                ))}
              </div>
            </div>

            <Button onClick={() => setSubmitted(true)}>ロードマップを見る</Button>
          </CardContent>
        </Card>

        {submitted && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="text-sm font-medium" style={{ color: TEXT }}>
                優先度の高い方向性（上から順）
              </div>
              <ol className="space-y-2.5">
                {channels.map((c, i) => (
                  <li key={c.name} className="rounded-lg border p-3.5" style={{ borderColor: BORDER, background: PANEL2 }}>
                    <div className="flex items-start gap-2.5">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ background: ACCENT, color: "#FFFFFF" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-medium" style={{ color: TEXT }}>
                          {c.name}
                        </div>
                        <div className="text-[12px] mt-1 leading-relaxed" style={{ color: MUTED }}>
                          {c.reason}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </DiagnosticShell>
    </>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3.5 py-1.5 rounded-full border font-medium transition-colors"
      style={{
        borderColor: active ? ACCENT : BORDER,
        background: active ? ACCENT + "1F" : "transparent",
        color: active ? ACCENT : MUTED,
      }}
    >
      {label}
    </button>
  );
}
