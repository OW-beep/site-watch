import { ReactNode } from "react";

// 依存を増やさないための簡易実装（Radixは使わず、CSSのgroup-hoverで表示するだけ）。

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: ReactNode }) {
  return <div className="group relative inline-block">{children}</div>;
}

export function TooltipTrigger({ children }: { children: ReactNode; asChild?: boolean }) {
  return <>{children}</>;
}

export function TooltipContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100 " +
        (className || "")
      }
      style={{ background: "#1A1E22", border: "1px solid #262B31" }}
    >
      {children}
    </div>
  );
}
