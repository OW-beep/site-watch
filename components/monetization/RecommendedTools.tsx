import { ExternalLink } from "lucide-react";
import { TEXT, MUTED, PANEL2, BORDER, ACCENT } from "@/lib/theme";

type Tool = { name: string; description: string; href: string };

const TOOLS: Tool[] = [
  { name: "ホスティング（Vercel Hobby）", description: "個人利用なら無料枠のみで十分。独自ドメインも無料で接続可能", href: "#" },
  { name: "決済導入（Stripe）", description: "口座開設・月額費用は無料。売上が発生した時だけ手数料がかかる従量課金", href: "#" },
  { name: "投げ銭受付（Buy Me a Coffee / Ko-fi）", description: "無料で開設でき、サーバーやDBを自前で持たずに投げ銭を受け付けられる", href: "#" },
];

export function RecommendedTools() {
  return (
    <div className="rounded-lg border p-4 space-y-2.5" style={{ borderColor: BORDER, background: PANEL2 }}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium" style={{ color: TEXT }}>
          おすすめツール
        </div>
        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: BORDER, color: MUTED }}>
          PR
        </span>
      </div>
      <div className="space-y-2">
        {TOOLS.map((t) => (
          <a
            key={t.name}
            href={t.href}
            className="flex items-center justify-between gap-2 text-[12px] rounded-md px-2.5 py-2 transition-colors hover:opacity-80"
            style={{ background: "transparent", color: TEXT }}
          >
            <div>
              <div className="font-medium">{t.name}</div>
              <div style={{ color: MUTED }}>{t.description}</div>
            </div>
            <ExternalLink size={12} color={ACCENT} className="flex-shrink-0" />
          </a>
        ))}
      </div>
      <div className="text-[10px]" style={{ color: MUTED }}>
        ※ アフィリエイトリンクを含みます（プレースホルダー。実運用時は実際の紹介リンクに差し替えてください）
      </div>
    </div>
  );
}
