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

## 📝 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [tRPC 문서](https://trpc.io/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [Recharts](https://recharts.org)

---

**최종 업데이트**: 2025년 12월 1일
