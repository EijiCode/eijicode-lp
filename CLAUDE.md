## デザイン設計

### コンセプト

- ダークネイビー基調の洗練されたデザイン
- 岐阜エリアの中小企業オーナーに「信頼感・技術力・先進性」を伝える
- モーションとインタラクションで他社との差別化を図る

### カラーパレット

- ベース: ダークネイビー（#0a0f1e 系）
- アクセント: 電気系ブルー〜パープル
- テキスト: ホワイト系

### タイポグラフィ

- フォント: IBM Plex Sans / IBM Plex Mono

### UIエフェクト

- パーティクルcanvas背景
- グリッチエフェクト（テキスト）
- TrueFocusナビゲーション

### Heroセクション（重要）

- モーションを多用したリッチなHeroセクションにする
- 参考サイト1: https://motionsites.ai/（全体的なモーションの方向性）
- 参考サイト2: https://reactbits.dev/（使用するコンポーネントライブラリ）
- React Bitsのコンポーネントを積極的に活用する
  - Text Animations（Split Text / Blur Text / Shiny Text等）
  - Backgroundsカテゴリのアニメーション背景
  - Animationsカテゴリのエフェクト
- インストール: `npm install @reactbits/ui` または各コンポーネントのコードをコピー
- Next.js / Tailwind CSS v4との互換性を確認しながら実装する

### ページ構成

- Hero（キャッチコピー + モーション + CTA）
- サービス紹介
- 実績・事例
- 料金
- お問い合わせ
