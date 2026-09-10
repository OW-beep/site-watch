"use client";

import { useMemo, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

const SUFFIX_PATTERNS = [
  "とは？", "とは", "まとめ", "を解説", "を紹介", "の方法", "のやり方", "の違い",
  "してみた", "5選", "10選", "おすすめ", "比較", "ランキング", "完全ガイド",
];

function extractSuffix(title: string) {
  const found = SUFFIX_PATTERNS.find((p) => title.includes(p));
  return found ?? null;
}

function extractBracket(title: string) {
  const m = title.match(/【[^】]*】/);
  return m ? m[0].replace(/[0-9０-９]+/g, "#") : null;
}

function stdev(nums: number[]) {
  if (nums.length === 0) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
  return Math.sqrt(variance);
}

function analyze(raw: string) {
  const titles = raw
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  if (titles.length < 3) {
    return null;
  }

  const total = titles.length;

  const suffixCounts = new Map<string, number>();
  titles.forEach((t) => {
    const s = extractSuffix(t);
    if (s) suffixCounts.set(s, (suffixCounts.get(s) ?? 0) + 1);
  });
  const topSuffixes = [...suffixCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const suffixRatio = topSuffixes.length ? topSuffixes[0][1] / total : 0;

  const bracketCounts = new Map<string, number>();
  titles.forEach((t) => {
    const b = extractBracket(t);
    if (b) bracketCounts.set(b, (bracketCounts.get(b) ?? 0) + 1);
  });
  const topBrackets = [...bracketCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const bracketRatio = topBrackets.length ? topBrackets.reduce((a, [, c]) => a + c, 0) / total : 0;

  const lengths = titles.map((t) => t.length);
  const avgLen = lengths.reduce((a, b) => a + b, 0) / total;
  const lenStdev = stdev(lengths);
  const lengthUniformity = avgLen > 0 ? 1 - Math.min(lenStdev / avgLen, 1) : 0;

  // duplicate leading n-gram check (first 4 chars)
  const prefixCounts = new Map<string, number>();
  titles.forEach((t) => {
    const p = t.slice(0, 4);
    prefixCounts.set(p, (prefixCounts.get(p) ?? 0) + 1);
  });
  const topPrefix = [...prefixCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const prefixRatio = topPrefix ? topPrefix[1] / total : 0;

  const score = Math.round(
    Math.min(100, suffixRatio * 40 + bracketRatio * 25 + lengthUniformity * 20 + prefixRatio * 15) * 10
  ) / 10;

  return {
    total,
    score,
    suffixRatio,
    topSuffixes,
    bracketRatio,
    topBrackets,
    lengthUniformity,
    avgLen: Math.round(avgLen),
    lenStdev: Math.round(lenStdev * 10) / 10,
    prefixRatio,
    topPrefix,
  };
}

export default function ContentMillChecker() {
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => (submitted ? analyze(raw) : null), [raw, submitted]);

  const level =
    result === null
      ? null
      : result.score >= 55
      ? { label: "量産感が強め", color: "#F0576B" }
      : result.score >= 30
      ? { label: "やや型にはまり気味", color: "#F5A623" }
      : { label: "多様性がありそう", color: "#34D399" };

  return (
    <>
      <Topbar title="量産コンテンツ検知チェッカー" subtitle="タイトルを貼り付けて、型の繰り返し（量産感）を機械的にチェックします" />
      <DiagnosticShell
        title="量産コンテンツ検知チェッカー"
        description="記事タイトルを1行ずつ貼り付けてください（3件以上）。テンプレート化しすぎていないかを簡易チェックします。"
      >
        <Card>
          <CardContent className="p-5 space-y-3">
            <textarea
              value={raw}
              onChange={(e) => {
                setRaw(e.target.value);
                setSubmitted(false);
              }}
              placeholder={"例：\n東京都のゴミ出しルールとは？\n大阪市のゴミ出しルールとは？\n名古屋市のゴミ出しルールとは？"}
              rows={10}
              className="w-full text-sm rounded-lg border p-3 font-mono outline-none"
              style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
            />
            <Button onClick={() => setSubmitted(true)}>チェックする</Button>
          </CardContent>
        </Card>

        {submitted && result === null && (
          <Card>
            <CardContent className="p-5 text-sm" style={{ color: MUTED }}>
              タイトルを3件以上、改行区切りで入力してください。
            </CardContent>
          </Card>
        )}

        {result && level && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-lg font-semibold" style={{ color: TEXT }}>
                  量産感スコア：{result.score} / 100
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: level.color + "22", color: level.color }}
                >
                  {level.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MetricRow
                  label="末尾表現の重複率"
                  value={`${Math.round(result.suffixRatio * 100)}%`}
                  detail={
                    result.topSuffixes.length
                      ? `最多：「${result.topSuffixes[0][0]}」を${result.topSuffixes[0][1]}件で使用`
                      : "目立った重複なし"
                  }
                />
                <MetricRow
                  label="装飾（【】）パターンの重複率"
                  value={`${Math.round(result.bracketRatio * 100)}%`}
                  detail={
                    result.topBrackets.length
                      ? `最多パターン：「${result.topBrackets[0][0]}」を${result.topBrackets[0][1]}件で使用`
                      : "装飾表現は見当たらず"
                  }
                />
                <MetricRow
                  label="タイトル文字数の均一さ"
                  value={`${Math.round(result.lengthUniformity * 100)}%`}
                  detail={`平均${result.avgLen}文字・標準偏差${result.lenStdev}`}
                />
                <MetricRow
                  label="書き出し4文字の重複率"
                  value={`${Math.round(result.prefixRatio * 100)}%`}
                  detail={result.topPrefix ? `最多：「${result.topPrefix[0]}」を${result.topPrefix[1]}件で使用` : "-"}
                />
              </div>

              <div className="rounded-lg border p-4 space-y-1.5" style={{ borderColor: BORDER, background: PANEL2 }}>
                <div className="text-xs font-medium mb-1" style={{ color: TEXT }}>
                  改善のヒント
                </div>
                <ul className="space-y-1.5">
                  {result.suffixRatio >= 0.4 && (
                    <Tip>末尾表現が偏っています。同じ「{result.topSuffixes[0][0]}」ばかりでなく、疑問形・体言止めなど表現を混ぜてみましょう。</Tip>
                  )}
                  {result.bracketRatio >= 0.4 && (
                    <Tip>装飾パターンが偏っています。地域名・カテゴリ名など、内容そのものを見出しに反映すると単調さが和らぎます。</Tip>
                  )}
                  {result.lengthUniformity >= 0.85 && (
                    <Tip>文字数がそろいすぎています。内容に応じて長さに緩急をつけると、テンプレート感が薄れます。</Tip>
                  )}
                  {result.score < 30 && <Tip>特定の型に偏りすぎていません。分析の切り口や表現を記事ごとに変える工夫が効いていそうです。</Tip>}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </DiagnosticShell>
    </>
  );
}

function MetricRow({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: BORDER }}>
      <div className="flex items-baseline justify-between">
        <div className="text-xs" style={{ color: MUTED }}>
          {label}
        </div>
        <div className="font-mono text-sm font-semibold" style={{ color: ACCENT }}>
          {value}
        </div>
      </div>
      <div className="text-[11px] mt-1" style={{ color: MUTED }}>
        {detail}
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[13px] leading-relaxed flex gap-2" style={{ color: MUTED }}>
      <span style={{ color: ACCENT }}>・</span>
      {children}
    </li>
  );
}
