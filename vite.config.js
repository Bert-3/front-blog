import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3001, // 更新为当前使用的端口
    open: true,
    // 添加代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:8088', // 后端服务器地址
        changeOrigin: true,
        secure: false,
        // 可选的路径重写
        // rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    // 添加CORS配置
    cors: true
  }
})
