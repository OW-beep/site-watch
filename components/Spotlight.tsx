"use client";

import { useState, useEffect } from "react";
import { SITES, STATUS, sum } from "@/data/sites";
import { PANEL, BORDER, TEXT, MUTED } from "@/lib/theme";
import { StatusBadge, Sparkline } from "@/components/StatusBits";
import { Mascot } from "@/components/Mascot";
import { useZoomNav } from "@/components/ZoomTransition";

export function Spotlight() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const { openWithZoom } = useZoomNav();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SITES.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const s = SITES[idx];
  const t = STATUS[s.tone];

  return (
    <div
      className="rounded-xl border p-5 relative overflow-hidden"
      style={{ background: PANEL, borderColor: BORDER }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs" style={{ color: MUTED }}>
          注目サイト（自動切り替え）
        </div>
        <div className="flex gap-1">
          {SITES.map((site, i) => (
            <button
              key={site.id}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                background: i === idx ? t.color : BORDER,
              }}
              aria-label={site.name}
            />
          ))}
        </div>
      </div>

      <div
        key={s.id}
        className="cursor-pointer animate-[swFade_460ms_ease]"
        onClick={(e) => openWithZoom(e, `/sites/${s.id}`, s.color)}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Mascot pos={s.hedgehogPos} size={56} />
            <div>
              <div className="text-2xl font-semibold" style={{ color: TEXT }}>
                {s.name}
              </div>
              <div className="font-mono text-xs mt-0.5" style={{ color: MUTED }}>
                {s.url}
              </div>
              <div className="mt-2">
                <StatusBadge tone={s.tone} />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="text-[11px]" style={{ color: MUTED }}>
                直近8週クリック
              </div>
              <div className="font-mono text-xl font-semibold" style={{ color: TEXT }}>
                {sum(s.clicksWeekly)}
              </div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: MUTED }}>
                CTR
              </div>
              <div className="font-mono text-xl font-semibold" style={{ color: TEXT }}>
                {s.ctr}%
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: "#B8BFC9" }}>
          {s.note}
        </p>
        <div className="mt-3">
          <Sparkline data={s.clicksWeekly} color={s.color} />
        </div>
      </div>
    </div>
  );
}
