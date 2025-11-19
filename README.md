# AI-Teacher

AIの仕組みや構造を体系的に学べるオンライン教材サイトの設計リポジトリです。Foundation/Core/Advancedの3トラックで構成され、ロードマップ、インタラクティブ可視化、学習支援機能、コミュニティ要素を備えています。`public/`配下にはブラウザで直接開ける静的サイトを用意しました。

## ディレクトリ構成

- `public/index.html` — 静的な学習サイト本体。ブラウザで直接開くか`npx serve public`などで配信できます。
- `public/app.js` / `public/styles.css` — トラック表示、進捗管理、可視化、クイズなどの実装。
- `public/data/quizzes.json` — 適応型クイズエンジン用の問題バンク。
- `public/examples/` — 可視化コンポーネントで利用するサンプルデータ。
- `content/` — 各トラックのMarkdownテンプレートと外部リソース集。
- `src/` — React/TypeScriptでの実装アイデアを蓄積した試作コード（静的サイト化後も参照用に残しています）。

## 開発メモ

1. `public/index.html`をブラウザで開くと、可視化ラボ、進捗管理、適応型クイズ、コミュニティなどすべてのセクションを確認できます。
2. 開発時にライブリロードしたい場合は`npm install -g serve`後に`serve public`を実行してください。
3. 既存の`src/`配下コードや`content/`テンプレートは、将来のフレームワーク実装時の参考情報として維持しています。
