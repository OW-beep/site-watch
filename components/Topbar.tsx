import { RefreshCw } from "lucide-react";
import { BORDER, TEXT, MUTED, PANEL2 } from "@/lib/theme";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 flex-wrap gap-3"
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      <div>
        <div className="text-lg font-semibold" style={{ color: TEXT }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-xs mt-0.5" style={{ color: MUTED }}>
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs px-2.5 py-1 rounded-full" style={{ background: PANEL2, color: MUTED }}>
          期間: 直近8週
        </div>
        <div className="text-xs flex items-center gap-1.5" style={{ color: "#34D399" }}>
          <RefreshCw size={12} /> 手動更新モード
        </div>
      </div>
    </div>
  );
}
