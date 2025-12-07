# AI Factory Lab - 개발 환경 설정# AI Factory Lab - 개발 환경 설정



> **최종 업데이트**: 2025년 12월 7일## 📋 프로젝트 개요



---- **프로젝트명**: AI Factory Lab

- **목적**: AI 기반 자동 화면 생성 시스템 (Grid/Chart 중심)

## 🏗️ 기술 스택- **시작일**: 2025년 12월 1일

- **기술 스택**: Next.js 14 + tRPC + Prisma + PostgreSQL

### Frontend

| 기술 | 버전 | 용도 |---

|------|------|------|

| Next.js | 15.5.6 | App Router + Turbopack |## 🏗️ 기술 스택

| TypeScript | 5.8 | 타입 안전성 |

| Tailwind CSS | v4 | 스타일링 |### Frontend

| shadcn/ui | Latest | UI 컴포넌트 |- **Framework**: Next.js 15.5.6 (App Router)

| AG Grid | Community | 데이터 그리드 |- **언어**: TypeScript 5.x

| Recharts | Latest | 차트 |- **UI Framework**: 

  - Tailwind CSS v4

### Backend  - shadcn/ui (Radix UI 기반)

| 기술 | 버전 | 용도 |- **🎨 디자인 시스템**: IBM Carbon Design System

|------|------|------|  - **적용일**: 2025년 12월 5일

| tRPC | v11 | 타입 안전 API |  - **테마**: Light Blue (연한 파란색 계열)

| Prisma | 6.19.0 | ORM |  - **폰트**: IBM Plex Sans

| PostgreSQL | 16 | 데이터베이스 |  - **색상 팔레트**: Carbon Gray 100 + Blue 60

| Node.js | 22.20.0 | 런타임 |  - **참고**: `/resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md`

- **상태 관리**: TanStack Query (React Query)

### AI- **테이블**: TanStack Table (무료, RealGrid 대체)

| 기술 | 용도 |- **차트**: Recharts + Nivo

|------|------|- **폼 관리**: react-hook-form + zod

| Claude Sonnet 4 | 코드 생성, Excel 분석 |- **아이콘**: lucide-react



### 디자인 시스템### Backend

- **IBM Carbon Design System** (Light Blue 테마)- **API Layer**: tRPC (End-to-End Type Safety)

- 색상: Carbon Gray 100 + Blue 60- **ORM**: Prisma 6.19.0

- 헤더 배경: `bg-blue-100` (#dbeafe)- **Database**: PostgreSQL 16

- **런타임**: Node.js 22.20.0

---

### Development Tools

## 🔌 포트 구성- **Package Manager**: npm

- **번들러**: Turbopack (Next.js 15)

| 서비스 | 포트 | 용도 |- **린터**: ESLint

|--------|------|------|- **포매터**: Prettier (via shadcn/ui)

| Next.js | 3000 (또는 3001) | 웹 애플리케이션 |

| PostgreSQL | 5432 | 데이터베이스 |---

| Chroma | 8000 | Vector DB (선택) |

## 🚀 설치 및 실행

---

### 1. 필수 사항

## 🚀 설치 및 실행```bash

# Node.js 18+ 필요

### 1. 의존성 설치node -v  # v22.20.0

```bash

npm install# PostgreSQL 16 설치

```sudo apt install postgresql-16



### 2. 환경 변수 설정# PostgreSQL 실행 확인

```bashsudo systemctl status postgresql

cp .env.example .env```

# .env 파일 편집

```### 2. 프로젝트 설정

```bash

### 3. 데이터베이스 설정# 의존성 설치

```bashnpm install

# PostgreSQL 데이터베이스 생성

sudo -u postgres psql -c "CREATE DATABASE ai_factory_db;"# 환경 변수 설정

cp .env.example .env

# Prisma 마이그레이션# .env 파일에서 DATABASE_URL 확인/수정

npm run db:push

# PostgreSQL 데이터베이스 생성

# Prisma Client 생성sudo -u postgres psql -c "CREATE DATABASE ai_factory_db;"

npx prisma generatesudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

```

# Prisma 마이그레이션

### 4. 개발 서버 실행npm run db:push

```bash

npm run dev# Prisma Client 생성

# http://localhost:3000npx prisma generate

```

# 샘플 데이터 추가

---node --import tsx prisma/seed.ts

```

## 🔑 API 키 설정

### 3. 개발 서버 실행

### .env 파일```bash

```bash# 개발 서버 시작 (Turbopack)

# 필수npm run dev

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_factory_db"

ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...# 브라우저에서 확인

# http://localhost:3000

# 선택```

GEMINI_API_KEY=your_gemini_api_key_here

```### 4. 기타 명령어

```bash

### API 키 발급# 빌드

- **Anthropic (Claude)**: https://console.anthropic.com/settings/keysnpm run build

- **Gemini**: https://aistudio.google.com/apikey

# 프로덕션 실행

---npm start



## ⚠️ 주요 문제 해결# Prisma Studio (DB GUI)

npx prisma studio

### 1. API 키 401 오류

# TypeScript 타입 체크

**원인**: 셸 환경 변수에 잘린 API 키가 남아 `.env` 파일을 덮어씀npm run typecheck

```

**해결**: `getAnthropicApiKey()` 함수 사용 (이미 적용됨)

```typescript---

// src/lib/screen-generator/api-key.ts

import { getAnthropicApiKey } from '~/lib/screen-generator';## � API 키 설정



const apiKey = getAnthropicApiKey(); // 파일에서 직접 읽음### 필수 API 키

```

```bash

### 2. RealGrid 라이센스 오류# .env 파일에 추가

GEMINI_API_KEY=your_gemini_api_key_here

**해결**: AG Grid Community로 전환 완료 (무료, 오픈소스)ANTHROPIC_API_KEY=your_anthropic_api_key_here

```

### 3. 포트 충돌

### API 키 발급 방법

**증상**: Port 3000 is in use

**해결**: 3001 포트로 자동 전환됨1. **Gemini API**: https://aistudio.google.com/apikey

2. **Anthropic (Claude) API**: https://console.anthropic.com/settings/keys

---

---

## 📁 환경 변수 예시 (.env.example)

## ⚠️ API 키 문제 해결

```bash

# Database### 문제 1: 401 Authentication Error (invalid x-api-key)

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_factory_db"

**증상**:

# AI APIs```

ANTHROPIC_API_KEY=sk-ant-api03-your-key-hereAuthenticationError: 401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}

GEMINI_API_KEY=your-gemini-key-here```



# Optional - Vector DB**원인**:

CHROMA_URL=http://localhost:80001. API 키가 만료됨

```2. API 키가 잘못 복사됨 (공백 포함, 줄바꿈 등)

3. API 키 형식 오류

---4. 크레딧 부족 (Free Tier 소진)



## 🛠️ 유용한 명령어**해결 방법**:



```bash```bash

# 개발 서버# 1. API 키 재발급

npm run dev# - Anthropic: https://console.anthropic.com/settings/keys

# - 기존 키 삭제 후 새 키 생성

# 빌드

npm run build# 2. .env 파일 확인

cat .env | grep ANTHROPIC_API_KEY

# 타입 체크

npm run typecheck# 3. API 키 형식 확인 (sk-ant-로 시작해야 함)

# ✅ 올바른 형식: ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...xxxxx

# Prisma Studio (DB GUI)# ❌ 잘못된 형식: ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

npx prisma studio#                  xxxxx  (줄바꿈 있음)



# 화면 생성# 4. API 키에 공백 없는지 확인

http://localhost:3000/settings/screen-generator# .env 파일에서 ANTHROPIC_API_KEY 값 앞뒤 공백 제거

```

# 5. API 키 길이 확인 (일반적으로 108자)

---node -e "require('dotenv').config(); console.log('키 길이:', process.env.ANTHROPIC_API_KEY?.length)"



**작성일**: 2025년 12월 7일# 6. 크레딧 확인

# https://console.anthropic.com/settings/billing
```

### 문제 2: API 키 로드 안됨

**증상**:
```
❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.
```

**해결 방법**:

```bash
# 1. .env 파일 존재 확인
ls -la .env

# 2. .env 파일 권한 확인
chmod 600 .env

# 3. dotenv 패키지 확인
npm list dotenv

# 4. 스크립트에서 dotenv 로드 확인
# import 'dotenv/config'; 또는
# require('dotenv').config();

# 5. 환경 변수 직접 확인
export $(cat .env | xargs) && node -e "console.log(process.env.ANTHROPIC_API_KEY?.substring(0, 20))"
```

### 문제 3: API 키 공백 문제

**증상**:
- API 키가 있는데 401 오류

**해결 방법**:

```typescript
// ✅ 올바른 방법: trim() 사용
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();

// ❌ 잘못된 방법: trim() 없음
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
```

### 문제 4: 여러 API 키 이름

**증상**:
- 스크립트마다 다른 변수명 사용

**표준화**:

```bash
# .env 파일 표준
ANTHROPIC_API_KEY=sk-ant-api03-xxx...  # ✅ 권장
CLAUDE_API_KEY=sk-ant-api03-xxx...     # ⚠️  비권장 (하위 호환성)

# 코드에서 처리
const API_KEY = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
```

---

### 문제 5: Phase 1 실행 시 401 인증 오류 (2025-12-04 발생)

**증상**:
```bash
$ npx tsx scripts/phase1_extract_screen_definition.ts
AuthenticationError: 401 {"type":"authentication_error","message":"invalid x-api-key"}
```

**발생 원인**:
- API 키는 `.env` 파일에 올바르게 설정되어 있음 (108자, `sk-ant-api03-` 형식)
- 원인 불명확 (일시적 네트워크 이슈 또는 공백 문자 포함 가능성)

**해결 과정**:

1. **API 키 유효성 확인** (curl 테스트):
```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'

# 결과: 200 OK - API 키 유효 확인
```

2. **코드 레벨 검증** (TypeScript):
```typescript
// test_key.ts
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const key = process.env.ANTHROPIC_API_KEY?.trim();
console.log('키 길이:', key?.length);  // 108
console.log('키 시작:', key?.substring(0, 20) + '...');  // sk-ant-api03-PHYVWRw...
```

3. **스크립트 수정** - API 키 로딩 시 `.trim()` 추가:
```typescript
// scripts/phase1_extract_screen_definition.ts (수정 전)
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

// 수정 후 - 공백 제거
const CLAUDE_API_KEY = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
```

4. **재실행**: 
```bash
npx tsx scripts/phase1_extract_screen_definition.ts
# ✅ 성공 - SC001_definition.json 생성됨
```

**해결 방법**:
- ✅ API 키 로딩 시 항상 `.trim()` 사용
- ✅ 실행 전 curl로 API 키 유효성 테스트
- ✅ 401 오류 발생 시 즉시 curl 테스트로 API 서버 상태 확인
- ✅ `.env` 파일에서 API 키 앞뒤 공백 제거 확인

**교훈**:
- 환경 변수 로딩 시 **반드시 `.trim()`** 사용
- API 오류 발생 시 **코드 문제 vs 서버 문제** 분리 진단 (curl 테스트 활용)
- 일시적 네트워크 이슈 가능성도 고려 (재시도로 해결됨)

---

### 문제 6: 셸 환경 변수가 dotenv 로드를 덮어씀 (2025-12-04 발생)

**증상**:
```bash
$ npx tsx scripts/phase3_generate_ui_component_aggrid.ts
❌ Claude API 오류: 401 {"type":"authentication_error","message":"invalid x-api-key"}

# .env 파일은 정상 (108자)
$ grep "ANTHROPIC" .env | cut -d= -f2 | wc -c
109  # (108자 + 줄바꿈)

# 하지만 dotenv 로드 후 16자만 인식
$ node -e "require('dotenv').config(); console.log(process.env.ANTHROPIC_API_KEY?.length)"
16
```

**발생 원인**:
- 셸에 이미 잘못된(잘린) `ANTHROPIC_API_KEY`가 환경 변수로 설정됨
- dotenv는 **기존 환경 변수를 덮어쓰지 않음** (기본 동작)
- 과거에 `.env` 파일이 줄바꿈으로 분리되었을 때 `export`되어 셸에 남아있었음

**진단 방법**:
```bash
# 1. 셸 환경 변수 확인 (dotenv 없이)
echo $ANTHROPIC_API_KEY | wc -c
# 17 (16자 + 줄바꿈) ← 문제! 108자여야 함

# 2. .env 파일 확인
grep "ANTHROPIC" .env | cut -d= -f2 | wc -c
# 109 (108자 + 줄바꿈) ← 정상

# 3. 차이가 있으면 셸 환경 변수가 문제
```

**해결 방법**:

```bash
# 방법 1: 환경 변수 해제 후 실행 (임시)
unset ANTHROPIC_API_KEY && npx tsx scripts/your_script.ts

# 방법 2: dotenv에서 override 옵션 사용 (영구적)
# 스크립트에서:
require('dotenv').config({ override: true });

# 방법 3: 셸 프로파일에서 export 제거 (영구적)
# ~/.bashrc 또는 ~/.zshrc에서 다음 줄 제거:
# export ANTHROPIC_API_KEY=...
```

**스크립트 수정 (권장)**:
```typescript
// phase3_generate_ui_component_aggrid.ts
import 'dotenv/config';  // 기존 방식

// 더 안전한 방식으로 변경:
import dotenv from 'dotenv';
dotenv.config({ override: true });  // 셸 환경 변수 덮어쓰기
```

**예방책**:
- ✅ `.bashrc`/`.zshrc`에 API 키를 직접 export하지 않기
- ✅ dotenv 사용 시 `{ override: true }` 옵션 고려
- ✅ 401 오류 발생 시 `echo $ANTHROPIC_API_KEY | wc -c`로 먼저 확인
- ✅ 셸 환경 변수와 `.env` 파일 길이 비교

---

### 검증 스크립트

```bash
# API 키 검증 스크립트 생성
cat > /tmp/test_api_key.ts << 'EOF'
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

async function test() {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  console.log('키 길이:', key?.length);
  console.log('키 시작:', key?.substring(0, 20) + '...');
  
  try {
    const client = new Anthropic({ apiKey: key });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 50,
      messages: [{ role: 'user', content: 'Hi' }]
    });
    console.log('✅ API 키 유효!');
  } catch (error: any) {
    console.log('❌ 오류:', error.message);
    if (error.status === 401) {
      console.log('💡 API 키를 다시 발급받으세요.');
    }
  }
}

test();
EOF

# 실행
npx tsx /tmp/test_api_key.ts
```

### curl을 이용한 빠른 API 테스트

```bash
# Anthropic API 직접 테스트 (코드 없이 서버 상태 확인)
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 50,
    "messages": [{"role": "user", "content": "Hi"}]
  }'

# 성공 응답 예시:
# {"id":"msg_xxx","type":"message","role":"assistant","content":[{"type":"text","text":"Hello!"}],...}

# 401 오류 시:
# {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}
```

---

### 문제 6: SheetJS (xlsx) Import 방식 오류 (2025-12-04 발견)

**증상**:
```bash
TypeError: XLSX.readFile is not a function
```

**발생 원인**:
- SheetJS 라이브러리의 잘못된 import 방식 사용
- `import * as XLSX from 'xlsx'` 사용 시 default export가 아닌 namespace로 인식됨

**해결 방법**:

```typescript
// ❌ 작동 안 함
import * as XLSX from 'xlsx';
const workbook = XLSX.readFile('file.xlsx');  // Error: XLSX.readFile is not a function

// ✅ 올바른 방식 (Default Import)
import XLSX from 'xlsx';
const workbook = XLSX.readFile('file.xlsx');  // ✅ 정상 작동
```

**검증된 예제**:
```typescript
import XLSX from 'xlsx';  // ✅ 이 방식 사용!

// Excel 파일 읽기
const workbook = XLSX.readFile('/path/to/file.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// JSON으로 변환
const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
  header: 1,  // 배열 형태로 반환
  defval: '',  // 빈 셀은 빈 문자열
  blankrows: false  // 빈 행 제외
});

console.log(jsonData);
```

**주의사항**:
- ✅ `import XLSX from 'xlsx'` - Node.js 환경 (tsx, ts-node)
- ✅ `import * as XLSX from 'xlsx'` - 일부 브라우저 번들러에서 작동 가능
- ⚠️ 프로젝트 내 일관성 유지 필요 (scripts/ 폴더는 `import XLSX from 'xlsx'` 사용)

**참고 파일**:
- `scripts/phase1_extract_screen_definition.ts` - ✅ 올바른 import 방식 사용
- `scripts/generate_report_with_rag.ts` - ✅ 올바른 import 방식 사용
- `scripts/test_real_excel.ts` - ✅ 올바른 import 방식 사용

---

### 🔴 문제 7: 셸 환경 변수가 .env 파일을 덮어씀 (2025-12-06 발생) - 반복 발생 주의!

**⚠️ 이 문제는 매번 반복 발생하므로 반드시 숙지!**

**증상**:
```bash
# 화면에서 "미리보기 생성" 버튼 클릭 시
❌ [Step 2/4] Claude API 오류: 401 {"type":"authentication_error","message":"invalid x-api-key"}

# 또는
❌ [Step 2/4] API 키가 잘려있습니다 (16자). .env.local 파일을 확인하세요.
```

**발생 원인**:
1. 과거에 `.env` 파일에서 API 키가 줄바꿈으로 분리됨
2. 터미널에서 `export`하거나 `source .env` 실행 시 잘린 키(16자)가 셸 환경 변수에 저장됨
3. **dotenv/.env.local은 기존 환경 변수를 덮어쓰지 않음** (기본 동작)
4. Next.js 서버가 셸에서 실행되면 잘린 키를 사용

**진단 방법**:
```bash
# 1. 셸 환경 변수 길이 확인 (문제 있으면 17자 이하)
echo "셸 환경 변수 길이: $(echo $ANTHROPIC_API_KEY | wc -c)"
# 정상: 109 (108자 + 줄바꿈)
# 비정상: 17 이하 (잘린 키)

# 2. .env 파일 길이 확인
echo ".env 파일 길이: $(grep 'ANTHROPIC_API_KEY' .env | cut -d= -f2 | wc -c)"
# 정상: 109 (108자 + 줄바꿈)

# 3. .env 파일에 줄바꿈 있는지 확인
cat -A .env | grep ANTHROPIC
# 비정상: 키가 두 줄에 걸쳐 표시됨
# 정상: 한 줄에 키 전체 표시

# 4. curl로 API 키 유효성 직접 테스트
export $(grep ANTHROPIC .env | xargs) && curl -s https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model": "claude-sonnet-4-20250514", "max_tokens": 10, "messages": [{"role": "user", "content": "Hi"}]}'
# 성공: {"model":"claude-sonnet-4-20250514"...}
# 실패: {"type":"error","error":{"type":"authentication_error"...}}
```

**✅ 해결책 (영구적) - 코드에서 파일 직접 읽기**:

`src/server/api/routers/screenGenerator.ts`에 다음 함수 추가:

```typescript
import * as fs from "fs";
import * as path from "path";

// .env.local에서 직접 API 키 읽기 (환경 변수 오염 방지)
function getAnthropicApiKey(): string | null {
  // 1. .env.local 파일에서 직접 읽기 시도
  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[DEBUG] .env.local에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 2. .env 파일에서 직접 읽기 시도
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[DEBUG] .env에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 3. 환경 변수에서 가져오기 (폴백)
  const envKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
  if (envKey && envKey.length >= 100) {
    console.log(`[DEBUG] 환경 변수에서 API 키 로드 (${envKey.length}자)`);
    return envKey;
  }
  
  console.log(`[DEBUG] API 키를 찾을 수 없거나 잘려있음`);
  return null;
}

// 사용 예시
const apiKey = getAnthropicApiKey();
if (!apiKey) {
  return { success: false, error: "API 키를 찾을 수 없습니다." };
}
const anthropic = new Anthropic({ apiKey });
```

**✅ 해결책 (임시) - .env.local 파일 생성**:

```bash
# .env.local 파일에 API 키를 한 줄로 작성 (Next.js에서 우선 로드)
cd /home/roarm_m3/ai-factory-lab
printf 'ANTHROPIC_API_KEY=sk-ant-api03-여기에전체키입력\n' > .env.local

# 확인 (127자 = 18자 키이름 + 108자 키값 + 1자 줄바꿈)
cat .env.local | wc -c
# 127
```

**✅ 해결책 (추가) - 셸 환경 변수 정리**:

```bash
# 1. 현재 터미널에서 환경 변수 해제
unset ANTHROPIC_API_KEY

# 2. ~/.bashrc 또는 ~/.zshrc에서 export 라인 제거
nano ~/.bashrc
# 다음 라인이 있으면 삭제:
# export ANTHROPIC_API_KEY=...

# 3. 새 터미널 열고 서버 재시작
npm run dev
```

**예방책**:
- ✅ `.env` 파일에서 API 키는 **반드시 한 줄**로 작성
- ✅ `source .env` 또는 `export $(cat .env | xargs)` 실행 금지
- ✅ Claude API 사용하는 코드는 `getAnthropicApiKey()` 함수 사용
- ✅ 401 오류 발생 시 `echo $ANTHROPIC_API_KEY | wc -c`로 먼저 확인
- ✅ `.bashrc`/`.zshrc`에 API 키 직접 export 금지

**적용된 파일**:
- `src/server/api/routers/screenGenerator.ts` - ✅ `getAnthropicApiKey()` 함수 적용 완료 (2025-12-06)

---


---

## 📁 프로젝트 구조

```
ai-factory-lab/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx           # 홈페이지
│   │   ├── products/          # 상품 관리 페이지
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── server/                # 백엔드 (tRPC)
│   │   └── api/
│   │       ├── routers/       # tRPC 라우터
│   │       │   ├── product.ts # Product CRUD API
│   │       │   └── post.ts    # 예시 API
│   │       └── root.ts        # 라우터 등록
│   ├── components/            # React 컴포넌트
│   │   └── ui/                # shadcn/ui 컴포넌트
│   ├── lib/                   # 유틸리티
│   └── trpc/                  # tRPC 클라이언트 설정
├── prisma/
│   ├── schema.prisma          # DB 스키마
│   └── seed.ts                # 시드 데이터
├── generated/
│   └── prisma/                # Prisma Client (자동 생성)
├── public/                    # 정적 파일
├── docs/                      # 문서
├── .env                       # 환경 변수
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🗄️ 데이터베이스

### 연결 정보
- **Host**: localhost
- **Port**: 5432
- **Database**: ai_factory_db
- **User**: postgres
- **Password**: postgres

### 현재 테이블
- **Product**: 상품 마스터
  - 필드: id, productCode, productName, category, price, stock, description, isActive, createdAt, updatedAt, createdBy, updatedBy
  - 인덱스: productCode (UNIQUE), category, isActive

### Prisma 명령어
```bash
# 스키마 변경 후 동기화
npm run db:push

# 마이그레이션 생성 (프로덕션용)
npx prisma migrate dev --name migration_name

# DB GUI 열기
npx prisma studio
```

---

## 🎨 UI 컴포넌트

### shadcn/ui 설치된 컴포넌트
- button
- table
- card
- dialog
- form
- input
- label
- select

### 새 컴포넌트 추가
```bash
npx shadcn@latest add [component-name]
```

---

## 🔧 개발 가이드

### 1. 새 페이지 추가
```bash
# src/app/your-page/page.tsx 생성
# 자동으로 라우팅됨 (App Router)
```

### 2. 새 API 추가 (tRPC)
```typescript
// 1. src/server/api/routers/yourRouter.ts 생성
export const yourRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.yourModel.findMany();
  }),
});

// 2. src/server/api/root.ts에 등록
import { yourRouter } from "./routers/yourRouter";
export const appRouter = createTRPCRouter({
  your: yourRouter,
});
```

### 3. 새 모델 추가 (Prisma)
```prisma
// prisma/schema.prisma에 모델 추가
model YourModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
}

// 동기화
npm run db:push
npx prisma generate
```

---

## 🚨 트러블슈팅

### PostgreSQL 연결 실패
```bash
# PostgreSQL 상태 확인
sudo systemctl status postgresql

# 비밀번호 재설정
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

### Prisma Client 에러
```bash
# Client 재생성
npx prisma generate

# 캐시 삭제 후 재생성
rm -rf node_modules/.prisma
rm -rf generated/prisma
npx prisma generate
```

### 포트 충돌
```bash
# 3000 포트 사용 확인
lsof -i :3000

# 프로세스 종료
kill -9 [PID]
```

---

## 📊 성능 메트릭

- **빌드 시간**: ~30초 (Turbopack)
- **개발 서버 시작**: ~600ms
- **페이지 컴파일**: ~200ms (첫 로드)
- **HMR**: <100ms (Turbopack)

---

## 🔐 환경 변수

`.env` 파일:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_factory_db"
```

---

## 🎨 IBM Carbon Design System 적용 가이드

### ⚠️ 중요: 화면 생성 시 반드시 적용

**모든 새로운 화면/컴포넌트 생성 시 IBM Carbon Design System 스타일을 반드시 적용해야 합니다.**

### 디자인 시스템 리소스 위치

```
/resources/design-system/
├── IBM_CARBON_DESIGN_SYSTEM.md     # 메인 가이드 (필독)
├── CARBON_COLOR_TOKENS.md          # 색상 토큰 레퍼런스
└── CARBON_COMPONENT_SNIPPETS.md    # 복사-붙여넣기용 코드 스니펫
```

### 화면 생성 체크리스트

- [ ] **폰트**: IBM Plex Sans (`font-family: 'IBM Plex Sans'`)
- [ ] **색상**: Carbon 색상 팔레트 사용 (`#0f62fe`, `#161616`, `#f4f4f4` 등)
- [ ] **간격**: 8px 단위 (2x Grid) 사용
- [ ] **버튼**: 48px 높이, 직각 모서리, hover/active 상태
- [ ] **입력 필드**: 하단 테두리 스타일 (`border-b border-[#8d8d8d]`)
- [ ] **테이블**: 48px 행 높이, 호버 효과 (`hover:bg-[#f4f4f4]`)
- [ ] **카드**: 상단 3px 컬러 바 (`border-t-[3px] border-t-[#0f62fe]`)
- [ ] **아이콘**: 20px 기본 사이즈 (lucide-react)
- [ ] **포커스**: 2px 파란색 아웃라인 (`focus:ring-2 focus:ring-[#0f62fe]`)

### 주요 색상 코드

| 용도 | 색상 코드 |
|------|-----------|
| Primary Interactive | `#0f62fe` |
| Background (Light) | `#f4f4f4` |
| Background (Dark) | `#161616` |
| Text Primary | `#161616` |
| Text Secondary | `#525252` |
| Border | `#e0e0e0` |
| Success | `#24a148` |
| Error | `#da1e28` |
| Warning | `#f1c21b` |

### 코드 예시

```tsx
// ✅ 올바른 예시 - Carbon 스타일
<button className="bg-[#0f62fe] text-white px-4 py-3 text-sm hover:bg-[#0353e9]">
  저장
</button>

<div className="bg-white shadow-sm border-t-[3px] border-t-[#0f62fe] p-5">
  <h3 className="text-sm font-semibold text-[#161616]">카드 제목</h3>
</div>

// ❌ 잘못된 예시 - 일반 Tailwind 스타일
<button className="bg-blue-500 rounded-md px-4 py-2">
  저장
</button>
```

### 참고 사이트

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [Carbon React Components](https://react.carbondesignsystem.com/)
- [Carbon Color Tokens](https://carbondesignsystem.com/guidelines/color/tokens/)

---

## 📝 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [tRPC 문서](https://trpc.io/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [Recharts](https://recharts.org)

---

**최종 업데이트**: 2025년 12월 1일
