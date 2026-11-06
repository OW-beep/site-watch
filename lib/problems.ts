// 読者の「困りごと」から、解決できるページへ案内するためのデータ。
// links の文字列は記事のスラッグ。{href,label} はシート・ツールなどへのリンク。
export type PLink = string | { href: string; label: string };
export type Problem = { q: string; a: string; links: PLink[] };

export const PROBLEMS: Problem[] = [
  { q: "検索やAIに頼りすぎて、自分で考えなくなった気がする", a: "答えをもらう前と後は、自分の頭の出番。問う・分ける・確かめる力を残す。", links: ["digital-ni-makenai-atama", "atama-no-taiso-10sen", "ai-ni-makaseru-sakaime-3"] },
  { q: "通勤中や待ち時間に、スマホ以外で頭を使いたい", a: "紙もペンもいらない頭の体操を、1つだけやってみる。", links: ["atama-no-taiso-10sen", "kotoba-asobi-taiso", "suuji-asobi-taiso", "ansan-3kufu"] },
  { q: "家族や友達と、スマホなしで遊べる頭の体操を探している", a: "道具いらず。出題・回答型の遊びを、食卓や車の中で。", links: ["kazoku-taiso", "kotoba-asobi-taiso"] },
  { q: "考えがまとまらない。頭の中がごちゃごちゃする", a: "まず紙に、3分だけ書き出す。整理は、そのあとで。", links: ["kakidashi-memo-a4", "mittsu-no-toi", { href: "/sheets", label: "書き出しメモ用紙(印刷)" }, "pen-erabi-5point"] },
  { q: "何から手をつければいいか分からない", a: "やることを書き出し、判断軸と重みで優先順位をつける。", links: ["kami-techo-hantoshi", "kadai-sekkei-helpdesk", { href: "/tools/hikaku", label: "判断軸×重みの比較ツール" }] },
  { q: "どれを選べばいいか決められない", a: "比べる基準(判断軸)を先に決めて、点数にする。", links: ["hikkoshi-hanteijiku", "note-erabi-5kijun", { href: "/tools/hikaku", label: "判断軸×重みの比較ツール" }] },
  { q: "今日の夕飯など、毎日の小さな決めごとで迷う", a: "選ぶより先に、条件で候補を外す。", links: ["yuhan-kondate-shiboru"] },
  { q: "スマホを見すぎてしまう", a: "やめるのでなく、置く場面と使う場面を決める。", links: ["smartphone-oku-2shukan", "datsudeji-toha-5-kata"] },
  { q: "AIに頼りすぎていないか不安。AIの答えが正しいか分からない", a: "任せる作業と残す判断を分け、答えは3つの質問で確かめる。", links: ["ai-ni-makaseru-sakaime-3", "ai-kiku-kotsu", "ai-shiki-7step", { href: "/tools/ai-shiwake", label: "AIに任せる/残す仕分けツール" }] },
  { q: "曖昧な依頼や、無理な依頼を受けて困っている", a: "聞き返すか、仮定で進めるかを決め、できる形に分解して返す。", links: ["kikikaeshi-or-kari", "mujinan-uriage-2bai", "kadai-sekkei-helpdesk"] },
  { q: "数字の見当がつかない。見積もりが苦手", a: "分けて掛け算し、範囲で答える。練習問題で慣れる。", links: ["fermi-nyumon-gohan", "fermi-renshu-10sen", "fermi-jissen-cafe"] },
  { q: "電気代・水道代・スマホ代が、先月より急に上がった", a: "原因を想像する前に、請求書を分けて、どこが増えたかを数字で探す。", links: ["denkidai-logic-tree", "suidodai-kyuu-ni-agatta", "smahodai-kyuu-ni-agatta"] },
  { q: "売上や電気代が増減した原因が分からない", a: "原因を考える前に、どこが変わったかを数字で探す。", links: ["logic-tree-uriage", "denkidai-logic-tree", "kasetsu-shiko-pyramid"] },
  { q: "本を読んでも、身についている気がしない", a: "読み終わって5分以内に、自分の言葉で1行書く。", links: ["dokusho-mae-no-toi", "dokusho-note-3gyo", "dokusho-note-1gyo", "san-gyo-yoyaku"] },
  { q: "手帳・日記・読書ノートが増えて、管理が負担になっている", a: "入れ物を増やすより、役割をはっきりさせる。まず1つ減らす。", links: ["note-wakeru-matomeru", "kami-techo-hantoshi", "note-erabi-5kijun"] },
  { q: "会議や打ち合わせで、話がかみ合わない", a: "決まっていること・いないこと・担当・期限の4項目に書き出す。", links: ["genba-kaigi-mae-junbi", "genba-kakidashi-4koumoku", "genba-furikaeri-3ten"] },
  { q: "頼まれたことと、違うものを作ってしまった(作り直しが多い)", a: "すぐ作業せず、目的・成果物・期限・期待水準の4点を確認する。", links: ["genba-irai-kakunin", "kikikaeshi-or-kari"] },
  { q: "資料が文字だらけになる。結論が伝わらない", a: "いきなり作らず、箇条書きから。結論を冒頭に、詳細は補足に。", links: ["genba-shiryo-matome", "san-gyo-yoyaku"] },
  { q: "複数の作業が並行して、どこが止まっているか分からない", a: "管理表に最低限の項目を。止まっている作業と、その理由を見る。", links: ["genba-mieruka", "genba-saisho-ni-totonoeru"] },
  { q: "日記や手帳を始めたいが、続かない", a: "毎日を目標にしない。書けない日は飛ばしてよいと決める。", links: ["tegaki-nikki-3kagetsu", "tegaki-nikki-30nichi-start", { href: "/sheets", label: "30日チェック表(印刷)" }] },
  { q: "地頭を鍛えたい。何から始めればよいか分からない", a: "1分の稽古から。やさしい順に10の稽古を並べました。", links: ["4shukan-plan", "jiatama-keiko-10sen", "sakini-yoso-1pun", { href: "/training", label: "稽古メニュー(レベル別)" }] },
];
