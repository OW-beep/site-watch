"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, GitCompareArrows, Plug, Stethoscope, CreditCard, BookOpen, Gift, KeyRound, Heart, Code2 } from "lucide-react";
import { SITES } from "@/data/sites";
import { PANEL, PANEL2, BORDER, TEXT, MUTED, ACCENT } from "@/lib/theme";
import { Separator } from "@/components/ui/separator";
import { Mascot } from "@/components/Mascot";
import { usePlan } from "@/lib/plan";

const NAV = [
  { href: "/", label: "概要", Icon: LayoutGrid },
  { href: "/trends", label: "横断トレンド", Icon: GitCompareArrows },
  { href: "/diagnostics", label: "診断", Icon: Stethoscope },
  { href: "/playbooks", label: "プレイブック", Icon: BookOpen },
  { href: "/connections", label: "API接続", Icon: Plug },
];

const ACCOUNT_NAV = [
  { href: "/pricing", label: "料金プラン", Icon: CreditCard },
  { href: "/account/referral", label: "紹介プログラム", Icon: Gift },
  { href: "/account/api", label: "APIキー", Icon: KeyRound },
  { href: "/account/embed", label: "埋め込みバッジ", Icon: Code2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isPro, isOwner } = usePlan();

  return (
    <div
      className="md:w-64 flex-shrink-0 md:h-screen md:sticky md:top-0 flex flex-col overflow-x-auto md:overflow-visible no-print"
      style={{ background: PANEL, borderRight: `1px solid ${BORDER}` }}
    >
      <div className="p-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold tracking-wide" style={{ color: ACCENT }}>
            さいとうぉっち
          </div>
          {isPro && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: ACCENT, color: "#FFFFFF" }}>
              {isOwner ? "OWNER" : "PRO"}
            </span>
          )}
        </div>
        <div className="text-sm font-medium mt-0.5" style={{ color: TEXT }}>
          9サイト運営台帳
        </div>
      </div>

      <div className="p-2 flex md:flex-col gap-1 flex-shrink-0">
        {NAV.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors"
              style={{ background: active ? ACCENT + "1F" : "transparent", color: active ? ACCENT : MUTED }}
            >
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </div>

      <Separator />

      <div className="p-2 md:flex-1 md:overflow-y-auto">
        <div className="text-[10px] tracking-widest px-3 py-1.5" style={{ color: MUTED }}>
          サイト一覧
        </div>
        <div className="flex md:flex-col gap-1">
          {SITES.map((s) => {
            const active = pathname === `/sites/${s.id}`;
            return (
              <Link
                key={s.id}
                href={`/sites/${s.id}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] whitespace-nowrap"
                style={{ background: active ? PANEL2 : "transparent", color: active ? TEXT : MUTED }}
              >
                <Mascot pos={s.hedgehogPos} size={24} />
                {s.name}
              </Link>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="p-2 flex md:flex-col gap-1 flex-shrink-0">
        <div className="text-[10px] tracking-widest px-3 py-1 hidden md:block" style={{ color: MUTED }}>
          アカウント
        </div>
        {ACCOUNT_NAV.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors"
              style={{ background: active ? ACCENT + "1F" : "transparent", color: active ? ACCENT : MUTED }}
            >
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </div>

      <div className="p-3 mt-auto flex-shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
        <a
          href="#"
          className="flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-md font-medium w-full"
          style={{ background: "#F0576B1A", color: "#F0576B" }}
        >
          <Heart size={13} /> 開発者を応援する
        </a>
      </div>
    </div>
  );
}
