"use client";

import { useEffect, useState } from "react";
import { Copy, Check, KeyRound, RefreshCw } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProGate } from "@/components/monetization/ProGate";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

function generateKey() {
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `sw_live_${rand()}${rand()}`;
}

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("saito-wotchi:api-key");
    if (stored) setApiKey(stored);
  }, []);

  function issue() {
    const key = generateKey();
    window.localStorage.setItem("saito-wotchi:api-key", key);
    setApiKey(key);
  }

  function copy() {
    if (!apiKey) return;
    navigator.clipboard?.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Topbar title="APIキー" subtitle="自作ツールやSlack通知などから、実績データを外部連携できます" />
      <div className="p-6 space-y-6 max-w-2xl">
        <ProGate label="APIキー発行はProで">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: TEXT }}>
                <KeyRound size={16} color={ACCENT} />
                あなたのAPIキー
              </div>
              {apiKey ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div
                    className="flex-1 font-mono text-sm rounded-lg border px-3.5 py-2.5 truncate"
                    style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                  >
                    {apiKey}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={copy}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "コピーしました" : "コピー"}
                    </Button>
                    <Button variant="outline" onClick={issue}>
                      <RefreshCw size={14} /> 再発行
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={issue}>
                  <KeyRound size={14} /> APIキーを発行する
                </Button>
              )}
            </CardContent>
          </Card>
        </ProGate>

        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="text-sm font-medium" style={{ color: TEXT }}>
              利用例
            </div>
            <pre
              className="text-[12px] font-mono rounded-lg border p-3 overflow-x-auto"
              style={{ borderColor: BORDER, background: PANEL2, color: MUTED }}
            >
{`curl https://saito-wotchi.example.com/api/v1/sites \\
  -H "Authorization: Bearer ${apiKey ?? "sw_live_xxxxxxxx"}"`}
            </pre>
            <div className="text-[11px]" style={{ color: MUTED }}>
              ※ デモ実装：実際のAPIエンドポイントとキー検証ミドルウェアは別途実装してください
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
