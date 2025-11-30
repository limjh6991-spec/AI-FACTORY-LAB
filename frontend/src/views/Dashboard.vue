<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <!-- 차트 위젯 -->
    <ChartWidgets />

    <!-- RealGrid 데모 링크 -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div class="flex-grow-1">
            <h5 class="mb-2 text-primary">
              <i class="bi bi-grid-3x3-gap-fill"></i>
              RealGrid 고급 기능 데모
            </h5>
            <p class="text-muted mb-0 small">Column Layout, Cell Merging, 차트 렌더러 예제</p>
          </div>
          <router-link to="/realgrid-demo" class="btn btn-primary">
            <i class="bi bi-arrow-right-circle me-1"></i> 데모 보기
          </router-link>
        </div>
      </div>
    </div>

    <div class="card shadow-sm mb-4">
      <div class="card-header border-bottom">
        <h6 class="mb-0">
          <i class="bi bi-info-circle me-2 text-primary"></i>
          AI Factory 시스템 개요
        </h6>
      </div>
      <div class="card-body">
        <p class="text-muted mb-4">
          <i class="bi bi-lightbulb text-warning me-2"></i>
          <strong>"Specification is the Code"</strong> - 기획서가 곧 시스템이 됩니다
        </p>
        <div class="row mt-4 g-3">
          <div class="col-md-4">
            <div class="step-box step-primary">
              <div class="step-number">1</div>
              <h6 class="step-title">JSON 스키마 정의</h6>
              <p class="step-desc">화면 구조와 API를 JSON으로 정의합니다.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-box step-success">
              <div class="step-number">2</div>
              <h6 class="step-title">자동 렌더링</h6>
              <p class="step-desc">StandardPage가 스키마를 읽어 화면을 자동 생성합니다.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-box step-info">
              <div class="step-number">3</div>
              <h6 class="step-title">AI 생성</h6>
              <p class="step-desc">PI 문서에서 Gemini AI가 스키마를 자동 생성합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChartWidgets from '@/components/ChartWidgets.vue';
</script>

<style scoped>
.step-box {
  padding: var(--spacing-lg);
  background: var(--neutral-white);
  border: 2px solid var(--neutral-gray-30);
  border-radius: var(--radius-md);
  text-align: center;
  transition: all var(--duration-fast) var(--easing-standard);
  height: 100%;
}

.step-box:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation-2);
}

.step-primary {
  border-left: 4px solid var(--primary-blue);
}

.step-primary .step-number {
  background: var(--primary-blue);
}

.step-success {
  border-left: 4px solid var(--success-green);
}

.step-success .step-number {
  background: var(--success-green);
}

.step-info {
  border-left: 4px solid var(--secondary-teal);
}

.step-info .step-number {
  background: var(--secondary-teal);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0 auto var(--spacing-md);
}

.step-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--neutral-gray-90);
  margin-bottom: var(--spacing-sm);
}

.step-desc {
  font-size: var(--font-size-sm);
  color: var(--neutral-gray-130);
  margin: 0;
}
</style>

<style scoped>
.dashboard-container {
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

.step-box {
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}
</style>
