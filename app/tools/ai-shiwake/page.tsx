import Link from "next/link";
import AiShiwake from "@/components/AiShiwake";

export const metadata = {
  title: "AIに任せる/残す 仕分けツール",
  description: "仕事や暮らしの作業を、3つの質問に答えるだけで「AIに任せる」「案出しだけ任せる」「自分に残す」に仕分ける無料ツールです。入力内容は保存されません。",
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">AIに任せる/残す 仕分けツール</span></h1>
      <p className="mt-4 mb-8 text-sm leading-loose">
        作業を1つ入力し、3つの質問に答えると、AIとの付き合い方の目安が出ます。考え方は
        <Link href="/posts/ai-ni-makaseru-sakaime-3" className="underline">AIに任せていいこと、自分で考えること</Link>で解説しています。
        入力した内容は、この画面の中だけで処理され、保存・送信されません。仕事の機密や個人情報は、入力しないでください。
      </p>
      <AiShiwake />
      <section className="mt-12 text-sm leading-loose">
        <h2 className="font-display text-xl mb-3 border-l-8 border-shu pl-3">結果の見方</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>任せやすい</strong>:やり直しがきき、正解がある作業。AIに任せて、結果を確認する</li>
          <li><strong>案出しだけ任せる</strong>:正解が1つに決まらない作業。AIの案から、採用は自分で決める</li>
          <li><strong>裏取りが必要</strong>:やり直しがきかない作業。AIの答えを、自分で確かめてから使う</li>
          <li><strong>自分に残す</strong>:責任が自分にある判断。下書き・整理だけAIに頼む</li>
        </ul>
        <p className="mt-4 text-xs text-sumi-soft">あくまで考え方の目安です。実際の利用は、各サービスの規約や、勤務先のルールに従ってください。</p>
      </section>
    </main>
  );
}
