<template>
  <div class="home">
    <HeroBanner />

    <div class="container">
      <div class="section-header">
        <div class="section-title">
          <i class="section-icon"></i>
          <h2>POETIZE</h2>
        </div>
        <div class="section-more">
          <a href="#">MORE</a>
        </div>
      </div>

      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="posts-container">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @click="viewPost(post.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePostsStore } from '../stores/posts'
import PostCard from '../components/PostCard.vue'
import HeroBanner from '../components/HeroBanner.vue'

const router = useRouter()
const postsStore = usePostsStore()
const { posts, loading, error } = storeToRefs(postsStore)

onMounted(() => {
  postsStore.fetchPosts()
})

const viewPost = (id) => {
  router.push({ name: 'post', params: { id } })
}
</script>

<style scoped>
.home {
  padding-bottom: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.section-title {
  display: flex;
  align-items: center;
}

.section-icon {
  width: 24px;
  height: 24px;
  background-color: #ff5722;
  margin-right: 10px;
  border-radius: 4px;
}

.section-title h2 {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.section-more a {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.section-more a:hover {
  color: #42b983;
}

.loading, .error {
  text-align: center;
  margin: 40px 0;
  font-size: 18px;
}

.error {
  color: #ff4757;
}

.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .posts-container {
    grid-template-columns: 1fr;
  }
}
</style>
