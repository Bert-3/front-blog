<template>
  <div class="post-card" @click="$emit('click')">
    <div class="post-image" :style="{ backgroundImage: `url(${post.image || defaultImage})` }"></div>
    <div class="post-content">
      <h3 class="title">{{ post.title }}</h3>
      <p class="excerpt">{{ excerpt }}</p>
      <div class="post-meta">
        <div class="post-date">
          <i class="date-icon"></i>
          发布于 {{ formatDate(post.date || new Date()) }}
        </div>
        <div class="read-more">阅读更多</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const defaultImage = ref('https://via.placeholder.com/300x200/e2e8f0/1a202c?text=诗词博客')

const excerpt = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 100
    ? props.post.body.slice(0, 100) + '...'
    : props.post.body
})

const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.post-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.post-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.post-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 18px;
  line-height: 1.4;
}

.excerpt {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 15px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.post-date {
  color: #999;
  display: flex;
  align-items: center;
}

.date-icon {
  width: 14px;
  height: 14px;
  margin-right: 5px;
  background-color: #ddd;
  border-radius: 50%;
}

.read-more {
  color: #42b983;
  font-weight: 600;
}
</style>
