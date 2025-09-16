import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    loading: false,
    error: null
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === parseInt(id))
    }
  },

  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        // 这里使用模拟API，实际项目中替换为真实API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

        // 为每篇文章添加随机图片和日期
        this.posts = response.data.map(post => {
          return {
            ...post,
            image: `https://picsum.photos/seed/${post.id}/600/400`,
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
          }
        })
      } catch (error) {
        this.error = error.message || '获取文章失败'
        console.error('获取文章失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
