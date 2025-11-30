# RealGrid Cell Merging (셀 병합) 가이드

**작성일:** 2025년 11월 30일  
**출처:** https://docs.realgrid.com/guides/cell-components/cell-merging

---

## 📋 개요

Cell Merging (셀 병합)은 **컬럼에 속한 셀들을 조건에 따라 묶어서 표시**하는 기능입니다.

같은 값을 가진 연속된 셀들을 자동으로 병합하여 데이터 가독성을 크게 향상시킬 수 있습니다.

---

## 🎯 기본 사용법

### 1. 값 기준 병합 (Value-based Merging)

```javascript
const columns = [
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별",
      styleName: "orange-column"
    },
    mergeRule: {
      criteria: "value"  // ← 동일한 값을 가진 셀 병합
    }
  },
  {
    name: "Name",
    fieldName: "Name",
    width: "100",
    header: { text: "이름" }
  }
];
```

**결과:**
```
┌──────┬────────┐
│ 성별 │  이름  │
├──────┼────────┤
│      │ 홍길동 │
│ 남자 ├────────┤
│      │ 김철수 │
├──────┼────────┤
│      │ 이영희 │
│ 여자 ├────────┤
│      │ 박민지 │
└──────┴────────┘
```

---

## 🔧 병합 조건 (Merge Criteria)

### 1. 행 나누기 기준 병합

```javascript
// 3행마다 병합
gridView.setColumnProperty("Gender", "mergeRule", { 
  criteria: "row div 3" 
});

// 5행마다 병합
gridView.setColumnProperty("Gender", "mergeRule", { 
  criteria: "row div 5" 
});

// 값이 같을 때만 병합 (기본)
gridView.setColumnProperty("Gender", "mergeRule", { 
  criteria: "value" 
});
```

### 2. 선행 컬럼 참조 병합

**기본 병합 (각 컬럼 독립적):**
```javascript
function btnMergeRule() {
  gridView.columnByName("OrderID").mergeRule = { criteria: "value" };
  gridView.columnByName("Country").mergeRule = { criteria: "value" };
  gridView.columnByName("CustomerID").mergeRule = { criteria: "value" };
}
```

**문제점:** 각 컬럼이 독립적으로 병합되어 관계가 끊어질 수 있음

**선행 컬럼 참조 병합 (연관성 유지):**
```javascript
function btnPrevMergeRule() {
  gridView.columnByName("OrderID").mergeRule = { 
    criteria: "value" 
  };
  
  gridView.columnByName("Country").mergeRule = { 
    criteria: "values['OrderID'] + value"  // ← OrderID도 함께 고려
  };
  
  gridView.columnByName("CustomerID").mergeRule = { 
    criteria: "values['OrderID'] + values['Country'] + value"  // ← 모든 선행 컬럼 고려
  };
}
```

**간략한 방식 (prevvalues 사용):**
```javascript
function btnPrevMergeRule() {
  gridView.columnByName("OrderID").mergeRule = { 
    criteria: "value" 
  };
  
  gridView.columnByName("Country").mergeRule = { 
    criteria: "prevvalues + value"  // ← 모든 선행 컬럼 자동 참조
  };
  
  gridView.columnByName("CustomerID").mergeRule = { 
    criteria: "prevvalues + value"
  };
}
```

**결과 비교:**

**독립 병합:**
```
┌─────────┬─────────┬────────────┐
│ OrderID │ Country │ CustomerID │
├─────────┼─────────┼────────────┤
│    1    │   USA   │    A001    │
│    1    ├─────────┤    A001    │
│    1    │   USA   ├────────────┤
│    1    │   USA   │    A002    │
├─────────┼─────────┼────────────┤
```

**선행 참조 병합:**
```
┌─────────┬─────────┬────────────┐
│ OrderID │ Country │ CustomerID │
├─────────┼─────────┼────────────┤
│         │         │    A001    │
│    1    │   USA   ├────────────┤
│         │         │    A002    │
├─────────┼─────────┼────────────┤
```

---

## 🎨 Object Type Field 병합

Object 타입 필드는 **보여지는 값 기준**으로 병합됩니다.

```javascript
const columns = [
  {
    name: "Person",
    fieldName: "Person",
    objectKey: "Name",  // ← Object의 Name 속성 표시
    width: "100",
    header: {
      text: "이름"
    },
    mergeRule: "value"  // 짧은 형식
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    },
    mergeRule: "values['Person'] + value"  // Person 컬럼도 참조
  }
];
```

**데이터:**
```javascript
const data = [
  { Person: { Name: "홍길동", Age: 30 }, Gender: "남" },
  { Person: { Name: "홍길동", Age: 30 }, Gender: "남" },
  { Person: { Name: "이영희", Age: 25 }, Gender: "여" }
];
```

**결과:**
```
┌────────┬──────┐
│  이름  │ 성별 │
├────────┼──────┤
│ 홍길동 │  남  │
│        │      │
├────────┼──────┤
│ 이영희 │  여  │
└────────┴──────┘
```

---

## ⚙️ 런타임 동적 설정

```javascript
// 병합 규칙 설정
gridView.setColumnProperty("Gender", "mergeRule", { 
  criteria: "value" 
});

// 병합 규칙 변경
gridView.columnByName("Gender").mergeRule = { 
  criteria: "row div 3" 
};

// 병합 해제
gridView.columnByName("Gender").mergeRule = null;

// 또는
gridView.setColumnProperty("Gender", "mergeRule", null);
```

---

## 📊 실전 예제: 판매 실적 테이블

```javascript
const columns = [
  {
    name: "Year",
    fieldName: "Year",
    width: 80,
    header: { text: "연도" },
    mergeRule: { criteria: "value" }
  },
  {
    name: "Quarter",
    fieldName: "Quarter",
    width: 80,
    header: { text: "분기" },
    mergeRule: { criteria: "values['Year'] + value" }
  },
  {
    name: "Month",
    fieldName: "Month",
    width: 80,
    header: { text: "월" },
    mergeRule: { criteria: "values['Year'] + values['Quarter'] + value" }
  },
  {
    name: "Sales",
    fieldName: "Sales",
    width: 100,
    header: { text: "매출" },
    numberFormat: "#,##0"
  }
];

const data = [
  { Year: 2025, Quarter: "Q1", Month: "1월", Sales: 10000 },
  { Year: 2025, Quarter: "Q1", Month: "2월", Sales: 12000 },
  { Year: 2025, Quarter: "Q1", Month: "3월", Sales: 15000 },
  { Year: 2025, Quarter: "Q2", Month: "4월", Sales: 18000 },
  { Year: 2025, Quarter: "Q2", Month: "5월", Sales: 20000 },
  { Year: 2025, Quarter: "Q2", Month: "6월", Sales: 22000 }
];
```

**결과:**
```
┌──────┬──────┬─────┬──────────┐
│ 연도 │ 분기 │ 월  │   매출   │
├──────┼──────┼─────┼──────────┤
│      │      │ 1월 │  10,000  │
│      │  Q1  ├─────┼──────────┤
│      │      │ 2월 │  12,000  │
│      │      ├─────┼──────────┤
│      │      │ 3월 │  15,000  │
│ 2025 ├──────┼─────┼──────────┤
│      │      │ 4월 │  18,000  │
│      │  Q2  ├─────┼──────────┤
│      │      │ 5월 │  20,000  │
│      │      ├─────┼──────────┤
│      │      │ 6월 │  22,000  │
└──────┴──────┴─────┴──────────┘
```

---

## 🎯 Vue 3 통합 예제

```vue
<template>
  <div style="width: 800px; height: 400px">
    <RealGridVue
      ref="gridRef"
      :rows="salesData"
    >
      <RGDataField field-name="Year" />
      <RGDataField field-name="Quarter" />
      <RGDataField field-name="Month" />
      <RGDataField field-name="Sales" />
      
      <RGDataColumn
        field-name="Year"
        name="Year"
        :width="80"
        header-text="연도"
        :merge-rule="{ criteria: 'value' }"
      />
      
      <RGDataColumn
        field-name="Quarter"
        name="Quarter"
        :width="80"
        header-text="분기"
        :merge-rule="{ criteria: 'prevvalues + value' }"
      />
      
      <RGDataColumn
        field-name="Month"
        name="Month"
        :width="80"
        header-text="월"
        :merge-rule="{ criteria: 'prevvalues + value' }"
      />
      
      <RGDataColumn
        field-name="Sales"
        name="Sales"
        :width="100"
        header-text="매출"
        number-format="#,##0"
      />
    </RealGridVue>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RealGridVue, RGDataField, RGDataColumn } from 'realgrid-vue';

const gridRef = ref<RealGridVue>();

const salesData = ref([
  { Year: 2025, Quarter: "Q1", Month: "1월", Sales: 10000 },
  { Year: 2025, Quarter: "Q1", Month: "2월", Sales: 12000 },
  { Year: 2025, Quarter: "Q1", Month: "3월", Sales: 15000 }
]);
</script>
```

---

## ⚠️ 주의사항

### 1. 병합은 연속된 행에만 적용
```javascript
// ✅ 연속된 행 → 병합됨
[
  { Gender: "남", Name: "홍길동" },
  { Gender: "남", Name: "김철수" },  // ← 병합
  { Gender: "여", Name: "이영희" }
]

// ❌ 중간에 다른 값 → 병합 안 됨
[
  { Gender: "남", Name: "홍길동" },
  { Gender: "여", Name: "이영희" },  // ← 병합 끊김
  { Gender: "남", Name: "김철수" }   // ← 새로운 병합 시작
]
```

### 2. 정렬 후 병합 재적용
```javascript
// 데이터 정렬 시 병합 상태 자동 업데이트
gridView.orderBy(["Gender", "Name"]);
// → 병합 규칙에 따라 자동으로 재병합됨
```

### 3. 병합된 셀 편집
병합된 셀을 편집하면 **첫 번째 셀 값만 변경**됩니다.
```javascript
// 병합된 셀 일괄 수정 참고
// https://docs.realgrid.com/guides/editing/edit-merge
```

---

## 📚 관련 문서

- **셀 병합 가이드:** https://docs.realgrid.com/guides/cell-components/cell-merging
- **Merge Callback:** https://docs.realgrid.com/guides/tip/merge-callback
- **병합 셀 일괄수정:** https://docs.realgrid.com/guides/editing/edit-merge
- **병합된 셀 합계 계산:** https://docs.realgrid.com/guides/tip/merge-cell-sum
- **셀 병합 텍스트 상단 이동:** https://docs.realgrid.com/guides/tip/cell-merging

---

**작성자:** 자비스 (AI Factory Lab)  
**버전:** 1.0  
**최종 수정:** 2025년 11월 30일
