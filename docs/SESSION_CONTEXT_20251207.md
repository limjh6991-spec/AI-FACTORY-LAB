# 세션 컨텍스트 - 2025년 12월 7일

## 📋 작업 요약

이번 세션에서는 화면 생성기의 핵심 기능들을 수정하고, 헤더 컴포넌트를 대폭 개선했습니다.

---

## ✅ 완료된 작업

### 1. 화면 생성기 (Screen Generator) 개선

#### 1.1 공통 옵션 컴포넌트 연동 문제 해결
- **문제**: `convertToNextPage()` 함수가 옵션 컴포넌트 import만 추가하고 실제 JSX에서 사용하지 않음
- **해결**: 함수 전체 재작성
  - 코드에서 사용된 옵션 자동 감지 (년월, 자재, 거래처 등)
  - 상태 변수 자동 생성 및 연결
  - API 호출 시 파라미터 자동 포함

#### 1.2 생성된 화면 조회 기능 구현
- **문제**: `/api/screens/{screenId}/data` API 라우트 없음
- **해결**: 동적 API 라우트 생성 (`src/app/api/screens/[screenId]/data/route.ts`)
  - SQL 파라미터 치환 지원 (`:param`, `${param}`, `$param`)
  - 세미콜론 자동 제거 후 LIMIT 추가
  - 빈 값은 `'%%'`로 와일드카드 검색

#### 1.3 옵션 변경 시 자동 조회 방지
- **문제**: `useEffect` 의존성으로 인해 옵션 변경 시마다 자동 조회
- **해결**: 
  - `useCallback` 제거 → 일반 `async function`으로 변경
  - `useEffect` 의존성을 `[]`로 변경 (초기 마운트 시 1회만)
  - 조회 버튼 클릭 시에만 `fetchData()` 호출

#### 1.4 조회 버튼 클릭 기능 복원
- **문제**: `handleSearch` 패턴 매칭 실패로 `fetchData()` 연결 안 됨
- **해결**: 여러 패턴 지원 추가
  - `console.log('검색 실행')` 패턴
  - 빈 함수 패턴
  - `handleSearch` 없을 경우 자동 추가

#### 1.5 쿼리 결과 ↔ 그리드 매핑 문제 해결
- **문제**: SQL 별칭(`"자재구분"`)과 AG Grid field(`materialType`) 불일치
- **해결**: `COLUMN_MAPPING` 상수 추가로 한글 → 영문 자동 변환
  - 약 40개 컬럼 매핑 정의
  - API 응답 시 자동 변환

#### 1.6 옵션 기본값 설정
- 년월(`YearMonthPicker`): 현재 년월 (yyyymm 형식, 예: "202512")
- 년도(`YearPicker`): 현재 년도 (예: "2025")
- 기타 옵션: 빈 문자열 (전체)

#### 1.7 "전체" 옵션 추가
- `SearchableSelect` 컴포넌트에 `showAllOption` prop 추가
- 년월/년도 제외한 모든 셀렉트에 "전체" 옵션 표시
- 빈 값 선택 시 와일드카드 검색 (`LIKE '%%'`)

### 2. AG Grid 스타일 개선

#### 2.1 그리드 높이 문제 해결
- **기존**: 고정 높이 `500px` → 화면에 빈 공간 많음
- **변경**: `flex: 1, minHeight: 300` → 화면 전체 채움

#### 2.2 헤더 색상 변경
- **기존**: 진한 파란색 `#4f7cba` (흰색 텍스트)
- **변경**: 메뉴 hover 색상과 동일한 밝은 파란색
  - 헤더 배경: `#dbeafe` (blue-100)
  - 헤더 텍스트: `#1e40af` (blue-800)
  - 그룹 헤더: `#eff6ff` → `#dbeafe` 그라데이션
  - 일반 헤더: `#f0f9ff` → `#e0f2fe` 그라데이션

#### 2.3 폰트 통일
- **기존**: `'IBM Plex Sans'`, `13px`
- **변경**: `inherit` (옵션과 동일), `14px`

### 3. 헤더 컴포넌트 (Header.tsx) 대폭 개선

#### 3.1 현재 화면 경로 표시 (브레드크럼)
- 현재 위치를 `홈 > 카테고리 > 화면명` 형태로 표시
- 메뉴 데이터 기반 자동 생성
- 클릭 시 해당 경로로 이동

#### 3.2 검색 기능 구현
- 실시간 메뉴/화면 검색
- 키보드 단축키: `⌘K` (Mac) / `Ctrl+K` (Windows)
- ESC 키로 검색창 닫기
- 검색 결과 클릭 시 해당 화면으로 이동

#### 3.3 알림 기능 (종 아이콘)
- 읽지 않은 알림 개수 표시 (빨간색 뱃지)
- 알림 목록 드롭다운
- 알림 항목: 제목, 내용, 시간, 읽음 상태

#### 3.4 사이트맵 (? 아이콘 → LayoutGrid 아이콘)
- 전체 메뉴 구조 드롭다운
- 카테고리별 메뉴 목록
- 클릭 시 해당 화면으로 이동

#### 3.5 설정 기능
- 빠른 설정 메뉴:
  - 테마 (라이트/다크 모드)
  - 메뉴 관리
  - 화면 생성기
  - DB 메타데이터
  - 전체 설정

#### 3.6 프로필 드롭다운
- 사용자 정보 표시
- 프로필/계정 설정
- 다크 모드 토글
- 로그아웃

### 4. 로그 파일 위치 변경
- **기존**: `/tmp/next-dev.log`
- **변경**: `/home/roarm_m3/ai-factory-lab/system_log/next-dev.log`
- `.gitignore`에 `/system_log/*.log` 추가

---

## 📁 수정된 파일 목록

### 핵심 파일
1. `src/server/api/routers/screenGenerator.ts`
   - `convertToNextPage()` 함수 전체 재작성
   - AG Grid 스타일 변경
   - 그리드 높이 수정

2. `src/app/api/screens/[screenId]/data/route.ts` (신규)
   - 동적 화면 데이터 조회 API
   - SQL 파라미터 치환
   - 한글 → 영문 컬럼 매핑

3. `src/components/options/index.tsx`
   - "전체" 옵션 추가
   - 기본값 설정 개선

4. `src/components/preview/SandpackPreview.tsx`
   - AG Grid 스타일 동기화

5. `src/components/Header.tsx`
   - 브레드크럼, 검색, 알림, 사이트맵, 설정 기능 추가

### 설정 파일
6. `.gitignore` - 로그 파일 제외 규칙 추가
7. `system_log/.gitkeep` (신규) - 로그 폴더 유지

---

## 🎨 색상 팔레트 (AG Grid)

| 요소 | 색상 코드 | Tailwind |
|------|-----------|----------|
| 헤더 배경 | `#dbeafe` | blue-100 |
| 헤더 텍스트 | `#1e40af` | blue-800 |
| 그룹 헤더 시작 | `#eff6ff` | blue-50 |
| 그룹 헤더 끝 | `#dbeafe` | blue-100 |
| 일반 헤더 시작 | `#f0f9ff` | sky-50 |
| 일반 헤더 끝 | `#e0f2fe` | sky-100 |
| 행 hover | `#eff6ff` | blue-50 |
| 합계 행 테두리 | `#93c5fd` | blue-300 |

---

## 📌 향후 작업 (TODO)

1. **로그인/인증 시스템**: 실제 사용자 인증 연동
2. **다크 모드**: 전체 앱 다크 테마 적용
3. **알림 시스템**: 실제 알림 데이터 연동
4. **화면 생성기**: 더 복잡한 화면 템플릿 지원
5. **DB 메타데이터**: 설정 페이지 구현

---

## 🔧 기술 스택

- Next.js 15.5.6 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- tRPC + Prisma
- AG Grid Community
- PostgreSQL 16
- Claude API (claude-sonnet-4-20250514)

---

## 📅 세션 정보

- **날짜**: 2025년 12월 7일
- **주요 성과**: 화면 생성기 핵심 기능 완성, 헤더 UX 대폭 개선
- **다음 세션**: 로그인 시스템, 다크 모드 구현 예정
