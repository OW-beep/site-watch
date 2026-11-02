export type Category = { slug: string; label: string; kanji: string; desc: string };
export const CATEGORIES: Category[] = [
  { slug: "nyumon", label: "入門", kanji: "入", desc: "脱デジを始める人のための基本の「型」。" },
  { slug: "keiko", label: "稽古日誌", kanji: "稽", desc: "手書き日記30日、スマホ断ち1週間。やってみた記録。" },
  { slug: "jiatama", label: "地頭稽古", kanji: "頭", desc: "書き出し、要約、問いの立て方。考える力の基礎トレ。" },
  { slug: "ai", label: "AI対策道場", kanji: "AI", desc: "AIに任せること、自分で考えること。その線引き。" },
  { slug: "dokusho", label: "読書修行", kanji: "読", desc: "紙の本の読み方、読書ノート、書評。" },
  { slug: "genba", label: "現場メモ", kanji: "現", desc: "仕事の現場で使っている考え方の記録。" },
  { slug: "dogubako", label: "道具箱", kanji: "具", desc: "ペン、ノート、手帳。稽古に使う道具たち。" },
];
export const getCategoryByLabel = (l: string) => CATEGORIES.find((c) => c.label === l);
export const getCategoryBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s);
