<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2023 诗词博客 - 分享美好的文字</p>
    </div>
  </footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<style>
/* 全局样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f7fa;
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

main {
  min-height: calc(100vh - 120px);
}

.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #e9ecef;
  margin-top: 40px;
  color: #6c757d;
  font-size: 14px;
}
</style>
