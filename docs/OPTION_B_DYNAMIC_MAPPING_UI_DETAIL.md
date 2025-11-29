# Option B: 동적 매핑 UI 상세 설명

**작성일:** 2025년 11월 29일  
**작성자:** 개발팀 (자비스)  
**목적:** PHASE4_DEVELOPER_RESPONSE.md의 "Option B: 동적 매핑 UI" 개념 명확화

---

## 📋 핵심 개념

**"추가 UI 컴포넌트 필요"**는 **헤더 형식별 컴포넌트 생성이 아니라**, 
**엑셀 업로드 시 사용자가 직접 컬럼 매핑을 수행할 수 있는 범용 UI 컴포넌트**를 의미합니다.

---

## 🎯 Option B가 해결하려는 문제

### 문제 상황
```
사용자가 자유 형식의 엑셀 파일을 업로드할 때:
- 엑셀 헤더: "거래처 이름", "품목번호", "수량", "판매단가"
- DB 컬럼: clientName, itemCode, qty, price

AI는 이 둘을 어떻게 매핑하는가?
→ 매핑 실패 → 런타임 에러
```

### Option B의 해결 방안
```
사용자가 엑셀 업로드 후, 시스템이 동적으로 매핑 UI를 생성
→ 사용자가 직접 엑셀 헤더와 DB 컬럼을 연결
→ 매핑 정확도 100%
```

---

## 🔄 동작 프로세스 (4단계)

### Step 1: 사용자가 자유 형식 엑셀 업로드

**사용자의 엑셀 파일:**
```
| 거래처 이름 | 품목번호 | 수량 | 판매단가 |
|------------|---------|------|---------|
| A회사       | IT001   | 100  | 5000    |
| B회사       | IT002   | 200  | 3000    |
```

**특징:**
- 헤더명이 표준과 다름 ("거래처명" 대신 "거래처 이름")
- 시스템이 자동으로 매핑할 수 없는 상태

---

### Step 2: 시스템이 엑셀 헤더 파싱

**프론트엔드 코드:**
```javascript
async handleFileUpload(event) {
  const file = event.target.files[0]
  
  // 엑셀 파일을 읽어서 헤더 추출
  const reader = new FileReader()
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    
    // 첫 번째 행(헤더) 추출
    const range = XLSX.utils.decode_range(sheet['!ref'])
    const headers = []
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: 0, c: col })]
      if (cell && cell.v) {
        headers.push(cell.v)
      }
    }
    
    // 파싱 결과
    this.excelHeaders = headers  // ["거래처 이름", "품목번호", "수량", "판매단가"]
    this.showMappingUI = true     // 매핑 UI 표시
  }
  
  reader.readAsArrayBuffer(file)
}
```

---

### Step 3: ColumnMapper 컴포넌트 표시

**화면 UI:**
```
┌─────────────────────────────────────────────┐
│  📋 엑셀 컬럼 매핑                             │
│  업로드한 엑셀의 컬럼을 시스템 항목과 연결해주세요. │
├─────────────────────────────────────────────┤
│  엑셀 헤더          →    시스템 컬럼           │
├─────────────────────────────────────────────┤
│  거래처 이름        →    [선택하세요 ▼]        │
│                          - 거래처명 (clientName)
│                          - 부서코드 (deptCode)
│                          - 계정코드 (accountCode)
├─────────────────────────────────────────────┤
│  품목번호          →    [선택하세요 ▼]         │
│                          - 품목코드 (itemCode)
│                          - 부서코드 (deptCode)
├─────────────────────────────────────────────┤
│  수량              →    [선택하세요 ▼]         │
│                          - 수량 (qty)
│                          - 현재금액 (currentAmount)
├─────────────────────────────────────────────┤
│  판매단가          →    [선택하세요 ▼]         │
│                          - 단가 (price)
│                          - 현재금액 (currentAmount)
├─────────────────────────────────────────────┤
│              [매핑 완료]                      │
└─────────────────────────────────────────────┘
```

**Vue 컴포넌트 구현:**
```vue
<template>
  <div class="column-mapper-modal">
    <h3>📋 엑셀 컬럼 매핑</h3>
    <p>업로드한 엑셀의 컬럼을 시스템 항목과 연결해주세요.</p>
    
    <table class="mapping-table">
      <thead>
        <tr>
          <th>엑셀 헤더</th>
          <th>→</th>
          <th>시스템 컬럼</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="excelHeader in excelHeaders" :key="excelHeader">
          <td class="excel-header">{{ excelHeader }}</td>
          <td>→</td>
          <td>
            <select v-model="mapping[excelHeader]" class="db-column-select">
              <option value="">선택하세요</option>
              <option 
                v-for="dbCol in dbColumns" 
                :key="dbCol.field"
                :value="dbCol.field"
              >
                {{ dbCol.header }} ({{ dbCol.field }})
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- 검증 오류 표시 -->
    <div v-if="validationErrors.length > 0" class="error-panel">
      <h4>⚠️ 검증 오류</h4>
      <ul>
        <li v-for="(error, idx) in validationErrors" :key="idx">
          {{ error }}
        </li>
      </ul>
    </div>
    
    <div class="button-group">
      <button @click="confirmMapping" class="btn-primary">매핑 완료</button>
      <button @click="cancelMapping" class="btn-secondary">취소</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnMapper',
  props: {
    excelHeaders: {
      type: Array,
      required: true,
      // 예: ["거래처 이름", "품목번호", "수량", "판매단가"]
    },
    dbColumns: {
      type: Array,
      required: true,
      // 예: [{field: "clientName", header: "거래처명"}, ...]
    },
    autoMapping: {
      type: Boolean,
      default: true  // AI 자동 추천 사용 여부
    }
  },
  data() {
    return {
      mapping: {},              // { "거래처 이름": "clientName", ... }
      autoSuggestions: [],      // AI 추천 매핑
      validationErrors: []
    }
  },
  mounted() {
    if (this.autoMapping) {
      this.generateAutoSuggestions()
    }
  },
  methods: {
    generateAutoSuggestions() {
      // 간단한 유사도 기반 자동 매핑 추천
      this.excelHeaders.forEach(excelHeader => {
        this.dbColumns.forEach(dbCol => {
          const similarity = this.calculateSimilarity(
            excelHeader.toLowerCase(),
            dbCol.header.toLowerCase()
          )
          
          if (similarity > 0.7) {
            this.autoSuggestions.push({
              excelHeader: excelHeader,
              dbField: dbCol.field,
              dbHeader: dbCol.header,
              confidence: Math.round(similarity * 100)
            })
            
            // 자동으로 매핑 설정 (사용자가 수정 가능)
            if (!this.mapping[excelHeader]) {
              this.mapping[excelHeader] = dbCol.field
            }
          }
        })
      })
    },
    
    calculateSimilarity(str1, str2) {
      // 간단한 포함 여부 체크 (실제로는 Levenshtein Distance 등 사용)
      if (str1.includes(str2) || str2.includes(str1)) {
        return 0.9
      }
      
      // 공통 문자 비율 계산
      const commonChars = [...str1].filter(c => str2.includes(c)).length
      const maxLength = Math.max(str1.length, str2.length)
      return commonChars / maxLength
    },
    
    validateMapping() {
      this.validationErrors = []
      
      // 1. 모든 엑셀 헤더가 매핑되었는지 확인
      const unmappedHeaders = this.excelHeaders.filter(
        header => !this.mapping[header]
      )
      
      if (unmappedHeaders.length > 0) {
        this.validationErrors.push(
          `매핑되지 않은 컬럼: ${unmappedHeaders.join(', ')}`
        )
      }
      
      // 2. 중복 매핑 확인
      const mappedFields = Object.values(this.mapping)
      const duplicates = mappedFields.filter(
        (field, index) => mappedFields.indexOf(field) !== index
      )
      
      if (duplicates.length > 0) {
        this.validationErrors.push(
          `중복 매핑된 컬럼: ${duplicates.join(', ')}`
        )
      }
      
      return this.validationErrors.length === 0
    },
    
    confirmMapping() {
      if (this.validateMapping()) {
        this.$emit('mapping-complete', this.mapping)
      }
    },
    
    cancelMapping() {
      this.$emit('mapping-cancel')
    }
  }
}
</script>

<style scoped>
.column-mapper-modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.mapping-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.mapping-table th,
.mapping-table td {
  padding: 12px;
  border: 1px solid #e0e0e0;
}

.excel-header {
  font-weight: 600;
  background: #f5f5f5;
}

.db-column-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-panel {
  background: #fff3cd;
  border: 1px solid #ffc107;
  padding: 12px;
  border-radius: 4px;
  margin-top: 16px;
}

.button-group {
  margin-top: 16px;
  text-align: right;
}

.btn-primary {
  background: #1976d2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.btn-secondary {
  background: #757575;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

### Step 4: 매핑 결과 전송 및 업로드

**사용자가 매핑 완료 버튼 클릭 시:**
```javascript
// StandardPage.vue
methods: {
  handleMappingComplete(mapping) {
    // mapping = {
    //   "거래처 이름": "clientName",
    //   "품목번호": "itemCode",
    //   "수량": "qty",
    //   "판매단가": "price"
    // }
    
    this.columnMapping = mapping
    this.showMappingUI = false
    
    // 백엔드로 매핑 정보와 함께 파일 업로드
    this.uploadExcelWithMapping()
  },
  
  async uploadExcelWithMapping() {
    const formData = new FormData()
    formData.append('file', this.selectedFile)
    formData.append('mapping', JSON.stringify(this.columnMapping))
    
    try {
      const response = await fetch(
        `http://localhost:8080${this.schemaData.api.upload}`,
        {
          method: 'POST',
          body: formData
        }
      )
      
      if (response.ok) {
        alert('업로드 완료')
        this.handleSearch()  // 그리드 새로고침
      } else {
        const errorData = await response.json()
        this.uploadErrors = errorData.errors || []
        alert('업로드 실패')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('업로드 중 오류 발생')
    }
  }
}
```

**백엔드에서 매핑 정보 수신:**
```java
@PostMapping("/cost/cost001/upload")
public Map<String, Object> upload(
    @RequestParam("file") MultipartFile file,
    @RequestParam("mapping") String mappingJson
) throws IOException {
    
    // 매핑 정보 파싱
    ObjectMapper mapper = new ObjectMapper();
    Map<String, String> columnMapping = mapper.readValue(
        mappingJson, 
        new TypeReference<Map<String, String>>() {}
    );
    
    // columnMapping = {
    //   "거래처 이름": "clientName",
    //   "품목번호": "itemCode",
    //   "수량": "qty",
    //   "판매단가": "price"
    // }
    
    // ExcelUtils로 파싱
    List<Map<String, Object>> dataList = ExcelUtils.parseExcel(file, columnMapping);
    
    // DB 저장
    int insertedCount = service.uploadExcel(dataList);
    
    return Map.of("success", true, "count", insertedCount);
}
```

---

## 🎨 추가 UI 컴포넌트 목록

### 1. ColumnMapper.vue ⭐ (핵심)
- **역할:** 엑셀 헤더 ↔ DB 컬럼 매핑 UI
- **입력:** excelHeaders (배열), dbColumns (배열)
- **출력:** mapping (객체)
- **특징:** 
  - AI 자동 추천 기능
  - 유사도 기반 자동 매핑
  - 검증 기능 (미매핑, 중복 체크)

### 2. ExcelPreview.vue
- **역할:** 엑셀 파일 미리보기 (처음 5~10행)
- **입력:** headers (배열), data (배열)
- **출력:** 없음 (표시만)
- **특징:**
  - 업로드 전 데이터 확인
  - 헤더 검증 보조

```vue
<template>
  <div class="excel-preview">
    <h4>📄 엑셀 미리보기 (처음 {{ previewRows }}행)</h4>
    <div class="table-wrapper">
      <table class="preview-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in previewData" :key="idx">
            <td v-for="header in headers" :key="header">
              {{ row[header] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExcelPreview',
  props: {
    headers: Array,      // ["거래처 이름", "품목번호", ...]
    data: Array,         // [{...}, {...}]
    previewRows: {
      type: Number,
      default: 5
    }
  },
  computed: {
    previewData() {
      return this.data.slice(0, this.previewRows)
    }
  }
}
</script>
```

### 3. UploadProgress.vue
- **역할:** 업로드 진행률 표시
- **입력:** progress (숫자), currentRow (숫자), totalRows (숫자)
- **출력:** 없음
- **특징:**
  - 프로그레스 바
  - 현재 진행 행 표시
  - 예상 완료 시간 (optional)

```vue
<template>
  <div class="upload-progress">
    <h4>📤 업로드 진행 중...</h4>
    
    <div class="progress-bar-wrapper">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    
    <p class="progress-text">
      {{ progress }}% 
      ({{ currentRow }} / {{ totalRows }} 행)
    </p>
    
    <div v-if="estimatedTime > 0" class="estimated-time">
      예상 완료 시간: {{ formatTime(estimatedTime) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadProgress',
  props: {
    progress: Number,      // 0~100
    currentRow: Number,
    totalRows: Number
  },
  computed: {
    estimatedTime() {
      if (this.progress === 0) return 0
      const elapsed = (Date.now() - this.startTime) / 1000  // 초
      const remaining = (elapsed / this.progress) * (100 - this.progress)
      return Math.ceil(remaining)
    }
  },
  data() {
    return {
      startTime: Date.now()
    }
  },
  methods: {
    formatTime(seconds) {
      if (seconds < 60) {
        return `${seconds}초`
      }
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}분 ${secs}초`
    }
  }
}
</script>
```

### 4. UploadErrorList.vue
- **역할:** 업로드 오류 목록 표시
- **입력:** errors (배열)
- **출력:** 없음
- **특징:**
  - 행 번호별 오류 표시
  - 오류 타입별 색상 구분
  - Excel 다운로드 (오류 행만)

```vue
<template>
  <div v-if="errors.length > 0" class="error-list-panel">
    <h4>⚠️ 업로드 오류 ({{ errors.length }}건)</h4>
    
    <div class="error-summary">
      <span class="error-type critical">심각: {{ criticalCount }}</span>
      <span class="error-type warning">경고: {{ warningCount }}</span>
    </div>
    
    <div class="error-table-wrapper">
      <table class="error-table">
        <thead>
          <tr>
            <th>행</th>
            <th>컬럼</th>
            <th>오류 내용</th>
            <th>타입</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(error, idx) in errors" 
            :key="idx"
            :class="'error-' + error.type"
          >
            <td>{{ error.row }}</td>
            <td>{{ error.column }}</td>
            <td>{{ error.message }}</td>
            <td>
              <span :class="'badge badge-' + error.type">
                {{ errorTypeLabel(error.type) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <button @click="downloadErrorReport" class="btn-download">
      오류 리포트 다운로드
    </button>
  </div>
</template>

<script>
export default {
  name: 'UploadErrorList',
  props: {
    errors: Array  
    // 예: [
    //   { row: 3, column: '수량', message: '숫자 형식이 아닙니다', type: 'critical' },
    //   { row: 5, column: '단가', message: '음수는 허용되지 않습니다', type: 'warning' }
    // ]
  },
  computed: {
    criticalCount() {
      return this.errors.filter(e => e.type === 'critical').length
    },
    warningCount() {
      return this.errors.filter(e => e.type === 'warning').length
    }
  },
  methods: {
    errorTypeLabel(type) {
      const labels = {
        critical: '심각',
        warning: '경고',
        info: '정보'
      }
      return labels[type] || type
    },
    
    downloadErrorReport() {
      // CSV 형식으로 오류 리포트 생성
      const csv = [
        ['행', '컬럼', '오류 내용', '타입'],
        ...this.errors.map(e => [e.row, e.column, e.message, e.type])
      ]
      
      const csvContent = csv.map(row => row.join(',')).join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'upload_errors.csv'
      link.click()
    }
  }
}
</script>
```

---

## 📦 StandardPage.vue 통합

**전체 업로드 플로우:**
```vue
<template>
  <div class="standard-page">
    <!-- 기존 검색/그리드 UI -->
    
    <!-- 엑셀 업로드 버튼 -->
    <button 
      v-if="schemaData.features?.excelUpload" 
      @click="showUploadDialog = true"
      class="btn-excel-upload"
    >
      📤 엑셀 업로드
    </button>
    
    <!-- 업로드 다이얼로그 -->
    <el-dialog 
      v-model="showUploadDialog" 
      title="엑셀 업로드"
      width="800px"
    >
      <!-- Step 1: 파일 선택 -->
      <div v-if="uploadStep === 1" class="upload-step">
        <h4>1단계: 파일 선택</h4>
        <input 
          type="file" 
          @change="handleFileSelect" 
          accept=".xlsx,.xls"
          ref="fileInput"
        />
        <div class="file-info" v-if="selectedFile">
          <p>파일명: {{ selectedFile.name }}</p>
          <p>크기: {{ formatFileSize(selectedFile.size) }}</p>
        </div>
      </div>
      
      <!-- Step 2: 미리보기 -->
      <div v-if="uploadStep === 2" class="upload-step">
        <h4>2단계: 데이터 확인</h4>
        <ExcelPreview
          :headers="parsedHeaders"
          :data="previewData"
          :preview-rows="5"
        />
        <button @click="uploadStep = 3">다음</button>
      </div>
      
      <!-- Step 3: 컬럼 매핑 -->
      <div v-if="uploadStep === 3" class="upload-step">
        <h4>3단계: 컬럼 매핑</h4>
        <ColumnMapper
          :excel-headers="parsedHeaders"
          :db-columns="schemaData.gridColumns"
          :auto-mapping="true"
          @mapping-complete="handleMappingComplete"
          @mapping-cancel="cancelUpload"
        />
      </div>
      
      <!-- Step 4: 업로드 진행 -->
      <div v-if="uploadStep === 4" class="upload-step">
        <h4>4단계: 업로드 중</h4>
        <UploadProgress
          :progress="uploadProgress"
          :current-row="currentRow"
          :total-rows="totalRows"
        />
      </div>
      
      <!-- Step 5: 결과 (성공 or 오류) -->
      <div v-if="uploadStep === 5" class="upload-step">
        <h4>5단계: 완료</h4>
        <div v-if="uploadErrors.length === 0" class="success-message">
          ✅ {{ uploadedCount }}건 업로드 완료
        </div>
        <UploadErrorList
          v-else
          :errors="uploadErrors"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ColumnMapper from '@/components/ColumnMapper.vue'
import ExcelPreview from '@/components/ExcelPreview.vue'
import UploadProgress from '@/components/UploadProgress.vue'
import UploadErrorList from '@/components/UploadErrorList.vue'
import * as XLSX from 'xlsx'

export default {
  components: {
    ColumnMapper,
    ExcelPreview,
    UploadProgress,
    UploadErrorList
  },
  data() {
    return {
      showUploadDialog: false,
      uploadStep: 1,           // 1~5
      selectedFile: null,
      parsedHeaders: [],
      previewData: [],
      columnMapping: {},
      uploadProgress: 0,
      currentRow: 0,
      totalRows: 0,
      uploadedCount: 0,
      uploadErrors: []
    }
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0]
      
      if (!this.selectedFile) return
      
      // 파일 크기 검증
      if (this.selectedFile.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB 이하여야 합니다')
        this.resetUpload()
        return
      }
      
      // 엑셀 파일 파싱
      this.parseExcelFile()
    },
    
    parseExcelFile() {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        
        // JSON 형태로 변환
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        
        // 첫 번째 행이 헤더
        this.parsedHeaders = jsonData[0]
        
        // 데이터 행들 (미리보기용)
        this.previewData = jsonData.slice(1, 11).map(row => {
          const obj = {}
          this.parsedHeaders.forEach((header, idx) => {
            obj[header] = row[idx]
          })
          return obj
        })
        
        this.totalRows = jsonData.length - 1
        this.uploadStep = 2  // 미리보기 단계로
      }
      
      reader.onerror = (err) => {
        console.error('File read error:', err)
        alert('파일을 읽을 수 없습니다')
      }
      
      reader.readAsArrayBuffer(this.selectedFile)
    },
    
    handleMappingComplete(mapping) {
      this.columnMapping = mapping
      this.uploadStep = 4  // 업로드 진행
      this.uploadExcelWithMapping()
    },
    
    async uploadExcelWithMapping() {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('mapping', JSON.stringify(this.columnMapping))
      
      try {
        const response = await fetch(
          `http://localhost:8080${this.schemaData.api.upload}`,
          {
            method: 'POST',
            body: formData,
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }
          }
        )
        
        const result = await response.json()
        
        if (response.ok) {
          this.uploadedCount = result.count || 0
          this.uploadErrors = result.errors || []
        } else {
          this.uploadErrors = result.errors || [
            { row: 0, column: '', message: '업로드 실패', type: 'critical' }
          ]
        }
        
        this.uploadStep = 5  // 결과 표시
        
      } catch (err) {
        console.error('Upload error:', err)
        this.uploadErrors = [
          { row: 0, column: '', message: err.message, type: 'critical' }
        ]
        this.uploadStep = 5
      }
    },
    
    cancelUpload() {
      this.resetUpload()
      this.showUploadDialog = false
    },
    
    resetUpload() {
      this.uploadStep = 1
      this.selectedFile = null
      this.parsedHeaders = []
      this.previewData = []
      this.columnMapping = {}
      this.uploadProgress = 0
      this.uploadedCount = 0
      this.uploadErrors = []
    },
    
    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }
  }
}
</script>
```

---

## 🚫 오해하기 쉬운 개념

### ❌ 잘못된 이해: "헤더 형식별 컴포넌트"
```
ClientHeaderMapper.vue       → 거래처 관련 엑셀 전용
ItemHeaderMapper.vue         → 품목 관련 엑셀 전용
SalesHeaderMapper.vue        → 판매 관련 엑셀 전용
PurchaseHeaderMapper.vue     → 구매 관련 엑셀 전용
...

문제점:
- 화면마다 별도 컴포넌트 필요 (유지보수 지옥)
- 코드 중복 발생
- 확장성 제로
```

### ✅ 올바른 이해: "범용 매핑 컴포넌트"
```
ColumnMapper.vue             → 모든 화면 공통 사용

장점:
- 한 번 개발, 무한 재사용
- Props로 동적 설정 (excelHeaders, dbColumns)
- 유지보수 용이
- 확장성 높음

사용 예시:
<ColumnMapper
  :excel-headers="['거래처명', '품목코드']"
  :db-columns="[{field: 'clientName', header: '거래처명'}]"
/>

<ColumnMapper
  :excel-headers="['사원명', '부서']"
  :db-columns="[{field: 'empName', header: '사원명'}]"
/>

→ 동일한 컴포넌트, 다른 데이터
```

---

## 📊 개발 시간 예상

### Option B 구현 시 필요한 작업

| 작업 항목 | 소요 시간 | 비고 |
|----------|----------|------|
| ColumnMapper.vue 개발 | 3일 | AI 추천 기능 포함 |
| ExcelPreview.vue 개발 | 1일 | 단순 표시 컴포넌트 |
| UploadProgress.vue 개발 | 1일 | 프로그레스 바 |
| UploadErrorList.vue 개발 | 1일 | 오류 목록 표시 |
| StandardPage.vue 통합 | 2일 | 5단계 플로우 구현 |
| 백엔드 API 연동 | 2일 | 매핑 정보 처리 |
| 테스트 및 버그 수정 | 3일 | 다양한 엑셀 형식 테스트 |
| **총계** | **13일 (약 2.5주)** | |

---

## ⚖️ Option A vs Option B 비교

### Option A: 템플릿 강제
```
사용자: 템플릿 다운로드 → 데이터 입력 → 업로드
시스템: 헤더 검증 → DB 저장

장점:
✅ 개발 1주
✅ 오류 가능성 낮음
✅ 사용자 교육 쉬움

단점:
🔴 유연성 제로
🔴 기존 엑셀 사용 불가
```

### Option B: 동적 매핑 UI
```
사용자: 자유 형식 엑셀 업로드 → 매핑 UI에서 연결 → 업로드
시스템: 헤더 파싱 → 매핑 UI 표시 → 사용자 매핑 → DB 저장

장점:
✅ 유연성 높음
✅ 기존 엑셀 사용 가능
✅ AI 자동 추천 (부가기능)

단점:
🔴 개발 2.5주
🔴 UX 복잡도 증가
🔴 사용자가 DB 컬럼 이해 필요
```

---

## 🎯 결론

### "추가 UI 컴포넌트 필요"의 정확한 의미

1. **ColumnMapper.vue** (핵심)
   - 엑셀 헤더 ↔ DB 컬럼 매핑 UI
   - AI 자동 추천 기능
   - 검증 기능

2. **ExcelPreview.vue**
   - 업로드 전 데이터 미리보기

3. **UploadProgress.vue**
   - 업로드 진행률 표시

4. **UploadErrorList.vue**
   - 업로드 오류 목록 표시

→ **총 4개의 범용 컴포넌트**를 한 번만 개발하면, 모든 화면에서 재사용 가능

→ **헤더 형식별로 별도 컴포넌트를 만드는 것이 아닙니다!** 🎯

---

## 💭 최종 권장사항

### Phase 4 전략
```
Phase 4-A-1 (1주): 템플릿 기반 업로드
  → 빠른 구현, 안정적

Phase 5 (선택, 2.5주): 동적 매핑 UI 추가
  → 사용자 피드백 후 결정
  → 실제 필요성 검증 후 진행
```

**이유:**
- Option B는 훌륭하지만 **과잉 엔지니어링** 가능성
- 실제 사용자가 자유 형식 업로드를 얼마나 원하는지 불명확
- 템플릿 방식으로 먼저 출시 → 사용자 요구 확인 → 동적 매핑 추가

---

**작성:** 개발팀 자비스  
**검토 요청:** 설계팀 PM  
**관련 문서:** PHASE4_DEVELOPER_RESPONSE.md
