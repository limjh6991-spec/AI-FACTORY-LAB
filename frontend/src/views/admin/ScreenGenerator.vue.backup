<template>
  <div class="screen-generator">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-code-square"></i>
        화면 코드 생성기
      </h1>
      <p class="page-description">PI 문서를 입력하면 자동으로 Vue 컴포넌트, 스키마, 라우터 설정을 생성합니다</p>
    </div>

    <div class="generator-container">
      <!-- 좌측: PI 입력 영역 -->
      <div class="left-panel">
        <div class="panel-card">
          <div class="panel-header">
            <h3>
              <i class="bi bi-file-text"></i>
              PI 문서 입력
            </h3>
          </div>
          <div class="panel-body">
            <textarea
              v-model="piText"
              class="pi-input"
              placeholder="화면명: 제품별 원가 조회&#10;화면ID: COST001&#10;&#10;[검색조건]&#10;- 제품코드 (필수)&#10;- 사업부 (선택, 드롭다운)&#10;&#10;[조회 결과]&#10;- 제품코드&#10;- 제품명&#10;- 단위원가"
              :disabled="loading"
            ></textarea>
            
            <div class="button-group">
              <button 
                class="btn btn-primary btn-lg"
                @click="generateCode"
                :disabled="loading || !piText.trim()"
              >
                <i class="bi" :class="loading ? 'bi-hourglass-split' : 'bi-magic'"></i>
                <span v-if="loading">생성 중...</span>
                <span v-else>코드 생성</span>
              </button>
              
              <button 
                class="btn btn-secondary btn-lg"
                @click="clearInput"
                :disabled="loading"
              >
                <i class="bi bi-trash"></i>
                초기화
              </button>
            </div>

            <!-- 로딩 스피너 -->
            <div v-if="loading" class="loading-overlay">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="loading-text">AI가 코드를 생성하고 있습니다...</p>
            </div>

            <!-- 에러 메시지 -->
            <div v-if="error" class="alert alert-danger mt-3">
              <i class="bi bi-exclamation-triangle"></i>
              {{ error }}
            </div>

            <!-- 성공 메시지 -->
            <div v-if="successMessage" class="alert alert-success mt-3">
              <i class="bi bi-check-circle"></i>
              {{ successMessage }}
            </div>
          </div>
        </div>

        <!-- 샘플 PI 문서 -->
        <div class="panel-card mt-3">
          <div class="panel-header">
            <h3>
              <i class="bi bi-lightbulb"></i>
              샘플 PI 문서
            </h3>
          </div>
          <div class="panel-body">
            <div class="sample-list">
              <button 
                v-for="sample in samples" 
                :key="sample.id"
                class="sample-item"
                @click="loadSample(sample.text)"
                :disabled="loading"
              >
                <i class="bi bi-file-earmark-code"></i>
                {{ sample.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 우측: 생성된 코드 탭 -->
      <div class="right-panel">
        <div class="panel-card">
          <div class="panel-header">
            <h3>
              <i class="bi bi-file-earmark-code"></i>
              생성된 코드
            </h3>
          </div>
          
          <div class="panel-body">
            <!-- 코드가 없을 때 -->
            <div v-if="!generatedFiles.length" class="empty-state">
              <i class="bi bi-code-slash"></i>
              <p>좌측에서 PI 문서를 입력하고<br/>[코드 생성] 버튼을 눌러주세요</p>
            </div>

            <!-- 코드 탭 -->
            <div v-else class="code-tabs-container">
              <!-- 탭 헤더 -->
              <ul class="nav nav-tabs">
                <li 
                  v-for="(file, index) in generatedFiles" 
                  :key="index"
                  class="nav-item"
                >
                  <button
                    class="nav-link"
                    :class="{ active: activeTab === index }"
                    @click="activeTab = index"
                  >
                    <i class="bi" :class="getFileIcon(file.filename)"></i>
                    {{ file.filename }}
                  </button>
                </li>
              </ul>

              <!-- 탭 내용 -->
              <div class="tab-content">
                <div 
                  v-for="(file, index) in generatedFiles" 
                  :key="index"
                  class="tab-pane"
                  :class="{ active: activeTab === index }"
                >
                  <div class="code-header">
                    <span class="code-path">
                      <i class="bi bi-folder"></i>
                      {{ file.path }}
                    </span>
                    <button 
                      class="btn btn-sm btn-outline-primary"
                      @click="copyCode(file.code)"
                    >
                      <i class="bi bi-clipboard"></i>
                      복사
                    </button>
                  </div>
                  
                  <pre class="code-block"><code>{{ file.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 상태 관리
const piText = ref('')
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const generatedFiles = ref([])
const activeTab = ref(0)

// 샘플 PI 문서
const samples = [
  {
    id: 1,
    name: '제품별 원가 조회',
    text: `화면명: 제품별 원가 조회
화면ID: COST001

[검색조건]
- 제품코드 (필수, 입력)
- 사업부 (필수, 선택)
- 기준일자 (필수, 날짜)

[조회 결과]
- 제품코드
- 제품명
- 사업부명
- 단위원가
- 재고수량
- 재고금액`
  },
  {
    id: 2,
    name: '부서별 원가 조회',
    text: `화면명: 부서별 원가 조회
화면ID: COST002

[검색조건]
- 부서코드 (필수, 입력)
- 연도 (필수, 선택)
- 월 (선택, 선택)

[조회 결과]
- 부서코드
- 부서명
- 연도
- 월
- 예산금액
- 실제금액
- 차이금액`
  },
  {
    id: 3,
    name: '거래처별 매출 현황',
    text: `화면명: 거래처별 매출 현황
화면ID: SALES001

[검색조건]
- 거래처명 (선택, 입력)
- 조회기간 (필수, 기간)
- 거래유형 (선택, 선택)

[조회 결과]
- 거래처코드
- 거래처명
- 매출금액
- 매출건수
- 평균단가
- 담당자명`
  }
]

// 코드 생성 함수
const generateCode = async () => {
  if (!piText.value.trim()) {
    error.value = 'PI 문서를 입력해주세요.'
    return
  }

  loading.value = true
  error.value = ''
  successMessage.value = ''
  generatedFiles.value = []

  try {
    const response = await axios.post('http://localhost:8000/generate', {
      piText: piText.value
    })

    if (response.data.success) {
      generatedFiles.value = response.data.files
      successMessage.value = response.data.message
      activeTab.value = 0 // 첫 번째 탭으로 이동
    } else {
      error.value = '코드 생성에 실패했습니다.'
    }
  } catch (err) {
    console.error('코드 생성 오류:', err)
    
    if (err.response) {
      // 서버 응답이 있는 경우
      error.value = err.response.data.detail || '서버 오류가 발생했습니다.'
    } else if (err.request) {
      // 요청은 보냈지만 응답이 없는 경우
      error.value = 'API 서버에 연결할 수 없습니다. http://localhost:8000 서버가 실행 중인지 확인해주세요.'
    } else {
      // 요청 설정 중 오류
      error.value = '요청 처리 중 오류가 발생했습니다: ' + err.message
    }
  } finally {
    loading.value = false
  }
}

// 입력 초기화
const clearInput = () => {
  piText.value = ''
  error.value = ''
  successMessage.value = ''
  generatedFiles.value = []
}

// 샘플 로드
const loadSample = (sampleText) => {
  piText.value = sampleText
  error.value = ''
  successMessage.value = ''
}

// 코드 복사
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    successMessage.value = '코드가 클립보드에 복사되었습니다.'
    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  } catch (err) {
    error.value = '복사에 실패했습니다.'
  }
}

// 파일 아이콘 반환
const getFileIcon = (filename) => {
  if (filename.endsWith('.json')) return 'bi-filetype-json'
  if (filename.endsWith('.vue')) return 'bi-filetype-vue'
  if (filename.endsWith('.js')) return 'bi-filetype-js'
  if (filename.endsWith('.java')) return 'bi-filetype-java'
  if (filename.endsWith('.xml')) return 'bi-filetype-xml'
  return 'bi-file-earmark-code'
}
</script>

<style lang="scss" scoped>
.screen-generator {
  padding: 20px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 24px;
  
  .page-title {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 12px;
    
    i {
      color: #1890ff;
    }
  }
  
  .page-description {
    margin: 8px 0 0 0;
    color: #909399;
    font-size: 14px;
  }
}

.generator-container {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 0;
  
  &:first-child {
    flex: 1;
  }
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 8px;
    
    i {
      color: #1890ff;
    }
  }
}

.panel-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.pi-input {
  width: 100%;
  flex: 1;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
  
  &:disabled {
    background: #f5f7fa;
    cursor: not-allowed;
  }
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &.btn-primary {
    background: #1890ff;
    color: #fff;
    
    &:hover:not(:disabled) {
      background: #40a9ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }
  }
  
  &.btn-secondary {
    background: #fff;
    color: #606266;
    border: 1px solid #dcdfe6;
    
    &:hover:not(:disabled) {
      color: #1890ff;
      border-color: #1890ff;
    }
  }
  
  &.btn-outline-primary {
    background: transparent;
    color: #1890ff;
    border: 1px solid #1890ff;
    
    &:hover {
      background: #1890ff;
      color: #fff;
    }
  }
  
  &.btn-lg {
    flex: 1;
    justify-content: center;
    padding: 12px 24px;
    font-size: 15px;
  }
  
  &.btn-sm {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  z-index: 10;
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  
  .loading-text {
    margin-top: 16px;
    color: #1890ff;
    font-size: 14px;
    font-weight: 500;
  }
}

.sample-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sample-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  
  i {
    color: #1890ff;
  }
  
  &:hover:not(:disabled) {
    background: #ecf5ff;
    border-color: #1890ff;
    color: #1890ff;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
  
  i {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  p {
    text-align: center;
    line-height: 1.6;
  }
}

.code-tabs-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.nav-tabs {
  display: flex;
  border-bottom: 2px solid #e4e7ed;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
  
  .nav-item {
    margin-bottom: -2px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 20px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      color: #1890ff;
    }
    
    &.active {
      color: #1890ff;
      border-bottom-color: #1890ff;
      font-weight: 500;
    }
  }
}

.tab-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.tab-pane {
  display: none;
  height: 100%;
  flex-direction: column;
  
  &.active {
    display: flex;
  }
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  
  .code-path {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #606266;
    font-family: 'Consolas', 'Monaco', monospace;
    
    i {
      color: #909399;
    }
  }
}

.code-block {
  flex: 1;
  margin: 0;
  padding: 16px;
  background: #f8f9fa;
  overflow: auto;
  
  code {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #303133;
    white-space: pre;
  }
}

.alert {
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &.alert-danger {
    background: #fef0f0;
    border: 1px solid #fde2e2;
    color: #f56c6c;
  }
  
  &.alert-success {
    background: #f0f9ff;
    border: 1px solid #d9ecff;
    color: #13ce66;
  }
}
</style>
