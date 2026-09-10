"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const FREE_SITE_LIMIT = 3;

// オーナー（あなた）だけを課金対象から外すためのフラグ。
// Vercelの環境変数で NEXT_PUBLIC_OWNER_FREE_PRO=true を設定した「あなたの」デプロイでのみ
// 常時Pro扱いになります。設定しなければ通常のFree/Proの切り替え（今はデモ実装）のままです。
// ビルド時に埋め込まれる値なので、将来これを本当の多人数向けSaaSにする場合は、
// ここをユーザーごとのサーバー側判定（ログイン＋DB）に置き換える必要があります。
const OWNER_FREE_PRO = process.env.NEXT_PUBLIC_OWNER_FREE_PRO === "true";

type PlanContextValue = {
  isPro: boolean;
  loaded: boolean;
  isOwner: boolean;
  upgrade: () => void;
  downgrade: () => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const STORAGE_KEY = "saito-wotchi:plan";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(OWNER_FREE_PRO);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (OWNER_FREE_PRO) {
      setIsPro(true);
      setLoaded(true);
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setIsPro(stored === "pro");
    } catch {
      // localStorage unavailable — default to free plan
    }
    setLoaded(true);
  }, []);

  function upgrade() {
    if (OWNER_FREE_PRO) return; // 常にPro。決済フローを通す必要はありません
    setIsPro(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "pro");
    } catch {}
  }

  function downgrade() {
    if (OWNER_FREE_PRO) return; // オーナーモードではFreeに戻せません（テスト目的でも）
    setIsPro(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "free");
    } catch {}
  }

  return (
    <PlanContext.Provider value={{ isPro, loaded, isOwner: OWNER_FREE_PRO, upgrade, downgrade }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}

