"use client";

import { useState } from "react";
import { Check, Sparkles, Loader2, Heart, Tag, Infinity as InfinityIcon } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/plan";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER, PANEL } from "@/lib/theme";

const PRO_FEATURES = [
  "サイト表示数の上限なし（無料は3サイトまで）",
  "サイト別PDFレポートの出力",
  "外部連携用APIキーの発行",
  "全診断ツールの結果を無制限に保存・共有",
  "紹介プログラムでの報酬2倍",
  "URLサイト診断が回数無制限（無料は月5回まで）",
  "埋め込みバッジの発行",
];

const PROMO_CODES: Record<string, { percentOff: number; label: string }> = {
  LAUNCH20: { percentOff: 20, label: "ローンチ記念20%オフ" },
  WELCOME10: { percentOff: 10, label: "はじめての方向け10%オフ" },
};

const MONTHLY_BASE = 980;
const YEARLY_BASE = 9800;
const LIFETIME_PRICE = 19800;

export default function PricingPage() {
  const { isPro, isOwner, upgrade, downgrade } = usePlan();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [checkingOut, setCheckingOut] = useState<"sub" | "lifetime" | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percentOff: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  async function handleCheckout(kind: "sub" | "lifetime") {
    setCheckingOut(kind);
    // 実際の実装ではここで Stripe Checkout Session を作成してリダイレクトします
    await new Promise((r) => setTimeout(r, 900));
    upgrade();
    setCheckingOut(null);
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const found = PROMO_CODES[code];
    if (found) {
      setAppliedPromo({ code, ...found });
      setPromoError(null);
    } else {
      setAppliedPromo(null);
      setPromoError("そのプロモコードは見つかりませんでした");
    }
  }

  const discount = appliedPromo ? appliedPromo.percentOff / 100 : 0;
  const monthlyPrice = Math.round(MONTHLY_BASE * (1 - discount));
  const yearlyPrice = Math.round(YEARLY_BASE * (1 - discount));
  const price = billing === "monthly" ? `¥${monthlyPrice.toLocaleString()}` : `¥${yearlyPrice.toLocaleString()}`;
  const priceSub = billing === "monthly" ? "/ 月" : "/ 年（2ヶ月分お得）";

  return (
    <>
      <Topbar title="料金プラン" subtitle="個人開発の複数サイト運営を、もう少し楽に" />
      <div className="p-6 space-y-6 max-w-4xl">
        {isOwner && (
          <div
            className="flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm"
            style={{ borderColor: ACCENT + "55", background: ACCENT + "14", color: ACCENT }}
          >
            <Sparkles size={16} />
            オーナーモードで動作中：あなたは常時Pro扱いです（課金なし・環境変数 NEXT_PUBLIC_OWNER_FREE_PRO で設定）
          </div>
        )}

        <div className="flex justify-center">
          <div className="inline-flex rounded-full border p-1" style={{ borderColor: BORDER, background: PANEL2 }}>
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="text-xs px-4 py-1.5 rounded-full font-medium transition-colors"
                style={{ background: billing === b ? ACCENT : "transparent", color: billing === b ? "#FFFFFF" : MUTED }}
              >
                {b === "monthly" ? "月額" : "年額（お得）"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                placeholder="プロモコードをお持ちの方はこちら"
                className="text-xs rounded-md border px-3 py-1.5 outline-none font-mono w-52"
                style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
              />
              <Button variant="outline" onClick={applyPromo} className="text-xs px-3 py-1.5">
                <Tag size={12} /> 適用
              </Button>
            </div>
            {appliedPromo && (
              <div className="text-[11px]" style={{ color: "#34D399" }}>
                「{appliedPromo.code}」を適用しました（{appliedPromo.label}）
              </div>
            )}
            {promoError && (
              <div className="text-[11px]" style={{ color: "#F0576B" }}>
                {promoError}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-sm font-medium" style={{ color: TEXT }}>
                  Free
                </div>
                <div className="text-3xl font-bold mt-1" style={{ color: TEXT }}>
                  ¥0
                </div>
              </div>
              <ul className="space-y-2 text-[13px]" style={{ color: MUTED }}>
                <li>サイト表示は3サイトまで</li>
                <li>診断ツールはすべて利用可能</li>
                <li>URLサイト診断は月5回まで</li>
                <li>週次レポートは画面表示のみ</li>
              </ul>
              {!isPro ? (
                <div className="text-xs px-3 py-2 rounded-md text-center" style={{ background: PANEL2, color: MUTED }}>
                  現在のプランです
                </div>
              ) : isOwner ? (
                <div className="text-xs px-3 py-2 rounded-md text-center" style={{ background: PANEL2, color: MUTED }}>
                  オーナーはFreeに戻せません
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={downgrade}>
                  Freeに戻す（テスト用）
                </Button>
              )}
            </CardContent>
          </Card>

          <Card style={{ borderColor: ACCENT }}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium" style={{ color: ACCENT }}>
                  Pro
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: ACCENT, color: "#FFFFFF" }}>
                  おすすめ
                </span>
              </div>
              <div>
                <span className="text-3xl font-bold" style={{ color: TEXT }}>
                  {price}
                </span>
                <span className="text-xs ml-1" style={{ color: MUTED }}>
                  {priceSub}
                </span>
                {appliedPromo && (
                  <div className="text-[11px] mt-0.5" style={{ color: "#34D399" }}>
                    {appliedPromo.percentOff}%オフ適用済み
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-[13px]" style={{ color: TEXT }}>
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} color={ACCENT} className="flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {isPro ? (
                <div className="text-xs px-3 py-2 rounded-md text-center font-medium" style={{ background: ACCENT + "1A", color: ACCENT }}>
                  {isOwner ? "オーナーとして常時Pro（課金なし）" : "現在のプランです"}
                </div>
              ) : (
                <Button className="w-full" onClick={() => handleCheckout("sub")} disabled={checkingOut !== null}>
                  {checkingOut === "sub" ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {checkingOut === "sub" ? "処理中…" : "Proにアップグレード"}
                </Button>
              )}
              <div className="text-[11px] text-center" style={{ color: MUTED }}>
                ※ デモ実装：実際の決済にはStripe Checkoutを接続してください
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium" style={{ color: TEXT }}>
                  ライフタイム
                </div>
                <InfinityIcon size={14} color={ACCENT} />
              </div>
              <div>
                <span className="text-3xl font-bold" style={{ color: TEXT }}>
                  ¥{LIFETIME_PRICE.toLocaleString()}
                </span>
                <span className="text-xs ml-1" style={{ color: MUTED }}>
                  買い切り
                </span>
                <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>
                  月額換算だと20ヶ月でPro月額を上回る計算です
                </div>
              </div>
              <ul className="space-y-2 text-[13px]" style={{ color: TEXT }}>
                <li className="flex items-start gap-2">
                  <Check size={14} color={ACCENT} className="flex-shrink-0 mt-0.5" />
                  Proの全機能が一度払いでずっと使えます
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} color={ACCENT} className="flex-shrink-0 mt-0.5" />
                  今後追加される機能もすべて含まれます
                </li>
              </ul>
              {isPro ? (
                <div className="text-xs px-3 py-2 rounded-md text-center font-medium" style={{ background: ACCENT + "1A", color: ACCENT }}>
                  {isOwner ? "オーナーとして常時Pro（課金なし）" : "現在のプランです"}
                </div>
              ) : (
                <Button variant="secondary" className="w-full" onClick={() => handleCheckout("lifetime")} disabled={checkingOut !== null}>
                  {checkingOut === "lifetime" ? <Loader2 size={16} className="animate-spin" /> : <InfinityIcon size={16} />}
                  {checkingOut === "lifetime" ? "処理中…" : "ライフタイムで購入"}
                </Button>
              )}
              <div className="text-[11px] text-center" style={{ color: MUTED }}>
                ※ デモ実装：実際の決済にはStripe Checkoutを接続してください
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-5 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5 text-sm" style={{ color: TEXT }}>
              <Heart size={16} color="#F0576B" />
              プラン契約はまだ考えていないけど、開発を応援したい方はこちら
            </div>
            <a
              href="#"
              className="text-xs px-3.5 py-1.5 rounded-md font-medium"
              style={{ background: "#F0576B", color: "#FFFFFF" }}
            >
              開発者を応援する（投げ銭）
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
