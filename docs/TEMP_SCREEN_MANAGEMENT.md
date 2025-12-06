# 임시화면 관리 시스템

> 작성일: 2025-12-06

## 개요

화면 생성기에서 생성된 화면을 임시로 저장하고, 검토 후 메뉴에 등록하는 시스템입니다.

## 임시화면 저장

### 저장 경로
```
generated/screens/temp/{TEMP_timestamp}/
├── metadata.json     # 화면 메타정보
├── preview.html      # HTML 미리보기
├── query.sql         # SQL 쿼리
├── component.tsx     # React 컴포넌트
└── parsedData.json   # 파싱된 Excel 데이터
```

### metadata.json 구조
```json
{
  "screenId": "TEMP_1733475468634",
  "screenName": "자재수불부",
  "screenNameEn": "",
  "tableName": "doi_material_resc",
  "createdAt": "2025-12-06T06:57:48.634Z",
  "status": "temp",
  "hasHtml": true,
  "hasSql": true,
  "hasReact": false
}
```

## 임시화면 관리 페이지

### 경로
`/screens/temp`

### 기능
- **목록 조회**: 저장된 임시화면 카드 형태로 표시
- **상세 보기**: HTML 미리보기, SQL 쿼리 탭 전환
- **삭제**: 확인 후 삭제
- **메뉴 등록**: 모달에서 메뉴 위치 선택 후 발행

### UI 구성
```
┌────────────────────┬──────────────────────────────────┐
│ 임시화면 목록 (N)   │ 화면 상세                         │
├────────────────────┤                                  │
│ ┌────────────────┐ │ ┌──────────┬───────┬───────────┐ │
│ │ 자재수불부      │ │ │ 미리보기 │ SQL   │ React     │ │
│ │ 2025-12-06     │ │ └──────────┴───────┴───────────┘ │
│ │ HTML SQL       │ │                                  │
│ └────────────────┘ │ ┌────────────────────────────┐   │
│                    │ │                            │   │
│                    │ │   (미리보기 또는 코드)      │   │
│                    │ │                            │   │
│                    │ └────────────────────────────┘   │
│                    │                [메뉴에 등록]      │
└────────────────────┴──────────────────────────────────┘
```

## 메뉴 등록 (Publish)

### 프로세스
1. "메뉴에 등록" 버튼 클릭
2. 메뉴 트리 모달 표시
3. 상위 메뉴 선택
4. "등록" 버튼 클릭

### 화면 ID 생성 규칙
- 형식: `SC` + 6자리 숫자
- 예: `SC000001`, `SC000002`
- 기존 화면 중 최대값 + 1

### DB 등록
```sql
INSERT INTO sys_menu (
  menu_id, parent_id, menu_level, sort_order,
  menu_name, menu_name_en, menu_path, menu_icon,
  screen_id, screen_type, is_active, is_visible
) VALUES (
  'MENU_SC000002', 'MNU600', 2, 640,
  '자재수불부', '', '/screens/SC000002', 'FileText',
  'SC000002', 'grid', true, true
);
```

### 파일 이동
```
generated/screens/temp/TEMP_xxx/
  ↓ (복사 후 삭제)
generated/screens/SC000002/
├── metadata.json   # screenId, status 업데이트
├── preview.html
├── query.sql
├── component.tsx
├── parsedData.json
└── menu.json       # 메뉴 등록 정보 백업
```

## API

### getTempScreenList
임시화면 목록 조회

**응답:**
```typescript
{
  screens: Array<{
    screenId: string;
    screenName: string;
    createdAt: string;
    hasHtml: boolean;
    hasSql: boolean;
    hasReact: boolean;
  }>;
}
```

### getTempScreen
임시화면 상세 조회

**입력:** `{ screenId: string }`

**응답:**
```typescript
{
  success: boolean;
  metadata: { ... };
  htmlContent?: string;
  sqlQuery?: string;
  reactContent?: string;
}
```

### deleteTempScreen
임시화면 삭제

**입력:** `{ screenId: string }`

### publishScreen
메뉴에 등록

**입력:**
```typescript
{
  screenId: string;       // 임시화면 ID (TEMP_xxx)
  parentMenuId: string;   // 상위 메뉴 ID
  menuName: string;       // 메뉴명
  menuNameEn?: string;    // 영문 메뉴명
  sortOrder?: number;     // 정렬 순서
}
```

**응답:**
```typescript
{
  success: boolean;
  screenId: string;      // 새 화면 ID (SC000002)
  menuId: string;        // 새 메뉴 ID
  menuPath: string;      // 메뉴 경로
  message: string;
}
```

## 동적 화면 라우트

### 경로
`/screens/[screenId]`

### 동작
1. URL에서 screenId 추출
2. `/api/screens/{screenId}` 호출
3. `generated/screens/{screenId}/` 폴더에서 파일 로드
4. HTML 미리보기 렌더링

### API 라우트
```typescript
// src/app/api/screens/[screenId]/route.ts
GET /api/screens/SC000002

Response:
{
  success: true,
  screenId: "SC000002",
  metadata: { ... },
  htmlContent: "...",
  sqlQuery: "...",
  reactContent: "..."
}
```
