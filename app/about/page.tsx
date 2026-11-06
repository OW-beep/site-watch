import Link from "next/link";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";

export const metadata = { title: "運営者情報", description: `${SITE_NAME}の運営方針と、道場主のプロフィールです。` };

const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-10">
      <h1 className="font-display text-4xl"><span className="marker">運営者情報</span></h1>

      <section>
        <h2 className={h2}>サイト情報</h2>
        <dl className="grid grid-cols-[7rem_1fr] gap-y-2 border-2 border-sumi bg-white p-5">
          <dt className="font-bold">サイト名</dt><dd>{SITE_NAME}</dd>
          <dt className="font-bold">URL</dt><dd>{SITE_URL}</dd>
          <dt className="font-bold">運営者</dt><dd>{SITE_NAME} 道場主(個人運営)</dd>
          {PROFILE.years && (<><dt className="font-bold">経験年数</dt><dd>{PROFILE.years}</dd></>)}
          {PROFILE.qualifications.length > 0 && (<><dt className="font-bold">保有資格</dt><dd>{PROFILE.qualifications.join("、")}</dd></>)}
          <dt className="font-bold">開設</dt><dd>2026年</dd>
          <dt className="font-bold">連絡先</dt><dd><a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></dd>
        </dl>
      </section>

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
        <h2 className={h2}>経歴と、このサイトの関係</h2>
        <table className="w-full border-2 border-sumi bg-white text-left">
          <thead><tr className="bg-paper-kraft"><th className="p-3 border-b-2 border-sumi">経歴・専門</th><th className="p-3 border-b-2 border-sumi">このサイトの内容</th></tr></thead>
          <tbody>
            <tr className="border-b border-sumi/20"><td className="p-3">データ分析・データ活用の支援</td><td className="p-3">ロジックツリー、課題設計、フェルミ推定など、数字で考える稽古</td></tr>
            <tr className="border-b border-sumi/20"><td className="p-3">約50の企業・団体の業務支援</td><td className="p-3">データの定義があいまい、打ち手が先に決まる、といった現場の落とし穴の解説</td></tr>
            <tr className="border-b border-sumi/20"><td className="p-3">{PROFILE.usedMethods.join("・")}を、仕事で使用</td><td className="p-3">「仕事に効く考え方」の稽古。守秘義務のため、案件の数字は載せず、身近な例題で練習できる形にしています。仕事での使い方は、<Link href="/category/genba" className="underline">現場メモ</Link>にまとめています</td></tr>
            <tr><td className="p-3">公務員から、ITコンサルタントへ</td><td className="p-3">専門用語を使わず、身近な例題で説明する書き方</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className={h2}>筆者が試してきた稽古</h2>
        <p>このサイトで紹介する稽古のうち、{PROFILE.triedPractices.join("、")}は、筆者が実際に試してきたものです。やってみて分かったことは、稽古日誌にまとめています。</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li><Link href="/posts/tegaki-nikki-3kagetsu" className="underline">手書き日記を約3か月続けて分かったこと</Link></li>
          <li><Link href="/posts/smartphone-oku-2shukan" className="underline">スマホを置く生活を2週間ずつ試して分かったこと</Link></li>
          <li><Link href="/posts/kami-techo-hantoshi" className="underline">紙の手帳を半年使って分かったこと</Link></li>
          <li><Link href="/posts/dokusho-note-1gyo" className="underline">読書ノートを数か月試して分かったこと</Link></li>
          <li><Link href="/posts/gaini-dasu-kangaeru" className="underline">考えることと、外に出すことは違う(全体のまとめ)</Link></li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>記事の方針</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>実際にやってみた体験を中心に書きます。効果を断定せず、「私の場合」として記録します</li>
          <li>研究や統計に触れるときは、出典を明記します</li>
          <li>他サイトの文章を転載せず、すべて自分の言葉で書きます</li>
          <li>下書きや整理にAIを使うことがあります。内容は筆者が確認し、編集したうえで掲載します</li>
          <li>誤りや古い情報が見つかった場合は、確認のうえ修正します</li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>ご注意</h2>
        <p>
          当サイトは、思考習慣や学び方に関する情報の提供を目的としており、医療・健康に関する助言を目的としたものではありません。健康上の不安がある場合は、医療機関にご相談ください。記事の内容は正確さに努めていますが、その完全性を保証するものではありません。
        </p>
      </section>

      <section>
        <h2 className={h2}>広告について</h2>
        <p>当サイトは、Google AdSenseなどの第三者配信の広告サービスを利用しています。詳しくは<Link href="/privacy" className="underline">プライバシーポリシー</Link>をご覧ください。</p>
      </section>

      <p>連絡先:<a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>(<Link href="/contact" className="underline font-bold">お問い合わせページ →</Link>)</p>
    </main>
  );
}
