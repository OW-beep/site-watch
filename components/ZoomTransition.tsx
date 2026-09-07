"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type ZoomState = {
  color: string;
  rect: { top: number; left: number; width: number; height: number };
  phase: "start" | "expand";
} | null;

const ZoomContext = createContext<{
  zoom: ZoomState;
  openWithZoom: (e: React.MouseEvent<HTMLElement>, href: string, color: string) => void;
} | null>(null);

export function useZoomNav() {
  const ctx = useContext(ZoomContext);
  if (!ctx) throw new Error("useZoomNav must be used within ZoomProvider");
  return ctx;
}

export function ZoomProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [zoom, setZoom] = useState<ZoomState>(null);

  function openWithZoom(e: React.MouseEvent<HTMLElement>, href: string, color: string) {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      color,
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      phase: "start",
    });
    // 二重rAFで初期位置を確実に描画させてからフルスクリーンへ遷移
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setZoom((z) => (z ? { ...z, phase: "expand" } : z));
      });
    });
    setTimeout(() => {
      router.push(href);
      setZoom(null);
    }, 380);
  }

  const expanded = zoom?.phase === "expand";

  return (
    <ZoomContext.Provider value={{ zoom, openWithZoom }}>
      <div style={{ opacity: zoom ? 0.25 : 1, transition: "opacity 280ms ease" }}>{children}</div>

      {zoom && (
        <div
          className="fixed z-50 rounded-xl"
          style={{
            top: expanded ? 0 : zoom.rect.top,
            left: expanded ? 0 : zoom.rect.left,
            width: expanded ? "100vw" : zoom.rect.width,
            height: expanded ? "100vh" : zoom.rect.height,
            background: zoom.color,
            borderRadius: expanded ? 0 : 12,
            transition: "all 360ms cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        />
      )}
    </ZoomContext.Provider>
  );
}
