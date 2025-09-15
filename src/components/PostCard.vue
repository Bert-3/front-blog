<template>
  <div class="post-card" @click="$emit('click')">
    <h3 class="title">{{ post.title }}</h3>
    <p class="excerpt">{{ excerpt }}</p>
    <div class="read-more">阅读更多</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const excerpt = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 100
    ? props.post.body.slice(0, 100) + '...'
    : props.post.body
})
</script>

<style scoped>
.post-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

.read-more {
  color: #42b983;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}
</style>
