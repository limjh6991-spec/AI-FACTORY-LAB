# Excel 업로드/다운로드 UI/UX 패턴 가이드

## 개요
엔터프라이즈급 웹 애플리케이션에서 Excel 파일 업로드 및 다운로드 기능의 모범 사례를 제시합니다. 사용자 경험(UX)을 최적화하고 오류 처리, 검증, 진행 상태 표시 등을 포함한 완전한 워크플로우를 다룹니다.

---

## 목차
1. [Excel 업로드 패턴](#excel-업로드-패턴)
2. [Excel 다운로드 패턴](#excel-다운로드-패턴)
3. [오류 처리 전략](#오류-처리-전략)
4. [성능 최적화](#성능-최적화)
5. [접근성 (Accessibility)](#접근성-accessibility)

---

## Excel 업로드 패턴

### 1. Drag & Drop + File Input 조합

#### 디자인 원칙
- **다중 입력 방식**: 드래그 앤 드롭과 클릭 업로드를 모두 제공
- **시각적 피드백**: 드래그 상태를 명확하게 표시
- **파일 제약 표시**: 허용 형식, 크기 제한을 사전에 안내

#### Vue 3 구현 예제

```vue
<template>
  <div class="excel-upload-container">
    <!-- 드래그 앤 드롭 영역 -->
    <div
      class="drop-zone"
      :class="{ 'drop-zone--active': isDragging, 'drop-zone--error': hasError }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <!-- 아이콘 -->
      <i v-if="!isUploading && !uploadedFile" class="bi bi-cloud-upload icon-upload"></i>
      <i v-else-if="isUploading" class="bi bi-hourglass-split icon-loading"></i>
      <i v-else class="bi bi-file-earmark-check icon-success"></i>

      <!-- 메시지 -->
      <div class="drop-zone-message">
        <template v-if="!uploadedFile">
          <p class="primary-text">
            {{ isDragging ? '여기에 파일을 놓으세요' : 'Excel 파일을 끌어다 놓거나 클릭하세요' }}
          </p>
          <p class="secondary-text">
            지원 형식: .xlsx, .xls | 최대 크기: 10MB
          </p>
        </template>
        <template v-else>
          <p class="primary-text">{{ uploadedFile.name }}</p>
          <p class="secondary-text">{{ formatFileSize(uploadedFile.size) }} | 업로드 완료</p>
        </template>
      </div>

      <!-- 숨겨진 파일 입력 -->
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileInput"
        style="display: none;"
      />
    </div>

    <!-- 진행 표시줄 -->
    <div v-if="isUploading" class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
      </div>
      <p class="progress-text">{{ uploadProgress }}% 업로드 중...</p>
    </div>

    <!-- 오류 메시지 -->
    <div v-if="errorMessage" class="error-message">
      <i class="bi bi-exclamation-triangle"></i>
      <span>{{ errorMessage }}</span>
      <button @click="clearError" class="btn-close-error">
        <i class="bi bi-x"></i>
      </button>
    </div>

    <!-- 파일 미리보기 (업로드 후) -->
    <div v-if="uploadedFile && previewData.length > 0" class="file-preview">
      <div class="preview-header">
        <h4>파일 미리보기</h4>
        <button @click="removeFile" class="btn-remove">
          <i class="bi bi-trash"></i> 제거
        </button>
      </div>
      <table class="preview-table">
        <thead>
          <tr>
            <th v-for="(header, index) in previewData[0]" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in previewData.slice(1, 6)" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="previewData.length > 6" class="preview-footer">
        총 {{ previewData.length - 1 }}개 행 (상위 5개만 표시)
      </p>
    </div>

    <!-- 액션 버튼 -->
    <div v-if="uploadedFile" class="action-buttons">
      <button @click="processFile" class="btn-primary" :disabled="isProcessing">
        <i class="bi bi-gear"></i>
        {{ isProcessing ? '처리 중...' : '화면 생성' }}
      </button>
      <button @click="downloadTemplate" class="btn-secondary">
        <i class="bi bi-download"></i> 템플릿 다운로드
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

// 상태 관리
const isDragging = ref(false);
const hasError = ref(false);
const isUploading = ref(false);
const isProcessing = ref(false);
const uploadProgress = ref(0);
const uploadedFile = ref(null);
const previewData = ref([]);
const errorMessage = ref('');
const fileInput = ref(null);

// 파일 검증 설정
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.xlsx', '.xls'];

// 드래그 앤 드롭 핸들러
function handleDragOver(event) {
  isDragging.value = true;
}

function handleDragLeave(event) {
  isDragging.value = false;
}

function handleDrop(event) {
  isDragging.value = false;
  const files = event.dataTransfer.files;
  
  if (files.length > 0) {
    validateAndUpload(files[0]);
  }
}

// 파일 입력 핸들러
function triggerFileInput() {
  if (!isUploading.value) {
    fileInput.value.click();
  }
}

function handleFileInput(event) {
  const file = event.target.files[0];
  if (file) {
    validateAndUpload(file);
  }
}

// 파일 검증 및 업로드
async function validateAndUpload(file) {
  // 1. 확장자 검증
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    showError(`지원하지 않는 파일 형식입니다. (.xlsx 또는 .xls만 가능)`);
    return;
  }

  // 2. 파일 크기 검증
  if (file.size > MAX_FILE_SIZE) {
    showError(`파일 크기가 10MB를 초과합니다. (현재: ${formatFileSize(file.size)})`);
    return;
  }

  // 3. 업로드 시작
  clearError();
  isUploading.value = true;
  uploadProgress.value = 0;

  try {
    // 진행률 시뮬레이션 (실제로는 서버 응답 사용)
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10;
      }
    }, 200);

    // Excel 파일 파싱
    const data = await parseExcelFile(file);
    
    clearInterval(progressInterval);
    uploadProgress.value = 100;

    // 4. 업로드 완료
    setTimeout(() => {
      uploadedFile.value = file;
      previewData.value = data;
      isUploading.value = false;
    }, 500);

  } catch (error) {
    isUploading.value = false;
    showError(`파일 처리 중 오류가 발생했습니다: ${error.message}`);
  }
}

// Excel 파일 파싱
function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // 배열 형태로 변환 (헤더 포함)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length === 0) {
          reject(new Error('빈 파일입니다.'));
          return;
        }
        
        resolve(jsonData);
      } catch (error) {
        reject(new Error('손상된 Excel 파일입니다.'));
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsArrayBuffer(file);
  });
}

// 파일 제거
function removeFile() {
  uploadedFile.value = null;
  previewData.value = [];
  fileInput.value.value = '';
}

// 화면 생성 처리
async function processFile() {
  isProcessing.value = true;
  
  try {
    // Backend API 호출
    const response = await fetch('/api/generate-screen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: uploadedFile.value.name,
        data: previewData.value
      })
    });

    if (!response.ok) {
      throw new Error('서버 처리 실패');
    }

    const result = await response.json();
    
    // 성공 처리 (라우터 이동 등)
    alert(`화면 생성 완료: ${result.screenName}`);
    
  } catch (error) {
    showError(`처리 중 오류: ${error.message}`);
  } finally {
    isProcessing.value = false;
  }
}

// 템플릿 다운로드
function downloadTemplate() {
  // 서버에서 템플릿 다운로드 또는 클라이언트에서 생성
  const link = document.createElement('a');
  link.href = '/templates/screen_template.xlsx';
  link.download = 'screen_template.xlsx';
  link.click();
}

// 오류 처리
function showError(message) {
  hasError.value = true;
  errorMessage.value = message;
}

function clearError() {
  hasError.value = false;
  errorMessage.value = '';
}

// 유틸리티 함수
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
</script>

<style scoped>
.excel-upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 드롭 존 스타일 */
.drop-zone {
  border: 2px dashed var(--neutral-gray-40);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  background-color: var(--neutral-gray-05);
}

.drop-zone:hover {
  border-color: var(--primary-blue);
  background-color: var(--neutral-gray-10);
}

.drop-zone--active {
  border-color: var(--success-green);
  background-color: rgba(16, 124, 16, 0.05);
  border-style: solid;
}

.drop-zone--error {
  border-color: var(--error-red);
  background-color: rgba(232, 17, 35, 0.05);
}

/* 아이콘 */
.icon-upload,
.icon-loading,
.icon-success {
  font-size: 48px;
  margin-bottom: var(--spacing-md);
}

.icon-upload {
  color: var(--neutral-gray-60);
}

.icon-loading {
  color: var(--primary-blue);
  animation: spin 2s linear infinite;
}

.icon-success {
  color: var(--success-green);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 메시지 */
.drop-zone-message .primary-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--neutral-gray-90);
  margin: 0 0 var(--spacing-xs) 0;
}

.drop-zone-message .secondary-text {
  font-size: var(--font-size-sm);
  color: var(--neutral-gray-60);
  margin: 0;
}

/* 진행 표시줄 */
.progress-container {
  margin-top: var(--spacing-lg);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--neutral-gray-20);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-blue);
  transition: width var(--transition-normal);
}

.progress-text {
  text-align: center;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--neutral-gray-70);
}

/* 오류 메시지 */
.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: rgba(232, 17, 35, 0.1);
  border: 1px solid var(--error-red);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin-top: var(--spacing-lg);
  color: var(--error-red);
}

.error-message i {
  font-size: var(--font-size-xl);
}

.btn-close-error {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--error-red);
  font-size: var(--font-size-lg);
  padding: var(--spacing-xs);
}

.btn-close-error:hover {
  opacity: 0.7;
}

/* 파일 미리보기 */
.file-preview {
  margin-top: var(--spacing-lg);
  border: 1px solid var(--neutral-gray-20);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  background-color: white;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.preview-header h4 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--neutral-gray-90);
}

.btn-remove {
  background-color: transparent;
  border: 1px solid var(--error-red);
  color: var(--error-red);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.btn-remove:hover {
  background-color: var(--error-red);
  color: white;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.preview-table thead {
  background-color: var(--primary-blue);
  color: white;
}

.preview-table th,
.preview-table td {
  padding: var(--spacing-sm);
  text-align: left;
  border: 1px solid var(--neutral-gray-20);
}

.preview-table tbody tr:nth-child(even) {
  background-color: var(--neutral-gray-05);
}

.preview-footer {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--neutral-gray-60);
  text-align: right;
}

/* 액션 버튼 */
.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.btn-primary {
  background-color: var(--primary-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #005a9e;
}

.btn-primary:disabled {
  background-color: var(--neutral-gray-40);
  cursor: not-allowed;
}

.btn-secondary {
  background-color: white;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
}

.btn-secondary:hover {
  background-color: var(--neutral-gray-05);
}
</style>
```

---

### 2. 단계별 업로드 위저드

복잡한 업로드 프로세스에 적합한 위저드 패턴:

```vue
<template>
  <div class="upload-wizard">
    <!-- 단계 표시기 -->
    <div class="wizard-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step"
        :class="{ 
          'step--active': currentStep === index,
          'step--completed': currentStep > index 
        }"
      >
        <div class="step-number">
          <i v-if="currentStep > index" class="bi bi-check-circle-fill"></i>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>

    <!-- 단계별 컨텐츠 -->
    <div class="wizard-content">
      <!-- Step 1: 파일 선택 -->
      <div v-show="currentStep === 0">
        <h3>1단계: Excel 파일 선택</h3>
        <ExcelUploadDropzone @file-uploaded="handleFileUploaded" />
      </div>

      <!-- Step 2: 데이터 검증 -->
      <div v-show="currentStep === 1">
        <h3>2단계: 데이터 검증</h3>
        <DataValidationPanel 
          :data="uploadedData"
          @validation-complete="handleValidationComplete"
        />
      </div>

      <!-- Step 3: 매핑 설정 -->
      <div v-show="currentStep === 2">
        <h3>3단계: 컬럼 매핑</h3>
        <ColumnMappingPanel
          :source-columns="sourceColumns"
          :target-schema="targetSchema"
          @mapping-complete="handleMappingComplete"
        />
      </div>

      <!-- Step 4: 확인 및 생성 -->
      <div v-show="currentStep === 3">
        <h3>4단계: 최종 확인</h3>
        <FinalConfirmationPanel
          :summary="generationSummary"
          @confirm="handleConfirm"
        />
      </div>
    </div>

    <!-- 네비게이션 버튼 -->
    <div class="wizard-navigation">
      <button 
        @click="previousStep" 
        :disabled="currentStep === 0"
        class="btn-secondary"
      >
        <i class="bi bi-chevron-left"></i> 이전
      </button>
      
      <button 
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        :disabled="!canProceed"
        class="btn-primary"
      >
        다음 <i class="bi bi-chevron-right"></i>
      </button>
      
      <button 
        v-else
        @click="finish"
        :disabled="!canProceed"
        class="btn-success"
      >
        <i class="bi bi-check-circle"></i> 완료
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentStep = ref(0);
const uploadedData = ref(null);
const validationResult = ref(null);
const mappingConfig = ref(null);

const steps = [
  { label: '파일 선택' },
  { label: '데이터 검증' },
  { label: '컬럼 매핑' },
  { label: '최종 확인' }
];

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: return uploadedData.value !== null;
    case 1: return validationResult.value?.isValid === true;
    case 2: return mappingConfig.value !== null;
    case 3: return true;
    default: return false;
  }
});

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function handleFileUploaded(data) {
  uploadedData.value = data;
  nextStep();
}

function handleValidationComplete(result) {
  validationResult.value = result;
}

function handleMappingComplete(config) {
  mappingConfig.value = config;
}

async function finish() {
  // 최종 처리 로직
  console.log('화면 생성 시작...');
}
</script>
```

---

## Excel 다운로드 패턴

### 1. 즉시 다운로드 버튼

가장 간단한 패턴:

```vue
<template>
  <div class="download-section">
    <button @click="downloadExcel" class="btn-download" :disabled="isGenerating">
      <i v-if="!isGenerating" class="bi bi-download"></i>
      <i v-else class="bi bi-hourglass-split spin"></i>
      {{ isGenerating ? '생성 중...' : 'Excel 다운로드' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ExcelJS from 'exceljs';

const isGenerating = ref(false);

async function downloadExcel() {
  isGenerating.value = true;
  
  try {
    // RealGrid 데이터 가져오기 (예시)
    const gridData = window.gridView.getJsonRows();
    
    // Excel 생성
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    
    // 컬럼 정의
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 }
    ];
    
    // 헤더 스타일
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0078D4' }
    };
    
    // 데이터 추가
    gridData.forEach(row => worksheet.addRow(row));
    
    // 파일 다운로드
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `export_${new Date().getTime()}.xlsx`;
    link.click();
    
  } catch (error) {
    alert('Excel 생성 실패: ' + error.message);
  } finally {
    isGenerating.value = false;
  }
}
</script>
```

### 2. 옵션 선택 다이얼로그

사용자가 다운로드 옵션을 선택할 수 있는 패턴:

```vue
<template>
  <div>
    <button @click="showDialog = true" class="btn-download">
      <i class="bi bi-download"></i> Excel 다운로드
    </button>

    <!-- 옵션 다이얼로그 -->
    <div v-if="showDialog" class="dialog-overlay" @click.self="showDialog = false">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>Excel 다운로드 옵션</h3>
          <button @click="showDialog = false" class="btn-close">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <div class="dialog-body">
          <!-- 파일 형식 선택 -->
          <div class="option-group">
            <label>파일 형식</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="options.format" value="xlsx" />
                .xlsx (Excel 2007+)
              </label>
              <label>
                <input type="radio" v-model="options.format" value="csv" />
                .csv (쉼표로 구분)
              </label>
            </div>
          </div>

          <!-- 데이터 범위 선택 -->
          <div class="option-group">
            <label>데이터 범위</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="options.range" value="all" />
                전체 데이터 ({{ totalRows }}행)
              </label>
              <label>
                <input type="radio" v-model="options.range" value="visible" />
                표시된 데이터만 ({{ visibleRows }}행)
              </label>
              <label>
                <input type="radio" v-model="options.range" value="selected" />
                선택된 행만 ({{ selectedRows }}행)
              </label>
            </div>
          </div>

          <!-- 스타일 옵션 -->
          <div class="option-group">
            <label>
              <input type="checkbox" v-model="options.includeStyles" />
              스타일 포함 (헤더 색상, 테두리 등)
            </label>
            <label>
              <input type="checkbox" v-model="options.includeFilters" />
              자동 필터 추가
            </label>
          </div>

          <!-- 파일명 -->
          <div class="option-group">
            <label>파일명</label>
            <input 
              type="text" 
              v-model="options.filename" 
              placeholder="export.xlsx"
              class="input-filename"
            />
          </div>
        </div>

        <div class="dialog-footer">
          <button @click="showDialog = false" class="btn-secondary">
            취소
          </button>
          <button @click="executeDownload" class="btn-primary">
            <i class="bi bi-download"></i> 다운로드
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';

const showDialog = ref(false);
const totalRows = ref(1000);
const visibleRows = ref(500);
const selectedRows = ref(10);

const options = reactive({
  format: 'xlsx',
  range: 'all',
  includeStyles: true,
  includeFilters: true,
  filename: 'export'
});

async function executeDownload() {
  showDialog.value = false;
  
  // 데이터 가져오기
  const data = getDataByRange(options.range);
  
  if (options.format === 'xlsx') {
    await downloadAsExcel(data);
  } else {
    await downloadAsCSV(data);
  }
}

function getDataByRange(range) {
  // RealGrid에서 데이터 가져오기 (예시)
  switch (range) {
    case 'all':
      return window.gridView.getJsonRows();
    case 'visible':
      return window.gridView.getJsonRows().filter((_, index) => 
        window.gridView.isVisible(index)
      );
    case 'selected':
      return window.gridView.getCheckedRows();
    default:
      return [];
  }
}

async function downloadAsExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');
  
  // 컬럼 추가
  worksheet.columns = Object.keys(data[0] || {}).map(key => ({
    header: key,
    key: key,
    width: 15
  }));
  
  // 스타일 적용
  if (options.includeStyles) {
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0078D4' }
    };
  }
  
  // 데이터 추가
  data.forEach(row => worksheet.addRow(row));
  
  // 자동 필터
  if (options.includeFilters) {
    worksheet.autoFilter = {
      from: 'A1',
      to: String.fromCharCode(64 + worksheet.columns.length) + '1'
    };
  }
  
  // 다운로드
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${options.filename}.xlsx`;
  link.click();
}

async function downloadAsCSV(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${options.filename}.csv`;
  link.click();
}
</script>

<style scoped>
/* 다이얼로그 오버레이 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: var(--border-radius-lg);
  width: 500px;
  max-width: 90%;
  box-shadow: var(--elevation-3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--neutral-gray-20);
}

.dialog-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--neutral-gray-90);
}

.btn-close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--neutral-gray-60);
}

.btn-close:hover {
  color: var(--neutral-gray-90);
}

.dialog-body {
  padding: var(--spacing-lg);
}

.option-group {
  margin-bottom: var(--spacing-lg);
}

.option-group > label:first-child {
  display: block;
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--neutral-gray-80);
}

.radio-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  cursor: pointer;
}

.radio-group input {
  margin-right: var(--spacing-xs);
}

.input-filename {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--neutral-gray-30);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-md);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--neutral-gray-20);
}
</style>
```

---

## 오류 처리 전략

### 1. 사용자 친화적 오류 메시지

```javascript
// 오류 타입별 메시지 매핑
const ERROR_MESSAGES = {
  // 파일 관련
  FILE_TOO_LARGE: '파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해주세요.',
  INVALID_FORMAT: '지원하지 않는 파일 형식입니다. .xlsx 또는 .xls 파일만 업로드 가능합니다.',
  CORRUPTED_FILE: '손상된 Excel 파일입니다. 파일을 확인한 후 다시 시도해주세요.',
  EMPTY_FILE: '빈 파일입니다. 데이터가 포함된 Excel 파일을 업로드해주세요.',
  
  // 데이터 검증
  MISSING_HEADERS: '헤더 행이 없습니다. 첫 번째 행에 컬럼 이름을 입력해주세요.',
  DUPLICATE_COLUMNS: '중복된 컬럼 이름이 있습니다: {{columns}}',
  INVALID_DATA_TYPE: '{{column}} 컬럼의 데이터 타입이 올바르지 않습니다.',
  REQUIRED_FIELD_MISSING: '필수 필드가 누락되었습니다: {{fields}}',
  
  // 네트워크
  NETWORK_ERROR: '서버와의 연결에 실패했습니다. 인터넷 연결을 확인해주세요.',
  SERVER_ERROR: '서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다. 파일 크기가 작은지 확인해주세요.',
  
  // 권한
  PERMISSION_DENIED: '이 작업을 수행할 권한이 없습니다.',
  QUOTA_EXCEEDED: '저장 공간이 부족합니다. 불필요한 파일을 삭제해주세요.'
};

// 오류 처리 헬퍼
function handleError(error, context = {}) {
  let message = ERROR_MESSAGES.SERVER_ERROR;
  
  if (error.type && ERROR_MESSAGES[error.type]) {
    message = ERROR_MESSAGES[error.type];
    
    // 템플릿 변수 치환
    Object.keys(context).forEach(key => {
      message = message.replace(`{{${key}}}`, context[key]);
    });
  }
  
  // 사용자에게 표시
  showNotification({
    type: 'error',
    title: '오류 발생',
    message: message,
    duration: 5000
  });
  
  // 로그 기록
  console.error('[Excel Upload Error]', error, context);
}

// 사용 예시
try {
  await uploadExcel(file);
} catch (error) {
  if (error.duplicateColumns) {
    handleError(
      { type: 'DUPLICATE_COLUMNS' },
      { columns: error.duplicateColumns.join(', ') }
    );
  } else {
    handleError(error);
  }
}
```

### 2. 재시도 메커니즘

```javascript
async function uploadWithRetry(file, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await uploadExcel(file);
    } catch (error) {
      lastError = error;
      
      // 네트워크 오류만 재시도
      if (error.type === 'NETWORK_ERROR' && attempt < maxRetries) {
        await delay(1000 * attempt); // 지수 백오프
        console.log(`재시도 중... (${attempt}/${maxRetries})`);
      } else {
        break;
      }
    }
  }
  
  throw lastError;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## 성능 최적화

### 1. 대용량 파일 처리 (청킹)

```javascript
async function uploadLargeFile(file) {
  const CHUNK_SIZE = 1024 * 1024; // 1MB 청크
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const uploadId = generateUploadId();
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    
    await uploadChunk(chunk, {
      uploadId,
      chunkIndex: i,
      totalChunks
    });
    
    // 진행률 업데이트
    updateProgress((i + 1) / totalChunks * 100);
  }
  
  // 서버에서 청크 합치기
  await finalizeUpload(uploadId);
}
```

### 2. Web Worker 사용 (파싱 최적화)

```javascript
// excel-parser.worker.js
self.addEventListener('message', async (e) => {
  const { file } = e.data;
  
  try {
    // Worker에서 Excel 파싱 (메인 스레드 블로킹 방지)
    const XLSX = await import('xlsx');
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(worksheet);
    
    self.postMessage({ success: true, data: json });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
});

// main.js
const worker = new Worker('/workers/excel-parser.worker.js');

worker.postMessage({ file });

worker.onmessage = (e) => {
  if (e.data.success) {
    handleParsedData(e.data.data);
  } else {
    handleError(e.data.error);
  }
};
```

---

## 접근성 (Accessibility)

### 1. 키보드 네비게이션

```vue
<template>
  <div
    class="drop-zone"
    tabindex="0"
    role="button"
    aria-label="Excel 파일 업로드 영역. 엔터 키를 눌러 파일을 선택하세요."
    @keydown.enter="triggerFileInput"
    @keydown.space.prevent="triggerFileInput"
  >
    <!-- ... -->
  </div>
</template>
```

### 2. 스크린 리더 지원

```vue
<template>
  <div>
    <!-- 진행 상태 안내 -->
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      class="sr-only"
    >
      {{ statusMessage }}
    </div>

    <!-- 오류 안내 -->
    <div 
      v-if="errorMessage"
      role="alert" 
      aria-live="assertive"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const uploadProgress = ref(0);
const errorMessage = ref('');

const statusMessage = computed(() => {
  if (uploadProgress.value > 0 && uploadProgress.value < 100) {
    return `파일 업로드 중... ${uploadProgress.value}% 완료`;
  } else if (uploadProgress.value === 100) {
    return '파일 업로드 완료';
  }
  return '';
});
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

---

## 참고 자료

### 엔터프라이즈 UI 패턴
- Microsoft Fluent UI - File Upload: https://fluent2.microsoft.design/components/web/react/input-file
- Material Design - File Upload: https://m3.material.io/components/file-input
- Carbon Design - File Uploader: https://carbondesignsystem.com/components/file-uploader/usage

### 성능 최적화
- Web Workers Guide: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
- File API: https://developer.mozilla.org/en-US/docs/Web/API/File_API

### 접근성
- WCAG 2.1 File Upload: https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
- ARIA Best Practices: https://www.w3.org/TR/wai-aria-practices-1.1/

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025년 1월 29일  
**작성자**: AI Factory Lab Team
