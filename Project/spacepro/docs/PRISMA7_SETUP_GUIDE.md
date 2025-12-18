# Prisma 7 PostgreSQL 연동 가이드

> **문제**: Prisma 7에서 `PrismaClient` 생성 시 `adapter` 또는 `accelerateUrl`이 필수가 됨  
> **원인**: Prisma 7부터 클라이언트 엔진 방식이 변경되어 직접 DB 연결을 위해 Driver Adapter 사용 필요  
> **해결**: `@prisma/adapter-pg` 설치 및 adapter 방식으로 PrismaClient 생성

---

## 🔧 해결 방법

### 1. 의존성 설치

```bash
npm install @prisma/adapter-pg pg
npm install --save-dev @types/pg
```

### 2. Prisma Client 생성 (lib/prisma.ts)

```typescript
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma';

const connectionString = process.env.DATABASE_URL!;

// adapter 방식으로 연결 (spacepro 스키마 지정)
const adapter = new PrismaPg(
  { connectionString },
  { schema: 'spacepro' }
);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
```

### 3. Seed 스크립트 (prisma/seed.ts)

```typescript
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg(
  { connectionString },
  { schema: 'spacepro' }
);

const prisma = new PrismaClient({ adapter });

async function main() {
  // seed 로직
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 4. 환경 변수 (.env)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro"
```

---

## 📋 prisma.config.ts 설정

```typescript
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

---

## 📋 prisma/schema.prisma 설정

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  schemas  = ["spacepro"]  // 멀티 스키마 지원
}
```

---

## ⚠️ 주의사항

1. **Prisma 7 Breaking Change**
   - `url` 속성이 `schema.prisma`에서 제거됨
   - `prisma.config.ts`에서 URL 설정
   - 클라이언트는 adapter 방식 필수

2. **Driver Adapter 종류**
   - `@prisma/adapter-pg`: node-postgres (pg)
   - `@prisma/adapter-neon`: Neon Serverless
   - `@prisma/adapter-planetscale`: PlanetScale

3. **스키마 지정**
   - adapter 생성 시 `{ schema: 'spacepro' }` 옵션으로 지정

---

## 🔗 참고 문서

- [Prisma 7 Migration Guide](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration)
- [PostgreSQL Driver Adapter](https://www.prisma.io/docs/orm/overview/databases/postgresql)
- [Prisma Config Reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)

---

**작성일**: 2024-12-18
