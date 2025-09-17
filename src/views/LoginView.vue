<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <img src="../assets/login-bg.jpg" alt="登录背景" class="login-bg" />
      </div>

      <div class="login-right">
        <div class="login-header">
          <div class="logo-container">
            <img src="../assets/logo.png" alt="Logo" class="logo" />
            <span class="site-name">诗词博客</span>
          </div>
          <h2 class="login-title">登录</h2>
          <p class="login-subtitle">没有账号？<router-link to="/register">立即注册 &gt;</router-link></p>
        </div>

        <div class="login-form">
          <div v-if="error" class="error-message">{{ error }}</div>

          <div class="form-group">
            <label for="username">用户名/邮箱</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="请输入用户名或邮箱"
              @keyup.enter="handleLogin"
            >
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="请输入密码"
                @keyup.enter="handleLogin"
              >
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '隐藏' : '显示' }}
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span>记住我</span>
            </label>
            <router-link to="/forgot-password" class="forgot-password">忘记密码?</router-link>
          </div>

          <button
            class="login-button"
            @click="handleLogin"
            :disabled="isLoading"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    const result = await authStore.login(username.value, password.value, rememberMe.value)
    if (result.success) {
      // 登录成功，跳转到首页
      router.push('/')
    } else {
      error.value = result.message || '登录失败，请检查用户名和密码'
    }
  } catch (err) {
    error.value = err.message || '登录时发生错误'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-left {
  flex: 1;
  overflow: hidden;
  display: none;
}

.login-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-right {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.login-header {
  margin-bottom: 30px;
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.login-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.login-subtitle {
  color: #666;
  font-size: 14px;
}

.login-subtitle a {
  color: #42b983;
  text-decoration: none;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 12px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #666;
}

.remember-me input {
  margin-right: 5px;
}

.forgot-password {
  color: #42b983;
  text-decoration: none;
}

.login-button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
}

.login-button:hover {
  background-color: #3aa876;
}

.login-button:disabled {
  background-color: #a8d5c3;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #f44336;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .login-left {
    display: block;
  }
}
</style>
