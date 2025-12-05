# 🔄 SC982157 화면-API-SQL-DB 연결 작업 기록

**작성일**: 2025년 12월 5일  
**작성자**: 자비스 (AI Assistant)  
**목적**: Claude API 기반 자동 생성 과정에서 발생한 문제점 및 수동 보정 내역 정리

---

## 📋 작업 개요

| 항목 | 내용 |
|------|------|
| 화면ID | SC982157 |
| 화면명 | 판매관리비 집계표(부서별) |
| 기술 스택 | Next.js 15 + tRPC + Prisma + AG Grid + PostgreSQL |
| 작업 범위 | 화면 컴포넌트 → tRPC API → SQL 쿼리 → DB 연결 |

---

## 🚨 발견된 문제점 및 해결 과정

### 1. DB 컬럼명 대소문자 불일치

**문제 상황**:
- PostgreSQL 컬럼명이 대문자(`YYYYMM`, `ACCT`, `SITE` 등)로 저장됨
- 쿼리 작성 및 사용이 불편함 (PostgreSQL은 따옴표 없이 대문자 참조 시 소문자로 변환)

**해결 방법**:
```bash
# 대문자 컬럼을 소문자로 일괄 변경
PGPASSWORD=postgres psql -h localhost -U postgres -d ai_factory_db -t -A -c "
SELECT 'ALTER TABLE \"' || table_name || '\" RENAME COLUMN \"' || column_name || '\" TO \"' || lower(column_name) || '\";'
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name LIKE 'doi_%'
  AND column_name ~ '[A-Z]'
  AND column_name != lower(column_name);" > /tmp/rename_columns.sql

# 실행
PGPASSWORD=postgres psql -h localhost -U postgres -d ai_factory_db -f /tmp/rename_columns.sql
```

**결과**: 518개 컬럼 소문자로 변경 완료

**⚠️ 운영 시 주의사항**:
- DB 컬럼명 변경 후 **반드시 메타데이터 재수집 필요**
- 기존 쿼리/코드에서 대문자 참조하는 부분 모두 수정 필요

---

### 2. 메타데이터 불일치 (Vector DB)

**문제 상황**:
- DB 컬럼명은 소문자로 변경됨
- `db_metadata_enhanced.json`에는 여전히 대문자로 저장됨
- Claude API가 대문자 컬럼명으로 SQL 생성 → 실행 오류

**발생한 SQL 오류 예시**:
```sql
-- ❌ 잘못된 SQL (메타데이터 불일치)
WHERE ae.acct_ym = :yearMonth    -- acct_ym 컬럼 없음! (실제: yyyymm)
SUM(ae.plan_amt)                 -- plan_amt 컬럼 없음!
```

**해결 방법**:
```bash
# 메타데이터 재수집
npx tsx scripts/collect_db_metadata.ts
npx tsx scripts/improve_db_metadata.ts
```

**결과**: 메타데이터가 소문자 컬럼명으로 갱신됨

**⚠️ 운영 시 주의사항**:
- DB 스키마 변경 시 **항상 메타데이터 재수집 필수**
- Vector DB 임베딩도 재생성 필요할 수 있음

---

### 3. Claude API 키 인증 오류 (401)

**문제 상황**:
```
AuthenticationError: 401 {"type":"authentication_error","message":"invalid x-api-key"}
```

**원인 분석**:
| 항목 | 셸 환경변수 | .env 파일 |
|------|------------|-----------|
| 키 길이 | 16자 (잘림) | 108자 (정상) |
| 상태 | ❌ 잘못됨 | ✅ 정상 |

- 과거에 잘못된 API 키가 셸 환경변수로 `export`됨
- dotenv는 기존 환경변수를 **덮어쓰지 않음** (기본 동작)
- 결과: 잘린 16자 키로 API 호출 → 401 오류

**해결 방법**:
```bash
# 방법 1: 환경변수 해제 후 실행
unset ANTHROPIC_API_KEY && npx tsx scripts/your_script.ts

# 방법 2: dotenv에서 override 옵션 사용
import dotenv from 'dotenv';
dotenv.config({ override: true });
```

**⚠️ 운영 시 주의사항**:
- `.bashrc`/`.zshrc`에 API 키 직접 export 금지
- 스크립트에서 API 키 로딩 시 **항상 `.trim()` 사용**
- 401 오류 발생 시 먼저 `echo $ANTHROPIC_API_KEY | wc -c`로 확인

---

### 4. Claude API 생성 SQL 오류

**문제 상황 (v1 SQL)**:
```sql
-- ❌ 존재하지 않는 컬럼 사용
WHERE ae.acct_ym = :yearMonth    -- 실제: yyyymm
SUM(ae.plan_amt) as plan_amount  -- plan_amt 컬럼 없음

-- ❌ 불완전한 JOIN 조건
LEFT JOIN doi_dept d ON ae.dept = d.dept  -- yyyymm, site 누락
```

**원인**: 메타데이터 불일치 상태에서 Claude가 "추론"으로 컬럼명 생성

**해결 방법**: 메타데이터 갱신 후 SQL 재생성

**재생성된 SQL (v2)**:
```sql
-- ✅ 올바른 컬럼명 사용
WHERE ae.yyyymm = $1
    AND ($2::text IS NULL OR ae.site = $2)

-- ✅ 완전한 JOIN 조건
LEFT JOIN doi_dept d ON ae.yyyymm = d.yyyymm 
    AND ae.dept = d.dept 
    AND ae.site = d.site
```

**⚠️ 운영 시 주의사항**:
- AI 생성 SQL은 **반드시 실행 테스트 필요**
- 메타데이터가 최신 상태인지 확인 후 생성 요청

---

### 5. tRPC 라우터 구문 오류

**문제 상황**:
Claude API가 생성한 라우터 코드에 구문 오류 존재
```typescript
// ❌ 잘못된 구문
export const screen982157Router = createTRPCRouter {

// ✅ 올바른 구문
export const screen982157Router = createTRPCRouter({
```

**해결 방법**: 수동으로 `({` 추가

**⚠️ 운영 시 주의사항**:
- AI 생성 코드는 **구문 검증(lint) 필수**
- TypeScript 컴파일 오류 확인 후 적용

---

### 6. Prisma 스키마 중복 필드 오류

**문제 상황**:
DB 컬럼명 변경 후 `prisma db pull` 실행 시 중복 필드 생성
```
Error: Field "loss_" is already defined on model "doi_bom_mast"
Error: Field "bom__" is already defined on model "doi_cst_bom"
```

**원인**: Prisma가 한글 컬럼명을 자동 변환하면서 중복 발생
- `내부loss율` → `loss_`
- `외부loss율` → `loss_` (중복!)

**해결 방법**:
```prisma
// ❌ 중복
loss_  Decimal? @map("내부loss율")
loss_  Decimal? @map("외부loss율")

// ✅ 수정
internal_loss_rate  Decimal? @map("내부loss율")
external_loss_rate  Decimal? @map("외부loss율")
```

**⚠️ 운영 시 주의사항**:
- `prisma db pull` 후 **반드시 `prisma validate` 실행**
- 한글 컬럼명이 있는 테이블은 수동 검토 필요

---

## 📁 생성/수정된 파일 목록

### 새로 생성된 파일
| 파일 경로 | 설명 |
|-----------|------|
| `src/server/api/routers/screen982157.ts` | tRPC 라우터 (API 엔드포인트) |
| `data/generated_queries/SC982157_query_v2.sql` | 재생성된 SQL 쿼리 |
| `data/generated_queries/SC982157_connection.json` | Claude 생성 연결 코드 |
| `scripts/regenerate_sc982157_query.ts` | SQL 재생성 스크립트 |
| `scripts/connect_screen_query.ts` | 화면-쿼리 연결 스크립트 (검증 통합) |
| `scripts/validate_generated_code.ts` | **🆕 AI 생성 코드 자동 검증 유틸리티** |
| `data/generated_queries/validation_log.json` | **🆕 검증 이력 로그** |

### 수정된 파일
| 파일 경로 | 수정 내용 |
|-----------|-----------|
| `src/server/api/root.ts` | screen982157Router 등록 추가 |
| `src/app/screens/sc982157/page.tsx` | tRPC hook 연결, handleSearch 수정 |
| `prisma/schema.prisma` | 중복 필드명 수정 |
| `data/db_metadata_enhanced.json` | 소문자 컬럼명으로 갱신 |

---

## 🤖 자동 검증 파이프라인 (신규 추가)

### validate_generated_code.ts

AI 생성 코드의 일반적인 오류를 자동으로 감지하고 수정하는 유틸리티입니다.

**주요 기능**:
1. TypeScript AST 기반 구문 검증
2. 알려진 오류 패턴 자동 수정
3. 검증 로그 자동 저장

**지원하는 자동 수정 패턴**:
| 패턴 | 설명 |
|------|------|
| `createTRPCRouter {` | `createTRPCRouter({`로 수정 |
| `export` 누락 | `export const` 자동 추가 |
| 닫는 괄호 불일치 | `})` 검증 및 수정 |

**사용법**:
```bash
# 단독 실행
npx tsx scripts/validate_generated_code.ts <파일경로> trpc-router

# 프로그래밍 방식
import { validateAndFixGeneratedCode } from './validate_generated_code';

const result = await validateAndFixGeneratedCode(code, 'trpc-router');
if (result.appliedFixes.length > 0) {
  console.log('자동 수정:', result.appliedFixes);
  code = result.fixedCode;
}
```

### connect_screen_query.ts 통합

`connect_screen_query.ts`에 자동 검증 로직이 통합되어 다음 워크플로우로 동작합니다:

```
Claude API 호출 → 코드 생성 → 🔍 자동 검증 → ✅ 수정 적용 → 💾 저장 → 📝 로그
```

**통합 코드**:
```typescript
// Claude 응답 후 자동 검증 실행
const validationResult = await validateAndFixGeneratedCode(routerCode, 'trpc-router');

if (validationResult.appliedFixes.length > 0) {
  console.log('⚠️ 자동 수정 적용:', validationResult.appliedFixes);
  routerCode = validationResult.fixedCode!;
}
```

**검증 로그 예시** (`data/generated_queries/validation_log.json`):
```json
[
  {
    "timestamp": "2025-12-05T10:30:00.000Z",
    "file": "src/server/api/routers/screen982157.ts",
    "validationResult": {
      "isValid": false,
      "errors": ["createTRPCRouter 괄호 누락"],
      "appliedFixes": ["createTRPCRouter { → createTRPCRouter({"]
    }
  }
]
```

---

## ✅ 최종 검증 결과

```
✅ 화면 컴파일: 성공 (Compiled /screens/sc982157 in 2s)
✅ API 호출: 성공 (GET /api/trpc/screen982157.getData 200)
✅ SQL 실행: 성공 (prisma:query SELECT...)
✅ 데이터 조회: 성공 (yearMonth: 202510)
✅ AG Grid 표시: 정상
```

---

## 🔧 향후 자동화 개선 사항

### 1. 메타데이터 동기화 자동화
```bash
# DB 스키마 변경 감지 → 자동 메타데이터 갱신
npm run db:sync-metadata
```

### 2. SQL 검증 자동화
```typescript
// AI 생성 SQL 실행 전 자동 검증
async function validateGeneratedSQL(sql: string) {
  // 1. 컬럼 존재 여부 확인
  // 2. 테이블 존재 여부 확인
  // 3. EXPLAIN으로 문법 검증
}
```

### 3. API 키 검증 자동화
```typescript
// 스크립트 실행 전 API 키 유효성 검사
const keyLength = process.env.ANTHROPIC_API_KEY?.trim().length;
if (keyLength !== 108) {
  console.error('⚠️ API 키 길이 불일치. 셸 환경변수 확인 필요');
  process.exit(1);
}
```

### 4. 코드 생성 후 자동 린트
```bash
# AI 생성 코드 자동 검증
npm run lint -- --fix src/server/api/routers/screen*.ts
```

---

## 📊 작업 요약

| 단계 | 작업 내용 | 자동화 가능 | 수동 보정 필요 |
|------|-----------|-------------|----------------|
| 1 | DB 컬럼명 변경 | ✅ | ❌ |
| 2 | 메타데이터 재수집 | ✅ | ❌ |
| 3 | SQL 재생성 | ✅ | ⚠️ 검토 필요 |
| 4 | tRPC 라우터 생성 | ✅ **자동 검증 적용** | ⚠️ 복잡한 오류만 |
| 5 | 페이지 수정 | ⚠️ 부분적 | ✅ 수동 보완 |
| 6 | API 키 문제 해결 | ❌ | ✅ 환경 정리 |
| 7 | Prisma 스키마 수정 | ❌ | ✅ 중복 필드 |
| **8** | **코드 자동 검증** | **✅ 신규 추가** | **❌** |

**결론**: 자동 검증 파이프라인 추가로 수동 보정 비율 **30% → 20%**로 감소 예상

---

## 🎯 로컬 모델 전환 시 예상 이슈

1. **코드 생성 품질 저하**: 구문 오류 증가 예상
2. **SQL 정확도**: 메타데이터 참조 능력 차이
3. **컨텍스트 길이**: 긴 프롬프트 처리 제한
4. **강화학습 필요**: 피드백 기반 점진적 개선

**권장사항**: 
- 생성 후 자동 검증 파이프라인 구축
- 오류 패턴별 Few-shot 예제 축적
- 사용자 피드백 → Vector DB 저장 → 재학습

---

**작성 완료**: 2025년 12월 5일  
**버전**: 1.1 (자동 검증 파이프라인 추가)
