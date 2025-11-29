<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <div class="row mb-4">
      <div class="col-xl-3 col-md-6 mb-4" v-for="(item, index) in stats" :key="index">
        <div class="card border-0 shadow-sm h-100 py-2 dashboard-card">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-uppercase mb-1" :class="'text-'+item.color">
                  {{ item.title }}
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ item.value }}</div>
              </div>
              <div class="col-auto">
                <i :class="['bi fa-2x text-gray-300', item.icon]"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm mb-4 border-0">
      <div class="card-header py-3 bg-white border-bottom-0">
        <h6 class="m-0 font-weight-bold text-primary">
          <i class="bi bi-info-circle mr-1"></i> AI Factory 시스템 개요
        </h6>
      </div>
      <div class="card-body">
        <p class="text-muted">📋 "Specification is the Code" - 기획서가 곧 시스템이 됩니다</p>
        <div class="row mt-4">
          <div class="col-md-4">
            <div class="step-box">
              <span class="badge bg-primary mb-2">1. JSON 스키마 정의</span>
              <p class="small text-muted">화면 구조와 API를 JSON으로 정의합니다.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-box">
              <span class="badge bg-success mb-2">2. 자동 렌더링</span>
              <p class="small text-muted">StandardPage가 스키마를 읽어 화면을 자동 생성합니다.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-box">
              <span class="badge bg-info mb-2">3. AI 생성</span>
              <p class="small text-muted">PI 문서에서 Gemini AI가 스키마를 자동 생성합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  { title: '생성된 화면', value: '15', icon: 'bi-display', color: 'primary' },
  { title: '메뉴 수', value: '8', icon: 'bi-list-ul', color: 'success' },
  { title: '스키마', value: '12', icon: 'bi-file-code', color: 'info' },
  { title: '최근 생성', value: '3', icon: 'bi-clock-history', color: 'warning' },
]);
</script>

<style scoped>
.dashboard-card {
  transition: transform 0.2s;
  cursor: pointer;
}
.dashboard-card:hover {
  transform: translateY(-5px);
}
.text-gray-300 { color: #dddfeb; }
.text-gray-800 { color: #5a5c69; }

.step-box {
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}
</style>
