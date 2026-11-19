import DatsudejiCheck from "@/components/DatsudejiCheck";

export const metadata = {
  title: "脱デジ度チェック",
  description: "10の質問に答えるだけで、デジタルの使い方のクセと、いまの「帯(レベル)」の目安が分かる無料診断です。結果に合わせて、おすすめの稽古を案内します。入力内容は保存されません。",
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl"><span className="marker">脱デジ度チェック</span></h1>
      <p className="mt-4 mb-8 text-sm leading-loose">
        デジタルに頼りすぎていないか、10の質問で確かめる診断です。「はい・ときどき・いいえ」で答えてください。
        入力した内容は、この画面の中だけで処理され、保存・送信されません。
      </p>
      <DatsudejiCheck />
    </main>
  );
}
