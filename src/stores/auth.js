import { defineStore } from 'pinia'
import request from '../utils/request'
import apiConfig from '../config/api.config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null,
    role: null
  }),

  getters: {
    userAvatar: (state) => {
      return state.user?.avatar || '../assets/default-avatar.png'
    },
    userName: (state) => {
      return state.user?.name || '游客'
    },
    isAdmin: (state) => {
      return state.role === 'ADMIN'
    }
  },

  actions: {
    async login(username, password, rememberMe = false) {
      try {
        const response = await request.post(apiConfig.paths.auth.login, {
          username,
          password
        })

        // 请求成功，response已经是处理过的数据
        const { token, role } = response.data

        this.isLoggedIn = true
        this.token = token
        this.role = role

        // 设置用户信息
        this.user = {
          name: username,
          avatar: '../assets/avatar.png' // 这里应该从API获取用户头像
        }

        // 保存到本地存储
        if (rememberMe) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify({
            name: username,
            role: role
          }))
        } else {
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('user', JSON.stringify({
            name: username,
            role: role
          }))
        }

        return { success: true }
      } catch (error) {
        console.error('登录失败:', error)
        return {
          success: false,
          message: error.message || '登录失败，请检查网络连接'
        }
      }
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
      this.token = null
      this.role = null

      // 清除存储
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    },

    // 检查本地存储中是否有登录信息
    checkAuth() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user')

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          this.isLoggedIn = true
          this.token = token
          this.role = userData.role
          this.user = {
            name: userData.name,
            avatar: '../assets/avatar.png' // 这里应该从API获取用户头像
          }

          return true
        } catch (e) {
          this.clearAuth()
          return false
        }
      }
      return false
    },

    // 清除认证信息
    clearAuth() {
      this.isLoggedIn = false
      this.user = null
      this.token = null
      this.role = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    }
  }
})
