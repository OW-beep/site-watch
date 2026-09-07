# さいとうぉっち

9サイト（yorozuya-it、civic-scope-funabashi、japan-data-site、wakutan、solo-stack-five、
loophole-games、nexiary-phi、data-mikke-lab、bookhome.jp）の運営状況を一望する、社内向け
ダッシュボードです。フェーズ1（静的データ・手動更新）の状態でVercelにデプロイできます。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

## デプロイ手順（他サイトと同じVercel/GitHub運用）

1. このフォルダの中身をGitHubリポジトリにpush
2. Vercelでリポジトリをインポート（Next.jsは自動検出されます）
3. Vercelの Project Settings → Environment Variables で以下を設定（社内限定にするため）
   - `SITE_USER`：ダッシュボードのBasic認証用ユーザー名
   - `SITE_PASS`：同パスワード
4. デプロイ完了後、設定したユーザー名・パスワードでアクセスできます

`SITE_USER` / `SITE_PASS` を設定しない場合、`middleware.ts`は認証をスキップします
（ローカル開発用）。Vercelの「Deployment Protection」機能を使う場合は、`middleware.ts`を
削除してそちらだけで保護してもかまいません。

## データの更新方法（フェーズ1・手動）

`data/sites.ts` を直接編集します。

- `clicksWeekly` / `impressionsWeekly`：Search Consoleのエクスポートから週次の値を転記
- `ctr` / `avgPos`：直近の実績値に更新
- `log`：各サイトの開発ログファイル（`*_history.md`）から要約して追記
- `connection` / `lastSync`：手動運用の場合は`"connected"`のまま、更新した日付を`lastSync`に書く

編集後はコミット＆pushすればVercelが自動的に再デプロイします。

## 今後（フェーズ2）の予定

`app/connections/page.tsx` に実装メモをまとめています。Search Console APIのOAuth連携と
週次バッチ同期を組む際は、`data/sites.ts` の型定義（`Site`型）をなるべく崩さずに、
DBからこの形のデータを返すように置き換えていく想定です。
