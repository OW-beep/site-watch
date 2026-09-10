"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { DiagnosticShell } from "@/components/DiagnosticShell";
import { Card, CardContent } from "@/components/ui/card";
import { TEXT, MUTED, ACCENT, PANEL2, BORDER } from "@/lib/theme";

type Answer = "unknown" | "ok" | "problem";

type Item = {
  id: string;
  question: string;
  why: string;
  fix: string;
  fromRealCase?: string;
};

const ITEMS: Item[] = [
  {
    id: "vercel-auth",
    question: "Vercel Authentication（Deployment Protection）が本番ドメインで有効になっていませんか？",
    why: "有効なままだと、Googlebotがsitemap.xmlやページ本体にアクセスした際に認証画面へリダイレクトされ、クロール・インデックスがブロックされます。",
    fix: "Vercelのプロジェクト設定でDeployment Protectionを本番ドメインのみ無効化するか、Standard Protectionではなく本番運用向けの設定に変更してください。",
    fromRealCase: "実際に、あるサイトでこの設定がsitemap.xmlをブロックしていたことが発覚した事例があります。",
  },
  {
    id: "placeholder-domain",
    question: "next-sitemap.config.jsやsite設定ファイルに、example.comなどのプレースホルダードメインが残っていませんか？",
    why: "サイトマップやcanonical URLに間違ったドメインが出力されると、検索エンジンが正しいURLを認識できません。",
    fix: "site-config系のファイルで本番ドメインが正しく設定されているか、デプロイ後に実際に出力されたsitemap.xmlを開いて確認してください。",
    fromRealCase: "サイトマップのドメイン設定がプレースホルダーのまま残っていた事例があります。",
  },
  {
    id: "duplicate-robots",
    question: "public/robots.txtと自動生成されるrobots.txtが重複していませんか？",
    why: "手動で置いたrobots.txtと、next-sitemap等が生成するrobots.txtが競合すると、意図しない内容が優先されることがあります。",
    fix: "どちらか一方に統一し、正しいドメインとsitemap参照だけが出力されるようにしてください。",
    fromRealCase: "public/robots.txtの重複により、誤ったドメインを参照していた事例があります。",
  },
  {
    id: "sitemap-200",
    question: "本番デプロイ後、実際に /sitemap.xml にアクセスして200が返ることを確認しましたか？",
    why: "ビルドが通っていても、デプロイ後の実URLで404やリダイレクトが起きているケースは意外と見落とされます。",
    fix: "デプロイの都度、実際のURLでsitemap.xml・robots.txtを直接開いて中身を確認する習慣をつけてください。",
  },
  {
    id: "metadata-base",
    question: "metadataBase（またはOGP画像等の絶対URL）が正しい本番ドメインを指していますか？",
    why: "Vercelのプレビュードメインのままだと、OGP画像やcanonicalが本番URLと異なるものを指してしまいます。",
    fix: "app/layout.tsxのmetadataBaseを本番ドメインの環境変数から生成するようにしてください。",
  },
  {
    id: "canonical",
    question: "canonicalタグはプレビューURLではなく、本番ドメインを指していますか？",
    why: "canonicalが間違ったドメインを指すと、検索エンジンが本番ページを正しい代表URLと認識できません。",
    fix: "各ページのcanonicalが環境変数由来の本番ドメインを参照しているか確認してください。",
  },
  {
    id: "noindex",
    question: "開発中に付けたnoindexタグが、本番ビルドに残っていませんか？",
    why: "ステージング環境向けのnoindex設定を消し忘れると、公開後もインデックスされないままになります。",
    fix: "robots metaやnext.config内のnoindex設定を、環境変数で本番/開発を切り替えるようにしてください。",
  },
  {
    id: "gsc-resubmit",
    question: "ドメインやサブドメインを変更した後、Search Consoleでプロパティ登録・サイトマップ再送信をやり直しましたか？",
    why: "ドメイン変更後にGSC側の設定を更新しないと、新しいURLの実績データが正しく計測されません。",
    fix: "新しいプロパティを追加し、sitemap.xmlを再送信、可能であればURL検査ツールでインデックス登録をリクエストしてください。",
  },
];

export default function VercelSeoChecklist() {
  const [answers, setAnswers] = useState<Record<string, Answer>>(
    Object.fromEntries(ITEMS.map((i) => [i.id, "unknown"]))
  );

  const problemCount = Object.values(answers).filter((a) => a === "problem").length;
  const answeredCount = Object.values(answers).filter((a) => a !== "unknown").length;

  return (
    <>
      <Topbar title="Vercel/Next.js SEOトラブル診断" subtitle="実際にハマった罠をもとにしたYes/Noチェックリスト" />
      <DiagnosticShell
        title="Vercel/Next.js SEOトラブル診断"
        description="各項目について「問題あり」「問題なし」を選んでください。「問題あり」を選ぶと対処法が表示されます。"
      >
        {answeredCount > 0 && (
          <div
            className="rounded-lg border px-4 py-3 text-sm flex items-center gap-2"
            style={{
              borderColor: problemCount > 0 ? "#F0576B" : BORDER,
              background: problemCount > 0 ? "#F0576B14" : PANEL2,
              color: problemCount > 0 ? "#F0576B" : MUTED,
            }}
          >
            {problemCount > 0 ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
            {problemCount > 0
              ? `${answeredCount}/${ITEMS.length}項目に回答済み・うち${problemCount}件で問題ありと判定されました`
              : `${answeredCount}/${ITEMS.length}項目に回答済み・今のところ問題は見つかっていません`}
          </div>
        )}

        <div className="space-y-3">
          {ITEMS.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 space-y-3">
                <div className="text-sm font-medium" style={{ color: TEXT }}>
                  {item.question}
                </div>
                <div className="flex gap-2">
                  <ToggleButton
                    active={answers[item.id] === "ok"}
                    onClick={() => setAnswers((a) => ({ ...a, [item.id]: "ok" }))}
                    color="#34D399"
                    label="問題なし"
                  />
                  <ToggleButton
                    active={answers[item.id] === "problem"}
                    onClick={() => setAnswers((a) => ({ ...a, [item.id]: "problem" }))}
                    color="#F0576B"
                    label="問題あり／わからない"
                  />
                </div>
                {answers[item.id] === "problem" && (
                  <div className="rounded-lg border p-3 space-y-1.5" style={{ borderColor: "#F0576B33", background: "#F0576B0D" }}>
                    <div className="text-[12px] leading-relaxed" style={{ color: TEXT }}>
                      <span className="font-medium">なぜ問題か：</span>
                      {item.why}
                    </div>
                    <div className="text-[12px] leading-relaxed" style={{ color: TEXT }}>
                      <span className="font-medium">対処法：</span>
                      {item.fix}
                    </div>
                    {item.fromRealCase && (
                      <div className="text-[11px] flex items-center gap-1" style={{ color: MUTED }}>
                        <HelpCircle size={11} />
                        {item.fromRealCase}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </DiagnosticShell>
    </>
  );
}

function ToggleButton({
  active,
  onClick,
  color,
  label,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
      style={{
        borderColor: active ? color : BORDER,
        background: active ? color + "1F" : "transparent",
        color: active ? color : MUTED,
      }}
    >
      {label}
    </button>
  );
}
