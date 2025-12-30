# Chat Prompt 템플릿 및 사용 가이드

이 문서는 대화 세션에서 프로젝트 문맥을 유지하기 위한 프롬프트 템플릿, 예시 대화, 그리고 사용 가이드를 제공합니다.

---

## 1. 목적

대화형 AI에게 현재 작업 중인 프로젝트 문맥(프로젝트 루트, 최근 수정 파일, 최근 액션 등)을 명확히 전달해, 일관된 코드 변경과 제안을 받을 수 있도록 합니다.

## 2. 프롬프트 템플릿

아래 템플릿을 대화창에 복사해 붙여넣으세요. {}로 표기된 항목은 실제 값으로 교체합니다.

---

**SYSTEM (시스템 프롬프트)**

당신은 이 코드베이스의 개발 도우미입니다. 아래 정보를 항상 참고하여 응답하고, 변경사항을 만들 때는 파일 경로와 간단한 설명을 함께 제시하세요.

- 프로젝트 루트: {PROJECT_ROOT}
- 최근 수정 파일(최대 5개): {RECENT_FILES}
- 최근 액션: {RECENT_ACTIONS}
- 목표: {GOAL}
- 제한사항: {CONSTRAINTS}

응답 시에는 작업 요약(한 문장), 변경 파일 목록, 변경한 코드 스니펫(또는 새 파일 전체), 그리고 다음 권장 작업을 제시하세요.

---

**USER (사용자 메시지)**

(구체적인 작업 요청을 적습니다. 예: "src/server/.../preview.ts에서 simple-mode가 AG Grid로 렌더링되도록 수정해줘. Sandpack에서 작동해야 함.")

---

**ASSISTANT (응답 양식)**

- 작업 요약: 한 문장
- 변경 파일: 리스트 (파일 경로 링크)
- 변경 내용: 코드 패치(가능하면 apply_patch 형식) 또는 새 파일 전체
- 테스트/검증 방법: 실행할 명령 또는 브라우저 경로
- 다음 권장 작업: 1-2개 항목


## 3. 예시 대화 (사용 예시)

예시 1 — 화면 생성 요청

USER:
"새로운 CRUD 화면을 생성하려고 해요. 테이블은 `bi_acct_mst`이고 간단한 AG Grid 표로 보여줘. Sandpack 미리보기에서 작동해야 합니다."

ASSISTANT 응답(요약):
- 작업 요약: `bi_acct_mst`용 CRUD 미리보기 생성
- 변경 파일: [src/server/api/routers/screen-generator/procedures/preview.ts](src/server/api/routers/screen-generator/procedures/preview.ts#L1)
- 변경 내용: generateCrudPreview에서 legacy template 호출로 변경 (apply_patch 제공)
- 테스트: 개발 서버 실행 후 `/settings/screen-generator` → Simple Mode → 테이블 입력 → 미리보기 확인
- 다음: Sandpack 경로/임포트 문제 확인

예시 2 — 생성된 화면 수정 요청

USER:
"생성된 화면에서 `dept` 목록의 `created_at` 컬럼을 숨기고, `name` 컬럼을 정렬 우선순위로 설정해줘."

ASSISTANT 응답(요약):
- 작업 요약: `dept` 화면 컬럼 조정
- 변경 파일: [src/app/master/dept/page.tsx](src/app/master/dept/page.tsx#L1)
- 변경 내용: 컬럼 정의에서 `created_at` visible:false, `name` sortIndex:0 추가 (apply_patch 제공)
- 테스트: 브라우저에서 dept 화면 열기 → 컬럼 정렬/노출 확인
- 다음: 필요시 백엔드 API 필드 필터링 적용

## 4. 문서화 저장 위치

생성한 프롬프트와 예시는 이 파일에 저장되어야 합니다: [docs/CHAT_PROMPT.md](docs/CHAT_PROMPT.md)

## 5. 사용 가이드

- 권장 토큰 수: 대화의 컨텍스트가 크면 요약(최근 변경 파일 5개, 최근 액션 3개)을 유지하세요.
- 요약 주기: 긴 작업 후(하루 작업 종료 시) 한 번씩 요약을 업데이트하면 좋습니다.
- 파일 참조 방법: 파일을 언급할 때는 작업 디렉터리 기준 상대 경로를 사용하세요. 예: `src/server/api/.../preview.ts` 대신 [src/server/api/routers/screen-generator/procedures/preview.ts](src/server/api/routers/screen-generator/procedures/preview.ts#L1) 형태 권장.
- 검증: 코드 변경 후에는 `pnpm dev` (또는 `npm run dev`)로 빌드/서버를 실행하고 브라우저에서 경로를 확인하세요.

## 6. 빠른 체크리스트

- [ ] 템플릿 붙여넣기
- [ ] 요청 전 최근 수정 파일 5개 요약
- [ ] 변경 적용 후 dev 서버로 검증

---

작성자: 자동 생성
최종 수정일: 2025-12-30
