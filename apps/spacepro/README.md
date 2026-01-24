# SpacePro - MES/MRP 생산계획 관리 시스템

> **Next.js 16 + TypeScript + Clean Architecture + Docker 기반 생산 모니터링 및 시뮬레이션 시스템**

## 🚀 프로젝트 개요

SpacePro는 방산 제조 분야(연소관, 노즐, 항공 등)에 특화된 **MES/MRP 및 생산경영 시뮬레이션** 플랫폼입니다.
실시간 생산 현황 모니터링, 계약/품목 기반 생산 시뮬레이션, 그리고 리스크 관리 기능을 제공합니다.

## 📋 주요 기능

| 기능 | 경로 | 설명 |
|------|------|------|
| **경영계획 시뮬레이션** | `/plan/management` | 사업팀별(연소관, 노즐 등) 계약/품목 현황 및 진행율 모니터링 |
| **계약 상세 모니터링** | `/plan/management/[teamId]` | 계약별 대표 제품/공정 간트 차트 (시뮬레이션 데이터) |
| **생산 시뮬레이션** | `/plan/contract-simulation` | 계약 기반 상세 일정 시뮬레이션 (OR-Tools) |
| 메인 대시보드 | `/` | 생산 현황 종합 (WIP) |
| 프로젝트 대시보드 | `/projects` | Metronic 스타일 프로젝트 관리 |
| 월간 생산계획 | `/plan/monthly` | PSI 계획 및 OR-Tools 최적화 |

## 🏗️ 시스템 아키텍처

Clean Architecture 패턴을 준수하며, Docker 컨테이너 기반으로 마이크로서비스가 구성되어 있습니다.

```mermaid
graph TD
    User[Client Browser] --> |HTTP| FE[Frontend Container (Next.js)]
    FE --> |API Proxy| BE[Backend Container (FastAPI)]
    BE --> |SQL| DB[Database Container (PostgreSQL 15)]
    BE --> |Solver| OR[OR-Tools Engine]
```

### 디렉토리 구조
```
spacepro/
├── src/                        # Next.js Presentation Layer
│   ├── app/                    # App Router (Pages & API Routes)
│   ├── components/             # Reusable UI Components
│   └── ...
├── scheduling-service/         # Python FastAPI Backend
│   ├── routers/                # API Endpoints (Master, Dashboard, Simulation)
│   ├── main.py                 # App Entry Point
│   └── requirements.txt        # Python Dependencies
├── docker/                     # Docker Configs
│   └── init-db.sql             # DB Initialization Script
├── Dockerfile.frontend         # Frontend Build Config
├── Dockerfile.backend          # Backend Build Config
├── docker-compose.yml          # Service Orchestration
└── docker.sh                   # Management Script
```

## 🛠️ 기술 스택

| 분류 | 기술 | 버전/특징 |
|------|------|-----------|
| **Frontend** | Next.js | v16.0.10 (App Router) |
| | React | v19.0.0 |
| | Language | TypeScript |
| | Styling | Tailwind CSS |
| | UI Lib | Lucide React |
| **Backend** | Python | v3.11 |
| | Framework | FastAPI |
| | Optimization | Google OR-Tools |
| **Database** | PostgreSQL | v15 (Docker) |
| | ORM | Prisma / Psycopg2 |
| **Infra** | Docker | Compose 기반 오케스트레이션 |

## 🚀 설치 및 실행 (Docker 환경)

폐쇄망 환경을 고려하여 모든 의존성은 Docker 이미지로 패키징 가능합니다.

### 1. 서비스 전체 시작
```bash
# 전체 서비스 빌드 및 실행 (DB 데이터 유지)
./docker.sh up

# 백그라운드 실행
./docker.sh up -d
```

### 2. 서비스 개별 관리
```bash
# 특정 서비스만 재빌드 (코드 수정 시)
./docker.sh build frontend
./docker.sh build backend

# 서비스 재시작
./docker.sh restart backend
```

### 3. 접속 주소
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📅 최근 업데이트 내역 (2026.01)

### ✅ 경영계획 시뮬레이션 (최신)
- [x] **사업팀별 현황 대시보드**: 연소관팀(C01) 등 팀별 계약/품목 수 및 진행율 카드뷰
- [x] **계약별 상세 간트 차트**:
    - O궁, SH, SD, SF 등 주요 제품군 통합 관리
    - 공정별 진행 상태 (Done/In Progress/Pending) 시각화
    - 제품별 타임라인 그룹핑 뷰 제공

### ✅ 데이터 표준화
- [x] **통합 계약 관리**: O궁/SH/SD/SF 제품군을 단일 계약(`23D220097`)으로 통합
- [x] **Master Data 정비**: `sp_macode_info`, `sp_pr_detail` 등 표준 테이블 적용

### ✅ 인프라
- [x] **Docker 환경 구축**: Frontend, Backend, DB 컨테이너화 완료 및 연동 테스트 통과

## 📁 주요 문서
- `CONTEXT_SUMMARY.md`: 프로젝트 전체 맥락 및 현재 상태 요약
- `implementation_plan.md`: 구현 계획 이력

---
**Updated**: 2026년 01월 24일
