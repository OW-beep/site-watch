import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SITES, CONN_STATE, Connection } from "@/data/sites";
import { TEXT, MUTED, BORDER, TEXT_SOFT } from "@/lib/theme";

const CONN_ICON: Record<Connection, any> = {
  connected: CheckCircle2,
  expired: AlertTriangle,
  disconnected: Circle,
};

export default function ConnectionsPage() {
  return (
    <>
      <Topbar title="API接続" subtitle="Search Console APIの接続状況" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              Search Console API 接続状況
            </CardTitle>
            <CardDescription className="text-[11px]" style={{ color: MUTED }}>
              フェーズ1では手動更新運用です。OAuth連携によるフェーズ2実装後、ここに実際の接続ボタンが入る想定です。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    サイト
                  </TableHead>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    プロパティ
                  </TableHead>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    接続状態
                  </TableHead>
                  <TableHead className="text-xs" style={{ color: MUTED }}>
                    最終同期
                  </TableHead>
                  <TableHead className="text-xs text-right" style={{ color: MUTED }}>
                    操作
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SITES.map((s) => {
                  const conn = CONN_STATE[s.connection];
                  const Icon = CONN_ICON[s.connection];
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="text-sm" style={{ color: TEXT }}>
                        {s.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: MUTED }}>
                        {s.url}
                      </TableCell>
                      <TableCell>
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1"
                          style={{ background: conn.color + "22", color: conn.color }}
                        >
                          <Icon size={11} /> {conn.label}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: MUTED }}>
                        {s.lastSync}
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-xs px-2.5 py-1 rounded-md border" style={{ color: TEXT, borderColor: BORDER }} disabled>
                          {s.connection === "disconnected" ? "接続する" : "再同期"}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm" style={{ color: TEXT }}>
              実装メモ（フェーズ2）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="text-sm space-y-1.5 list-decimal list-inside" style={{ color: TEXT_SOFT }}>
              <li>Google Cloud ConsoleでOAuthクライアントを作成</li>
              <li>各サイトのSearch Consoleプロパティに対して認可（同一アカウント管理なら一括認可も検討）</li>
              <li>Vercel Cron Jobsで週次バッチを実行し、searchanalytics.query エンドポイントを叩く</li>
              <li>取得結果をDB（例: Vercel Postgres / Supabase）に保存し、本ダッシュボードから参照</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
