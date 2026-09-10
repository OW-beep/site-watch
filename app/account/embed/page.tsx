"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProGate } from "@/components/monetization/ProGate";
import { SITES } from "@/data/sites";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER, PANEL } from "@/lib/theme";

export default function EmbedBadgePage() {
  const [siteId, setSiteId] = useState(SITES[0].id);
  const [copied, setCopied] = useState(false);

  const site = SITES.find((s) => s.id === siteId)!;
  const snippet = `<a href="https://saito-wotchi.example.com/sites/${site.id}" target="_blank" rel="noopener"
  style="display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;
  border:1px solid #F0DBB8;background:#FFF6E9;color:#332A22;font-size:12px;text-decoration:none;
  font-family:sans-serif;">
  🦔 Search Console実績を公開中 · Powered by さいとうぉっち
</a>`;

  function copy() {
    navigator.clipboard?.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Topbar title="埋め込みバッジ" subtitle="自分のサイトに貼れる実績バッジを発行し、被リンク・相互送客に活用できます" />
      <div className="p-6 space-y-6 max-w-2xl">
        <ProGate label="埋め込みバッジ発行はProで">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
                    対象サイト
                  </div>
                  <select
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                    className="w-full text-sm rounded-lg border px-3 py-2"
                    style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                  >
                    {SITES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
                    プレビュー
                  </div>
                  <div className="rounded-lg border p-4 flex justify-center" style={{ borderColor: BORDER, background: PANEL }}>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs"
                      style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                    >
                      🦔 Search Console実績を公開中 · Powered by さいとうぉっち
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: TEXT }}>
                    <Code2 size={13} /> 埋め込みコード
                  </div>
                  <pre
                    className="text-[11px] font-mono rounded-lg border p-3 overflow-x-auto whitespace-pre-wrap"
                    style={{ borderColor: BORDER, background: PANEL2, color: MUTED }}
                  >
                    {snippet}
                  </pre>
                  <Button variant="secondary" className="mt-2" onClick={copy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "コピーしました" : "コードをコピー"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ProGate>

        <div className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
          自分の運営サイトにこのバッジを貼ると、実績を公開しつつダッシュボードへの被リンクにもなります。
          他の運営者に紹介してもらえれば、紹介プログラム（/account/referral）とあわせて拡散導線になります。
        </div>
      </div>
    </>
  );
}
