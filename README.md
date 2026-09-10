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

## 収益化ギミックと「完全無料」運用について

`/pricing`・`/playbooks`・`/account/referral`・`/account/api` など収益化まわりの画面は、
**追加コストゼロで動く前提**で実装しています。

- **決済は未接続のデモ動作**：「Proにアップグレード」「購入する」ボタンは、実際の課金は発生せず
  ブラウザのlocalStorageにフラグを立てるだけです。Stripe等の決済サービスは口座開設・月額費用は
  無料（売上発生時のみ手数料がかかる従量課金）なので、実際に課金したくなったタイミングで
  `app/pricing/page.tsx` の `handleCheckout` / `app/playbooks/page.tsx` の `buy` 関数を
  Stripe Checkout（`stripe`パッケージ＋APIルート追加）に差し替えれば有効化できます。
- **オーナー（あなた）は課金対象から除外**：現状の「Proにアップグレード」ボタンは決済と
  繋がっていないため、実は誰でも無料でPro化できてしまいます。あなた自身のVercelデプロイの
  環境変数に `NEXT_PUBLIC_OWNER_FREE_PRO=true` を設定すると、あなたのデプロイだけは常時Pro扱いになり、
  かつFreeへの切り替えもできなくなります（`lib/plan.tsx`参照）。
  - 注意：これはビルド時に埋め込まれる公開環境変数なので、「1つのデプロイ＝1人のオーナー」が
    前提です。将来、他の運営者にもアカウントを発行する本当のマルチテナントSaaSにする場合は、
    ログイン機能とサーバー側のユーザーごとのPro判定（DBが必要）に置き換えてください。
- **DBなし・追加インフラなし**：紹介コード（`/account/referral`）・APIキー（`/account/api`）・
  Pro状態（`lib/plan.tsx`）はすべてブラウザのlocalStorageのみで保持しています。サーバー側の
  データベースを一切使わないため、Vercelの無料枠（Hobbyプラン）だけで動きます。
  - トレードオフ：別ブラウザ・別端末からは同じ状態を参照できません。複数端末で共有したい場合は
    Vercel KV（Upstash Redis、無料枠あり）などを追加する必要があります。
- **投げ銭ボタン**：Buy Me a Coffee / Ko-fiなど、無料で開設できるサービスへのリンクに
  差し替える想定のプレースホルダーです（`components/Sidebar.tsx`の`href="#"`部分）。
- **URLサイト診断（`/api/site-checker`）**：外部サイトへのfetchのみで、外部の有料APIは
  使っていません。Vercelのサーバーレス関数の無料枠内で完結します。

まとめると、そのままVercelにデプロイするだけであれば**追加費用は一切発生しません**。
実際に課金を始めたくなったときだけ、Stripe等の無料アカウントを開設して上記の関数を
差し替えてください。
