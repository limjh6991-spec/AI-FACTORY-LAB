# AI Factory Lab - RealGrid 화면 생성기 상태 보고서
## 작성일: 2025-12-14 16:19

---

## 🎯 현재 상태: 핵심 기능 완료

### 개발 서버
- **포트**: 3001 (3000 사용 중이어서 변경됨)
- **실행 명령**: `npm run dev`

---

## ✅ 완료된 작업

### 1. 검색 기능 수정
- **문제**: 검색 버튼 클릭해도 데이터가 안 나옴
- **원인**: 
  1. PostgreSQL 스키마 `binary`가 예약어라서 `"binary".테이블명` 형식 필요
  2. query.sql에서 파라미터명 불일치 (`:searchYearMonth1` → API가 처리 못함)
  3. 중복 화면(SC000041~045)이 API fallback에서 먼저 매칭됨
- **해결**:
  1. `query.sql`에 `"binary".bi_eqp_mst` 형식으로 스키마 prefix 추가
  2. 표준 파라미터명 `:yearMonth` 사용
  3. 중복/고아 화면 파일 삭제

### 2. 저장 API 구현
- **파일**: `/src/app/api/screens/[screenId]/data/route.ts`
- **POST 핸들러** 추가:
  - INSERT/UPDATE/DELETE 트랜잭션 처리
  - PK 컬럼 자동 조회 (PostgreSQL pg_index)
  - 응답: `{ insertedCount, updatedCount, deletedCount, errors }`
- **템플릿** 수정 (`RealGridCrudTemplate.ts`):
  - `deletedRows`를 Set → Array로 변경 (PK 데이터 저장)
  - `handleSave`에서 POST API 호출

### 3. SQL 쿼리 생성기
- **위치**: `/src/server/api/routers/screen-generator/templates/query-generator/`
- **SelectQueryBuilder 클래스**: 검색 조건 기반 SELECT 쿼리 생성
- **공통 옵션 컬럼 매핑** (`preview.ts`):
  | 옵션 타입 | DB 컬럼 |
  |----------|--------|
  | YEAR_MONTH | yyyymm |
  | BI_SITE | plant_site_code |
  | BI_DEPT | dept_code |

### 4. 고아 화면 정리 및 메뉴 삭제 보완
- **정리 완료**:
  - `generated/screens/`: 37개 삭제, 3개 유지 (SC000021, SC000024, SC000046)
  - `src/app/screens/`: 36개 삭제
- **메뉴 삭제 기능 보완** (`menu.ts`):
  - `deleteScreenFiles()` 헬퍼 함수 추가
  - 메뉴 삭제 시 screen_id로 화면 파일도 삭제

### 5. JSZip Mock (Sandpack 미리보기)
- Sandpack 환경에서 JSZip 모듈 오류 해결
- `additionalFiles`에 mock 파일 추가
- 실제 환경에서는 layout.tsx에서 전역 로드

---

## ⚠️ 알려진 이슈 (미해결)

### 1. RealGridCrudTemplate.ts Lint 오류
- `config` 속성 관련 오류 다수 (기능에는 영향 없음)
- 타입 정의 불일치: `DataGridBlockProps`, `SearchFormBlockProps` 등

### 2. 엑셀 내보내기 (Excel Export)
- **오류**: `JSZip is not defined`
- **상태**: 후순위로 미룸
- **해결책**: layout.tsx에서 JSZip 전역 로드 필요

### 3. 공통 옵션 컴포넌트
- YEAR_MONTH 외에 다른 공통 옵션(설비, 계정 등)은 일반 input 필드로 렌더링됨
- 별도 컴포넌트 개발 또는 템플릿 수정 필요

---

## 📁 주요 파일 경로

### 화면 생성기
```
/src/app/settings/screen-generator-realgrid/
├── _components/SimpleModeRealGrid.tsx  # 간편 모드 UI
└── page.tsx
```

### 템플릿
```
/src/server/api/routers/screen-generator/templates/
├── realgrid-crud/RealGridCrudTemplate.ts  # RealGrid 템플릿
└── query-generator/
    ├── SelectQueryBuilder.ts  # SQL 쿼리 빌더
    ├── types.ts
    └── index.ts
```

### API
```
/src/app/api/screens/[screenId]/data/route.ts  # GET/POST API
/src/server/api/routers/menu.ts                # 메뉴 관리 (삭제 시 파일 삭제 포함)
/src/server/api/routers/screen-generator/procedures/preview.ts  # 미리보기 API
```

### 생성된 화면
```
/generated/screens/
├── SC000021/
├── SC000024/
└── SC000046/  # bi_eqp_mst (설비정보) - 최신
    ├── component.tsx
    ├── query.sql      # SELECT * FROM "binary".bi_eqp_mst
    ├── metadata.json
    └── menu.json

/src/app/screens/
├── sc000021/
├── sc000024/
└── sc000046/page.tsx  # 발행된 화면
```

---

## 🗄️ 데이터베이스 구조

### 메뉴 테이블
```sql
-- public.sys_menu
screen_id (VARCHAR) → 화면 ID (SC000046 등)
menu_path (VARCHAR) → /screens/SC000046
```

### BI 데이터 스키마
```sql
-- "binary" 스키마 (예약어이므로 따옴표 필수!)
"binary".bi_eqp_mst  -- 설비 마스터 (105건)
```

---

## 📝 다음 작업 제안

1. **엑셀 내보내기 수정**: JSZip 전역 로드 구현
2. **공통 옵션 컴포넌트 확장**: 설비, 계정 등 Select 컴포넌트 추가
3. **브레드크럼 네비게이션**: DB 메뉴 구조 기반 동적 경로 표시
4. **템플릿 타입 오류 수정**: RealGridCrudTemplate.ts lint 오류 정리

---

## 🔧 빠른 테스트 명령

```bash
# 서버 시작
cd /home/roarm_m3/ai-factory-lab && npm run dev

# API 테스트 (설비정보 검색)
curl -s "http://localhost:3001/api/screens/sc_bi_eqp_mst/data" | head -c 500

# DB 직접 조회
PGPASSWORD=postgres psql -h localhost -U postgres -d ai_factory_db -c 'SELECT COUNT(*) FROM "binary".bi_eqp_mst;'

# 등록된 메뉴 확인
PGPASSWORD=postgres psql -h localhost -U postgres -d ai_factory_db -c "SELECT screen_id, menu_path FROM public.sys_menu WHERE screen_id LIKE 'SC%';"
```

---

**이 문서를 새 대화에서 참조하면 현재 상태에서 바로 작업을 이어갈 수 있습니다!**
