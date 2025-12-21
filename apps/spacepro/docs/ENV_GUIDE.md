# 환경 변수 가이드 (Environment Variables Guide)

SpacePro MES/MRP 시스템 환경 설정 가이드입니다.

---

## 🚀 빠른 시작

```bash
# 1. 템플릿 복사
cp .env.example .env

# 2. .env 파일 수정 (DB 연결 정보 확인)
vi .env

# 3. 개발 서버 시작
npm run dev
```

---

## 📋 환경 변수 목록

### 필수 설정

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | `postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro` |

### 애플리케이션 설정

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `NODE_ENV` | 실행 환경 | `development` |
| `PORT` | 서버 포트 | `3001` |
| `NEXT_PUBLIC_APP_URL` | 앱 URL | `http://localhost:3001` |

### Phase 2+ (OR-Tools 스케줄링)

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `SCHEDULING_SERVICE_URL` | Python 마이크로서비스 URL | `http://localhost:8000` |
| `SCHEDULING_TIMEOUT` | 스케줄링 타임아웃 (초) | `60` |

### Phase 3+ (인증/알림)

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `JWT_SECRET` | JWT 시크릿 키 (32자+) | `your-super-secret-key` |
| `SESSION_TIMEOUT` | 세션 만료 시간 (초) | `3600` |
| `SLACK_WEBHOOK_URL` | 슬랙 웹훅 | `https://hooks.slack.com/...` |

---

## 🔧 환경별 설정

### 개발 환경 (Development)
```bash
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro"
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 운영 환경 (Production)
```bash
NODE_ENV=production
DATABASE_URL="postgresql://prod_user:secure_pass@db-server:5432/spacepro_db?schema=spacepro"
NEXT_PUBLIC_APP_URL=https://mes.spacepro.com
JWT_SECRET="very-long-random-secret-key-for-production"
```

---

## 📁 파일 구조

```
/Project/spacepro/
├── .env                 # 실제 환경 변수 (git 무시)
├── .env.example         # 템플릿 (git 커밋)
├── .env.local           # 로컬 오버라이드 (git 무시)
└── docs/
    └── ENV_GUIDE.md     # 이 문서
```

---

## ⚠️ 보안 주의사항

1. **`.env` 파일은 절대 git에 커밋하지 마세요**
2. `JWT_SECRET`은 32자 이상의 랜덤 문자열 사용
3. 운영 환경에서는 환경 변수를 서버에서 직접 설정
4. 민감한 정보는 Secret Manager 사용 권장

---

## 🔗 관련 문서

- [Prisma 7 설정 가이드](./PRISMA7_SETUP_GUIDE.md)
- [개발 로드맵](./DEVELOPMENT_ROADMAP.md)
- [Clean Architecture 가이드](/home/roarm_m3/ai-factory-lab/resources/or-tools/04_CLEAN_ARCHITECTURE.md)

---

**작성일**: 2024-12-19
