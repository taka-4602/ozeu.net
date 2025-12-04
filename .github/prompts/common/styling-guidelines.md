# スタイリング共通規約 - Common Styling Guidelines

## CSS/SCSS共通規約

### 基本原則
- **CSS Modules優先**: React/Vue.jsなどでのスタイリング
- **モジュラーCSS**: コンポーネント単位でのスタイル管理
- **BEMライクな命名**: CSS Modules内でのクラス命名
- **CSS変数活用**: テーマとカラーパレットの統一管理

### ファイル構成
```
styles/
├── globals.css          # グローバルスタイル
├── variables.css        # CSS変数定義
├── reset.css           # リセットCSS
└── components/         # コンポーネント別CSS
    ├── Button.module.css
    ├── Card.module.css
    └── Modal.module.css
```

### CSS Modules命名規則
```css
/* 推奨命名パターン */
.container { }              /* ベースコンテナ */
.header { }                /* セクション要素 */
.header__title { }         /* BEMライクな子要素 */
.header__subtitle { }      /* BEMライクな子要素 */
.button--primary { }       /* バリエーション */
.button--secondary { }     /* バリエーション */
.card--active { }          /* 状態クラス */
.card--disabled { }        /* 状態クラス */
```

### CSS変数の使用
```css
/* variables.css */
:root {
  /* カラーパレット */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  --color-light: #f8f9fa;
  --color-dark: #343a40;
  
  /* スペーシング */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* フォント */
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  /* レイアウト */
  --border-radius: 4px;
  --border-radius-lg: 8px;
  --border-width: 1px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* アニメーション */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### レスポンシブデザイン
```css
/* ブレークポイント */
@media (max-width: 576px) {
  /* モバイル */
}

@media (max-width: 768px) {
  /* タブレット */
}

@media (max-width: 992px) {
  /* ラップトップ */
}

@media (max-width: 1200px) {
  /* デスクトップ */
}
```

## フレームワーク別推奨設定

### React
```javascript
// CSS Modulesの使用例
import styles from './Component.module.css';
import classNames from 'classnames'; // 推奨ライブラリ

const Component = ({ isActive, size }) => {
  const componentClass = classNames(
    styles.component,
    {
      [styles['component--active']]: isActive,
    },
    styles[`component--${size}`]
  );
  
  return <div className={componentClass}>Content</div>;
};
```

### Vue.js
```vue
<template>
  <div :class="componentClass">Content</div>
</template>

<script>
export default {
  props: ['isActive', 'size'],
  computed: {
    componentClass() {
      return [
        this.$style.component,
        {
          [this.$style['component--active']]: this.isActive,
        },
        this.$style[`component--${this.size}`]
      ];
    }
  }
};
</script>

<style module>
.component { /* スタイル定義 */ }
.component--active { /* アクティブ状態 */ }
</style>
```

## アクセシビリティ

### カラーコントラスト
- WCAG AA準拠のコントラスト比を確保
- カラーのみに依存しない情報伝達

### フォーカス管理
```css
.interactive-element:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.interactive-element:focus:not(:focus-visible) {
  outline: none;
}
```

### セマンティックHTML
- 適切なHTMLタグの使用
- ARIA属性の適切な実装

## パフォーマンス最適化

### CSS最適化
- 不要なスタイルの削除
- Critical CSSの抽出
- CSS Modulesによる自動的なスコープ化

### 画像最適化
- WebP形式の使用
- 適切なサイズでの配信
- レスポンシブ画像の実装
