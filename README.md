# Mission Now

KLMS(慶應のCanvas)の課題とコースを取り込み、1日の帯に自動で置くスケジュールアプリ。
データはブラウザの中だけに保存され、サーバーには何も送られません。

## GitHub Pagesで公開する

1. GitHubで新しいリポジトリを作る(例: `mission-now`)。公開先URLを自分だけの秘密にしたい場合でも、GitHub Pagesは誰でも見られる状態になります。データは各自のブラウザに入るので中身は漏れませんが、気になる場合はプライベートリポジトリ + 別のホスティングを検討してください。
2. このフォルダの中身(`index.html` `manifest.webmanifest` `sw.js` `icon-192.png` `icon-512.png` `apple-touch-icon.png` `.nojekyll`)をリポジトリの直下に置いてpushする。
3. リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして保存。
4. 数分待つと `https://<ユーザー名>.github.io/mission-now/` で開けます。

`.nojekyll` は、GitHub Pagesの変換処理を止めるための空ファイルです。消さないでください。

## スマホのホーム画面に追加する

- iPhone(Safari): 共有ボタン → 「ホーム画面に追加」
- Android(Chrome): メニュー → 「アプリをインストール」

追加すると、アドレスバーのないアプリとして開き、オフラインでも起動します。

## 注意点

- データはブラウザごとに別々です。PCとスマホは自動では同期しません。取り込みタブの「バックアップをコピー」で文字列をコピーし、もう片方の端末の貼り付け欄に入れると移せます。
- 通知はまだありません。
- 時限の時刻は慶應の標準(1限9:00〜)、課題を置く時間帯は8:00〜23:00を前提にしています。変えるときは `index.html` 内の `PERIODS` と `ACT_START` / `ACT_END` を編集してください。

## アプリを更新したとき

`index.html` を書き換えてpushしたあと、`sw.js` の1行目付近にある `VERSION` の数字を1つ上げてください(`v1` → `v2`)。古いキャッシュが残って、更新が反映されないのを防げます。
