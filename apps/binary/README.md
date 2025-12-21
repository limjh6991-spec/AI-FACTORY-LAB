# Binary Soft

프로젝트 현황 파악 및 진행관리 시스템

## 🚀 프로젝트 개요

Binary Soft는 **프로젝트 현황 파악 및 진행관리**를 위한 시스템입니다.
프로젝트 수행표준, 킥오프미팅 관리, 프로젝트 진행상황 모니터링 기능을 제공합니다.

## 📋 주요 기능

| 메뉴 | 설명 |
|------|------|
| **대시보드** | 프로젝트 진행현황 종합 |
| **프로젝트** | 프로젝트 목록 및 상세 관리 |
| **프로젝트 수행표준** | 표준 문서 및 가이드라인 |
| **킥오프미팅** | 프로젝트 착수 미팅 관리 |
| **설정** | 시스템 설정 |

## 📁 프로젝트 구조

```
binary/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # 대시보드
│   │   ├── projects/           # 프로젝트 관리
│   │   │   └── [id]/           # 프로젝트 상세
│   │   ├── standards/          # 수행표준
│   │   ├── kickoff/            # 킥오프미팅
│   │   └── settings/           # 설정
│   └── components/
│       └── layout/             # 레이아웃 컴포넌트
│           └── BinarySidebar.tsx
├── docs/
│   ├── database_schema.sql     # DB 스키마
│   ├── seed_data.sql           # 샘플 데이터
│   └── ERD.md                  # ERD 문서
└── package.json
```

> **참고**: 이 프로젝트는 프론트엔드 중심으로 Simple Next.js 구조를 사용합니다.
> Clean Architecture는 백엔드 API 추가 시 적용 예정입니다.

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: PostgreSQL (예정)

## 🚀 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저 접속
http://localhost:3000
```

## 📊 데이터베이스

- 스키마: `docs/database_schema.sql`
- ERD: `docs/ERD.md`
- 테이블: 16개 (기준정보 + 프로젝트 관리)

---

**Created**: 2024년 12월 21일  
**Author**: Binary Soft Team
