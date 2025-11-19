# AI-Teacher

AIの仕組みや構造を体系的に学べるオンライン教材サイトの設計リポジトリです。Foundation/Core/Advancedの3トラックで構成され、ロードマップ、インタラクティブ可視化、学習支援機能、コミュニティ要素を備えています。

## ディレクトリ構成

- `content/` — 各トラックのMarkdownテンプレートと外部リソース集。
- `data/quizzes.json` — 適応型クイズエンジン用の問題バンク。
- `public/examples/` — 可視化コンポーネントで利用するサンプルデータ。
- `src/components/` — レッスンレイアウト、Tipsパネル、可視化ウィジェット、コードプレイグラウンドなど。
- `src/features/` — 進捗管理ロジックや適応型クイズエンジン。
- `src/pages/` — ロードマップ、用語集、リソース集、コミュニティページなどのルーティングエントリ。

## 開発メモ

1. レッスンページでは`LessonLayout`に`BackpropCanvas`や`NotebookRunner`を遅延読み込みして活用します。
2. `ProgressTracker`はオンライン状態でAPI、オフライン時に`localStorage`を利用します。
3. Tipsやディスカッションは`/api`配下のバックエンドと連携する想定です。
