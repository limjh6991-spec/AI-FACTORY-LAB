---
description: RealGrid 화면생성기 템플릿 수정 시 체크리스트
---

# RealGrid 화면생성기 템플릿 작업 워크플로우

RealGridCrudTemplate.ts 또는 관련 파일을 수정할 때 이 워크플로우를 따라주세요.

## 1. 작업 전 이슈 트래커 확인

먼저 기존 이슈와 잠재적 엣지 케이스를 확인합니다:

```bash
cat /home/roarm_m3/.gemini/antigravity/brain/1ec681f4-e625-4089-83a9-6310b207c01e/realgrid_template_issues.md
```

## 2. 수정 전 엣지 케이스 체크

코드 생성 시 아래 케이스를 고려해야 합니다:

### 필수 체크 항목
- [ ] **빈 배열 처리**: columns, searchFields가 빈 배열일 때 문법 오류 없는지?
- [ ] **undefined 처리**: 필수 필드가 undefined일 때 기본값 있는지?
- [ ] **특수문자 필드명**: `-`, `.` 등 JavaScript 변수명으로 부적합한 문자 처리?
- [ ] **trailing comma**: 배열 마지막 요소 뒤 콤마 처리 올바른지?
- [ ] **import 누락**: 사용하는 컴포넌트가 import 목록에 있는지?

### 문자열 템플릿 체크
- [ ] `${변수}`가 빈 문자열일 때 문법 오류 없는지?
- [ ] JSON.stringify 결과가 올바르게 삽입되는지?
- [ ] 백틱 내 특수문자 이스케이프 올바른지?

## 3. 수정 후 테스트

// turbo
```bash
npm run build 2>&1 | head -50
```

## 4. 화면 생성 테스트 케이스

브라우저에서 `/settings/screen-generator-realgrid`로 이동하여 테스트:

1. **빈 테이블 테스트**: 컬럼 없이 생성
2. **검색 조건 없음**: 옵션 추가 없이 생성
3. **모든 옵션 추가**: SiteSelect, YearMonthPicker 등 전체 추가
4. **특수 테이블명**: 한글, 특수문자 포함 테이블

## 5. 이슈 발생 시

새로운 이슈 발생 시 이슈 트래커를 업데이트합니다:

```markdown
### ISSUE-XXX: [제목]
- **상태**: 🔴 미해결
- **발생일**: YYYY-MM-DD
- **증상**: 
- **원인**: 
- **파일**: 
- **해결 방안**: 
```

## 6. 관련 파일 위치

- **템플릿**: `src/server/api/routers/screen-generator/templates/realgrid-crud/RealGridCrudTemplate.ts`
- **UI**: `src/app/settings/screen-generator-realgrid/_components/SimpleModeRealGrid.tsx`
- **Mock**: `SimpleModeRealGrid.tsx` 내 `REALGRID_MOCK_CODE`
- **이슈 트래커**: `.gemini/antigravity/brain/.../realgrid_template_issues.md`
