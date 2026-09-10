import { Site, sum } from "@/data/sites";

export type Readiness = "ready" | "almost" | "blocked" | "rejected";

export type MonetizationPlan = {
  readiness: Readiness;
  title: string;
  color: string;
  actions: string[];
  clicks: number;
  impressions: number;
  articles: number | null;
};

const READINESS_ORDER: Record<Readiness, number> = {
  ready: 0,
  almost: 1,
  blocked: 1,
  rejected: 2,
};

function parseArticleCount(scale: string): number | null {
  const m = scale.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function getAdsenseEntry(site: Site) {
  return site.monetization.find((m) => m.label.includes("AdSense"));
}

export function buildMonetizationPlan(site: Site): MonetizationPlan {
  const clicks = sum(site.clicksWeekly);
  const impressions = sum(site.impressionsWeekly);
  const articles = parseArticleCount(site.scale);
  const adsense = getAdsenseEntry(site);
  const detail = adsense?.detail ?? "";
  const rejectedMultiple = /複数回/.test(detail);
  const rejectedOnce = !rejectedMultiple && /却下/.test(detail);
  const indexIssue = /インデックス未登録|未インデックス/.test(site.note);

  const actions: string[] = [];
  let readiness: Readiness;
  let title: string;
  let color: string;

  if (rejectedMultiple) {
    readiness = "rejected";
    title = "記事追加よりも、実績づくりを優先すべき段階";
    color = "#F0576B";
    actions.push("分析の切り口や記事構成を記事ごとに変えて量産感を避ける（量産コンテンツ検知チェッカーで定期チェック）");
    actions.push("SNSや外部メディアなど、SEO以外の露出経路を並行して育てる");
    actions.push(`直近8週のクリックは${clicks}件。ここが明確に増えてから再申請のタイミングを検討する`);
  } else if (indexIssue) {
    readiness = "blocked";
    title = "先に技術的な問題（インデックス）を解消する段階";
    color = "#F5A623";
    actions.push("Search Consoleの「ページ」レポートで未インデックスの原因を確認する（Vercel/Next.js SEOトラブル診断も活用）");
    actions.push("内部リンク・サイトマップ・被リンクでクロール経路を増やす");
    actions.push("未インデックスが解消してからAdSense申請可能性チェッカーで改めて判定する");
  } else if (clicks < 5) {
    readiness = "almost";
    title = "申請前に、まずクリック実績を底上げする段階";
    color = "#F5A623";
    actions.push(`直近8週のクリックは${clicks}件・表示回数は${impressions}件。週に複数クリックが安定して出る状態を目指す`);
    actions.push("内部リンクや関連記事の追加で、検索結果からの実クリックを増やす");
    actions.push(
      articles !== null && articles < 30
        ? "記事数もまだ少なめ。ニッチだが検索需要のあるテーマを増やす"
        : "記事数は十分あるので、SNS・被リンクなど露出経路を増やす方が効果的"
    );
  } else if (rejectedOnce) {
    readiness = "almost";
    title = "却下歴を踏まえて、再挑戦の準備をする段階";
    color = "#F5A623";
    actions.push("前回却下時から記事数・トラフィックがどれだけ伸びたかを確認する");
    actions.push("プライバシーポリシー・お問い合わせページなど、審査の定番項目を再確認する");
    actions.push(`直近8週のクリックは${clicks}件まで回復。増加傾向が続くか数週間様子を見てから再申請する`);
  } else {
    readiness = "ready";
    title = "申請を検討できる段階";
    color = "#34D399";
    actions.push("プライバシーポリシー・お問い合わせページなど、審査で見られる基本項目を確認する");
    actions.push("申請直前に大きなデザイン変更を入れず、安定した状態で審査を受ける");
    actions.push("AdSense合格可能性チェッカーで細かい実績（インデックス状況など）も併せて確認する");
  }

  return { readiness, title, color, actions, clicks, impressions, articles };
}

export function comparePlanUrgency(a: MonetizationPlan, b: MonetizationPlan) {
  return READINESS_ORDER[a.readiness] - READINESS_ORDER[b.readiness];
}
