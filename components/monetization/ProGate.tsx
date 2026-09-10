"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { usePlan } from "@/lib/plan";
import { ACCENT, PANEL, BORDER, TEXT, MUTED } from "@/lib/theme";

export function ProGate({
  children,
  label = "この機能はProプラン限定です",
  compact = false,
}: {
  children: React.ReactNode;
  label?: string;
  compact?: boolean;
}) {
  const { isPro, loaded } = usePlan();

  if (!loaded) return null;
  if (isPro) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-[3px] opacity-60">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Link
          href="/pricing"
          className={`inline-flex items-center gap-2 rounded-lg border font-medium transition-transform hover:-translate-y-0.5 ${
            compact ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2.5"
          }`}
          style={{ background: PANEL, borderColor: ACCENT, color: ACCENT, boxShadow: `0 4px 16px ${ACCENT}22` }}
        >
          <Lock size={compact ? 12 : 14} />
          {label}・アップグレード
        </Link>
      </div>
    </div>
  );
}

export function ProBadge() {
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded-full font-bold tracking-wide"
      style={{ background: ACCENT, color: "#FFFFFF" }}
    >
      PRO
    </span>
  );
}
