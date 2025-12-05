# Ozeu.net — Fork / 初期セットアップ手順

この説明は、他の開発者がこのリポジトリをフォークして素早く環境を立ち上げられるようにまとめた最小手順です。macOS（zsh）および Windows 両対応で要点のみ記載しています。

## 前提（最低限）
- Git がインストール済み
- Node.js (推奨: 16+) と npm がインストール済み
- （Java版テンプレートを使う場合は JDK 20 / Maven / Eclipse 等）

## フォークから起動まで（Vite + React テンプレート my-react-app がある場合）
1. GitHub 上でリポジトリを Fork
2. ローカルへクローン
   - git clone git@github.com:あなたのユーザ名/ozeu.net.git
   - cd ozeu.net
3. React アプリへ移動して依存をインストール
   - cd my-react-app
   - npm install
4. 開発サーバ起動
   - npm run dev
5. ブラウザで http://localhost:5173 を開く

## Vite プロジェクトを新規作成する場合（例）
1. 作業ディレクトリへ移動
   - cd /path/to/your/workdir
2. Vite React テンプレート作成
   - npm create vite@latest my-react-app -- --template react
3. 上記「依存をインストール」以降を実行

## Tailwind を追加する（任意）
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- tailwind.config.cjs の content を "./index.html", "./src/**/*.{js,jsx}" に設定
- src/index.css に `@tailwind base; @tailwind components; @tailwind utilities;` を追加
- src/main.jsx で index.css を import

## よくあるトラブル対処
- .zshrc の構文エラー（例: unmatched "）があるとターミナルで問題が出る。`code ~/.zshrc` で修正後 `source ~/.zshrc` を実行
- 依存の脆弱性: `npm audit fix` をまず実行。残る問題は注意して対応


要件定義mdを変更それを下もとに私は書く
