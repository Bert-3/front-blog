<template>
  <header class="header">
    <div class="container">
      <div class="logo-container">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <span class="site-name">诗词博客</span>
        </router-link>
      </div>

      <nav class="nav-links">
        <router-link to="/" class="nav-link">
          <i class="icon home-icon"></i>
          首页
        </router-link>
        <router-link to="/favorites" class="nav-link">
          <i class="icon heart-icon"></i>
          收藏
        </router-link>
        <router-link to="/random" class="nav-link">
          <i class="icon random-icon"></i>
          随笔
        </router-link>
        <router-link to="/notes" class="nav-link">
          <i class="icon note-icon"></i>
          记录
        </router-link>
        <router-link to="/album" class="nav-link">
          <i class="icon album-icon"></i>
          相册
        </router-link>
        <router-link to="/inbox" class="nav-link">
          <i class="icon inbox-icon"></i>
          百宝箱
        </router-link>
        <router-link to="/about" class="nav-link">
          <i class="icon about-icon"></i>
          留言
        </router-link>
        <router-link to="/contact" class="nav-link">
          <i class="icon contact-icon"></i>
          联系我
        </router-link>
      </nav>

      <div class="user-profile">
        <router-link to="/profile" class="profile-link">
          <img src="../assets/avatar.png" alt="用户头像" class="avatar" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style scoped>
.header {
  background-color: #1e88e5;
  color: white;
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-container a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

.icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .container {
    justify-content: space-between;
  }
}
</style>
