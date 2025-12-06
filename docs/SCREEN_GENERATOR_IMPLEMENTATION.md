# 화면 생성기 (Screen Generator) 구현 문서

> 작성일: 2025-12-06

## 개요

Excel 템플릿을 업로드하여 ERP 화면을 자동으로 생성하는 기능입니다.
Claude AI를 활용하여 HTML 미리보기, SQL 쿼리, React 컴포넌트를 생성합니다.

## 주요 기능

### 1. Excel 템플릿 검증
- **경로**: `/settings/screen-generator`
- **기능**: 
  - Excel 파일 업로드 (드래그 앤 드롭 지원)
  - 메타정보 시트에서 화면명, 테이블명 추출
  - 그리드 컬럼 구조 분석 (그룹 헤더, 병합 셀)
  - 조회조건 추출

### 2. HTML 미리보기 생성
- **API**: `screenGenerator.generatePreview`
- **기능**:
  - Claude API (claude-sonnet-4-20250514) 호출
  - IBM Carbon Design System 스타일 적용
  - 반응형 미리보기 (Desktop/Tablet/Mobile)
  - iframe으로 격리된 렌더링

### 3. SQL 쿼리 자동 생성
- **API**: `screenGenerator.generateQuery`
- **기능**:
  - DB 메타데이터 (`data/db_metadata_enhanced.json`) 활용
  - Excel 헤더 → DB 컬럼 자동 매핑
  - 미매핑 컬럼은 빈값('')으로 처리
  - 쿼리 통계 (매핑/미매핑 컬럼 수) 제공

### 4. React 컴포넌트 생성
- **API**: `screenGenerator.generateReactComponent`
- **기능**:
  - AG Grid Community 기반 컴포넌트
  - TypeScript + 함수형 컴포넌트
  - IBM Carbon 색상 스타일
  - 그룹 헤더, 숫자 포맷터, 합계 행 스타일

### 5. 임시화면 저장
- **API**: `screenGenerator.saveTempScreen`
- **저장 경로**: `generated/screens/temp/{TEMP_timestamp}/`
- **저장 파일**:
  - `metadata.json` - 화면 메타정보
  - `preview.html` - HTML 미리보기
  - `query.sql` - SQL 쿼리
  - `component.tsx` - React 컴포넌트
  - `parsedData.json` - 파싱된 Excel 데이터

### 6. 메뉴 등록 (Publish)
- **API**: `screenGenerator.publishScreen`
- **기능**:
  - 화면 ID 자동 생성 (SC + 6자리 숫자)
  - `sys_menu` 테이블에 INSERT
  - 임시 폴더 → 정식 폴더로 이동

## 파일 구조

```
src/
├── app/
│   ├── settings/
│   │   └── screen-generator/
│   │       └── page.tsx          # 화면 생성기 UI
│   ├── screens/
│   │   ├── [screenId]/
│   │   │   └── page.tsx          # 동적 화면 페이지
│   │   └── temp/
│   │       └── page.tsx          # 임시화면 관리 페이지
│   └── api/
│       └── screens/
│           └── [screenId]/
│               └── route.ts      # 화면 데이터 API
├── server/
│   └── api/
│       └── routers/
│           └── screenGenerator.ts # tRPC 라우터
generated/
└── screens/
    ├── temp/                     # 임시화면 저장 폴더
    ├── SC000001/                 # 발행된 화면
    └── SC000002/
```

## API 엔드포인트

| API | 설명 |
|-----|------|
| `validateTemplate` | Excel 파일 검증 |
| `generatePreview` | HTML 미리보기 생성 |
| `generateQuery` | SQL 쿼리 생성 |
| `generateReactComponent` | React 컴포넌트 생성 |
| `saveTempScreen` | 임시화면 저장 |
| `getTempScreenList` | 임시화면 목록 조회 |
| `getTempScreen` | 임시화면 상세 조회 |
| `deleteTempScreen` | 임시화면 삭제 |
| `publishScreen` | 메뉴에 등록 |

## 사용 방법

1. **Excel 업로드**: 템플릿 파일 드래그 앤 드롭
2. **검증**: "검증" 버튼 클릭
3. **미리보기 생성**: "미리보기 생성" 버튼 (Claude AI)
4. **쿼리 생성**: "쿼리 생성" 버튼
5. **임시 저장**: "임시 저장" 버튼
6. **React 생성**: "React 생성" 버튼
7. **메뉴 등록**: 임시화면 관리 → 메뉴 위치 선택 → 등록

## 기술 스택

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: tRPC v11, Prisma
- **AI**: Claude API (Anthropic)
- **Grid**: AG Grid Community
- **Excel 파싱**: xlsx 라이브러리
- **디자인 시스템**: IBM Carbon Design System
