<template>
  <div class="home">
    <h1>博客首页</h1>

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
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePostsStore } from '../stores/posts'
import PostCard from '../components/PostCard.vue'

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
  padding: 20px;
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
</style>
