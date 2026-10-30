import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata = { title: "運営者情報", description: `${SITE_NAME}の運営方針と、道場主のプロフィールです。` };

const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-10">
      <h1 className="font-display text-4xl"><span className="marker">運営者情報</span></h1>

      <section>
        <h2 className={h2}>このサイトについて</h2>
        <p>
          「{SITE_NAME}」は、スマホやAIが当たり前になった今だからこそ、紙とペンで自分の頭を使う習慣を取り戻すための実践記録サイトです。手書き、読書、AIとの付き合い方などを、実際に試した感想と一緒にまとめています。
        </p>
      </section>

      <section>
        <h2 className={h2}>道場主</h2>
        <p>
          {SITE_NAME} 道場主(個人運営)。公務員として勤務した後、ITコンサルタントに転身し、フリーランスとしてこれまでおおよそ50の企業・団体の業務支援に携わってきました(守秘義務のため、具体的な企業名は伏せています)。データ分析・データ活用の支援を専門としています。
        </p>
        <p className="mt-3">
          仕事柄、日々デジタルツールやAIに触れるからこそ、「考える」作業まで任せきりにしない習慣が大切だと感じ、自分自身が紙とペンに戻って試した内容を、このサイトに書いています。
        </p>
      </section>

      <section>
        <h2 className={h2}>記事の方針</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>実際にやってみた体験を中心に書きます。効果を断定せず、「私の場合」として記録します</li>
          <li>研究や統計に触れるときは、出典を明記します</li>
          <li>他サイトの文章を転載せず、すべて自分の言葉で書きます</li>
          <li>誤りや古い情報が見つかった場合は、確認のうえ修正します</li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>ご注意</h2>
        <p>
          当サイトは、思考習慣や学び方に関する情報の提供を目的としており、医療・健康に関する診断、治療、予防を目的としたものではありません。健康上の不安がある場合は、医療機関にご相談ください。記事の内容は正確さに努めていますが、その完全性を保証するものではありません。
        </p>
      </section>

      <section>
        <h2 className={h2}>広告について</h2>
        <p>当サイトは、Google AdSenseなどの第三者配信の広告サービスを利用しています。詳しくは<Link href="/privacy" className="underline">プライバシーポリシー</Link>をご覧ください。</p>
      </section>

      <p><Link href="/contact" className="underline font-bold">お問い合わせはこちら →</Link></p>
    </main>
  );
}
