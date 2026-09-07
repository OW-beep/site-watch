export type MonetizationEntry = {
  label: string;
  detail: string;
  state: "active" | "pending" | "todo" | "blocked";
};

export type LogEntry = {
  date: string;
  text: string;
};

export type Tone = "moss" | "brass" | "rust" | "paper";
export type Connection = "connected" | "expired" | "disconnected";

export type Site = {
  id: string;
  name: string;
  url: string;
  kind: string;
  status: string;
  tone: Tone;
  color: string;
  ctr: number;
  avgPos: number;
  scale: string;
  clicksWeekly: number[];
  impressionsWeekly: number[];
  monetization: MonetizationEntry[];
  note: string;
  connection: Connection;
  lastSync: string;
  hedgehogPos: { x: number; y: number };
  log: LogEntry[];
};

export const WEEKS = ["7/6", "7/13", "7/20", "7/27", "8/3", "8/10", "8/17", "8/24"];

export const SITES: Site[] = [
  {
    id: "yorozuya-it",
    name: "よろずやIT",
    url: "yorozuya-it.vercel.app",
    kind: "ITブログ",
    status: "AdSense合格・収益化模索中",
    tone: "moss",
    color: "#6C6BF5",
    ctr: 2.58,
    avgPos: 50.9,
    scale: "209記事",
    clicksWeekly: [4, 4, 5, 5, 6, 6, 6, 6],
    impressionsWeekly: [120, 130, 145, 150, 165, 175, 190, 201],
    monetization: [
      { label: "AdSense", detail: "合格（サブドメイン）", state: "active" },
      { label: "有料PDFツール", detail: "Stripe連携済み・検証中", state: "pending" },
    ],
    note: "サブドメインのままAdSense合格。独自ドメイン取得は保留し、コンテンツの質で勝負する方針。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 50, y: 50 },
    log: [
      { date: "2026-08-23", text: "ニッチ記事2本を追加し209記事に。直後にサンドボックス障害が発生したが直前のZIPから復旧。" },
      { date: "フェーズ2", text: "「結論ボックス」を28記事に導入。AdSense審査は合格、独自ドメイン取得は保留に。" },
      { date: "立ち上げ初期", text: "176記事時点でクロール遅延が発覚。新規ドメインのクロール予算不足が原因と判明。" },
    ],
  },
  {
    id: "civic-scope-funabashi",
    name: "CivicScope船橋",
    url: "civic-scope-funabashi.vercel.app",
    kind: "行政オープンデータ",
    status: "絶好調・AdSense未申請",
    tone: "brass",
    color: "#38BDB4",
    ctr: 2.22,
    avgPos: 8.8,
    scale: "22ダッシュボード",
    clicksWeekly: [3, 4, 4, 5, 5, 5, 6, 7],
    impressionsWeekly: [180, 195, 205, 220, 230, 245, 260, 275],
    monetization: [{ label: "AdSense", detail: "未申請", state: "todo" }],
    note: "9サイト中もっとも順位・CTRが良いのに、AdSense申請の検討がまだ抜けている。次の一手はここ。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 72, y: 50 },
    log: [
      { date: "直近", text: "Vercel Authenticationがsitemap.xmlをブロックしていた問題を発見・解消。" },
      { date: "その前", text: "SVGアイソメトリックのエリアマップを実装、22ダッシュボードに到達。" },
      { date: "進行中", text: "MapLibre GL JSで実地図機能を試験導入。学校・公園の座標化を国土地理院APIで進行中。" },
    ],
  },
  {
    id: "japan-data-site",
    name: "japan-data-site",
    url: "japan-data-site.vercel.app",
    kind: "人口統計データ",
    status: "要対応・インデックス滞留",
    tone: "rust",
    color: "#F0576B",
    ctr: 0.98,
    avgPos: 12.0,
    scale: "22ランキング・32記事",
    clicksWeekly: [7, 8, 6, 8, 7, 8, 6, 7],
    impressionsWeekly: [820, 840, 810, 860, 830, 845, 800, 830],
    monetization: [{ label: "AdSense", detail: "却下歴あり・再申請保留", state: "blocked" }],
    note: "コンテンツはやり切った。自治体ページ約1,900件が長期間未インデックスなのが最大のボトルネック。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 36, y: 83 },
    log: [
      { date: "直近", text: "自治体比較ツール（/compare）を実装。16項目を横並び比較できるツールを追加。" },
      { date: "その前", text: "買い物難民ランキングを公開。「郊外ニュータウンの方が深刻」という発見あり。" },
      { date: "継続課題", text: "自治体ページ約1,900件が「検出 - インデックス未登録」のまま長期滞留。" },
    ],
  },
  {
    id: "wakutan",
    name: "わくたん",
    url: "wakutan.vercel.app",
    kind: "知育・子育てブログ",
    status: "意図的に集客優先（AdSense保留）",
    tone: "paper",
    color: "#8B95F6",
    ctr: 4.95,
    avgPos: 46.7,
    scale: "53記事",
    clicksWeekly: [0, 1, 1, 0, 1, 1, 0, 1],
    impressionsWeekly: [15, 18, 14, 16, 17, 15, 19, 16],
    monetization: [
      { label: "AdSense", detail: "却下", state: "blocked" },
      { label: "YouTube Shorts", detail: "運用中", state: "active" },
    ],
    note: "『今は稼がない』が正しい判断。3年前のBloggerでの却下経験から、集客実績を先に積む方針。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 89, y: 12 },
    log: [
      { date: "方針転換", text: "AdSense却下を受け、3年前のBloggerサイトとの共通点（訪問者数の少なさ）を分析。" },
      { date: "コンテンツ改善", text: "運営者の実体験を反映した「わが家での工夫」ボックスを6記事に導入。" },
      { date: "継続中", text: "YouTube Shortsチャンネルを運用し、集客優先フェーズへ軸足を移動。" },
    ],
  },
  {
    id: "solo-stack-five",
    name: "SoloStack",
    url: "solo-stack-five.vercel.app",
    kind: "フリーランス向けツール比較（英語）",
    status: "被リンク施策中（海外市場）",
    tone: "brass",
    color: "#F5A623",
    ctr: 0.41,
    avgPos: 45.1,
    scale: "46記事",
    clicksWeekly: [1, 1, 2, 1, 2, 1, 2, 2],
    impressionsWeekly: [280, 300, 310, 330, 340, 350, 360, 380],
    monetization: [{ label: "被リンク施策", detail: "Connectively（旧HARO）", state: "pending" }],
    note: "英語圏・競合が強い市場。被リンクで権威性を地道に積み上げている段階。即効性は期待できない。",
    connection: "expired",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 33, y: 16 },
    log: [
      { date: "進行中", text: "Connectively（旧HARO）への登録戦略を策定。記者向けの回答テンプレートも用意。" },
      { date: "施策", text: "『適正単価の決め方』記事にインタラクティブな料金計算機を実装、被リンク誘発を狙う。" },
      { date: "技術修正", text: "public/robots.txtの重複問題を修正し、正しいドメインを参照するよう統一。" },
    ],
  },
  {
    id: "loophole-games",
    name: "Loophole Games",
    url: "loophole-games.vercel.app",
    kind: "デイリーパズルゲーム",
    status: "AdSense本命・トラフィック不足",
    tone: "rust",
    color: "#C2839F",
    ctr: 4.92,
    avgPos: 26.4,
    scale: "49ゲーム",
    clicksWeekly: [0, 1, 0, 1, 0, 1, 0, 1],
    impressionsWeekly: [7, 8, 6, 9, 8, 9, 7, 10],
    monetization: [
      { label: "A8.net", detail: "運用中", state: "active" },
      { label: "楽天／ロリポップ", detail: "バナー設置", state: "active" },
      { label: "AdSense", detail: "方針決定・未申請", state: "todo" },
    ],
    note: "コンテンツは合格ライン。Reddit・Show HN等への配信チャネル投稿が唯一の未着手タスク。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 85, y: 48 },
    log: [
      { date: "方針決定", text: "AdSenseを収益化の本命に決定。アフィリエイト（A8.net）は現状維持で温存。" },
      { date: "整備", text: "49ゲームに到達。World Data Duelの特別扱いを撤去しサイト全体をアーケード風に統一。" },
      { date: "準備中", text: "Boo Rush・Noodle CatのSNS投稿文を作成。配信チャネルへの投稿はまだ未実施。" },
    ],
  },
  {
    id: "nexiary-phi",
    name: "Nexiary",
    url: "nexiary-phi.vercel.app",
    kind: "ガジェットレビューブログ",
    status: "安定運用・新機能検証中",
    tone: "moss",
    color: "#34D399",
    ctr: 5.36,
    avgPos: 45.3,
    scale: "案件記事14本",
    clicksWeekly: [0, 1, 1, 1, 0, 1, 1, 1],
    impressionsWeekly: [12, 14, 13, 15, 16, 15, 18, 17],
    monetization: [
      { label: "A8.net", detail: "案件14本", state: "active" },
      { label: "YouTube Shorts", detail: "運用中（動画9本）", state: "active" },
      { label: "Photo Analyzer", detail: "新機能・検討中", state: "pending" },
    ],
    note: "既存収益源（A8）は安定。新機能はブラウザ内無料モデルで検証してから課金判断する方針。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 13, y: 50 },
    log: [
      { date: "重要な発見", text: "サイトマップのドメイン設定がプレースホルダーのままだった問題を発見・修正。" },
      { date: "運用中", text: "A8提携記事14本を運用。YouTube Shortsでは動画⑨まで商品レビューを展開。" },
      { date: "検証中", text: "新機能「Photo Analyzer」を無料モデル（TensorFlow.js等）で実装できるか検証。" },
    ],
  },
  {
    id: "data-mikke-lab",
    name: "data-mikke-lab",
    url: "data-mikke-lab.vercel.app",
    kind: "データ分析ブログ",
    status: "AdSense却下×複数回・実績待ち",
    tone: "rust",
    color: "#E2846B",
    ctr: 8.96,
    avgPos: 18.5,
    scale: "64記事",
    clicksWeekly: [1, 1, 0, 1, 1, 1, 1, 1],
    impressionsWeekly: [7, 8, 6, 9, 8, 10, 9, 11],
    monetization: [{ label: "AdSense", detail: "却下×複数回", state: "blocked" }],
    note: "コード・コンテンツ面はやり切った。残る課題はサイトとしての実績（トラフィック・運用期間）のみ。",
    connection: "connected",
    lastSync: "手動更新（2026-08-30時点）",
    hedgehogPos: { x: 29, y: 50 },
    log: [
      { date: "率直な整理", text: "AdSense却下が続く中、原因は記事の書き方ではなくサイト全体の実績という見立てを共有。" },
      { date: "運用方針", text: "分析技法を記事ごとに変える（相関→PCA→最近傍→回帰残差）ことで量産感を回避。" },
      { date: "耐障害性", text: "サンドボックス障害を2回経験。いずれも直前のZIP納品から復旧し被害を回避。" },
    ],
  },
  {
    id: "bookhome",
    name: "BookHome",
    url: "bookhome.jp",
    kind: "家族の蔵書管理アプリ",
    status: "開発中・外部露出が先行",
    tone: "paper",
    color: "#5AA9E6",
    ctr: 0,
    avgPos: 14.0,
    scale: "9記事",
    clicksWeekly: [0, 0, 0, 0, 0, 0, 0, 0],
    impressionsWeekly: [0, 0, 1, 0, 1, 1, 0, 1],
    monetization: [
      { label: "楽天アフィリエイト", detail: "登録予定", state: "todo" },
      { label: "note.com", detail: "3本公開", state: "active" },
      { label: "YouTuber PR", detail: "タイアップ動画制作中", state: "pending" },
    ],
    note: "SEOより先にnote発信・YouTuberタイアップが動いている珍しい立ち上がり方。認証バグが1件未解決。",
    connection: "disconnected",
    lastSync: "未接続",
    hedgehogPos: { x: 64, y: 83 },
    log: [
      { date: "直近", text: "FAQ構造化データを追加、アプリ検索意図向けの9記事目を公開。サイトマップ送信も確認済み。" },
      { date: "マーケティング", text: "note.comで3本目の記事を公開。児童向けYouTube Shortsクリエイターとのタイアップ動画も制作。" },
      { date: "未解決", text: "認証コードの桁数不一致バグ（6桁想定→8桁生成）が解決しないまま残っている。" },
    ],
  },
];

export const STATUS: Record<Tone, { color: string; label: string }> = {
  moss: { color: "#34D399", label: "順調" },
  brass: { color: "#F5A623", label: "要対応" },
  rust: { color: "#F0576B", label: "停滞" },
  paper: { color: "#8B929B", label: "様子見" },
};

export const CONN_STATE: Record<Connection, { color: string; label: string }> = {
  connected: { color: "#34D399", label: "接続済み" },
  expired: { color: "#F5A623", label: "認可期限切れ" },
  disconnected: { color: "#8B929B", label: "未接続" },
};

export const MONEY_STATE: Record<MonetizationEntry["state"], { color: string; label: string }> = {
  active: { color: "#34D399", label: "稼働中" },
  pending: { color: "#F5A623", label: "検証中" },
  todo: { color: "#8B929B", label: "未着手" },
  blocked: { color: "#F0576B", label: "停止中" },
};

export const LOW_VOLUME_THRESHOLD = 8;

export function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}
export function growth(arr: number[]) {
  const a = sum(arr.slice(0, 4)) / 4;
  const b = sum(arr.slice(4)) / 4;
  if (a === 0) return b > 0 ? Infinity : 0;
  return ((b - a) / a) * 100;
}
