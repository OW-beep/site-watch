"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Share2, Check } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

type TypeKey = "steady" | "craftsman" | "patient" | "explorer" | "global";

const TYPES: Record<
  TypeKey,
  { name: string; pos: { x: number; y: number }; blurb: string; likeSite: string; tips: string[] }
> = {
  steady: {
    name: "コツコツ整備ハリネズミ",
    pos: { x: 72, y: 50 },
    blurb:
      "決まったフォーマットで、着実にコンテンツと機能を積み上げていくタイプ。派手さはないけれど、気づけば一番遠くまで来ている。",
    likeSite: "行政オープンデータ系サイトのような、地道な整備を淡々と続ける運営スタイルに近い",
    tips: [
      "せっかく実績が良いなら、AdSense申請など「次の一手」を先送りしすぎないよう定期チェックの日を決める",
      "コツコツ型は技術的な罠（クロール設定など）を見落としがちなので、月1回の健康診断を習慣化する",
    ],
  },
  craftsman: {
    name: "職人こだわりハリネズミ",
    pos: { x: 50, y: 50 },
    blurb:
      "1本1本の記事や機能を深く作り込むタイプ。数より質、他にない切り口を追求する。ニッチなテーマほど輝く。",
    likeSite: "ITブログのような、専門性の高い記事をじっくり積み上げるスタイルに近い",
    tips: [
      "こだわりが強い分、公開ペースが落ちやすいので「完璧じゃなくてもまず出す」記事枠を1つ作ってみる",
      "深掘りした知見は他サイトにも横展開できることが多い。ストックしたノウハウを棚卸ししてみる",
    ],
  },
  patient: {
    name: "じっくり種まきハリネズミ",
    pos: { x: 89, y: 12 },
    blurb:
      "今は数字よりも土台づくりを優先するタイプ。焦らず実績を積み、収益化は後回しにする判断ができる。",
    likeSite: "子育て・教育系サイトのような、「今は稼がない」と割り切れる運営スタイルに近い",
    tips: [
      "土台づくりの期間が長引くと迷いが出やすいので、「次に見直すタイミング」をあらかじめ決めておく",
      "SNSや動画など、SEO以外の集客チャネルと組み合わせると種まき期間の手応えを感じやすい",
    ],
  },
  explorer: {
    name: "新機能ワクワクハリネズミ",
    pos: { x: 13, y: 50 },
    blurb:
      "新しい機能や技術を試すのが好きなタイプ。ツールや検証コンテンツを次々と生み出すエネルギーがある。",
    likeSite: "ガジェットレビュー系サイトのような、新しい試みをどんどん検証していくスタイルに近い",
    tips: [
      "検証中の機能が増えすぎると散らかりやすいので、「一定期間で判断する」ルールを決めておく",
      "新機能は無料モデルで検証してから課金判断をする、といった段階を踏むと失敗コストを抑えられる",
    ],
  },
  global: {
    name: "越境チャレンジハリネズミ",
    pos: { x: 33, y: 16 },
    blurb:
      "国内の競合が多い土俵を避け、海外市場やニッチな英語圏で勝負するタイプ。即効性より権威性を狙う。",
    likeSite: "海外向けツール比較サイトのような、被リンク施策で地道に権威性を積む運営スタイルに近い",
    tips: [
      "海外市場は成果が出るまで時間がかかりやすいので、進捗を「被リンク数」など数値で可視化しておく",
      "現地メディアやコミュニティ（HARO系サービスなど）への露出を継続的な習慣にする",
    ],
  },
};

type Option = { label: string; type: TypeKey };
type Question = { prompt: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    prompt: "新しい記事や機能を作るとき、一番気になるのは？",
    options: [
      { label: "一つのテーマを深く掘り下げて、他にない情報にすること", type: "craftsman" },
      { label: "決まった型（フォーマット）で、コツコツ数を増やすこと", type: "steady" },
      { label: "とりあえず公開して、反応を見ながら育てること", type: "patient" },
      { label: "新しい技術やツールを試すいい機会にすること", type: "explorer" },
    ],
  },
  {
    prompt: "収益化について、今のスタンスに近いのは？",
    options: [
      { label: "AdSenseを本命に、実績作りを最優先している", type: "steady" },
      { label: "今は稼ぐことより、まず読者・利用者を増やしたい", type: "patient" },
      { label: "複数の収益源を並行して試している", type: "explorer" },
      { label: "海外市場やニッチな市場で、独自のポジションを取りに行っている", type: "global" },
    ],
  },
  {
    prompt: "サイトの更新スタイルは？",
    options: [
      { label: "毎週決まったペースでコツコツ更新する", type: "steady" },
      { label: "気が向いたときに集中して大幅に手を入れる", type: "craftsman" },
      { label: "思いついたら小さな改善をこまめに積む", type: "explorer" },
      { label: "長期戦のつもりで、更新頻度より継続を重視する", type: "patient" },
    ],
  },
  {
    prompt: "SEOやアクセスでトラブルが起きたら？",
    options: [
      { label: "原因を突き止めるまで技術的に深掘りする", type: "craftsman" },
      { label: "影響が小さければ様子見して、実績が溜まるのを待つ", type: "patient" },
      { label: "すぐに直せる部分から手をつけて前に進む", type: "steady" },
      { label: "海外の事例やフォーラムを調べて視野を広げる", type: "global" },
    ],
  },
  {
    prompt: "サイト運営で一番のモチベーションは？",
    options: [
      { label: "誰も見ていないニッチな情報を、きちんと形にすること", type: "craftsman" },
      { label: "数字が右肩上がりになっていくのを見ること", type: "steady" },
      { label: "新しいことに挑戦し続けること", type: "explorer" },
      { label: "日本語だけでなく、もっと広い世界に届けること", type: "global" },
    ],
  },
];

export default function HedgehogTypeDiagnostic() {
  return (
    <Suspense fallback={null}>
      <HedgehogTypeDiagnosticInner />
    </Suspense>
  );
}

function HedgehogTypeDiagnosticInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sharedParam = searchParams.get("result") as TypeKey | null;
  const isSharedView = !!sharedParam && sharedParam in TYPES;

  const [answers, setAnswers] = useState<(TypeKey | null)[]>(Array(QUESTIONS.length).fill(null));
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const finished = answers.every((a) => a !== null);

  const result = useMemo(() => {
    if (isSharedView) return sharedParam;
    if (!finished) return null;
    const scores: Record<TypeKey, number> = { steady: 0, craftsman: 0, patient: 0, explorer: 0, global: 0 };
    answers.forEach((a) => {
      if (a) scores[a] += 1;
    });
    const sorted = (Object.entries(scores) as [TypeKey, number][]).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  }, [answers, finished, isSharedView, sharedParam]);

  function selectAnswer(type: TypeKey) {
    const next = [...answers];
    next[step] = type;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  }

  function restart() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setStep(0);
    router.push("/diagnostics/hedgehog-type");
  }

  function share() {
    if (!result) return;
    const url = `${window.location.origin}/diagnostics/hedgehog-type?result=${result}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Topbar title="何ハリネズミ診断" subtitle="5つの質問に答えて、あなたのサイト運営タイプを診断します" />
      <DiagnosticShell
        title="何ハリネズミ診断"
        description="直感で選んでOK。所要時間は1分ほどです。"
      >
        {!finished && !isSharedView && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="text-xs" style={{ color: MUTED }}>
                質問 {step + 1} / {QUESTIONS.length}
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: PANEL2 }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${((step + (answers[step] ? 1 : 0)) / QUESTIONS.length) * 100}%`, background: ACCENT }}
                />
              </div>
              <div className="text-base font-medium" style={{ color: TEXT }}>
                {QUESTIONS[step].prompt}
              </div>
              <div className="space-y-2">
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => selectAnswer(opt.type)}
                    className="w-full text-left text-sm rounded-lg border px-4 py-3 transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: BORDER, background: PANEL2, color: TEXT }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  ひとつ前の質問に戻る
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {(finished || isSharedView) && result && (
          <Card>
            <CardContent className="p-6 space-y-4 text-center">
              {isSharedView && (
                <div className="text-xs rounded-full px-3 py-1 inline-block" style={{ background: ACCENT + "1A", color: ACCENT }}>
                  シェアされた診断結果です
                </div>
              )}
              <div className="flex justify-center">
                <Mascot pos={TYPES[result].pos} size={96} />
              </div>
              <div>
                <div className="text-xs" style={{ color: MUTED }}>
                  {isSharedView ? "この人のタイプは…" : "あなたのタイプは…"}
                </div>
                <div className="text-2xl font-bold mt-1" style={{ color: ACCENT }}>
                  {TYPES[result].name}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                {TYPES[result].blurb}
              </p>
              <div className="text-xs rounded-lg px-3 py-2 inline-block" style={{ background: PANEL2, color: MUTED }}>
                {TYPES[result].likeSite}
              </div>
              {!isSharedView && (
                <div className="text-left rounded-lg border p-4 space-y-2" style={{ borderColor: BORDER }}>
                  <div className="text-xs font-medium" style={{ color: TEXT }}>
                    このタイプへのヒント
                  </div>
                  <ul className="space-y-1.5">
                    {TYPES[result].tips.map((t) => (
                      <li key={t} className="text-[13px] leading-relaxed flex gap-2" style={{ color: MUTED }}>
                        <span style={{ color: ACCENT }}>・</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="pt-1 flex flex-wrap gap-2 justify-center">
                {!isSharedView && (
                  <Button variant="secondary" onClick={share}>
                    {copied ? <Check size={14} /> : <Share2 size={14} />}
                    {copied ? "リンクをコピーしました" : "結果をシェア"}
                  </Button>
                )}
                <Button variant={isSharedView ? "primary" : "outline"} onClick={restart}>
                  {isSharedView ? "自分も診断する" : "もう一度診断する"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DiagnosticShell>
    </>
  );
}
