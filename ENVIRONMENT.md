# AI Factory Lab - 개발 환경 설정

## 📋 프로젝트 개요

- **프로젝트명**: AI Factory Lab
- **목적**: AI 기반 자동 화면 생성 시스템 (Grid/Chart 중심)
- **시작일**: 2025년 12월 1일
- **기술 스택**: Next.js 14 + tRPC + Prisma + PostgreSQL

---

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 15.5.6 (App Router)
- **언어**: TypeScript 5.x
- **UI Framework**: 
  - Tailwind CSS v4
  - shadcn/ui (Radix UI 기반)
- **상태 관리**: TanStack Query (React Query)
- **테이블**: TanStack Table (무료, RealGrid 대체)
- **차트**: Recharts + Nivo
- **폼 관리**: react-hook-form + zod
- **아이콘**: lucide-react

### Backend
- **API Layer**: tRPC (End-to-End Type Safety)
- **ORM**: Prisma 6.19.0
- **Database**: PostgreSQL 16
- **런타임**: Node.js 22.20.0

### Development Tools
- **Package Manager**: npm
- **번들러**: Turbopack (Next.js 15)
- **린터**: ESLint
- **포매터**: Prettier (via shadcn/ui)

---

## 🚀 설치 및 실행

### 1. 필수 사항
```bash
# Node.js 18+ 필요
node -v  # v22.20.0

# PostgreSQL 16 설치
sudo apt install postgresql-16

# PostgreSQL 실행 확인
sudo systemctl status postgresql
```

### 2. 프로젝트 설정
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 DATABASE_URL 확인/수정

# PostgreSQL 데이터베이스 생성
sudo -u postgres psql -c "CREATE DATABASE ai_factory_db;"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

# Prisma 마이그레이션
npm run db:push

# Prisma Client 생성
npx prisma generate

# 샘플 데이터 추가
node --import tsx prisma/seed.ts
```

### 3. 개발 서버 실행
```bash
# 개발 서버 시작 (Turbopack)
npm run dev

# 브라우저에서 확인
# http://localhost:3000
```

### 4. 기타 명령어
```bash
# 빌드
npm run build

# 프로덕션 실행
npm start

# Prisma Studio (DB GUI)
npx prisma studio

# TypeScript 타입 체크
npm run typecheck
```

---

## � API 키 설정

### 필수 API 키

```bash
# .env 파일에 추가
GEMINI_API_KEY=your_gemini_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### API 키 발급 방법

1. **Gemini API**: https://aistudio.google.com/apikey
2. **Anthropic (Claude) API**: https://console.anthropic.com/settings/keys

---

## ⚠️ API 키 문제 해결

### 문제 1: 401 Authentication Error (invalid x-api-key)

**증상**:
```
AuthenticationError: 401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}
```

**원인**:
1. API 키가 만료됨
2. API 키가 잘못 복사됨 (공백 포함, 줄바꿈 등)
3. API 키 형식 오류
4. 크레딧 부족 (Free Tier 소진)

**해결 방법**:

```bash
# 1. API 키 재발급
# - Anthropic: https://console.anthropic.com/settings/keys
# - 기존 키 삭제 후 새 키 생성

# 2. .env 파일 확인
cat .env | grep ANTHROPIC_API_KEY

# 3. API 키 형식 확인 (sk-ant-로 시작해야 함)
# ✅ 올바른 형식: ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...xxxxx
# ❌ 잘못된 형식: ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
#                  xxxxx  (줄바꿈 있음)

# 4. API 키에 공백 없는지 확인
# .env 파일에서 ANTHROPIC_API_KEY 값 앞뒤 공백 제거

# 5. API 키 길이 확인 (일반적으로 108자)
node -e "require('dotenv').config(); console.log('키 길이:', process.env.ANTHROPIC_API_KEY?.length)"

# 6. 크레딧 확인
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

## �📁 프로젝트 구조

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

## 📝 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [tRPC 문서](https://trpc.io/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [Recharts](https://recharts.org)

---

**최종 업데이트**: 2025년 12월 1일
