# プロンプトテンプレートシステム

## 概要
このディレクトリには、GitHub Copilotでの開発効率を向上させるための階層化されたプロンプトテンプレートシステムが含まれています。

## 新しいディレクトリ構造
```
.github/prompts/
├── README.md                    # この説明ファイル
├── usage-guide.md              # 詳細な使用方法
├── common/                     # 全言語共通設定
│   ├── base-config.md          # 基本開発環境設定
│   ├── response-rules.md       # AI回答規則
│   ├── template-base.md        # 汎用ベーステンプレート
│   ├── development-guidelines.md # 共通開発規約
│   └── styling-guidelines.md   # 共通スタイリング規約
├── languages/                  # 言語別テンプレート
│   ├── template-python.md      # Python用
│   ├── template-javascript.md  # JavaScript/TypeScript用
│   ├── template-go.md          # Go言語用
│   └── template-php.md         # PHP用
├── frameworks/                 # フレームワーク別テンプレート
│   ├── template-react.md       # React用
│   ├── template-nextjs.md      # Next.js用
│   ├── template-vuejs.md       # Vue.js用
│   └── template-laravel.md     # Laravel用
└── projects/                   # プロジェクト固有設定
    └── discord-selfbot.md      # Discord SelfBot固有設定
```

## 使用方法

### 階層化されたプロンプトシステム

#### 1. 共通設定の適用
すべてのプロジェクトで以下を基本として使用：
```markdown
適用ファイル:
- common/base-config.md        # 基本開発環境
- common/response-rules.md     # AI回答規則
- common/development-guidelines.md # 開発規約
- common/styling-guidelines.md # スタイリング規約
```

#### 2. 言語別設定の選択
使用言語に応じて選択：
```bash
# Python開発の場合
languages/template-python.md

# JavaScript/TypeScript開発の場合
languages/template-javascript.md
```

#### 3. フレームワーク設定の追加
使用フレームワークがある場合：
```bash
# React開発の場合
frameworks/template-react.md

# Laravel開発の場合  
frameworks/template-laravel.md
```

#### 4. プロジェクト固有設定
最後にプロジェクト固有の設定を適用：
```bash
projects/discord-selfbot.md  # このプロジェクトの場合
```

### 新規プロジェクト作成時の手順
1. `common/template-base.md`をベースにする
2. 使用言語の設定を`languages/`から選択
3. フレームワークの設定を`frameworks/`から選択
4. `projects/`に新しいプロジェクト固有設定を作成

## テンプレート分類

### 共通設定 (common/)
| ファイル | 説明 |
|----------|------|
| base-config.md | 基本開発環境設定 |
| response-rules.md | AI回答規則 |
| template-base.md | 汎用ベーステンプレート |
| development-guidelines.md | 共通開発規約 |
| styling-guidelines.md | スタイリング規約 |

### 言語別設定 (languages/)
| ファイル | 対象言語 | 説明 |
|----------|----------|------|
| template-python.md | Python | Python開発用設定 |
| template-javascript.md | JS/TS | JavaScript/TypeScript用（JS優先） |
| template-go.md | Go | Go言語開発用 |
| template-php.md | PHP | PHP開発用 |

### フレームワーク別設定 (frameworks/)
| ファイル | 対象技術 | 説明 |
|----------|----------|------|
| template-react.md | React | React用（CSS Modules優先） |
| template-nextjs.md | Next.js | Next.js用（JS・CSS Modules優先） |
| template-vuejs.md | Vue.js | Vue.js開発用 |
| template-laravel.md | Laravel | Laravel開発用 |

### プロジェクト固有設定 (projects/)
| ファイル | プロジェクト | 説明 |
|----------|--------------|------|
| discord-selfbot.md | Discord SelfBot | 本プロジェクト固有設定 |

## カスタマイズポイント
各テンプレートで編集が必要な箇所：
- `[プロジェクト名]` - プロジェクト固有の名前
- `[目的]` - プロジェクトの目的や概要
- `[技術スタック]` - 使用する具体的な技術
- `[特別な制約]` - プロジェクト固有の制約や要件

## 作成者情報
- 開発者: hiro
- GitHub: hirorogo
- 作成日: 2024年11月30日
- 最終更新: 2024年11月30日

## 更新履歴
- 2024年11月30日: 初版作成
- 2024年11月30日: JavaScript優先方針とCSS Modules推奨設定を追加
- 2024年11月30日: PHP/Laravel テンプレート追加、Rust テンプレート削除
