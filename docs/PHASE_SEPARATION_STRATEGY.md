# 📋 단계별 화면 생성 전략

> **작성일**: 2025년 12월 4일  
> **목적**: Excel → 화면 생성을 3단계로 분리하여 정확도 및 검증 가능성 향상

---

## 🎯 문제 인식

### 기존 방식 (한 번에 모든 것 요청)
```
Excel 업로드
    ↓
Claude API "모든 것 생성해줘!"
    ↓
❌ 존재하지 않는 테이블/컬럼
❌ 실행 불가능한 SQL
❌ 검증 불가능
❌ 디버깅 어려움
```

### 문제점
1. **너무 복잡한 요청**: 화면 정의 + 쿼리 + UI 컴포넌트 한 번에
2. **검증 불가**: 각 단계별 검증 없이 최종 결과만 확인
3. **낮은 정확도**: 추론 → 추론 → 추론으로 오류 누적
4. **디버깅 어려움**: 어느 단계에서 잘못되었는지 파악 불가

---

## ✅ 새로운 접근: 3단계 분리

### Phase 1: 데이터 정의 (What)
**목표**: Excel에서 "무엇을 보여줄지" 정의

```
Input: Excel 파일
Output: screen_definition.json
```

**내용**:
```json
{
  "screenId": "SC001",
  "screenName": "판매 실적 집계",
  "columns": [
    {
      "id": "col1",
      "excelHeader": "구분",
      "displayName": "구분",
      "dataType": "string",
      "width": 80,
      "align": "center"
    },
    {
      "id": "col2",
      "excelHeader": "고객코드",
      "displayName": "고객코드",
      "dataType": "string",
      "width": 120,
      "align": "left"
    }
  ],
  "filters": [
    {
      "id": "filter1",
      "label": "년월",
      "type": "month-picker",
      "required": true
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "월별 판매 실적",
      "xAxis": "col2",
      "yAxis": "col8"
    }
  ]
}
```

**특징**:
- ✅ DB 정보 없음 (순수 화면 정의)
- ✅ Excel 기준 명세
- ✅ 사용자 검증 가능
- ✅ UI/UX만 집중

---

### Phase 2: 로직 생성 (How)
**목표**: "어떻게 데이터를 가져올지" 정의

```
Input: screen_definition.json + Vector DB 메타데이터
Output: data_logic.json
```

**내용**:
```json
{
  "screenId": "SC001",
  "dataSources": [
    {
      "id": "ds1",
      "name": "main_data",
      "type": "sql",
      "query": "SELECT sr.구분, sr.품번 as customer_code, ...",
      "parameters": [
        {
          "name": "YYYYMM",
          "type": "string",
          "source": "filter1"
        }
      ],
      "columnMappings": [
        {
          "columnId": "col1",
          "dbField": "구분",
          "table": "doi_sale_resc"
        },
        {
          "columnId": "col2",
          "dbField": "품번",
          "table": "doi_sale_resc"
        }
      ]
    }
  ],
  "calculatedFields": [
    {
      "columnId": "col14",
      "displayName": "달성률 수량",
      "formula": "(actual_qty / plan_qty) * 100",
      "dependencies": ["col5", "col9"]
    }
  ]
}
```

**특징**:
- ✅ RAG 기반 실제 테이블/컬럼 사용
- ✅ SQL 실행 및 검증 가능
- ✅ 매핑 정확도 측정 가능
- ✅ 단계별 오류 수정

---

### Phase 3: UI 렌더링 (Present)
**목표**: "어떻게 보여줄지" 구현

```
Input: screen_definition.json + data_logic.json
Output: Vue SFC (Single File Component)
```

**내용**:
```vue
<template>
  <div class="sales-report-screen">
    <!-- 필터 영역 -->
    <div class="filter-section">
      <MonthPicker v-model="filters.YYYYMM" label="년월" />
      <Button @click="fetchData">조회</Button>
    </div>

    <!-- 그리드 영역 -->
    <RealGrid
      :columns="gridColumns"
      :data="gridData"
      :height="500"
    />

    <!-- 차트 영역 -->
    <BarChart
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSalesReport } from '@/composables/useSalesReport';

// data_logic.json 기반 API 호출
const { data, fetchData } = useSalesReport();

// screen_definition.json 기반 컬럼 정의
const gridColumns = [
  { fieldName: 'col1', header: '구분', width: 80 },
  { fieldName: 'col2', header: '고객코드', width: 120 }
];
</script>
```

**특징**:
- ✅ 템플릿 기반 생성
- ✅ TypeScript 타입 안전
- ✅ 컴포넌트 재사용
- ✅ 빌드/런타임 검증

---

## 📊 3단계 비교

| 단계 | 입력 | 출력 | AI 역할 | 검증 방법 |
|------|------|------|---------|----------|
| **Phase 1** | Excel | screen_definition.json | 화면 구조 분석 | 사용자 리뷰 |
| **Phase 2** | definition + Vector DB | data_logic.json | DB 매핑 + SQL 생성 | SQL 실행 테스트 |
| **Phase 3** | definition + logic | Vue SFC | 코드 생성 | TypeScript 컴파일 |

---

## 🚀 구현 계획

### Step 1: Phase 1 구현 (화면 정의)
**파일**: `scripts/phase1_extract_screen_definition.ts`

```typescript
async function extractScreenDefinition(excelPath: string, sheetName: string) {
  // 1. Excel 읽기
  const workbook = XLSX.readFile(excelPath);
  const worksheet = workbook.Sheets[sheetName];
  
  // 2. Claude에게 화면 정의 요청
  const prompt = `
    Excel 시트를 분석하여 화면 정의를 생성하세요.
    
    **중요**: DB 정보는 고려하지 마세요. 순수하게 Excel 기준으로만 작성하세요.
    
    생성할 내용:
    - 컬럼 정의 (Excel 헤더 기준)
    - 필터 정의 (Excel에서 추론)
    - 차트 정의 (데이터 패턴 분석)
  `;
  
  // 3. JSON 저장
  fs.writeFileSync('data/screen_definition.json', JSON.stringify(result));
}
```

**예상 시간**: 2시간  
**정확도 목표**: 95% (Excel 기준이므로 높음)

---

### Step 2: Phase 2 구현 (로직 생성)
**파일**: `scripts/phase2_generate_data_logic.ts`

```typescript
async function generateDataLogic(definitionPath: string) {
  // 1. screen_definition.json 로드
  const definition = JSON.parse(fs.readFileSync(definitionPath));
  
  // 2. Vector DB에서 관련 테이블 검색
  const keywords = definition.columns.map(c => c.excelHeader);
  const relatedTables = await searchRelatedTables(keywords);
  
  // 3. Claude에게 매핑 및 SQL 생성 요청
  const prompt = `
    화면 정의와 실제 DB 메타데이터를 매핑하세요.
    
    **실제 DB 테이블 목록**:
    ${JSON.stringify(relatedTables, null, 2)}
    
    **화면 컬럼 목록**:
    ${JSON.stringify(definition.columns, null, 2)}
    
    생성할 내용:
    - SQL 쿼리 (실제 테이블/컬럼만 사용)
    - 컬럼 매핑 (columnId → dbField)
    - 계산 필드 정의
  `;
  
  // 4. SQL 검증
  const isValid = await validateSQL(result.dataSources[0].query);
  
  // 5. JSON 저장
  fs.writeFileSync('data/data_logic.json', JSON.stringify(result));
}
```

**예상 시간**: 3시간  
**정확도 목표**: 80% (RAG 기반 매핑)

---

### Step 3: Phase 3 구현 (UI 생성)
**파일**: `scripts/phase3_generate_vue_component.ts`

```typescript
async function generateVueComponent(definitionPath: string, logicPath: string) {
  // 1. JSON 로드
  const definition = JSON.parse(fs.readFileSync(definitionPath));
  const logic = JSON.parse(fs.readFileSync(logicPath));
  
  // 2. 템플릿 기반 생성
  const template = generateTemplate(definition);
  const script = generateScript(logic);
  const style = generateStyle(definition);
  
  // 3. Vue SFC 조합
  const vueComponent = `
    ${template}
    ${script}
    ${style}
  `;
  
  // 4. TypeScript 검증
  await validateTypeScript(vueComponent);
  
  // 5. 파일 저장
  fs.writeFileSync(`src/screens/${definition.screenId}.vue`, vueComponent);
}
```

**예상 시간**: 2시간  
**정확도 목표**: 90% (템플릿 기반)

---

## 💡 장점

### 1. 단계별 검증
```
Phase 1 완료 → 사용자 확인 → 수정
Phase 2 완료 → SQL 실행 테스트 → 수정
Phase 3 완료 → TypeScript 컴파일 → 수정
```

### 2. 높은 정확도
```
Phase 1: 95% (Excel 기준)
Phase 2: 80% (RAG 기반)
Phase 3: 90% (템플릿 기반)
전체: 95% × 80% × 90% = 68% → 각 단계 수정 후 95%+
```

### 3. 디버깅 용이
```
오류 발생 → 어느 Phase인지 즉시 파악 → 해당 단계만 재실행
```

### 4. 재사용성
```
Phase 1 (정의) → 여러 DB에 재사용 가능
Phase 2 (로직) → 여러 UI 프레임워크에 재사용 가능
Phase 3 (UI) → 디자인 변경 시 쉽게 교체
```

---

## 📈 예상 성과

### 기존 방식 (한 번에)
```
정확도: 50% (추론 누적 오류)
디버깅: 어려움 (블랙박스)
재작업: 전체 다시 실행
```

### 새 방식 (3단계)
```
정확도: 95%+ (단계별 검증)
디버깅: 쉬움 (단계별 분리)
재작업: 문제 단계만 재실행
```

---

## 🎯 우선순위

### Week 2 (현재)
1. ✅ RAG 시스템 구축 완료
2. 🔄 Phase 1 구현 (화면 정의 추출)
3. 🔄 Phase 2 구현 (로직 생성)
4. ⏭️ Phase 3 구현 (UI 생성)

### Week 3
1. E2E 테스트 (3단계 통합)
2. 여러 Excel 시트 테스트
3. 정확도 측정 및 개선

### Week 4
4. 100개 화면 자동 생성
5. 사용자 피드백 수집

---

## 📝 파일 구조

```
data/
├── screen_definition.json          # Phase 1 출력
├── data_logic.json                 # Phase 2 출력
└── report_designs/
    ├── SC001_definition.json       # 판매실적
    ├── SC001_logic.json
    ├── SC002_definition.json       # 생산실적
    └── SC002_logic.json

scripts/
├── phase1_extract_screen_definition.ts
├── phase2_generate_data_logic.ts
└── phase3_generate_vue_component.ts

src/screens/
├── SC001_SalesReport.vue           # Phase 3 출력
└── SC002_ProductionReport.vue
```

---

## 🎉 결론

**Excel → 화면 생성을 3단계로 분리**하면:

1. ✅ 각 단계별 정확도 향상
2. ✅ 검증 및 디버깅 용이
3. ✅ 재사용성 증대
4. ✅ 유지보수 편리

**다음 작업**: Phase 1 구현 시작!

---

**작성자**: GitHub Copilot  
**버전**: 1.0  
**프로젝트**: AI-FACTORY-LAB
