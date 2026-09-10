"use client";

import { useState } from "react";
import Link from "next/link";
import { Target } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { KPI } from "@/components/StatusBits";
import { Spotlight } from "@/components/Spotlight";
import { SiteCard } from "@/components/SiteCard";
import { SITES, STATUS, sum, Tone } from "@/data/sites";
import { TEXT, MUTED, BORDER, ACCENT, PANEL2 } from "@/lib/theme";
import { buildMonetizationPlan } from "@/lib/monetizationPlan";
import { usePlan, FREE_SITE_LIMIT } from "@/lib/plan";
import { UpgradeBanner } from "@/components/monetization/UpgradeBanner";
import { ProGate } from "@/components/monetization/ProGate";

export default function OverviewPage() {
  const [toneFilter, setToneFilter] = useState<Set<Tone>>(() => new Set(Object.keys(STATUS) as Tone[]));
  const { isPro } = usePlan();

  const totalClicks = SITES.reduce((a, s) => a + sum(s.clicksWeekly), 0);
  const totalImpr = SITES.reduce((a, s) => a + sum(s.impressionsWeekly), 0);
  const avgCtr = (SITES.reduce((a, s) => a + s.ctr, 0) / SITES.length).toFixed(2);
  const plans = SITES.map((s) => ({ site: s, plan: buildMonetizationPlan(s) }));
  const adsenseApprovedCount = 0; // 2026-09-10時点：AdSense合格サイトはまだ0件
  const topCandidate = [...plans]
    .filter((p) => p.plan.readiness === "ready")
    .sort((a, b) => b.plan.clicks - a.plan.clicks)[0];

  function toggleTone(tone: Tone) {
    setToneFilter((prev) => {
      const next = new Set(prev);
      next.has(tone) ? next.delete(tone) : next.add(tone);
      return next.size ? next : prev;
    });
  }

  const filtered = SITES.filter((s) => toneFilter.has(s.tone));

  return (
    <>
      <Topbar title="概要" subtitle="9サイトのSearch Console実績・収益化状況を一望" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPI label="直近8週クリック合計" value={totalClicks} />
          <KPI label="直近8週表示回数合計" value={totalImpr.toLocaleString()} />
          <KPI label="平均CTR（単純平均）" value={`${avgCtr}%`} />
          <KPI label="AdSense合格サイト数" value={`${adsenseApprovedCount} / ${SITES.length}`} sub="2026-09-10時点・まだ合格実績なし" />
        </div>

        <UpgradeBanner />

        {topCandidate && (
          <Link
            href={`/sites/${topCandidate.site.id}`}
            className="flex items-start gap-3 rounded-lg border px-4 py-3 transition-transform hover:-translate-y-0.5"
            style={{ borderColor: ACCENT + "55", background: ACCENT + "0F" }}
          >
            <Target size={16} color={ACCENT} className="flex-shrink-0 mt-0.5" />
            <div className="text-sm" style={{ color: TEXT }}>
              <span className="font-medium" style={{ color: ACCENT }}>
                収益化の最有力候補：{topCandidate.site.name}
              </span>
              　直近8週クリック{topCandidate.plan.clicks}件で最も実績がある未申請サイトです。まずはここから審査申請を検討してみましょう。
            </div>
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          <Link
            href="/diagnostics/adsense-checker"
            className="text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: BORDER, background: PANEL2, color: MUTED }}
          >
            AdSense合格可能性チェッカーを開く
          </Link>
          <Link
            href="/diagnostics/monetization-roadmap"
            className="text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: BORDER, background: PANEL2, color: MUTED }}
          >
            収益化ロードマップ診断を開く
          </Link>
        </div>

        <Spotlight />

        <div>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="text-sm font-medium" style={{ color: TEXT }}>
              サイト一覧
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(Object.entries(STATUS) as [Tone, { color: string; label: string }][]).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => toggleTone(k)}
                  className="text-[11px] px-2.5 py-1 rounded-full border"
                  style={{
                    color: toneFilter.has(k) ? v.color : MUTED,
                    borderColor: toneFilter.has(k) ? v.color + "55" : BORDER,
                    background: toneFilter.has(k) ? v.color + "14" : "transparent",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((s, i) =>
              !isPro && i >= FREE_SITE_LIMIT ? (
                <ProGate key={s.id} label="全サイト表示はProで">
                  <SiteCard site={s} />
                </ProGate>
              ) : (
                <SiteCard key={s.id} site={s} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
