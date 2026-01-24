# SpacePro 프로젝트 컨텍스트 요약
> 작성일: 2026-01-23
> 목적: 대화창 갱신 시 문맥 유지용

## 1. 프로젝트 개요

**SpacePro**는 항공우주 제조업 MES/MRP 시스템으로, O궁(연소관), SH, SD, SF 등 다품종 제품의 생산계획 및 스케줄링을 관리합니다.

### 위치
```
/home/roarm_m3/ai-factory-lab/apps/spacepro
```

## 2. Docker 환경

### 서비스 구성
| 서비스 | 포트 | 기술스택 |
|--------|------|----------|
| Frontend | 3002 | Next.js 15, Node 22 |
| Backend | 8001 | FastAPI, Python 3.11, OR-Tools |
| Database | 5433 | PostgreSQL 15 |

### 실행 명령
```bash
./docker.sh          # 빌드 + 시작 (기본)
./docker.sh build    # 빌드만
./docker.sh up       # 시작만
./docker.sh down     # 중지
./docker.sh logs     # 로그 확인
```

## 3. 데이터베이스 스키마 (spacepro)

### 테이블 현황 (2026-01-23 기준)
| 테이블명 | 행 수 | 설명 |
|----------|-------|------|
| sp_site_mst | 1 | 사업장 (밀양2) |
| sp_undertaking_team_mst | 3 | 사업팀 (C01연소관, C02노즐, C03항공) |
| sp_bench_mst | 5 | 작업장 (SS0005~SS0103) |
| sp_eqp_type | 8 | 설비타입 (EQ001~EQ008) |
| sp_contract_info | 56 | 계약정보 (4개 제품 × 14공정) |
| sp_macode_info | 22 | 제품정보 |
| sp_prcode_detail_info | 102 | 세부공정정보 |
| sp_team | 5 | 작업팀 |
| sp_employee | 6 | 작업자 |
| sp_material_info | 131 | 자재정보 |

### 사업 Hierarchy
```
사업팀 → 계약 → 제품 → 공정 → 세부공정 → 설비타입 → 설비
```

### 제품 목록
| 제품 | 사업팀 | 계약번호 | 제품코드 |
|------|--------|----------|----------|
| O궁 | C01 (연소관) | 23D220097 | IAHANWCQ |
| SH | C02 (노즐) | 24D110012 | SHBD001 |
| SD | C02 (노즐) | 24D110015 | SDAB002 |
| SF | C03 (항공) | 24A220033 | SFCD003 |

## 4. 주요 기능 구현 현황

### Frontend 페이지
- `/plan/contract-simulation` - 계약 기반 생산 시뮬레이션 (Gantt 차트)
- `/master/*` - 8개 마스터 데이터 CRUD 화면
  - site, bench, equipment, eqp-type, contract, macode, pr-detail, material

### Backend API (FastAPI)
- `/simulation/contracts` - 계약 목록 조회
- `/simulation/contract-schedule` - 계약 기반 스케줄링 실행
- `/master/{table}` - 마스터 데이터 CRUD

## 5. 최근 작업 내역 (이 세션)

1. **Gantt 차트 UI 개선**
   - 시간축 → 일 기준으로 변경
   - 다중 제품 표시 (O궁, 제품B, 제품C)
   - 날짜별 공정 표시 행 추가

2. **Docker 스크립트 개선**
   - `docker.sh` 기본 실행 시 빌드+시작
   - `start.sh` 추가 (간소화 버전)

3. **데이터베이스 재생성**
   - `데이터포맷정리.xlsx` 기준 테이블 재생성
   - 10개 테이블 생성 및 데이터 임포트
   - SH, SD, SF 제품 데이터 추가 생성

## 6. 파일 구조

```
spacepro/
├── docker.sh              # Docker 관리 스크립트
├── docker-compose.yml     # Docker 서비스 정의
├── 데이터포맷정리.xlsx    # 마스터 데이터 원본
├── scheduling-service/    # Backend (FastAPI)
│   ├── main.py
│   └── routers/
│       ├── simulation.py  # 시뮬레이션 API
│       └── master.py      # 마스터 CRUD API
└── src/app/               # Frontend (Next.js)
    ├── plan/
    │   └── contract-simulation/page.tsx
    └── master/
        └── {8개 CRUD 페이지}
```

## 7. DB 접속 정보

```python
host="localhost"
port="5433"
database="spacepro"
user="postgres"
password="postgres"
schema="spacepro"
```

## 8. 다음 작업 예상

- 생산계획 시뮬레이션 고도화
- 설비 배정 로직 구현
- 실시간 진척 관리 화면
- 리포트/대시보드

---
> 이 파일을 새 대화에 첨부하면 컨텍스트가 유지됩니다.
