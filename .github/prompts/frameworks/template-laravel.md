# GitHub Copilot Instructions - Laravel Project Template

## Project Overview
このプロジェクトは、Laravelフレームワークを使用してモダンなWebアプリケーションを構築します。

## Technical Specifications
- 使用言語: PHP 8.1+
- フレームワーク: Laravel 10+
- パッケージ管理: Composer
- 開発環境: Mac
- Webサーバー: Apache / Nginx
- データベース: MySQL / PostgreSQL / SQLite
- フロントエンド: Blade / Vue.js / React
- テスト: PHPUnit / Pest
- 文字エンコーディング: UTF-8
- 国際化: Laravel Localization

## Project Structure
```
laravel-project/
├── app/                    # アプリケーションコア
│   ├── Http/
│   │   ├── Controllers/    # コントローラー
│   │   ├── Middleware/     # ミドルウェア
│   │   └── Requests/       # フォームリクエスト
│   ├── Models/            # Eloquentモデル
│   ├── Services/          # ビジネスロジック
│   ├── Jobs/              # キュージョブ
│   └── Events/            # イベント
├── resources/             # ビューとアセット
│   ├── views/            # Bladeテンプレート
│   ├── js/               # JavaScript
│   └── css/              # スタイルシート
├── routes/               # ルート定義
│   ├── web.php           # Webルート
│   ├── api.php           # APIルート
│   └── console.php       # Artisanコマンド
├── database/             # データベース関連
│   ├── migrations/       # マイグレーション
│   ├── seeders/          # シーダー
│   └── factories/        # ファクトリー
├── tests/                # テスト
├── config/               # 設定ファイル
├── public/               # 公開ディレクトリ
├── storage/              # ストレージ
├── composer.json
└── .env                  # 環境設定
```

## Laravel Specific Conventions
- Eloquent ORM の活用
- MVC アーキテクチャの遵守
- Artisan コマンドの使用
- Service Container と Dependency Injection
- ミドルウェアによるHTTP処理
- Queue システムの活用
- Event/Listener パターン

## Controller Example
```php
<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

/**
 * ユーザー管理コントローラー
 * RESTfulなユーザー操作を提供
 */
class UserController extends Controller
{
    /**
     * コンストラクタ
     *
     * @param UserService $userService ユーザーサービス
     */
    public function __construct(
        private UserService $userService
    ) {}

    /**
     * ユーザー一覧表示
     *
     * @return View
     */
    public function index(): View
    {
        $users = $this->userService->getPaginatedUsers();
        
        return view('users.index', compact('users'));
    }

    /**
     * ユーザー詳細表示
     *
     * @param User $user ユーザーモデル
     * @return View
     */
    public function show(User $user): View
    {
        return view('users.show', compact('user'));
    }

    /**
     * ユーザー作成
     *
     * @param UserRequest $request バリデーション済みリクエスト
     * @return RedirectResponse
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $user = $this->userService->createUser($request->validated());
        
        return redirect()
            ->route('users.show', $user)
            ->with('success', 'ユーザーが正常に作成されました。');
    }

    /**
     * APIレスポンス用ユーザー一覧
     *
     * @return JsonResponse
     */
    public function apiIndex(): JsonResponse
    {
        $users = $this->userService->getAllUsers();
        
        return response()->json([
            'data' => $users,
            'message' => 'ユーザー一覧を取得しました。'
        ]);
    }
}
```

## Model Example
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ユーザーモデル
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class User extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * 一括代入可能な属性
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * 非表示にする属性
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * キャストする属性
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * 投稿との関連
     *
     * @return HasMany
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    /**
     * フルネーム取得
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
```

## Service Class Example
```php
<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

/**
 * ユーザーサービスクラス
 * ユーザー関連のビジネスロジックを管理
 */
class UserService
{
    /**
     * ページネーション付きユーザー一覧取得
     *
     * @param int $perPage ページあたりの件数
     * @return LengthAwarePaginator
     */
    public function getPaginatedUsers(int $perPage = 15): LengthAwarePaginator
    {
        return User::with('posts')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * 新規ユーザー作成
     *
     * @param array $data ユーザーデータ
     * @return User
     */
    public function createUser(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        
        return User::create($data);
    }

    /**
     * ユーザー情報更新
     *
     * @param User $user 対象ユーザー
     * @param array $data 更新データ
     * @return User
     */
    public function updateUser(User $user, array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        
        return $user->fresh();
    }
}
```

## Migration Example
```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ユーザーテーブル作成マイグレーション
 */
return new class extends Migration
{
    /**
     * マイグレーション実行
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // インデックス追加
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * マイグレーション取り消し
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

## Blade Template Example
```blade
{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('title', 'ユーザー一覧')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>ユーザー一覧</h1>
            
            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            <div class="mb-3">
                <a href="{{ route('users.create') }}" class="btn btn-primary">
                    新規ユーザー作成
                </a>
            </div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>メールアドレス</th>
                            <th>作成日</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($users as $user)
                            <tr>
                                <td>{{ $user->id }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->email }}</td>
                                <td>{{ $user->created_at->format('Y/m/d') }}</td>
                                <td>
                                    <a href="{{ route('users.show', $user) }}" 
                                       class="btn btn-sm btn-info">詳細</a>
                                    <a href="{{ route('users.edit', $user) }}" 
                                       class="btn btn-sm btn-warning">編集</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="text-center">
                                    ユーザーが見つかりません。
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{ $users->links() }}
        </div>
    </div>
</div>
@endsection
```

## Development Workflow
1. `composer create-project laravel/laravel project-name` - プロジェクト作成
2. `cp .env.example .env` - 環境設定ファイル作成
3. `php artisan key:generate` - アプリケーションキー生成
4. `php artisan migrate` - データベースマイグレーション実行
5. `php artisan serve` - 開発サーバー起動

## Common Artisan Commands
```bash
# プロジェクト作成
composer create-project laravel/laravel project-name

# 開発サーバー起動
php artisan serve

# マイグレーション実行
php artisan migrate

# シーダー実行
php artisan db:seed

# コントローラー作成
php artisan make:controller UserController --resource

# モデル作成（マイグレーション付き）
php artisan make:model User -m

# フォームリクエスト作成
php artisan make:request UserRequest

# キューワーカー起動
php artisan queue:work

# キャッシュクリア
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## Testing Example
```php
<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * ユーザー機能テスト
 */
class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * ユーザー一覧表示テスト
     *
     * @return void
     */
    public function test_user_index_displays_users(): void
    {
        // テストユーザー作成
        User::factory(3)->create();

        // リクエスト実行
        $response = $this->get(route('users.index'));

        // アサーション
        $response->assertStatus(200);
        $response->assertViewIs('users.index');
        $response->assertViewHas('users');
    }

    /**
     * ユーザー作成テスト
     *
     * @return void
     */
    public function test_user_can_be_created(): void
    {
        $userData = [
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        $response = $this->post(route('users.store'), $userData);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
        ]);
    }
}
```

## 学習のポイント
- Laravelの MVC アーキテクチャ
- Eloquent ORM の使い方
- ルーティングとミドルウェア
- Blade テンプレートエンジン
- Artisan コマンドの活用
- テスト駆動開発 (TDD)
