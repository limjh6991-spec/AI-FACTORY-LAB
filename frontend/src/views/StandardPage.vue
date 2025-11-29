<template>
  <div class="standard-page-container">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-file-earmark-code"></i>
        {{ schemaId }}
      </h1>
    </div>

    <div class="info-card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="bi bi-info-circle"></i>
          StandardPage Component
        </h3>
      </div>
      <div class="card-body">
        <p class="description">JSON 스키마 기반 동적 렌더링 엔진</p>
        <div class="schema-info">
          <div class="info-item">
            <span class="info-label">Schema ID:</span>
            <span class="info-value">{{ schemaId }}</span>
          </div>
        </div>
        <div class="alert-box">
          <i class="bi bi-lightbulb"></i>
          <div class="alert-content">
            <strong>개발 예정</strong>
            <p>이 컴포넌트는 Phase 1에서 개발될 예정입니다. JSON 스키마를 읽어 검색조건과 그리드를 동적으로 렌더링합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineOptions } from 'vue'

defineOptions({
  name: 'StandardPage'
})

defineProps({
  schemaId: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.standard-page-container {
  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        color: #1890ff;
      }
    }
  }

  .info-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid #f0f0f0;

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
        margin: 0;
        display: flex;
        align-items: center;

        i {
          margin-right: 8px;
          color: #1890ff;
        }
      }
    }

    .card-body {
      padding: 24px;

      .description {
        font-size: 16px;
        color: #606266;
        margin: 0 0 20px 0;
      }

      .schema-info {
        margin-bottom: 24px;

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .info-label {
            font-size: 14px;
            color: #909399;
            margin-right: 12px;
            min-width: 100px;
          }

          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #1890ff;
          }
        }
      }

      .alert-box {
        display: flex;
        align-items: flex-start;
        padding: 16px;
        background: #e6f7ff;
        border: 1px solid #91d5ff;
        border-radius: 6px;

        i {
          font-size: 24px;
          color: #1890ff;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .alert-content {
          flex: 1;

          strong {
            display: block;
            font-size: 15px;
            color: #303133;
            margin-bottom: 8px;
          }

          p {
            font-size: 14px;
            color: #606266;
            margin: 0;
            line-height: 1.6;
          }
        }
      }
    }
  }
}
</style>
