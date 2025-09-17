/**
 * 请求工具类
 * 封装axios，统一处理请求和响应
 */
import axios from 'axios'
import apiConfig from '../config/api.config'
import { useAuthStore } from '../stores/auth'

// 创建axios实例
const service = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json'
  },
  // 跨域请求时是否需要使用凭证
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从pinia获取token（如果在组件外，需要使用这种方式获取store）
    const authStore = useAuthStore()
    const token = authStore.token

    // 如果有token，添加到请求头
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 添加跨域请求头
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    // 调试信息，帮助排查问题
    console.log(`发送请求: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`)

    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 调试信息
    console.log('收到响应:', res)

    // 如果返回的状态码不是200，说明接口请求有问题
    if (res.code !== 200) {
      // 处理特定错误码
      if (res.code === 401) {
        // token过期或未登录
        const authStore = useAuthStore()
        authStore.clearAuth()
        // 可以在这里添加重定向到登录页的逻辑
      }

      // 返回错误信息
      return Promise.reject(new Error(res.message || '请求失败'))
    }

    // 正常返回数据
    return res
  },
  error => {
    console.error('响应错误:', error)

    // 输出更详细的错误信息，帮助排查问题
    if (error.response) {
      console.error('错误状态码:', error.response.status)
      console.error('错误数据:', error.response.data)
      console.error('错误头信息:', error.response.headers)
    } else if (error.request) {
      console.error('请求已发送但没有收到响应:', error.request)
    } else {
      console.error('请求配置错误:', error.config)
    }

    // 处理网络错误或服务器错误
    let message = '网络错误，请稍后重试'

    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          // 清除token并跳转到登录页
          const authStore = useAuthStore()
          authStore.clearAuth()
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = `请求失败: ${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '服务器无响应'
    }

    return Promise.reject(new Error(message))
  }
)

/**
 * 封装的请求方法
 */
const request = {
  /**
   * GET请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  get(url, params = {}, config = {}) {
    return service.get(url, {
      params,
      ...config
    })
  },

  /**
   * POST请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  post(url, data = {}, config = {}) {
    return service.post(url, data, config)
  },

  /**
   * PUT请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  put(url, data = {}, config = {}) {
    return service.put(url, data, config)
  },

  /**
   * DELETE请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  delete(url, params = {}, config = {}) {
    return service.delete(url, {
      params,
      ...config
    })
  },

  /**
   * 上传文件
   * @param {string} url - 请求地址
   * @param {FormData} formData - 表单数据
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  upload(url, formData, config = {}) {
    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  },

  /**
   * 下载文件
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {object} config - 额外配置
   * @returns {Promise} - 返回Promise
   */
  download(url, params = {}, config = {}) {
    return service.get(url, {
      params,
      responseType: 'blob',
      ...config
    })
  }
}

export default request
