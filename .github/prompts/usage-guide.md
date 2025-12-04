# プロンプトテンプレート使用ガイド

## はじめに
このガイドでは、階層化されたプロンプトテンプレートシステムの使用方法を説明します。

## 階層化システムの構造

### 1. 共通設定 (common/)
すべてのプロジェクトで使用される基本設定：
- **base-config.md**: 開発者基本情報、開発環境設定
- **response-rules.md**: AI回答の言語・スタイル規則
- **development-guidelines.md**: 全言語共通の開発規約
- **styling-guidelines.md**: CSS/スタイリング共通規約

### 2. 言語別設定 (languages/)
プログラミング言語固有の設定：
- **template-python.md**: Python開発規約
- **template-javascript.md**: JavaScript/TypeScript開発規約
- **template-go.md**: Go言語開発規約  
- **template-php.md**: PHP開発規約

### 3. フレームワーク別設定 (frameworks/)
フレームワーク固有の設定：
- **template-react.md**: React開発規約（CSS Modules優先）
- **template-nextjs.md**: Next.js開発規約
- **template-vuejs.md**: Vue.js開発規約
- **template-laravel.md**: Laravel開発規約

### 4. プロジェクト固有設定 (projects/)
個別プロジェクトの特別な設定：
- **discord-selfbot.md**: Discord SelfBot固有設定

## プロンプト適用の優先順位

```
1. common/ (基本設定)
   ↓
2. languages/ (言語固有)
   ↓  
3. frameworks/ (フレームワーク固有)
   ↓
4. projects/ (プロジェクト固有・最優先)
```

後の設定が前の設定を上書きします。
- `template-react.md`: Reactプロジェクト用

### 共通設定ファイル
- `base-config.md`: 開発者固有の基本設定
- `response-rules.md`: AI回答時の規則
- `code-style.md`: コーディング規約

### プロジェクト固有
- `project-specific.md`: 現在のプロジェクト特有の設定

## 使用手順

### 新規プロジェクト作成時
1. `template-base.md`をコピー
2. プロジェクト情報を記入
3. 使用言語に応じて言語別テンプレートを参照
4. 必要に応じて共通設定ファイルを組み合わせ

### 既存プロジェクト更新時
1. 該当するテンプレートを参照
2. プロジェクト固有の設定を更新
3. 新機能追加時は関連セクションを追記

## 言語別テンプレート選択指針

### JavaScript優先方針
- **基本原則**: やむを得ない事情がない限りJavaScriptを使用
- **TypeScript使用条件**: 
  - 大規模チーム開発
  - 型安全性が特に重要なプロジェクト
  - 既存TypeScriptプロジェクトの継続

### React開発でのCSS Modules優先
```javascript
// 推奨パターン
import styles from './Component.module.css';

const Component = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>タイトル</h1>
    </div>
  );
};
```

```css
/* Component.module.css */
.container {
  padding: 16px;
}

.title {
  color: #333;
  font-size: 1.5rem;
}
```

## プロジェクトタイプ別推奨設定

### Webアプリケーション開発
```markdown
使用テンプレート組み合わせ:
- base-config.md (基本設定)
- response-rules.md (回答規則)
- template-react.md または template-nextjs.md
- 独自のproject-specific.md
```

### API開発
```markdown
使用テンプレート組み合わせ:
- base-config.md
- response-rules.md
- template-javascript.md または template-python.md
- 独自のproject-specific.md
```

## 実践例：React + CSS Modules プロジェクト

### ファイル構成例
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.js
│   │   ├── Button.module.css
│   │   └── index.js
│   └── Modal/
│       ├── Modal.js
│       ├── Modal.module.css
│       └── index.js
├── pages/
│   ├── Home/
│   │   ├── Home.js
│   │   └── Home.module.css
│   └── About/
│       ├── About.js
│       └── About.module.css
└── styles/
    ├── globals.css
    └── variables.css
```

### CSS Modules命名規則
```css
/* 推奨命名パターン */
.container { }           /* ベース要素 */
.header { }             /* セクション */
.header__title { }      /* BEMライクな子要素 */
.button--primary { }    /* バリエーション */
.card--active { }       /* 状態クラス */
```

## ベストプラクティス

### 1. 定期的な更新
- 月1回の頻度でテンプレートを見直し
- プロジェクトの成長に合わせて調整

### 2. チーム間での共有
- チーム用カスタムテンプレート作成
- 組織固有のルールを追加
- 新メンバー向けオンボーディング資料と連携

### 3. バージョン管理
```bash
# テンプレートの変更履歴を記録
git log --oneline .github/prompts/
```

## カスタマイズポイント
- Project Overview: プロジェクトの目的と概要
- Technical Specifications: 技術スタック
- Project Structure: ディレクトリ構造
- Coding Conventions: 言語固有の規約
- Development Workflow: 開発フロー
- Important Notes: 特別な注意事項

## 組み合わせ例
```
base-config.md +
response-rules.md +
template-react.md +
code-style.md
= Reactプロジェクト用完全プロンプト
```
