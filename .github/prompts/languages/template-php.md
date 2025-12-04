# GitHub Copilot Instructions - PHP Project Template

## Project Overview
このプロジェクトは、PHPを使用して[目的]を実現するWebアプリケーションです。

## Technical Specifications
- 使用言語: PHP 8.1+
- フレームワーク: [なし/Symfony/CodeIgniter/その他]
- パッケージ管理: Composer
- 開発環境: Mac
- Webサーバー: Apache / Nginx
- データベース: MySQL / PostgreSQL / SQLite
- テスト: PHPUnit
- 文字エンコーディング: UTF-8
- 国際化: 日本語 (ja) デフォルト

## Project Structure
```
php-project/
├── src/                    # ソースコード
│   ├── Controllers/        # コントローラー
│   ├── Models/            # モデル
│   ├── Views/             # ビュー
│   └── Services/          # ビジネスロジック
├── public/                # 公開ディレクトリ
│   ├── index.php          # エントリーポイント
│   ├── css/               # スタイルシート
│   ├── js/                # JavaScript
│   └── images/            # 画像ファイル
├── config/                # 設定ファイル
├── tests/                 # テストファイル
├── vendor/                # Composer依存関係
├── composer.json          # Composer設定
├── .htaccess             # Apache設定
└── README.md
```

## PHP Specific Conventions
- 使用言語: PHP
- 日本語でコメント文を記述
- 絵文字の使用禁止（コード内、コメント内、回答内すべて）
- PSR-4オートローディング規約に従う
- PSR-12コーディングスタイル準拠
- クラス名はPascalCase
- メソッド名、変数名はcamelCase
- 定数はUPPER_SNAKE_CASE
- 名前空間の適切な使用

## Coding Standards
```php
<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;
use App\Services\UserService;

/**
 * ユーザー管理コントローラー
 * ユーザーの登録、更新、削除を処理する
 */
class UserController
{
    private UserService $userService;

    /**
     * コンストラクタ
     *
     * @param UserService $userService ユーザーサービス
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * ユーザー一覧を表示
     *
     * @return void
     */
    public function index(): void
    {
        try {
            $users = $this->userService->getAllUsers();
            require_once 'views/users/index.php';
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    /**
     * エラーハンドリング
     *
     * @param Exception $e 例外オブジェクト
     * @return void
     */
    private function handleError(Exception $e): void
    {
        error_log($e->getMessage());
        http_response_code(500);
        require_once 'views/errors/500.php';
    }
}
```

## Security Best Practices
- SQLインジェクション対策（プリペアードステートメント使用）
- XSS対策（htmlspecialchars使用）
- CSRF対策（トークン検証）
- セッションセキュリティ
- 入力値検証とサニタイゼーション

## Database Access Pattern
```php
<?php
/**
 * データベース接続クラス
 */
class Database
{
    private PDO $pdo;

    public function __construct()
    {
        $dsn = 'mysql:host=localhost;dbname=app_db;charset=utf8mb4';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $this->pdo = new PDO($dsn, $username, $password, $options);
    }

    /**
     * ユーザー情報を取得
     *
     * @param int $id ユーザーID
     * @return array|null ユーザー情報
     */
    public function getUserById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id]);
        
        $result = $stmt->fetch();
        return $result ?: null;
    }
}
```

## Error Handling
```php
<?php
/**
 * エラーハンドリングの例
 */
function handleDatabaseOperation(): bool
{
    try {
        // データベース操作
        $result = $db->executeQuery($sql, $params);
        return true;
    } catch (PDOException $e) {
        // データベースエラーのログ記録
        error_log("DB Error: " . $e->getMessage());
        return false;
    } catch (Exception $e) {
        // その他のエラー
        error_log("General Error: " . $e->getMessage());
        return false;
    }
}
```

## Development Workflow
1. `composer create-project` - プロジェクト作成
2. `composer install` - 依存関係インストール
3. `php -S localhost:8000` - 開発サーバー起動
4. `./vendor/bin/phpunit` - テスト実行
5. `composer dump-autoload` - オートローダー再生成

## Common Commands
```bash
# Composer初期化
composer init

# パッケージインストール
composer require vendor/package

# 開発用パッケージインストール
composer require --dev phpunit/phpunit

# オートローダー生成
composer dump-autoload

# 開発サーバー起動
php -S localhost:8000 -t public

# テスト実行
./vendor/bin/phpunit
```

## 学習のポイント
- PHPの基本文法と特徴
- オブジェクト指向プログラミング
- セキュリティベストプラクティス
- データベース操作
- エラーハンドリング
- Composerによる依存関係管理
