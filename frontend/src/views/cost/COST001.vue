<template>
  <div class="screen-container">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-file-earmark-code"></i>
        부서별 월별 원가 조회
      </h1>
    </div>

    <!-- 검색 조건 영역 -->
    <div class="search-panel">
      <h3>검색 조건</h3>
      <!-- 검색 폼 구현 예정 -->
    </div>

    <!-- 그리드 영역 -->
    <div class="grid-panel">
      <h3>조회 결과</h3>
      <!-- RealGrid 구현 예정 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 스키마 로드
const schema = ref(null)

onMounted(async () => {
  // 스키마 파일 로드
  const response = await fetch('/schemas/COST001.json')
  schema.value = await response.json()
})
</script>

<style lang="scss" scoped>
.screen-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 24px;
}

.search-panel,
.grid-panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
