import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // 路由懒加载
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn
  const isAdmin = authStore.isAdmin

  // 检查是否需要登录
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  }
  // 检查是否需要管理员权限
  else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
  }
  // 检查是否是仅游客可访问的页面（如登录页）
  else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router
