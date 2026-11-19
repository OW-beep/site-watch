import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "印刷して使う稽古シート",
  description: "書き出しメモ、答え方の7ステップ、判断軸×重み表、読書ノート、書籍シート(読書記録)、モメごとを解くシート、なぜなぜシート、連想シートなど。A4で印刷して使える無料シートです。",
};

const Lines = ({ n, h = "h-9" }: { n: number; h?: string }) => (
  <>{Array.from({ length: n }).map((_, i) => <div key={i} className={`${h} border-b border-sumi/50`} />)}</>
);
const Sheet = ({ title, how, id, children }: { title: string; how: string; id?: string; children: React.ReactNode }) => (
  <section id={id} className="sheet fuda bg-white p-6 mb-10 min-h-[240mm] scroll-mt-6" style={{ boxShadow: "5px 5px 0 #1a1a1a" }}>
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
        <div className="mb-6"><PrintButton label="全部のシートを印刷する" /></div>
        <nav aria-label="シート一覧" className="mb-10 text-sm">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 underline">
            <li><a href="#shoseki">書籍シート(読書記録)</a></li>
            <li><a href="#booklist">読みたい本リスト</a></li>
            <li><a href="#momegoto">モメごとを解くシート</a></li>
            <li><a href="#nazenaze">なぜなぜシート</a></li>
            <li><a href="#rensou">連想シート</a></li>
          </ul>
          <p className="text-xs text-sumi-soft mt-2">新しいシート5枚を追加しました。必要なシートだけ印刷したい場合は、ブラウザの印刷画面でページ範囲を指定してください。</p>
        </nav>
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

      <Sheet id="shoseki" title="書籍シート(読書記録)" how="1冊を、じっくり記録するシートです。読む前に「問い」を書き、読み終わってから残りを書きます。読書ノートシート(短い版)と使い分けてください。">
        <div className="grid grid-cols-2 gap-x-6">
          <Field label="書名" lines={1} />
          <Field label="著者・出版社" lines={1} />
          <Field label="読み始めた日・読み終わった日" lines={1} />
          <Field label="分類(仕事/暮らし/教養/その他)" lines={1} />
        </div>
        <Field label="読む前の問い:この本で、何を知りたいか" lines={2} />
        <Field label="3行でいうと(結論・理由・使いどころ)" lines={3} />
        <Field label="印象に残った箇所(ページも書く)" lines={3} />
        <Field label="自分の仕事・暮らしに、どう使うか(1行)" lines={2} />
        <Field label="明日やること(いつ・何を)" lines={1} />
        <Field label="残った問い・次に読みたい本" lines={2} />
        <div className="flex gap-8 text-sm mt-2">
          <p className="font-bold">もう一度読みたい度: ☆ ☆ ☆ ☆ ☆</p>
          <p className="font-bold">薦めたい人:</p>
        </div>
      </Sheet>

      <Sheet id="booklist" title="読みたい本・読んだ本リスト" how="読みたい本と、読んだ本を一覧で管理するシートです。状態に丸をつけ、読んだ本には一言だけ残します。">
        <table className="w-full border-2 border-sumi text-sm">
          <thead><tr className="bg-paper-kraft">{["書名", "著者", "状態", "一言メモ"].map((h) => <th key={h} className="border border-sumi p-2 text-left">{h}</th>)}</tr></thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i}>
                <td className="border border-sumi h-12" />
                <td className="border border-sumi h-12 w-[18%]" />
                <td className="border border-sumi h-12 w-[22%] text-[11px] text-sumi-soft px-1">読みたい / 読書中 / 読了</td>
                <td className="border border-sumi h-12 w-[26%]" />
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6"><Field label="今月、まず読む1冊" lines={1} /><Field label="読むのをやめた本と、その理由(やめる判断も記録に残す)" lines={2} /></div>
      </Sheet>

      <Sheet id="momegoto" title="モメごとを解くシート" how="意見が割れるテーマを、自分の頭で解くためのシートです。答えを急がず、順番に書きます(記事「数学って、意味があるの?」「割り勘は1円単位まで割るべきか」と同じ手順)。">
        <Field label="テーマ(例:数学って、意味があるの?)" lines={1} />
        <Field label="まず、自分の仮の答え(理由も1つ)" lines={2} />
        <div className="grid grid-cols-2 gap-x-6">
          <Field label="賛成の言い分" lines={3} />
          <Field label="反対の言い分" lines={3} />
        </div>
        <Field label="言葉を分ける:大きな言葉を、3つに分ける" lines={3} />
        <Field label="数字や具体例で、確かめたこと" lines={2} />
        <Field label="場面で分けると(場面Aでは/場面Bでは)" lines={2} />
        <Field label="導いた結論" lines={2} />
        <div className="text-sm mt-2">
          <p className="font-bold mb-1">どこまで考えられたか(当てはまるものに丸)</p>
          <p>反対側の言い分を書けた / 言葉を分けられた / 数字で確かめた / 場面で答えを変えられた</p>
        </div>
      </Sheet>

      <Sheet id="nazenaze" title="なぜなぜシート" how="困りごとの原因を、「なぜ?」をくり返して掘るシートです。答えが「自分で直せること」に届いたら、そこで止めます。">
        <Field label="困りごと(事実だけを書く)" lines={2} />
        {["なぜ?(1回目)", "なぜ?(2回目)", "なぜ?(3回目)", "なぜ?(4回目)", "なぜ?(5回目)"].map((l) => <Field key={l} label={l} lines={1} />)}
        <Field label="自分で直せること(届いた答え)" lines={2} />
        <Field label="最初の一手(いつ・何をするか)" lines={1} />
        <p className="text-xs text-sumi-soft mt-2">人を責める答え(「あの人が悪い」)で止まったら、もう1回だけ「なぜ?」を続けてみてください。仕組みや手順の答えに届くと、直せることが見えてきます。</p>
      </Sheet>

      <Sheet id="rensou" title="連想シート" how="言葉から言葉へつなぐ、連想ゲームのシートです。10個出すまで「使える/使えない」を判断しないのがルールです。">
        <Field label="最初の言葉" lines={1} />
        <div className="grid grid-cols-2 gap-x-8">
          <div>{[1, 2, 3, 4, 5].map((n) => <Field key={n} label={`${n}.`} lines={1} />)}</div>
          <div>{[6, 7, 8, 9, 10].map((n) => <Field key={n} label={`${n}.`} lines={1} />)}</div>
        </div>
        <Field label="使えそうなもの(3つ選ぶ)" lines={2} />
        <Field label="選んだ理由と、組み合わせたらどうなるか" lines={2} />
      </Sheet>

    </main>
  );
}
