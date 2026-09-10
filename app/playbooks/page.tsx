"use client";

import { useState } from "react";
import { BookOpen, Check, Loader2, Lock } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

type Playbook = {
  id: string;
  title: string;
  description: string;
  price: string;
  pages: string;
  basedOn: string;
};

const PLAYBOOKS: Playbook[] = [
  {
    id: "adsense-playbook",
    title: "個人サイトAdSense合格プレイブック",
    description: "9サイトの実際の却下・合格パターンを元に、記事数・インデックス状況・トラフィック実績をどう積み上げるかをステップで解説。",
    price: "¥1,480",
    pages: "全24ページ",
    basedOn: "AdSense合格可能性チェッカーのロジックを詳細化した実践編",
  },
  {
    id: "vercel-seo-playbook",
    title: "Vercel/Next.jsサイトSEOトラブル解決集",
    description: "Deployment Protectionによるsitemapブロック、プレースホルダードメインの残留など、実際にハマった罠と解決手順を実例つきで収録。",
    price: "¥980",
    pages: "全16ページ",
    basedOn: "Vercel/Next.js SEOトラブル診断の元ネタとなった実体験集",
  },
  {
    id: "content-mill-playbook",
    title: "量産感を出さない記事構成の作り方",
    description: "分析の切り口を変える、表現のバリエーションを持たせるなど、テンプレート化を避けながら記事を増やすための具体的な工夫集。",
    price: "¥980",
    pages: "全14ページ",
    basedOn: "量産コンテンツ検知チェッカーの判定基準の裏側を解説",
  },
  {
    id: "monetization-playbook",
    title: "複数サイト運営の収益化ロードマップ設計",
    description: "ジャンル・規模・トラフィック傾向ごとに、AdSense／アフィリエイト／有料機能のどれを優先すべきかの判断基準を体系化。",
    price: "¥1,980",
    pages: "全30ページ",
    basedOn: "収益化ロードマップ診断のフルバージョン",
  },
];

export default function PlaybooksPage() {
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function buy(id: string) {
    setLoadingId(id);
    // 実際の実装ではここで Stripe Checkout（買い切り決済）を呼び出します
    await new Promise((r) => setTimeout(r, 800));
    setPurchased((prev) => new Set(prev).add(id));
    setLoadingId(null);
  }

  return (
    <>
      <Topbar title="プレイブック" subtitle="9サイト運営の実体験を、そのままノウハウとして販売" />
      <div className="p-6 space-y-4 max-w-3xl">
        <div className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
          開発ログや診断ツールの裏側にある実体験を、読み物としてまとめました。買い切り型で、購入後は何度でも読み返せます。
        </div>
        <div className="grid grid-cols-1 gap-3">
          {PLAYBOOKS.map((p) => {
            const owned = purchased.has(p.id);
            return (
              <Card key={p.id}>
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: ACCENT + "1A" }}
                  >
                    <BookOpen size={18} color={ACCENT} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="text-sm font-medium" style={{ color: TEXT }}>
                        {p.title}
                      </div>
                      <div className="text-sm font-semibold flex-shrink-0" style={{ color: ACCENT }}>
                        {owned ? "購入済み" : p.price}
                      </div>
                    </div>
                    <div className="text-[12px] mt-1 leading-relaxed" style={{ color: MUTED }}>
                      {p.description}
                    </div>
                    <div className="text-[11px] mt-1.5" style={{ color: MUTED }}>
                      {p.pages}・{p.basedOn}
                    </div>
                    <div className="mt-3">
                      {owned ? (
                        <Button variant="secondary" disabled>
                          <Check size={14} /> ライブラリで読む
                        </Button>
                      ) : (
                        <Button onClick={() => buy(p.id)} disabled={loadingId === p.id}>
                          {loadingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                          {loadingId === p.id ? "処理中…" : "購入する"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-[11px]" style={{ color: MUTED }}>
          ※ デモ実装：実際の決済・コンテンツ配信にはStripeと本文データの連携が必要です
        </div>
      </div>
    </>
  );
}
