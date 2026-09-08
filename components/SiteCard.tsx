"use client";

import { Site, sum } from "@/data/sites";
import { PANEL, PANEL2, BORDER, TEXT, MUTED } from "@/lib/theme";
import { StatusBadge, Sparkline } from "@/components/StatusBits";
import { Mascot } from "@/components/Mascot";
import { useZoomNav } from "@/components/ZoomTransition";

export function SiteCard({ site }: { site: Site }) {
  const { openWithZoom } = useZoomNav();

  return (
    <div
      onClick={(e) => openWithZoom(e, `/sites/${site.id}`, site.color)}
      className="cursor-pointer rounded-xl border p-4 transition-transform hover:-translate-y-0.5"
      style={{ background: PANEL, borderColor: BORDER }}
    >
      <div className="flex items-start gap-2.5">
        <Mascot pos={site.hedgehogPos} size={42} />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate" style={{ color: TEXT }}>
            {site.name}
          </div>
          <div className="font-mono text-[11px] truncate" style={{ color: MUTED }}>
            {site.url}
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <StatusBadge tone={site.tone} />
      </div>

      <div className="mt-2.5">
        <Sparkline data={site.clicksWeekly} color={site.color} />
      </div>

      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {[
          ["CTR", `${site.ctr}%`],
          ["順位", site.avgPos],
          ["規模", site.scale],
        ].map(([label, value]) => (
          <div key={label} className="rounded px-1.5 py-1 text-center" style={{ background: PANEL2 }}>
            <div className="text-[9px]" style={{ color: MUTED }}>
              {label}
            </div>
            <div className="font-mono text-[11px] font-medium" style={{ color: TEXT }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[12px] mt-2.5 leading-relaxed line-clamp-2" style={{ color: MUTED }}>
        {site.note}
      </p>
    </div>
  );
}
