"use client";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { KPI } from "@/components/StatusBits";
import { Spotlight } from "@/components/Spotlight";
import { SiteCard } from "@/components/SiteCard";
import { SITES, STATUS, sum, Tone } from "@/data/sites";
import { TEXT, MUTED, BORDER } from "@/lib/theme";

export default function OverviewPage() {
  const [toneFilter, setToneFilter] = useState<Set<Tone>>(() => new Set(Object.keys(STATUS) as Tone[]));

  const totalClicks = SITES.reduce((a, s) => a + sum(s.clicksWeekly), 0);
  const totalImpr = SITES.reduce((a, s) => a + sum(s.impressionsWeekly), 0);
  const avgCtr = (SITES.reduce((a, s) => a + s.ctr, 0) / SITES.length).toFixed(2);
  const counts = SITES.reduce((acc: Record<string, number>, s) => {
    acc[s.tone] = (acc[s.tone] || 0) + 1;
    return acc;
  }, {});

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
          <KPI
            label="ステータス内訳"
            value={
              <span className="text-sm font-normal flex flex-wrap gap-x-2 gap-y-0.5" style={{ color: TEXT }}>
                {(Object.entries(STATUS) as [Tone, { color: string; label: string }][]).map(([k, v]) => (
                  <span key={k} style={{ color: v.color }}>
                    {v.label} {counts[k] || 0}
                  </span>
                ))}
              </span>
            }
          />
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
            {filtered.map((s) => (
              <SiteCard key={s.id} site={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
