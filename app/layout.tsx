import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ZoomProvider } from "@/components/ZoomTransition";
import { PlanProvider } from "@/lib/plan";
import { BG } from "@/lib/theme";

export const metadata: Metadata = {
  title: "さいとうぉっち | 9サイト運営台帳",
  description: "自社サイト群のSearch Console実績・収益化状況・開発ログをまとめた社内向けダッシュボード",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-ui" style={{ background: BG }}>
        <PlanProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <ZoomProvider>{children}</ZoomProvider>
            </div>
          </div>
        </PlanProvider>
      </body>
    </html>
  );
}
