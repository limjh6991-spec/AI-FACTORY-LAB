# RealGrid Column Layout (컬럼 레이아웃) 가이드

**작성일:** 2025년 11월 30일  
**출처:** https://docs.realgrid.com/guides/column/layout

---

## 📋 개요

컬럼 레이아웃 (Column Layout)은 RealGrid의 컬럼들을 **그룹화**하여 **복잡한 다층 헤더 구조**를 만드는 기능입니다.

### 주요 특징
- ✅ **다층 헤더**: 컬럼을 계층적으로 그룹핑
- ✅ **가로/세로 배치**: `horizontal` 또는 `vertical` 방향 지정
- ✅ **동적 레이아웃 변경**: 런타임에 컬럼 배치 재구성
- ✅ **하위 헤더 숨김**: `hideChildHeaders` 옵션으로 그룹 헤더만 표시

---

## 🎯 기본 사용법

### 1. 기본 그룹핑 (Horizontal)

```javascript
const layout = [
  "OrderID",
  "CustomerID",
  {
    name: "companyGroup",
    direction: "horizontal",  // 가로 방향
    items: [
      "Country",
      "CompanyName"
    ],
    header: {
      text: "Company"  // 그룹 헤더 제목
    }
  },
  "EmployeeID",
  "OrderDate",
  "Phone"
];

gridView.setColumnLayout(layout);
```

**결과:**
```
┌─────────┬────────┬─────────────────┬──────────┬──────────┬──────┐
│ OrderID │ Cust.. │    Company      │ Employee │ OrderDate│ Phone│
│         │        ├────────┬────────┤          │          │      │
│         │        │Country │Company │          │          │      │
│         │        │        │ Name   │          │          │      │
└─────────┴────────┴────────┴────────┴──────────┴──────────┴──────┘
```

### 2. 세로 방향 그룹핑 (Vertical)

```javascript
const layout = [
  "OrderID",
  "CustomerID",
  {
    name: "companyGroup",
    direction: "vertical",  // 세로 방향
    width: 250,
    items: [
      "Country",
      "CompanyName"
    ],
    header: {
      text: "Company"
    }
  },
  "EmployeeID"
];

gridView.setColumnLayout(layout);
```

**결과:**
```
┌─────┬─────┬─────────┬──────┐
│Order│Cust │ Company │Employ│
│ ID  │ ID  ├─────────┤ ID   │
│     │     │ Country │      │
│     │     ├─────────┤      │
│     │     │ Company │      │
│     │     │  Name   │      │
└─────┴─────┴─────────┴──────┘
```

---

## 🔧 Vue 3 통합

### RealGrid Vue Component에서 사용

```vue
<template>
  <div style="width: 1000px; height: 400px">
    <RealGridVue
      ref="gridView"
      :rows="rows"
      :layout="gridLayout"
    >
      <template v-for="(field, index) in fields" :key="field">
        <RGDataField :field-name="field" />
        <RGDataColumn
          :field-name="field"
          :name="field"
          :width="100"
        />
      </template>
    </RealGridVue>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as RealGrid from 'realgrid';
import { RealGridVue, RGDataField, RGDataColumn } from 'realgrid-vue';

const gridRef = ref<RealGridVue>();

const rows = [
  { text1: "텍스트1", text2: "텍스트2", text3: "텍스트3", text4: "텍스트4" }
];

const fields = ["text1", "text2", "text3", "text4", "text5", "text6", "text7"];

const gridLayout = [
  "text1",
  "text2",
  {
    name: "group1",
    direction: RealGrid.ColumnLayoutDirection.VERTICAL,
    items: ["text3", "text4"]
  },
  {
    name: "group2",
    direction: RealGrid.ColumnLayoutDirection.HORIZONTAL,
    items: ["text5", "text6"]
  },
  "text7"
];
</script>
```

---

## 🎨 고급 기능

### 1. 하위 헤더 숨김

```javascript
const layout = [
  {
    name: "companyGroup",
    direction: "horizontal",
    hideChildHeaders: true,  // ← 하위 헤더 숨김
    items: [
      "Country",
      "CompanyName"
    ],
    header: {
      text: "Company"  // 이 헤더만 표시됨
    }
  },
  "OrderID",
  "CustomerID"
];
```

**결과:**
```
┌─────────────┬─────────┬────────┐
│   Company   │ OrderID │Customer│
│             │         │   ID   │
└─────────────┴─────────┴────────┘
```

### 2. 중첩 그룹핑 (Nested Grouping)

```javascript
const layout = [
  {
    name: "Group1",
    direction: "horizontal",
    items: [
      {
        name: "Group2",
        direction: "vertical",
        items: [{ column: "OrderID", width: 100 }]
      },
      {
        name: "Group3",
        direction: "vertical",
        items: [{ column: "CustomerID", width: 100 }]
      }
    ]
  },
  {
    name: "Group4",
    direction: "vertical",
    width: 100,
    items: [{ column: "Country" }]
  },
  "OrderDate",
  "EmployeeID",
  "Phone"
];
```

### 3. 헤더 세로 병합 (Header Row Span)

```javascript
const layout = [
  {
    name: 'Group1',
    direction: 'horizontal',
    items: [
      {
        name: 'OrderID',
        items: ['OrderID'],
        header: { visible: false }  // 하위 헤더 숨김
      },
      {
        name: 'CustomerID',
        items: ['CustomerID'],
        header: { visible: false }
      }
    ],
    header: { 
      text: 'Group1',
      rows: 2  // ← 2행 병합
    }
  },
  {
    name: 'Group2',
    direction: 'horizontal',
    items: [
      {
        name: 'Group3',
        items: ['Country', 'OrderDate']
      },
      {
        name: 'Group4',
        items: ['EmployeeID', 'Phone']
      }
    ],
    header: { text: "Group2" }
  }
];
```

---

## ⚙️ 컬럼 속성 지정

```javascript
const layout = [
  {
    name: "companyGroup",
    direction: "horizontal",
    items: [
      "Country",
      "CompanyName"
    ],
    header: {
      text: "Company"
    }
  },
  { column: "UnitPrice", visible: false },  // visible 속성
  { column: "Phone", visible: false },
  { column: "ProductName", visible: false },
  { column: "QuantityPerUnit", visible: false },
  { column: "Quantity", visible: false },
  
  "OrderID",  // 속성 생략 시 기본값 적용
  "CustomerID",
  "EmployeeID"
];

gridView.setColumnLayout(layout);

// 런타임에 visible 변경
function showColumns() {
  gridView.layoutByName("Quantity").visible = true;
  gridView.layoutByName("UnitPrice").visible = true;
  gridView.layoutByName("QuantityPerUnit").visible = true;
}
```

---

## ⚠️ 주의사항

### 1. 보이지 않는 컬럼도 포함해야 함
```javascript
// ❌ 잘못된 예시
const layout = [
  "OrderID",
  {
    name: "group1",
    items: ["Country", "CompanyName"]
  }
  // visible: false인 컬럼들이 빠짐 → 오류 발생
];

// ✅ 올바른 예시
const layout = [
  "OrderID",
  {
    name: "group1",
    items: ["Country", "CompanyName"]
  },
  { column: "HiddenCol1", visible: false },
  { column: "HiddenCol2", visible: false }
];
```

### 2. 레이아웃 변경 시 행 그룹핑 해제
```javascript
gridView.setColumnLayout(layout);

// setColumnLayout() 호출 시 행 그룹핑이 해제됨
// 다시 적용 필요
gridView.groupBy(["Country"]);
```

### 3. 컬럼 끝나는 경계가 다른 경우
컬럼 그룹핑 시 각 컬럼간 끝나는 경계가 다른 경우는 [SPAN 문서](https://docs.realgrid.com/guides/tip/span)를 참조하세요.

---

## 📚 참고 자료

- **공식 문서:** https://docs.realgrid.com/guides/column/layout
- **Vue 튜토리얼:** https://docs.realgrid.com/tutorial/vue-tutorial/column-layout
- **React 튜토리얼:** https://docs.realgrid.com/tutorial/react-tutorial/column-layout
- **SPAN 문서:** https://docs.realgrid.com/guides/tip/span
- **레이아웃 속성 동적 변경:** https://docs.realgrid.com/guides/column/layout-properties
- **레이아웃 추가/삭제:** https://docs.realgrid.com/guides/column/layout-add-remove

---

**작성자:** 자비스 (AI Factory Lab)  
**버전:** 1.0  
**최종 수정:** 2025년 11월 30일
