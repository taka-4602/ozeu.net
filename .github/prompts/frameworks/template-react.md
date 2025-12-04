# GitHub Copilot Instructions - React Project Template

## Project Overview
このプロジェクトは、Reactを使用してモダンなウェブアプリケーションを構築します。

## Technical Specifications
- **使用言語**: JavaScript (優先) / TypeScript
- **言語選択方針**: やむを得ない事情がない限りJavaScriptを使用
- フレームワーク: React 18+
- パッケージ管理: npm / yarn
- 開発環境: Mac
- buildツール: Vite / Create React App
- **スタイリング**: CSS Modules (優先) / Styled Components / Tailwind CSS
- 状態管理: useState / useReducer / Redux Toolkit / Zustand
- テスト: Jest + React Testing Library
- 文字エンコーディング: UTF-8
- 国際化: 日本語 (ja) デフォルト

## Project Structure
```
react-project/
├── src/
│   ├── components/       # 再利用可能なコンポーネント
│   │   ├── ui/          # 基本UIコンポーネント
│   │   │   ├── Button/
│   │   │   │   ├── Button.js
│   │   │   │   └── Button.module.css
│   │   │   └── Modal/
│   │   │       ├── Modal.js
│   │   │       └── Modal.module.css
│   │   └── layout/      # レイアウトコンポーネント
│   │       ├── Header/
│   │       │   ├── Header.js
│   │       │   └── Header.module.css
│   │       └── Footer/
│   │           ├── Footer.js
│   │           └── Footer.module.css
│   ├── pages/           # ページコンポーネント
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.module.css
│   │   └── About/
│   │       ├── About.js
│   │       └── About.module.css
│   ├── hooks/           # カスタムフック
│   ├── context/         # Reactコンテキスト
│   ├── utils/           # ユーティリティ関数
│   ├── styles/          # グローバルスタイル
│   │   ├── globals.css  # リセットCSS等
│   │   └── variables.css # CSS変数
│   ├── assets/          # 静的ファイル
│   ├── App.js
│   ├── App.module.css
│   └── index.js
├── public/
├── tests/
└── package.json
```

## React Specific Conventions
- **言語選択**: やむを得ない事情がない限りJavaScriptを使用
- **スタイリング**: CSS Modulesを優先使用
- コンポーネント名はPascalCase
- ファイル名は`ComponentName.js` + `ComponentName.module.css`
- propsの型定義はPropTypesライブラリまたはJSDoc
- 関数コンポーネントの使用を基本とする
- Hooksの適切な使用
- useEffectの依存配列を正しく設定
- メモ化（useMemo, useCallback）の適切な使用
- イベントハンドラーは`handle`で始める

## CSS Modules使用方針
- 各コンポーネントに対応する`.module.css`ファイルを作成
- グローバルスタイルは最小限に抑制
- BEMライクな命名規則をCSS Modules内で使用
- CSS変数を活用したテーマ管理

## Component Structure
```javascript
// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

/**
 * 再利用可能なボタンコンポーネント
 * 様々なバリエーションのボタンを提供
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}) => {
  // ボタンのクラス名を動的に生成
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  /**
   * クリックイベントハンドラー
   * 無効状態では処理を行わない
   */
  const handleClick = (event) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <button 
      className={buttonClass}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

// PropTypesによる型チェック
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
```

```css
/* Button.module.css */
.button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
}

.button:focus {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* サイズバリエーション */
.small {
  padding: 6px 12px;
  font-size: 12px;
}

.medium {
  padding: 8px 16px;
  font-size: 14px;
}

.large {
  padding: 12px 24px;
  font-size: 16px;
}

/* カラーバリエーション */
.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover:not(.disabled) {
  background-color: #0056b3;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.secondary:hover:not(.disabled) {
  background-color: #545b62;
}

.danger {
  background-color: #dc3545;
  color: white;
}

.danger:hover:not(.disabled) {
  background-color: #c82333;
}

.disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.65;
}
```

## CSS Modules Best Practices
```css
/* ComponentName.module.css */

/* CSS変数を使用した統一されたテーマ */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --border-radius: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}

/* コンポーネントのベーススタイル */
.container {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

/* BEMライクな命名規則 */
.header {
  margin-bottom: var(--spacing-lg);
}

.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.header__subtitle {
  font-size: 1rem;
  color: var(--secondary-color);
  margin-top: var(--spacing-sm);
}

/* 状態を表すクラス */
.card {
  border: 1px solid #ddd;
  padding: var(--spacing-md);
  transition: box-shadow 0.2s ease;
}

.card--active {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
}

.card--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-sm);
  }
  
  .header__title {
    font-size: 1.25rem;
  }
}
```

## Hooks Guidelines
```javascript
// コンポーネント内でのCSS Modules使用
import styles from './Card.module.css';

const Card = ({ title, content, isActive, isDisabled }) => {
  // 条件に応じたクラス名の組み合わせ
  const cardClass = [
    styles.card,
    isActive ? styles['card--active'] : '',
    isDisabled ? styles['card--disabled'] : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.header__title}>{title}</h2>
      </header>
      <div className={cardClass}>
        {content}
      </div>
    </div>
  );
};
```
- `useState`: 単純な状態管理
- `useEffect`: 副作用の処理
- `useContext`: グローバル状態の参照
- `useMemo`: 重い計算結果のメモ化
- `useCallback`: 関数のメモ化
- `useReducer`: 複雑な状態管理
- カスタムフック: ロジックの再利用

## Development Workflow
1. 開発サーバー起動: `npm run dev`
2. コンポーネントの開発とテスト
3. Storybookでの単体確認（使用時）
4. テスト実行: `npm test`
5. ビルド: `npm run build`

## Performance Considerations
- 不必要な再レンダリングの防止
- React.memoの適切な使用
- 仮想化（react-window）の検討
- 遅延ローディング（lazy loading）
- バンドルサイズの最適化

## 学習のポイント
- Reactの基本概念（コンポーネント、state、props）
- Hooksの理解と使用方法
- コンポーネントのライフサイクル
- イベント処理
- 条件付きレンダリング
- リストレンダリング
- フォーム処理
