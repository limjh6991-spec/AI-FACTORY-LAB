# 세션 컨텍스트 - 2025년 12월 9일

## 📋 작업 요약

### 주요 작업
1. 화면 생성기 Sandpack 미리보기 에러 해결
2. **SimpleGridCrudTemplate 표준화 완료** (표준: `/master/dept`)
3. 잘못 생성된 화면 정리 및 빌드 에러 해결

---

## 🔧 수정된 파일 목록

### 1. `src/server/api/routers/screenGenerator/templates/simpleGridCrud/SimpleGridCrudTemplate.ts`

#### 변경 사항:
1. **AG Grid 모듈 등록 지연 로딩** (Sandpack 호환성)
   - 기존: 최상단에서 즉시 `ModuleRegistry.registerModules([AllCommunityModule])` 실행
   - 변경: 컴포넌트 렌더링 시점에 조건부 등록
   ```typescript
   // 모듈 등록 플래그 (Sandpack 호환성)
   let isAgGridModulesRegistered = false;
   
   export default function Component() {
     if (!isAgGridModulesRegistered && AllCommunityModule) {
       ModuleRegistry.registerModules([AllCommunityModule]);
       isAgGridModulesRegistered = true;
     }
     // ...
   }
   ```

2. **`import type` 제거**
   - TypeScript 타입 import 제거 (Sandpack은 JavaScript만 지원)

3. **`styled-jsx` 제거**
   - 기존: `<style jsx global>` 태그 사용
   - 변경: 인라인 스타일 객체 `gridStyle` 사용
   ```typescript
   const gridStyle = {
     '--ag-header-background-color': '#dbeafe',
     '--ag-header-foreground-color': '#1e3a5f',
     // ...
   };
   
   <div className="ag-theme-alpine" style={{ minHeight: 400, ...gridStyle }}>
   ```

---

### 2. `src/components/preview/SandpackPreview.tsx`

#### 변경 사항:
1. **`~/trpc/react` import 제거 및 mock 처리**
   ```typescript
   // trpc import 제거
   jsCode = jsCode.replace(/import\s*\{\s*api\s*\}\s*from\s*["']~\/trpc\/react["'];?\s*\n?/g, "");
   
   // useQuery mock
   jsCode = jsCode.replace(
     /const\s+\{\s*data\s*,\s*isLoading\s*,\s*refetch\s*\}\s*=\s*api\.[a-zA-Z0-9_]+\.getAll\.useQuery\([^)]*\);?/g,
     "const { data, isLoading, refetch } = { data: [], isLoading: false, refetch: () => {} };"
   );
   
   // useMutation mock
   jsCode = jsCode.replace(
     /const\s+saveMutation\s*=\s*api\.[a-zA-Z0-9_]+\.save\.useMutation\([^)]*\);?/g,
     "const saveMutation = { mutateAsync: async () => ({ success: true }), isPending: false };"
   );
   ```

2. **`lucide-react` dependency 추가**
   ```typescript
   dependencies: {
     // ...
     "lucide-react": "^0.263.1",
   }
   ```

---

### 3. `src/lib/screen-generator/templates/ag-grid-styles.ts`

#### 변경 사항:
- **`styled-jsx` 코드 완전 제거**
  - 기존: `<style jsx global>` 포함된 문자열
  - 변경: 빈 문자열 `AG_GRID_STYLES = ""`
  - CSS 변수는 인라인 스타일로 적용

---

### 4. `src/lib/screen-generator/converters/to-next-page.ts`

#### 변경 사항:
- **`AG_GRID_STYLES` import 제거**
  - `styled-jsx` 관련 코드가 모두 제거되어 더 이상 사용하지 않음

---

## ❌ 삭제된 파일

| 경로 | 사유 |
|------|------|
| `src/app/screens/sc000022/` | 중첩된 `styled-jsx` 에러, 중복 `export default` |
| `src/app/screens/sc000023/` | 동일 에러 (생성 시 템플릿 버그) |

---

## 🐛 해결된 에러

### 1. Sandpack AG Grid 모듈 에러
```
Cannot read properties of undefined (reading 'version')
ModuleRegistry.registerModules([AllCommunityModule])
```
**원인**: Sandpack 번들러에서 모듈 초기화 시점 문제
**해결**: 지연 로딩 + `AllCommunityModule` 존재 확인

### 2. `styled-jsx` 중첩 에러
```
Detected nested styled-jsx tag
```
**원인**: `convertToNextPage`에서 `AG_GRID_STYLES` 추가 시 중복 생성
**해결**: `styled-jsx` 완전 제거, 인라인 스타일로 대체

### 3. 중복 `export default` 에러
```
the name `default` is exported multiple times
```
**원인**: 템플릿과 `convertToNextPage` 양쪽에서 export 추가
**상태**: 🔄 수정 진행 중

### 4. `lucide-react` 미설치 에러
```
Could not resolve dependency: lucide-react
```
**해결**: SandpackPreview dependencies에 추가

### 5. `~/trpc/react` import 에러
```
Could not resolve: ~/trpc/react
```
**해결**: import 제거 + mock API로 대체

---

## 📝 남은 작업

### 1. 컴포넌트명 생성 로직 수정 (우선순위: 높음)
- **파일**: `SimpleGridCrudTemplate.ts`
- **문제**: 테이블명 `bi_acct_mst` → `SC_BI_ACCT_MSTMasterScreen` (대문자 변환)
- **필요 작업**: 
  - 컴포넌트명을 screenId 기반으로 변경 (예: `Screen000023`)
  - 또는 PascalCase 변환 함수 개선

### 2. 중복 `export default` 방지
- **파일**: `to-next-page.ts` 또는 `SimpleGridCrudTemplate.ts`
- **문제**: 두 곳에서 각각 export default 추가
- **필요 작업**: 한 곳에서만 export 생성하도록 통일

---

## 🗂️ 공통 옵션 컴포넌트 (참고)

| 번호 | 컴포넌트명 | 용도 | DB 테이블 |
|------|-----------|------|----------|
| 1 | `CustomerSelect` | 거래처 | doi_cust_mast |
| 2 | `MaterialSelect` | 부품/자재 | doi_material_mast |
| 3 | `ModelSelect` | 모델 | doi_model_mast |
| 4 | `AccountSelect` | 계정 | doi_acct |
| 5 | `ExpenSelSelect` | 비용구분 | doi_expen_sel |
| 6 | `DepartmentSelect` | 부서 | doi_dept |
| 7 | `SiteSelect` | Site | HQ, VN |
| 8 | `SelCodeSelect` | SEL_CODE | ACTUAL |
| 9 | `YearMonthPicker` | 년월 | yyyymm |
| 10 | `YearPicker` | 년 | yyyy |

---

## 🔗 관련 파일 경로

```
src/
├── server/api/routers/screenGenerator/
│   ├── templates/simpleGridCrud/
│   │   └── SimpleGridCrudTemplate.ts  ✅ 수정됨
│   └── procedures/
│       └── publish.ts                  (convertToNextPage 호출)
├── lib/screen-generator/
│   ├── templates/
│   │   └── ag-grid-styles.ts          ✅ 수정됨
│   └── converters/
│       └── to-next-page.ts            ✅ 수정됨
├── components/
│   ├── preview/
│   │   └── SandpackPreview.tsx        ✅ 수정됨
│   └── options/
│       └── index.tsx                   (공통 옵션 컴포넌트)
└── app/
    └── settings/screen-generator/
        └── _components/
            ├── SimpleMode.tsx          (CRUD 모드)
            └── ExcelMode.tsx           (엑셀 모드)
```

---

## 📅 다음 세션 작업 계획

1. **컴포넌트명 생성 로직 수정** - `SimpleGridCrudTemplate.ts`
2. **중복 export default 해결** - 코드 생성 흐름 통일
3. **Sandpack 미리보기 최종 테스트**
4. **화면 발행 후 실제 동작 확인**

---

## 🔧 2차 수정 사항 (오후)

### SimpleGridCrudTemplate.ts 완전 재작성

**표준 화면**: `/master/dept/page.tsx` (부서관리)

#### 주요 변경사항:

1. **AG Grid 스타일 - `<style jsx global>` 사용**
   ```tsx
   <style jsx global>{`
     .ag-theme-alpine {
       --ag-header-background-color: #dbeafe;
       --ag-header-foreground-color: #1e3a5f;
       --ag-row-hover-color: #eff6ff;
       --ag-selected-row-background-color: #dbeafe;
       --ag-border-color: #e5e7eb;
       --ag-font-family: inherit;
       --ag-font-size: 14px;
     }
     .ag-theme-alpine .ag-header-cell {
       background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
       color: #1e3a5f;
       font-weight: 500;
     }
   `}</style>
   ```

2. **타입 명시적 import**
   ```typescript
   import type { ColDef, CellValueChangedEvent, IRowNode } from 'ag-grid-community';
   ```

3. **공통 컴포넌트 사용**
   ```typescript
   import {
     BiSiteSelect,
     BiScenarioSelect,
     BiYearMonthPicker,
   } from '~/components/master';
   ```

4. **AG Grid 모듈 등록 (파일 상단)**
   ```typescript
   ModuleRegistry.registerModules([AllCommunityModule]);
   ```

5. **IBM Carbon Design 스타일**
   - 버튼 색상: `#0f62fe` (파란색), `#24a148` (녹색), `#da1e28` (빨간색)
   - 배경: `#f4f4f4`, 테두리: `#e0e0e0`
   - 폰트: `#161616` (제목), `#525252` (부제)

---

## ❌ 추가 삭제된 파일

| 경로 | 사유 |
|------|------|
| `src/app/screens/sc000023/` | 잘못된 코드 생성 (import 누락, 중복 export) |
| `src/server/api/routers/generated/screenSC001.ts` | 존재하지 않는 Prisma 모델 참조 (`tbCustomer`) |

---

## ✅ 빌드 결과

```bash
$ npm run build
✓ Build completed successfully
○ (Static) 50+ screens prerendered
```

---

## 🚀 서버 상태

- **개발 서버**: http://localhost:3000 ✅ 정상 실행
- **TypeScript**: 에러 없음 (빌드 성공)
- **VS Code**: TypeScript 서버 재시작 필요 (캐시 문제)

---

## 📁 최종 파일 구조

```
src/server/api/routers/screenGenerator/
├── index.ts                  # 라우터 정의
├── _shared/
│   └── types.ts              # 타입 정의
├── procedures/
│   ├── preview.ts            # generateCrudPreview
│   ├── publish.ts            # publishScreen
│   ├── query.ts              # generateQuery
│   ├── tempScreen.ts         # 임시화면 CRUD
│   └── validate.ts           # validateTemplate
└── templates/
    ├── base/
    │   ├── BaseTemplate.ts   # 추상 클래스
    │   └── index.ts
    └── simpleGridCrud/
        ├── SimpleGridCrudTemplate.ts  ✅ 재작성 완료
        └── index.ts
```
