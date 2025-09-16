<template>
  <div class="hero-banner">
    <div class="wave-overlay"></div>
    <div class="content">
      <h1 class="title">童话</h1>
      <div class="quote-box">
        <p class="quote">天下有我才精彩，天下快哉！我！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的脚本逻辑
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 300px;
  background-image: url('../assets/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.wave-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-image: url('../assets/wave.svg');
  background-size: cover;
  background-repeat: no-repeat;
}

.content {
  text-align: center;
  z-index: 10;
  padding: 0 20px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.quote-box {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 25px;
  border-radius: 8px;
  display: inline-block;
}

.quote {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-banner {
    height: 200px;
  }

  .title {
    font-size: 36px;
  }

  .quote {
    font-size: 16px;
  }
}
</style>
