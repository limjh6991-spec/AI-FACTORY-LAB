# 📊 RealGrid 차트 렌더러 가이드

## 개요

RealGrid는 셀 내부에 다양한 차트를 렌더링할 수 있는 강력한 렌더러를 제공합니다. 숫자 데이터를 시각적으로 표현하여 직관적인 데이터 분석이 가능합니다.

---

## 1️⃣ Bar Renderer (막대 차트)

### 기본 사용법

숫자 값을 막대 그래프로 표시합니다.

```javascript
{
  name: 'sales',
  fieldName: 'sales',
  header: { text: '매출' },
  renderer: {
    type: 'bar',
    maximum: 10000,        // 최대값 (100%의 기준)
    origin: 'left',        // 'left', 'right', 'center'
    showLabel: true,       // 값 표시 여부
    barColors: ['#3498db'] // 막대 색상
  }
}
```

### 주요 속성

| 속성 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| `type` | string | 'bar' 고정 | - |
| `maximum` | number | 최대값 (100% 기준) | 자동 계산 |
| `minimum` | number | 최소값 | 0 |
| `origin` | string | 시작 위치 ('left', 'right', 'center') | 'left' |
| `showLabel` | boolean | 값 표시 여부 | true |
| `barColors` | array | 막대 색상 배열 | ['#3498db'] |
| `barWidth` | number | 막대 두께 (%) | 80 |

### 실전 예제

```javascript
// 월별 매출 비교
const columns = [
  { name: 'month', fieldName: 'month', header: { text: '월' }, width: 80 },
  {
    name: 'sales',
    fieldName: 'sales',
    header: { text: '매출 현황' },
    width: 200,
    numberFormat: '#,##0',
    renderer: {
      type: 'bar',
      maximum: 100000000,
      origin: 'left',
      showLabel: true,
      barColors: ['#2ecc71', '#e74c3c'], // 목표 대비 색상 변경
      barWidth: 70
    }
  }
]

const data = [
  { month: '1월', sales: 85000000 },
  { month: '2월', sales: 92000000 },
  { month: '3월', sales: 78000000 }
]
```

---

## 2️⃣ Spark Line Renderer (스파크 라인 차트)

### 기본 사용법

여러 필드의 값을 작은 라인 차트로 표시합니다.

```javascript
{
  name: 'trend',
  fieldNames: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'], // 복수 필드
  header: { text: '월별 추이' },
  width: 200,
  renderer: {
    type: 'sparkline',
    lineWidth: 2,
    lineColor: '#2ecc71',
    fillColor: 'rgba(46, 204, 113, 0.2)',
    showHighLow: true,        // 최고/최저 점 표시
    highColor: '#e74c3c',
    lowColor: '#3498db'
  }
}
```

### 주요 속성

| 속성 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| `type` | string | 'sparkline' 고정 | - |
| `lineWidth` | number | 라인 두께 | 1 |
| `lineColor` | string | 라인 색상 | '#000' |
| `fillColor` | string | 영역 채우기 색상 | 'transparent' |
| `showHighLow` | boolean | 최고/최저점 표시 | false |
| `highColor` | string | 최고점 색상 | '#e74c3c' |
| `lowColor` | string | 최저점 색상 | '#3498db' |
| `showFirstLast` | boolean | 첫/마지막 점 표시 | false |

### 실전 예제

```javascript
// 주가 차트
const fields = [
  { fieldName: 'stock', dataType: 'text' },
  { fieldName: 'day1', dataType: 'number' },
  { fieldName: 'day2', dataType: 'number' },
  { fieldName: 'day3', dataType: 'number' },
  { fieldName: 'day4', dataType: 'number' },
  { fieldName: 'day5', dataType: 'number' }
]

const columns = [
  { name: 'stock', fieldName: 'stock', header: { text: '종목' }, width: 100 },
  {
    name: 'trend',
    fieldNames: ['day1', 'day2', 'day3', 'day4', 'day5'],
    header: { text: '5일 추이' },
    width: 150,
    renderer: {
      type: 'sparkline',
      lineWidth: 2,
      lineColor: '#3498db',
      fillColor: 'rgba(52, 152, 219, 0.1)',
      showHighLow: true,
      highColor: '#e74c3c',
      lowColor: '#2ecc71'
    }
  }
]

const data = [
  { stock: '삼성전자', day1: 70000, day2: 71000, day3: 69500, day4: 72000, day5: 73500 },
  { stock: 'SK하이닉스', day1: 125000, day2: 123000, day3: 127000, day4: 128500, day5: 126000 }
]
```

---

## 3️⃣ Signal Renderer (시그널 렌더러)

### 기본 사용법

값을 막대 개수나 색상으로 표시합니다 (휴대폰 신호 표시처럼).

```javascript
{
  name: 'achievement',
  fieldName: 'achievement',
  header: { text: '달성률' },
  width: 150,
  renderer: {
    type: 'signal',
    maximum: 100,          // 최대값
    signalCount: 5,        // 신호 막대 개수
    onColor: '#2ecc71',    // 활성화된 막대 색상
    offColor: '#ecf0f1',   // 비활성화된 막대 색상
    shape: 'bar'           // 'bar', 'circle'
  }
}
```

### 주요 속성

| 속성 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| `type` | string | 'signal' 고정 | - |
| `maximum` | number | 최대값 (100% 기준) | 100 |
| `signalCount` | number | 막대/원 개수 | 5 |
| `onColor` | string | 활성화 색상 | '#2ecc71' |
| `offColor` | string | 비활성화 색상 | '#ecf0f1' |
| `shape` | string | 모양 ('bar', 'circle') | 'bar' |

### 실전 예제

```javascript
// 고객 만족도
const columns = [
  { name: 'customer', fieldName: 'customer', header: { text: '고객' }, width: 100 },
  {
    name: 'satisfaction',
    fieldName: 'satisfaction',
    header: { text: '만족도' },
    width: 150,
    numberFormat: '#,##0',
    suffix: '점',
    renderer: {
      type: 'signal',
      maximum: 5,
      signalCount: 5,
      onColor: '#f39c12',
      offColor: '#ecf0f1',
      shape: 'circle'
    }
  }
]

const data = [
  { customer: '홍길동', satisfaction: 4.5 },
  { customer: '김철수', satisfaction: 3.0 },
  { customer: '이영희', satisfaction: 5.0 }
]
```

---

## 4️⃣ Shape Renderer (도형 렌더러)

### 기본 사용법

값에 따라 다른 도형을 표시합니다.

```javascript
{
  name: 'status',
  fieldName: 'status',
  header: { text: '상태' },
  width: 120,
  renderer: {
    type: 'shape',
    shape: (grid, cell) => {
      // 값에 따라 도형 결정
      const value = cell.value
      if (value >= 90) return 'star'      // ⭐
      if (value >= 70) return 'circle'    // ●
      return 'square'                     // ■
    },
    shapeColor: (grid, cell) => {
      // 값에 따라 색상 결정
      const value = cell.value
      if (value >= 90) return '#f39c12'   // 골드
      if (value >= 70) return '#3498db'   // 블루
      return '#95a5a6'                    // 그레이
    },
    shapeHeight: 20,
    shapeWidth: 20
  }
}
```

### 사용 가능한 도형

| 도형 이름 | 설명 |
|-----------|------|
| `circle` | 원형 |
| `square` | 사각형 |
| `diamond` | 다이아몬드 |
| `star` | 별 |
| `uptriangle` | 위쪽 삼각형 |
| `downtriangle` | 아래쪽 삼각형 |
| `lefttriangle` | 왼쪽 삼각형 |
| `righttriangle` | 오른쪽 삼각형 |

### 실전 예제

```javascript
// 재고 상태 표시
const columns = [
  { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
  { name: 'stock', fieldName: 'stock', header: { text: '재고' }, width: 80, numberFormat: '#,##0' },
  {
    name: 'status',
    fieldName: 'stock',
    header: { text: '상태' },
    width: 100,
    renderer: {
      type: 'shape',
      shape: (grid, cell) => {
        const stock = cell.value
        if (stock > 100) return 'uptriangle'
        if (stock > 50) return 'circle'
        if (stock > 20) return 'downtriangle'
        return 'star' // 긴급 발주 필요
      },
      shapeColor: (grid, cell) => {
        const stock = cell.value
        if (stock > 100) return '#2ecc71'  // 풍부
        if (stock > 50) return '#3498db'   // 적정
        if (stock > 20) return '#f39c12'   // 주의
        return '#e74c3c'                   // 위험
      },
      shapeHeight: 24,
      shapeWidth: 24
    }
  }
]

const data = [
  { product: '노트북', stock: 150 },
  { product: '마우스', stock: 75 },
  { product: '키보드', stock: 30 },
  { product: '모니터', stock: 15 }
]
```

---

## 5️⃣ 차트 렌더러 조합 예제

```javascript
// 판매 실적 대시보드
const fields = [
  { fieldName: 'salesperson', dataType: 'text' },
  { fieldName: 'target', dataType: 'number' },
  { fieldName: 'actual', dataType: 'number' },
  { fieldName: 'jan', dataType: 'number' },
  { fieldName: 'feb', dataType: 'number' },
  { fieldName: 'mar', dataType: 'number' },
  { fieldName: 'apr', dataType: 'number' },
  { fieldName: 'may', dataType: 'number' },
  { fieldName: 'jun', dataType: 'number' }
]

const columns = [
  { name: 'salesperson', fieldName: 'salesperson', header: { text: '영업사원' }, width: 100 },
  { name: 'target', fieldName: 'target', header: { text: '목표' }, width: 100, numberFormat: '#,##0' },
  { name: 'actual', fieldName: 'actual', header: { text: '실적' }, width: 100, numberFormat: '#,##0' },
  
  // Bar Renderer: 목표 대비 실적
  {
    name: 'achievement',
    valueCallback: (grid, index) => {
      const item = grid.getDataProvider().getValue(index, 'actual')
      const target = grid.getDataProvider().getValue(index, 'target')
      return (item / target) * 100
    },
    header: { text: '달성률 (%)' },
    width: 150,
    renderer: {
      type: 'bar',
      maximum: 150,
      origin: 'left',
      showLabel: true,
      barColors: ['#2ecc71']
    }
  },
  
  // Spark Line: 월별 추이
  {
    name: 'trend',
    fieldNames: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
    header: { text: '월별 추이' },
    width: 180,
    renderer: {
      type: 'sparkline',
      lineWidth: 2,
      lineColor: '#3498db',
      fillColor: 'rgba(52, 152, 219, 0.2)',
      showHighLow: true
    }
  },
  
  // Signal Renderer: 등급
  {
    name: 'grade',
    valueCallback: (grid, index) => {
      const item = grid.getDataProvider().getValue(index, 'actual')
      const target = grid.getDataProvider().getValue(index, 'target')
      return Math.floor((item / target) * 5)
    },
    header: { text: '등급' },
    width: 120,
    renderer: {
      type: 'signal',
      maximum: 5,
      signalCount: 5,
      onColor: '#f39c12',
      offColor: '#ecf0f1',
      shape: 'circle'
    }
  }
]
```

---

## 🎯 Vue 3 통합 예제

```vue
<template>
  <div id="chartGrid" style="width: 100%; height: 500px"></div>
  <div class="btn-group mt-3">
    <button class="btn btn-sm btn-primary" @click="showBarChart">Bar Chart</button>
    <button class="btn btn-sm btn-success" @click="showSparkLine">Spark Line</button>
    <button class="btn btn-sm btn-info" @click="showSignal">Signal</button>
    <button class="btn btn-sm btn-warning" @click="showShape">Shape</button>
  </div>
</template>

<script>
import { GridView, LocalDataProvider } from 'realgrid'

export default {
  data() {
    return {
      gridView: null,
      provider: null
    }
  },
  mounted() {
    this.initGrid()
  },
  beforeUnmount() {
    this.gridView?.destroy()
    this.provider?.destroy()
  },
  methods: {
    initGrid() {
      this.provider = new LocalDataProvider()
      this.gridView = new GridView('chartGrid')
      this.gridView.setDataSource(this.provider)
      
      // 필드 및 데이터 설정
      // ... (위 예제 참조)
    },
    
    showBarChart() {
      // Bar Renderer 적용
    },
    
    showSparkLine() {
      // Spark Line Renderer 적용
    },
    
    showSignal() {
      // Signal Renderer 적용
    },
    
    showShape() {
      // Shape Renderer 적용
    }
  }
}
</script>
```

---

## 📌 주의사항

1. **성능**: 대량 데이터에서는 차트 렌더러가 성능에 영향을 줄 수 있습니다
2. **브라우저 호환성**: 최신 브라우저에서 최적화되어 있습니다
3. **모바일**: 작은 화면에서는 차트 크기를 조정해야 합니다

---

## 🔗 참고 링크

- [RealGrid 공식 문서](https://docs.realgrid.com/)
- [API 레퍼런스](https://docs.realgrid.com/refs/realgrid)
