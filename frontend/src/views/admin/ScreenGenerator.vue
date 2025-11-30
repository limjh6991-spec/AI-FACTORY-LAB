<template>
  <div class="screen-generator">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-code-square"></i>
        화면 코드 생성기 (Excel)
      </h1>
      <p class="page-description">Excel 템플릿 파일을 업로드하면 자동으로 Vue 컴포넌트, 스키마, Java Controller를 생성합니다</p>
    </div>

    <!-- 스크롤 진행률 표시 -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="generator-content">
      <!-- 좌측 패널: Excel 업로드 -->
      <div class="upload-section">
        <div class="section-card">
          <div class="card-header">
            <i class="bi bi-file-earmark-excel"></i>
            Excel 템플릿 업로드
          </div>
          <div class="card-body">
            <!-- 드롭존 -->
            <div 
              class="drop-zone"
              :class="{ 
                'drag-over': isDragOver,
                'has-file': uploadedFile 
              }"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
              @drop.prevent="handleFileDrop"
              @click="triggerFileInput"
            >
              <input
                ref="fileInput"
                type="file"
                accept=".xlsx,.xls"
                @change="handleFileSelect"
                style="display: none"
              />
              
              <div v-if="!uploadedFile" class="drop-zone-content">
                <i class="bi bi-cloud-upload"></i>
                <p class="drop-zone-title">Excel 파일을 드래그하거나 클릭하세요</p>
                <p class="drop-zone-subtitle">지원 형식: .xlsx, .xls</p>
              </div>
              
              <div v-else class="drop-zone-file">
                <i class="bi bi-file-earmark-excel-fill"></i>
                <div class="file-info">
                  <p class="file-name">{{ uploadedFile.name }}</p>
                  <p class="file-size">{{ formatFileSize(uploadedFile.size) }}</p>
                </div>
                <button 
                  class="btn-remove-file"
                  @click.stop="removeFile"
                  title="파일 제거"
                >
                  <i class="bi bi-x-circle-fill"></i>
                </button>
              </div>
            </div>

            <!-- 진행률 표시 -->
            <div v-if="isUploading" class="upload-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
              </div>
              <p class="progress-text">{{ uploadProgress }}% 업로드 중...</p>
            </div>

            <!-- 템플릿 다운로드 -->
            <div class="template-download">
              <p class="template-info">
                <i class="bi bi-info-circle"></i>
                템플릿 파일이 없으신가요?
              </p>
              <button 
                class="btn btn-outline-primary"
                @click="downloadTemplate"
              >
                <i class="bi bi-download"></i>
                템플릿 다운로드
              </button>
            </div>

            <!-- 액션 버튼 -->
            <div class="action-buttons">
              <button
                class="btn btn-primary btn-lg"
                @click="parseExcelFile"
                :disabled="!uploadedFile || isUploading || isParsing"
              >
                <i class="bi" :class="isParsing ? 'bi-hourglass-split' : 'bi-file-earmark-check'"></i>
                <span v-if="isParsing">파싱 중...</span>
                <span v-else>Excel 파싱</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 우측 패널: 미리보기 -->
      <div class="preview-section">
        <div class="section-card">
          <!-- 탭 헤더 (Sticky) -->
          <div class="preview-tabs" :class="{ scrolled: isScrolled }">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-button"
              :class="{ active: currentTab === tab.id }"
              @click="switchTab(tab.id)"
            >
              <i :class="tab.icon"></i>
              {{ tab.label }}
              <span v-if="getTabBadgeCount(tab.id) > 0" class="tab-badge">
                {{ getTabBadgeCount(tab.id) }}
              </span>
            </button>
          </div>

          <!-- 탭 컨텐츠 -->
          <div ref="tabContainer" class="tab-content" @scroll="handleScroll">
            <!-- 기본정보 탭 -->
            <div v-show="currentTab === 'basic'" class="tab-panel">
              <div v-if="schema.pageInfo" class="info-grid">
                <div class="info-item">
                  <label>화면 ID</label>
                  <div class="info-value">{{ schema.pageInfo.pageId || '-' }}</div>
                </div>
                <div class="info-item">
                  <label>화면명</label>
                  <div class="info-value">{{ schema.pageInfo.pageTitle || '-' }}</div>
                </div>
                <div class="info-item">
                  <label>카테고리</label>
                  <div class="info-value">{{ schema.pageInfo.category || '-' }}</div>
                </div>
                <div class="info-item">
                  <label>설명</label>
                  <div class="info-value">{{ schema.pageInfo.description || '-' }}</div>
                </div>
                <div class="info-item">
                  <label>Grid 높이</label>
                  <div class="info-value">{{ schema.gridConfig?.height || 600 }}px</div>
                </div>
                <div class="info-item">
                  <label>Virtual Scroll</label>
                  <div class="info-value">
                    <span :class="schema.gridConfig?.virtualScrolling ? 'badge-success' : 'badge-secondary'">
                      {{ schema.gridConfig?.virtualScrolling ? '사용' : '미사용' }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <i class="bi bi-inbox"></i>
                <p>Excel 파일을 업로드하고 파싱하세요</p>
              </div>
            </div>

            <!-- 그리드컬럼 탭 -->
            <div v-show="currentTab === 'columns'" class="tab-panel">
              <div v-if="schema.gridColumns && schema.gridColumns.length > 0">
                <div class="column-summary">
                  <h4>
                    <i class="bi bi-list-ul"></i>
                    컬럼 상세 정보 ({{ schema.gridColumns.length }}개)
                  </h4>
                  <div class="column-list">
                    <div 
                      v-for="(col, index) in schema.gridColumns" 
                      :key="index"
                      class="column-item"
                    >
                      <div class="column-header">
                        <span class="column-index">{{ index + 1 }}</span>
                        <strong>{{ col.header }}</strong>
                        <code>{{ col.fieldName }}</code>
                      </div>
                      <div class="column-details">
                        <span class="detail-badge">{{ col.dataType }}</span>
                        <span class="detail-badge">{{ col.width }}px</span>
                        <span class="detail-badge">{{ col.align }}</span>
                        <span v-if="col.editable" class="detail-badge badge-info">편집 가능</span>
                        <span v-if="col.required" class="detail-badge badge-warning">필수</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <i class="bi bi-table"></i>
                <p>그리드 컬럼 정의가 없습니다</p>
              </div>
            </div>

            <!-- 검색조건 탭 -->
            <div v-show="currentTab === 'search'" class="tab-panel">
              <div v-if="schema.searchConditions && schema.searchConditions.length > 0">
                <div class="search-conditions-list">
                  <div 
                    v-for="(condition, index) in schema.searchConditions"
                    :key="index"
                    class="condition-item"
                  >
                    <div class="condition-header">
                      <span class="condition-index">{{ index + 1 }}</span>
                      <strong>{{ condition.label }}</strong>
                      <code>{{ condition.key }}</code>
                    </div>
                    <div class="condition-details">
                      <span class="detail-badge">{{ condition.type }}</span>
                      <span v-if="condition.defaultValue" class="detail-info">
                        기본값: {{ condition.defaultValue }}
                      </span>
                      <span v-if="condition.placeholder" class="detail-info">
                        Placeholder: {{ condition.placeholder }}
                      </span>
                    </div>
                    <div v-if="condition.options" class="condition-options">
                      <strong>옵션:</strong>
                      <span 
                        v-for="(opt, optIdx) in condition.options"
                        :key="optIdx"
                        class="option-tag"
                      >
                        {{ opt }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <i class="bi bi-search"></i>
                <p>검색 조건이 없습니다</p>
              </div>
            </div>

            <!-- 버튼 탭 -->
            <div v-show="currentTab === 'buttons'" class="tab-panel">
              <div v-if="schema.buttons && schema.buttons.length > 0">
                <div class="buttons-list">
                  <div 
                    v-for="(button, index) in schema.buttons"
                    :key="index"
                    class="button-item"
                  >
                    <button 
                      class="btn-preview"
                      :class="'btn-' + button.type"
                    >
                      <i v-if="button.icon" :class="button.icon"></i>
                      {{ button.label }}
                    </button>
                    <div class="button-details">
                      <code>{{ button.id }}</code>
                      <span class="detail-badge">{{ button.type }}</span>
                      <span class="detail-badge">{{ button.position }}</span>
                      <span v-if="button.apiEndpoint" class="detail-info">
                        API: {{ button.apiEndpoint }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <i class="bi bi-ui-radios"></i>
                <p>버튼 정의가 없습니다</p>
              </div>
            </div>

            <!-- API 탭 -->
            <div v-show="currentTab === 'api'" class="tab-panel">
              <div v-if="schema.api && Object.keys(schema.api).length > 0">
                <div class="api-list">
                  <div 
                    v-for="(path, key) in schema.api"
                    :key="key"
                    class="api-item"
                  >
                    <div class="api-header">
                      <span class="api-key">{{ key }}</span>
                      <code class="api-path">{{ path }}</code>
                    </div>
                    <div v-if="schema.apiDetails && schema.apiDetails[key]" class="api-details">
                      <span class="method-badge" :class="'method-' + schema.apiDetails[key].method.toLowerCase()">
                        {{ schema.apiDetails[key].method }}
                      </span>
                      <div v-if="schema.apiDetails[key].requestParams" class="api-params">
                        <strong>Parameters:</strong>
                        {{ schema.apiDetails[key].requestParams.join(', ') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <i class="bi bi-cloud"></i>
                <p>API 정의가 없습니다</p>
              </div>
            </div>

            <!-- 검증결과 탭 -->
            <div v-show="currentTab === 'validation'" class="tab-panel">
              <div v-if="validationMessages.length > 0" class="validation-messages">
                <div 
                  v-for="(message, index) in validationMessages"
                  :key="index"
                  class="validation-message"
                  :class="'message-' + message.type"
                >
                  <i :class="getMessageIcon(message.type)"></i>
                  <div class="message-content">
                    <strong>{{ message.title }}</strong>
                    <p>{{ message.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state success">
                <i class="bi bi-check-circle"></i>
                <p>검증 오류가 없습니다</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 상단 이동 버튼 -->
        <Transition name="fade">
          <button
            v-show="showScrollTop"
            @click="scrollToTop"
            class="scroll-to-top"
            aria-label="맨 위로 이동"
          >
            <i class="bi bi-arrow-up"></i>
          </button>
        </Transition>
      </div>
    </div>

    <!-- 액션 푸터 -->
    <div class="action-footer">
      <div class="footer-left">
        <span v-if="schema.pageInfo" class="footer-info">
          <i class="bi bi-info-circle"></i>
          {{ schema.pageInfo.pageId }} - {{ schema.pageInfo.pageTitle }}
        </span>
      </div>
      <div class="footer-right">
        <button 
          class="btn btn-secondary"
          @click="resetAll"
          :disabled="!uploadedFile && !schema.pageInfo"
        >
          <i class="bi bi-arrow-clockwise"></i>
          초기화
        </button>
        <button
          class="btn btn-success btn-lg"
          @click="generateScreen"
          :disabled="!schema.pageInfo || isGenerating"
        >
          <i class="bi" :class="isGenerating ? 'bi-hourglass-split' : 'bi-magic'"></i>
          <span v-if="isGenerating">생성 중...</span>
          <span v-else>화면 생성</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

// ===== 상태 관리 =====
const currentTab = ref('basic');
const tabContainer = ref(null);
const fileInput = ref(null);

// 파일 업로드 상태
const uploadedFile = ref(null);
const isDragOver = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0);
const isParsing = ref(false);
const isGenerating = ref(false);

// 스크롤 상태
const isScrolled = ref(false);
const scrollProgress = ref(0);
const showScrollTop = ref(false);

// 스키마 데이터
const schema = ref({
  pageInfo: null,
  features: {},
  searchConditions: [],
  gridColumns: [],
  buttons: [],
  api: {},
  apiDetails: {},
  gridConfig: null,
  excelMapping: null
});

// 검증 메시지
const validationMessages = ref([]);

// ===== 탭 정의 =====
const tabs = [
  { id: 'basic', label: '기본정보', icon: 'bi bi-info-circle' },
  { id: 'columns', label: '그리드컬럼', icon: 'bi bi-table' },
  { id: 'search', label: '검색조건', icon: 'bi bi-search' },
  { id: 'buttons', label: '버튼정의', icon: 'bi bi-ui-radios' },
  { id: 'api', label: 'API정의', icon: 'bi bi-cloud' },
  { id: 'validation', label: '검증결과', icon: 'bi bi-check-circle' }
];

// ===== 파일 처리 =====
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    uploadFile(file);
  }
};

const handleFileDrop = (event) => {
  isDragOver.value = false;
  const file = event.dataTransfer.files?.[0];
  
  if (file) {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      uploadFile(file);
    } else {
      alert('Excel 파일(.xlsx, .xls)만 업로드 가능합니다.');
    }
  }
};

const uploadFile = (file) => {
  uploadedFile.value = file;
  console.log('파일 업로드:', file.name, formatFileSize(file.size));
};

const removeFile = () => {
  uploadedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// ===== Excel 파싱 =====
const parseExcelFile = async () => {
  if (!uploadedFile.value) return;
  
  isParsing.value = true;
  validationMessages.value = [];
  
  try {
    const arrayBuffer = await uploadedFile.value.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const parsedSchema = {
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      pageInfo: {},
      features: {
        search: true,
        add: true,
        delete: true,
        save: true,
        excelUpload: false,
        excelDownload: true
      },
      searchConditions: [],
      gridColumns: [],
      buttons: [],
      api: {},
      apiDetails: {},
      gridConfig: { height: 600, virtualScrolling: true, displayMode: 'simple' }
    };
    
    parseBasicInfo(workbook, parsedSchema);
    parseGridColumns(workbook, parsedSchema);
    parseSearchConditions(workbook, parsedSchema);
    parseButtonDefinitions(workbook, parsedSchema);
    parseAPIDefinitions(workbook, parsedSchema);
    
    schema.value = parsedSchema;
    validateSchema();
    
    validationMessages.value.unshift({
      type: 'success',
      title: '파싱 완료',
      description: `Excel 파일이 성공적으로 파싱되었습니다. (${schema.value.gridColumns.length}개 컬럼, ${schema.value.searchConditions.length}개 검색조건)`
    });
    
    currentTab.value = 'basic';
    
  } catch (error) {
    console.error('Excel 파싱 오류:', error);
    validationMessages.value.push({
      type: 'error',
      title: '파싱 실패',
      description: error.message || 'Excel 파일을 파싱하는 중 오류가 발생했습니다.'
    });
    currentTab.value = 'validation';
  } finally {
    isParsing.value = false;
  }
};

const parseBasicInfo = (workbook, parsedSchema) => {
  const sheetName = '01_BasicInfo';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.warn('01_BasicInfo 시트를 찾을 수 없습니다.');
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(worksheet);
  const config = {};
  
  // 항목명-값 형식으로 파싱
  data.forEach(row => {
    const key = row['항목명'] || row['Key'];
    const value = row['값'] || row['Value'];
    if (key && value) {
      config[key] = value;
    }
  });
  
  parsedSchema.pageInfo = {
    pageId: config['화면ID'] || config.screenId || '',
    pageTitle: config['화면명(한글)'] || config.screenName || '',
    category: config['카테고리'] || config.category || '',
    description: config['설명'] || `${config['화면명(한글)'] || ''} 화면`
  };
  
  if (config['테이블명']) {
    parsedSchema.tableName = config['테이블명'];
  }
  
  parsedSchema.features.search = config['검색기능'] !== 'N';
  parsedSchema.features.add = config['행 추가 가능'] === 'Y';
  parsedSchema.features.delete = config['행 삭제 가능'] === 'Y';
  parsedSchema.features.excelUpload = config['Excel 업로드'] === 'Y';
  parsedSchema.features.excelDownload = config['Excel 다운로드'] === 'Y';
  
  if (config['페이지 크기']) {
    parsedSchema.gridConfig.pageSize = parseInt(config['페이지 크기']) || 20;
  }
};

const parseGridColumns = (workbook, parsedSchema) => {
  const sheetName = '02_GridColumns';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.warn('02_GridColumns 시트를 찾을 수 없습니다.');
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(worksheet);
  const excelMapping = {};
  
  data.forEach(row => {
    const fieldName = row['Field Name'];
    const header = row['Header Text'] || row['Header'];
    
    if (!fieldName || !header) return;
    
    const dataType = (row['Type'] || '').toLowerCase();
    
    const column = {
      fieldName,
      header,
      dataType: dataType === 'number' ? 'number' : (dataType === 'date' || dataType === 'datetime' ? 'date' : 'text'),
      width: parseInt(row['Width']) || 100,
      align: (row['Align'] || 'left').toLowerCase(),
      editable: row['Editable'] === 'Y',
      required: row['Required'] === 'Y'
    };
    
    if (row['Format']) {
      if (column.dataType === 'number') {
        column.styles = { numberFormat: row['Format'] };
      } else if (dataType === 'date' || dataType === 'datetime') {
        column.dateFormat = row['Format'];
      }
    }
    
    if (row['Default Value']) {
      column.defaultValue = row['Default Value'];
    }
    
    if (row['Validation']) {
      column.validation = row['Validation'];
    }
    
    parsedSchema.gridColumns.push(column);
    
    // Excel Mapping Header가 있으면 excelMapping에 추가
    if (row['Excel Mapping Header']) {
      excelMapping[row['Excel Mapping Header']] = fieldName;
      parsedSchema.features.excelUpload = true;
    }
  });
  
  if (Object.keys(excelMapping).length > 0) {
    parsedSchema.excelMapping = excelMapping;
  }
};

const parseSearchConditions = (workbook, parsedSchema) => {
  const sheetName = '03_SearchConditions';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.warn('03_SearchConditions 시트를 찾을 수 없습니다.');
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  data.forEach(row => {
    const fieldId = row['Field Name'] || row['Field ID'];
    const label = row['Label'];
    
    if (!fieldId || !label) return;
    
    const condition = {
      key: fieldId,
      label,
      type: (row['Type'] || 'text').toLowerCase()
    };
    
    if (row['Options']) {
      // "F001:본사공장,F002:2공장" 형식 파싱
      condition.options = row['Options'].split(',').map(opt => {
        const [value, label] = opt.trim().split(':');
        return label ? { value, label } : { value, label: value };
      });
    }
    
    if (row['Default Value']) {
      condition.defaultValue = row['Default Value'];
    }
    
    if (row['Placeholder']) {
      condition.placeholder = row['Placeholder'];
    }
    
    condition.required = row['Required'] === 'Y';
    
    parsedSchema.searchConditions.push(condition);
  });
};

const parseButtonDefinitions = (workbook, parsedSchema) => {
  const sheetName = '04_ButtonDefinitions';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.warn('04_ButtonDefinitions 시트를 찾을 수 없습니다.');
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  data.forEach(row => {
    const buttonId = row['Button ID'];
    const label = row['Label'];
    
    if (!buttonId || !label) return;
    
    const button = {
      id: buttonId,
      label,
      style: (row['Style'] || 'primary').toLowerCase(),
      icon: row['Icon'] || '',
      position: (row['Position'] || 'grid').toLowerCase(),
      action: row['Action'] || buttonId
    };
    
    if (row['Confirm Message']) {
      button.confirmMessage = row['Confirm Message'];
    }
    
    parsedSchema.buttons.push(button);
  });
};

const parseAPIDefinitions = (workbook, parsedSchema) => {
  const sheetName = '05_APIDefinitions';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    console.warn('05_APIDefinitions 시트를 찾을 수 없습니다.');
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  data.forEach(row => {
    const apiName = row['API Name'];
    const endpoint = row['Endpoint'];
    
    if (!apiName || !endpoint) return;
    
    parsedSchema.api[apiName] = endpoint;
    
    parsedSchema.apiDetails[apiName] = {
      method: (row['HTTP Method'] || row['Method'] || 'GET').toUpperCase(),
      path: endpoint,
      description: row['Description'] || ''
    };
  });
};

// ===== 검증 =====
const validateSchema = () => {
  if (!schema.value.pageInfo?.pageId) {
    validationMessages.value.push({
      type: 'error',
      title: '필수 정보 누락',
      description: '화면 ID가 입력되지 않았습니다.'
    });
  }
  
  if (!schema.value.pageInfo?.pageTitle) {
    validationMessages.value.push({
      type: 'error',
      title: '필수 정보 누락',
      description: '화면명이 입력되지 않았습니다.'
    });
  }
  
  if (schema.value.gridColumns.length === 0) {
    validationMessages.value.push({
      type: 'warning',
      title: '그리드 컬럼 없음',
      description: '그리드 컬럼이 정의되지 않았습니다.'
    });
  }
  
  const fieldNames = new Set();
  schema.value.gridColumns.forEach(col => {
    if (fieldNames.has(col.fieldName)) {
      validationMessages.value.push({
        type: 'error',
        title: '중복 필드명',
        description: `필드명 '${col.fieldName}'이(가) 중복되었습니다.`
      });
    }
    fieldNames.add(col.fieldName);
  });
};

// ===== 화면 생성 =====
const generateScreen = async () => {
  if (!schema.value.pageInfo) return;
  
  isGenerating.value = true;
  
  try {
    console.log('화면 생성 요청:', schema.value);
    alert('화면 생성이 완료되었습니다!\n(Backend API 연동 필요)');
  } catch (error) {
    console.error('화면 생성 오류:', error);
    alert('화면 생성 중 오류가 발생했습니다.');
  } finally {
    isGenerating.value = false;
  }
};

// ===== 템플릿 다운로드 =====
const downloadTemplate = () => {
  const link = document.createElement('a');
  link.href = '/templates/screen-generator-template.xlsx';
  link.download = 'screen-generator-template.xlsx';
  link.click();
};

// ===== 탭 전환 =====
const switchTab = (tabId) => {
  currentTab.value = tabId;
};

const getTabBadgeCount = (tabId) => {
  switch (tabId) {
    case 'columns':
      return schema.value.gridColumns?.length || 0;
    case 'search':
      return schema.value.searchConditions?.length || 0;
    case 'buttons':
      return schema.value.buttons?.length || 0;
    case 'api':
      return Object.keys(schema.value.api || {}).length;
    case 'validation':
      return validationMessages.value.filter(m => m.type === 'error').length;
    default:
      return 0;
  }
};

const getMessageIcon = (type) => {
  switch (type) {
    case 'success': return 'bi bi-check-circle-fill';
    case 'warning': return 'bi bi-exclamation-triangle-fill';
    case 'error': return 'bi bi-x-circle-fill';
    default: return 'bi bi-info-circle-fill';
  }
};

// ===== 스크롤 처리 =====
const handleScroll = () => {
  if (!tabContainer.value) return;
  
  const { scrollTop, scrollHeight, clientHeight } = tabContainer.value;
  
  isScrolled.value = scrollTop > 0;
  
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll > 0) {
    const progress = (scrollTop / maxScroll) * 100;
    scrollProgress.value = Math.min(100, Math.max(0, progress));
  }
  
  showScrollTop.value = scrollTop > 300;
};

const scrollToTop = () => {
  tabContainer.value?.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// ===== 초기화 =====
const resetAll = () => {
  if (confirm('모든 내용을 초기화하시겠습니까?')) {
    uploadedFile.value = null;
    schema.value = {
      pageInfo: null,
      features: {},
      searchConditions: [],
      gridColumns: [],
      buttons: [],
      api: {},
      apiDetails: {},
      gridConfig: null
    };
    validationMessages.value = [];
    currentTab.value = 'basic';
    
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
};
</script>

<style scoped>
/* 전체 레이아웃 */
.screen-generator {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #0078D4;
  margin: 0 0 0.5rem 0;
}

.page-title i {
  margin-right: 0.5rem;
}

.page-description {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

/* 스크롤 진행률 */
.scroll-progress-container {
  position: sticky;
  top: 0;
  height: 3px;
  background: #e0e0e0;
  z-index: 100;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #0078D4 0%, #00BCF2 100%);
  transition: width 0.1s ease-out;
}

/* 메인 컨텐츠 */
.generator-content {
  flex: 1;
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
}

.upload-section,
.preview-section {
  min-height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* 커스텀 스크롤바 */
.upload-section::-webkit-scrollbar,
.preview-section::-webkit-scrollbar,
.tab-content::-webkit-scrollbar {
  width: 8px;
}

.upload-section::-webkit-scrollbar-thumb,
.preview-section::-webkit-scrollbar-thumb,
.tab-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* 카드 */
.section-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: #0078D4;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  padding: 1.5rem;
}

/* 드롭존 */
.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #fafafa;
}

.drop-zone:hover,
.drop-zone.drag-over {
  border-color: #0078D4;
  background: #f0f8ff;
}

.drop-zone.has-file {
  border-style: solid;
  border-color: #10893E;
  background: #f0fff4;
}

.drop-zone-content i {
  font-size: 3rem;
  color: #0078D4;
  margin-bottom: 1rem;
}

.drop-zone-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.drop-zone-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.drop-zone-file {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.drop-zone-file i {
  font-size: 2.5rem;
  color: #10893E;
}

.file-info {
  flex: 1;
  text-align: left;
}

.file-name {
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.file-size {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.btn-remove-file {
  background: none;
  border: none;
  color: #C50F1F;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-remove-file:hover {
  transform: scale(1.1);
}

/* 템플릿 다운로드 */
.template-download {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}

.template-info {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.template-info i {
  margin-right: 0.5rem;
  color: #0078D4;
}

/* 버튼 */
.btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #0078D4;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #106EBE;
}

.btn-secondary {
  background: #605E5C;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #484644;
}

.btn-success {
  background: #10893E;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #0E6F36;
}

.btn-outline-primary {
  background: white;
  color: #0078D4;
  border: 1px solid #0078D4;
}

.btn-outline-primary:hover {
  background: #0078D4;
  color: white;
}

.btn-lg {
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.action-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

.action-buttons .btn {
  flex: 1;
}

/* 탭 */
.preview-tabs {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 2px solid #e0e0e0;
  display: flex;
  gap: 0.25rem;
  padding: 0 1rem;
  transition: box-shadow 0.3s;
}

.preview-tabs.scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #666;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.tab-button:hover {
  color: #0078D4;
  background: #f5f5f5;
}

.tab-button.active {
  color: #0078D4;
  border-bottom-color: #0078D4;
}

.tab-badge {
  background: #0078D4;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  min-width: 20px;
  text-align: center;
}

.tab-content {
  min-height: 0;
  overflow-y: auto;
  padding: 1.5rem;
}

.tab-panel {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.1rem;
  margin: 0;
}

.empty-state.success {
  color: #10893E;
}

.empty-state.success i {
  opacity: 1;
}

/* 기본정보 그리드 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 3px solid #0078D4;
}

.info-item label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.badge-success,
.badge-secondary {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-success {
  background: #D1F0DB;
  color: #0E6F36;
}

.badge-secondary {
  background: #E0E0E0;
  color: #605E5C;
}

/* 컬럼 상세 */
.column-summary h4 {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.column-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.column-item {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 3px solid #10893E;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.column-index {
  background: #10893E;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.column-header strong {
  color: #333;
}

.column-header code {
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.85rem;
  color: #333;
}

.column-details {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.detail-badge {
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #333;
}

.badge-info {
  background: #D1E5F4;
  color: #0078D4;
}

.badge-warning {
  background: #FFF4CE;
  color: #CA5010;
}

/* 검색조건 */
.search-conditions-list,
.buttons-list,
.api-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.condition-item,
.button-item,
.api-item {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 3px solid #FFC000;
}

.condition-header,
.button-details,
.api-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.condition-index {
  background: #FFC000;
  color: #333;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.condition-options {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.option-tag {
  background: #D1E5F4;
  color: #0078D4;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.detail-info {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

/* 버튼 미리보기 */
.button-item {
  border-left-color: #C50F1F;
}

.btn-preview {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.btn-primary { background: #0078D4; color: white; }
.btn-success { background: #10893E; color: white; }
.btn-danger { background: #C50F1F; color: white; }
.btn-warning { background: #CA5010; color: white; }
.btn-info { background: #00BCF2; color: white; }

/* API */
.api-item {
  border-left-color: #7030A0;
}

.api-key {
  background: #7030A0;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 600;
}

.api-path {
  background: #e0e0e0;
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
  font-size: 0.85rem;
  color: #333;
  flex: 1;
}

.method-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.method-get { background: #10893E; }
.method-post { background: #0078D4; }
.method-put { background: #CA5010; }
.method-delete { background: #C50F1F; }
.method-patch { background: #7030A0; }

.api-params {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

/* 검증 메시지 */
.validation-messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.validation-message {
  padding: 1rem;
  border-radius: 4px;
  border-left: 4px solid;
  display: flex;
  gap: 1rem;
}

.validation-message i {
  font-size: 1.5rem;
}

.message-success {
  background: #D1F0DB;
  border-left-color: #10893E;
  color: #0E6F36;
}

.message-warning {
  background: #FFF4CE;
  border-left-color: #CA5010;
  color: #8A3800;
}

.message-error {
  background: #FDE7E9;
  border-left-color: #C50F1F;
  color: #A80000;
}

.message-content {
  flex: 1;
}

.message-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.message-content p {
  margin: 0;
  font-size: 0.9rem;
}

/* 상단 이동 버튼 */
.scroll-to-top {
  position: fixed;
  bottom: 200px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0078D4;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.scroll-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.scroll-to-top i {
  font-size: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 액션 푸터 */
.action-footer {
  background: white;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.footer-left {
  flex: 1;
}

.footer-info {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-right {
  display: flex;
  gap: 1rem;
}

/* 반응형 */
@media (max-width: 1199px) {
  .generator-content {
    grid-template-columns: 1fr;
  }
  
  .scroll-to-top {
    bottom: 100px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 767px) {
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .generator-content {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .action-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .footer-right {
    flex-direction: column;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
