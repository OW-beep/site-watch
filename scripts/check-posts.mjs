// 公開する記事(noindexでないもの)には、必ず図解を1枚以上入れるためのチェックです。
// 図解のない記事、画像ファイルが存在しない記事があると、ビルドを止めます。
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content/posts");
const errors = [];
// 未来の日付(日本時間とのずれを見て、明日まで許容)があると止める
const now = process.env.TODAY ? new Date(process.env.TODAY) : new Date();
const limit = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  const text = fs.readFileSync(path.join(dir, f), "utf8");
  const dm = text.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})/m);
  if (dm && dm[1] > limit) errors.push(`${f}: 公開日が未来です(${dm[1]})`);
  if (/^noindex:\s*true/m.test(text)) continue;
  const imgs = [...text.matchAll(/!\[([^\]]*)\]\((\/images\/[^)]+)\)/g)];
  if (/^##\s.*(練習問題|課題)/m.test(text) && !/<details>/.test(text)) errors.push(`${f}: 練習問題に回答例(<details>)がありません`);
  if (imgs.length === 0) errors.push(`${f}: 図解(![説明](/images/xxx.svg))がありません`);
  for (const [, alt, src] of imgs) {
    if (!alt.trim()) errors.push(`${f}: 画像の説明(alt)が空です: ${src}`);
    if (!fs.existsSync(path.join(process.cwd(), "public", src))) errors.push(`${f}: 画像ファイルがありません: ${src}`);
  }
}
if (errors.length) { console.error("\n図解チェックに失敗しました:\n- " + errors.join("\n- ") + "\n"); process.exit(1); }
console.log("図解チェック OK");
