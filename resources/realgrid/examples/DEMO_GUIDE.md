# 🎨 RealGrid 데모 사용 가이드

## 📋 개요

이 데모는 **RealGrid 2.9+**의 고급 기능을 실습할 수 있는 통합 예제입니다.

### 포함된 기능
- ✅ **Column Layout**: 다층 헤더, 가로/세로 그룹핑, 중첩 구조
- ✅ **Cell Merging**: 기본 병합, 선행 컬럼 참조 병합
- ✅ **통합 예제**: 판매 실적 분석 대시보드 (Layout + Merging)

---

## 🚀 실행 방법

### 1. 라우터 등록

`frontend/src/router/index.js`에 다음 코드를 추가:

```javascript
{
  path: '/realgrid-demo',
  name: 'RealGridDemo',
  component: () => import('@/resources/realgrid/examples/RealGridDemo.vue'),
  meta: { layout: 'MainLayout' }
}
```

### 2. 서버 실행

```bash
cd frontend
npm run serve
```

### 3. 브라우저 접속

```
http://localhost:8080/#/realgrid-demo
```

---

## 📚 Tab 별 기능 설명

### Tab 1: 📊 Column Layout

**목적**: 다층 헤더 구조를 동적으로 변경하며 학습

**버튼 설명**:
- **레이아웃 1 (가로 그룹)**: 
  - `Country`와 `Company Name`을 가로로 그룹핑
  - 헤더: "Company Info"
  
- **레이아웃 2 (세로 그룹)**: 
  - `Country`와 `Company Name`을 세로로 그룹핑
  - 고정 너비: 250px
  
- **레이아웃 3 (중첩 그룹)**: 
  - Order Info (Order ID + Customer ID 가로)
  - Company Info (Country + Company Name 세로)
  - 2단계 중첩 구조

**학습 포인트**:
```javascript
// direction: 'horizontal' vs 'vertical'
// items: 배열로 자식 컬럼 지정
// header.text: 그룹 헤더 텍스트
```

---

### Tab 2: 🔗 Cell Merging

**목적**: 셀 병합 규칙을 동적으로 적용하며 비교

**버튼 설명**:
- **기본 병합**: 
  - 각 컬럼이 독립적으로 동일한 값끼리 병합
  - `criteria: 'value'`
  
- **선행 컬럼 참조**: 
  - 선행 컬럼이 병합된 상태에서만 병합
  - `criteria: 'prevvalues + value'`
  - 연도/분기/월 계층 구조에 적합

**학습 포인트**:
```javascript
// mergeRule.criteria: 'value' - 독립 병합
// mergeRule.criteria: 'prevvalues + value' - 계층 병합
```

---

### Tab 3: ⭐ Combined Example

**목적**: Column Layout + Cell Merging을 실전처럼 활용

**특징**:
- 3단계 헤더 그룹핑 (기간 / 구분 / 실적)
- 연도-분기-월 계층 병합
- 실제 판매 실적 대시보드 형태

**적용 기술**:
```javascript
// 1. Column Layout
layout: [
  { name: 'timeGroup', items: ['year', 'quarter', 'month'] },
  { name: 'infoGroup', items: ['product', 'region'] },
  { name: 'performanceGroup', items: ['sales', 'cost', 'profit'] }
]

// 2. Cell Merging
columns: [
  { name: 'year', mergeRule: { criteria: 'value' } },
  { name: 'quarter', mergeRule: { criteria: 'prevvalues + value' } },
  { name: 'month', mergeRule: { criteria: 'prevvalues + value' } }
]
```

---

## 🧪 실험해볼 것들

### 1. 레이아웃 커스터마이징
```javascript
// applyLayout1() 메서드 수정 실험
const layout = [
  {
    name: 'myGroup',
    direction: 'vertical',  // horizontal로 변경해보기
    width: 300,             // 너비 조정
    items: ['country', 'companyName', 'phone'],  // 컬럼 추가
    header: { 
      text: 'Custom Group',
      styleName: 'my-header-style'  // CSS 클래스 적용
    }
  }
]
```

### 2. 병합 규칙 추가
```javascript
// 3행마다 병합
column.mergeRule = { criteria: 'row div 3' }

// Object 타입 필드 병합
column.mergeRule = { 
  criteria: 'value', 
  objectKey: 'id'  // object.id 값으로 비교
}
```

### 3. 동적 데이터 변경
```javascript
// 데이터 추가
this.provider3.addRow({
  year: '2025',
  quarter: 'Q3',
  month: '7월',
  product: '모니터',
  region: '대구',
  sales: 80000,
  cost: 50000,
  profit: 30000
})

// 레이아웃 다시 적용
this.gridView3.setColumnLayout(newLayout)
```

---

## 🎯 Phase 4 적용 계획

### StandardPage JSON Schema 확장

**현재 COST001.json**:
```json
{
  "columns": [
    { "fieldName": "costCode", "header": "Cost Code" }
  ]
}
```

**확장 후**:
```json
{
  "layout": [
    {
      "name": "basicInfo",
      "direction": "horizontal",
      "items": ["costCode", "costName"],
      "header": { "text": "기본 정보" }
    },
    {
      "name": "financialInfo",
      "direction": "horizontal",
      "items": ["amount", "currency", "rate"],
      "header": { "text": "재무 정보" }
    }
  ],
  "mergeRules": {
    "costCode": { "criteria": "value" },
    "costName": { "criteria": "prevvalues + value" }
  }
}
```

### StandardPage.vue 수정 포인트
```javascript
// mounted() 또는 watch schema 시점에
if (this.schema.layout) {
  this.gridView.setColumnLayout(this.schema.layout)
}

if (this.schema.mergeRules) {
  Object.entries(this.schema.mergeRules).forEach(([columnName, rule]) => {
    this.gridView.columnByName(columnName).mergeRule = rule
  })
}
```

---

## 📝 다음 단계 TODO

- [ ] Row Grouping 예제 추가
- [ ] Chart 통합 예제 (Bar Renderer, Spark Chart)
- [ ] Excel Export/Import with Layout
- [ ] 동적 Layout 생성기 UI
- [ ] Performance Test (10,000 rows)

---

## 🔗 참고 문서

- [01_COLUMN_LAYOUT.md](../docs/01_COLUMN_LAYOUT.md)
- [02_CELL_MERGING.md](../docs/02_CELL_MERGING.md)
- [RealGrid Official Docs](https://docs.realgrid.com/)

