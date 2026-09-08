import { Topbar } from "@/components/Topbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { SITES, WEEKS, sum, growth, LOW_VOLUME_THRESHOLD } from "@/data/sites";
import { TEXT, MUTED } from "@/lib/theme";

export default function TrendsPage() {
  const max = Math.max(...SITES.flatMap((s) => s.clicksWeekly));
  const ranked = [...SITES]
    .map((s) => ({ ...s, g: growth(s.clicksWeekly), vol: sum(s.clicksWeekly) }))
    .sort((a, b) => b.vol - a.vol);

  return (
    <>
      <Topbar title="横断トレンド" subtitle="サイト間の比較・週次ヒートマップ" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              週次クリック・ヒートマップ
            </CardTitle>
            <CardDescription className="text-[11px]" style={{ color: MUTED }}>
              色の濃さがクリック数を表します（全サイト中の最大値を基準に正規化）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[11px] text-left px-2 py-1" style={{ color: MUTED }}>
                      サイト
                    </th>
                    {WEEKS.map((w) => (
                      <th key={w} className="font-mono text-[10px] px-1 py-1" style={{ color: MUTED }}>
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SITES.map((s) => (
                    <tr key={s.id}>
                      <td className="text-[12px] px-2 py-1 whitespace-nowrap" style={{ color: TEXT }}>
                        {s.name}
                      </td>
                      {s.clicksWeekly.map((v, i) => {
                        const alpha = max === 0 ? 0 : v / max;
                        return (
                          <td key={i} className="p-0.5">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div
                                    className="font-mono text-[10px] flex items-center justify-center rounded"
                                    style={{
                                      width: 34,
                                      height: 26,
                                      background: `${s.color}${Math.round(alpha * 200 + 20)
                                        .toString(16)
                                        .padStart(2, "0")}`,
                                      color: alpha > 0.5 ? "white" : TEXT,
                                    }}
                                  >
                                    {v}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs">
                                  {s.name} ・ {WEEKS[i]} ・ {v}クリック
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              サイト別ランキング（直近8週クリック数順）
            </CardTitle>
            <CardDescription className="text-[11px]" style={{ color: MUTED }}>
              クリック数が{LOW_VOLUME_THRESHOLD}件未満のサイトは成長率を「参考値」として扱っています
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    #
                  </TableHead>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    サイト
                  </TableHead>
                  <TableHead className="text-xs text-right" style={{ color: MUTED }}>
                    クリック
                  </TableHead>
                  <TableHead className="text-xs text-right" style={{ color: MUTED }}>
                    成長率（前半4週比）
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranked.map((s, i) => {
                  const lowVolume = s.vol < LOW_VOLUME_THRESHOLD;
                  const isUp = s.g > 0;
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-sm" style={{ color: MUTED }}>
                        {i + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                          <span className="text-sm" style={{ color: TEXT }}>
                            {s.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-right" style={{ color: TEXT }}>
                        {s.vol}
                      </TableCell>
                      <TableCell
                        className="font-mono text-right text-xs"
                        style={{ color: lowVolume ? MUTED : isUp ? "#34D399" : "#F0576B" }}
                      >
                        {lowVolume ? "参考値" : `${isUp ? "+" : ""}${s.g.toFixed(0)}%`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
