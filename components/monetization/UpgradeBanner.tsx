"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { usePlan } from "@/lib/plan";
import { ACCENT, TEXT } from "@/lib/theme";

export function UpgradeBanner() {
  const { isPro, loaded } = usePlan();
  const [dismissed, setDismissed] = useState(false);

  if (!loaded || isPro || dismissed) return null;

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-lg px-4 py-3 flex-wrap"
      style={{ background: `linear-gradient(90deg, ${ACCENT}1A, ${ACCENT}0A)`, border: `1px solid ${ACCENT}33` }}
    >
      <div className="flex items-center gap-2.5 text-sm" style={{ color: TEXT }}>
        <Sparkles size={16} color={ACCENT} />
        <span>
          無料プランは<strong>{"3サイトまで"}</strong>表示中。Proにすると全サイト表示・PDFレポート・API連携が使えます。
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/pricing"
          className="text-xs px-3.5 py-1.5 rounded-md font-medium"
          style={{ background: ACCENT, color: "#FFFFFF" }}
        >
          Proを見る
        </Link>
        <button onClick={() => setDismissed(true)} aria-label="閉じる" style={{ color: ACCENT }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
