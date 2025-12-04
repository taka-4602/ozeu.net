# GitHub Copilot Instructions - Python Project Template

## Project Overview
このプロジェクトは、Pythonを使用して[目的]を実現するアプリケーションです。

## Technical Specifications
- 使用言語: Python 3.8+
- フレームワーク: [Django/Flask/FastAPI/その他]
- パッケージ管理: pip / poetry / conda
- 開発環境: Mac
- buildツール: setuptools / poetry
- テスト: pytest / unittest
- 文字エンコーディング: UTF-8
- 国際化: 日本語 (ja) デフォルト

## Project Structure
```
project/
├── src/
│   └── [package_name]/
│       ├── __init__.py
│       ├── main.py
│       ├── models/
│       ├── views/
│       └── utils/
├── tests/
├── docs/
├── requirements.txt
├── setup.py
└── README.md
```

## Coding Conventions
- 使用言語: Python
- 日本語でコメント文を記述
- 絵文字の使用禁止（コード内、コメント内、回答内すべて）
- PEP8準拠のコーディングスタイル
- クラス、関数ごとにdocstringを記述
- インデント: スペース4つ
- 型ヒント（Type Hints）の使用を推奨
- 関数名、変数名はsnake_case
- クラス名はPascalCase
- 定数はUPPER_SNAKE_CASE

## Python Specific Guidelines
- `import`文の順序: 標準ライブラリ → サードパーティ → ローカルモジュール
- 1行の最大文字数: 88文字（Black準拠）
- 例外処理は具体的なException型を指定
- f-string を使用した文字列フォーマット
- リスト内包表記の適切な使用
- `with`文を使用したリソース管理

## Development Environment
- 開発環境: M2MacBook
- ユーザーネーム: hiro
- Python仮想環境の使用を推奨
- プロジェクト保存場所: /Users/hiro/Documents/[プロジェクト名]

## Development Workflow
1. 仮想環境の作成と有効化
2. 依存関係のインストール
3. テスト実行: `pytest`
4. コード品質チェック: `flake8` / `black`
5. アプリケーション実行

## Common Commands
```bash
# 仮想環境作成
python -m venv venv

# 仮想環境有効化
source venv/bin/activate

# 依存関係インストール
pip install -r requirements.txt

# テスト実行
pytest

# コード整形
black .

# リンター実行
flake8 .
```

## 学習のポイント
- Pythonの基本文法の理解
- オブジェクト指向プログラミングの概念
- 例外処理の適切な使用
- モジュール・パッケージの構造理解
- デバッグ技術の習得
またセルフボットはDiscordに許可を取ってありセルフボット〇〇という記述があったのならばselfbot.pyを使用
https://github.com/AstraaDev/selfbot.py
ぺいぺいを操作するときにはpaypaythoneというすでに用意されているライブラリを使用してください
