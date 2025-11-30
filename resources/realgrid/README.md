# 🎨 RealGrid 학습 자료실

**목적:** RealGrid 고급 기능 마스터하기  
**프로젝트:** AI Factory Lab  
**최종 업데이트:** 2025년 11월 30일

---

## 📂 폴더 구조

```
resources/realgrid/
├── README.md                  # 이 파일
├── docs/                      # 기능별 학습 문서
│   ├── 01_COLUMN_LAYOUT.md    # 컬럼 레이아웃 (다층 헤더)
│   └── 02_CELL_MERGING.md     # 셀 병합 가이드
├── examples/                  # 실습 예제 코드
│   ├── RealGridDemo.vue       # 🎯 통합 데모 페이지 ✅
│   ├── DEMO_GUIDE.md          # 🎯 데모 사용 가이드 ✅
│   └── router_example.js      # 라우터 설정 예제 ✅
└── screenshots/               # 스크린샷 모음
    └── (예정)
```

---

## 🚀 빠른 시작

### 🎯 데모 페이지 실행 (강력 권장!)

```bash
# 1. 라우터에 등록
# frontend/src/router/index.js에 추가:
{
  path: '/realgrid-demo',
  name: 'RealGridDemo',
  component: () => import('@/resources/realgrid/examples/RealGridDemo.vue'),
  meta: { layout: 'MainLayout' }
}

# 2. 서버 실행
cd frontend
npm run serve

# 3. 브라우저 접속
http://localhost:8080/#/realgrid-demo
```

📖 **자세한 사용법**: [examples/DEMO_GUIDE.md](./examples/DEMO_GUIDE.md)

---

## 📚 문서 목록

### 📖 가이드 문서 (`docs/`)

| 문서 | 주제 | 핵심 내용 | 상태 |
|------|------|-----------|------|
| **[01_COLUMN_LAYOUT.md](docs/01_COLUMN_LAYOUT.md)** | 컬럼 레이아웃 | 다층 헤더, 가로/세로 그룹핑, 중첩 구조, Vue 3 통합 | ✅ |
| **[02_CELL_MERGING.md](docs/02_CELL_MERGING.md)** | 셀 병합 | 값 기준 병합, 선행 컬럼 참조, Object 타입 필드 | ✅ |
| **[03_CHART_RENDERERS.md](docs/03_CHART_RENDERERS.md)** | 차트 렌더러 | Bar, Spark Line, Signal, Shape 렌더러 | ✅ |
| 04_ROW_GROUPING.md | 행 그룹핑 | 트리 구조, 그룹핑 모드, 집계 함수 | ⏳ 예정 |

### 💻 예제 코드 (`examples/`)

| 파일 | 설명 | 기능 | 상태 |
|------|------|------|------|
| **RealGridDemo.vue** | 통합 데모 페이지 | 3개 Tab (Layout, Merging, Combined) | ✅ |
| **ChartWidgets.vue** | 차트 위젯 컴포넌트 | 4가지 차트 렌더러 (Bar, Spark, Signal, Shape) | ✅ |
| **DEMO_GUIDE.md** | 데모 사용 가이드 | 실행 방법, Tab별 기능 설명, 실험 가이드 | ✅ |
| router_example.js | 라우터 설정 예제 | Vue Router 통합 코드 | ✅ |

---

## 🎯 학습 로드맵

### Phase 1: 기본 기능 (진행 중) ⚡
- [x] Column Layout (컬럼 레이아웃) ✅
- [x] Cell Merging (셀 병합) ✅
- [x] **통합 데모 페이지 구현** ✅
- [x] **차트 렌더러 (Bar, Spark, Signal, Shape)** ✅
- [ ] Row Grouping (행 그룹핑)
- [ ] Tree View (트리 구조)

### Phase 2: 고급 기능
- [ ] Dynamic Styles (동적 스타일)
- [ ] Custom Editors (커스텀 에디터)
- [ ] Validation (데이터 검증)
- [ ] Filtering & Sorting (필터링 & 정렬)

### Phase 3: 차트 & 시각화
- [ ] Bar Renderer (바 차트 렌더러)
- [ ] Spark Chart (스파크 차트)
- [ ] Icon Renderer (아이콘 렌더러)

### Phase 4: 실전 적용
- [ ] StandardPage 통합
- [ ] JSON Schema 확장
- [ ] Excel Export/Import
- [ ] Performance Optimization

---

## 🎨 데모 페이지 미리보기

### Tab 1: 📊 Column Layout
- 다층 헤더 구조를 **동적으로 변경**하며 학습
- 3가지 레이아웃 패턴 (가로 그룹 / 세로 그룹 / 중첩 그룹)

### Tab 2: 🔗 Cell Merging
- 셀 병합 규칙을 **실시간 비교**
- 기본 병합 vs 선행 컬럼 참조 병합

### Tab 3: ⭐ Combined Example
- **판매 실적 분석 대시보드**
- Column Layout + Cell Merging 통합 적용
- 연도-분기-월 계층 구조 + 3단계 헤더 그룹핑

---

## 💡 코드 스니펫

### 1. 기본 Column Layout

```javascript
const layout = [
  'column1',
  {
    name: 'group1',
    direction: 'horizontal',  // 또는 'vertical'
    items: ['column2', 'column3'],
    header: { text: '그룹 헤더' }
  },
  'column4'
]

gridView.setColumnLayout(layout)
```

### 2. 계층적 Cell Merging

```javascript
// 연도 - 독립 병합
gridView.columnByName('year').mergeRule = { criteria: 'value' }

// 분기 - 연도가 같을 때만 병합
gridView.columnByName('quarter').mergeRule = { criteria: 'prevvalues + value' }

// 월 - 연도와 분기가 모두 같을 때만 병합
gridView.columnByName('month').mergeRule = { criteria: 'prevvalues + value' }
```

### 3. Vue 3 통합

```vue
<template>
  <RealGridVue
    :fields="fields"
    :columns="columns"
    :layout="layout"
    :data="gridData"
    style="width: 100%; height: 500px"
  />
</template>

<script setup>
import { ref } from 'vue'
import RealGridVue from 'realgrid-vue3'

const layout = ref([
  {
    name: 'salesGroup',
    direction: 'horizontal',
    items: ['sales', 'cost', 'profit'],
    header: { text: '실적' }
  }
])
</script>
```

---

## 🔗 주요 링크

- **RealGrid 공식 문서:** https://docs.realgrid.com/
- **Vue 튜토리얼:** https://docs.realgrid.com/tutorial/vue-tutorial/column-layout
- **API 레퍼런스:** https://docs.realgrid.com/refs/realgrid
- **개발자 포럼:** http://forum.realgrid.com/

---

## 📋 To-Do

### 우선순위 높음 🔥
- [ ] Row Grouping 문서 작성 및 데모 추가
- [ ] Chart 연동 예제 (Bar Renderer, Spark Chart)
- [ ] 스크린샷 캡처 및 README 추가

### 우선순위 중간 📝
- [ ] Tree View 예제
- [ ] Dynamic Style 가이드
- [ ] Excel Export/Import 실습

### 우선순위 낮음 💡
- [ ] Performance Test (10,000 rows)
- [ ] Custom Renderer 예제
- [ ] Validation & Filtering 가이드

---

## 🎓 다음 단계

1. **데모 페이지 실행** → `http://localhost:8080/#/realgrid-demo`
2. **3개 Tab 실습** → Layout / Merging / Combined
3. **DEMO_GUIDE.md 참조** → 커스터마이징 실험
4. **Phase 4 준비** → StandardPage 통합 설계

---

**관리자:** 자비스 (AI Factory Lab)  
**버전:** 1.0.0  
**라이센스:** RealGrid 2.9+ Commercial License
