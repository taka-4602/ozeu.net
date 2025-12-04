# GitHub Copilot Instructions - JavaScript/TypeScript Project Template

## Project Overview
このプロジェクトは、JavaScript/TypeScriptを使用して[目的]を実現するアプリケーションです。

## Technical Specifications
- **使用言語**: JavaScript ES2020+ (優先) / TypeScript 4.8+
- **言語選択方針**: やむを得ない事情がない限りJavaScriptを使用
- TypeScriptは大規模プロジェクトや型安全性が特に重要な場合のみ
- フレームワーク: [React/Vue.js/Angular/Express/Next.js/その他]
- パッケージ管理: npm / yarn / pnpm
- 開発環境: Mac
- buildツール: Webpack / Vite / Rollup
- テスト: Jest / Vitest / Cypress
- 文字エンコーディング: UTF-8
- 国際化: 日本語 (ja) デフォルト

## Project Structure
```
project/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── types/          # TypeScript型定義
│   └── index.ts
├── tests/
├── public/
├── docs/
├── package.json
├── tsconfig.json       # TypeScriptの場合
├── .eslintrc.js
└── README.md
```

## Coding Conventions
- 使用言語: JavaScript/TypeScript
- 日本語でコメント文を記述
- 絵文字の使用禁止（コード内、コメント内、回答内すべて）
- ESLint + Prettierによるコード品質管理
- 関数、クラスごとにJSDocコメントを記述
- インデント: スペース2つ
- セミコロン必須
- 変数名、関数名はcamelCase
- クラス名、型名はPascalCase
- 定数はUPPER_SNAKE_CASE
- ファイル名はkebab-case

## JavaScript/TypeScript Specific Guidelines
- **言語選択**: やむを得ない事情がない限りJavaScriptを使用
- TypeScriptは型安全性が特に重要な大規模プロジェクトでのみ使用
- `const` > `let` > `var`の優先順位
- アロー関数の適切な使用
- 分割代入（Destructuring）の活用
- テンプレートリテラルの使用
- async/awaitによる非同期処理
- TypeScript使用時は型定義を明確に記述
- `any`型の使用を避け、適切な型を指定

## JavaScript優先の理由
- シンプルで学習コストが低い
- 型システムによる複雑化を避ける
- 開発速度の向上
- 小〜中規模プロジェクトでは十分な型安全性

## Development Environment
- 開発環境: M2MacBook
- ユーザーネーム: hiro
- Node.js v18以上の使用を推奨
- プロジェクト保存場所: /Users/hiro/Documents/[プロジェクト名]

## Development Workflow
1. 依存関係のインストール: `npm install`
2. 開発サーバー起動: `npm run dev`
3. テスト実行: `npm test`
4. ビルド: `npm run build`
5. リンター実行: `npm run lint`

## Common Commands
```bash
# プロジェクト初期化
npm init -y

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm test

# ビルド
npm run build

# リンター実行
npm run lint

# 型チェック（TypeScriptの場合）
npx tsc --noEmit
```

## 学習のポイント
- ES6+の新機能の理解
- 非同期プログラミングの概念
- モジュールシステムの理解
- DOM操作（フロントエンドの場合）
- TypeScriptの型システム理解（使用時）
- デバッグツールの活用
