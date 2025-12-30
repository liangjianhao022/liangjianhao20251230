import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/ljh20251230/', // 将 【'your-repo-name'】 替换为你的 GitHub 仓库名，结尾的斜杠是必须的。
  plugins: [vue()],
})