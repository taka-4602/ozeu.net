# GitHub Copilot Instructions - Vue.js Project Template

## Project Overview
このプロジェクトは、Vue.jsを使用してモダンなWebアプリケーションを構築します。

## Technical Specifications
- 使用言語: TypeScript / JavaScript
- フレームワーク: Vue.js 3+
- パッケージ管理: npm / yarn / pnpm
- 開発環境: Mac
- buildツール: Vite
- ルーティング: Vue Router 4
- 状態管理: Pinia / Vuex
- UI フレームワーク: Vuetify / Quasar / Element Plus
- テスト: Vitest + Vue Test Utils
- 文字エンコーディング: UTF-8
- 国際化: Vue I18n

## Project Structure
```
vue-project/
├── src/
│   ├── components/       # 再利用可能なコンポーネント
│   │   ├── ui/          # 基本UIコンポーネント
│   │   └── layout/      # レイアウトコンポーネント
│   ├── views/           # ページコンポーネント
│   ├── router/          # Vue Router設定
│   ├── stores/          # Piniaストア
│   ├── composables/     # Composition APIロジック
│   ├── utils/           # ユーティリティ関数
│   ├── types/           # TypeScript型定義
│   ├── styles/          # スタイルファイル
│   ├── assets/          # 静的ファイル
│   ├── App.vue
│   └── main.ts
├── public/
├── tests/
└── package.json
```

## Vue.js Specific Conventions
- Composition APIの使用を推奨
- Single File Components (.vue)
- コンポーネント名はPascalCase
- プロパティ名はcamelCase
- イベント名はkebab-case
- `<script setup>`構文の活用
- TypeScript with Vueの使用

## Component Structure
```vue
<template>
  <div class="component-name">
    <!-- テンプレート内容 -->
    <h1>{{ title }}</h1>
    <button @click="handleClick">クリック</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// プロパティの定義
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

// イベントの定義
const emit = defineEmits<{
  update: [value: string];
  click: [];
}>();

// リアクティブな状態
const localCount = ref(props.count);

// 算出プロパティ
const displayTitle = computed(() => 
  `${props.title} (${localCount.value})`
);

// メソッド
const handleClick = () => {
  localCount.value++;
  emit('click');
};

// ライフサイクルフック
onMounted(() => {
  console.log('コンポーネントがマウントされました');
});
</script>

<style scoped lang="scss">
.component-name {
  // スタイル定義
}
</style>
```

## Composition API Patterns
```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;
  
  const isPositive = computed(() => count.value > 0);
  
  return {
    count,
    increment,
    decrement,
    reset,
    isPositive
  };
}
```

## State Management with Pinia
```typescript
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => user.value !== null);
  
  const login = async (credentials) => {
    // ログイン処理
    user.value = await authService.login(credentials);
  };
  
  const logout = () => {
    user.value = null;
  };
  
  return {
    user,
    isLoggedIn,
    login,
    logout
  };
});
```

## Router Configuration
```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue') // 遅延ローディング
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

## Development Workflow
1. `npm create vue@latest project-name` - プロジェクト作成
2. `npm run dev` - 開発サーバー起動
3. `npm run build` - プロダクションビルド
4. `npm run test` - テスト実行
5. `npm run lint` - リンター実行

## Performance Optimization
- `v-memo`ディレクティブの活用
- `v-once`でワンタイムレンダリング
- コンポーネントの遅延ローディング
- `shallowRef`と`shallowReactive`の使用
- Virtual Scrollingの実装

## 学習のポイント
- Vue.jsの基本概念とリアクティビティ
- Composition APIの理解
- コンポーネント間通信
- ディレクティブの使用方法
- Vue Router による SPA ルーティング
- 状態管理パターン
