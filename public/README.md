# 脱デジ道場

手書きで鍛える、AI時代の考える力。Next.js(App Router)+ Tailwind + Markdown記事。

## 起動
```bash
npm install
cp .env.example .env.local   # 値を入れる
npm run dev                  # http://localhost:3000
```

## 記事の追加
`content/posts/スラッグ.md` を足すだけ。ファイル名がURLになります。
```markdown
---
title: "記事タイトル"
category: "稽古日誌"   # 入門 / 稽古日誌 / 地頭稽古 / AI対策道場 / 読書修行 / 道具箱
date: "2026-11-01"
excerpt: "一覧に出る要約"
belt: "white"          # white=入門 / blue=稽古中 / black=上級
tldr:
  - "今日の要点1"
---
## 見出し(##)が目次になります
```
- `noindex: true` を付けると、一覧・サイトマップに出ません(テンプレートは付いています)。
- 公開する記事には**図解を必ず1枚以上**入れます(`public/images/` にSVG、記事に `![説明](/images/xxx.svg)`)。入っていないと、ビルドが止まります。
- 難しい言葉は、`lib/glossary.ts` に説明を足すと、記事の「用語メモ」に自動で出ます。
- 図解は `scripts/diagrams.py` で作っています(`python3 scripts/diagrams.py`)。
- 記事の下書き用テンプレートは `docs/templates/` にあります(`content/posts/` に置くと公開されます)。

## Vercelへのデプロイ
1. GitHubにpush → Vercelで「Add New Project」
2. Settings → Environment Variables に `.env.example` の項目を登録
3. Domains に独自ドメインを追加し、`NEXT_PUBLIC_SITE_URL` を同じURLにして再デプロイ
※ 広告を載せる場合、Vercelは Pro プランが必要です(Hobbyは非商用のみ)。

## AdSense申請の順番
1. 記事を10〜20本公開し、運営者情報・プライバシーポリシー・お問い合わせを確認
2. Search Consoleに登録(このサイト専用のトークンを `NEXT_PUBLIC_GSC_VERIFICATION` へ)、sitemap.xml を送信
3. AdSenseで「サイトを追加」→ 申請
4. `NEXT_PUBLIC_ADSENSE_CLIENT` を設定すると、広告スクリプトと `/ads.txt` が自動で出ます
5. 承認後、広告ユニットIDを `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` に登録(記事末尾に表示)

## 公開日(date)について
- 記事の `date:` は、画面と検索エンジンに「公開日」として出ます。**実際に公開した日**に合わせてください。
- 未来の日付があると、ビルドが止まります(`scripts/check-posts.mjs`)。
