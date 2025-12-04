# AG Grid 전환 결정 기록

**결정일**: 2024-12-04  
**결정자**: 사용자  
**상태**: ✅ 확정

---

## 📋 배경

RealGrid와 AG Grid를 동일한 5가지 스타일로 비교 테스트 수행:

1. **Corporate Professional** - 블루 그라디언트, 비즈니스 스타일
2. **Modern Dark** - 다크 테마, 네온 강조
3. **Soft Pastel** - 파스텔톤, 부드러운 스타일  
4. **Financial Dashboard** - 금융/회계, 밀집 레이아웃
5. **Minimal Clean** - 미니멀, 보더리스

---

## ✅ 최종 결정: AG Grid

### 선택 이유

| 항목 | AG Grid | RealGrid |
|------|---------|----------|
| **개발 편의성** | ⭐⭐⭐⭐⭐ React 친화적 | ⭐⭐⭐ 명령형 API |
| **문서/예제** | ⭐⭐⭐⭐⭐ 매우 풍부 | ⭐⭐⭐ 한국어 우수 |
| **커뮤니티** | ⭐⭐⭐⭐⭐ 글로벌 | ⭐⭐⭐ 한국 중심 |
| **타입스크립트** | ⭐⭐⭐⭐⭐ 완벽 지원 | ⭐⭐⭐ 일부 타입 누락 |
| **커스텀 렌더러** | ⭐⭐⭐⭐⭐ React 컴포넌트 | ⭐⭐⭐ 문자열 기반 |
| **AI 생성 품질** | ⭐⭐⭐⭐⭐ Claude가 잘 생성 | ⭐⭐⭐ 학습 데이터 부족 |

### 핵심 장점

1. **React 컴포넌트 기반**: 셀 렌더러를 React 컴포넌트로 작성
2. **선언적 API**: useMemo로 columnDefs 정의
3. **풍부한 문서**: Claude가 잘 알고 있음
4. **CSS Variables**: 테마 커스터마이징 용이
5. **Community 무료**: 기본 기능 무료 사용

---

## 🔧 기술 구현

### 모듈 등록 (필수)

```typescript
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
```

### 그룹 헤더 (2행 헤더)

```typescript
const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: '기본 정보',  // 1행 (그룹)
    children: [
      { field: 'code', headerName: '코드' },  // 2행
      { field: 'name', headerName: '품명' },
    ]
  },
];
```

### 커스텀 셀 렌더러

```typescript
const StatusRenderer = (params: { value: string }) => (
  <span className="px-2 py-1 rounded bg-green-100 text-green-700">
    {params.value}
  </span>
);

// 사용
{ field: 'status', cellRenderer: StatusRenderer }
```

### Corporate 스타일 CSS

```css
.ag-corporate-style {
  --ag-header-background-color: #1e40af;
  --ag-header-foreground-color: white;
  --ag-row-hover-color: #eff6ff;
}
```

---

## 📂 파일 구조

```
scripts/
├── phase3_generate_ui_component_aggrid.ts    # AG Grid 화면 생성 (기본)
├── phase3_generate_ui_component_realgrid.ts  # RealGrid 화면 생성 (백업)

src/app/screens/
├── ag-grid-examples/           # AG Grid 스타일 갤러리
│   ├── page.tsx
│   ├── style-1-corporate/
│   ├── style-2-modern-dark/
│   ├── style-3-soft-pastel/
│   ├── style-4-financial/
│   └── style-5-minimal/
└── grid-examples/              # RealGrid 스타일 갤러리 (참고용)
```

---

## 🚀 사용 방법

### 화면 생성 명령어

```bash
# AG Grid 화면 생성 (기본)
npm run generate:screen data/report_designs/SC003_definition.json

# RealGrid 화면 생성 (백업)
npm run generate:screen:realgrid data/report_designs/SC003_definition.json
```

### 스타일 갤러리 확인

- **AG Grid**: http://localhost:3001/screens/ag-grid-examples
- **RealGrid**: http://localhost:3001/screens/grid-examples

---

## 📝 마이그레이션 가이드

기존 RealGrid 화면을 AG Grid로 마이그레이션:

### 1. Import 변경

```typescript
// Before (RealGrid)
import { GridView, LocalDataProvider } from 'realgrid';

// After (AG Grid)
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
```

### 2. 컬럼 정의 변경

```typescript
// Before (RealGrid)
const columns = [
  { name: 'col1', fieldName: 'col1', header: { text: '코드' } }
];

// After (AG Grid)
const columnDefs = [
  { field: 'col1', headerName: '코드' }
];
```

### 3. 그리드 렌더링 변경

```typescript
// Before (RealGrid)
useEffect(() => {
  const gridView = new GridView(container);
  // ...
}, []);

// After (AG Grid)
<AgGridReact
  rowData={data}
  columnDefs={columnDefs}
/>
```

---

## ⚠️ 주의사항

1. **Enterprise 기능**: 피벗, 차트 등은 Enterprise 라이센스 필요
2. **모듈 등록**: AllCommunityModule 등록 필수 (v34+)
3. **스타일 import**: CSS import 제거됨 (모듈에 포함)

---

**작성**: AI Assistant  
**검토**: 사용자 확인 완료
