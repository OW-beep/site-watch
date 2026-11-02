import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata = { title: "プライバシーポリシー", description: "脱デジ道場の個人情報の取り扱い、広告配信(Google AdSense)とCookie、免責事項についての方針です。" };
const h2 = "font-display text-xl mb-3 border-l-8 border-shu pl-3";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 text-sm leading-loose space-y-9">
      <h1 className="font-display text-4xl"><span className="marker">プライバシーポリシー</span></h1>
      <section>
        <h2 className={h2}>広告の配信について</h2>
        <p>当サイトは、第三者配信の広告サービス「Google AdSense」を利用しています。Google AdSenseなどの第三者配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを使用することで、当サイトや他サイトへの過去のアクセス情報に基づいて広告が配信されます。</p>
        <p className="mt-3">Googleが広告配信に使用するCookieの無効化やパーソナライズ広告の制限は、<a className="underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google広告に関するポリシー</a>および<a className="underline" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">広告設定</a>のページから行えます。</p>
      </section>
      <section>
        <h2 className={h2}>アクセス解析ツールについて</h2>
        <p>当サイトは、Googleが提供するアクセス解析ツール等を利用する場合があります。これらのツールはトラフィックデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>
      </section>
      <section>
        <h2 className={h2}>お問い合わせについて</h2>
        <p>お問い合わせの際にいただいたお名前やメールアドレスなどの個人情報は、お問い合わせへの回答以外の目的では利用しません。お問い合わせ先:{CONTACT_EMAIL}</p>
      </section>
      <section>
        <h2 className={h2}>免責事項</h2>
        <p>{SITE_NAME}は、掲載する情報の正確性に努めていますが、誤りや情報の古さが含まれる場合があります。当サイトの情報を利用して行う一切の行為について、責任を負いかねます。</p>
      </section>
      <section>
        <h2 className={h2}>著作権・引用について</h2>
        <p>当サイトの文章・図解の著作権は、運営者に帰属します。引用する場合は、出典として記事のURLを明記し、引用部分を明確に区別してください。無断での転載・複製はご遠慮ください。</p>
      </section>
      <section>
        <h2 className={h2}>リンクについて</h2>
        <p>当サイトへのリンクは、自由に設置していただいて構いません。連絡は不要です。ただし、公序良俗に反するサイトからのリンクはお断りします。</p>
      </section>
      <section>
        <h2 className={h2}>プライバシーポリシーの変更について</h2>
        <p>本ポリシーは、法令の遵守と内容の改善のため、予告なく見直すことがあります。最新の内容は常に本ページに掲載します。</p>
      </section>
      <p className="text-xs text-sumi-soft">制定日:2026年11月</p>
    </main>
  );
}
