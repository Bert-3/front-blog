<template>
  <div class="about">
    <h1>关于我们</h1>
    <div class="content">
      <p>这是一个使用Vue 3、Vite、Vue Router和Pinia构建的博客应用示例。</p>
      <p>该项目展示了现代Vue应用的基本结构和最佳实践。</p>
      <p>主要功能包括：</p>
      <ul>
        <li>基于组件的UI架构</li>
        <li>Vue Router实现的路由管理</li>
        <li>Pinia实现的状态管理</li>
        <li>响应式布局设计</li>
        <li>API数据获取与展示</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.content {
  line-height: 1.6;
  font-size: 16px;
}

ul {
  margin-top: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}
</style>
