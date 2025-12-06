# 세션 기록 - 2025년 12월 6일 (오후)

## 📋 작업 요약

### 1. SC000004 (자재수불부) 화면 완성
- **실제 DB 연동**: 하드코딩된 샘플 데이터 → 실제 `doi_material_resc` 테이블 조회
- **API 라우트 생성**: `/api/screens/sc000004/data/route.ts`
- **조회조건 UI 개선**: 
  - 가로 레이아웃 (라벨 + 셀렉트 수평 배치)
  - 년월 옵션: `202510` (실제 DB 데이터 기준)
  - 조회/초기화/Excel 버튼 스타일 통일

### 2. SC000006 (제조원가) 화면 생성 및 수정
- **엑셀 템플릿 준비**: `data/sample_excel/SC005_제조원가.xlsx`
  - 샘플데이터 시트에 `doi_stco` 테이블 데이터 추가
  - 중복 컬럼명 접두어 추가 (수량/금액 → plan_qty, plan_amt 등)
- **화면 생성**: 화면 생성기를 통해 SC000006 생성
- **조회조건 UI 수동 수정**: SC000004 스타일로 통일
- **API 라우트 생성**: `/api/screens/sc000006/data/route.ts`

### 3. DB 컬럼명 변경
```sql
-- doi_stco 테이블
ALTER TABLE doi_stco RENAME COLUMN "expen_sel명" TO expen_sel_name;

-- doi_cost 테이블  
ALTER TABLE doi_cost RENAME COLUMN "out_단가" TO out_unit;
```

### 4. 화면 생성 템플릿 개선 (`screenGenerator.ts`)

#### 미리보기 vs 실제 화면 분리
| 단계 | 데이터 소스 |
|------|-------------|
| **미리보기 (Sandpack)** | 엑셀의 샘플데이터 시트 사용 |
| **메뉴 등록 후 실제 화면** | API 호출 → 실제 DB 쿼리 |

#### `convertToNextPage()` 함수 수정
메뉴 등록 시 샘플 데이터 코드를 API 호출 코드로 자동 변환:
```typescript
// 변환 전 (미리보기)
const sampleData = [...];
const [rowData, setRowData] = useState(sampleData);

// 변환 후 (실제 화면)
const [rowData, setRowData] = useState([]);
const fetchData = useCallback(async () => {
  const response = await fetch('/api/screens/sc000006/data');
  setRowData(result.data || []);
}, []);
useEffect(() => { fetchData(); }, [fetchData]);
```

---

## 📁 생성/수정된 파일

### 신규 생성
| 파일 | 설명 |
|------|------|
| `/src/app/api/screens/sc000004/data/route.ts` | 자재수불부 API |
| `/src/app/api/screens/sc000006/data/route.ts` | 제조원가 API |
| `/src/app/screens/sc000006/page.tsx` | 제조원가 화면 (메뉴 등록 시 생성) |

### 수정
| 파일 | 변경 내용 |
|------|----------|
| `/src/app/screens/sc000004/page.tsx` | 실제 DB 연동, UI 개선 |
| `/src/server/api/routers/screenGenerator.ts` | `convertToNextPage()` 함수 - API 호출 코드 자동 삽입 |
| `/data/sample_excel/SC005_제조원가.xlsx` | 샘플데이터 시트 추가, 컬럼명 접두어 추가 |

---

## 🔧 접두어 규칙 (중복 컬럼명 해결)

| 그룹 | 접두어 | 예시 |
|------|--------|------|
| 계획 | `plan_` | plan_qty, plan_amt |
| 계획 대비 실적 | `actual_` | actual_qty, actual_amt |
| 달성률 | `achv_` | achv_qty, achv_amt |
| 기초재공품재고(BOH) | `boh_` | boh_qty, boh_amt |
| 기말재공품재고(EOH) | `eoh_` | eoh_qty, eoh_amt |

---

## 🎯 조회조건 UI 표준 스타일

```tsx
<div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">년월</label>
    <select className="h-9 px-3 border border-gray-300 rounded-md ...">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
  
  <div className="flex gap-2 ml-auto">
    <button className="... bg-blue-600 ...">조회</button>
    <button className="... bg-gray-500 ...">초기화</button>
    <button className="... bg-green-600 ...">Excel</button>
  </div>
</div>
```

---

## 📊 현재 DB 데이터 현황

| 테이블 | 데이터 기간 | 건수 |
|--------|------------|------|
| `doi_material_resc` | 202510 | 약 100건 |
| `doi_stco` | 202507~202510 | 3,227건 |

---

## ⏭️ 다음 작업 (TODO)

1. **조회조건 공통 컴포넌트화**
   - `<FilterBar>` 컴포넌트 생성
   - 년월 선택, 검색/초기화/Excel 버튼 포함
   - 화면별 커스텀 필터 지원

2. **API 라우트 자동 생성**
   - 메뉴 등록 시 `/api/screens/[screenId]/data/route.ts` 자동 생성
   - 엑셀의 테이블명 + 쿼리 정보 활용

3. **그리드 컬럼 그룹 헤더 한글화**
   - 현재: `plan_qty`, `plan_amt`
   - 목표: 그룹 헤더 "계획" 아래 "수량", "금액"

4. **Excel 다운로드 기능 구현**

---

## 🌐 접속 정보

- **개발 서버**: http://localhost:3001 (또는 3000)
- **SC000004**: http://localhost:3001/screens/sc000004
- **SC000006**: http://localhost:3001/screens/sc000006
- **화면 생성기**: http://localhost:3001/settings/screen-generator

---

## 💡 핵심 인사이트

1. **미리보기와 실제 화면 분리**: Sandpack 미리보기는 샘플 데이터로 빠르게 확인, 메뉴 등록 후에는 실제 DB 연동

2. **엑셀 템플릿 구조**:
   - 메타정보: 화면명, 테이블명
   - 조회조건: 필터 정의
   - 그리드컬럼: AG Grid columnDefs
   - 샘플데이터: 미리보기용 데이터

3. **컬럼명 중복 해결**: 그룹별 접두어 사용 (plan_, actual_, achv_ 등)
