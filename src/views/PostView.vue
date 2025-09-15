<template>
  <div class="post-view">
    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="post" class="post-content">
      <button class="back-button" @click="goBack">返回</button>
      <h1>{{ post.title }}</h1>
      <div class="post-body">
        {{ post.body }}
      </div>
    </div>

    <div v-else class="not-found">
      文章不存在
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePostsStore } from '../stores/posts'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const { loading, error } = storeToRefs(postsStore)

const post = computed(() => {
  return postsStore.getPostById(props.id)
})

onMounted(async () => {
  if (!post.value && !loading.value) {
    await postsStore.fetchPosts()
  }
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.post-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.loading, .error, .not-found {
  text-align: center;
  margin: 40px 0;
  font-size: 18px;
}

.error {
  color: #ff4757;
}

.not-found {
  color: #ff6b81;
}

.back-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
}

.back-button:hover {
  background-color: #3aa876;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 28px;
}

.post-body {
  line-height: 1.8;
  font-size: 16px;
  white-space: pre-line;
}
</style>
