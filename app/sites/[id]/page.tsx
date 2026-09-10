"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { ArrowLeft, CheckCircle2, AlertTriangle, Circle, Target, FileDown } from "lucide-react";
import { KPI, StatusBadge } from "@/components/StatusBits";
import { Mascot } from "@/components/Mascot";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITES, STATUS, CONN_STATE, MONEY_STATE, WEEKS, sum, Connection } from "@/data/sites";
import { PANEL2, BORDER, TEXT, MUTED, TEXT_SOFT, ACCENT } from "@/lib/theme";
import { buildMonetizationPlan } from "@/lib/monetizationPlan";
import { ProGate } from "@/components/monetization/ProGate";

const CONN_ICON: Record<Connection, any> = {
  connected: CheckCircle2,
  expired: AlertTriangle,
  disconnected: Circle,
};

export default function SiteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const site = SITES.find((s) => s.id === params.id);
  const [metric] = useState<"clicks" | "impressions">("clicks");

  if (!site) {
    return (
      <div className="p-6" style={{ color: TEXT }}>
        サイトが見つかりません。
      </div>
    );
  }

  const st = STATUS[site.tone];
  const conn = CONN_STATE[site.connection];
  const ConnIcon = CONN_ICON[site.connection];
  const chartData = WEEKS.map((w, i) => ({ week: w, clicks: site.clicksWeekly[i], impressions: site.impressionsWeekly[i] }));
  const plan = buildMonetizationPlan(site);

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => router.push("/")} className="text-xs inline-flex items-center gap-1.5 no-print" style={{ color: MUTED }}>
        <ArrowLeft size={13} /> 一覧に戻る
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Mascot pos={site.hedgehogPos} size={64} />
          <div>
            <div className="text-xs" style={{ color: MUTED }}>
              {site.kind}
            </div>
            <div className="text-2xl font-semibold mt-0.5" style={{ color: TEXT }}>
              {site.name}
            </div>
            <div className="font-mono text-xs mt-0.5" style={{ color: MUTED }}>
              {site.url}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 no-print">
          <StatusBadge tone={site.tone} />
          <Badge className="gap-1 border-0" style={{ background: conn.color + "22", color: conn.color }}>
            <ConnIcon size={12} /> {conn.label}
          </Badge>
          <ProGate label="PDFレポート出力はProで" compact>
            <Button variant="secondary" onClick={() => window.print()}>
              <FileDown size={14} /> PDFレポート出力
            </Button>
          </ProGate>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI label="直近8週クリック" value={sum(site.clicksWeekly)} />
        <KPI label="直近8週表示回数" value={sum(site.impressionsWeekly).toLocaleString()} />
        <KPI label="CTR" value={`${site.ctr}%`} />
        <KPI label="平均掲載順位" value={site.avgPos} />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm" style={{ color: TEXT }}>
            週次推移（クリック・表示回数）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 4, right: 12, bottom: 0, left: -10 }}>
                <CartesianGrid stroke={BORDER} vertical={false} />
                <XAxis dataKey="week" stroke={MUTED} tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: BORDER }} tickLine={false} />
                <YAxis yAxisId="left" stroke={MUTED} tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={34} />
                <YAxis yAxisId="right" orientation="right" stroke={MUTED} tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={40} />
                <RTooltip
                  contentStyle={{ background: PANEL2, border: `1px solid ${BORDER}`, borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 11 }}
                  labelStyle={{ color: TEXT }}
                />
                <Legend wrapperStyle={{ fontFamily: "Noto Sans JP", fontSize: 11, color: MUTED }} />
                <Bar yAxisId="right" dataKey="impressions" name="表示回数" fill={BORDER} radius={[3, 3, 0, 0]} />
                <Bar yAxisId="left" dataKey="clicks" name="クリック" fill={site.color} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2" style={{ color: TEXT }}>
            <Target size={14} color={plan.color} />
            収益化アクションプラン
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: plan.color + "22", color: plan.color }}
            >
              {plan.title}
            </span>
          </div>
          <ul className="space-y-1.5">
            {plan.actions.map((a) => (
              <li key={a} className="text-[13px] leading-relaxed flex gap-2" style={{ color: TEXT_SOFT }}>
                <span style={{ color: ACCENT }}>・</span>
                {a}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              収益化台帳
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {site.monetization.map((m, i) => {
              const ms = MONEY_STATE[m.state];
              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5"
                  style={{ borderBottom: i < site.monetization.length - 1 ? `1px solid ${BORDER}` : "none" }}
                >
                  <div>
                    <div className="text-sm" style={{ color: TEXT }}>
                      {m.label}
                    </div>
                    <div className="text-[11px]" style={{ color: MUTED }}>
                      {m.detail}
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: ms.color + "22", color: ms.color }}>
                    {ms.label}
                  </span>
                </div>
              );
            })}
            <div className="mt-3 p-3 rounded-md text-sm leading-relaxed" style={{ background: PANEL2, color: TEXT_SOFT, borderLeft: `2px solid ${st.color}` }}>
              {site.note}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              開発ログ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {site.log.map((entry, i) => (
              <div key={i} className="pl-3" style={{ borderLeft: `2px solid ${BORDER}` }}>
                <div className="font-mono text-[11px]" style={{ color: site.color }}>
                  {entry.date}
                </div>
                <div className="text-sm mt-0.5 leading-relaxed" style={{ color: TEXT_SOFT }}>
                  {entry.text}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
