"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Gift, Users } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/plan";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function ReferralPage() {
  const { isPro } = usePlan();
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [invited, setInvited] = useState(0);

  useEffect(() => {
    let stored = window.localStorage.getItem("saito-wotchi:referral-code");
    if (!stored) {
      stored = randomCode();
      window.localStorage.setItem("saito-wotchi:referral-code", stored);
    }
    setCode(stored);
    setInvited(Number(window.localStorage.getItem("saito-wotchi:referral-invited") || 0));
  }, []);

  function copy() {
    if (!code) return;
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const rewardPerInvite = isPro ? 2 : 1;
  const freeMonthsEarned = invited * rewardPerInvite;

  return (
    <>
      <Topbar title="紹介プログラム" subtitle="友人・同業者を招待すると、お互いにProが1ヶ月分無料になります" />
      <div className="p-6 space-y-6 max-w-2xl">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: TEXT }}>
              <Gift size={16} color={ACCENT} />
              あなたの紹介リンク
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div
                className="flex-1 font-mono text-sm rounded-lg border px-3.5 py-2.5 truncate"
                style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
              >
                {code ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${code}` : "生成中…"}
              </div>
              <Button onClick={copy} disabled={!code}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "コピーしました" : "コピー"}
              </Button>
            </div>
            <ul className="text-[13px] space-y-1.5" style={{ color: MUTED }}>
              <li>・招待された方が新規登録すると、Proが1ヶ月分無料になります</li>
              <li>・あなたにもProが{rewardPerInvite}ヶ月分無料で付与されます{isPro && "（Pro会員は報酬2倍）"}</li>
              <li>・招待人数に上限はありません</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: ACCENT + "1A" }}
            >
              <Users size={18} color={ACCENT} />
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: TEXT }}>
                {invited}人 招待済み
              </div>
              <div className="text-xs" style={{ color: MUTED }}>
                獲得したPro無料期間：{freeMonthsEarned}ヶ月分
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-[11px]" style={{ color: MUTED }}>
          ※ デモ実装：実際の招待判定・付与処理にはサーバー側での計測が必要です
        </div>
      </div>
    </>
  );
}
