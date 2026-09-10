"use client";

import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProGate } from "@/components/monetization/ProGate";
import { SITES, WEEKS, sum } from "@/data/sites";

function buildCsv(): string {
  const header = ["サイト", "URL", "種別", "CTR(%)", "平均掲載順位", "直近8週クリック合計", "直近8週表示回数合計", ...WEEKS.map((w) => `クリック_${w}`)];
  const rows = SITES.map((s) => [
    s.name,
    s.url,
    s.kind,
    s.ctr,
    s.avgPos,
    sum(s.clicksWeekly),
    sum(s.impressionsWeekly),
    ...s.clicksWeekly,
  ]);
  const escape = (v: unknown) => {
    const str = String(v);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  return [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}

export function CsvExportButton() {
  function download() {
    const csv = "\uFEFF" + buildCsv(); // BOM付きでExcelでも文字化けしない
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `saito-wotchi_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ProGate label="CSVエクスポートはProで" compact>
      <Button variant="secondary" onClick={download}>
        <FileSpreadsheet size={14} /> CSVエクスポート
      </Button>
    </ProGate>
  );
}
