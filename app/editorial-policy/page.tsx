import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
export const metadata = { title: "編集方針", description: `${SITE_NAME}の記事制作・AIの利用・情報の訂正に関する方針です。` };
const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-9">
      <h1 className="font-display text-4xl"><span className="marker">編集方針</span></h1>
      <section>
        <h2 className={h2}>記事の作り方</h2>
        <p>記事は、運営者が内容を確認し、編集したうえで公開しています。考え方の型は、一般に知られている方法をもとに、身近な例題で練習できる形にまとめています。</p>
      </section>
      <section>
        <h2 className={h2}>AIの利用について</h2>
        <p>下書きや整理、構成の検討にAIを使うことがあります。AIが出した内容は、そのまま掲載せず、運営者が読み直し、数字や言い回しを確かめて修正しています。AIが答えを組み立てる手順を紹介する記事では、AI自身に答え方を説明してもらい、運営者が整理したことを明記しています。なお、AIの内部の仕組みを正確に説明するものではなく、答え方の「進め方」を言葉にしたものです。</p>
      </section>
      <section>
        <h2 className={h2}>例題の数字について</h2>
        <p>記事中の例題や回答例の数字は、練習のための<strong>仮のもの</strong>です。実在の店舗・企業・個人のデータではありません。実際の判断には、ご自身の数字を当てはめてください。</p>
      </section>
      <section>
        <h2 className={h2}>医療・健康に関する情報について</h2>
        <p>当サイトは、診断・治療・予防を目的とした情報を提供していません。思考習慣や学び方の練習としてお読みください。健康上の不安がある場合は、医療機関にご相談ください。</p>
      </section>
      <section>
        <h2 className={h2}>研究や統計を紹介する場合</h2>
        <p>出典(発行元・年)を明記し、断定せずに紹介します。出典を確認できない情報は掲載しません。</p>
      </section>
      <section>
        <h2 className={h2}>広告について</h2>
        <p>当サイトはGoogle AdSenseなどの広告を利用しています。広告の有無や内容が、記事の評価や内容に影響することはありません。</p>
      </section>
      <section>
        <h2 className={h2}>誤りを見つけた場合・更新について</h2>
        <p>内容に誤りや古い情報を見つけた場合は、<a href={`mailto:${CONTACT_EMAIL}`} className="underline">お問い合わせ</a>からご連絡ください。確認のうえ、修正します。大きく更新した記事には、更新日を表示します。</p>
      </section>
    </main>
  );
}
