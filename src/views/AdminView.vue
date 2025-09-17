<template>
  <div class="admin-page">
    <h1>管理后台</h1>

    <div class="admin-content">
      <div class="admin-sidebar">
        <div class="admin-menu">
          <div class="menu-item active">
            <i class="icon dashboard-icon"></i>
            <span>仪表盘</span>
          </div>
          <div class="menu-item">
            <i class="icon posts-icon"></i>
            <span>文章管理</span>
          </div>
          <div class="menu-item">
            <i class="icon users-icon"></i>
            <span>用户管理</span>
          </div>
          <div class="menu-item">
            <i class="icon comments-icon"></i>
            <span>评论管理</span>
          </div>
          <div class="menu-item">
            <i class="icon settings-icon"></i>
            <span>系统设置</span>
          </div>
        </div>
      </div>

      <div class="admin-main">
        <div class="admin-header">
          <h2>仪表盘</h2>
          <div class="admin-actions">
            <button class="refresh-button">刷新数据</button>
          </div>
        </div>

        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon posts-icon"></div>
            <div class="stat-content">
              <div class="stat-value">125</div>
              <div class="stat-label">文章总数</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon users-icon"></div>
            <div class="stat-content">
              <div class="stat-value">1,204</div>
              <div class="stat-label">注册用户</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon comments-icon"></div>
            <div class="stat-content">
              <div class="stat-value">5,732</div>
              <div class="stat-label">评论总数</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon views-icon"></div>
            <div class="stat-content">
              <div class="stat-value">35,892</div>
              <div class="stat-label">总浏览量</div>
            </div>
          </div>
        </div>

        <div class="admin-section">
          <h3>最近发布的文章</h3>
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>标题</th>
                <th>作者</th>
                <th>发布日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>春日</td>
                <td>李白</td>
                <td>2023-09-15</td>
                <td>
                  <button class="action-button edit">编辑</button>
                  <button class="action-button delete">删除</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>静夜思</td>
                <td>李白</td>
                <td>2023-09-14</td>
                <td>
                  <button class="action-button edit">编辑</button>
                  <button class="action-button delete">删除</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>登高</td>
                <td>杜甫</td>
                <td>2023-09-13</td>
                <td>
                  <button class="action-button edit">编辑</button>
                  <button class="action-button delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  // 确保用户是管理员
  if (!authStore.isAdmin) {
    router.push('/')
  }
})
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.admin-content {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.admin-sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
}

.admin-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
}

.menu-item.active {
  background-color: #42b983;
}

.menu-item .icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  background-color: white;
  border-radius: 2px;
}

.admin-main {
  flex: 1;
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.admin-header h2 {
  margin: 0;
  color: #333;
}

.refresh-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.refresh-button:hover {
  background-color: #3aa876;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 40px;
  height: 40px;
  background-color: #42b983;
  border-radius: 8px;
  margin-right: 15px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.admin-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.admin-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.admin-table th {
  background-color: #f1f1f1;
  font-weight: 600;
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 12px;
}

.action-button.edit {
  background-color: #3498db;
  color: white;
}

.action-button.delete {
  background-color: #e74c3c;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-content {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    padding: 10px 0;
  }

  .admin-menu {
    flex-direction: row;
    overflow-x: auto;
  }

  .menu-item {
    padding: 10px 15px;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
