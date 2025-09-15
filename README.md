# Vue Blog

这是一个使用Vue 3、Vite、Vue Router和Pinia构建的博客应用示例。

## 项目特点

- 基于Vue 3的组合式API
- Vite构建工具
- Vue Router路由管理
- Pinia状态管理
- 响应式布局设计
- 模拟API数据获取

## 项目结构

```
vue-blog/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件
│   ├── components/     # 组件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia状态管理
│   ├── views/          # 视图组件
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .env                # 环境变量
├── .eslintrc.cjs       # ESLint配置
├── index.html          # HTML模板
├── package.json        # 项目依赖
└── vite.config.js      # Vite配置
```

## 安装与运行

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 功能

- 博客文章列表展示
- 文章详情页
- 关于页面
- 响应式设计，适配移动端和桌面端

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- ESLint
