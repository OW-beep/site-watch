"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

type IndexState = "ほぼ全てインデックス済み" | "一部インデックスされていない" | "半分以上インデックスされていない";
type TrafficState = "週に数件以上クリックがある" | "表示回数はあるがクリックはほぼゼロ" | "表示回数自体がほぼない";
type RejectState = "なし" | "1回" | "複数回";

const INDEX_OPTIONS: IndexState[] = ["ほぼ全てインデックス済み", "一部インデックスされていない", "半分以上インデックスされていない"];
const TRAFFIC_OPTIONS: TrafficState[] = ["週に数件以上クリックがある", "表示回数はあるがクリックはほぼゼロ", "表示回数自体がほぼない"];
const REJECT_OPTIONS: RejectState[] = ["なし", "1回", "複数回"];

type Verdict = {
  level: "go" | "wait" | "fix" | "traffic";
  title: string;
  color: string;
  Icon: typeof CheckCircle2;
  reasons: string[];
  nextSteps: string[];
};

function diagnose(articles: number, months: number, index: IndexState, traffic: TrafficState, reject: RejectState): Verdict {
  const reasons: string[] = [];

  if (index === "半分以上インデックスされていない") {
    reasons.push("インデックス未登録のページが半分以上あると、審査側にも「未完成のサイト」に見えやすい");
    reasons.push("記事を増やすより先に、なぜインデックスされないのか（クロール予算・重複コンテンツ・technical SEO）を確認する方が近道");
    return {
      level: "fix",
      title: "先に技術的な問題を解消してから",
      color: "#F5A623",
      Icon: AlertTriangle,
      reasons,
      nextSteps: [
        "Search Consoleの「ページ」レポートで「検出 - インデックス未登録」の割合を確認する",
        "サイトマップが正しく送信・取得されているか、robots.txtが誤ってブロックしていないかを確認する",
        "新規ドメインの場合はクロール予算が不足している可能性もあるため、被リンクや内部リンクで発見経路を増やす",
      ],
    };
  }

  if (traffic === "表示回数自体がほぼない") {
    reasons.push("表示回数（インプレッション）自体が少ないと、審査に必要な実績データがそもそも溜まっていない");
    reasons.push("記事の質より先に、検索結果に表示される機会を増やす段階");
    return {
      level: "wait",
      title: "あと一歩、露出の実績を積んでから",
      color: "#F5A623",
      Icon: AlertTriangle,
      reasons,
      nextSteps: [
        "公開から日が浅い場合は、まず数週間〜数ヶ月の運用期間を確保する",
        "内部リンク・SNS・関連コミュニティへの投稿など、発見経路を増やす",
        "表示回数が週あたり二桁を超えてきたタイミングで再評価する",
      ],
    };
  }

  if (reject === "複数回") {
    reasons.push("複数回の却下歴がある場合、原因が「記事の書き方」ではなく「サイト全体の実績不足」であるケースが多い");
    reasons.push("記事を追加するより、既存記事へのトラフィックと運用期間の実績を積み上げる方が有効なことがある");
    return {
      level: "traffic",
      title: "記事追加より先に、実績（トラフィック・運用期間）を優先",
      color: "#F0576B",
      Icon: XCircle,
      reasons,
      nextSteps: [
        "分析の切り口や構成を記事ごとに変えるなど、量産感を避ける工夫を続ける",
        "SNSや外部メディアへの掲載など、SEO以外の露出経路も並行して育てる",
        "次の申請は「記事数が増えたタイミング」ではなく「トラフィックが明確に増えたタイミング」で行う",
      ],
    };
  }

  if (traffic === "週に数件以上クリックがある" && months >= 2 && articles >= 20) {
    reasons.push("実際にクリックが発生しており、検索結果からの実利用実績があることは審査上プラスに働きやすい");
    reasons.push(`運用期間${months}ヶ月・記事数${articles}本は、審査に進む最低限の目安を満たしていそう`);
    if (index === "一部インデックスされていない") {
      reasons.push("一部未インデックスのページがあるが、致命的な水準ではなさそう");
    }
    return {
      level: "go",
      title: "審査に進んでみて良さそうなライン",
      color: "#34D399",
      Icon: CheckCircle2,
      reasons,
      nextSteps: [
        "プライバシーポリシー・お問い合わせページなど、審査で見られる定番項目を再確認する",
        "申請直前に大きなデザイン変更を入れず、安定した状態で審査を受ける",
        "却下された場合は理由を保存しておき、次回の判断材料にする",
      ],
    };
  }

  reasons.push("記事数・運用期間・トラフィックのいずれかが、まだ審査に進むには少し早い水準に見える");
  reasons.push("「今すぐ申請」より「もう少し実績を積んでから」の方が結果的に近道になりやすい");
  return {
    level: "wait",
    title: "あと一歩、実績を積んでから",
    color: "#F5A623",
    Icon: AlertTriangle,
    reasons,
    nextSteps: [
      "記事数・運用期間のどちらかが不足している場合は、無理に急がず積み上げを続ける",
      "クリックが発生し始めたタイミングを目安に、再度この診断をやり直す",
      "焦って記事を量産すると量産感が出やすいので、質を保ったペースを優先する",
    ],
  };
}

export default function AdsenseChecker() {
  const [articles, setArticles] = useState(30);
  const [months, setMonths] = useState(3);
  const [index, setIndex] = useState<IndexState>(INDEX_OPTIONS[0]);
  const [traffic, setTraffic] = useState<TrafficState>(TRAFFIC_OPTIONS[0]);
  const [reject, setReject] = useState<RejectState>(REJECT_OPTIONS[0]);
  const [result, setResult] = useState<Verdict | null>(null);

  function run() {
    setResult(diagnose(articles, months, index, traffic, reject));
  }

  return (
    <>
      <Topbar title="AdSense合格可能性チェッカー" subtitle="9サイトの実際の却下・合格パターンをもとにした簡易診断" />
      <DiagnosticShell
        title="AdSense合格可能性チェッカー"
        description="記事数や実績を入力すると、審査に進むタイミングの目安を診断します。あくまで参考情報で、合否を保証するものではありません。"
      >
        <Card>
          <CardContent className="p-5 space-y-5">
            <Field label={`記事数（${articles}本）`}>
              <input
                type="range"
                min={0}
                max={300}
                step={5}
                value={articles}
                onChange={(e) => setArticles(Number(e.target.value))}
                className="w-full"
              />
            </Field>

            <Field label={`運用期間（${months}ヶ月）`}>
              <input
                type="range"
                min={0}
                max={24}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full"
              />
            </Field>

            <Field label="インデックス状況">
              <SelectGroup options={INDEX_OPTIONS} value={index} onChange={(v) => setIndex(v as IndexState)} />
            </Field>

            <Field label="直近の検索トラフィック">
              <SelectGroup options={TRAFFIC_OPTIONS} value={traffic} onChange={(v) => setTraffic(v as TrafficState)} />
            </Field>

            <Field label="過去の却下歴">
              <SelectGroup options={REJECT_OPTIONS} value={reject} onChange={(v) => setReject(v as RejectState)} />
            </Field>

            <Button onClick={run}>診断する</Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <result.Icon size={20} color={result.color} />
                <div className="text-lg font-semibold" style={{ color: TEXT }}>
                  {result.title}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1.5" style={{ color: MUTED }}>
                  判断の理由
                </div>
                <ul className="space-y-1.5">
                  {result.reasons.map((r) => (
                    <li key={r} className="text-[13px] leading-relaxed flex gap-2" style={{ color: TEXT }}>
                      <span style={{ color: result.color }}>・</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: PANEL2 }}>
                <div className="text-xs font-medium mb-1.5" style={{ color: TEXT }}>
                  次にやるとよさそうなこと
                </div>
                <ul className="space-y-1.5">
                  {result.nextSteps.map((s) => (
                    <li key={s} className="text-[13px] leading-relaxed flex gap-2" style={{ color: MUTED }}>
                      <span style={{ color: ACCENT }}>・</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </DiagnosticShell>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium mb-2" style={{ color: TEXT }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function SelectGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="text-left text-sm rounded-lg border px-3.5 py-2 transition-colors"
          style={{
            borderColor: value === opt ? ACCENT : BORDER,
            background: value === opt ? ACCENT + "1A" : PANEL2,
            color: value === opt ? ACCENT : TEXT,
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
