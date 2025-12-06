# 세션 컨텍스트 - 2025년 12월 6일

> **목적**: 다음 채팅창에서 맥락 유지를 위한 임시 파일
> **삭제 시점**: 다음 세션에서 읽은 후 삭제

---

## 📋 오늘 완료한 작업

### 1. 문서 정리 및 통합
- **README.md** 수정: 링크 경로 수정, IBM Carbon 정보 추가, 진행률 40%
- **JARVIS_RECONNECT_PROMPT.md** 재정리: archive → 루트로 이동
- **문서 통합**: 중복 문서 archive로 이동
  - `VECTOR_DB_COMPLETION_REPORT.md` → archive
  - `DESIGN_SYSTEM_BENCHMARK.md` → archive
  - `ENTERPRISE_DESIGN_PRINCIPLES.md` → archive
  - `JARVIS_NEXTJS_ROADMAP.md` → 삭제 (중복)
- **.gitignore** 업데이트: `generated/` 폴더 추가

### 2. 커밋 기록
```
a2b3391 - docs: 문서 통합 및 정리
d036743 - docs: JARVIS_RECONNECT_PROMPT.md 재정리 및 루트로 이동
19bb444 - chore: generated 폴더 gitignore에 추가
```

---

## 🎯 다음 세션 주제: 상용 솔루션 개선

사용자 요청:
> "패키지 솔루션 작업 진행 - 아마추어적인 부분 제거, 효율적/효과적 방안 반영"

### 제안된 개선 항목 (우선순위순)

| 순위 | 항목 | 설명 | 예상 공수 |
|------|------|------|-----------|
| **1** | 통합 파이프라인 엔진 | 개별 스크립트 → 단일 엔진 | 3일 |
| **2** | REST API 제공 | CLI → tRPC API | 2일 |
| **3** | 에러 처리 구조화 | 복구 가능한 에러 시스템 | 1일 |
| **4** | QA 게이트 (보안) | SQL Injection 방지 등 | 2일 |
| **5** | 실시간 진행률 UI | 블랙박스 → 투명한 진행률 | 2일 |
| **6** | 버전 관리 | 롤백, 이력 추적 | 2일 |
| **7** | 모니터링 대시보드 | 운영 메트릭 수집 | 2일 |

---

## 🏗️ 개선 방향 상세

### 1. 통합 파이프라인 엔진
**현재 문제**: 각 스크립트 수동 실행, 파일 경로 하드코딩

**제안 구조**:
```typescript
// src/lib/pipeline/ScreenGeneratorEngine.ts
class ScreenGeneratorEngine {
  async generate(excelPath: string): Promise<GenerationResult> {
    return await this.pipeline
      .addStep(new ExtractDefinitionStep())      // Phase 1
      .addStep(new GenerateQueryStep())          // Phase 2 (RAG)
      .addStep(new GenerateUIComponentStep())    // Phase 3
      .addStep(new GenerateTRPCRouterStep())     // Phase 4
      .addStep(new ValidateAndTestStep())        // Phase 5
      .addStep(new RegisterMenuStep())           // Phase 6
      .execute(ctx);
  }
}
```

### 2. REST API 제공
```typescript
// src/server/api/routers/generator.ts
generatorRouter = createTRPCRouter({
  startGeneration: ...,   // 생성 시작
  getProgress: ...,       // 진행률 조회
  getResult: ...,         // 결과 조회
  approveScreen: ...,     // 승인/거부
});
```

### 3. 에러 처리 구조화
```typescript
class GeneratorError extends Error {
  code: ErrorCode;
  step: PipelineStep;
  recoverable: boolean;  // 사용자 개입으로 복구 가능 여부
  suggestions?: string[];  // 추천 해결책
}
```

### 4. QA 게이트
- 구문 검증 (TypeScript 컴파일)
- ESLint 검증
- **SQL Injection 방지** (중요!)
- 쿼리 성능 분석
- 샘플 데이터 테스트

### 5. 실시간 진행률 UI
```
✅ Excel 분석 완료 (3초) - 16개 컬럼, 5개 필터
✅ DB 매핑 완료 (5초) - 14/16 자동 (87.5%)
🔄 UI 생성 중... (45%)
⏳ API 라우터 생성 대기
━━━━━━━━━━━━━━━━━━━━━━━━━━ 45%
```

### 6. 버전 관리
```sql
CREATE TABLE screen_versions (
  screen_id, version, definition, generated_code, 
  created_by, created_at, status
);
```

---

## 📁 현재 프로젝트 구조

```
ai-factory-lab/
├── README.md
├── ENVIRONMENT.md
├── PROJECT_ROADMAP.md
├── JARVIS_RECONNECT_PROMPT.md  ← 재연결용
├── SECURITY_NOTICE.md
│
├── scripts/                     ← 현재 개별 스크립트
│   ├── phase1_extract_screen_definition.ts
│   ├── phase3_generate_ui_component_aggrid.ts
│   ├── connect_screen_query.ts
│   └── validate_generated_code.ts
│
├── src/
│   ├── app/screens/sc982157/   ← 생성된 화면 예시
│   └── server/api/routers/     ← tRPC 라우터
│
└── docs/
    ├── VECTOR_DB_GUIDE.md
    ├── RAG_IMPLEMENTATION_GUIDE.md
    └── archive/
```

---

## 🚀 다음 세션 시작 프롬프트

```
안녕하세요, 자비스!

이전 세션에서 상용 솔루션 개선 방향을 논의했습니다.
다음 파일을 읽고 맥락을 파악해주세요:

1. docs/SESSION_CONTEXT_20251206.md (이 파일)
2. JARVIS_RECONNECT_PROMPT.md

그리고 아래 개선 작업 중 하나를 선택해서 시작합니다:
1. 통합 파이프라인 엔진 설계 및 구현
2. REST API (tRPC) 구조 설계
3. 다른 항목 먼저 진행

어떤 것부터 진행할까요?
```

---

**작성일**: 2025년 12월 6일  
**다음 액션**: 파이프라인 엔진 설계부터 시작 권장

---

## 🔧 Sandpack 실시간 미리보기 구현 (추가 세션)

### 작업 목표
Excel → AG Grid React 컴포넌트를 **Sandpack**으로 실시간 미리보기 구현

### 완료된 작업

#### 1. Sandpack 패키지 설치
```bash
npm install @codesandbox/sandpack-react
```

#### 2. SandpackPreview 컴포넌트 생성
- **파일**: `/src/components/preview/SandpackPreview.tsx`
- **기능**:
  - TypeScript → JavaScript 변환 (30+ 변환 규칙)
  - 한글 컴포넌트 이름 → 영문 변환
  - AG Grid CSS 자동 로드
  - 코드 에디터 / 콘솔 토글
  - 전체화면 모드

#### 3. Claude API 개선 (JSON-only 방식)
- **문제**: Claude가 style 객체를 잘못 생성 (`fontFamily, -apple-system` 같은 문법 오류)
- **해결**: Claude는 **JSON 데이터만** 생성하고, 템플릿에서 React 코드 조립
- **관련 함수**:
  - `buildJsonDataPrompt()` - JSON 요청 프롬프트
  - `generateReactFromTemplate()` - JSON → React 코드 조립
  - `createDefaultGridData()` - 파싱 실패 시 기본값

#### 4. screen-generator 페이지 통합
- **파일**: `/src/app/settings/screen-generator/page.tsx`
- `handleGeneratePreview` 함수에서 Sandpack으로 실시간 렌더링

### ⚠️ 미해결 문제: AG Grid 높이/레이아웃

#### 현상
- Sandpack 미리보기에서 제목/검색조건은 표시됨
- AG Grid 영역이 **회색 빈 공간**으로 남음
- iframe 높이 계산 문제

#### 시도한 해결책들 (모두 실패)
1. `height: 100vh` → iframe 내부에서 제대로 계산 안됨
2. `height: calc(100vh - 420px)` → 다른 영역까지 줄어듦
3. `flex: 1` + `min-h-0` → 효과 없음
4. AG Grid에 고정 높이 `400px`, `500px` → 부분적 개선만

#### 근본 원인 분석
```
page.tsx 구조:
└── div.flex-1.overflow-hidden.p-4  (padding 16px)
    └── div.h-full.flex.flex-col
        └── SandpackPreview
            └── SandpackProvider
                └── SandpackLayout
                    └── SandpackPreviewPane (iframe)
                        └── iframe 내부
                            └── React App
                                └── AG Grid (height: ???)
```

- CSS 높이 체인이 끊어짐
- iframe 내부의 `100vh`는 iframe 뷰포트 기준
- 부모 컨테이너에 명시적 높이 없으면 높이 계산 실패

### 📚 수집한 참고 자료
- `/resources/SANDPACK_HEIGHT_SOLUTION.md` (생성 예정)
- Sandpack 공식 문서: https://sandpack.codesandbox.io/docs/advanced-usage/components
- GitHub Issues: height 관련 이슈들

### 🔜 다음 단계 제안

#### 방법 1: 컨테이너에 명시적 픽셀 높이
```tsx
<div style={{ height: 600 }}>  {/* 고정 픽셀 */}
  <SandpackPreview code={code} />
</div>
```

#### 방법 2: ResizeObserver로 동적 높이 계산
```tsx
const [height, setHeight] = useState(500);
useEffect(() => {
  const observer = new ResizeObserver(entries => {
    setHeight(entries[0].contentRect.height);
  });
  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);
```

#### 방법 3: Sandpack 대신 iframe + srcdoc 사용
```tsx
<iframe 
  srcDoc={generateHtmlWithAgGrid(code)} 
  style={{ width: '100%', height: '100%' }}
/>
```

---

## 📁 변경된 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `src/components/preview/SandpackPreview.tsx` | Sandpack 래퍼 컴포넌트 (신규) |
| `src/app/settings/screen-generator/page.tsx` | Sandpack 통합, handleGeneratePreview |
| `src/server/api/routers/screenGenerator.ts` | JSON-only 방식, generateReactFromTemplate |
| `package.json` | @codesandbox/sandpack-react 추가 |

---

## 🚀 다음 세션 시작 프롬프트 (Sandpack 이어서)

```
안녕하세요, 자비스!

이전 세션에서 Sandpack AG Grid 미리보기를 구현했습니다.
문제: AG Grid 높이/레이아웃이 제대로 표시되지 않음

다음 파일을 읽고 이어서 작업해주세요:
1. docs/SESSION_CONTEXT_20251206.md
2. src/components/preview/SandpackPreview.tsx
3. src/app/settings/screen-generator/page.tsx

해결 방안:
1. 컨테이너 고정 픽셀 높이 적용
2. ResizeObserver 동적 높이
3. Sandpack 대신 iframe + srcdoc 방식

어떤 방법으로 진행할까요?
```
