"use client";

import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { STATUS, Tone } from "@/data/sites";
import { MUTED, TEXT } from "@/lib/theme";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const TONE_ICON: Record<Tone, any> = {
  moss: CheckCircle2,
  brass: AlertTriangle,
  rust: XCircle,
  paper: Clock,
};

export function StatusBadge({ tone }: { tone: Tone }) {
  const s = STATUS[tone];
  const Icon = TONE_ICON[tone];
  return (
    <Badge className="gap-1 border-0" style={{ background: s.color + "22", color: s.color }}>
      <Icon size={12} /> {s.label}
    </Badge>
  );
}

export function KPI({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardDescription className="text-[11px]" style={{ color: MUTED }}>
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="font-mono text-2xl font-semibold" style={{ color: TEXT }}>
          {value}
        </div>
        {sub && (
          <div className="text-[11px] mt-1" style={{ color: MUTED }}>
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: 90, height: 28 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.45} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#spark-${color})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
