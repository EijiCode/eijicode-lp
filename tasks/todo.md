# UI刷新 第2弾: Prisma風シネマティックデザイン（2026-07-02）

ユーザー提供のPrismaスペック（黒×クリーム、動画Hero、巨大ワードマーク、pull-upテキスト）を
EijiCodeに翻案。配色は現行トークン維持（黒→navy、クリーム→text #e8eaf0、アクセントブルーは*やCheckに）。

## Plan

- [x] globals.css — @theme（--color-primary / --font-serif）、noise-overlay / bg-noise ユーティリティ追加
- [x] layout.tsx — Almarai + Instrument Serif italic を<link>で読込（AlmaraiはJPグリフ非対応→Noto Sans JPフォールバック）
- [x] components/icons.tsx — ArrowRight / Check をインラインSVG化（lucide-react依存を回避）
- [x] components/text/ — WordsPullUp / WordsPullUpMultiStyle / AnimatedLetters（スクロール連動文字リビール）
- [x] Hero — 動画背景 + インセット角丸コンテナ + 吊り下げナビピル + 巨大「EijiCode*」ワードマーク + ピルCTA
- [x] About（新規）— navy2カード、多スタイル見出し（"Eiji Tachikawa," はInstrument Serif italic）、文字単位スクロールリビール
- [x] Services — Featuresグリッド（動画カード + 01 Web制作 / 02 アプリ開発 / 03 AI導入支援、チェックリスト+Learn more）
- [x] Flow / Contact / Footer — 新ルックに合わせて微調整（mono除去、パネルnavy2、送信ボタンをクリームピル化）
- [x] page.tsx — Hero / About / Services / Flow / Contact / Footer 構成。SceneBackground / Header / Statement は不使用化
- [x] npm run build + SSRマーカー確認
- [x] Flow / Contact / Footer をPrismaトンマナに全面統一（ラベル+2行見出し、navy3フラットカード、ピルCTA、SectionHeader不使用化）

## Review

- ビルド成功（型チェック込み）。First Load JS 172kB → 154kB（Galaxy(ogl)/GSAP依存が外れたため）。
- Vite化はせずNext.js続行（contact API / SEOを維持）。framer-motion→導入済みのmotion/reactで代替。
- JPテキストはWordsPullUpMultiStyleで1文字ずつトークン化（スペース分割が効かないため）。SSR HTMLで
  連続文字列grepが効かないのは仕様。
- 未使用化: SceneBackground / Header(旧カードナビ) / Statement / Galaxy / ParticleCanvas / 旧エフェクト群 — ファイルは残置。
- 動画・アイコンはユーザー提供のcloudfront/higgs URLを直接参照。動画にはnavy寄せのトーン補正オーバーレイを追加。
- プレビュー: http://localhost:3987
