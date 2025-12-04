# コメント記述規則

## 基本原則
- 日本語でコメント文を記述
- クラス、関数、コンポーネントごとにコメント文を記述
- 処理の目的と概要を説明
- 初学者にも理解しやすい内容

## 言語別コメント規則

### JavaScript
```javascript
/**
 * ユーザー情報を取得する関数
 * APIからユーザーデータを非同期で取得し、整形して返す
 * 
 * @param {number} userId - 取得対象のユーザーID
 * @returns {Promise<Object>} ユーザー情報オブジェクト
 */
async function fetchUser(userId) {
  try {
    // APIエンドポイントにリクエストを送信
    const response = await fetch(`/api/users/${userId}`);
    
    // レスポンスが正常でない場合はエラーを投げる
    if (!response.ok) {
      throw new Error('ユーザー情報の取得に失敗しました');
    }
    
    // JSON形式でデータを取得
    const userData = await response.json();
    
    return userData;
  } catch (error) {
    // エラーログを出力し、再度エラーを投げる
    console.error('ユーザー取得エラー:', error);
    throw error;
  }
}
```

### React Component
```javascript
/**
 * ユーザーカードコンポーネント
 * ユーザーの基本情報を表示するカード形式のUI
 */
const UserCard = ({ user, onEdit, onDelete }) => {
  // 編集ボタンクリック時の処理
  const handleEditClick = () => {
    onEdit(user.id);
  };

  // 削除ボタンクリック時の処理（確認ダイアログ付き）
  const handleDeleteClick = () => {
    if (window.confirm('本当に削除しますか？')) {
      onDelete(user.id);
    }
  };

  return (
    <div className={styles.card}>
      {/* ユーザーアバター */}
      <img 
        src={user.avatar} 
        alt={`${user.name}のアバター`}
        className={styles.avatar}
      />
      
      {/* ユーザー情報 */}
      <div className={styles.info}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
      </div>
      
      {/* 操作ボタン */}
      <div className={styles.actions}>
        <button onClick={handleEditClick}>編集</button>
        <button onClick={handleDeleteClick}>削除</button>
      </div>
    </div>
  );
};
```

### Python
```python
def calculate_user_score(user_data: dict) -> float:
    """
    ユーザーのスコアを計算する関数
    
    複数の指標を組み合わせてユーザーの総合スコアを算出します。
    - アクティビティレベル（40%）
    - コンテンツ品質（35%）
    - コミュニティ貢献度（25%）
    
    Args:
        user_data (dict): ユーザーデータ辞書
            - activity_level (float): アクティビティレベル (0-100)
            - content_quality (float): コンテンツ品質 (0-100)
            - community_contribution (float): コミュニティ貢献度 (0-100)
    
    Returns:
        float: 計算されたユーザースコア (0-100)
    
    Raises:
        ValueError: 必要なデータが不足している場合
    """
    # 必要なキーの存在チェック
    required_keys = ['activity_level', 'content_quality', 'community_contribution']
    missing_keys = [key for key in required_keys if key not in user_data]
    
    if missing_keys:
        raise ValueError(f"必要なデータが不足しています: {missing_keys}")
    
    # 各指標の重み
    weights = {
        'activity_level': 0.4,
        'content_quality': 0.35,
        'community_contribution': 0.25
    }
    
    # 重み付き平均を計算
    total_score = sum(
        user_data[key] * weights[key] 
        for key in required_keys
    )
    
    # スコアを0-100の範囲に正規化
    return min(max(total_score, 0), 100)
```

## CSS/CSS Modules
```css
/* 
 * ユーザーカードのスタイル定義
 * カード形式でユーザー情報を表示するためのレイアウトとスタイル
 */
.card {
  /* カードの基本レイアウト */
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  
  /* ホバー時の効果 */
  transition: box-shadow 0.2s ease;
}

.card:hover {
  /* マウスホバー時に影を追加 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* ユーザーアバター画像 */
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%; /* 円形にする */
  object-fit: cover;  /* 画像を適切にトリミング */
  margin-bottom: 12px;
}

/* ユーザー名のスタイル */
.name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

/* メールアドレスのスタイル */
.email {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}
```

## コメントの品質基準

### 良いコメントの例
```javascript
// 良い例：目的と理由を説明
// ユーザーの最終ログイン日から30日経過している場合は非アクティブとみなす
const INACTIVE_THRESHOLD_DAYS = 30;

/**
 * パスワードの強度をチェックする
 * セキュリティ要件：8文字以上、大小英字・数字・記号を含む
 */
function validatePasswordStrength(password) {
  // ...実装
}
```

### 避けるべきコメントの例
```javascript
// 悪い例：コードと同じことを繰り返している
// iを1増やす
i++;

// nameに値を代入
const name = user.name;
```

## 学習者向け配慮

### 初学者にも分かりやすいコメント
```javascript
/**
 * 非同期処理の例：API からデータを取得
 * 
 * async/await を使用することで、非同期処理を
 * 同期的なコードのように書くことができます
 */
async function getData() {
  try {
    // fetch() は Promise を返すため、await で結果を待つ
    const response = await fetch('/api/data');
    
    // レスポンスが成功(200-299)でない場合の処理
    if (!response.ok) {
      // throw で意図的にエラーを発生させる
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // .json() も Promise を返すため await が必要
    const data = await response.json();
    
    return data;
  } catch (error) {
    // try ブロック内でエラーが発生した場合の処理
    console.error('データ取得に失敗:', error);
    
    // エラーを再度投げることで、呼び出し元にエラーを伝える
    throw error;
  }
}
```

## チーム開発での注意点

### 一貫性のあるコメント
- チーム内で統一されたコメントスタイルを使用
- 定期的なコードレビューでコメント品質を確保
- 新メンバー向けにコメント規則を明確化