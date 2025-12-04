# GitHub Copilot Instructions - Next.js Project Template

## Project Overview
このプロジェクトは、Next.jsを使用してフルスタックWebアプリケーションを構築します。

## Technical Specifications
- **使用言語**: JavaScript (優先) / TypeScript
- **言語選択方針**: やむを得ない事情がない限りJavaScriptを使用
- フレームワーク: Next.js 14+
- パッケージ管理: npm / yarn / pnpm
- 開発環境: Mac
- buildツール: Next.js内蔵
- **スタイリング**: CSS Modules (優先) / Tailwind CSS / Styled Components
- 状態管理: Zustand / Redux Toolkit
- データベース: Prisma / Drizzle
- 認証: NextAuth.js / Auth0
- デプロイ: Vercel / GitHub Pages
- 文字エンコーディング: UTF-8
- 国際化: next-i18next

## Project Structure
```
nextjs-project/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Route Groups
│   ├── api/               # API Routes
│   ├── globals.css
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Home Page
│   └── loading.tsx        # Loading UI
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   └── Button.module.css
│   │   └── Modal/
│   │       ├── Modal.js
│   │       └── Modal.module.css
│   └── layout/           # レイアウトコンポーネント
│       ├── Header/
│       │   ├── Header.js
│       │   └── Header.module.css
│       └── Footer/
│           ├── Footer.js
│           └── Footer.module.css
├── lib/                  # ユーティリティとヘルパー
├── hooks/                # カスタムフック
├── types/                # TypeScript型定義
├── styles/               # グローバルスタイル
├── public/               # 静的ファイル
├── prisma/               # データベーススキーマ
├── next.config.js        # Next.js設定
├── tailwind.config.js    # Tailwind設定
└── package.json
```

## Next.js Specific Conventions
- **言語選択**: やむを得ない事情がない限りJavaScriptを使用
- **スタイリング**: CSS Modulesを優先使用
- App Routerの使用を推奨
- Server ComponentsとClient Componentsの適切な使い分け
- ファイルベースルーティング
- API Routesの活用
- 画像最適化（next/image）
- フォント最適化（next/font）
- メタデータAPIの使用

## Component Patterns
```javascript
// Server Component
import styles from './ServerComponent.module.css';

async function ServerComponent() {
  const data = await fetchData(); // サーバーサイドでデータ取得
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>サーバーコンポーネント</h1>
      <div className={styles.content}>
        {/* データ表示 */}
      </div>
    </div>
  );
}

// Client Component
'use client';

import { useState } from 'react';
import styles from './ClientComponent.module.css';

function ClientComponent() {
  const [state, setState] = useState('');
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>クライアントコンポーネント</h1>
      <div className={styles.interactive}>
        {/* インタラクティブな要素 */}
      </div>
    </div>
  );
}
```

## API Routes
```javascript
// app/api/users/route.js
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // データ取得処理
    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'データ取得エラー' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // データ作成処理
    const newUser = await createUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '作成エラー' },
      { status: 400 }
    );
  }
}
```

## Performance Optimization
- Dynamic Importsの活用
- Image Optimizationの使用
- Static Generation (SSG) vs Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- Bundle Analyzerでの最適化確認

## Development Workflow
1. `npm create next-app@latest` - プロジェクト作成
2. `npm run dev` - 開発サーバー起動
3. `npm run build` - プロダクションビルド
4. `npm run start` - プロダクションサーバー起動
5. `npm run lint` - ESLint実行

## SEO and Metadata
```javascript
// app/page.js
export const metadata = {
  title: 'ページタイトル',
  description: 'ページの説明',
  keywords: 'キーワード1, キーワード2',
  openGraph: {
    title: 'OGタイトル',
    description: 'OG説明',
    images: ['/og-image.jpg'],
  },
};
```

## 学習のポイント
- Next.jsの基本概念とApp Router
- Server Components vs Client Components
- ファイルベースルーティング
- データフェッチング戦略
- 画像とパフォーマンス最適化
- SEOとメタデータ管理
