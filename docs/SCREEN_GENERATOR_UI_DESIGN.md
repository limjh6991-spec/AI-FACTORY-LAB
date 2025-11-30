# 화면생성기 UI 설계서 (Excel 기반)

## 개요
기존 텍스트 PI 입력 방식에서 **Excel 템플릿 업로드 방식**으로 전환한 화면생성기 UI 설계입니다.

---

## 화면 레이아웃

### 전체 구조 (뷰포트 기준)
```
┌─────────────────────────────────────────────────────────────┐
│  [페이지 헤더] - 고정 (height: 100px)                         │
│  화면 생성기                                                   │
│  Excel 템플릿 파일을 업로드하여 자동으로 화면을 생성합니다      │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┬────────────────────────────────────────┐
│                      │ ↕ 스크롤 가능 영역                      │
│  [좌측: 업로드 영역]  │ ┌────────────────────────────────────┐ │
│  ↕ 스크롤 가능        │ │ [우측: 미리보기 및 검증]            │ │
│                      │ │                                     │ │
│  1단계: Excel 업로드  │ │ 2단계: 템플릿 검증 및 미리보기       │ │
│  ┌────────────────┐ │ │                                     │ │
│  │ Drag & Drop    │ │ │ [탭 메뉴] - 고정                    │ │
│  │ 파일 선택 버튼  │ │ │ • 기본정보 • 그리드컬럼 • 검색조건   │ │
│  │ 진행률 표시    │ │ │                                     │ │
│  └────────────────┘ │ │ [탭 컨텐츠] - 스크롤 (min-height)   │ │
│                      │ │ ┌─────────────────────────────────┐ │ │
│  ┌────────────────┐ │ │ │ [그리드컬럼 탭일 때]              │ │ │
│  │ 템플릿 다운로드 │ │ │ │                                  │ │ │
│  │ (고정 위치)    │ │ │ │ ┌─────────────────────────────┐ │ │ │
│  └────────────────┘ │ │ │ │ RealGrid 미리보기            │ │ │ │
│                      │ │ │ │ (height: 400px, 고정)       │ │ │ │
│  [오류 메시지]       │ │ │ │ ↕ 그리드 내부 스크롤         │ │ │ │
│  (필요시 표시)       │ │ │ │                             │ │ │ │
│                      │ │ │ └─────────────────────────────┘ │ │ │
│                      │ │ │                                  │ │ │
│                      │ │ │ 컬럼 요약 정보                    │ │ │
│                      │ │ └─────────────────────────────────┘ │ │
│                      │ └────────────────────────────────────┘ │
└──────────────────────┴────────────────────────────────────────┘
                       ↑ 뷰포트 높이: calc(100vh - 260px)

┌─────────────────────────────────────────────────────────────┐
│  [하단: 액션 영역] - 고정 (height: 160px)                     │
│                                                               │
│  [초기화]                               [화면 생성] ← 버튼    │
│                                                               │
│  [생성 진행 상태] (생성 중일 때만 표시)                        │
│  ① Vue 컴포넌트 ② JSON 스키마 ③ Java Controller...          │
└─────────────────────────────────────────────────────────────┘
```

### 스크롤 전략

#### 전체 페이지 구조
```scss
.screen-generator {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; // 전체 페이지 스크롤 방지
  
  .page-header {
    flex-shrink: 0; // 고정
    height: 100px;
  }
  
  .generator-content {
    flex: 1; // 남은 공간 차지
    min-height: 0; // Flexbox 스크롤 버그 방지
    overflow: hidden; // 자식 스크롤 활성화
  }
  
  .action-footer {
    flex-shrink: 0; // 고정
    max-height: 160px; // 생성 진행 시 늘어남
  }
}
```

#### 좌우 패널 스크롤
```scss
.generator-content {
  display: grid;
  grid-template-columns: 500px 1fr; // 좌측 고정폭, 우측 가변
  gap: 20px;
  padding: 20px;
  overflow: hidden; // 그리드 자체는 스크롤 없음
  
  .upload-section,
  .preview-section {
    display: flex;
    flex-direction: column;
    min-height: 0; // 중요!
    overflow-y: auto; // 각 패널별 세로 스크롤
    overflow-x: hidden;
    
    // 스크롤바 스타일링 (Webkit)
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
```

#### RealGrid 영역 스크롤
```scss
.grid-preview-container {
  height: 400px; // 고정 높이
  border: 1px solid var(--neutral-gray-20);
  border-radius: var(--border-radius-md);
  overflow: hidden; // RealGrid 자체 스크롤 사용
  
  // RealGrid 내부에서 스크롤 처리
  // - 세로 스크롤: 행이 많을 때
  // - 가로 스크롤: 컬럼 너비 합계가 넓을 때
}
```

---

## 주요 컴포넌트 설계

### 1. Excel 업로드 영역

#### 드래그 앤 드롭 존
```vue
<div class="drop-zone">
  <!-- 기본 상태 -->
  <i class="bi bi-file-earmark-excel"></i>
  <p>Excel 템플릿 파일을 끌어다 놓거나 클릭하세요</p>
  <p class="hint">지원 형식: .xlsx | 최대 크기: 5MB</p>
  
  <!-- 드래그 중 -->
  <i class="bi bi-cloud-upload" (파란색, 크게)</i>
  <p>여기에 파일을 놓으세요</p>
  
  <!-- 업로드 완료 -->
  <i class="bi bi-check-circle" (초록색)</i>
  <p>COST001_ScreenDefinition.xlsx</p>
  <p>2.3MB | 업로드 완료</p>
  <button>[파일 제거]</button>
</div>
```

#### 진행 표시줄
```vue
<div class="progress-container" (업로드 중에만 표시)>
  <div class="progress-bar">
    <div class="progress-fill" width="75%"></div>
  </div>
  <p>75% 파싱 중...</p>
</div>
```

#### 템플릿 다운로드 섹션
```vue
<div class="template-download">
  <i class="bi bi-info-circle"></i>
  <p>템플릿 파일이 필요하신가요?</p>
  <button>[템플릿 파일 다운로드]</button>
</div>
```

---

### 2. 미리보기 탭

#### 탭 구조
```
┌─────────────────────────────────────────────────────────┐
│ [기본정보 6] [그리드컬럼 12] [검색조건 7] [버튼 6] [API 5] [검증] │
└─────────────────────────────────────────────────────────┘
```
*숫자는 각 탭의 데이터 개수*

#### ① 기본정보 탭
```vue
<div class="info-grid" (2열 그리드)>
  <div class="info-item">
    <label>화면ID</label>
    <div class="value">COST001</div>
  </div>
  <div class="info-item">
    <label>화면명(한글)</label>
    <div class="value">공정별 재료비 관리</div>
  </div>
  <div class="info-item">
    <label>화면명(영문)</label>
    <div class="value">Process Material Cost</div>
  </div>
  ...
</div>
```

#### ② 그리드컬럼 탭 (핵심!)
```vue
<div class="grid-preview-container">
  <!-- RealGrid 실제 미리보기 -->
  <RealGrid
    :columns="parsedColumns"
    :data="[]"
    :options="{ displayMode: 'simple', header: { height: 35 } }"
    style="height: 400px;"
  />
</div>

<div class="column-summary">
  <i class="bi bi-table"></i>
  <p>총 12개 컬럼 정의됨</p>
</div>
```

**RealGrid 컬럼 매핑 예시:**
```javascript
// Excel에서 파싱된 데이터
const excelColumns = [
  {
    '컬럼명': 'costId',
    '한글명': '비용ID',
    '데이터타입': 'number',
    '너비': 80,
    '정렬': 'center',
    '필수': 'Y',
    '편집가능': 'N'
  },
  ...
];

// RealGrid 형식으로 변환
const gridColumns = excelColumns.map(col => ({
  name: col['컬럼명'],
  fieldName: col['컬럼명'],
  header: { text: col['한글명'] },
  width: col['너비'] || 100,
  editable: col['편집가능'] === 'Y',
  type: mapDataType(col['데이터타입']),
  styles: {
    textAlignment: col['정렬'] || 'left'
  }
}));
```

#### ③ 검색조건 탭
```vue
<div class="search-preview">
  <div class="search-field-item">
    <span class="field-label">검색어</span>
    <span class="field-type">text</span>
    <span class="field-width">col-6</span>
  </div>
  <div class="search-field-item">
    <span class="field-label">검색구분</span>
    <span class="field-type">select</span>
    <span class="field-required">필수</span>
    <span class="field-options">ALL:전체;PROCESS:공정;MATERIAL:자재</span>
  </div>
  ...
</div>
```

#### ④ 버튼정의 탭
```vue
<div class="button-preview">
  <div class="button-item">
    <button class="preview-btn btn-search">
      <i class="bi bi-search"></i> 조회
    </button>
    <span class="btn-description">데이터 조회</span>
  </div>
  <div class="button-item">
    <button class="preview-btn btn-add">
      <i class="bi bi-plus-circle"></i> 행추가
    </button>
    <span class="btn-description">새 행 추가</span>
  </div>
  ...
</div>
```

#### ⑤ API정의 탭
```vue
<div class="api-list">
  <div class="api-item">
    <div class="api-header">
      <span class="method method-post">POST</span>
      <span class="path">/api/cost/search</span>
    </div>
    <p class="description">비용 목록 조회</p>
    <p class="params">
      <i class="bi bi-arrow-right"></i>
      searchKeyword, searchType, dateFrom, dateTo
    </p>
  </div>
  ...
</div>
```

#### ⑥ 검증결과 탭
```vue
<div class="validation-summary">
  <div class="summary-item summary-success">
    <i class="bi bi-check-circle"></i>
    <span>성공: 8</span>
  </div>
  <div class="summary-item summary-warning">
    <i class="bi bi-exclamation-triangle"></i>
    <span>경고: 2</span>
  </div>
  <div class="summary-item summary-error">
    <i class="bi bi-x-circle"></i>
    <span>오류: 0</span>
  </div>
</div>

<div class="validation-messages">
  <div class="message message-success">
    <i class="bi bi-check-circle"></i>
    <strong>화면ID 검증 통과</strong>
    <p>화면ID: COST001</p>
  </div>
  <div class="message message-error">
    <i class="bi bi-x-circle"></i>
    <strong>중복 컬럼명 발견</strong>
    <p>중복된 컬럼: costDate</p>
  </div>
  ...
</div>
```

---

### 3. 액션 버튼 영역

```vue
<div class="action-footer">
  <div class="action-buttons">
    <button class="btn-secondary">
      <i class="bi bi-arrow-counterclockwise"></i>
      초기화
    </button>
    
    <button class="btn-primary" :disabled="!canGenerate">
      <i class="bi bi-gear"></i>
      화면 생성
    </button>
  </div>
  
  <!-- 생성 진행 중 -->
  <div class="generation-progress" (생성 중에만 표시)>
    <div class="progress-steps">
      <div class="step step-completed">
        <i class="bi bi-check-circle"></i>
        <span>Vue 컴포넌트</span>
      </div>
      <div class="step step-active">
        <i class="bi bi-hourglass-split spin"></i>
        <span>JSON 스키마</span>
      </div>
      <div class="step step-pending">
        <i class="bi bi-circle"></i>
        <span>Java Controller</span>
      </div>
      ...
    </div>
  </div>
</div>
```

---

### 4. 성공 다이얼로그

```vue
<div class="dialog-overlay">
  <div class="dialog-content success-dialog">
    <div class="dialog-icon">
      <i class="bi bi-check-circle-fill" (초록색, 큰 아이콘)></i>
    </div>
    
    <h2>화면 생성 완료!</h2>
    <p>COST001 공정별 재료비 관리 화면이 성공적으로 생성되었습니다.</p>
    
    <div class="generated-files">
      <h4>생성된 파일:</h4>
      <ul>
        <li>
          <i class="bi bi-file-earmark-code"></i>
          frontend/src/views/cost/COST001.vue
        </li>
        <li>
          <i class="bi bi-file-earmark-text"></i>
          frontend/public/schemas/COST001.json
        </li>
        <li>
          <i class="bi bi-file-earmark-code"></i>
          backend/src/main/java/.../COST001Controller.java
        </li>
        <li>
          <i class="bi bi-file-earmark-code"></i>
          backend/src/main/resources/mapper/COST001Mapper.xml
        </li>
      </ul>
    </div>
    
    <div class="dialog-actions">
      <button class="btn-secondary">닫기</button>
      <button class="btn-primary">
        <i class="bi bi-arrow-right"></i>
        화면으로 이동
      </button>
    </div>
  </div>
</div>
```

---

## 상태 플로우

### 1. 초기 상태
```
┌──────────────┐     ┌──────────────┐
│ Excel 업로드  │     │ 빈 미리보기   │
│              │     │              │
│ [템플릿 다운] │     │ "Excel 파일  │
│              │     │  업로드하면   │
│              │     │  표시됩니다"  │
└──────────────┘     └──────────────┘
```

### 2. 업로드 중
```
┌──────────────┐     ┌──────────────┐
│ 진행률 표시   │     │ 빈 상태 유지  │
│ ████░░░░ 40% │     │              │
│ "파싱 중..."  │     │              │
└──────────────┘     └──────────────┘
```

### 3. 업로드 완료
```
┌──────────────┐     ┌──────────────┐
│ 파일 정보     │     │ 탭 활성화     │
│ ✓ 업로드 완료 │ --> │ [기본정보 6]  │
│ [파일 제거]   │     │ [그리드 12]   │
└──────────────┘     │ [검색 7] ...  │
                    └──────────────┘
```

### 4. 검증 단계
```
┌──────────────┐     ┌──────────────┐
│ 파일 정보     │     │ [검증결과]    │
│ ✓ 업로드 완료 │     │ ✓ 성공: 8    │
└──────────────┘     │ ⚠ 경고: 2    │
                    │ ✗ 오류: 0    │
       ↓            └──────────────┘
       ↓
[화면 생성] 버튼 활성화 (오류 0일 때만)
```

### 5. 생성 진행
```
┌─────────────────────────────────────┐
│ ① Vue ✓ ② JSON ⏳ ③ Java ○ ...     │
└─────────────────────────────────────┘
```

### 6. 생성 완료
```
┌───────────────────────┐
│  ✓ 화면 생성 완료!    │
│                       │
│  생성된 파일:          │
│  • COST001.vue        │
│  • COST001.json       │
│  • ...                │
│                       │
│  [닫기] [화면으로 이동] │
└───────────────────────┘
```

---

## 색상 및 스타일 가이드

### 색상 시스템
```scss
// 상태 색상
$primary-blue: #0078D4;      // 기본 액션
$success-green: #107C10;     // 성공, 완료
$warning-orange: #F7630C;    // 경고
$error-red: #E81123;         // 오류
$neutral-gray: #605E5C;      // 일반 텍스트

// 배경 색상
$bg-white: #FFFFFF;
$bg-light: #F3F2F1;
$bg-hover: #EDEBE9;

// 그라데이션 (카드 헤더)
background: linear-gradient(135deg, #0078D4 0%, #005a9e 100%);
```

### 아이콘 크기
```scss
.icon-large {   // 드롭존, Empty State
  font-size: 64px;
}

.icon-medium {  // 탭 아이콘
  font-size: 24px;
}

.icon-small {   // 버튼 아이콘
  font-size: 16px;
}
```

### 간격 시스템
```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
$spacing-3xl: 64px;
```

---

## 반응형 디자인

### Breakpoints
```scss
// Desktop (기본, 1400px 이상)
.generator-content {
  grid-template-columns: 500px 1fr; // 좌측 고정, 우측 가변
  height: calc(100vh - 260px); // 헤더(100px) + 푸터(160px) 제외
}

// Laptop (1200px ~ 1399px)
@media (max-width: 1399px) {
  .generator-content {
    grid-template-columns: 450px 1fr; // 좌측 패널 축소
  }
}

// Tablet (768px ~ 1199px)
@media (max-width: 1199px) {
  .screen-generator {
    height: auto; // 고정 높이 해제
  }
  
  .generator-content {
    grid-template-columns: 1fr; // 세로 배치
    height: auto;
    
    .upload-section {
      order: 1;
      max-height: none; // 스크롤 제한 해제
      overflow-y: visible;
    }
    
    .preview-section {
      order: 2;
      max-height: 800px; // 최대 높이 제한
      overflow-y: auto;
    }
  }
}

// Mobile (767px 이하)
@media (max-width: 767px) {
  .page-header {
    height: auto;
    padding: 16px;
    
    .page-title {
      font-size: var(--font-size-xl);
    }
  }
  
  .generator-content {
    padding: 12px;
    gap: 12px;
  }
  
  .info-grid {
    grid-template-columns: 1fr; // 기본정보 1열
  }
  
  .preview-tabs {
    overflow-x: auto; // 탭 가로 스크롤
    
    .tab-button {
      min-width: 100px; // 최소 너비 보장
    }
  }
  
  .action-footer {
    padding: 12px;
    
    .action-buttons {
      flex-direction: column; // 버튼 세로 배치
      
      button {
        width: 100%;
      }
    }
  }
  
  .grid-preview-container {
    height: 300px; // 모바일에서 그리드 높이 축소
  }
}

// 스크롤바 반응형 처리
@media (max-width: 1199px) {
  .upload-section,
  .preview-section {
    // 태블릿/모바일에서는 기본 스크롤바 사용
    &::-webkit-scrollbar {
      width: 0; // 스크롤바 숨김
    }
  }
}
```

### 스크롤 최적화

#### Sticky 탭 헤더 (스크롤 시 상단 고정)
```scss
.preview-section {
  display: flex;
  flex-direction: column;
  
  .preview-tabs {
    position: sticky;
    top: 0;
    z-index: 10;
    background: white;
    border-bottom: 2px solid var(--neutral-gray-20);
    
    // 스크롤 시 그림자 효과
    &.scrolled {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  .tab-content {
    flex: 1;
    overflow-y: auto; // 탭 컨텐츠만 스크롤
  }
}
```

#### 스크롤 위치 복원
```javascript
// 탭 전환 시 스크롤 위치 기억
const tabScrollPositions = ref({
  basic: 0,
  columns: 0,
  search: 0,
  buttons: 0,
  api: 0,
  validation: 0
});

watch(currentTab, (newTab, oldTab) => {
  // 이전 탭 스크롤 위치 저장
  const oldTabPanel = document.querySelector('.tab-pane.active');
  if (oldTabPanel) {
    tabScrollPositions.value[oldTab] = oldTabPanel.scrollTop;
  }
  
  // 새 탭 스크롤 위치 복원
  nextTick(() => {
    const newTabPanel = document.querySelector('.tab-pane.active');
    if (newTabPanel) {
      newTabPanel.scrollTop = tabScrollPositions.value[newTab] || 0;
    }
  });
});
```

#### 무한 스크롤 방지 (Flexbox 버그)
```scss
// 중요! Flexbox에서 스크롤이 작동하지 않는 버그 해결
.generator-content,
.upload-section,
.preview-section,
.tab-content {
  min-height: 0; // 필수!
  // 이게 없으면 자식이 부모를 무한히 늘림
}
```

---

## 애니메이션

### 1. 드롭존 호버
```scss
.drop-zone {
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    border-color: $primary-blue;
  }
  
  &.active {
    transform: scale(1.05);
    border-color: $success-green;
  }
}
```

### 2. 탭 전환
```scss
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

.tab-panel {
  animation: fadeIn 0.3s ease-in;
}
```

### 3. 버튼 호버
```scss
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
}
```

### 4. 스피너 회전
```scss
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 2s linear infinite;
}
```

---

## 접근성 (A11y)

### ARIA 속성
```vue
<!-- 드롭존 -->
<div
  role="button"
  tabindex="0"
  aria-label="Excel 파일 업로드 영역. 엔터 키를 눌러 파일을 선택하세요."
  @keydown.enter="triggerFileInput"
  @keydown.space.prevent="triggerFileInput"
>

<!-- 진행 상태 -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {{ uploadProgress }}% 파싱 중...
</div>

<!-- 오류 메시지 -->
<div
  role="alert"
  aria-live="assertive"
>
  {{ errorMessage }}
</div>
```

### 키보드 네비게이션
- **Tab**: 다음 요소로 포커스 이동
- **Shift + Tab**: 이전 요소로 포커스 이동
- **Enter**: 드롭존 클릭 (파일 선택)
- **Space**: 드롭존 클릭 (파일 선택)
- **Arrow Keys**: 탭 간 이동

---

## 구현 우선순위

### Phase 1: 핵심 기능 (1주)
1. ✅ Excel 업로드 UI (드래그 앤 드롭)
2. ✅ Excel 파싱 (SheetJS)
3. ✅ 기본정보 탭 표시
4. ✅ 그리드컬럼 탭 - **RealGrid 미리보기**
5. ✅ 검증 로직 (필수 필드, 형식)

### Phase 2: 확장 기능 (1주)
6. ✅ 검색조건/버튼/API 탭
7. ✅ 검증결과 탭 (상세 메시지)
8. ✅ 화면 생성 API 연동
9. ✅ 진행 상태 표시
10. ✅ 성공 다이얼로그

### Phase 3: 완성도 (3일)
11. ✅ 템플릿 다운로드 기능
12. ✅ 오류 처리 개선
13. ✅ 반응형 디자인
14. ✅ 접근성 개선
15. ✅ 애니메이션 추가

---

## 개발 가이드

### Vue 컴포넌트 구조
```
ScreenGenerator.vue (height: 100vh, overflow: hidden)
├─ PageHeader (flex-shrink: 0, height: 100px)
├─ GeneratorContent (flex: 1, overflow: hidden)
│  ├─ UploadSection (overflow-y: auto, max-width: 500px)
│  │  ├─ DropZone
│  │  ├─ ProgressBar
│  │  ├─ TemplateDownload
│  │  └─ ErrorAlert
│  └─ PreviewSection (overflow-y: auto, flex: 1)
│     ├─ TabNavigation (sticky top)
│     └─ TabPanels (overflow-y: auto)
│        ├─ BasicInfoTab (scroll if needed)
│        ├─ GridColumnsTab
│        │  ├─ RealGrid (height: 400px, 내부 스크롤)
│        │  └─ ColumnSummary
│        ├─ SearchFieldsTab (scroll if needed)
│        ├─ ButtonsTab (scroll if needed)
│        ├─ ApisTab (scroll if needed)
│        └─ ValidationTab (scroll if needed)
└─ ActionFooter (flex-shrink: 0, max-height: 160px)
   ├─ ActionButtons
   ├─ GenerationProgress (조건부 렌더링)
   └─ SuccessDialog (모달, z-index: 2000)
```

### 상태 관리
```javascript
const state = {
  // 파일 상태
  uploadedFile: null,
  isDragging: false,
  isUploading: false,
  uploadProgress: 0,
  
  // Excel 데이터
  basicInfo: [],
  gridColumns: [],
  searchFields: [],
  buttons: [],
  apis: [],
  
  // UI 상태
  currentTab: 'basic',
  errorMessage: '',
  
  // 검증 결과
  validationResult: {
    success: 0,
    warnings: 0,
    errors: 0
  },
  validationMessages: [],
  
  // 생성 상태
  isGenerating: false,
  generationSteps: [],
  showSuccessDialog: false,
  generatedFiles: []
};
```

---

## 참고 이미지

### 드롭존 상태
```
┌─────────────────────────┐
│    ☁️  (큰 아이콘)       │
│                         │
│ Excel 템플릿 파일을      │
│ 끌어다 놓거나 클릭하세요  │
│                         │
│ .xlsx | 최대 5MB        │
└─────────────────────────┘
```

### RealGrid 미리보기 (핵심!)
```
┌──────────────────────────────────────────────┐
│ 비용ID │ 공정코드 │ 공정명 │ 자재코드 │ ... │
├──────────────────────────────────────────────┤
│ (예시 헤더만 표시, 데이터 없음)               │
│ (컬럼 너비, 정렬, 타입 미리보기)              │
└──────────────────────────────────────────────┘

총 12개 컬럼 정의됨
```

### 검증 결과
```
┌──────────────────────────────────┐
│ ✓ 성공: 8  ⚠ 경고: 2  ✗ 오류: 0│
├──────────────────────────────────┤
│ ✓ 화면ID 검증 통과               │
│   화면ID: COST001                │
├──────────────────────────────────┤
│ ⚠ API 정의 없음                  │
│   기본 API가 사용됩니다           │
└──────────────────────────────────┘
```

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025년 11월 30일  
**작성자**: AI Factory Lab Team  
**관련 문서**: 
- SCREEN_GENERATOR_TEMPLATE_SPEC.md
- EXCEL_UPLOAD_DOWNLOAD_PATTERNS.md
- EXCEL_LIBRARIES_COMPARISON.md
