import Link from "next/link";
import { Sparkles, Gauge, Copy, Wrench, Compass } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TEXT, MUTED, ACCENT, PANEL2 } from "@/lib/theme";

const DIAGNOSTICS = [
  {
    href: "/diagnostics/hedgehog-type",
    Icon: Sparkles,
    title: "何ハリネズミ診断",
    description: "5つの質問に答えると、あなたのサイトの「性格タイプ」をハリネズミで診断します。",
    tag: "気軽に・1分",
  },
  {
    href: "/diagnostics/adsense-checker",
    Icon: Gauge,
    title: "AdSense合格可能性チェッカー",
    description: "記事数・運営期間・インデックス状況などから、審査に進むタイミングの目安を診断します。",
    tag: "9サイトの実例ベース",
  },
  {
    href: "/diagnostics/content-mill-checker",
    Icon: Copy,
    title: "量産コンテンツ検知チェッカー",
    description: "記事タイトルを貼り付けると、パターンの繰り返し（量産感）を機械的にチェックします。",
    tag: "タイトル一覧を貼るだけ",
  },
  {
    href: "/diagnostics/vercel-seo-checklist",
    Icon: Wrench,
    title: "Vercel/Next.js SEOトラブル診断",
    description: "sitemap.xmlが正しく読み込まれない等、実際にハマった罠をチェックリスト形式で診断します。",
    tag: "Yes/Noで進める",
  },
  {
    href: "/diagnostics/monetization-roadmap",
    Icon: Compass,
    title: "収益化ロードマップ診断",
    description: "サイトのジャンルと規模から、AdSense・アフィリエイト等どの方針を優先すべきか提案します。",
    tag: "ジャンル別の実例つき",
  },
];

export default function DiagnosticsHub() {
  return (
    <>
      <Topbar title="診断" subtitle="9サイトの運営で得られた知見をもとにした、誰でも使える診断ツール集" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIAGNOSTICS.map(({ href, Icon, title, description, tag }) => (
            <Link key={href} href={href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="rounded-lg p-2" style={{ background: ACCENT + "1F" }}>
                      <Icon size={18} color={ACCENT} />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: PANEL2, color: MUTED }}>
                      {tag}
                    </span>
                  </div>
                  <CardTitle className="text-base" style={{ color: TEXT }}>
                    {title}
                  </CardTitle>
                  <CardDescription className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
