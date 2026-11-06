import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "印刷して使う稽古シート",
  description: "書き出しメモ、答え方の7ステップ、判断軸×重み表、読書ノート、30日日記チェック表。A4で印刷して使える無料シートです。",
};

const Lines = ({ n, h = "h-9" }: { n: number; h?: string }) => (
  <>{Array.from({ length: n }).map((_, i) => <div key={i} className={`${h} border-b border-sumi/50`} />)}</>
);
const Sheet = ({ title, how, children }: { title: string; how: string; children: React.ReactNode }) => (
  <section className="sheet fuda bg-white p-6 mb-10 min-h-[240mm]" style={{ boxShadow: "5px 5px 0 #1a1a1a" }}>
    <h2 className="font-display text-2xl">{title}</h2>
    <p className="text-xs text-sumi-soft mt-1 mb-5">{how}</p>
    {children}
    <p className="text-[10px] text-sumi-soft mt-6">脱デジ道場 / datsu-digi.vercel.app</p>
  </section>
);
const Field = ({ label, lines = 2 }: { label: string; lines?: number }) => (
  <div className="mb-4"><p className="font-bold text-sm mb-1">{label}</p><Lines n={lines} /></div>
);

export default function SheetsPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <div className="print:hidden">
        <h1 className="font-display text-4xl"><span className="marker">印刷して使う稽古シート</span></h1>
        <p className="mt-4 mb-4 text-sm leading-loose">A4で印刷して使えるシートです。印刷画面で「ヘッダーとフッター」を外すと、きれいに出力できます。考え方は、各記事で解説しています(<Link href="/training" className="underline">稽古メニュー</Link>)。</p>
        <div className="mb-10"><PrintButton label="全部のシートを印刷する" /></div>
      </div>

      <Sheet title="書き出しメモ用紙" how="3分で思いつくことを書き出し、似たものを丸で囲み、結論を一文にします。">
        <Field label="今日のテーマ" lines={1} />
        <p className="font-bold text-sm mb-1">思いつくこと(3分)</p>
        <div className="border-2 border-sumi/60 h-[110mm] mb-4" />
        <Field label="グループに名前をつける(丸で囲んだもの)" lines={2} />
        <Field label="結論の一文(結局、自分はこうしたい)" lines={2} />
        <Field label="明日やること(1つだけ)" lines={1} />
      </Sheet>

      <Sheet title="答え方の7ステップシート" how="難しい依頼を、7つの欄に順番に書いて整理します。">
        {["1 依頼を、自分の言葉で言い直す", "2 足りない情報(聞く/仮定する)", "3 小さな問い(3つ前後)", "4 置いた仮定", "5 それぞれの答え", "6 検算の結果(桁・矛盾)", "7 結論 → 根拠 → 次の一歩"].map((l) => <Field key={l} label={l} lines={2} />)}
      </Sheet>

      <Sheet title="判断軸×重み表" how="軸を決め、重み(1〜5)と点数(0〜5)を書き、点数×重みを合計します。">
        <table className="w-full border-2 border-sumi text-sm">
          <thead><tr className="bg-paper-kraft">{["判断軸", "重み", "候補1:", "候補2:", "候補3:"].map((h) => <th key={h} className="border border-sumi p-2 text-left">{h}</th>)}</tr></thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => <tr key={i}>{Array.from({ length: 5 }).map((__, j) => <td key={j} className="border border-sumi h-14" />)}</tr>)}
            <tr className="bg-paper"><td className="border border-sumi p-2 font-bold" colSpan={2}>合計(点数×重み)</td>{[0, 1, 2].map((j) => <td key={j} className="border border-sumi h-14" />)}</tr>
          </tbody>
        </table>
        <div className="mt-6"><Field label="重みを変えたら、順位は変わった?" lines={2} /><Field label="自分が大事にしていること" lines={2} /></div>
      </Sheet>

      <Sheet title="読書ノートシート" how="読み終わって5分以内に、本を閉じたまま書きます。1週間後に見返します。">
        <Field label="書名・読み終わった日" lines={1} />
        {["① 一言でいうと(自分の言葉で)", "② 使えそうな一文(言い直して)", "③ 明日やること(いつ・何を)", "④ 残った問い"].map((l) => <Field key={l} label={l} lines={3} />)}
        <Field label="1週間後:③は実行できた?" lines={1} />
      </Sheet>

      <Sheet title="手書き日記 30日チェック表" how="1日3行(今日あったこと/気づいたこと/明日1つだけやること)。書けた日に丸をつけます。">
        <div className="grid grid-cols-6 gap-2 mb-6">
          {Array.from({ length: 30 }).map((_, i) => <div key={i} className="border-2 border-sumi h-14 p-1 text-xs">{i + 1}日目</div>)}
        </div>
        <Field label="1週間後に気づいたこと" lines={2} />
        <Field label="2週間後に気づいたこと" lines={2} />
        <Field label="30日後のまとめ" lines={3} />
      </Sheet>
    </main>
  );
}
